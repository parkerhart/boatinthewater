'use strict';

var height = 100;
var width = 100;
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var wave1Fill = 'blue';
var wave1Stroke = 'blue';
var wave1Width = 1000;
var wave2Fill = 'yellow';
var wave2Stroke = 'yellow';
var wave3Fill = 'red';
var wave3Stroke = 'red';

var ship = {
  id: 'ship',
  cx: window.innerWidth / 2 - 100,
  cy: window.innerHeight + 25,
  fill: 'brown'
};

var wave1 = {
  id: 'wave-1',
  fill: '#0099ff',
  stroke: '#fff',
  strokeWidth: 10,
  center: windowWidth / 2,
  width: 500,
  height: windowHeight - 50,
  dominantExtremity: 600,
  minorExtremity: 200
};

var wave2 = {
  id: 'wave-2',
  fill: '#007acc',
  stroke: '#fff',
  strokeWidth: 8,
  center: windowWidth / 2 - windowWidth / 10,
  width: 600,
  height: windowHeight - 50,
  dominantExtremity: 700,
  minorExtremity: 200
};

var wave3 = {
  id: 'wave-3',
  fill: '#0099ff',
  stroke: '#fff',
  strokeWidth: 7,
  center: windowWidth / 2 + windowWidth / 10,
  width: 600,
  height: windowHeight - 70,
  dominantExtremity: 600,
  minorExtremity: 200
};

var svg = d3.select('#animation').append('svg').style('width', '100%').style('height', '100%');

svg.append('path').attr('id', wave3['id']).attr('stroke-width', wave3['strokeWidth']).attr('stroke', wave3['stroke']).attr('fill', wave3['fill']).attr('d', 'M 0 ' + windowHeight + 'L 200 ' + windowHeight + ' C 0 200 0 0 ' + windowWidth + ' ' + windowHeight);

// Draw ship stuff.
svg.append('g').attr('id', 'ship').attr('transform', 'translate(' + ship['cx'] + ',' + ship['cy'] + ') rotate(20)');

d3.select('#ship').append('path').attr('id', 'hull').attr('d', 'M -100 -100 Q -20 70 100 -100 Z').attr('fill', ship['fill']).attr('stroke', ship['fill']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'bow').attr('d', 'M -100 -102 L -130 -110 L -120 -90 L -30 -80').attr('fill', ship['fill']).attr('stroke', ship['stroke']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'stern').attr('d', 'M 50 -112 L 110 -120 L 100 -80 L 40 -75 L 40 -55').attr('fill', ship['fill']).attr('stroke', ship['stroke']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'mast').attr('d', 'M 5 -50 L 10 -250 L -5 -250 L -5 -50').attr('fill', ship['fill']).attr('stroke', ship['stroke']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'crowsnest').attr('d', 'M 15 -225 L 20 -240 L -15 -240 L -10 -225').attr('fill', ship['fill']).attr('stroke', ship['stroke']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'mast-extension').attr('d', 'M 40 -200 L 45 -205 L -40 -230 L -40 -225').attr('fill', ship['fill']).attr('stroke', ship['stroke']).attr('stroke-width', 5);

d3.select('#ship').append('path').attr('id', 'sails').attr('d', 'M 40 -110 Q 10 -150 36 -200 Q -10 -200 -35 -225 Q -60 -200 -30 -130').attr('fill', 'white').attr('stroke', 'white').attr('stroke-width', 5);

d3.timer(function (elapsed) {
  var t = Math.sin(elapsed / 300) * 10;
  var p = Math.sin(elapsed / 300) * 10;
  var x0 = 10 - t;
  var y0 = -150 + t;
  var x1 = -60 - t;
  var y1 = -200 + t;
  var shipY = ship['cy'] + p;
  d3.select('#sails').attr('d', 'M 40 -110 Q ' + x0 + ' ' + y0 + ' 36 -200 Q -10 -200 -35 -225 Q ' + x1 + ' ' + y1 + ' -30 -130');
  d3.select('#ship').attr('transform', 'translate(' + ship['cx'] + ',' + shipY + ') rotate(20)');
});

// Wave stuff
svg.append('g').attr('id', 'waves');

//d3.select('#waves')

d3.select('#waves').append('path').attr('id', wave2['id']).attr('stroke-width', wave2['strokeWidth']).attr('stroke', wave2['stroke']).attr('fill', wave2['fill']).attr('d', 'M 0 ' + windowHeight + ' C 0 200 0 0 ' + windowWidth + ' ' + windowHeight);

d3.select('#waves').append('path').attr('id', wave1['id']).attr('stroke-width', wave1['strokeWidth']).attr('stroke', wave1['stroke']).attr('fill', wave1['fill']).attr('d', 'M 0 ' + windowHeight + ' C 0 200 0 0 ' + windowWidth + ' ' + windowHeight);

d3.timer(function (elapsed) {
  var t = elapsed;
  drawWave(wave1, t);
});

d3.timer(function (elapsed) {
  var t = elapsed - 3000;
  drawWave(wave2, t);
});

d3.timer(function (elapsed) {
  var t = elapsed - 1750;
  drawWave(wave3, t);
});

function drawWave(wave, t) {
  var modifier = Math.sin(t / 1000);
  var dominantControlPoint = wave['center'] + Math.sin(t / 1000) * wave['dominantExtremity'];
  var minorControlPoint = wave['center'] + Math.sin(t / 1000) * wave['minorExtremity'];
  var x2 = wave['center'] + Math.sin(t / 1000) * 200 - wave['width'] / 2;
  var y2 = windowHeight;
  var c1x = modifier < 0 ? minorControlPoint : dominantControlPoint;
  var c1y = wave['height'];
  var c2x = modifier < 0 ? dominantControlPoint : minorControlPoint;
  var c2y = wave['height'];
  var x3 = x2 + wave['width'];
  var y3 = windowHeight;
  d3.select('#' + wave['id']).attr('d', 'M 0 ' + windowHeight + ' L ' + x2 + ' ' + y2 + ' C ' + c1x + ' ' + c1y + ' ' + c2x + ' ' + c2y + ' ' + x3 + ' ' + windowHeight + ' L ' + windowWidth + ' ' + windowHeight);
}

// Sun
svg.append('g').attr('id', 'sun');

var sun = {
  r: 100,
  cx: 20,
  cy: 20
};

svg.select('#sun').append('circle').attr('fill', 'yellow').attr('r', sun['r']).attr('cx', sun['cx']).attr('cy', sun['cy']);

function rotateTriangle(tri, x0, y0, radius, angle) {
  var x1 = tri['x1'] * Math.cos(angle) - tri['y1'] * Math.sin(angle);
  var y1 = tri['y1'] * Math.cos(angle) + tri['x1'] * Math.sin(angle);
  var x2 = tri['x2'] * Math.cos(angle) - tri['y2'] * Math.sin(angle);
  var y2 = tri['y2'] * Math.cos(angle) + tri['x2'] * Math.sin(angle);
  var x3 = tri['x3'] * Math.cos(angle) - tri['y3'] * Math.sin(angle);
  var y3 = tri['y3'] * Math.cos(angle) + tri['x3'] * Math.sin(angle);
  return { x1: x1 + x0, y1: y1 + y0, x2: x2 + x0, y2: y2 + y0, x3: x3 + x0, y3: y3 + y0 };
}

function drawSunRay(x0, y0, radius, angle) {
  var tri = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0
  };
  tri['x1'] = x0 + radius - 10;
  tri['x2'] = x0 + radius;
  tri['x3'] = x0 + radius - 10;
  tri['y1'] = y0 - 5;
  tri['y2'] = y0;
  tri['y3'] = y0 + 5;
  tri = rotateTriangle(tri, x0, y0, radius, angle);
  var triGroup = angle / 10 % 2 == 0 ? 'even' : 'odd';
  svg.select('#sun').append('path').attr('stroke', 'yellow').attr('class', triGroup).attr('stroke-width', 3).attr('fill', 'yellow').attr('d', 'M ' + tri['x1'] + ' ' + tri['y1'] + ' L ' + tri['x2'] + ' ' + tri['y2'] + ' L ' + tri['x3'] + ' ' + tri['y3'] + ' Z');
}

for (var i = 0; i < 660; i += 30) {
  drawSunRay(sun['cx'], sun['cy'], sun['r'], i);
}

d3.timer(function (elapsed) {
  var mod = Math.sin(elapsed / 1000);
  var t = Math.floor(elapsed / 1000);
  d3.select('#sun').attr('transform', 'translate(' + mod * 10 + ',' + mod * 10 + ')');
  var show = t % 2 == 0 ? 'path.odd' : 'path.even';
  var hide = t % 2 == 0 ? 'path.even' : 'path.odd';
  d3.select('#sun').selectAll(show).attr('fill', 'yellow').attr('stroke', 'yellow');
  d3.select('#sun').selectAll(hide).attr('fill', 'none').attr('stroke', 'none');;
});