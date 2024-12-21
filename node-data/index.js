import {generateNodeData, writeNodeDataFile} from "./generate-node-data.js";
import {generateLinkData, writeLinkDataFile} from "./generate-link-data.js";

console.log("Generating node data...")

let nodeData = generateNodeData()
let linkData = generateLinkData(nodeData)

writeNodeDataFile(nodeData)
writeLinkDataFile(linkData)

console.log("Successfully generated node data!")
