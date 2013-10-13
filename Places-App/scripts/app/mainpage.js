var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        result: {
        },
        isResultVisible: false,
        friends: [],
        user: {},
        navigateToUserDetails: function(e) {
            app.userId = e.data.steamid;
            if(app.userId == undefined) {
                app.userId = e.data.user.steamid;
            }
            a.kendo.navigate("views/user-view.html#user-view");
        },
        addFriend: function() {
            var isInFriends = jQuery.inArray(viewModel.result, viewModel.friends);
            if (isInFriends == -1 && viewModel.result.steamid != viewModel.user.steamid) {
                viewModel.friends.push(viewModel.result);
            }
            localStorage.setItem("friends", JSON.stringify(viewModel.friends));
        },
        setUser: function() {
            viewModel.set("user", viewModel.result);
            localStorage.setItem("user", JSON.stringify(viewModel.user));
        }
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);      
       
        var savedUser = localStorage.getItem("user");
        
        if (savedUser != undefined) {
            viewModel.set("user", JSON.parse(savedUser));
            app.userId = viewModel.user.steamid;
        }
        var savedFriends = localStorage.getItem("friends");
        if (savedFriends != undefined) {
            viewModel.set("friends", JSON.parse(savedFriends));
        }
        
        $("#user-submit-btn").click(function(e) {
            app.userId = $("#user-id-input").val();
            httpRequest.getJSON("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + app.appKey 
                                + "&steamids=" + app.userId)
            .then(function (user) {
                var userInfo = {
                    "steamid" : user.response.players[0].steamid,
                    "name" : user.response.players[0].personaname,
                    "profileurl" : user.response.players[0].profileurl,
                    "avatar" : user.response.players[0].avatarmedium,
                    "country" : user.response.players[0].loccountrycode
                };
                viewModel.set("result", userInfo);
                viewModel.set("isResultVisible", true);
            });
            
        });
    }
    
    a.mainpage = {
        init: init
    }
}(app));