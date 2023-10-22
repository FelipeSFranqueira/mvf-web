import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomerRegsitrationFacade } from '../../facade/customer-registration.facade';
import { AuthenticationFacade } from '../../../authentication/authentication.facade';
import { User } from '../../../global/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../models/customer.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'mvf-customer-registration',
  templateUrl: './customer-registration.component.html',
})
export class CustomerRegistrationComponent implements OnInit {
  cpf = new FormControl('', {
    validators: [Validators.required, Validators.minLength(14)],
    nonNullable: true,
  });
  user?: User;

  constructor(
    private customerRegistrationFacade: CustomerRegsitrationFacade,
    private authFacade: AuthenticationFacade,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authFacade.user$.subscribe((user) => (this.user = user));

    this.customerRegistrationFacade.hasCustomerRegistrationSucceed$
      .pipe(untilDestroyed(this))
      .subscribe((success) => {
        if (success) {
          this.toastr.success('Cadastro finalizado com sucesso');
          this.router.navigate(['find-professionals']);
        }
      });
    this.customerRegistrationFacade.hasCustomerRegistrationFailed$
      .pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'Houve um erro na finalização do seu cadastro. Tente novamente mais tarde ou contate o suporte.'
            )
          : null
      );
  }

  finishRegistration(): void {
    if (!this.user) {
      this.toastr.error(
        'Houve um erro ao finalizar o seu cadastro. Por favor, faça login novamente.'
      );
      this.router.navigate(['auth', 'login']);
    } else {
      const idAndCpf: Partial<Customer> = {
        users_id: this.user.id,
        cpf: this.cpf.value,
      };

      this.customerRegistrationFacade.finishCustomerRegistration(idAndCpf);
    }
  }
}
