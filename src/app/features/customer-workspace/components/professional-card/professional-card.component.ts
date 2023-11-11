import { Component, Input, inject } from '@angular/core';
import { FoundProfessional } from '../../models/found-professional.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Componente de card do profissional.
 */
@UntilDestroy()
@Component({
  selector: 'mvf-professional-card',
  templateUrl: './professional-card.component.html',
})
export class ProfessionalCardComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /**
   * Nome do profissional.
   */
  @Input() professional: FoundProfessional;

  navigateToResult(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      this.router.navigate(
        ['find-professionals', 'results', this.professional.id],
        {
          queryParams: {
            origin: params['origin'],
            destination: params['destination'],
          },
        }
      );
    });
  }
}
