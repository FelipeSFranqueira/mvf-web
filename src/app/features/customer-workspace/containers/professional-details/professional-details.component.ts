import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RequestModalComponent } from '../../components/request-modal/request-modal.component';
import { FindSpecificProfessionalFacade } from '../../facade/find-specific-professional.facade';
import { Observable } from 'rxjs';
import { FoundProfessional } from '../../models/found-professional.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente de container dos detalhes de cada prestador de serviço.
 * Mostra os dados do prestador e total estimado para o frete.
 */
@Component({
  selector: 'mvf-professional-details',
  templateUrl: './professional-details.component.html',
})
export class ProfessionalDetailsComponent implements OnInit {
  isSearchLoading$!: Observable<boolean>;
  hasSearchSucceed$!: Observable<boolean>;
  hasSearchFailed$!: Observable<boolean>;
  searchResults$!: Observable<FoundProfessional | undefined>;

  constructor(
    private dialog: Dialog,
    private facade: FindSpecificProfessionalFacade,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.isSearchLoading$ = facade.isSearchLoading$;
    this.hasSearchSucceed$ = facade.hasSearchSucceed$;
    this.hasSearchFailed$ = facade.hasSearchFailed$;
    this.searchResults$ = facade.searchResult$;
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      const idFromPath = url[1].path;
      this.facade.findProfessional(idFromPath);
    });

    this.hasSearchFailed$.subscribe((fail) =>
      fail
        ? this.toastr.error(
            'A página que você está tentando acessar não foi encontrada. Tente buscar por outro termo.'
          )
        : null
    );
  }

  /**
   * Abre o dialog (modal) utilizando o Angular CDK.
   */
  requestService() {
    this.dialog.open(RequestModalComponent);
  }
}
