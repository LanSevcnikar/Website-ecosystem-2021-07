const { ApolloServer } = require("apollo-server");
const express = require("express");
const db = require("./db");
const resolvers = require("./resolvers");
const fs = require("fs");
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });
const jwt = require("jsonwebtoken");

const secret = "somecoolsecretkey";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req } => { 
    
    
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
