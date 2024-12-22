import {createPuppeteerBrowser, createPuppeteerPage} from "../puppeteer-helpers.js";

const summaryLinks = [
    {
        name: "The Way of Kings",
        link: "https://coppermind.net/wiki/Summary:The_Way_of_Kings"
    }
]

export const getChapters = async (limit = undefined) => {
    const browser = await createPuppeteerBrowser()

    let chapters = []

    for (const {name, link} of summaryLinks) {
        let newBookPage = await createPuppeteerPage(browser, link)

        let chapterDetailsForBook = await newBookPage.evaluate(getChapterDetailsFromPage)
        chapterDetailsForBook.forEach(chapter => chapter.book = name)

        chapters = chapters.concat(chapterDetailsForBook)

        await newBookPage.close()
    }

    await browser.close();

    return chapters
}

const getChapterDetailsFromPage = async () => {
    let characterSections = Array.from(document.querySelectorAll(".pillars"))
    return characterSections.map(el => {
        // Get chapter name
        let elementToTest = el.previousElementSibling

        while (!!elementToTest && !(elementToTest.tagName === "H2" || elementToTest.tagName === "H3")) {
            elementToTest = elementToTest.previousElementSibling
        }

        let name = elementToTest?.innerText.replace("[edit]", "")

        // Get characters
        let characterListElements = Array.from(el.querySelectorAll("li"))
        let characters = characterListElements.map(el => {
            let name = el.querySelector("a").innerText
            let pointOfView = el.innerText.includes("point of view")
            let mentionedOnly = el.innerText.includes("mentioned only")

            return {
                name: name,
                pointOfView: pointOfView,
                mentionedOnly: mentionedOnly
            }
        })

        return {
            name: name,
            characters: characters
        }
    })
}