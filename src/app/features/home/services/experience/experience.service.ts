import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/experiences';

  save(req: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, req)
  }

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }


  getById(id: string): Observable<Experience> {
    return this.http.get<Experience>(this.apiUrl + "/" + id)
  }

  delete(id: string) {
    return this.http.delete<Experience>(this.apiUrl + "/" + id)
  }

  update(id: string, req: Experience) {
    return this.http.patch<Experience>(this.apiUrl + "/" + id, req)
  }
}
