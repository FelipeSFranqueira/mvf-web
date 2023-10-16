import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchForm } from '../../models/search-form.model';

/**
 * Componente de container da tela de busca.
 */
@Component({
  selector: 'mvf-professional-search',
  templateUrl: './professional-search.component.html',
})
export class ProfessionalSearchComponent implements OnInit {
  searchForm!: FormGroup<SearchForm>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.buildSearchForm();
  }

  /**
   * Método que navega a rota para a tela de resultados.
   */
  searchForProfessionals() {
    const origin = this.searchForm?.controls['origin'].value.replace(/-/g, '');
    const destination = this.searchForm?.controls['destination'].value.replace(
      /-/g,
      ''
    );

    this.router.navigate(['find-professionals', 'results'], {
      queryParams: { origin, destination },
    });
  }

  /**
   * Constrói o formulário de busca de profissional.
   */
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
