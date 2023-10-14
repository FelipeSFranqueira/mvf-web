import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface SearchForm {
  origin: FormControl<string>;
  destination: FormControl<string>;
}

@Component({
  selector: 'mvf-professional-search',
  templateUrl: './professional-search.component.html',
})
export class ProfessionalSearchComponent implements OnInit {
  minDate?: Date;
  searchForm!: FormGroup<SearchForm>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 5);

    this.buildSearchForm();
  }

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
