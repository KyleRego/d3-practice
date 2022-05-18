const svgWidth = '100vh';
const svgHeight = '100vh';
const initialNumberOfParticles = 10;
const particleRadius = 5;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

let particles = [];
for (let i = 0; i < initialNumberOfParticles; i += 1) {
  particles.push(createParticle());
}

svg.selectAll('circle')
    .data(particles)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', particleRadius);

function createParticle() {
  let particle = {};
  particle.x = randomNumber(0, 300);
  particle.y = randomNumber(0, 300);
  particle.vx = randomNumber(-10, 10);
  particle.vy = randomNumber(-10, 10);
  return particle;
}

function moveParticles(particles) {
  let movedParticles = particles.map(particle => {
    let movedParticle = {};
    movedParticle.x = particle.x + particle.vx;
    movedParticle.y = particle.y + particle.vy;
    movedParticle.vx = particle.vx;
    movedParticle.vy = particle.vy;
    return movedParticle;
  })
  return movedParticles;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const intervalId = setInterval(() => {
  particles = moveParticles(particles);
  svg.selectAll('circle')
      .data(particles)
      .transition()
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', particleRadius);
}, 100);