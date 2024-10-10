import {AbstractAuditableDTO} from '../../shared/models/abstract-base-dto';

export interface StaffDTO extends AbstractAuditableDTO {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
