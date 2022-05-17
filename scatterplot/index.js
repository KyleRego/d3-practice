const scatterplotWidth = 800;
const scatterplotHeight = 400;
const padding = 100;
const xTextOffset = 10;
const circleRadius = 3;
const circleColor = 'blue';
const numberOfPoints = 10;

const dataset = generateRandomDataPoints(numberOfPoints);

const xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d[0])])
                .range([padding, scatterplotWidth - padding]);

const xAxis = d3.axisBottom()
                .scale(xScale);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d[1])])
                .range([scatterplotHeight - padding, padding]);

const yAxis = d3.axisLeft()
                .scale(yScale);

const svg = d3.select('body')
              .append('svg')
              .attr('width', scatterplotWidth)
              .attr('height', scatterplotHeight)

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', circleRadius)
    .attr('fill', circleColor);

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(d => `${d[0].toPrecision(4)}, ${d[1].toPrecision(4)}`)
    .attr('x', d => xScale(d[0] + xTextOffset))
    .attr('y', d => yScale(d[1]));

svg.append('g')
    .attr('transform', 'translate(0,' + (scatterplotHeight - padding) + ')')
    .call(xAxis);

svg.append('g')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis);

function generateRandomDataPoints(size) {
  const minX = 0;
  const minY = 0;
  const maxX = 600;
  const maxY = 300;
  let points = [];
  for (let i = 0; i < size; i += 1) {
    points.push([generateRandomData(minX, maxX), generateRandomData(minY, maxY)]);
  }
  return points;
}

function generateRandomData(min, max) {
  return Math.random() * (max - min) + min;
}