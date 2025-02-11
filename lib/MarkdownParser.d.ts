import MarkdownNode from "./MarkdownNode.js";
declare class MarkdownParser {
    parse(markdown: string): MarkdownNode[];
    private parseCodeBlock;
    private parseList;
    private parseParagraph;
}
declare const _default: MarkdownParser;
export default _default;
//# sourceMappingURL=MarkdownParser.d.ts.map