import { Transaction, TransactionType } from '../models/transaction';
import { NoTransactionsFoundError } from '../errors/no-transactions-found-error';

interface Summary {
  balance: number;
  maxTransaction: Transaction;
  counts: Record<TransactionType, number>;
}

export class TransactionService {
  constructor(private transactions: Transaction[]) {}

  /**
   * Calcula balance, transacción de mayor monto y conteo de tipos en una sola pasada
   */
  getSummary(): Summary {
    if (this.transactions.length === 0) {
      throw new NoTransactionsFoundError();
    }

    let balance = 0;
    let maxTransaction: Transaction = this.transactions[0];
    const counts: Record<TransactionType, number> = {
      Crédito: 0,
      Débito: 0,
    };

    for (const t of this.transactions) {
      // Actualizar balance
      balance += t.tipo === TransactionType.CREDIT ? t.monto : -t.monto;

      // Actualizar transacción de mayor monto
      if (t.monto > maxTransaction.monto) {
        maxTransaction = t;
      }

      // Contar tipos
      if (t.tipo === TransactionType.CREDIT || t.tipo === TransactionType.DEBIT) {
        counts[t.tipo]++;
      }
    }

    return {
      balance,
      maxTransaction,
      counts,
    };
  }
}

