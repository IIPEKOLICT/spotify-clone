import { BaseError } from './base/base.error';
import { ErrorMessage } from '../constants/enums';
import { HttpStatus } from '@nestjs/common';

export class BadRequestError extends BaseError {
  constructor(message: string = ErrorMessage.BAD_REQUEST) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
