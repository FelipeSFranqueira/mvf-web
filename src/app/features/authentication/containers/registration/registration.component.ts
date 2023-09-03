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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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
    this.facade.register(this.registrationForm.value as User);
  }
}
