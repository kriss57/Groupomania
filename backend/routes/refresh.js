//-------------------------------------//
//-- Import des module nécessaires --//
const express = require('express')
const authCtrl = require('../controllers/auth')
const checkToken = require('../jsonwebtoken/check')

//----------------------------------------//
//-- Récupération du routeur d'express --//
let router = express.Router()

//----------------------------------------------//
//-- Middleware pour logger dates de requete --//
router.use((req, res, next) => {
    const event = new Date()
    console.log('Refresh Time:', event.toString())
    next()
})

//------------------------------------//
//-- Routage de la ressource Refresh --//
router.post('/', authCtrl.refresh)



module.exports = router