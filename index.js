'use strict'

const app = require('./app')
const port = 3700

//crear servidor
app.listen(port, () => {
    console.log(`Escuchando desde el puerto: ${port}`)
})