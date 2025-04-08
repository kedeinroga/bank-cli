import mockFs from 'mock-fs';
import { runCli } from './cli';
import { execSync } from 'child_process';

describe('CLI Integration Test', () => {
  const mockCsvContent = `id,tipo,monto
1,Crédito,100.00
2,Débito,50.00
3,Crédito,200.00
4,Débito,75.00
5,Crédito,150.00`;

  beforeEach(() => {
    mockFs({
      'transactions.csv': mockCsvContent,
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  test('run CLI and display the report correctly', () => {
    const output = runCli('transactions.csv');

    expect(output).toContain('Reporte de Transacciones');
    expect(output).toContain('Balance Final: 325.00');
    expect(output).toContain('Transacción de Mayor Monto: ID 3 - 200.00');
    expect(output).toContain('Conteo de Transacciones: Crédito: 3 Débito: 2');
  });

  test('handles empty file with proper error', () => {
    mockFs({
      'empty.csv': 'id,tipo,monto\n',
    });

    expect(() => runCli('empty.csv')).toThrow('Not found transactions.');
  });
});
