/////////////////////////////////////////////////////////////

var attributeArr = []

var http = new XMLHttpRequest();

var http1 = new XMLHttpRequest();

var ldr = new XMLHttpRequest();

var upath;

var upath1;

var upath2;

var upath3;

var i1, i2, i3, i4, i5, i6, i7;
var uv1, uv2, uv3, uv4;

var xmlDoc1

var timer_status=1;

var question_count=10;

var getAnagramScope = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this);

if (typeof getAnagramScope.detectAnagramGameName !== "function") {
    getAnagramScope.detectAnagramGameName = function detectAnagramGameName(defaultName) {
        var scope = getAnagramScope || {};

        if (scope && typeof scope.ANAGRAM_GAME_NAME_OVERRIDE === "string") {
            return scope.ANAGRAM_GAME_NAME_OVERRIDE;
        }

        if (scope && typeof scope.gameName === "string" && scope.gameName.indexOf("Anagrams-") === 0) {
            return scope.gameName;
        }

        var path = scope.location && typeof scope.location.pathname === "string" ? scope.location.pathname : "";
        if (path) {
            var segments = path.split("/");
            for (var idx = segments.length - 1; idx >= 0; idx--) {
                var segment = segments[idx];
                if (segment && segment.indexOf("Anagrams-") === 0) {
                    return segment;
                }
            }
        }

        var doc = scope.document;
        if (doc && typeof doc.getElementsByTagName === "function") {
            var scripts = doc.getElementsByTagName("script");
            for (var i = scripts.length - 1; i >= 0; i--) {
                var src = scripts[i] && scripts[i].src ? scripts[i].src : "";
                if (!src) {
                    continue;
                }
                var match = src.match(/\/(Anagrams-[^\/]+)\//i);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }

        return typeof defaultName === "string" && defaultName ? defaultName : "Anagrams-Body";
    };
}

var GET_DEFAULT_GAME_NAME = "Anagrams-Body";
var detectedGameName = typeof getAnagramScope.detectAnagramGameName === "function"
    ? getAnagramScope.detectAnagramGameName(GET_DEFAULT_GAME_NAME)
    : GET_DEFAULT_GAME_NAME;

var game_name="gname='" + detectedGameName + "'";

/////////////////////////////////////////////////////////////

function getdomainpath() {
    console.log("in")
    ldr.onreadystatechange = function () {
        console.log("ldr=" + ldr.readyState + "=" + ldr.status)
        if (ldr.status != 200) {
            getdomainpath();
        }
        if (ldr.readyState == 4 && ldr.status == 200) {
            xmlDoc1 = ldr.responseText;

            var data = JSON.parse(xmlDoc1);
            upath = data.baseurl;
            upath1 = data.scoreupdate;
            upath2 = data.get_info;
            upath3 = data.path;
           
            console.log("data=" + data)
            CreateGameInfo();
            CreateGameElements()
            tx = 1;
        }
    }

    ldr.open("POST", Base_url, true);
	console.log("Base_url= "+Base_url)
   // ldr.open("POST", "http://localhost/SBC/gamedb/dnp1.json", true);
    ldr.send();

}


function CreateGameInfo(){

	

    var url =upath2;

    var params =game_name;

    http.open("POST", url, true);

    //Send the proper header information along with the request

    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");



    http.onreadystatechange = function () {//Call a function when the state changes.

        if (http.readyState == 4 && http.status == 200) {

            var Data = JSON.parse(http.responseText);

            console.log(http.responseText);
        
            console.log("get Data=1 "+Data.gameinfo['gameid'])
            console.log("get Data=1 "+Data.gameinfo['skillid'])
           
            sid=Data.gameinfo['skillid'];

            gid=Data.gameinfo['gameid'];
            puzzle_cycle=Data.gameinfo['puzzle_cycle'];
            i1 = Data.gameinfo['qcnts'];
            i2 = Data.gameinfo['timerval'];
            i3 = Data.gameinfo['qvalues'];
            i4 = Data.gameinfo['scores'];
            i5 = Data.gameinfo['crtcnt'];
            i6 = Data.gameinfo['rsptime'];
            i7 = Data.gameinfo['puzzle_cycle'];

           getStartQuestion();
        

        }

    }

    http.send(params);

}