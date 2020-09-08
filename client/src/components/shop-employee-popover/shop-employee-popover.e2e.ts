import { newE2EPage } from '@stencil/core/testing';

describe('shop-employee-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<shop-employee-popover></shop-employee-popover>');
    const element = await page.find('shop-employee-popover');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
