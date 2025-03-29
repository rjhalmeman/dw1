# Tags HTML


# A Tag `<input>` 

A tag `<input>` é um dos principais elementos de formulários no HTML. Ela é usada para capturar dados do usuário e pode representar diferentes tipos de campos, dependendo do valor do atributo `type`.

---

## Exemplo Básico

```html
<label for= "inputNome">Nome</label>
<input type="text" placeholder="Digite seu nome" id="inputNome">
```
Será exibido no navegador assim:

<label for= "inputNome">Nome</label>
<input type="text" placeholder="Digite seu nome" id="inputNome">

## Principais atributos da Tag `<input>`

| **Atributo**     | **Descrição** |
|------------------|--------------|
| `type`          | Define o tipo do campo (texto, senha, número, etc.). |
| `name`          | Nome do campo, usado para identificar o dado enviado no formulário. |
| `value`         | Define um valor inicial para o campo. |
| `placeholder`   | Texto exibido dentro do campo antes do usuário digitar. |
| `required`      | Torna o campo obrigatório. |
| `disabled`      | Desativa o campo, impedindo sua edição. |
| `readonly`      | Permite exibir um valor sem permitir edição. |
| `maxlength`     | Define o número máximo de caracteres que podem ser digitados. |
| `min` e `max`   | Definem os valores mínimo e máximo para tipos numéricos (`number`, `date`, etc.). |
| `step`          | Define o incremento dos valores em campos numéricos. |
| `autocomplete`  | Indica se o navegador deve sugerir preenchimento automático (`on` ou `off`). |
| `autofocus`     | Faz com que o campo receba o foco automaticamente ao carregar a página. |
| `pattern`       | Expressão regular que define um formato válido para o campo. |
| `size`          | Define a largura do campo em número de caracteres visíveis. |
| `multiple`      | Permite a seleção de múltiplos arquivos em campos do tipo `file`. |
| `list`          | Associa o campo a um `<datalist>` para sugerir valores. |

### Principais tipos (type) de input 

| Tipo (type)       | Descrição                                           |
|-------------------|-----------------------------------------------------|
| `text`              | Campo de texto simples.                            |
| number            | Permite apenas números.                           |
| button            | Botão genérico para executar uma ação.            |
| date              | Exibe um seletor de data.                          |
| password          | Campo de senha (os caracteres digitados são ocultados). |
| email             | Aceita apenas e-mails válidos.                    |
| checkbox          | Caixa de seleção (marcar/desmarcar).               |
| radio             | Botões de opção (seleção única dentro de um grupo). |
| file              | Permite upload de arquivos.                        |
| time              | Exibe um seletor de horário.                       |
| datetime-local    | Exibe um seletor de data e hora.                   |
| color             | Exibe um seletor de cores.                         |
| range             | Cria um controle deslizante numérico.              |
| tel               | Campo para entrada de telefone.                    |
| search            | Campo otimizado para pesquisas.                    |
| url               | Aceita apenas URLs válidas.                       |
| submit            | Botão para enviar o formulário.                    |
| reset             | Botão para limpar todos os campos do formulário.   |
| hidden            | Armazena dados não visíveis ou editáveis pelo usuário. |
| image             | Botão de envio representado por uma imagem.        |
| month             | Seletor de mês e ano.                              |
| week              | Seletor de semana e ano.   

---

# A Tag `<span>`

A tag <span> é um elemento HTML inline usado para agrupar e estilizar partes específicas do conteúdo dentro de um bloco de texto sem afetar sua estrutura. Diferente de <div>, que é um elemento block-level, o <span> não quebra a linha e permite aplicar estilos ou manipular trechos específicos dentro de um parágrafo ou outro elemento de texto.

### Principais usos do `<span>`
Aplicar estilos a partes específicas do texto:


```<p>O céu é <span style="color: blue;">azul</span>.</p>```

Aqui, apenas a palavra "azul" ficará azul, enquanto o restante do texto mantém seu estilo padrão.

<p>O céu é <span style="color: blue;">azul</span>.</p>



### Usado para JavaScript interativo:

<p>Valor total: R$ <span id="preco">100</span></p>
<script>
    document.getElementById("preco").textContent = "150";
</script>
Isso altera dinamicamente o valor exibido dentro do <span>.

Destaque sem modificar a estrutura do layout:

<p>O <span class="destaque">futuro</span> é brilhante.</p>
<style>
    .destaque {
        background-color: yellow;
        font-weight: bold;
    }
</style>

Aqui, a palavra "futuro" terá um fundo amarelo e ficará em negrito, sem alterar a disposição dos elementos.

Resumo

Inline: `Não quebra a linha` como <div>.

Sem significado semântico: apenas serve para aplicar estilos ou manipular partes do texto.

Ideal para destacar ou modificar partes do conteúdo dentro de um bloco de texto.

---

# Tag `<button>` 

O `<button>` é uma tag HTML usada para criar botões interativos em uma página da web.  

---

## Sintaxe Básica
```html
<button>Clique aqui</button>
```

---

## 🔹 **Atributos Comuns**
### 🔹 `type`
Define o comportamento do botão:
- `button` (padrão): Um botão comum.
- `submit`: Envia um formulário.
- `reset`: Reseta os campos do formulário.

```html
<button type="submit">Enviar</button>
```

### 🔹 `disabled`
Desabilita o botão.  
```html
<button disabled>Indisponível</button>
```

### 🔹 `onclick`
Especifica um evento de clique em JavaScript.  
```html
<button onclick="alert('Botão clicado!')">Clique</button>
```

### 🔹 `class` e `id`
Usados para estilização com CSS.  
```html
<button class="btn-azul">Botão Azul</button>
```

---

## 🖼 **Botão com Ícone**
Você pode usar um ícone dentro do botão com **FontAwesome** ou **SVG**:

```html
<button>
  <i class="fas fa-check"></i> Confirmar
</button>
```

---

## 🎨 **Estilizando com CSS**
```css
button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
```

---

## 📩 **Botão Dentro de um Formulário**
```html
<form action="/enviar" method="post">
  <button type="submit">Enviar Formulário</button>
</form>
```
---
# 📌 Tag `<div>` 

A tag `<div>` é um elemento genérico de contêiner no HTML, usado para agrupar elementos e aplicar estilos ou scripts a eles.  

---

## 📌 **Sintaxe Básica**  
```html
<div>
  Conteúdo dentro da div
</div>
```

---

## 🔹 **Atributos Comuns**
### 🔹 `id`
Define um identificador único para a `<div>`, útil para JavaScript e CSS.  
```html
<div id="meuContainer">
  Conteúdo aqui
</div>
```

### 🔹 `class`
Permite agrupar várias `<div>`s com o mesmo estilo.  
```html
<div class="container">
  Conteúdo 1
</div>
<div class="container">
  Conteúdo 2
</div>
```

### 🔹 `style`
Adiciona estilos diretamente no elemento (não recomendado para projetos grandes).  
```html
<div style="background-color: lightgray; padding: 10px;">
  Caixa com fundo cinza
</div>
```

---

## 🎨 **Estilizando com CSS**
```css
.container {
  width: 300px;
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
```

```html
<div class="container">
  Caixa estilizada com CSS
</div>
```

---

## 📦 **Uso da `<div>` como Layout**
A `<div>` é amplamente usada para estruturar layouts de páginas da web.  

```html
<div class="header">Cabeçalho</div>
<div class="content">Conteúdo principal</div>
<div class="footer">Rodapé</div>
```

```css
.header, .content, .footer {
  padding: 20px;
  text-align: center;
}
.header {
  background-color: #007bff;
  color: white;
}
.content {
  background-color: #f8f9fa;
}
.footer {
  background-color: #343a40;
  color: white;
}
```

---

## 🏗 **Exemplo Completo de Layout**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo de Layout</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      width: 80%;
      margin: auto;
      border: 1px solid #ddd;
      padding: 20px;
    }
    .header, .footer {
      background-color: #007bff;
      color: white;
      text-align: center;
      padding: 10px;
    }
    .content {
      background-color: #f8f9fa;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Cabeçalho</div>
    <div class="content">Conteúdo Principal</div>
    <div class="footer">Rodapé</div>
  </div>
</body>
</html>
```

--- 

# 📌 Tag `<label>`  

A tag `<label>` é usada para associar um rótulo descritivo a um elemento de entrada (como `<input>`, `<textarea>`, etc.), melhorando a acessibilidade e a usabilidade dos formulários.  

---

## 📌 **Sintaxe Básica**  
```html
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome">
```

---

## 🔹 **Atributos Comuns**
### 🔹 `for`
Conecta o `<label>` a um campo de entrada específico através do `id`.  
```html
<label for="email">E-mail:</label>
<input type="email" id="email" name="email">
```
Ao clicar no `<label>`, o cursor será automaticamente posicionado no campo de entrada associado.

### 🔹 `id`
Se usado sem `for`, o `<label>` pode englobar um `<input>` diretamente.  
```html
<label>
  Aceito os termos
  <input type="checkbox" name="termos">
</label>
```

---

## 🎨 **Estilizando com CSS**
```css
label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

```html
<label for="senha">Senha:</label>
<input type="password" id="senha" name="senha">
```

---

## 📦 **Exemplo Completo de Formulário**
```html
<form action="/enviar" method="post">
  <label for="usuario">Usuário:</label>
  <input type="text" id="usuario" name="usuario">

  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha">

  <button type="submit">Entrar</button>
</form>
```

---

## 🏗 **Exemplo com Acessibilidade**
```html
<form>
  <fieldset>
    <legend>Cadastro</legend>
    
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome">

    <label for="email">E-mail:</label>
    <input type="email" id="email" name="email">

    <label>
      <input type="checkbox" name="notificacoes">
      Quero receber notificações
    </label>

    <button type="submit">Enviar</button>
  </fieldset>
</form>
```

# 📌 Tag `<form>` no HTML  

A tag `<form>` é usada para criar formulários interativos que permitem a entrada e o envio de dados para um servidor.  

---

## 📌 **Sintaxe Básica**  
```html
<form action="/enviar" method="post">
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome">
  
  <button type="submit">Enviar</button>
</form>
```

---

## 🔹 **Atributos Comuns**
### 🔹 `action`
Define para onde os dados do formulário serão enviados.  
```html
<form action="/processa-dados">
```

### 🔹 `method`
Especifica o método HTTP usado para enviar os dados.  
- **`GET`**: Envia os dados na URL (bom para buscas).  
- **`POST`**: Envia os dados no corpo da requisição (mais seguro para dados sensíveis).  

```html
<form action="/cadastrar" method="post">
```

### 🔹 `enctype`
Define a codificação dos dados enviados (necessário para envio de arquivos).  
```html
<form action="/upload" method="post" enctype="multipart/form-data">
```

---

## 🎨 **Estilizando com CSS**
```css
form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
input, button {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
```

```html
<form>
  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Enviar</button>
</form>
```

---

## 📦 **Exemplo Completo de Formulário**
```html
<form action="/registro" method="post">
  <label for="usuario">Usuário:</label>
  <input type="text" id="usuario" name="usuario" required>

  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha" required>

  <label>
    <input type="checkbox" name="termos" required>
    Aceito os termos de uso
  </label>

  <button type="submit">Registrar</button>
</form>
```

---

## 🏗 **Exemplo com Vários Campos**
```html
<form action="/contato" method="post">
  <fieldset>
    <legend>Contato</legend>

    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required>

    <label for="email">E-mail:</label>
    <input type="email" id="email" name="email" required>

    <label for="mensagem">Mensagem:</label>
    <textarea id="mensagem" name="mensagem" rows="4" required></textarea>

    <button type="submit">Enviar</button>
  </fieldset>
</form>
```


