const particleInitialColor = 'white';
const particleInitialRadius = 5;
const initialNumberOfParticles = 10;

let id = 0
let particles = generateParticles(initialNumberOfParticles);

function generateParticles(n) {
  let particles = [];
  for (let i = 0; i < n; i += 1) {
    particles.push(generateParticle());
  }
  return particles;
}

function generateParticle() {
  let particle = {};
  particle.id = id;
  id += 1;
  particle.xPosition = Math.random() * 100;
  particle.yPosition = Math.random() * 100;
  particle.xVelocity = Math.random() * 10;
  particle.yVelocity = Math.random() * 10;
  particle.color = particleInitialColor;
  particle.radius = particleInitialRadius;
  particle.isAlive = true;
  return particle;
}

function updateParticle(particle) {
  let updatedParticle = {};
  updatedParticle.id = particle.id;
  updatedParticle.xPosition = particle.xPosition + particle.xVelocity;
  updatedParticle.yPosition = particle.yPosition + particle.yVelocity;
  updatedParticle.xVelocity = particle.xVelocity;
  updatedParticle.yVelocity = particle.yVelocity;
  updatedParticle.color = particleInitialColor;
  updatedParticle.radius = particle.radius * 0.99;
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
              .on('click', addParticles);

function addParticles() {
  for (let i = 0; i < 10; i += 1) {
    particles.push(generateParticle())
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