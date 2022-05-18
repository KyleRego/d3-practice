const svgWidth = 500;
const svgHeight = 500;

const initialTriangleWidth = 500;
const initialTriangleHeight = initialTriangleWidth * Math.pow(3, 0.5) / 2;

const initialTrianglePoints = [0, initialTriangleHeight,
                              initialTriangleWidth, initialTriangleHeight,
                              initialTriangleWidth / 2, 0];

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

function addTriangle(element, x1, y1, x2, y2, x3, y3) {
  let dataset = [{x1, y1, x2, y2, x3, y3}];
  let triangle = element.selectAll('polygon')
                .data(dataset)
                .enter()
                .append('polygon')
                .attr('points', d => `${d.x1},${d.y1} ${d.x2},${d.y2} ${d.x3},${d.y3}`)
                .attr('fill', randomRGBString());
  console.log(triangle);
  return triangle;
}

function addThreeTriangles(triangle) {
  const trianglePoints = triangle.attr('points').split(' ').map(function(pair) {
    return pair.split(',').map(parseFloat);
  }).flat();
  console.log(trianglePoints);
  const newTrianglesPointsList = threeTrianglesPointsList(...trianglePoints);
  for (let i = 0; i < newTrianglesPointsList.length; i += 1) {
    addTriangle(svg, ...newTrianglesPointsList[i])
  }
}

function threeTrianglesPointsList(x1, y1, x2, y2, x3, y3) {
  let newTrianglesPointsList = [];
  newTrianglesPointsList.push([x1, y1, x2 / 2, y2, x2 / 4, y1 / 2])
  newTrianglesPointsList.push([x2 / 2, y1, x2, y2, 3 * x2 / 4, y2 / 2])
  newTrianglesPointsList.push([x2 / 4, y2 / 2,  3 * x2 / 4, y2 / 2, x3, y3]);
  console.log(newTrianglesPointsList);
  return newTrianglesPointsList;
}

function randomRGBString() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

const initialTriangle = addTriangle(svg, ...initialTrianglePoints);
addThreeTriangles(initialTriangle);