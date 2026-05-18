import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../../interface/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/client";
  
    public findAll() {
      return this.http.get<Client[]>(this.apiUrl);
    }
  
    public findById(id: number) {
      return this.http.get<Client>(this.apiUrl+"/"+id);
    }
  
    public createClient(client: Client) {
      return this.http.post<Client>(this.apiUrl, client);}
    
    public updateClient(client: Client) {
      return this.http.put<Client>(this.apiUrl+"/"+client.id, client);
    }
  
    public deleteClient(client: Client) {
      return this.http.delete(this.apiUrl+"/"+ client.id);
    }
  
    findByCnpjCpf(cnpjCpf: string) {
    return this.http.get<boolean>(
      `${this.apiUrl}/exists/${cnpjCpf}`
    );
  }
  
}