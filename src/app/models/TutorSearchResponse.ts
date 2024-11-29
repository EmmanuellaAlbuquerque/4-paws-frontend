import { Address } from './Address';
import { Pet } from './Pet';

export type TutorSearchResponse = {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  address: Address;
  pets: Pet[]
}
