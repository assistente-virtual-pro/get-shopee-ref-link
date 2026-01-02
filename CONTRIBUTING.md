# Contribuindo para Shopee Affiliate Link Generator

Agradecemos seu interesse em contribuir! Este documento fornece diretrizes e instruções para contribuir com este projeto.

## Como Contribuir

### 1. Fork o Repositório
```bash
# Faça um fork em https://github.com/seu-usuario/get-shopee-ref-link
git clone https://github.com/seu-usuario/get-shopee-ref-link.git
cd get-shopee-ref-link
```

### 2. Crie uma Branch para Sua Feature
```bash
git checkout -b feature/nome-da-feature
# ou para bugs:
git checkout -b fix/nome-do-bug
```

### 3. Faça Suas Mudanças
- Modifique o código conforme necessário
- Teste suas mudanças (veja [TESTING.md](TESTING.md))
- Mantenha a coerência com o código existente

### 4. Commit Suas Mudanças
```bash
git add .
git commit -m "Descrição clara da mudança"
# Boas mensagens de commit:
# - Use imperativo: "Add feature" em vez de "Added feature"
# - Seja específico e descritivo
# - Referencie issues se aplicável: "Fix #123"
```

### 5. Push e Abra um Pull Request
```bash
git push origin feature/nome-da-feature
```

Vá para https://github.com/seu-usuario/get-shopee-ref-link/pulls e clique em "New Pull Request"

## Padrões de Código

### JavaScript
- Use `const` por padrão, `let` quando necessário reatribuir
- Use funções arrow quando apropriado
- Adicione comentários para código complexo
- Use nomes de variáveis descritivos

```javascript
// Bom
const affiliateCode = localStorage.getItem('code');

// Evitar
const ac = localStorage.getItem('code');
```

### HTML
- Use semântica HTML5
- Mantenha indentação consistente (2 espaços)
- Use nomes de classe descritivos

### CSS
- Use variáveis CSS quando possível
- Organize por seção (layout, componentes, etc.)
- Use classe ao invés de ID para estilização
- Mantenha especificidade baixa

## Documentação

Se adicionar uma nova feature:
- Atualize o [README.md](README.md) se aplicável
- Adicione comentários no código
- Documente parâmetros de funções
- Atualize [TESTING.md](TESTING.md) com testes

## Testando Antes de Enviar

### Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testado em Chrome (versão atual)
- [ ] Sem erros no console (F12)
- [ ] Funcionalidade existente não foi quebrada
- [ ] Adicionou comentários apropriados
- [ ] Mensagens de commit são claras

## Tipos de Contribuição Bem-vindos

### 🐛 Bug Reports
- Descreva o problema com clareza
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots se possível
- Versão do Chrome

### ✨ Feature Requests
- Descreva a feature desejada
- Caso de uso/benefício
- Exemplos de outras extensões (se aplicável)
- Discussão sobre implementação

### 📚 Documentação
- Correções de ortografia/gramática
- Melhorias de clareza
- Exemplos adicionais
- Tradução para outros idiomas

### 🎨 Melhorias de UI/UX
- Screenshots do design proposto
- Justificativa para mudanças
- Feedback de usabilidade

## Processo de Review

Seus PRs serão revisados para:
- Qualidade do código
- Compatibilidade com o projeto
- Falta de regressões
- Documentação adequada

Esteja aberto a feedback e mudanças solicitadas.

## Nossas Esperanças para Contribuidores

- **Respeito**: Trate todos com respeito
- **Clareza**: Comunique-se claramente
- **Qualidade**: Cuidado com detalhe
- **Colaboração**: Trabalhe junto conosco

## Código de Conduta

Este projeto adere a um Código de Conduta. Esperamos que todos os contribuidores:
- Sejam respeitosos
- Acolham pontos de vista diferentes
- Aceitem críticas construtivas
- Foquem no que é melhor para a comunidade

Comportamento abusivo ou discriminatório não será tolerado.

## Onde Começar

### Boas Primeiras Contribuições
- Issues com label `good-first-issue`
- Melhorias de documentação
- Correções de bugs simples

### Como Encontrar Issues
- [Issues abertos](https://github.com/seu-usuario/get-shopee-ref-link/issues)
- Procure por labels: `help-wanted`, `good-first-issue`
- Comente antes de começar trabalho significativo

## Perguntas?

- Abra uma discussão em [Discussions](https://github.com/seu-usuario/get-shopee-ref-link/discussions)
- Comente em uma issue
- Envie um email para o mantenedor

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

---

**Obrigado por contribuir! 🎉**

Seu código ajudará a melhorar esta extensão para todos os usuários.
