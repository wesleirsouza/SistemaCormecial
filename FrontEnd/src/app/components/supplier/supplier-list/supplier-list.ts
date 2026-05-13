import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { Supplier } from '../../../interface/supplier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateSupplier } from '../create-supplier/create-supplier';


@Component({
  selector: 'app-supplier-list',
  imports: [],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss',
})
export class SupplierList {
  constructor(private cdr: ChangeDetectorRef){}

  supplierService = inject(SupplierService);
  modalService = inject(NgbModal);
  listSuppliers: Supplier[] = [];

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
  }
 
  ngOnInit(){
    this.supplierService.findAll().subscribe({
      next: (data : Supplier[]) => {
        this.listSuppliers = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      }
    })
  }

  openModalCreate(
      dialogSize: 'sm' | 'lg' | 'md' = 'md'
    ){
      const modalRef = this.modalService.open(CreateSupplier, {
        size: dialogSize,
        centered: false,
      });
      return modalRef.result.then(() => {
        this.ngOnInit();
      })
    }
  
}
