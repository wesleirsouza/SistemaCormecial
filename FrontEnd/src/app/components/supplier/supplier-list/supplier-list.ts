import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SupplierService } from '../../../services/supplierService/supplier-service';
import { Supplier } from '../../../interface/supplier';


@Component({
  selector: 'app-supplier-list',
  imports: [],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss',
})
export class SupplierList {
  constructor(private cdr: ChangeDetectorRef){}

  supplierService = inject(SupplierService);
  listSuppliers: Supplier[] = [];

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
}
