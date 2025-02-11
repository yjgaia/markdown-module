export interface HeadingNode {
    type: "heading";
    level: number;
    content: string;
}
export interface ParagraphNode {
    type: "paragraph";
    content: string;
}
export interface ListNode {
    type: "list";
    items: ListItemNode[];
}
export interface ListItemNode {
    type: "listItem";
    content: string;
}
export interface CodeBlockNode {
    type: "codeBlock";
    language?: string;
    content: string;
}
type MarkdownNode = HeadingNode | ParagraphNode | ListNode | ListItemNode | CodeBlockNode;
export default MarkdownNode;
//# sourceMappingURL=MarkdownNode.d.ts.map