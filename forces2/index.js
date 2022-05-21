const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

const nodes = [];

for (let i = 1; i <= 10; i += 1) {
  nodes.push({r: i, text: i,});
}

const simulation = d3.forceSimulation(nodes)
                      .force('charge', d3.forceManyBody())
                      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
                      .force('collision', d3.forceCollide())
                      .on('tick', ticked)

function ticked() {
  let circles = svg.selectAll('circle').data(nodes);

  circles = circles.enter().append('circle').merge(circles)
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('r', d => d.r)
  console.log(circles);
}

