export function getMHUrl (endpoint: string): string {
    // Fallback to a default or environment variable
    const baseUrl = process.env.MHW_API || '';

    // Clean the base URL (remove trailing slash) and endpoint (remove leading slash)
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');

    return `${cleanBase}/${cleanEndpoint}`;
}