const svgWidth = '100vw';
const svgHeight = '100vh';
const initialParticleRadius = 10;
const minimumParticleRadius = 1;
const timeInterval = 10;
const radiusDecayFactor = 0.95;
const particlesPerMouseEvent = 10;
const minInitialVelocity = -5;
const maxInitialVelocity = 5;

let particles = [];
let time = 0;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

svg.selectAll('circle')
    .data(particles)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r)
    .attr('fill', d => d.color);

svg.on('click', event => createParticles(event, particlesPerMouseEvent));

function createParticles(event, n) {
  let point = d3.pointer(event);
  for (let i = 0; i < n; i += 1) {
    particles.push(createParticle(point[0], point[1]))
  }
  svg.selectAll('circle')
      .data(particles)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', d => d.color)
}

function createParticle(x, y) {
  let particle = {};
  particle.x = x;
  particle.y = y;
  particle.vx = randomNumber(minInitialVelocity, maxInitialVelocity);
  particle.vy = randomNumber(minInitialVelocity, maxInitialVelocity);
  particle.ax = xForceFunction(particle.vy);
  particle.ay = yForceFunction(particle.vx);
  particle.r = initialParticleRadius;
  particle.isAlive = true;
  particle.color = randomRGBString();
  return particle;
}

function xForceFunction(yVelocity) {
  return -0.05 * yVelocity;
}

function yForceFunction(xVelocity) {
  return 0.05 * xVelocity;
}

function moveParticles(particles) {
  return particles.map(moveParticle);
}

function moveParticle(particle) {
  let movedParticle = {};
  movedParticle.x = particle.x + particle.vx + Math.pow(particle.ax, 2);
  movedParticle.y = particle.y + particle.vy + Math.pow(particle.ay, 2);
  movedParticle.vx = particle.vx + particle.ax;
  movedParticle.vy = particle.vy + particle.ay;
  movedParticle.ax = xForceFunction(movedParticle.vy);
  movedParticle.ay = yForceFunction(movedParticle.vx);
  movedParticle.r = particle.r * radiusDecayFactor;
  movedParticle.isAlive = (movedParticle.r > minimumParticleRadius);
  movedParticle.color = particle.color;
  return movedParticle;
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
  particles = particles.filter(particle => particle.isAlive);
  particles = moveParticles(particles)
  svg.selectAll('circle')
      .data(particles)
      .transition()
      .duration(timeInterval)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', d => d.color)

  svg.selectAll('circle').data(particles).exit().remove();

  time += timeInterval;
}, timeInterval);