import { Caldaia } from "./Caldaia";
import { Stufa } from "./Stufa";

export interface Cliente{

    id?:number
    nominativo?:string
    luogoNascita?:string
    dataNascita?:Date
    telefono?:string
    indirizzo?:string
    cap?:string
    citta?:string
    cf?:string
    piva?:string
    cellulare?:string
    stufe?:Stufa[]
    caldaie?:Caldaia[]
}