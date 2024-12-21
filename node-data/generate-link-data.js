import fs from 'fs'

import bookJson from '../src/coppermind-data/book.json' with { type: "json" }
import chapterJson from '../src/coppermind-data/chapter.json' with { type: "json" }
import characterJson from '../src/coppermind-data/character.json' with { type: "json" }

export function generateLinkData(nodeData) {
    let linkData = []

    return linkData
}

// Data Converters

// File Management

export function writeLinkDataFile(linkData) {
    const linkJsonData = JSON.stringify(linkData, null, 2);

    fs.writeFile('generated-data/link-data.json', linkJsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('JSON file created successfully!');
    });
}