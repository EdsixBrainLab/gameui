
///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, ansHolder, circle1Outline, boardMc, helpMc, quesMarkMc, quesHolderMc, resultLoading, preloadMc, introHintImg, introHintImg1, introHintImg2;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc, ch1 = 0, ch = 0, qqcnt = -1, clk = 0, correctCnt = 0;
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
var btnPadding = 50;
var answerButtons = [];
var MINDCAPTURE_PROMPT_OBSERVE = "Observe the objects carefully.";
var MINDCAPTURE_PROMPT_DECIDE = "Does the highlighted object belong to the group?";
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var yesMc, noMc
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var quesArr = []
var qno1 = []
var btnx = [, 163, 585, 1018]
var qno = [];
var pos = []
var posChangeArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
var choiceChange = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
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
     */

    assetsPath = "assets/";
    gameAssetsPath = "MindCapture-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "introHintImg1", src: gameAssetsPath + "Introhintimg.png" },
            { id: "introHintImg", src: gameAssetsPath + "Introhintimg1.png" },
            { id: "introHintImg2", src: gameAssetsPath + "Introhintimg2.png" },
            { id: "qhHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "choice1", src: gameAssetsPath + "question.png" },
            { id: "question", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "no", src: questionTextPath + "MindCapture-Level2-QT1.png" },
            { id: "yes", src: questionTextPath + "MindCapture-Level2-QT2.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
    if (id == "introHintImg1") {
        introHintImg1 = new createjs.Bitmap(preload.getResult('introHintImg1'));
        container.parent.addChild(introHintImg1);
        introHintImg1.visible = false;
    }
    if (id == "introHintImg") {
        introHintImg = new createjs.Bitmap(preload.getResult('introHintImg'));
        container.parent.addChild(introHintImg);
        introHintImg.visible = false;
    }
    if (id == "introHintImg2") {
        introHintImg2 = new createjs.Bitmap(preload.getResult('introHintImg2'));
        container.parent.addChild(introHintImg2);
        introHintImg2.visible = false;
    }
    if (id == "qhHolder") {
        qhHolder = new createjs.Bitmap(preload.getResult('qhHolder'));
        container.parent.addChild(qhHolder);
        qhHolder.visible = false;

    }

    if (id == "yes") {
        yesMc = new createjs.Bitmap(preload.getResult('yes'));
        container.parent.addChild(yesMc);
        yesMc.regX = 50
        yesMc.regY = 50
        yesMc.visible = false;

    }

    if (id == "no") {
        noMc = new createjs.Bitmap(preload.getResult('no'));
        container.parent.addChild(noMc);
        noMc.regX = 50
        noMc.regY = 50
        noMc.visible = false;

    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 82, "height": 250, "count": 64, "regY": 0, "width": 249 }
        });

        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);

    }

    if (id == "question") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("question")],
            "frames": { "regX": 82, "height": 257, "count": 64, "regY": 0, "width": 257 }
        });

        question = new createjs.Sprite(spriteSheet2);
        question.visible = false;
        container.parent.addChild(question);
        call_UI_gameQuestion(container, MINDCAPTURE_PROMPT_OBSERVE);
        updateQuestionText(MINDCAPTURE_PROMPT_OBSERVE);
        if (QusTxtString) {
            QusTxtString.visible = false;
        }

    }


}

function tick(e) {

    stage.update();
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

function fadeInQuestionText() {
    if (QusTxtString) {
        QusTxtString.visible = true;
        createjs.Tween.get(QusTxtString, { override: true })
            .set({ alpha: 0 })
            .wait(300)
            .to({ alpha: 1 }, 300);
    }
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

    if (QusTxtString) {
        container.parent.addChild(QusTxtString);
        QusTxtString.visible = false;
        QusTxtString.alpha = 0;
    }

    qhHolder.visible = false;
    container.parent.addChild(qhHolder)
    container.parent.addChild(choice1);
    choice1.visible = false;


    for (i = 1; i <= 3; i++) {
        quesArr[i] = choice1.clone();
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        quesArr[i].x = btnx[i]
        quesArr[i].y = 233
        quesArr[i].scaleX = quesArr[i].scaleY = 1.2
    }

    question.visible = false;
    container.parent.addChild(question);
    question.scaleX = question.scaleY = .8

    container.parent.addChild(yesMc, noMc);
    posChangeArr.sort(randomSort)
    yesMc.name = "Y";
    yesMc.x = 400; yesMc.y = 600;
    yesMc.baseScale = yesMc.scaleX = yesMc.scaleY = 0.8;
    yesMc.__targetX = yesMc.x;
    yesMc.__targetY = yesMc.y;
    yesMc.__choiceIndex = 0;

    noMc.name = "N";
    noMc.x = 830; noMc.y = 600;
    noMc.baseScale = noMc.scaleX = noMc.scaleY = 0.8;
    noMc.__targetX = noMc.x;
    noMc.__targetY = noMc.y;
    noMc.__choiceIndex = 1;

    answerButtons = [yesMc, noMc];

    if (isQuestionAllVariations) {
        createGameWiseQuestions()
        choiceChange = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
        //pickques()
    } else {
        // pickques()
        choiceChange = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
    }
    choiceChange.sort(randomSort)
}

function helpEnable() {
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true
}

function helpDisable() {
    yesMc.mouseEnabled = false
    noMc.mouseEnabled = false
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
    clk = 0;
    correctCnt = 0;
    chpos = [];
    panelVisibleFn()


    updateQuestionText(MINDCAPTURE_PROMPT_OBSERVE);
    fadeInQuestionText();

    qhHolder.visible = false
    //init x pos210,410,610//

    qno1 = between(0, 9);
    question.visible = false;
    yesMc.visible = false;
    noMc.visible = false;
    for (i = 1; i <= 3; i++) {
        quesArr[i].gotoAndStop(qno1[i]);
        quesArr[i].visible = false;
        postionofobjects(i)
        pos[i] = ans1;
        quesArr[i].x = -1900
    }

    createChoices();
    createTween();
}

function createChoices() {

    qch = [1, 2, 3]
    qch.sort(randomSort)
    qch1 = [1, 2, 3]
    qch1.sort(randomSort)

    var randVal
    var rand = qno1[qch[1]] * 3

    if (rand == 0) {
        randVal = range(0, 2)
    } else if (rand == 3) {
        randVal = range(3, 5)
    } else if (rand == 6) {
        randVal = range(6, 8)
    } else if (rand == 9) {
        randVal = range(9, 11)
    } else if (rand == 12) {
        randVal = range(12, 14)
    } else if (rand == 15) {
        randVal = range(15, 17)
    } else if (rand == 18) {
        randVal = range(18, 20)
    } else if (rand == 21) {
        randVal = range(21, 23)
    } else if (rand == 24) {
        randVal = range(24, 26)
    } else if (rand == 27) {
        randVal = range(27, 29)
    }
    //  qch = between(1, 3)
    //  qch1 = between(1,3)

    question.gotoAndStop(randVal);

    switch ((rand)) {
        case 0:
        case 1:
        case 2:
            ans1 = "musicalinstruments";
            break;
        case 3:
        case 4:
        case 5:
            ans1 = "fruits";
            break;
        case 6:
        case 7:
        case 8:
            ans1 = "birds";
            break;
        case 9:
        case 10:
        case 11:
            ans1 = "alphabets";
            break;
        case 12:
        case 13:
        case 14:
            ans1 = "transports";
            break;
        case 15:
        case 16:
        case 17:
            ans1 = "vegetables";
            break;
        case 18:
        case 19:
        case 20:
            ans1 = "animals";
            break;
        case 21:
        case 22:
        case 23:
            ans1 = "insects";
            break;
        case 24:
        case 25:
        case 26:
            ans1 = "shapes";
            break;
        case 27:
        case 28:
        case 29:
            ans1 = "flowers";
            break;
    }


    switch (choiceChange[cnt]) {
        case 1:
            question.x = 185;

            break;
        case 2:
            question.x = 605;

            break;
        case 3:
            question.x = 1020;

            break;
    }

    //190,615,  1025 ]
    ans2 = pos[choiceChange[cnt]];

    if (ans1 == ans2) {
        ans = "Y";
    }
    else {
        ans = "N";
    }
}

function postionofobjects(t) {
    switch (qno1[t]) {
        case 0:
            ans1 = "musicalinstruments";
            break;
        case 1:
            ans1 = "fruits";
            break;
        case 2:
            ans1 = "birds";
            break;
        case 3:
            ans1 = "alphabets";
            break;
        case 4:
            ans1 = "transports";
            break;
        case 5:
            ans1 = "vegetables";
            break;
        case 6:
            ans1 = "animals";
            break;
        case 7:
            ans1 = "insects";
            break;
        case 8:
            ans1 = "shapes";
            break;
        case 9:
            ans1 = "flowers";
            break;
    }
}
function createTween() {
    fadeInQuestionText();

    var tempVal = 500;
    for (i = 1; i <= 3; i++) {
        quesArr[i].visible = true
        quesArr[i].alpha = 0.2
        createjs.Tween.get(quesArr[i]).wait(1000).to({ alpha: 1, x: btnx[i] }, tempVal, createjs.Ease.bounceOut);
        tempVal += 200;
    }

    setTimeout(createTween1, 6500);
}
function createTween1() {
    updateQuestionText(MINDCAPTURE_PROMPT_DECIDE);
    fadeInQuestionText();

    qhHolder.visible = true;
    qhHolder.alpha = 0
    qhHolder.x = -120
    createjs.Tween.get(qhHolder).wait(700).to({ alpha: 1, x: 0 }, 200, createjs.Ease.bounceOut);


    for (i = 1; i <= 3; i++) {
        quesArr[i].visible = false;
    }

    question.visible = true;
    if (posChangeArr[cnt] == 0) {
        question.y = -300
        createjs.Tween.get(question).wait(1000).to({ alpha: 1, x: question.x, y: 280 }, 600, createjs.Ease.bounceOut);
    } else {
        question.y = 900
        createjs.Tween.get(question).wait(1000).to({ alpha: 1, x: question.x, y: 280 }, 600, createjs.Ease.bounceOut);
    }


    prepareAnswerButtonsForAnimation();
    animateChoiceOptions(answerButtons, AddListenerFn);
}

function AddListenerFn() {
    yesMc.addEventListener("click", answerSelected);
    noMc.addEventListener("click", answerSelected);
    yesMc.cursor = "pointer";
    noMc.cursor = "pointer";
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true

    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

function prepareAnswerButtonsForAnimation() {
    if (!answerButtons || !answerButtons.length) { return; }
    for (var idx = 0; idx < answerButtons.length; idx++) {
        var btn = answerButtons[idx];
        if (!btn) { continue; }
        stopChoicePulse(btn);
        createjs.Tween.removeTweens(btn);
        btn.baseScale = btn.baseScale || btn.scaleX || 1;
        btn.__targetX = (typeof btn.__targetX === "number") ? btn.__targetX : btn.x;
        btn.__targetY = (typeof btn.__targetY === "number") ? btn.__targetY : btn.y;
        btn.__choiceIndex = (typeof btn.__choiceIndex === "number") ? btn.__choiceIndex : idx;
        btn.visible = true;
        btn.alpha = 0;
        btn.mouseEnabled = false;
        btn.cursor = "default";
    }
}

function animateChoiceOptions(choiceArray, onComplete) {
    if (!choiceArray || !choiceArray.length) { return typeof onComplete === "function" ? onComplete() : undefined; }
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

function resetChoiceTweens(choiceArray) {
    if (!choiceArray) { return; }
    for (var idx = 0; idx < choiceArray.length; idx++) {
        if (choiceArray[idx]) {
            stopChoicePulse(choiceArray[idx]);
        }
    }
}

function clearChoiceAnimations(choiceArray) {
    if (!choiceArray) { return; }
    for (var idx = 0; idx < choiceArray.length; idx++) {
        if (choiceArray[idx]) {
            createjs.Tween.removeTweens(choiceArray[idx]);
        }
    }
}

/*function enablechoices() {
    yesMc.alpha = 1
    noMc.alpha = 1
    yesMc.addEventListener("click", answerSelected);
    noMc.addEventListener("click", answerSelected);
    yesMc.cursor = "pointer";
    noMc.cursor = "pointer";
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true
}*/

//===============================================//

function disablechoices() {
    yesMc.removeEventListener("click", answerSelected);
    noMc.removeEventListener("click", answerSelected);
    yesMc.cursor = "default";
    noMc.cursor = "default";
    resetChoiceTweens(answerButtons);
    clearChoiceAnimations(answerButtons);
    choice1.visible = false
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
    gameResponseTimerStop();
    resetChoiceTweens(answerButtons);
    clearChoiceAnimations(answerButtons);
    // pauseTimer();
    uans = e.currentTarget.name;
    console.log(uans)
    if (ans == uans) {
        currentX = e.currentTarget.x - 20
        currentY = e.currentTarget.y - 75
        e.currentTarget.visible = true;
        disableMouse()
        yesMc.removeEventListener("click", answerSelected);
        noMc.removeEventListener("click", answerSelected);

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
    yesMc.mouseEnabled = false
    noMc.mouseEnabled = false

}

function enableMouse() {

}
//===============================================================================================//

