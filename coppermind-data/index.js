import {getCharacters} from "./character-scraper.js";
import {writeDataToFile} from "./write-file.js";

console.log("Accessing the Coppermind, please hold...")

console.log("Downloading characters...")
let characterData = await getCharacters()
writeDataToFile(characterData, "character");
console.log("Finished downloading characters!")

console.log("Connection to the the Coppermind terminated")