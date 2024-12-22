import puppeteer from "puppeteer";

const userAgent = "https://github.com/luceleaftea/cosmere-visualized - Trying to scrape data minimally and in a way that won't overload servers, but if it's too much please drop me an issue to tell me to knock it off and I'll find a different way!"

export const createPuppeteerBrowser = async () => {
    return await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })
}

export const createPuppeteerPage = async (browser, link) => {
    const page = await browser.newPage();
    await page.setUserAgent(userAgent)

    await page.goto(link, {
        waitUntil: "domcontentloaded",
    });

    if (await page.$('text=Proceed') !== null) {
        await page.click('text=Proceed')
    }

    return page
}