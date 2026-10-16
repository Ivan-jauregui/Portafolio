import { inject, Injectable } from '@angular/core';
import { ProjectRequest } from '../../models/projectRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/requests"

  save(req:ProjectRequest):Observable<ProjectRequest>{
    return this.http.post<ProjectRequest>(this.apiUrl,req)
  }
  
  getAll():Observable<ProjectRequest[]>{
    return this.http.get<ProjectRequest[]>(this.apiUrl)
  }

    
  getById(id:string):Observable<ProjectRequest>{
    return this.http.get<ProjectRequest>(this.apiUrl+"/"+id)
  }

  delete(id:string){
      return this.http.delete<ProjectRequest>(this.apiUrl+"/"+id)
  }

  update(id:string,req:ProjectRequest){
      return this.http.patch<ProjectRequest>(this.apiUrl+"/"+id,req)
  }
}
