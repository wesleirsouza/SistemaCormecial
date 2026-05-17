import { Component, inject, Input } from '@angular/core';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from '../../../interface/supplier';

@Component({
  selector: 'app-delete-supplier',
  imports: [],
  templateUrl: './delete-supplier.html',
  styleUrl: './delete-supplier.scss',
})
export class DeleteSupplier {
  supplierService = inject(SupplierService);
  activeModal = inject(NgbActiveModal);

  @Input() supplier! : Supplier;
    
  deleteSupplier(){
    this.supplierService.deleteSupplier(this.supplier).subscribe({
      next: () => {
        this.activeModal.close()
      }
    })
  }
}
