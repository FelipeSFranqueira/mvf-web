import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Professional } from '../models/professional.model';
import { environment } from '../../../../environment/environment';
import { professionalAndVehicle } from '../models/professionalAndVehicle.model';

@Injectable()
export class ProfessionalRegistrationService {
  private baseApi = environment.baseApi;

  constructor(private http: HttpClient) {}

  finishRegistration(
    professionalAndVehicle: professionalAndVehicle
  ): Observable<Professional> {
    return this.http.post<Professional>(
      `${this.baseApi}/professionals`,
      professionalAndVehicle
    );
  }
}
