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
    email: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: ''
    },
  }
  ngOnInit(): void {
  this.getSuppliers();
}

  getSuppliers(){
    this.supplierService.findAll().subscribe({
      next: (data : Supplier[]) => {
        this.listSuppliers = data;
        this.cdr.detectChanges();
      }
    })
  }

  openModalCreate(
  event: Event,
  dialogSize: 'sm' | 'lg' | 'md' = 'md'
){
  (event.target as HTMLElement).blur();

  const modalRef = this.modalService.open(CreateSupplier, {
  });

  modalRef.result.then((result) => {

    if(result){
      this.listSuppliers.push(result);
    }
    

  }).catch(() => {});
  return modalRef.result.then(() => {
        this.ngOnInit();
        })
}
  
}
