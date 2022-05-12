//----------------------------------------//
//---- Import des module nécessaires ----//
const jwt = require('jsonwebtoken')

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

//-------------------------------------------//
//-- Vérification de la présence du token --//
const checkToken = (req, res, next) => {

    const token = req.headers.authorization && exctractBearer(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'token not found !' })
    }

    // Vérification de la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

        if (err) {
            return res.status(401).json({ message: 'Bad token' })
        }

        next()
    })
}

module.exports = checkToken