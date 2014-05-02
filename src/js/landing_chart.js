(function() {
  'use strict';

var w = $('#landing-chart').parent().width(),
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().range([0, r]),
    color = d3.scale.category20b()
;

var data = dataGen();

var div = d3.select('#landing-chart');

var svg = div.append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('transform', 'translate(' + w / 2 + ',' + (h / 2) + ')')
    //.attr('transform', 'rotate (90)')
    ;

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

// diagram type
var partition = d3.layout.partition();
    //.size([2 * Math.PI, r]) // defaults to 1x1
    //.value(function(d) { return d.size; }); // defaults to d.value (numeric)

var nodes = partition.nodes(data);

var path = svg.selectAll('path').data(nodes);
path.enter().append('path')
  .attr('id', function(d,i){return 'path-' + d.name;})
  .attr('d', arc)
  .style('fill', function(d) { return color(d.name); })
  .attr('display', function(d) { return d.depth ? null : 'none'; }) // hide inner
  .attr('class', function(d) { return d.name[0] === '_' ? 'isnot-g' : 'is-g'; })
  //.attr('stroke', 'white')
  //.on('click', click)
;

svg.select('path#path-140').each(function(d,i){
  path.transition().duration(0)
    .attrTween('d', arcTween(d))
    .each('end', function() {
      svg.select('path#path-root').each(function(e,j) {
        path.transition().duration(750)
          .attrTween('d', arcTween(e))
          .each('end', function() {
            svg.selectAll('.isnot-g')
              .transition().duration(1500)
              .style('opacity', 0);
          });
      });
    });
});

//var text = svg.selectAll('text').data(nodes);
//var textEnter = text.enter().append('text')
    //.style('fill-opacity', 1)
    //.style('fill', function(d) {
      //return 'white';
      ////return brightness(d3.rgb(colour(d))) < 125 ? '#eee' : '#000';
    //})
    //.attr('text-anchor', function(d) {
      //return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
    //})
    //.attr('dy', '0.1em')
    //.attr('transform', function(d) {
      //var multiline = (d.name.toString() || '').split(' ').length > 1,
          //angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
          //rotate = angle + (multiline ? -0.5 : 0);
      //return 'rotate(' + rotate + ')translate(' + (y(d.y) + padding) + ')rotate(' + (angle > 90 ? -180 : 0) + ')';
    //})
    //.on('click', click)
    //;

//textEnter.append('tspan')
  //.attr('x', 0)
  //.text(function(d) { return d.depth ? d.name.toString().split(' ')[0] : ''; });
//textEnter.append('tspan')
  //.attr('x', 0)
  //.attr('dy', '1em')
  //.text(function(d) { return d.depth ? d.name.toString().split(' ')[1] || '' : ''; });

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, r]);
  return function(d, i) {
    return i ? function(t) { return arc(d); }
             : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

//function dataGen() {
  //var i = 100;
  //function makeId() {
    ////var text = '';
    ////var possible = 'abcdefghijklmnopqrstuvwxyz';

    ////for( var i=0; i < 2; i++ )
      ////text += possible.charAt(Math.floor(Math.random() * possible.length));

    ////return text;
    //return (i++).toString();
  //}

  //function makeLeafs() {
    //return _.map(
      //_.range(_.random(1,4)),
      //function() {
        //return {
          //name: makeId(),
          //value: _.random(1, 10)
        //};
      //}
    //);
  //}

  //function makeParents() {
    //return _.map(
      //_.range(_.random(2,4)),
      //function() {
        //return {
          //name: makeId(),
          //value: _.random(1, 10),
          //children: makeLeafs()
        //};
      //}
    //);
  //}

  //return { name: 'root', children: _.map(
    //_.range(_.random(10,12)),
    //function() {
      //return {
        //name: makeId(),
        //value: _.random(1, 10),
        //children: makeParents()
      //};
    //}
  //)};
//}

function dataGen() {
  /* jshint quotmark:false */
  return {
  "name": "root",
  "children": [
    {
      "name": "_100",
      "value": 5,
      "children": [
        {
          "name": "_101",
          "value": 7,
          "children": [
            {
              "name": "_102",
              "value": 8
            },
            {
              "name": "_103",
              "value": 9
            }
          ]
        },
        {
          "name": "104",
          "value": 4,
          "children": [
            {
              "name": "105",
              "value": 2
            },
            {
              "name": "106",
              "value": 3
            },
            {
              "name": "107",
              "value": 10
            },
            {
              "name": "108",
              "value": 10
            }
          ]
        },
        {
          "name": "109",
          "value": 5,
          "children": [
            {
              "name": "110",
              "value": 10
            },
            {
              "name": "111",
              "value": 6
            },
            {
              "name": "112",
              "value": 6
            },
            {
              "name": "113",
              "value": 9
            }
          ]
        },
        {
          "name": "_114",
          "value": 5,
          "children": [
            {
              "name": "_115",
              "value": 8
            },
            {
              "name": "_116",
              "value": 5
            },
            {
              "name": "_117",
              "value": 6
            },
            {
              "name": "_118",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "_119",
      "value": 5,
      "children": [
        {
          "name": "120",
          "value": 7,
          "children": [
            {
              "name": "121",
              "value": 6
            },
            {
              "name": "122",
              "value": 8
            }
          ]
        },
        {
          "name": "123",
          "value": 9,
          "children": [
            {
              "name": "124",
              "value": 8
            }
          ]
        },
        {
          "name": "125",
          "value": 3,
          "children": [
            {
              "name": "126",
              "value": 5
            },
            {
              "name": "127",
              "value": 2
            },
            {
              "name": "128",
              "value": 1
            }
          ]
        },
        {
          "name": "129",
          "value": 10,
          "children": [
            {
              "name": "130",
              "value": 2
            }
          ]
        }
      ]
    },
    {
      "name": "131",
      "value": 3,
      "children": [
        {
          "name": "_132",
          "value": 5,
          "children": [
            {
              "name": "133",
              "value": 4
            }
          ]
        },
        {
          "name": "_134",
          "value": 3,
          "children": [
            {
              "name": "135",
              "value": 10
            }
          ]
        },
        {
          "name": "136",
          "value": 10,
          "children": [
            {
              "name": "137",
              "value": 10
            },
            {
              "name": "138",
              "value": 10
            }
          ]
        },
        {
          "name": "_139",
          "value": 7,
          "children": [
            {
              "name": "140",
              "value": 9
            },
            {
              "name": "141",
              "value": 4
            },
            {
              "name": "142",
              "value": 2
            }
          ]
        }
      ]
    },
    {
      "name": "_143",
      "value": 9,
      "children": [
        {
          "name": "144",
          "value": 1,
          "children": [
            {
              "name": "145",
              "value": 2
            }
          ]
        },
        {
          "name": "146",
          "value": 10,
          "children": [
            {
              "name": "147",
              "value": 7
            }
          ]
        },
        {
          "name": "148",
          "value": 10,
          "children": [
            {
              "name": "149",
              "value": 6
            },
            {
              "name": "150",
              "value": 10
            },
            {
              "name": "151",
              "value": 2
            },
            {
              "name": "152",
              "value": 5
            }
          ]
        }
      ]
    },
    {
      "name": "_153",
      "value": 7,
      "children": [
        {
          "name": "154",
          "value": 5,
          "children": [
            {
              "name": "155",
              "value": 5
            },
            {
              "name": "156",
              "value": 9
            },
            {
              "name": "157",
              "value": 7
            }
          ]
        },
        {
          "name": "158",
          "value": 3,
          "children": [
            {
              "name": "159",
              "value": 1
            }
          ]
        },
        {
          "name": "160",
          "value": 8,
          "children": [
            {
              "name": "161",
              "value": 6
            }
          ]
        }
      ]
    },
    {
      "name": "_162",
      "value": 7,
      "children": [
        {
          "name": "163",
          "value": 9,
          "children": [
            {
              "name": "164",
              "value": 10
            },
            {
              "name": "165",
              "value": 3
            }
          ]
        },
        {
          "name": "_166",
          "value": 1,
          "children": [
            {
              "name": "167",
              "value": 7
            },
            {
              "name": "168",
              "value": 6
            },
            {
              "name": "169",
              "value": 10
            },
            {
              "name": "170",
              "value": 8
            }
          ]
        },
        {
          "name": "171",
          "value": 3,
          "children": [
            {
              "name": "172",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "_173",
      "value": 7,
      "children": [
        {
          "name": "_174",
          "value": 3,
          "children": [
            {
              "name": "175",
              "value": 8
            },
            {
              "name": "176",
              "value": 6
            },
            {
              "name": "177",
              "value": 3
            },
            {
              "name": "178",
              "value": 3
            }
          ]
        },
        {
          "name": "_179",
          "value": 2,
          "children": [
            {
              "name": "180",
              "value": 8
            },
            {
              "name": "181",
              "value": 4
            }
          ]
        },
        {
          "name": "_182",
          "value": 6,
          "children": [
            {
              "name": "183",
              "value": 5
            },
            {
              "name": "184",
              "value": 4
            },
            {
              "name": "185",
              "value": 1
            },
            {
              "name": "186",
              "value": 7
            }
          ]
        }
      ]
    },
    {
      "name": "_187",
      "value": 5,
      "children": [
        {
          "name": "188",
          "value": 3,
          "children": [
            {
              "name": "189",
              "value": 6
            }
          ]
        },
        {
          "name": "190",
          "value": 5,
          "children": [
            {
              "name": "191",
              "value": 6
            },
            {
              "name": "192",
              "value": 9
            }
          ]
        }
      ]
    },
    {
      "name": "_193",
      "value": 10,
      "children": [
        {
          "name": "194",
          "value": 2,
          "children": [
            {
              "name": "195",
              "value": 4
            }
          ]
        },
        {
          "name": "196",
          "value": 6,
          "children": [
            {
              "name": "197",
              "value": 4
            },
            {
              "name": "198",
              "value": 9
            },
            {
              "name": "199",
              "value": 10
            }
          ]
        }
      ]
    },
    {
      "name": "_200",
      "value": 7,
      "children": [
        {
          "name": "201",
          "value": 5,
          "children": [
            {
              "name": "202",
              "value": 5
            },
            {
              "name": "203",
              "value": 9
            },
            {
              "name": "204",
              "value": 5
            }
          ]
        },
        {
          "name": "205",
          "value": 3,
          "children": [
            {
              "name": "206",
              "value": 9
            }
          ]
        }
      ]
    }
  ]
};
}

})();


