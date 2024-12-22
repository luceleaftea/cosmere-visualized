import {createPuppeteerBrowser, createPuppeteerPage} from "../puppeteer-helpers.js";

const summaryLinks = [
    {
        name: "The Way of Kings",
        link: "https://coppermind.net/wiki/Summary:The_Way_of_Kings"
    },
    {
        name: "Words of Radiance",
        link: "https://coppermind.net/wiki/Summary:Words_of_Radiance"
    },
    {
        name: "Oathbringer",
        link: "https://coppermind.net/wiki/Summary:Oathbringer"
    },
    {
        name: "Rhythm of War",
        link: "https://coppermind.net/wiki/Summary:Rhythm_of_War"
    },
    {
        name: "Wind and Truth",
        link: "https://coppermind.net/wiki/Summary:Wind_and_Truth"
    },
    {
        name: "Mistborn: The Final Empire",
        link: "https://coppermind.net/wiki/Summary:Mistborn:_The_Final_Empire"
    },
    {
        name: "The Well of Ascension",
        link: "https://coppermind.net/wiki/Summary:The_Well_of_Ascension"
    },
    {
        name: "The Hero of Ages",
        link: "https://coppermind.net/wiki/Summary:The_Hero_of_Ages"
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