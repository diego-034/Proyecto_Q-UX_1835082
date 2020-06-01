import { QUXPage } from './app.po';

describe('q-ux App', function() {
  let page: QUXPage;

  beforeEach(() => {
    page = new QUXPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
