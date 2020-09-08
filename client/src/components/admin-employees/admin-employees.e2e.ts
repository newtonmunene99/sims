import { newE2EPage } from '@stencil/core/testing';

describe('admin-employees', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<admin-employees></admin-employees>');
    const element = await page.find('admin-employees');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
