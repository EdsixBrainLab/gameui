//////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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
var repTimeClearInterval = 0;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////s
var currentX, currentY
var currentObj = []
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno1 = []
var chpos = []
var choice1Arr = []
var choice2Arr = []
var indxval = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
var choiceChange = [0, 1, 2, 3, 0, 1, 2, 3]
var btnX = [140, 800, 460]
var btnY = [350, 350, 550]
var btnX1 = [280, 618, 955]
var btnY1 = [545, 545, 545]
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var introImg
var QusTxtString;
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
    ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

    /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "AlphaNumericEncode-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "choiceBg", src: gameAssetsPath + "qhHolder1.png" },
            { id: "choice1", src: gameAssetsPath + "question1.png" },
            { id: "choice2", src: gameAssetsPath + "question2.png" },
                        { id: "introImg", src: gameAssetsPath + "introImg.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;
    if (id == "introImg") {

                introImg = new createjs.Bitmap(preload.getResult('introImg'));
                container.parent.addChild(introImg);
                introImg.visible = false;
        }

    if (!QusTxtString) {
        call_UI_gameQuestion(container,"Look at the associations below");
    }
    if (id == "choiceBg") {
        choiceBg = new createjs.Bitmap(preload.getResult('choiceBg'));
        container.parent.addChild(choiceBg);
        choiceBg.visible = false;
    }

    if (id == "choice1") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 143, "count": 64, "regY": 50, "width": 143 }
        });

        choice1 = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(choice1);
        choice1.visible = false;
    }

    if (id == "choice2") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 143, "count": 64, "regY": 50, "width": 143 }
        });

        choice2 = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(choice2);
        choice2.visible = false;
    }
}
function tick(e) {

    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========/////////////////////////////////////////////////////////////////
function handleClick(e) {

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

    container.parent.addChild(choiceBg);
    choiceBg.visible = false;
    question = choice1.clone()
    container.parent.addChild(question);
    question.visible = false;

    question1 = choice2.clone()
    question1.scaleX = question1.scaleY = .7
    container.parent.addChild(question1);
    question1.visible = false;

    for (i = 0; i < choiceCnt; i++) {
        choice1Arr[i] = choice1.clone()
        container.parent.addChild(choice1Arr[i])
        choice1Arr[i].visible = false;
        choice1Arr[i].scaleX = choice1Arr[i].scaleY = 1
        choice2Arr[i] = choice2.clone()
        container.parent.addChild(choice2Arr[i])
        choice2Arr[i].visible = false;
        choice2Arr[i].scaleX = choice2Arr[i].scaleY = 1

    }


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
         pickques()
    } else {
         pickques()
    }*/
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {

}

function helpEnable() {

}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    tx = 0;
    cnt++;
    qscnt++;
    quesCnt++;
    chpos = []

    panelVisibleFn()
    //==================================================================//

    qno = between(0, 34);
    qno1 = between(0, 34);
    for (i = 0; i < choiceCnt; i++) {

        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].gotoAndStop(qno[i])
        choice2Arr[i].gotoAndStop(qno1[i])
        choice1Arr[i].x = btnX[i]
        choice2Arr[i].x = btnX[i] + 290
        choice1Arr[i].y = btnY[i]
        choice2Arr[i].y = btnY[i]
    }
    createTween();

   
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////
    QusTxtString.visible = true;
    choiceBg.visible = true;
    choiceBg.alpha = 0;
    createjs.Tween.get(choiceBg).wait(100).to({ alpha: 1 }, 500)
    for (i = 0; i < choiceCnt; i++) {
        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].alpha = 0;
        choice2Arr[i].alpha = 0;

    }
    for (i = 0; i < choiceCnt; i++) {
        createjs.Tween.get(choice1Arr[i]).wait(200 + (i * 360)).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 360).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 360)
        createjs.Tween.get(choice2Arr[i]).wait(200 + (i * 360)).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 360).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 360)
    }

   clearquesInterval = setInterval(createChoices, 5000);

}
function createChoices() {
    clearChoiceAnimations();
    resetChoiceTweens();
    clearInterval(clearquesInterval)
    clearquesInterval = 0

       choiceBg.visible = false;
    for (i = 0; i < choiceCnt; i++) {
        choice1Arr[i].visible = false;
        choice2Arr[i].visible = false;
    }

    QusTxtString.visible = false;
    chpos = [];
    for (i = 0; i < choiceCnt; i++) {
        chpos.push(i);
    }
    chpos.sort(randomSort)

    var rand = range(choiceCnt, 0)

    if (qtype[cnt] == 1) {
                SAUIX_setQuestionText("Select the correct symbol that was associated with the letter/number", { textAlign: "center" });
        question1.visible = false
        question.visible = false
        question1.gotoAndStop(qno1[rand]);
        ans = qno[rand]
        question1.x = 610
        question1.y = 270

    } else {
                SAUIX_setQuestionText("Select the correct letter/number that was associated with the symbol", { textAlign: "center" });
        question.visible = false
        question1.visible = false
        question.gotoAndStop(qno[rand]);
        ans = qno1[rand]
        question.x = 610
        question.y = 260
    }
   
     enablechoices();
     createjs.Ticker.addEventListener("tick", tick);
     stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    console.log("entered")
    resetChoiceTweens();
    if (qtype[cnt] == 1) {
        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].visible = false
            choice1Arr[i].gotoAndStop(qno[chpos[i]])
            choice1Arr[i].name = qno[chpos[i]]
            choice1Arr[i].x = btnX1[i]
            choice1Arr[i].y = btnY1[i]
            choice1Arr[i].baseScale = 1.3
            choice1Arr[i].__choiceIndex = i

        }
    } else {
        for (i = 0; i < choiceCnt; i++) {
            choice2Arr[i].visible = false
            choice2Arr[i].gotoAndStop(qno1[chpos[i]])
            choice2Arr[i].name = qno1[chpos[i]]
            choice2Arr[i].x = btnX1[i]
            choice2Arr[i].y = btnY1[i]
            choice2Arr[i].baseScale = 1.3
            choice2Arr[i].__choiceIndex = i
        }
    }
    createTween1();
}
function createTween1() {
    QusTxtString.visible = true;

    if (qtype[cnt] == 1) {
        question1.visible = true
        question.visible = false
        animateQuestionPrompt(question1, 1.5, 200)

    } else {
        question.visible = true
        question1.visible = false
        animateQuestionPrompt(question, 1.5, 200)
    }

    if (qtype[cnt] == 1) {
        animateChoiceOptions(choice1Arr, btnY1[0], 1.3, 440, AddListenerFn)
    } else {
        animateChoiceOptions(choice2Arr, btnY1[0], 1.3, 520, AddListenerFn)
    }
}

function AddListenerFn() {
    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval);
        repTimeClearInterval = 0;
    }
    console.log("eventlisterneer")
    if (qtype[cnt] == 1) {
        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].addEventListener("click", answerSelected)
            choice1Arr[i].addEventListener("mouseover", handleChoiceOver)
            choice1Arr[i].addEventListener("mouseout", handleChoiceOut)
            choice1Arr[i].mouseEnabled = true
            choice1Arr[i].cursor = "pointer"
        }
    } else {
        for (i = 0; i < choiceCnt; i++) {
            choice2Arr[i].addEventListener("click", answerSelected)
            choice2Arr[i].addEventListener("mouseover", handleChoiceOver)
            choice2Arr[i].addEventListener("mouseout", handleChoiceOut)
            choice2Arr[i].mouseEnabled = true
            choice2Arr[i].cursor = "pointer"
        }
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    clearChoiceAnimations();
    resetChoiceTweens();
    QusTxtString.visible = false
    for (i = 0; i < choiceCnt; i++) {
        choice1Arr[i].visible = false
        choice2Arr[i].visible = false
        choice1Arr[i].removeEventListener("click", answerSelected)
        choice2Arr[i].removeEventListener("click", answerSelected)
        choice1Arr[i].removeEventListener("mouseover", handleChoiceOver)
        choice1Arr[i].removeEventListener("mouseout", handleChoiceOut)
        choice2Arr[i].removeEventListener("mouseover", handleChoiceOver)
        choice2Arr[i].removeEventListener("mouseout", handleChoiceOut)
        choice1Arr[i].mouseEnabled = false
        choice2Arr[i].mouseEnabled = false
        choice1Arr[i].cursor = "default"
        choice2Arr[i].cursor = "default"
    }

    question.visible = false
    question1.visible = false
}
//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//

function onRoll_over(e) {
    var overNum = e.currentTarget.name;
    for (i = 0; i < choiceCnt; i++) {

    }

}
//
function onRoll_out(e) {
    for (i = 0; i < choiceCnt; i++) {
    }
}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {
    e.preventDefault();

    uans = e.currentTarget.name;
    console.log("uans= " + uans)

    gameResponseTimerStop();
    console.log(uans + "  == " + uans)

    if (ans == uans) {
        e.currentTarget.visible = true;
        disableMouse()

        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].removeEventListener("click", answerSelected)
            choice1Arr[i].removeEventListener("mouseover", handleChoiceOver)
            choice1Arr[i].removeEventListener("mouseout", handleChoiceOut)
            choice2Arr[i].removeEventListener("click", answerSelected)
            choice2Arr[i].removeEventListener("mouseover", handleChoiceOver)
            choice2Arr[i].removeEventListener("mouseout", handleChoiceOut)
        }
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
    if (qtype[cnt] == 1) {
        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].mouseEnabled = false
        }
    } else {
        for (i = 0; i < choiceCnt; i++) {
            choice2Arr[i].mouseEnabled = false
        }
    }
}

function enableMouse() {

}

function animateQuestionPrompt(target, baseScale, delay) {
    if (!target) { return; }
    target.alpha = 0;
    target.scaleX = target.scaleY = baseScale * 0.85;
    createjs.Tween.get(target, { override: true })
        .wait(delay)
        .to({ alpha: 1, scaleX: baseScale * 1.04, scaleY: baseScale * 1.04 }, 360, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 280, createjs.Ease.quadInOut);
}

function animateChoiceOptions(choiceArray, finalY, baseScale, startDelay, onComplete) {
    if (!choiceArray) { return; }
    var revealDelay = startDelay || 0;
    var pendingTweens = 0;
    var hasTweens = false;
    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile) { continue; }
        hasTweens = true;
        pendingTweens++;
        tile.baseScale = baseScale;
        tile.__targetY = finalY;
        tile.__choiceIndex = (typeof tile.__choiceIndex === "number") ? tile.__choiceIndex : idx;
        stopChoicePulse(tile);
        tile.visible = true;
        tile.alpha = 0;
        tile.mouseEnabled = false;
        tile.cursor = "default";
        tile.y = finalY + 48;
        tile.scaleX = tile.scaleY = Math.max(baseScale - 0.18, 0.4);
        (function (target, index) {
            var delay = revealDelay + (index * 160);
            createjs.Tween.get(target, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: finalY }, 320, createjs.Ease.quadOut);

            createjs.Tween.get(target, { override: false })
                .wait(delay)
                .to({ scaleX: baseScale + 0.18, scaleY: baseScale + 0.18 }, 360, createjs.Ease.backOut)
                .to({ scaleX: baseScale, scaleY: baseScale }, 240, createjs.Ease.sineOut)
                .call(function () {
                    startChoicePulse(target, baseScale, finalY, index);
                    pendingTweens = Math.max(0, pendingTweens - 1);
                    if (!pendingTweens && typeof onComplete === "function") {
                        onComplete();
                    }
                });
        })(tile, idx);
    }
    if (!hasTweens && typeof onComplete === "function") {
        onComplete();
    }
}

function startChoicePulse(tile, baseScale, targetY, index) {
    if (!tile) { return; }
    stopChoicePulse(tile);
    var scale = baseScale || tile.baseScale || 1;
    var baseY = (typeof targetY === "number") ? targetY : tile.__targetY || tile.y;
    var stagger = (typeof index === "number") ? index : (tile.__choiceIndex || 0);
    tile.baseScale = scale;
    tile.__targetY = baseY;
    tile.scaleX = tile.scaleY = scale;
    tile.y = baseY;
    tile.__pulseTween = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 90)
        .to({ scaleX: scale * 1.05, scaleY: scale * 0.95 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale * 0.98, scaleY: scale * 1.02 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale, scaleY: scale }, 320, createjs.Ease.sineInOut);

    tile.__bobTween = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 100)
        .to({ y: baseY - 10 }, 360, createjs.Ease.sineOut)
        .to({ y: baseY }, 420, createjs.Ease.sineInOut);
}

function stopChoicePulse(tile) {
    if (!tile) { return; }
    if (tile.__pulseTween) {
        tile.__pulseTween.setPaused(true);
        tile.__pulseTween = null;
    }
    if (tile.__bobTween) {
        tile.__bobTween.setPaused(true);
        tile.__bobTween = null;
    }
    createjs.Tween.removeTweens(tile);
    if (tile.baseScale) {
        tile.scaleX = tile.scaleY = tile.baseScale;
    }
    if (typeof tile.__targetY === "number") {
        tile.y = tile.__targetY;
    }
}

function resetChoiceTweens() {
    for (i = 0; i < choiceCnt; i++) {
        if (choice1Arr[i]) {
            stopChoicePulse(choice1Arr[i]);
        }
        if (choice2Arr[i]) {
            stopChoicePulse(choice2Arr[i]);
        }
    }
}

function clearChoiceAnimations() {
    if (choiceBg) {
        createjs.Tween.removeTweens(choiceBg);
    }
    if (question) {
        createjs.Tween.removeTweens(question);
    }
    if (question1) {
        createjs.Tween.removeTweens(question1);
    }
    for (i = 0; i < choiceCnt; i++) {
        if (choice1Arr[i]) {
            createjs.Tween.removeTweens(choice1Arr[i]);
        }
        if (choice2Arr[i]) {
            createjs.Tween.removeTweens(choice2Arr[i]);
        }
    }
}

function handleChoiceOver(e) {
    var target = e.currentTarget;
    if (!target) { return; }
    var baseScale = target.baseScale || 1.3;
    stopChoicePulse(target);
    createjs.Tween.get(target, { override: true })
        .to({ scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 200, createjs.Ease.quadOut);
}

function handleChoiceOut(e) {
    var target = e.currentTarget;
    if (!target) { return; }
    var baseScale = target.baseScale || 1.3;
    createjs.Tween.removeTweens(target);
    createjs.Tween.get(target, { override: true })
        .to({ scaleX: baseScale, scaleY: baseScale }, 220, createjs.Ease.quadOut)
        .call(function () {
            startChoicePulse(target, baseScale, target.__targetY, target.__choiceIndex);
        });
}