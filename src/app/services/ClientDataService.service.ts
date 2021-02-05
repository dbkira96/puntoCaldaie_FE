import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../domain/Cliente';
import { environment } from '../../environments/environment.prod';
import { Backup } from 'app/domain/Backup';
import { Stufa } from 'app/domain/Stufa';

@Injectable({
  providedIn: 'root'
})
export class ClientDataServiceService {
  

  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      authorization: 'x-auth-token'
    })
  };

  getAllUsers(){
    return this.httpClient.get<Cliente[]>(`${environment.API_URL}/puntocaldaie/clienti/getAll`)
  }

  getUser(id:number){
    return this.httpClient.get<Cliente>(`${environment.API_URL}/puntocaldaie/clienti/get?id=${id}`)
  }
  save(user: Cliente) {
    return this.httpClient.post<Cliente>(`${environment.API_URL}/puntocaldaie/clienti/update`, user);
  }
  add(user: Cliente) {
    return this.httpClient.post<Cliente>(`${environment.API_URL}/puntocaldaie/clienti/add`, user);
  }
  saveAll(users: Cliente[]) {
    return this.httpClient.post<Cliente[]>(`${environment.API_URL}/puntocaldaie/clienti/addAll`, users,this.httpOptions);
  }
  delete(id: number) {
    return this.httpClient.delete(`${environment.API_URL}/puntocaldaie/clienti/delete?id=${id}`);
  }
  deleteAll(){
    return this.httpClient.get(`${environment.API_URL}/puntocaldaie/clienti/deleteAll`);
  }

  getUsersFromJson(){
    return this.httpClient.get<Cliente[]>("../assets/clients.js")
  }
  getDataFromJson(data:String){
    return this.httpClient.get<Backup>("../assets/"+data)
  }
  getStufeFromJson(data:String){
    return this.httpClient.get<Stufa[]>("../assets/"+data)
  }

}

