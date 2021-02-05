import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caldaia } from 'app/domain/Caldaia';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CaldaiaDataService {

  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      authorization: 'x-auth-token'
    })
  };

save(caldaia: Caldaia) {
  return this.httpClient.post<Caldaia>(`${environment.API_URL}/puntocaldaie/caldaie/update`, caldaia);
}
add(caldaia: Caldaia) {
  return this.httpClient.post<Caldaia>(`${environment.API_URL}/puntocaldaie/caldaie/add`, caldaia);
}
saveAll(users: Caldaia[]) {
  return this.httpClient.post<Caldaia[]>(`${environment.API_URL}/puntocaldaie/caldaie/addAll`, users,this.httpOptions);
}
delete(id: number) {
  return this.httpClient.delete(`${environment.API_URL}/puntocaldaie/caldaie/delete?id=${id}`);
}

}
