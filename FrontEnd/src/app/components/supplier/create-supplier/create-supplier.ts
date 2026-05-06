import { Component, inject } from '@angular/core';
import { Supplier } from '../../../interface/supplier';
import { SupplierService } from '../../../services/supplierService/supplier-service';

@Component({
  selector: 'app-create-supplier',
  imports: [],
  templateUrl: './create-supplier.html',
  styleUrl: './create-supplier.scss',
})
export class CreateSupplier {

  supplierService = inject(SupplierService);

  newSupplier : Supplier = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    cnpjCpf: '',
    rgIe: '',
    dateOfBirth: '',
    cep: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  };

   createSupplier(){
    this.supplierService.createSupplier(this.newSupplier).subscribe({
      next: (data : Supplier) => {
        console.log("Supplier created successfully:", data);
      }
    });
    return this.newSupplier.name != "" && this.newSupplier.cnpjCpf; 
  }



}