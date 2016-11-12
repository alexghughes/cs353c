var app = angular.module("codeBuddy", ['ui.bootstrap', "firebase"]);

app.controller('ModalCtrl', function ($scope, authService, $rootScope, $window, $uibModal, $log) {


    // Opens the signIn modal window after button is clicked on User Interface
    $scope.signIn = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'signIn.html',
            controller: 'signInController',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // Opens the signUp modal window after button is clicked on User Interface
    $scope.signUp = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'signUp.html',
            controller: 'signUpController',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    // fast sign in = calls authservice
    $scope.fastSign = function(){

        authService.signIn($scope.email, $scope.password);

    };

 
    


});


app.controller('signInController',["$scope", "authService", function($scope, authService, $uibModalInstance){

    $scope.ok = function () {

        authService.signIn($scope.email, $scope.password);

        // wrap this in a conditional statement
        $scope.$dismiss();


    };

    $scope.cancel = function () {

        $scope.$dismiss();

    };

}]);


app.controller('signUpController',["$scope", "authService", function($scope, authService, $uibModalInstance){

    $scope.ok = function () {
        
        if($scope.password === $scope.passwordConfirm){
            authService.signUp($scope.email, $scope.password);
        }else{
            console.log("Passwords do not match");
        }
        
        // wrap this in a conditional statement
        $scope.$dismiss();


    };

    $scope.cancel = function () {

        $scope.$dismiss();

    };

}]);


app.service('authService', function($window){


    var ref = new Firebase("https://fluentchat.firebaseio.com");

    this.signIn = function(emailIn, passwordIn){

        ref.authWithPassword({
            email: emailIn,
            password: passwordIn
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                var err = error;
                alert(err);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                alert("Sign in was successful");
                $window.location.href = 'profile.html';

            }
            var isNewUser = true;
   var rootref = new Firebase("https://fluentchat.firebaseio.com/");
rootref.onAuth(function(authData) {

  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    rootref.child("users").child(authData.uid).update({
      provider: authData.provider,
      name: getName(authData)
         
    });
      $scope.myProfile = getName(authData);
  }
});
// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}






        });

        return;

    };

    this.signUp = function(emailIn, passwordIn){

        ref.createUser({
            email: emailIn,
            password: passwordIn
        }, function(error, userData) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        console.log("The new user account cannot be created because the email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        console.log("The specified email is not a valid email.");
                        break;
                    default:
                        console.log("Error creating user:", error);
                }
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $window.location.href = 'myaccount.html';

            }
        });
 



    };





});





