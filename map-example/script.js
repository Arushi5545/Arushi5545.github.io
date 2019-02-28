const data = d3.csv('data/nyc_permits.csv', parse);

const scaleSize = d3.scaleSqrt().range([2,20]);

data.then(function(rows){

	//Data discovery
	scaleSize.domain(d3.extent(rows, function(d){return d.cost_estimate}));

	drawMap(rows, document.getElementById('map'));

});

function drawMap(data, dom){

	//Create center
	const lngLatNYC = [-74.0060, 40.7128];
  
	//Set up DOM
	const margin = {t:50, r:30, b:30, l:100};
	const W = dom.clientWidth;
	const H = dom.clientHeight;
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;

	const plot = d3.select(dom)
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('class','plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	//Create a projection function
//**This translates the lat/long to x/y coords
	const projection = d3.geoMercator()
    .center(lngLatNYC)
    .translate([w/2, h/2])
    .precision(0)
    .scale(90000);
    
  // check coords of nyc
  // console.log(projection(lngLatNYC));
  // check that it is processing the item
   console.log(data);
  // console.log(projection(data[0].lngLat));
  
  // 
    
  plot.selectAll('.node')
    .data(data)
    .enter()
    .append('circle')
    .attr('class','node')
    .attr('r',(d => scaleSize(d.cost_estimate)*0.75))
    .attr('cx', function(d){
      return projection(d.lngLat)[0];
    })
    .attr('cy', function(d){
      return projection(d.lngLat)[1];
    })
    .on('mouseenter',function(d){
      // callback
      const tt = d3.select('.tt');
//      console.log(d);
      d3.select(this).style('opacity',1)
      tt.select('#address').html(d.address);
      tt.select('#sqft').html(d.square_footage);
      tt.select('#type').html(d.job_type);
    })
    .on('mousemove', function(d){
      console.log('move');
      const xy = d3.mouse(d3.select('.full-screen').node());
      d3.select('.tt')
        .style('top',xy[0]+'px')
        .style('left',xy[1]+'px');
    })
    .on('mouseleave',function(d){
      const tt = d3.select('.tt');
//      console.log('bye');
      d3.select(this).style('opacity',null) // return to css
      tt.select('#address').html(null);
      tt.select('#sqft').html(null);
      tt.select('#type').html(null);
    })
  
}

function parse(d){
	return {
		applicant:d.applicant_business_name,
		lngLat: [+d.longitude, +d.latitude],
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate: +d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage,
		cost_per_sqft: +d.square_footage > 0 ? (+d.cost_estimate /+d.square_footage):0
	}
}