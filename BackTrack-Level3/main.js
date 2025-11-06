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
var qcnt = 0
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno = []
var chpos = [];
var choiceMcArr = []
var intr;
var clearquesInterval
var BACKTRACK_PROMPT_OBSERVE = "Observe and remember the sequence of pictures shown";
var BACKTRACK_PROMPT_SELECT = "Select the picture that was shown last but one";
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
    stage.addChild(container);
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
    gameAssetsPath = "BackTrack-Level3/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "holder", src: gameAssetsPath + "holder.png" }
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
        call_UI_gameQuestion(container, BACKTRACK_PROMPT_OBSERVE);

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

    qno = between(0, 20);
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
    tx = 0;
    panelVisibleFn()

    gameQCntTxt.text = (quesCnt + 1) + "/" + totalQuestions;

    showQuestionPrompt(BACKTRACK_PROMPT_OBSERVE, { duration: 300 });
    ans = "ch1";

    container.parent.addChild(question);
     question.gotoAndStop(qno[cnt + 1]);
    question.x = 510; question.y = 240;
    question.visible = true;
    question.y = -1200
    question.alpha = 0
	 question.scaleX = question.scaleY = .75
    createjs.Tween.get(question).wait(800)
        .to({x:583, y: 274, alpha: 1 }, 800)
    intr = setInterval(idle1, 3000)
}
function idle1() {
    clearInterval(intr);
    tx = 0;
    panelVisibleFn()
    gameQCntTxt.text = (quesCnt + 1) + "/" + totalQuestions;
    qcnt++;

    question.gotoAndStop(qno[cnt + 2]);
    question.visible = true;
    question.y = -1200
    question.alpha = 0
         question.scaleX = question.scaleY = .75
    createjs.Tween.get(question).wait(1000)
        .to({x:583, y: 275, alpha: 1 }, 1000)
    showQuestionPrompt(BACKTRACK_PROMPT_OBSERVE, { duration: 300 });
    intr = setInterval(pickques, 3000)
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 3; i++) {
        choiceMcArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 3; i++) {
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
	ans = "ch1";
    panelVisibleFn()
    question.gotoAndStop(qno[cnt + 2]);
    question.visible = true;
    question.y = -1200
    question.alpha = 0
         question.scaleX = question.scaleY = .75
    createjs.Tween.get(question)
        .to({x:578, y: 273, alpha: 1 }, 1000)
    showQuestionPrompt(BACKTRACK_PROMPT_OBSERVE, { duration: 300 });
    clearquesInterval = setInterval(createchoices, 3000);
}

function createchoices() {
    question.visible = false;
    pauseTimer()
    clearInterval(clearquesInterval);
    showQuestionPrompt(BACKTRACK_PROMPT_SELECT, { duration: 300 });


    for (i = 0; i < 3; i++) {

        choiceMcArr[i] = question.clone();
        choiceMcArr[i].x = 250 + (i * 350);
        choiceMcArr[i].y = 270;
        choiceMcArr[i].name = "ch" + (i + 1);
        choiceMcArr[i].visible = false;
        choiceMcArr[i].gotoAndStop(qno[cnt + 2 + i - 2]);
        container.parent.addChild(choiceMcArr[i]);
    }

    chpos = between(0, 2)
    console.log("test= " + chpos)
    // for (i = 0; i < choiceCnt; i++) {
        // switch (i) {
            // case 0:
                // choiceMcArr[chpos[i]].x = 140;

                // break;
            // case 1:
                // choiceMcArr[chpos[i]].x = 530;

                // break;
            // case 2:
                // choiceMcArr[chpos[i]].x = 930;

                // break;
        // }

    // }
 // for (i = 0; i < 3; i++) {
        // choiceMcArr[i].name = "ch" + i ;
    // }
    console.log(qno[cnt])

    enableChoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enableChoices() {
    for (i = 0; i < 3; i++) {
        choiceMcArr[i].alpha = 1;
        choiceMcArr[i].cursor = "pointer";
        choiceMcArr[i].mouseEnabled = true;
    }
    createTween1()

}
function createTween1() {
    chpos = between(0, 2)
    for (i = 0; i < 3; i++) {
        choiceMcArr[chpos[i]].x = 160 + (i * 429);
    }
    for (i = 0; i < 3; i++) {
        var tile = choiceMcArr[i];
        if (!tile) { continue; }
        tile.visible = true;
        tile.alpha = 0;
        tile.__choiceIndex = i;
        tile.__targetX = tile.x;
        tile.__targetY = 276;
        tile.y = tile.__targetY;
    }

    animateChoiceOptions(choiceMcArr, AddListenerFn);

}
function AddListenerFn() {

    for (i = 0; i < 3; i++) {
        if (!choiceMcArr[i]) { continue; }
        choiceMcArr[i].mouseEnabled = true;
        choiceMcArr[i].cursor = "pointer";
        choiceMcArr[i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function disablechoices() {
    for (i = 0; i < 3; i++) {
        choiceMcArr[i].removeEventListener("click", answerSelected);
        choiceMcArr[i].visible = false;
        choiceMcArr[i].alpha = .5;
        choiceMcArr[i].cursor = "default";
        choiceMcArr[i].mouseEnabled = false
    }
    resetChoiceTweens();
    clearChoiceAnimations();
    hideQuestionPrompt();
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
    console.log("name" + uans + "   " + ans)
    gameResponseTimerStop();
    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse();
        getValidation("correct");
        disablechoices();
    } else {

        getValidation("wrong");
        disablechoices();
    }
}

function disableMouse() {
    for (i = 0; i < 3; i++) {
        choiceMcArr[i].mouseEnabled = false
    }
}

function enableMouse() {

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
    for (i = 0; i < choiceMcArr.length; i++) {
        if (choiceMcArr[i]) {
            stopChoicePulse(choiceMcArr[i]);
        }
    }
}

function clearChoiceAnimations() {
    for (i = 0; i < choiceMcArr.length; i++) {
        if (choiceMcArr[i]) {
            createjs.Tween.removeTweens(choiceMcArr[i]);
        }
    }
}
