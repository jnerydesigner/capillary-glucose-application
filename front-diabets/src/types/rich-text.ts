export type RichTextContent = Content[];

export interface Content {
  type: string;
  level?: number;
  children: Children[];
  format?: string;
}

export interface Children {
  bold?: boolean;
  text?: string;
  type: string;
  children?: Children2[];
}

export interface Children2 {
  text: string;
  type: string;
}
