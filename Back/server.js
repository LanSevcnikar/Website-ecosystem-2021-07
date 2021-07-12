const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const Hashes = require('jshashes')
const jwt = require('jsonwebtoken'); //auth
const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const resolvers = require('./resolvers');
const db = require('./db');
const { ApolloServer } = require('apollo-server');

const port = process.env.PORT || 9000
const jwtSecret = Buffer.from('LanHasAsecrLyANdn', 'base64');
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// Used to check tokens
app.use('/api', graphqlExpress((req) => {
   console.log(req)
   console.log(req.headers.authorization)
   return ({
      schema,
      context: { user: req.user }
   })
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

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
   const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: 60 });
   console.log(token)
   res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTeVBVMkxZVE8iLCJpYXQiOjE2MjYwODM2NTUsImV4cCI6MTYyNjA4MzcxNX0.uUsF7XaI4cFabDw7T3w9ypVy86d_vuCqAZnQEZECN54