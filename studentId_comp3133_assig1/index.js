const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");
const { PORT, JWT_SECRET } = require("./src/config/env");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getUser = (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";
    return { userLoggedIn: getUser(token) };
  },
});

server.applyMiddleware({
  app,
});
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
