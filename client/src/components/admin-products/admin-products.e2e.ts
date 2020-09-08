import { newE2EPage } from '@stencil/core/testing';

describe('admin-products', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-products></admin-products>');
    const element = await page.find('admin-products');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
