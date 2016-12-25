/*global module*/
'use strict';

function HomeController(
  $scope,
  $log,
  QuoteFactory
) {

  function onLoad() {
    QuoteFactory.get().then(function (quote) {
      $scope.quote = quote;
    }).catch(function (e) {
      //TODO: Error message goes here.
      $log.error(e);
    });
  }

  onLoad();
}

module.exports = [
  '$scope',
  '$log',
  'QuoteFactory',
  HomeController
];