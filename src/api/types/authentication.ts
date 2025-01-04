export interface JwtPayload {
  role: string;
  sub: string;
  exp: number;
  iat: number;
  // ... add you jwt payload fields here
}
