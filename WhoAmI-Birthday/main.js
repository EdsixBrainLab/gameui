var messageField; // Message display field

var assets = [];
var choiceArr = [];
var choiceBgArr = [];
var choiceGlowArr = [];
var choiceDisabledOverlayArr = [];
var choiceReadyBadgeArr = [];
var choiceMcArr = [];
var clueBgArr = [];
var cluePlaceholderArr = [];
var clueArr = [];
var clueMcArr = [];
var clueRevealTweenArr = [];
var questionImageHolder = null;
var questionImageShadow = null;

var cnt = -1,
  ans,
  qscnt = -1,
  uans,
  interval,
  delayInterval,
  time = 180,
  totalQuestions = 10,
  answeredQuestions = 0,
  choiceCnt = 3,
  quesCnt = 0,
  resTimerOut = 0,
  rst = 0,
  responseTime = 0,
  correctAnswer = "",
  lCnt = -1,
  wrdCnt = -1;

var startBtn,
  introScrn,
  container,
  questionSprite,
  circleOutline,
  boardMc,
  helpMc,
  backGround1,
  kholderMc,
  ansPanelMc,
  clueMc,
  clueMc1,
  resultLoading,
  selectedAnswer = "",
  cLen = 0;

var parrotWowMc,
  parrotOopsMc,
  parrotGameOverMc,
  parrotTimeOverMc,
  btnImages,
  isCorrect = "";

var bgSnd,
  correctSnd,
  wrongSnd,
  gameOverSnd,
  timeOverSnd,
  tickSnd,
  currTime = 0;

var tqcnt = 0,
  aqcnt = 0,
  ccnt = 0,
  cqcnt = 0,
  gscore = 0,
  gscrper = 0,
  gtime = 0,
  rtime = 0,
  crtime = 0,
  wrtime = 0;

var isResp = true,
  respDim = "both",
  isScale = true,
  scaleType = 1;

var lastW,
  lastH,
  lastS = 1;

var alphabetArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

var words_arry = [
  "cake",
  "chocolate",
  "balloon",
  "gift",
  "cap",
  "candle",
  "icecream",
  "juice",
  "cupcake",
  "lollipop"
];

var questionOrder = [];
var choicePool = [];
var answerLetters = [];
var missingIndex = -1;
var questionLetters = [];

var CHOICE_LETTER_FONT = "800 66px 'Baloo 2'";
var CLUE_LETTER_FONT = "800 60px 'Baloo 2'";
var CLUE_LETTER_VERTICAL_OFFSET = 6;
var LETTER_FILL_COLOR = "#FFFFFF";

var CHOICE_ROW_Y = 620;
var CLUE_ROW_Y = 475;
var QUESTION_CARD_Y = 280;
var QUESTION_IMAGE_MAX_WIDTH = 240;
var QUESTION_IMAGE_MAX_HEIGHT = 240;

var globalHelperScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : this;

var letterHelpers =
  globalHelperScope &&
  typeof globalHelperScope.SAUI_createAnagramLetterHelpers === "function"
    ? globalHelperScope.SAUI_createAnagramLetterHelpers({
        choiceInteractive: true,
        choiceScale: 0.8,
        choiceFont: CHOICE_LETTER_FONT,
        choiceColor: LETTER_FILL_COLOR,
        choiceShadow: new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14),
        choiceHitRadius: 78,
        clueScale: 1,
        clueFont: CLUE_LETTER_FONT,
        clueColor: LETTER_FILL_COLOR,
        clueShadow: new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14)
      })
    : null;

var buildChoiceLetterDisplay =
  letterHelpers && typeof letterHelpers.buildChoice === "function"
    ? letterHelpers.buildChoice
    : function () {
        var label = new createjs.Text("", CHOICE_LETTER_FONT, LETTER_FILL_COLOR);
        label.textAlign = "center";
        label.textBaseline = "middle";
        label.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
        label.mouseEnabled = true;
        label.mouseChildren = false;
        label.__baseScale = 0.8;
        var hitArea = new createjs.Shape();
        hitArea.graphics
          .beginFill("#000")
          .drawRoundRect(-78, -78, 156, 156, 52);
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
        label.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
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

var computeRowLayout =
  globalHelperScope && typeof globalHelperScope.SAUI_computeRowLayout === "function"
    ? globalHelperScope.SAUI_computeRowLayout
    : function (count, options) {
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

var choiceInteractiveHelper =
  globalHelperScope && typeof globalHelperScope.SA_setChoiceInteractiveState === "function"
    ? globalHelperScope.SA_setChoiceInteractiveState
    : null;

var highlightChoiceHelper =
  globalHelperScope && typeof globalHelperScope.SAUI_highlightChoiceTile === "function"
    ? globalHelperScope.SAUI_highlightChoiceTile
    : null;

var markChoiceUsedHelper =
  globalHelperScope && typeof globalHelperScope.SAUI_markChoiceTileUsed === "function"
    ? globalHelperScope.SAUI_markChoiceTileUsed
    : null;

var styleClueSlotHelper =
  globalHelperScope && typeof globalHelperScope.SAUI_styleClueSlot === "function"
    ? globalHelperScope.SAUI_styleClueSlot
    : null;

var highlightClueSlotHelper =
  globalHelperScope && typeof globalHelperScope.SAUI_highlightClueSlot === "function"
    ? globalHelperScope.SAUI_highlightClueSlot
    : null;

var startChoiceIdleAnimation =
  globalHelperScope && typeof globalHelperScope.SA_startChoiceIdleAnimation === "function"
    ? globalHelperScope.SA_startChoiceIdleAnimation
    : function () {};

var stopChoiceIdleAnimation =
  globalHelperScope && typeof globalHelperScope.SA_stopChoiceIdleAnimation === "function"
    ? globalHelperScope.SA_stopChoiceIdleAnimation
    : function () {};

var startChoiceHoverAnimation =
  globalHelperScope && typeof globalHelperScope.SA_startChoiceHoverAnimation === "function"
    ? globalHelperScope.SA_startChoiceHoverAnimation
    : function () {};

var stopChoiceHoverAnimation =
  globalHelperScope && typeof globalHelperScope.SA_stopChoiceHoverAnimation === "function"
    ? globalHelperScope.SA_stopChoiceHoverAnimation
    : function () {};

var startCluePlaceholderTwinkle =
  globalHelperScope && typeof globalHelperScope.SA_startCluePlaceholderTwinkle === "function"
    ? globalHelperScope.SA_startCluePlaceholderTwinkle
    : function (slot) {
        if (!slot || !slot.placeholder) {
          return;
        }
        createjs.Tween.get(slot.placeholder, { loop: true, override: true })
          .to({ alpha: 0.35 }, 600, createjs.Ease.sineInOut)
          .to({ alpha: 0.85 }, 600, createjs.Ease.sineInOut);
      };

var stopCluePlaceholderTwinkle =
  globalHelperScope && typeof globalHelperScope.SA_stopCluePlaceholderTwinkle === "function"
    ? globalHelperScope.SA_stopCluePlaceholderTwinkle
    : function (slot) {
        if (!slot || !slot.placeholder) {
          return;
        }
        createjs.Tween.removeTweens(slot.placeholder);
        slot.placeholder.alpha = 0;
      };

var placeholderShapePool = [];

function buildPlaceholderShape() {
  var shape = placeholderShapePool.pop();
  if (!shape) {
    shape = new createjs.Shape();
  }
  var g = shape.graphics;
  g.clear();
  g.beginRadialGradientFill(
    ["rgba(255,255,255,0.45)", "rgba(120,92,248,0.15)", "rgba(120,92,248,0)"],
    [0, 0.6, 1],
    0,
    0,
    0,
    0,
    0,
    42
  );
  g.drawCircle(0, 0, 42);
  g.beginFill("rgba(255,255,255,0.85)");
  g.drawPolyStar(0, 0, 14, 5, 0.5, -90);
  shape.alpha = 0;
  shape.mouseEnabled = false;
  shape.mouseChildren = false;
  return shape;
}

function releasePlaceholderShape(shape) {
  if (!shape) {
    return;
  }
  createjs.Tween.removeTweens(shape);
  shape.alpha = 0;
  shape.visible = false;
  placeholderShapePool.push(shape);
}

window.onload = function () {
  checkBrowserSupport();
};

function init() {
  canvas = document.getElementById("gameCanvas");
  stage = new createjs.Stage(canvas);
  container = new createjs.Container();
  stage.addChild(container);
  call_UI_ambientOverlay(container);
  createjs.Ticker.addEventListener("tick", stage);

  loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
  loaderBar = new createjs.Container();
  var txt = new createjs.Container();
  bar = new createjs.Shape();
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, 20).endFill();
  loaderWidth = 300;

  createLoader();
  createCanvasResize();

  stage.update();
  stage.enableMouseOver(40);

  assetsPath = "assets/";
  gameAssetsPath = "WhoAmI-Birthday/";
  soundpath = "FA/";

  var success = createManifest();
  if (success == 1) {
    manifest.push({ id: "question", src: gameAssetsPath + "question.png" });
    preloadAllAssets();
    stage.update();
  }
}

function doneLoading1() {
  var event = assets[i];
  var id = event.item.id;

  loaderBar.visible = false;
  stage.update();

  call_UI_gameQuestion(
    container,
    "Click on the correct letter to complete the name of the items in a birthday party"
  );

  if (id == "question") {
    var questionSpriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [preload.getResult("question")],
      frames: { regX: 50, height: 348, count: 64, regY: 50, width: 348 }
    });
    questionSprite = new createjs.Sprite(questionSpriteSheet);
    questionSprite.visible = false;
    questionSprite.regX = 174;
    questionSprite.regY = 174;
  }
}

function tick() {
  stage.update();
}

function handleClick() {
  questionOrder = between(0, words_arry.length - 1);
  CreateGameStart();
  if (gameType == 0) {
    CreateGameElements();
    getStartQuestion();
  } else {
    getdomainpath();
  }
}

function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  ensureQuestionCard();
  ensureQuestionImageHolder();

  for (var i = 0; i < words_arry.length; i++) {
    if (!clueBgArr[i]) {
      clueBgArr[i] = new createjs.Shape();
      clueBgArr[i].shadow = new createjs.Shadow("rgba(6,14,30,0.45)", 0, 12, 28);
      clueBgArr[i].__baseScale = 1;
      clueBgArr[i].visible = false;
      clueBgArr[i].alpha = 0;
      clueBgArr[i].mouseEnabled = false;
      clueBgArr[i].mouseChildren = false;
      container.parent.addChild(clueBgArr[i]);
    }
    if (!clueMcArr[i]) {
      clueMcArr[i] = new createjs.Container();
      clueMcArr[i].visible = false;
      clueMcArr[i].alpha = 0;
      clueMcArr[i].mouseEnabled = false;
      clueMcArr[i].mouseChildren = false;
      container.parent.addChild(clueMcArr[i]);
    }
    if (!clueArr[i]) {
      clueArr[i] = buildClueLetterDisplay();
      clueMcArr[i].addChild(clueArr[i]);
    }
    if (!cluePlaceholderArr[i]) {
      cluePlaceholderArr[i] = buildPlaceholderShape();
      cluePlaceholderArr[i].visible = false;
      cluePlaceholderArr[i].alpha = 0;
      cluePlaceholderArr[i].x = 0;
      cluePlaceholderArr[i].y = CLUE_LETTER_VERTICAL_OFFSET;
      clueMcArr[i].addChild(cluePlaceholderArr[i]);
    }
    clueArr[i].x = 0;
    clueArr[i].y = CLUE_LETTER_VERTICAL_OFFSET;
    updateClueLetterDisplay(clueArr[i], "");
  }

  for (var j = 0; j < choiceCnt; j++) {
    if (!choiceMcArr[j]) {
      choiceMcArr[j] = new createjs.Container();
      choiceMcArr[j].visible = false;
      choiceMcArr[j].alpha = 0;
      choiceMcArr[j].mouseChildren = false;
      choiceMcArr[j].mouseEnabled = false;
      choiceMcArr[j].id = j;
      container.parent.addChild(choiceMcArr[j]);
    }
    if (!choiceGlowArr[j]) {
      choiceGlowArr[j] = new createjs.Shape();
      choiceGlowArr[j].graphics
        .beginRadialGradientFill([
          "rgba(209,178,255,0.6)",
          "rgba(209,178,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 120)
        .drawCircle(0, 0, 120);
      choiceGlowArr[j].alpha = 0;
      choiceGlowArr[j].visible = false;
      choiceGlowArr[j].mouseEnabled = false;
      choiceGlowArr[j].mouseChildren = false;
      choiceMcArr[j].addChild(choiceGlowArr[j]);
    }
    if (!choiceBgArr[j]) {
      choiceBgArr[j] = new createjs.Shape();
      choiceBgArr[j].shadow = new createjs.Shadow("rgba(9,18,36,0.4)", 0, 18, 36);
      choiceBgArr[j].mouseEnabled = false;
      choiceBgArr[j].mouseChildren = false;
      choiceMcArr[j].addChild(choiceBgArr[j]);
    }
    if (!choiceDisabledOverlayArr[j]) {
      choiceDisabledOverlayArr[j] = new createjs.Shape();
      choiceDisabledOverlayArr[j].alpha = 0;
      choiceDisabledOverlayArr[j].visible = false;
      choiceDisabledOverlayArr[j].mouseEnabled = false;
      choiceDisabledOverlayArr[j].mouseChildren = false;
      choiceMcArr[j].addChild(choiceDisabledOverlayArr[j]);
    }
    if (!choiceArr[j]) {
      choiceArr[j] = buildChoiceLetterDisplay();
      choiceArr[j].mouseEnabled = false;
      choiceArr[j].mouseChildren = false;
      choiceMcArr[j].addChild(choiceArr[j]);
    }
    if (!choiceReadyBadgeArr[j] && typeof SA_buildChoiceReadyBadge === "function") {
      choiceReadyBadgeArr[j] = SA_buildChoiceReadyBadge();
      choiceReadyBadgeArr[j].visible = false;
      choiceReadyBadgeArr[j].alpha = 0;
      choiceMcArr[j].addChild(choiceReadyBadgeArr[j]);
    }
  }

  stage.update();
}

function ensureQuestionImageHolder() {
  if (!questionCardContainer) {
    return;
  }
  if (!questionImageHolder) {
    questionImageHolder = new createjs.Container();
    questionImageHolder.mouseEnabled = false;
    questionImageHolder.mouseChildren = false;
    questionImageHolder.x = 0;
    questionImageHolder.y = 0;
    questionImageHolder.alpha = 0;
    questionCardContainer.addChild(questionImageHolder);
  }
  if (!questionImageShadow) {
    questionImageShadow = new createjs.Shape();
    questionImageShadow.graphics
      .beginRadialGradientFill([
        "rgba(6,12,34,0.32)",
        "rgba(6,12,34,0)"
      ], [0, 1], 0, 0, 0, 0, 0, 140)
      .drawCircle(0, 0, 140);
    questionImageShadow.y = 108;
    questionImageShadow.alpha = 0.45;
    questionImageHolder.addChild(questionImageShadow);
  }
}

function helpDisable() {
  for (var i = 0; i < choiceCnt; i++) {
    if (choiceMcArr[i]) {
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].cursor = "default";
    }
    stopChoiceIdleAnimation(i);
    stopChoiceHoverAnimation(i);
    if (choiceInteractiveHelper) {
      choiceInteractiveHelper(i, false, { immediate: true, suppressBadge: true });
    }
  }
}

function helpEnable() {
  for (var i = 0; i < choiceCnt; i++) {
    if (choiceMcArr[i]) {
      choiceMcArr[i].mouseEnabled = true;
      choiceMcArr[i].cursor = "pointer";
    }
    if (choiceInteractiveHelper) {
      choiceInteractiveHelper(i, true);
    }
    startChoiceIdleAnimation(i, true);
  }
}

function pickques() {
  pauseTimer();

  tx = 0;
  qscnt++;
  cnt++;
  quesCnt++;
  if (typeof refreshHudValues === "function") {
    refreshHudValues();
  } else if (typeof gameQCntTxt !== "undefined" && gameQCntTxt) {
    gameQCntTxt.text = quesCnt + "/" + String(totalQuestions);
  }

  panelVisibleFn();

  if (cnt >= questionOrder.length) {
    questionOrder = between(0, words_arry.length - 1);
    cnt = 0;
  }

  var questionIndex = questionOrder[cnt];
  correctAnswer = words_arry[questionIndex];
  ans = correctAnswer.toUpperCase();

  setupQuestionCard(questionIndex);
  setupClueSlots(ans);
  setupChoiceTiles(ans);

  createjs.Ticker.addEventListener("tick", tick);
  stage.update();
}

function setupQuestionCard(questionIndex) {
  if (!questionCardContainer) {
    return;
  }

  questionCardContainer.visible = true;
  questionCardContainer.alpha = 0;
  questionCardContainer.scaleX = questionCardContainer.scaleY = 0.78;

  if (typeof question !== "undefined" && question) {
    question.text = "";
    question.visible = false;
  }
  if (typeof questionSubtitle !== "undefined" && questionSubtitle) {
    questionSubtitle.text = "";
    questionSubtitle.visible = false;
  }

  if (questionImageHolder) {
    questionImageHolder.removeAllChildren();
    if (questionImageShadow) {
      questionImageHolder.addChild(questionImageShadow);
    }
    if (questionSprite) {
      questionSprite.gotoAndStop(questionIndex);
      var imageClone = questionSprite.clone();
      imageClone.visible = true;
      imageClone.scaleX = imageClone.scaleY = 0.68;
      imageClone.x = 0;
      imageClone.y = 0;
      questionImageHolder.addChild(imageClone);
    }
    questionImageHolder.x = 0;
    questionImageHolder.y = -40;
    questionImageHolder.alpha = 0;
  }
}

function setupClueSlots(answerWord) {
  var letters = answerWord.split("");
  cLen = letters.length;
  missingIndex = between(0, cLen - 1)[0];
  questionLetters = [];
  answerLetters = letters.slice();

  var layout = computeRowLayout(cLen, {
    baseSpacing: 140,
    baseScale: 1,
    minScale: 0.8,
    maxSpan: 720,
    tileSpan: 108,
    centerX: typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640
  });

  for (var i = 0; i < clueBgArr.length; i++) {
    if (clueBgArr[i]) {
      clueBgArr[i].visible = false;
      clueBgArr[i].alpha = 0;
    }
    if (clueMcArr[i]) {
      clueMcArr[i].visible = false;
      clueMcArr[i].alpha = 0;
    }
    if (cluePlaceholderArr[i]) {
      stopCluePlaceholderTwinkle({ placeholder: cluePlaceholderArr[i] });
      cluePlaceholderArr[i].visible = false;
      cluePlaceholderArr[i].alpha = 0;
    }
    if (clueArr[i]) {
      updateClueLetterDisplay(clueArr[i], "");
      clueArr[i].visible = false;
    }
  }

  for (var j = 0; j < cLen; j++) {
    var slotX = layout.positions[j] || 0;
    var slotScale = layout.scale;
    var clueContainer = clueMcArr[j];
    var clueBg = clueBgArr[j];
    var clueLabel = clueArr[j];
    var cluePlaceholder = cluePlaceholderArr[j];

    if (clueContainer) {
      clueContainer.visible = true;
      clueContainer.alpha = 0;
      clueContainer.x = slotX;
      clueContainer.y = CLUE_ROW_Y;
      clueContainer.scaleX = clueContainer.scaleY = slotScale;
    }

    if (clueBg) {
      drawClueSlotBackground(clueBg, CLUE_SLOT_BASE_COLORS);
      clueBg.x = slotX;
      clueBg.y = CLUE_ROW_Y;
      clueBg.scaleX = clueBg.scaleY = slotScale;
      clueBg.alpha = 0;
      clueBg.visible = true;
    }

    if (clueLabel) {
      updateClueLetterDisplay(clueLabel, j === missingIndex ? "" : letters[j]);
      clueLabel.visible = true;
      clueLabel.alpha = 0;
    }

    if (cluePlaceholder) {
      cluePlaceholder.visible = j === missingIndex;
      cluePlaceholder.alpha = j === missingIndex ? 0.85 : 0;
      if (j === missingIndex) {
        startCluePlaceholderTwinkle({ placeholder: cluePlaceholder });
      } else {
        stopCluePlaceholderTwinkle({ placeholder: cluePlaceholder });
      }
    }

    questionLetters[j] = letters[j];
  }
}

function setupChoiceTiles(answerWord) {
  choicePool = alphabetArr.slice();
  var answerLetter = answerWord.charAt(missingIndex).toUpperCase();
  choicePool = choicePool.filter(function (letter) {
    return letter !== answerLetter;
  });

  var distractors = between(0, choicePool.length - 1);
  var choices = [answerLetter];
  for (var i = 0; i < choiceCnt - 1; i++) {
    choices.push(choicePool[distractors[i]]);
  }
  choices.sort(function () {
    return Math.random() - 0.5;
  });

  var layout = computeRowLayout(choiceCnt, {
    baseSpacing: 200,
    baseScale: 0.82,
    minScale: 0.68,
    maxSpan: 640,
    tileSpan: 160,
    centerX: typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640
  });

  for (var j = 0; j < choiceCnt; j++) {
    var tileContainer = choiceMcArr[j];
    var tileLabel = choiceArr[j];
    var tileBg = choiceBgArr[j];
    var tileGlow = choiceGlowArr[j];
    var disabledOverlay = choiceDisabledOverlayArr[j];
    var badge = choiceReadyBadgeArr[j];
    var tileScale = layout.scale;
    var tileX = layout.positions[j] || 0;

    if (tileContainer) {
      tileContainer.visible = true;
      tileContainer.alpha = 0;
      tileContainer.x = tileX;
      tileContainer.y = CHOICE_ROW_Y;
      tileContainer.__targetY = CHOICE_ROW_Y;
      tileContainer.scaleX = tileContainer.scaleY = tileScale;
      tileContainer.name = choices[j];
      tileContainer.cursor = "default";
      tileContainer.mouseEnabled = false;
      if (!tileContainer.__hitArea) {
        tileContainer.__hitArea = new createjs.Shape();
        tileContainer.hitArea = tileContainer.__hitArea;
      }
      var hitSize = 172 * tileScale;
      tileContainer.__hitArea.graphics
        .clear()
        .beginFill("#000")
        .drawRoundRect(-hitSize / 2, -hitSize / 2, hitSize, hitSize, 52 * tileScale);
    }

    if (tileBg) {
      drawChoiceTileBackground(tileBg, CHOICE_TILE_BASE_COLORS);
      tileBg.visible = true;
      tileBg.alpha = 0;
      tileBg.scaleX = tileBg.scaleY = tileScale * 1.08;
    }

    if (tileGlow) {
      tileGlow.visible = true;
      tileGlow.alpha = 0;
      tileGlow.scaleX = tileGlow.scaleY = tileScale * 1.28;
    }

    if (disabledOverlay) {
      drawChoiceDisabledOverlay(disabledOverlay);
      disabledOverlay.visible = false;
      disabledOverlay.alpha = 0;
      disabledOverlay.scaleX = disabledOverlay.scaleY = tileScale * 1.08;
    }

    if (tileLabel) {
      updateChoiceLetterDisplay(tileLabel, choices[j]);
      tileLabel.alpha = 0;
      tileLabel.visible = true;
      tileLabel.scaleX = tileLabel.scaleY = tileScale;
      tileLabel.__baseScale = tileScale;
    }

    if (badge) {
      badge.x = 0;
      badge.y = -((148 * tileScale) / 2 + 30);
      badge.scaleX = badge.scaleY = tileScale * (badge.__designScale || 1);
      badge.alpha = 0;
      badge.visible = false;
      if (typeof SA_stopChoiceReadyBadgeAnimation === "function") {
        SA_stopChoiceReadyBadgeAnimation(badge);
      }
    }

    stopChoiceIdleAnimation(j);
    stopChoiceHoverAnimation(j);

    if (choiceInteractiveHelper) {
      choiceInteractiveHelper(j, false, { immediate: true, suppressBadge: true });
    }
  }

  revealRoundElements();
}

function revealRoundElements() {
  var revealDelay = 0;

  if (questionCardContainer) {
    createjs.Tween.get(questionCardContainer, { override: true })
      .wait(revealDelay)
      .to({ alpha: 1, scaleX: 0.84, scaleY: 0.84 }, 380, createjs.Ease.quadOut)
      .call(function () {
        createjs.Tween.get(questionCardContainer)
          .to({ scaleX: 0.8, scaleY: 0.8 }, 220, createjs.Ease.quadOut);
      });
  }

  if (questionImageHolder) {
    createjs.Tween.get(questionImageHolder, { override: true })
      .wait(revealDelay + 120)
      .to({ alpha: 1, y: -20 }, 320, createjs.Ease.sineOut);
  }

  for (var i = 0; i < cLen; i++) {
    if (clueBgArr[i]) {
      createjs.Tween.get(clueBgArr[i], { override: true })
        .wait(revealDelay + 180 + i * 40)
        .to({ alpha: 1 }, 260, createjs.Ease.sineOut);
    }
    if (clueArr[i]) {
      createjs.Tween.get(clueArr[i], { override: true })
        .wait(revealDelay + 220 + i * 40)
        .to({ alpha: 1 }, 200, createjs.Ease.sineOut);
    }
    if (cluePlaceholderArr[i] && i === missingIndex) {
      createjs.Tween.get(cluePlaceholderArr[i], { override: true })
        .wait(revealDelay + 220 + i * 40)
        .to({ alpha: 0.85 }, 200, createjs.Ease.sineOut);
    }
  }

  for (var j = 0; j < choiceCnt; j++) {
    if (choiceMcArr[j]) {
      createjs.Tween.get(choiceMcArr[j], { override: true })
        .wait(revealDelay + 320 + j * 120)
        .to({ alpha: 1 }, 260, createjs.Ease.sineOut)
        .call(
          (function (index) {
            return function () {
              if (choiceInteractiveHelper) {
                choiceInteractiveHelper(index, true);
              }
              choiceMcArr[index].cursor = "pointer";
              choiceMcArr[index].mouseEnabled = true;
              choiceMcArr[index].removeAllEventListeners("click");
              choiceMcArr[index].addEventListener("click", answerSelected);
              startChoiceIdleAnimation(index, true);
            };
          })(j)
        );
    }
    if (choiceBgArr[j]) {
      createjs.Tween.get(choiceBgArr[j], { override: true })
        .wait(revealDelay + 320 + j * 120)
        .to({ alpha: 1 }, 260, createjs.Ease.sineOut);
    }
    if (choiceArr[j]) {
      createjs.Tween.get(choiceArr[j], { override: true })
        .wait(revealDelay + 360 + j * 120)
        .to({ alpha: 1 }, 220, createjs.Ease.sineOut);
    }
    if (choiceGlowArr[j]) {
      createjs.Tween.get(choiceGlowArr[j], { override: true })
        .wait(revealDelay + 360 + j * 120)
        .to({ alpha: 0.45 }, 320, createjs.Ease.quadOut)
        .to({ alpha: 0.12 }, 420, createjs.Ease.quadOut);
    }
  }

  rst = 0;
  gameResponseTimerStart();
  restartTimer();
}

function answerSelected(e) {
  e.preventDefault();
  var target = e.currentTarget;
  if (!target) {
    return;
  }
  var index = typeof target.id === "number" ? target.id : choiceMcArr.indexOf(target);
  if (index < 0) {
    return;
  }

  gameResponseTimerStop();
  helpDisable();

  var selectedLetter = target.name || "";
  var isCorrectChoice = selectedLetter === answerLetters[missingIndex].toUpperCase();

  markChoiceResult(index, isCorrectChoice);

  if (isCorrectChoice) {
    revealMissingLetter();
    setTimeout(function () {
      getValidation("correct");
    }, 350);
  } else {
    highlightClueError();
    setTimeout(function () {
      getValidation("wrong");
    }, 350);
  }
}

function markChoiceResult(index, isCorrect) {
  if (markChoiceUsedHelper) {
    markChoiceUsedHelper({
      index: index,
      tile: choiceArr[index],
      background: choiceBgArr[index],
      glow: choiceGlowArr[index],
      correct: isCorrect
    });
    return;
  }

  var bg = choiceBgArr[index];
  var glow = choiceGlowArr[index];
  var tile = choiceArr[index];

  if (bg) {
    drawChoiceTileBackground(bg, isCorrect ? CHOICE_TILE_CORRECT_COLORS : CHOICE_TILE_WRONG_COLORS);
    createjs.Tween.get(bg, { override: true })
      .to({ scaleX: bg.scaleX * (isCorrect ? 1.06 : 0.94), scaleY: bg.scaleY * (isCorrect ? 1.06 : 0.94) }, 180, createjs.Ease.quadOut)
      .to({ scaleX: bg.scaleX, scaleY: bg.scaleY }, 160, createjs.Ease.quadOut);
  }

  if (glow) {
    createjs.Tween.get(glow, { override: true })
      .to({ alpha: isCorrect ? 0.8 : 0.4, scaleX: glow.scaleX * 1.05, scaleY: glow.scaleY * 1.05 }, 200, createjs.Ease.quadOut)
      .to({ alpha: 0.12, scaleX: glow.scaleX, scaleY: glow.scaleY }, 280, createjs.Ease.quadOut);
  }

  if (tile) {
    createjs.Tween.get(tile, { override: true })
      .to({ scaleX: tile.scaleX * (isCorrect ? 1.12 : 0.9), scaleY: tile.scaleY * (isCorrect ? 1.12 : 0.9) }, 180, createjs.Ease.quadOut)
      .to({ scaleX: tile.__baseScale, scaleY: tile.__baseScale }, 200, createjs.Ease.quadOut);
  }
}

function revealMissingLetter() {
  if (missingIndex < 0 || !clueArr[missingIndex]) {
    return;
  }

  updateClueLetterDisplay(clueArr[missingIndex], answerLetters[missingIndex]);
  clueArr[missingIndex].alpha = 1;

  if (cluePlaceholderArr[missingIndex]) {
    stopCluePlaceholderTwinkle({ placeholder: cluePlaceholderArr[missingIndex] });
    createjs.Tween.get(cluePlaceholderArr[missingIndex], { override: true })
      .to({ alpha: 0 }, 200, createjs.Ease.quadOut)
      .call(function () {
        releasePlaceholderShape(cluePlaceholderArr[missingIndex]);
        cluePlaceholderArr[missingIndex] = buildPlaceholderShape();
        cluePlaceholderArr[missingIndex].visible = false;
        cluePlaceholderArr[missingIndex].alpha = 0;
        cluePlaceholderArr[missingIndex].x = 0;
        cluePlaceholderArr[missingIndex].y = CLUE_LETTER_VERTICAL_OFFSET;
        clueMcArr[missingIndex].addChild(cluePlaceholderArr[missingIndex]);
      });
  }

  if (styleClueSlotHelper) {
    styleClueSlotHelper({
      index: missingIndex,
      background: clueBgArr[missingIndex],
      filled: true,
      highlight: true
    });
  } else if (clueBgArr[missingIndex]) {
    drawClueSlotBackground(clueBgArr[missingIndex], CLUE_SLOT_SUCCESS_COLORS);
  }
}

function highlightClueError() {
  if (missingIndex < 0) {
    return;
  }
  if (highlightClueSlotHelper) {
    highlightClueSlotHelper({ background: clueBgArr[missingIndex] });
  } else if (clueBgArr[missingIndex]) {
    drawClueSlotBackground(clueBgArr[missingIndex], CLUE_SLOT_ERROR_COLORS);
    createjs.Tween.get(clueBgArr[missingIndex], { override: true })
      .to({ scaleX: clueBgArr[missingIndex].scaleX * 1.04, scaleY: clueBgArr[missingIndex].scaleY * 1.04 }, 200, createjs.Ease.quadOut)
      .to({ scaleX: clueBgArr[missingIndex].scaleX, scaleY: clueBgArr[missingIndex].scaleY }, 200, createjs.Ease.quadOut)
      .call(function () {
        drawClueSlotBackground(clueBgArr[missingIndex], CLUE_SLOT_BASE_COLORS);
      });
  }
}

function disablechoices() {
  helpDisable();
  for (var i = 0; i < choiceCnt; i++) {
    if (choiceMcArr[i]) {
      choiceMcArr[i].removeAllEventListeners("click");
    }
  }
}

function correct() {
  getValidation("correct");
  disablechoices();
}
