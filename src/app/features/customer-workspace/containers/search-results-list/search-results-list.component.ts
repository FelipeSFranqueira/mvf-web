import { Component, OnInit } from '@angular/core';
import { FindProfessionalsFacade } from '../../facade/find-professionals.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { FoundProfessional } from '../../models/found-professional.model';
import { SearchForm } from '../../models/search-form.model';

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

  searchForm!: FormGroup<SearchForm>;

  constructor(
    private findProfessionalsFacade: FindProfessionalsFacade,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildSearchForm();

    this.isSearchLoading$ = this.findProfessionalsFacade.isSearchLoading$;
    this.hasSearchFailed$ = this.findProfessionalsFacade.hasSearchFailed$;
    this.hasSearchSucceed$ = this.findProfessionalsFacade.hasSearchSucceed$;
    this.searchResults$ = this.findProfessionalsFacade.searchResults$;

    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        if ((params['origin'], params['destination'])) {
          const origin = params['origin'];
          const destination = params['destination'];

          this.searchForm.setValue({ origin, destination });

          this.findProfessionalsFacade.findProfessionals(origin, destination);
        }
      });

    this.hasSearchFailed$
      ?.pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail ? this.toastr.error('O CEP digitado não foi encontrado.') : null
      );
  }

  findProfessionals() {
    this.findProfessionalsFacade.findProfessionals(
      this.searchForm.controls['origin'].value.replace(/-/g, ''),
      this.searchForm.controls['destination'].value.replace(/-/g, '')
    );
  }

  private buildSearchForm(): void {
    this.searchForm = new FormGroup<SearchForm>({
      origin: new FormControl('', {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.required,
        ],
        nonNullable: true,
      }),
      destination: new FormControl('', {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.required,
        ],
        nonNullable: true,
      }),
    });
  }
}
