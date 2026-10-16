import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:7000/experiences';

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }
}
