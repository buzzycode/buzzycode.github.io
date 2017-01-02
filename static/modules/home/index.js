/*global require, exports*/
'use strict';
var app = angular.module('smellycode.home', [
  require('angular-ui-router'),
  require('angular-sanitize'),
  require('../api').name
]);
app.config(['$stateProvider', function($stateProvider){
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'static/modules/home/home.tpl.html',
    controller: 'HomeController'
  });  
}]);
app.controller('HomeController', require('./controller'));
module.exports = app;