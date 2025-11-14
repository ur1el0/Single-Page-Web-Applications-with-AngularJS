(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = '';
  $scope.isEnjoyOrTooMuch = false;

  $scope.checkLunch = function () {
    var items = $scope.lunchItems;

    $scope.message = '';
    $scope.isEnjoyOrTooMuch = false;

    if (!items) {
      $scope.message = 'Please enter data first';
      $scope.isEnjoyOrTooMuch = false;
      return;
    }

    var itemArray = items.split(',');
    var itemCount = itemArray.length;

    if (itemCount <= 3) {
      $scope.message = 'Enjoy!';
      $scope.isEnjoyOrTooMuch = true;
    } else {
      $scope.message = 'Too much!';
      $scope.isEnjoyOrTooMuch = true;
    }
  };
}

})();