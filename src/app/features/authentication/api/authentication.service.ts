import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { CookieService } from 'ngx-cookie-service';

/**
 * Classe de service responsável por se comunicar com a API
 * nos endpoints de login e registro de usuários.
 */
@Injectable()
export class AuthenticationService {
  private baseApi = `${environment.baseApi}/auth`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Método que bate no endpoint de registro.
   * @param user
   * @returns {Observable<HttpResponse<any>>} Observable de resposta HTTP.
   */
  register(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.baseApi}/signup`, user);
  }

  /**
   * Bate no endpoint responsável por logar o usuário.
   * @param loginRequest
   * @returns {Observable<LoginResponse>} Observable da interface de LoginResponse.
   */
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseApi}/login`, loginRequest);
  }

  /**
   * Bate no endpoint que traz as informações do usuário
   * quando este já está logado.
   * @returns {Observable<User>} Observable da interface User.
   */
  populateUser(): Observable<User> {
    return this.http.get<User>(`${this.baseApi}/me`);
  }
}
