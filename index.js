const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log('servidor levantado')
})

app.use(express.static("public"));

app.use('/api/productos', require('./routes/routersProductos'))

