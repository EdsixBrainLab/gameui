// ///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////

var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var currentX
var currentY
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qnoI = []
var chpos = [];
var quesArr = []
var chposArr = []
var choiceArr = []
var currentObj = []

var choicePos = []
var clr, clr1, clr2, clrin1, clrin2, clrin3
var qno1 = []
var qno2 = []
var tweenMcArr1 = []
var tweenMcArr2 = []
var tweenMcArr3 = []
var pos = []
var chholderarr = []
var directionarr = []
var colorarr = []
var activeChoiceArray = null

var BASKETBALL_L1_PROMPTS = [];
var BASKETBALL_L1_PROMPT_INDEXES = {
    OBSERVE: 0,
    COLOR_FIRST: 1,
    COLOR_SECOND: 2,
    COLOR_THIRD: 3,
    DIRECTION_GENERIC: 4,
    SELECT_FIRST: 5,
    SELECT_SECOND: 6,
    SELECT_THIRD: 7,
    DIRECTION_ORANGE: 8,
    DIRECTION_GREEN: 9,
    DIRECTION_MAROON: 10,
    DIRECTION_BLUE: 11,
    DIRECTION_YELLOW: 12,
    DIRECTION_GREY: 13,
    DIRECTION_RED: 14
};

BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.OBSERVE] = "Observe the basketballs carefully.";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.COLOR_FIRST] = "Which color ball went into the basket?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.COLOR_SECOND] = "Which color ball moved to the basket on the left?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.COLOR_THIRD] = "Which color ball moved to the basket on the right?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_GENERIC] = "Where did the ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.SELECT_FIRST] = "Which ball went into the basket?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.SELECT_SECOND] = "Which ball moved to the basket on the left?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.SELECT_THIRD] = "Which ball moved to the basket on the right?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_ORANGE] = "Where did the Orange color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_GREEN] = "Where did the Green color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_MAROON] = "Where did the Maroon color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_BLUE] = "Where did the Blue color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_YELLOW] = "Where did the Yellow color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_GREY] = "Where did the Grey color ball move?";
BASKETBALL_L1_PROMPTS[BASKETBALL_L1_PROMPT_INDEXES.DIRECTION_RED] = "Where did the Red color ball move?";



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

    loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
    loaderBar = new createjs.Container();
    var txt = new createjs.Container();
    bar = new createjs.Shape();
    bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 300;
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
    gameAssetsPath = "BasketBall-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            //////////////////////////////////intro////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            ///////////////////////////////////////////////////////////
            { id: "Basket", src: gameAssetsPath + "Basket.png" },
            { id: "Basket1", src: gameAssetsPath + "Basket1.png" },
            { id: "Basket2", src: gameAssetsPath + "Basket2.png" },
            { id: "direction", src: questionTextPath + "BasketBall-Level1-QT2.png" },
            { id: "color", src: questionTextPath + "BasketBall-Level1-QT1.png" },
           // { id: "chholder", src: gameAssetsPath + "ChoiceHolder.png" },
           // { id: "chholder1", src: gameAssetsPath + "ChoiceHolder1.png" },
            { id: "question", src: gameAssetsPath + "question1.png" }

        )
        preloadAllAssets()
        stage.update();
    }

    call_UI_gameQuestion(container, getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.OBSERVE));
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }

    // if (id == "chholder") {
        // chholder = new createjs.Bitmap(preload.getResult('chholder'));
        // container.parent.addChild(chholder);
        // chholder.visible = false;
    // }
    // if (id == "chholder1") {
        // chholder1 = new createjs.Bitmap(preload.getResult('chholder1'));
        // container.parent.addChild(chholder1);
        // chholder1.visible = false;
    // }
    if (id == "Basket") {
        Basket = new createjs.Bitmap(preload.getResult('Basket'));
        container.parent.addChild(Basket);
        Basket.visible = false;
    }
    if (id == "Basket1") {
        Basket1 = new createjs.Bitmap(preload.getResult('Basket1'));
        container.parent.addChild(Basket1);
        Basket1.visible = false;
    }
    if (id == "Basket2") {
        Basket2 = new createjs.Bitmap(preload.getResult('Basket2'));
        container.parent.addChild(Basket2);
        Basket2.visible = false;

    }
    if (id == "color") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("color")],
            "frames": { "regX": 50, "height": 73, "count": 0, "regY": 50, "width": 167 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        color = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(color);
        color.visible = false;
        //			 
    }
    if (id == "direction") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("direction")],
            "frames": { "regX": 50, "height": 73, "count": 0, "regY": 50, "width": 167 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        direction = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(direction);
        direction.visible = false;
        //			 
    }
    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 126, "count": 0, "regY": 50, "width": 127 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;
        //
    }


}

function tick(e) {
    stage.update();
}

function getBasketballL1Prompt(index, fallback) {
    var prompt = BASKETBALL_L1_PROMPTS[index];
    if (typeof prompt === "string" && prompt.length) {
        return prompt;
    }
    if (typeof fallback === "string") {
        return fallback;
    }
    return "";
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
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////=======CREATION OF GAME ELEMENTS========///////////////////////////////////////////////////////////////////
function CreateGameElements() {
    interval = setInterval(countTime, 1000);

    // container.parent.addChild(chholder1);
    // chholder1.visible = false;
    // chholder1.x = chholder1.x - 10

    container.parent.addChild(Basket2);
    Basket2.visible = false;
    Basket2.y = Basket2.y + 110

    container.parent.addChild(Basket);
    Basket.visible = false;
    Basket.y = Basket.y - 15

    for (i = 0; i < choiceCnt; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i])
        quesArr[i].x = 627
        quesArr[i].y = 800
        quesArr[i].visible = false;

    }
    container.parent.addChild(Basket1);
    Basket1.visible = false;
   // Basket1.y = Basket1.y - 9
    Basket1.y = -6.8



    for (i = 0; i < choiceCnt; i++) {
        directionarr[i] = direction.clone()
        container.parent.addChild(directionarr[i]);
        directionarr[i].visible = false;
        directionarr[i].scaleX = directionarr[i].scaleY = 1.5
        directionarr[i].__choiceIndex = i;
    }
    directionarr[0].x = 440; directionarr[0].y = 400
    directionarr[1].x = 590; directionarr[1].y = 555
    directionarr[2].x = 740; directionarr[2].y = 400
    for (i = 0; i < choiceCnt; i++) {
        directionarr[i].__targetX = directionarr[i].x;
        directionarr[i].__targetY = directionarr[i].y;
        directionarr[i].baseScale = directionarr[i].scaleX;
    }

    for (i = 0; i < choiceCnt; i++) {
        colorarr[i] = color.clone()
        container.parent.addChild(colorarr[i]);
        colorarr[i].visible = false;
        colorarr[i].scaleX = 1.3
        colorarr[i].scaleY = 1.3
        colorarr[i].__choiceIndex = i;
    }
    colorarr[0].x = 435; colorarr[0].y = 400
    colorarr[1].x = 592.5; colorarr[1].y = 560
    colorarr[2].x = 745; colorarr[2].y = 400
    for (i = 0; i < choiceCnt; i++) {
        colorarr[i].__targetX = colorarr[i].x;
        colorarr[i].__targetY = colorarr[i].y;
        colorarr[i].baseScale = colorarr[i].scaleX;
    }

    // for (i = 0; i < choiceCnt; i++) {
        // chholderarr[i] = chholder.clone()
        // container.parent.addChild(chholderarr[i]);
        // chholderarr[i].visible = false;
        // chholderarr[i].x = -285 + (i * 350); chholderarr[i].y = 50
        // chholderarr[i].scaleX = .9
        // chholderarr[i].scaleY = .9
    // }

    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i] = choice1.clone()
        container.parent.addChild(choiceArr[i])
        choiceArr[i].name = "ch" + i;
        choiceArr[i].x = 275 + (i * 350); choiceArr[i].y = 390
        choiceArr[i].scaleX = 1
        choiceArr[i].scaleY = 1
        choiceArr[i].visible = false;
        choiceArr[i].__choiceIndex = i;
        choiceArr[i].__targetX = choiceArr[i].x;
        choiceArr[i].__targetY = choiceArr[i].y;
        choiceArr[i].baseScale = choiceArr[i].scaleX;

    }


    if (isQuestionAllVariations) {

        choicePos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0]//25
        choicePos.sort(randomSort)
        pos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0]
        pos.sort(randomSort);

    } else {
        choicePos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
        choicePos.sort(randomSort)
        pos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0]
        pos.sort(randomSort);

    }
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
var a, temp1, temp2, temp3, temp4;
var rand1 = [];
function pickques() {
      //for db
      tx = 0;
      qscnt++;
      //db
    cnt++;
    quesCnt++;
    chposArr = []
    currentObj = []
    attemptCnt = 0
    pauseTimer()
    panelVisibleFn()
    //----------------------------------------------------------------------------------------------


    qnoI = between(0, 6);
    qno1 = between(0, 2);
    showQuestionPrompt(getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.OBSERVE), { duration: 200 });
    Basket2.visible = true;
    Basket.visible = true;
    Basket1.visible = false;
    for (i = 0; i < choiceCnt; i++) {
        quesArr[i].gotoAndStop(qnoI[i])
        quesArr[i].visible = false;
        quesArr[i].x = 627
        quesArr[i].y = 800

    }


    if (qno1[0] == 0) {
        clr = setInterval(ball, 100);

        a = 0;
    }
    else if (qno1[0] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 0;
    }
    else if (qno1[0] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 0;
    }



}
function step2() {
    clearInterval(clrin1);
    quesArr[a].visible = false;
    Basket1.visible = false;
    if (qno1[1] == 0) {
        clr = setInterval(ball, 100);
        a = 1;
    }
    else if (qno1[1] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 1;
    }
    else if (qno1[1] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 1;
    }
}
function step3() {
    clearInterval(clrin2);
    quesArr[a].visible = false;
    Basket1.visible = false;
    if (qno1[2] == 0) {
        clr = setInterval(ball, 100);
        a = 2;
    }
    else if (qno1[2] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 2;
    }
    else if (qno1[2] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 2;
    }

}
function ball() {
    clearInterval(clr);
    quesArr[a].visible = true;
    tweenMcArr1[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr1[0])
    container.parent.addChild(Basket1)
    Basket1.visible = false;
    temp1 = a;

    tweenMcArr1[0] = createjs.Tween.get(quesArr[a]).to({ y: 800 }, 300).to({ y: 550 }, 300).to({ y: 350 }, 300).to({ y: 220 }, 300).call(this.onComplete)
}


this.onComplete = function (e) {

    console.log("nextball")
    Basket1.visible = true;

    tweenMcArr1[0] = createjs.Tween.get(quesArr[a]).to({ y: quesArr[a].y }).to({ y: quesArr[a].y + 450 }, 450).to({ y: quesArr[a].y + 750 }, 350).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1300);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1000);
    }
    else {
        clrin3 = setInterval(enablechoices, 1300);


    }

}
function balllf() {
    clearInterval(clr1);
    quesArr[a].visible = true;
    tweenMcArr2[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr2[0])
    temp2 = a;

    tweenMcArr2[0] = createjs.Tween.get(quesArr[a]).to({ x: 627, y: 800 }, 300).to({ x: 550, y: 600 }, 300).to({ x: 450, y: 400 }, 300).to({ x: 350, y: 250 }, 300)
        .to({ x: 250, y: 400 }, 300).to({ x: 210, y: 800 }, 300).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1800);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1800);
    }
    else {
        clrin3 = setInterval(enablechoices, 1800);


    }
}

function ballrt() {
    clearInterval(clr2);
    quesArr[a].visible = true;
    tweenMcArr3[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr3[0])
    temp3 = a;

    tweenMcArr3[0] = createjs.Tween.get(quesArr[a]).to({ x: 627, y: 800 }, 300).to({ x: 750, y: 600 }, 300).to({ x: 850, y: 300 }, 300).to({ x: 950, y: 200 }, 300)
        .to({ x: 1000, y: 400 }, 300).to({ x: 1050, y: 800 }, 300).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1800);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1800);
    }
    else {
        clrin3 = setInterval(enablechoices, 1800);


    }
}


//====================================================================CHOICE ENABLE/DISABLE==============================================================//

function enablechoices() {
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

    rand1 = []


    quesArr[a].visible = false;
    clearInterval(clrin3);
    Basket.visible = false;
    Basket1.visible = false;
    Basket2.visible = false;

    resetChoiceTweens(choiceArr);
    resetChoiceTweens(colorarr);
    resetChoiceTweens(directionarr);
    clearChoiceAnimations(choiceArr);
    clearChoiceAnimations(colorarr);
    clearChoiceAnimations(directionarr);

    hideChoiceArray(choiceArr);
    hideChoiceArray(colorarr);
    hideChoiceArray(directionarr);

    var promptCopy = getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.SELECT_FIRST);
    activeChoiceArray = choiceArr;

    if (pos[cnt] == 0) {
        promptCopy = getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.SELECT_FIRST);
        rand1 = between(0, 6);
        temp1 = qnoI[temp1];
        var b = rand1.indexOf(temp1);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp1);
        ans = choicePos[cnt]

    }
    else if (pos[cnt] == 1) {
        promptCopy = getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.SELECT_SECOND);
        rand1 = between(0, 6);
        temp2 = qnoI[temp2];
        var b = rand1.indexOf(temp2);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp2);
        ans = choicePos[cnt]

    }
    else if (pos[cnt] == 2) {
        promptCopy = getBasketballL1Prompt(BASKETBALL_L1_PROMPT_INDEXES.SELECT_THIRD);
        rand1 = between(0, 6);
        temp3 = qnoI[temp3];
        var b = rand1.indexOf(temp3);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp3);
        ans = choicePos[cnt]

    }

    activeChoiceArray = choiceArr;
    showQuestionPrompt(promptCopy, { duration: 300 });
    animateChoiceOptions(activeChoiceArray, AddListenerFn);

}

function AddListenerFn() {

    var targetArray = activeChoiceArray || choiceArr;
    if (!targetArray) { return; }
    for (i = 0; i < targetArray.length; i++) {
        var tile = targetArray[i];
        if (!tile || !tile.visible) { continue; }
        tile.mouseEnabled = true;
        tile.cursor = "pointer";
        tile.addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function hideChoiceArray(choiceArray) {
    if (!choiceArray) { return; }
    for (i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            choiceArray[i].visible = false;
            choiceArray[i].alpha = 1;
            choiceArray[i].mouseEnabled = false;
            choiceArray[i].cursor = "default";
            choiceArray[i].removeEventListener("click", answerSelected);
        }
    }
}

function disableChoiceArray(choiceArray) {
    if (!choiceArray) { return; }
    for (i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            choiceArray[i].visible = false;
            choiceArray[i].mouseEnabled = false;
            choiceArray[i].cursor = "default";
            choiceArray[i].alpha = 1;
            choiceArray[i].removeEventListener("click", answerSelected);
        }
    }
}

function disableChoiceInteractivity(choiceArray) {
    if (!choiceArray) { return; }
    for (i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            choiceArray[i].mouseEnabled = false;
            choiceArray[i].cursor = "default";
        }
    }
}

function animateChoiceOptions(choiceArray, onComplete) {
    if (!choiceArray) { return; }
    var pendingTweens = 0;
    var hasTweens = false;
    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile || !tile.visible) { continue; }
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

function resetChoiceTweens(choiceArray) {
    if (!choiceArray) { return; }
    for (i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            stopChoicePulse(choiceArray[i]);
        }
    }
}

function clearChoiceAnimations(choiceArray) {
    if (!choiceArray) { return; }
    for (i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            createjs.Tween.removeTweens(choiceArray[i]);
        }
    }
}



function disablechoices() {
   // chholder.visible = false
    hideQuestionPrompt();
    Basket.visible = false;
    Basket1.visible = false;
    Basket2.visible = false;

    disableChoiceArray(choiceArr);
    disableChoiceArray(colorarr);
    disableChoiceArray(directionarr);
    resetChoiceTweens(choiceArr);
    resetChoiceTweens(colorarr);
    resetChoiceTweens(directionarr);
    clearChoiceAnimations(choiceArr);
    clearChoiceAnimations(colorarr);
    clearChoiceAnimations(directionarr);
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
    gameResponseTimerStop();

    console.log(ans + " =correct= " + uans)
    if (ans == uans) {
        e.currentTarget.removeEventListener("click", answerSelected)
        disableChoiceInteractivity(choiceArr);
        disableChoiceInteractivity(colorarr);
        disableChoiceInteractivity(directionarr);
        currentX = e.currentTarget.x + 75
        currentY = e.currentTarget.y + 70

        setTimeout(correct, 200)

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

}

function enableMouse() {

}