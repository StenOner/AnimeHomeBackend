'use strict'

const { readdirSync } = require('fs')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const animePath = process.env.ANIME_PATH
const moviePath = process.env.MOVIE_PATH
const videoExt = ['mp4', 'webm', 'mkv']
const subPrefix = '[SubtitleTools.com] '
const subs = ['_Subtitles01', '_Subtitles02']
const subsExt = ['vtt', 'ass', 'ssa', 'sub', 'srt']

const getDirectories = (source) => {
    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

const getFiles = (dirPath) => {
    return fs.readdirSync(dirPath, (err, files) => {
        if (!files) return console.log('No se encontro archivos.')
        if (err) return console.log(`No se puede leer el directorio: ${err}.`)
        return files
    })
}

const sortFiles = (dirPath, filter = '') => {
    let files
    switch (filter) {
        case 'video':
            files = filterFiles(dirPath, videoExt)
            break
        case 'subs':
            files = filterFiles(dirPath, subsExt)
            break
        default:
            files = getFiles(dirPath)
            break
    }
    return files.sort((a, b) => {
        const idA = a.lastIndexOf('.')
        const idB = b.lastIndexOf('.')
        return a.substring(0, idA) - b.substring(0, idB)
    })
}

const filterFiles = (dirPath, exts) => {
    const files = getFiles(dirPath)
    const filteredFiles = []
    files.filter(file => {
        for (const ext of exts) {
            if (file.indexOf(ext) !== -1) filteredFiles.push(file)
        }
    });
    return filteredFiles
}

const controller = {
    getAnimes: (req, res) => {
        fs.stat(animePath, (err, stats) => {
            if (!stats) return res.status(400).send({ message: 'No se encontro ningun anime.' })
            if (err) return res.status(500).send({ message: 'No se pudo enviar las carpetas de anime.' })
            return res.status(200).send({ animes: getDirectories(animePath) })
        })
    },

    getAnime: (req, res) => {
        const anime = req.params.anime
        const pathFile = path.join(animePath, anime)
        fs.stat(pathFile, (err, stats) => {
            if (!stats) return res.status(400).send({ message: 'No existe el anime que busca.' })
            if (err) return res.status(500).send({ message: 'No se pudo enviar el anime.' })
            return res.status(200).send({ chapters: sortFiles(pathFile, 'video') })
        })
    },

    getChapter: (req, res) => {
        const anime = req.params.anime
        const chapter = req.params.chapter
        const pathFile = path.join(animePath, anime, chapter)
        fs.stat(pathFile, (err, stats) => {
            if (!stats) return res.status(400).send({ message: 'No existe el capitulo que busca.' })
            if (err) return res.status(500).send({ message: 'No se pudo enviar el capitulo.' })
            return res.sendFile(path.resolve(pathFile))
        })
    },

    getSubtitle: (req, res) => {
        const anime = req.params.anime
        const chapter = req.params.chapter
        const subLang = req.params.sublang.toUpperCase()
        const pathFile = path.join(animePath, anime, `${subPrefix}${chapter}`)
        let subPath
        switch (subLang) {
            case 'SPA':
                subPath = `${pathFile}${subs[1]}.${subLang}.${subsExt[0]}`
                break
            default:
                subPath = `${pathFile}${subs[0]}.${subLang}.${subsExt[0]}`
                break
        }
        fs.stat(subPath, (err, stats) => {
            if (!stats) return res.status(400).send({ message: 'No existe el archivo de subtitulo.' })
            if (err) return res.status(500).send({ message: 'No se pudo enviar el archivo.' })
            return res.sendFile(path.resolve(subPath))
        })
    }
}

module.exports = controller