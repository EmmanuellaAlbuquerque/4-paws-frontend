export type NewTutorRequest = {
  name: string;
  phone: string;
  cpf: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
  }
}
