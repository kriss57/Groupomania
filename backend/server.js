//---------------------------------------//
//----Import des modules nécéssaires----//
const express = require('express')
const cors = require('cors')
const checkToken = require('./jsonwebtoken/check')
const errorHandler = require('./error/errorHandler')
const path = require('path');

//----------------------------------------//
//----Import de la connection a la DB----//
let DB = require('./db.config')

//-------------------------------------//
//------Initialisation de l'Api-------//
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//--------------------------------------//
//---Import des modules de routage----//
const user_router = require('./routes/users')
const article_router = require('./routes/articles')
const remark_router = require('./routes/remarks')

const auth_router = require('./routes/auth')

//const refresh_router = require('./routes/refresh')

//------------------------------------//
//------Mise en place du routage-----//
app.get('/', (req, res) => res.send('Bonne route , Bienvenue !'))

//--checkToken,
app.use('/users', user_router)
app.use('/articles', article_router)
app.use('/remarks', remark_router)

app.use('/auth', auth_router)

//app.use('/refresh', refresh_router)

//--static images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('*', (req, res) => res.status(501).send('Mais ou va tu !'))

app.use(errorHandler)

//-----------------------------------------//
//------Test DB et Start serveur------//
DB.sequelize.authenticate()
    .then(() => console.log('Database connected !'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Serveur start on port ${process.env.SERVER_PORT} !`);
        })
    })
    .catch(err => console.log('Database error', err))
