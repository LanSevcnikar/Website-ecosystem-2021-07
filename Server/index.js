const express = require("express");
const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { refreshTokens } = require("./auth");

const { Client } = require("pg");
const pgClient = new Client({
  host: "192.168.248.107",
  port: 5432,
  database: "test",
  user: "postgres",
  password: "password",
});

const publickey = fs.readFileSync("./keys/public.key", "utf8");

const typeDefs = importSchema("./schema.graphql");
const resolvers = require("./resolvers");

const serverStartPluginApollo = {
  async serverWillStart() {
    await pgClient.connect().catch((e) => console.log(e));
  },
};

const serverEndPluginApollo = {
  async serverWillStop() {
    await pgClient.end();
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    //req.user is the data that was stored in the access token, even if expired, it is the data form the new access token
    // Clearly then, this data can be a bit old but that is okay
    const user = req.user;
    return { user: user, pg: pgClient };
  },
  plugins: [serverStartPluginApollo, serverEndPluginApollo],
});

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, 
  exposedHeaders: ["x-refresh-token", "x-token", "x-auth-success"],
};

const verifyOptions = {
  issuer: "Lan's code",
  algorithm: ["RRS256"],
};

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  // Code that is excecuted before login thing is varified
  // I am not using it and I could delte it but it serves as a reminder to me how this works
  next();
});

app.use(async (req, res, next) => {
  console.log('THis server is being called')
  // THis entire thing gets the tokens from the headers and validates them with the public key
  //First, it tried the access token, if that throws an error, it tries the refresh token, that can either throw and error or turout to be invalidated

  const accessToken = req.headers.authorization;
  const refreshToken = req.headers["x-grant-type"];
  try {
    const user = await jwt.verify(accessToken, publickey, verifyOptions);
    console.log("The access token was still valid");
    req.user = { ...user, accessToken, refreshToken };
    res.set("x-auth-success", true);
    next();
  } catch {
    try {
      const user = await jwt.verify(refreshToken, publickey, verifyOptions);
      const invalid_token = await pgClient.query('select * from invalid_tokens where token = $1', [refreshToken]);
      console.log(invalid_token.rows)
      if (invalid_token.rows.length > 0) {
        console.log("Token had been invalidated");
        res.set("x-auth-success", false);
        req.user = null;
        return next();
      }
      console.log("The refresh token was still valid but the access was not");
      const [newTokens, userData] = await refreshTokens(user.id, pgClient);
      req.user = { ...userData, accessToken, refreshToken };
      res.set("x-token", newTokens.token);
      res.set("x-refresh-token", newTokens.refreshToken);
      res.set("x-auth-success", true);
      next();
    } catch {
      console.log("Neither token was valid, if either were present");
      res.set("x-auth-success", false);
      req.user = null;
      next();
    }
  }
});
app.use(async (req, res, next) => {
  // Code that is excecuted afte login thing is varified
  //Same as before
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
