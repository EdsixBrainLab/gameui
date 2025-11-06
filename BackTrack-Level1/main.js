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
var intr = 0
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
var choiceMcArrY = [290, 304, 295]


// if (i == 0) {
// createjs.Tween.get(choiceMcArr[i]).wait(200)
// .to({ y: 291, alpha: 1 }, tempVal).wait(tempVal);//last
// }
// else if (i == 2) {
// createjs.Tween.get(choiceMcArr[i]).wait(200)
// .to({ y: 305, alpha: 1 }, tempVal).wait(tempVal);//mid
// }
// else {
// createjs.Tween.get(choiceMcArr[i]).wait(200)
// .to({ y: 296, alpha: 1 }, tempVal).wait(tempVal);//1st
// }

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
    gameAssetsPath = "BackTrack-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "holder", src: gameAssetsPath + "holder.png" },
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


    

    ans = "ch0";
   showQuestionPrompt(BACKTRACK_PROMPT_OBSERVE, { duration: 300 });

    container.parent.addChild(question);

    question.x = 580; question.y = 250;
    question.scaleX = question.scaleY = .8
    question.visible = true;
    question.gotoAndStop(qno[qcnt]);
    question.y = -1200
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ y: 258, alpha: 1 }, 1000)


    intr = setInterval(pickques, 3000);
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
    clearInterval(intr);
    tx = 0;

    qscnt++;
    qcnt++;
    cnt++;
    quesCnt++;
    panelVisibleFn()
    //==================================================================================//
    chpos = [];
    console.log(qno[qcnt])
    ans1 = "ch1"
    ans = "ch0";
     
    //createjs.Tween.get(qtext).wait(600).to({ alpha: 1 }, 600)

    question.gotoAndStop(qno[qcnt]);
    question.y = -1200
    question.alpha = 0
    question.visible = true;
    createjs.Tween.get(question).wait(1000)
        .to({ y: 258, alpha: 1 }, 1000)



    clearquesInterval = setInterval(createchoices, 3000);
}

function createchoices() {
    question.visible = false;
    pauseTimer()
    clearInterval(clearquesInterval);
    showQuestionPrompt(BACKTRACK_PROMPT_SELECT, { duration: 300 });
    for (i = 0; i < 3; i++) {

        choiceMcArr[i] = question.clone();
        choiceMcArr[i].y = 250;
        choiceMcArr[i].scaleX = choiceMcArr[i].scaleY = .7
        choiceMcArr[i].visible = false;
        choiceMcArr[i].gotoAndStop(qno[qcnt + i - 1]);
        container.parent.addChild(choiceMcArr[i]);
    }

    chpos = between(0, 2)
    console.log("test= " + chpos)
    for (i = 0; i <= choiceCnt; i++) {
        switch (i) {
            case 0:
                console.log('gg')
                choiceMcArr[chpos[i]].x = 140;
                //choiceMcArr[chpos[i]].y = 292;

                break;
            case 1:
                console.log('hlo')
                choiceMcArr[chpos[i]].x = 582;
                //choiceMcArr[chpos[i]].y = 297;

                break;
            case 2:
                console.log('hi')
                choiceMcArr[chpos[i]].x = 1032;
                //choiceMcArr[chpos[i]].y = 304;
                break;
        }

    }
    for (i = 0; i < 3; i++) {
        choiceMcArr[i].name = "ch" + i;
    }
    console.log(qno[qcnt])

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
        console.log(choiceMcArr[i].x)
    }

    createTween1()

}
function createTween1() {


    console.log("createTween1")

    for (i = 0; i < 3; i++) {
        var tile = choiceMcArr[i];
        var targetY = choiceMcArrY[i];
        tile.visible = true;
        tile.alpha = 0;
        tile.__choiceIndex = i;
        tile.__targetX = tile.x;
        tile.__targetY = targetY;
        tile.y = targetY;
    }
    animateChoiceOptions(choiceMcArr, AddListenerFn);
    //repTimeClearInterval = setTimeout(AddListenerFn, 3500)


}
function AddListenerFn() {

    //clearTimeout(repTimeClearInterval)
    for (i = 0; i < 3; i++) {
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
	hideQuestionPrompt()
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
        (function (target, base, finalY, order) {console.log("a3");
            var delay = 200 + (order * 140);
            createjs.Tween.get(target, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: finalY }, 320, createjs.Ease.quadOut);

            createjs.Tween.get(target, { override: false })
                .wait(delay)
                .to({ scaleX: base + 0.18, scaleY: base + 0.18 }, 360, createjs.Ease.backOut)
                .to({ scaleX: base, scaleY: base }, 260, createjs.Ease.sineOut)
                .call(function () {console.log("a4");
                    startChoicePulse(target, base, finalY, order);
                    pendingTweens = Math.max(0, pendingTweens - 1);
                    if (!pendingTweens && typeof onComplete === "function") {console.log("a5");
                        onComplete();
                    }
                });
        })(tile, baseScale, targetY, revealIndex);
    }

    if (!hasTweens && typeof onComplete === "function") {console.log("a6");
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
    for (i = 0; i < choiceMcArr.length; i++) {
        if (choiceMcArr[i]) {
            createjs.Tween.removeTweens(choiceMcArr[i]);
        }
    }
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

    if (ans == uans) {
        currentX = e.currentTarget.x + 10
        currentY = e.currentTarget.y + 100
        container.parent.addChild
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
        choiceMcArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}
