var app = angular.module("friends", ['ui.bootstrap', "firebase"]);

app.controller('friendsCtrl', ["$scope", "profileManagement", '$rootScope', '$firebaseObject', function($scope, profileManagement, $rootScope, $firebaseObject){



    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);

        } else {
            console.log("User is logged out");
        }

    }



    // Register the callback to be fired every time auth state changes
    var ref = new Firebase("https://dazzling-fire-6299.firebaseio.com/");
    ref.onAuth(authDataCallback);

    $scope.ref2 = new Firebase("https://dazzling-fire-6299.firebaseio.com/users/");


    var authData = $scope.ref2.getAuth();
    var authName = authData.uid;
    $scope.myname = authData.password.email;
    $scope.myProfile = authData.password.email;



    var refref = $scope.ref2.child(authName);


    // pull avatar location from the database and display on the user profile
    $scope.refImage = refref.child('avatar');

    $scope.refImage.on('value', function(snapshot){

        $scope.thismightwork = snapshot.val();
        //console.log( $scope.thismightwork);

    });

    $scope.userProfile = refref.child('accountDetails');

    $scope.userProfile.on('value', function(snapshot){

        var obj = snapshot.val();
        $scope.myProfile = obj.username;
        $scope.myLanguage = "First Language : " + obj.language;
        var flagAddress = "./flags/" + obj.language + ".png";
        $scope.languageFlag = flagAddress;
        $scope.myLocation = "Location : " + obj.location;
        $scope.myOccupation = "Occupation : " + obj.occupation;
        console.log($scope.myProfile);

    });



    $scope.userFriends = refref.child('friends');

    var isCheck = false;

    $scope.userFriends.on('value', function (snapshot) {

        //console.log('Snapshot val', snapshot.val());

        var objj = snapshot.val();
        var friend1 = objj.friend1;
        var friend1Url = profileManagement.friendsUrl(friend1);
        profileManagement.friendsDetails(friend1Url);

        var friend2 = objj.friend2;
        var friend2Url = profileManagement.friendsUrl(friend2);
        profileManagement.friendsDetails(friend2Url);

        var friend3 = objj.friend3;
        var friend3Url = profileManagement.friendsUrl(friend3);
        profileManagement.friendsDetails(friend3Url);

        var friend4 = objj.friend4;
        var friend4Url = profileManagement.friendsUrl(friend4);
        profileManagement.friendsDetails(friend4Url);

        var friend5 = objj.friend5;
        var friend5Url = profileManagement.friendsUrl(friend5);
        profileManagement.friendsDetails(friend5Url);

        var friend6 = objj.friend6;
        var friend6Url = profileManagement.friendsUrl(friend6);
        profileManagement.friendsDetails(friend6Url);

        var friendsArray = profileManagement.returnArray();
        console.log('friends aray', friendsArray);
        for (i = 0, len = friendsArray.length; i < len; i++) {
            lookupUsers(friendsArray[i], i);
            console.log('Friend ' + i + ' : ' + friendsArray[i]);
        }

    });

    var usersArray = [];


    usersArray = profileManagement.returnArray();
    console.log(usersArray);
    lookupUsers(usersArray);

    var f1userName = "";
    var f1avatar = "";
    var f2userName = "";
    var f2avatar = "";
    var f3userName = "";
    var f3avatar = "";
    var f4userName = "";
    var f4avatar = "";
    var f5userName = "";
    var f5avatar = "";
    var f6userName = "";
    var f6avatar = "";


    function lookupUsers(userId, loop){

        // var firebaseUrl = userId;


        if(loop === 0){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f1userName = objk.username;
                f1avatar = objk.avatar;
                $scope.addFriendtoUi(f1userName, f1avatar, loop);

            });
        }
        if(loop === 1){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f2userName = objk.username;
                f2avatar = objk.avatar;
                $scope.addFriendtoUi(f2userName, f2avatar, loop);

            });
        }
        if(loop === 2){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f3userName = objk.username;
                f3avatar = objk.avatar;
                $scope.addFriendtoUi(f3userName, f3avatar, loop);

            });
        }
        if(loop === 3){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f4userName = objk.username;
                f4avatar = objk.avatar;
                $scope.addFriendtoUi(f4userName, f4avatar, loop);

            });
        }
        if(loop === 4){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f5userName = objk.username;
                f5avatar = objk.avatar;
                $scope.addFriendtoUi(f5userName, f5avatar, loop);

            });
        }
        if(loop === 5){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f6userName = objk.username;
                f6avatar = objk.avatar;
                $scope.addFriendtoUi(f6userName, f6avatar, loop);

            });
        }

    }



    $scope.addFriendtoUi = function(friendUsername, avatar, loop){

        console.log(loop);
        //profileManagement.friendUserNames(friendUsername);
        if(loop === 0){
            $scope.$apply(function () {
                $scope.friendName1 = friendUsername;
                $scope.Avatar1 = avatar;
            });
        }
        if(loop === 1){
            $scope.$apply(function () {
                $scope.friendName2 = friendUsername;
                $scope.Avatar2 = avatar;
            });
        }
        if(loop === 2){
            $scope.$apply(function () {
                $scope.friendName3 = friendUsername;
                $scope.Avatar3 = avatar;
            });
        }
        if(loop === 3){
            $scope.$apply(function () {
                $scope.friendName4 = friendUsername;
                $scope.Avatar4 = avatar;
            });
        }
        if(loop === 4){
            $scope.$apply(function () {
                $scope.friendName5 = friendUsername;
                $scope.Avatar5 = avatar;
            });
        }
        if(loop === 5){
            $scope.$apply(function () {
                $scope.friendName6 = friendUsername;
                $scope.Avatar6 = avatar;
            });
        }




        console.log($scope.stringy);
        $scope.avatar1 = avatar;
        console.log($scope.avatar1);

    }


    
    var userFriends = refref.child('friends');

    $scope.refdomains = refref.child('domains');
    $scope.objectthing = $firebaseObject($scope.refdomains);
    

    var keys = Object.keys($scope.objectthing);
    
    $scope.newestthing = $scope.objectthing.key;


    $scope.refdomains.on("value", function(snapshot) {

        $scope.mydomains = snapshot.val();
        $scope.turntostringone = JSON.stringify($scope.mydomains);
        // console.log($scope.turntostringone);
        logResults($scope.turntostringone);

    });

    
    $scope.signOut = function () {

        profileManagement.signOut();

    };




}]);




app.service('profileManagement', ['$firebaseObject', '$firebaseArray', '$rootScope', '$window', function($firebaseObject, $firebaseArray, $rootScope, $window){

    var root = new Firebase("https://dazzling-fire-6299.firebaseio.com");
    var rootUsers = new Firebase("https://dazzling-fire-6299.firebaseio.com/users/");

    var authData = rootUsers.getAuth();
    var authName = authData.uid;

    var friendsUid = [];



    this.signOut= function(){

        root.unauth();
        console.log("User logged out.");
        $window.location.href = 'index.html';

    };

    // pull user profile information from Database and display on the user profile


    this.friendsUrl = function(friendID){

        var urlFriend = "https://dazzling-fire-6299.firebaseio.com/users/" + friendID + "/accountDetails";

        //console.log(urlFriend);
        return urlFriend;

    };

    this.friendsDetails = function(friendUrl){


        friendsUid.push(friendUrl);
        //friendsUid = Array.prototype.push(friendUrl);
        //friendsUid.splice(i, 0, friendUrl);


    };


    this.returnArray = function(){

        console.log(friendsUid);
        return friendsUid;

    };





}]);