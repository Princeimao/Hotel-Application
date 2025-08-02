import { JwtPayload } from "./src/middleware/auth.middleware";
declare global {
  namespace Express {
    interface Request {
      hostUser: JwtPayload;
    }
  }
}
