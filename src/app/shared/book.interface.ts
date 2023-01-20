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
  id: number | string | undefined;
  title: string;
  libraryId: number;
  dateOfLoan: Date;
  returnDate: Date;
  cardId: number;
  penalty: number;
  returned: boolean;
}

export enum EDepartment {
  archive = 'archive',
  onloan = 'onloan',
}

export type Department = EDepartment.archive | EDepartment.onloan
