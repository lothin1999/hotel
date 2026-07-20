import { HttpException, HttpStatus } from '@nestjs/common';

export class ResponseValidationException extends HttpException {
  constructor(errors: string[]) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Response Validation Failed',
        messages: errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
