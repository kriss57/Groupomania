//----------------------------------------//
//---- Import des module nécessaires ----//
//const Remark = require('../models/remark')
const DB = require('../db.config')
const Remark = DB.Remark
const Article = DB.Article
const User = DB.User
const { RequestError, RemarkError } = require('../error/customError')

//----------------------------------------//
//--- Routage de la ressource Remark ---//


//------Récup tout les commentaires  A VOIR CI BESOINS----//
exports.getAllRemarks = (req, res, next) => {
    Remark.findAll({ include: { model: User } })

        /*Remark.findAll({include: [{model: Article,include: {model: User}}]})*/
        .then(remarks => res.json({ data: remarks }))
        .catch(err => next(err))


}

/**
 * Récupérer un commentaire
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getRemark = async (req, res, next) => {
    try {
        let remarkId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!remarkId) {
            throw new RequestError('Missing parameter')
        }

        // Récupération de la remark
        let remark = await Remark.findOne({ where: { id: remarkId }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: { model: Article, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } } })

        // Test si résultat
        if (remark === null) {
            throw new RemarkError('This remark does not exist !', 0)
        }

        // Renvoi de la remark trouvé
        return res.json({ data: remark })
    } catch (err) {
        next(err)
    }
}

/**
 * Ajouter un commentaire
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addRemark = async (req, res, next) => {
    try {
        const { article_id, contenu } = req.body

        // Validation des données reçues
        if (!article_id || !contenu) {
            throw new RequestError('Missing parameter')
        }

        // Vérification si la remark existe
        //let remark = await Remark.findOne({ where: { contenu: contenu }, raw: true })
        /*if (remark !== null) {
            throw new RemarkError(`The remark already exists !`, 1)
        }*/

        // Céation du commentaire
        remark = await Remark.create(req.body)

        // Réponse de la création de la remark
        return res.json({ message: 'Remark Created', data: remark })
    } catch (err) {
        next(err)
    }
}

/**
 * Modifier un commentaire
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateRemark = async (req, res, next) => {
    try {
        let remarkId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!remarkId) {
            throw new RequestError('Missing parameter')
        }
        // Recherche de la remark et vérification
        let remark = await Remark.findOne({ where: { id: remarkId }, raw: true })
        if (remark === null) {
            throw new RemarkError('This remark does not exist !', 0)
        }

        // Mise à jour de la remark
        await Remark.update(req.body, { where: { id: remarkId } })

        // Réponse de la MAJ remark
        return res.json({ message: 'Remark Updated' })
    } catch (err) {
        next(err)
    }
}

/**
 * Supprimer un commentaire
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteRemark = async (req, res, next) => {
    try {
        let remarkId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!remarkId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de la remark
        await Remark.destroy({ where: { id: remarkId }, force: true })

        // RRéponse de la suppréssion total de remark
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}