import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private baseApi = `${environment.baseApi}/auth`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.baseApi}/signup`, user);
  }
}
