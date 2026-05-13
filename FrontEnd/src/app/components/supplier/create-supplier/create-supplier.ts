import { Component, inject } from '@angular/core';
import { Supplier } from '../../../interface/supplier';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-supplier',
  imports: [FormsModule],
  templateUrl: './create-supplier.html',
  styleUrl: './create-supplier.scss',
})
export class CreateSupplier {
cnpjExists: any;
onCnpjChange(arg0: string) {
throw new Error('Method not implemented.');
}

  supplierService = inject(SupplierService);
  activeModal = inject(NgbActiveModal);

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
        this.activeModal.close();
        console.log("Supplier created successfully:", data);
      }
    });     
  }

  validation(){
    return this.newSupplier.name != "" && this.newSupplier.cnpjCpf != "" && this.newSupplier.rg != "" && this.newSupplier.dateOfBirth != "" && this.newSupplier.address.cep != "" && this.newSupplier.address.street != "" && this.newSupplier.address.number != "" && this.newSupplier.address.city != "" && this.newSupplier.address.state != "" && this.newSupplier.email != "" && this.newSupplier.phone != "";
  }

}