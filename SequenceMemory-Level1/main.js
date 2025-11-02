///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
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
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
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
var px = [100, 320, 540, 760, 980, 1030]
var py = [295, 295, 295, 295, 490, 490]
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
var SEQUENCE_PROMPT_REMEMBER = "Remember the order of these objects.";
var SEQUENCE_PROMPT_SELECT = "Select the objects in the same order.";
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno1 = [];
var qno11 = [];
var qno12 = [];
var chpos = [];
var qno = []
var choiceArr = []
var posArr = []
var choiceMcArr = []
var clk
var ansArr = [0, 1, 2]
var correctCnt

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
    gameAssetsPath = "SequenceMemory-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////intro///////////////////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            { id: "holder1", src: gameAssetsPath + "holder1.png" },
            /////////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "posimg", src: gameAssetsPath + "positionImage1.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    loaderBar.visible = false;
    stage.update();
    var event = assets[i];
    var id = event.item.id;
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }
    if (id == "holder1") {
        holder1 = new createjs.Bitmap(preload.getResult('holder1'));
        container.parent.addChild(holder1);
        holder1.visible = false;

    }
    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 199, "count": 0, "regY": 50, "width": 199 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;
        call_UI_gameQuestion(container, SEQUENCE_PROMPT_REMEMBER);
        updateQuestionText(SEQUENCE_PROMPT_REMEMBER);
    }

    if (id == "posimg") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("posimg")],
            "frames": { "regX": 50, "height": 88, "count": 0, "regY": 50, "width": 88 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        posimg = new createjs.Sprite(spriteSheet1);
        posimg.visible = false;
        container.parent.addChild(posimg);
    };
    //
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
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////=======CREATION OF GAME ELEMENTS========///////////////////////////////////////////////////////////////////

function CreateGameElements() {

    interval = setInterval(countTime, 1000);
    if (QusTxtString) {
        container.parent.addChild(QusTxtString);
        QusTxtString.visible = false;
        QusTxtString.alpha = 0;
    }

    for (i = 0; i < 3; i++) {
        choiceArr[i] = choice1.clone()
        container.parent.addChild(choiceArr[i])
        choiceArr[i].visible = false
        choiceArr[i].x = 350 + (i * 240)
        console.log(choiceArr[i].x)
        choiceArr[i].y = 295
        choiceArr[i].baseScale = choiceArr[i].scaleX = choiceArr[i].scaleY = 1;

        posArr[i] = posimg.clone()
        container.parent.addChild(posArr[i])
        posArr[i].visible = false

        posArr[i].x = 410 + (i * 241)
        posArr[i].y = 505
    }


    /*if (isQuestionAllVariations) 
    {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }
    */
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {

}

function helpEnable() {

}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    tx = 0;
    cnt++;
    qscnt++;
    quesCnt++;
    chpos = [];
    currentObj = []
    clk = 0;
    correctCnt = 0;
    panelVisibleFn()
    resetChoiceTweens();
    clearChoiceAnimations();
    ////////////////////////////////////////////////////////////////////////
    updateQuestionText(SEQUENCE_PROMPT_REMEMBER);
    if (QusTxtString) {
        QusTxtString.alpha = 0;
    }
    qno1 = between(0, 25)
    for (i = 0; i < 3; i++) {
        choiceArr[i].gotoAndStop(qno1[i])
        posArr[i].visible = false
        choiceArr[i].visible = false
        choiceArr[i].name = i
        choiceArr[i].x = 350 + (i * 240)
        console.log(choiceArr[i].x)
        choiceArr[i].y = 295
        choiceArr[i].baseScale = 1;

        chpos.push({ posx: choiceArr[i].x, posy: choiceArr[i].y })
    }
    createTween()
    questionInterval = setInterval(delayStartQuestion, 5000) // two seconds 


}
function createTween() {

    if (QusTxtString) {
        QusTxtString.visible = true;
        createjs.Tween.get(QusTxtString, { override: true }).wait(300).to({ alpha: 1 }, 300);
    }



    ///////////////////////////choice tween////////////////////////////////////



    var val = 500
    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        choiceArr[i].scaleX = .90
        choiceArr[i].scaleY = .90
        createjs.Tween.get(choiceArr[i]).wait(val).to({ scaleX: 1, scaleY: 1, alpha: 1 }, val)
        val = val + 150
    }

}
function delayStartQuestion() {
    clearInterval(questionInterval);

    updateQuestionText(SEQUENCE_PROMPT_SELECT);

    var chpos1 = between(0, 2)
    var shuffle = between(0, 2)
    var j;
    for (i = 0; i < choiceCnt; i++) {

        if (chpos1[i] == i) {
            j = -1;
        }
        else {

            j++;
        }
    }
    if (j == -1) {

        var tempval1 = chpos1[shuffle[0]];
        chpos1[shuffle[0]] = chpos1[shuffle[1]]
        chpos1[shuffle[1]] = tempval1

    }

    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].x = chpos[chpos1[i]].posx
        choiceArr[i].y = chpos[chpos1[i]].posy
        choiceArr[i].visible = false
        choiceArr[i].cursor = "default";
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].__targetX = choiceArr[i].x;
        choiceArr[i].__targetY = choiceArr[i].y;
        choiceArr[i].baseScale = choiceArr[i].baseScale || 1;
        choiceArr[i].__choiceIndex = i;
        choiceArr[i].__slotIndex = chpos1[i];
    }

    enablechoices();

}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    resetChoiceTweens();
    clearChoiceAnimations();
    animateChoiceOptions(choiceArr, function () {
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].alpha = 1;
            choiceArr[i].visible = true;
            choiceArr[i].mouseEnabled = true;
            choiceArr[i].cursor = "pointer";
            choiceArr[i].addEventListener("click", answerSelected);
        }
        rst = 0;
        gameResponseTimerStart();
        createjs.Ticker.addEventListener("tick", tick);
        stage.update();
    });
}

function disablechoices() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].removeEventListener("click", answerSelected);
        posArr[i].visible = false
        choiceArr[i].visible = false;
        choiceArr[i].mouseEnabled = false;
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

function resolveChoiceSlot(target) {
    if (!target) { return null; }
    if (typeof target.__slotIndex === "number") {
        return target.__slotIndex;
    }
    var tolerance = 2;
    for (var idx = 0; idx < chpos.length; idx++) {
        var slot = chpos[idx];
        if (!slot) { continue; }
        if (Math.abs(target.x - slot.posx) <= tolerance && Math.abs(target.y - slot.posy) <= tolerance) {
            return idx;
        }
    }
    return null;
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
    e.currentTarget.removeEventListener("click", answerSelected);
    e.currentTarget.cursor = "default";
    e.currentTarget.disablechoices = true;
    var dx = e.currentTarget.x;
    var dy = e.currentTarget.y;

    ans = "multipleAns"
    clk++;
    uans = e.currentTarget.name

    gameResponseTimerStop();


    if (clk <= 3) {
        console.log("clk" + clk)
        console.log(ansArr[clk] + " =$$$$$$$$$= " + uans)
        if (ansArr[clk - 1] == uans) {
            currentObj[clk - 1] = e.currentTarget.name;
            currentX = e.currentTarget.x
            currentY = e.currentTarget.y - 10

            correctCnt++;
            var slotIndex = resolveChoiceSlot(e.currentTarget);
            if (slotIndex !== null && posArr[slotIndex]) {
                posArr[slotIndex].visible = true;
                container.parent.addChild(posArr[slotIndex]);
                posArr[slotIndex].gotoAndStop(clk);
            }


            if (correctCnt == 3) {
                setTimeout(correct, 800)
                for (i = 0; i < choiceCnt; i++) {
                    choiceArr[i].removeEventListener("click", answerSelected);
                }

            }
        }
        else {
            getValidation("wrong");
            disablechoices();
        }
    }

}
function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function enableMouse() {
    for (i = 0; i < choiceCnt; i++) {

        var curName = choiceArr[i].name
        if (currentObj.indexOf(curName) == -1)
            choiceArr[i].mouseEnabled = true;
    }
}
