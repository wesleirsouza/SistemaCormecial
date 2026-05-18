import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ClientService } from '../../../services/client/client';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-client.html',
  styleUrls: ['./create-client.scss'],
})
export class CreateClient implements OnInit {

  private clientService = inject(ClientService);
  activeModal = inject(NgbActiveModal);

  private documentSubject = new Subject<string>();
  private cepSubject = new Subject<string>();

  documentType: 'CPF' | 'CNPJ' | 'INVALID' = 'INVALID';

  isSubmitting = false;
  isCheckingDocument = false;
  documentExists = false;

  isCepLoading = false;

  errorMessage = '';
  cepError = '';

  newClient = {
    id: null,
    name: '',
    cnpjCpf: '',
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


  onCnpjCpfChange(): void {

    this.formatCpfCnpj();

    this.documentSubject.next(this.newClient.cnpjCpf);
  }

  formatCpfCnpj(): void {

    let value = this.newClient.cnpjCpf || '';

    value = value.replace(/\D/g, '');

    
    if (value.length <= 11) {

      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    } else {

      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    this.newClient.cnpjCpf = value;
  }

  checkDocument(value: string): void {

    this.documentType = this.getDocumentType(value);

    this.documentExists = false;

    if (!this.isDocumentValid()) {
      return;
    }

    this.isCheckingDocument = true;

    const cleanDocument = value.replace(/\D/g, '');

    this.clientService.findByCnpjCpf(cleanDocument).subscribe({

      next: (response: any) => {

        this.documentExists = !!response;

        this.isCheckingDocument = false;
      },

      error: () => {

        this.documentExists = false;

        this.isCheckingDocument = false;
      }

    });
  }

  getDocumentType(value: string): 'CPF' | 'CNPJ' | 'INVALID' {

    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return this.validateCpf(cleaned) ? 'CPF' : 'INVALID';
    }

    if (cleaned.length === 14) {
      return this.validateCnpj(cleaned) ? 'CNPJ' : 'INVALID';
    }

    return 'INVALID';
  }

  isDocumentValid(): boolean {
    return this.documentType === 'CPF' || this.documentType === 'CNPJ';
  }

  validateCpf(cpf: string): boolean {

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += Number(cpf.charAt(i)) * (10 - i);
    }

    let firstDigit = 11 - (sum % 11);

    if (firstDigit >= 10) {
      firstDigit = 0;
    }

    if (firstDigit !== Number(cpf.charAt(9))) {
      return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += Number(cpf.charAt(i)) * (11 - i);
    }

    let secondDigit = 11 - (sum % 11);

    if (secondDigit >= 10) {
      secondDigit = 0;
    }

    return secondDigit === Number(cpf.charAt(10));
  }

  validateCnpj(cnpj: string): boolean {

    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let size = cnpj.length - 2;

    let numbers = cnpj.substring(0, size);

    const digits = cnpj.substring(size);

    let sum = 0;

    let pos = size - 7;

    for (let i = size; i >= 1; i--) {

      sum += Number(numbers.charAt(size - i)) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== Number(digits.charAt(0))) {
      return false;
    }

    size++;

    numbers = cnpj.substring(0, size);

    sum = 0;

    pos = size - 7;

    for (let i = size; i >= 1; i--) {

      sum += Number(numbers.charAt(size - i)) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return result === Number(digits.charAt(1));
  }

  onCepChange(): void {

    this.formatCep();

    this.cepSubject.next(this.newClient.address.cep);
  }

  formatCep(): void {

    let value = this.newClient.address.cep || '';

    value = value.replace(/\D/g, '');

    value = value.replace(/^(\d{5})(\d)/, '$1-$2');

    this.newClient.address.cep = value;
  }

  searchCep(value: string): void {

    const cep = value.replace(/\D/g, '');

    if (cep.length !== 8) {

      this.cepError = '';

      return;
    }

    this.isCepLoading = true;

    this.cepError = '';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())

      .then((data) => {

        if (data.erro) {

          this.cepError = 'CEP não encontrado.';

          return;
        }

        this.newClient.address.street = data.logradouro || '';

        this.newClient.address.city = data.localidade || '';

        this.newClient.address.state = data.uf || '';

        this.newClient.address.complement = data.complemento || '';
      })

      .catch(() => {

        this.cepError = 'Erro ao buscar CEP.';
      })

      .finally(() => {

        this.isCepLoading = false;
      });
  }

  isFormValid(): boolean {

    const client = this.newClient;

    return (

      client.name.trim() !== '' &&
      client.email.trim() !== '' &&

      client.address.cep.trim() !== '' &&
      client.address.street.trim() !== '' &&
      client.address.number.trim() !== '' &&
      client.address.city.trim() !== '' &&
      client.address.state.trim() !== '' &&

      this.isDocumentValid() &&
      !this.documentExists &&
      !this.isCheckingDocument
    );
  }

  createClient(): void {

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;

    this.errorMessage = '';

    const clientToSend = {

      ...this.newClient,

      cnpjCpf: this.newClient.cnpjCpf.replace(/\D/g, ''),

      address: {
        ...this.newClient.address,
        cep: this.newClient.address.cep.replace(/\D/g, '')
      }
    };

    this.clientService.createClient(clientToSend).subscribe({

      next: () => {

        this.isSubmitting = false;

        this.activeModal.close('created');
      },

      error: (err) => {

        console.error('Erro ao criar cliente:', err);

        this.isSubmitting = false;

        this.errorMessage = 'Erro ao cadastrar cliente. Tente novamente.';
      }

    });
  }
}