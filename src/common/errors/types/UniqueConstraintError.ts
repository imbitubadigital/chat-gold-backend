import { PrismaClientError } from './PrismaClientError';
import { ConflictError } from './ConflictError';

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`O campo ${uniqueField} já está cadastrado`);
  }
}
