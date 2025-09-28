Comando linux para derrubar um servidor 
fuser -k 3001/tcp

3001 é a porta onde o servidor está rodando e deve ser modificado conforme a necessidade.



#Cuidado

Para usar cookies o frontend e o backend devem estar na mesma origem. 

Acontece muito do frontend estar em 127.0.0.1:5500 e o backend em localhost:3001. Apesar de apontarem para o mesmo endereço (localhost), não funciona pois o navegador previne acessos de locais diferentes.


