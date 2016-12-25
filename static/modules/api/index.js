/*global require, module*/
'use strict';
var angular = require('angular');
// TODO: Include ngResource and use it instead of $http calls.
var app = angular.module('smellycode.api', []);
app.factory('QuoteFactory', ['$http', '$q', function ($http, $q) {
  var api = 'http://quotes.stormconsultancy.co.uk/random.json';
  var factory = {
    get: function () {
      var deferred = $q.defer();
      $http.get(api).then(function (response) {
          var quote = response.data;
          deferred.resolve(quote);
        })
        .catch(deferred.reject);
      return deferred.promise;
    }
  };
  return factory;
}]);
module.exports = app;