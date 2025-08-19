const express = require('express');
const app = express();
const pagina1Router = require('./routers/pagina1Routers');
const pagina2Router = require('./routers/pagina2Routers');

app.use(express.static('.'));
app.use('/pagina1', pagina1Router);
app.use('/pagina2', pagina2Router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});