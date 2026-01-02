# ⚙️ Guia de Configuração Avançada

## Configurações da Extensão

### 1. **Código de Afiliado** (Obrigatório)
- **Formato**: Alfanumérico (letras, números, hífen, underscore)
- **Comprimento**: 3-50 caracteres
- **Exemplo**: `meu_afiliado_123`
- **Onde obter**: [Shopee Affiliate Program](https://affiliate.shopee.com.br)

### 2. **Nome de Afiliado** (Opcional)
- **Máximo**: 50 caracteres
- **Uso**: Para identificação pessoal
- **Exemplo**: "Meu Negócio Online"

### 3. **Email** (Opcional)
- **Formato**: Email válido (exemplo@email.com)
- **Uso**: Para contato e relatórios
- **Validação**: Verifica em tempo real

### 4. **Preferências**

#### Copiar Link Automaticamente
- Copia o link quando você abre a popup
- ✅ Ativado por padrão

#### Notificações
- Mostra mensagens de sucesso/erro
- ✅ Ativado por padrão

#### Rastreamento
- Permite análise de uso anônima
- ✅ Ativado por padrão

---

## Variáveis de Ambiente

Se você estiver desenvolvendo, pode configurar variáveis no navegador:

```javascript
// No Console do Chrome (F12):
localStorage.setItem('DEBUG_MODE', 'true');
localStorage.setItem('LOG_LEVEL', 'DEBUG');
```

---

## Arquivos de Configuração

### `manifest.json`
Define metadados e permissões da extensão.

**Seções principais:**
- `permissions`: O que a extensão pode acessar
- `host_permissions`: Sites onde funciona
- `background`: Service Worker
- `content_scripts`: Scripts injetados

### `options.html`
Página de configurações do usuário.

**Campo**: Código de afiliado, nome, email
**Botões**: Salvar, Resetar

### `popup.html`
Interface principal que aparece ao clicar no ícone.

**Mostra**: Nome do produto, preço, imagem
**Botões**: Copiar, Compartilhar, Abrir Link

---

## Validação de Dados

### Código de Afiliado
✓ Mínimo 3 caracteres
✓ Máximo 50 caracteres
✓ Apenas alfanuméricos, hífen e underscore
✗ Não pode estar vazio

### Email
✓ Deve conter @ e domínio
✓ Validado com regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
✓ Opcional (deixe em branco se não quiser)

### Nome
✓ Máximo 50 caracteres
✓ Opcional

---

## Armazenamento de Dados

Os dados são salvos localmente usando `chrome.storage.local`:

```javascript
// Estrutura do armazenamento:
{
  "affiliateCode": "seu_codigo",
  "affiliateName": "Seu Nome",
  "affiliateEmail": "seu@email.com",
  "autoOpen": true,
  "showNotifications": true,
  "trackStats": true,
  "lastSaved": "2026-01-02T05:30:00.000Z"
}
```

---

## Resetar Configurações

1. Abra a página de opções (⚙️)
2. Clique em "Resetar"
3. Confirme a ação
4. Todos os dados serão apagados

---

## Dicas e Truques

### 1. Múltiplos Códigos de Afiliado
A extensão suporta apenas um código por vez. Para usar múltiplos:
- Crie múltiplos perfis do Chrome
- Ou use a extensão em navegadores diferentes

### 2. Compartilhar Links
O botão "Compartilhar" usa:
- **Web Share API** (se disponível no navegador)
- **Fallback**: Copia para clipboard

### 3. Atalhos de Teclado
- **Salvar** (em Configurações): Pressione `Enter`

### 4. Debug
Abra o console (F12) para ver logs detalhados:
```javascript
// Ver todas as configurações salvas
chrome.storage.local.get(null, console.log);

// Limpar todo armazenamento
chrome.storage.local.clear();
```

---

## Segurança

### O que a Extensão Faz
✅ Armazena dados localmente no seu navegador
✅ Não envia dados para servidores
✅ Apenas adiciona parâmetro à URL do produto
✅ Não coleta dados de navegação

### Permissões Usadas
- `storage`: Salvar configurações
- `clipboardWrite`: Copiar links
- `activeTab`: Obter página atual
- `scripting`: Executar scripts em páginas Shopee
- `tabs`: Abrir novas abas

---

## Solução de Problemas

### Extensão não funciona
1. Verifique se está em shopee.com.br ou shopee.com
2. Recarregue a página (Ctrl+R)
3. Recarregue a extensão (F5 em chrome://extensions/)

### Código não é salvo
1. Verifique as permissões do Chrome
2. Abra DevTools (F12) > Application > Local Storage
3. Verifique se há erros no Console

### Link não é copiado
1. Verifique as permissões de clipboard
2. Teste com Ctrl+C em um campo de texto
3. Tente novamente em uma página diferente

---

## Contato e Suporte

- 📧 Email: suporte@seu-email.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/get-shopee-ref-link/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/seu-usuario/get-shopee-ref-link/discussions)

---

**Versão**: 1.0.0
**Última Atualização**: Janeiro 2026
