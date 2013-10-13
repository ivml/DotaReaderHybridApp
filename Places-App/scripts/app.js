var app = app || {};

(function() {
    document.addEventListener("deviceready", function() {
        app.appKey = "D99603DEF28E9F2914A67C18273F07BB";
        app.userId = "";
        app.matchId = "";
        var kendoApp = new kendo.mobile.Application(document.body);
        app.kendo = kendoApp;
        document.addEventListener("offline", onOffline, false);
        
        var networkState = navigator.network.connection.type;
        if (networkState == "2g" || networkState == "3g") {
            navigator.notification.vibrate(2000);
            navigator.notification.alert("Be careful, this app can drain a lot of data.");
        }
    });
    
    function onOffline() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("You need a connection to use this app.", function() {
            navigator.app.exitApp();
        }, "No connection", "Exit");
    }
}());