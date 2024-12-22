import {createPuppeteerBrowser, createPuppeteerPage} from "../puppeteer-helpers.js";

export const getBooks = async (limit = undefined) => {
    const browser = await createPuppeteerBrowser()
    const page = await createPuppeteerPage(browser, "https://coppermind.net/wiki/Category:Books")

    let pageLinks = await page.evaluate(() => {
        const seriesRows = Array.from(document.querySelector("#Books")?.querySelectorAll(".kv") ?? [])
            .filter(el => {
                let headerText = el.querySelector("th")?.innerText

                return headerText?.includes("The Stormlight Archive") ||
                    headerText?.includes("Mistborn") ||
                    headerText?.includes("Cosmere")
            })

        return seriesRows.map(seriesRow => Array.from(seriesRow.querySelector("td")?.querySelectorAll("a")) ?? [])
            .reduce((a, b) => a.concat(b), [])
            .filter(anchor => {
                return !(
                    anchor.getAttribute("title").includes("Era ") ||
                    anchor.getAttribute("title").includes("Arcanum Unbounded")
                )
            })
            .map(anchor => anchor.getAttribute("href"))
    })

    console.log(pageLinks)

    let books = []

    for (const link of pageLinks) {
        let absoluteLink = `https://coppermind.net${link}`
        let newBookPage = await createPuppeteerPage(browser, absoluteLink)

        let bookDetails = await newBookPage.evaluate(getBookDetailsFromPage)

        if (!!bookDetails) {
            bookDetails.coppermind_link = absoluteLink
            books.push(bookDetails)
        }

        await newBookPage.close()

        if (!!limit && bookDetails.length >= limit) {
            break
        }
    }

    await browser.close();

    return books
}

const getBookDetailsFromPage = async () => {
    // Name
    let title = document.querySelector("#firstHeading")
    let name = title.innerHTML
        .replace("<i>", "")
        .replace("</i>", "")
        .replace(" (novella)", "")
        .replace(" (book)", "")

    // Series
    let series = document.querySelector("tr > td > table > tbody > tr > th > a")?.innerHTML
    // TODO: Should this squash them all down into one series, given upcoming Eras?
    if (series?.includes("Mistborn")) {
        series = "Mistborn"
    }

    return {
        name: name,
        series: series
    }
}