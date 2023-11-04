import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, State } from '../models/state-city.model';

@Injectable()
export class StateCityService {
  baseApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseApi}?orderBy=nome`);
  }

  getCitiesByState(state: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseApi}/${state}/municipios`);
  }
}
