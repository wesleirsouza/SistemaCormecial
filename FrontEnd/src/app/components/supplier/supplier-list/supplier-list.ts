import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { Supplier } from '../../../interface/supplier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateSupplier } from '../create-supplier/create-supplier';
import { EditSupplier } from '../edit-supplier/edit-supplier';
import { DeleteSupplier } from '../delete-supplier/delete-supplier';


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

  openModalEdit(
        supplier : Supplier, 
        dialogSize: 'sm' | 'lg' | 'md' = 'md'
      ){
        const modalRef = this.modalService.open(EditSupplier, {
          size: dialogSize,
          centered: false,
        });
        modalRef.componentInstance.supplier = supplier;
        return modalRef.result.then(() => {
          this.ngOnInit();
        })
      }

  openModalDelete(
        supplier : Supplier, 
        dialogSize: 'sm' | 'lg' | 'md' = 'md' 
      ){
        const modalRef = this.modalService.open(DeleteSupplier, {
          size: dialogSize,
          centered: false,
        });
        modalRef.componentInstance.supplier = supplier;
        return modalRef.result.then(() => {
          this.ngOnInit();
        })
      }    
  
}
