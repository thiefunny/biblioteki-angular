export interface IDCard {
  cardNumber: number;
  cardHolder: string;
}

export interface Library {
  libNumber: number;
  address: string;
}

export interface Book {
  ID: number;
  title: string;
  returned: boolean;
  library: Library;
  dateOfLoan: Date | null;
  returnDate: Date;
  penalty: number;
  idCard: IDCard;
}
