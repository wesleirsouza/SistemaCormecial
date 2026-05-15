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
onCnpjChange() {
  console.log(this.newSupplier.cnpjCpf);
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
    console.log(this.newSupplier);

  const document = this.newSupplier.cnpjCpf.replace(/\D/g, '');

  if(document.length === 11){

    console.log('CPF detectado');

    if(!this.validateCpf(document)){

      alert('CPF inválido');

      return;

    }

  } 
  
  else if(document.length === 14){

    console.log('CNPJ detectado');

    if(!this.validateCnpj(document)){

      alert('CNPJ inválido');

      return;

    }

  } 
  
  else {

    alert('Documento inválido');

    return;

  }


  this.supplierService.createSupplier(this.newSupplier).subscribe({

    next: (data : Supplier) => {

      this.activeModal.close();

      console.log("Supplier created successfully:", data);

    },

    error: (err) => {

      console.error(err);

    }

  });

}

validateCpf(cpf: string): boolean {

  cpf = cpf.replace(/\D/g, '');

  if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)){
    return false;
  }

  let sum = 0;

  for(let i = 0; i < 9; i++){
    sum += Number(cpf.charAt(i)) * (10 - i);
  }

  let firstDigit = 11 - (sum % 11);

  if(firstDigit >= 10){
    firstDigit = 0;
  }

  if(firstDigit !== Number(cpf.charAt(9))){
    return false;
  }

  sum = 0;

  for(let i = 0; i < 10; i++){
    sum += Number(cpf.charAt(i)) * (11 - i);
  }

  let secondDigit = 11 - (sum % 11);

  if(secondDigit >= 10){
    secondDigit = 0;
  }

  return secondDigit === Number(cpf.charAt(10));

}

validateCnpj(cnpj: string): boolean {

  cnpj = cnpj.replace(/\D/g, '');

  if(cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)){
    return false;
  }

  let length = cnpj.length - 2;

  let numbers = cnpj.substring(0, length);

  let digits = cnpj.substring(length);

  let sum = 0;

  let pos = length - 7;

  for(let i = length; i >= 1; i--){

    sum += Number(numbers.charAt(length - i)) * pos--;

    if(pos < 2){
      pos = 9;
    }

  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if(result !== Number(digits.charAt(0))){
    return false;
  }

  length = length + 1;

  numbers = cnpj.substring(0, length);

  sum = 0;

  pos = length - 7;

  for(let i = length; i >= 1; i--){

    sum += Number(numbers.charAt(length - i)) * pos--;

    if(pos < 2){
      pos = 9;
    }

  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  return result === Number(digits.charAt(1));

}

  validation(){
    return this.newSupplier.name != "" && this.newSupplier.cnpjCpf != "" && this.newSupplier.rg != "" && this.newSupplier.dateOfBirth != "" && this.newSupplier.address.cep != "" && this.newSupplier.address.street != "" && this.newSupplier.address.number != "" && this.newSupplier.address.city != "" && this.newSupplier.address.state != "" && this.newSupplier.email != "";
  }

}