///////////////////////////////////////////////////-------Common variables--------------////////////////////////////////////////
/////////////////////////////
var messageField;               //Message display field
var assets = [];
var cnt = -1, qscnt = -1, cmnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5,
 quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, quesMarkMc, quesHolderMc, resultLoading, preloadMc;
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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES////////////////////////////////
//////////////////////////
var btnx = []
var btny = []
var btnPadding = 50;
var clearquesInterval = 0;
var repTimeClearInterval = 0;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////
////////////////////////
var qno = [];
var choiceArr = [];
var choiceArr1 = []
var qno1 = []
var qtype = []
var introImg, introImg1
var QusTxtString;
var chpos = [];
var previewPosX = [220, 520, 820, 220, 520, 820];
var previewPosY = [220, 220, 220, 470, 470, 470];
var answerPosX = [240, 520, 800, 360, 680];
var answerPosY = [330, 330, 330, 520, 520];
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
    ///////////////////////////////////////////////////////////////=========MANIFEST==========//////////////////////////////////
    /////////////////////////////

    /*Always specify the following terms as given in manifest array.
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "MemoryCheck-Level5/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "introImg", src: gameAssetsPath + "introImg.png" },
            { id: "introImg1", src: gameAssetsPath + "introholder1.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//====================================================//


function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "introImg") {
        introImg = new createjs.Bitmap(preload.getResult('introImg'));
        container.parent.addChild(introImg);
        introImg.visible = false;
    }
    if (id == "introImg1") {
        introImg1 = new createjs.Bitmap(preload.getResult('introImg1'));
        container.parent.addChild(introImg1);
        introImg1.visible = false;
    }
    if (!QusTxtString) {
        call_UI_gameQuestion(container, "Remember these objects");
    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 276, "count": 0, "regY": 0, "width": 274 }
        });

        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);
    }


}

function tick(e) {

    stage.update();
}

/////////////////////////////////////////////////////////////////=======GAME START========//////////////////////////////////////
/////////////////////////////


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

    if (QusTxtString) {
        container.parent.addChild(QusTxtString);
        QusTxtString.visible = false;
        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.update === "function") {
            QusTxtString.__labelBG.update();
        }
    }

    for (i = 0; i < 6; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].visible = false;
        choiceArr[i].baseScale = 1.0;
    }
    for (i = 0; i < 5; i++) {
        choiceArr1[i] = choice1.clone();
        container.parent.addChild(choiceArr1[i]);
        choiceArr1[i].visible = false;
        choiceArr1[i].baseScale = 0.88;
        choiceArr1[i].scaleX = choiceArr1[i].scaleY = choiceArr1[i].baseScale;
    }

    if (isQuestionAllVariations) {
        qtype = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    } else {
        qtype = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2]
    }
    qtype.sort(randomSort)
}

function helpDisable() {
    for (i = 0; i < 6; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
    }

}

function helpEnable() {

    for (i = 0; i < 6; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
        }
    }
}
//==============================================================================================================================
===//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    cmnt++
    clk = 0;
    correctCnt = 0;
    chpos = [];

    panelVisibleFn()

    setQuestionPrompt("Remember these objects");

    qno1 = between(0, 39);

    for (i = 0; i < 6; i++) {
        if (!choiceArr[i]) { continue; }
        choiceArr[i].visible = false;
        choiceArr[i].gotoAndStop(qno1[i]);
        choiceArr[i].x = previewPosX[i];
        choiceArr[i].y = previewPosY[i];
        choiceArr[i].__targetX = previewPosX[i];
        choiceArr[i].__targetY = previewPosY[i];
        choiceArr[i].scaleX = choiceArr[i].scaleY = choiceArr[i].baseScale || 1;
    }

    animatePreviewTiles(choiceArr, previewPosX, previewPosY, function () {
        if (clearquesInterval) {
            clearTimeout(clearquesInterval);
        }
        clearquesInterval = setTimeout(createChoices, 4200);
    });


}
function createChoices() {
    console.log("createChoices")
    if (clearquesInterval) {
        clearTimeout(clearquesInterval)
        clearquesInterval = 0;
    }

    resetChoiceTweens(choiceArr1);
    clearChoiceAnimations(choiceArr1);

    for (i = 0; i < 6; i++) {
        if (choiceArr[i]) {
            choiceArr[i].visible = false;
        }
    }

    for (i = 0; i < 5; i++) {
        if (!choiceArr1[i]) { continue; }
        choiceArr1[i].visible = false;
        choiceArr1[i].alpha = 1;
        choiceArr1[i].mouseEnabled = false;
        choiceArr1[i].cursor = "default";
        choiceArr1[i].scaleX = choiceArr1[i].scaleY = choiceArr1[i].baseScale || 0.88;
    }

    switch (qtype[cnt]) {
        case 1:
            setQuestionPrompt("Which of these was not shown?");
            for (i = 0; i < 4; i++) {
                choiceArr1[i].gotoAndStop(qno1[i + 1]);
            }
            choiceArr1[4].gotoAndStop(qno1[9]);
            ans = "ch4";
            break;
        case 2:
            setQuestionPrompt("Which of these was shown?");
            choiceArr1[0].gotoAndStop(qno1[0]);
            choiceArr1[1].gotoAndStop(qno1[9]);
            choiceArr1[2].gotoAndStop(qno1[10]);
            choiceArr1[3].gotoAndStop(qno1[11]);
            choiceArr1[4].gotoAndStop(qno1[12]);
            ans = "ch0";
            break;
    }

    chpos = between(0, 4);
    for (i = 0; i < 5; i++) {
        var tile = choiceArr1[chpos[i]];
        if (!tile) { continue; }
        tile.x = answerPosX[i];
        tile.y = answerPosY[i];
        tile.__targetX = tile.x;
        tile.__targetY = tile.y;
        tile.baseScale = tile.baseScale || 0.88;
        tile.scaleX = tile.scaleY = tile.baseScale;
        tile.__choiceIndex = i;
        tile.visible = false;
        tile.mouseEnabled = false;
        tile.cursor = "default";
    }
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}


function enablechoices() {
    for (i = 0; i < 5; i++) {
        if (!choiceArr1[i]) { continue; }
        choiceArr1[i].name = "ch" + i;
        choiceArr1[i].visible = false;
        choiceArr1[i].mouseEnabled = false;
        choiceArr1[i].cursor = "default";
        choiceArr1[i].baseScale = choiceArr1[i].baseScale || 0.88;
        if (typeof choiceArr1[i].__choiceIndex !== "number") {
            choiceArr1[i].__choiceIndex = i;
        }
    }
    createTween1();
}
function createTween1() {
    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval);
        repTimeClearInterval = 0;
    }
    animateChoiceOptions(choiceArr1, function () {
        repTimeClearInterval = 0;
        AddListenerFn();
    });
}

function animateChoiceOptions(choiceArray, onComplete) {
    if (!choiceArray) {
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }
    var pendingTweens = 0;
    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile) { continue; }
        stopChoicePulse(tile);
        var baseScale = tile.baseScale || 1;
        var targetX = (typeof tile.__targetX === "number") ? tile.__targetX : tile.x;
        var targetY = (typeof tile.__targetY === "number") ? tile.__targetY : tile.y;
        tile.__targetX = targetX;
        tile.__targetY = targetY;
        tile.baseScale = baseScale;
        tile.visible = true;
        tile.alpha = 0;
        tile.mouseEnabled = false;
        tile.cursor = "default";
        tile.x = targetX;
        tile.y = targetY + 70;
        tile.scaleX = tile.scaleY = Math.max(baseScale - 0.18, 0.5);
        var revealIndex = (typeof tile.__choiceIndex === "number") ? tile.__choiceIndex : idx;
        pendingTweens++;
        (function (target, base, finalY, order) {
            var delay = 200 + (order * 150);
            createjs.Tween.get(target, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: finalY }, 320, createjs.Ease.quadOut);

            createjs.Tween.get(target, { override: false })
                .wait(delay)
                .to({ scaleX: base + 0.18, scaleY: base + 0.18 }, 360, createjs.Ease.backOut)
                .to({ scaleX: base, scaleY: base }, 260, createjs.Ease.sineOut)
                .call(function () {
                    startChoicePulse(target, base, finalY, order);
                    pendingTweens = Math.max(0, pendingTweens - 1);
                    if (!pendingTweens && typeof onComplete === "function") {
                        onComplete();
                    }
                });
        })(tile, baseScale, targetY, revealIndex);
    }
    if (!pendingTweens && typeof onComplete === "function") {
        onComplete();
    }
}

function resetChoiceTweens(choiceArray) {
    if (!choiceArray) { return; }
    for (var i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            stopChoicePulse(choiceArray[i]);
        }
    }
}

function clearChoiceAnimations(choiceArray) {
    if (!choiceArray) { return; }
    for (var i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            createjs.Tween.removeTweens(choiceArray[i]);
        }
    }
}

function startChoicePulse(tile, baseScale, targetY, index) {
    if (!tile) { return; }
    stopChoicePulse(tile);
    var scale = baseScale || tile.baseScale || 1;
    var finalY = (typeof targetY === "number") ? targetY : tile.__targetY || tile.y;
    var stagger = (typeof index === "number") ? index : (tile.__choiceIndex || 0);
    tile.baseScale = scale;
    tile.__targetY = finalY;
    tile.scaleX = tile.scaleY = scale;
    tile.y = finalY;

    tile.__pulseTween = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 100)
        .to({ scaleX: scale * 1.05, scaleY: scale * 0.95 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale * 0.98, scaleY: scale * 1.02 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale, scaleY: scale }, 320, createjs.Ease.sineInOut);

    tile.__bobTween = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 120)
        .to({ y: finalY - 8 }, 360, createjs.Ease.sineOut)
        .to({ y: finalY }, 420, createjs.Ease.sineInOut);
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
    if (typeof tile.__targetX === "number") {
        tile.x = tile.__targetX;
    }
}

function animatePreviewTiles(choiceArray, posX, posY, onComplete) {
    if (!choiceArray) {
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }
    var pending = 0;
    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile) { continue; }
        var targetX = posX[idx];
        var targetY = posY[idx];
        tile.visible = true;
        tile.alpha = 0;
        tile.x = targetX;
        tile.y = targetY - 260;
        var baseScale = tile.baseScale || 1;
        tile.scaleX = tile.scaleY = baseScale;
        pending++;
        (function (target, finalY, order, scale) {
            var delay = 160 + (order * 140);
            createjs.Tween.get(target, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: finalY }, 520, createjs.Ease.bounceOut)
                .call(function () {
                    pending = Math.max(0, pending - 1);
                    if (!pending && typeof onComplete === "function") {
                        onComplete();
                    }
                });
            createjs.Tween.get(target, { override: false })
                .wait(delay)
                .to({ scaleX: scale + 0.1, scaleY: scale + 0.1 }, 360, createjs.Ease.backOut)
                .to({ scaleX: scale, scaleY: scale }, 260, createjs.Ease.sineOut);
        })(tile, targetY, idx, baseScale);
    }
    if (!pending && typeof onComplete === "function") {
        onComplete();
    }
}

function setQuestionPrompt(copy) {
    if (typeof SAUIX_setQuestionText === "function") {
        SAUIX_setQuestionText(copy, { textAlign: "center" });
    }
    if (QusTxtString) {
        QusTxtString.visible = true;
        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.update === "function") {
            QusTxtString.__labelBG.update();
        }
        createjs.Tween.removeTweens(QusTxtString);
        QusTxtString.alpha = 0;
        createjs.Tween.get(QusTxtString, { override: true })
            .to({ alpha: 1 }, 600, createjs.Ease.sineOut);
    }
}
function AddListenerFn() {
    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval);
        repTimeClearInterval = 0;
    }
    console.log("eventlisterneer")
    for (i = 0; i < 5; i++) {
        if (!choiceArr1[i]) { continue; }
        choiceArr1[i].addEventListener("click", answerSelected);
        choiceArr1[i].cursor = "pointer";
        choiceArr1[i].mouseEnabled = true;
        choiceArr1[i].visible = true;

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    resetChoiceTweens(choiceArr1);
    clearChoiceAnimations(choiceArr1);
    for (i = 0; i < 5; i++) {
        if (!choiceArr1[i]) { continue; }
        choiceArr1[i].alpha = 1
        choiceArr1[i].removeEventListener("click", answerSelected);
        choiceArr1[i].cursor = "default";
        choiceArr1[i].visible = false;
        choiceArr1[i].mouseEnabled = false;
    }

}

function onRoll_over(e) {
    e.currentTarget.alpha = .5
    stage.update();
}
function onRoll_out(e) {
    e.currentTarget.alpha = 1
    stage.update();
}

function answerSelected(e) {
    clk++;
    e.preventDefault();
    gameResponseTimerStop();
    uans = e.currentTarget.name;

    if (ans == uans) {
        currentX = e.currentTarget.x + 70
        currentY = e.currentTarget.y + 70

        e.currentTarget.visible = true;
        disableMouse()

        setTimeout(correct, 500)
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
    for (i = 0; i < 5; i++) {
        if (choiceArr1[i]) {
            choiceArr1[i].mouseEnabled = false
        }
    }
}

function enableMouse() {

}
//===========================================================================================//
