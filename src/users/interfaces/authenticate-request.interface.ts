export interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    [key: string]: any;
  };
}
