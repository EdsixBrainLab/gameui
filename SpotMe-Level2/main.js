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

var cappos = 0;
var SPOTME_PROMPT_OBSERVE = "Observe the reference baskets carefully.";
var SPOTME_PROMPT_SELECT = "Select the basket with the odd object.";
var SPOTME_BOARD_SCALE = 0.86;
var SPOTME_REFERENCE_SCALE = 0.86;
var SPOTME_CHOICE_SCALE = 0.86;
var SPOTME_QUESTION_SCALE = 0.64;
var SPOTME_BOARD_BASE_POS = { x: -9, y: 10 };
var SPOTME_BASKET_HIT_ALPHA = 0.01;
var SPOTME_BASKET_HIT_SCALE = 1.05;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qnoI = [];
var quesArr = []
var qno2 = [];
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var sX = [570, 775, 355];
var sY = [225, 600, 600];
var sX1 = [640, 850, 420];
var sY1 = [165, 540, 540];

var dummyArr = []
var basketHotspots = [];

var shuffleArr1 = []
var shuffleArr2 = []
var shuffleArr3 = []
var choiceChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1]
var spriteChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1]

var btnx = [660, 970, 335]
var btny = [205, 665, 665]
var btnx2 = [660, 850, 460]
var btny2 = [285, 665, 665]
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
        .wait((index % 3) * 110)
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

function getBasketReferenceSize() {
    if (choice1) {
        return resolveDisplaySize(choice1);
    }
    return { width: 0, height: 0 };
}

function ensureBasketHotspot(index) {
    if (typeof index === "undefined" || index === null || !container || !container.parent) {
        return null;
    }

    if (!basketHotspots[index]) {
        var hotspot = new createjs.Shape();
        var refSize = getBasketReferenceSize();
        var width = (refSize.width || 180) * SPOTME_REFERENCE_SCALE * SPOTME_BASKET_HIT_SCALE;
        var height = (refSize.height || 150) * SPOTME_REFERENCE_SCALE * SPOTME_BASKET_HIT_SCALE;
        hotspot.graphics.beginFill("#000").drawEllipse(0, 0, width, height);
        hotspot.alpha = 0;
        hotspot.visible = false;
        hotspot.regX = 0;
        hotspot.regY = 0;
        hotspot.name = index;
        hotspot.mouseEnabled = false;
        hotspot.cursor = "default";
        hotspot.__baseAlpha = SPOTME_BASKET_HIT_ALPHA;
        basketHotspots[index] = hotspot;
        container.parent.addChild(hotspot);
    }

    return basketHotspots[index];
}

function hideBasketHotspot(hotspot) {
    if (!hotspot) {
        return;
    }
    createjs.Tween.removeTweens(hotspot);
    hotspot.visible = false;
    hotspot.alpha = 0;
    hotspot.mouseEnabled = false;
    hotspot.cursor = "default";
    hotspot.removeEventListener("click", answerSelected);
}

function setBasketHotspotPosition(index, x, y) {
    var hotspot = ensureBasketHotspot(index);
    if (!hotspot) {
        return null;
    }
    var target = dummyArr[index] || dummy;
    var offsetX = target && typeof target.__scaleOffsetX === "number" ? target.__scaleOffsetX : 0;
    var offsetY = target && typeof target.__scaleOffsetY === "number" ? target.__scaleOffsetY : 0;
    hotspot.x = x + offsetX;
    hotspot.y = y + offsetY;
    return hotspot;
}

function tweenBasketHotspot(index, wait, targetBaseX, targetBaseY) {
    var hotspot = ensureBasketHotspot(index);
    if (!hotspot) {
        return;
    }
    var target = dummyArr[index] || dummy;
    var offsetX = target && typeof target.__scaleOffsetX === "number" ? target.__scaleOffsetX : 0;
    var offsetY = target && typeof target.__scaleOffsetY === "number" ? target.__scaleOffsetY : 0;
    hotspot.visible = true;
    hotspot.alpha = 0;
    hotspot.mouseEnabled = false;
    hotspot.cursor = "default";
    createjs.Tween.get(hotspot, { override: true })
        .wait(wait)
        .to({ x: targetBaseX + offsetX, y: targetBaseY + offsetY, alpha: hotspot.__baseAlpha || SPOTME_BASKET_HIT_ALPHA }, 500, createjs.Ease.bounceOut);
}

function resolveDisplaySize(target) {
    if (!target) {
        return { width: 0, height: 0 };
    }
    if (typeof target.getBounds === "function") {
        var bounds = target.getBounds();
        if (bounds) {
            return { width: bounds.width || 0, height: bounds.height || 0 };
        }
    }
    if (target.image) {
        return {
            width: target.image.width || 0,
            height: target.image.height || 0
        };
    }
    if (target.spriteSheet && typeof target.spriteSheet.getFrame === "function") {
        var frame = target.spriteSheet.getFrame(target.currentFrame || 0);
        if (frame && frame.rect) {
            return { width: frame.rect.width || 0, height: frame.rect.height || 0 };
        }
    }
    if (target.spriteSheet && typeof target.spriteSheet.getFrameBounds === "function") {
        var rect = target.spriteSheet.getFrameBounds(target.currentFrame || 0);
        if (rect) {
            return { width: rect.width || 0, height: rect.height || 0 };
        }
    }
    if (target.spriteSheet && target.spriteSheet._frameWidth && target.spriteSheet._frameHeight) {
        return {
            width: target.spriteSheet._frameWidth || 0,
            height: target.spriteSheet._frameHeight || 0
        };
    }
    return { width: 0, height: 0 };
}

function applyScaleMeta(target, scale) {
    if (!target) {
        return;
    }
    var appliedScale = typeof scale === "number" ? scale : 1;
    target.scaleX = target.scaleY = appliedScale;
    var size = resolveDisplaySize(target);
    target.__scaleOffsetX = size.width * (1 - appliedScale) / 2;
    target.__scaleOffsetY = size.height * (1 - appliedScale) / 2;
    target.__baseScale = appliedScale;
}

function getScaledOffsetX(target) {
    return target && target.__scaleOffsetX ? target.__scaleOffsetX : 0;
}

function getScaledOffsetY(target) {
    return target && target.__scaleOffsetY ? target.__scaleOffsetY : 0;
}

function setScaledXY(target, x, y) {
    if (!target) {
        return;
    }
    target.x = x + getScaledOffsetX(target);
    target.y = y + getScaledOffsetY(target);
}

function getScaledPosition(target, x, y) {
    return {
        x: x + getScaledOffsetX(target),
        y: y + getScaledOffsetY(target)
    };
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
    gameAssetsPath = "SpotMe-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" },
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
        applyScaleMeta(chHolder, SPOTME_BOARD_SCALE);

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
        applyScaleMeta(dummy, SPOTME_CHOICE_SCALE);
    }
    if (id == "choice1") {
        choice1 = new createjs.Bitmap(preload.getResult('choice1'));
        container.parent.addChild(choice1);
        choice1.visible = false;
        applyScaleMeta(choice1, SPOTME_REFERENCE_SCALE);
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
        applyScaleMeta(question, SPOTME_QUESTION_SCALE);

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
    qno = between(0, 100);
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


    question.visible = false;

    hideQuestionPrompt();


    for (i = 0; i < 3; i++) {
        dummyArr[i] = dummy.clone()
        dummyArr[i].name = i;
        applyScaleMeta(dummyArr[i], SPOTME_CHOICE_SCALE);
        setScaledXY(dummyArr[i], btnx[i], btny[i]);
        container.parent.addChild(dummyArr[i]);
        dummyArr[i].visible = false;
        dummyArr[i].gotoAndStop(i)
        hideBasketHotspot(setBasketHotspotPosition(i, btnx[i], btny[i]));
    }
    container.parent.addChild(question)
    for (i = 0; i < 3; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        applyScaleMeta(quesArr[i], SPOTME_REFERENCE_SCALE);
        setScaledXY(quesArr[i], sX[i], sY[i]);
    }
    choice1.visible = false;
    setScaledXY(chHolder, SPOTME_BOARD_BASE_POS.x, SPOTME_BOARD_BASE_POS.y);
    chHolder.visible = false;
    qno2 = between(0, 32);

    if (isQuestionAllVariations) {
        //  createGameWiseQuestions()
        choiceChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 0, 0, 1, 2, 2, 1]
        spriteChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 0, 0, 1, 2, 2, 1]
        // setTimeout(pickques, 1000);
    } else {
        choiceChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1]
        spriteChange = [0, 1, 2, 2, 0, 0, 1, 2, 2, 1]
        //  setTimeout(pickques, 1000);
    }

    choiceChange.sort(randomSort)
    spriteChange.sort(randomSort)
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
    tx = 0;
    qscnt++;
    cnt++;
    quesCnt++;
    panelVisibleFn()
    ///////////////////////////////////////////////////////////////////////
    hideQuestionPrompt();

    if (choiceChange[cnt] == 0) {
        qnoI = [0, 1, 2]
    } else if (choiceChange[cnt] == 1) {
        qnoI = [2, 0, 1]
    } else {
        qnoI = [1, 2, 0]
    }

    for (i = 0; i < 3; i++) {
        setScaledXY(quesArr[i], sX[qnoI[i]], sY[qnoI[i]]);
        quesArr[i].visible = false;
    }
    question.gotoAndStop(qno2[cnt]);
    setScaledXY(question, sX1[qnoI[0]], sY1[qnoI[0]]);
    question.visible = false;
    //
    for (i = 0; i < 3; i++) {
        setScaledXY(dummyArr[i], btnx2[i], btny2[i])
        hideBasketHotspot(setBasketHotspotPosition(i, btnx2[i], btny2[i]));
    }
    CreateTween();
}

function CreateTween() {
    fadeInQuestionPrompt(SPOTME_PROMPT_OBSERVE);

    setScaledXY(chHolder, SPOTME_BOARD_BASE_POS.x - 1700, SPOTME_BOARD_BASE_POS.y);
    chHolder.visible = true;
    var boardTarget = getScaledPosition(chHolder, SPOTME_BOARD_BASE_POS.x, SPOTME_BOARD_BASE_POS.y);
    createjs.Tween.get(chHolder).wait(200)
        .to(boardTarget, 500, createjs.Ease.bounceIn);

    var tempVal2 = 500;
    var rand = between(0, 2);
    for (i = 0; i < 3; i++) {
        quesArr[rand[i]].visible = true;
        quesArr[rand[i]].alpha = 0;
        createjs.Tween.get(quesArr[rand[i]]).wait(tempVal2).to({ alpha: 1 }, tempVal2);
        tempVal2 += 200;
    }

    question.visible = true;
    question.alpha = 0;
    var questionAnchor = getScaledPosition(question, sX1[qnoI[0]], sY1[qnoI[0]]);
    createjs.Tween.get(question).wait(3000)
        .to({ x: questionAnchor.x, y: questionAnchor.y, alpha: 1 }, 500)
        .to({ y: questionAnchor.y + 90 }, 1000, createjs.Ease.bounceOut)
        .wait(500).call(changechoice1);

    var tempVal1 = 1400;
    for (i = 0; i < 3; i++) {
        dummyArr[rand[i]].visible = true;
        dummyArr[rand[i]].alpha = 0;
        var choiceTarget = getScaledPosition(dummyArr[rand[i]], btnx[rand[i]], btny[rand[i]]);
        createjs.Tween.get(dummyArr[rand[i]]).wait(tempVal1).to({ x: choiceTarget.x, y: choiceTarget.y, alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        setBasketHotspotPosition(rand[i], btnx2[rand[i]], btny2[rand[i]]);
        tweenBasketHotspot(rand[i], tempVal1, btnx[rand[i]], btny[rand[i]]);
        tempVal1 += 200;
    }
}

function AddListenerFn() {
    fadeInQuestionPrompt(SPOTME_PROMPT_SELECT);
    for (i = 0; i < 3; i++) {
        dummyArr[i].addEventListener("click", answerSelected)
        dummyArr[i].cursor = "pointer"
        dummyArr[i].mouseEnabled = true
        startChoiceIdleTween(dummyArr[i], i);
        var hotspot = ensureBasketHotspot(i);
        if (hotspot) {
            hotspot.alpha = hotspot.__baseAlpha || SPOTME_BASKET_HIT_ALPHA;
            hotspot.visible = true;
            hotspot.mouseEnabled = true;
            hotspot.cursor = "pointer";
            hotspot.addEventListener("click", answerSelected);
        }
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
    for (i = 0; i < 3; i++) {
        dummyArr[i].addEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = true;
        dummyArr[i].cursor = "pointer";
        startChoiceIdleTween(dummyArr[i], i);
    }
}*/
function disablechoices() {
    for (i = 0; i < 3; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
        stopChoiceIdleTween(dummyArr[i]);
        hideBasketHotspot(basketHotspots[i]);
    }

}


function changechoice1() {
    question.visible = false
    if (choiceChange[cnt] == 0) {

        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [1, 2];
            shuffleArr2 = [2, 1];
            shuffleArr3 = [0, 0];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [1, 0];
            shuffleArr2 = [2, 2];
            shuffleArr3 = [0, 1];
        }
        else {
            shuffleArr1 = [1, 0];
            shuffleArr2 = [2, 2]
            shuffleArr3 = [0, 1];
        }
        ans = shuffleArr1[1];
    }
    else if (choiceChange[cnt] == 1) {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [1, 2];
            shuffleArr2 = [0, 1];
            shuffleArr3 = [2, 0];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [1, 0];
            shuffleArr2 = [2, 2];
            shuffleArr3 = [0, 1];
        }
        else {
            shuffleArr1 = [0, 1];
            shuffleArr2 = [2, 0]
            shuffleArr3 = [1, 2];
        }
        ans = shuffleArr1[1];
    }
    else {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [0, 2];
            shuffleArr2 = [1, 1];
            shuffleArr3 = [2, 0];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [2, 1];
            shuffleArr2 = [0, 2];
            shuffleArr3 = [1, 0];
        }
        else {
            shuffleArr1 = [2, 0];
            shuffleArr2 = [0, 1]
            shuffleArr3 = [1, 2];
        }
        ans = shuffleArr1[1];
    }

    changeoption11();
}
/////////////////////////////////////////////////////////////////////////

function changeoption11() {
    var firstTarget = getScaledPosition(quesArr[0], sX[shuffleArr1[0]], sY[shuffleArr1[0]]);
    createjs.Tween.get(quesArr[0]).to({ x: firstTarget.x, y: firstTarget.y }, 300).wait(300);
    var secondTarget = getScaledPosition(quesArr[1], sX[shuffleArr2[0]], sY[shuffleArr2[0]]);
    createjs.Tween.get(quesArr[1]).to({ x: secondTarget.x, y: secondTarget.y }, 300).wait(300);
    var thirdTarget = getScaledPosition(quesArr[2], sX[shuffleArr3[0]], sY[shuffleArr3[0]]);
    createjs.Tween.get(quesArr[2]).to({ x: thirdTarget.x, y: thirdTarget.y }, 300).wait(300).call(changeoption12);
}
function changeoption12() {
    var firstTarget = getScaledPosition(quesArr[0], sX[shuffleArr1[1]], sY[shuffleArr1[1]]);
    createjs.Tween.get(quesArr[0]).to({ x: firstTarget.x, y: firstTarget.y }, 500).wait(400);
    var secondTarget = getScaledPosition(quesArr[1], sX[shuffleArr2[1]], sY[shuffleArr2[1]]);
    createjs.Tween.get(quesArr[1]).to({ x: secondTarget.x, y: secondTarget.y }, 500).wait(400);
    var thirdTarget = getScaledPosition(quesArr[2], sX[shuffleArr3[1]], sY[shuffleArr3[1]]);
    createjs.Tween.get(quesArr[2]).to({ x: thirdTarget.x, y: thirdTarget.y }, 500).wait(400).call(AddListenerFn);
}

////////////////////////////////////////////////////////////////////////////


function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    gameResponseTimerStop();

    if (ans == uans) {
        currentX = e.currentTarget.x - 100
        currentY = e.currentTarget.y - 100
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
    for (i = 0; i < 3; i++) {
        dummyArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}