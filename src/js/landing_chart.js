(function() {
  'use strict';

var w = $('#landing-chart').parent().width(),
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.sqrt().range([0, r]),
    color = d3.scale.category20b(),
    padding = 0
;

var data = dataGen();
//console.log(JSON.stringify(data));

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
  .attr('id', function(d,i){return 'path-' + i;})
  .attr('d', arc)
  //.attr('fill-rule', 'evenodd')
  .style('fill', function(d) { return color((d.children ? d : d.parent).name); })
  .attr('display', function(d) { return d.depth ? null : 'none'; }) // hide inner
  //.attr('fill', color(d))
  //.attr('stroke', 'white')
  .on('click', click)
  ;

/*
var text = svg.selectAll('text').data(nodes);
var textEnter = text.enter().append('text')
    .style('fill-opacity', 1)
    .style('fill', function(d) {
      return 'white';
      //return brightness(d3.rgb(colour(d))) < 125 ? '#eee' : '#000';
    })
    .attr('text-anchor', function(d) {
      return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
    })
    .attr('dy', '0.1em')
    .attr('transform', function(d) {
      var multiline = (d.name || '').split(' ').length > 1,
          angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
          rotate = angle + (multiline ? -0.5 : 0);
      return 'rotate(' + rotate + ')translate(' + (y(d.y) + padding) + ')rotate(' + (angle > 90 ? -180 : 0) + ')';
    })
    .on('click', click);

textEnter.append('tspan')
  .attr('x', 0)
  .text(function(d) { return d.depth ? d.name.split(' ')[0] : ''; });
textEnter.append('tspan')
  .attr('x', 0)
  .attr('dy', '1em')
  .text(function(d) { return d.depth ? d.name.split(' ')[1] || '' : ''; });
*/

//var groups = mainGroup.data(getData())
    //.selectAll('path')
    //.data(partition.nodes)
    //.enter().append('svg:g')
    //;



//var group = mainGroup.selectAll('path')
    //.data(partition.nodes(getData()))
    //.enter().append('g')
    //;

//var group = svg.data(getData())
    //.selectAll('path')
    //.data(partition.nodes)
    //.enter().append('g');

//var path = groups.append('svg:path')
    //.attr('d', arc)
    //.style('fill', function(d) { return color((d.children ? d : d.parent).name); })
    //.attr('display', function(d) { return d.depth ? null : 'none'; }) // hide inner
    //.each(stash)
    ////.on('click', click)
    //;

//var path = svg.selectAll('path')
  //.data(partition.nodes(getData()))
  //.enter().append('path')
  //.attr('d', arc)
  //.style('fill', function(d) { return color((d.children ? d : d.parent).name); })
  //.on('click', click);

//group.append('text')
    //.attr('text-anchor', function(d) {
      //return d.x + d.dx / 2 > Math.PI ? 'end' : 'start';
    //})
    //.attr('transform', function(d) {
      //var angle = (d.x + d.dx / 2) * 180 / Math.PI - 90;
      //if (angle > 90) { angle = angle - 180; }
      //return 'rotate(' + angle + ')translate(' + (d.y  + 100)  + ')rotate(' + (angle > 90 ? -180 : 0) + ')';
    //})
    //.attr('dy', '.35em')  //vertical-align
    //.attr('display', function(d) { return d.depth ? null : 'none'; })  //hide inner
    //.text(function(d) { return d.name; });

function click(d) {
  path.transition()
    .duration(750)
    .attrTween('d', arcTween(d));
}

//function stash(d) {
  //d.x0 = d.x;
  //d.dx0 = d.dx;
//}

//d3.select(self.frameElement).style('height', height + 'px');

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

function dataGen() {
  /* jshint quotmark:false*/
  return {
  "name": "root",
  "children": [
    {
      "name": 100,
      "children": [
        {
          "name": 101,
          "children": [
            {
              "name": 102,
              "value": 212
            },
            {
              "name": 103,
              "value": 220
            }
          ]
        },
        {
          "name": 104,
          "children": [
            {
              "name": 105,
              "value": 116
            },
            {
              "name": 106,
              "value": 216
            },
            {
              "name": 107,
              "value": 162
            }
          ]
        },
        {
          "name": 108,
          "children": [
            {
              "name": 109,
              "value": 210
            },
            {
              "name": 110,
              "value": 282
            },
            {
              "name": 111,
              "value": 292
            }
          ]
        },
        {
          "name": 112,
          "children": [
            {
              "name": 113,
              "value": 129
            },
            {
              "name": 114,
              "value": 270
            },
            {
              "name": 115,
              "value": 251
            }
          ]
        }
      ]
    },
    {
      "name": 116,
      "children": [
        {
          "name": 117,
          "children": [
            {
              "name": 118,
              "value": 231
            },
            {
              "name": 119,
              "value": 234
            }
          ]
        },
        {
          "name": 120,
          "children": [
            {
              "name": 121,
              "value": 212
            },
            {
              "name": 122,
              "value": 236
            },
            {
              "name": 123,
              "value": 24
            }
          ]
        },
        {
          "name": 124,
          "children": [
            {
              "name": 125,
              "value": 234
            },
            {
              "name": 126,
              "value": 254
            }
          ]
        }
      ]
    },
    {
      "name": 127,
      "children": [
        {
          "name": 128,
          "children": [
            {
              "name": 129,
              "value": 137
            },
            {
              "name": 130,
              "value": 40
            }
          ]
        },
        {
          "name": 131,
          "children": [
            {
              "name": 132,
              "value": 60
            },
            {
              "name": 133,
              "value": 232
            }
          ]
        }
      ]
    },
    {
      "name": 134,
      "children": [
        {
          "name": 135,
          "children": [
            {
              "name": 136,
              "value": 84
            },
            {
              "name": 137,
              "value": 94
            },
            {
              "name": 138,
              "value": 158
            }
          ]
        },
        {
          "name": 139,
          "children": [
            {
              "name": 140,
              "value": 255
            },
            {
              "name": 141,
              "value": 155
            }
          ]
        },
        {
          "name": 142,
          "children": [
            {
              "name": 143,
              "value": 128
            },
            {
              "name": 144,
              "value": 129
            }
          ]
        }
      ]
    },
    {
      "name": 145,
      "children": [
        {
          "name": 146,
          "children": [
            {
              "name": 147,
              "value": 298
            },
            {
              "name": 148,
              "value": 235
            }
          ]
        },
        {
          "name": 149,
          "children": [
            {
              "name": 150,
              "value": 167
            },
            {
              "name": 151,
              "value": 92
            },
            {
              "name": 152,
              "value": 258
            }
          ]
        },
        {
          "name": 153,
          "children": [
            {
              "name": 154,
              "value": 241
            },
            {
              "name": 155,
              "value": 245
            }
          ]
        },
        {
          "name": 156,
          "children": [
            {
              "name": 157,
              "value": 260
            },
            {
              "name": 158,
              "value": 21
            }
          ]
        }
      ]
    },
    {
      "name": 159,
      "children": [
        {
          "name": 160,
          "children": [
            {
              "name": 161,
              "value": 284
            },
            {
              "name": 162,
              "value": 193
            },
            {
              "name": 163,
              "value": 125
            }
          ]
        },
        {
          "name": 164,
          "children": [
            {
              "name": 165,
              "value": 103
            },
            {
              "name": 166,
              "value": 90
            },
            {
              "name": 167,
              "value": 293
            }
          ]
        },
        {
          "name": 168,
          "children": [
            {
              "name": 169,
              "value": 144
            },
            {
              "name": 170,
              "value": 71
            }
          ]
        },
        {
          "name": 171,
          "children": [
            {
              "name": 172,
              "value": 114
            },
            {
              "name": 173,
              "value": 187
            },
            {
              "name": 174,
              "value": 168
            }
          ]
        }
      ]
    },
    {
      "name": 175,
      "children": [
        {
          "name": 176,
          "children": [
            {
              "name": 177,
              "value": 284
            },
            {
              "name": 178,
              "value": 226
            },
            {
              "name": 179,
              "value": 134
            }
          ]
        },
        {
          "name": 180,
          "children": [
            {
              "name": 181,
              "value": 212
            },
            {
              "name": 182,
              "value": 33
            },
            {
              "name": 183,
              "value": 45
            }
          ]
        },
        {
          "name": 184,
          "children": [
            {
              "name": 185,
              "value": 251
            },
            {
              "name": 186,
              "value": 187
            },
            {
              "name": 187,
              "value": 274
            }
          ]
        }
      ]
    },
    {
      "name": 188,
      "children": [
        {
          "name": 189,
          "children": [
            {
              "name": 190,
              "value": 197
            },
            {
              "name": 191,
              "value": 89
            },
            {
              "name": 192,
              "value": 52
            }
          ]
        },
        {
          "name": 193,
          "children": [
            {
              "name": 194,
              "value": 29
            },
            {
              "name": 195,
              "value": 165
            }
          ]
        }
      ]
    },
    {
      "name": 196,
      "children": [
        {
          "name": 197,
          "children": [
            {
              "name": 198,
              "value": 242
            },
            {
              "name": 199,
              "value": 146
            }
          ]
        },
        {
          "name": 200,
          "children": [
            {
              "name": 201,
              "value": 202
            },
            {
              "name": 202,
              "value": 271
            },
            {
              "name": 203,
              "value": 297
            }
          ]
        },
        {
          "name": 204,
          "children": [
            {
              "name": 205,
              "value": 220
            },
            {
              "name": 206,
              "value": 286
            },
            {
              "name": 207,
              "value": 28
            }
          ]
        },
        {
          "name": 208,
          "children": [
            {
              "name": 209,
              "value": 211
            },
            {
              "name": 210,
              "value": 179
            },
            {
              "name": 211,
              "value": 51
            }
          ]
        }
      ]
    },
    {
      "name": 212,
      "children": [
        {
          "name": 213,
          "children": [
            {
              "name": 214,
              "value": 190
            },
            {
              "name": 215,
              "value": 150
            }
          ]
        },
        {
          "name": 216,
          "children": [
            {
              "name": 217,
              "value": 210
            },
            {
              "name": 218,
              "value": 31
            },
            {
              "name": 219,
              "value": 250
            }
          ]
        },
        {
          "name": 220,
          "children": [
            {
              "name": 221,
              "value": 293
            },
            {
              "name": 222,
              "value": 115
            },
            {
              "name": 223,
              "value": 276
            }
          ]
        }
      ]
    },
    {
      "name": 224,
      "children": [
        {
          "name": 225,
          "children": [
            {
              "name": 226,
              "value": 67
            },
            {
              "name": 227,
              "value": 195
            },
            {
              "name": 228,
              "value": 160
            }
          ]
        },
        {
          "name": 229,
          "children": [
            {
              "name": 230,
              "value": 292
            },
            {
              "name": 231,
              "value": 228
            },
            {
              "name": 232,
              "value": 55
            }
          ]
        },
        {
          "name": 233,
          "children": [
            {
              "name": 234,
              "value": 130
            },
            {
              "name": 235,
              "value": 188
            },
            {
              "name": 236,
              "value": 23
            }
          ]
        },
        {
          "name": 237,
          "children": [
            {
              "name": 238,
              "value": 193
            },
            {
              "name": 239,
              "value": 91
            }
          ]
        }
      ]
    },
    {
      "name": 240,
      "children": [
        {
          "name": 241,
          "children": [
            {
              "name": 242,
              "value": 206
            },
            {
              "name": 243,
              "value": 155
            },
            {
              "name": 244,
              "value": 171
            }
          ]
        },
        {
          "name": 245,
          "children": [
            {
              "name": 246,
              "value": 106
            },
            {
              "name": 247,
              "value": 148
            }
          ]
        },
        {
          "name": 248,
          "children": [
            {
              "name": 249,
              "value": 215
            },
            {
              "name": 250,
              "value": 104
            }
          ]
        }
      ]
    },
    {
      "name": 251,
      "children": [
        {
          "name": 252,
          "children": [
            {
              "name": 253,
              "value": 77
            },
            {
              "name": 254,
              "value": 230
            },
            {
              "name": 255,
              "value": 20
            }
          ]
        },
        {
          "name": 256,
          "children": [
            {
              "name": 257,
              "value": 300
            },
            {
              "name": 258,
              "value": 280
            }
          ]
        },
        {
          "name": 259,
          "children": [
            {
              "name": 260,
              "value": 220
            },
            {
              "name": 261,
              "value": 84
            }
          ]
        }
      ]
    },
    {
      "name": 262,
      "children": [
        {
          "name": 263,
          "children": [
            {
              "name": 264,
              "value": 114
            },
            {
              "name": 265,
              "value": 97
            }
          ]
        },
        {
          "name": 266,
          "children": [
            {
              "name": 267,
              "value": 55
            },
            {
              "name": 268,
              "value": 55
            }
          ]
        }
      ]
    },
    {
      "name": 269,
      "children": [
        {
          "name": 270,
          "children": [
            {
              "name": 271,
              "value": 182
            },
            {
              "name": 272,
              "value": 89
            },
            {
              "name": 273,
              "value": 47
            }
          ]
        },
        {
          "name": 274,
          "children": [
            {
              "name": 275,
              "value": 202
            },
            {
              "name": 276,
              "value": 109
            }
          ]
        },
        {
          "name": 277,
          "children": [
            {
              "name": 278,
              "value": 57
            },
            {
              "name": 279,
              "value": 73
            },
            {
              "name": 280,
              "value": 255
            }
          ]
        }
      ]
    },
    {
      "name": 281,
      "children": [
        {
          "name": 282,
          "children": [
            {
              "name": 283,
              "value": 175
            },
            {
              "name": 284,
              "value": 44
            }
          ]
        },
        {
          "name": 285,
          "children": [
            {
              "name": 286,
              "value": 235
            },
            {
              "name": 287,
              "value": 86
            }
          ]
        }
      ]
    },
    {
      "name": 288,
      "children": [
        {
          "name": 289,
          "children": [
            {
              "name": 290,
              "value": 269
            },
            {
              "name": 291,
              "value": 101
            }
          ]
        },
        {
          "name": 292,
          "children": [
            {
              "name": 293,
              "value": 160
            },
            {
              "name": 294,
              "value": 80
            },
            {
              "name": 295,
              "value": 195
            }
          ]
        },
        {
          "name": 296,
          "children": [
            {
              "name": 297,
              "value": 108
            },
            {
              "name": 298,
              "value": 136
            },
            {
              "name": 299,
              "value": 20
            }
          ]
        },
        {
          "name": 300,
          "children": [
            {
              "name": 301,
              "value": 147
            },
            {
              "name": 302,
              "value": 162
            }
          ]
        }
      ]
    },
    {
      "name": 303,
      "children": [
        {
          "name": 304,
          "children": [
            {
              "name": 305,
              "value": 61
            },
            {
              "name": 306,
              "value": 176
            },
            {
              "name": 307,
              "value": 269
            }
          ]
        },
        {
          "name": 308,
          "children": [
            {
              "name": 309,
              "value": 96
            },
            {
              "name": 310,
              "value": 282
            }
          ]
        }
      ]
    },
    {
      "name": 311,
      "children": [
        {
          "name": 312,
          "children": [
            {
              "name": 313,
              "value": 162
            },
            {
              "name": 314,
              "value": 66
            },
            {
              "name": 315,
              "value": 229
            }
          ]
        },
        {
          "name": 316,
          "children": [
            {
              "name": 317,
              "value": 271
            },
            {
              "name": 318,
              "value": 65
            }
          ]
        },
        {
          "name": 319,
          "children": [
            {
              "name": 320,
              "value": 103
            },
            {
              "name": 321,
              "value": 94
            }
          ]
        },
        {
          "name": 322,
          "children": [
            {
              "name": 323,
              "value": 235
            },
            {
              "name": 324,
              "value": 122
            },
            {
              "name": 325,
              "value": 129
            }
          ]
        }
      ]
    },
    {
      "name": 326,
      "children": [
        {
          "name": 327,
          "children": [
            {
              "name": 328,
              "value": 211
            },
            {
              "name": 329,
              "value": 55
            }
          ]
        },
        {
          "name": 330,
          "children": [
            {
              "name": 331,
              "value": 273
            },
            {
              "name": 332,
              "value": 70
            },
            {
              "name": 333,
              "value": 212
            }
          ]
        }
      ]
    }
  ]
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
    //return i++;
  //}

  //function makeLeafs() {
    //return _.map(
      //_.range(_.random(2,3)),
      //function() {
        //return {
          //name: makeId(),
          //value: _.random(20, 300)
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
          //children: makeLeafs()
        //};
      //}
    //);
  //}

  //return { name: 'root', children: _.map(
    //_.range(_.random(12,20)),
    //function() {
      //return {
        //name: makeId(),
        //children: makeParents()
      //};
    //}
  //)};
//}

})();


