var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        matches: [],
        areMatchesAvailable: false,
        navigateToMatch: function(e) {
            a.kendo.navigate("views/categories-view.html#categories-view?match_id=" + e.data.match_id);
        }
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        if (app.userId != "" && app.userId != undefined) {
            httpRequest.getJSON("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + app.appKey + "&account_id=" + app.userId)
            .then(function (matches) {
                viewModel.set("matches", matches.result.matches);
                viewModel.set("areMatchesAvailable", true);
            });
        }
    }

    a.matches = {
        init:init
    };
}(app));