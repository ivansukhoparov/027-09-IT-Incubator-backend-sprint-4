export interface IToken<A, B> {
  create(payload: A): void;

  get(): string;

  set(code: string): void;

  verify(): boolean;

  decode(): B;
}
