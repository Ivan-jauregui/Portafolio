import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tecnology } from '../../models/tecnology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologyService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/tecnologies"

  save(req:Tecnology):Observable<Tecnology>{
    return this.http.post<Tecnology>(this.apiUrl,req)
  }
  
  getAll():Observable<Tecnology[]>{
    return this.http.get<Tecnology[]>(this.apiUrl)
  }
}
