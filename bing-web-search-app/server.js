const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');

const users = require('./routes/api/users');
const searches = require('./routes/api/searches');
const comments = require('./routes/api/comments');
const preferences = require('./routes/api/preferences');

const sequelize = require('./db/db').sequelize;

const app = express();
app.use(bodyParser.json());

// Testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error(`Unable to connect to the database: ${err}`);
  });


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Using routes
app.use('/api/users', users);
app.use('/api/searches', searches);
app.use('/api/comments', comments);
app.use('/api/preferences', preferences);

// Importing database models
const User = sequelize.import('./models/User');
const Comment = sequelize.import('./models/Comment');
const Search = sequelize.import('./models/Search');
const Preference = sequelize.import('./models/Preference');

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server started on port ${port}`));