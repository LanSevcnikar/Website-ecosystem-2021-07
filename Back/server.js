const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const Hashes = require('jshashes')
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = process.env.PORT || 9000
const secret = "SomeSecret"

const app = express();
app.use(cors())
app.use(bodyParser.json())

// Login a user
app.post('/login', (req, res) => {
   const email = req.body.email;
   const password = new Hashes.SHA256().b64(req.body.password);

   if (!email || !password) {
      res.sendStatus(401);
      return;
   }

   const user = db.students.list().find((user) => user.email === email);
   if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
   }

   // Set timer 
   const token = jwt.sign({ sub: user.id }, secret, { expiresIn: 180 });
   console.log(token)
   res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
