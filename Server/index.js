const express = require("express");
const db = require("./db");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const cookieParser = require("cookie-parser");
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
  context: (req) => {
    const user = req.user;
    return { userId: user };
  },
});

const app = express();

var corsOptions = {
  origin: "*",
  credentials: true, // <-- REQUIRED backend setting
  exposedHeaders: ['x-refresh-token', 'x-token'],
};

app.use(cors(corsOptions));
app.use(cookieParser());//add async
app.use(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.headers["x-grant-type"];
  console.log("requesttoken",refreshToken)
  try {
    const user = jwt.verify(accessToken, jwtSecret);
    console.log("The access token was still okokok", user);
    req.user = user;
    next();
  } catch {
    try {
      console.log("Literally plz", refreshToken)
      const user = jwt.verify(refreshToken, jwtSecret);
      console.log("The refresh token was still okokok but the access was not", user);
      const newTokens = await refreshTokens(user.id, jwtSecret);
      req.user = user;

      //This is where the problem lies at the moment
      console.log(newTokens.token,newTokens.refreshToken);
      res.set('x-token', newTokens.token);
      res.set('x-refresh-token', newTokens.refreshToken);
      console.log("What");
      next();
    } catch {
      
      console.log("Everything is bad");
      req.user = null;
      next();
    }
  }
});
app.use(async (req, res, next) => {
  // if (!req.userId) return next();
  // const user = await db.query.user(
  //   { where: { id: req.userId } },
  //   '{id, permissions, email, name}' //the graphql query to pass to the user query
  // );
  next();
});

const startServer = async function () {
  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: false, // disables the apollo-server-express cors to allow the cors middleware use
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch