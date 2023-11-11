import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { RequestModalData } from '../../models/request-modal-data.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';

interface RequestForm {
  date: FormControl<Date>;
  time: FormControl<Date>;
}

/**
 * Componente de dialog (modal) de solicitação de serviço.
 */
@Component({
  selector: 'mvf-request-modal',
  templateUrl: './request-modal.component.html',
  styles: [
    `
      :host {
        display: block;
        background: transparent;
        border-radius: 8px;
        padding: 16px;
        min-width: 320px;
        max-width: 500px;
      }
    `,
  ],
})
export class RequestModalComponent implements OnInit {
  @Output() requestClicked = new EventEmitter<number>();

  requestForm!: FormGroup<RequestForm>;
  minDate = new Date();

  constructor(
    @Inject(DIALOG_DATA) public data: RequestModalData,
    private localeService: BsLocaleService,
    private route: ActivatedRoute
  ) {
    localeService.use('pt-br');
  }

  ngOnInit(): void {
    const hour = new Date();
    hour.setHours(12);
    hour.setMinutes(0);
    this.minDate.setDate(this.minDate.getDate() + 7);

    this.requestForm = new FormGroup({
      date: new FormControl(this.minDate, {
        validators: Validators.required,
        nonNullable: true,
      }),
      time: new FormControl(hour, {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  requestService(): void {
    const date =
      this.requestForm.controls['date'].value.toLocaleDateString('pt-BR');
    const time = this.requestForm.controls['time'].value;

    const message = `Nova solicitação de Me Vê um Frete%0AOrigem: ${
      this.data.origin
    }%0ADestino: ${this.data.origin}%0APreço estimado: ${
      this.data.value
    }%0AData: ${date}%0AHora: ${time.getHours()}:${time.getMinutes()}%0A%0APoderia confirmar a disponibilidade?`;

    const url = `https://api.whatsapp.com/send?phone=${this.data.phoneNumber}&text=${message}`;
    window.open(url, '_blank');
  }
}
