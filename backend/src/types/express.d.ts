import User from "../models/User";
import { JwtUserPayload } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User | JwtUserPayload;
    }
  }
}

export {};
