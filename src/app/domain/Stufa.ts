import { Cliente } from "./Cliente";

export interface Stufa{

    //{[{"titolo":"VALLY IDRO","scadanno":null,"idCliente":1045,"importo":null,"annotazione":"8\/1\/14 CONTROLLO £40"},{"titolo":"ROSY","scadanno":null,"idCliente":1039,"importo":null,"annotazione":"NO FLUSS  £50"},
    id?:number
    titolo?:string
    scadanno?:string
    importo?:string
    scadbollo?:string
    annotazione?:string
    cliente?:Cliente

}