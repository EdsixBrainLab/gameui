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
var questionImageBackdrop = null;
var questionImageFrame = null;
var questionImageContent = null;

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
var qno = [];
var choicePool = [];
var answerLetters = [];
var missingIndex = -1;
var questionLetters = [];

var BIRTHDAY_CHOICE_BASE_COLORS = [
  "rgba(255,196,223,0.98)",
  "rgba(255,132,188,0.98)"
];
var BIRTHDAY_CHOICE_HOVER_COLORS = [
  "rgba(255,218,236,0.98)",
  "rgba(255,164,210,0.98)"
];
var BIRTHDAY_CHOICE_CORRECT_COLORS = [
  "rgba(168,236,208,0.98)",
  "rgba(88,196,168,0.98)"
];
var BIRTHDAY_CHOICE_WRONG_COLORS = [
  "rgba(255,182,194,0.98)",
  "rgba(220,94,128,0.98)"
];
var BIRTHDAY_CHOICE_DISABLED_COLORS = [
  "rgba(255,194,224,0.72)",
  "rgba(228,132,190,0.72)"
];

var BIRTHDAY_CLUE_BASE_COLORS = [
  "rgba(255,214,164,0.96)",
  "rgba(255,166,122,0.96)"
];
var BIRTHDAY_CLUE_HIGHLIGHT_COLORS = [
  "rgba(255,236,204,0.96)",
  "rgba(255,190,150,0.96)"
];
var BIRTHDAY_CLUE_SUCCESS_COLORS = [
  "rgba(172,236,210,0.96)",
  "rgba(104,196,168,0.96)"
];
var BIRTHDAY_CLUE_ERROR_COLORS = [
  "rgba(255,182,182,0.96)",
  "rgba(220,104,134,0.96)"
];

var birthdayThemeApplied = false;
var birthdayOriginalPalette = null;
var birthdayOriginalFunctions = {};
var birthdayCardDecor = null;
var birthdayCardGlow = null;
var birthdayCardStreamers = [];

var progressBadgeContainer = null;
var progressBadgeBackground = null;
var progressBadgeIcon = null;
var progressBadgeLabel = null;

var confettiContainer = null;
var confettiPool = [];

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

function applyBirthdayTheme() {
  if (birthdayThemeApplied) {
    drawBirthdayQuestionCardBackground();
    ensureBirthdayCardDecor();
    ensureProgressBadge();
    drawQuestionImageBackdrop();
    drawQuestionImageFrame();
    ensureConfettiContainer();
    return;
  }

  birthdayThemeApplied = true;

  if (!birthdayOriginalPalette) {
    birthdayOriginalPalette = {
      choiceBase: typeof CHOICE_TILE_BASE_COLORS !== "undefined" ? CHOICE_TILE_BASE_COLORS.slice() : null,
      choiceHover: typeof CHOICE_TILE_HOVER_COLORS !== "undefined" ? CHOICE_TILE_HOVER_COLORS.slice() : null,
      choiceCorrect:
        typeof CHOICE_TILE_CORRECT_COLORS !== "undefined" ? CHOICE_TILE_CORRECT_COLORS.slice() : null,
      choiceWrong: typeof CHOICE_TILE_WRONG_COLORS !== "undefined" ? CHOICE_TILE_WRONG_COLORS.slice() : null,
      choiceDisabled:
        typeof CHOICE_TILE_DISABLED_COLORS !== "undefined" ? CHOICE_TILE_DISABLED_COLORS.slice() : null,
      clueBase: typeof CLUE_SLOT_BASE_COLORS !== "undefined" ? CLUE_SLOT_BASE_COLORS.slice() : null,
      clueHighlight:
        typeof CLUE_SLOT_HIGHLIGHT_COLORS !== "undefined" ? CLUE_SLOT_HIGHLIGHT_COLORS.slice() : null,
      clueSuccess:
        typeof CLUE_SLOT_SUCCESS_COLORS !== "undefined" ? CLUE_SLOT_SUCCESS_COLORS.slice() : null,
      clueError: typeof CLUE_SLOT_ERROR_COLORS !== "undefined" ? CLUE_SLOT_ERROR_COLORS.slice() : null
    };
  }

  CHOICE_TILE_BASE_COLORS = BIRTHDAY_CHOICE_BASE_COLORS.slice();
  CHOICE_TILE_HOVER_COLORS = BIRTHDAY_CHOICE_HOVER_COLORS.slice();
  CHOICE_TILE_CORRECT_COLORS = BIRTHDAY_CHOICE_CORRECT_COLORS.slice();
  CHOICE_TILE_WRONG_COLORS = BIRTHDAY_CHOICE_WRONG_COLORS.slice();
  CHOICE_TILE_DISABLED_COLORS = BIRTHDAY_CHOICE_DISABLED_COLORS.slice();
  CLUE_SLOT_BASE_COLORS = BIRTHDAY_CLUE_BASE_COLORS.slice();
  CLUE_SLOT_HIGHLIGHT_COLORS = BIRTHDAY_CLUE_HIGHLIGHT_COLORS.slice();
  CLUE_SLOT_SUCCESS_COLORS = BIRTHDAY_CLUE_SUCCESS_COLORS.slice();
  CLUE_SLOT_ERROR_COLORS = BIRTHDAY_CLUE_ERROR_COLORS.slice();

  if (typeof drawChoiceDisabledOverlay === "function") {
    birthdayOriginalFunctions.drawChoiceDisabledOverlay = drawChoiceDisabledOverlay;
  }
  drawChoiceDisabledOverlay = drawBirthdayChoiceDisabledOverlay;
  if (typeof window !== "undefined") {
    window.SA_drawChoiceDisabledOverlay = drawBirthdayChoiceDisabledOverlay;
  }

  drawBirthdayQuestionCardBackground();
  ensureBirthdayCardDecor();
  ensureProgressBadge();
  drawQuestionImageBackdrop();
  drawQuestionImageFrame();
  ensureConfettiContainer();
}

function drawBirthdayQuestionCardBackground() {
  if (!questionCardBackground) {
    return;
  }

  var halfWidth = QUESTION_CARD_WIDTH / 2;
  var halfHeight = QUESTION_CARD_HEIGHT / 2;

  questionCardBackground.graphics
    .clear()
    .setStrokeStyle(6, "round", "round")
    .beginLinearGradientStroke(
      ["rgba(255,234,250,0.92)", "rgba(204,168,255,0.72)"],
      [0, 1],
      -halfWidth,
      -halfHeight,
      halfWidth,
      halfHeight
    )
    .beginLinearGradientFill(
      ["rgba(255,200,222,0.98)", "rgba(166,136,255,0.98)"],
      [0, 1],
      0,
      -halfHeight,
      0,
      halfHeight
    )
    .drawRoundRect(
      -halfWidth,
      -halfHeight,
      QUESTION_CARD_WIDTH,
      QUESTION_CARD_HEIGHT,
      QUESTION_CARD_CORNER_RADIUS + 6
    );

  if (questionCardHighlight) {
    var highlightPaddingX = 28;
    var highlightPaddingY = 22;
    var highlightWidth = QUESTION_CARD_WIDTH - highlightPaddingX * 2;
    var highlightHeight = QUESTION_CARD_HEIGHT - highlightPaddingY * 2;
    var highlightHalfWidth = highlightWidth / 2;
    var highlightHalfHeight = highlightHeight / 2;

    questionCardHighlight.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.58)", "rgba(255,255,255,0.08)"],
        [0, 1],
        -highlightHalfWidth,
        -highlightHalfHeight,
        highlightHalfWidth,
        highlightHalfHeight
      )
      .drawRoundRect(
        -highlightHalfWidth,
        -highlightHalfHeight,
        highlightWidth,
        highlightHeight,
        Math.max(QUESTION_CARD_CORNER_RADIUS - 8, 16)
      );
    questionCardHighlight.alpha = 0.9;
  }
}

function ensureBirthdayCardDecor() {
  if (!questionCardContainer) {
    return;
  }

  if (!birthdayCardDecor) {
    birthdayCardDecor = new createjs.Container();
    birthdayCardDecor.mouseEnabled = false;
    birthdayCardDecor.mouseChildren = false;
    var referenceChild = questionCardBackground || questionCardContainer.getChildAt(0);
    var backgroundIndex = 0;
    if (referenceChild && typeof questionCardContainer.getChildIndex === "function") {
      backgroundIndex = questionCardContainer.getChildIndex(referenceChild);
    }
    questionCardContainer.addChildAt(birthdayCardDecor, Math.max(backgroundIndex, 0));
  }

  if (!birthdayCardGlow) {
    birthdayCardGlow = new createjs.Shape();
    birthdayCardGlow.mouseEnabled = false;
    birthdayCardGlow.mouseChildren = false;
    birthdayCardDecor.addChild(birthdayCardGlow);
  }

  while (birthdayCardStreamers.length < 2) {
    var streamer = new createjs.Shape();
    streamer.mouseEnabled = false;
    streamer.mouseChildren = false;
    birthdayCardDecor.addChild(streamer);
    birthdayCardStreamers.push(streamer);
  }

  drawBirthdayCardDecor();
}

function drawBirthdayCardDecor() {
  if (!birthdayCardDecor) {
    return;
  }

  if (birthdayCardGlow) {
    var glowGraphics = birthdayCardGlow.graphics;
    glowGraphics.clear();
    glowGraphics
      .beginRadialGradientFill(
        ["rgba(255,236,214,0.55)", "rgba(255,236,214,0)"],
        [0, 1],
        0,
        -30,
        0,
        0,
        -30,
        220
      )
      .drawCircle(0, -30, 220);
    birthdayCardGlow.alpha = 0.75;
  }

  var streamerColors = [
    ["rgba(255,204,170,0.85)", "rgba(255,158,214,0.1)"],
    ["rgba(160,214,255,0.85)", "rgba(160,214,255,0.12)"]
  ];

  for (var i = 0; i < birthdayCardStreamers.length; i++) {
    var streamerShape = birthdayCardStreamers[i];
    var colors = streamerColors[i % streamerColors.length];
    var sg = streamerShape.graphics;
    sg.clear();
    sg.beginLinearGradientFill(colors, [0, 1], -200, -100, 120, 140);
    sg.moveTo(i === 0 ? -260 : 260, -30);
    if (i === 0) {
      sg.quadraticCurveTo(-160, -130, -60, -20);
      sg.quadraticCurveTo(-20, 24, -120, 96);
      sg.quadraticCurveTo(-200, 26, -260, -30);
    } else {
      sg.quadraticCurveTo(160, -140, 60, -26);
      sg.quadraticCurveTo(20, 24, 110, 92);
      sg.quadraticCurveTo(200, 30, 260, -24);
    }
    streamerShape.alpha = 0.68;
    streamerShape.y = -28;
  }
}

function ensureProgressBadge() {
  if (!container || !container.parent) {
    return;
  }

  if (!progressBadgeContainer) {
    progressBadgeContainer = new createjs.Container();
    progressBadgeContainer.mouseEnabled = false;
    progressBadgeContainer.mouseChildren = false;
    progressBadgeContainer.alpha = 0;
    progressBadgeContainer.scaleX = progressBadgeContainer.scaleY = 0.82;
    container.parent.addChild(progressBadgeContainer);

    progressBadgeBackground = new createjs.Shape();
    progressBadgeContainer.addChild(progressBadgeBackground);

    progressBadgeIcon = new createjs.Shape();
    progressBadgeContainer.addChild(progressBadgeIcon);

    progressBadgeLabel = new createjs.Text("", "700 30px 'Baloo 2'", "#47184E");
    progressBadgeLabel.textAlign = "left";
    progressBadgeLabel.textBaseline = "middle";
    progressBadgeLabel.shadow = new createjs.Shadow("rgba(12,20,46,0.2)", 0, 4, 12);
    progressBadgeContainer.addChild(progressBadgeLabel);
  }

  drawProgressBadgeBackground(progressBadgeBackground.__width || 220);
  drawProgressBadgeIcon();
  updateProgressBadge(0, totalQuestions || 0, { immediate: true });
}

function drawProgressBadgeBackground(width) {
  if (!progressBadgeBackground) {
    return;
  }
  width = Math.max(220, width || 220);
  var height = 64;
  var halfWidth = width / 2;
  var halfHeight = height / 2;

  var g = progressBadgeBackground.graphics;
  g.clear();
  g.setStrokeStyle(4, "round", "round");
  g.beginLinearGradientStroke(
    ["rgba(255,238,250,0.92)", "rgba(206,170,255,0.72)"],
    [0, 1],
    -halfWidth,
    -halfHeight,
    halfWidth,
    halfHeight
  );
  g.beginLinearGradientFill(
    ["rgba(255,206,226,0.96)", "rgba(188,144,255,0.96)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, 32);

  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.52)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth + 6, -halfHeight + 4, width - 12, height / 2 + 4, 26);

  progressBadgeBackground.__width = width;
  progressBadgeBackground.__height = height;
}

function drawProgressBadgeIcon() {
  if (!progressBadgeIcon) {
    return;
  }
  var g = progressBadgeIcon.graphics;
  g.clear();
  g.beginRadialGradientFill(
    ["rgba(255,255,255,0.92)", "rgba(255,245,210,0.25)"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    24
  );
  g.drawCircle(0, 0, 24);
  g.beginLinearGradientFill(
    ["rgba(255,220,136,1)", "rgba(255,176,108,1)"],
    [0, 1],
    -18,
    -18,
    18,
    18
  );
  g.drawPolyStar(0, 0, 16, 5, 0.45, -90);
  g.beginFill("rgba(255,255,255,0.78)");
  g.drawCircle(0, -6, 4.5);
  progressBadgeIcon.rotation = -12;
}

function updateProgressBadge(current, total, options) {
  if (!progressBadgeContainer) {
    return;
  }

  options = options || {};
  var displayText = current > 0 && total > 0 ? "Question " + current + " of " + total : "Let's Celebrate!";
  if (progressBadgeLabel) {
    progressBadgeLabel.text = displayText;
  }

  var measuredWidth =
    progressBadgeLabel && typeof progressBadgeLabel.getMeasuredWidth === "function"
      ? progressBadgeLabel.getMeasuredWidth()
      : 0;
  var badgeWidth = Math.max(220, measuredWidth + 150);
  drawProgressBadgeBackground(badgeWidth);
  drawProgressBadgeIcon();

  var halfWidth = badgeWidth / 2;
  var badgeHeight = progressBadgeBackground ? progressBadgeBackground.__height || 64 : 64;

  if (progressBadgeIcon) {
    progressBadgeIcon.x = -halfWidth + 46;
    progressBadgeIcon.y = 0;
  }

  if (progressBadgeLabel) {
    progressBadgeLabel.x = -halfWidth + 86;
    progressBadgeLabel.y = 0;
  }

  var centerX =
    typeof getCanvasCenterX === "function"
      ? getCanvasCenterX()
      : canvas && canvas.width
      ? canvas.width / 2
      : 640;

  progressBadgeContainer.x = centerX;
  progressBadgeContainer.y = QUESTION_CARD_Y - 150;

  if (options.immediate) {
    progressBadgeContainer.alpha = Math.max(progressBadgeContainer.alpha, options.visible ? 1 : progressBadgeContainer.alpha);
  } else if (options.animate) {
    pulseProgressBadge();
  }
}

function pulseProgressBadge() {
  if (!progressBadgeContainer) {
    return;
  }

  createjs.Tween.get(progressBadgeContainer, { override: true })
    .to({ scaleX: 1.05, scaleY: 1.05 }, 160, createjs.Ease.quadOut)
    .to({ scaleX: 1, scaleY: 1 }, 240, createjs.Ease.quadInOut);
}

function drawBirthdayChoiceDisabledOverlay(targetShape) {
  if (!targetShape) {
    return;
  }
  var g = targetShape.graphics;
  g.clear();
  var overlayWidth = 148;
  var overlayHeight = 148;
  var overlayRadius = 48;

  g.beginLinearGradientFill(
    ["rgba(82,44,108,0.58)", "rgba(138,70,148,0.58)"],
    [0, 1],
    0,
    -overlayHeight / 2,
    0,
    overlayHeight / 2
  );
  g.drawRoundRect(-overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight, overlayRadius);

  g.setStrokeStyle(3, "round", "round");
  g.beginLinearGradientStroke(
    ["rgba(255,236,254,0.7)", "rgba(214,174,252,0.5)"],
    [0, 1],
    -overlayWidth / 2,
    -overlayHeight / 2,
    overlayWidth / 2,
    overlayHeight / 2
  );
  g.drawRoundRect(
    -overlayWidth / 2 + 5,
    -overlayHeight / 2 + 5,
    overlayWidth - 10,
    overlayHeight - 10,
    overlayRadius - 8
  );
}

function ensureConfettiContainer() {
  if (!container || !container.parent) {
    return;
  }
  if (!confettiContainer) {
    confettiContainer = new createjs.Container();
    confettiContainer.mouseEnabled = false;
    confettiContainer.mouseChildren = false;
    container.parent.addChild(confettiContainer);
  }
}

function configureConfettiShape(shape, color) {
  if (!shape) {
    return;
  }
  var g = shape.graphics;
  g.clear();
  var style = Math.random();
  g.beginFill(color);
  if (style < 0.34) {
    g.drawCircle(0, 0, 5 + Math.random() * 4);
  } else if (style < 0.68) {
    var w = 10 + Math.random() * 6;
    var h = 6 + Math.random() * 4;
    g.drawRoundRect(-w / 2, -h / 2, w, h, 2 + Math.random() * 4);
  } else {
    g.drawPolyStar(0, 0, 6 + Math.random() * 3, 5, 0.5, Math.random() * 360);
  }
}

function releaseConfettiShape(shape) {
  if (!shape) {
    return;
  }
  createjs.Tween.removeTweens(shape);
  if (shape.parent) {
    shape.parent.removeChild(shape);
  }
  confettiPool.push(shape);
}

function launchBirthdayConfetti(originX, originY) {
  ensureConfettiContainer();
  if (!confettiContainer) {
    return;
  }

  var palette = ["#FF9ACE", "#FFD37D", "#8FE0D0", "#8BB6FF", "#FFB3A1"];

  for (var i = 0; i < 14; i++) {
    var color = palette[i % palette.length];
    var confetti = confettiPool.length ? confettiPool.pop() : new createjs.Shape();
    confetti.mouseEnabled = false;
    confetti.mouseChildren = false;
    configureConfettiShape(confetti, color);
    confetti.x = originX;
    confetti.y = originY;
    confetti.alpha = 0.96;
    confetti.rotation = Math.random() * 360;
    confetti.scaleX = confetti.scaleY = 0.62 + Math.random() * 0.4;
    confettiContainer.addChild(confetti);

    var angle = (Math.PI * 2 * i) / 14 + (Math.random() * 0.6 - 0.3);
    var distance = 110 + Math.random() * 90;
    var targetX = originX + Math.cos(angle) * distance;
    var targetY = originY - 20 + Math.sin(angle) * distance * 0.7 + Math.random() * 60;

    createjs.Tween.get(confetti)
      .to(
        {
          x: targetX,
          y: targetY,
          alpha: 0,
          rotation: confetti.rotation + (Math.random() * 240 - 120)
        },
        680 + Math.random() * 240,
        createjs.Ease.quadOut
      )
      .call(releaseConfettiShape, null, [confetti]);
  }
}

function drawQuestionImageBackdrop() {
  if (!questionImageBackdrop) {
    return;
  }
  var g = questionImageBackdrop.graphics;
  g.clear();
  g.beginRadialGradientFill(
    ["rgba(255,240,220,0.95)", "rgba(255,240,220,0)"],
    [0, 1],
    0,
    -10,
    0,
    0,
    -10,
    130
  );
  g.drawCircle(0, -10, 130);
  questionImageBackdrop.alpha = 0.9;
}

function drawQuestionImageFrame() {
  if (!questionImageFrame) {
    return;
  }
  var g = questionImageFrame.graphics;
  g.clear();
  g.setStrokeStyle(6, "round", "round");
  g.beginStroke("rgba(255,255,255,0.85)");
  g.beginRadialGradientFill(
    ["rgba(255,206,228,0.78)", "rgba(186,146,255,0.42)"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    120
  );
  g.drawCircle(0, 0, 120);
  g.beginRadialGradientFill(
    ["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"],
    [0, 1],
    -40,
    -54,
    0,
    -40,
    -54,
    58
  );
  g.drawCircle(-40, -54, 58);
  questionImageFrame.alpha = 0.96;
}

function stopQuestionImageFloatTween() {
  if (!questionImageHolder) {
    return;
  }
  createjs.Tween.removeTweens(questionImageHolder);
}

function startQuestionImageFloatTween() {
  if (!questionImageHolder) {
    return;
  }
  var baseY = questionImageHolder.__baseY != null ? questionImageHolder.__baseY : questionImageHolder.y;
  questionImageHolder.__baseY = baseY;
  createjs.Tween.get(questionImageHolder, { override: true, loop: true })
    .to({ y: baseY + 10 }, 1600, createjs.Ease.sineInOut)
    .to({ y: baseY }, 1600, createjs.Ease.sineInOut);
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
  qno = questionOrder.slice();
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
  applyBirthdayTheme();

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
        .beginRadialGradientFill(
          ["rgba(255,196,224,0.66)", "rgba(255,196,224,0)"],
          [0, 1],
          0,
          0,
          0,
          0,
          0,
          120
        )
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
    if (choiceDisabledOverlayArr[j]) {
      drawBirthdayChoiceDisabledOverlay(choiceDisabledOverlayArr[j]);
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
  if (!questionImageBackdrop) {
    questionImageBackdrop = new createjs.Shape();
    questionImageBackdrop.mouseEnabled = false;
    questionImageBackdrop.mouseChildren = false;
    questionImageBackdrop.alpha = 0;
    questionImageHolder.addChild(questionImageBackdrop);
  }
  if (!questionImageContent) {
    questionImageContent = new createjs.Container();
    questionImageContent.mouseEnabled = false;
    questionImageContent.mouseChildren = false;
    questionImageHolder.addChild(questionImageContent);
  }
  if (!questionImageFrame) {
    questionImageFrame = new createjs.Shape();
    questionImageFrame.mouseEnabled = false;
    questionImageFrame.mouseChildren = false;
    questionImageFrame.alpha = 0;
    questionImageHolder.addChild(questionImageFrame);
  }

  drawQuestionImageBackdrop();
  drawQuestionImageFrame();
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

  updateProgressBadge(quesCnt, totalQuestions, { animate: quesCnt > 1 });

  panelVisibleFn();

  if (cnt >= questionOrder.length) {
    questionOrder = between(0, words_arry.length - 1);
    qno = questionOrder.slice();
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
    stopQuestionImageFloatTween();
    drawQuestionImageBackdrop();
    drawQuestionImageFrame();
    if (questionImageContent) {
      questionImageContent.removeAllChildren();
    }
    if (questionSprite && questionImageContent) {
      questionSprite.gotoAndStop(questionIndex);
      var imageClone = questionSprite.clone();
      imageClone.visible = true;
      imageClone.scaleX = imageClone.scaleY = 0.68;
      imageClone.x = 0;
      imageClone.y = 0;
      questionImageContent.addChild(imageClone);
    }
    if (questionImageFrame) {
      questionImageFrame.alpha = 0.98;
    }
    if (questionImageBackdrop) {
      questionImageBackdrop.alpha = 0.92;
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
      drawBirthdayChoiceDisabledOverlay(disabledOverlay);
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
      .to({ alpha: 1, y: -20 }, 320, createjs.Ease.sineOut)
      .call(function () {
        questionImageHolder.__baseY = -20;
        startQuestionImageFloatTween();
      });
  }

  if (progressBadgeContainer) {
    progressBadgeContainer.visible = true;
    if (progressBadgeContainer.alpha < 1) {
      createjs.Tween.get(progressBadgeContainer, { override: true })
        .wait(revealDelay + 60)
        .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 420, createjs.Ease.backOut);
    }
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
    if (clueBgArr[missingIndex]) {
      launchBirthdayConfetti(clueBgArr[missingIndex].x, clueBgArr[missingIndex].y - 16);
    }
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
