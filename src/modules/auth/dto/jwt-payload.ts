export interface JwtPayload {
  userId: string;
  companyId: string | null;
  roles: string[];
}
