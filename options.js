// Options script - Gerenciar configurações da extensão

// Elementos DOM
const affiliateCodeInput = document.getElementById('affiliateCode');
const affiliateNameInput = document.getElementById('affiliateName');
const affiliateEmailInput = document.getElementById('affiliateEmail');
const autoOpenCheckbox = document.getElementById('autoOpen');
const showNotificationsCheckbox = document.getElementById('showNotifications');
const trackStatsCheckbox = document.getElementById('trackStats');
const successMessage = document.getElementById('successMessage');

// Constantes de validação
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_CODE_LENGTH = 3;
const MAX_CODE_LENGTH = 50;

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
    const email = affiliateEmailInput.value.trim();
    const name = affiliateNameInput.value.trim();
    
    // Validar código de afiliado
    if (!code) {
        showError('Por favor, insira um código de afiliado.');
        affiliateCodeInput.focus();
        return;
    }
    
    if (code.length < MIN_CODE_LENGTH || code.length > MAX_CODE_LENGTH) {
        showError(`Código deve ter entre ${MIN_CODE_LENGTH} e ${MAX_CODE_LENGTH} caracteres.`);
        affiliateCodeInput.focus();
        return;
    }
    
    // Validar email (se fornecido)
    if (email && !EMAIL_REGEX.test(email)) {
        showError('Email inválido. Por favor, insira um email válido.');
        affiliateEmailInput.focus();
        return;
    }
    
    // Validar nome (máximo 50 caracteres)
    if (name && name.length > 50) {
        showError('Nome deve ter no máximo 50 caracteres.');
        affiliateNameInput.focus();
        return;
    }
    
    const settings = {
        affiliateCode: code,
        affiliateName: name,
        affiliateEmail: email,
        autoOpen: autoOpenCheckbox.checked,
        showNotifications: showNotificationsCheckbox.checked,
        trackStats: trackStatsCheckbox.checked,
        lastSaved: new Date().toISOString()
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
    successMessage.className = 'success-message';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function showError(message) {
    successMessage.textContent = '✗ ' + message;
    successMessage.style.display = 'block';
    successMessage.style.background = '#f8d7da';
    successMessage.style.color = '#721c24';
    successMessage.style.border = '1px solid #f5c6cb';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.className = 'success-message';
        successMessage.style.background = '';
        successMessage.style.color = '';
        successMessage.style.border = '';
    }, 4000);
}

// Salvar ao pressionar Enter
affiliateCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveSettings();
    }
});

// Validar código em tempo real
affiliateCodeInput.addEventListener('input', () => {
    const code = affiliateCodeInput.value.trim();
    if (code.length > MAX_CODE_LENGTH) {
        affiliateCodeInput.value = code.substring(0, MAX_CODE_LENGTH);
    }
});

// Validar email em tempo real
affiliateEmailInput.addEventListener('blur', () => {
    const email = affiliateEmailInput.value.trim();
    if (email && !EMAIL_REGEX.test(email)) {
        affiliateEmailInput.style.borderColor = '#dc3545';
    } else {
        affiliateEmailInput.style.borderColor = '';
    }
});
