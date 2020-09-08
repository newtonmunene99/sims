import { newE2EPage } from '@stencil/core/testing';

describe('admin-general', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-general></admin-general>');
    const element = await page.find('admin-general');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
