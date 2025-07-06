# Hamburgueria do Sabor - Sistema Integrado

## Descrição
Este projeto integra todas as funcionalidades do sistema DeborahFerraz (login, cadastro, servidor, usuários, produtos, admin, carrinho) no projeto Trabalho 1B, mantendo os produtos da hamburgueria e o CSS original.

## Funcionalidades Implementadas
- ✅ Sistema de login e cadastro de usuários
- ✅ Painel administrativo para gerentes
- ✅ CRUD de produtos
- ✅ Gerenciamento de usuários
- ✅ Carrinho de compras
- ✅ Produtos da hamburgueria mantidos
- ✅ CSS original da hamburgueria preservado

## Como executar

### Pré-requisitos
- Node.js instalado
- npm instalado

### Passos para execução
1. Navegue até o diretório do projeto:
   ```bash
   cd Trabalho-1B
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

4. Acesse o sistema no navegador:
   ```
   http://localhost:3000
   ```

## Usuários de teste

### Cliente
- Email: joao@teste.com
- Senha: 123456

### Administrador/Gerente
- Email: admin@hamburgueria.com
- Senha: admin123

## Estrutura do projeto
- `server.js` - Servidor backend com Express
- `Trabalho-1B-main/` - Arquivos frontend
- `assets/imagens/` - Imagens dos produtos
- `usuarios.csv` - Base de dados de usuários
- `produtos.csv` - Base de dados de produtos

## Funcionalidades por tipo de usuário

### Cliente
- Visualizar produtos por categoria
- Adicionar produtos ao carrinho
- Fazer login/cadastro
- Finalizar compra

### Administrador
- Todas as funcionalidades do cliente
- Acessar painel administrativo
- Gerenciar produtos (adicionar, editar, excluir)
- Gerenciar usuários (alterar papéis)

## Tecnologias utilizadas
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Banco de dados: CSV (usuarios.csv, produtos.csv)
- Upload de arquivos: Multer
- CORS habilitado para requisições cross-origin
