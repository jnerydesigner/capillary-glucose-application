import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

export type RichTextContent = RichTextNode[];

export interface RichTextNode {
  type: "text" | "heading" | "paragraph" | "list" | "list-item";
  text?: string;
  bold?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  children?: RichTextNode[];
}

interface RichTextProps {
  content: RichTextContent;
}

type HeadingTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function RichTextRenderer({ content }: RichTextProps) {
  const renderNode = (node: RichTextNode, index: number): ReactNode => {
    if (node.type === "text") {
      if (node.bold) {
        return (
          <strong key={index} className="font-bold">
            {node.text}
          </strong>
        );
      }
      return node.text;
    }

    if (node.type === "heading" && node.level) {
      const headingMap: Record<number, HeadingTagType> = {
        1: "h1",
        2: "h2",
        3: "h3",
        4: "h4",
        5: "h5",
        6: "h6",
      };
      const HeadingTag: HeadingTagType = headingMap[node.level] || "h3";
      const fontSizes: Record<HeadingTagType, string> = {
        h1: "text-[1.8rem] md:text-[2.6rem]",
        h2: "text-[1.6rem] md:text-[2.4rem]",
        h3: "text-[1.4rem] md:text-[2.2rem]",
        h4: "text-[1.2rem] md:text-[1.8rem]",
        h5: "text-[1.0rem] md:text-[1.6rem]",
        h6: "text-[0.8rem] md:text-[1.4rem]",
      };

      return (
        <HeadingTag key={index} className={fontSizes[HeadingTag]}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </HeadingTag>
      );
    }

    if (node.type === "paragraph") {
      return (
        <p key={index} className="my-4">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );
    }

    if (node.type === "list") {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={index} className="ml-8 my-4">
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );
    }

    if (node.type === "list-item") {
      return (
        <li
          key={index}
          className="w-full flex justify-between items-center my-2"
        >
          <FaArrowRight className="w-10 ml-4 mr-2" />
          <span className="w-[95%] p-2">
            {node.children?.map((child, i) => renderNode(child, i))}
          </span>
        </li>
      );
    }

    return null;
  };

  return <>{content.map((node, index) => renderNode(node, index))}</>;
}
