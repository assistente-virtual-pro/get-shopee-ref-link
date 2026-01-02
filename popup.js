// Variáveis globais
let currentProductData = null;

// Elementos DOM
const loadingEl = document.getElementById('loading');
const productInfoEl = document.getElementById('product-info');
const errorEl = document.getElementById('error');
const noAffiliateEl = document.getElementById('no-affiliate');
const settingsEl = document.getElementById('settings');
const successMessageEl = document.getElementById('successMessage');

const productImageEl = document.getElementById('productImage');
const productNameEl = document.getElementById('productName');
const productPriceEl = document.getElementById('productPrice');
const affiliateLinkEl = document.getElementById('affiliateLink');
const affiliateCodeInput = document.getElementById('affiliateCode');

// Botões
const copyBtnEl = document.getElementById('copyBtn');
const shareBtnEl = document.getElementById('shareBtn');
const openLinkBtnEl = document.getElementById('openLinkBtn');
const settingsBtnEl = document.getElementById('settingsBtn');
const saveAffiliateBtnEl = document.getElementById('saveAffiliateCode');
const setupBtnEl = document.getElementById('setupBtn');

// Event Listeners
copyBtnEl.addEventListener('click', copyToClipboard);
shareBtnEl.addEventListener('click', shareLink);
openLinkBtnEl.addEventListener('click', openLink);
settingsBtnEl.addEventListener('click', showSettings);
saveAffiliateBtnEl.addEventListener('click', saveAffiliateCode);
setupBtnEl.addEventListener('click', showSettings);

// Inicializar ao abrir o popup
document.addEventListener('DOMContentLoaded', initializePopup);

async function initializePopup() {
    try {
        // Obter dados do produto da aba ativa
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) {
            showError();
            return;
        }
        
        // Obter código de afiliado e enviar mensagem para o content script
        const affiliateCode = await getStoredAffiliateCode();
        let response;
        try {
            response = await chrome.tabs.sendMessage(tab.id, { action: 'getProductInfo', affiliateCode });
        } catch (error) {
            console.warn('Erro ao enviar mensagem:', error);
            showError();
            return;
        }
        
        if (response && response.success) {
            currentProductData = response.data;

            if (!affiliateCode) {
                showNoAffiliateMessage();
            } else {
                generateAffiliateLink();
                showProductInfo();
            }
        } else {
            showError();
        }
    } catch (error) {
        console.error('Erro ao inicializar popup:', error);
        showError();
    }
}

async function getStoredAffiliateCode() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['affiliateCode'], (result) => {
            resolve(result.affiliateCode || null);
        });
    });
}

async function saveAffiliateCode() {
    const code = affiliateCodeInput.value.trim();
    
    if (!code) {
        alert('Por favor, insira um código de afiliado.');
        return;
    }
    
    chrome.storage.local.set({ affiliateCode: code }, () => {
        alert('Código de afiliado salvo com sucesso!');
        settingsEl.style.display = 'none';
        
        if (currentProductData) {
            generateAffiliateLink();
            showProductInfo();
        }
    });
}

function showSettings() {
    const affiliateCode = affiliateCodeInput.value;
    
    if (!affiliateCode) {
        getStoredAffiliateCode().then((code) => {
            affiliateCodeInput.value = code || '';
        });
    }
    
    settingsEl.style.display = 'block';
    productInfoEl.style.display = 'none';
    noAffiliateEl.style.display = 'none';
}

function showNoAffiliateMessage() {
    loadingEl.style.display = 'none';
    productInfoEl.style.display = 'none';
    noAffiliateEl.style.display = 'block';
    errorEl.style.display = 'none';
}

function showError() {
    loadingEl.style.display = 'none';
    productInfoEl.style.display = 'none';
    noAffiliateEl.style.display = 'none';
    errorEl.style.display = 'block';
}

function showProductInfo() {
    loadingEl.style.display = 'none';
    productInfoEl.style.display = 'block';
    noAffiliateEl.style.display = 'none';
    errorEl.style.display = 'none';
}

async function generateAffiliateLink() {
    const affiliateCode = await getStoredAffiliateCode();
    
    if (!affiliateCode || !currentProductData) {
        return;
    }
    // Se o content script retornou um offerLink encurtado, priorize-o
    if (currentProductData.offerLink) {
        affiliateLinkEl.value = currentProductData.offerLink;
        return;
    }

    const baseUrl = currentProductData.url;
    // Adicionar código de afiliado à URL como fallback
    let affiliateLink;
    if (baseUrl.includes('?')) {
        affiliateLink = `${baseUrl}&affiliate_code=${encodeURIComponent(affiliateCode)}`;
    } else {
        affiliateLink = `${baseUrl}?affiliate_code=${encodeURIComponent(affiliateCode)}`;
    }

    affiliateLinkEl.value = affiliateLink;
}

function copyToClipboard() {
    const link = affiliateLinkEl.value;
    
    if (!link) {
        return;
    }
    
    navigator.clipboard.writeText(link).then(() => {
        // Mostrar mensagem de sucesso
        successMessageEl.style.display = 'block';
        setTimeout(() => {
            successMessageEl.style.display = 'none';
        }, 2000);
    }).catch((err) => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar para a área de transferência.');
    });
}

function shareLink() {
    const link = affiliateLinkEl.value;
    const title = productNameEl.textContent;
    
    if (!link) {
        return;
    }
    
    // Verificar se o navegador suporta Web Share API
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Confira este produto: ${title}`,
            url: link
        }).catch((err) => {
            if (err.name !== 'AbortError') {
                console.error('Erro ao compartilhar:', err);
            }
        });
    } else {
        // Fallback: copiar link
        copyToClipboard();
    }
}

function openLink() {
    const link = affiliateLinkEl.value;
    
    if (link) {
        chrome.tabs.create({ url: link });
    }
}

// Popular dados do produto
function populateProductData() {
    if (!currentProductData) {
        return;
    }
    
    productImageEl.src = currentProductData.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
    productNameEl.textContent = currentProductData.name || 'Produto';
    productPriceEl.textContent = currentProductData.price || 'Preço não disponível';
}

// Atualizar dados do produto quando showProductInfo é chamado
const originalShowProductInfo = showProductInfo;
showProductInfo = function() {
    originalShowProductInfo.call(this);
    populateProductData();
};
