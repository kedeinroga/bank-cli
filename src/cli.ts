import { CsvParser } from './utils/csv-parser';
import { TransactionService } from './services/transaction-service';
import { TransactionType } from './models/transaction';
import path from 'path';


export function runCli(filePath: string): string {
  const resolvedPath = path.resolve(filePath);
  const transactions = CsvParser.parse(resolvedPath);
  const service = new TransactionService(transactions);

  const summary = service.getSummary();

  const balance = summary.balance;
  const maxTransaction = summary.maxTransaction;
  const count = summary.counts;

  const output = [
    'Reporte de Transacciones',
    '---------------------------------------------',
    `Balance Final: ${balance.toFixed(2)}`,
    `Transacción de Mayor Monto: ID ${maxTransaction.id} - ${maxTransaction.monto.toFixed(2)}`,
    `Conteo de Transacciones: Crédito: ${count[TransactionType.CREDIT]} Débito: ${count[TransactionType.DEBIT]}`
  ].join('\n');

  return output;
}

// ejecución real desde la línea de comandos
if (require.main === module) {
  const [, , filePath] = process.argv;
  const result = runCli(filePath);
  console.log(result);
}

