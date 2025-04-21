/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextContent } from "@/types/rich-text";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

type RichTextProps = {
  content: RichTextContent;
};

export function RichTextRenderer({ content }: RichTextProps) {
  const renderNode = (node: any, index: number): ReactNode => {
    if (node.type === "text") {
      if (node.bold) {
        return (
          <p key={index} className="font-bold">
            {node.text}
          </p>
        );
      }
      return node.text;
    }

    if (node.type === "heading" && node.level) {
      switch (node.level) {
        case 1:
          return (
            <h1 key={index} className="text-[2.6rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h1>
          );
        case 2:
          return (
            <h2 key={index} className="text-[2.4rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h2>
          );
        case 3:
          return (
            <h3 key={index} className="text-[2.2rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h3>
          );
        case 4:
          return (
            <h4 key={index} className="text-[1.8rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h4>
          );
        case 5:
          return (
            <h5 key={index} className="text-[1.6rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h5>
          );
        case 6:
          return (
            <h6 key={index} className="text-[1.4rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h6>
          );
        default:
          return (
            <h3 key={index} className="text-[2.2rem]">
              {node.children.map((child: any, i: number) =>
                renderNode(child, i)
              )}
            </h3>
          );
      }
    }

    if (node.type === "paragraph") {
      return (
        <p key={index} className="my-4">
          {node.children.map((child: any, i: number) => renderNode(child, i))}
        </p>
      );
    }

    if (node.type === "list") {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className="ml-8 my-4 list-none" // Removida a seta e ajustado o estilo
        >
          {node.children.map((child: any, i: number) => renderNode(child, i))}
        </ListTag>
      );
    }

    if (node.type === "list-item") {
      return (
        <li key={index} className="flex items-center my-2">
          <FaArrowRight className="mr-2 text-green-500" />
          <span>
            {node.children.map((child: any, i: number) => renderNode(child, i))}
          </span>
        </li>
      );
    }

    return null;
  };

  return <>{content.map((node, index) => renderNode(node, index))}</>;
}
