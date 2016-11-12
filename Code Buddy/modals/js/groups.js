var app = angular.module('plunker', ['firebase']);

app.controller('MainCtrl', function($scope, $firebase, $window) {


  
  $scope.list = {
      English: 'English',
      French: 'French',
      German: 'German',
      Irish: 'Irish',
      Spanish: 'Spanish',
      Italian: 'Italian',

    
  };

  var rootRef = new Firebase('https://fluentchat.firebaseio.com/users/');



  var authData = rootRef.getAuth();
  console.log(authData.uid);
  var authName = authData.uid;
  $scope.namie = authData.uid;

  var placesRef = rootRef.child(authName);
  

  var newRef = new Firebase('https://fluentchat.com/users/' + authName);


  newRef.on("child_added", function(snapshot) {

    var newPost = snapshot;
    $scope.newPost = newPost.username;
    console.log($scope.newPost + " hello");

  });


 


  $scope.chooseLanguage = function(languages) {
    
    console.log(languages);
    newRef.update(languages);
    $window.location.href = 'profile.html';

  }


  $scope.languageChoices = {};
  

});


