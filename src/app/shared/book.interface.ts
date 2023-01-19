export interface IdCard {
  id: number | string;
  code: number;
  holder: string;
}

export interface Library {
  id: number | string;
  code: number;
  address: string;
}

export interface BookAttrs {
  id?: number | string;
  title: string;
  libraryId: number | string;
  dateOfLoan: Date;
  returnDate: Date;
  cardId: number | string;
  penalty: number;
  returned: boolean;
}

export enum EDepartment {
  archive = 'archive',
  onloan = 'onloan',
}

export type Department = EDepartment.archive | EDepartment.onloan
