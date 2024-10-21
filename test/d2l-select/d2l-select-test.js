import puppeteer from 'puppeteer';
import { getRightPanel } from '../../src/d2l-select.js';

describe('Select elements from a live page', function () {
  let browser;
  let page;

  this.timeout(10000);

  before(async function () {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-data-dir=~/.config/google-chrome/'],
    });
    page = await browser.newPage();

    page.on('console', (msg) => {
      console.log('PAGE LOG:', msg.text());
    });

    await page.goto('https://d2l.langara.bc.ca/d2l/le/activities/iterator/4750725?cft=assignment-submissions&ou=312773&currentActorActivityUsage=VG1wWmQwNXNPSGxOUkVGM1dIcEpNVTE2VVROTlFTNHpNVEkzTnpNLnVzZXJfNTcxMTU4');
  });

  after(async function () {
    await browser.close();
  });

  it('should select specific right pane from d2l page', async function () {
    await page.waitForSelector('body');

    const rightPanel = await page.evaluate(() => {
      const page = document.querySelector(".d2l-token-receiver");
      const main = page.shadowRoot.children[0].shadowRoot.children[0];
      const right = main.children[2].children[0].shadowRoot.children[0];
      const rightPanel = right.querySelector(".d2l-consistent-evaluation-right-panel-evaluation").children[0].shadowRoot.children[0].children[0];
      return rightPanel ? rightPanel.tagName : null;
    });

    expect(rightPanel).to.equal('D2L-CONSISTENT-EVALUATION-RIGHT-PANEL-BLOCK');

  });
});
