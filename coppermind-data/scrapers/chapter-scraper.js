import {createPuppeteerBrowser, createPuppeteerPage} from "../puppeteer-helpers.js";
import {summaryLinks} from "../chapter-links.js";

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

    // Add in hardcoded stories that don't have chapters to scan
    chapters = chapters.concat(getHardcodedChapters())

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

        if (elementToTest.querySelector("span")) {
            elementToTest = elementToTest.querySelector("span")
        }

        let name = elementToTest?.innerText.replace("[edit]", "")

        // Get characters
        let characterListElements = Array.from(el.querySelectorAll("li"))
        let characters = characterListElements.map(el => {
            let name = el.querySelector("a")?.innerText
            let pointOfView = el.innerText.includes("point of view")
            let mentionedOnly = el.innerText.includes("mentioned only")

            return {
                name: name ?? "INVALID",
                pointOfView: pointOfView,
                mentionedOnly: mentionedOnly
            }
        })
            .filter(character => character.name !== "INVALID")

        return {
            name: name,
            characters: characters
        }
    })
}

const getHardcodedChapters = () => {
    return [
        {
            name: "Standalone Chapter",
            characters: [
                {
                    name: "Jak",
                    pointOfView: true,
                    mentionedOnly: false
                },
                {
                    name: "Handerwym",
                    pointOfView: false,
                    mentionedOnly: false
                },
                {
                    name: "Elizandra Dramali",
                    pointOfView: false,
                    mentionedOnly: false
                }
            ],
            book: "Allomancer Jak and the Pits of Eltania"
        },
        {
            name: "Standalone Chapter",
            characters: [
                {
                    name: "Kelsier",
                    pointOfView: true,
                    mentionedOnly: false
                },
                {
                    name: "Gemmel",
                    pointOfView: false,
                    mentionedOnly: false
                },
                {
                    name: "Antillius Shezler",
                    pointOfView: false,
                    mentionedOnly: false
                }
            ],
            book: "The Eleventh Metal"
        }
    ]
}