import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/request.model';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsService {
  private baseApi = `${environment.baseApi}/service_requests`;

  constructor(private http: HttpClient) {}

  requestService(request: Request): Observable<Request> {
    return this.http.post<Request>(this.baseApi, request);
  }
}
