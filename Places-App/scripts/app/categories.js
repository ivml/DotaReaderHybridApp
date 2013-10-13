var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        result: {},
        currentHero: {},
        isCurrentHeroVisible: false,
        getHeroDetails: function(e) {
            /*app.matchId = $(".navigate-match-btn").text();*/
            if (viewModel.currentHero != e.data) {
                viewModel.set("currentHero", e.data);
                viewModel.set("isCurrentHeroVisible", true);
            }
            else {
                viewModel.set("isCurrentHeroVisible", !viewModel.isCurrentHeroVisible);
            }
            $("#modalview-login").kendoMobileModalView("open");
        }
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        httpRequest.getJSON("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=" + app.appKey + "&match_id=" + e.view.params.match_id)
        .then(function (match) {
            var winner = match.result.radiant_win;
            if (winner) {
                winner = "Radiant win";
                document.getElementById("game-winner").style.color = "green";
            }
            else {
                winner = "Dire win";
                document.getElementById("game-winner").style.color = "red";
            }
            
            var timeSeconds = match.result.duration;
            var minutes = Math.floor(timeSeconds / 60);
            timeSeconds = timeSeconds - (minutes * 60);
            
            var matchDateSeconds = match.result.start_time;
            var matchDate = new Date();
            matchDate.setTime(0);
            matchDate.setUTCSeconds(matchDateSeconds);
            var matchDateStr = matchDate.toUTCString();
            
            var players = match.result.players;
            var radiantHeroes = [];
            
            var direHeroes = [];
            for (var i = 0; i < 5; i++) {
                var heroId = players[i].hero_id;
                for (var id in heroes) {
                    if (heroes[id].id == heroId) {
                        var hero = heroes[id];
                        hero.kills = players[i].kills;
                        hero.deaths = players[i].deaths;
                        hero.assists = players[i].assists;
                        hero.last_hits = players[i].last_hits;
                        hero.denies = players[i].denies;
                        hero.gold_per_min = players[i].gold_per_min;
                        hero.xp_per_min = players[i].xp_per_min;
                        hero.gold_spent = players[i].gold_spent;
                        hero.level = players[i].level;
                        hero.account_id = players[i].account_id;
                        radiantHeroes.push(hero);
                    }
                }
            }
            
            for (var i = 5; i < 10; i++) {
                var heroId = players[i].hero_id;
                for (var id in heroes) {
                    if (heroes[id].id == heroId) {
                        var hero = heroes[id];
                        hero.kills = players[i].kills;
                        hero.deaths = players[i].deaths;
                        hero.assists = players[i].assists;
                        hero.last_hits = players[i].last_hits;
                        hero.denies = players[i].denies;
                        hero.gold_per_min = players[i].gold_per_min;
                        hero.xp_per_min = players[i].xp_per_min;
                        hero.gold_spent = players[i].gold_spent;
                        hero.level = players[i].level;
                        hero.account_id = players[i].account_id;
                        direHeroes.push(hero);
                    }
                }
            }
            
            var gameMode = match.result.game_mode;
            switch (gameMode) {
                case 1:
                    gameMode = "All pick";
                    break;
                case 2:
                    gameMode = "Captains Mode";
                    break;
                case 3:
                    gameMode = "Random Draft";
                    break;
                case 4:
                    gameMode = "Single Draft";
                    break;
                case 5:
                    gameMode = "All Random";
                    break;
                case 6:
                    gameMode = "Unknown";
                    break;
                case 7:
                    gameMode = "Unknown";
                    break;
                case 8:
                    gameMode = "The Diretide";
                    break;
                case 9:
                    gameMode = "Reverse Captains Mode";
                    break;
                case 10:
                    gameMode = "Greeviling";
                    break;
                case 11:
                    gameMode = "Tutorial";
                    break;
                case 12:
                    gameMode = "Mid Only";
                    break;
                case 13:
                    gameMode = "Least Played";
                    break;
                default:
                    gameMode = "New Player Pool";
            }
            console.log(radiantHeroes);
            
            var matchInfo = {
                "match_id" : match.result.match_id.toString(),
                "radiantHeroes" : radiantHeroes,
                "direHeroes" : direHeroes,
                "duration" : minutes + " minutes, " + timeSeconds + " seconds",
                "winner": winner,
                "game_mode": gameMode,
                "date": matchDateStr
            };
            viewModel.set("result", matchInfo); 
            viewModel.set("isCurrentHeroVisible", false);
        });
    }
    
    a.categories = {
        init:init          
    };
}(app));