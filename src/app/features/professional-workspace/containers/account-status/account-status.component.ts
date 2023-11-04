import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { Professional } from '../../../../features/account-completion/models/professional.model';

@Component({
  selector: 'mvf-account-status',
  templateUrl: './account-status.component.html',
})
export class AccountStatusComponent implements OnInit {
  isEnabled: boolean;

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { user: User; professional: Professional }) =>
        (this.isEnabled = data.professional.isEnabled)
    );
  }
}
