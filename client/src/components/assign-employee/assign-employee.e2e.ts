import { newE2EPage } from '@stencil/core/testing';

describe('assign-employee', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<assign-employee></assign-employee>');
    const element = await page.find('assign-employee');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
