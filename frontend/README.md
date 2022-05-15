# Projet 7: Groupomania

## _Créez un réseau social d’entreprise_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/kriss57/Groupomania.git)

Partie frontend réalisée avec le framework Vue.js , le backend avec node et la base de donnée : Mariadb.

## Tech

Pour fonctionner correctement Groupomania utilise:

- [Vue/cli] - Partie javascript frontend.
- [node.js] - Partie javascript backend.
- [Express] - Framework pour Node.js.
- [Mariadb] - Base de donnée Sql.
- [Sequelize] - Object-Relational Mapping

Clonez ce repository: [https://github.com/kriss57/Groupomania.git] depuis GitHub.

## Installation backend

Groupomania nécessite Node.js v10+ pour fonctionner.

**A la racine du dossier /backend:**

Merci de créer un dossier **/images**
Merci de renommer le fichier **.env.example** en **.env**
Ajoutez-y vos credentials de base de données:

```sh
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
```

**Démarrer l'API' :**

```sh
cd backend
npm i
npm run start
```

## Installation frontend

Groupomania nécéssite Vue CLI pour fonctionner(https://cli.vuejs.org/config/).

```sh
cd frontend
npm i
npm run serve
```

## Connexion a la page web

Démarrer frontend :

```sh
cd frontend
npm run serve
...le frontend est branché sur : http://localhost:8080/
```
