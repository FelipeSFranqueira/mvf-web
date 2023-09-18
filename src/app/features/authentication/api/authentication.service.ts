import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthenticationService {
  private baseApi = `${environment.baseApi}/auth`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.baseApi}/signup`, user);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseApi}/login`, loginRequest);
  }
}
