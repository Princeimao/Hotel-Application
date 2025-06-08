export declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        email: string;
        phone: string;
        jti: string;
        iat: number;
        exp: number;
      };
    }
  }
}
