import { newE2EPage } from '@stencil/core/testing';

describe('shops-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<shops-page></shops-page>');
    const element = await page.find('shops-page');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
