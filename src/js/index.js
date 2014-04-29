//(function ($) {

/******************************
 * jquery page load
 */

$(document).ready(function() {
  'use strict';
  $('div.section-wrapper').css('margin-top', Math.max(0, $(window).height()/4)+'px');
  $('#nav').onePageNav({
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: '',
    easing: 'swing',
    begin: function() {
        //I get fired when the animation is starting
    },
    end: function() {
        //I get fired when the animation is ending
    },
    scrollChange: function($currentListItem) {
        //I get fired when you enter a section and I pass the list item of the section
    }
  });
});

//}());
