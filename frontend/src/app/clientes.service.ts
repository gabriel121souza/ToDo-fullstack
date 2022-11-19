import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL : string  = environment.URLBase + '/api/clientes'
  constructor(private http: HttpClient) { }
  salvar(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURL}`, cliente)
  }

  atualizar(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.clientId}`, cliente)
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getClientesById(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }
  

  deletaClienteById(cliente : Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.clientId}`);
  }

 /*getClientes() : Cliente[]{
  let cliente = new Cliente();
  cliente.clientId = 1;
  cliente.name = 'Joaquin'
  cliente.cpf = '06398566165'
  cliente.createdDate = '04/04/1999'
  return [cliente];
 } */
}
