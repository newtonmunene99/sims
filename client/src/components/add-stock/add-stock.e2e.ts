import { newE2EPage } from '@stencil/core/testing';

describe('add-stock', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<add-stock></add-stock>');
    const element = await page.find('add-stock');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
