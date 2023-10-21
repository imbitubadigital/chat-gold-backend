import { UniqueConstraintError } from './../types/UniqueConstraintError';
import { PrismaClientError } from '../types/PrismaClientError';
import { DatabaseError } from '../types/DatabaseError';

enum PrimaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseError = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrimaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
