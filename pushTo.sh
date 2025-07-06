#!/bin/bash

# Nome padrão do repositório remoto
default_remote="https://github.com/rjhalmeman/dw1"

# Verifica se o git está instalado
if ! command -v git &> /dev/null; then
    echo "O Git não está instalado. Por favor, instale o Git antes de continuar."
    exit 1
fi

# Usa o nome da pasta atual como nome da branch
branch="$(basename "$PWD")"

echo "Usando '$branch' como nome da branch."

# Adiciona o repositório remoto se ainda não estiver adicionado
if ! git remote get-url origin &> /dev/null; then
    git remote add origin "$default_remote"
fi

# Verifica se a branch já existe localmente ou remotamente
if git show-ref --verify --quiet "refs/heads/$branch" || git ls-remote --exit-code --heads origin "$branch" &> /dev/null; then
    echo "A branch '$branch' já existe."
    read -p "Deseja apenas fazer o push para ela? (s/n): " resposta
    if [[ "$resposta" != "s" && "$resposta" != "S" ]]; then
        echo "Operação cancelada."
        exit 1
    fi
    git checkout "$branch"
else
    git checkout -b "$branch"
fi

# Adiciona todos os arquivos
git add .

# Commit com timestamp
timestamp=$(date +"%d/%m/%Y - %H:%M:%S")
git commit -m "$timestamp"

# Tenta o push
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
fi

echo "Branch '$branch' enviada com sucesso!"

