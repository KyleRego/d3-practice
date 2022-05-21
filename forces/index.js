const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

const nodes = [
  {x: 10, y: 10, r: 10},
  {x: 50, y: 50, r: 10},
  {x: 90, y: 90, r: 10}
]

const simulation = d3.forceSimulation(nodes)
                      .alphaDecay(0)
                      .force('charge', d3.forceManyBody().strength(5))
                      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2).strength(0.5))
                      .force('collision', d3.forceCollide(10).strength(1))
                      .on('tick', ticked)
                      .on('end', () => console.log('simulation ended!'))
svg.on('click', event => addNode(event));

function addNode(event) {
  let position = d3.pointer(event);
  let newNode = {x: position[0], y: position[1], r: 10}
  nodes.push(newNode);
  simulation.nodes(nodes);
}

function ticked() {
  let circles = svg.selectAll('circle')
      .data(nodes)

      circles.enter().append('circle')
      .merge(circles)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r);
}