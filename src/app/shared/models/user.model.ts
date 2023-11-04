import { UserRole } from '../enums/role.enum';

export interface User {
  id?: string;
  createdAt?: Date;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isFirstAccess?: boolean;
}
