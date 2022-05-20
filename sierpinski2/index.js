const svg = d3.select('#triangle-container');
const triangleContainerWidth = 500;
const triangleContainerHeight = triangleContainerWidth * Math.pow(3, 0.5) / 2;
svg.attr('width', triangleContainerWidth).attr('height', triangleContainerHeight);

const initialSierpinskiTriangleWidth = triangleContainerWidth;
const initialSierpinskiTriangleHeight = initialSierpinskiTriangleWidth * Math.pow(3, 0.5) / 2;
const initialSierpinskiTriangleLeftCornerX = 0;
const initialSierpinskiTriangleLeftCornerY = triangleContainerHeight;

let triangles = [];

// add an equilateral triangle with bottom left corner at x, y with width and height
function addTriangle(x, y, width, height) {
  let x1 = x;
  let y1 = y;
  let x2 = x + width;
  let y2 = y;
  let x3 = x + width / 2;
  let y3 = y - height;
  triangles.push([x1, y1, x2, y2, x3, y3]);
  svg.selectAll('polygon')
      .data(triangles)
      .enter()
      .append('polygon')
      .attr('points', d => `${d[0]},${d[1]} ${d[2]},${d[3]} ${d[4]},${d[5]}`)
      .attr('fill', randomRGBStringForSierpinskiTriangle())
      .on('click', (event, d) => {
        addTriangle(d[0], d[1], width / 2, height / 2);
        addTriangle(d[0] + width / 4, d[1] - height / 2, width / 2, height / 2);
        addTriangle(d[0] + width / 2, d[1], width / 2, height / 2);
      });
}

function randomRGBStringForSierpinskiTriangle() {
  let red = Math.round(Math.random() * 255)
  let green = Math.round(Math.random() * 255)
  let blue = Math.round(Math.random() * 255)
  return `rgb(${red}, ${green}, ${blue})`
}

addTriangle(initialSierpinskiTriangleLeftCornerX, initialSierpinskiTriangleLeftCornerY,
             initialSierpinskiTriangleWidth, initialSierpinskiTriangleHeight);