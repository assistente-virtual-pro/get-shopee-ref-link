/**
 * Arquivo de Configuração Global da Extensão
 * Define constantes, validações e configurações padrão
 */

// ============================================
// CONFIGURAÇÕES DE VALIDAÇÃO
// ============================================

export const VALIDATION = {
  // Código de Afiliado
  AFFILIATE_CODE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  
  // Email
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  // Nome
  NAME: {
    MAX_LENGTH: 50,
  }
};

// ============================================
// URLs SUPORTADAS
// ============================================

export const SUPPORTED_SITES = {
  SHOPEE_BR: 'https://shopee.com.br/*',
  SHOPEE_COM: 'https://shopee.com/*',
};

// ============================================
// CONFIGURAÇÕES PADRÃO
// ============================================

export const DEFAULT_SETTINGS = {
  affiliateCode: '',
  affiliateName: '',
  affiliateEmail: '',
  autoOpen: true,
  showNotifications: true,
  trackStats: true,
  lastSaved: null,
};

// ============================================
// MENSAGENS
// ============================================

export const MESSAGES = {
  SUCCESS: {
    SAVED: 'Configurações salvas com sucesso!',
    COPIED: 'Link copiado para a área de transferência!',
    RESET: 'Configurações resetadas!',
  },
  
  ERROR: {
    REQUIRED_CODE: 'Por favor, insira um código de afiliado.',
    INVALID_CODE_LENGTH: (min, max) => 
      `Código deve ter entre ${min} e ${max} caracteres.`,
    INVALID_EMAIL: 'Email inválido. Por favor, insira um email válido.',
    INVALID_NAME_LENGTH: 'Nome deve ter no máximo 50 caracteres.',
    PRODUCT_NOT_FOUND: 'Não é possível gerar o link nesta página.',
    SETUP_REQUIRED: 'Configure seu código de afiliado primeiro!',
    COPY_FAILED: 'Erro ao copiar para a área de transferência.',
  },
  
  INFO: {
    LOADING: 'Carregando...',
    CONFIGURE: 'Confira um produto Shopee para continuar.',
  }
};

// ============================================
// TIMEOUT PADRÃO
// ============================================

export const TIMEOUTS = {
  SUCCESS_MESSAGE: 3000,
  ERROR_MESSAGE: 4000,
  NOTIFICATION: 5000,
};

// ============================================
// NOMES DE ARMAZENAMENTO
// ============================================

export const STORAGE_KEYS = {
  AFFILIATE_CODE: 'affiliateCode',
  AFFILIATE_NAME: 'affiliateName',
  AFFILIATE_EMAIL: 'affiliateEmail',
  AUTO_OPEN: 'autoOpen',
  SHOW_NOTIFICATIONS: 'showNotifications',
  TRACK_STATS: 'trackStats',
  LAST_SAVED: 'lastSaved',
  HISTORY: 'linkHistory',
};

// ============================================
// ÍCONES E RECURSOS
// ============================================

export const ICONS = {
  SUCCESS: '✓',
  ERROR: '✗',
  WARNING: '⚠',
  INFO: 'ℹ',
  LOADING: '⋯',
};

// ============================================
// VERSÃO
// ============================================

export const VERSION = '1.0.0';
