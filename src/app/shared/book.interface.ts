export interface IdCard {
  id?: number;
  code: number;
  holder: string;
}

export interface Library {
  id?: number;
  code: number;
  address: string;
}

export interface Book {
  id?: number;
  title: string;
  libraryId: number;
  dateOfLoan: Date;
  returnDate: Date;
  cardId: number;
  penalty: number;
  returned: boolean;
}

export enum EDepartment {
  archive = 'archiwum',
  rental = 'wypożyczalnia',
}

export interface Department {
  department: EDepartment;
}
