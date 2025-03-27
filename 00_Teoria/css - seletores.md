# Seletores CSS

## os seletores servem para indicar "onde" o efeito visual vai ser aplicado

- Seletor de ID (#id)

- Seletor de elemento (h1, p, div, etc.)

- Seletor de classe (.classe)

- Seletor descendente (div p)

- Seletor filho direto (div > p)

- Seletor de irmão adjacente (h1 + p)

- Seletor de irmãos gerais (h1 ~ p)

- Seletor de atributo (input[type="text"])

- Seletor universal (*)

- Seletor de grupo (h1, h2, h3)

# Exemplo

``` 
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo de Seletores CSS</title>
    <style>
        /* Seletor de elemento */
        h1 {
            color: blue;
        }

        /* Seletor de classe */
        .destaque {
            background-color: yellow;
        }

        /* Seletor de ID */
        #importante {
            font-weight: bold;
        }

        /* Seletor descendente */
        div p {
            color: green;
        }

        /* Seletor filho direto */
        div > p {
            font-size: 18px;
        }

        /* Seletor de irmão adjacente */
        h1 + p {
            text-decoration: underline;
        }

        /* Seletor de irmãos gerais */
        h1 ~ p {
            font-style: italic;
        }

        /* Seletor de atributo */
        input[type="text"] {
            border: 2px solid red;
        }

        /* Seletor universal */
        * {
            font-family: Arial, sans-serif;
        }

        /* Seletor de grupo */
        h1, h2, h3 {
            text-align: center;
        }
    </style>
</head>
<body>
    <p id="importante">Seletor de ID</p>
    <h1>Seletor de Elemento (tags htms)</h1>
    <p class="destaque">Seletor de Classe</p>
    <div>
        <p>Seletor Descendente</p>
        <span>
            <p>Seletor Filho Direto</p>
        </span>
    </div>
    <h1>Exemplo de Irmãos</h1>
    <p>Seletor de Irmão Adjacente</p>
    <p>Seletor de Irmãos Gerais</p>
    <input type="text" placeholder="Seletor de Atributo">
</body>
</html>
``` 
