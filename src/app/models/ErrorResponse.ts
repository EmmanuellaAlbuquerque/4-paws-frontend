export type ErrorResponse = {
  timestamp: string,
  statusCode: number,
  errors: {
    [key: string]: string
  }
}
