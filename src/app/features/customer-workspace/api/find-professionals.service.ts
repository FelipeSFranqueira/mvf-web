import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoundProfessionalsResponse } from '../models/found-professional.model';

@Injectable()
export class FindProfessionalsService {
  private baseApi = `${environment.baseApi}/find-professional`;

  constructor(private http: HttpClient) {}

  findProfessionals(
    origin: string,
    destination: string
  ): Observable<FoundProfessionalsResponse> {
    const options = {
      params: new HttpParams()
        .set('origin', origin)
        .set('destination', destination),
    };

    return this.http.get<FoundProfessionalsResponse>(this.baseApi, options);
  }
}
