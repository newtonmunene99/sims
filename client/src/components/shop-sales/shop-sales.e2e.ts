import { newE2EPage } from '@stencil/core/testing';

describe('shop-sales', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<shop-sales></shop-sales>');
    const element = await page.find('shop-sales');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
