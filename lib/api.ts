export function getMHUrl(endpoint: string): string {
  const baseUrl = process.env.MHW_API || ''
  const cleanBase = baseUrl.replace(/\/$/, '')
  const cleanEndpoint = endpoint.replace(/^\//, '')
  return `${cleanBase}/${cleanEndpoint}`
}

export function getLocalDataUrl(filename: string): string {
  return `/data/${filename}`
}