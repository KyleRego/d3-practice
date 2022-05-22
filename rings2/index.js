const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight)
              .style('background-color', '#222')
              .on('mousemove', event => particle(event));

let i = 0;
function particle(event) {
  let mousePosition = d3.pointer(event);

  svg.append('circle')
      .attr('cx', mousePosition[0])
      .attr('cy', mousePosition[1])
      .attr('r', 1e-6)
      .attr('fill', 'none')
      .attr('stroke-width', 2.5)
      .style('stroke', d3.hsl((i = (i + 1) % 360), 1, .5))
      .style('stroke-opacity', 1)
      .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr('r', 100)
      .style('stroke-opacity', 1e-6)
      .remove();
}