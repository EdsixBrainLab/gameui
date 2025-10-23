var messageField;		//Message display field

var assets = [];
var choiceArr = [];
var choiceMcArr = []
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
var cnt = -1,qscnt=-1, ans, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, questionHolderPanel, circleOutline, chHolderMC, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var words_arry = ["cake", "chocolate", "balloon", "gift", "cap", "candle", "icecream", "juice", "cupcake", "lollipop"];
var maxLetterCnt = 10
var quesArr = []
var answerArr = []
var decoyArr = []
var blankIndex = 0;
var QUESTION_HOLDER_Y = 256;
var QUESTION_ROW_Y = 520;
var CHOICE_ROW_Y = 688;
var QUESTION_ROW_SPACING = 138;
var CHOICE_ROW_SPACING = 210;
var CHOICE_TILE_BASE_SCALE = 0.7;
var QUESTION_IMAGE_BASE_SCALE = 0.76;
var layoutRoot;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = ["178.3", "288.3", "398.3", "508.3", "618.3", "728.3", "688.3", "288.3", "338.3", "418.3", "498.3", "578.3"];
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
    gameAssetsPath = "WhoAmI-Birthday/";
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
	
	call_UI_gameQuestion(container,"Click on the correct letter to complete the name of the items in a birthday party");
		 
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
        question.x = 0;
        question.y = -6;
        question.scaleX = question.scaleY = QUESTION_IMAGE_BASE_SCALE;
        question.mouseEnabled = false;
    }

    for (i = 0; i < 3; i++) {
        choiceArr[i] = createBirthdayChoiceTile();
        choiceArr[i].scaleX = choiceArr[i].scaleY = CHOICE_TILE_BASE_SCALE;
        choiceArr[i].visible = false;
        choiceArr[i].baseScale = CHOICE_TILE_BASE_SCALE;
        layoutRoot.addChild(choiceArr[i]);
        choiceArr[i].x = 0;
        choiceArr[i].y = CHOICE_ROW_Y;
    }

    for (i = 0; i < 10; i++) {
        quesArr[i] = createBirthdayQuestionTile();
        quesArr[i].visible = false;
        quesArr[i].baseScale = 1;
        layoutRoot.addChild(quesArr[i]);
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
    for (i = 0; i < cLen; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
    }
}

function helpEnable() {
    for (i = 0; i < cLen; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
        }
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
        stopBirthdayChoicePulse(tile);
        tile.visible = true;
        tile.alpha = 0;
        tile.y = targetY + 48;
        tile.scaleX = tile.scaleY = entryScale;
        tile.mouseEnabled = false;
        tile.cursor = "default";
        (function (target, delayIndex, base) {
            createjs.Tween.get(target, { override: true })
                .wait(baseDelay + (delayIndex * 160))
                .to({ alpha: 1, y: targetY, scaleX: base + 0.16, scaleY: base + 0.16 }, 360, createjs.Ease.backOut)
                .to({ scaleX: base, scaleY: base }, 240, createjs.Ease.sineOut)
                .call(function () {
                    startBirthdayChoicePulse(target, base);
                });
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
    var width = 420;
    var height = 240;
    var radius = 46;

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

    clearTimeout(repTimeClearInterval)
  


    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true
        choiceArr[i].id = i
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].alpha = 1;
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].cursor = "pointer";
        choiceArr[i].addEventListener("click", answerSelected);
try { ChoiceFX_bindHover(choiceArr); } catch(_e){}
    }

    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

//===============================================//
function disablechoices() {
    for (i = 0; i < 3; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        stopBirthdayChoicePulse(choiceArr[i]);
        choiceArr[i].removeEventListener("click", answerSelected)
        choiceArr[i].cursor = "default";
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].visible = false;
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
        for (i = 0; i < 3; i++) {
            choiceArr[i].removeEventListener("click", answerSelected)
        }
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
    for (i = 0; i < 3; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        stopBirthdayChoicePulse(choiceArr[i]);
        choiceArr[i].mouseEnabled = false;
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
    tile.addChild(bg);

    var label = new createjs.Text("", font, textColor);
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = width / 2;
    label.y = height / 2 + textOffsetY;
    tile.addChild(label);

    tile.bg = bg;
    tile.label = label;
    tile.tileWidth = width;
    tile.tileHeight = height;
    tile.tileRadius = radius;
    tile.regX = width / 2;
    tile.regY = height / 2;
    tile.shadow = new createjs.Shadow("rgba(0,0,0,0.18)", 0, 6, 18);

    return tile;
}



function createBirthdayQuestionTile() {
    return buildBirthdayTile({
        width: 118,
        height: 128,
        radius: 32,
        font: "700 58px 'Nunito', 'Arial', sans-serif",
        color: "#452a72",
        textOffsetY: 2
    });
}

function createBirthdayChoiceTile() {
    return buildBirthdayTile({
        width: 136,
        height: 136,
        radius: 38,
        font: "700 64px 'Nunito', 'Arial', sans-serif",
        color: "#7a3600",
        textOffsetY: 3
    });
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
            .beginLinearGradientFill(fill, [0, 1], 0, 0, 0, height)
            .drawRoundRect(0, 0, width, height, radius);

        tile.label.text = isBlank ? "?" : (letter || "");
        tile.label.color = isBlank ? "#ff6f9f" : "#452a72";
        tile.label.alpha = isBlank ? 0.65 : 1;
        tile.bg.alpha = isBlank ? 0.85 : 1;
    }
}



function styleBirthdayChoiceTile(tile, letter) {
    if (tile) {
        var g = tile.bg.graphics;
        g.clear();
        var width = toFiniteNumber(tile.tileWidth, 136);
        var height = toFiniteNumber(tile.tileHeight, 136);
        var radius = toFiniteNumber(tile.tileRadius, 38);
        if (width <= 0) { width = 1; }
        if (height <= 0) { height = 1; }
        if (radius < 0) { radius = 0; }
        g.setStrokeStyle(4)
            .beginStroke("#ffb660")
            .beginLinearGradientFill(["#fff4d4", "#ffd78a"], [0, 1], 0, 0, 0, height)
            .drawRoundRect(0, 0, width, height, radius);
        tile.label.text = letter || "";
        tile.label.color = "#7a3600";
        tile.label.alpha = 1;
    }
}

function startBirthdayChoicePulse(tile, baseScale) {
    if (tile) {
        var scale = typeof baseScale === "number" ? baseScale : (tile.baseScale || CHOICE_TILE_BASE_SCALE);
        stopBirthdayChoicePulse(tile);
        tile.scaleX = tile.scaleY = scale;
        tile.__pulseTween = createjs.Tween.get(tile, { loop: true })
            .wait(220)
            .to({ scaleX: scale + 0.06, scaleY: scale + 0.06 }, 420, createjs.Ease.sineInOut)
            .to({ scaleX: scale, scaleY: scale }, 420, createjs.Ease.sineInOut);
    }
}

function stopBirthdayChoicePulse(tile) {
    if (tile) {
        if (tile.__pulseTween) {
            tile.__pulseTween.setPaused(true);
            tile.__pulseTween = null;
        }
        if (typeof tile.baseScale === "number") {
            tile.scaleX = tile.scaleY = tile.baseScale;
        }
    }
}

function resetBirthdayChoiceTile(tile) {
    if (tile) {
        stopBirthdayChoicePulse(tile);
        createjs.Tween.removeTweens(tile);
        var baseScale = tile.baseScale || CHOICE_TILE_BASE_SCALE;
        tile.scaleX = tile.scaleY = baseScale;
        tile.alpha = 1;
        tile.y = CHOICE_ROW_Y;
    }
}



//===============================================================================================//



