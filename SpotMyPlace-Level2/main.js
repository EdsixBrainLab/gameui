///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 220, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 9, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var ques1, ques2, ques3, ques4, ques5, chHolderMc;
var text1, text2, text3, choiceMc2, choiceMc3;
var arrCnt = 0;
var currentX, currentY
var answer
var btny = [40, 153, 265, 377, 490]

var quesArr = []
var SPOTMYPLACE_PROMPT_OBSERVE = "Observe the places carefully.";
var SPOTMYPLACE_PROMPT_SELECT = "Which place did you see?";
var btnx1 = [50, 317, 585, 50, 317, 585, 50, 317, 585]
var btny1 = [170, 170, 170, 350, 350, 350, 530, 530, 530]
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI1 = []
var qnoI = [];
var qno = [];

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
    gameAssetsPath = "SpotMyPlace-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////////////////intro////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            ///////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "question.png" },
            { id: "answerImg", src: gameAssetsPath + "Answer.png" }
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

    if (id == "answerImg") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("answerImg")],
            "frames": { "regX": 0, "height": 341, "count": 100, "regY": 0, "width": 342 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        answerImg = new createjs.Sprite(spriteSheet3);
        answerImg.visible = false;
        container.parent.addChild(answerImg);
    };

    if (id == "choice1") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 177, "count": 100, "regY": 0, "width": 178 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet3);
        choice1.visible = false;
        container.parent.addChild(choice1);
        call_UI_gameQuestion(container, SPOTMYPLACE_PROMPT_OBSERVE);
        if (QusTxtString) {
            container.parent.addChild(QusTxtString);
            QusTxtString.visible = false;
            updateQuestionPrompt(SPOTMYPLACE_PROMPT_OBSERVE);
        }
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

    for (i = 0; i < 9; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i])
        quesArr[i].visible = false;
        quesArr[i].x = btnx1[i]
        quesArr[i].y = btny1[i]
        quesArr[i].name = i
        quesArr[i].scaleX = quesArr[i].scaleY = .9
        quesArr[i].mouseEnabled = false;
        quesArr[i].cursor = "default";
    }

    question = answerImg.clone()
    question.x = 840
    question.y = 240
    container.parent.addChild(question);
    question.visible = false


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/

    stage.update();
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 9; i++) {
        if (quesArr[i]) {
            quesArr[i].mouseEnabled = false;
        }
    }
}

function helpEnable() {
    for (i = 0; i < 9; i++) {
        if (quesArr[i]) {
            quesArr[i].mouseEnabled = true;
        }
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    //for db
    
    pauseTimer()
    tx = 0;
    qscnt++;
    //db

    cnt++;
    quesCnt++;
    arrCnt++;

    fpushArr = [];
    qnoI1 = []
    qnoI = []
    panelVisibleFn()
    //----------------------------------------------------------------------------------------------

    qnoI1 = range(0, 8)
    qnoI = between(0, 24)

    question.visible = false
    showQuestionPrompt(SPOTMYPLACE_PROMPT_OBSERVE, { duration: 300 });
    for (i = 0; i < 9; i++) {

        quesArr[i].gotoAndStop(qnoI[i])
        quesArr[i].visible = false
        quesArr[i].mouseEnabled = false
        quesArr[i].alpha = 1

    }

    // setTimeout(questiondisplay, 4000)

    cnt1 = -1;
    setTimeout(showflowers, 700)



}
function showflowers() {
    cnt1++;
    quesArr[cnt1].visible = true;

    setTimeout(creatDelayfn, 500)
}
function creatDelayfn() {

    if (cnt1 < 8) {
        showflowers()
    }
    else {
        setTimeout(questiondisplay, 500)

    }

}

function questiondisplay() {
    // pauseTimer()
    showQuestionPrompt(SPOTMYPLACE_PROMPT_SELECT, { duration: 300 });
    for (i = 0; i < 10; i++) {
        if (i == 9) {
            question.gotoAndStop(qnoI[qnoI1])
            question.visible = false
        }
        else {
            quesArr[i].gotoAndStop(25)
            quesArr[i].visible = true
        }
    }
    ans = qnoI1
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
    enablechoices();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 0; i < 9; i++) {
        if (!quesArr[i]) { continue; }
        quesArr[i].visible = true;
        quesArr[i].alpha = 1;
        quesArr[i].mouseEnabled = false;
        quesArr[i].cursor = "default";
        quesArr[i].__choiceIndex = i;
    }
    revealChoices()

}
function revealChoices() {

    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(600)
        .to({ alpha: 1 }, 600)

    animateChoiceOptions(quesArr, AddListenerFn);

}
function AddListenerFn() {

    for (i = 0; i < 9; i++) {
        if (!quesArr[i]) { continue; }
        quesArr[i].mouseEnabled = true;
        quesArr[i].cursor = "pointer";
        quesArr[i].addEventListener("click", answerSelected)
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function disablechoices() {
    for (i = 0; i < 9; i++) {
        if (!quesArr[i]) { continue; }
        quesArr[i].removeEventListener("click", answerSelected)
        quesArr[i].visible = false;
        quesArr[i].cursor = "default";
        quesArr[i].mouseEnabled = false
    }
    question.visible = false

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
    for (i = 0; i < quesArr.length; i++) {
        if (quesArr[i]) {
            stopChoicePulse(quesArr[i]);
        }
    }
}

function clearChoiceAnimations() {
    for (i = 0; i < quesArr.length; i++) {
        if (quesArr[i]) {
            createjs.Tween.removeTweens(quesArr[i]);
        }
    }
}

//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//
function onRoll_over(e) {

}

function onRoll_out(e) {

}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {

    e.preventDefault();
    uans = e.currentTarget.name;

    gameResponseTimerStop();
    // pauseTimer();
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
    for (i = 0; i < 9; i++) {

        quesArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}