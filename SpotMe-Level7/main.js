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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var tween
var chpos = 0;
var question1, question2;
var incr = 33;
var currentX, currentY
var SPOTME_PROMPT_OBSERVE = "Observe the reference baskets carefully.";
var SPOTME_PROMPT_SELECT = "Select the basket with the odd object.";
var SPOTME_BOARD_SCALE = 0.86;
var SPOTME_REFERENCE_SCALE = 0.86;
var SPOTME_CHOICE_SCALE = 0.86;
var SPOTME_QUESTION_SCALE = 0.64;
var SPOTME_TARGET_ICON_SCALE = 0.64;
var SPOTME_BOARD_BASE_POS = { x: 0, y: -30 };
var SPOTME_BASKET_HIT_ALPHA = 0.01;
var SPOTME_BASKET_HIT_SCALE = 1.05;

///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var dummyArr = []
var qno = [];
var qnoI1 = [];
var chpos = [];
var objArr = [];
var quesArr = []
var quesMcArr = []
var answer = [];
var qText;
var qnoI2 = [];
var chposArr = []
var arr3 = []
var ci = 1;
var question2
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var type_arry = [];
var chint = 0;
var sX = [585, 740, 760, 671, 483, 403, 423];
var sY = [225, 300, 470, 600, 600, 465, 300];

var sX1 = [644, 804, 821, 731, 543, 463, 483];
var sY1 = [190, 260, 435, 563, 562, 427, 260];

var posArray = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
var holder_arry = []
var cappos = 0;
var img1 = [], img2 = [];
var shapes_arry = []
var option_arry = ["2_8", "3_7", "4_6"]
var btnx = [660, 906, 936, 846, 463, 380, 405]
var btny = [195, 300, 490, 680, 680, 490, 300]
var btnx2 = [660, 801, 831, 801, 513, 490, 525]
var btny2 = [285, 300, 490, 680, 680, 490, 300]
var basketHotspots = [];

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
        .wait((index % 7) * 110)
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

function getBasketReferenceSize() {
    if (choice1) {
        return resolveDisplaySize(choice1);
    }
    return { width: 0, height: 0 };
}

function ensureBasketHotspot(index) {
    if (typeof index === "undefined") {
        return null;
    }
    if (!basketHotspots[index]) {
        var hotspot = new createjs.Shape();
        hotspot.graphics.beginFill("#ffffff").drawRect(0, 0, 100, 100);
        hotspot.alpha = SPOTME_BASKET_HIT_ALPHA;
        hotspot.visible = false;
        hotspot.name = "basketHotspot_" + index;
        applyScaleMeta(hotspot, SPOTME_BASKET_HIT_SCALE);
        container.parent.addChild(hotspot);
        basketHotspots[index] = hotspot;
    }
    return basketHotspots[index];
}

function hideBasketHotspot(hotspot) {
    if (!hotspot) {
        return;
    }
    hotspot.visible = false;
    hotspot.alpha = 0;
    hotspot.mouseEnabled = false;
    hotspot.cursor = "default";
    hotspot.removeAllEventListeners("click");
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

var SPOTME_TARGET_ICON_POSITIONS = {
    TamilQuestionText: { x: 340, y: 95 },
    GujaratiQuestionText: { x: 600, y: 100 },
    HindiQuestionText: { x: 940, y: 118 },
    default: { x: 930, y: 108 }
};

function resolveQuestionIconPosition() {
    var langKey = typeof lang === "string" ? lang.replace(/\/$/, "") : "";
    return SPOTME_TARGET_ICON_POSITIONS[langKey] || SPOTME_TARGET_ICON_POSITIONS.default;
}

function layoutQuestionTargetIcon() {
    if (!question2) {
        return;
    }
    var pos = resolveQuestionIconPosition();
    setScaledXY(question2, pos.x, pos.y);
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
    gameAssetsPath = "SpotMe-Level7/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "Basket.png" },
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" }
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

    if (id == "choice1") {
        choice1 = new createjs.Bitmap(preload.getResult('choice1'));
        container.parent.addChild(choice1);
        choice1.visible = false;
        applyScaleMeta(choice1, SPOTME_REFERENCE_SCALE);
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


    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 60, "height": 94, "count": 0, "regY": 50, "width": 94 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);
        applyScaleMeta(question, SPOTME_QUESTION_SCALE);

    };
    if (id == "question") {
        var spriteSheetClone = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 94, "count": 0, "regY": 50, "width": 94 },
        });
        question1 = new createjs.Sprite(spriteSheetClone);
        question1.visible = false;
        container.parent.addChild(question1);
        applyScaleMeta(question1, SPOTME_QUESTION_SCALE);

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
    if (question1) {
        question1.visible = false;
    }

    if (!question2 || !question2.parent) {
        question2 = question.clone();
        applyScaleMeta(question2, SPOTME_TARGET_ICON_SCALE);
        container.parent.addChild(question2);
    }
    question2.visible = false;
    layoutQuestionTargetIcon();

    hideQuestionPrompt();

    for (i = 0; i < 7; i++) {
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
    container.parent.addChild(question1)
    for (i = 0; i < 7; i++) {
        quesArr[i] = choice1.clone()
        applyScaleMeta(quesArr[i], SPOTME_REFERENCE_SCALE);
        setScaledXY(quesArr[i], sX[i], sY[i])
        quesArr[i].name = "ch" + i;
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
    }

    setScaledXY(chHolder, SPOTME_BOARD_BASE_POS.x, SPOTME_BOARD_BASE_POS.y);
    chHolder.visible = false;

    qnoI2 = between(0, 32);
    posArray.sort(randomSort);

    //  setTimeout(pickques, 1000);

    /*
    if (isQuestionAllVariations) {
        createGameWiseQuestions()
        setTimeout(pickques, 1000);
    } else {

        setTimeout(pickques, 1000);
    }
    */
}

function helpDisable() {
    for (i = 0; i < 7; i++) {
        quesArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 7; i++) {
        quesArr[i].mouseEnabled = true;
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
    incr--
    quesCnt++;
    panelVisibleFn()
    hideQuestionPrompt();
    qnoI1 = between(0, 6);
    qnoI = between(0, 6)

    for (i = 0; i < 7; i++) {
        setScaledXY(quesArr[i], sX[i], sY[i]);
        quesArr[i].visible = false;
    }
    question.gotoAndStop(qnoI2[cnt]);
    question1.gotoAndStop(qnoI2[incr]);
    setScaledXY(question, sX1[qnoI1[0]], sY1[qnoI1[0]]);
    setScaledXY(question1, sX1[qnoI1[1]], sY1[qnoI1[1]]);
    question.visible = false;
    question1.visible = false;

    //createjs.Tween.get(question).to({ y: sY[qnoI1[0]] + 30 }, 1000).wait(1000);
    //createjs.Tween.get(question1).to({ y: sY[qnoI1[1]] + 30 }, 1000).wait(1000);
    for (i = 0; i < 7; i++) {
        setScaledXY(dummyArr[i], btnx2[i], btny2[i]);
        hideBasketHotspot(setBasketHotspotPosition(i, btnx2[i], btny2[i]));
    }
    layoutQuestionTargetIcon();
    CreateTween();
}

function CreateTween() {
    fadeInQuestionPrompt(SPOTME_PROMPT_OBSERVE);

    setScaledXY(chHolder, SPOTME_BOARD_BASE_POS.x - 1700, SPOTME_BOARD_BASE_POS.y);
    chHolder.visible = true;
    var boardTarget = getScaledPosition(chHolder, SPOTME_BOARD_BASE_POS.x, SPOTME_BOARD_BASE_POS.y);
    createjs.Tween.get(chHolder).wait(200).
        to({ x: boardTarget.x, y: boardTarget.y }, 500, createjs.Ease.bounceIn);

    var tempVal2 = 500
    var rand = between(0, 6)
    for (i = 0; i < 7; i++) {
        var refIndex = rand[i];
        quesArr[refIndex].visible = true;
        quesArr[refIndex].alpha = 0
        var referenceTarget = getScaledPosition(quesArr[refIndex], sX[refIndex], sY[refIndex]);
        createjs.Tween.get(quesArr[refIndex]).set({ x: referenceTarget.x, y: referenceTarget.y })
            .wait(tempVal2).to({ alpha: 1 }, tempVal2);
        tempVal2 += 200;
    }

    question.visible = true
    question.alpha = 0
    var questionAnchor = getScaledPosition(question, sX1[qnoI1[0]], sY1[qnoI1[0]]);
    createjs.Tween.get(question).set({ x: questionAnchor.x, y: questionAnchor.y })
        .wait(4000).to({ alpha: 1 }, 500).to({ y: questionAnchor.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500).call(changechoice1);
    question1.visible = true
    question1.alpha = 0
    var questionAnchor2 = getScaledPosition(question1, sX1[qnoI1[1]], sY1[qnoI1[1]]);
    createjs.Tween.get(question1).set({ x: questionAnchor2.x, y: questionAnchor2.y })
        .wait(4000).to({ alpha: 1 }, 500).to({ y: questionAnchor2.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500);

    var tempVal1 = 1900;
    for (i = 0; i < 7; i++) {
        var choiceIndex = rand[i];
        dummyArr[choiceIndex].visible = true
        dummyArr[choiceIndex].alpha = 0
        var choiceTarget = getScaledPosition(dummyArr[choiceIndex], btnx[choiceIndex], btny[choiceIndex]);
        createjs.Tween.get(dummyArr[choiceIndex]).wait(tempVal1).to({ x: choiceTarget.x, y: choiceTarget.y, alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        setBasketHotspotPosition(choiceIndex, btnx2[choiceIndex], btny2[choiceIndex]);
        tweenBasketHotspot(choiceIndex, tempVal1, btnx[choiceIndex], btny[choiceIndex]);
        tempVal1 += 200;
    }

}

function AddListenerFn() {
    //////////////////////////////////////////////////////////////////////////
    //qText.text = "Select the letter against the new position of " //+ fruitArray[qnoI2[incr]] + "  ?";
    question2.gotoAndStop(qnoI2[cnt])
    layoutQuestionTargetIcon();

    fadeInQuestionPrompt(SPOTME_PROMPT_SELECT);

    if (question2) {
        question2.visible = true;
        question2.alpha = 0;
        createjs.Tween.get(question2).wait(200).to({ alpha: 1 }, 200);
    }

    ////////////////////////////////////////////////////////////////////////

    for (i = 0; i < 7; i++) {
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
function disablechoices() {
    hideQuestionPrompt();
    if (question2) {
        question2.visible = false
    }
    for (i = 0; i < 7; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
        stopChoiceIdleTween(dummyArr[i]);
        hideBasketHotspot(basketHotspots[i]);
    }
}
function changechoice1() {
    question.visible = false
    question1.visible = false
    var target0 = getScaledPosition(quesArr[qnoI1[0]], sX[qnoI1[3]], sY[qnoI1[3]]);
    createjs.Tween.get(quesArr[qnoI1[0]]).to({ x: target0.x, y: target0.y }, 300).wait(400);
    var target1 = getScaledPosition(quesArr[qnoI1[1]], sX[qnoI1[6]], sY[qnoI1[6]]);
    createjs.Tween.get(quesArr[qnoI1[1]]).to({ x: target1.x, y: target1.y }, 300).wait(400);
    var target2 = getScaledPosition(quesArr[qnoI1[2]], sX[qnoI1[0]], sY[qnoI1[0]]);
    createjs.Tween.get(quesArr[qnoI1[2]]).to({ x: target2.x, y: target2.y }, 300).wait(400);
    var target3 = getScaledPosition(quesArr[qnoI1[3]], sX[qnoI1[2]], sY[qnoI1[2]]);
    createjs.Tween.get(quesArr[qnoI1[3]]).to({ x: target3.x, y: target3.y }, 300).wait(400);
    var target4 = getScaledPosition(quesArr[qnoI1[6]], sX[qnoI1[1]], sY[qnoI1[1]]);
    createjs.Tween.get(quesArr[qnoI1[6]]).to({ x: target4.x, y: target4.y }, 300).wait(400).call(changeoption1);
}
function changeoption1() {
    var swap0 = getScaledPosition(quesArr[qnoI1[0]], sX[qnoI1[5]], sY[qnoI1[5]]);
    createjs.Tween.get(quesArr[qnoI1[0]]).to({ x: swap0.x, y: swap0.y }, 300).wait(400);
    var swap1 = getScaledPosition(quesArr[qnoI1[1]], sX[qnoI1[3]], sY[qnoI1[3]]);
    createjs.Tween.get(quesArr[qnoI1[1]]).to({ x: swap1.x, y: swap1.y }, 300).wait(400);
    var swap2 = getScaledPosition(quesArr[qnoI1[3]], sX[qnoI1[4]], sY[qnoI1[4]]);
    createjs.Tween.get(quesArr[qnoI1[3]]).to({ x: swap2.x, y: swap2.y }, 300).wait(400);
    var swap3 = getScaledPosition(quesArr[qnoI1[4]], sX[qnoI1[6]], sY[qnoI1[6]]);
    createjs.Tween.get(quesArr[qnoI1[4]]).to({ x: swap3.x, y: swap3.y }, 300).wait(400);
    var swap4 = getScaledPosition(quesArr[qnoI1[5]], sX[qnoI1[2]], sY[qnoI1[2]]);
    createjs.Tween.get(quesArr[qnoI1[5]]).to({ x: swap4.x, y: swap4.y }, 300).wait(400).call(AddListenerFn);
    ans = qnoI1[5]
}

function onRoll_over(e) {
    e.currentTarget.alpha = .8;
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
    // pauseTimer();
    console.log(answer + " =correct= " + uans)
    if (ans == uans) {
        getValidation("correct");
        disablechoices();
    } else {
        getValidation("wrong");
        disablechoices();
    }
}