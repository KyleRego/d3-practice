const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight)
              .style('background-color', '#222');

svg.on('click', (e) => spawnParticle(e));

const particles = [];

function spawnParticle(e) {
  let position = d3.pointer(e);
  particles.push(new Particle(position[0], position[1]));
  svg.selectAll('circle')
      .data(particles, d => d.id)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 5)
      .attr('stroke', 'pink');
  console.log('made it here');
}

id = 0;
function Particle(x, y) {
  this.id = id;
  id += 1;
  this.x = x;
  this.y = y;
  this.vx = 5;
  this.vy = 5;
}

Particle.prototype.move = function() {
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
}

d3.interval(() => {
  particles.forEach(particle => particle.move());
  svg.selectAll('circle')
      .data(particles, d => d.id)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
})

