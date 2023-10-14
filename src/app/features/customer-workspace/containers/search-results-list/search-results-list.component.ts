import { Component, OnInit } from '@angular/core';
import { FindProfessionalsFacade } from '../../facade/find-professionals.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FoundProfessional } from '../../models/found-professional.model';

@UntilDestroy()
@Component({
  selector: 'mvf-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss'],
})
export class SearchResultsListComponent implements OnInit {
  isSearchLoading$?: Observable<boolean>;
  hasSearchFailed$?: Observable<boolean>;
  hasSearchSucceed$?: Observable<boolean>;
  searchResults$?: Observable<FoundProfessional[]>;

  constructor(
    private findProfessionalsFacade: FindProfessionalsFacade,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isSearchLoading$ = this.findProfessionalsFacade.isSearchLoading$;
    this.hasSearchFailed$ = this.findProfessionalsFacade.hasSearchFailed$;
    this.hasSearchSucceed$ = this.findProfessionalsFacade.hasSearchSucceed$;
    this.searchResults$ = this.findProfessionalsFacade.searchResults$;

    this.activatedRoute.queryParams.subscribe((params) => {
      if ((params['origin'], params['destination'])) {
        this.findProfessionalsFacade.findProfessionals(
          params['origin'],
          params['destination']
        );
      }
    });

    this.hasSearchFailed$
      ?.pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'Ocorreu um erro ao realizar sua busca. Tente novamente mais tarde ou contate o suporte.'
            )
          : null
      );
  }
}
