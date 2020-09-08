import { newE2EPage } from '@stencil/core/testing';

describe('shop-employees', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<shop-employees></shop-employees>');
    const element = await page.find('shop-employees');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
