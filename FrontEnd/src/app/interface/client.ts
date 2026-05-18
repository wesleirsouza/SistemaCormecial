import { Address } from "./address";

export interface Client {
    id: number | null;
    name: string;
    cnpjCpf: string;
    dateOfBirth: string;
    email: string;
    address: Address;
}    
