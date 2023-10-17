const express = require("express");
const dotev = require("dotenv");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
dotev.config();
// LOAD SCHEMA
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//LOAD DB METHODS
const mongoDataMethods = require("./data/db");

// CONNECT TO MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_API_KEY,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer();

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
