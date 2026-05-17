import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { Supplier } from '../../../interface/supplier';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-supplier',
  imports: [FormsModule],
  templateUrl: './edit-supplier.html',
  styleUrl: './edit-supplier.scss',
})
export class EditSupplier {

  supplierService = inject(SupplierService);
  activeModal = inject(NgbActiveModal);

  @Input() supplier!: Supplier;

  editSupplier(){

    if(!this.validation()){
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if(!this.validateCpfCnpj(this.supplier.cnpjCpf)){
      alert("CPF ou CNPJ Cadastrado!");
      return;
    }

    this.supplierService.updateSupplier(this.supplier).subscribe({
      next: (data: Supplier) => {
        this.activeModal.close();
      }
    });
  }

  validation(){
    return this.supplier.name != "" &&
           this.supplier.cnpjCpf != "" &&
           this.supplier.rg != "" &&
           this.supplier.dateOfBirth != "" &&
           this.supplier.email != "" &&
           this.supplier.address.cep != "" &&
           this.supplier.address.street != "" &&
           this.supplier.address.number != "" &&
           this.supplier.address.city != "" &&
           this.supplier.address.state != "";
  }

  validateCpfCnpj(value: string): boolean {

    const cpfCnpj = value.replace(/\D/g, '');

    if (cpfCnpj.length === 11) {
      return this.validateCPF(cpfCnpj);
    }

    if (cpfCnpj.length === 14) {
      return this.validateCNPJ(cpfCnpj);
    }

    return false;
  }

  validateCPF(cpf: string): boolean {

    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstDigit = 11 - (sum % 11);

    if (firstDigit >= 10) firstDigit = 0;

    if (firstDigit != parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let secondDigit = 11 - (sum % 11);

    if (secondDigit >= 10) secondDigit = 0;

    return secondDigit == parseInt(cpf.charAt(10));
  }

  validateCNPJ(cnpj: string): boolean {

    if (/^(\d)\1+$/.test(cnpj)) return false;

    const size = cnpj.length - 2;
    const numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);

    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;

      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result != parseInt(digits.charAt(0))) {
      return false;
    }

    const size2 = size + 1;
    const numbers2 = cnpj.substring(0, size2);

    sum = 0;
    pos = size2 - 7;

    for (let i = size2; i >= 1; i--) {
      sum += parseInt(numbers2.charAt(size2 - i)) * pos--;

      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return result == parseInt(digits.charAt(1));
  }
}