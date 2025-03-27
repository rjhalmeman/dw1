# Unidades de Medida no CSS

No CSS, existem várias unidades de medida para definir tamanhos, espaçamentos e posicionamentos. Aqui estão as principais usadas no seu código e outras comuns:

## **Unidades Absolutas**
- **`px` (pixels)**: Unidade fixa baseada nos pixels da tela.  
  _Exemplo:_ `font-size: 16px;`
- **`pt` (pontos)**: Comum em impressão, equivale a 1/72 de polegada.
- **`cm`, `mm`, `in`**: Medidas físicas, menos usadas no design responsivo.

## **Unidades Relativas**
- **`%` (porcentagem)**: Define valores relativos ao elemento pai.  
  _Exemplo:_ `width: 50%;` (ocupa metade da largura do contêiner).
- **`em`**: Relativo ao tamanho da fonte do elemento pai.  
  _Exemplo:_ `font-size: 2em;` (equivale ao dobro do tamanho da fonte do pai).
- **`rem` (root em)**: Relativo ao tamanho da fonte do `html` (root).  
  _Útil para manter proporção global._
- **`vh` (viewport height)**: Percentual da altura da tela.  
  _Exemplo:_ `height: 100vh;` (ocupa toda a altura visível do navegador).
- **`vw` (viewport width)**: Percentual da largura da tela.  
  _Exemplo:_ `width: 100vw;` (ocupa toda a largura visível).

## **Aplicação no Seu Código**
No seu código HTML + CSS:
- `height: 100vh;` → O `body` ocupa toda a altura da tela.
- `font-size: 2em;` → O número é duas vezes maior que a fonte padrão do `painelCentral`.
- `padding: 20px;` → Adiciona um espaçamento interno fixo de 20 pixels.

Se precisar de mais detalhes ou ajustes, me avise! 🚀
