import { newE2EPage } from '@stencil/core/testing';

describe('sims-general', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sims-general></sims-general>');
    const element = await page.find('sims-general');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
