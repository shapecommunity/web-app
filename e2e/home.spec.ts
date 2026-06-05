import { expect, test } from '@playwright/test'

test('home page renders primary content and nav', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Shape Community App' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Discover' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Meta' }).first()).toBeVisible()
  await expect(page.getByText(/Version 0\.1\.0/)).toBeVisible()
})

test('unknown route shows the not found page', async ({ page }) => {
  await page.goto('/outside')

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Home' }).last()).toHaveAttribute('href', '/')
  await expect(page.getByRole('link', { name: 'Discover' }).last()).toHaveAttribute('href', '/shapes')
})
