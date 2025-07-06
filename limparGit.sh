#!/bin/bash

# Define o nome da branch como o nome do diretório atual
branch="$(basename "$PWD")"
remote_url="https://github.com/rjhalmeman/dw1.git"

echo "Usando '$branch' como nome da branch."

# Remove pasta .git antiga (se existir)
if [ -d ".git" ]; then
    echo "Removendo .git antigo..."
    rm -rf .git
fi

# Inicializa novo repositório Git
git init

# Adiciona repositório remoto
git remote add origin "$remote_url"

# Cria e muda para a nova branch
git checkout -b "$branch"

# Adiciona todos os arquivos
git add .

# Commit inicial com timestamp
timestamp=$(date +"%d/%m/%Y - %H:%M:%S")
git commit -m "Início do $branch - $timestamp"

# Tenta enviar para o GitHub
if ! git push -u origin "$branch"; then
    echo
    echo "Erro ao fazer push: a branch remota já existe e tem histórico diferente."
    read -p "Deseja forçar o push com --force e sobrescrever o remoto? (s/n): " forcar
    if [[ "$forcar" == "s" || "$forcar" == "S" ]]; then
        git push -u origin "$branch" --force
    else
        echo "Push cancelado."
        exit 1
    fi
else
    echo "Branch '$branch' criada e enviada com sucesso!"
fi

