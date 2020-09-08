import { newE2EPage } from '@stencil/core/testing';

describe('sims-shops', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-shops></sims-shops>');
    const element = await page.find('sims-shops');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
