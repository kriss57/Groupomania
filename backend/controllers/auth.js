//---------------------------------------//
//--- Import des module nécessaires ---//
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//const User = require('../models/user')
const DB = require('../db.config')
const User = DB.User

const { AuthenticationError } = require('../error/customError')

//-------------------------------------//
//--- Routage de la ressource Auth ---//
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        // Validation des données recues
        if (!email || !password) {
            throw new AuthenticationError('Bad email or password !', 0)
        }
        // On vérifie si l'utilisateur existe
        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user === null) {
            throw new AuthenticationError('this account does not exist !', 1)
        }

        // On vérifie le mot de passe
        //let pass = await bcrypt.compare(password, user.password)
        let pass = await User.checkPassword(password, user.password)
        if (!pass) {
            throw new AuthenticationError('Wrong password', 2)
        }

        // Génération du token
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME })

        // Génération du refresh token
        const refresh = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME })

        refreshTokens.push(refresh)

        return res.json({ access_token: token, refresh_token: refresh })

    } catch (err) {
        next(err)
    }

}


let refreshTokens = [];

//---------------------------------------//
//--------- Extraction du token --------//
const exctractBearer = authorization => {

    if (typeof authorization !== 'string') {
        return false
    }

    // isolation token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]
}
//------------------------------------------//
//--------- Routage  refresh token -------//

exports.refresh = async (req, res, next) => {       // sur router.post(/refresh)

    try {
        // nouvelle access token avec refresh token
        const refreshToken = req.headers.authorization && exctractBearer(req.headers.authorization)

        // verification si le refresh est présent 
        if (!refreshToken) {
            res.status(401).json({ message: 'token not found !' })
        }

        if (!refreshTokens.includes(refreshToken)) {
            res.status(403).json({ message: 'Invalid refresh token !' })
        }
        // Vérification de la validité du refresh token
        const user = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const access_token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME })


        return res.json({ access_token })

    } catch (err) {
        next(err)
    }

}

