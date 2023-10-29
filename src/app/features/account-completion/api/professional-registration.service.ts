import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Professional } from '../models/professional.model';
import { environment } from '../../../../environment/environment';

@Injectable()
export class ProfessionalRegistrationService {
  private baseApi = `${environment.baseApi}/customers`;

  constructor(private http: HttpClient) {}

  finishRegistration(professional: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.baseApi, professional);
  }
}
