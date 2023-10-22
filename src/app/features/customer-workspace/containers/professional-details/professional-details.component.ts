/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RequestModalComponent } from '../../components/request-modal/request-modal.component';
import { FindSpecificProfessionalFacade } from '../../facade/find-specific-professional.facade';
import { Observable } from 'rxjs';
import { FoundProfessional } from '../../models/found-professional.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestsFacade } from '../../facade/requests.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Request } from '../../models/request.model';
import { UserState } from '../../../global/state/user.state';
import { User } from '../../../global/models/user.model';

/**
 * Componente de container dos detalhes de cada prestador de serviço.
 * Mostra os dados do prestador e total estimado para o frete.
 */
@UntilDestroy()
@Component({
  selector: 'mvf-professional-details',
  templateUrl: './professional-details.component.html',
})
export class ProfessionalDetailsComponent implements OnInit {
  isSearchLoading$!: Observable<boolean>;
  hasSearchSucceed$!: Observable<boolean>;
  hasSearchFailed$!: Observable<boolean>;
  searchResult$!: Observable<FoundProfessional | undefined>;

  isRequestLoading$!: Observable<boolean>;
  hasRequestSucceed$!: Observable<boolean>;
  hasRequestFailed$!: Observable<boolean>;

  private professionalIdFromPath!: string;
  private currentUser: User | undefined;
  private currentPrice!: number;

  constructor(
    private dialog: Dialog,
    private professionalFacade: FindSpecificProfessionalFacade,
    private requestsFacade: RequestsFacade,
    private userState: UserState,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isSearchLoading$ = professionalFacade.isSearchLoading$;
    this.hasSearchSucceed$ = professionalFacade.hasSearchSucceed$;
    this.hasSearchFailed$ = professionalFacade.hasSearchFailed$;
    this.searchResult$ = professionalFacade.searchResult$;

    this.isRequestLoading$ = requestsFacade.isRequestLoading$;
    this.hasRequestSucceed$ = requestsFacade.hasRequestSucceed$;
    this.hasRequestFailed$ = requestsFacade.hasRequestFailed$;
  }

  ngOnInit(): void {
    this.userState.user$.subscribe((user) => (this.currentUser = user));

    this.route.url.subscribe((url) => {
      this.professionalIdFromPath = url[1].path;
      this.professionalFacade.findProfessional(this.professionalIdFromPath);
    });

    this.searchResult$.subscribe(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (result) => (this.currentPrice = result?.totalValue!)
    );

    this.hasSearchFailed$
      .pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'A página que você está tentando acessar não foi encontrada. Tente buscar por outro termo.'
            )
          : null
      );
    this.hasRequestFailed$.pipe(untilDestroyed(this)).subscribe((fail) => {
      fail
        ? this.toastr.error(
            'Ocorreu um erro ao solicitar o serviço. Tente novamente mais tarde ou contate o suporte.'
          )
        : null;
    });
    this.hasRequestSucceed$.pipe(untilDestroyed(this)).subscribe((success) => {
      if (success) {
        this.toastr.success('Solicitação enviada com sucesso!');
        this.router.navigate(['find-professionals', 'my-requests']);
      }
    });
  }

  /**
   * Abre o dialog (modal) utilizando o Angular CDK.
   */
  openRequestDialog(): void {
    const dialogRef = this.dialog.open(RequestModalComponent, {
      data: {
        isRequestLoading: this.isRequestLoading$,
      },
    });
    dialogRef.componentInstance?.requestClicked.subscribe((time) => {
      this.requestService(time);
      dialogRef.close();
    });
    dialogRef.closed.subscribe((closed) =>
      closed ? dialogRef.componentInstance?.requestClicked.unsubscribe() : null
    );
  }

  requestService(time: number): void {
    const request: Request = {
      professionals_id: this.professionalIdFromPath,
      customers_id: this.currentUser?.id ?? '',
      date: time,
      price: this.currentPrice,
    };

    this.requestsFacade.requestService(request);
  }
}
