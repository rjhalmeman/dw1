# DW1
# Tutorial para Desenvolvimento WEB 1 
---
## Desenvolvimento WEB



# O que é Desenvolvimento Web?

Desenvolvimento web é o processo de criação e manutenção de sites e aplicações na internet. Envolve várias etapas, como o planejamento, o design, a programação e a implementação de funcionalidades. O desenvolvimento web pode ser dividido em duas áreas principais:

## 1. Frontend (ou Desenvolvimento do Lado do Cliente)
- Refere-se ao que os usuários veem e interagem diretamente em um site ou aplicação.
- É responsável pelo design, layout, estrutura e interação do site.
- As tecnologias mais comuns incluem **HTML** (estrutura), **CSS** (estilo) e **JavaScript** (interatividade).
- Frameworks como **React**, **Vue** ou **Angular** são frequentemente usados para melhorar a experiência do desenvolvedor e a performance.

## 2. Backend (ou Desenvolvimento do Lado do Servidor)
- Refere-se à parte do desenvolvimento que lida com o servidor, banco de dados e a lógica de negócios por trás das funcionalidades de um site.
- É responsável por processar as solicitações feitas pelo frontend, interagir com bancos de dados e retornar as respostas adequadas.
- Linguagens como **Node.js**, **Python**, **Ruby**, **PHP** e **Java** são comumente usadas para desenvolvimento backend.
- Tecnologias de banco de dados, como **MySQL**, **MongoDB** e **PostgreSQL**, também são essenciais para armazenar e manipular dados.

O desenvolvimento web pode ser voltado para a criação de **sites estáticos** (que não mudam após serem carregados) ou **dinâmicos** (onde o conteúdo muda com base nas interações do usuário ou dados externos).

Além disso, o desenvolvimento de aplicações web também pode envolver o uso de **APIs** (interfaces de programação de aplicativos), que permitem a comunicação entre diferentes sistemas.

É uma área essencial para a criação de experiências digitais na web, seja para sites pessoais, blogs, redes sociais, e-commerce ou aplicações corporativas.


## MVC

# Arquitetura MVC no Desenvolvimento Web

A arquitetura **MVC** (Model-View-Controller) é um padrão de design utilizado para organizar o código em aplicações, especialmente no desenvolvimento web. O objetivo do MVC é separar a lógica de negócios, a interface de usuário e o controle de fluxo de dados, promovendo um código mais modular, fácil de manter e escalar.

## Componentes do MVC

1. **Model (Modelo)**
   - O **Model** é responsável pela lógica de negócios e pelo acesso aos dados.
   - Ele interage com o banco de dados ou qualquer outra fonte de dados, realizando operações como criar, ler, atualizar e excluir (CRUD).
   - O Model contém as regras de negócio e validações dos dados, mas não tem conhecimento sobre a interface do usuário.

2. **View (Visão)**
   - A **View** é responsável pela apresentação dos dados ao usuário.
   - Ela exibe o conteúdo vindo do **Model** e pode ser atualizada conforme o usuário interage com a aplicação.
   - No contexto de uma aplicação web, a View pode ser um arquivo HTML, com estilos CSS e scripts JavaScript que exibem a interface de forma dinâmica.

3. **Controller (Controlador)**
   - O **Controller** atua como intermediário entre o **Model** e a **View**.
   - Ele recebe as entradas do usuário através da **View**, processa essas entradas (geralmente manipulando dados no **Model**) e retorna as atualizações necessárias para a **View**.
   - O Controller é o responsável por tomar decisões sobre o que o aplicativo deve fazer com base nas ações do usuário, como redirecionar para uma nova página ou atualizar um componente específico da interface.

## Fluxo de Dados no MVC

1. O **usuário** interage com a **View** (interface).
2. A **View** envia os dados ou comandos para o **Controller**.
3. O **Controller** processa as informações e solicita ao **Model** que execute as operações necessárias (acesso ao banco de dados, cálculos, etc.).
4. O **Model** retorna os resultados ou altera o estado dos dados.
5. O **Controller** atualiza a **View** com as novas informações ou mudanças.

## Vantagens do MVC no Desenvolvimento Web

- **Separação de responsabilidades**: Cada componente (Model, View, Controller) tem uma responsabilidade bem definida, facilitando o desenvolvimento e a manutenção do código.
- **Facilidade de manutenção**: Como o código está organizado em partes independentes, alterações em uma camada (como a interface de usuário) podem ser feitas sem afetar as outras camadas.
- **Escalabilidade**: A arquitetura MVC permite que a aplicação seja facilmente escalada, com cada componente podendo ser desenvolvido ou otimizado independentemente.
- **Reusabilidade de código**: O **Model** pode ser reutilizado por diferentes **Views** e **Controllers**, promovendo uma maior reutilização do código.
- **Testabilidade**: A separação das camadas facilita o teste de cada componente individualmente.

## Exemplo de MVC em Desenvolvimento Web

Imagine uma aplicação de blog:

- **Model**: A lógica para acessar o banco de dados e manipular postagens (criar, ler, atualizar, excluir).
- **View**: A página HTML que exibe os posts, formulários de edição, etc.
- **Controller**: A lógica que recebe as ações do usuário (como salvar uma postagem ou editar um post) e interage com o Model para atualizar a View.

## Conclusão

A arquitetura **MVC** é amplamente utilizada no desenvolvimento web devido à sua capacidade de organizar e estruturar o código de forma eficiente, tornando-o mais modular, flexível e fácil de manter. Ela promove uma separação clara entre a interface do usuário, a lógica de negócios e a manipulação de dados, tornando a aplicação mais escalável e testável.


## HTML

## CSS

## JS


