export interface IToken {
  create(payload: object): string;

  verify(token: string): Promise<boolean>;

  decode(token: string): object;
}
