import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '../../constants/enums';

export abstract class BaseError extends HttpException {
  protected constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = ErrorMessage.UNKNOWN_EXCEPTION,
  ) {
    super({ message }, status);
  }
}
