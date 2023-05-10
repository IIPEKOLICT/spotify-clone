import { HttpException, HttpStatus } from '@nestjs/common';
import { EXCEPTION_MESSAGE } from '../../constants/enums';

export abstract class BaseError extends HttpException {
  protected constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = EXCEPTION_MESSAGE.UNKNOWN_EXCEPTION,
  ) {
    super({ message }, status);
  }
}
