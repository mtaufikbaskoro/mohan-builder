import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const DATA_DIR = join(import.meta.dirname, '..', 'public', 'data')

const ENDPOINTS = [
  'weapons',
  'armor',
  'armor/sets',
  'charms',
  'decorations',
  'skills',
  'monsters',
  'items',
  'ailments',
  'locations',
  'events',
  'motion-values',
] as const

async function fetchAll(endpoint: string): Promise<unknown> {
  const url = `https://mhw-db.com/${endpoint}`
  console.log(`[fetch] ${url}`)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${endpoint}`)
  }
  return response.json()
}

function toFileName(endpoint: string): string {
  return `${endpoint.replace('/', '-')}.json`
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true })

  const results = await Promise.allSettled(
    ENDPOINTS.map((endpoint) => fetchAll(endpoint))
  )

  let successCount = 0
  let failureCount = 0

  results.forEach((result, index) => {
    const endpoint = ENDPOINTS[index]
    if (result.status === 'fulfilled') {
      const filePath = join(DATA_DIR, toFileName(endpoint))
      writeFileSync(filePath, JSON.stringify(result.value, null, 2), 'utf-8')
      console.log(`[ok] ${filePath}`)
      successCount++
    } else {
      console.error(`[fail] ${endpoint}: ${result.reason}`)
      failureCount++
    }
  })

  console.log(`\nDone: ${successCount} succeeded, ${failureCount} failed`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})