import fs from 'fs';
import { Transaction, TransactionType } from '../models/transaction';

export class CsvParser {
  static parse(filePath: string): Transaction[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    const transactions: Transaction[] = [];

    for (let i = 1; i < lines.length; i++) {
      const [id, tipo, monto] = lines[i].split(',');

      transactions.push(
        {
          id: parseInt(id, 10),
          tipo: tipo as TransactionType,
          monto: parseFloat(monto),
        }
      );
    }

    return transactions;
  }
}
