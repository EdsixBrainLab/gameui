///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, cmnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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
var pos = []
var btnx = []
var btny = []
var btnPadding = 50;

var repTimeClearInterval = 0;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var choiceArr = [];
var qno1 = []
var qtype = []
qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var choiceArr1 = []
var introImg,introImg1
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
    gameAssetsPath = "MemoryCheck-Level4/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
             { id: "questionText", src: questionTextPath+ "MemoryCheck-Level4-QT.png" },
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
    if (id == "questionText") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 134, "count": 64, "regY": 50, "width": 650 }
        });

        questionText = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(questionText);
        questionText.visible = false;

    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 255, "count": 0, "regY": 0, "width": 255 }
        });

        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);
    }

  
}

function tick(e) {

    stage.update();
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

    //bg.visible = true
    container.parent.addChild(questionText);
    questionText.visible = false;
    questionText.x = 360; questionText.y = 120;

    for (i = 0; i < 5; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].visible = false;

    }
    for (i = 0; i < 4; i++) {
        choiceArr1[i] = choice1.clone();
        container.parent.addChild(choiceArr1[i]);

    }
    if (isQuestionAllVariations) {
        qtype = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

        // createGameWiseQuestions()
        // pickques()
    } else {

        qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        //pickques()
    }
    qtype.sort(randomSort)
}

function helpDisable() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false;
    }

}

function helpEnable() {

    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = true;
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
    cmnt++
    clk = 0;
    correctCnt = 0;
    chpos = [];
	panelVisibleFn()
    btnx = [100, 940, 510, 100, 940]
    btny = [190, 190, 340, 460, 460]
    questionText.gotoAndStop(0);

    qno1 = between(0, 39);

    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].gotoAndStop(qno1[i]);
        choiceArr[i].x = btnx[i]
        choiceArr[i].y = btny[i]
    }
    createTween();



}
function createTween() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0
    }
    createjs.Tween.get(choiceArr[0]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[1]).wait(600).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[2]).wait(800).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[3]).wait(1000).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[4]).wait(1400).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)


    clearquesInterval = setInterval(createChoices, 5000);
}

function createChoices() {
    console.log("createChoices")
    clearInterval(clearquesInterval)
    clearquesInterval = 0;
  

    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = false;

    }
    switch (qtype[cnt]) {
        case 1:
            questionText.gotoAndStop(1);
            for (i = 0; i < 4; i++) {
                j = i + 1;
                choiceArr1[i].gotoAndStop(qno1[j]);
                choiceArr1[i].visible = true;
                console.log(j)
            }
            choiceArr1[3].gotoAndStop(qno1[9])

            ans = "ch3";
            console.log("ans" + ans)
            break;
        case 2:
            questionText.gotoAndStop(2);
            choiceArr1[0].visible = true;
            choiceArr1[1].visible = true;
            choiceArr1[2].visible = true;
            choiceArr1[3].visible = true;

            choiceArr1[0].gotoAndStop(qno1[0])
            choiceArr1[1].gotoAndStop(qno1[9]);
            choiceArr1[2].gotoAndStop(qno1[10]);
            choiceArr1[3].gotoAndStop(qno1[11]);

            ans = "ch0";
            console.log("ans" + ans)
            break;
    }

    console.log("len= " + choiceArr1.length)
    chpos = between(0, 3);
    console.log(chpos);
    for (i = 0; i < 4; i++) {

        switch (i) {
            case 0:
            choiceArr1[chpos[i]].x = 70;
            choiceArr1[chpos[i]].y = 300;

                break;
            case 1:
            choiceArr1[chpos[i]].x = 370;
            choiceArr1[chpos[i]].y = 300;
                break;

            case 2:
            choiceArr1[chpos[i]].x = 670;
            choiceArr1[chpos[i]].y = 300;
                break;
            case 3:
            choiceArr1[chpos[i]].x = 970;
            choiceArr1[chpos[i]].y = 300;
                break;
        }
        var tile = choiceArr1[chpos[i]];
        if (!tile) {
            continue;
        }
        tile.__targetX = tile.x;
        tile.__targetY = tile.y;
        tile.baseScale = tile.baseScale || tile.scaleX || 1;
        tile.__choiceIndex = i;
    }
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}


function enablechoices() {
    for (i = 0; i < 4; i++) {
        choiceArr1[i].name = "ch" + i;
        choiceArr1[i].visible = false;
        choiceArr1[i].mouseEnabled = false;
        choiceArr1[i].cursor = "default";
        choiceArr1[i].baseScale = choiceArr1[i].baseScale || choiceArr1[i].scaleX || 1;
        if (typeof choiceArr1[i].__choiceIndex !== "number") {
            choiceArr1[i].__choiceIndex = i;
        }

    }
    createTween1();
}
function createTween1() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval);
        repTimeClearInterval = 0;
    }

    animateChoiceOptions(choiceArr1, function () {
        repTimeClearInterval = 0;
        AddListenerFn();
    });
}
function AddListenerFn() {
    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval)
        repTimeClearInterval = 0;
    }
    console.log("eventlisterneer")
    for (i = 0; i < 4; i++) {
        choiceArr1[i].addEventListener("click", answerSelected);
        choiceArr1[i].cursor = "pointer";
        choiceArr1[i].visible = true;
        choiceArr1[i].mouseEnabled = true

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    resetChoiceTweens(choiceArr1);
    clearChoiceAnimations(choiceArr1);
    for (i = 0; i < 4; i++) {
        choiceArr1[i].alpha = 1
        choiceArr1[i].removeEventListener("click", answerSelected);
        choiceArr1[i].cursor = "default";
        choiceArr1[i].visible=false
        choiceArr1[i].mouseEnabled = false
    }

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
    for (i = 0; i < 4; i++) {
        choiceArr1[i].mouseEnabled = false
    }
}

function enableMouse() {

}
//===========================================================================================//
