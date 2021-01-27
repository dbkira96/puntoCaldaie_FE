import { Caldaia } from "./Caldaia";
import { Cliente } from "./Cliente";
import { Stufa } from "./Stufa";

export interface Backup{
    clienti?:Cliente[]
    stufe?:Stufa[]
    caldaie?:Caldaia[]
    
}