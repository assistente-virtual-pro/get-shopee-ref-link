// Content script que roda no contexto da página Shopee
// Este script extrai informações do produto

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProductInfo') {
        const productInfo = extractProductInfo();
        
        if (productInfo) {
            sendResponse({
                success: true,
                data: productInfo
            });
        } else {
            sendResponse({
                success: false,
                error: 'Produto não encontrado'
            });
        }
    }
});

function extractProductInfo() {
    // Tentar extrair informações do produto da página
    
    // Padrão 1: Verificar meta tags OG (Open Graph)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (ogTitle && ogUrl) {
        let price = extractPrice();
        
        return {
            name: ogTitle.getAttribute('content'),
            image: ogImage ? ogImage.getAttribute('content') : '',
            url: ogUrl.getAttribute('content'),
            price: price
        };
    }
    
    // Padrão 2: Procurar no estrutura JSON-LD (Schema.org)
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (let script of scripts) {
        try {
            const data = JSON.parse(script.textContent);
            if (data.name && data.url) {
                let price = extractPrice();
                return {
                    name: data.name,
                    image: data.image ? (Array.isArray(data.image) ? data.image[0] : data.image) : '',
                    url: window.location.href,
                    price: price
                };
            }
        } catch (e) {
            // Continuar procurando
        }
    }
    
    // Padrão 3: Procurar elementos específicos da Shopee
    const productName = document.querySelector('.VZhLWJ, h1, [class*="product-name"]');
    const productImage = document.querySelector('img[src*="shopee"], [class*="product-image"] img');
    
    if (productName) {
        let price = extractPrice();
        return {
            name: productName.textContent.trim(),
            image: productImage ? productImage.src : '',
            url: window.location.href,
            price: price
        };
    }
    
    return null;
}

function extractPrice() {
    // Procurar preço na página
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
    
    // Se não encontrar, tentar procurar por padrão de números
    const allText = document.body.innerText;
    const priceMatch = allText.match(/R\$[\s]*[\d.,]+/);
    
    return priceMatch ? priceMatch[0] : 'Preço não disponível';
}

// Log para debug
console.log('Content script da extensão Shopee Affiliate Link carregado');
