///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 2, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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

var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var index;
var j = 1;
var ques;
var QusTxtString;
var questiontext;
var choiceArr = [];
var choiceBgArr = [];
var choiceGlowArr = [];
var choicePulseArr = [];
var choiceLabelArr = [];
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var alphaArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var quesArr = ["byte", "chat", "dump", "aged", "aqua", "atom", "auto", "body", "peon", "yoga", "edit", "inch", "oath", "pity",
    "quiz", "desk", "rain", "vote", "sail", "leap", "ugly", "wing", "zero", "zeal", "city",
    "open", "feed", "jeep", "clap", "obey", "half", "item", "iron", "kick", "list", "gate", "bake", "date", "late",
    "page", "pray", "task", "mask", "home", "pond", "hold", "bold", "here", "fear", "bite"];

var ansRemovedArr = []
var farr = []
var tweenMcArr = []
var btn1 = [100, 200, 350, 500, 650];
var btn2 = [80, 230, 380, 530, 680];

var CLUE_LETTER_FONT = "800 82px 'Baloo 2'";
var CLUE_LETTER_COLOR = "#F4FAFF";
var CHOICE_LETTER_FONT = "800 72px 'Baloo 2'";
var CHOICE_LETTER_COLOR = "#FFFFFF";
var LETTER_SHADOW = new createjs.Shadow("rgba(8,18,44,0.36)", 0, 8, 22);
var CLUE_ROW_Y = 372;
var CHOICE_ROW_Y = 612;

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
    gameAssetsPath = "MissingLetter-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
    if (!QusTxtString) {
        call_UI_gameQuestion(container, "Choose the missing letter to complete the word.");
    }
}

function getCenteredPositions(count, options) {
    options = options || {};
    var centerX = typeof options.centerX === "number" ? options.centerX : canvas.width / 2;
    var spacing = typeof options.spacing === "number" ? options.spacing : 180;
    var positions = [];
    if (count <= 0) {
        return positions;
    }
    var startX = centerX - ((count - 1) * spacing) / 2;
    for (var i = 0; i < count; i++) {
        positions.push(startX + i * spacing);
    }
    return positions;
}

function buildChoiceTile() {
    var tile = new createjs.Container();
    tile.visible = false;
    tile.alpha = 0;
    tile.mouseChildren = false;
    tile.mouseEnabled = false;
    tile.cursor = "default";
    tile.__baseScale = 0.8;
    tile.scaleX = tile.scaleY = tile.__baseScale;
    tile.x = 0;
    tile.y = CHOICE_ROW_Y;

    var glow = new createjs.Shape();
    drawChoiceSpeechWave(glow);
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    tile.addChild(glow);

    var bg = new createjs.Shape();
    drawChoiceTileBackground(bg);
    bg.alpha = 0.95;
    bg.__baseScale = 1;
    bg.mouseEnabled = false;
    bg.mouseChildren = false;
    tile.addChild(bg);

    var pulse = new createjs.Shape();
    drawChoiceSpeechWave(pulse);
    pulse.alpha = 0;
    pulse.visible = false;
    pulse.mouseEnabled = false;
    pulse.mouseChildren = false;
    tile.addChild(pulse);

    var label = new createjs.Text("", CHOICE_LETTER_FONT, CHOICE_LETTER_COLOR);
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.shadow = LETTER_SHADOW;
    label.mouseEnabled = false;
    label.mouseChildren = false;
    tile.addChild(label);

    tile.__glow = glow;
    tile.__bg = bg;
    tile.__pulse = pulse;
    tile.__label = label;
    tile.__letter = "";

    bindChoiceTile(tile);

    return tile;
}

function resetChoiceTile(tile, options) {
    if (!tile) {
        return;
    }
    var baseScale = tile.__baseScale || 0.68;
    tile.scaleX = tile.scaleY = baseScale;
    tile.alpha = 0;
    tile.visible = false;
    tile.mouseEnabled = false;
    tile.cursor = "default";
    tile.__letter = "";
    tile.y = (options && options.offscreenY) != null ? options.offscreenY : CHOICE_ROW_Y + 40;
    if (tile.__bg) {
        tile.__bg.alpha = 0.95;
        tile.__bg.scaleX = tile.__bg.scaleY = 1;
        drawChoiceTileBackground(tile.__bg);
    }
    if (tile.__glow) {
        tile.__glow.alpha = 0;
        tile.__glow.visible = false;
        tile.__glow.scaleX = tile.__glow.scaleY = 1;
    }
    if (tile.__pulse) {
        tile.__pulse.alpha = 0;
        tile.__pulse.visible = false;
        tile.__pulse.scaleX = tile.__pulse.scaleY = 1;
    }
    if (tile.__label) {
        tile.__label.text = "";
        tile.__label.alpha = 0;
    }
}

function highlightChoiceTile(tile, isHover) {
    if (!tile) {
        return;
    }
    var bg = tile.__bg;
    var glow = tile.__glow;
    var pulse = tile.__pulse;
    var baseScale = tile.__baseScale || tile.scaleX || 0.68;
    var targetScale = isHover ? baseScale * 1.06 : baseScale;

    createjs.Tween.get(tile, { override: true })
        .to({ scaleX: targetScale, scaleY: targetScale }, 160, createjs.Ease.quadOut);

    if (bg) {
        drawChoiceTileBackground(bg, isHover ? CHOICE_TILE_HOVER_COLORS : CHOICE_TILE_BASE_COLORS);
        createjs.Tween.get(bg, { override: true })
            .to({ alpha: isHover ? 1 : 0.95 }, 160, createjs.Ease.quadOut);
    }

    if (glow) {
        glow.visible = true;
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: isHover ? 0.45 : 0.2, scaleX: isHover ? 1.05 : 1, scaleY: isHover ? 1.05 : 1 }, 180, createjs.Ease.quadOut);
    }

    if (pulse) {
        pulse.visible = true;
        createjs.Tween.get(pulse, { override: true })
            .to({ alpha: isHover ? 0.4 : 0.18, scaleX: isHover ? 1.05 : 1, scaleY: isHover ? 1.05 : 1 }, 200, createjs.Ease.quadOut);
    }
}

function pressChoiceTile(tile) {
    if (!tile) {
        return;
    }
    var baseScale = tile.__baseScale || tile.scaleX || 0.68;
    createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * 0.94, scaleY: baseScale * 0.94 }, 100, createjs.Ease.quadOut);
}

function releaseChoiceTile(tile) {
    if (!tile) {
        return;
    }
    var baseScale = tile.__baseScale || tile.scaleX || 0.68;
    createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04 }, 140, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 160, createjs.Ease.quadIn);
}

function bindChoiceTile(tile) {
    if (!tile) {
        return;
    }
    tile.on("mouseover", function () {
        if (!tile.mouseEnabled) {
            return;
        }
        highlightChoiceTile(tile, true);
    });

    tile.on("mouseout", function () {
        highlightChoiceTile(tile, false);
    });

    tile.on("mousedown", function () {
        if (!tile.mouseEnabled) {
            return;
        }
        pressChoiceTile(tile);
    });

    tile.on("pressup", function () {
        releaseChoiceTile(tile);
    });

    tile.on("click", function (evt) {
        if (!tile.mouseEnabled) {
            return;
        }
        answerSelected(evt);
    });
}

function layoutChoiceTiles(count) {
    var positions = getCenteredPositions(count, { spacing: 184 });
    for (var i = 0; i < choiceArr.length; i++) {
        var tile = choiceArr[i];
        if (!tile) {
            continue;
        }
        if (i < positions.length) {
            tile.x = positions[i];
            tile.__targetX = positions[i];
            tile.__targetY = CHOICE_ROW_Y;
        } else {
            tile.visible = false;
        }
    }
}

function updateChoiceLetter(index, letter) {
    var tile = choiceArr[index];
    if (!tile) {
        return;
    }
    tile.__letter = letter;
    if (choiceLabelArr[index]) {
        var value = letter ? String(letter).toUpperCase() : "";
        choiceLabelArr[index].text = value;
        choiceLabelArr[index].alpha = value ? 1 : 0;
    }
}

function setClueDisplay(text) {
    if (!question) {
        return;
    }
    question.text = text != null ? String(text) : "";
    question.visible = true;
    if (questionCardContainer) {
        questionCardContainer.visible = true;
        if (container && container.parent) {
            container.parent.setChildIndex(questionCardContainer, container.parent.getNumChildren() - 1);
        }
    }
    if (typeof layoutQuestionCardContents === "function") {
        layoutQuestionCardContents();
    }
}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 49);
    qno.splice(qno.indexOf(16), 1)
    qno.push(16);
    console.log("qno" + qno)
    console.log("quesArr= " + quesArr)
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
    questiontext = QusTxtString;
    if (questiontext) {
        container.parent.addChild(questiontext);
        var promptCenterX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvas.width / 2;
        questiontext.x = promptCenterX;
        questiontext.y = 132;
        questiontext.__targetY = questiontext.y;
        if (questiontext.__labelBG && typeof questiontext.__labelBG.update === "function") {
            questiontext.__labelBG.update();
        }
        questiontext.visible = false;
    }

    ensureQuestionCard();
    if (questionCardContainer) {
        questionCardContainer.x = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvas.width / 2;
        questionCardContainer.y = 352;
        questionCardContainer.visible = false;
        questionCardContainer.alpha = 0;
        questionCardContainer.scaleX = questionCardContainer.scaleY = 0.78;
        if (container && container.parent) {
            container.parent.setChildIndex(questionCardContainer, container.parent.getNumChildren() - 1);
        }
    }
    if (question) {
        question.font = "800 88px 'Baloo 2'";
        question.lineHeight = 72;
        question.textAlign = "center";
        question.y = 0;
        question.visible = false;
        question.alpha = 1;
    }
    if (typeof questionSubtitle !== "undefined" && questionSubtitle) {
        questionSubtitle.text = "";
        questionSubtitle.visible = false;
    }

    for (var i = 0; i < 5; i++) {
        if (!choiceArr[i]) {
            choiceArr[i] = buildChoiceTile();
            choiceBgArr[i] = choiceArr[i].__bg;
            choiceGlowArr[i] = choiceArr[i].__glow;
            choicePulseArr[i] = choiceArr[i].__pulse;
            choiceLabelArr[i] = choiceArr[i].__label;
            container.parent.addChild(choiceArr[i]);
        }
        resetChoiceTile(choiceArr[i], { offscreenY: CHOICE_ROW_Y + 40 });
    }

    layoutChoiceTiles(5);

}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (var i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
        }
    }
}

function helpEnable() {
    for (var i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
            choiceArr[i].cursor = "pointer";
        }
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
    ansRemovedArr = [];
    panelVisibleFn();

    ques = quesArr[qno[cnt]];
    console.log("qno"+qno[cnt])
    var ran = Math.floor(Math.random() * ques.length);
    var clueChars = ques.toUpperCase().split("");
    if (ran >= 0 && ran < clueChars.length) {
        clueChars[ran] = "_";
    }
    setClueDisplay(clueChars.join("  "));
    if (questionCardContainer) {
        questionCardContainer.visible = false;
        questionCardContainer.alpha = 0;
        questionCardContainer.scaleX = questionCardContainer.scaleY = 0.78;
    }
    ans = ques.charAt(ran);
    console.log("ans" + ans)
    farr = [];

    index = alphaArr.indexOf(ans);
    for (i = 0; i < 26; i++) {
        if (i != index) {
            ansRemovedArr.push(alphaArr[i]);
        }
    }

    ansRemovedArr.sort(randomSort)

    farr.push(ans, ansRemovedArr[0], ansRemovedArr[1], ansRemovedArr[2], ansRemovedArr[3]);
    farr.sort(randomSort);
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (var i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        resetChoiceTile(choiceArr[i], { offscreenY: CHOICE_ROW_Y + 40 });
        updateChoiceLetter(i, farr[i]);
    }
    createTween();
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////
    if (questiontext) {
        var targetY = questiontext.__targetY != null ? questiontext.__targetY : questiontext.y;
        questiontext.__targetY = targetY;
        questiontext.visible = true;
        questiontext.alpha = 0;
        questiontext.y = targetY - 18;
        createjs.Tween.get(questiontext, { override: true })
            .wait(200)
            .to({ alpha: 1, y: targetY }, 420, createjs.Ease.quadOut);
    }

    if (questionCardContainer) {
        questionCardContainer.visible = true;
        questionCardContainer.alpha = 0;
        questionCardContainer.scaleX = questionCardContainer.scaleY = 0.72;
        createjs.Tween.get(questionCardContainer, { override: true })
            .wait(520)
            .to({ alpha: 1, scaleX: 0.78, scaleY: 0.78 }, 480, createjs.Ease.quadOut);
    }

    ///////////////////////////choice tween////////////////////////////////////
    for (var i = 0; i < choiceArr.length; i++) {
        var tile = choiceArr[i];
        if (!tile) {
            continue;
        }
        tile.visible = true;
        tile.alpha = 0;
        tile.y = CHOICE_ROW_Y + 44;
        tile.scaleX = tile.scaleY = tile.__baseScale || tile.scaleX || 0.68;
        var label = choiceLabelArr[i];
        if (label) {
            label.alpha = tile.__letter ? 1 : 0;
        }
        (function (targetTile, letterLabel, delayIndex) {
            var delay = 820 + delayIndex * 120;
            createjs.Tween.get(targetTile, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: CHOICE_ROW_Y }, 420, createjs.Ease.quadOut)
                .call(function () {
                    if (letterLabel && targetTile.__letter) {
                        letterLabel.alpha = 1;
                    }
                    highlightChoiceTile(targetTile, false);
                });
        })(tile, label, i);
    }
    //////////////////////////////////////////////////////////////////

    repTimeClearInterval = setTimeout(AddListenerFn, 2000)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (var i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        choiceArr[i].cursor = "pointer";
        choiceArr[i].mouseEnabled = true;
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}


function disablechoices() {
    createjs.Tween.removeAllTweens();
    for (var i = 0; i < choiceArr.length; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        choiceArr[i].mouseEnabled = false;
        choiceArr[i].cursor = "default";
        choiceArr[i].alpha = 0.35;
    }
    if (questiontext) {
        questiontext.visible = false;
        questiontext.alpha = 1;
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
    var selectedTile = e.currentTarget;
    uans = selectedTile.__letter;

    gameResponseTimerStop();
    if (ans == uans) {
        currentX = selectedTile.x - 20
        currentY = selectedTile.y - 20
        selectedTile.visible = true;
        disableMouse()
        setTimeout(correct, 500)
    } else {

        getValidation("wrong");
        disablechoices();
    }
}

function correct() {
    getValidation("correct");
    setClueDisplay(ques ? ques.toUpperCase().split("").join("  ") : "");
    disablechoices();
}


function disableMouse() {
    for (var i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
    }
}

function enableMouse() {

}