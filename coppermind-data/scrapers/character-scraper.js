import {createPuppeteerBrowser, createPuppeteerPage} from "../puppeteer-helpers.js";

export const getCharacters = async (limit = undefined) => {
    const browser = await createPuppeteerBrowser()

    const page = await createPuppeteerPage(browser, "https://coppermind.net/wiki/Category:Characters")

    let pageLinks = await page.evaluate(() => {
        let links = []

        const pagesDiv = document.querySelector("#mw-pages");
        const pageAnchors = pagesDiv.querySelectorAll("a")
        pageAnchors.forEach(link => links.push(link.getAttribute("href")));

        return links
    })

    let characters = []

    for (const link of pageLinks) {
        let absoluteLink = `https://coppermind.net${link}`
        let newCharacterPage = await createPuppeteerPage(browser, absoluteLink)

        let characterDetails = await newCharacterPage.evaluate(getCharacterDetailsFromPage)

        if (!!characterDetails) {
            characterDetails.coppermind_link = absoluteLink
            characters.push(characterDetails)
        }

        await newCharacterPage.close()

        if (!!limit && characters.length >= limit) {
            break
        }
    }

    await browser.close();

    return characters
}

const getCharacterDetailsFromPage = async () => {
    // Species
    let universeRow = Array.from(document.querySelectorAll("th"))
        .find(el => el.innerText === "Universe")
        ?.parentElement
    let universe = universeRow?.querySelector("a")?.innerText
    if (universe !== "Cosmere") {
        return null
    }

    // Name
    let title = document.querySelector("#firstHeading")
    let name = title.innerHTML

    // Species
    let speciesTableRow = Array.from(document.querySelectorAll("th"))
        .find(el => el.innerText === "Species")
        ?.parentElement
    let species = speciesTableRow?.querySelector("a")?.innerText

    // Relationships
    let relationships = []
    let relationshipTable = document.querySelector("tr > td > table > tbody")
    let relationshipTableRows = Array.from(relationshipTable?.querySelectorAll(".kv") ?? [])
    relationshipTableRows.forEach(relationshipTableRow => {
        let relationshipType = relationshipTableRow.querySelector('th').innerText
        let relationshipPeople = Array.from(relationshipTableRow.querySelector('td').querySelectorAll('a'))
            .map(el => el.getAttribute("title"))

        relationshipPeople.forEach(person => {
            relationships.push({
                target: person,
                relationship: relationshipType
            })
        })
    })

    return {
        name: name,
        species: species,
        relationships: relationships
    }
}