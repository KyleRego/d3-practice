const particleInitialRadius = 7;
const numberOfParticlesToAddPerMouseMoveEvent = 5;
const radiusDecayFactor = 0.9;
const minInitialVelocity = -5;
const maxInitialVelocity = 5;
const minInitialAcceleration = -1;
const maxInitialAcceleration = 1;

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
  particle.xAcceleration = randomAcceleration();
  particle.yAcceleration = randomAcceleration();
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
  return Math.random() * 
  (maxInitialVelocity - minInitialVelocity) + minInitialVelocity;
}

function randomAcceleration() {
  return Math.random() * 
  (maxInitialAcceleration - minInitialAcceleration) + minInitialAcceleration;
}

function updateParticle(particle) {
  let updatedParticle = {};
  updatedParticle.id = particle.id;
  updatedParticle.xPosition = particle.xPosition + particle.xVelocity + 0.5 * particle.xAcceleration;
  updatedParticle.yPosition = particle.yPosition + particle.yVelocity + 0.5 * particle.yAcceleration;
  updatedParticle.xVelocity = particle.xVelocity + particle.xAcceleration;
  updatedParticle.yVelocity = particle.yVelocity + particle.yAcceleration;
  updatedParticle.xAcceleration = particle.xAcceleration;
  updatedParticle.yAcceleration = particle.yAcceleration;
  updatedParticle.color = particle.color;
  updatedParticle.radius = particle.radius * radiusDecayFactor;
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