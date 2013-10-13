var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        user: {},
        isUserVisible: false,
        navigateToMatches: function(e) {
            app.userId = e.data.user.steamid;
            a.kendo.navigate("views/matches-list-view.html#matches-view");
        },
        saveAvatar: function(e) {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50, 
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: 100,
                targetHeight: 100,
                encodingType: Camera.EncodingType.JPEG,
            }); 

            function onSuccess(imageURI) {
                /* var image = document.getElementById('myImage');
                image.src = imageURI;*/
                var localUserJSON = localStorage.getItem("user");
                var localUser = JSON.parse(localUserJSON);
                var localFriendsJSON = localStorage.getItem("friends");
                var localFriends = JSON.parse(localFriendsJSON);
                
                if (viewModel.user.steamid == localUser.steamid) {
                    localUser.avatar = imageURI;
                    viewModel.set("user", localUser);
                    localStorage.setItem("user", JSON.stringify(viewModel.user));
                }
                else {
                    var len = localFriends.length;
                    for (var i = 0; i < len; i++) {
                        if (localFriends[i].steamid == viewModel.user.steamid) {
                            localFriends[i].avatar = imageURI;
                            viewModel.set("user", localFriends[i]);
                            localStorage.setItem("friends", JSON.stringify(localFriends));
                            break;
                        }
                    }
                }
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        var localUserJSON = localStorage.getItem("user");
        var localUser = JSON.parse(localUserJSON);
        var localFriendsJSON = localStorage.getItem("friends");
        var localFriends = JSON.parse(localFriendsJSON);
        if (app.userId != "" && app.userId != undefined) {
            if (app.userId == localUser.steamid) {
                viewModel.set("user", localUser);
                viewModel.set("isUserVisible", true);
            }
            else {
                if (localFriends != undefined) {
                    var len = localFriends.length;
                    for (var i = 0; i < len; i++) {
                        if (localFriends[i].steamid == app.userId) {
                            viewModel.set("user", localFriends[i]);
                            viewModel.set("isUserVisible", true);
                            break;
                        }
                    }
                }
            }
        }
    };

    a.users = {
        init:init          
    };
}(app)
);