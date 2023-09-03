import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private baseApi = `${environment.baseApi}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<HttpResponse<any>> {
    console.log('post');
    return this.http.post<HttpResponse<any>>(`${this.baseApi}/register`, user);
  }
}
