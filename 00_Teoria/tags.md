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

## Principais Atributos da Tag `<input>`

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



