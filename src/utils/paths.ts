/**
 * Resolves a path by prepending the base URL if it starts with a slash.
 * This ensures assets work correctly when deployed to a subdirectory.
 * 
 * @param path The path to resolve (e.g., "/images/foo.jpg")
 * @returns The resolved path (e.g., "/sklab_homepage/images/foo.jpg")
 */
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
