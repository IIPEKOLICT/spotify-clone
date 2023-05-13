import { BaseError } from './base/base.error';
import { ErrorMessage } from '../constants/enums';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends BaseError {
  constructor(message: string = ErrorMessage.UNAUTHORIZED) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
