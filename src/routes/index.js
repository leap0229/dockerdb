const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dockerdb', 'docker', 'docker', {
  dialect: 'mysql',
  host: 'db_mysql',
  port: 3306
});

router.get('/', (req, res) => {
  res.render('index', {
    'id': '',
    'username': '',
    'birthday': ''
  });
});

router.get('/db', (req, res) => {
  const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  });
  
  sequelize.sync().then(() => {
    return User.create({
      username: 'janedoe',
      birthday: new Date()
    });
  }).then((user) => {
    const newUser = user.get();

    res.render('index', {
      'id': newUser.id,
      'username': newUser.username,
      'birthday': newUser.birthday
    });
  }).catch(error => {
    console.log('error:', error);
  });
});

module.exports = router;
