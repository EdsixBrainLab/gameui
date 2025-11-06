///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var currentX, currentY
var qcnt = 0;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var chpos = [];
var choiceMcArr = []
var btny = [250,265,265,250]
var intr = 0
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
    gameAssetsPath = "BackTrack-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "holder", src: gameAssetsPath + "holder.png" },
            { id: "questiontext", src: questionTextPath + "BackTrack-Level2-QT.png" },
            { id: "question", src: gameAssetsPath + "question.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================// 
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;
    }
    if (id == "questiontext") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questiontext")],
            "frames": { "regX": 50, "height": 107, "count": 0, "regY": 50, "width": 640 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        qtext = new createjs.Sprite(spriteSheet2);
        qtext.visible = false;
        container.parent.addChild(qtext);
        qtext.x = 390; qtext.y = 125;
    };


    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 461, "count": 0, "regY": 50, "width": 260 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);
    };
    //

}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////    
function handleClick(e) {
    qno = between(0, 20);
    qno.splice(qno.indexOf(9), 1)

    console.log(qno)
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




}
function idle() {

    idle1()
}
function idle1() {
    tx = 0;


    panelVisibleFn()
    gameQCntTxt.text = (quesCnt + 1) + "/" + totalQuestions;

    container.parent.addChild(qtext);
    qtext.gotoAndStop(0);
    qtext.visible = true;
   // qtext.x = 390; qtext.y = 100;;
    qtext.scaleX = qtext.scaleY = 1;
    qtext.alpha = 0
    createjs.Tween.get(qtext).wait(600).to({ alpha: 1 }, 600)
    ans = "ch0";

    container.parent.addChild(question);
    question.gotoAndStop(qno[qcnt]);
    question.x = 570; question.y = 250;
	question.scaleX = question.scaleY = .8
    question.visible = true;
    question.y = -1200
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ y: 259, alpha: 1 }, 1000)


    intr = setInterval(pickques, 3000);
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    //for db
    tx = 0;
    qscnt++;
    //db
    clearInterval(intr);
    qcnt++;
    cnt++;
    quesCnt++;
    chpos = [];
    console.log(qno[qcnt])
    ans = "ch0"
    panelVisibleFn()

    qtext.visible = true;
    qtext.alpha = 1
    qtext.gotoAndStop(0);
   // createjs.Tween.get(qtext).wait(600).to({ alpha: 1 }, 600)

    question.gotoAndStop(qno[qcnt]);
    question.y = -1200
    question.alpha = 0
    question.visible = true;
    createjs.Tween.get(question).wait(1000)
        .to({ y: 259, alpha: 1 }, 1000)
    clearquesInterval = setInterval(createchoices, 3000);
}

function createchoices() {
    question.visible = false;
    clearInterval(clearquesInterval);
    pauseTimer()
    qtext.gotoAndStop(1);
    if (lang == "HindiQuestionText/") {
        qtext.y = 150;
    }
    qtext.visible = false;
    for (i = 0; i < 4; i++) {
        choiceMcArr[i] = question.clone();
        choiceMcArr[i].y = btny[i]; //250;
        choiceMcArr[i].name = "ch" + i;
        choiceMcArr[i].visible = false;
        choiceMcArr[i].scaleX= choiceMcArr[i].scaleY = .8;
        choiceMcArr[i].gotoAndStop(qno[qcnt + i - 1]);
        container.parent.addChild(choiceMcArr[i]);
    }

    chpos = between(0, 3)
    console.log("test= " + chpos)
    for (i = 0; i <= choiceCnt; i++) {
        switch (i) {
            case 0:
                choiceMcArr[chpos[i]].x = 140;

                break;
            case 1:
                choiceMcArr[chpos[i]].x = 465;

                break;
            case 2:
                choiceMcArr[chpos[i]].x = 670;
                break;
            case 3:
                choiceMcArr[chpos[i]].x = 1020;

                break;
        }
    }
    console.log(qno[qcnt])

    enableChoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enableChoices() {
    for (i = 0; i < 4; i++) {

        choiceMcArr[i].alpha = 1;
        choiceMcArr[i].cursor = "pointer";
        choiceMcArr[i].mouseEnabled = true;
        console.log(choiceMcArr[i].x)
    }
    createTween1()

}
function createTween1() {

    qtext.visible = true;
    qtext.alpha = 0
    createjs.Tween.get(qtext).wait(600).to({ alpha: 1 }, 600)
    var tempVal = 2000
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].y = 1200
        choiceMcArr[i].alpha = 0
        choiceMcArr[i].visible = true;
        createjs.Tween.get(choiceMcArr[i]).wait(200)
            .to({ y: 265, alpha: 1 }, tempVal).wait(tempVal);
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3500)


}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval);
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}
function disablechoices() {
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].removeEventListener("click", answerSelected);
        choiceMcArr[i].visible = false;
        choiceMcArr[i].alpha = .5;
        choiceMcArr[i].cursor = "default";
        choiceMcArr[i].mouseEnabled = false
    }
    qtext.visible = false;
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
    e.currentTarget.mouseEnabled = false;
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].removeEventListener("click", answerSelected);
    }
    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse()
        correct()
    } else {

        getValidation("wrong");
        disablechoices();
    }
}
function correct() {
    getValidation("correct");
    disablechoices();
}
function disableMouse() {
    for (i = 0; i < 4; i++) {
        choiceMcArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}
