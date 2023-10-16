import { Injectable } from '@angular/core';
import { FindProfessionalsState } from '../state/find-professionals.state';
import { FindProfessionalsService } from '../api/find-professionals.service';
import { Observable } from 'rxjs';
import {
  FoundProfessional,
  FoundProfessionalsResponse,
} from '../models/found-professional.model';

/**
 * Classe facade que disponibiliza interface de comunicação entre estado
 * e service de comunicação com a API.
 */
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

  /**
   * Método responsável por chamar a atualização de estado
   * e chamadas à API na busca por profissionais.
   * @param origin
   * @param destination
   */
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
