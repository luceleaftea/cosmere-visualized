import ForceGraph, {NodeObject} from "force-graph";

const linkData = require('../../node-data/generated-data/link-data.json')
const nodeData = require('../../node-data/generated-data/node-data.json')

export function initializeForceGraph() {
    // Random tree
    const gData = {
        nodes: nodeData,
        links: linkData
    };

    const elem = document.getElementById('graph')
    if (!elem) {
        console.log('graph not detected!')
        return
    }

    const Graph = new ForceGraph(elem)
        .linkDirectionalParticles(2)
        .graphData(gData)
        .nodeCanvasObject((node, ctx) => nodePaint(node, ctx))
}

const colorScheme = [
    '#533A71',
    '#60AFFF',
    '#7FC29B',
    '#CEA2AC',
    '#EFD9CE',
]

function nodePaint(node: NodeObject, ctx: CanvasRenderingContext2D) {
    let radius = 10
    let fillStyle: string

    switch ((node as any).type) {
        case 'book':
            fillStyle = colorScheme[0]
            radius = 30
            break;
        case 'chapter':
            fillStyle = colorScheme[1]
            radius = 20
            break;
        default:
            fillStyle = colorScheme[3]
    }

    ctx.fillStyle = fillStyle
    ctx.beginPath()
    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)
    ctx.fill()
}