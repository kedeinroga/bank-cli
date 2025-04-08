export class NoTransactionsFoundError extends Error {
  constructor() {
    super('Not found transactions.');
    this.name = 'NoTransactionsFoundError';
  }
}
