import { Component, OnInit, inject } from '@angular/core';
import { RegistrationRequestsService } from '../../api/registration-requests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Professional } from '../../../account-completion/models/professional.model';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'mvf-account-requests',
  templateUrl: './account-requests.component.html',
})
export class AccountRequestsComponent implements OnInit {
  professionalsList: Professional[];

  private registrationRequestsService = inject(RegistrationRequestsService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.registrationRequestsService
      .getRegistrationRequests()
      .pipe(untilDestroyed(this))
      .subscribe((professionals) => (this.professionalsList = professionals));
  }

  approve(professional: Professional): void {
    const updatedProfessional: Professional = {
      ...professional,
      isEnabled: true,
    };
    this.registrationRequestsService
      .approveRequest(professional.id, updatedProfessional)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.professionalsList = this.professionalsList.filter(
            (prof) => prof.id !== professional.id
          );
          this.toastr.success('Aprovado com sucesso.');
        },
        error: () => this.toastr.error('Ocorreu um erro ao aprovar o usuário.'),
      });
  }

  decline(professional: Professional): void {
    this.registrationRequestsService
      .declineRequest(professional.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.professionalsList = this.professionalsList.filter(
            (prof) => prof.id !== professional.id
          );
          this.toastr.warning('Negado com sucesso.');
        },
        error: () => this.toastr.error('Ocorreu um erro ao deletar o pedido.'),
      });
  }
}
