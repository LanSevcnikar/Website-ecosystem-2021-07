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
  context: ({ req, res }) => {
    //console.log(res);
    const token = req.headers.authorization || "";
    const refreshToken = req.headers['x-grant-type'] || "";
    
    res.cookie("refresh-token", "something");
    res.cookie("access-token", "somethingelse");
    return res;
    try {
      const user = jwt.verify(token, secret);
      return { user };
    } catch {
      return {};
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
