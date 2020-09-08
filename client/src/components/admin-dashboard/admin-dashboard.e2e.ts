import { newE2EPage } from '@stencil/core/testing';

describe('admin-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-dashboard></admin-dashboard>');
    const element = await page.find('admin-dashboard');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
