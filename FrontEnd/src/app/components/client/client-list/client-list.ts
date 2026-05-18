import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Client } from '../../../interface/client';
import { ClientService } from '../../../services/client/client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateClient } from '../create-client/create-client';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {

  constructor(private cdr: ChangeDetectorRef){}

  clientService = inject(ClientService);
  modalService = inject(NgbModal);
  listClients: Client[] = [];

  newClient : Client = {
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
    this.getClients();
  }
  getClients() {
    throw new Error('Method not implemented.');
  }

  openModalCreate(
          dialogSize: 'sm' | 'lg' | 'md' = 'md'
        ){
          const modalRef = this.modalService.open(CreateClient, {
            size: dialogSize,
            centered: false,
          });
          return modalRef.result.then(() => {
            this.ngOnInit();
          })
        }

}
