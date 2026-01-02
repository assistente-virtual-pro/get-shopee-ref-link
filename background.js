// Service Worker para a extensão
// Gerencia eventos de background e armazenamento

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Abrir página de boas-vindas quando instalado
        chrome.tabs.create({
            url: 'welcome.html'
        });
    }
});

// Listener para mensagens da extensão
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getAffiliateCode') {
        chrome.storage.local.get(['affiliateCode'], (result) => {
            sendResponse({ affiliateCode: result.affiliateCode || null });
        });
        return true; // Indica que enviaremos a resposta de forma assíncrona
    }
    
    if (request.action === 'fetchOfferLink') {
        // Espera: { itemId, shopId, affiliateCode }
        (async () => {
            try {
                const itemId = String(request.itemId);
                const shopId = Number(request.shopId);
                const affiliateCode = request.affiliateCode || '';

                const payload = {
                    operationName: "batchGetProductOfferLink",
                    query: "\n      query batchGetProductOfferLink (\n        $sourceCaller: SourceCaller!\n        $productOfferLinkParams: [ProductOfferLinkParam!]!\n        $advancedLinkParams: AdvancedLinkParams\n      ){\n        productOfferLinks(\n          productOfferLinkParams: $productOfferLinkParams,\n          sourceCaller: $sourceCaller,\n          advancedLinkParams: $advancedLinkParams\n        ) {\n          itemId\n          shopId\n          productOfferLink\n        }\n      }\n      ",
                    variables: {
                        productOfferLinkParams: [
                            {
                                itemId: itemId,
                                shopId: shopId,
                                trace: JSON.stringify({ trace_id: `0.${Math.random().toString(36).slice(2)}.100`, list_type: 100, root_trace_id: `0.${Math.random().toString(36).slice(2)}.100`, root_list_type: 100 })
                            }
                        ],
                        sourceCaller: "WEB_SITE_CALLER",
                        advancedLinkParams: { subId1: affiliateCode || "", subId2: "", subId3: "", subId4: "", subId5: "" }
                    }
                };

                const endpoint = 'https://affiliate.shopee.com.br/api/v3/gql?q=productOfferLinks';

                const resp = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json; charset=UTF-8',
                        'affiliate-program-type': '1',
                        'x-sz-sdk-version': '1.12.21'
                    },
                    body: JSON.stringify(payload),
                    mode: 'cors',
                    credentials: 'include',
                    referrer: 'https://affiliate.shopee.com.br/offer/product_offer'
                });

                if (!resp.ok) {
                    sendResponse({ success: false, error: `HTTP ${resp.status}` });
                    return;
                }

                const json = await resp.json();
                if (json && json.data && json.data.productOfferLinks && json.data.productOfferLinks.length) {
                    const link = json.data.productOfferLinks[0].productOfferLink || null;
                    sendResponse({ success: true, link });
                    return;
                }

                sendResponse({ success: false, error: 'No link returned' });
            } catch (err) {
                sendResponse({ success: false, error: String(err) });
            }
        })();

        return true; // resposta assíncrona
    }
    
        if (request.action === 'fetchCustomLink') {
            const { originalLink, affiliateCode } = request;
            const payload = {
                operationName: 'batchGetCustomLink',
                variables: {
                    linkParams: [{
                        originalLink: String(originalLink),
                        advancedLinkParams: {
                            subId1: affiliateCode || ''
                        }
                    }],
                    sourceCaller: 'CUSTOM_LINK_CALLER'
                }
            };

            fetch('https://affiliate.shopee.com.br/api/v3/gql?q=batchCustomLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            }).then(res => res.json()).then(json => {
                try {
                    const data = json && json.data && json.data.batchCustomLink && json.data.batchCustomLink[0];
                    if (data) {
                        const link = data.shortLink || data.longLink || null;
                        if (link) {
                            sendResponse({ success: true, link, raw: data });
                        } else {
                            sendResponse({ success: false, raw: data });
                        }
                    } else {
                        sendResponse({ success: false, error: 'no_data' });
                    }
                } catch (e) {
                    sendResponse({ success: false, error: e && e.message });
                }
            }).catch(err => {
                sendResponse({ success: false, error: err && err.message });
            });

            return true;
        }
});
