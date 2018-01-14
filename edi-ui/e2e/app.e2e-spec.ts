import { BaseUiPage } from './app.po';

describe('base-ui App', () => {
  let page: BaseUiPage;

  beforeEach(() => {
    page = new BaseUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
