import { Component } from '@angular/core';

@Component({
  selector: 'mvf-professional-search-bar',
  templateUrl: './professional-search-bar.component.html',
})
export class ProfessionalSearchBarComponent {
  minDate?: Date;

  constructor() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 5);
  }
}
