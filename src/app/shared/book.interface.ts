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

// u siebie w apce kosmicznej robiłeś klasę "Pilot", ja tutaj nie widzę za bardzo na razie potrzeby, korzystam tylko z interfejsu BookAttrs, który sprawdza, czy przesyłam / korzystam z tego co trzeba
// - spoko, ja również na co dzień korzystam z interfejsów

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
