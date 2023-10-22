import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerRegistrationService {
  private baseApi = `${environment.baseApi}/customers`;

  constructor(private http: HttpClient) {}

  finishRegistration(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.baseApi, customer);
  }
}
