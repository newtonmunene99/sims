import { newE2EPage } from '@stencil/core/testing';

describe('admin-shops', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-shops></admin-shops>');
    const element = await page.find('admin-shops');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
