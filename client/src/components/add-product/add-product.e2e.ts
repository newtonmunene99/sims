import { newE2EPage } from '@stencil/core/testing';

describe('add-product', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<add-product></add-product>');
    const element = await page.find('add-product');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
