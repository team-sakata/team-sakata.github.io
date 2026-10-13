import newsData from "../data/news.yaml";
import { buildLocalizedPath, type Locale } from "./paths";
import { parseInlineLinks } from "./richText";

export interface NewsEntry {
  date: string;
  text: string;
  textEn?: string;
  title?: string;
  titleEn?: string;
  body?: string;
  bodyEn?: string;
  images?: string[];
  id?: string;
  link?: string;
}

export const newsItems = newsData as NewsEntry[];

export type DetailedNewsEntry = NewsEntry & { id: string };

// Only news entries with an explicit ID get a detail page.
export function hasNewsDetail(entry: NewsEntry): entry is DetailedNewsEntry {
  return typeof entry.id === "string" && entry.id.length > 0;
}

export function getNewsPath(entry: DetailedNewsEntry, locale: Locale): string {
  return buildLocalizedPath(locale, `news/${entry.id}`);
}

export function getNewsText(entry: NewsEntry, locale: Locale): string {
  return locale === "en" ? entry.textEn ?? entry.text : entry.text;
}

export function getNewsTitle(entry: NewsEntry, locale: Locale): string {
  const title = locale === "en"
    ? entry.titleEn ?? entry.title ?? getNewsText(entry, locale)
    : entry.title ?? entry.text;
  return parseInlineLinks(title).map((segment) => segment.value).join("");
}

export function getNewsBody(entry: NewsEntry, locale: Locale): string {
  return locale === "en"
    ? entry.bodyEn ?? entry.body ?? getNewsText(entry, locale)
    : entry.body ?? getNewsText(entry, locale);
}
