import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../../interface/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  

  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/supplier";

  public findAll() {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  public findById(id: number) {
    return this.http.get<Supplier>(this.apiUrl+"/"+id);
  }

  public createSupplier(supplier: Supplier) {
    return this.http.post<Supplier>(this.apiUrl, supplier);}
  
  public updateSupplier(supplier: Supplier) {
    return this.http.put<Supplier>(this.apiUrl+"/"+supplier.id, supplier);
  }

  public deleteSupplier(supplier: Supplier) {
    return this.http.delete(this.apiUrl+"/"+supplier.id);
  }

  findByCnpjCpf(cnpjCpf: string) {
  return this.http.get<boolean>(
    `${this.apiUrl}/exists/${cnpjCpf}`
  );
}

  }