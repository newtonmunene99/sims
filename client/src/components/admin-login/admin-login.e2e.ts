import { newE2EPage } from '@stencil/core/testing';

describe('admin-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-login></admin-login>');
    const element = await page.find('admin-login');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
