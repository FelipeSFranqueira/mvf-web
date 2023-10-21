import { Injectable } from '@angular/core';
import { FindSpecificProfessionalService } from '../api/find-specific-professional.service';
import { FindSpecificProfessionalState } from '../state/find-specific-professional.state';
import { FoundProfessional } from '../models/found-professional.model';

@Injectable()
export class FindSpecificProfessionalFacade {
  constructor(
    private service: FindSpecificProfessionalService,
    private state: FindSpecificProfessionalState
  ) {}

  isSearchLoading$ = this.state.isSearchLoading$;
  hasSearchSucceed$ = this.state.hasSearchSucceed$;
  hasSearchFailed$ = this.state.hasSearchFailed$;
  searchResult$ = this.state.searchResult$;

  findProfessional(id: string): void {
    this.state.searchProfessional();
    this.service.findProfessional(id).subscribe({
      next: (foundProfessional: FoundProfessional) =>
        this.state.searchSuccess(foundProfessional),
      error: () => this.state.searchFail(),
    });
  }
}
