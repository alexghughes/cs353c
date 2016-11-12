angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];
  
  $scope.products = [
        { Id: 1, Name: 'Something' },
        { Id: 2, Name: 'Other thing' },
        { Id: 3, Name: 'Another' },
        { Id: 4, Name: 'What?' }
    ];
    $scope.deleteProduct = function(product) {
        alert('product ' + product.Id + ' deleted!');
    };

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

angular.module('plunker').directive('popupConfirm', ['$log', '$modal', function ($log, $modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.bind("click", function(e) {
            var confirmModalInstance = $modal.open({
              templateUrl: 'popupConfirm.html',
              controller: function($scope, $modalInstance) {
                $scope.ok = function () {
                  alert('ok');
                  $modalInstance.close('ok');
                };
                $scope.cancel = function () {
                  alert('cancel');
                  $modalInstance.dismiss('cancel');
                };
              }
            });
          });
        }
    };
}]);
