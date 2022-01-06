export interface IDCard {
  cardNumber: number;
  cardHolder?: string;
}

export interface libraryAddress {
  number: number;
  address?: string;
}

export interface Book {
  ID: number;
  title: string;
  returned: boolean;
  libraryAddress: libraryAddress;
  returnDate: Date;
  penalty: number;
  IDcard: IDCard;
}
