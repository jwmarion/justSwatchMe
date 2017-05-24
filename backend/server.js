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
  database: 'swatchme'
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
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into User
        values (default, $1, $2)
        returning username
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
    'select * from User where username = $1',
    username)
    .then(customer =>
      [customer,
        bcrypt.compare(password, customer.password)])
    .spread((customer, matches) => {
      if (matches) {
        return [
          customer,
          db.one(
            `insert into login_session values
            ($1, default, $2) returning *`,
            [token, customer.id]
          )
        ];
      } else {
        throw new Error('Login failed.');
      }
    })
    .spread((customer, loginSession) => {
      resp.json({
        username: customer.username,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        auth_token: loginSession.token,
        id: customer.id
      });
    });
});

app.post('/api/user/postswatch', (req, resp, next) => {
  db.none(
    `insert into swatch values(default,$1,$2,$3,$4,default)`,[
    req.body.user, req.body.h,req.body.s,req.body.l])
    .then(resp.json('complete'));
});

// app.get('/api/user/cart_contents'),(req,resp,next) =>{
//   db.any{
//     `select name, price from product where`
//   }
// }

app.listen(3003, () => console.log('Listening on 3003.'));
