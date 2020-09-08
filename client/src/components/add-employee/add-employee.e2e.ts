import { newE2EPage } from '@stencil/core/testing';

describe('add-employee', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<add-employee></add-employee>');
    const element = await page.find('add-employee');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
