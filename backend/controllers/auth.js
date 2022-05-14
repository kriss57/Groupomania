//---------------------------------------//
//--- Import des module nécessaires ---//
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
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

//------------------------------------------//
//--------- Routage  refresh token -------/

exports.refresh = async (req, res) => {
    try {


        const user = await User.findOne(req.params.id)
        console.log(user);
        console.log(user.pseudo);

        if (!user) {
            return res.status(401).send({
                message: 'User not found',
            });
        }

        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME })



        return res.json({ access_token: token })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
        });
    }
}


//------------------------------------------//
//--------- Routage  refresh token -------//

/*exports.refresh = async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        }

        // Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
        delete user.iat;
        delete user.exp;


        const refreshedToken = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });

        console.log(refreshedToken);

        return res.json({ access_token: token })
        /*res.send({
            access_Token: refreshedToken,
        });
    });
}*/
