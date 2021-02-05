import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stufa } from 'app/domain/Stufa';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StufaDataService {

constructor(private httpClient:HttpClient) { }
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    authorization: 'x-auth-token'
  })
};

save(stufa: Stufa) {
  return this.httpClient.post<Stufa>(`${environment.API_URL}/puntocaldaie/stufe/update`, stufa);
}
add(stufa: Stufa) {
  return this.httpClient.post<Stufa>(`${environment.API_URL}/puntocaldaie/stufe/add`, stufa);
}
saveAll(users: Stufa[]) {
  return this.httpClient.post<Stufa[]>(`${environment.API_URL}/puntocaldaie/stufe/addAll`, users,this.httpOptions);
}
delete(id: number) {
  return this.httpClient.delete(`${environment.API_URL}/puntocaldaie/stufe/delete?id=${id}`);
}
}
