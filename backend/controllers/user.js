//------------------------------------//
//---Import des module nécessaires --//
const bcrypt = require('bcrypt')

//const User = require('../models/user')
const DB = require('../db.config')
const User = DB.User
const { RequestError, UserError } = require('../error/customError')

//------------------------------------//
//-- Routage de la ressource User --//

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

exports.getUser = async (req, res) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }
        // Récupération de l'utilisateur et vérification + filtrage
        let user = await User.findOne({ where: { id: userId }, raw: true, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })
        if (user === null) {
            throw new UserError('This user does not exist !', 0)
        }
        // Utilisateur trouvé
        return res.json({ data: user })
    } catch (err) {
        next(err)
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { nom, prenom, pseudo, email, password } = req.body

        // Validation des données reçues
        if (!nom || !prenom || !pseudo || !email || !password) {
            throw new RequestError('Missing parameter')
        }
        // Vérification si l'utilisateur existe déjà
        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            throw new UserError(`The user ${nom} already exists !`, 1)
        }

        // Céation de l'utilisateur
        user = await User.create(req.body)

        // Réponse de la création de user
        return res.json({ message: 'User Created', data: user })

    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }
        // Recherche de l'utilisateur et vérification
        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            throw new UserError('This user does not exist !', 0)
        }

        // Mise à jour de l'utilisateur
        await User.update(req.body, { where: { id: userId } })

        // Réponse de la MAJ user
        return res.json({ message: 'User Updated' })
    } catch (err) {
        next(err)
    }
}

exports.untrashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        await User.restore({ where: { id: userId } })

        // Réponse de la restauration d user
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}

exports.trashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de l'utilisateur
        await User.destroy({ where: { id: userId } })

        // Réponse de la suppréssion dans la poubelle
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}

exports.deleteUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de l'utilisateur
        await User.destroy({ where: { id: userId }, force: true })

        // Réponse de la suppréssion total de user
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }

}