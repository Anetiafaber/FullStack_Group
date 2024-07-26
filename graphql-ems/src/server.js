// Importing schema and resolver
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "../resolvers/resolvers.js";

// Importing Apollo Server
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// MONGO DB
// import { dbConfig } from "../config/database.config.js";
import dotenv from "dotenv";
dotenv.config();
import { mongoose } from "mongoose";

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
      useNewUrlParser: true,
    })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });


// Importing typedef/schema
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const typeDefs = fs.readFileSync(
    path.join(__dirname, "../schemas/schema.graphql"),
    "utf-8"
);


// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});
console.log(`🚀  Server ready at: ${url}`);