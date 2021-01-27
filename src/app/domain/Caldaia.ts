import { Cliente } from "./Cliente";

export interface Caldaia{
    id?:number
    titolo?:string
    scadenza?:string
    scadanno?:string
    importo?:string
    scadbollo?:string
    annotazione?:string
    cliente?:Cliente
}