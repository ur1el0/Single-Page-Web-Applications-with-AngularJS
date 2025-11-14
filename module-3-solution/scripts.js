(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = '';
  menu.found = [];

  menu.search = function () {
    menu.found = []; 

    if (!menu.searchTerm.trim()) {
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (foundItems) {
      menu.found = foundItems;
    });
  };

  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  };

  menu.showNothingFound = function () {
    if (menu.searchTerm && menu.searchTerm.trim() !== '' && menu.found.length === 0) {
      return true;
    }
    return false;
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (result) {
      var data = result.data;
      var foundItems = [];

      for (var category in data) {
        var items = data[category].menu_items;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push({
              name: item.name,
              short_name: item.short_name,
              description: item.description
            });
          }
        }
      }

      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<',
      onRemove: '&'
    },
    restrict: 'E'
  };
  return ddo;
}

angular.module('NarrowItDownApp').run(function ($templateCache) {
  $templateCache.put('foundItems.html',
    '<div ng-repeat="item in list" class="item">' +
      '<div>' +
        '<strong>{{ item.name }}</strong> ' +
        '({{ item.short_name }}): {{ item.description }}' +
      '</div>' +
      '<button ng-click="onRemove({index: $index})">Don\'t want this one!</button>' +
    '</div>'
  );
});

})();