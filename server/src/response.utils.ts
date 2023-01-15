import { HttpStatus } from '@nestjs/common';

export class ResponseUtils {
  public static success(result?: any, message?: string) {
    const statusCode = HttpStatus.OK;
    return {
      result,
      message,
      statusCode,
    };
  }
}
