# Shopee Affiliate Link Generator - Extensão do Chrome

Uma extensão do Chrome rápida e fácil de usar para gerar links de afiliados de produtos da Shopee com um clique!

## 🎯 Características

- ✨ **Geração Automática de Links**: Gere links de afiliados instantaneamente
- 📋 **Copiar com Um Clique**: Copie links facilmente para compartilhar
- 🎨 **Interface Intuitiva**: Design limpo e fácil de usar
- 🔧 **Configurável**: Defina seu código de afiliado nas configurações
- 🛍️ **Visualização do Produto**: Veja informações do produto (nome, imagem, preço)
- 📱 **Compartilhamento Rápido**: Compartilhe links via Web Share API
- 🌍 **Suporte Shopee Global**: Funciona com shopee.com.br e shopee.com

## 📦 Instalação

### Instalação em Modo Desenvolvimento

1. **Clone ou baixe este repositório**
   ```bash
   git clone https://github.com/seu-usuario/get-shopee-ref-link.git
   ```

2. **Abra o Chrome e vá para a página de extensões**
   - Digite `chrome://extensions/` na barra de endereços
   - Ou vá em Menu > Mais ferramentas > Extensões

3. **Ative o "Modo do desenvolvedor"**
   - Clique no switch no canto superior direito

4. **Clique em "Carregar extensão não empacotada"**
   - Selecione a pasta do projeto (`get-shopee-ref-link`)

5. **Pronto!** A extensão será instalada e aparecerá no seu Chrome

## 🚀 Como Usar

1. **Configure seu código de afiliado**
   - Clique no ícone da extensão
   - Clique em "⚙️ Configurar"
   - Insira seu código de afiliado da Shopee
   - Clique em "Salvar Configurações"

2. **Visite um produto na Shopee**
   - Acesse qualquer página de produto em shopee.com.br ou shopee.com

3. **Clique no ícone da extensão**
   - O popup mostrará os detalhes do produto
   - O link de afiliado será gerado automaticamente

4. **Compartilhe o link**
   - 📋 **Copiar**: Clique no botão de copiar
   - 📤 **Compartilhar**: Use o botão de compartilhamento
   - 🔗 **Abrir**: Abra o link em uma nova aba

## 📋 Estrutura do Projeto

```
get-shopee-ref-link/
├── manifest.json           # Configuração da extensão
├── popup.html             # Interface do popup
├── popup.css              # Estilos do popup
├── popup.js               # Lógica do popup
├── content.js             # Script injetado na página
├── background.js          # Service Worker
├── options.html           # Página de configurações
├── options.js             # Lógica das configurações
├── welcome.html           # Página de boas-vindas
├── images/                # Ícones da extensão
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md              # Este arquivo
```

## 🔧 Configuração

### Arquivo: manifest.json

O arquivo `manifest.json` define as permissões e características da extensão:

- **permissions**: Acesso ao armazenamento, scripts e clipboard
- **host_permissions**: URLs onde a extensão funciona
- **action**: Ícone e popup padrão
- **content_scripts**: Scripts executados no contexto da página

### Armazenamento de Dados

A extensão armazena apenas:
- ✅ Código de afiliado
- ✅ Nome do afiliado (opcional)
- ✅ Email (opcional)
- ✅ Preferências do usuário

**Nenhum dado pessoal é coletado ou compartilhado.**

## 📝 Detalhes Técnicos

### Tecnologias

- **Chrome Manifest V3** - Padrão de segurança mais recente
- **Vanilla JavaScript** - Sem dependências externas
- **Modern CSS** - Estilos responsivos
- **Chrome Storage API** - Armazenamento seguro

### Como Funciona

1. **Content Script** (`content.js`)
   - Detecta se você está em uma página de produto da Shopee
   - Extrai informações (nome, imagem, preço, URL)
   - Responde solicitações do popup

2. **Popup** (`popup.html/js`)
   - Mostra informações do produto
   - Gera link de afiliado com o código armazenado
   - Permite copiar/compartilhar o link

3. **Service Worker** (`background.js`)
   - Gerencia eventos da extensão
   - Abre página de boas-vindas na primeira instalação

4. **Configurações** (`options.html/js`)
   - Interface para gerenciar código de afiliado
   - Armazena preferências do usuário

## 🎨 Geração de Ícones

Para criar ícones personalizados, você pode usar:

- [Figma](https://figma.com) - Design gratuito
- [Adobe XD](https://www.adobe.com/products/xd.html)
- [Canva](https://canva.com) - Ferramentas de design simples

Dimensões necessárias:
- 16x16 px (icon-16.png)
- 48x48 px (icon-48.png)
- 128x128 px (icon-128.png)

## 🐛 Solução de Problemas

### A extensão não aparece no popup
- Certifique-se de estar em uma página de produto da Shopee
- Verifique se o console do desenvolvedor mostra erros (F12)
- Recarregue a página (Ctrl+R)

### O link de afiliado não é gerado
- Verifique se você configurou um código de afiliado
- Clique em "⚙️ Configurar" e insira o código
- Teste com um produto diferente

### Erro ao copiar o link
- O navegador pode estar bloqueando acesso ao clipboard
- Tente novamente em uma página diferente
- Verifique as permissões do Chrome

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 💡 Ideias de Melhorias Futuras

- [ ] Suporte a múltiplos códigos de afiliados
- [ ] Histórico de links gerados
- [ ] Análise de cliques
- [ ] Integração com o programa de afiliados
- [ ] Atalhos de teclado personalizáveis
- [ ] Exportar links em CSV
- [ ] Modo escuro

## 📞 Suporte

Se encontrar problemas ou tiver sugestões:

1. Abra uma [Issue no GitHub](https://github.com/seu-usuario/get-shopee-ref-link/issues)
2. Descreva o problema ou sugestão detalhadamente
3. Anexe screenshots se possível

## 👨‍💻 Autor

**Criado com ❤️ para afiliados da Shopee**

## 🎉 Agradecimentos

- [Shopee Affiliate Program](https://affiliate.shopee.com.br)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- Comunidade de desenvolvedores

---

**Versão 1.0.0** - Janeiro 2026

Aproveite a extensão e bom compartilhamento de links! 🚀
