import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { Professional } from '../../account-completion/models/professional.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationRequestsService {
  private baseApi = `${environment.baseApi}/professionals`;

  constructor(private http: HttpClient) {}

  getRegistrationRequests(): Observable<Professional[]> {
    return this.http.get<Professional[]>(
      `${this.baseApi}/registration-requests/`
    );
  }

  approveRequest(
    id: string,
    professional: Professional
  ): Observable<Professional> {
    return this.http.post<Professional>(`${this.baseApi}/${id}`, professional);
  }

  declineRequest(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseApi}/${id}`);
  }
}
