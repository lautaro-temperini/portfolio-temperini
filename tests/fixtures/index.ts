import { test as base, expect } from "@playwright/test"

/** Base test con fixtures compartidos; extender aquí con `test.extend`. */
export const test = base.extend({})

export { expect }
