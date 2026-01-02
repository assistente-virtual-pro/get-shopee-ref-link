/**
 * Utilitários de Logging e Debug
 * Ajuda no desenvolvimento e depuração da extensão
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const CURRENT_LEVEL = LOG_LEVELS.DEBUG; // Altere para LOG_LEVELS.ERROR em produção

class Logger {
  static log(level, message, data = null) {
    if (level < CURRENT_LEVEL) return;
    
    const timestamp = new Date().toISOString();
    const levelName = Object.keys(LOG_LEVELS)[level];
    const prefix = `[${timestamp}] [${levelName}] Shopee Affiliate Link`;
    
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(prefix, message, data);
        break;
      case LOG_LEVELS.INFO:
        console.info(prefix, message, data);
        break;
      case LOG_LEVELS.WARN:
        console.warn(prefix, message, data);
        break;
      case LOG_LEVELS.ERROR:
        console.error(prefix, message, data);
        break;
    }
  }
  
  static debug(message, data = null) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }
  
  static info(message, data = null) {
    this.log(LOG_LEVELS.INFO, message, data);
  }
  
  static warn(message, data = null) {
    this.log(LOG_LEVELS.WARN, message, data);
  }
  
  static error(message, data = null) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }
}

/**
 * Monitorar desempenho da extensão
 */
class PerformanceMonitor {
  static measurements = new Map();
  
  static start(label) {
    this.measurements.set(label, performance.now());
    Logger.debug(`Performance: ${label} iniciado`);
  }
  
  static end(label) {
    if (!this.measurements.has(label)) {
      Logger.warn(`Performance: ${label} não foi iniciado`);
      return;
    }
    
    const startTime = this.measurements.get(label);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    Logger.info(`Performance: ${label} concluído em ${duration}ms`);
    this.measurements.delete(label);
    
    return duration;
  }
}

/**
 * Verificador de Erros
 */
class ErrorHandler {
  static handle(error, context = 'Desconhecido') {
    Logger.error(`Erro em ${context}:`, {
      message: error.message,
      stack: error.stack,
    });
    
    // Notificar usuário em produção
    if (CURRENT_LEVEL === LOG_LEVELS.ERROR) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon-48.png',
        title: 'Erro na Extensão',
        message: `Erro: ${error.message}`
      });
    }
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Logger, PerformanceMonitor, ErrorHandler };
}

// Tornar disponível globalmente
window.Logger = Logger;
window.PerformanceMonitor = PerformanceMonitor;
window.ErrorHandler = ErrorHandler;
