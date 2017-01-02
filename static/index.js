/*global exports, require*/
'use strict';
var app = angular.module('smellycode', [
  require('angular-ui-router'),
  require('./modules/home').name,
  require('./modules/components/aquarium').name,
  'hljs'
]);

app.constant('Routes', require('./routes'));

app.config(['Routes', '$stateProvider', '$urlRouterProvider', function (Routes, $stateProvider, $urlRouterProvider) {
  var base = 'static/views/';
  Routes.forEach(function (route) {
    var state = {
      url: '/' + route.url,
      templateUrl: base + route.url
    };
    $stateProvider.state(route.id, state);
  });
  $urlRouterProvider.otherwise('/home');
}]);
module.exports = app;