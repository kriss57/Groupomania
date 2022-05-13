//---------------------------------------//
//----Import des modules nécéssaires----//
const { Sequelize } = require('sequelize')

//------------------------------------//
//--------Connexion a la Bdd---------//
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
)

//-- Mise en place des relations--//
const db = {}

db.sequelize = sequelize
db.User = require('./models/user')(sequelize)
db.Article = require('./models/article')(sequelize)
db.Remark = require('./models/remark')(sequelize)

db.User.hasMany(db.Article, { foreignKey: 'user_id', onDelete: 'cascade' }) //relation user plusieur article et onDelete (si user delete total tout ces article delete)
db.Article.belongsTo(db.User, { foreignKey: 'user_id' })

db.Article.hasMany(db.Remark, { foreignKey: 'article_id' })//relation article a plusieur remark 
db.Remark.belongsTo(db.Article, { foreignKey: 'article_id' })// une remark appartient a un article

db.User.hasMany(db.Remark, { foreignKey: 'user_id', })//relation user a plusieur remark 
db.Remark.belongsTo(db.User, { foreignKey: 'user_id' })// une remark appartient a un user


//----------------------------------//
//---Synchronisation des modèles---//
//sequelize.sync(err => {
//    console.log('Database sync error', err)
//})

//---- Alteration des tables sequelize
db.sequelize.sync({ alter: true })
//db.sequelize.sync({ alter: true, force: true })

module.exports = db