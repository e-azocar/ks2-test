import { Request } from 'express';

export interface AuthRequest extends Request {
  cookies: Record<string, string | undefined>;
  user?: UserPayload;
}

export interface UserPayload {
  sub: string;
  email: string;
}
