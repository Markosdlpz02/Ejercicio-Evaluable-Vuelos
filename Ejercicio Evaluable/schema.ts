export const schema = `#graphql

type Flight {
    id:ID!
    origen:String!,
    destino:String!,
    fechaYhora:String!
}

type Query {

    getFlights (origen:String, destino:String):Flight!
    getFlight (id:ID!): Flight
}

type Mutation {

    addFlight(origen:String!, destino:String!, fechaYhora:String!): Flight!
    
}

`;