
import { Flight, FlightModel } from "./types.ts";

export const fromModeltoFlight = (FlightModel:FlightModel):Flight =>{

    return{
        id:FlightModel._id!.toString(),
        origen:FlightModel.origen,
        destino:FlightModel.destino,
        fechaYhora:FlightModel.fechaYhora
    };
}