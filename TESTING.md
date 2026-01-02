# 🚀 Guia de Teste da Extensão Shopee Affiliate Link

## Pré-requisitos

- Google Chrome ou navegador baseado em Chromium
- Uma conta no Programa de Afiliados Shopee (opcional para teste inicial)

## Instalação Rápida para Desenvolvimento

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/get-shopee-ref-link.git
cd get-shopee-ref-link
```

### 2. Abrir Chrome e Acessar chrome://extensions/
- Abra o Chrome
- Digite `chrome://extensions/` na barra de endereços
- Ou vá em Menu (⋮) > Mais ferramentas > Extensões

### 3. Ativar Modo do Desenvolvedor
- Clique no toggle **"Modo do desenvolvedor"** no canto superior direito

### 4. Carregar Extensão não Empacotada
- Clique no botão **"Carregar extensão não empacotada"**
- Selecione a pasta `get-shopee-ref-link`
- A extensão será instalada e exibida na lista

## Como Testar

### Teste 1: Abrir Página de Boas-vindas
✓ A página de boas-vindas deve abrir automaticamente na primeira instalação

### Teste 2: Acessar Configurações
1. Clique no ícone da extensão (deve aparecer na barra de ferramentas)
2. Clique em "⚙️ Configurar" (ou "Configurar Agora" na página de boas-vindas)
3. Insira um código de afiliado (ex: `meu_codigo_123`)
4. Clique em "Salvar Configurações"
5. Verifique se a mensagem de sucesso apareceu

### Teste 3: Testar em Página de Produto
1. Visite um produto na Shopee: https://shopee.com.br
2. Procure por um produto e clique para abrir
3. Clique no ícone da extensão
4. Você deve ver:
   - Nome do produto
   - Imagem do produto
   - Preço
   - Link de afiliado gerado

### Teste 4: Copiar Link
1. Na popup da extensão, clique no botão 📋 (copiar)
2. A mensagem "✓ Link copiado!" deve aparecer
3. Cole o link em qualquer lugar (Ctrl+V) para verificar se foi copiado

### Teste 5: Compartilhar Link
1. Clique no botão "Compartilhar"
2. Escolha uma opção de compartilhamento (email, WhatsApp, etc.)
3. O link deve ser compartilhado com sucesso

### Teste 6: Abrir Link
1. Clique no botão "Abrir Link"
2. Uma nova aba deve abrir com o link de afiliado

### Teste 7: Múltiplos Produtos
1. Teste em vários produtos diferentes
2. O link deve ser gerado corretamente para cada um

## Depuração

### Console do Desenvolvedor
1. Clique com botão direito na página
2. Selecione "Inspecionar" ou pressione F12
3. Vá para a aba "Console"
4. Procure por mensagens de erro

### Console da Extensão
1. Vá para `chrome://extensions/`
2. Clique em "Detalhes" na extensão
3. Vá para "Visualizações em segundo plano" > "service_worker"
4. Verifique logs e erros

### Verificar Armazenamento
1. Na mesma página de detalhes
2. Clique em "Visualizações em segundo plano" > "inspect views"
3. No DevTools, vá para "Application" > "Local Storage"
4. Verifique se o código de afiliado foi armazenado

## Relatório de Problemas

Se encontrar problemas:

1. Verifique o console para mensagens de erro
2. Tente recarregar a extensão (clique em ↻ na página de extensões)
3. Limpe o cache da página do produto (Ctrl+Shift+Delete)
4. Teste em um produto diferente

### Erros Comuns

**"Não é possível gerar o link nesta página"**
- Certifique-se de estar em uma página de produto
- Recarregue a página
- Tente outro produto

**"Configure seu código de afiliado primeiro"**
- Vá para Configurações (⚙️)
- Insira seu código de afiliado
- Clique em "Salvar"

**Botão de copiar não funciona**
- Verifique as permissões do Chrome para clipboard
- Tente em uma página diferente
- Recarregue a extensão

## Gerar Ícones

Se desejar criar ícones personalizados:

```bash
# Requer ImageMagick
bash generate-icons.sh

# Ou manualmente:
convert -background none -size 16x16 images/icon.svg images/icon-16.png
convert -background none -size 48x48 images/icon.svg images/icon-48.png
convert -background none -size 128x128 images/icon.svg images/icon-128.png
```

## Submeter para Chrome Web Store

Quando estiver pronto para publicar:

1. Crie uma conta em [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
2. Pague a taxa de registro ($5)
3. Prepare recursos (ícone, screenshots, descrição)
4. Faça upload da extensão
5. Envie para análise

## Recursos Úteis

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

---

**Dúvidas?** Abra uma issue no repositório!

**Boa sorte com a extensão!** 🎉
