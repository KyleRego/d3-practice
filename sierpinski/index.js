const svgWidth = 500;
const svgHeight = 500;

const initialTriangleWidth = 500;
const initialTriangleHeight = initialTriangleWidth * Math.pow(3, 0.5) / 2;

const initialTrianglePoints = [0, initialTriangleHeight,
                              initialTriangleWidth, initialTriangleHeight,
                              initialTriangleWidth / 2, 0];
const iterations = 10;

const triangles = [];
triangles.push(initialTrianglePoints);
triangles.push(...threeTrianglesPointsList(...initialTrianglePoints));
triangles.slice(1).forEach(triangle => {
  triangles.push(...threeTrianglesPointsList(...triangle));
})

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

function addTriangles(triangles) {
  console.log(triangles);
  let triangle = svg.selectAll('polygon')
                .data(triangles)
                .enter()
                .append('polygon')
                .attr('points', d => `${d[0]},${d[1]} ${d[2]},${d[3]} ${d[4]},${d[5]}`)
                .attr('fill', d => randomRGBString());
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

const initialTriangle = addTriangles(triangles);