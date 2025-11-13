///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 2, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var index;
var j = 1;
var cluetext, ques
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qarr = [];
var alphaArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var quesArr = ["adjacent", "acoustic", "adequate", "affinity", "almighty", "arrogant", "backfire", "betrayal", "blissful", "bookworm", "brochure", "campfire",
    "category", "cheerful", "comedian", "commerce", "conquest", "contract", "converge", "criteria", "critique", "decision", "dedicate", "delegate", "dispatch",
    "disclaim", "diagnose", "economic", "elevator", "explicit", "festival", "foretell", "fragrant", "glossary", "goodwill", "headline", "illusion",
    "kindness", "landmark", "merciful", "mildness", "notation", "obedient", "opponent", "override", "particle", "pedagogy", "punctual", "quadrant", "rattling",
    "sampling", "singular", "teamwork", "tolerant", "ultimate"];

var choiceArr = []
var tweenMcArr = []
var btn1 = [100, 200, 350, 500, 650];
var btn2 = [80, 230, 380, 530, 680];

///////////////////////////////////////////////////////////////////
//register key functions
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
    gameAssetsPath = "MissingLetter-Level4/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "choice1", src: gameAssetsPath + "anskey.png" },
            { id: "cluetext", src: gameAssetsPath + "clueText.png" },
            { id: "introClueText", src: gameAssetsPath + "introClueText.png" },
            { id: "quekey", src: gameAssetsPath + "quekey.png" },
            { id: "QusTxtString", src: questionTextPath + "MissingLetter-Level4-QT.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;


    if (id == "introClueText") {
        introClueText = new createjs.Bitmap(preload.getResult('introClueText'));
        container.parent.addChild(introClueText)
        introClueText.visible = false;

    }

    if (id == "QusTxtString") {
        QusTxtString = new createjs.Bitmap(preload.getResult('QusTxtString'));
        container.parent.addChild(QusTxtString)
        QusTxtString.visible = false;

        questiontext = new createjs.Bitmap(preload.getResult('QusTxtString'));
        container.parent.addChild(questiontext);
        questiontext.visible = false;
    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 175, "count": 0, "regY": 50, "width": 179 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;
        choice1.x = 200; choice1.y = 450;
    };


    if (id == "quekey") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("quekey")],
            "frames": { "regX": 50, "height": 141, "count": 0, "regY": 50, "width": 144 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        quekey = new createjs.Sprite(spriteSheet1);
        quekey.visible = false;
        quekey.scaleX = quekey.scaleY = .5
        container.parent.addChild(quekey);
    };

    if (id == "cluetext") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("cluetext")],
            "frames": { "regX": 50, "height": 106, "count": 0, "regY": 50, "width": 449 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        cluetext = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(cluetext);
        cluetext.visible = false;
        cluetext.scaleX = cluetext.scaleY = 1.1
    };


}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 54);
    console.log("quesArr= " + quesArr)
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
    container.parent.addChild(questiontext);
    questiontext.visible = false;
    container.parent.addChild(cluetext);
    cluetext.visible = false;
    cluetext.x = 450; cluetext.y = 415;
    for (i = 0; i < 8; i++) {
        qarr[i] = quekey.clone();
        container.parent.addChild(qarr[i])
        qarr[i].scaleX = qarr[i].scaleY = .9
        qarr[i].x = 180 + (i * 130)//btn1[i];
        qarr[i].y = 250;
    }
    for (i = 0; i < 5; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i])
        choiceArr[i].visible = false
        choiceArr[i].x = btn2[i] + 230;
        choiceArr[i].y = 585;
        choiceArr[i].scaleX = choiceArr[i].scaleY = .75;
    }

}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    ansRemovedArr = [];
    panelVisibleFn();

    ques = quesArr[qno[cnt]];
    cluetext.gotoAndStop(qno[cnt]);
    var ran = Math.floor(Math.random() * 5);
    var len = 8;

    for (i = 0; i < len; i++) {
        ch = ques.charAt(i)
        index = alphaArr.indexOf(ch);
        if (i == ran) {
            ans = ch;
            console.log("ans" + ans)
            qarr[i].gotoAndStop(26);

        }
        else {
            qarr[i].gotoAndStop(index);
        }
        qarr[i].visible = true;

    }
    farr = [];

    index = alphaArr.indexOf(ans);
    for (i = 0; i < 26; i++) {
        if (i != index) {
            ansRemovedArr.push(alphaArr[i]);
        }
    }

    ansRemovedArr.sort(randomSort)
    // console.log("ans= "+ans)
    farr.push(ans, ansRemovedArr[0], ansRemovedArr[1], ansRemovedArr[2], ansRemovedArr[3]);
    farr.sort(randomSort);
    enablechoices();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 0; i < 5; i++) {
        var index = alphaArr.indexOf(farr[i]);
        choiceArr[i].gotoAndStop(index);
        choiceArr[i].name = alphaArr[index];
        choiceArr[i].visible = false;
        choiceArr[i].alpha = 1;
        choiceArr[i].cursor = "pointer";
        choiceArr[i].mouseEnabled = false
    }
    createTween();
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////    
    questiontext.visible = true
    questiontext.alpha = 0;
    createjs.Tween.get(questiontext).wait(200)
        .to({ alpha: 1, y: 25 })
    /////////////////////////////////////
    for (i = 0; i < 8; i++) {
        qarr[i].visible = true;
        qarr[i].alpha = 0;
        createjs.Tween.get(qarr[i]).wait(500).to({ scaleX: .85, scaleY: .85, alpha: 1 }, 500)
            .to({ scaleX: .95, scaleY: .95, alpha: 1 }, createjs.Tween.bounceInOut)
    }
    cluetext.visible = true;
    cluetext.alpha = 0
    createjs.Tween.get(cluetext).wait(700)
    .to({ y: 435, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 500)
    ///////////////////////////choice tween////////////////////////////////////
    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;

    }
    createjs.Tween.get(choiceArr[0]).wait(900)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[1]).wait(1000)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[2]).wait(1100)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[3]).wait(1200)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[4]).wait(1300)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    //////////////////////////////////////////////////////////////////

    repTimeClearInterval = setTimeout(AddListenerFn, 2000)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].mouseEnabled = true
        choiceArr[i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}


function disablechoices() {
    createjs.Tween.removeAllTweens();
    for (i = 0; i < 5; i++) {
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].visible = false;
        choiceArr[i].alpha = .5;
        choiceArr[i].mouseEnabled = false
    }

}

function onRoll_over(e) {
    e.currentTarget.alpha = .5;
    stage.update();
}

function onRoll_out(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;

    gameResponseTimerStop();
    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse()

        getValidation("correct");
        disablechoices();
    } else {
        getValidation("wrong");
        disablechoices();
    }
}


function disableMouse() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}