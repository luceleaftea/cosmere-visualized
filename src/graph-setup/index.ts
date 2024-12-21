import ForceGraph from "force-graph";

export function initializeForceGraph() {
    console.log()

    // Random tree
    const N = 300;
    const gData = {
        nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                source: id,
                target: Math.round(Math.random() * (id-1))
            }))
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