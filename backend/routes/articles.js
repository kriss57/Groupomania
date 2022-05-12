/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkToken = require('../jsonwebtoken/check')
const articleCtrl = require('../controllers/article')
const multer = require('../middleware/multer-config')
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Article Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Cocktail */

router.get('', articleCtrl.getAllArticles)

router.get('/:id', articleCtrl.getArticle)

router.put('', checkToken, multer, articleCtrl.addArticle)

router.patch('/:id', checkToken, articleCtrl.updateArticle)

router.post('/untrash/:id', checkToken, articleCtrl.untrashArticle)

router.delete('/trash/:id', checkToken, articleCtrl.trashArticle)

router.delete('/:id', checkToken, articleCtrl.deleteArticle)

module.exports = router