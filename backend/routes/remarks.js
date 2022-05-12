/***********************************/
/*** Import des module nécessaires */
const express = require('express')
//const checkToken = require('../jsonwebtoken/check')
const remarkCtrl = require('../controllers/remark')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Remark Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Remark */

router.get('', remarkCtrl.getAllRemarks)

router.get('/:id', remarkCtrl.getRemark)

router.put('', remarkCtrl.addRemark)

router.patch('/:id', remarkCtrl.updateRemark)

router.delete('/:id', remarkCtrl.deleteRemark)

module.exports = router