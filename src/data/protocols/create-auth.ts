export type CreateAuthProps = {
  id: string;
  email: string;
  roles: string[];
};

export type CreateAuthResult = {
  name: string;
  token: string;
  refreshToken: string;
};
export interface CreateAuth {
  create: (data: CreateAuthProps) => Promise<CreateAuthResult>;
}
