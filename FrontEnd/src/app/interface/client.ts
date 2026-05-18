import { Address } from "./address";

export interface Client {
    id: number | null;
    name: string;
    cnpjCpf: string;
    email: string;
    address: Address;
}    
