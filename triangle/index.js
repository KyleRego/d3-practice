const width = 200;
const height = width * Math.pow(3, 0.5) / 2;

const initialTriangle = [
                        { x1:0,
                          y1: height,
                          x2: width,
                          y2: height,
                          x3: width / 2,
                          y3: 0,
                        }
                      ]
const svg = d3.select('body').append('svg').attr('height', height).attr('width', width);

d3.select('svg')
  .selectAll('polygon')
  .data(initialTriangle)
  .enter()
  .append('polygon')
  .attr('points', function(d) {
    return `${d.x1},${d.y1} ${d.x2},${d.y2} ${d.x3},${d.y3}`
  })
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  .attr('fill', 'blue');