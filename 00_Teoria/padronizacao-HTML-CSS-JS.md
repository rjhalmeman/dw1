
# 📐 Padronização de Nomenclaturas para Projetos com HTML, CSS e JavaScript

A padronização de nomenclaturas em projetos com **HTML, CSS e JavaScript** é essencial para manter o código organizado, legível e fácil de manter. Abaixo estão as convenções mais comuns para cada linguagem:

---

## 📄 HTML

### ✅ Convenções

- **Nomes de arquivos:**  
  `kebab-case.html` (tudo minúsculo, palavras separadas por hífen)  
  **Ex:** `index.html`, `sobre-nos.html`

- **IDs e classes:**  
  `kebab-case` ou `camelCase`, sendo `kebab-case` mais comum no HTML/CSS.  
  **Ex:** `id="menu-principal"`, `class="card-produto"`

- **Tags semânticas:**  
  Use tags como `section`, `article`, `header`, `footer`, `nav`, em vez de `div`.

---

## 🎨 CSS

### ✅ Convenções

- **Nomes de arquivos:**  
  `kebab-case.css`  
  **Ex:** `style.css`, `layout-base.css`

- **Seletores (IDs e classes):**  
  `kebab-case`  
  **Ex:** `.botao-primario`, `#menu-lateral`

- **Metodologias populares:**  
  - **BEM (Block Element Modifier)** → facilita projetos maiores  
    **Exemplo:**
    ```css
    .menu__item {}        /* elemento */
    .menu__item--ativo {} /* modificador */
    ```

---

## 🧠 JavaScript

### ✅ Convenções

- **Nomes de arquivos:**  
  `camelCase.js` ou `kebab-case.js`  
  **Ex:** `app.js`, `formValidation.js`

- **Variáveis e funções:**  
  `camelCase`  
  **Ex:**  
  ```js
  let userName = "Berola";
  function calculaMedia() {}
  ```

- **Objetos e arrays:**  
  `camelCase`  
  **Ex:**  
  ```js
  const listaProdutos = [];
  ```

- **Classes:**  
  `PascalCase` (primeira letra de cada palavra maiúscula)  
  **Ex:**  
  ```js
  class Aluno {}
  ```

- **Constantes globais:**  
  `UPPER_SNAKE_CASE`  
  **Ex:**  
  ```js
  const API_URL = "https://...";
  ```

---

## 📁 Estrutura de Pastas Recomendada

```
/meu-projeto/
│
├── index.html
├── /css/
│   └── style.css
├── /js/
│   └── script.js
├── /img/
│   └── logo.png
└── /assets/
    └── fontes, ícones, etc.
```


