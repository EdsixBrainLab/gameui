var messageField;		//Message display field

var assets = [];
var choiceArr = [];
var choiceBgArr = [];
var choiceGlowArr = [];
var choicePulseArr = [];
var choiceDisabledOverlayArr = [];
var choiceReadyBadgeArr = [];
var choiceMcArr = [];
var choicePanelBg = null;
var textArr = [];
var qno = [];
var strArr = []
var chpos = [];
var getChar = [];
var quesMcArr = []
var cluePanelBg = null;
var txtLabel;
var clueMcArr = [];
var clueArr = []
var clueTxtArr = []
var quesArr = [];
var questionPanel = null;
var questionPanelBg = null;
var questionPanelHighlight = null;
var questionImageHolder = null;
var cnt = -1,qscnt=-1, ans, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, circleOutline, chHolderMC, choice2, choice3, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var words_arry = ["cake", "chocolate", "balloon", "gift", "cap", "candle", "icecream", "juice", "cupcake", "lollipop"];
var maxLetterCnt = 10
var alphabetArr1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var maxLetterCnt = 10
var answerArr = []
var choiceLetters = [];
var missingIndex = -1;
var questionLetters = [];
var isChoiceHoverBound = false;

var CHOICE_LETTER_FONT = "800 66px 'Baloo 2'";
var CLUE_LETTER_FONT = "800 60px 'Baloo 2'";
var CLUE_LETTER_VERTICAL_OFFSET = 6;
var LETTER_FILL_COLOR = "#FFFFFF";
var LETTER_SHADOW = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);

var CLUE_ROW_Y = 490;
var CHOICE_ROW_Y = 620;
var QUESTION_PANEL_Y = 300;
var CLUE_PANEL_HEIGHT = 168;
var CHOICE_PANEL_HEIGHT = 188;
var CLUE_PANEL_SIDE_PADDING = 72;
var CHOICE_PANEL_SIDE_PADDING = 68;
var QUESTION_PANEL_WIDTH = 440;
var QUESTION_PANEL_HEIGHT = 292;
var QUESTION_PANEL_BASE_SCALE = 0.98;

var globalHelperScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : this;

var letterHelpers =
  globalHelperScope && typeof globalHelperScope.SAUI_createAnagramLetterHelpers === "function"
    ? globalHelperScope.SAUI_createAnagramLetterHelpers({
        choiceInteractive: true,
        choiceScale: 0.78,
        choiceFont: CHOICE_LETTER_FONT,
        choiceColor: LETTER_FILL_COLOR,
        choiceShadow: LETTER_SHADOW,
        choiceHitRadius: 78,
        clueScale: 1,
        clueFont: CLUE_LETTER_FONT,
        clueColor: LETTER_FILL_COLOR,
        clueShadow: LETTER_SHADOW
      })
    : null;

var buildChoiceLetterDisplay =
  letterHelpers && typeof letterHelpers.buildChoice === "function"
    ? letterHelpers.buildChoice
    : function () {
        var label = new createjs.Text("", CHOICE_LETTER_FONT, LETTER_FILL_COLOR);
        label.textAlign = "center";
        label.textBaseline = "middle";
        label.shadow = LETTER_SHADOW;
        label.mouseEnabled = true;
        label.mouseChildren = false;
        label.__baseScale = 0.78;
        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("#000").drawRoundRect(-78, -78, 156, 156, 52);
        label.hitArea = hitArea;
        label.__hitArea = hitArea;
        return label;
      };

var updateChoiceLetterDisplay =
  letterHelpers && typeof letterHelpers.updateChoice === "function"
    ? letterHelpers.updateChoice
    : function (display, letter) {
        if (!display) {
          return;
        }
        var value = letter ? String(letter).toUpperCase() : "";
        display.text = value;
        display.alpha = value ? 1 : 0;
      };

var buildClueLetterDisplay =
  letterHelpers && typeof letterHelpers.buildClue === "function"
    ? letterHelpers.buildClue
    : function () {
        var label = new createjs.Text("", CLUE_LETTER_FONT, LETTER_FILL_COLOR);
        label.textAlign = "center";
        label.textBaseline = "middle";
        label.shadow = LETTER_SHADOW;
        label.mouseEnabled = false;
        label.mouseChildren = false;
        label.__baseScale = 1;
        return label;
      };

var updateClueLetterDisplay =
  letterHelpers && typeof letterHelpers.updateClue === "function"
    ? letterHelpers.updateClue
    : function (display, letter) {
        if (!display) {
          return;
        }
        var value = letter ? String(letter).toUpperCase() : "";
        display.text = value;
        display.alpha = value ? 1 : 0;
      };

var computeRowLayout = function (count, options) {
  if (globalHelperScope && typeof globalHelperScope.SAUI_computeRowLayout === "function") {
    return globalHelperScope.SAUI_computeRowLayout(count, options);
  }
  if (globalHelperScope && typeof globalHelperScope.SAUI_computeCenteredRow === "function") {
    return globalHelperScope.SAUI_computeCenteredRow(count, options);
  }

  options = options || {};
  var centerX =
    typeof options.centerX === "number"
      ? options.centerX
      : canvas && canvas.width
      ? canvas.width / 2
      : 640;
  var baseSpacing = options.baseSpacing != null ? options.baseSpacing : 174;
  var baseScale = options.baseScale != null ? options.baseScale : 1;
  var minScale = options.minScale != null ? options.minScale : 0.6;
  var maxSpan = options.maxSpan != null ? options.maxSpan : 900;
  var tileSpan = options.tileSpan != null ? options.tileSpan : baseSpacing;

  if (count <= 0) {
    return {
      positions: [],
      scale: baseScale,
      spacing: baseSpacing
    };
  }

  var totalSpan = (count - 1) * baseSpacing + tileSpan;
  var spanRatio = totalSpan > maxSpan && totalSpan > 0 ? maxSpan / totalSpan : 1;
  var scale = Math.max(minScale, baseScale * spanRatio);
  var spacing = baseSpacing * spanRatio;
  var startX = centerX - ((count - 1) * spacing) / 2;
  var positions = [];

  for (var i = 0; i < count; i++) {
    positions.push(startX + i * spacing);
  }

  return {
    positions: positions,
    scale: scale,
    spacing: spacing
  };
};

var CHOICE_TILE_BASE_COLORS_REF =
  globalHelperScope && globalHelperScope.CHOICE_TILE_BASE_COLORS
    ? globalHelperScope.CHOICE_TILE_BASE_COLORS
    : null;
var CHOICE_TILE_DISABLED_COLORS_REF =
  globalHelperScope && globalHelperScope.CHOICE_TILE_DISABLED_COLORS
    ? globalHelperScope.CHOICE_TILE_DISABLED_COLORS
    : ["rgba(94,78,166,0.8)", "rgba(54,36,122,0.82)"];
var CLUE_SLOT_ERROR_COLORS_REF =
  globalHelperScope && globalHelperScope.CLUE_SLOT_ERROR_COLORS
    ? globalHelperScope.CLUE_SLOT_ERROR_COLORS
    : ["rgba(255,153,171,0.94)", "rgba(184,46,89,0.94)"];
var choiceInteractiveHelper =
  globalHelperScope && typeof globalHelperScope.SA_setChoiceInteractiveState === "function"
    ? globalHelperScope.SA_setChoiceInteractiveState
    : null;

function drawQuestionPanelBackground(targetShape, width, height) {
  if (!targetShape) {
    return;
  }

  width = width || QUESTION_PANEL_WIDTH;
  height = height || QUESTION_PANEL_HEIGHT;

  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var cornerRadius = 58;

  var g = targetShape.graphics;
  g.clear();
  g.setStrokeStyle(6, "round", "round");
  g.beginLinearGradientStroke(
    ["rgba(248,244,255,0.55)", "rgba(143,120,255,0.65)"],
    [0, 1],
    -halfWidth,
    -halfHeight,
    halfWidth,
    halfHeight
  );
  g.beginLinearGradientFill(
    ["rgba(122,100,252,0.96)", "rgba(84,58,204,0.96)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);

  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.58)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight + 12,
    0,
    -halfHeight + height * 0.55
  );
  g.drawRoundRect(
    -halfWidth + 14,
    -halfHeight + 12,
    width - 28,
    height * 0.58,
    cornerRadius - 18
  );

  g.beginLinearGradientFill(
    ["rgba(74,47,182,0.72)", "rgba(74,47,182,0)"],
    [0, 1],
    0,
    0,
    0,
    halfHeight
  );
  g.drawRoundRect(
    -halfWidth + 18,
    -halfHeight + height * 0.42,
    width - 36,
    height * 0.46,
    cornerRadius - 22
  );
}

function drawCluePanelBackground(targetShape, width, height) {
  if (!targetShape) {
    return;
  }

  width = Math.max(320, width || 0);
  height = height || CLUE_PANEL_HEIGHT;

  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var cornerRadius = 54;

  var g = targetShape.graphics;
  g.clear();
  g.setStrokeStyle(5, "round", "round");
  g.beginLinearGradientStroke(
    ["rgba(244,236,255,0.48)", "rgba(150,118,255,0.62)"],
    [0, 1],
    -halfWidth,
    -halfHeight,
    halfWidth,
    halfHeight
  );
  g.beginLinearGradientFill(
    ["rgba(112,88,238,0.88)", "rgba(74,53,186,0.9)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);

  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.34)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight + 10,
    0,
    -halfHeight + height * 0.55
  );
  g.drawRoundRect(
    -halfWidth + 12,
    -halfHeight + 10,
    width - 24,
    height * 0.55,
    cornerRadius - 18
  );
}

function drawChoicePanelBackground(targetShape, width, height) {
  if (!targetShape) {
    return;
  }

  width = Math.max(300, width || 0);
  height = height || CHOICE_PANEL_HEIGHT;

  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var cornerRadius = 56;

  var g = targetShape.graphics;
  g.clear();
  g.setStrokeStyle(5, "round", "round");
  g.beginLinearGradientStroke(
    ["rgba(245,242,255,0.48)", "rgba(166,134,255,0.6)"],
    [0, 1],
    -halfWidth,
    -halfHeight,
    halfWidth,
    halfHeight
  );
  g.beginLinearGradientFill(
    ["rgba(102,74,236,0.88)", "rgba(66,40,182,0.92)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);

  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.32)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight + 12,
    0,
    -halfHeight + height * 0.5
  );
  g.drawRoundRect(
    -halfWidth + 14,
    -halfHeight + 12,
    width - 28,
    height * 0.5,
    cornerRadius - 18
  );
}

function drawChoiceGlow(targetShape) {
  if (!targetShape) {
    return;
  }

  var g = targetShape.graphics;
  g.clear();
  g.beginRadialGradientFill(
    ["rgba(214,186,255,0.62)", "rgba(214,186,255,0)"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    124
  );
  g.drawCircle(0, 0, 124);
}

function drawClueSlotPlaceholder(targetShape) {
  if (!targetShape) {
    return;
  }

  var g = targetShape.graphics;
  g.clear();

  g.beginRadialGradientFill(
    ["rgba(255,255,255,0.45)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    42
  );
  g.drawCircle(0, 0, 42);

  g.beginLinearGradientStroke(
    ["rgba(253,215,255,0.85)", "rgba(146,116,255,0.8)"],
    [0, 1],
    -26,
    -18,
    26,
    18
  );
  g.setStrokeStyle(4, "round", "round");
  g.drawRoundRect(-28, -16, 56, 32, 14);

  g.beginRadialGradientFill(
    ["rgba(255,226,150,0.85)", "rgba(238,112,193,0.85)", "rgba(238,112,193,0)"],
    [0, 0.6, 1],
    0,
    0,
    0,
    0,
    0,
    22
  );
  g.drawPolyStar(0, 0, 20, 6, 0.58, -90);
}

function updatePanelBackground(shape, centerX, width, height, drawFn) {
  if (!shape || typeof drawFn !== "function") {
    return;
  }

  drawFn(shape, width, height);
  shape.x = centerX;
}

function startCluePlaceholderTwinkle(slot) {
  if (!slot || !slot.placeholder) {
    return;
  }

  var ph = slot.placeholder;
  ph.visible = true;
  ph.alpha = 0.72;
  ph.scaleX = ph.scaleY = 1;
  ph.rotation = 0;
  createjs.Tween.removeTweens(ph);
  createjs.Tween.get(ph, { loop: true })
    .to({ alpha: 1, scaleX: 1.08, scaleY: 1.08, rotation: 6 }, 520, createjs.Ease.quadInOut)
    .to({ alpha: 0.58, scaleX: 0.92, scaleY: 0.92, rotation: -5 }, 520, createjs.Ease.quadInOut);
}

function stopCluePlaceholderTwinkle(slot) {
  if (!slot || !slot.placeholder) {
    return;
  }

  var ph = slot.placeholder;
  createjs.Tween.removeTweens(ph);
  ph.visible = false;
  ph.alpha = 0;
  ph.scaleX = ph.scaleY = 1;
  ph.rotation = 0;
}

function updateChoiceTileBackground(tile, colors) {
  if (!tile || !tile.bg || typeof drawChoiceTileBackground !== "function") {
    return;
  }
  drawChoiceTileBackground(tile.bg, colors || CHOICE_TILE_BASE_COLORS_REF);
}

function setChoiceInteractiveState(index, enabled, options) {
  options = options || {};

  if (choiceInteractiveHelper) {
    try {
      choiceInteractiveHelper(index, enabled, options);
      return;
    } catch (_e) {}
  }

  var tile = choiceArr[index];
  var bg = choiceBgArr[index];
  var glow = choiceGlowArr[index];
  var pulse = choicePulseArr[index];
  var overlay = choiceDisabledOverlayArr[index];
  var badge = choiceReadyBadgeArr[index];

  if (!tile && !bg && !glow && !pulse) {
    return;
  }

  if (tile) {
    tile.mouseEnabled = !!enabled;
    tile.mouseChildren = false;
    tile.cursor = enabled ? "pointer" : "default";
    tile.alpha = enabled ? 1 : options.keepVisible ? tile.alpha : 0.6;
  }

  if (!options.skipBackground && bg) {
    if (!enabled && CHOICE_TILE_DISABLED_COLORS_REF) {
      updateChoiceTileBackground(tile, CHOICE_TILE_DISABLED_COLORS_REF);
      bg.alpha = 0.62;
    } else {
      updateChoiceTileBackground(tile, CHOICE_TILE_BASE_COLORS_REF);
      bg.alpha = 0.95;
    }
  }

  if (glow) {
    glow.visible = enabled;
    glow.alpha = enabled ? 0.42 : 0.18;
  }

  if (pulse) {
    pulse.visible = enabled;
    var pulseScale = pulse.__baseScale || (tile ? tile.__baseScale || tile.scaleX : 1);
    pulse.alpha = enabled ? 0.72 : 0;
    pulse.scaleX = pulse.scaleY = pulseScale;
  }

  if (overlay) {
    overlay.visible = !enabled;
    overlay.alpha = enabled ? 0 : 0.58;
  }

  if (badge) {
    badge.visible = !!enabled && !options.suppressBadge;
    badge.alpha = badge.visible ? 1 : 0;
  }
}
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
    var stageRef = container.parent || stage;
    if (!stageRef) {
        return;
    }

    stageRef.addChild(QusTxtString);
    QusTxtString.visible = false;

    var centerX = canvas && !isNaN(canvas.width) ? canvas.width / 2 : 640;

    if (!questionPanel) {
        questionPanel = new createjs.Container();
        questionPanel.visible = false;
        questionPanel.alpha = 0;
        questionPanel.mouseEnabled = false;
        questionPanel.mouseChildren = false;

        questionPanelBg = new createjs.Shape();
        questionPanelBg.shadow = new createjs.Shadow("rgba(6,14,36,0.42)", 0, 18, 44);
        questionPanel.addChild(questionPanelBg);

        questionPanelHighlight = new createjs.Shape();
        questionPanelHighlight.mouseEnabled = false;
        questionPanelHighlight.mouseChildren = false;
        questionPanelHighlight.alpha = 0.72;
        questionPanelHighlight.graphics
            .beginRadialGradientFill(
                ["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"],
                [0, 1],
                0,
                0,
                0,
                0,
                0,
                128
            )
            .drawCircle(0, 0, 128);
        questionPanelHighlight.y = -QUESTION_PANEL_HEIGHT * 0.18;
        questionPanel.addChild(questionPanelHighlight);

        questionImageHolder = new createjs.Container();
        questionImageHolder.mouseEnabled = false;
        questionImageHolder.mouseChildren = false;
        questionPanel.addChild(questionImageHolder);

        stageRef.addChild(questionPanel);
    }

    drawQuestionPanelBackground(questionPanelBg, QUESTION_PANEL_WIDTH, QUESTION_PANEL_HEIGHT);
    questionPanel.x = centerX;
    questionPanel.y = QUESTION_PANEL_Y;
    questionPanel.scaleX = questionPanel.scaleY = QUESTION_PANEL_BASE_SCALE;
    questionPanel.visible = false;
    questionPanel.alpha = 0;

    if (questionPanelHighlight) {
        questionPanelHighlight.alpha = 0.72;
        questionPanelHighlight.scaleX = questionPanelHighlight.scaleY = 1;
    }

    if (question) {
        question.regX = question.regY = 174;
        question.x = 0;
        question.y = 16;
        question.scaleX = question.scaleY = 0.66;
        question.alpha = 0;
        question.visible = false;
        if (question.parent !== questionImageHolder && questionImageHolder) {
            if (question.parent) {
                question.parent.removeChild(question);
            }
            questionImageHolder.addChild(question);
        }
    }

    if (!cluePanelBg) {
        cluePanelBg = new createjs.Shape();
        cluePanelBg.visible = false;
        cluePanelBg.alpha = 0;
        cluePanelBg.mouseEnabled = false;
        cluePanelBg.mouseChildren = false;
        cluePanelBg.shadow = new createjs.Shadow("rgba(5,12,28,0.38)", 0, 16, 38);
        stageRef.addChild(cluePanelBg);
    }

    if (!choicePanelBg) {
        choicePanelBg = new createjs.Shape();
        choicePanelBg.visible = false;
        choicePanelBg.alpha = 0;
        choicePanelBg.mouseEnabled = false;
        choicePanelBg.mouseChildren = false;
        choicePanelBg.shadow = new createjs.Shadow("rgba(5,12,28,0.38)", 0, 18, 42);
        stageRef.addChild(choicePanelBg);
    }

    cluePanelBg.x = centerX;
    cluePanelBg.y = CLUE_ROW_Y;
    choicePanelBg.x = centerX;
    choicePanelBg.y = CHOICE_ROW_Y;

    var choiceLayout = computeRowLayout(3, {
        baseSpacing: 186,
        baseScale: 0.72,
        minScale: 0.68,
        maxSpan: 540,
        tileSpan: 148,
        centerX: centerX
    });

    for (i = 0; i < 3; i++) {
        if (!choiceArr[i]) {
            choiceArr[i] = new createjs.Container();
            choiceArr[i].visible = false;
            choiceArr[i].alpha = 0;
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].mouseChildren = false;
            choiceArr[i].shadow = new createjs.Shadow("rgba(9,18,36,0.35)", 0, 18, 36);
            choiceArr[i].__choiceIndex = i;
            choiceArr[i].__hitArea = new createjs.Shape();
            choiceArr[i].hitArea = choiceArr[i].__hitArea;
            stageRef.addChild(choiceArr[i]);
        }

        if (!choiceGlowArr[i]) {
            choiceGlowArr[i] = new createjs.Shape();
            choiceGlowArr[i].mouseEnabled = false;
            choiceGlowArr[i].mouseChildren = false;
            choiceGlowArr[i].visible = false;
            choiceGlowArr[i].alpha = 0;
            drawChoiceGlow(choiceGlowArr[i]);
        }
        if (choiceGlowArr[i].parent !== choiceArr[i]) {
            choiceArr[i].addChild(choiceGlowArr[i]);
        }

        if (!choicePulseArr[i]) {
            choicePulseArr[i] = new createjs.Shape();
            choicePulseArr[i].mouseEnabled = false;
            choicePulseArr[i].mouseChildren = false;
            choicePulseArr[i].visible = false;
            choicePulseArr[i].alpha = 0;
            drawChoiceSpeechWave(choicePulseArr[i]);
        }
        if (choicePulseArr[i].parent !== choiceArr[i]) {
            choiceArr[i].addChild(choicePulseArr[i]);
        }

        if (!choiceBgArr[i]) {
            choiceBgArr[i] = new createjs.Shape();
            choiceBgArr[i].shadow = new createjs.Shadow("rgba(9,18,36,0.38)", 0, 18, 36);
        }
        drawChoiceTileBackground(choiceBgArr[i]);
        if (choiceBgArr[i].parent !== choiceArr[i]) {
            choiceArr[i].addChild(choiceBgArr[i]);
        }
        choiceArr[i].bg = choiceBgArr[i];

        if (!choiceDisabledOverlayArr[i]) {
            choiceDisabledOverlayArr[i] = new createjs.Shape();
            drawChoiceDisabledOverlay(choiceDisabledOverlayArr[i]);
        }
        if (choiceDisabledOverlayArr[i].parent !== choiceArr[i]) {
            choiceArr[i].addChild(choiceDisabledOverlayArr[i]);
        }

        if (!choiceArr[i].label) {
            choiceArr[i].label = buildChoiceLetterDisplay();
            choiceArr[i].addChild(choiceArr[i].label);
        }

        if (!choiceReadyBadgeArr[i] && typeof SA_buildChoiceReadyBadge === "function") {
            choiceReadyBadgeArr[i] = SA_buildChoiceReadyBadge();
        }
        if (choiceReadyBadgeArr[i] && choiceReadyBadgeArr[i].parent !== choiceArr[i]) {
            choiceArr[i].addChild(choiceReadyBadgeArr[i]);
        }

        choiceArr[i].x = choiceLayout.positions[i];
        choiceArr[i].y = CHOICE_ROW_Y;
        choiceArr[i].scaleX = choiceArr[i].scaleY = choiceLayout.scale;
        choiceArr[i].__baseScale = choiceLayout.scale;
        choiceArr[i].visible = false;
        choiceArr[i].alpha = 0;
        choiceArr[i].cursor = "default";
        choiceArr[i].name = "";
        choiceArr[i].rotation = 0;
        choiceArr[i].mouseChildren = false;

        var tileScale = choiceLayout.scale;
        if (choiceGlowArr[i]) {
            choiceGlowArr[i].x = 0;
            choiceGlowArr[i].y = 6 * tileScale;
            choiceGlowArr[i].scaleX = choiceGlowArr[i].scaleY = tileScale * 1.34;
            choiceGlowArr[i].__targetScale = choiceGlowArr[i].scaleX;
            choiceGlowArr[i].alpha = 0;
            choiceGlowArr[i].visible = false;
        }

        if (choicePulseArr[i]) {
            choicePulseArr[i].x = 0;
            choicePulseArr[i].y = 0;
            choicePulseArr[i].scaleX = choicePulseArr[i].scaleY = tileScale;
            choicePulseArr[i].__baseScale = tileScale;
            choicePulseArr[i].alpha = 0;
            choicePulseArr[i].visible = false;
        }

        if (choiceBgArr[i]) {
            choiceBgArr[i].alpha = 0;
            choiceBgArr[i].visible = false;
            choiceBgArr[i].scaleX = choiceBgArr[i].scaleY = tileScale * 1.12;
            choiceBgArr[i].__baseScale = tileScale * 1.12;
        }

        if (choiceDisabledOverlayArr[i]) {
            choiceDisabledOverlayArr[i].alpha = 0;
            choiceDisabledOverlayArr[i].visible = false;
            choiceDisabledOverlayArr[i].scaleX = choiceDisabledOverlayArr[i].scaleY = tileScale * 1.12;
        }

        if (choiceArr[i].label) {
            updateChoiceLetterDisplay(choiceArr[i].label, "");
            choiceArr[i].label.alpha = 0;
        }

        if (choiceReadyBadgeArr[i]) {
            var badge = choiceReadyBadgeArr[i];
            var badgeOffset = (148 * tileScale) / 2 + 36;
            badge.x = 0;
            badge.y = -badgeOffset;
            badge.alpha = 0;
            badge.visible = false;
            badge.__baseScale = badge.__baseScale || badge.scaleX || 1;
            badge.scaleX = badge.scaleY = badge.__baseScale;
        }

        if (choiceArr[i].__hitArea) {
            var hitSize = 172 * tileScale;
            choiceArr[i].__hitArea.graphics
                .clear()
                .beginFill("#000")
                .drawRoundRect(-hitSize / 2, -hitSize / 2, hitSize, hitSize, 52 * tileScale);
        }

        choiceMcArr[i] = choiceArr[i];
        setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }

    var slotLayout = computeRowLayout(maxLetterCnt, {
        baseSpacing: 134,
        baseScale: 1,
        minScale: 0.82,
        maxSpan: 900,
        tileSpan: 108,
        centerX: centerX
    });

    for (i = 0; i < maxLetterCnt; i++) {
        if (!quesArr[i]) {
            quesArr[i] = new createjs.Container();
            quesArr[i].visible = false;
            quesArr[i].alpha = 0;
            quesArr[i].mouseEnabled = false;
            quesArr[i].mouseChildren = false;

            var slotBg = new createjs.Shape();
            drawClueSlotBackground(slotBg);
            slotBg.shadow = new createjs.Shadow("rgba(6,14,30,0.45)", 0, 10, 28);
            quesArr[i].addChild(slotBg);

            var slotPlaceholder = new createjs.Shape();
            drawClueSlotPlaceholder(slotPlaceholder);
            slotPlaceholder.x = 0;
            slotPlaceholder.y = CLUE_LETTER_VERTICAL_OFFSET;
            slotPlaceholder.visible = false;
            slotPlaceholder.alpha = 0;
            slotPlaceholder.mouseEnabled = false;
            slotPlaceholder.mouseChildren = false;
            quesArr[i].addChild(slotPlaceholder);

            var slotLabel = buildClueLetterDisplay();
            slotLabel.x = 0;
            slotLabel.y = CLUE_LETTER_VERTICAL_OFFSET;
            quesArr[i].addChild(slotLabel);

            quesArr[i].bg = slotBg;
            quesArr[i].placeholder = slotPlaceholder;
            quesArr[i].label = slotLabel;
            quesArr[i].__baseScale = 1;
            stageRef.addChild(quesArr[i]);
        } else if (!quesArr[i].placeholder) {
            quesArr[i].placeholder = new createjs.Shape();
            drawClueSlotPlaceholder(quesArr[i].placeholder);
            quesArr[i].placeholder.x = 0;
            quesArr[i].placeholder.y = CLUE_LETTER_VERTICAL_OFFSET;
            quesArr[i].placeholder.visible = false;
            quesArr[i].placeholder.alpha = 0;
            quesArr[i].placeholder.mouseEnabled = false;
            quesArr[i].placeholder.mouseChildren = false;
            quesArr[i].addChild(quesArr[i].placeholder);
            if (quesArr[i].label) {
                quesArr[i].addChild(quesArr[i].label);
            }
        }

        quesArr[i].x = slotLayout.positions[i];
        quesArr[i].y = CLUE_ROW_Y;
        quesArr[i].scaleX = quesArr[i].scaleY = slotLayout.scale;
        quesArr[i].__baseScale = slotLayout.scale;
        quesArr[i].visible = false;
        quesArr[i].alpha = 0;
        quesArr[i].rotation = 0;

        if (quesArr[i].bg) {
            drawClueSlotBackground(quesArr[i].bg);
            quesArr[i].bg.alpha = 1;
        }

        if (quesArr[i].placeholder) {
            stopCluePlaceholderTwinkle(quesArr[i]);
            quesArr[i].placeholder.visible = false;
            quesArr[i].placeholder.alpha = 0;
        }

        if (quesArr[i].label) {
            updateClueLetterDisplay(quesArr[i].label, "");
            quesArr[i].label.alpha = 0;
        }
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
}

function helpDisable() {
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceMcArr[i]) {
            choiceMcArr[i].mouseEnabled = false;
        }
    }
}

function helpEnable() {
    for (i = 0; i < choiceArr.length; i++) {
        if (choiceMcArr[i]) {
            choiceMcArr[i].mouseEnabled = true;
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
    wrdCnt = -1;
    //txtLabel.text = "";
    isCorrect = "";
	QusTxtString.visible = true;
   panelVisibleFn()
    correctAnswer = words_arry[qno[cnt]];
    question.gotoAndStop(qno[cnt])
    question.visible = false;
    ans = correctAnswer;
    cLen = ans.length;

    questionLetters.length = 0;
    answerArr.length = 0;
    choiceLetters.length = 0;
    missingIndex = -1;

    var alphabetPool = alphabetArr.slice();

    for (i = 0; i < cLen; i++) {
        var letter = ans.charAt(i).toUpperCase();
        answerArr[i] = letter;
        questionLetters[i] = letter;
        var removeIndex = alphabetPool.indexOf(letter);
        if (removeIndex >= 0) {
            alphabetPool.splice(removeIndex, 1);
        }
    }

    alphabetPool.sort(randomSort);

    for (i = 0; i < 3; i++) {
        choiceLetters[i] = alphabetPool[i] || alphabetArr1[i];
    }

    missingIndex = range(0, cLen - 1);
    rand1 = chposArr[cnt];

    var missingLetter = answerArr[missingIndex];
    for (i = 0; i < 3; i++) {
        if (i == rand1) {
            choiceLetters[i] = missingLetter;
        }
    }

    ans = missingLetter;
    console.log("correct3Answer= " + correctAnswer);

    var slotLayout = computeRowLayout(cLen, {
        baseSpacing: 134,
        baseScale: 1,
        minScale: 0.82,
        maxSpan: 720,
        tileSpan: 108,
        centerX: canvas && !isNaN(canvas.width) ? canvas.width / 2 : 640
    });

    for (i = 0; i < maxLetterCnt; i++) {
        if (!quesArr[i]) {
            continue;
        }
        if (i < cLen) {
            quesArr[i].x = slotLayout.positions[i];
            quesArr[i].y = CLUE_ROW_Y;
            quesArr[i].scaleX = quesArr[i].scaleY = slotLayout.scale;
            quesArr[i].__baseScale = slotLayout.scale;
            quesArr[i].visible = true;
            quesArr[i].alpha = 0;
            var isMissing = i === missingIndex;
            if (quesArr[i].bg) {
                drawClueSlotBackground(quesArr[i].bg, isMissing ? CLUE_SLOT_HIGHLIGHT_COLORS : CLUE_SLOT_BASE_COLORS);
            }
            if (quesArr[i].placeholder) {
                if (isMissing) {
                    quesArr[i].placeholder.visible = true;
                    quesArr[i].placeholder.alpha = 0.82;
                    startCluePlaceholderTwinkle(quesArr[i]);
                } else {
                    stopCluePlaceholderTwinkle(quesArr[i]);
                    quesArr[i].placeholder.visible = false;
                    quesArr[i].placeholder.alpha = 0;
                }
            }
            if (quesArr[i].label) {
                updateClueLetterDisplay(quesArr[i].label, isMissing ? "" : questionLetters[i]);
                quesArr[i].label.alpha = isMissing ? 0 : 1;
            }
        } else {
            stopCluePlaceholderTwinkle(quesArr[i]);
            quesArr[i].visible = false;
            if (quesArr[i].placeholder) {
                quesArr[i].placeholder.visible = false;
                quesArr[i].placeholder.alpha = 0;
            }
        }
    }

    if (cluePanelBg) {
        if (cLen > 0 && slotLayout.positions.length >= cLen) {
            var slotScale = slotLayout.scale;
            var slotWidth = 108 * slotScale;
            var slotLeft = slotLayout.positions[0] - slotWidth / 2;
            var slotRight = slotLayout.positions[cLen - 1] + slotWidth / 2;
            var slotCenter = (slotLeft + slotRight) / 2;
            var slotPanelWidth = (slotRight - slotLeft) + CLUE_PANEL_SIDE_PADDING * 2;
            updatePanelBackground(
                cluePanelBg,
                slotCenter,
                slotPanelWidth,
                CLUE_PANEL_HEIGHT,
                drawCluePanelBackground
            );
            cluePanelBg.y = CLUE_ROW_Y;
            cluePanelBg.visible = true;
            cluePanelBg.alpha = 0;
        } else {
            cluePanelBg.visible = false;
        }
    }

    var choiceLayout = computeRowLayout(3, {
        baseSpacing: 186,
        baseScale: 0.72,
        minScale: 0.68,
        maxSpan: 540,
        tileSpan: 148,
        centerX: canvas && !isNaN(canvas.width) ? canvas.width / 2 : 640
    });

    for (i = 0; i < 3; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        choiceArr[i].x = choiceLayout.positions[i];
        choiceArr[i].y = CHOICE_ROW_Y;
        choiceArr[i].scaleX = choiceArr[i].scaleY = choiceLayout.scale;
        choiceArr[i].__baseScale = choiceLayout.scale;
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        choiceArr[i].cursor = "default";
        choiceArr[i].rotation = 0;
        choiceArr[i].name = choiceLetters[i];
        updateChoiceTileBackground(choiceArr[i]);
        if (choiceArr[i].label) {
            updateChoiceLetterDisplay(choiceArr[i].label, choiceLetters[i]);
            choiceArr[i].label.alpha = 1;
        }
        setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }

    if (choicePanelBg) {
        var choiceScale = choiceLayout.scale;
        var choiceWidth = 148 * choiceScale;
        var choiceLeft = choiceLayout.positions[0] - choiceWidth / 2;
        var choiceRight = choiceLayout.positions[Math.max(0, choiceLetters.length - 1)] + choiceWidth / 2;
        var choiceCenter = (choiceLeft + choiceRight) / 2;
        var choicePanelWidth = (choiceRight - choiceLeft) + CHOICE_PANEL_SIDE_PADDING * 2;
        updatePanelBackground(
            choicePanelBg,
            choiceCenter,
            choicePanelWidth,
            CHOICE_PANEL_HEIGHT,
            drawChoicePanelBackground
        );
        choicePanelBg.y = CHOICE_ROW_Y;
        choicePanelBg.visible = true;
        choicePanelBg.alpha = 0;
    }
    createTween()
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
function createTween() {


    if (questionPanel) {
        questionPanel.visible = true;
        questionPanel.alpha = 0;
        var panelBase = QUESTION_PANEL_BASE_SCALE;
        questionPanel.scaleX = questionPanel.scaleY = panelBase * 0.86;
        createjs.Tween.get(questionPanel, { override: true })
            .wait(280)
            .to({ alpha: 1, scaleX: panelBase * 1.02, scaleY: panelBase * 1.02 }, 360, createjs.Ease.backOut)
            .to({ scaleX: panelBase, scaleY: panelBase }, 220, createjs.Ease.sineOut);
    }

    if (questionPanelHighlight) {
        questionPanelHighlight.alpha = 0.72;
        questionPanelHighlight.scaleX = questionPanelHighlight.scaleY = 1.1;
        createjs.Tween.get(questionPanelHighlight, { override: true })
            .wait(320)
            .to({ alpha: 0.95, scaleX: 1, scaleY: 1 }, 420, createjs.Ease.quadOut)
            .to({ alpha: 0.7 }, 320, createjs.Ease.quadInOut);
    }

    if (question) {
        question.visible = true;
        question.alpha = 0;
        question.scaleX = question.scaleY = 0.6;
        createjs.Tween.get(question, { override: true })
            .wait(360)
            .to({ alpha: 1, scaleX: 0.68, scaleY: 0.68 }, 320, createjs.Ease.quadOut)
            .to({ scaleX: 0.66, scaleY: 0.66 }, 220, createjs.Ease.quadOut);
    }

    if (cluePanelBg && cluePanelBg.visible) {
        cluePanelBg.alpha = 0;
        createjs.Tween.get(cluePanelBg, { override: true })
            .wait(460)
            .to({ alpha: 1 }, 320, createjs.Ease.quadOut);
    }

    var time = 720;
    for (i = 0; i < cLen; i++) {
        if (!quesArr[i]) {
            continue;
        }
        var baseScale = quesArr[i].__baseScale || 1;
        quesArr[i].visible = true;
        quesArr[i].alpha = 0;
        quesArr[i].scaleX = quesArr[i].scaleY = baseScale * 0.65;
        createjs.Tween.get(quesArr[i], { override: true })
            .wait(time + i * 110)
            .to({ alpha: 1, scaleX: baseScale, scaleY: baseScale }, 320, createjs.Ease.backOut);
        if (quesArr[i].label && i === missingIndex) {
            quesArr[i].label.alpha = 0;
        }
        if (quesArr[i].placeholder && i === missingIndex) {
            quesArr[i].placeholder.alpha = 0.82;
        }
    }

    if (choicePanelBg && choicePanelBg.visible) {
        choicePanelBg.alpha = 0;
        createjs.Tween.get(choicePanelBg, { override: true })
            .wait(1040)
            .to({ alpha: 1 }, 320, createjs.Ease.quadOut);
    }

    var val = 1120;
    var usedChoiceFx = false;
    if (typeof ChoiceFX_entrance === "function") {
        try {
            for (i = 0; i < 3; i++) {
                if (!choiceArr[i]) {
                    continue;
                }
                var fxBase = choiceArr[i].__baseScale || 0.72;
                choiceArr[i].visible = true;
                choiceArr[i].alpha = 0;
                choiceArr[i].scaleX = choiceArr[i].scaleY = fxBase;
                choiceArr[i].y = CHOICE_ROW_Y;
            }
            ChoiceFX_entrance(choiceArr, val);
            usedChoiceFx = true;
        } catch (_e) {
            usedChoiceFx = false;
        }
    }

    if (!usedChoiceFx) {
        for (i = 0; i < 3; i++) {
            if (!choiceArr[i]) {
                continue;
            }
            var base = choiceArr[i].__baseScale || 0.72;
            choiceArr[i].visible = true;
            choiceArr[i].alpha = 0;
            choiceArr[i].scaleX = choiceArr[i].scaleY = base * 0.62;
            choiceArr[i].y = CHOICE_ROW_Y;
            createjs.Tween.get(choiceArr[i], { override: true })
                .wait(val + i * 150)
                .to({ alpha: 1, scaleX: base * 1.06, scaleY: base * 1.06, rotation: i % 2 === 0 ? 12 : -12 }, 320, createjs.Ease.backOut)
                .to({ scaleX: base, scaleY: base, rotation: 0 }, 220, createjs.Ease.sineOut);
        }
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 2400)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)



    for (i = 0; i < 3; i++) {
        if (!choiceArr[i]) {
            continue;
        }
        choiceArr[i].visible = true;
        choiceArr[i].id = i;
        choiceArr[i].alpha = 1;
        choiceArr[i].mouseChildren = false;
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].addEventListener("click", answerSelected);
        setChoiceInteractiveState(i, true);
        if (typeof ChoiceFX_startIdleBob === "function") {
            try {
                ChoiceFX_startIdleBob(choiceArr[i]);
            } catch (_e) {}
        }
    }

    if (!isChoiceHoverBound) {
        try {
            ChoiceFX_bindHover(choiceArr);
            isChoiceHoverBound = true;
        } catch (_e) {}
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
        choiceArr[i].removeEventListener("click", answerSelected)
        setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
        choiceArr[i].visible = false;
    }
    for (i = 0; i < cLen; i++) {
        if (quesArr[i]) {
            stopCluePlaceholderTwinkle(quesArr[i]);
            if (quesArr[i].placeholder) {
                quesArr[i].placeholder.visible = false;
                quesArr[i].placeholder.alpha = 0;
            }
            quesArr[i].visible = false;
        }
    }
    if (questionPanel) {
        questionPanel.visible = false;
    }
    if (question) {
        question.visible = false;
    }
    if (cluePanelBg) {
        cluePanelBg.visible = false;
    }
    if (choicePanelBg) {
        choicePanelBg.visible = false;
    }
}

function answerSelected(e) {
    try { ChoiceFX_pressRipple(container, e.stageX, e.stageY); } catch (_e) {}
    e.preventDefault();
    lCnt++;
    uans = e.currentTarget.name;
    var tileIndex = typeof e.currentTarget.id === "number" ? e.currentTarget.id : choiceArr.indexOf(e.currentTarget);
    if (tileIndex < 0) {
        tileIndex = 0;
    }
    setChoiceInteractiveState(tileIndex, false, { immediate: true, suppressBadge: true, skipBackground: true });
    e.currentTarget.alpha = 0.5;
    e.currentTarget.cursor = "default";
    console.log(ans+"        "+uans)

    gameResponseTimerStop();

    if (ans == uans) {
        currentX = e.currentTarget.x - 30
        currentY = e.currentTarget.y - 20
        disableMouse()
      
        var revealSlot = missingIndex >= 0 ? quesArr[missingIndex] : null;
        if (revealSlot) {
            stopCluePlaceholderTwinkle(revealSlot);
            if (revealSlot.placeholder) {
                revealSlot.placeholder.visible = false;
                revealSlot.placeholder.alpha = 0;
            }
            if (revealSlot.label) {
                updateClueLetterDisplay(revealSlot.label, ans);
                revealSlot.label.alpha = 1;
            }
            if (revealSlot.bg) {
                drawClueSlotBackground(revealSlot.bg, CLUE_SLOT_SUCCESS_COLORS);
            }
            try { ChoiceFX_revealPop(revealSlot, "pop"); } catch (_e) {}
            if (typeof ChoiceFX_confettiBurst === "function") {
                try {
                    ChoiceFX_confettiBurst(container.parent || container, revealSlot.x, revealSlot.y);
                } catch (_e) {}
            }
        }
        for (i = 0; i < 3; i++) {
            if (choiceArr[i]) {
                choiceArr[i].removeEventListener("click", answerSelected)
            }
        }
        setTimeout(correct, 500)
    }
    else {
        if (typeof ChoiceFX_wrongShake === "function") {
            try { ChoiceFX_wrongShake(e.currentTarget); } catch (_e) {}
        }
        if (e.currentTarget.bg && typeof ChoiceFX_redFlash === "function") {
            try { ChoiceFX_redFlash(e.currentTarget.bg); } catch (_e) {}
        }
        var errorSlot = missingIndex >= 0 ? quesArr[missingIndex] : null;
        if (errorSlot && errorSlot.bg) {
            drawClueSlotBackground(errorSlot.bg, CLUE_SLOT_ERROR_COLORS_REF);
        }
        if (errorSlot && errorSlot.placeholder) {
            createjs.Tween.removeTweens(errorSlot.placeholder);
            errorSlot.placeholder.visible = true;
            errorSlot.placeholder.alpha = 1;
            errorSlot.placeholder.scaleX = errorSlot.placeholder.scaleY = 1;
            errorSlot.placeholder.rotation = 0;
            createjs.Tween.get(errorSlot.placeholder, { override: true })
                .to({ scaleX: 1.12, scaleY: 1.12, rotation: 8 }, 160, createjs.Ease.quadOut)
                .to({ scaleX: 1, scaleY: 1, rotation: 0 }, 260, createjs.Ease.quadOut);
        }
        getValidation("wrong");
        setTimeout(disablechoices, 320);
    }
}

function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < 3; i++) {
        setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true, skipBackground: true });
    }
}

function enableMouse() {

}


//===============================================================================================//



