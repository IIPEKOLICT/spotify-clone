import { BaseError } from './base/base.error';
import { HttpStatus } from '@nestjs/common';

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string) {
    super(HttpStatus.NOT_FOUND, `Entity '${entityName}' not found`);
  }
}
