import { newE2EPage } from '@stencil/core/testing';

describe('sims-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-dashboard></sims-dashboard>');
    const element = await page.find('sims-dashboard');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
