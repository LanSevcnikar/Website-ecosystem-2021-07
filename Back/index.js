const { ApolloServer } = require("apollo-server");
const express = require("express");
const db = require("./db");
const resolvers = require("./resolvers");
const fs = require("fs");
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });
const jwt = require("jsonwebtoken");
const cors = require("cors")

const secret = "somecoolsecretkey";

const corseOptions = {
  origin: '*',
  credentials: true,
  exposedHeaders: ['Authorization', 'x-token', 'x-grant-type', 'Content-Type'],

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({res}) => {
    res.header('Authorization', 'value')

  },
  cors: corseOptions
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


