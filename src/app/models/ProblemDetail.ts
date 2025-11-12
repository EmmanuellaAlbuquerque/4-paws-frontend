export interface ProblemDetail {
  title: string;
  detail: string;
  status: number;
  instance: string;
  type: string;
  timestamp: string;
  properties: {
    errorCode: string;
    timestamp: string;
  }
}
