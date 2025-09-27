var messageField;		//Message display field

var assets = [];
var choiceArr = [];
var choiceMcArr = []
var textArr = []
var qno = [];
var strArr = []
var chpos = [];
var getChar = [];
var quesMcArr = []

var clueMcArr = [];
var clueArr = []

var choiceArrScale
var cnt = -1, ans, qscnt = -1, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, circleOutline, chHolderMC, choice1, choice2, choice3, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, bandMc, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var nameArr = ["dear", "silent", "cheat", "searcher", "porter",
    "renal", "dusty", "tower", "cautioned", "ward",
    "broad", "grained", "moor", "chorals",
    "bleats"];
var words_arry = ["read", "listen", "teach", "research", "report",
    "learn", "study", "wrote", "education", "draw",
    "board", "reading", "room", "scholar",
    "tables"];


var maxLetterCnt = 13
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = ["178.3", "288.3", "398.3", "508.3", "618.3", "728.3", "688.3", "288.3", "338.3", "418.3", "498.3", "578.3"];
var btnY = ["497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "567.1", "567.1", "567.1", "567.1", "567.1"];
var rand1 = []
var btnPaddArr = ["", "", "", "365", "335", "305", "275", "245", "215", "185"]
var indx = []
var btnPadding = 50
var btnTxtPaddding = 483
var repTimeClearInterval = 0
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var cLen;
var QusTxtString
var questionTextMC;
var isBgSound = true;
var isEffSound = true;
var currentX, currentY
var currentObj = []
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;

var lastW, lastH, lastS = 1;

var borderPadding = 10, barHeight = 20;

var loadProgressLabel, progresPrecentage, loaderWidth;


///////////////////////////////////////////////////////////////////
window.onload = function (e) {
    checkBrowserSupport();
}
///////////////////////////////////////////////////////////////////

function init() {

    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    container = new createjs.Container();
    stage.addChild(container)
    createjs.Ticker.addEventListener("tick", stage);

    loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
    loaderBar = new createjs.Container();
    var txt = new createjs.Container();
    bar = new createjs.Shape();
    bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 300;
    callLoader();
    createLoader()
    createCanvasResize()

    stage.update();
    stage.enableMouseOver(40);
    ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

    /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "Anagrams-Schools/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

           
            { id: "chHolder",src: questionTextPath + "Anagrams-Schools-QT1.png" },
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "QusTxtString", src: questionTextPath + "Anagrams-Schools-QT.png" },
            { id: "clueMc", src: gameAssetsPath + "clueImages.png" }


        )
        preloadAllAssets()
        stage.update();
    }

}

//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();

    if (id == "QusTxtString") {
        QusTxtString = new createjs.Bitmap(preload.getResult('QusTxtString'));
        container.parent.addChild(QusTxtString)
        QusTxtString.visible = false;
    }
  

    if (id == "choice1") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 146, "count": 64, "regY": 50, "width": 174 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        choice1 = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(choice1);
        choice1.visible = false;

    }

    if (id == "clueMc") {
        var clueSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("clueMc")],
            "frames": { "regX": 50, "height": 107, "count": 0, "regY": 50, "width": 120 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        clueMc = new createjs.Sprite(clueSpriteSheet);
        container.parent.addChild(clueMc);
        clueMc.visible = false;

    }

    if (id == "chHolder") {
        chHolderMC = new createjs.Bitmap(preload.getResult('chHolder'));
        container.parent.addChild(chHolderMC)
        chHolderMC.visible = false;
    }


}

function tick(e) {

    stage.update();
}


/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
    qno = between(0, 14);
    qno.splice(qno.indexOf(9), 1)
    CreateGameStart()
    if (gameType == 0) {
        CreateGameElements()
        getStartQuestion();
    } else {
        //for db
        getdomainpath()
        //end
    }

}

function CreateGameElements() {
    interval = setInterval(countTime, 1000);


    container.parent.addChild(QusTxtString);
    QusTxtString.visible = false;

    chHolderMC.visible = false;
    chHolderMC.y = chHolderMC.y - 7
    container.parent.addChild(chHolderMC, question);
    for (i = 0; i < maxLetterCnt; i++) {
        clueMcArr[i] = new createjs.MovieClip();
        container.parent.addChild(clueMcArr[i]);
        clueArr[i] = clueMc.clone();
        clueMcArr[i].addChild(clueArr[i])
        clueArr[i].gotoAndStop(26);
        clueArr[i].visible = false;
        clueArr[i].x = 355 + (i * 70) - 14;
        clueArr[i].y = 490;
    }

    container.parent.addChild(choice1);
    choice1.visible = false;

    for (i = 0; i < maxLetterCnt; i++) {
        choiceArr[i] = choice1.clone()
        choiceArr[i].scaleX = choiceArr[i].scaleY = .8;
        choiceArr[i].visible = false;
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].x = 205 + (i * 120);
        choiceArr[i].y = 620;
    }


}

function helpDisable() {
    for (i = 0; i < cLen; i++) {
        choiceMcArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < cLen; i++) {
        choiceMcArr[i].mouseEnabled = true;
    }
}
//=================================================================================================================================//
function pickques() {
    pauseTimer()

    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = [];
    strArr = [];
    getChar = []
    currentObj = []
    lCnt = -1;
    cLen = 0;
    panelVisibleFn()

    //==========================================================================================//
    chHolderMC.visible = true;
    QusTxtString.visible = true;
    wrdCnt = -1;

    isCorrect = "";
    chHolderMC.visible = true;
    correctAnswer = words_arry[qno[cnt]];

    question = new createjs.Text(nameArr[qno[cnt]], "70px Lato-Bold", "#2f8c62");
    question.textAlign = "center";
    question.textBaseline = "middle";
    question.x = 640;
    question.y = 270;
    question.visible = true;
    container.parent.addChild(question);

    ans = correctAnswer;


    console.log("correct3Answer= " + correctAnswer)
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}

function enablechoices() {
    var setRandArr = [];
    rand1 = []
    var getStr = nameArr[qno[cnt]];
    console.log("getStr=" + getStr)

    cLen = getStr.length;
    rand1 = between(0, cLen - 1)
    for (i = 0; i < cLen; i++) {
        getChar[i] = getStr.charAt(i).toString().toUpperCase();

    }
    getStr = correctAnswer
    for (i = 0; i < cLen; i++) {
        getChar[i] = getStr.charAt(i).toString().toUpperCase();
        indx[i] = alphabetArr.indexOf(getChar[i])
    }


    for (i = 0; i < cLen; i++) {
        choiceArr[rand1[i]].gotoAndStop(indx[i])
        choiceArr[i].visible = true
        choiceArr[rand1[i]].name = getChar[i]

        choiceArr[i].y = 600;
        clueArr[i].gotoAndStop(26);
        clueArr[i].visible = false;
        clueArr[i].y = 445;
        clueArr[i].scaleX = clueArr[i].scaleY = 1
    };
    choiceArrScale = .8
    for (i = 0; i < cLen; i++) {

        if (cLen == 2) {
            clueArr[i].x = 585 + (i * 90) - 14;
            choiceArr[i].x = 430 + (i * 175);

        }

        if (cLen == 3) {
            clueArr[i].x = 510 + (i * 120) ;
            choiceArr[i].x = 430 + (i * 175);

        }
        if (cLen == 4) {
            clueArr[i].x = 465 + (i * 110);
            choiceArr[i].x = 340 + (i * 175);

        }
        if (cLen == 5) {
            clueArr[i].x = 410 + (i * 110) ;
            choiceArr[i].x = 230 + (i * 185);

        }
        if (cLen == 6) {
            clueArr[i].x = 370 + (i * 110) - 14;
            choiceArr[i].x = 165 + (i * 175);

        }
        if (cLen == 7) {
            clueArr[i].x = 320 + (i * 110) - 14;
            choiceArr[i].x = 92 + (i * 170);

        }
        if (cLen == 8) {
            clueArr[i].x = 260 + (i * 110) - 14;
            choiceArr[i].x = 77 + (i * 150);

        }

        if (cLen == 9) {

            choiceArrScale = .7
            clueArr[i].x = 210 + (i * 110) - 14;
            choiceArr[i].x = 43 + (i * 140);
         // choiceArr[i].scaleX = choiceArr[i].scaleY = .6;
            // choiceArr[i].scaleX = choiceArr[i].scaleY = .5;
         // clueArr[i].scaleX = clueArr[i].scaleY = 1;
        }
        if (cLen == 10) {
            choiceArrScale = .7
            choiceArr[i].scaleX = choiceArr[i].scaleY = .7;
            clueArr[i].scaleX = clueArr[i].scaleY = 1
            clueArr[i].x = 388 + (i * 63) - 14;
            choiceArr[i].x = 65 + (i * 120);

        }
        if (cLen == 11) {
            // choiceArrScale = .65
            choiceArr[i].scaleX = choiceArr[i].scaleY = .65;
            clueArr[i].scaleX = clueArr[i].scaleY = 1
            clueArr[i].x = 358+ (i * 63) - 14;
            choiceArr[i].x = 35 + (i * 114);

        }
        if (cLen == 12) {
            choiceArrScale = .65
            choiceArr[i].scaleX = choiceArr[i].scaleY = .65;
            clueArr[i].scaleX = clueArr[i].scaleY = 1
            clueArr[i].x = 326 + (i * 63) - 14;
            choiceArr[i].x = 28 + (i * 105);

        }
        if (cLen == 13) {
            choiceArrScale = .58
            choiceArr[i].scaleX = choiceArr[i].scaleY = .58;
            clueArr[i].scaleX = clueArr[i].scaleY = 1
            clueArr[i].x = 295 + (i * 63) - 14;
            choiceArr[i].x = 27 + (i * 97);

        }
    }

    for (i = 0; i < cLen; i++) {
        choiceArr[i].visible = true
        choiceArr[i].id = i
        choiceArr[i].alpha = 1;
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].cursor = "pointer";
    }


    createTween()

    question.Text = "";

}
function createTween() {

    chHolderMC.visible = true;
    chHolderMC.alpha = 0
    createjs.Tween.get(chHolderMC).wait(300).to({ alpha: 1 }, 300)

    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    for (i = 0; i < cLen; i++) {
        clueArr[i].visible = true;
        clueArr[i].alpha = 0
        createjs.Tween.get(clueArr[i]).wait(1000)
            .to({ alpha: 1 }, 1000)
    }

    ///////////////////////////choice tween////////////////////////////////////


    var val = 700
    for (i = 0; i < cLen; i++) {
        choiceArr[i].y = 570, choiceArr[i].x = choiceArr[i].x + 10;
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        createjs.Tween.get(choiceArr[i]).wait(val).to({ y: 600, scaleX: choiceArrScale, scaleY: choiceArrScale, alpha: 1 }, val)
        val = val + 150
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3000)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
    for (i = 0; i < cLen; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
    }


    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
//================================================//
function getCompareArray(aArr, aArr1) {
    var arr = []
    for (var i = 0; i < aArr.length; i++) {
        for (var j = 0; j < aArr1.length; j++) {
            if (aArr[i] == aArr1[j]) {
                aArr.splice(i, 1);
            }
        }
    }
    arr = aArr
    console.log("arr= " + arr)
    return arr
}
//===============================================//
function disablechoices() {
    for (i = 0; i < cLen; i++) {
        choiceArr[i].removeEventListener("click", answerSelected)

        choiceArr[i].cursor = "default";
        clueArr[i].visible = false;
        choiceArr[i].visible = false;

    }
    question.visible = false
    chHolderMC.visible = false;

    //============================================//
    closeBtn.mouseEnabled = false;
    fullScreenBtn.mouseEnabled = false;
    volumeBtn.mouseEnabled = false;
}


function answerSelected(e) {
    e.preventDefault();
    lCnt++;
    uans = e.currentTarget.name;
    console.log("uans= " + uans)
    e.currentTarget.mouseEnabled = false;
    e.currentTarget.alpha = 0.5;
    e.currentTarget.cursor = "default";

    strArr.push(uans);
    var str1 = uans;
    var indAnsVal = alphabetArr.indexOf(str1);
    clueArr[lCnt].gotoAndStop(indAnsVal);


    gameResponseTimerStop();
    // pauseTimer();

    if (getChar[lCnt] == str1) {

        currentObj[lCnt] = e.currentTarget.id;

        if (cLen == strArr.length) {
            setTimeout(correct,500)
        }
    }
    else {
        disablechoices();
        getValidation("wrong");

    }
}

function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < cLen; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function enableMouse() {
    for (i = 0; i < cLen; i++) {

        var curName = choiceArr[i].id
        if (currentObj.indexOf(curName) == -1)
            choiceArr[i].mouseEnabled = true;
    }
}

//===============================================================================================//



