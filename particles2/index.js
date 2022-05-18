const svgWidth = '100vh';
const svgHeight = '100vh';
const initialNumberOfParticles = 10;
const initialParticleRadius = 5;
const radiusDecayFactor = 0.9;
const numberOfParticlesToAddPerEvent = 10;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);
let particles = [];

svg.on('click', event => createParticles(event));

function createParticles(event) {
  console.log('it was clicked');
  let point = d3.pointer(event);
  for (let i = 0; i < numberOfParticlesToAddPerEvent; i += 1) {
    particles.push(createParticle(point[0], point[1]));
  }
  svg.selectAll('circle')
    .data(particles)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r)
    .attr('fill', d => d.color);
}

function createParticle(x, y) {
  let particle = {};
  particle.x = x;
  particle.y = y;
  particle.vx = randomNumber(-10, 10);
  particle.vy = randomNumber(-10, 10);
  particle.r = initialParticleRadius;
  particle.color = randomRGBString();
  return particle;
}

function moveParticles(particles) {
  let movedParticles = particles.map(particle => {
    let movedParticle = {};
    movedParticle.x = particle.x + particle.vx;
    movedParticle.y = particle.y + particle.vy;
    movedParticle.vx = particle.vx;
    movedParticle.vy = particle.vy;
    movedParticle.r = particle.r * radiusDecayFactor;
    movedParticle.color = particle.color;
    return movedParticle;
  })
  return movedParticles;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRGBString() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`
}

const intervalId = setInterval(() => {
  particles = moveParticles(particles);
  svg.selectAll('circle')
      .data(particles)
      .transition()
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', d => d.color);
}, 100);