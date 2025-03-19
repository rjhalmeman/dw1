# Github  - resumo do resumo do resumo ...

O mínimo necessário para usar o github nas aulas de DW1.

É importante saber que:

✅ Git é um sistema de controle de versões distribuído. Ele permite que você acompanhe as mudanças no código, trabalhe em equipe sem conflitos e volte para versões anteriores do projeto se necessário. O Git funciona localmente no seu computador.

✅ GitHub é uma plataforma online que hospeda repositórios Git. Ele permite colaboração remota, armazenamento de código na nuvem e integração com ferramentas como CI/CD.

🔹 Resumindo: O Git é a ferramenta, o GitHub é o serviço que facilita o compartilhamento e colaboração no código.
(colaboração da Maria Elisa...)

## Criar a conta no github.
Sem a conta, nada acontece...

https://github.com/


## Instalar no celular um app autenticador. Sugiro o Google Authenticator

https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&pli=1


## Configurar a autenticação com dois fatores (Two-factor authentication)
Necessário para criar o token, que é a senha necessária para usar via terminal e/ou aplicativo git.

1. Acesse as configurações do GitHub
Vá para [GitHub](https://github.com/) e faça login na sua conta.
No canto superior direito, clique no ícone do seu perfil e selecione "Settings" (Configurações).
3. Escolha Password and authentication
4. Clic no botão verde - Enable two-factor authentication
5. Deverá aparecer um qrCode, que deverá ser lido com o app Google Authenticator do seu celular (no app, clica no + e lê o qrCode)
6. Informar o código que foi gerado no app Google Authenticator.

7. Vai mostrar os códigos de recuperação. Salve esses códigos em um e-mail ou no drive. Preferencialmente no drive. Não pode perder esses códigos.


## Como criar um token para conta no github

1. Acesse as configurações do GitHub
Vá para GitHub e faça login na sua conta.
No canto superior direito, clique no ícone do seu perfil e selecione "Settings" (Configurações).
2. Acesse as configurações de tokens
No menu esquerdo, role para baixo até "Developer settings" (Configurações de desenvolvedor).
Clique em "Personal access tokens" > "Tokens (classic)".
3. Gerar um novo token
Clique em "Generate new token" > "Generate new token (classic)".
Dê um nome ao token para identificar seu uso.
Escolha a data de expiração (ou deixe sem expiração, mas não é recomendado por segurança).
Recomendo que deixe sem expiração (por enquanto)
Marque os escopos (permissões) que o token terá.
Marque tudo
4. Criar e salvar o token
Clique em "Generate token".
O token será exibido uma única vez. Copie e salve em um local seguro. Salve junto com os códigos de recuperação da conta.

## Instalar git

### No windows:

https://www.youtube.com/watch?v=Am46OOLgV4s


### No linux: 
No Debian / Ubuntu / Mint e distribuições derivadas, você encontrará a versão estável mais recente do Git nos repositórios oficiais, sendo assim, para instalá-lo é muito simples, basta seguir os passos:

1) Abra um terminal (clic no botão iniciar e escreva Terminal)

2) Sincronize o repositório com o comando:

``` sudo apt update``` 

3) Feito isso, instale o Git rodando o comando:

``` sudo apt install git``` 


## Como usar o token no Git?

O github tem que estar instalado no seu computador (já está instalado nos computadores da utfpr)

Pelo navegador, logado em sua conta github. Crie um repositório caso não exista nenhum. Vou considerar que seu repositorio se chama **"nomeDoSeuRepositorio"**

1) Abra um terminal linux ou o CMD do windows.

2) Navege até a pasta que conterá o repositório.

4) digite
git clone https://github.com/seuUsuarioGit/nomeDoSeuRepositorio

deverá criar uma pasta com nomeDoSeuRepositorio localmente.

adicione um doc nessa pasta (para teste)

5) entre na pasta (cd nomeDoSeuRepositorio)

6) digite

``` git add . ``` 

(cuidado com os espaços, eles são necessários)

7) fazer o commit

``` git commit -m "uma mensagem qualquer" ``` 

8) digite

``` git push https://github.com/seuUsuarioGit/nomeDoSeuRepositorio ``` 

vai pedir usuário e senha

``` User: seuUsuarioGit``` 

``` Password: (Colar seu token com ctrl shift v)``` 

deverá fazer o upload. Vá na página do github e confira se está lá.




