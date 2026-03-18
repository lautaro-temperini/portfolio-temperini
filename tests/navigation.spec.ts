import { test, expect } from "@playwright/test"

test("'/'' redirige al idioma por defecto", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "domcontentloaded" })
  expect(response?.status()).toBe(200)
  await expect(page).toHaveURL(/\/en\/?$/)
})

test("/en muestra contenido en inglés", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" })
  await expect(page.getByText(
    "I turn complex problems into interfaces people understand"
  )).toBeVisible()
})

test("/es muestra contenido en español", async ({ page }) => {
  await page.goto("/es", { waitUntil: "domcontentloaded" })
  await expect(page.getByText(
    "Convierto problemas complejos en interfaces que la gente entiende"
  )).toBeVisible()
})

test("el selector de idioma existe", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" })
  await expect(page.locator("#language-selector-button")).toBeVisible()
})

