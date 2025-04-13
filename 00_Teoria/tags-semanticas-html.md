
# Tags Semânticas (estruturantes) no HTML5

As **tags estruturantes**, também chamadas de **tags semânticas**, ajudam a organizar e dar significado ao conteúdo de uma página HTML. Elas são importantes para a estrutura, acessibilidade e SEO de um site.

---

## Principais Tags Semânticas

### 1. `<header>`
Representa o **cabeçalho** de uma página ou seção. Pode conter:
- Logotipo
- Título
- Menu de navegação

```html
<header>
  <h1>Minha Granja</h1>
  <nav>
    <a href="#">Início</a>
    <a href="#">Produtos</a>
  </nav>
</header>
```

---

### 2. `<nav>`
Usada para **agrupamento de links de navegação**.

```html
<nav>
  <ul>
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="#produtos">Produtos</a></li>
  </ul>
</nav>
```

---

### 3. `<main>`
Define o **conteúdo principal** da página.

```html
<main>
  <h2>Produtos</h2>
  <p>Veja os ovos frescos da nossa granja.</p>
</main>
```

---

### 4. `<section>`
Usada para **seções temáticas** do conteúdo.

```html
<section>
  <h2>Quem Somos</h2>
  <p>A Granja Aval produz ovos desde 1995...</p>
</section>
```

---

### 5. `<article>`
Representa um conteúdo **independente e reutilizável**, como:
- Postagens
- Notícias
- Cards de produtos

```html
<article>
  <h3>Nova linha de ovos caipiras</h3>
  <p>Mais saúde para sua família...</p>
</article>
```

---

### 6. `<aside>`
Conteúdo **complementar ou lateral**.

```html
<aside>
  <h4>Dica da Semana</h4>
  <p>Como armazenar ovos corretamente.</p>
</aside>
```

---

### 7. `<footer>`
Define o **rodapé** da página ou seção. Pode incluir:
- Informações de contato
- Direitos autorais
- Links sociais

```html
<footer>
  <p>&copy; 2025 Granja Aval. Todos os direitos reservados.</p>
</footer>
```

---

## Benefícios do Uso de Tags Semânticas

- Código mais **organizado e legível**
- Melhora a **acessibilidade**
- Favorece o **SEO**
- Facilita a **manutenção**

---
# Exemplo do uso de tags semânticas

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Granja Aval</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Cabeçalho com logo e menu -->
  <header>
    <h1>Granja Aval</h1>
    <nav>
      <ul>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#produtos">Produtos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <!-- Conteúdo principal da página -->
  <main>

    <!-- Seção "Sobre a Granja" -->
    <section id="sobre">
      <h2>Sobre Nós</h2>
      <p>A Granja Aval é referência em ovos caipiras e orgânicos há mais de 25 anos.</p>
    </section>

    <!-- Seção de produtos -->
    <section id="produtos">
      <h2>Nossos Produtos</h2>

      <!-- Um artigo por produto -->
      <article>
        <h3>Ovos Caipiras</h3>
        <p>Ovos de galinhas criadas soltas, com alimentação natural.</p>
      </article>

      <article>
        <h3>Ovos Orgânicos</h3>
        <p>Produzidos com responsabilidade ambiental e sem agrotóxicos.</p>
      </article>
    </section>

  </main>

  <!-- Barra lateral com conteúdo extra -->
  <aside>
    <h4>Dica da Semana</h4>
    <p>Conserve os ovos na geladeira com a ponta fina para baixo.</p>
  </aside>

  <!-- Rodapé da página -->
  <footer>
    <p>&copy; 2025 Granja Aval. Todos os direitos reservados.</p>
    <p>Email: contato@granjaaval.com.br | Tel: (11) 99999-0000</p>
  </footer>

</body>
</html>


```
