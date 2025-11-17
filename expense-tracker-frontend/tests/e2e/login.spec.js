import { test, expect } from '@playwright/test'
import {FRONT_URL, createTestUser, testUser, resetTestDB } from './helpers/testHelper'

test.describe('Login flow', () => {

  test.beforeEach(async ({ request }) => {
    // Limpiar la base y crear un usuario de prueba
    await resetTestDB()
    await createTestUser()
  })

  test('shows login form by default', async ({ page }) => {
    await page.goto(FRONT_URL)
    await expect(page.getByRole('heading', { name: /Iniciar sesión/i })).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await page.goto(FRONT_URL)
    await page.fill('[data-testid="username"]', 'wrongUser')
    await page.fill('[data-testid="password"]', 'wrongPass')
    await page.click('button:text("Ingresar")')

    // const errorMessage = page.locator('.error')
    // await expect(errorMessage).toContainText('invalid username or password')
    await expect(page.getByRole('heading', { name: /Iniciar sesión/i })).toBeVisible()
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await page.goto(FRONT_URL)
    await page.fill('[data-testid="username"]', testUser.username)
    await page.fill('[data-testid="password"]', testUser.password)
    await page.click('button:text("Ingresar")')

    await expect(page.locator('text=Bienvenido')).toBeVisible()
  })

  test('can log out', async ({ page }) => {
    await page.goto(FRONT_URL)
    await page.fill('[data-testid="username"]', testUser.username)
    await page.fill('[data-testid="password"]', testUser.password)
    await page.click('button:text("Ingresar")')

    await expect(page.locator('text=Bienvenido')).toBeVisible()

    await page.click('button:text("Log out")')
    await expect(page.getByRole('heading', { name: /Iniciar sesión/i })).toBeVisible()
  })
})
