const animeValidtaion = {
    validateAnime: (req, res, next) => {
        const anime = req.params.anime
        if (!anime || !(anime.trim().length > 0)) return res.status(400).send({message:'El anime no puede estar vacio.'})
        next()
    },
    validateChapter: (req, res, next) => {
        const anime = req.params.anime
        const chapter = req.params.chapter
        if (!anime || !(anime.trim().length > 0)) return res.status(400).send({message:'El anime no puede estar vacio.'})
        if (!chapter || !(chapter.trim().length > 0)) return res.status(400).send({message:'El capitulo no puede estar vacio.'})
        next()
    },
    validateSubtitle: (req, res, next) => {
        const anime = req.params.anime
        const chapter = req.params.chapter
        const subLang = req.params.sublang
        if (!anime || !(anime.trim().length > 0)) return res.status(400).send({message:'El anime no puede estar vacio.'})
        if (!chapter || !(chapter.trim().length > 0)) return res.status(400).send({message:'El capitulo no puede estar vacio.'})
        if (!subLang || !(subLang.trim().length > 0)) return res.status(400).send({message:'El subtitulo no puede estar vacio.'})
        next()
    }
}

module.exports = animeValidtaion