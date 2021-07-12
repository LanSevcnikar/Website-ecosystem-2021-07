const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); 
const Hashes = require('jshashes')
const jwt = require('jsonwebtoken'); //auth
const fs = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express');
const resolvers = require('./resolvers');
const db = require('./db');

const port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express();

app.use(cors(), bodyParser.json(), expressJwt({
   secret: jwtSecret,
   credentialsRequired: false,
   algorithms: ['sha1', 'RS256', 'HS256'],
}));

// Used to check tokens
app.use('/graphql', graphqlExpress((req) => ({
   schema,
   context: {user: req.user && db.students.get(req.user.sub)}
})));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

// Login a user
app.post('/login', (req, res) => {
   const email = req.body.email;
   const password = new Hashes.SHA256().b64(req.body.password);

   if(!email || !password) {
      res.sendStatus(401);
      return;
   }

   const user = db.students.list().find((user) =>  user.email === email);
   if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
   }
   
   // Set timer 
   const token = jwt.sign({sub: user.id}, jwtSecret, { expiresIn: 35 });
   console.info(token)
   res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));