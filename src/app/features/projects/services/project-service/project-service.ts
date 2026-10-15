import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/projects"

  save(req:Project):Observable<Project>{
    return this.http.post<Project>(this.apiUrl,req)
  }
  
  getAll():Observable<Project[]>{
    return this.http.get<Project[]>(this.apiUrl)
  }

    
  getById(id:string):Observable<Project>{
    return this.http.get<Project>(this.apiUrl+"/"+id)
  }

  delete(id:string){
      return this.http.delete<Project>(this.apiUrl+"/"+id)
  }

  update(id:string,req:Project){
      return this.http.patch<Project>(this.apiUrl+"/"+id,req)
  }
}
