import {getCharacters} from "./scrapers/character-scraper.js";
import {writeDataToFile} from "./write-file.js";
import {getBooks} from "./scrapers/book-scraper.js";
import {getChapters} from "./scrapers/chapter-scraper.js";

console.log("Accessing the Coppermind, please hold...")

// console.log("Downloading characters...")
// let characterData = await getCharacters()
// writeDataToFile(characterData, "character");
// console.log("Finished downloading characters!")

// console.log("Downloading books...")
// let bookData = await getBooks()
// writeDataToFile(bookData, "book");
// console.log("Finished downloading books!")

console.log("Downloading chapters...")
let chapterData = await getChapters(5)
writeDataToFile(chapterData, "chapter");
console.log("Finished downloading chapters!")

console.log("Connection to the the Coppermind terminated")