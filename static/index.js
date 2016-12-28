/*global exports, require*/
'use strict';
var angular = require('angular');
var app = angular.module('smellycode', [
  require('angular-ui-router'),
  require('./modules/home').name,  
  require('./modules/components/aquarium').name
]);
app.config(['$urlRouterProvider', function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
}]);
module.exports = app;