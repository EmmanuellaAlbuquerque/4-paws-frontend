export type ProfileResponse = {
  email: string;
  name: string;
  cpf: string;
  role: string;

  specialty?: string;
  crmv?: number;
  uf?: string;
}
