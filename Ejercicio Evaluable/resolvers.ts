import { Collection, ObjectId } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { fromModeltoFlight } from "./utils.ts";

export const resolvers = {

    Query: {

        getFlights: async (_:unknown,args: { origen:string, destino:string },context:{FlightsCollection:Collection<FlightModel>}):Promise<Flight[]> => {
            const origen = args.origen
            const destino = args.destino

            const FlightsModel = await context.FlightsCollection.find().toArray();
            return FlightsModel.map((f) => fromModeltoFlight(f));
        },

        getFlight: async (_:unknown, args: { id: string }, context:{FlightsCollection:Collection<FlightModel>}): Promise<Flight|null> => {
            const id = args.id;
            const FlightModel = await context.FlightsCollection.findOne({_id:new ObjectId(id)});
            if(!FlightModel){
                return null;
            }
            return fromModeltoFlight(FlightModel);
        },
    },

    Mutation: {
        addFlight: async(_:unknown, args:{origen:string,destino:string, fechaYhora:string },context:{FlightsCollection:Collection<FlightModel>}): Promise<Flight> =>{
            const {origen,destino,fechaYhora} = args;
            const {insertedId} = await context.FlightsCollection.insertOne({
                origen,
                destino,
                fechaYhora,
            })
            const FlightModel={
                _id:insertedId,
                origen,
                destino,
                fechaYhora,
            }
            return fromModeltoFlight(FlightModel);
        },

    },
}