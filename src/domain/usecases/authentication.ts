export type AuthResponse = {
  token: string;
  refreshToken: string;
};
export type AuthProps = {
  email: string;
  password: string;
};
export interface Authentication {
  auth: ({ email, password }: AuthProps) => Promise<AuthResponse>;
}
