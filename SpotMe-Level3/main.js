///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 230, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 4, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
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
var currentX, currentY
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var qText;
var cappos = 0;
var SPOTME_PROMPT_OBSERVE = "Observe the reference baskets carefully.";
var SPOTME_PROMPT_SELECT = "Select the basket with the odd object.";
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var qno = [];
var quesArr = []
var qnoI2 = [];
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var sX = [570, 725, 570, 430];
var sY = [245, 405, 545, 405];
var sX1 = [640, 795, 640, 500];
var sY1 = [205, 365, 525, 365];
var choiceChange = []
var dummyArr = []
var spriteChange = []
var shuffleArr1 = []
var shuffleArr2 = []
var shuffleArr3 = []
var btnx = [660, 916, 660, 414]
var btny = [198, 435, 698, 435]
var btnx2 = [660, 811, 660, 514]
var btny2 = [270, 435, 598, 435]
function updateQuestionPrompt(copy, options) {
    if (!copy && copy !== "") {
        return;
    }
    var appliedOptions = options || { textAlign: "center" };
    if (typeof SAUIX_setQuestionText === "function") {
        SAUIX_setQuestionText(copy, appliedOptions);
    } else if (typeof QusTxtString !== "undefined" && QusTxtString) {
        QusTxtString.text = copy;
        if (appliedOptions.textAlign) {
            QusTxtString.textAlign = appliedOptions.textAlign;
        }
        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.update === "function") {
            QusTxtString.__labelBG.update();
        }
        QusTxtString.visible = true;
    }
}

function fadeInQuestionPrompt(copy) {
    updateQuestionPrompt(copy, { textAlign: "center" });
    if (typeof QusTxtString !== "undefined" && QusTxtString) {
        QusTxtString.visible = true;
        createjs.Tween.get(QusTxtString, { override: true })
            .set({ alpha: 0 })
            .wait(150)
            .to({ alpha: 1 }, 280);
    }
}

function hideQuestionPrompt() {
    if (typeof QusTxtString !== "undefined" && QusTxtString) {
        QusTxtString.visible = false;
    }
}

function startChoiceIdleTween(target, index) {
    if (!target) {
        return;
    }
    var baseScale = target.__baseScale || target.scaleX || 1;
    target.__baseScale = baseScale;
    target.scaleX = baseScale;
    target.scaleY = baseScale;
    createjs.Tween.removeTweens(target);
    target.__idleTween = createjs.Tween.get(target, { loop: true, override: false })
        .wait((index % 4) * 110)
        .to({ scaleX: baseScale * 1.06, scaleY: baseScale * 0.96 }, 320, createjs.Ease.sineOut)
        .to({ scaleX: baseScale * 0.96, scaleY: baseScale * 1.04 }, 340, createjs.Ease.sineInOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 300, createjs.Ease.sineInOut);
}

function stopChoiceIdleTween(target) {
    if (!target) {
        return;
    }
    createjs.Tween.removeTweens(target);
    var baseScale = target.__baseScale || 1;
    target.scaleX = baseScale;
    target.scaleY = baseScale;
    target.__idleTween = null;
}

//register key functions
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
    call_UI_ambientOverlay(container);
    createjs.Ticker.addEventListener("tick", stage);

    callLoader();
    createLoader()
    createCanvasResize()

    stage.update();
    stage.enableMouseOver(40);
    call_UI_gameQuestion(container, SPOTME_PROMPT_OBSERVE);
    hideQuestionPrompt();
    ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

    /*Always specify the following terms as given in manifest array.
         1. choice image name as "ChoiceImages1.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "SpotMe-Level3/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "Basket.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "chHolder") {
        chHolder = new createjs.Bitmap(preload.getResult('chHolder'));
        container.parent.addChild(chHolder);
        chHolder.visible = false;
    }
    if (id == "choice1") {
        choice1 = new createjs.Bitmap(preload.getResult('choice1'));
        container.parent.addChild(choice1);
        choice1.visible = false;
    }
    if (id == "dummy") {

        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("dummy")],
            "frames": { "regX": 50, "height": 60, "count": 0, "regY": 50, "width": 60 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        dummy = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(dummy);
        dummy.visible = false;
    }


    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 94, "count": 0, "regY": 50, "width": 94 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);

    };

    if (QusTxtString) {
        updateQuestionPrompt(SPOTME_PROMPT_OBSERVE);
        hideQuestionPrompt();
    }
}

function tick(e) {

    stage.update();
}

/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
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

    choice1.visible = false;
    question.visible = false;
    question.scaleX = question.scaleY = .7;

    hideQuestionPrompt();
    for (i = 0; i < 4; i++) {
        dummyArr[i] = dummy.clone()
        dummyArr[i].name = i;
        dummyArr[i].x = btnx[i];
        dummyArr[i].y = btny[i];
        container.parent.addChild(dummyArr[i]);
        dummyArr[i].visible = false;
        dummyArr[i].gotoAndStop(i)
    }
    container.parent.addChild(question)
    for (i = 0; i < 4; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i]
    }

    chHolder.visible = false;
    chHolder.y += 28;

    qnoI2 = between(0, 32);


    if (isQuestionAllVariations) {
        //  createGameWiseQuestions()
        choiceChange = [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1]
        // setTimeout(pickques, 1000);
    } else {
        choiceChange = [0, 1, 1, 1, 0, 0, 1, 0, 0, 1]
        // setTimeout(pickques, 1000);
    }


    choiceChange.sort(randomSort)
}

function helpDisable() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].mouseEnabled = true;
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
    panelVisibleFn()

    hideQuestionPrompt();
    qnoI = [1, 0, 2, 3]
    // qnoI = between(0, 3)
   qnoI.sort(randomSort)
    for (i = 0; i < 4; i++) {
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i];
        quesArr[i].visible = false;
    }
    question.gotoAndStop(qnoI2[cnt]);
    question.x = sX1[qnoI[0]];
    question.y = sY1[qnoI[0]];
    question.visible = false;
    //
    for (i = 0; i < 4; i++) {
        dummyArr[i].x = btnx2[i]
        dummyArr[i].y = btny2[i]
    }
    CreateTween();
}

function CreateTween() {
    fadeInQuestionPrompt(SPOTME_PROMPT_OBSERVE);

    chHolder.x = -1700;
    chHolder.visible = true
    createjs.Tween.get(chHolder).wait(200).
        to({ x: 0, y: chHolder.y }, 500, createjs.Ease.bounceIn);

    var tempVal2 = 500
    var rand = between(0, 3)
    for (i = 0; i < 4; i++) {
        quesArr[rand[i]].visible = true;
        quesArr[rand[i]].alpha = 0
        createjs.Tween.get(quesArr[rand[i]]).wait(tempVal2).to({ alpha: 1 }, tempVal2);
        tempVal2 += 200;
    }

    question.visible = true
    question.alpha = 0
    createjs.Tween.get(question).wait(3000).to({ y: sY1[qnoI[0]], alpha: 1 }, 500).to({ y: sY1[qnoI[0]] + 73 }, 1000, createjs.Ease.bounceOut).wait(500).call(changechoice1);

    var tempVal1 = 1400;
    for (i = 0; i < 4; i++) {
        dummyArr[rand[i]].visible = true
        dummyArr[rand[i]].alpha = 0
        createjs.Tween.get(dummyArr[rand[i]]).wait(tempVal1).to({ x: btnx[rand[i]], y: btny[rand[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        tempVal1 += 200;
    }

}

function AddListenerFn() {
    fadeInQuestionPrompt(SPOTME_PROMPT_SELECT);
    for (i = 0; i < 4; i++) {
        dummyArr[i].addEventListener("click", answerSelected)
        dummyArr[i].cursor = "pointer"
        dummyArr[i].mouseEnabled = true
        startChoiceIdleTween(dummyArr[i], i);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
/*
function enablechoices() {
    rst = 0;
    gameResponseTimerStart();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
    fadeInQuestionPrompt(SPOTME_PROMPT_SELECT);
    for (i = 0; i < 4; i++) {
        dummyArr[i].addEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = true;
        dummyArr[i].cursor = "pointer";
        startChoiceIdleTween(dummyArr[i], i);
    }

}*/
function disablechoices() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
        stopChoiceIdleTween(dummyArr[i]);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changechoice1() {
    question.visible = false
    createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 400).wait(500);
    createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[3]], y: sY[qnoI[3]] }, 400).wait(500);
    createjs.Tween.get(quesArr[qnoI[2]]).to({ x: sX[qnoI[0]], y: sY[qnoI[0]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI[3]]).to({ x: sX[qnoI[2]], y: sY[qnoI[2]] }, 300).wait(400).call(changeoption11);
}
function changeoption11() {
    createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[3]], y: sY[qnoI[3]] }, 400).wait(500);
    if (choiceChange[cnt] == 0) {
        createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 400).wait(500).call(changeoption12);
    } else {
        createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 400).wait(500).call(AddListenerFn);
    }
    ans = qnoI[3];
}
function changeoption12() {
    if (choiceChange[cnt] == 0) {
        createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[2]], y: sY[qnoI[2]] }, 600).wait(700);
        createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[0]], y: sY[qnoI[0]] }, 600).wait(700);
        createjs.Tween.get(quesArr[qnoI[2]]).to({ x: sX[qnoI[3]], y: sY[qnoI[3]] }, 600).wait(700);
        createjs.Tween.get(quesArr[qnoI[3]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 600).wait(700).call(AddListenerFn);
        ans = qnoI[2]
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    gameResponseTimerStop();
    if (ans == uans) {
        getValidation("correct");
        disablechoices();
    } else {

        getValidation("wrong");
        disablechoices();
    }
}