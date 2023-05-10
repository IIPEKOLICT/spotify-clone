import { BaseError } from './base/base.error';
import { EXCEPTION_MESSAGE } from '../constants/enums';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends BaseError {
  constructor(message: string = EXCEPTION_MESSAGE.UNAUTHORIZED) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
