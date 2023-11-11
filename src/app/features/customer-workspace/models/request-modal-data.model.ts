import { Observable } from 'rxjs';

export interface RequestModalData {
  isRequestLoading: Observable<boolean>;
  origin: string;
  destination: string;
  phoneNumber: string;
  value: number;
}
