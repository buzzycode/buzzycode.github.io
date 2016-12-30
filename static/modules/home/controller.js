/*global module*/
'use strict';

function HomeController(
  $scope,
  $log,
  QuoteFactory,
  PostStore
) {
    $scope.posts = PostStore.posts;
}

module.exports = [
  '$scope',
  '$log',
  'QuoteFactory',
  'PostStore',
  HomeController
];