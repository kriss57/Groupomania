//-------------------------------------//
//-- Import des module nécessaires --//
const express = require('express')
const userCtrl = require('../controllers/user')
const checkToken = require('../jsonwebtoken/check')





//----------------------------------------//
//-- Récupération du routeur d'express --//
let router = express.Router()

//----------------------------------------------//
//-- Middleware pour logger dates de requete --//
router.use((req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})


//------------------------------------//
//-- Routage de la ressource User --//

router.get('/', checkToken, userCtrl.getAllUsers)

router.get('/:id', checkToken, userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id', checkToken, userCtrl.updateUser)

router.post('/untrash/:id', checkToken, userCtrl.untrashUser)

router.delete('/trash/:id', checkToken, userCtrl.trashUser)

router.delete('/:id', checkToken, userCtrl.deleteUser)

// route upload image


module.exports = router