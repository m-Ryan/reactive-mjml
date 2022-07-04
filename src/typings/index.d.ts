export interface IBlock<T extends Record<string, string> = Record<string, string>> {
  attributes: T;
  tagName: string;
  children?: Array<IBlock>;
  content?: string;
}

export type IComponentAttributes =
  | Record<string, string>
  | { [key: string]: string; style: Record<string, string> };
