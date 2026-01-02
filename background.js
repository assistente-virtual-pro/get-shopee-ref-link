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
});
