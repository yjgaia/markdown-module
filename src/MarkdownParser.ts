import MarkdownNode, {
  CodeBlockNode,
  ListItemNode,
  ListNode,
  ParagraphNode,
} from "./MarkdownNode.js";

class MarkdownParser {
  public parse(markdown: string): MarkdownNode[] {
    const lines = markdown.split(/\r?\n/);
    const nodes: MarkdownNode[] = [];
    let i = 0;

    while (i < lines.length) {
      let line = lines[i];

      if (line.trim() === "") {
        i++;
        continue;
      }

      if (line.startsWith("```")) {
        const codeBlockResult = this.parseCodeBlock(lines, i);
        nodes.push(codeBlockResult.node);
        i = codeBlockResult.nextIndex;
        continue;
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = headingMatch[2];
        nodes.push({ type: "heading", level, content });
        i++;
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        const listResult = this.parseList(lines, i);
        nodes.push(listResult.node);
        i = listResult.nextIndex;
        continue;
      }

      const paragraphResult = this.parseParagraph(lines, i);
      nodes.push(paragraphResult.node);
      i = paragraphResult.nextIndex;
    }

    return nodes;
  }

  private parseCodeBlock(
    lines: string[],
    startIndex: number,
  ): { node: CodeBlockNode; nextIndex: number } {
    const openingLine = lines[startIndex];
    const languageMatch = openingLine.match(/^```(\w+)?/);
    const language = languageMatch ? languageMatch[1] : undefined;
    const contentLines: string[] = [];
    let i = startIndex + 1;

    while (i < lines.length && !lines[i].startsWith("```")) {
      contentLines.push(lines[i]);
      i++;
    }
    if (i < lines.length && lines[i].startsWith("```")) {
      i++;
    }
    return {
      node: {
        type: "codeBlock",
        language,
        content: contentLines.join("\n"),
      },
      nextIndex: i,
    };
  }

  private parseList(
    lines: string[],
    startIndex: number,
  ): { node: ListNode; nextIndex: number } {
    const items: ListItemNode[] = [];
    let i = startIndex;

    while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
      const match = lines[i].match(/^\s*[-*]\s+(.*)$/);
      if (match) {
        items.push({ type: "listItem", content: match[1] });
      }
      i++;
    }
    return {
      node: { type: "list", items },
      nextIndex: i,
    };
  }

  private parseParagraph(
    lines: string[],
    startIndex: number,
  ): { node: ParagraphNode; nextIndex: number } {
    const contentLines: string[] = [];
    let i = startIndex;

    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !lines[i].match(/^\s*[-*]\s+/)
    ) {
      contentLines.push(lines[i].trim());
      i++;
    }
    return {
      node: { type: "paragraph", content: contentLines.join(" ") },
      nextIndex: i,
    };
  }
}

export default new MarkdownParser();
