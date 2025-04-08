import { Transaction, TransactionType } from '../models/transaction';
import { TransactionService } from './transaction-service';
import { NoTransactionsFoundError } from '../errors/no-transactions-found-error';

describe('TransactionService', () => {
  const mockTransactions: Transaction[] = [
    { id: 1, tipo: TransactionType.CREDIT, monto: 100 },
    { id: 2, tipo: TransactionType.DEBIT, monto: 50 },
    { id: 3, tipo: TransactionType.CREDIT, monto: 200 },
    { id: 4, tipo: TransactionType.DEBIT, monto: 75 },
    { id: 5, tipo: TransactionType.CREDIT, monto: 150 },
  ];

  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService(mockTransactions);
  });

  test('should correctly calculate the general summary', () => {
    const summary = service.getSummary();

    expect(summary.balance).toBe(325); // 100 + 200 + 150 - 50 - 75
    expect(summary.maxTransaction.id).toBe(3);
    expect(summary.maxTransaction.monto).toBe(200);
    expect(summary.counts).toEqual({
      Crédito: 3,
      Débito: 2,
    });
  });

  test('should throw an error if the transaction list is empty', () => {
    const emptyService = new TransactionService([]);
    expect(() => emptyService.getSummary()).toThrow(NoTransactionsFoundError);
  });

  test('should handle correctly if the largest transaction is a debit.', () => {
    const data: Transaction[] = [
      { id: 1, tipo: TransactionType.DEBIT, monto: 500 },
      { id: 2, tipo: TransactionType.CREDIT, monto: 100 },
    ];
    const service = new TransactionService(data);
    const summary = service.getSummary();

    expect(summary.maxTransaction.id).toBe(1);
    expect(summary.maxTransaction.monto).toBe(500);
    expect(summary.balance).toBe(-400); // 100 - 500
    expect(summary.counts).toEqual({
      Crédito: 1,
      Débito: 1,
    });
  });

  test('should handle correctly if they are all of the same type', () => {
    const data: Transaction[] = [
      { id: 1, tipo: TransactionType.CREDIT, monto: 100 },
      { id: 2, tipo: TransactionType.CREDIT, monto: 300 },
    ];
    const service = new TransactionService(data);
    const summary = service.getSummary();

    expect(summary.balance).toBe(400);
    expect(summary.counts).toEqual({
      Crédito: 2,
      Débito: 0,
    });
    expect(summary.maxTransaction.id).toBe(2);
  });

  test('should handle correctly if there are amounts with decimals.', () => {
    const data: Transaction[] = [
      { id: 1, tipo: TransactionType.CREDIT, monto: 99.99 },
      { id: 2, tipo: TransactionType.DEBIT, monto: 49.49 },
    ];
    const service = new TransactionService(data);
    const summary = service.getSummary();

    expect(summary.balance).toBeCloseTo(50.5, 2);
    expect(summary.maxTransaction.monto).toBeCloseTo(99.99, 2);
    expect(summary.counts).toEqual({
      Crédito: 1,
      Débito: 1,
    });
  });
});
