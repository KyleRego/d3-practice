const svgWidth = 500;
const svgHeight = 500;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

d3.csv('factbook.csv')
  .then(data => {
    let dataset = data;
    
    const forceSimulation = d3.forceSimulation(dataset)
                              .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
                              .force('charge', d3.forceManyBody().strength(-1))
                              .on('tick', ticked);

    const scaleR = d3.scaleSqrt()
                      .domain([0, d3.max(dataset, d => d['Area(sq km)'])])
                      .range([1, 10]);

    function ticked() {
      let circles = svg.selectAll('circle')
                        .data(dataset);
      
      circles = circles.enter()
                        .append('circle')
                        .merge(circles)
                        .attr('r', d => scaleR(d['Area(sq km)']))
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y)
                        .on('mousemove', (event, d) => {
                          let position = d3.pointer(event);
                          d3.select('.tooltip')
                            .style('left', position[0] + 'px')
                            .style('top', (position[1] - 40) + 'px')
                            .text(d['Country'])
                            .classed('hidden', false);
                        })
                        .on('mouseout', (event, d) => {
                          d3.select('.tooltip')
                            .classed('hidden', true);
                        })
    }
    
  })
