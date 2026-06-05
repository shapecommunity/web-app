import { expect, test } from '@playwright/test'

test('discover supports pagination, filtering, and detail navigation', async ({ page, isMobile }) => {
  test.skip(isMobile, 'This flow covers the desktop pagination layout.')

  await page.goto('/shapes')

  await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Cube/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Vault Block/i })).toHaveCount(0)

  await page.getByRole('button', { name: 'Next' }).click()

  await expect(page.getByRole('link', { name: /Vault Block/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Cube/i })).toHaveCount(0)

  const search = page.getByRole('searchbox', { name: /Search catalogue/i })
  await search.fill('heart')

  await expect(page.getByRole('link', { name: /Luma Heart/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Kind Heart/i })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Next' })).toHaveCount(0)

  await page.getByRole('link', { name: /Luma Heart/i }).click()

  await expect(page).toHaveURL(/\/shapes\/luma-heart$/)
  await expect(page.getByRole('heading', { name: 'Luma Heart' })).toBeVisible()
  await expect(page.getByText('Future fit summary')).toBeVisible()
})

test('discover shows empty state for unmatched searches', async ({ page }) => {
  await page.goto('/shapes')

  await page.getByRole('searchbox', { name: /Search catalogue/i }).fill('zzz')

  await expect(page.getByText('Nothing matched that search.')).toBeVisible()
})
