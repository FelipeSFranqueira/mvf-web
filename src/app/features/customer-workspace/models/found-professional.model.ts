export interface FoundProfessional {
  id?: string;
  created_at?: Date;
  preferredName?: string;
  supportedState?: string;
  supportedCities?: string[];
  totalServices?: number;
  baseValue?: number;
  valuePerKm?: number;
  totalValue?: number;
  phoneNumber?: string;
}

export type FoundProfessionalsResponse = {
  found_professionals: FoundProfessional[];
};
