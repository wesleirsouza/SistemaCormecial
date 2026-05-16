import { Address } from "./address";

export interface Supplier {
   id: number;
    name: string;
    cnpjCpf: string;
    rg: string;
    dateOfBirth: string;
    email: string;
    address: Address;
}
