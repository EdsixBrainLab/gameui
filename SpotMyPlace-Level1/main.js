///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 220, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 6, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, quesHolderMc, resultLoading, preloadMc;
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

var SPOTMYPLACE_PROMPT_OBSERVE = "Observe the places carefully.";
var SPOTMYPLACE_PROMPT_SELECT = "Which place did you see?";

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
            { id: "choiceMc", src: gameAssetsPath + "choiceMc.png" }
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
        call_UI_gameQuestion(container, SPOTMYPLACE_PROMPT_OBSERVE);
        if (QusTxtString) {
            container.parent.addChild(QusTxtString);
            QusTxtString.visible = false;
            updateQuestionPrompt(SPOTMYPLACE_PROMPT_OBSERVE);
        }
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

function updateQuestionPrompt(copy) {
    if (typeof SAUIX_setQuestionText === "function") {
        SAUIX_setQuestionText(copy, { textAlign: "center" });
    } else if (QusTxtString) {
        QusTxtString.text = copy;
        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.update === "function") {
            QusTxtString.__labelBG.update();
        }
    }
    if (QusTxtString) {
        QusTxtString.visible = true;
    }
}

function showQuestionPrompt(copy, options) {
    options = options || {};
    updateQuestionPrompt(copy);
    if (!QusTxtString) {
        if (typeof options.onComplete === "function") {
            options.onComplete();
        }
        return;
    }
    createjs.Tween.removeTweens(QusTxtString);
    var delay = (typeof options.delay === "number") ? options.delay : 0;
    var duration = (typeof options.duration === "number") ? options.duration : 400;
    var instant = !!options.instant || duration <= 0;
    QusTxtString.visible = true;
    if (instant) {
        QusTxtString.alpha = 1;
        if (typeof options.onComplete === "function") {
            options.onComplete();
        }
        return;
    }
    QusTxtString.alpha = 0;
    createjs.Tween.get(QusTxtString, { override: true })
        .wait(delay)
        .to({ alpha: 1 }, duration)
        .call(function () {
            if (typeof options.onComplete === "function") {
                options.onComplete();
            }
        });
}

function hideQuestionPrompt() {
    if (!QusTxtString) { return; }
    createjs.Tween.removeTweens(QusTxtString);
    QusTxtString.visible = false;
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
        Choice[i].name = "";
        Choice[i].__choiceIndex = i;
        Choice[i].__image = choiceArr[i];
        choiceArr[i].visible = false;
        choiceArr[i].alpha = 0;
        choiceArr[i].mouseEnabled = false;
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
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
        if (Choice[i]) {
            Choice[i].mouseEnabled = false;
        }
    }
}

function helpEnable() {
    for (i = 0; i < 6; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
        }
        if (Choice[i]) {
            Choice[i].mouseEnabled = true;
        }
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
    showQuestionPrompt(SPOTMYPLACE_PROMPT_OBSERVE, { duration: 300 });

    qnoI = between(0, 24);

    for (i = 0; i < 6; i++) {
        choiceArr[i].gotoAndStop(qnoI[i]);
        choiceArr[i].alpha = 1;
        choiceArr[i].name = "ch" + qnoI[i];
        choiceArr[i].visible = false;
        Choice[i].visible = false;
        Choice[i].alpha = 1;
        Choice[i].name = choiceArr[i].name;
        Choice[i].__image = choiceArr[i];
        choiceArr[i].mouseEnabled = false;
        Choice[i].mouseEnabled = false;
        Choice[i].cursor = "default";
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
    showQuestionPrompt(SPOTMYPLACE_PROMPT_SELECT, { duration: 300 });
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
        if (!choiceArr[i] || !Choice[i]) { continue; }
        Choice[i].visible = true;
        Choice[i].alpha = 1;
        Choice[i].mouseEnabled = false;
        Choice[i].cursor = "default";
        Choice[i].__choiceIndex = i;
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].cursor = "default";
        choiceArr[i].__choiceIndex = i;
    }

    revealChoices()

}
function revealChoices() {

    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(600)
        .to({ alpha: 1 }, 600)

    animateChoiceOptions(Choice, AddListenerFn);

}
function AddListenerFn() {

    for (i = 0; i < 6; i++) {
        if (!Choice[i]) { continue; }
        Choice[i].mouseEnabled = true;
        Choice[i].cursor = "pointer";
        Choice[i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function disableChoices() {

    for (i = 0; i < 6; i++) {
        if (Choice[i]) {
            Choice[i].removeEventListener("click", answerSelected);
            Choice[i].visible = false;
            Choice[i].cursor = "default";
            Choice[i].mouseEnabled = false;
        }
        if (choiceArr[i]) {
            choiceArr[i].visible = false;
            choiceArr[i].cursor = "default";
            choiceArr[i].mouseEnabled = false;
        }
    }

    question.visible = false;
    resetChoiceTweens();
    clearChoiceAnimations();
}

function animateChoiceOptions(choiceArray, onComplete) {
    if (!choiceArray) { return; }
    var pendingTweens = 0;
    var hasTweens = false;
    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile) { continue; }
        hasTweens = true;
        pendingTweens++;
        stopChoicePulse(tile);
        var baseScale = tile.baseScale || tile.scaleX || 1;
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
        tile.scaleX = tile.scaleY = Math.max(baseScale - 0.18, 0.55);
        var revealIndex = (typeof tile.__choiceIndex === "number") ? tile.__choiceIndex : idx;
        (function (target, base, finalY, order) {
            var delay = 200 + (order * 140);
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

    if (!hasTweens && typeof onComplete === "function") {
        onComplete();
    }
}

function startChoicePulse(tile, baseScale, targetY, index) {
    if (!tile) { return; }
    stopChoicePulse(tile);
    var scale = baseScale || tile.baseScale || tile.scaleX || 1;
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

function resetChoiceTweens() {
    for (i = 0; i < Choice.length; i++) {
        if (Choice[i]) {
            stopChoicePulse(Choice[i]);
        }
    }
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            stopChoicePulse(choiceArr[i]);
        }
    }
}

function clearChoiceAnimations() {
    for (i = 0; i < Choice.length; i++) {
        if (Choice[i]) {
            createjs.Tween.removeTweens(Choice[i]);
        }
    }
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            createjs.Tween.removeTweens(choiceArr[i]);
        }
    }
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
    var target = e.currentTarget;
    var revealTile = target.__image || null;
    if (revealTile) {
        revealTile.alpha = 1;
        revealTile.visible = true;
    }
    uans = target.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {

        target.visible = true;
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
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false
        }
        if (Choice[i]) {
            Choice[i].mouseEnabled = false;
        }
    }
}

function enableMouse() {

}