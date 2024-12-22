import fs from 'fs'

import bookJson from '../coppermind-data/test-data/book.json' with { type: "json" }
import chapterJson from '../coppermind-data/test-data/chapter.json' with { type: "json" }
import characterJson from '../coppermind-data/generated-data/character.json' with { type: "json" }

export function generateLinkData(nodeData) {
    let linkData = []

    linkData = linkData.concat(generateCharacterLinks(nodeData))

    return linkData
}

// Data Converters

function generateCharacterLinks(nodeData) {
    let linkData = []

    nodeData.filter(node => node.type === 'character').forEach(characterNode => {
        let character = characterJson.find(x => x.name === characterNode.name)

        if (!character) {
            return
        }

        character.relationships?.forEach(relationship => {
            let relationshipCharacterName = relationship.target

            if (!relationshipCharacterName) {
                return
            }

            let relationshipNode = findCharacterNode(relationshipCharacterName, nodeData)

            if (relationshipNode) {
                linkData.push({
                    source: characterNode.id,
                    target: relationshipNode.id
                })
            }
        })
    })

    return linkData
}

function findCharacterNode(characterName, nodeData) {
    return nodeData.filter(node => node.type === 'character').find(x => x.name === characterName)
}

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