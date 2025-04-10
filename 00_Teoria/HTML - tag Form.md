### Tag `<form>`

A tag `<form>` cria um formulário HTML que permite ao usuário disparar ações através de botões ou campos. O envio pode ser tratado com JavaScript, sem necessidade de servidor.

```html
<form onsubmit="minhaFuncao(event)">
  <!-- Campos ou botões -->
</form>
```

---

## Atributos principais

| Atributo | Descrição                                                                  |
| -------- | -------------------------------------------------------------------------- |
| `action` | (Opcional) URL que receberia os dados. Ignorado se usar JavaScript.        |
| `method` | Define o tipo de envio (`get`, `post`, etc). Relevante se houver `action`. |

---

## Métodos mais usados

### GET

- Dados aparecem na URL.
- Útil para buscas, filtros e links.

```html
<form method="get">
  <button type="submit" name="filtro" value="tudo">Ver Tudo</button>
</form>
```

### POST

- Dados não aparecem na URL.
- Preferido para ações como salvar ou confirmar.

```html
<form method="post" onsubmit="enviar(event)">
  <button type="submit" name="acao" value="salvar">Salvar</button>
</form>
```

---

## Tratando envio com JavaScript

```html
<form onsubmit="enviar(event)">
  <button type="submit">Executar Ação</button>
</form>

<script>
  function enviar(event) {
    event.preventDefault(); // Impede o envio padrão
    alert("Formulário enviado!");
  }
</script>
```

---

## Métodos menos comuns

- PUT
- DELETE
- PATCH

Esses métodos são usados principalmente em aplicações com APIs. Não funcionam diretamente no `<form>` sem auxílio de JavaScript ou bibliotecas externas.

---

## Exemplo completo

```html
<form onsubmit="executar(event)">
  <button type="submit" name="acao" value="confirmar">Confirmar</button>
  <button type="submit" name="acao" value="cancelar">Cancelar</button>
</form>

<script>
  function executar(event) {
    event.preventDefault();
    const botao = event.submitter;
    alert("Você clicou em: " + botao.value);
  }
</script>
```
