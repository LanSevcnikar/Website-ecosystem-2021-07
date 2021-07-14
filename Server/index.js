const express = require("express");
const db = require("./db");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { createTokens, refreshTokens } = require("./auth");
require("dotenv").config();


const jwtSecret = "ImagineJeFUlKulModel";

const typeDefs = importSchema("./schema.graphql");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const user = req.user;
    return { user: user };
  },
});

const app = express();

var corsOptions = {
  origin: "*",
  credentials: true, // <-- REQUIRED backend setting
  exposedHeaders: ['x-refresh-token', 'x-token', 'x-auth-success'],
};

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  // Code that is excecuted before login thing is varified
  next();
});

app.use(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.headers["x-grant-type"];
  try {
    const user = await jwt.verify(accessToken, jwtSecret);
    console.log("The access token was still valid");
    req.user = {...user, accessToken, refreshToken};
    res.set('x-auth-success', "true");
    next();
  } catch {
    try {
      const user = await jwt.verify(refreshToken, jwtSecret);
      const invalidatedThing = (db.invalidatedTokens.list().find((token) => token.token == refreshToken));
      if(invalidatedThing){
        console.log("Token had been invalidated");
        res.set('x-auth-success', "false");
        req.user = null;
        return next();
      }
      console.log("The refresh token was still valid but the access was not");
      const [newTokens, userData] = await refreshTokens(user.id, jwtSecret);
      req.user =  {...userData, accessToken, refreshToken};;
      res.set('x-token', newTokens.token);
      res.set('x-refresh-token', newTokens.refreshToken);
      res.set('x-auth-success', "true");
      next();
    } catch {
      console.log("Neither token was valid, if either were present");
      res.set('x-auth-success', "false");
      req.user = null;
      next();
    }
  }
});
app.use(async (req, res, next) => {
  // Code that is excecuted afte login thing is varified
  next();
});

const startServer = async function () {
  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();