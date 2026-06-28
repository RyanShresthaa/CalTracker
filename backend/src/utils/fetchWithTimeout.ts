export async function fetchWithTimeout(
  url: string | URL,
  init: RequestInit = {},
  ms = 5000,
): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(ms) });
}
