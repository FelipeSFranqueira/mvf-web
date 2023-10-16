import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoundProfessionalsResponse } from '../models/found-professional.model';

/**
 * Classe service que se comunica com a API nos endpoints
 * de busca por profissionais.
 */
@Injectable()
export class FindProfessionalsService {
  private baseApi = `${environment.baseApi}/find-professional`;

  constructor(private http: HttpClient) {}

  /**
   * Método responsável por chamar a API e buscar profissionais a partir
   * dos parâmetros fornecidos.
   * @param origin
   * @param destination
   * @returns {Observable<FoundProfessionalsResponse>} Observable da
   * response enviada pelo backend.
   */
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
