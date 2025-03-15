# DW1 - Desenvolvimento WEB 1 
---
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


A arquitetura **MVC** é amplamente utilizada no desenvolvimento web devido à sua capacidade de organizar e estruturar o código de forma eficiente, tornando-o mais modular, flexível e fácil de manter. Ela promove uma separação clara entre a interface do usuário, a lógica de negócios e a manipulação de dados, tornando a aplicação mais escalável e testável.

## Linguagens

### HTML

HTML (HyperText Markup Language) é a **linguagem de marcação** usada para estruturar páginas da web. Ele define elementos como títulos, parágrafos, links, imagens e outros conteúdos, organizando a informação para ser exibida nos navegadores. Junto com CSS e JavaScript, HTML é essencial para o desenvolvimento web.

### XML

XML (eXtensible Markup Language) é uma **linguagem de marcação** usada para estruturar e armazenar dados de forma hierárquica. Ela é amplamente utilizada para troca de informações entre sistemas devido à sua legibilidade e flexibilidade. Com tags personalizáveis, permite organizar dados de maneira compreensível tanto para humanos quanto para máquinas. Apesar de ter sido amplamente substituído por JSON em algumas aplicações, ainda é usado em configurações, Web Services e documentos.  

### Markdown

Markdown é uma **linguagem de marcação** leve usada para formatar texto de forma simples e legível. Ele permite criar títulos, listas, links, imagens e trechos de código de maneira intuitiva. Muito utilizado em documentação, README de projetos e blogs, pode ser convertido para HTML facilmente. Seu uso é popular em plataformas como GitHub, Stack Overflow e Notion.  

### CSS

CSS (Cascading Style Sheets) é uma **linguagem de estilo** usada para definir a aparência de páginas HTML. Ela permite personalizar cores, fontes, layouts e animações, tornando o design mais atraente e responsivo. Com seletores e propriedades, é possível aplicar estilos a elementos específicos ou a toda a página. Ferramentas como Flexbox e Grid facilitam a criação de layouts modernos e adaptáveis a diferentes telas.  

## Linguagem de Programação e Linguagem de Script  

Uma **linguagem de programação** e uma **linguagem de script** diferem na forma como são executadas e no propósito para o qual foram projetadas  

- **Linguagem de Programação**: Projetada para desenvolver software completo e estruturado, podendo ser compilada ou interpretada.  
  - **Exemplos**: Java, C, C++.  

- **Linguagem de Script**: Projetada para automatizar tarefas e interagir com outros programas, geralmente interpretada em tempo de execução.  
  - **Exemplos**: JavaScript, Python, PHP, Ruby.  

Embora a distinção tradicional seja essa, muitas linguagens podem atuar nos dois papéis, dependendo do uso e do ambiente de execução.  

### Java
Java é uma **linguagem de programação** orientada a objetos, amplamente usada para desenvolvimento de aplicações empresariais, móveis e web. Sua portabilidade através da JVM permite rodar em diferentes plataformas. Possui forte tipagem e uma vasta biblioteca padrão. É utilizada em sistemas bancários, Android e servidores corporativos.

### C  
C é uma **linguagem de programação** de baixo nível, conhecida por sua eficiência e controle sobre o hardware. Muito utilizada em sistemas operacionais, embarcados e software de alto desempenho, oferece gerenciamento manual de memória. Sua sintaxe influenciou muitas linguagens modernas, sendo amplamente usada na programação de sistemas e infraestrutura.  

### C++  
C++ é uma **linguagem de programação** baseada em C, que adiciona suporte à programação orientada a objetos. Utilizada no desenvolvimento de jogos, aplicações de alto desempenho e software corporativo, combina flexibilidade com eficiência. Seu uso abrange desde drivers de hardware até grandes sistemas complexos, como bancos de dados e motores gráficos.  

### JavaScript (JS)

JavaScript (JS) é uma **linguagem de script** amplamente utilizada para tornar páginas web interativas e dinâmicas. Executado no navegador, permite manipular o HTML e CSS, responder a eventos e realizar requisições assíncronas. Com a evolução do Node.js, também pode ser usado no backend para criar servidores e aplicações escaláveis. Atualmente, frameworks como React, Angular e Vue.js tornam o desenvolvimento web mais eficiente e modular.

### Python
Python é uma **linguagem de script** de alto nível, conhecida por sua simplicidade e legibilidade. Utilizada em diversas áreas como inteligência artificial, automação, análise de dados e desenvolvimento web. Possui uma sintaxe intuitiva e uma vasta quantidade de bibliotecas. Seu uso cresce em ciência de dados, aprendizado de máquina e desenvolvimento backend.  

### PHP
PHP é uma **linguagem de script** voltada para desenvolvimento web, permitindo a criação de sites dinâmicos e interativos. Executado no servidor, é amplamente usado em sistemas como WordPress, Laravel e outras plataformas. Possui integração fácil com bancos de dados e suporte a diversas extensões. Ainda é popular em backends de sites e APIs.  

### Ruby  
Ruby é uma **linguagem de script** dinâmica e interpretada, focada na simplicidade e produtividade. Muito utilizada no desenvolvimento web, especialmente com o framework Ruby on Rails, oferece uma sintaxe elegante e expressiva. Sua filosofia prioriza a legibilidade do código e a experiência do programador, tornando-a popular entre startups e projetos ágeis.  

## Framework  

Um **framework** é um conjunto de ferramentas, bibliotecas e regras que facilita o desenvolvimento de software, fornecendo uma estrutura pré-definida. Ele permite que os desenvolvedores foquem na lógica do aplicativo sem precisar reimplementar funcionalidades básicas.  

Frameworks podem ser específicos para diferentes áreas, como **desenvolvimento web** (React, Angular, Django, Laravel), **aplicações móveis** (Flutter, React Native), ou **inteligência artificial** (TensorFlow, PyTorch). Eles promovem boas práticas, reutilização de código e aceleram o desenvolvimento.  

### React  
React é um **framework JavaScript** desenvolvido pelo Facebook para a criação de interfaces de usuário dinâmicas e interativas. Baseado no conceito de componentes reutilizáveis, ele utiliza um Virtual DOM para otimizar a renderização e melhorar o desempenho das aplicações. Sua flexibilidade permite integração com diversas bibliotecas e frameworks, sendo amplamente utilizado no desenvolvimento de **aplicações web** e **mobile** (com React Native).  

### Angular  
Angular é um **framework TypeScript** criado pelo Google para desenvolvimento de aplicações web robustas e escaláveis. Ele utiliza uma arquitetura baseada em módulos, componentes e injeção de dependências, facilitando a organização e manutenção do código. Seu sistema de **two-way data binding** permite uma sincronização eficiente entre a interface e os dados, sendo amplamente usado em aplicações corporativas e sistemas de grande porte.  

### Django  
Django é um **framework Python** voltado para o desenvolvimento web rápido, seguro e escalável. Segue o princípio "batteries included", oferecendo diversas funcionalidades embutidas, como autenticação, ORM (Object-Relational Mapping), administração automática e segurança contra ataques comuns (como SQL Injection e CSRF). É muito utilizado em startups e plataformas de alto tráfego, como sites de notícias e redes sociais.  

### Laravel  
Laravel é um **framework PHP** baseado no padrão MVC (Model-View-Controller), projetado para tornar o desenvolvimento web mais simples e produtivo. Ele oferece um sistema de roteamento elegante, autenticação integrada, cache, e um poderoso ORM chamado Eloquent. Laravel é conhecido por sua sintaxe expressiva, facilidade de aprendizado e suporte a desenvolvimento ágil, sendo uma escolha popular para **aplicações web modernas**.  

### Flutter  
Flutter é um **framework UI** desenvolvido pelo Google para a criação de aplicações móveis, web e desktop a partir de um único código-fonte. Baseado na linguagem Dart, ele utiliza o motor gráfico Skia para renderização nativa de alto desempenho. Seu principal diferencial é o **Hot Reload**, que permite aos desenvolvedores visualizar mudanças no código em tempo real, tornando o desenvolvimento mais ágil e eficiente.  

### React Native  
React Native é um **framework JavaScript** baseado no React, focado no desenvolvimento de **aplicações móveis nativas** para Android e iOS. Ele permite reutilizar código entre plataformas, garantindo uma experiência próxima ao desenvolvimento nativo. Suporta integração com APIs nativas, garantindo alto desempenho e maior flexibilidade para personalização.  

### TensorFlow  
TensorFlow é um **framework de Machine Learning** desenvolvido pelo Google para facilitar a criação e implementação de modelos de inteligência artificial. Ele suporta redes neurais profundas, aprendizado supervisionado e não supervisionado, além de ser altamente escalável. Utilizado em aplicações que envolvem **visão computacional, processamento de linguagem natural e aprendizado profundo**, é amplamente adotado por pesquisadores e engenheiros de IA.  

### PyTorch  
PyTorch é um **framework de Machine Learning** desenvolvido pelo Facebook, amplamente utilizado em pesquisa e desenvolvimento de IA. Ele oferece uma abordagem dinâmica para a criação de modelos de aprendizado profundo, permitindo depuração mais fácil e integração com bibliotecas populares. Sua flexibilidade e suporte a computação acelerada por GPU tornam-no uma escolha preferida para projetos acadêmicos e experimentação de modelos de IA.  



