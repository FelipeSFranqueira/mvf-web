import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { Professional } from '../../account-completion/models/professional.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfessionalService {
  private baseApi = `${environment.baseApi}/professionals`;

  constructor(private http: HttpClient) {}

  getProfessionalByUserId(userId: string): Observable<Professional> {
    return this.http.get<Professional>(`${this.baseApi}/user/${userId}`);
  }
}
