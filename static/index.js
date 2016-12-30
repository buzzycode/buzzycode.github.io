/*global exports, require*/
'use strict';
var app = angular.module('smellycode', [
  require('angular-ui-router'),
  require('./modules/home').name,
  require('./modules/components/aquarium').name,
  'hljs'
]);

app.constant('Routes', [
  {
    id: '1',
    url: 'angular-extend-copy-merge.html'
  }
]);

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

app.controller('MainController', ['PageMeta', function (PageMeta) {
  var ctrl = this;
  var title = 'Smelly Code | Code which smells';
  ctrl.PageMeta = PageMeta;
  ctrl.PageMeta.setTitle(title);
}]);
app.service('PageMeta', [function () {
  var meta = this;
  meta.title = '';
  this.setTitle = function (title) {
    meta.title = title || meta.title;
    return meta;
  };
}]);
module.exports = app;