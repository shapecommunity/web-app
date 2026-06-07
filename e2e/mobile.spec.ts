import { expect, test } from '@playwright/test'

test('mobile discover grows results as the sentinel enters view', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This test verifies the mobile infinite-scroll layout.')

  await page.goto('/shapes')

  await expect(page.getByRole('link', { name: /Cube/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Vault Block/i })).toHaveCount(0)

  await page.locator('.discover-sentinel').scrollIntoViewIfNeeded()

  await expect(page.getByRole('link', { name: /Vault Block/i })).toBeVisible()
})
