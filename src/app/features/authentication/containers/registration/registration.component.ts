import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationFacade } from '../../authentication.facade';
import { User } from '../../../../shared/models/user';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'mvf-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  isRegistering$?: Observable<boolean>;
  success$?: Observable<boolean>;
  hasError$?: Observable<boolean>;

  registrationForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  constructor(
    private facade: AuthenticationFacade,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isRegistering$ = this.facade.isRegistering$;
    this.success$ = this.facade.isRegistered$;
    this.hasError$ = this.facade.error$;

    this.hasError$
      .pipe(untilDestroyed(this))
      .subscribe((hasError) =>
        hasError
          ? this.toastr.error(
              'Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou contate o suporte.'
            )
          : null
      );
    this.success$
      .pipe(untilDestroyed(this))
      .subscribe((success) =>
        success ? this.toastr.success('Conta criada com sucesso.') : null
      );
  }

  register(): void {
    const newUser: User = {
      firstName: this.registrationForm.controls.firstName.value,
      lastName: this.registrationForm.controls.lastName.value,
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value,
    };
    this.facade.register(newUser);
  }
}
