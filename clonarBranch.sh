#!/bin/bash

# URL do repositório remoto
remote_url="https://github.com/rjhalmeman/dw1.git"

# Verifica se foram passados os dois argumentos
if [ $# -ne 2 ]; then
    echo "Uso: ./clona_branch.sh <nome-da-branch> <pasta-de-destino>"
    exit 1
fi

branch="$1"
destino="$2"

# Clona a branch específica para uma pasta temporária (com o nome da branch)
git clone --branch "$branch" --single-branch "$remote_url" "$branch"

# Verifica se o clone deu certo
if [ $? -ne 0 ]; then
    echo "Erro ao clonar a branch '$branch'. Verifique se ela existe no repositório."
    exit 1
fi

# Renomeia/move a pasta para o destino desejado
mv "$branch" "$destino"

echo "Branch '$branch' clonada e renomeada para '$destino' com sucesso."

