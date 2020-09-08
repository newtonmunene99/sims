import { newE2EPage } from '@stencil/core/testing';

describe('sims-cart', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-cart></sims-cart>');
    const element = await page.find('sims-cart');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
