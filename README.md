vai...

Como transformar uma pasta em branch
no terminal (prompt)
 - git checkout -b nomeDaBranch
 - git filter-branch --subdirectory-filter "nomeDaPastaNoGitHub" -- --all
 - git push origin nomeDaBranch
 - 




Como clonar uma branch específica
git clone --branch nomeDaBranch --single-branch https://github.com/usuario/repositorioQueContemABranch

exemplo
git clone --branch clienteServerSimples --single-branch https://github.com/rjhalmeman/dw1
