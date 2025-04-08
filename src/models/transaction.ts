export enum TransactionType {
  CREDIT = 'Crédito',
  DEBIT = 'Débito'
}

export interface Transaction {
  id: number;
  tipo: TransactionType;
  monto: number;
}