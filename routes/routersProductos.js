const { Router } = require('express');
const router = Router();

const  productos = require ('../public/productos.json')

router.get('/', (req, res) => {
    res.json(productos)
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        const id = productos.length + 1;
        const NewProduct = {... req.body, id}
        productos.push(NewProduct);
        res.json("Produto añadido");
    } else {
        res.send("Error al añadir")
    }
})

router.get('/:id', (req, res) => {
    const productoEncontrado = productos.find(function (product) {
        return product.id === parseInt(req.params.id) 
    })
    if (!productoEncontrado) 
    return res.json({ 
        error: "Producto no encontrado"
    })
    res.json(productoEncontrado)
})

router.delete('/:id', (req, res) => {
    const productoEncontrado = productos.find(function (product) {
        return product.id === parseInt(req.params.id) 
    })
    if (!productoEncontrado) 
    return res.json({ 
        error: "Producto no encontrado"
    })

    const productos = productos.filter(p => p.id !== parseInt(req.params.id))
    res.json('Producto eliminado')
})


router.put('/:id', (req, res) => {
    const prodActualizar = req.body
    const productoEncontrado = productos.find(function (product) {
        return product.id === parseInt(req.params.id) 
    })
    if (!productoEncontrado) 
    return res.json({ 
        error: "Producto no encontrado"
    })

    productos = productos.map(p => p.id === parseInt(req.params.id) ? {...p, ...prodActualizar } : p)

    res.json({
        message: "Producto actualizado"
    })
})

module.exports = router;