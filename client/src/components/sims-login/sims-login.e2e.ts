import { newE2EPage } from '@stencil/core/testing';

describe('sims-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-login></sims-login>');
    const element = await page.find('sims-login');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
