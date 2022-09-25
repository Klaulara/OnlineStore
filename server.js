const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const port = 3000;
const { traerCategorias, traerProductos, traerProductoPorCategoriayOrden, traerProductosOrdenados, traerProductoPorCategoria } = require('./consultas');

app.use(express.json());
app.use(express.static(__dirname + '/assets'));

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
    const {categoria, orden} = req.query;
    const verifyData = async(categoria, orden) => {
        if (categoria == '0' && orden == '0') {
            return await traerProductos();
        }else if(categoria == '0' && orden !== '0'){
            return await traerProductosOrdenados(orden);
        }else if(categoria !== '0' && orden == '0'){
            return await traerProductoPorCategoria(categoria);
        }else {
            return await traerProductoPorCategoriayOrden(categoria, orden);
        }
    }
    try {
        const productos = await verifyData(categoria, orden);
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