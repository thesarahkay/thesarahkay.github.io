// put data into array and convert strings into int
d3.csv("classicsdata.csv", function (data) {
    data.forEach(function(d) {
        d.convo = +d.convo;
        d.total = +d.total;
});


// global variables
var wdth = document.getElementById("wrapper").offsetWidth;
var hght = 500;
var margin = 20;


// assign color
var color = d3.scale.ordinal()
    .domain(["UK", "Spanish", "French", "Scandinavian", "Greek", "American",
    "Portuguese", "Russian", "Italian", "Arabic", "German", "Canadian"])
    .range(["rgb(231, 120, 55)", "rgb(38, 127, 124)", "rgb(117, 190, 134)",
    "rgb(191, 166, 125)", "rgb(136, 87, 72)", "rgb(107, 40, 101)",
    "rgb(194, 126, 114)", "rgb(171, 56, 69)", "rgb(33, 169, 203)",
    "rgb(223, 157, 62)", "rgb(149, 149, 41)", "rgb(231, 210, 88)"]);


// hover tip information to display
var tip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d) { return (d.title)
          + "<hr>" + (d.first) + " "
          + (d.last)
          + "<br>" + (d.percent)
          + " percent<h5>" + (d.nation) + "<br>"
          + (d.convo).toLocaleString() + " of "
          + (d.total).toLocaleString() + " words</h5>"});

// set canvas location
var canvas = d3.select("#chart")
        .append("svg")
        .attr("width", wdth)
        .attr("height", hght)
        .append("g")
        .attr("transform", "translate(0, 0)")
        .call(tip);

// mapping scale
var xScale = d3.scale.linear()
        .domain([0, 620000])  //highest value in dataset = 563000
        .range([margin*3, wdth-margin]);

var yScale = d3.scale.linear()
        .domain([0, 300000])    // highest value in dataset = 226000
        .range([hght - (margin*2), margin]);

// tick marks
var xAxis = d3.svg.axis()
        .ticks(5)
        .tickValues([0,100000,200000,300000,400000,500000,600000])
        .scale(xScale);

var yAxis = d3.svg.axis()
        .ticks(3)
        .tickValues([100000,200000,300000])
        .scale(yScale)
        .orient("left");


// draw 50% line: PATH
canvas.append("path")
        .attr("id", "new")
        .attr("stroke-width", 1)
        .attr("d", "M" + margin * 4 + ","
        + (hght - (margin * 2 + 8))
        + "L" + (wdth-margin) + "," + 0)
        .attr("stroke", "gray");


// 50% line label
canvas.append("text")
        .attr("dy", 11)
        .attr("class", "axis")
        .append("textPath")
        .attr("xlink:href", "#new")
        .attr("startOffset", "50%")
        .text("50% conversation");


// instantiate everything
canvas.selectAll("circle")
        .data(data)
        .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cy", function (d) { return yScale(d.convo) })
            .attr("cx", function (d) { return xScale(d.total) })
            .attr("class", "circle")
            .style("fill", function (d) { return color(d.nation)})
            .style("stroke", function (d) { return color(d.nation)})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

// append group for X axis
canvas.append("g")
        .attr("transform", "translate(0," + (hght-margin*2) + ")")
        .attr("class", "x axis")
        .call(xAxis)
          .append("text")
          .attr("class", "label")
          .style("font-size", "14px")
          .style("font-style", "italic")
          .attr("x", wdth/2.29)
          .attr("y", 40)
          .text("Total number of words");

// append group for Y axis
canvas.append("g")
        .attr("transform", "translate(" + (margin*4 - 8) + ", 0)")
        .attr("class", "y axis")
        .call(yAxis)
          .append("text")
          .attr("class", "label")
          .style("font-size", "14px")
          .style("font-style", "italic")
          .attr("x", -53)
          .attr("y", 100)
          .text("Number of words in conversation")
})
