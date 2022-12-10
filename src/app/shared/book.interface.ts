export interface IDCard {
  cardNumber: number;
  cardHolder: string;
}

export interface LibraryAddress {
  libNumber: number;
  address: string;
}

export interface Book {
  ID: number;
  title: string;
  returned: boolean;
  LibraryAddress: LibraryAddress;
  dateOfLoan: Date | null;
  returnDate: Date;
  penalty: number;
  IDcard: IDCard;
}
