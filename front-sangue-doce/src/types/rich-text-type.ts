export type RichTextContent = Content[];

export interface Content {
  type: string; // e.g., 'heading', 'paragraph', 'list', 'list-item'
  level?: number; // Para cabeçalhos (1-6)
  children?: Children[];
  format?: "ordered" | "unordered"; // Para listas
}

export interface Children {
  bold?: boolean;
  text?: string;
  type: string; // e.g., 'text'
  children?: Children2[];
}

export interface Children2 {
  text: string;
  type: string; // e.g., 'text'
}
