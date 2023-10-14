export interface FoundProfessional {
  id?: number;
  created_at?: Date;
  preferredName?: string;
  supportedState?: string;
  supportedCities?: string[];
  totalServices?: number;
  baseValue?: number;
  valuePerKm?: number;
  totalValue?: number;
}

export type FoundProfessionalsResponse = {
  found_professionals: FoundProfessional[];
};
