const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');

const db = pgp({
  database: 'justswatchme'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/swatches', (req, resp, next) => {
  db.any('select * from swatch')
    .then(data => resp.json(data))
    .catch(next);
});

app.post('/api/user/signup', (req, resp, next) => {
  let data = req.body;
  console.log(req.body);
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into "user" values (default, $1, $2) returning username
        `,
        [
          data.username,
          encryptedPassword
        ]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});


app.post('/api/user/login', (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;
  db.one(
    'select * from "user" where username = $1',
    username)
    .then(user =>
      [user, bcrypt.compare(password, user.password)])
    .spread((user, matches) => {
      if (matches) {
        return [
          user,
        ];
      } else {
        throw new Error('Login failed.');
      }
    })
    .spread((user) => {
      resp.json({
        username: user.username,
        id: user.id
      });
    });
});


app.post('/api/user/postswatch', (req, resp, next) => {
  db.none(
    `insert into swatch values(default,$1,$2,default)`,[
    req.body.user, req.body.swatch])
    .then(resp.json('complete'));
});

// app.get('/api/user/cart_contents'),(req,resp,next) =>{
//   db.any{
//     `select name, price from product where`
//   }
// }

app.listen(3003, () => console.log('Listening on 3003.'));
