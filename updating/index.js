const svgWidth = 500;
const svgHeight = 500;


let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight)

svg.on('click', updateCircles);

function updateCircles() {
  let newData = shiftData(data);
  svg.selectAll('circle')
      .data(newData)
      .transition()
      .duration(1000)
      .attr('cx', d => 20 * d)
      .attr('cy', d => 20 * d)
      .attr('r', d => d);
}

function shiftData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i += 1) {
    newData.push(data[i] *= 1.1);
  }
  return newData;
}

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => 20 * d)
    .attr('cy', d => 20 * d)
    .attr('r', d => d);
