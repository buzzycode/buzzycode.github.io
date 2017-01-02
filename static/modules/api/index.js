/*global require, module*/
'use strict';
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

app.service('PostStore', ['$http', '$q', function ($http, $q) {
  var api = 'assets/json/posts.json';
  var service = this;
  //private
  var _posts = [];
  var PAGE_SIZE = 10;
  var currentPage = 1;

  service.posts = [];
  service.next = null;

  service.fetch = function () {
    var deferred = $q.defer();
    $http.get(api).then(function (response) {
        _posts = response.data;
        Array.prototype.push.apply(service.posts, _posts.slice(0, PAGE_SIZE));
        service.next = _posts.length < PAGE_SIZE ? null : PAGE_SIZE;
        deferred.resolve(service.posts);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  service.loadMore = function () {
    if (service.next === null) {
      // no post to load;
      return;
    }
    currentPage += 1;
    var newPosts = _posts.slice(service.next, PAGE_SIZE);
    service.next = newPosts.length < PAGE_SIZE ? null : service.next + PAGE_SIZE;
    Array.prototype.push.apply(service.posts, newPosts);
  };

  service.fetch();

}]);

module.exports = app;