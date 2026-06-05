import { expect, test } from '@playwright/test'

test.describe('visual snapshots', () => {
  test.beforeEach(async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium', 'Visual baselines are recorded for Chromium only.')
    test.skip(isMobile, 'Visual baselines are recorded for the desktop layout only.')

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `,
    })
  })

  test('home main content matches the visual baseline', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('.site-main')).toHaveScreenshot('home-main.png')
  })

  test('discover page matches the visual baseline', async ({ page }) => {
    await page.goto('/shapes')

    await expect(page.locator('.site-main')).toHaveScreenshot('discover-main.png')
  })

  test('detail page matches the visual baseline', async ({ page }) => {
    await page.goto('/shapes/cube')

    await expect(page.locator('.site-main')).toHaveScreenshot('detail-main.png')
  })
})
