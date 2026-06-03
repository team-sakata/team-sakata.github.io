export type TextSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; external: boolean };

/**
 * Parse a news text string that may contain inline markdown-style links
 * like `[label](https://example.com)` into renderable segments.
 *
 * Supports zero, one, or many links within a single string so that a single
 * news item can carry multiple links (e.g. press releases).
 */
export function parseInlineLinks(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const href = match[2];
    segments.push({
      type: "link",
      value: match[1],
      href,
      external: /^https?:\/\//.test(href),
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}
