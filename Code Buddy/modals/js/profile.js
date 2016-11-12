var app = angular.module("profile", ['ui.bootstrap', "firebase"]);

app.controller('profile', ["$scope", "profileManagement", '$rootScope', '$firebaseObject', function($scope, profileManagement, $rootScope, $firebaseObject){



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
    var f1status = "";
    var f2userName = "";
    var f2avatar = "";
    var f2status = "";
    var f3userName = "";
    var f3avatar = "";
    var f3status = "";
    var f4userName = "";
    var f4avatar = "";
    var f4status = "";
    var f5userName = "";
    var f5avatar = "";
    var f5status = "";
    var f6userName = "";
    var f6avatar = "";
    var f6status = "";


    function lookupUsers(userId, loop){

        // var firebaseUrl = userId;


        if(loop === 0){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f1userName = objk.username;
                f1avatar = objk.avatar;
                f1status = objk.status;
                $scope.addFriendtoUi(f1userName, f1avatar, f1status, loop);

            });
        }
        if(loop === 1){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f2userName = objk.username;
                f2avatar = objk.avatar;
                f2status = objk.status;
                $scope.addFriendtoUi(f2userName, f2avatar, f2status, loop);

            });
        }
        if(loop === 2){
            $scope.friendsUrl = new Firebase(userId);
            $scope.friendsUrl.on('value', function (snapshot) {

                console.log('Snapshot val', snapshot.val());
                var objk = snapshot.val();
                f3userName = objk.username;
                f3avatar = objk.avatar;
                f3status = objk.status;
                $scope.addFriendtoUi(f3userName, f3avatar, f3status, loop);

            });
        }

    }

    var refStatus = refref.child('accountDetails');

    $scope.postStatus = function(){

        var status = $scope.status;
        console.log(status);
        refStatus.update({status : status});
    }


    // function addFriendtoUi(friendUsername, avatar){
    //
    //     $scope.f1User1= friendUsername;
    //     $scope.avatar1 = avatar;
    //     console.log($scope.f1User1);
    //     console.log($scope.avatar1);
    // }

    $scope.hideMe1 = false;
    $scope.hideMe2 = false;
    $scope.hideMe3 = false;

    $scope.addFriendtoUi = function(friendUsername, avatar, status, loop){

        console.log(loop);
        //profileManagement.friendUserNames(friendUsername);
        if(loop === 0){
            $scope.$apply(function () {
                $scope.fUser1 = friendUsername;
                $scope.fAvatar1 = avatar;
                $scope.status1 = status;
                if(status === ""){
                    $scope.hideMe1 = true;
                }


            });
        }
        if(loop === 1){
            $scope.$apply(function () {
                $scope.fUser2 = friendUsername;
                $scope.fAvatar2 = avatar;
                $scope.status2 = status;
                if(status === ""){
                    $scope.hideMe2 = true;
                }

            });
        }
        if(loop === 2){
            $scope.$apply(function () {
                $scope.fUser3 = friendUsername;
                $scope.fAvatar3 = avatar;
                $scope.status3 = status;
                if(status === ""){
                    $scope.hideMe3 = true;
                }

            });
        }


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




    function logResults(postsData) {

        $scope.arrays = [];
        $scope.newsingle = postsData;

        $scope.arrays.push($scope.newsingle);
        $scope.arrays.toString();
        console.log($scope.arrays);

        var stringy = "";
        stringy = String($scope.arrays);

        stringy.match(/\w+|"[^"]+"/g);
        stringy = stringy.replace(true, " ");
        stringy = stringy.replace(true, " ");
        stringy = stringy.replace(true, " ");
        stringy = stringy.replace(true, " ");
        stringy = stringy.replace(true, " ");
        stringy = stringy.replace(true, " ");

        stringy = stringy.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

        stringy = stringy.split(" ");

        $scope.domainone = stringy[0];
        $scope.domaintwo = stringy[1];
        $scope.domainthree = stringy[2];
        $scope.domainfour = stringy[3];
        $scope.domainfive = stringy[4];
        $scope.domainsix = stringy[5];
        console.log(stringy);

        $scope.newsingle = stringy;

    }



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


    // this.friendUserNames = function(friendIn){
    //
    //     var friend1 = friendIn;
    //
    // }
    //
    // this.legend = function(){
    //
    //     return friend1;
    //
    // }




}]);