import { test, expect } from "@playwright/test"

test.describe("Contact page", () => {
  test("/es/contact renderiza el formulario", async ({ page }) => {
    await page.goto("/es/contact", { waitUntil: "domcontentloaded" })
    await expect(page.locator("form")).toBeVisible()
    await expect(page.locator("input#name")).toBeVisible()
    await expect(page.locator("input#email")).toBeVisible()
    await expect(page.locator("textarea#message")).toBeVisible()
  })

  test("/en/contact renderiza el formulario", async ({ page }) => {
    await page.goto("/en/contact", { waitUntil: "domcontentloaded" })
    await expect(page.locator("form")).toBeVisible()
    await expect(page.locator("input#name")).toBeVisible()
    await expect(page.locator("input#email")).toBeVisible()
    await expect(page.locator("textarea#message")).toBeVisible()
  })

  test("submit inválido muestra mensajes de error (validación client-side)", async ({ page }) => {
    await page.goto("/es/contact", { waitUntil: "domcontentloaded" })

    // Esperar hidratación antes de interactuar (evita submit nativo temprano).
    await page.waitForLoadState("networkidle")

    // Evitar la validación nativa del navegador para que corra validateForm() del componente.
    await page.locator("form").evaluate((form) => {
      ;(form as HTMLFormElement).noValidate = true
    })

    await page.click("button[type='submit']")

    await expect(page.locator("#form-status")).toBeVisible()
    await expect(page.locator("#form-status")).toContainText("al menos")
  })
})

