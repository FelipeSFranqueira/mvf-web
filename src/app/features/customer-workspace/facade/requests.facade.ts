import { Injectable } from '@angular/core';
import { RequestsService } from '../api/requests.service';
import { RequestsState } from '../state/requests.state';
import { Request } from '../models/request.model';

@Injectable()
export class RequestsFacade {
  constructor(private service: RequestsService, private state: RequestsState) {}

  isRequestLoading$ = this.state.isRequestLoading$;
  hasRequestSucceed$ = this.state.hasRequestSucceed$;
  hasRequestFailed$ = this.state.hasRequestFailed$;

  requestService(request: Request): void {
    this.state.requestService();
    this.service.requestService(request).subscribe({
      next: () => this.state.requestSuccess(),
      error: () => this.state.requestFail(),
    });
  }
}
