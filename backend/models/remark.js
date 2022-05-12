//---------------------------------------//
//----Import des modules nécéssaires----//
const { DataTypes } = require('sequelize')
//const DB = require('../db.config')
const sequelize = require('../db.config')

//-------------------------------------//
//----Définition du Modèle-----//
module.exports = (sequelize) => {
    return Remark = sequelize.define('Remark', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        article_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        /*user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },*/
        contenu: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
    }, { paranoid: true })           // Ici pour faire du softDelete
}



//-----------------------------------//
//--- Synchronisation du modèle ---//
//Remark.sync()
//Remark.sync({force: true})
//Remark.sync({alter: true})

//module.exports = Remark