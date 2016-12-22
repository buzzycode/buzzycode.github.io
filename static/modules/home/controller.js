/*global module*/
'use strict';

function HomeController($scope){
  $scope.greetings = 'Greetings from home controller.';
}

module.exports = ['$scope', HomeController];