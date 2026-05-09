export interface Supplier {
   id: number;
    name: string;
    cnpjCpf: string;
    rg: string;
    dateOfBirth: string;
    address: {
        cep: string;
        street : string;
        number: string;
        complement: string;
        city: string;
        state: string;
    };
    email: string;
    phone: string;
}
