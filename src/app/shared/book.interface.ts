export interface IDCard {
  cardNumber: number;
  cardHolder: string;
}

export interface Library {
  libNumber: number;
  address: string;
}

export interface Book {
  id?: number;
  penalty?: number;
  title?: string | null | undefined;
  returned: boolean;
  library: Library;
  dateOfLoan: Date | null;
  returnDate: Date | undefined;
  idCard: IDCard;
}

export enum EDepartment {
  archive = 'archiwum',
  rental = 'wypożyczalnia'
}

export interface Department {
  department: EDepartment;
}

