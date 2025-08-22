#!/bin/bash

# Define a pasta raiz onde a busca começará
# O '.' significa a pasta atual onde o script está sendo executado
ROOT_FOLDER="."

# Use o comando 'find' para localizar as pastas e o 'rm' para excluí-las
# A opção '-type d' busca apenas por diretórios
# A opção '-name "node_modules"' procura por pastas com esse nome
# A opção '-prune' impede que o 'find' entre nas pastas encontradas, o que otimiza a busca
# O '-exec rm -rf {} \;' executa a exclusão de cada pasta encontrada
find "$ROOT_FOLDER" -type d -name "node_modules" -prune -exec rm -rf {} \;

echo "Todas as pastas 'node_modules' foram removidas com sucesso."