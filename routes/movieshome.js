'use strict'

const express = require('express')
const MovieshomeController = require('../controllers/movieshome')
const router = express.Router()

const animeMiddleware = require('../middlewares/validateAnime')

router.get('/animes', MovieshomeController.getAnimes)
router.get('/anime/:anime', animeMiddleware.validateAnime, MovieshomeController.getAnime)
router.get('/anime/:anime/:chapter', animeMiddleware.validateChapter, MovieshomeController.getChapter)
router.get('/subtitle/:anime/:chapter/:sublang', animeMiddleware.validateSubtitle, MovieshomeController.getSubtitle)

module.exports = router