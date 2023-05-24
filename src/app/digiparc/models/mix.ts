import { Exp } from "./exp";

export interface Mix{
    _id?: string,
    numero: string,
    dateC: string,
    dateD: string,
    client: string,
    reference: string,
    cmr: string,
    bool1: boolean,
    bool2: boolean,
    cmtr: string,
    expediteur: Exp[],
    menu: boolean
}