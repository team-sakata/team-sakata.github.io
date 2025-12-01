/**
 * Resolves a path by prepending the base URL if it starts with a slash.
 * This ensures assets work correctly when deployed to a subdirectory.
 * 
 * @param path The path to resolve (e.g., "/images/foo.jpg")
 * @returns The resolved path (e.g., "/sklab_homepage/images/foo.jpg")
 */
export type Locale = 'ja' | 'en';

const normalizeSegment = (value: string) => value.replace(/^\/+|\/+$/g, '');
const leadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);

const getBaseSegment = () => {
    const baseUrl = import.meta.env.BASE_URL ?? '/';
    return baseUrl === '/' ? '' : normalizeSegment(baseUrl);
};

const stripBasePrefix = (pathname: string): string => {
    const normalizedPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const baseSegment = getBaseSegment();

    if (!baseSegment) {
        return normalizedPath;
    }

    if (normalizedPath === baseSegment) {
        return '';
    }

    if (normalizedPath.startsWith(`${baseSegment}/`)) {
        return normalizedPath.slice(baseSegment.length + 1);
    }

    return normalizedPath;
};

const stripLocalePrefix = (pathname: string): string => {
    const relative = stripBasePrefix(pathname);
    if (!relative) return '';
    if (relative === 'ja' || relative === 'en') return '';
    if (relative.startsWith('ja/')) {
        return relative.slice(3);
    }
    if (relative.startsWith('en/')) {
        return relative.slice(3);
    }
    return relative;
};

const joinSegments = (...segments: Array<string | undefined>) =>
    segments.filter((segment) => Boolean(segment && segment.length)).map((segment) => normalizeSegment(segment!)).filter(Boolean).join('/');

export function resolvePath(path: string): string {
    if (!path) return path;
    if (path.startsWith('http') || path.startsWith('//')) return path;

    // Remove leading slash to avoid double slashes when joining
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // import.meta.env.BASE_URL includes the trailing slash if configured, or might not.
    // Astro's BASE_URL behavior:
    // If base is '/foo', BASE_URL is '/foo/' (dev) or '/foo/' (prod) usually.
    // But let's be safe.

    const baseUrl = import.meta.env.BASE_URL;

    // If BASE_URL is just '/', return path with leading slash
    if (baseUrl === '/') {
        return `/${cleanPath}`;
    }

    // Ensure baseUrl ends with slash
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${cleanBase}${cleanPath}`;
}

export function detectLocale(pathname: string): Locale {
    const relative = stripBasePrefix(pathname);
    if (relative === 'en' || relative.startsWith('en/')) {
        return 'en';
    }
    // Default to 'ja' for both /ja/ paths and root
    return 'ja';
}

export function stripLocaleFromPath(pathname: string): string {
    return stripLocalePrefix(pathname);
}

export function buildLocalizedPath(locale: Locale, relativePath = ''): string {
    const baseSegment = getBaseSegment();
    const localeSegment = locale; // Always include locale prefix (ja or en)
    const cleanRelative = normalizeSegment(relativePath);
    const joined = joinSegments(baseSegment, localeSegment, cleanRelative);
    let pathname = joined ? leadingSlash(joined) : '/';

    if (!cleanRelative) {
        pathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
    }

    return pathname.replace(/\/+$/g, (match) => (pathname.length > 1 ? match.slice(0, 1) : match));
}

export function getLocaleToggleLinks(pathname: string): Record<Locale, string> {
    const relative = stripLocaleFromPath(pathname);
    return {
        ja: buildLocalizedPath('ja', relative),
        en: buildLocalizedPath('en', relative),
    };
}
