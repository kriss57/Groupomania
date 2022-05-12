//---------------------------------------//
//----Import des modules nécéssaires----//
const { DataTypes } = require('sequelize')
//const DB = require('../db.config')
const sequelize = require('../db.config')

//-------------------------------------//
//----Définition du Modèle-----//
module.exports = (sequelize) => {
    return Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        titre: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        contenu: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, { paranoid: true })           // Ici pour faire du softDelete

}


//-----------------------------------//
//--- Synchronisation du modèle ---//    sera a éffacer
//Article.sync()
//User.sync({force: true})
//User.sync({alter: true})

//module.exports = Article

/*
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: ["String <userId>"], required: false },
  usersDisliked: { type: ["String <userId>"], required: false }*/