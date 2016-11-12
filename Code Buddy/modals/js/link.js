var app = angular.module("link", ['ui.bootstrap', "firebase"]);

app.controller('allUsers', ["$scope", '$rootScope', '$firebaseObject', function($scope, $rootScope, $firebaseObject){


    var rootRef = new Firebase('https://dazzling-fire-6299.firebaseio.com/users/');

    $scope.butt = function(){
        console.log(rootRef);
    }

    rootRef.on("value", function(snapshot) {
        console.log(snapshot.val());

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    

}]);
