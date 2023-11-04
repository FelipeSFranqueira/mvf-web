import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationFacade } from '../../authentication.facade';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';
import { UserRole } from '../../../../shared/enums/role.enum';

/**
 * Componente container da funcionalidade de Login.
 * @implements {OnInit}
 */
@UntilDestroy()
@Component({
  selector: 'mvf-auth-root',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginLoading$?: Observable<boolean>;
  loginError$?: Observable<boolean>;
  loginSuccess$?: Observable<boolean>;

  /**
   * Formulário reativo de login.
   */
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(
    private facade: AuthenticationFacade,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginLoading$ = this.facade.loginLoading$;
    this.loginSuccess$ = this.facade.loginSuccess$;
    this.loginError$ = this.facade.loginError$;

    this.loginError$
      .pipe(untilDestroyed(this))
      .subscribe((hasError) =>
        hasError ? this.toastr.error('Email e/ou senha inválidos.') : null
      );
    this.loginSuccess$
      .pipe(untilDestroyed(this))
      .subscribe((success) =>
        success ? this.toastr.success('Sucesso') : null
      );
    this.facade.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        user.isFirstAccess
          ? this.router.navigate(['account-completion'])
          : this.router.navigate(
              user.role === UserRole.Professional
                ? ['professional-workspace']
                : ['find-professionals']
            );
      }
    });
  }

  /**
   * Realiza o login a partir da interface fornecida pelo facade.
   */
  login(): void {
    const loginData: LoginRequest = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    this.facade.login(loginData);
  }
}
