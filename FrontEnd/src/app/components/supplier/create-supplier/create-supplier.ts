import { Component, inject } from '@angular/core';
import { Supplier } from '../../../interface/supplier';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-supplier',
  imports: [FormsModule],
  templateUrl: './create-supplier.html',
  styleUrl: './create-supplier.scss',
})
export class CreateSupplier {

  supplierService = inject(SupplierService);

  newSupplier : Supplier = {
    id: 0,
    name: '',
    cnpjCpf: '',
    rg: '',
    dateOfBirth: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: ''
    },
    email: '',
    phone: ''
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