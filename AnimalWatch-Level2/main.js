///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 240, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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

var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var currentX, currentY
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var count;
var rand
var rand1 = []
var ANIMALWATCH_PROMPT_OBSERVE = "Observe the animals carefully.";
var ANIMALWATCH_LEVEL2_QUESTIONS = [
    "Which of these was shown?",
    "Which of these was not shown?",
    "How many frogs were shown?",
    "How many dogs were shown?",
    "How many cats were shown?",
    "How many goats were shown?",
    "How many rabbits were shown?",
    "How many cows were shown?",
    "How many squirrels were shown?",
    "How many tortoises were shown?"
];
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var choiceArr = [];
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
         2. question text image name as "questiontext.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "AnimalWatch-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////intro///////////////////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            /////////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "choiceImages1.png" },
            { id: "choice2", src: gameAssetsPath + "choiceImages2.png" },
            { id: "choice3", src: gameAssetsPath + "choiceImages3.png" },
            { id: "question", src: gameAssetsPath + "question.png" }

        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }
    if (id == "choice1" || id == "choice2" || id == "choice3") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet2);
        choice1.visible = false;
        container.parent.addChild(choice1);
        choice1.x = 400; choice1.y = 400;

        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice2 = new createjs.Sprite(spriteSheet3);
        choice2.visible = false;
        container.parent.addChild(choice2);
        choice2.x = 700; choice2.y = 400;

        var spriteSheet4 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice3")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice3 = new createjs.Sprite(spriteSheet4);
        choice3.visible = false;
        container.parent.addChild(choice3);
        choice3.x = 750; choice3.y = 470;
        call_UI_gameQuestion(container, ANIMALWATCH_PROMPT_OBSERVE);
        if (QusTxtString) {
            container.parent.addChild(QusTxtString);
            QusTxtString.visible = false;
            updateQuestionText(ANIMALWATCH_PROMPT_OBSERVE);
        }


    };

    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 367, "count": 0, "regY": 50, "width": 1005 },
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

function getScenarioQuestionText(index) {
    var questionIndex = (typeof index === "number") ? index : 0;
    if (questionIndex < 0 || questionIndex >= ANIMALWATCH_LEVEL2_QUESTIONS.length) {
        questionIndex = 0;
    }
    return ANIMALWATCH_LEVEL2_QUESTIONS[questionIndex];
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

/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 9);
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

    container.parent.addChild(question);
    question.visible = false;
    question.scaleX = question.scaleY = 1.2;
    question.x = 110; question.y = 310;


    container.parent.addChild(choice1, choice2, choice3)
    choiceArr = [choice1, choice2, choice3];
    for (i = 0; i < choiceArr.length; i++) {
        choiceArr[i].visible = false;
        choiceArr[i].__choiceIndex = i;
    }

    choice1.x = 133;
    choice1.y = choice2.y = choice3.y = 300;
    choice2.x = 523;
    choice3.x = 913;

    /*if(isQuestionAllVariations){
        createGameWiseQuestions()     
        pickques()
    }else{
        pickques()      
    }*/
}

function helpDisable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = true;
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
    chpos = [];
    panelVisibleFn()
    question.gotoAndStop(qno[cnt]);
    question.visible = false;



    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

    createTween()

}
  function createTween() {

    showQuestionPrompt(ANIMALWATCH_PROMPT_OBSERVE, { duration: 300 });



    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    ///////////////////////////choice tween////////////////////////////////////



    showDuration = setInterval(showQuestion, 5000);



}
  function showQuestion() {
    clearInterval(showDuration)
    pauseTimer()
    question.visible = false;

    showQuestionPrompt(getScenarioQuestionText(qno[cnt]), { duration: 300 });
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].gotoAndStop(qno[cnt]);
        this["choice" + i].name = "ch" + i;
        chpos.push({ posx: this["choice" + i].x, posy: this["choice" + i].y })
    }

    ans = "ch1";
    chpos.sort(randomSort)

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].x = chpos[i - 1].posx
        this["choice" + i].y = chpos[i - 1].posy
    }

    enablechoices();
  }

function enablechoices() {
    for (i = 0; i < choiceArr.length; i++) {
        var choice = choiceArr[i];
        if (!choice) { continue; }
        choice.name = "ch" + (i + 1)
        choice.visible = false;
        choice.alpha = 1;
        choice.mouseEnabled = true
        choice.cursor = "pointer";
        choice.__choiceIndex = i;
    }
    animateChoiceOptions(choiceArr, AddListenerFn);



}
function AddListenerFn() {

    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) { continue; }
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].cursor = "pointer";
        choiceArr[i].addEventListener("click", answerSelected);
    }


    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {

    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) { continue; }
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].visible = false;
        choiceArr[i].alpha = .5;
        choiceArr[i].cursor = "default";
    }
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
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
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

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false
    }
}

function enableMouse() {

}

