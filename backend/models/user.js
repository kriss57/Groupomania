//---------------------------------------//
//----Import des modules nécéssaires----//
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
//const DB = require('../db.config')
const sequelize = require('../db.config')

//-------------------------------------//
//----Définition du Modèle-----//     //change DB.define par sequelize.define
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        pseudo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i
        }
    }, { paranoid: true })           // Ici pour faire du softDelete

    //-----Hooks beforeCreate----=>    
    User.beforeCreate(async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash
    })
    //----Isolation de la methode pour comparer le mot de passe----=>
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}


//-----------------------------------//
//--- Synchronisation du modèle ---// //sera a éffacer
//User.sync()
//User.sync({force: true})
//User.sync({alter: true})

//module.exports = User