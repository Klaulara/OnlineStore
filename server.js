const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const port = 3000;
const { traerCategorias, traerProductos, traerProductoPorCategoria } = require('./consultas');

app.use(express.json());

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutDir: `${__dirname}/views`,
        partialsDir: `${__dirname}/views/components`,
    })
);

app.set("view engine", "handlebars");

app.get('/', async(req, res) => {
    try {
        const productos = await traerProductos();
        const categorias = await traerCategorias();
        res.render('index', {productos, categorias});
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal...${error}`,
            code: 500
        })
    }
});

app.get('/categoria', async (req, res)=> {
    const id = Object.values(req.query);
    try {
        const productos = await traerProductoPorCategoria(id);
        const categorias = await traerCategorias();
        res.render('index', {productos, categorias});
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal...${error}`,
            code: 500
        })
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))