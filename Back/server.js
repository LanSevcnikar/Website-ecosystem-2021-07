const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); 
const Hashes = require('jshashes')

const jwt = require('jsonwebtoken'); //auth
const db = require('./db');

var port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema} = require('graphql-tools')

const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json(), expressJwt({
   secret: jwtSecret,
   credentialsRequired: false,
   algorithms: ['sha1', 'RS256', 'HS256'],
}));

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')


// I have no idea how but this somehow makes sure that it is the correct token. Changing the token is difficult
app.use('/graphql', graphqlExpress((req) => ({
   schema,
   context: {user: req.user && db.students.get(req.user.sub)}
})));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

//authenticate students
app.post('/login', (req, res) => {
   const email = req.body.email;
   let password = req.body.password;
   password =  new Hashes.SHA256().b64(password)
   console.info('Hi', email, password)

   if(!email || !password) {
      res.sendStatus(401);
      return;
   }

   const user = db.students.list().find((user) =>  user.email === email);
   if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
   }
   const token = jwt.sign({sub: user.id}, jwtSecret, { expiresIn: '1h' });
   res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));