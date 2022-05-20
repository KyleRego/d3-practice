const ringsContainerWidth = 600;
const ringsContainerHeight = 400;
const numberOfRingsToSpawnPerEvent = 1;
const initialRingRadius = 1;
const ringsVisualizationTimeInterval = 20;

const svg = d3.select('#rings-container');
svg.attr('width', ringsContainerWidth).attr('height', ringsContainerHeight);

svg.on('mousemove', event => spawnRingsAtCursorPosition(event));

let rings = [];

let ringKeyFunction = function(ring) { return ring.id; }

function spawnRingsAtCursorPosition(event) {
  let position = d3.pointer(event);
  for (let i = 0; i < numberOfRingsToSpawnPerEvent; i += 1) {
    rings.push(createRing(position[0], position[1]))
  }
  svg.selectAll('circle')
      .data(rings, ringKeyFunction)
      .enter()
      .append('circle')
      .attr('cx', d => d.x )
      .attr('cy', d => d.y )
      .attr('r', d => d.r )
      .attr('fill', 'white')
      .attr('stroke', d => colorStringForRing(d.opacity))
      .attr('stroke-width', d => d.thickness)
}

let ringId = 0;
function createRing(x, y) {
  let ring = {x, y};
  ring.r = initialRingRadius;
  ring.opacity = 1;
  ring.thickness = 5;
  ring.id = ringId;
  ring.isAlive = true;

  ringId += 1;
  return ring;
}

function updateRing(ring) {
  let updatedRing = {x: ring.x, y: ring.y};
  updatedRing.r = ring.r * 1.02;
  updatedRing.opacity = ring.opacity * 0.99;
  updatedRing.thickness = ring.thickness;
  updatedRing.id = ring.id;
  updatedRing.isAlive = updatedRing.opacity > 0.01 && updatedRing.r < 600;
  
  return updatedRing;
}

function colorStringForRing(opacity) {
  return `rgb(0, 0, 255,  ${opacity})`;
}

let circles;
const intervalId = setInterval(function() {
  rings = rings.map(ring => updateRing(ring));
  rings = rings.filter(ring => ring.isAlive);

  circles = svg.selectAll('circle').data(rings, ringKeyFunction);

  circles.transition().duration(ringsVisualizationTimeInterval)
          .attr('cx', d => d.x )
          .attr('cy', d => d.y )
          .attr('r', d => d.r )
          .attr('fill', 'white')
          .attr('stroke', d => colorStringForRing(d.opacity))
          .attr('stroke-width', d => d.thickness);

  circles.exit().remove();
}, ringsVisualizationTimeInterval);