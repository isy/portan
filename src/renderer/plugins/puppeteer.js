import puppeteer from 'puppeteer';

function getChromiumExecPath() {
  return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');
}

export async function getPageInfo(url) {
  let favicon;
  let title;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: getChromiumExecPath()
  });
  const page = await browser.newPage();
  await page.goto(url);

  favicon = await page
    .$eval('link[rel="icon"]', el => el.href)
    .catch(e => (favicon = ''));
  if (!favicon) {
    favicon = await page
      .$eval('link[rel="shortcut icon"]', el => el.href)
      .catch(e => (favicon = ''));
  }
  title = await page
    .$eval('title', el => el.textContent)
    .catch(e => (title = ''));
  browser.close();
  const createdAt = new Date();
  return {
    title,
    favicon,
    url,
    createdAt
  };
}
