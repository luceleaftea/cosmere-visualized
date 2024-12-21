import fs from 'fs'

import bookJson from '../src/coppermind-data/book.json' with { type: "json" }
import chapterJson from '../src/coppermind-data/chapter.json' with { type: "json" }
import characterJson from '../src/coppermind-data/character.json' with { type: "json" }

export function generateNodeData() {
    let nodeData = []

    nodeData = nodeData.concat(bookJson.map(convertBookToNode))
    nodeData = nodeData.concat(chapterJson.map(convertChapterToNode))
    nodeData = nodeData.concat(characterJson.map(convertCharacterToNode))

    return nodeData
}

// Data Converters

function convertBookToNode(book) {
    return {
        id: `book: ${book.name}`,
        name: book.name,
        type: 'book'
    }
}

function convertChapterToNode(chapter) {
    return {
        id: `book: ${chapter.name}`,
        name: chapter.name,
        type: 'chapter'
    }
}

function convertCharacterToNode(character) {
    return {
        id: `book: ${character.name}`,
        name: character.name,
        type: 'character'
    }
}

// File Management

export function writeNodeDataFile(nodeData) {
    const nodeJsonData = JSON.stringify(nodeData, null, 2);

    fs.writeFile('generated-data/node-data.json', nodeJsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('JSON file created successfully!');
    });
}