import { MongoClient } from "mongodb";
import { FlightModel } from "./types.ts";
import { schema } from "./schema.ts";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
    console.error("Error al encontrar la variable de entorno");
    Deno.exit(1);
}

const client = new MongoClient("MONGO_URL")
await client.connect();

console.info("Conectado a MongoDB");

const db = client.db("flights");
const FlightsCollection = db.collection<FlightModel>("Flights");

const server = new ApolloServer({
    typeDefs:schema,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    context: async () => ({FlightsCollection}),
});

console.info(`Server ready at ${url}`);

