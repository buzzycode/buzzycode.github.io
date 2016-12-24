/*global module, require, document*/
'use strict';
var angular = require('angular');
var Konva = require('konva');

var app = angular.module('smellycode.components.scbanner', []);
module.exports = app;
app.service('ScbannerUtil', [function () {

  var service = this;

  function getRandom(number) {
    return Math.random() * number << 0;
  }

  function getRandomInRange(min, max) {
    var diff = max - min;
    var number = Math.random() * diff << 0;
    number += min;
    return number;
  }

  service.getRandomNumber = function (min, max) {
    var fn = arguments.length === 1 ? getRandom : getRandomInRange;
    return fn.apply(service, arguments);
  };

}]);

app.controller('ScbannerController', ['$interval', 'ScbannerUtil', function ($interval, ScbannerUtil) {
  var vm = this;
  var containerId = 'homeBanner';
  var stage;
  var layer;
  var xMax;
  var yMax;
  var stars = [];
  var intervalId;
  stars.length = 100;

  function addStars() {
    for (var i = 0; i < stars.length; i++) {
      var scale = Math.random();
      var star = new Konva.Star({
        x: ScbannerUtil.getRandomNumber(10, xMax),
        y: ScbannerUtil.getRandomNumber(10, yMax),
        numPoints: ScbannerUtil.getRandomNumber(i) + 5,
        innerRadius: 30,
        outerRadius: 50,
        fill: Konva.Util.getRandomColor(),
        opacity: 0.8,
        scale: {
          x: scale,
          y: scale
        },
        rotation: Math.random() * 180,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
          x: 5,
          y: 5
        },
        shadowOpacity: 0.6,
        startScale: scale
      });
      layer.add(star);
      stars[i] = star;
    }
  }

  function initialise() {
    var element = document.getElementById('homeBanner');
    xMax = element.offsetWidth;
    yMax = element.offsetHeight;
    stage = new Konva.Stage({
      container: 'homeBanner',
      width: xMax,
      height: yMax
    });
    layer = new Konva.Layer();
    stage.add(layer);
  }

  function startCycle() {
    return $interval(function () {
      var index = ScbannerUtil.getRandomNumber(stars.length);
      var star = stars[index];
      var scale= Math.random();
      star.moveToTop();
      var tween = new Konva.Tween({
        node: star,
        duration: 5,
        easing: Konva.Easings.EaseInOut,
        rotation: ScbannerUtil.getRandomNumber(50, 360),
        fill: Konva.Util.getRandomColor(),
        scale: {
          x:scale,
          y:scale
        },
        x: ScbannerUtil.getRandomNumber(10, xMax),
        y: ScbannerUtil.getRandomNumber(10, yMax)
      });
      tween.play();
    }, 1000);
  }
  
  function clearInterval(){
    if(intervalId){
      $interval.cancel(intervalId);
    }
  }

  vm.$postLink = function () {
    initialise();
    addStars();
    intervalId = startCycle();
    layer.draw();
  };
  vm.$onDestroy = function(){
    clearInterval();
  };

}]);
app.component('scbanner', {
  template: '<div id="homeBanner" class="home__banner__stage"></div>',
  controller: 'ScbannerController'
});