import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SkillItem } from '../../models/skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/skills';

  save(req: SkillItem): Observable<SkillItem> {
    return this.http.post<SkillItem>(this.apiUrl, req)
  }

  getAll(): Observable<SkillItem[]> {
    return this.http.get<SkillItem[]>(this.apiUrl);
  }


  getById(id: string): Observable<SkillItem> {
    return this.http.get<SkillItem>(this.apiUrl + "/" + id)
  }

  delete(id: string) {
    return this.http.delete<SkillItem>(this.apiUrl + "/" + id)
  }

  update(id: string, req: SkillItem) {
    return this.http.patch<SkillItem>(this.apiUrl + "/" + id, req)
  }
}
