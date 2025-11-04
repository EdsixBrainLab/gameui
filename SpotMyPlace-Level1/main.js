///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 220, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 6, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var cnt1 = 0;
var ctime = 0;
var currentX, currentY
var temp_interval, index, qindex, val, qcnt, intr;

///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var qno = [];
var choiceMcArr = []
var choiceArr = []
var posx = [70, 430, 50, 440, 240];
var posy = [170, 260, 500, 400, 430]
var rand = []
var qnoI1 = []
var Choice = [];

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
    gameAssetsPath = "SpotMyPlace-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////////////////intro////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            ///////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choiceMc", src: gameAssetsPath + "choiceMc.png" },
            { id: "questiontext", src: questionTextPath + "SpotMyPlace-Level1-QT.png" }
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
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questiontext")],
            "frames": { "regX": 50, "height": 68, "count": 0, "regY": 50, "width": 605 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        questiontext = new createjs.Sprite(spriteSheet1);

        container.parent.addChild(questiontext);
        questiontext.x = 250; questiontext.y = 390;
        questiontext.visible = false;
    };

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 177, "count": 0, "regY": 50, "width": 177 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        choice1 = new createjs.Sprite(spriteSheet1);

        container.parent.addChild(choice1);
        choice1.x = 250; choice1.y = 390;
        choice1.visible = false;
    };

    if (id == "choiceMc") {
        choiceMc = new createjs.Bitmap(preload.getResult('choiceMc'));
        container.parent.addChild(choiceMc);
        choiceMc.visible = false;

    }

    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 389, "count": 0, "regY": 50, "width": 388 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);
    };

}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 100)

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

    container.parent.addChild(question);
    question.x = 100; question.y = 300;
    question.visible = false;

    container.parent.addChild(questiontext);
    questiontext.x = 390; questiontext.y = 140
    questiontext.visible = false;


    var sX = [200, 450, 700, 200, 450, 700];
    var sY = [250, 250, 250, 500, 500, 500];
    var sX1 = [200, 450, 700, 200, 450, 700];
    var sY1 = [258, 258, 258, 490, 490, 490];

    for (i = 0; i < 6; i++) {
        choiceMcArr[i] = new createjs.MovieClip()
        container.parent.addChild(choiceMcArr[i])
        choiceArr[i] = choice1.clone();
        Choice[i] = choiceMc.clone();
        choiceArr[i].x = sX[i] + 350;
        Choice[i].x = sX1[i] + 350;
        choiceArr[i].scaleX = choiceArr[i].scaleY = 1;
        choiceArr[i].y = sY[i];
        Choice[i].y = sY1[i] - 50;
        Choice[i].scaleX = Choice[i].scaleY = .9;
        container.parent.addChild(Choice[i])
        container.parent.addChild(choiceArr[i])
        choiceMcArr[i].addChild(Choice[i], choiceArr[i])
        choiceMcArr[i].visible = true;
        Choice[i].visible = false;
        choiceArr[i].visible = false;
    }


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/

    stage.update();
}

function helpDisable() {
    for (i = 0; i < 6; i++) {
        Choice[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 6; i++) {
        Choice[i].mouseEnabled = true;
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
    qcnt = -1;
    chpos = [];
    panelVisibleFn()
    questiontext.gotoAndStop(0);
    questiontext.visible = true;
    questiontext.alpha = 0
    questiontext.scaleX = .99
    createjs.Tween.get(questiontext).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)

    qnoI = between(0, 24);

    for (i = 0; i < 6; i++) {
        choiceArr[i].gotoAndStop(qnoI[i]);
        choiceArr[i].alpha = 1;
        Choice[i].alpha = 1;
        choiceArr[i].name = "ch" + qnoI[i];
        Choice[i].name = "ch" + qnoI[i];
        choiceArr[i].visible = false;
        Choice[i].visible = false;
    }

    cnt1 = -1;
    ansrand = between(0, 5)

    setTimeout(showflowers, 700)



}
function showflowers() {
    cnt1++;
    choiceArr[ansrand[cnt1]].visible = true;

    setTimeout(creatDelayfn, 500)
}
function creatDelayfn() {

    if (cnt1 < 5) {
        showflowers()
    }
    else {
        setTimeout(displayflower, 500)

    }
}


function displayflower() {
    questiontext.gotoAndStop(1);
    questiontext.visible = false
    var qnoI1 = between(0, 5);
    question.gotoAndStop(qnoI[qnoI1[0]]);
    question.visible = false;
    ans = "ch" + qnoI[qnoI1[0]];


    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);

    stage.update();



}

function enablechoices() {
    for (i = 0; i < 6; i++) {

        Choice[i].visible = false;
        Choice[i].alpha = 1
        choiceArr[i].visible = false;
        Choice[i].cursor = "pointer";
        Choice[i].mouseEnabled = false;
    }

    createTween()

}
function createTween() {

    questiontext.visible = true;
    questiontext.alpha = 0
    questiontext.scaleX = .99
    createjs.Tween.get(questiontext).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)


    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    ///////////////////////////choice tween////////////////////////////////////


    repTimeClearInterval = setTimeout(AddListenerFn, 1500)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
    for (i = 0; i < 6; i++) {
        Choice[i].visible = true
        Choice[i].mouseEnabled = true;
        Choice[i].addEventListener("click", answerSelected)
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function disableChoices() {

    for (i = 0; i < 6; i++) {
        Choice[i].removeEventListener("click", answerSelected);

        Choice[i].visible = false;
        Choice[i].cursor = "pointer";
        Choice[i].mouseEnabled = true;
    }

    question.visible = false;


}

function onRoll_over(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}

function onRoll_out(e) {
    e.currentTarget.alpha = .01;
    stage.update();
}

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse()

        correct()
    } else {
        getValidation("wrong");
        disableChoices();
    }

}

function correct() {
    getValidation("correct");
    disableChoices();
}


function disableMouse() {
    for (i = 0; i < 6; i++) {
        Choice[i].mouseEnabled = false
    }
}

function enableMouse() {

}