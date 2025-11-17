import { test, expect } from '@playwright/test'
import { FRONT_URL, testUser, resetTestDB, createTestUser } from './helpers/testHelper'

test.describe('Expenses E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Limpiar DB o preparar estado
    await resetTestDB()
    await createTestUser()

    // Login antes de cada test
    await page.goto(FRONT_URL)
    await page.fill('[data-testid="username"]', testUser.username)
    await page.fill('[data-testid="password"]', testUser.password)
    await page.click('button:text("Ingresar")')

    // Comprobamos que llegamos al dashboard
    await expect(page.locator('text=Bienvenido')).toBeVisible()
  })
  
  test('creates a new expense', async ({ page }) => {
    // await page.click('[data-testid="add-expense-button"]')

    await page.fill('[data-testid="new-description"]', 'Testing Expense')
    await page.fill('[data-testid="new-amount"]', '50')
    await page.selectOption('[data-testid="new-category"]', 'food') // select por value
    await page.click('button:text("save")')

    // Validar que el gasto aparece en la lista
    const expense = page.locator('li', { hasText: 'Testing Expense' })
    await expect(expense).toBeVisible()
    await expect(expense).toContainText('50')
    await expect(expense).toContainText('food')
  })

  test.describe('testing expense', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.fill('[data-testid="new-description"]', 'Testing Expense')
      await page.fill('[data-testid="new-amount"]', '50')
      await page.selectOption('[data-testid="new-category"]', 'food')
      await page.click('button:text("save")')
    })

    test('deletes an expense', async ({ page }) => {
      const expenseItem = page.locator('li', { hasText: 'Testing Expense' })
      await expect(expenseItem).toBeVisible()

      await expenseItem.locator('button:text("×")').click()

      // Validamos que desapareció
      await expect(page.locator('li', { hasText: 'Testing Expense' })).toHaveCount(0)
    })

    // test('edits an expense', async ({ page }) => {
    //   const expenseItem = page.locator('li', { hasText: 'Testing Expense' })
    //   await expenseItem.locator('button:text("edit")').click()

    //   await page.fill('[data-testid="edit-description"]', 'Edited Expense')
    //   await page.fill('[data-testid="edit-amount"]', '75')
    //   await page.selectOption('[data-testid="edit-category"]', 'transport')
    //   await page.click('button:text("save")')

    //   await expect(page.locator('li', { hasText: 'Edited Expense' })).toBeVisible()
    // })

    // test('filters expenses by category', async ({ page }) => {
    //   await page.selectOption('[data-testid="filter-category"]', 'food');
    //   const foodExpenses = page.locator('li', { hasText: 'food' })
    //   await expect(foodExpenses).toHaveCountGreaterThan(0)
    // })
  })
})