export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => void;
}
