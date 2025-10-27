///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, cmnt = -1, ans, uans, interval, time = 18, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 7, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,   quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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
var chpos = [];
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var choiceArr = [];
var pos = []
var qno1 = []
var qno=[]
var qtype = []
var introImg,introImg1
var btnx = [100, 400, 700, 1000, 250, 550, 850]
var btny = [210, 210, 210, 210, 440, 440, 440]
var qtype = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]

var repTimeClearInterval = 0;
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
    gameAssetsPath = "MemoryCheck-Level6/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            { id: "choice1", src: gameAssetsPath + "choiceImages1.png" },
            { id: "questionText", src:questionTextPath + "MemoryCheck-Level6-QT.png" },
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
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
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
    qno=between(0,100)
    qtype.sort(randomSort)
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
    // bg.visible = true
    container.parent.addChild(questionText);
    questionText.visible = false;    
    questionText.x = 365; questionText.y = 120;
    var btnx = [100, 400, 700, 1000, 250, 550, 850]
    var btny = [230, 230, 230, 230, 470, 470, 470]
    for (i = 0; i < 7; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].visible = false;
        choiceArr[i].x = btnx[i]
        choiceArr[i].y = btny[i]

    }
    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
       
        pickques()
    } else {
       
        pickques()
    }*/
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

    questionText.gotoAndStop(0);

    qno1 = between(0, 39);

    for (i = 0; i < 7; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].gotoAndStop(qno1[i]);
        choiceArr[i].x = btnx[i]-40
        choiceArr[i].y = btny[i]
    }

    createTween();
   // clearquesInterval = setInterval(createChoices, 5000);

}
function createTween() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 7; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0
    }
    createjs.Tween.get(choiceArr[0]).wait(100).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[1]).wait(300).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[2]).wait(500).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[3]).wait(700).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[4]).wait(900).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[5]).wait(1100).to({ alpha: 0 }, 500).to({ alpha: 1 })
    createjs.Tween.get(choiceArr[6]).wait(1400).to({ alpha: 0 }, 500).to({ alpha: 1 })

    clearquesInterval = setInterval(createChoices, 6000);
}
function createChoices() {
    console.log("createChoices")
    clearInterval(clearquesInterval)
    clearquesInterval = 0;
   
    for (i = 0; i < 7; i++) {
        choiceArr[i].visible = false;

    }
    switch (qtype[cnt]) {
        case 1:
            questionText.gotoAndStop(1);
            for (i = 0; i < 5; i++) {
               
                j = i + 2;
                choiceArr[i].gotoAndStop(qno1[j]);
                choiceArr[i].visible = true;
            }
            choiceArr[4].gotoAndStop(qno1[9])

            ans = "ch4";
            console.log("ans" + ans)
            break;
        case 2:
            questionText.gotoAndStop(2);
            choiceArr[0].visible = true;
            choiceArr[1].visible = true;
            choiceArr[2].visible = true;
            choiceArr[3].visible = true;
            choiceArr[4].visible = true;
            choiceArr[0].gotoAndStop(qno1[0])
            choiceArr[1].gotoAndStop(qno1[9]);
            choiceArr[2].gotoAndStop(qno1[10]);
            choiceArr[3].gotoAndStop(qno1[11]);
            choiceArr[4].gotoAndStop(qno1[12]);
            ans = "ch0";
            console.log("ans" + ans)
            break;
    }

    console.log("len= " + choiceArr.length)
    chpos = between(0, 4);
    console.log(chpos);
    for (i = 0; i < 5; i++) {

        switch (i) {
            case 0:
                choiceArr[chpos[i]].x = 115;
                choiceArr[chpos[i]].y = 210;

                break;
            case 1:
                choiceArr[chpos[i]].x = 520;
                choiceArr[chpos[i]].y = 210;
                break;
            case 2:
                choiceArr[chpos[i]].x = 925;
                choiceArr[chpos[i]].y = 210;
                break;
            case 3:
                choiceArr[chpos[i]].x = 320;
                choiceArr[chpos[i]].y = 440;
                break;
            case 4:
                choiceArr[chpos[i]].x = 750;
                choiceArr[chpos[i]].y = 440;
                break;
        }
        var tile = choiceArr[chpos[i]];
        if (!tile) {
            continue;
        }
        tile.__targetX = tile.x;
        tile.__targetY = tile.y;
        tile.baseScale = tile.baseScale || tile.scaleX || 1;
        tile.__choiceIndex = i;
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

    var activeChoices = choiceArr.slice(0, 5);

    animateChoiceOptions(activeChoices, function () {
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
    for (i = 0; i < 5; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
        choiceArr[i].cursor = "pointer";
        choiceArr[i].name = "ch" + i;
        choiceArr[i].visible = true;
        choiceArr[i].mouseEnabled = true

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

function disablechoices() {
    var activeChoices = choiceArr.slice(0, 5);
    resetChoiceTweens(activeChoices);
    clearChoiceAnimations(activeChoices);
    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = false
        // choiceArr[i].alpha = 1
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].cursor = "default";
        choiceArr[i].mouseEnabled = false

    }

    questionText.visible = false;   
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

function answerSelected(e) {
    clk++;
    e.preventDefault();
    gameResponseTimerStop();
    uans = e.currentTarget.name;

    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse()
        getValidation("correct");
        disablechoices();
    } else {

        getValidation("wrong");
        disablechoices();
    }

}



function disableMouse() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}
//===========================================================================================//
