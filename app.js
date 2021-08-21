'use strict'

const express = require('express')
const app = express()

//cargar rutas
const routes = require('./routes/movieshome')

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET')
    next()
})

//rutas
app.use('/', routes)

//exportar
module.exports = app