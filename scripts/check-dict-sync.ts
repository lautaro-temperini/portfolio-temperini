import fs from "node:fs"
import path from "node:path"

type Json = null | boolean | number | string | Json[] | { [key: string]: Json }

function isPlainObject(value: Json): value is Record<string, Json> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function collectKeys(obj: Json, prefix = "", out: string[] = []): string[] {
  if (!isPlainObject(obj)) return out

  for (const key of Object.keys(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    out.push(next)
    collectKeys(obj[key], next, out)
  }

  return out
}

function readJson(filePath: string): Json {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as Json
}

const root = process.cwd()
const esPath = path.join(root, "dictionaries", "es.json")
const enPath = path.join(root, "dictionaries", "en.json")

const es = readJson(esPath)
const en = readJson(enPath)

const esKeys = new Set(collectKeys(es))
const enKeys = new Set(collectKeys(en))

const missingInEn = [...esKeys].filter((k) => !enKeys.has(k)).sort()
const extraInEn = [...enKeys].filter((k) => !esKeys.has(k)).sort()

if (missingInEn.length === 0 && extraInEn.length === 0) {
  console.log("✅ dictionaries are in sync")
  process.exit(0)
}

if (missingInEn.length > 0) {
  console.log("❌ Missing keys in en.json:")
  for (const k of missingInEn) console.log(`- ${k}`)
}

if (extraInEn.length > 0) {
  console.log("❌ Extra keys in en.json (not in es.json):")
  for (const k of extraInEn) console.log(`- ${k}`)
}

process.exit(1)

