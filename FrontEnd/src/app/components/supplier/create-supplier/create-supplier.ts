import { Component, inject, OnInit } from '@angular/core';
import { Supplier } from '../../../interface/supplier';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
  selector: 'app-create-supplier',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-supplier.html',
  styleUrl: './create-supplier.scss',
})
export class CreateSupplier {

  supplierService = inject(SupplierService);
  activeModal = inject(NgbActiveModal);
  private documentSubject = new Subject<string>();
  private cepSubject = new Subject<string>();

  documentType: 'CPF' | 'CNPJ' | 'INVALID' = 'INVALID';
  isSubmitting = false;
  errorMessage = '';

  newSupplier: Supplier = {
    id: null,
    name: '',
    cnpjCpf: '',
    rg: '',
    dateOfBirth: '',
    email: '',
    address: {
      cep: '',
      street: '',
      number: '',
      city: '',
      state: '',
      complement: ''
    }
  };

  isCheckingDocument = false;
  documentExists = false;
ngOnInit(): void {

  this.documentSubject.pipe(
    debounceTime(500),
    distinctUntilChanged()
  ).subscribe((value: string) => {
    this.checkDocument(value);
  });

  this.cepSubject.pipe(
    debounceTime(500),
    distinctUntilChanged()
  ).subscribe((value: string) => {
    this.searchCep(value);
  });

}
 
formatCpfCnpj() {

  let value = this.newSupplier.cnpjCpf || '';

  value = value.replace(/\D/g, '');

  if (value.length <= 11) {

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  }else {

    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  }

  this.newSupplier.cnpjCpf = value;
}

onCnpjCpfChange() {
  this.documentSubject.next(this.newSupplier.cnpjCpf);
}

checkDocument(value: string) {

  this.documentType = this.getDocumentType(value);
  this.documentExists = false;

  if (!this.isDocumentValid()) return;

  this.isCheckingDocument = true;

  const cleanDocument = value.replace(/\D/g, '');

  this.supplierService.findByCnpjCpf(cleanDocument).subscribe({
    next: (exists: boolean) => {

      this.documentExists = exists;
      this.isCheckingDocument = false;

    },
    error: () => {
      this.isCheckingDocument = false;
    }
  });
}

  getDocumentType(value: string): 'CPF' | 'CNPJ' | 'INVALID' {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) return this.validateCpf(cleaned) ? 'CPF' : 'INVALID';
    if (cleaned.length === 14) return this.validateCnpj(cleaned) ? 'CNPJ' : 'INVALID';
    return 'INVALID';
  }

  isDocumentValid(): boolean {
    return this.documentType === 'CPF' || this.documentType === 'CNPJ';
  }

  isFormValid(): boolean {
  const s = this.newSupplier;
  return (
    s.name !== '' &&
    s.email !== '' &&
    s.rg !== '' &&
    s.dateOfBirth !== '' &&
    s.address.cep !== '' &&
    s.address.street !== '' &&
    s.address.number !== '' &&
    s.address.city !== '' &&
    s.address.state !== '' &&
    this.isDocumentValid() &&
    !this.documentExists &&       
    !this.isCheckingDocument      
  );
}

  createSupplier() {

  if (!this.isFormValid()) return;

  this.isSubmitting = true;
  this.errorMessage = '';

  const supplierToSend = {
    ...this.newSupplier,
    cnpjCpf: this.newSupplier.cnpjCpf.replace(/\D/g, '')
  };

  this.supplierService.createSupplier(supplierToSend).subscribe({
    next: () => {
      this.isSubmitting = false;
      this.activeModal.close('created');
    },
    error: (err) => {
      this.isSubmitting = false;
      this.errorMessage = 'Erro ao cadastrar fornecedor. Tente novamente.';
      console.error('Error creating supplier:', err);
    }
  });
}

  validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(cpf.charAt(i)) * (10 - i);
    let first = 11 - (sum % 11);
    if (first >= 10) first = 0;
    if (first !== Number(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(cpf.charAt(i)) * (11 - i);
    let second = 11 - (sum % 11);
    if (second >= 10) second = 0;
    return second === Number(cpf.charAt(10));
  }

  validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) return false;

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === Number(digits.charAt(1));
  }

  isCepLoading = false;
  cepError = '';

formatCep() {

  let value = this.newSupplier.address.cep || '';

  value = value.replace(/\D/g, '');

  value = value.replace(/^(\d{5})(\d)/, '$1-$2');

  this.newSupplier.address.cep = value;
}

onCepChange() {
  this.cepSubject.next(this.newSupplier.address.cep);
}

searchCep(value: string) {

  const cep = value.replace(/\D/g, '');

  if (cep.length !== 8) return;

  this.isCepLoading = true;
  this.cepError = '';

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {

      if (data.erro) {
        this.cepError = 'CEP não encontrado.';
        return;
      }

      this.newSupplier.address.street     = data.logradouro  || '';
      this.newSupplier.address.city       = data.localidade  || '';
      this.newSupplier.address.state      = data.uf          || '';
      this.newSupplier.address.complement = data.complemento || '';

    })
    .catch(() => {
      this.cepError = 'Erro ao buscar CEP.';
    })
    .finally(() => {
      this.isCepLoading = false;
    });

}
}