// TODO: Figure out how to use npm version
// import ForceGraph3D from "3d-force-graph";
import {NodeObject} from "force-graph";

const linkData = require('../../node-data/generated-data/link-data.json')
const nodeData = require('../../node-data/generated-data/node-data.json')

export function initializeForceGraph3D() {
    const gData = {
        nodes: nodeData,
        links: linkData
    };

    const elem = document.getElementById('graph')
    if (!elem) {
        console.log('graph not detected!')
        return
    }

    // @ts-ignore
    const Graph = new ForceGraph3D(elem, {})
        // .linkDirectionalParticles(2)
        .graphData(gData)
        .nodeColor((node: NodeObject) => nodeColor(node))
}

const colorScheme = [
    '#533A71',
    '#60AFFF',
    '#7FC29B',
    '#CEA2AC',
    '#EFD9CE',
]

function nodeColor(node: NodeObject) {
    let color: string

    switch ((node as any).type) {
        case 'book':
            color = colorScheme[0]
            break;
        case 'chapter':
            color = colorScheme[1]
            break;
        default:
            color = colorScheme[3]
    }

    return color
}

function nodeSize(node: NodeObject) {
    let radius = 10

    switch ((node as any).type) {
        case 'book':
            radius = 30
            break;
        case 'chapter':
            radius = 20
            break;
    }

    return radius
}