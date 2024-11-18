import { ErrorResponse } from '../models/ErrorResponse';

export class BusinessError extends Error {
  private error: ErrorResponse;

  constructor(error: ErrorResponse) {
    super();
    this.error = error;
  }
}
