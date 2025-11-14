(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (index) {
    ShoppingListCheckOffService.moveToBought(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "milk", quantity: 2 },
    { name: "bread", quantity: 1 },
    { name: "apples", quantity: 6 },
    { name: "chicken", quantity: 3 }
  ];

  var boughtItems = [];

  service.moveToBought = function (index) {
    var item = toBuyItems.splice(index, 1)[0]; 
    boughtItems.push(item); 
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();