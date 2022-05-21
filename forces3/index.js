const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

d3.csv('./cereal.csv').then((data) => {

  let dataset = data;
  
  let forceSimulation = d3.forceSimulation(dataset)
                          .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
                          .force('charge', d3.forceManyBody().strength(-5))
                          .on('tick', ticking);
  function ticking() {
    let circles = svg.selectAll('circle')
                      .data(dataset);

    circles = circles.enter()
                      .append('circle')
                      .append('title')
                      .text(d => d.name + '\ncalories: ' + d.calories)
                      .merge(circles)
                      .filter(function(d) {
                        let number = parseInt(d.calories, 10);
                        return typeof number === 'number' && !Number.isNaN(number)
                      })
                      //.transition()
                      .attr('cx', d => d.x)
                      .attr('cy', d => d.y)
                      .attr('r', d => parseInt(d.calories, 10) / 10);
  }
});