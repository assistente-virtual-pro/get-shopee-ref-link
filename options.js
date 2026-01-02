// Options script - Gerenciar configurações da extensão

const affiliateCodeInput = document.getElementById('affiliateCode');
const affiliateNameInput = document.getElementById('affiliateName');
const affiliateEmailInput = document.getElementById('affiliateEmail');
const autoOpenCheckbox = document.getElementById('autoOpen');
const showNotificationsCheckbox = document.getElementById('showNotifications');
const trackStatsCheckbox = document.getElementById('trackStats');
const successMessage = document.getElementById('successMessage');

// Carregar configurações ao abrir a página
document.addEventListener('DOMContentLoaded', loadSettings);

function loadSettings() {
    chrome.storage.local.get([
        'affiliateCode',
        'affiliateName',
        'affiliateEmail',
        'autoOpen',
        'showNotifications',
        'trackStats'
    ], (result) => {
        if (result.affiliateCode) {
            affiliateCodeInput.value = result.affiliateCode;
        }
        if (result.affiliateName) {
            affiliateNameInput.value = result.affiliateName;
        }
        if (result.affiliateEmail) {
            affiliateEmailInput.value = result.affiliateEmail;
        }
        
        autoOpenCheckbox.checked = result.autoOpen !== false; // true por padrão
        showNotificationsCheckbox.checked = result.showNotifications !== false;
        trackStatsCheckbox.checked = result.trackStats !== false;
    });
}

function saveSettings() {
    const code = affiliateCodeInput.value.trim();
    
    if (!code) {
        alert('Por favor, insira um código de afiliado.');
        affiliateCodeInput.focus();
        return;
    }
    
    const settings = {
        affiliateCode: code,
        affiliateName: affiliateNameInput.value.trim(),
        affiliateEmail: affiliateEmailInput.value.trim(),
        autoOpen: autoOpenCheckbox.checked,
        showNotifications: showNotificationsCheckbox.checked,
        trackStats: trackStatsCheckbox.checked
    };
    
    chrome.storage.local.set(settings, () => {
        showSuccess();
    });
}

function resetSettings() {
    if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
        chrome.storage.local.clear(() => {
            affiliateCodeInput.value = '';
            affiliateNameInput.value = '';
            affiliateEmailInput.value = '';
            autoOpenCheckbox.checked = true;
            showNotificationsCheckbox.checked = true;
            trackStatsCheckbox.checked = true;
            showSuccess('Configurações resetadas!');
        });
    }
}

function showSuccess(message = 'Configurações salvas com sucesso!') {
    successMessage.textContent = '✓ ' + message;
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Salvar ao pressionar Enter
affiliateCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveSettings();
    }
});
