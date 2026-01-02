// Content script que roda no contexto da página Shopee
// Este script extrai informações do produto e tenta obter o link de oferta

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProductInfo') {
        // Indicamos que vamos responder de forma assíncrona
        handleGetProductInfo(request).then((productInfo) => {
            if (productInfo) {
                sendResponse({ success: true, data: productInfo });
            } else {
                sendResponse({ success: false, error: 'Produto não encontrado' });
            }
        }).catch((err) => {
            console.error('Erro em handleGetProductInfo:', err);
            sendResponse({ success: false, error: String(err) });
        });

        return true; // manter canal aberto para resposta assíncrona
    }
});

async function handleGetProductInfo(request = {}) {
    const info = extractBasicProductInfo();
    if (!info) return null;

    // Tentar extrair itemId/shopId da URL
    const ids = extractItemAndShopFromUrl(window.location.href);
    if (ids && ids.itemId && ids.shopId) {
        try {
            // Priorizar custom link (mais assertivo) - delegar ao background
            const originalLink = info.url || window.location.href;
            const custom = await fetchCustomLinkViaBackground(originalLink, request.affiliateCode || '');
            if (custom && custom.success && custom.link) {
                info.offerLink = custom.link;
            } else {
                // fallback: tentar offerLink via item/shop
                const offer = await fetchOfferLinkViaBackground(ids.itemId, ids.shopId, request.affiliateCode || '');
                if (offer && offer.success && offer.link) {
                    info.offerLink = offer.link;
                } else if (offer && offer.link) {
                    info.offerLink = offer.link;
                }
            }
        } catch (e) {
            console.warn('Falha ao obter custom/offer link via background:', e);
        }
    }

    return info;
}

function extractBasicProductInfo() {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) {
        return {
            name: ogTitle.getAttribute('content') || document.title,
            image: ogImage ? ogImage.getAttribute('content') : '',
            url: ogUrl ? ogUrl.getAttribute('content') : window.location.href,
            price: extractPrice()
        };
    }

    // procurar elementos de página como fallback
    const productName = document.querySelector('h1') || document.querySelector('[class*="product-title"], [class*="product-name"]');
    const productImage = document.querySelector('img[src*="shopee"], [class*="product-image"] img');
    if (productName) {
        return {
            name: productName.textContent.trim(),
            image: productImage ? productImage.src : '',
            url: window.location.href,
            price: extractPrice()
        };
    }

    return null;
}

function extractItemAndShopFromUrl(url) {
    // Tenta capturar padrões comuns: e.g. -i.<shopId>.<itemId>
    // Exemplo: https://shopee.com.br/nome-do-produto-i.1473898517.23599043776
    const m = url.match(/-i\.(\d+)\.(\d+)/) || url.match(/\.i\.(\d+)\.(\d+)/);
    if (m && m[1] && m[2]) {
        // Note: em alguns padrões a ordem pode ser shopId.itemId
        // No exemplo acima: shopId = 1473898517, itemId = 23599043776
        return { shopId: m[1], itemId: m[2] };
    }

    // Tentar extrair do querystring ou do corpo da página
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        const u = ogUrl.getAttribute('content');
        const mm = u.match(/-i\.(\d+)\.(\d+)/) || u.match(/\.i\.(\d+)\.(\d+)/);
        if (mm && mm[1] && mm[2]) return { shopId: mm[1], itemId: mm[2] };
    }

    return null;
}

async function fetchOfferLinkGraphQL(itemId, shopId) {
    // Payload baseado no usado pela página oficial de afiliados da Shopee
    const payload = {
        operationName: "batchGetProductOfferLink",
        query: "\n      query batchGetProductOfferLink (\n        $sourceCaller: SourceCaller!\n        $productOfferLinkParams: [ProductOfferLinkParam!]!\n        $advancedLinkParams: AdvancedLinkParams\n      ){\n        productOfferLinks(\n          productOfferLinkParams: $productOfferLinkParams,\n          sourceCaller: $sourceCaller,\n          advancedLinkParams: $advancedLinkParams\n        ) {\n          itemId\n          shopId\n          productOfferLink\n        }\n      }\n      ",
        variables: {
            productOfferLinkParams: [
                {
                    itemId: String(itemId),
                    shopId: Number(shopId),
                    trace: JSON.stringify({ trace_id: `0.${Math.random().toString(36).slice(2)}.100`, list_type: 100, root_trace_id: `0.${Math.random().toString(36).slice(2)}.100`, root_list_type: 100 })
                }
            ],
            sourceCaller: "WEB_SITE_CALLER",
            advancedLinkParams: { subId1: "", subId2: "", subId3: "", subId4: "", subId5: "" }
        }
    };

    // Endpoint preferencial que a página usa (v3 with q param)
    const endpoints = [
        'https://affiliate.shopee.com.br/api/v3/gql?q=productOfferLinks',
        'https://affiliate.shopee.com.br/api/graphql',
        'https://affiliate.shopee.com.br/graphql'
    ];

    // Cabeçalhos base (não incluímos tokens dinâmicos que a página poderia gerar)
    const baseHeaders = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=UTF-8',
        'affiliate-program-type': '1',
        'x-sz-sdk-version': '1.12.21'
    };

    for (const endpoint of endpoints) {
        try {
            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: baseHeaders,
                body: JSON.stringify(payload),
                mode: 'cors',
                credentials: 'include',
                referrer: 'https://affiliate.shopee.com.br/offer/product_offer'
            });

            if (!resp.ok) {
                console.warn('GraphQL returned non-ok:', resp.status, endpoint);
                continue;
            }

            const json = await resp.json();
            if (json && json.data && json.data.productOfferLinks && json.data.productOfferLinks.length) {
                return json.data.productOfferLinks[0].productOfferLink || null;
            }
        } catch (e) {
            console.warn('Erro fetchOfferLinkGraphQL for', endpoint, e);
            // tentar próximo endpoint
        }
    }

    return null;
}

function fetchOfferLinkViaBackground(itemId, shopId, affiliateCode) {
    return new Promise((resolve) => {
        try {
            chrome.runtime.sendMessage({ action: 'fetchOfferLink', itemId: String(itemId), shopId: Number(shopId), affiliateCode }, (response) => {
                resolve(response);
            });
        } catch (e) {
            resolve(null);
        }
    });
}

function fetchCustomLinkViaBackground(originalLink, affiliateCode) {
    return new Promise((resolve) => {
        try {
            chrome.runtime.sendMessage({ action: 'fetchCustomLink', originalLink: String(originalLink), affiliateCode }, (response) => {
                resolve(response);
            });
        } catch (e) {
            resolve(null);
        }
    });
}

function extractPrice() {
    const priceSelectors = [
        '[class*="price"]',
        '.pricTag',
        '[class*="product-price"]',
        'span[class*="price"]'
    ];

    for (let selector of priceSelectors) {
        const priceEl = document.querySelector(selector);
        if (priceEl) {
            const text = priceEl.textContent.trim();
            if (text && /[\d,.]/.test(text)) {
                return text;
            }
        }
    }

    const allText = document.body.innerText;
    const priceMatch = allText.match(/R\$[\s]*[\d.,]+/);
    return priceMatch ? priceMatch[0] : 'Preço não disponível';
}

// Log para debug
console.log('Content script da extensão Shopee Affiliate Link carregado');
