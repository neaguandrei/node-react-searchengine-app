const Sequelize = require('sequelize');

// Setting up the connection. Currently testing with phpmyadmin // dbname: project-tw ; user: root; pw: null
const sequelize = new Sequelize('project-tw', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      "max": 1,
      "min": 0,
      "idle": 20000,
      "acquire": 20000
    }
  });

    // Syncing database -> force: true daca vreau sa dau drop table / false daca vreau sa le las asa.
    let forceState = false;
    sequelize
      .sync({ force: forceState })
      .then(() => {
        if (forceState === false) {
          console.log('Database stays the same. Nothing was dropped');
        } else {
          console.log('Database created successfully');
        }
    })

// Forming the database object
const db = {};

db.user =  sequelize.import('../models/User.js');
db.search = sequelize.import('../models/Search.js');
db.preference = sequelize.import('../models/Preference.js');
db.comment = sequelize.import('../models/Comment.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;