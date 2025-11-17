// import { test, expect } from '@playwright/test'
// import { API_URL, testUser, resetTestDB } from './helpers/testHelper'

// test.describe('User management', () => {

//   test.beforeEach(async ({ request }) => {
//     // Limpiar la base y crear un usuario de prueba
//     await resetTestDB()
//   })

//   test('allows new user registration', async ({ page }) => {
//     await page.goto(`${API_URL}/api/users`)

//     await page.fill('[data-testid="username"]', testUser.username)
//     await page.fill('[data-testid="name"]', testUser.name)
//     await page.fill('[data-testid="password"]', testUser.password)
//     await page.click('button:text("register")')

//     await expect(page.locator('.success')).toContainText('User created')
//     await expect(page).toHaveURL(/\/login$/)
//   });

//   test('prevents registering with existing username', async ({ page }) => {
//     await page.goto(`${API_URL}/api/users`);

//     await page.fill('[data-testid="username"]', testUser.username)
//     await page.fill('[data-testid="name"]', 'Someone Else')
//     await page.fill('[data-testid="password"]', 'anotherpass')
//     await page.click('button:text("register")')

//     const error = page.locator('.error')
//     await expect(error).toContainText('username already exists') // expected `username` to be unique
//   })

//   // test('redirects to login after registration', async ({ page }) => {
//   //   await page.goto(`${API_URL}/api/users`)

//   //   await page.fill('[data-testid="username"]', 'redirectUser')
//   //   await page.fill('[data-testid="name"]', 'Redirect User')
//   //   await page.fill('[data-testid="password"]', 'redirectpass')
//   //   await page.click('button:text("register")');

//   //   await expect(page).toHaveURL(/\/login$/)
//   // })
// })
