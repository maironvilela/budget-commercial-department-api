export interface HashCompare {
  compare: (textPlain: string, hash: string) => Promise<boolean>;
}
