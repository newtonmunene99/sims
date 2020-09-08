import { newE2EPage } from '@stencil/core/testing';

describe('add-shop', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<add-shop></add-shop>');
    const element = await page.find('add-shop');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
