import { Injectable } from '@angular/core';
import { FindProfessionalsState } from '../state/find-professionals.state';
import { FindProfessionalsService } from '../api/find-professionals.service';
import { Observable } from 'rxjs';
import {
  FoundProfessional,
  FoundProfessionalsResponse,
} from '../models/found-professional.model';

@Injectable()
export class FindProfessionalsFacade {
  isSearchLoading$?: Observable<boolean>;
  hasSearchFailed$?: Observable<boolean>;
  hasSearchSucceed$?: Observable<boolean>;
  searchResults$?: Observable<FoundProfessional[]>;

  constructor(
    private findProfessionalsState: FindProfessionalsState,
    private findProfessionalsService: FindProfessionalsService
  ) {
    this.isSearchLoading$ = findProfessionalsState.isSearchLoading$;
    this.hasSearchFailed$ = findProfessionalsState.hasSearchFailed$;
    this.hasSearchSucceed$ = findProfessionalsState.hasSearchSucceed$;
    this.searchResults$ = findProfessionalsState.searchResults$;
  }

  findProfessionals(origin: string, destination: string): void {
    this.findProfessionalsState.findProfessionals();
    this.findProfessionalsService
      .findProfessionals(origin, destination)
      .subscribe({
        next: (foundProfessionalsResponse: FoundProfessionalsResponse) => {
          this.findProfessionalsState.searchSuccess(
            foundProfessionalsResponse.found_professionals
          );
        },
        error: () => this.findProfessionalsState.searchFailed(),
      });
  }
}
