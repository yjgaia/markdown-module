class MarkdownParser {
    parse(markdown) {
        const lines = markdown.split(/\r?\n/);
        const nodes = [];
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
    parseCodeBlock(lines, startIndex) {
        const openingLine = lines[startIndex];
        const languageMatch = openingLine.match(/^```(\w+)?/);
        const language = languageMatch ? languageMatch[1] : undefined;
        const contentLines = [];
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
    parseList(lines, startIndex) {
        const items = [];
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
    parseParagraph(lines, startIndex) {
        const contentLines = [];
        let i = startIndex;
        while (i < lines.length &&
            lines[i].trim() !== "" &&
            !lines[i].startsWith("```") &&
            !lines[i].match(/^(#{1,6})\s+/) &&
            !lines[i].match(/^\s*[-*]\s+/)) {
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
//# sourceMappingURL=MarkdownParser.js.map