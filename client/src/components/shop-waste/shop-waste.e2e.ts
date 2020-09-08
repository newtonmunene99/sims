import { newE2EPage } from '@stencil/core/testing';

describe('shop-waste', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<shop-waste></shop-waste>');
    const element = await page.find('shop-waste');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
