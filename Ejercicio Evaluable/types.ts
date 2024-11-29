import { OptionalId } from "mongodb";

export type FlightModel = OptionalId<{
    origen:string,
    destino:string,
    fechaYhora:string,
}>

export type Flight = {
    id:string,
    origen:string,
    destino:string,
    fechaYhora:string,
}