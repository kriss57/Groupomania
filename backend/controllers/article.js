//--------------------------------------//
//--- Import des module nécessaires --//
//const Article = require('../models/article')
const DB = require('../db.config')
const Article = DB.Article
const User = DB.User
// image upload
const fs = require('fs');

//--Import sys error
const { RequestError, ArticleError } = require('../error/customError')

//--------------------------------------//
//-- Routage de la ressource Article --//

exports.getAllArticles = (req, res) => {
    Article.findAll({ include: { model: User } })
        .then(articles => res.json({ data: articles }))
        .catch(err => next(err))
}

exports.getArticle = async (req, res, next) => {

    try {
        let articleId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!articleId) {
            throw new RequestError('Missing parameter')
        }

        // Récupération de l'article + realation et filtrage
        let article = await Article.findOne({ where: { id: articleId }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: { model: User, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } } })

        // Test si résultat
        if (article === null) {
            throw new ArticleError('This article does not exist !', 0)
        }

        // Renvoi de l' Article trouvé
        return res.json({ data: article })
    } catch (err) {
        next(err)
    }
}

exports.addArticle = async (req, res, next) => {
    try {

        //const { user_id, titre, contenu, image } = req.body
        const articleInfo = {
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            user_id: req.body.user_id,
            titre: req.body.titre,
            contenu: req.body.contenu,

        }

        // Validation des données reçues|| !req.body.titre || !req.body.contenu
        if (!req.body.user_id) {
            throw new RequestError('Missing parameter')
        }
        // Vérification si l article existe
        let article = await Article.findOne({ where: { titre: req.body.titre }, raw: true })
        if (article !== null) {
            throw new ArticleError(`The article ${req.body.titre
                } already exists !`, 1)
        }

        // Céation de l'article // AVANT: Article.create(req.body) test: Article.create(articleInfo)
        article = await Article.create(articleInfo)

        // Réponse de l article crée
        return res.json({ message: 'Article Created', data: article })
    } catch (err) {
        next(err)
    }
}

exports.updateArticle = async (req, res, next) => {
    try {
        let articleId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!articleId) {
            throw new RequestError('Missing parameter')
        }

        // Recherche du cocktail et vérification
        let article = await Article.findOne({ where: { id: articleId }, raw: true })
        if (article === null) {
            throw new ArticleError('This article does not exist !', 0)
        }

        // Mise à jour du cocktail
        await Article.update(req.body, { where: { id: articleId } })

        // Réponse de la MAJ
        return res.json({ message: 'Article Updated' })
    } catch (err) {
        next(err)
    }
}

exports.untrashArticle = async (req, res, next) => {
    try {
        let articleId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!articleId) {
            throw new RequestError('Missing parameter')
        }

        await Article.restore({ where: { id: articleId } })

        // Réponse de la restauration
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}

exports.trashArticle = async (req, res, next) => {
    try {
        let articleId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!articleId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression du cocktail
        await Article.destroy({ where: { id: articleId } })

        // Réponse de la suppression poubelle
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}

exports.deleteArticle = async (req, res, next) => {
    try {
        let articleId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!articleId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression du cocktail
        await Article.destroy({ where: { id: articleId }, force: true })

        // Réponse de la suppréssion total
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}