import { Tutor } from './Tutor';

export type TutorsListResponse = {
  _embedded: {
    tutorsDTOList: Tutor[];
  },
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }
}
