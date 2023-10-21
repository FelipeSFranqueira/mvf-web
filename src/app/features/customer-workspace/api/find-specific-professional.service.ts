import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoundProfessional } from '../models/found-professional.model';

@Injectable()
export class FindSpecificProfessionalService {
  private baseApi = `${environment.baseApi}/find-specific-professional`;

  constructor(private http: HttpClient) {}

  findProfessional(id: string): Observable<FoundProfessional> {
    const options = {
      params: new HttpParams().set('id', id),
    };

    return this.http.get<FoundProfessional>(this.baseApi, options);
  }
}
