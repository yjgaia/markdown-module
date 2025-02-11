import MarkdownParser from "../lib/MarkdownParser.js";

const markdownText = `
# 제목 1

이것은 단락입니다. 여러 줄로 작성할 수 있으며 빈 줄로 구분됩니다.

## 제목 2

- 목록 항목 1
- 목록 항목 2
- 목록 항목 3

\`\`\`javascript
// 코드 블록 예제
function hello() {
  console.log("Hello, world!");
}
\`\`\`
`;

const ast = MarkdownParser.parse(markdownText);

console.log(JSON.stringify(ast, null, 2));
