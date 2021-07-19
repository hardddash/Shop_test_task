import {Shop} from "./shop";

export interface CashRegister {
    cashregister_id: number,
    number: number,
    terminal_working: boolean,
    shop: Shop
}