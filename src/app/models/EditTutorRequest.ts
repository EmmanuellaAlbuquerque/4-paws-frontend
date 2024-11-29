export type EditTutorRequest = {
  phone: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
  }
}
