import { newE2EPage } from '@stencil/core/testing';

describe('sims-shop', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-shop></sims-shop>');
    const element = await page.find('sims-shop');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
