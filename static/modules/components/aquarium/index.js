/*global module, require, document, Image*/
'use strict';
var angular = require('angular');
var Konva = require('konva');

var app = angular.module('smellycode.components.aquarium', []);
module.exports = app;
app.service('AquariumUtil', [function () {

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

app.controller('AquariumController', [
  '$interval',
  'AquariumUtil',
  function (
    $interval,
    AquariumUtil
  ) {
    var vm = this;
    var containerId = 'aquarium';
    var stage;
    var layer;
    var xMax;
    var yMax;
    var stars = [];
    var intervalId;

    function addStars() {
      for (var i = 0; i < stars.length; i += 1) {
        var scale = Math.random();
        var star = new Konva.Star({
          x: AquariumUtil.getRandomNumber(10, xMax),
          y: AquariumUtil.getRandomNumber(10, yMax),
          numPoints: AquariumUtil.getRandomNumber(i) + 5,
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
      var element = document.getElementById(containerId);
      xMax = element.offsetWidth;
      yMax = element.offsetHeight;
      // 10 percent stars of the max width;
      stars.length = 0.1 * xMax << 0;
      stage = new Konva.Stage({
        container: containerId,
        width: xMax,
        height: yMax
      });
      layer = new Konva.Layer();
      stage.add(layer);
    }

    function startCycle() {
      return $interval(function () {
        var index = AquariumUtil.getRandomNumber(stars.length);
        var star = stars[index];
        var scale = Math.random();
        star.moveToTop();
        var tween = new Konva.Tween({
          node: star,
          duration: 5,
          easing: Konva.Easings.EaseInOut,
          rotation: AquariumUtil.getRandomNumber(50, 360),
          fill: Konva.Util.getRandomColor(),
          scale: {
            x: scale,
            y: scale
          },
          x: AquariumUtil.getRandomNumber(10, xMax),
          y: AquariumUtil.getRandomNumber(10, yMax)
        });
        tween.play();
      }, 1000);
    }

    function clearInterval() {
      if (intervalId) {
        $interval.cancel(intervalId);
      }
    }
    
    function addBackground(){
      var image = new Image();
      image.onload = function(){
        var kImage = new Konva.Image({
          image: image,
          x: 0,
          y: 0,
          width: xMax,
          height: yMax
        });
        layer.add(kImage);
        kImage.moveToBottom();
        layer.draw();
      };
      image.src = 'assets/rainbow.png';
    }

    vm.$postLink = function () {
      initialise();
      addBackground();
      addStars();
      intervalId = startCycle();
      layer.draw();
    };
    vm.$onDestroy = function () {
      clearInterval();
    };

}]);
app.component('aquarium', {
  template: '<div id="aquarium" class="theme__aquarium"></div>',
  controller: 'AquariumController'
});