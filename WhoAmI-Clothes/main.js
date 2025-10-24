var messageField;		//Message display field

var assets = [];
var choiceArr = [];
var choiceGlowArr = [];
var choicePulseArr = [];
var choiceIdleStateArr = [];
var textArr = []
var qno = [];
var strArr = []
var chpos = [];
var getChar = [];
var quesMcArr = []
var txtLabel;
var clueMcArr = [];
var clueArr = []
var clueTxtArr = []
var repTimeClearInterval = 0
var cnt = -1,qscnt=-1, ans, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, questionHolderPanel, circleOutline, chHolderMC, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var INTRO_SAMPLE_WORD = (words_arry && words_arry.length > 0) ? words_arry[0] : "";
var INTRO_SAMPLE_BLANK_INDEX = INTRO_SAMPLE_WORD ? Math.min(Math.max(Math.floor(INTRO_SAMPLE_WORD.length / 2), 0), Math.max(INTRO_SAMPLE_WORD.length - 1, 0)) : 0;
var WhoAmIIntroConfig = {
    sampleWord: INTRO_SAMPLE_WORD,
    blankIndex: INTRO_SAMPLE_BLANK_INDEX
};
if (typeof window !== "undefined") {
    window.WhoAmIIntroConfig = WhoAmIIntroConfig;
} else {
    this.WhoAmIIntroConfig = WhoAmIIntroConfig;
}
var maxLetterCnt = 10
var quesArr = []
var answerArr = []
var decoyArr = []
var blankIndex = 0;
var QUESTION_HOLDER_Y = 300;
var QUESTION_ROW_Y = 500;
var CHOICE_ROW_Y = 648;
var QUESTION_ROW_SPACING = 138;
var CHOICE_ROW_SPACING = 190;
var CHOICE_TILE_BASE_SCALE = 0.7;
var QUESTION_IMAGE_BASE_SCALE = 0.6;
var layoutRoot;
var BIRTHDAY_CHOICE_BASE_STYLE = {
    stroke: "#ffb660",
    fill: ["#fff4d4", "#ffd78a"]
};
var BIRTHDAY_CHOICE_HOVER_STYLE = {
    stroke: "#ff9d42",
    fill: ["#ffeac0", "#ffc260"]
};
var BIRTHDAY_CHOICE_PRESS_STYLE = {
    stroke: "#ff8628",
    fill: ["#ffd69a", "#ffb24e"]
};
var BIRTHDAY_CHOICE_DISABLED_STYLE = {
    stroke: "#d3a170",
    fill: ["#f3e2c2", "#e7c792"]
};
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = ["178.3", "288.3", "398.3", "508.3", "618.3", "728.3", "688.3", "288.3", "338.3", "418.3", "498.3", "578.3"];
var words_arry = ["frock","tie","underwear","shirt","socks","belt","gloves","coat","pant","skirt",
"singlet","tanktop","strawhat","overalls","earmuffs","boots","beanies","sweater","jacket","scarf","mittens"];
var btnY = ["497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "567.1", "567.1", "567.1", "567.1", "567.1"];
var rand1 = []
var btnPaddArr = ["", "", "", "365", "335", "305", "275", "245", "215", "185"]
var indx = []
var btnPadding = 50
var btnTxtPaddding = 543
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
var cLen;
var questionTextMC;
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
var QusTxtString;

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
    gameAssetsPath = "WhoAmI-Clothes/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
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
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
	
	call_UI_gameQuestion(container,"Click on the correct letter to complete the name of the item of clothing");
		 
    if (id == "question") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 348, "count": 64, "regY": 50, "width": 348 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        question = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(question);
        question.visible = false;

    }


    if (id == "chHolder") {
        chHolderMC = new createjs.Bitmap(preload.getResult('chHolder'));
        container.parent.addChild(chHolderMC)
        chHolderMC.visible = false;
    }

}

function tick(e) {

    stage.update();
}


/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
    qno = between(0, 9);   
    qno.splice(qno.indexOf(0), 1)  
    qno.push(0);   
 console.log("qno" + qno)
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
    container.parent.addChild(QusTxtString);
    QusTxtString.visible = false;

    if (layoutRoot && layoutRoot.parent) {
        layoutRoot.parent.removeChild(layoutRoot);
    }
    layoutRoot = new createjs.Container();
    layoutRoot.name = "birthdayLayoutRoot";
    layoutRoot.mouseChildren = true;
    layoutRoot.mouseEnabled = false;
    container.parent.addChild(layoutRoot);

    questionHolderPanel = createBirthdayQuestionHolder();
    questionHolderPanel.visible = false;
    questionHolderPanel.alpha = 0;
    questionHolderPanel.mouseEnabled = false;
    layoutRoot.addChild(questionHolderPanel);

    if (question) {
        questionHolderPanel.addChild(question);
        question.visible = false;
        question.alpha = 0;
        question.regX = 50;
        question.regY = 50;
        question.x = -45;
        question.y = -40;
        question.scaleX = question.scaleY = QUESTION_IMAGE_BASE_SCALE;
        question.mouseEnabled = false;
    }

    for (i = 0; i < 3; i++) {
        var choiceTile = createBirthdayChoiceTile();
        choiceTile.visible = false;
        choiceTile.alpha = 0;
        choiceTile.x = 0;
        choiceTile.y = CHOICE_ROW_Y;
        choiceTile.__targetY = CHOICE_ROW_Y;
        choiceTile.__choiceIndex = i;
        choiceTile.mouseEnabled = false;
        choiceTile.cursor = "default";
        layoutRoot.addChild(choiceTile);
        bindBirthdayChoiceTile(choiceTile, i);
        choiceArr[i] = choiceTile;
        choiceGlowArr[i] = choiceTile.glow;
        choicePulseArr[i] = choiceTile.pulse;
        resetBirthdayChoiceTile(choiceTile);
    }

    for (i = 0; i < 10; i++) {
        quesArr[i] = createBirthdayQuestionTile();
        quesArr[i].visible = false;
        quesArr[i].baseScale = 1;
        layoutRoot.addChild(quesArr[i]);
		quesArr[i].scaleX = quesArr[i].scaleY = .8;
        quesArr[i].x = 0;
        quesArr[i].y = QUESTION_ROW_Y;
    }
    if (isQuestionAllVariations) {
        //createGameWiseQuestions()
        chposArr = [0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2]
       // pickques()
    } else {
        chposArr = [0, 1, 2, 0, 1, 0, 2, 1, 0, 2]
        chposArr.sort(randomSort)
        //pickques()
    }

    applyBirthdayLayout(0);
}

function helpDisable() {
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
    }
    if (layoutRoot) {
        layoutRoot.mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
        }
    }
    if (layoutRoot) {
        layoutRoot.mouseEnabled = true;
    }
}
//=================================================================================================================================//
function pickques() {
    pauseTimer()
    tx = 0;
    qscnt++;
    cnt++;
    quesCnt++;
    chpos = [];
    strArr = [];
    getChar = []
    currentObj = []
    lCnt = -1;
    cLen = 0;
    alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    answerArr = [];
    decoyArr = [];
    wrdCnt = -1;
    //txtLabel.text = "";
    isCorrect = "";
        QusTxtString.visible = true;
   panelVisibleFn()
    correctAnswer = words_arry[qno[cnt]];
    question.gotoAndStop(qno[cnt])
    question.visible = false;
    if (questionHolderPanel) {
        questionHolderPanel.visible = false;
        questionHolderPanel.alpha = 0;
    }
    ans = correctAnswer;
    var uppercaseAnswer = correctAnswer.toUpperCase();
    cLen = uppercaseAnswer.length;
    for (i = 0; i < cLen; i++) {
        answerArr[i] = uppercaseAnswer.charAt(i);
    }
    blankIndex = range(0, cLen - 1)
    var missingLetter = answerArr[blankIndex];
    var removeIndex = alphabetArr.indexOf(missingLetter);
    if (removeIndex > -1) {
        alphabetArr.splice(removeIndex, 1);
    }
    alphabetArr.sort(randomSort)
    for (i = 0; i < choiceArr.length; i++) {
        resetBirthdayChoiceTile(choiceArr[i]);
    }
    for (i = 0; i < alphabetArr.length; i++) {
        if (decoyArr.length >= 2) {
            break;
        }
        if (alphabetArr[i] !== missingLetter && decoyArr.indexOf(alphabetArr[i]) === -1) {
            decoyArr.push(alphabetArr[i]);
        }
    }
    for (i = 0; i < cLen; i++) {
        if (quesArr[i]) {
            createjs.Tween.removeTweens(quesArr[i]);
        }
        styleBirthdayQuestionTile(quesArr[i], answerArr[i], i === blankIndex);
        quesArr[i].visible = false;
    }
    for (i = cLen; i < quesArr.length; i++) {
        quesArr[i].visible = false;
    }
    rand1 =chposArr[cnt]
    var decoyIndex = 0;
    for (i = 0; i < 3; i++) {
        var letterChoice = missingLetter;
        if (i !== rand1) {
            if (decoyIndex >= decoyArr.length) {
                decoyIndex = 0;
            }
            letterChoice = decoyArr[decoyIndex++];
        }
        styleBirthdayChoiceTile(choiceArr[i], letterChoice);
        choiceArr[i].name = letterChoice;
        choiceArr[i].letter = letterChoice;
        choiceArr[i].visible = false;
    }
    ans = missingLetter;
    console.log("correct3Answer= " + correctAnswer)
    applyBirthdayLayout(cLen);
    createTween()
    question.Text = "";
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
function createTween() {
    applyBirthdayLayout(cLen);

    var layoutCenterX = layoutRoot ? 0 : getStageCenterX();
    var holderStartY = QUESTION_HOLDER_Y + 22;
    var holderDelay = 280;

    if (questionHolderPanel) {
        questionHolderPanel.visible = true;
        questionHolderPanel.alpha = 0;
        questionHolderPanel.scaleX = questionHolderPanel.scaleY = 0.92;
        questionHolderPanel.x = layoutCenterX;
        questionHolderPanel.y = holderStartY;
        createjs.Tween.get(questionHolderPanel, { override: true })
            .wait(holderDelay)
            .to({ alpha: 1, scaleX: 1, scaleY: 1, y: QUESTION_HOLDER_Y }, 340, createjs.Ease.quadOut);
    }

    if (question) {
        question.visible = true;
        question.alpha = 0;
        question.scaleX = question.scaleY = QUESTION_IMAGE_BASE_SCALE * 0.92;
        createjs.Tween.get(question, { override: true })
            .wait(holderDelay + 160)
            .to({ alpha: 1, scaleX: QUESTION_IMAGE_BASE_SCALE + 0.06, scaleY: QUESTION_IMAGE_BASE_SCALE + 0.06 }, 300, createjs.Ease.backOut)
            .to({ scaleX: QUESTION_IMAGE_BASE_SCALE, scaleY: QUESTION_IMAGE_BASE_SCALE }, 220, createjs.Ease.sineOut);
    }

    var letterDelay = holderDelay + 520;
    for (i = 0; i < cLen; i++) {
        if (!quesArr[i]) {
            continue;
        }
        createjs.Tween.removeTweens(quesArr[i]);
        quesArr[i].visible = true;
        quesArr[i].alpha = 0;
        quesArr[i].scaleX = quesArr[i].scaleY = 0.9;
        createjs.Tween.get(quesArr[i], { override: true })
            .wait(letterDelay + (i * 100))
            .to({ alpha: 1, scaleX: 1.06, scaleY: 1.06 }, 260, createjs.Ease.backOut)
            .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineInOut);
    }

    var choiceDelay = letterDelay + (Math.max(cLen, 3) * 100) + 260;
    animateChoiceOptions(choiceDelay);

    repTimeClearInterval = setTimeout(AddListenerFn, choiceDelay + 1400);
}

function animateChoiceOptions(startDelay) {
    var baseDelay = startDelay || 0;
    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        var tile = choiceArr[i];
        var targetY = CHOICE_ROW_Y;
        var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
        var entryScale = Math.max(baseScale - 0.18, 0.4);
        createjs.Tween.removeTweens(tile);
        if (tile.inner) {
            createjs.Tween.removeTweens(tile.inner);
        }
        stopBirthdayChoicePulse(tile);
        tile.visible = true;
        tile.alpha = 0;
        tile.y = targetY + 48;
        if (tile.inner) {
            tile.inner.scaleX = tile.inner.scaleY = entryScale;
        }
        tile.mouseEnabled = false;
        tile.cursor = "default";
        (function (target, delayIndex, base) {
            var revealDelay = baseDelay + (delayIndex * 160);
            createjs.Tween.get(target, { override: true })
                .wait(revealDelay)
                .to({ alpha: 1, y: targetY }, 320, createjs.Ease.quadOut);

            if (target.inner) {
                createjs.Tween.get(target.inner, { override: true })
                    .wait(revealDelay)
                    .to({ scaleX: base + 0.18, scaleY: base + 0.18 }, 360, createjs.Ease.backOut)
                    .to({ scaleX: base, scaleY: base }, 240, createjs.Ease.sineOut)
                    .call(function () {
                        startBirthdayChoicePulse(target, base);
                    });
            } else {
                createjs.Tween.get(target, { override: false })
                    .wait(revealDelay)
                    .to({ scaleX: base + 0.18, scaleY: base + 0.18 }, 360, createjs.Ease.backOut)
                    .to({ scaleX: base, scaleY: base }, 240, createjs.Ease.sineOut)
                    .call(function () {
                        startBirthdayChoicePulse(target, base);
                    });
            }
        })(tile, i, baseScale);
    }
}

function getStageCenterX() {
    if (typeof getCanvasCenterX === "function") {
        var logicalCenter = getCanvasCenterX();
        if (typeof logicalCenter === "number" && isFinite(logicalCenter)) {
            return logicalCenter;
        }
    }

    if (stage && stage.canvas && typeof stage.canvas.width === "number") {
        var scaleX = (stage && typeof stage.scaleX === "number" && isFinite(stage.scaleX) && stage.scaleX !== 0)
            ? stage.scaleX
            : 1;
        var stageWidth = stage.canvas.width / scaleX;
        if (typeof stageWidth === "number" && isFinite(stageWidth)) {
            return stageWidth / 2;
        }
    }

    if (typeof canvas !== "undefined" && canvas && typeof canvas.width === "number") {
        return canvas.width / 2;
    }

    return 640;
}

function computeBirthdayRowPositions(count, spacing, centerX) {
    var positions = [];
    var total = parseInt(count, 10);
    if (!total || total <= 0) {
        return positions;
    }
    var gap = spacing || 120;
    var center = (typeof centerX === "number" && isFinite(centerX)) ? centerX : getStageCenterX();
    if (total === 1) {
        positions.push(center);
        return positions;
    }
    var rowWidth = gap * (total - 1);
    var startX = center - (rowWidth / 2);
    for (var idx = 0; idx < total; idx++) {
        positions.push(startX + (idx * gap));
    }
    return positions;
}

function applyBirthdayLayout(letterCount) {
    var stageCenterX = getStageCenterX();
    if (layoutRoot) {
        layoutRoot.x = stageCenterX;
    }
    var layoutCenterX = layoutRoot ? 0 : stageCenterX;

    if (QusTxtString) {
        QusTxtString.x = stageCenterX;
        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.refresh === "function") {
            QusTxtString.__labelBG.refresh();
        }
    }

    if (questionHolderPanel) {
        questionHolderPanel.x = layoutCenterX;
        questionHolderPanel.y = QUESTION_HOLDER_Y;
    }

    var choicePositions = computeBirthdayRowPositions(choiceArr.length, CHOICE_ROW_SPACING, layoutCenterX);
    for (var j = 0; j < choiceArr.length; j++) {
        if (choiceArr[j]) {
            choiceArr[j].x = choicePositions[j] || layoutCenterX;
            choiceArr[j].y = CHOICE_ROW_Y;
            choiceArr[j].__targetY = CHOICE_ROW_Y;
        }
    }

    var letters = parseInt(letterCount, 10) || 0;
    if (letters > 0) {
        var letterPositions = computeBirthdayRowPositions(letters, QUESTION_ROW_SPACING, layoutCenterX);
        for (var k = 0; k < letters; k++) {
            if (quesArr[k]) {
                quesArr[k].x = letterPositions[k] || layoutCenterX;
                quesArr[k].y = QUESTION_ROW_Y;
            }
        }
    }
}

function createBirthdayQuestionHolder() {
    var holder = new createjs.Container();
    var width = 210;
    var height = 210;
    var radius = 56;

    var shadow = new createjs.Shape();
    shadow.graphics.beginFill("rgba(0,0,0,0.18)").drawRoundRect(-width / 2, -height / 2 + 12, width, height, radius);
    shadow.alpha = 0.4;

    var panel = new createjs.Shape();
    panel.graphics
        .setStrokeStyle(4)
        .beginStroke("#f9c9ff")
        .beginLinearGradientFill(["#ffe8ff", "#ffd4ff"], [0, 1], 0, -height / 2, 0, height / 2)
        .drawRoundRect(-width / 2, -height / 2, width, height, radius);

    var inner = new createjs.Shape();
    inner.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0.85)", "rgba(255,255,255,0.25)"], [0, 1], 0, -height / 2, 0, height / 2)
        .drawRoundRect(-width / 2 + 16, -height / 2 + 18, width - 32, height - 36, radius - 18);

    holder.addChild(shadow, panel, inner);
    holder.shadow = new createjs.Shadow("rgba(69,42,114,0.25)", 0, 14, 34);
    return holder;
}

if (typeof window !== "undefined") {
    window.WhoAmIBirthdayLayout = window.WhoAmIBirthdayLayout || {};
    window.WhoAmIBirthdayLayout.computeRowPositions = computeBirthdayRowPositions;
    window.WhoAmIBirthdayLayout.getStageCenter = getStageCenterX;
    window.WhoAmIBirthdayLayout.questionRowY = QUESTION_ROW_Y;
    window.WhoAmIBirthdayLayout.choiceRowY = CHOICE_ROW_Y;
    window.WhoAmIBirthdayLayout.questionRowSpacing = QUESTION_ROW_SPACING;
    window.WhoAmIBirthdayLayout.choiceRowSpacing = CHOICE_ROW_SPACING;
    window.WhoAmIBirthdayLayout.questionHolderY = QUESTION_HOLDER_Y;
    window.WhoAmIBirthdayLayout.createQuestionHolder = createBirthdayQuestionHolder;
    window.WhoAmIBirthdayLayout.choiceBaseScale = CHOICE_TILE_BASE_SCALE;
    window.WhoAmIBirthdayLayout.questionImageScale = QUESTION_IMAGE_BASE_SCALE;
    window.WhoAmIBirthdayLayout.startChoicePulse = startBirthdayChoicePulse;
    window.WhoAmIBirthdayLayout.stopChoicePulse = stopBirthdayChoicePulse;
}
function AddListenerFn() {
    if (repTimeClearInterval) {
        clearTimeout(repTimeClearInterval);
        repTimeClearInterval = 0;
    }

    if (layoutRoot) {
        layoutRoot.mouseEnabled = true;
    }

    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        choiceArr[i].visible = true;
        choiceArr[i].id = i;
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].alpha = 1;
        choiceArr[i].cursor = "pointer";
    }

    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

//===============================================//
function disablechoices() {
    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        stopBirthdayChoicePulse(choiceArr[i]);
        choiceArr[i].cursor = "default";
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].visible = false;
    }
    if (layoutRoot) {
        layoutRoot.mouseEnabled = false;
    }
    for (i = 0; i < cLen; i++) {
        quesArr[i].visible = false
    }
    question.visible = false
}

function answerSelected(e) {
	  try { ChoiceFX_pressRipple(container, e.stageX, e.stageY); } catch(_e){}
    e.preventDefault();
    lCnt++;
    uans = e.currentTarget.name;
    e.currentTarget.mouseEnabled = false;
    e.currentTarget.alpha = 0.5;
    e.currentTarget.cursor = "default";
    stopBirthdayChoicePulse(e.currentTarget);
    console.log(ans+"        "+uans)

    gameResponseTimerStop();

    if (ans == uans) {
        currentX = e.currentTarget.x - 30
        currentY = e.currentTarget.y - 20
        disableMouse()

        styleBirthdayQuestionTile(quesArr[blankIndex], ans, false);
                try { ChoiceFX_revealPop(quesArr[blankIndex], "pop"); } catch(_e){}
        setTimeout(correct, 500)
    }
    else {
        getValidation("wrong");
        disablechoices();
    }
}

function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        stopBirthdayChoicePulse(choiceArr[i]);
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].cursor = "default";
    }
}

function enableMouse() {

}


function toFiniteNumber(value, fallback) {
    var num = Number(value);
    if (!isFinite(num)) {
        num = Number(fallback);
        if (!isFinite(num)) {
            num = 0;
        }
    }
    return num;
}

function buildBirthdayTile(options) {
    options = options || {};
    var tile = new createjs.Container();
    tile.mouseChildren = false;
    var inner = new createjs.Container();
    inner.mouseChildren = false;
    tile.addChild(inner);

    var glow = new createjs.Shape();
    glow.visible = false;
    glow.alpha = 0;
    inner.addChild(glow);

    var pulse = new createjs.Shape();
    pulse.visible = false;
    pulse.alpha = 0;
    inner.addChild(pulse);

    var width = toFiniteNumber(options.width, 120);
    var height = toFiniteNumber(options.height, 120);
    var radius = toFiniteNumber(options.radius, 28);
    if (width <= 0) { width = 1; }
    if (height <= 0) { height = 1; }
    if (radius < 0) { radius = 0; }
    var font = options.font || "700 60px 'Nunito', 'Arial', sans-serif";
    var textColor = options.color || "#452a72";
    var textOffsetY = toFiniteNumber(options.textOffsetY, 0);

    var bg = new createjs.Shape();
    bg.graphics.drawRoundRect(-width / 2, -height / 2, width, height, radius);
    inner.addChild(bg);

    var label = new createjs.Text("", font, textColor);
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 0;
    label.y = textOffsetY;
    inner.addChild(label);

    tile.inner = inner;
    tile.glow = glow;
    tile.pulse = pulse;
    tile.bg = bg;
    tile.label = label;
    tile.tileWidth = width;
    tile.tileHeight = height;
    tile.tileRadius = radius;
    tile.regX = 0;
    tile.regY = 0;
    tile.shadow = new createjs.Shadow("rgba(0,0,0,0.18)", 0, 6, 18);

    return tile;
}



function createBirthdayQuestionTile() {
    var tile = buildBirthdayTile({
        width: 118,
        height: 128,
        radius: 32,
        font: "700 58px 'Nunito', 'Arial', sans-serif",
        color: "#452a72",
        textOffsetY: 2
    });
    tile.baseScale = 1;
    if (tile.inner) {
        tile.inner.scaleX = tile.inner.scaleY = tile.baseScale;
    }
    configureBirthdayChoiceVisuals(tile);
    return tile;
}

function createBirthdayChoiceTile() {
    var tile = buildBirthdayTile({
        width: 136,
        height: 136,
        radius: 38,
        font: "700 64px 'Nunito', 'Arial', sans-serif",
        color: "#7a3600",
        textOffsetY: 3
    });
    tile.baseScale = CHOICE_TILE_BASE_SCALE;
    if (tile.inner) {
        tile.inner.scaleX = tile.inner.scaleY = tile.baseScale;
    }
    configureBirthdayChoiceVisuals(tile);
    return tile;
}

function bindBirthdayChoiceTile(tile, index) {
    if (!tile || tile.__birthdayChoiceBound) {
        return;
    }

    tile.__birthdayChoiceBound = true;
    tile.mouseChildren = false;
    tile.cursor = "pointer";
    if (typeof index === "number") {
        tile.__choiceIndex = index;
    }
    tile.addEventListener("click", answerSelected);

    if (!tile.hitArea) {
        var hitWidth = toFiniteNumber(tile.tileWidth, 140);
        var hitHeight = toFiniteNumber(tile.tileHeight, 140);
        var hitRadius = toFiniteNumber(tile.tileRadius, 36);
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRoundRect(-hitWidth / 2, -hitHeight / 2, hitWidth, hitHeight, hitRadius);
        tile.hitArea = hit;
    }

    attachBirthdayChoiceInteractions(tile);

    tile.mouseEnabled = false;
    tile.cursor = "default";
}

function getBirthdayChoiceIndex(tile) {
    if (!tile) {
        return -1;
    }

    if (typeof tile.__choiceIndex === "number") {
        return tile.__choiceIndex;
    }

    for (var idx = 0; idx < choiceArr.length; idx++) {
        if (choiceArr[idx] === tile) {
            tile.__choiceIndex = idx;
            return idx;
        }
    }

    return -1;
}

function attachBirthdayChoiceInteractions(tile) {
    if (!tile) {
        return;
    }

    detachBirthdayChoiceInteractions(tile);

    tile.__hoverHandler = tile.on("mouseover", function () {
        var index = getBirthdayChoiceIndex(tile);
        if (index === -1) {
            return;
        }
        tile.__isHover = true;
        stopBirthdayChoicePulse(tile);
        emphasizeBirthdayChoice(tile, true);
    });

    tile.__outHandler = tile.on("mouseout", function () {
        var index = getBirthdayChoiceIndex(tile);
        if (index === -1) {
            return;
        }
        tile.__isHover = false;
        emphasizeBirthdayChoice(tile, false);
        startBirthdayChoicePulse(tile, tile.baseScale);
    });

    tile.__downHandler = tile.on("mousedown", function () {
        pressBirthdayChoice(tile);
    });

    tile.__upHandler = tile.on("pressup", function () {
        releaseBirthdayChoice(tile);
    });
}

function detachBirthdayChoiceInteractions(tile) {
    if (!tile) {
        return;
    }

    if (tile.__hoverHandler) {
        tile.off("mouseover", tile.__hoverHandler);
        tile.__hoverHandler = null;
    }
    if (tile.__outHandler) {
        tile.off("mouseout", tile.__outHandler);
        tile.__outHandler = null;
    }
    if (tile.__downHandler) {
        tile.off("mousedown", tile.__downHandler);
        tile.__downHandler = null;
    }
    if (tile.__upHandler) {
        tile.off("pressup", tile.__upHandler);
        tile.__upHandler = null;
    }
}

function configureBirthdayChoiceVisuals(tile) {
    if (!tile) {
        return;
    }

    var width = toFiniteNumber(tile.tileWidth, 136);
    var height = toFiniteNumber(tile.tileHeight, 136);
    var radius = toFiniteNumber(tile.tileRadius, 38);

    drawBirthdayChoiceBackground(tile, BIRTHDAY_CHOICE_BASE_STYLE, width, height, radius);

    if (tile.glow) {
        var glowRadius = Math.max(width, height) * 0.62;
        tile.glow.graphics
            .clear()
            .beginRadialGradientFill([
                "rgba(255,217,165,0.45)",
                "rgba(255,217,165,0)"
            ], [0, 1], 0, 0, glowRadius * 0.12, 0, 0, glowRadius)
            .drawCircle(0, 0, glowRadius);
        tile.glow.alpha = 0;
        tile.glow.visible = true;
        tile.glow.__baseAlpha = 0.38;
    }

    if (tile.pulse) {
        var pulseRadius = Math.max(width, height) * 0.52;
        tile.pulse.graphics
            .clear()
            .setStrokeStyle(4)
            .beginStroke("rgba(255,166,66,0.58)")
            .drawCircle(0, 0, pulseRadius);
        tile.pulse.alpha = 0;
        tile.pulse.visible = false;
        tile.pulse.__baseScale = 1;
    }

    if (!tile.shadow) {
        tile.shadow = new createjs.Shadow("rgba(9,18,36,0.26)", 0, 16, 32);
    }
}

function drawBirthdayChoiceBackground(tile, palette, width, height, radius) {
    if (!tile || !tile.bg) {
        return;
    }

    var shape = tile.bg;
    var colors = (palette && palette.fill) || BIRTHDAY_CHOICE_BASE_STYLE.fill;
    var stroke = (palette && palette.stroke) || BIRTHDAY_CHOICE_BASE_STYLE.stroke;
    var w = toFiniteNumber(width, tile.tileWidth || 136);
    var h = toFiniteNumber(height, tile.tileHeight || 136);
    var r = toFiniteNumber(radius, tile.tileRadius || 36);
    if (w <= 0) { w = 1; }
    if (h <= 0) { h = 1; }
    if (r < 0) { r = 0; }

    shape.graphics
        .clear()
        .setStrokeStyle(4)
        .beginStroke(stroke)
        .beginLinearGradientFill(colors, [0, 1], 0, -h / 2, 0, h / 2)
        .drawRoundRect(-w / 2, -h / 2, w, h, r);
}

function styleBirthdayQuestionTile(tile, letter, isBlank) {
    if (tile) {
        var g = tile.bg.graphics;
        g.clear();
        var width = toFiniteNumber(tile.tileWidth, 118);
        var height = toFiniteNumber(tile.tileHeight, 128);
        var radius = toFiniteNumber(tile.tileRadius, 32);
        if (width <= 0) { width = 1; }
        if (height <= 0) { height = 1; }
        if (radius < 0) { radius = 0; }
        var fill = isBlank ? ["#ffe8f5", "#ffd6eb"] : ["#ffffff", "#ffe2f4"];
        var stroke = isBlank ? "#ff9cc5" : "#ff7aa9";
        g.setStrokeStyle(4)
            .beginStroke(stroke)
            .beginLinearGradientFill(fill, [0, 1], 0, -height / 2, 0, height / 2)
            .drawRoundRect(-width / 2, -height / 2, width, height, radius);

        tile.label.text = isBlank ? "?" : (letter || "");
        tile.label.color = isBlank ? "#ff6f9f" : "#452a72";
        tile.label.alpha = isBlank ? 0.65 : 1;
        tile.bg.alpha = isBlank ? 0.85 : 1;
        if (tile.glow) {
            tile.glow.visible = false;
            tile.glow.alpha = 0;
        }
        if (tile.pulse) {
            tile.pulse.visible = false;
            tile.pulse.alpha = 0;
        }
    }
}



function styleBirthdayChoiceTile(tile, letter) {
    if (tile) {
        var width = toFiniteNumber(tile.tileWidth, 136);
        var height = toFiniteNumber(tile.tileHeight, 136);
        var radius = toFiniteNumber(tile.tileRadius, 38);
        drawBirthdayChoiceBackground(tile, BIRTHDAY_CHOICE_BASE_STYLE, width, height, radius);
        tile.label.text = letter || "";
        tile.label.color = "#7a3600";
        tile.label.alpha = 1;
        if (tile.glow) {
            tile.glow.alpha = 0;
            tile.glow.visible = true;
        }
        if (tile.pulse) {
            tile.pulse.alpha = 0;
            tile.pulse.visible = false;
        }
    }
}

function startBirthdayChoicePulse(tile, baseScale) {
    if (!tile) {
        return;
    }

    var scale = typeof baseScale === "number" ? baseScale : (tile.baseScale || CHOICE_TILE_BASE_SCALE);
    var inner = tile.inner || tile;
    var index = getBirthdayChoiceIndex(tile);
    var staggerIndex = index >= 0 ? index : 0;

    stopBirthdayChoicePulse(tile);

    if (inner) {
        inner.scaleX = inner.scaleY = scale;
        inner.__idleTween = createjs.Tween.get(inner, { loop: true, override: false })
            .wait((staggerIndex % 3) * 80)
            .to({ scaleX: scale * 1.06, scaleY: scale * 0.96 }, 360, createjs.Ease.sineOut)
            .to({ scaleX: scale * 0.98, scaleY: scale * 1.02 }, 360, createjs.Ease.sineInOut)
            .to({ scaleX: scale, scaleY: scale }, 320, createjs.Ease.sineInOut);
    }

    var baseY = typeof tile.__targetY === "number" ? tile.__targetY : tile.y;
    if (!isNaN(baseY)) {
        tile.__baseY = baseY;
        tile.y = baseY;
        tile.__idleTween = createjs.Tween.get(tile, { loop: true, override: false })
            .wait((staggerIndex % 3) * 90)
            .to({ y: baseY - 10 }, 360, createjs.Ease.sineOut)
            .to({ y: baseY }, 420, createjs.Ease.sineInOut);
    }

    if (tile.glow) {
        var glowBase = tile.glow.__baseAlpha != null ? tile.glow.__baseAlpha : 0.38;
        tile.glow.visible = true;
        tile.glow.alpha = glowBase;
        tile.glow.__idleTween = createjs.Tween.get(tile.glow, { loop: true, override: false })
            .wait((staggerIndex % 3) * 110)
            .to({ alpha: Math.min(0.64, glowBase + 0.18) }, 360, createjs.Ease.sineInOut)
            .to({ alpha: glowBase }, 360, createjs.Ease.sineInOut);
    }

    if (tile.pulse) {
        var pulseBase = tile.pulse.__baseScale || 1;
        tile.pulse.visible = false;
        tile.pulse.alpha = 0.62;
        tile.pulse.scaleX = tile.pulse.scaleY = pulseBase;
        tile.pulse.__idleTween = createjs.Tween.get(tile.pulse, { loop: true, override: false })
            .wait((staggerIndex % 4) * 120)
            .to({ scaleX: pulseBase * 1.18, scaleY: pulseBase * 1.18, alpha: 0.85 }, 380, createjs.Ease.quadOut)
            .to({ scaleX: pulseBase * 1.34, scaleY: pulseBase * 1.34, alpha: 0 }, 320, createjs.Ease.quadIn)
            .call(function () {
                tile.pulse.alpha = 0.62;
                tile.pulse.scaleX = tile.pulse.scaleY = pulseBase;
            });
    }

    if (index >= 0) {
        choiceIdleStateArr[index] = true;
    }
}

function stopBirthdayChoicePulse(tile) {
    if (!tile) {
        return;
    }

    var index = getBirthdayChoiceIndex(tile);
    if (index >= 0) {
        choiceIdleStateArr[index] = false;
    }

    var inner = tile.inner || tile;
    if (inner) {
        createjs.Tween.removeTweens(inner);
        var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
        inner.scaleX = inner.scaleY = baseScale;
        inner.__idleTween = null;
    }

    createjs.Tween.removeTweens(tile);
    if (typeof tile.__baseY === "number") {
        tile.y = tile.__baseY;
    } else if (typeof tile.__targetY === "number") {
        tile.y = tile.__targetY;
    }
    tile.__idleTween = null;

    if (tile.glow) {
        createjs.Tween.removeTweens(tile.glow);
        tile.glow.alpha = 0;
        tile.glow.visible = false;
        tile.glow.__idleTween = null;
    }

    if (tile.pulse) {
        createjs.Tween.removeTweens(tile.pulse);
        tile.pulse.visible = false;
        tile.pulse.alpha = 0;
        var pulseBase = tile.pulse.__baseScale || 1;
        tile.pulse.scaleX = tile.pulse.scaleY = pulseBase;
        tile.pulse.__idleTween = null;
    }
}

function resetBirthdayChoiceTile(tile) {
    if (!tile) {
        return;
    }

    stopBirthdayChoicePulse(tile);
    createjs.Tween.removeTweens(tile);
    if (tile.inner) {
        createjs.Tween.removeTweens(tile.inner);
        var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
        tile.inner.scaleX = tile.inner.scaleY = baseScale;
    }
    tile.alpha = 1;
    tile.y = CHOICE_ROW_Y;
    tile.visible = false;
    tile.mouseEnabled = false;
    tile.cursor = "default";
    drawBirthdayChoiceBackground(tile, BIRTHDAY_CHOICE_BASE_STYLE);
    if (tile.glow) {
        tile.glow.alpha = 0;
        tile.glow.visible = true;
    }
    if (tile.pulse) {
        tile.pulse.alpha = 0;
        tile.pulse.visible = false;
    }
}

function emphasizeBirthdayChoice(tile, isHover) {
    if (!tile) {
        return;
    }

    var inner = tile.inner || tile;
    var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
    var targetScale = baseScale * (isHover ? 1.05 : 1);
    var palette = isHover ? BIRTHDAY_CHOICE_HOVER_STYLE : BIRTHDAY_CHOICE_BASE_STYLE;

    drawBirthdayChoiceBackground(tile, palette);

    if (inner) {
        createjs.Tween.get(inner, { override: true })
            .to({ scaleX: targetScale, scaleY: targetScale }, 160, createjs.Ease.quadOut);
    }

    if (tile.glow) {
        var glowBase = tile.glow.__baseAlpha != null ? tile.glow.__baseAlpha : 0.38;
        var targetAlpha = isHover ? Math.min(0.68, glowBase + 0.22) : glowBase;
        tile.glow.visible = true;
        createjs.Tween.get(tile.glow, { override: true })
            .to({ alpha: targetAlpha }, 160, createjs.Ease.quadOut);
    }

    if (tile.pulse) {
        var pulseBase = tile.pulse.__baseScale || 1;
        tile.pulse.visible = false;
        createjs.Tween.get(tile.pulse, { override: true })
            .to({
                alpha: isHover ? 0.9 : 0.62,
                scaleX: pulseBase * (isHover ? 1.08 : 1),
                scaleY: pulseBase * (isHover ? 1.08 : 1)
            }, 180, createjs.Ease.quadOut);
    }
}

function pressBirthdayChoice(tile) {
    if (!tile) {
        return;
    }

    var inner = tile.inner || tile;
    var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
    drawBirthdayChoiceBackground(tile, BIRTHDAY_CHOICE_PRESS_STYLE);

    if (inner) {
        createjs.Tween.get(inner, { override: true })
            .to({ scaleX: baseScale * 0.94, scaleY: baseScale * 0.94 }, 90, createjs.Ease.quadOut);
    }

    if (tile.glow) {
        createjs.Tween.get(tile.glow, { override: true })
            .to({ alpha: 0.95 }, 90, createjs.Ease.quadOut);
    }

    if (tile.pulse) {
        var pulseBase = tile.pulse.__baseScale || 1;
        createjs.Tween.get(tile.pulse, { override: true })
            .to({ alpha: 0.4, scaleX: pulseBase * 0.9, scaleY: pulseBase * 0.9 }, 90, createjs.Ease.quadOut);
    }
}

function releaseBirthdayChoice(tile) {
    if (!tile) {
        return;
    }

    var inner = tile.inner || tile;
    var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
    var palette = tile.__isHover ? BIRTHDAY_CHOICE_HOVER_STYLE : BIRTHDAY_CHOICE_BASE_STYLE;
    var targetScale = baseScale * (tile.__isHover ? 1.05 : 1);

    drawBirthdayChoiceBackground(tile, palette);

    if (inner) {
        createjs.Tween.get(inner, { override: true })
            .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04 }, 120, createjs.Ease.quadOut)
            .to({ scaleX: targetScale, scaleY: targetScale }, 150, createjs.Ease.quadIn);
    }

    if (tile.glow) {
        var glowBase = tile.glow.__baseAlpha != null ? tile.glow.__baseAlpha : 0.38;
        var targetAlpha = tile.__isHover ? Math.min(0.68, glowBase + 0.22) : glowBase;
        createjs.Tween.get(tile.glow, { override: true })
            .to({ alpha: targetAlpha }, 180, createjs.Ease.quadOut);
    }

    if (tile.pulse) {
        var pulseBase = tile.pulse.__baseScale || 1;
        createjs.Tween.get(tile.pulse, { override: true })
            .to({
                alpha: tile.__isHover ? 0.82 : 0.62,
                scaleX: pulseBase * (tile.__isHover ? 1.06 : 1),
                scaleY: pulseBase * (tile.__isHover ? 1.06 : 1)
            }, 180, createjs.Ease.quadOut);
    }
}



//===============================================================================================//