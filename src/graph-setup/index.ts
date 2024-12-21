import ForceGraph from "force-graph";

import linkData from '../../node-data/generated-data/link-data.json'
import nodeData from '../../node-data/generated-data/node-data.json'

export function initializeForceGraph() {
    console.log()

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
        .graphData(gData);

}