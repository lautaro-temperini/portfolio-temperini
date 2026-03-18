import { test, expect } from "@playwright/test"

const routes = ["/", "/es", "/en", "/es/about", "/en/about"]

test.describe("Pages basic health", () => {
  for (const route of routes) {
    test(`${route} devuelve status 200`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" })
      expect(response?.status()).toBe(200)
    })

    test(`${route} no tiene errores JS en consola en el render inicial`, async ({ page }) => {
      const consoleErrors: string[] = []
      const pageErrors: string[] = []

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text())
      })
      page.on("pageerror", (err) => {
        pageErrors.push(String(err))
      })

      await page.goto(route, { waitUntil: "domcontentloaded" })

      // Dar un pequeño margen por errores que aparezcan justo después del DOMContentLoaded
      await page.waitForTimeout(500)

      expect(pageErrors, `pageerror en ${route}:\n${pageErrors.join("\n")}`).toEqual([])
      expect(consoleErrors, `console.error en ${route}:\n${consoleErrors.join("\n")}`).toEqual([])
    })
  }
})

