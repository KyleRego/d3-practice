const particleInitialColor = 'white';
const particleInitialRadius = 5;
const initialNumberOfParticles = 10;
const numberOfParticlesToAddPerMouseMoveEvent = 5;
const minInitialVelocity = -10;
const maxInitialVelocity = 10;

let id = 0
let particles = [];

function generateParticle(x, y) {
  let particle = {};
  particle.id = id;
  id += 1;
  particle.xPosition = x;
  particle.yPosition = y;
  particle.xVelocity = randomVelocity();
  particle.yVelocity = randomVelocity();
  particle.color = randomColorRGBString();
  particle.radius = particleInitialRadius;
  particle.isAlive = true;
  return particle;
}

function randomColorRGBString() {
  let red = Math.floor(Math.random() * 256 + 1);
  let blue = Math.floor(Math.random() * 256 + 1);
  let green = Math.floor(Math.random() * 256 + 1);
  return `rgb(${red}, ${blue}, ${green})`;
}

function randomVelocity() {
  return Math.random() * (maxInitialVelocity - minInitialVelocity) + minInitialVelocity;
}

function updateParticle(particle) {
  let updatedParticle = {};
  updatedParticle.id = particle.id;
  updatedParticle.xPosition = particle.xPosition + particle.xVelocity;
  updatedParticle.yPosition = particle.yPosition + particle.yVelocity;
  updatedParticle.xVelocity = particle.xVelocity;
  updatedParticle.yVelocity = particle.yVelocity;
  updatedParticle.color = particle.color;
  updatedParticle.radius = particle.radius * 0.95;
  if (updatedParticle.radius > 0.1) {
    updatedParticle.isAlive = true;
  } else {
    updatedParticle.isAlive = false;
  }
  return updatedParticle;
}

const svg = d3.select('body')
              .append('svg')
              .attr('width', '100%')
              .attr('height', '100%')
              .on('mousemove', function(event) { addParticles(event) });

function addParticles(event) {
  let point = d3.pointer(event);
  for (let i = 0; i < numberOfParticlesToAddPerMouseMoveEvent; i += 1) {
    particles.push(generateParticle(point[0], point[1]))
  }
}

function renderParticles() {
  let child;
  while (child = document.querySelector('svg').lastChild) {
    child.remove();
  }
  svg.selectAll('circle')
      .data(particles)
      .enter()
      .append('circle')
      .attr('fill', d => d.color)
      .attr('cx', d => d.xPosition)
      .attr('cy', d => d.yPosition)
      .attr('r', d => d.radius);
}

intervalId = setInterval(function() {
  particles = particles.filter(particle => particle.isAlive);
  particles = particles.map(particle => updateParticle(particle));
  renderParticles();
}, 50);