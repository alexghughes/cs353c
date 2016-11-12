var app = angular.module('avatarApp', ['firebase']);

app.controller('avatarCtrl', ["$scope", "accountService", function($scope, accountService, $window){


    var rootRef = new Firebase('https://fluentchat.firebaseio.com/users/');

    var authData = rootRef.getAuth();

    var authName = authData.uid;
    $scope.namie = authData.uid;

    var placesRef = rootRef.child(authName);


    var newRef = new Firebase('https://fluentchat.firebaseio.com/users/' + authName);
    var imageRef = newRef.child("avatar");



    newRef.on("child_added", function(snapshot) {
        var newPost = snapshot;
        $scope.newPost = newPost.username;
        console.log($scope.newPost);


    });

    $scope.avatar = {
        avatar:{
            value: 'default'
        }
    };

    $scope.addAvatar = function(avatarImage){

        accountService.addAvatar(avatarImage);

    }


}]);

app.controller('profileCtrl', ["$scope", "accountService", function($scope, accountService, $window){


    var rootRef = new Firebase('https://fluentchat.firebaseio.com/');

    var authData = rootRef.getAuth();

    var authName = authData.uid;
    $scope.namie = authData.uid;

    var placesRef = rootRef.child(authName);


    var newRef = new Firebase('https://fluentchat.firebaseio.com/users/' + authName);
    var imageRef = newRef.child("avatar");


    // newRef.on("child_added", function(snapshot) {
    //     var newPost = snapshot;
    //     $scope.newPost = newPost.username;
    //     console.log($scope.newPost);
    //
    //
    // });

    $scope.refImage = imageRef;

    $scope.refImage.on('value', function(snapshot){

        $scope.avatarz = snapshot.val();
        console.log( $scope.avatarz);

    });


    $scope.addDetails = function(){

        var username = $scope.username;
        var occupation = $scope.occupation;
        var location = $scope.location;
        var language = $scope.language;


            if((username !=null) && (occupation !=null) && (location != null) && (language !=null)){
                accountService.addUserName(username);
                accountService.addUserOccupation(occupation);
                accountService.addUserLocation(location);
                accountService.addUserLanguage(language);
            }
            // if(username !=null){
            //     accountService.addUserName(username);
            // }

            if(occupation != null) {
                accountService.addUserOccupation(occupation);
            }

            if(location != null) {
                accountService.addUserLocation(location);
            }

            if(language != null){
                accountService.addUserLanguage(language);
            }


    }

}]);

app.service('accountService', function($window){


    var rootRef = new Firebase('https://fluentchat.firebaseio.com/');

    var authData = rootRef.getAuth();

    var authName = authData.uid;

    var newRef = new Firebase('https://fluentchat.firebaseio.com/users/' + authName);
    var nameRef = newRef.child("accountDetails");
    var imageRef = newRef.child("avatar");


    this.addUserName = function(username){

        nameRef.update({username : username});
        $window.location.href = 'profile.html';

    };
    this.addUserOccupation = function(occupation){

        nameRef.update({occupation : occupation});
        $window.location.href = 'profile.html';

    };
 //   this.addUserLanguage = function(language){

    //    nameRef.update({language : language});
    //    $window.location.href = 'profile.html';

 //   };

    this.addUserLocation = function(location){

        nameRef.update({location : location});
        $window.location.href = 'profile.html';

    };

    this.addAvatar = function(avatarImage){

        imageRef.set(avatarImage);
        nameRef.update({avatar : avatarImage})
        $window.location.href = 'profile.html';

    };



});











