import { Injectable } from '@angular/core';
import { CustomerRegistrationService } from '../api/customer-registration.service';
import { CustomerRegistrationState } from '../state/customer-registration.state';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerRegsitrationFacade {
  constructor(
    private service: CustomerRegistrationService,
    private state: CustomerRegistrationState
  ) {}

  isCustomerRegistrationLoading$ = this.state.isCustomerRegistrationLoading$;
  hasCustomerRegistrationSucceed$ = this.state.hasCustomerRegistrationSucceed$;
  hasCustomerRegistrationFailed$ = this.state.hasCustomerRegistrationFailed$;

  finishCustomerRegistration(customer: Partial<Customer>): void {
    this.state.finishCustomerRegistration();

    this.service.finishRegistration(customer).subscribe({
      next: (customer) => {
        this.state.customerRegistrationSuccess(customer);
      },
      error: () => {
        this.state.customerRegistrationFail();
      },
    });
  }
}
