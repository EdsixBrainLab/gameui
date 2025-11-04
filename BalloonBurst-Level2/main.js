
var messageField;		//Message display field

var assets = [];
var mc1 = [];
var qno = [];
var chpos = []
var chpos1 = []
var objArr = [];
var quesArr = []
var choiceArr = []
var choiceMcArr = []
var quesMcArr = []
var chposArr = []
var xArr = []
var yArr = []
var tweenMcArr = []
var pushArr = []
var getFinalObjArr = []
var timeFrameSpeed = 15;
var currentX, currentY

// var objArr0 = [{x:271.2,y:243.4},{x:189.2,y:342.4},{x:190.5,y:474.6}]

// var objArr1 = [{x:329.1,y:246.1},{x:294.1,y:349.1},{x:335.1,y:469}]

//  var objArr2 = [{x:410.4,y:270.2},{x:437.4,y:366.1},{x:478.9,y:477.1}]

// var objArr3 = [{x:523.3,y:242.7},{x:569.3,y:343.7},{x:625.3,y:476}]

// var objArr4 = [{x:589.2,y:243.2},{x:684.2,y:346.2},{x:560.2,y:548.7}]

// var objArr5 = [{x:196.3,y:243.7},{x:113.3,y:347.7},{x:118.7,y:541.7}]

// var objArr6 = [{x:272.1,y:243.8},{x:399.3,y:399.3},{x:280.2,y:548.8}]


// var objArr7 = [{x:356.8,y:243.8},{x:369.8,y:372.8},{x:417,y:548.8}]

// var objArr8 = [{x:531.6,y:244.3},{x:369.8,y:390.2},{x:537.6,y:549.3}]


// var objArr9 = [{x:677,y:242.9},{x:646.7,y:379.5},{x:665,y:553.8}]

var objArr0 = [{ x: 271.2 - 300, y: 243.4 }, { x: 189.2 - 300, y: 342.4 }, { x: 190.5 - 300, y: 474.6 }]

var objArr1 = [{ x: 329.1 - 230, y: 246.1 }, { x: 294.1 - 230, y: 349.1 }, { x: 335.1 - 230, y: 400 }]

var objArr2 = [{ x: 410.4 - 150, y: 270.2 }, { x: 437.4 - 150, y: 366.1 }, { x: 478.9 - 100, y: 477.1 }]

var objArr3 = [{ x: 523.3 - 60, y: 242.7 }, { x: 569.3 - 60, y: 343.7 }, { x: 625.3 - 60, y: 400 }]

var objArr4 = [{ x: 531.6 + 135, y: 244.3 }, { x: 369.8 + 135, y: 390.2 }, { x: 737.6, y: 474.3 }]


//var objArr4 = [{ x: 589.2 - 110, y: 243.2 }, { x: 684.2 - 110, y: 346.2 }, { x: 870.2 - 110, y: 548.7 }]

var objArr5 = [{ x: 196.3 + 80, y: 243.7 }, { x: 113.3 + 80, y: 347.7 }, { x: 118.7 + 80, y: 541.7 }]

var objArr6 = [{ x: 272.1 - 280, y: 243.8 }, { x: 399.3 - 280, y: 399.3 }, { x: 280.2 - 280, y: 548.8 }]


var objArr7 = [{ x: 356.8 + 285, y: 243.8 }, { x: 369.8 + 285, y: 372.8 }, { x: 417 + 285, y: 548.8 }]



var objArr9 = [{ x: 677 + 220, y: 242.9 }, { x: 646.7 + 220, y: 379.5 }, { x: 685 + 220, y: 553.8 }]

//--------------------------------------------------QuestionSet------------------------------------------------------//
var questionArr0 = [0, 6, 12, 3, 4, 5, 14, 7, 8, 9]

var questionArr1 = [4, 8, 10, 5, 8, 9, 6, 2, 1, 13]

var questionArr2 = [2, 2, 2, 2, 2, 9, 9, 9, 13, 13]

var questionArr3 = [3, 3, 10, 10, 10, 7, 7, 7, 10, 7]

var questionArr4 = [4, 6, 12, 1, 3, 5, 9, 14, 11, 10]

var questionArr5 = [4, 8, 10, 5, 1, 3, 7, 6, 11, 14]

var questionArr6 = [6, 6, 6, 6, 6, 9, 9, 9, 13, 13]

var questionArr7 = [7, 7, 10, 10, 10, 8, 8, 8, 8, 10]

var questionArr8 = [8, 6, 12, 10, 9, 7, 4, 3, 1, 5]

var questionArr9 = [4, 8, 10, 9, 7, 3, 5, 0, 1, 6]

var questionArr10 = [10, 10, 10, 10, 10, 9, 9, 9, 13, 13]

var questionArr11 = [11, 11, 10, 10, 10, 10, 8, 8, 8, 8]

var questionArr12 = [12, 6, 11, 8, 7, 1, 3, 5, 0, 13]

var questionArr13 = [4, 8, 10, 13, 0, 5, 3, 2, 14, 9]

var questionArr14 = [14, 14, 14, 14, 14, 9, 9, 9, 13, 13]

//---------------------------------------------------------------------------------------------------------------------//
var answerArr0 = [0, 11, 13, 1]

var answerArr1 = [12, 8, 10, 4]

var answerArr2 = [2, 13, 9, 11]

var answerArr3 = [7, 1, 3, 10]

var answerArr4 = [12, 2, 7, 0]

var answerArr5 = [2, 4, 8, 10]

var answerArr6 = [6, 13, 9, 11]

var answerArr7 = [8, 1, 7, 10]

var answerArr8 = [8, 2, 0, 11]

var answerArr9 = [13, 4, 8, 10]

var answerArr10 = [10, 13, 9, 11]

var answerArr11 = [11, 1, 8, 10]

// var answerArr12 = [12, 4, 9, 2]

// var answerArr13 = [14, 13, 9, 11]
var btnX = []
//------------------------------------------------------------------------------------------------------------------//
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 6, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, quesMarkMc, quesHolderMc, resultLoading, preloadMc;
var mc, mc2, mc3, mc4, mc5, startMc, ch = 0, n = 0, chHolderMc, balloonMc, speed = 15, objCnt = -1, numCnt = 0, clearquesInterval;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;

var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var isBgSound = true;
var isEffSound = true;

var isOlderBrowser = false;
var isLandOrientation = false;


var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;

var lastW, lastH, lastS = 1;

var borderPadding = 10, barHeight = 20;

var loadProgressLabel, progresPrecentage, loaderWidth;

var introImg
var BALLOON_SCENARIO_QUESTIONS = [
    "Which of these was shown? Ani: Pink rose/yellow gift/blue diamond",
    "Which of these was not shown? Ani: purple rose/purple gift/green diamond",
    "Which of these was more in count? Ani: Red rose 5 / skyblue gift 3 / pink diamond 2",
    "Which of these was less in count? Ani: Light Rose 2 / Green Diamond 4 / Blue Gift 4",
    "Which of these was shown? Ani: Purple rose/yellow gift/blue diamond",
    "Which of these was not shown? Ani: purple rose/purple gift/green diamond",
    "Which of these was more in count? Ani: Yellow Gift 5 / skyblue gift 3 / pink diamond 2",
    "Which of these was less in count? Ani: Blue Gift 2 / Green Diamond 4 / Purple Gift 4",
    "Which of these was shown? Ani: Purple Gift/yellow gift/blue diamond",
    "Which of these was not shown? Ani: purple rose/purple gift/green diamond",
    "Which of these was more in count? Ani: Green Diamond 5 / skyblue gift 3 / pink diamond 2",
    "Which of these was less in count? Ani: Red Star 2 / Green Diamond 4 / Purple Gift 4",
    "Which of these was shown? Ani: Blue Diamond/yellow gift/Red star",
    "Which of these was not shown? Ani: Purple Rose/purple gift/green diamond",
    "Which of these was more in count? Ani: Yellow Diamond 5 / skyblue gift 3 / pink diamond 2"
];
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
     */

    assetsPath = "assets/";
    gameAssetsPath = "BalloonBurst-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "balloon", src: gameAssetsPath + "balloon.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
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

    if (id == "balloon") {
        balloonMc = new createjs.Bitmap(preload.getResult('balloon'));
        container.parent.addChild(balloonMc);
        balloonMc.visible = false;
    }

    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 233, "count": 0, "regY": 50, "width": 232 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        question.x = 100; question.y = 100
        container.parent.addChild(question);
    };
    //
    if (id == "choice1") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 233, "count": 0, "regY": 50, "width": 232 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet3);
        choice1.visible = false;
        container.parent.addChild(choice1);
        call_UI_gameQuestion(container, getScenarioQuestionText(0));
        if (QusTxtString) {
            container.parent.addChild(QusTxtString);
            QusTxtString.visible = false;
        }
        updateQuestionText(getScenarioQuestionText(0));
    }

}

function tick(e) {
    stage.update();
}

function getScenarioQuestionText(index) {
    var questionIndex = (typeof index === "number") ? index : 0;
    if (questionIndex < 0 || questionIndex >= BALLOON_SCENARIO_QUESTIONS.length) {
        questionIndex = 0;
    }
    return BALLOON_SCENARIO_QUESTIONS[questionIndex];
}

function updateQuestionText(copy) {
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
    updateQuestionText(copy);
    var onComplete = typeof options.onComplete === "function" ? options.onComplete : null;
    if (!QusTxtString) {
        if (onComplete) { onComplete(); }
        return;
    }
    createjs.Tween.removeTweens(QusTxtString);
    QusTxtString.visible = true;
    var instant = !!options.instant;
    var delay = (typeof options.delay === "number") ? options.delay : 0;
    var duration = (typeof options.duration === "number") ? options.duration : 400;
    if (instant || duration <= 0) {
        QusTxtString.alpha = 1;
        if (onComplete) { onComplete(); }
        return;
    }
    QusTxtString.alpha = 0;
    createjs.Tween.get(QusTxtString, { override: true })
        .wait(delay)
        .to({ alpha: 1 }, duration)
        .call(function () {
            if (onComplete) { onComplete(); }
        });
}

function hideQuestionPrompt() {
    if (!QusTxtString) { return; }
    createjs.Tween.removeTweens(QusTxtString);
    QusTxtString.visible = false;
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 9);
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


    balloonMc.visible = false;
    balloonMc.y = 650;
    balloonMc.x = 550;
    if (QusTxtString) {
        container.parent.addChild(QusTxtString);
        QusTxtString.visible = false;
        QusTxtString.alpha = 0;
    }
    hideQuestionPrompt();

    for (i = 0; i < choiceCnt; i++) {
        quesArr[i] = question.clone()
        container.parent.addChild(quesArr[i])
        quesArr[i].visible = false;
        quesArr[i].gotoAndStop(i);
        quesArr[i].scaleX = quesArr[i].scaleY = .7
        quesArr[i].x = 359;
        quesArr[i].y = 150;
    }

    for (i = 0; i < 4; i++) {
        choiceArr[i] = choice1.clone()
        container.parent.addChild(choiceArr[i])
        choiceArr[i].scaleX = choiceArr[i].scaleY = .9
        choiceArr[i].visible = false;
    }
    choiceArr[0].x = 140; choiceArr[0].y = 360;
    choiceArr[1].x = 1010; choiceArr[1].y = 360;
    choiceArr[2].x = 430; choiceArr[2].y = 360;
    choiceArr[3].x = 720; choiceArr[3].y = 360;


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/

}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 4; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 4; i++) {
        choiceArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = []
    chpos1 = []
    pushArr = []
    numCnt = 0
    getFinalObjArr = []
    panelVisibleFn()
    //////////////////////////////////////////////////////////////////////////////////////////
    var questionText = getScenarioQuestionText(qno[cnt]);
    showQuestionPrompt(questionText, { duration: 300 });

    for (i = 0; i < choiceCnt; i++) {
        pushArr.push(this["questionArr" + qno[cnt]][i])
        console.log(this["questionArr" + qno[cnt]][i])
    }


    for (i = 0; i < choiceCnt; i++) {
        quesArr[i].visible = false;
        quesArr[i].gotoAndStop(i)
        getFinalObjArr.push(quesArr[pushArr[i]])
    }


    balloonMc.visible = true;
    balloonMc.y = 650;

    createjs.Ticker.addEventListener("tick", gameLoop)
    ans = "ch0";
    //////////////////////////////////////////////////////////////////////////////////////

}
function gameLoop() {
    balloonMc.y -= speed;
    if (balloonMc.y == 110) {
        balloonMc.visible = false
        createjs.Ticker.removeEventListener("tick", gameLoop)
        console.log("loop stoped")
        createChoices()
    }
}

function createChoices() {
    pushArr.sort(randomSort)
    for (i = 0; i < 6; i++) {
        tweenMcArr[i] = new createjs.MovieClip(null, 0, true, { start: 20 });
        container.parent.addChild(tweenMcArr[i]);
        quesArr[i].visible = true;
        quesArr[i].gotoAndStop(pushArr[i])
        quesArr[i].x = 50 + (i * 70)
        quesArr[i].y = 150;
        tweenMcArr[i].timeline.addTween(
            createjs.Tween.get(quesArr[i])
                .to({ x: 550, y: 50 }, 9).to({ x: this["objArr" + i][0].x + 320, y: this["objArr" + i][0].y + 50 }, timeFrameSpeed).to({ x: this["objArr" + i][1].x + 320, y: this["objArr" + i][1].y + 50 }, timeFrameSpeed).to({ x: this["objArr" + i][2].x + 320, y: this["objArr" + i][2].y + 50 }, timeFrameSpeed));
        tweenMcArr[i].gotoAndPlay("start");
        tweenMcArr[i].addEventListener("tick", onComplete)

    }

}

function onComplete(e) {

    if (e.currentTarget.currentFrame == 53) {
        e.currentTarget.stop()
        e.currentTarget.removeEventListener("tick", onComplete)
        numCnt++;
        if (numCnt == 1) {
            clearquesInterval = setInterval(createNewQuestions, 3000);
        }
    }
}
//
function createNewQuestions() {
    clearInterval(clearquesInterval)
    console.log("createNewQuestions")
    for (i = 0; i < choiceCnt; i++) {
        chpos1.push({ posx: quesArr[i].x, posy: quesArr[i].y })
        quesArr[i].visible = false;
    }
    for (i = 0; i < 4; i++) {
        choiceArr[i].visible = false;
        choiceArr[i].alpha = 1;
        choiceArr[i].gotoAndStop(this["answerArr" + qno[cnt]][i])
        console.log(this["answerArr" + qno[cnt]][i])
        chpos.push({ posx: choiceArr[i].x, posy: choiceArr[i].y })
    }
    chpos.sort(randomSort)
    for (i = 0; i < 4; i++) {
        choiceArr[i].x = chpos[i].posx;
        choiceArr[i].y = chpos[i].posy;
        btnX[i] = choiceArr[i].x
    }

    createTween()
}
function createTween() {
    showQuestionPrompt(getScenarioQuestionText(qno[cnt]), { instant: true });
    resetChoiceTweens();
    clearChoiceAnimations();

    for (i = 0; i < 4; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].cursor = "default";
        choiceArr[i].__targetX = choiceArr[i].x;
        choiceArr[i].__targetY = choiceArr[i].y;
        choiceArr[i].baseScale = choiceArr[i].scaleX || 1;
    }

    animateChoiceOptions(choiceArr, AddListenerFn);
}
function AddListenerFn() {
    console.log("eventlisterneer")
    for (i = 0; i < 4; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
        choiceArr[i].name = "ch" + i;
        choiceArr[i].cursor = "pointer";
        choiceArr[i].mouseEnabled = true
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {

}

function disablechoices() {
    for (i = 0; i < 4; i++) {
        choiceArr[i].visible = false;
        choiceArr[i].removeEventListener("click", answerSelected);
        // choiceArr[i].removeEventListener("mouseover", onRoll_over);
        // choiceArr[i].removeEventListener("mouseout", onRoll_out)
        choiceArr[i].cursor = "default";
        choiceArr[i].mouseEnabled = false;
    }
    resetChoiceTweens();
    clearChoiceAnimations();
}
//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//
function onRoll_over(e) {
    e.currentTarget.alpha = .5;
    stage.update();
}

function onRoll_out(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {
        currentX = e.currentTarget.x + 15
        currentY = e.currentTarget.y + 15
        e.currentTarget.visible = true;
        disableMouse()

        for (i = 0; i < 4; i++) {
            choiceArr[i].removeEventListener("click", answerSelected);
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
    for (i = 0; i < 4; i++) {
        choiceArr[i].mouseEnabled = false
    }
    resetChoiceTweens();
    clearChoiceAnimations();
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
        tile.y = targetY + 60;
        tile.scaleX = tile.scaleY = Math.max(baseScale - 0.18, 0.45);
        var revealIndex = (typeof tile.__choiceIndex === "number") ? tile.__choiceIndex : idx;
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
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            stopChoicePulse(choiceArr[i]);
        }
    }
}

function clearChoiceAnimations() {
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            createjs.Tween.removeTweens(choiceArr[i]);
        }
    }
}