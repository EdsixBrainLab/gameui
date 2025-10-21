var ambientLayer,
  overlayLayer,
  ambientGradientLayer,
  ambientAuroraLayer,
  ambientSparkLayer,
  ambientOrbs = [],
  ambientSparkGeneration = 0;
var questionSubtitle,  questionCardContainer,  questionCardBackground, questionCardHighlight,  questionCardShadow,  circleOutline, questionCardContainer_htp,questionCardShadow_htp,in_introQues1;
var INTRO_TITLE_Y = 75;
var INTRO_PROMPT_Y = 210;
var QUESTION_CARD_WIDTH = 720;
var QUESTION_CARD_HEIGHT = 168;
var QUESTION_CARD_CORNER_RADIUS = 44;

var CHOICE_TILE_BASE_COLORS = ["rgba(123,104,238,0.96)", "rgba(76,53,163,0.96)"];
var CHOICE_TILE_HOVER_COLORS = ["rgba(155,132,255,0.98)", "rgba(94,66,206,0.98)"];
var CHOICE_TILE_CORRECT_COLORS = ["rgba(72,210,190,0.96)", "rgba(30,140,126,0.96)"];
var CHOICE_TILE_WRONG_COLORS = ["rgba(255,137,162,0.96)", "rgba(178,54,110,0.96)"];
var CHOICE_TILE_DISABLED_COLORS = ["rgba(94,78,166,0.8)", "rgba(54,36,122,0.82)"];
var CLUE_SLOT_BASE_COLORS = ["rgba(114,86,232,0.94)", "rgba(58,38,148,0.94)"];
var CLUE_SLOT_HIGHLIGHT_COLORS = ["rgba(168,144,255,0.94)", "rgba(90,64,210,0.94)"];
var CLUE_SLOT_SUCCESS_COLORS = ["rgba(94,222,201,0.94)", "rgba(34,156,136,0.94)"];
var CLUE_SLOT_ERROR_COLORS = ["rgba(255,153,171,0.94)", "rgba(184,46,89,0.94)"];
var choiceIdleStates = [];

var cycleRaceSpeechBubblePalette = {
  stroke: ["rgba(168,212,255,0.92)", "rgba(66,112,208,0.84)"],
  fill: ["rgba(124,176,255,0.98)", "rgba(60,92,204,0.96)"],
  highlight: ["rgba(255,255,255,0.46)", "rgba(255,255,255,0.06)"],
  label: ["rgba(48,74,142,0.96)", "rgba(34,52,112,0.96)"],
  pulse: ["rgba(104,152,255,0.32)", "rgba(46,74,176,0.08)"]
};

var cycleRaceTextOptionPalette = {
  fill: ["rgba(120,224,255,0.98)", "rgba(64,144,236,0.98)"],
  stroke: ["rgba(186,244,255,0.92)", "rgba(52,116,206,0.9)"],
  hoverFill: ["rgba(140,236,255,1)", "rgba(82,168,246,1)"],
  hoverStroke: ["rgba(208,250,255,0.96)", "rgba(62,134,214,0.92)"],
  correctFill: ["rgba(148,255,228,1)", "rgba(68,190,158,1)"],
  correctStroke: ["rgba(210,255,240,0.96)", "rgba(80,152,138,0.92)"],
  wrongFill: ["rgba(255,186,196,0.98)", "rgba(220,96,128,0.96)"],
  wrongStroke: ["rgba(255,220,226,0.94)", "rgba(188,72,104,0.9)"],
  highlight: ["rgba(255,255,255,0.54)", "rgba(255,255,255,0.08)"],
  sheen: ["rgba(255,255,255,0.36)", "rgba(255,255,255,0)"]
};

var cycleRaceImageOptionPalette = {
  fill: ["rgba(255,214,160,0.98)", "rgba(244,154,82,0.96)"],
  stroke: ["rgba(255,236,200,0.9)", "rgba(226,128,70,0.88)"],
  hoverFill: ["rgba(255,224,184,1)", "rgba(250,170,100,1)"],
  hoverStroke: ["rgba(255,242,212,0.94)", "rgba(224,142,82,0.9)"],
  correctFill: ["rgba(156,252,224,1)", "rgba(74,196,162,1)"],
  correctStroke: ["rgba(214,255,242,0.94)", "rgba(90,156,140,0.9)"],
  wrongFill: ["rgba(255,190,196,0.98)", "rgba(218,100,122,0.96)"],
  wrongStroke: ["rgba(255,222,226,0.94)", "rgba(190,78,98,0.9)"],
  highlight: ["rgba(255,255,255,0.46)", "rgba(255,255,255,0.08)"],
  sheen: ["rgba(255,255,255,0.32)", "rgba(255,255,255,0)"]
};

var cycleRaceHintPalette = {
  fill: ["rgba(255,236,188,0.98)", "rgba(255,192,108,0.98)"],
  stroke: ["rgba(255,252,232,0.88)", "rgba(226,140,66,0.9)"],
  highlight: ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.04)"],
  glow: "rgba(10,20,44,0.42)",
  text: "#2A2F55"
};

function computeCenteredRowLayout(count, options) {
  options = options || {};
  var centerX =
    typeof options.centerX === "number"
      ? options.centerX
      : typeof getCanvasCenterX === "function"
      ? getCanvasCenterX()
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

  var positions = [];
  var startX = centerX - ((count - 1) * spacing) / 2;

  for (var i = 0; i < count; i++) {
    positions.push(startX + i * spacing);
  }

  return {
    positions: positions,
    scale: scale,
    spacing: spacing
  };
}

if (typeof window !== "undefined") {
  window.SAUI_computeCenteredRow = computeCenteredRowLayout;
}

var globalHelperScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
    ? self
    : this;

function getBitmapNaturalBounds(bitmap) {
  if (!bitmap) {
    return null;
  }

  if (typeof bitmap.getBounds === "function") {
    var cached = bitmap.getBounds();
    if (cached) {
      return cached;
    }
  }

  if (bitmap.image) {
    return {
      x: 0,
      y: 0,
      width: bitmap.image.width || 0,
      height: bitmap.image.height || 0
    };
  }

  return null;
}

function configureIntroArrowSprite(sprite, options) {
  if (!sprite) {
    return;
  }

  options = options || {};
  var scale = options.scale != null ? options.scale : 0.72;
  sprite.scaleX = sprite.scaleY = scale;
  sprite.mouseEnabled = false;
  sprite.mouseChildren = false;
  sprite.visible = false;
  sprite.alpha = 0;
  sprite.__tipGap = options.tipGap != null ? options.tipGap : 26;
  sprite.__bounceOffset = options.bounceOffset != null ? options.bounceOffset : 16;

  var bounds = getBitmapNaturalBounds(sprite);
  if (bounds) {
    var originX = (bounds.x || 0) + bounds.width / 2;
    var originY = (bounds.y || 0) + bounds.height;
    sprite.regX = originX;
    sprite.regY = originY;
  }
}

function configureIntroFingerSprite(sprite, options) {
  if (!sprite) {
    return;
  }

  options = options || {};
  var baseScale =
    typeof options.baseScale === "number"
      ? options.baseScale
      : typeof sprite.__baseScale === "number"
      ? sprite.__baseScale
      : 0.78;

  sprite.scaleX = sprite.scaleY = baseScale;
  sprite.mouseEnabled = false;
  sprite.mouseChildren = false;
  sprite.visible = false;
  sprite.alpha = 0;

  var pointerTip = options.pointerTip || sprite.__pointerTipBase || sprite.__pointerTip;
  if (pointerTip && typeof pointerTip.x === "number" && typeof pointerTip.y === "number") {
    sprite.__pointerOffsetX = pointerTip.x * baseScale;
    sprite.__pointerOffsetY = pointerTip.y * baseScale;
  } else {
    var bounds = getBitmapNaturalBounds(sprite);
    if (bounds) {
      sprite.__pointerOffsetX = bounds.width * 0.42 * baseScale;
      sprite.__pointerOffsetY = bounds.height * 0.82 * baseScale;
    } else {
      sprite.__pointerOffsetX = 0;
      sprite.__pointerOffsetY = 0;
    }
  }

  var pressDistanceBase =
    typeof options.pressDistance === "number"
      ? options.pressDistance
      : typeof sprite.__pressDistanceBase === "number"
      ? sprite.__pressDistanceBase
      : sprite.__pressDistance;

  sprite.__pressDistance =
    typeof pressDistanceBase === "number" ? pressDistanceBase * baseScale : 18 * baseScale;
}

function buildChoiceLetterDisplay(options) {
  options = options || {};
  var font = options.font || "800 66px 'Baloo 2'";
  var color = options.color || "#FFFFFF";
  var baseScale = options.baseScale != null ? options.baseScale : 0.8;
  var interactive = options.interactive !== false;
  var shadow =
    options.shadow || new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);

  var label = new createjs.Text("", font, color);
  label.textAlign = "center";
  label.textBaseline = "middle";
  label.shadow = shadow;
  label.mouseEnabled = interactive;
  label.mouseChildren = false;
  label.__baseScale = baseScale;
  label.__isChoiceLetter = true;

  var hitRadius = options.hitRadius != null ? options.hitRadius : 78;
  if (interactive) {
    var hitArea = new createjs.Shape();
    hitArea.graphics
      .beginFill("#000")
      .drawRoundRect(-hitRadius, -hitRadius, hitRadius * 2, hitRadius * 2, 52);
    label.hitArea = hitArea;
    label.__hitArea = hitArea;
  }

  if (options.accessibleLabel) {
    label.accessible = true;
    label.accessibleLabel = options.accessibleLabel;
  }

  return label;
}

function updateChoiceLetterDisplay(display, letter) {
  if (!display) {
    return;
  }

  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0.15;
}

function buildClueLetterDisplay(options) {
  options = options || {};
  var font = options.font || "800 60px 'Baloo 2'";
  var color = options.color || "#FFFFFF";
  var baseScale = options.baseScale != null ? options.baseScale : 1;
  var shadow = options.shadow || new createjs.Shadow("rgba(8,18,44,0.32)", 0, 4, 12);

  var label = new createjs.Text("", font, color);
  label.textAlign = "center";
  label.textBaseline = "middle";
  label.shadow = shadow;
  label.mouseEnabled = false;
  label.mouseChildren = false;
  label.__baseScale = baseScale;
  label.__isClueLetter = true;

  if (options.accessibleLabel) {
    label.accessible = true;
    label.accessibleLabel = options.accessibleLabel;
  }

  return label;
}

function updateClueLetterDisplay(display, letter) {
  if (!display) {
    return;
  }

  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0.15;
}

function cloneAnagramHelperOptions(base) {
  var copy = {};
  if (!base) {
    return copy;
  }
  for (var key in base) {
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      copy[key] = base[key];
    }
  }
  return copy;
}

function createFallbackChoiceLetter(options) {
  var opts = cloneAnagramHelperOptions(options);
  var letter = new createjs.Text(
    "",
    opts.font || "800 66px 'Baloo 2'",
    opts.color || "#FFFFFF"
  );
  letter.textAlign = "center";
  letter.textBaseline = "middle";
  letter.shadow =
    opts.shadow || new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
  letter.mouseEnabled = opts.interactive !== false;
  letter.mouseChildren = false;
  var baseScale = opts.baseScale != null ? opts.baseScale : 0.8;
  letter.__baseScale = baseScale;
  if (letter.mouseEnabled) {
    var hitRadius = opts.hitRadius != null ? opts.hitRadius : 78;
    var hit = new createjs.Shape();
    hit.graphics
      .beginFill("#000")
      .drawRoundRect(-hitRadius, -hitRadius, hitRadius * 2, hitRadius * 2, 52);
    letter.hitArea = hit;
    letter.__hitArea = hit;
  }
  return letter;
}

function fallbackChoiceUpdater(display, letter) {
  if (!display) {
    return;
  }
  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0;
}

function createFallbackClueLetter(options) {
  var opts = cloneAnagramHelperOptions(options);
  var label = new createjs.Text(
    "",
    opts.font || "800 60px 'Baloo 2'",
    opts.color || "#FFFFFF"
  );
  label.textAlign = "center";
  label.textBaseline = "middle";
  label.shadow =
    opts.shadow || new createjs.Shadow("rgba(8,18,44,0.32)", 0, 4, 12);
  label.mouseEnabled = false;
  label.mouseChildren = false;
  label.__baseScale = opts.baseScale != null ? opts.baseScale : 1;
  return label;
}

function fallbackClueUpdater(display, letter) {
  if (!display) {
    return;
  }
  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0;
}

function createAnagramLetterHelpers(config) {
  config = config || {};

  var nativeChoiceBuilder =
    typeof buildChoiceLetterDisplay === "function"
      ? buildChoiceLetterDisplay
      : null;
  var nativeChoiceUpdater =
    typeof updateChoiceLetterDisplay === "function"
      ? updateChoiceLetterDisplay
      : null;
  var nativeClueBuilder =
    typeof buildClueLetterDisplay === "function"
      ? buildClueLetterDisplay
      : null;
  var nativeClueUpdater =
    typeof updateClueLetterDisplay === "function"
      ? updateClueLetterDisplay
      : null;

  var choiceBase = {
    interactive: config.choiceInteractive !== false,
    baseScale:
      config.choiceScale != null ? config.choiceScale : config.choiceBaseScale,
    font: config.choiceFont,
    color: config.choiceColor,
    shadow: config.choiceShadow,
    hitRadius: config.choiceHitRadius
  };
  if (choiceBase.baseScale == null) {
    choiceBase.baseScale = 0.8;
  }

  var clueBase = {
    interactive: false,
    baseScale: config.clueScale != null ? config.clueScale : 1,
    font: config.clueFont,
    color: config.clueColor,
    shadow: config.clueShadow
  };

  var choiceBuilder = nativeChoiceBuilder
    ? function () {
        return nativeChoiceBuilder(cloneAnagramHelperOptions(choiceBase));
      }
    : function () {
        return createFallbackChoiceLetter(choiceBase);
      };

  var choiceUpdater = nativeChoiceUpdater
    ? function (display, letter) {
        nativeChoiceUpdater(display, letter);
      }
    : fallbackChoiceUpdater;

  var clueBuilder = nativeClueBuilder
    ? function () {
        return nativeClueBuilder(cloneAnagramHelperOptions(clueBase));
      }
    : function () {
        return createFallbackClueLetter(clueBase);
      };

  var clueUpdater = nativeClueUpdater
    ? function (display, letter) {
        nativeClueUpdater(display, letter);
      }
    : fallbackClueUpdater;

  return {
    buildChoice: choiceBuilder,
    updateChoice: choiceUpdater,
    buildClue: clueBuilder,
    updateClue: clueUpdater
  };
}

if (typeof globalHelperScope !== "undefined") {
  if (typeof globalHelperScope.SAUI_createAnagramLetterHelpers !== "function") {
    globalHelperScope.SAUI_createAnagramLetterHelpers = createAnagramLetterHelpers;
  }
  if (typeof globalHelperScope.SA_createAnagramLetterHelpers !== "function") {
    globalHelperScope.SA_createAnagramLetterHelpers = createAnagramLetterHelpers;
  }
}

function buildIntroGlowShape(options) {
  options = options || {};
  var innerColor = options.innerColor || "rgba(209,178,255,0.55)";
  var outerColor = options.outerColor || "rgba(209,178,255,0)";
  var radius = options.radius != null ? options.radius : 120;

  var glow = new createjs.Shape();
  glow.graphics
    .beginRadialGradientFill([innerColor, outerColor], [0, 1], 0, 0, 0, 0, 0, radius)
    .drawCircle(0, 0, radius);
  glow.alpha = 0;
  glow.visible = false;
  glow.mouseEnabled = false;
  glow.mouseChildren = false;
  return glow;
}

function computeRowLayout(count, options) {
  return computeCenteredRowLayout(count, options);
}

if (globalHelperScope) {
  if (typeof globalHelperScope.SAUI_configureIntroArrowSprite !== "function") {
    globalHelperScope.SAUI_configureIntroArrowSprite = configureIntroArrowSprite;
  }
  if (typeof globalHelperScope.SAUI_configureIntroFingerSprite !== "function") {
    globalHelperScope.SAUI_configureIntroFingerSprite = configureIntroFingerSprite;
  }
  if (typeof globalHelperScope.SAUI_buildChoiceLetterDisplay !== "function") {
    globalHelperScope.SAUI_buildChoiceLetterDisplay = buildChoiceLetterDisplay;
  }
  if (typeof globalHelperScope.SAUI_updateChoiceLetterDisplay !== "function") {
    globalHelperScope.SAUI_updateChoiceLetterDisplay = updateChoiceLetterDisplay;
  }
  if (typeof globalHelperScope.SAUI_buildClueLetterDisplay !== "function") {
    globalHelperScope.SAUI_buildClueLetterDisplay = buildClueLetterDisplay;
  }
  if (typeof globalHelperScope.SAUI_updateClueLetterDisplay !== "function") {
    globalHelperScope.SAUI_updateClueLetterDisplay = updateClueLetterDisplay;
  }
  if (typeof globalHelperScope.SAUI_buildIntroGlowShape !== "function") {
    globalHelperScope.SAUI_buildIntroGlowShape = buildIntroGlowShape;
  }
  if (typeof globalHelperScope.SAUI_computeRowLayout !== "function") {
    globalHelperScope.SAUI_computeRowLayout = computeRowLayout;
  }
  if (typeof globalHelperScope.SA_buildChoiceLetterDisplay !== "function") {
    globalHelperScope.SA_buildChoiceLetterDisplay = function (options) {
      return buildChoiceLetterDisplay(options);
    };
  }
  if (typeof globalHelperScope.SA_updateChoiceLetterDisplay !== "function") {
    globalHelperScope.SA_updateChoiceLetterDisplay = updateChoiceLetterDisplay;
  }
  if (typeof globalHelperScope.SA_buildClueLetterDisplay !== "function") {
    globalHelperScope.SA_buildClueLetterDisplay = function (options) {
      return buildClueLetterDisplay(options);
    };
  }
  if (typeof globalHelperScope.SA_updateClueLetterDisplay !== "function") {
    globalHelperScope.SA_updateClueLetterDisplay = updateClueLetterDisplay;
  }
}

var choiceDisableOverlayArr = [];
var choiceReadyPulseArr = [];
var choiceReadyBadgeArr = [];
var choiceReadyTweenArr = [];

var timeUpOverlay,
  timeUpOverlayBg,
  timeUpOverlayGlass,
  timeUpOverlayShine,
  timeUpIconContainer,
  timeUpIconHand,
  timeUpIconSpark,
  timeUpText,
  timeUpTextGlow;

function layoutTimeUpOverlay() {
  if (!timeUpOverlay) {
    return;
  }

  var metrics =
    typeof getCanvasMetrics === "function"
      ? getCanvasMetrics()
      : {
          centerX:
            typeof getCanvasCenterX === "function"
              ? getCanvasCenterX()
              : canvas && !isNaN(canvas.width)
              ? canvas.width / 2
              : 0,
          centerY:
            canvas && !isNaN(canvas.height) ? canvas.height / 2 : 0
        };

  if (metrics) {
    timeUpOverlay.x = metrics.centerX || 0;
    timeUpOverlay.y = metrics.centerY || 0;
  }

  layoutTimeUpContent();
}

if (typeof globalThis !== "undefined") {
  globalThis.layoutTimeUpOverlay = layoutTimeUpOverlay;
}

function layoutTimeUpContent() {
  if (!timeUpOverlay || !timeUpIconContainer || !timeUpText) {
    return;
  }

  var iconWidth =
    typeof timeUpIconContainer.__width === "number"
      ? timeUpIconContainer.__width
      : 136;
  var spacing =
    typeof timeUpIconContainer.__spacing === "number"
      ? timeUpIconContainer.__spacing
      : 36;
  var maxTextWidth = 260;

  if (timeUpText.lineWidth !== maxTextWidth) {
    timeUpText.lineWidth = maxTextWidth;
  }
  if (timeUpTextGlow) {
    timeUpTextGlow.lineWidth = maxTextWidth;
  }

  var measuredWidth = maxTextWidth;
  if (typeof timeUpText.getMeasuredWidth === "function") {
    measuredWidth = timeUpText.getMeasuredWidth();
  }
  if (measuredWidth > maxTextWidth) {
    measuredWidth = maxTextWidth;
  }

  var totalWidth = iconWidth + spacing + measuredWidth;
  var start = -totalWidth / 2;
  var iconCenter = start + iconWidth / 2;
  var textCenter = start + iconWidth + spacing + measuredWidth / 2;

  timeUpIconContainer.x = iconCenter;

  timeUpText.textAlign = "center";
  timeUpText.x = textCenter;

  if (timeUpTextGlow) {
    timeUpTextGlow.textAlign = "center";
    timeUpTextGlow.x = textCenter;
  }
}

function call_UI_ambientOverlay(incontainer)
{
ambientLayer = new createjs.Container();
  incontainer.addChild(ambientLayer);
  overlayLayer = new createjs.Container();
  incontainer.addChild(overlayLayer);
  createAmbientBackground();
}

function call_UI_gameQuestion(incontainer,in_questiontext)
{
         QusTxtString = new createjs.Text(
      in_questiontext,
      "700 28px 'Baloo 2'",
      "#EAF2FF"
    );
    QusTxtString.shadow = new createjs.Shadow("rgba(6,16,38,0.36)", 0, 12, 26);
    QusTxtString.textAlign = "center";
    QusTxtString.textBaseline = "middle";
    QusTxtString.lineWidth = 1000;
    QusTxtString.lineHeight = 40;
    var promptCenterX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;
    QusTxtString.x = promptCenterX;
    QusTxtString.y = INTRO_PROMPT_Y-55;
    QusTxtString.alpha = 0.98;
    incontainer.parent.addChild(QusTxtString);
    QusTxtString.visible = false;
        QusTxtString.__labelBG = SAUI_attachQuestionLabelBG(QusTxtString, incontainer.parent, {
    padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22
  });

    QusTxtString.__layoutHalfHeight = (QusTxtString.lineHeight || 34) / 2;

    if (typeof refreshResponsiveLayout === "function") {
      refreshResponsiveLayout(true);
    }
	
	
	
	
}

function call_UI_introQuestionCardContainer(incontainer,in_question)
{
	
	questionCardContainer_htp = new createjs.Container();
    questionCardContainer_htp.x = introQues1X;
    questionCardContainer_htp.y = introQues1Y;
    questionCardContainer_htp.alpha = 0;
    questionCardContainer_htp.visible = false;
    questionCardContainer_htp.mouseEnabled = false;
    questionCardContainer_htp.mouseChildren = false;
	
	questionCardShadow_htp = new createjs.Shape();
    var shadowWidth_htp = QUESTION_CARD_WIDTH + 64;
    var shadowHeight_htp = QUESTION_CARD_HEIGHT + 26;
    var shadowHalfWidth_htp = shadowWidth_htp / 2;
    var shadowHalfHeight_htp = shadowHeight_htp / 2;
    questionCardShadow_htp.graphics
      .beginFill("rgba(8,18,36,0.32)")
      .drawRoundRect(
        -shadowHalfWidth_htp,
        -shadowHalfHeight_htp,
        shadowWidth_htp,
        shadowHeight_htp,
        QUESTION_CARD_CORNER_RADIUS + 10
      );
    questionCardShadow_htp.y = 1;
    questionCardShadow_htp.alpha = 0.32;
    questionCardContainer_htp.addChild(questionCardShadow_htp);

    questionCardBackground_htp = new createjs.Shape();
    questionCardContainer_htp.addChild(questionCardBackground_htp);

    questionCardHighlight_htp = new createjs.Shape();
    questionCardContainer_htp.addChild(questionCardHighlight_htp);
	
	renderQuestionCardBackground_htp();
	
    in_introQues1 = new createjs.Text(in_question, "800 80px 'Baloo 2'", "#F4FAFF");
    in_introQues1.x = 0;
    in_introQues1.y = 0;
    in_introQues1.textAlign = "center";
    in_introQues1.textBaseline = "middle";
	in_introQues1.shadow = new createjs.Shadow("rgba(5,12,28,0.5)", 0, 10, 26);
    in_introQues1.visible = true;
	
	 questionCardContainer_htp.addChild(in_introQues1)
incontainer.parent.addChild(questionCardContainer_htp);

}



function drawChoiceTileBackground(targetShape, colors) {
  if (!targetShape) {
    return;
  }

  var gradient = colors || CHOICE_TILE_BASE_COLORS;
  var stroke = ["rgba(228,215,255,0.85)", "rgba(142,114,255,0.65)"];

  var width = 148;
  var height = 148;
  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var cornerRadius = 48;

  var g = targetShape.graphics;
  g.clear();
  g.setStrokeStyle(5, "round", "round");
  g.beginLinearGradientStroke(stroke, [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight);
  g.beginLinearGradientFill(gradient, [0, 1], 0, -halfHeight, 0, halfHeight);
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);

  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.42)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight,
    0,
    halfHeight
  );
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);
}

function drawChoiceSpeechWave(targetShape) {
  if (!targetShape) {
    return;
  }

  var g = targetShape.graphics;
  g.clear();

  g.beginRadialGradientFill(
    ["rgba(206,190,255,0.45)", "rgba(140,110,255,0)"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    92
  );
  g.drawCircle(0, 0, 92);
}

function drawChoiceDisabledOverlay(targetShape) {
  if (!targetShape) {
    return;
  }

  var g = targetShape.graphics;
  g.clear();
  var overlayWidth = 148;
  var overlayHeight = 148;
  var overlayRadius = 48;

  g.beginLinearGradientFill(
    ["rgba(30,26,74,0.75)", "rgba(56,38,112,0.75)"],
    [0, 1],
    0,
    -overlayHeight / 2,
    0,
    overlayHeight / 2
  );
  g.drawRoundRect(
    -overlayWidth / 2,
    -overlayHeight / 2,
    overlayWidth,
    overlayHeight,
    overlayRadius
  );

  g.beginStroke("rgba(224,212,255,0.4)");
  g.setStrokeStyle(3, "round", "round");
  g.drawRoundRect(
    -overlayWidth / 2 + 6,
    -overlayHeight / 2 + 6,
    overlayWidth - 12,
    overlayHeight - 12,
    overlayRadius - 10
  );
}

function buildChoiceReadyBadge() {
  var badge = new createjs.Container();
  badge.mouseEnabled = false;
  badge.mouseChildren = false;
  badge.visible = false;
  badge.alpha = 0;

  var base = new createjs.Shape();
  base.graphics
    .beginLinearGradientFill(
      ["rgba(242,227,255,0.95)", "rgba(168,132,255,0.95)"],
      [0, 1],
      -32,
      -18,
      32,
      18
    )
    .drawRoundRect(-32, -18, 64, 36, 18);
  badge.addChild(base);

  var spark = new createjs.Shape();
  spark.graphics
    .beginFill("#5B2DE1")
    .moveTo(0, -10)
    .lineTo(8, 2)
    .lineTo(-8, 2)
    .closePath();
  badge.addChild(spark);

  var dot = new createjs.Shape();
  dot.graphics.beginFill("#FFFFFF").drawCircle(0, 8, 4.5);
  badge.addChild(dot);

  badge.__baseScale = 1;
  badge.__designScale = 1;

  return badge;
}

function drawClueSlotBackground(targetShape, colors) {
  if (!targetShape) {
    return;
  }

  var gradient = colors || CLUE_SLOT_BASE_COLORS;
  var stroke = ["rgba(230,216,255,0.92)", "rgba(124,98,232,0.68)"];
  var width = 108;
  var height = 118;
  var cornerRadius = 40;
  var halfWidth = width / 2;
  var halfHeight = height / 2;

  var g = targetShape.graphics;
  g.clear();
  g.setStrokeStyle(5, "round", "round");
  g.beginLinearGradientStroke(stroke, [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight);
  g.beginLinearGradientFill(gradient, [0, 1], 0, -halfHeight, 0, halfHeight);
  g.drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);

  var highlightInset = 14;
  var highlightHeight = height * 0.54;
  var highlightTopRadius = Math.max(cornerRadius - highlightInset, 26);
  var highlightBottomRadius = Math.max(highlightTopRadius - 12, 14);
  g.beginStroke(null);
  g.beginLinearGradientFill(
    ["rgba(255,255,255,0.32)", "rgba(255,255,255,0)"],
    [0, 1],
    0,
    -halfHeight + highlightInset,
    0,
    -halfHeight + highlightInset + highlightHeight
  );
  if (typeof g.drawRoundRectComplex === "function") {
    g.drawRoundRectComplex(
      -halfWidth + highlightInset,
      -halfHeight + highlightInset,
      width - highlightInset * 2,
      highlightHeight,
      highlightTopRadius,
      highlightTopRadius,
      highlightBottomRadius,
      highlightBottomRadius
    );
  } else {
    g.drawRoundRect(
      -halfWidth + highlightInset,
      -halfHeight + highlightInset,
      width - highlightInset * 2,
      highlightHeight,
      highlightBottomRadius
    );
  }
}

function animateChoiceTileHover(options) {
  options = options || {};

  var tile = options.tile;
  var bg = options.background;
  var glow = options.glow;
  var isActive = !!options.active;
  var hoverColors = options.hoverColors || CHOICE_TILE_HOVER_COLORS;
  var baseColors = options.baseColors || CHOICE_TILE_BASE_COLORS;

  if (bg) {
    var bgBaseScale = bg.__baseScale || 1;
    drawChoiceTileBackground(bg, isActive ? hoverColors : baseColors);
    createjs.Tween.get(bg, { override: true })
      .to(
        {
          scaleX: bgBaseScale * (isActive ? 1.05 : 1),
          scaleY: bgBaseScale * (isActive ? 1.05 : 1),
          alpha: isActive ? 1 : 0.95
        },
        200,
        createjs.Ease.quadOut
      );
  }

  if (tile) {
    var tileBaseScale = options.tileBaseScale || tile.__baseScale || tile.scaleX || 0.8;
    createjs.Tween.get(tile, { override: true })
      .to(
        {
          scaleX: tileBaseScale * (isActive ? 1.08 : 1),
          scaleY: tileBaseScale * (isActive ? 1.08 : 1),
          alpha: isActive ? 1 : tile.alpha
        },
        200,
        createjs.Ease.quadOut
      );
  }

  if (glow) {
    var targetAlpha = isActive ? 0.52 : 0.35;
    createjs.Tween.get(glow, { override: true }).to({ alpha: targetAlpha }, 220, createjs.Ease.quadOut);
  }
}

function markChoiceTileUsed(options) {
  options = options || {};

  var tile = options.tile;
  var bg = options.background;
  var glow = options.glow;

  if (bg) {
    drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
    createjs.Tween.get(bg, { override: true }).to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
  }

  if (tile) {
    createjs.Tween.get(tile, { override: true }).to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
  }

  if (glow) {
    createjs.Tween.get(glow, { override: true }).to({ alpha: 0.2 }, 200, createjs.Ease.quadOut);
  }
}

function styleClueSlotFill(options) {
  options = options || {};

  var bg = options.background;
  var filled = !!options.filled;
  var successColors = options.successColors || CLUE_SLOT_SUCCESS_COLORS;
  var baseColors = options.baseColors || CLUE_SLOT_BASE_COLORS;

  if (!bg) {
    return;
  }

  var baseScale = bg.__baseScale || 1;
  drawClueSlotBackground(bg, filled ? successColors : baseColors);
  createjs.Tween.get(bg, { override: true })
    .to(
      {
        scaleX: baseScale * (filled ? 1.06 : 1),
        scaleY: baseScale * (filled ? 1.06 : 1),
        alpha: filled ? 1 : 0.95
      },
      220,
      createjs.Ease.quadOut
    )
    .to({ scaleX: baseScale, scaleY: baseScale }, 180, createjs.Ease.quadOut);
}

function highlightClueSlot(options) {
  options = options || {};

  var bg = options.background;
  var highlightColors = options.highlightColors || CLUE_SLOT_HIGHLIGHT_COLORS;

  if (!bg) {
    return;
  }

  var baseScale = bg.__baseScale || 1;
  drawClueSlotBackground(bg, highlightColors);
  createjs.Tween.get(bg, { override: true })
    .to(
      { scaleX: baseScale * 1.04, scaleY: baseScale * 1.04, alpha: 1 },
      220,
      createjs.Ease.quadOut
    )
    .to({ scaleX: baseScale, scaleY: baseScale }, 200, createjs.Ease.quadOut);
}

if (globalHelperScope) {
  if (!globalHelperScope.SAUI_highlightChoiceTile) {
    globalHelperScope.SAUI_highlightChoiceTile = function (options) {
      animateChoiceTileHover(options);
    };
  }

  if (!globalHelperScope.SAUI_markChoiceTileUsed) {
    globalHelperScope.SAUI_markChoiceTileUsed = function (options) {
      markChoiceTileUsed(options);
    };
  }

  if (!globalHelperScope.SAUI_styleClueSlot) {
    globalHelperScope.SAUI_styleClueSlot = function (options) {
      styleClueSlotFill(options);
    };
  }

  if (!globalHelperScope.SAUI_highlightClueSlot) {
    globalHelperScope.SAUI_highlightClueSlot = function (options) {
      highlightClueSlot(options);
    };
  }
}

function startChoiceReadyBadgeAnimation(badge) {
  if (!badge) {
    return;
  }

  stopChoiceReadyBadgeAnimation(badge);

  var baseScale = badge.__baseScale || badge.scaleX || 1;
  badge.scaleX = baseScale;
  badge.scaleY = baseScale;
  badge.__pulseTween = createjs.Tween.get(badge, { loop: true, override: false })
    .to({ scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 320, createjs.Ease.sineOut)
    .to({ scaleX: baseScale, scaleY: baseScale }, 320, createjs.Ease.sineIn);
}

function stopChoiceReadyBadgeAnimation(badge) {
  if (!badge) {
    return;
  }

  if (badge.__pulseTween) {
    badge.__pulseTween.setPaused(true);
    badge.__pulseTween = null;
  }
  createjs.Tween.removeTweens(badge);
}

function ensureChoiceDecorations(index) {
  if (index == null || index < 0) {
    return;
  }

  if (!container || !container.parent) {
    return;
  }

  var parent = container.parent;

  if (!choiceDisableOverlayArr[index]) {
    var overlay = new createjs.Shape();
    overlay.graphics
      .beginLinearGradientFill(
        ["rgba(8,14,30,0.78)", "rgba(12,20,42,0.6)"],
        [0, 1],
        -40,
        -40,
        40,
        40
      )
      .drawRoundRect(-42, -50, 130, 130, 30);
    overlay.visible = false;
    overlay.alpha = 0;
    overlay.mouseEnabled = false;
    overlay.mouseChildren = false;
    choiceDisableOverlayArr[index] = overlay;
    parent.addChild(overlay);
  }

  if (!choiceReadyPulseArr[index]) {
    var pulse = new createjs.Shape();
    pulse.graphics
      .setStrokeStyle(4)
      .beginLinearGradientStroke(
        ["rgba(120,196,255,0.8)", "rgba(120,196,255,0)"],
        [0, 1],
        0,
        -60,
        0,
        60
      )
      .drawRoundRect(-40, -48, 124, 124, 32);
    pulse.visible = false;
    pulse.alpha = 0;
    pulse.mouseEnabled = false;
    pulse.mouseChildren = false;
    choiceReadyPulseArr[index] = pulse;
    parent.addChild(pulse);
  }

  if (!choiceReadyBadgeArr[index]) {
    var badge = new createjs.Container();
    badge.mouseEnabled = false;
    badge.mouseChildren = false;

    var badgeBg = new createjs.Shape();
    badgeBg.graphics
      .beginLinearGradientFill(
        ["rgba(102,72,214,0.95)", "rgba(144,102,240,0.95)"],
        [0, 1],
        -30,
        -18,
        30,
        18
      )
      .drawRoundRect(-32, -18, 64, 36, 18);
    badge.addChild(badgeBg);

    var badgeHighlight = new createjs.Shape();
    badgeHighlight.graphics
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.35)", "rgba(255,255,255,0)"],
        [0, 1],
        -28,
        -12,
        28,
        12
      )
      .drawRoundRect(-28, -14, 56, 24, 14);
    badgeHighlight.alpha = 0.8;
    badge.addChild(badgeHighlight);

    var badgeTxt = new createjs.Text("Ready", "700 20px 'Baloo 2'", "#FDF7FF");
    badgeTxt.textAlign = "center";
    badgeTxt.textBaseline = "middle";
    badgeTxt.y = 1;
    badge.addChild(badgeTxt);

    badge.visible = false;
    badge.alpha = 0;

    choiceReadyBadgeArr[index] = badge;
    parent.addChild(badge);
  }
}

function positionChoiceDecorations(index) {
  if (!choiceArr[index]) {
    return;
  }

  if (!container || !container.parent) {
    return;
  }

  var parent = container.parent;
  var tile = choiceArr[index];
  var bg = choiceBgArr[index];
  var overlay = choiceDisableOverlayArr[index];
  var pulse = choiceReadyPulseArr[index];
  var badge = choiceReadyBadgeArr[index];
  var baseScale = tile.__baseScale || tile.scaleX || 1;
  var bgScale = bg && bg.__baseScale ? bg.__baseScale : baseScale * 1.18;

  if (overlay) {
    overlay.x = tile.x;
    overlay.y = tile.y;
    overlay.scaleX = overlay.scaleY = bgScale;
    overlay.__baseScale = bgScale;
    overlay.visible = tile.visible;
    try {
      parent.setChildIndex(overlay, parent.getChildIndex(tile) + 1);
    } catch (err) {}
  }

  if (pulse) {
    pulse.x = tile.x;
    pulse.y = tile.y;
    pulse.scaleX = pulse.scaleY = baseScale * 1.2;
    pulse.__baseScale = pulse.scaleX;
    try {
      parent.setChildIndex(pulse, parent.getChildIndex(tile) + 2);
    } catch (err) {}
  }

  if (badge) {
    var badgeOffset = 74 * baseScale;
    badge.x = tile.x;
    badge.y = tile.y - badgeOffset;
    try {
      parent.setChildIndex(badge, parent.getChildIndex(tile) + 3);
    } catch (err) {}
  }
}

function stopChoiceReadyPulse(index) {
  if (index == null) {
    return;
  }

  if (choiceReadyTweenArr[index]) {
    try {
      choiceReadyTweenArr[index].setPaused(true);
    } catch (err) {}
    choiceReadyTweenArr[index] = null;
  }

  if (choiceReadyPulseArr[index]) {
    var pulse = choiceReadyPulseArr[index];
    createjs.Tween.removeTweens(pulse);
    pulse.alpha = 0;
    pulse.visible = false;
    if (pulse.__baseScale) {
      pulse.scaleX = pulse.scaleY = pulse.__baseScale;
    }
  }
}

function hideChoiceReadyBadge(index) {
  var badge = choiceReadyBadgeArr[index];
  if (!badge) {
    return;
  }

  createjs.Tween.removeTweens(badge);
  badge.visible = false;
  badge.alpha = 0;
  badge.scaleX = badge.scaleY = 1;
}

function hideChoiceDecorations(index) {
  stopChoiceReadyPulse(index);

  var overlay = choiceDisableOverlayArr[index];
  if (overlay) {
    createjs.Tween.removeTweens(overlay);
    overlay.alpha = 0;
    overlay.visible = false;
  }

  hideChoiceReadyBadge(index);
}

function setChoiceDisabledAppearance(index) {
  if (!choiceArr[index]) {
    return;
  }

  var overlay = choiceDisableOverlayArr[index];
  var pulse = choiceReadyPulseArr[index];

  if (overlay) {
    overlay.visible = true;
    overlay.alpha = 0.62;
    if (overlay.__baseScale) {
      overlay.scaleX = overlay.scaleY = overlay.__baseScale;
    }
  }

  if (pulse) {
    createjs.Tween.removeTweens(pulse);
    pulse.alpha = 0;
    pulse.visible = false;
  }

  hideChoiceReadyBadge(index);
}

function activateChoiceReadyAppearance(index) {
  var overlay = choiceDisableOverlayArr[index];
  var pulse = choiceReadyPulseArr[index];
  var badge = choiceReadyBadgeArr[index];
  var tile = choiceArr[index];

  if (overlay) {
    createjs.Tween.get(overlay, { override: true })
      .to({ alpha: 0 }, 240, createjs.Ease.quadOut)
      .call(function () {
        overlay.visible = false;
      });
  }

  if (pulse && tile) {
    var baseScale = tile.__baseScale || tile.scaleX || 1;
    stopChoiceReadyPulse(index);
    pulse.visible = true;
    pulse.alpha = 0;
    var pulseBase = pulse.__baseScale || baseScale * 1.2;
    pulse.scaleX = pulse.scaleY = pulseBase * 0.96;
    choiceReadyTweenArr[index] = createjs.Tween.get(pulse, { loop: true })
      .to({ alpha: 0.32, scaleX: pulseBase * 1.08, scaleY: pulseBase * 1.08 }, 360, createjs.Ease.quadOut)
      .to({ alpha: 0, scaleX: pulseBase * 1.24, scaleY: pulseBase * 1.24 }, 420, createjs.Ease.quadIn);
  }

  if (badge) {
    badge.visible = true;
    badge.scaleX = badge.scaleY = 0.6;
    badge.alpha = 0;
    createjs.Tween.get(badge, { override: true })
      .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 260, createjs.Ease.backOut)
      .wait(900)
      .to({ alpha: 0 }, 220, createjs.Ease.quadIn)
      .call(function () {
        badge.visible = false;
        badge.scaleX = badge.scaleY = 1;
      });
  }
}

function resetChoiceTileVisual(index) {
  if (choiceArr[index]) {
    createjs.Tween.removeTweens(choiceArr[index]);
    var baseScale = choiceArr[index].__baseScale || choiceArr[index].scaleX || 1;
    choiceArr[index].scaleX = choiceArr[index].scaleY = baseScale;
    choiceArr[index].alpha = choiceArr[index].visible ? choiceArr[index].alpha : 1;
  }

  if (choiceBgArr[index]) {
    createjs.Tween.removeTweens(choiceBgArr[index]);
    drawChoiceTileBackground(choiceBgArr[index]);
    var bgScale = choiceBgArr[index].__baseScale || 1;
    choiceBgArr[index].scaleX = choiceBgArr[index].scaleY = bgScale;
    choiceBgArr[index].alpha = choiceBgArr[index].visible ? choiceBgArr[index].alpha : 0;
  }

  if (choiceGlowArr[index]) {
    createjs.Tween.removeTweens(choiceGlowArr[index]);
    choiceGlowArr[index].alpha = 0;
  }

  stopChoiceReadyPulse(index);
  hideChoiceReadyBadge(index);

  var overlay = choiceDisableOverlayArr[index];
  if (overlay) {
    createjs.Tween.removeTweens(overlay);
    overlay.alpha = 0;
    overlay.visible = false;
  }
}

function ensureTimeUpOverlay() {
  if (timeUpOverlay) {
    return timeUpOverlay;
  }

  if (!container || !container.parent) {
    return null;
  }

  timeUpOverlay = new createjs.Container();
  timeUpOverlay.mouseEnabled = false;
  timeUpOverlay.mouseChildren = false;
  timeUpOverlay.visible = false;
  timeUpOverlay.alpha = 0;
  timeUpOverlay.scaleX = timeUpOverlay.scaleY = 1;

  timeUpOverlayBg = new createjs.Shape();
  timeUpOverlayBg.graphics
    .beginLinearGradientFill(
      ["#3A2CCB", "#6B39F7", "#9D3FFD"],
      [0, 0.52, 1],
      0,
      -118,
      0,
      118
    )
    .drawRoundRect(-240, -104, 480, 208, 48);
  timeUpOverlayBg.shadow = new createjs.Shadow("rgba(18,14,56,0.58)", 0, 18, 44);
  timeUpOverlay.addChild(timeUpOverlayBg);

  timeUpOverlayGlass = new createjs.Shape();
  timeUpOverlayGlass.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.35)", "rgba(255,255,255,0.12)", "rgba(255,255,255,0)"],
      [0, 0.45, 1],
      0,
      -110,
      0,
      110
    )
    .drawRoundRect(-220, -92, 440, 184, 44);
  timeUpOverlayGlass.alpha = 0.88;
  timeUpOverlay.addChild(timeUpOverlayGlass);

  var timeUpOverlayOutline = new createjs.Shape();
  timeUpOverlayOutline.graphics
    .setStrokeStyle(3)
    .beginLinearGradientStroke(
      ["rgba(212,198,255,0.65)", "rgba(136,108,255,0.55)"],
      [0, 1],
      0,
      -96,
      0,
      96
    )
    .drawRoundRect(-224, -96, 448, 192, 46);
  timeUpOverlayOutline.alpha = 0.72;
  timeUpOverlay.addChild(timeUpOverlayOutline);

  timeUpOverlayShine = new createjs.Shape();
  timeUpOverlayShine.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0)"],
      [0, 0.5, 1],
      -84,
      0,
      84,
      0
    )
    .drawRoundRect(-84, -92, 168, 184, 44);
  timeUpOverlayShine.alpha = 0;
  timeUpOverlayShine.compositeOperation = "lighter";
  timeUpOverlay.addChild(timeUpOverlayShine);

  timeUpIconContainer = new createjs.Container();
  timeUpOverlay.addChild(timeUpIconContainer);

  var iconHalo = new createjs.Shape();
  iconHalo.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.52)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      86
    )
    .drawCircle(0, 4, 86);
  iconHalo.alpha = 0.38;
  timeUpIconContainer.addChild(iconHalo);

  var iconPlate = new createjs.Shape();
  iconPlate.graphics
    .beginLinearGradientFill(
      ["#5F36FF", "#7E4CFF", "#B471FF"],
      [0, 0.58, 1],
      -68,
      -68,
      68,
      68
    )
    .drawRoundRect(-68, -64, 136, 128, 46);
  iconPlate.shadow = new createjs.Shadow("rgba(15,11,48,0.5)", 0, 12, 18);
  timeUpIconContainer.addChild(iconPlate);

  var iconInset = new createjs.Shape();
  iconInset.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.32)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      -60,
      0,
      60
    )
    .drawRoundRect(-60, -56, 120, 112, 38);
  iconInset.y = -6;
  timeUpIconContainer.addChild(iconInset);

  var clockFace = new createjs.Shape();
  clockFace.graphics
    .beginRadialGradientFill(
      ["#3E2C93", "#231A66"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      52
    )
    .drawCircle(0, -4, 46);
  clockFace.shadow = new createjs.Shadow("rgba(12,10,40,0.55)", 0, 8, 14);
  timeUpIconContainer.addChild(clockFace);

  var clockRing = new createjs.Shape();
  clockRing.graphics
    .setStrokeStyle(4)
    .beginLinearGradientStroke(
      ["rgba(200,188,255,0.92)", "rgba(255,255,255,0.72)"],
      [0, 1],
      -32,
      -32,
      32,
      32
    )
    .drawCircle(0, -4, 46);
  timeUpIconContainer.addChild(clockRing);

  var clockTickMarks = new createjs.Shape();
  clockTickMarks.graphics
    .setStrokeStyle(3, "round")
    .beginStroke("rgba(255,255,255,0.42)");
  for (var i = 0; i < 12; i++) {
    var angle = (i / 12) * Math.PI * 2;
    var inner = 34;
    var outer = 42;
    clockTickMarks.graphics
      .moveTo(Math.cos(angle) * inner, -4 + Math.sin(angle) * inner)
      .lineTo(Math.cos(angle) * outer, -4 + Math.sin(angle) * outer);
  }
  clockTickMarks.alpha = 0.4;
  timeUpIconContainer.addChild(clockTickMarks);

  timeUpIconHand = new createjs.Container();
  var minuteHand = new createjs.Shape();
  minuteHand.graphics
    .setStrokeStyle(6, "round")
    .beginStroke("#F9F6FF")
    .moveTo(0, 6)
    .lineTo(0, -30);
  var hourHand = new createjs.Shape();
  hourHand.graphics
    .setStrokeStyle(6, "round")
    .beginStroke("rgba(255,255,255,0.82)")
    .moveTo(0, 6)
    .lineTo(20, -2);
  hourHand.rotation = -42;
  timeUpIconHand.addChild(minuteHand, hourHand);
  timeUpIconHand.y = -4;
  timeUpIconHand.shadow = new createjs.Shadow("rgba(12,10,40,0.6)", 0, 4, 10);
  timeUpIconHand.rotation = -26;
  timeUpIconContainer.addChild(timeUpIconHand);

  var clockHub = new createjs.Shape();
  clockHub.graphics.beginRadialGradientFill(
    ["#FFFFFF", "#E5D9FF"],
    [0, 1],
    0,
    0,
    0,
    0,
    0,
    12
  ).drawCircle(0, -4, 8);
  clockHub.shadow = new createjs.Shadow("rgba(18,16,52,0.45)", 0, 2, 4);
  timeUpIconContainer.addChild(clockHub);

  timeUpIconSpark = new createjs.Shape();
  timeUpIconSpark.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      72
    )
    .drawCircle(0, -4, 70);
  timeUpIconSpark.alpha = 0.48;
  timeUpIconSpark.compositeOperation = "lighter";
  timeUpIconContainer.addChild(timeUpIconSpark);
  timeUpIconContainer.__width = 136;
  timeUpIconContainer.__spacing = 36;

  timeUpText = new createjs.Text("Time's Up!", "800 46px 'Baloo 2'", "#FEF7FF");
  timeUpText.textAlign = "center";
  timeUpText.textBaseline = "middle";
  timeUpText.shadow = new createjs.Shadow("rgba(6,12,28,0.55)", 0, 6, 12);
  timeUpText.x = 0;
  timeUpTextGlow = timeUpText.clone();
  timeUpTextGlow.color = "#20134F";
  timeUpTextGlow.outline = 6;
  timeUpTextGlow.alpha = 0.22;
  timeUpTextGlow.shadow = null;
  timeUpOverlay.addChild(timeUpTextGlow);
  timeUpOverlay.addChild(timeUpText);

  container.parent.addChild(timeUpOverlay);
  layoutTimeUpOverlay();

  return timeUpOverlay;
}

function showGameplayTimeUpBanner(onComplete) {
  var overlay = ensureTimeUpOverlay();
  if (!overlay) {
    if (typeof onComplete === "function") {
      setTimeout(onComplete, 0);
    }
    return;
  }

  var parent = container.parent;
  if (parent) {
    parent.setChildIndex(overlay, parent.getNumChildren() - 1);
  }

  layoutTimeUpOverlay();
  overlay.scaleX = overlay.scaleY = 0.9;
  overlay.alpha = 0;
  overlay.visible = true;

  createjs.Tween.removeTweens(overlay);
  createjs.Tween.get(overlay, { override: true })
    .to({ alpha: 1, scaleX: 1.06, scaleY: 1.06 }, 280, createjs.Ease.quartOut)
    .to({ scaleX: 1, scaleY: 1 }, 220, createjs.Ease.quadInOut);

  if (timeUpOverlayGlass) {
    createjs.Tween.removeTweens(timeUpOverlayGlass);
    timeUpOverlayGlass.alpha = 0;
    createjs.Tween.get(timeUpOverlayGlass, { override: true })
      .to({ alpha: 0.78 }, 360, createjs.Ease.quadOut)
      .to({ alpha: 0.58 }, 540, createjs.Ease.quadInOut);
  }

  if (timeUpOverlayShine) {
    createjs.Tween.removeTweens(timeUpOverlayShine);
    timeUpOverlayShine.alpha = 0;
    timeUpOverlayShine.x = -176;
    createjs.Tween.get(timeUpOverlayShine, { override: true })
      .wait(60)
      .to({ alpha: 0.75 }, 220, createjs.Ease.quadOut)
      .to({ x: 176 }, 640, createjs.Ease.sineInOut)
      .to({ alpha: 0 }, 200, createjs.Ease.quadIn);
  }

  if (timeUpIconHand) {
    createjs.Tween.removeTweens(timeUpIconHand);
    timeUpIconHand.rotation = -32;
    createjs.Tween.get(timeUpIconHand, { override: true })
      .to({ rotation: 16 }, 480, createjs.Ease.quadOut)
      .to({ rotation: -8 }, 300, createjs.Ease.quadInOut);
  }

  if (timeUpIconSpark) {
    createjs.Tween.removeTweens(timeUpIconSpark);
    timeUpIconSpark.alpha = 0;
    timeUpIconSpark.scaleX = timeUpIconSpark.scaleY = 0.66;
    createjs.Tween.get(timeUpIconSpark, { override: true })
      .wait(40)
      .to({ alpha: 0.6, scaleX: 1.08, scaleY: 1.08 }, 420, createjs.Ease.quadOut)
      .to({ alpha: 0 }, 460, createjs.Ease.quadIn);
  }

  var overlayDisplayDuration = 3000;
  var overlayHoldSafetyDuration = 4000;
  var overlayCompleteFired = false;
  var overlayHideRequested = false;
  var overlayHoldTimer = null;

  function clearOverlayHoldTimer() {
    if (overlayHoldTimer) {
      clearTimeout(overlayHoldTimer);
      overlayHoldTimer = null;
    }
  }

  function requestOverlayHide() {
    if (overlayHideRequested) {
      return;
    }

    overlayHideRequested = true;
    clearOverlayHoldTimer();
    hideGameplayTimeUpBanner();
  }

  function handleOverlayDisplayComplete() {
    if (overlayCompleteFired) {
      return;
    }
    overlayCompleteFired = true;

    var doneCalled = false;

    function done() {
      if (doneCalled) {
        return;
      }

      doneCalled = true;
      requestOverlayHide();
    }

    if (typeof onComplete === "function") {
      try {
        if (onComplete.length >= 1) {
          overlayHoldTimer = setTimeout(done, overlayHoldSafetyDuration);
          var asyncResult = onComplete(done);
          if (asyncResult && typeof asyncResult.then === "function") {
            asyncResult
              .then(function () {
                done();
              })
              .catch(function (overlayCompleteError) {
                console.log(
                  "Error: time up complete handler",
                  overlayCompleteError
                );
                done();
              });
            return;
          }

          if (asyncResult === false) {
            return;
          }

          return;
        }

        var result = onComplete();
        if (result && typeof result.then === "function") {
          result
            .then(function () {
              done();
            })
            .catch(function (overlayCompleteError) {
              console.log(
                "Error: time up complete handler",
                overlayCompleteError
              );
              done();
            });
          return;
        }
      } catch (overlayCompleteError) {
        console.log("Error: time up complete handler", overlayCompleteError);
      }
    }

    done();
  }

  createjs.Tween.get(overlay)
    .wait(overlayDisplayDuration)
    .call(handleOverlayDisplayComplete);
}

function hideGameplayTimeUpBanner(force) {
  if (!timeUpOverlay) {
    return;
  }

  createjs.Tween.removeTweens(timeUpOverlay);

  if (timeUpIconHand) {
    createjs.Tween.removeTweens(timeUpIconHand);
    timeUpIconHand.rotation = -42;
  }

  if (timeUpOverlayGlass) {
    createjs.Tween.removeTweens(timeUpOverlayGlass);
    timeUpOverlayGlass.alpha = 0.7;
  }

  if (timeUpOverlayShine) {
    createjs.Tween.removeTweens(timeUpOverlayShine);
    timeUpOverlayShine.alpha = 0;
  }

  if (timeUpIconSpark) {
    createjs.Tween.removeTweens(timeUpIconSpark);
    timeUpIconSpark.alpha = 0.6;
    timeUpIconSpark.scaleX = timeUpIconSpark.scaleY = 1;
  }

  if (force) {
    timeUpOverlay.visible = false;
    timeUpOverlay.alpha = 0;
    timeUpOverlay.scaleX = timeUpOverlay.scaleY = 1;
    return;
  }

  createjs.Tween.get(timeUpOverlay, { override: true })
    .to({ alpha: 0 }, 180, createjs.Ease.quadIn)
    .call(function () {
      timeUpOverlay.visible = false;
      timeUpOverlay.scaleX = timeUpOverlay.scaleY = 1;
    });
}

var connectivityOverlay,
  connectivityOverlayBackdrop,
  connectivityOverlayCard,
  connectivityOverlayPanel,
  connectivityOverlayGlass,
  connectivityOverlayOutline,
  connectivityOverlayShine,
  connectivityOverlayAccent,
  connectivityOverlayTitle,
  connectivityOverlayDetail,
  connectivityIconWrapper,
  connectivityIconPulse,
  connectivityIconOffline,
  connectivityIconOfflineSlash,
  connectivityIconSuccess,
  connectivityIconInfo,
  connectivityOverlayClose,
  connectivityOverlayCloseGlow,
  connectivityOverlayCloseHighlight,
  connectivityOverlayCloseIcon;

var SAUIX_CONNECTIVITY_COPY = {
  default: {
    offlineTitle: "You're offline right now.",
    offlineDetail: "Check your internet connection and tap Close once you're back online.",
    completeAllTitle: "You have completed all the puzzles.",
    completeAllDetail: "Tap Close at the top to see the results.",
    completeOneTitle: "You have completed this puzzle...",
    completeOneDetail: "Tap Close at the top to continue.",
    genericTitle: "Hold on a moment...",
    genericDetail: "We're preparing the next activity for you.",
  },
  "assets/GujaratiAssets/": {
    offlineTitle: "ઈન્ટરનેટ કનેક્શન નથી. ફરી પ્રયત્ન કરો...",
    completeAllTitle:
      "તમે દરેક કોયડા ઉકેલી લીધા છે. પરિણામ જાણવા ઉપર દર્શાવેલ close પર ક્લિક કરો...",
    completeOneTitle: "તમે આ કોયડો ઉકેલી લીધો છે...",
  },
  "assets/ArabicAssets/": {
    offlineTitle: "لا يوجد اتصال بالإنترنت. حاول مرة اخرى...",
    completeAllTitle:
      "لقد أكملت جميع الألغاز. انقر على إغلاق في الأعلى لرؤية النتائج...",
    completeOneTitle: "لقد أكملت هذا اللغز...",
  },
  "assets/TamilAssets/": {
    offlineTitle: "You're offline right now.",
  },
};

function SAUIX_getConnectivityCopy(kind, lang) {
  var pack = SAUIX_CONNECTIVITY_COPY[lang] || SAUIX_CONNECTIVITY_COPY.default;
  var fallback = SAUIX_CONNECTIVITY_COPY.default;
  var keyTitle = "genericTitle";
  var keyDetail = "genericDetail";
  var iconType = "info";

  if (kind === "offline") {
    keyTitle = "offlineTitle";
    keyDetail = "offlineDetail";
    iconType = "offline";
  } else if (kind === "completeAll") {
    keyTitle = "completeAllTitle";
    keyDetail = "completeAllDetail";
    iconType = "success";
  } else if (kind === "completeOne") {
    keyTitle = "completeOneTitle";
    keyDetail = "completeOneDetail";
    iconType = "success";
  }

  var title = pack[keyTitle];
  if (!title || title === "") {
    title = fallback[keyTitle] || fallback.genericTitle;
  }

  var detail = pack[keyDetail];
  if (typeof detail !== "string") {
    detail = fallback[keyDetail] || "";
  }

  title = typeof title === "string" ? title.trim() : "";
  detail = typeof detail === "string" ? detail.trim() : "";

  return {
    title: title,
    detail: detail,
    iconType: iconType,
    language: lang,
  };
}

function ensureConnectivityOverlay(stageRef) {
  if (connectivityOverlay) {
    return connectivityOverlay;
  }

  connectivityOverlay = new createjs.Container();
  connectivityOverlay.mouseEnabled = false;
  connectivityOverlay.mouseChildren = false;
  connectivityOverlay.visible = false;
  connectivityOverlay.alpha = 0;
  connectivityOverlay.scaleX = connectivityOverlay.scaleY = 1;

  connectivityOverlayBackdrop = new createjs.Shape();
  connectivityOverlayBackdrop.alpha = 0.75;
  connectivityOverlay.addChild(connectivityOverlayBackdrop);

  connectivityOverlayCard = new createjs.Container();
  connectivityOverlayCard.mouseEnabled = false;
  connectivityOverlayCard.mouseChildren = false;
  connectivityOverlay.addChild(connectivityOverlayCard);

  connectivityOverlayPanel = new createjs.Shape();
  connectivityOverlayPanel.shadow = new createjs.Shadow(
    "rgba(12,8,40,0.55)",
    0,
    22,
    48
  );
  connectivityOverlayCard.addChild(connectivityOverlayPanel);

  connectivityOverlayGlass = new createjs.Shape();
  connectivityOverlayGlass.alpha = 0.88;
  connectivityOverlayCard.addChild(connectivityOverlayGlass);

  connectivityOverlayOutline = new createjs.Shape();
  connectivityOverlayOutline.alpha = 0.7;
  connectivityOverlayCard.addChild(connectivityOverlayOutline);

  connectivityOverlayShine = new createjs.Shape();
  connectivityOverlayShine.alpha = 0;
  connectivityOverlayShine.compositeOperation = "lighter";
  connectivityOverlayCard.addChild(connectivityOverlayShine);

  connectivityOverlayAccent = new createjs.Shape();
  connectivityOverlayCard.addChild(connectivityOverlayAccent);

  connectivityIconWrapper = new createjs.Container();
  connectivityIconWrapper.x = 0;
  connectivityIconWrapper.y = -88;
  connectivityIconWrapper.__baseY = -88;
  connectivityIconWrapper.mouseEnabled = false;
  connectivityIconWrapper.mouseChildren = false;
  connectivityOverlayCard.addChild(connectivityIconWrapper);

  var iconBackdrop = new createjs.Shape();
  iconBackdrop.graphics
    .beginRadialGradientFill(
      ["rgba(148,124,255,0.65)", "rgba(62,38,150,0)", "rgba(62,38,150,0)"],
      [0, 0.6, 1],
      0,
      0,
      0,
      0,
      0,
      104
    )
    .drawCircle(0, 4, 96);
  iconBackdrop.alpha = 0.65;
  iconBackdrop.compositeOperation = "lighter";
  connectivityIconWrapper.addChild(iconBackdrop);

  connectivityIconPulse = new createjs.Shape();
  connectivityIconPulse.graphics
    .setStrokeStyle(8)
    .beginStroke("rgba(255,255,255,0.28)")
    .drawCircle(0, 4, 66);
  connectivityIconPulse.alpha = 0.4;
  connectivityIconPulse.scaleX = connectivityIconPulse.scaleY = 0.9;
  connectivityIconWrapper.addChild(connectivityIconPulse);

  connectivityIconOffline = new createjs.Container();
  var wifiPlate = new createjs.Shape();
  wifiPlate.graphics
    .beginRadialGradientFill(
      ["#6E4BFF", "#32108E"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      60
    )
    .drawCircle(0, 0, 58);
  wifiPlate.shadow = new createjs.Shadow("rgba(14,10,44,0.65)", 0, 12, 26);
  connectivityIconOffline.addChild(wifiPlate);

  var wifiArcOuter = new createjs.Shape();
  wifiArcOuter.graphics
    .setStrokeStyle(7, "round")
    .beginStroke("rgba(248,242,255,0.92)")
    .arc(0, 10, 28, Math.PI * 1.05, Math.PI * 1.95, false);
  connectivityIconOffline.addChild(wifiArcOuter);

  var wifiArcMiddle = new createjs.Shape();
  wifiArcMiddle.graphics
    .setStrokeStyle(7, "round")
    .beginStroke("rgba(255,255,255,0.86)")
    .arc(0, 12, 18, Math.PI * 1.08, Math.PI * 1.92, false);
  connectivityIconOffline.addChild(wifiArcMiddle);

  var wifiArcInner = new createjs.Shape();
  wifiArcInner.graphics
    .setStrokeStyle(7, "round")
    .beginStroke("rgba(255,255,255,0.78)")
    .arc(0, 14, 9, Math.PI * 1.1, Math.PI * 1.9, false);
  connectivityIconOffline.addChild(wifiArcInner);

  var wifiDot = new createjs.Shape();
  wifiDot.graphics.beginFill("#FFFFFF").drawCircle(0, 22, 7);
  connectivityIconOffline.addChild(wifiDot);

  connectivityIconOfflineSlash = new createjs.Shape();
  connectivityIconOfflineSlash.graphics
    .setStrokeStyle(9, "round")
    .beginStroke("#FF8CB7")
    .moveTo(-30, -32)
    .lineTo(32, 26);
  connectivityIconOfflineSlash.shadow = new createjs.Shadow(
    "rgba(120,18,70,0.45)",
    0,
    6,
    16
  );
  connectivityIconOffline.addChild(connectivityIconOfflineSlash);

  connectivityIconWrapper.addChild(connectivityIconOffline);

  connectivityIconSuccess = new createjs.Container();
  var successPlate = new createjs.Shape();
  successPlate.graphics
    .beginRadialGradientFill(
      ["#4CE9C3", "#0A7C68"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      58
    )
    .drawCircle(0, 0, 58);
  successPlate.shadow = new createjs.Shadow("rgba(6,40,32,0.55)", 0, 12, 24);
  connectivityIconSuccess.addChild(successPlate);

  var successRing = new createjs.Shape();
  successRing.graphics
    .setStrokeStyle(5)
    .beginLinearGradientStroke(
      ["rgba(255,255,255,0.76)", "rgba(220,255,244,0.32)"],
      [0, 1],
      -30,
      -30,
      30,
      30
    )
    .drawCircle(0, 0, 50);
  connectivityIconSuccess.addChild(successRing);

  var successCheck = new createjs.Shape();
  successCheck.graphics
    .setStrokeStyle(10, "round")
    .beginStroke("#F3FFFA")
    .moveTo(-24, 6)
    .lineTo(-4, 26)
    .lineTo(30, -18);
  connectivityIconSuccess.addChild(successCheck);

  connectivityIconWrapper.addChild(connectivityIconSuccess);

  connectivityIconInfo = new createjs.Container();
  var infoPlate = new createjs.Shape();
  infoPlate.graphics
    .beginRadialGradientFill(
      ["#7A6BFF", "#241856"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      58
    )
    .drawCircle(0, 0, 58);
  infoPlate.shadow = new createjs.Shadow("rgba(8,14,40,0.52)", 0, 12, 24);
  connectivityIconInfo.addChild(infoPlate);

  var infoGlyph = new createjs.Shape();
  infoGlyph.graphics
    .beginFill("#F4F7FF")
    .drawRoundRect(-4, -18, 8, 32, 4)
    .drawCircle(0, -32, 6);
  connectivityIconInfo.addChild(infoGlyph);

  connectivityIconWrapper.addChild(connectivityIconInfo);

  connectivityOverlayTitle = new createjs.Text(
    "",
    "800 46px 'Baloo 2'",
    "#FEF9FF"
  );
  connectivityOverlayTitle.textAlign = "center";
  connectivityOverlayTitle.textBaseline = "middle";
  connectivityOverlayTitle.lineWidth = 480;
  connectivityOverlayTitle.lineHeight = 52;
  connectivityOverlayTitle.x = 0;
  connectivityOverlayTitle.y = 72;
  connectivityOverlayTitle.shadow = new createjs.Shadow(
    "rgba(10,12,32,0.55)",
    0,
    10,
    24
  );
  connectivityOverlayCard.addChild(connectivityOverlayTitle);

  connectivityOverlayDetail = new createjs.Text(
    "",
    "400 26px 'Baloo 2'",
    "rgba(240,236,255,0.92)"
  );
  connectivityOverlayDetail.textAlign = "center";
  connectivityOverlayDetail.textBaseline = "middle";
  connectivityOverlayDetail.lineWidth = 520;
  connectivityOverlayDetail.lineHeight = 34;
  connectivityOverlayDetail.x = 0;
  connectivityOverlayDetail.y = 134;
  connectivityOverlayDetail.shadow = new createjs.Shadow(
    "rgba(6,10,28,0.4)",
    0,
    6,
    18
  );
  connectivityOverlayCard.addChild(connectivityOverlayDetail);

  connectivityOverlayClose = new createjs.Container();
  connectivityOverlayClose.visible = false;
  connectivityOverlayClose.alpha = 0;
  connectivityOverlayClose.mouseChildren = false;
  connectivityOverlayClose.mouseEnabled = true;
  connectivityOverlayClose.cursor = "pointer";
  connectivityOverlayClose.__baseScale = 1;
  connectivityOverlayCard.addChild(connectivityOverlayClose);

  connectivityOverlayCloseGlow = new createjs.Shape();
  connectivityOverlayCloseGlow.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.35)", "rgba(255,255,255,0)", "rgba(255,255,255,0)"],
      [0, 0.6, 1],
      0,
      0,
      0,
      0,
      0,
      40
    )
    .drawCircle(0, 0, 40);
  connectivityOverlayCloseGlow.alpha = 0.25;
  connectivityOverlayClose.addChild(connectivityOverlayCloseGlow);

  var connectivityOverlayCloseBase = new createjs.Shape();
  connectivityOverlayCloseBase.graphics
    .beginLinearGradientFill(["#FF8A94", "#FFB15F"], [0, 1], -32, -32, 32, 32)
    .drawRoundRect(-28, -28, 56, 56, 18);
  connectivityOverlayClose.addChild(connectivityOverlayCloseBase);

  connectivityOverlayCloseHighlight = new createjs.Shape();
  connectivityOverlayCloseHighlight.graphics
    .setStrokeStyle(2)
    .beginStroke("rgba(255,255,255,0.88)")
    .drawRoundRect(-26, -26, 52, 52, 16);
  connectivityOverlayCloseHighlight.alpha = 0.85;
  connectivityOverlayClose.addChild(connectivityOverlayCloseHighlight);

  connectivityOverlayCloseIcon = new createjs.Shape();
  connectivityOverlayCloseIcon.graphics
    .setStrokeStyle(4, "round", "round")
    .beginStroke("#FFFFFF")
    .moveTo(-11, -11)
    .lineTo(11, 11)
    .moveTo(-11, 11)
    .lineTo(11, -11);
  connectivityOverlayCloseIcon.alpha = 0.92;
  connectivityOverlayClose.addChild(connectivityOverlayCloseIcon);

  var connectivityOverlayCloseHit = new createjs.Shape();
  connectivityOverlayCloseHit.graphics.beginFill("#000").drawCircle(0, 0, 32);
  connectivityOverlayClose.hitArea = connectivityOverlayCloseHit;

  connectivityOverlayClose.on("mouseover", function () {
    if (!connectivityOverlayClose.mouseEnabled) {
      return;
    }

    createjs.Tween.get(connectivityOverlayCloseHighlight, { override: true })
      .to({ alpha: 1 }, 160, createjs.Ease.quadOut);
    createjs.Tween.get(connectivityOverlayCloseGlow, { override: true })
      .to({ alpha: 0.45, scaleX: 1.05, scaleY: 1.05 }, 180, createjs.Ease.quadOut);
  });

  connectivityOverlayClose.on("mouseout", function () {
    createjs.Tween.get(connectivityOverlayCloseHighlight, { override: true })
      .to({ alpha: 0.85 }, 200, createjs.Ease.quadOut);
    createjs.Tween.get(connectivityOverlayCloseGlow, { override: true })
      .to({ alpha: 0.25, scaleX: 1, scaleY: 1 }, 220, createjs.Ease.quadOut);
  });

  connectivityOverlayClose.on("mousedown", function () {
    if (!connectivityOverlayClose.mouseEnabled) {
      return;
    }

    createjs.Tween.get(connectivityOverlayClose, { override: true })
      .to({ scaleX: 0.94, scaleY: 0.94 }, 120, createjs.Ease.quadOut);
  });

  connectivityOverlayClose.on("pressup", function () {
    createjs.Tween.get(connectivityOverlayClose, { override: true })
      .to({ scaleX: 1, scaleY: 1 }, 160, createjs.Ease.quadOut);
  });

  connectivityOverlayClose.on("click", function () {
    if (!connectivityOverlayClose.mouseEnabled) {
      return;
    }

    handleConnectivityOverlayClose();
  });

  return connectivityOverlay;
}

function handleConnectivityOverlayClose() {
  if (!connectivityOverlay) {
    return;
  }

  if (!connectivityOverlay.__active) {
    return;
  }

  var onClose = connectivityOverlay.__onClose;
  SAUIX_hideConnectivityOverlay();

  if (typeof onClose === "function") {
    try {
      onClose();
    } catch (overlayCloseError) {
      console.log("Error: connectivity overlay close callback", overlayCloseError);
    }
  }
}

function layoutConnectivityOverlay(stageRef) {
  if (!connectivityOverlay) {
    return;
  }

  var stageForLayout = stageRef;

  if (!stageForLayout) {
    if (typeof stage !== "undefined" && stage && stage.canvas) {
      stageForLayout = stage;
    } else {
      stageForLayout = connectivityOverlay.__stage || null;
    }
  }

  if (!stageForLayout || !stageForLayout.canvas) {
    return;
  }

  var width = stageForLayout.canvas.width || 1280;
  var height = stageForLayout.canvas.height || 720;

  if (typeof getLogicalCanvasWidth === "function") {
    try {
      width = getLogicalCanvasWidth();
    } catch (err) {}
  }

  if (typeof getLogicalCanvasHeight === "function") {
    try {
      height = getLogicalCanvasHeight();
    } catch (err) {}
  }

  var centerX = width / 2;
  var centerY = height / 2;

  connectivityOverlay.x = centerX;
  connectivityOverlay.y = centerY;
  connectivityOverlay.__stage = stageForLayout;

  if (connectivityOverlayBackdrop) {
    connectivityOverlayBackdrop.alpha = 0;
    connectivityOverlayBackdrop.graphics.clear();
  }

  var baseWidth = 620;
  var baseHeight = 320;
  var radius = 54;

  var scaleX = width / 1280;
  var scaleY = height / 720;
  var scale = Math.max(Math.min(Math.min(scaleX, scaleY) * 1.08, 1.25), 0.76);

  if (connectivityOverlayCard) {
    connectivityOverlayCard.scaleX = connectivityOverlayCard.scaleY = scale;
    connectivityOverlayCard.y = 0;
  }

  if (connectivityOverlayPanel) {
    connectivityOverlayPanel.graphics
      .clear()
      .beginLinearGradientFill(
        ["#26144F", "#4D2BCF", "#8A44FF"],
        [0, 0.5, 1],
        0,
        -baseHeight / 2,
        0,
        baseHeight / 2
      )
      .drawRoundRect(
        -baseWidth / 2,
        -baseHeight / 2,
        baseWidth,
        baseHeight,
        radius
      );
  }

  if (connectivityOverlayGlass) {
    connectivityOverlayGlass.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.38)", "rgba(255,255,255,0.16)", "rgba(255,255,255,0)"] ,
        [0, 0.52, 1],
        0,
        -baseHeight / 2,
        0,
        baseHeight / 2
      )
      .drawRoundRect(
        -baseWidth / 2 + 18,
        -baseHeight / 2 + 18,
        baseWidth - 36,
        baseHeight - 36,
        radius - 18
      );
  }

  if (connectivityOverlayOutline) {
    connectivityOverlayOutline.graphics
      .clear()
      .setStrokeStyle(3)
      .beginLinearGradientStroke(
        ["rgba(212,202,255,0.78)", "rgba(152,120,255,0.62)"],
        [0, 1],
        0,
        -baseHeight / 2 + 6,
        0,
        baseHeight / 2 - 6
      )
      .drawRoundRect(
        -baseWidth / 2 + 10,
        -baseHeight / 2 + 10,
        baseWidth - 20,
        baseHeight - 20,
        radius - 16
      );
  }

  if (connectivityOverlayShine) {
    connectivityOverlayShine.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0)"],
        [0, 0.45, 1],
        -baseWidth / 2,
        0,
        baseWidth / 2,
        0
      )
      .drawRoundRect(
        -baseWidth / 2 + 26,
        -baseHeight / 2 + 26,
        baseWidth - 52,
        baseHeight - 52,
        radius - 24
      );
  }

  if (connectivityOverlayAccent) {
    var accentColor = connectivityOverlayAccent.__accentColor || "rgba(255,148,220,0.9)";
    connectivityOverlayAccent.graphics
      .clear()
      .beginRadialGradientFill(
        [accentColor, "rgba(255,255,255,0.45)", "rgba(124,88,255,0)"],
        [0, 0.5, 1],
        0,
        0,
        0,
        0,
        0,
        168
      )
      .drawCircle(0, 0, 168);
    connectivityOverlayAccent.alpha = 0.68;
    connectivityOverlayAccent.x = 0;
    connectivityOverlayAccent.y = -baseHeight / 2 + 128;
  }

  if (connectivityIconWrapper) {
    connectivityIconWrapper.x = 0;
    connectivityIconWrapper.y = -baseHeight / 2 + 118;
    connectivityIconWrapper.__baseY = connectivityIconWrapper.y;
  }

  var contentWidth = baseWidth - 140;
  var hasDetail = false;
  var titleHeight = 0;
  var detailHeight = 0;

  if (connectivityOverlayTitle) {
    connectivityOverlayTitle.lineWidth = contentWidth;
    titleHeight = connectivityOverlayTitle.getMeasuredHeight() || connectivityOverlayTitle.getMeasuredLineHeight() || 0;
  }

  if (connectivityOverlayDetail) {
    connectivityOverlayDetail.lineWidth = contentWidth;
    hasDetail =
      connectivityOverlayDetail.visible &&
      typeof connectivityOverlayDetail.text === "string" &&
      connectivityOverlayDetail.text.length > 0;

    if (hasDetail) {
      detailHeight =
        connectivityOverlayDetail.getMeasuredHeight() ||
        connectivityOverlayDetail.getMeasuredLineHeight() ||
        0;
    } else {
      connectivityOverlayDetail.visible = false;
      detailHeight = 0;
    }
  }

  var titleSpacing = 22;
  var safeTop = -baseHeight / 2 + 128;
  var safeBottom = baseHeight / 2 - 30;
  var layoutStartY = safeTop;
  var contentTopEdge = null;
  var contentBottomEdge = null;

  if (connectivityOverlayTitle) {
    var resolvedTitleHeight = titleHeight > 0 ? titleHeight : 48;
    var titleCenter = layoutStartY + resolvedTitleHeight / 2;
    connectivityOverlayTitle.y = titleCenter;
    contentTopEdge = titleCenter - resolvedTitleHeight / 2;
    contentBottomEdge = titleCenter + resolvedTitleHeight / 2;
    layoutStartY += resolvedTitleHeight;
  }

  if (hasDetail && connectivityOverlayDetail) {
    layoutStartY += titleSpacing;
    var resolvedDetailHeight = detailHeight > 0 ? detailHeight : 36;
    var detailCenter = layoutStartY + resolvedDetailHeight / 2;
    connectivityOverlayDetail.y = detailCenter;
    connectivityOverlayDetail.visible = true;
    if (contentTopEdge === null) {
      contentTopEdge = detailCenter - resolvedDetailHeight / 2;
    }
    contentBottomEdge = detailCenter + resolvedDetailHeight / 2;
  }

  if (
    typeof contentTopEdge === "number" &&
    typeof contentBottomEdge === "number"
  ) {
    var requiredShift = 0;

    if (contentBottomEdge > safeBottom) {
      requiredShift = contentBottomEdge - safeBottom;
    }

    if (requiredShift > 0) {
      var maxAllowedShift = contentTopEdge - safeTop;
      if (typeof maxAllowedShift === "number") {
        if (maxAllowedShift < 0) {
          maxAllowedShift = 0;
        }
        if (requiredShift > maxAllowedShift) {
          requiredShift = maxAllowedShift;
        }
      }
    }

    if (requiredShift > 0) {
      if (connectivityOverlayTitle) {
        connectivityOverlayTitle.y -= requiredShift;
      }
      if (hasDetail && connectivityOverlayDetail) {
        connectivityOverlayDetail.y -= requiredShift;
      }
    }
  }

  if (connectivityOverlayClose) {
    connectivityOverlayClose.x = baseWidth / 2 - 52;
    connectivityOverlayClose.y = -baseHeight / 2 + 52;
  }

  if (connectivityOverlay && !connectivityOverlay.__suppressIconSync) {
    connectivityOverlay.__suppressIconSync = true;
    setConnectivityIcon(connectivityOverlay.__iconType || "offline");
    connectivityOverlay.__suppressIconSync = false;
  }
}

function setConnectivityIcon(type) {
  if (!connectivityIconWrapper) {
    return;
  }

  var iconType = type || "offline";

  if (connectivityOverlay) {
    connectivityOverlay.__iconType = iconType;
  }

  if (connectivityIconOffline) {
    connectivityIconOffline.visible = iconType === "offline";
  }

  if (connectivityIconSuccess) {
    connectivityIconSuccess.visible = iconType === "success";
  }

  if (connectivityIconInfo) {
    connectivityIconInfo.visible = iconType === "info";
  }

  if (connectivityOverlayAccent) {
    var accent = "rgba(255,148,220,0.9)";
    if (iconType === "success") {
      accent = "rgba(92,239,200,0.9)";
    } else if (iconType === "info") {
      accent = "rgba(144,166,255,0.9)";
    }

    connectivityOverlayAccent.__accentColor = accent;
    connectivityOverlayAccent.graphics.clear();
    if (connectivityOverlay) {
      connectivityOverlay.__suppressIconSync = true;
    }
    layoutConnectivityOverlay(connectivityOverlay.__stage || null);
    if (connectivityOverlay) {
      connectivityOverlay.__suppressIconSync = false;
    }
  }
}

function animateConnectivityOverlay() {
  if (!connectivityOverlay) {
    return;
  }

  createjs.Tween.removeTweens(connectivityOverlay);
  createjs.Tween.get(connectivityOverlay, { override: true })
    .set({ alpha: 0, scaleX: 0.92, scaleY: 0.92 })
    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 420, createjs.Ease.quadOut);

  if (connectivityOverlayCard) {
    createjs.Tween.removeTweens(connectivityOverlayCard);
    connectivityOverlayCard.y = 0;
    createjs.Tween.get(connectivityOverlayCard, { loop: true })
      .to({ y: -6 }, 1400, createjs.Ease.sineInOut)
      .to({ y: 0 }, 1400, createjs.Ease.sineInOut);
  }

  if (connectivityIconPulse) {
    createjs.Tween.removeTweens(connectivityIconPulse);
    connectivityIconPulse.alpha = 0.45;
    connectivityIconPulse.scaleX = connectivityIconPulse.scaleY = 0.9;
    createjs.Tween.get(connectivityIconPulse, { loop: true })
      .to({ alpha: 0, scaleX: 1.4, scaleY: 1.4 }, 1600, createjs.Ease.quadOut)
      .set({ alpha: 0.45, scaleX: 0.9, scaleY: 0.9 })
      .wait(400);
  }

  if (connectivityIconWrapper) {
    createjs.Tween.removeTweens(connectivityIconWrapper);
    var baseY =
      typeof connectivityIconWrapper.__baseY === "number"
        ? connectivityIconWrapper.__baseY
        : connectivityIconWrapper.y || 0;
    connectivityIconWrapper.y = baseY;
    createjs.Tween.get(connectivityIconWrapper, { loop: true })
      .to({ y: baseY - 8 }, 1200, createjs.Ease.sineInOut)
      .to({ y: baseY }, 1200, createjs.Ease.sineInOut);
  }

  if (connectivityOverlayShine) {
    createjs.Tween.removeTweens(connectivityOverlayShine);
    connectivityOverlayShine.alpha = 0;
    connectivityOverlayShine.x = -320;
    createjs.Tween.get(connectivityOverlayShine, { loop: true })
      .wait(260)
      .to({ alpha: 0.7, x: 320 }, 960, createjs.Ease.quadOut)
      .to({ alpha: 0 }, 520, createjs.Ease.quadIn)
      .wait(1600)
      .set({ x: -320 });
  }

  if (connectivityOverlayClose && connectivityOverlayClose.visible) {
    createjs.Tween.removeTweens(connectivityOverlayClose);
    connectivityOverlayClose.alpha = 0;
    createjs.Tween.get(connectivityOverlayClose, { override: true })
      .wait(160)
      .to({ alpha: 1 }, 220, createjs.Ease.quadOut);

    if (connectivityOverlayCloseGlow) {
      connectivityOverlayCloseGlow.alpha = 0.25;
      createjs.Tween.removeTweens(connectivityOverlayCloseGlow);
      createjs.Tween.get(connectivityOverlayCloseGlow, { override: true })
        .wait(260)
        .to({ alpha: 0.4 }, 220, createjs.Ease.quadOut)
        .to({ alpha: 0.25 }, 260, createjs.Ease.quadOut);
    }
  }
}

function SAUIX_showConnectivityOverlay(options) {
  options = options || {};
  var stageRef = options.stage;

  if (!stageRef && typeof stage !== "undefined") {
    stageRef = stage;
  }

  if (!stageRef) {
    return null;
  }

  var overlay = ensureConnectivityOverlay(stageRef);
  if (!overlay) {
    return null;
  }

  if (overlay.parent !== stageRef) {
    stageRef.addChild(overlay);
  }

  stageRef.setChildIndex(overlay, stageRef.numChildren - 1);

  if (typeof options.message === "string") {
    connectivityOverlayTitle.text = options.message;
  }

  if (typeof options.detail === "string" && options.detail.length > 0) {
    connectivityOverlayDetail.text = options.detail;
    connectivityOverlayDetail.visible = true;
  } else {
    connectivityOverlayDetail.visible = false;
    connectivityOverlayDetail.text = "";
  }

  setConnectivityIcon(options.iconType);

  var showCloseButton = options.hideClose !== true;
  if (connectivityOverlayClose) {
    connectivityOverlayClose.visible = showCloseButton;
    connectivityOverlayClose.mouseEnabled = showCloseButton;
    connectivityOverlayClose.scaleX = connectivityOverlayClose.scaleY = 1;
    connectivityOverlayClose.alpha = 0;

    if (connectivityOverlayCloseHighlight) {
      connectivityOverlayCloseHighlight.alpha = 0.85;
    }

    if (connectivityOverlayCloseGlow) {
      connectivityOverlayCloseGlow.alpha = 0.25;
      connectivityOverlayCloseGlow.scaleX = connectivityOverlayCloseGlow.scaleY = 1;
    }
  }

  overlay.__onClose =
    typeof options.onClose === "function" ? options.onClose : null;

  layoutConnectivityOverlay(stageRef);

  overlay.visible = true;
  animateConnectivityOverlay();

  if (stageRef.update) {
    try {
      stageRef.update();
    } catch (err) {}
  }

  overlay.__active = true;
  overlay.__stage = stageRef;

  return overlay;
}

function SAUIX_hideConnectivityOverlay(options) {
  options = options || {};

  if (!connectivityOverlay) {
    return;
  }

  var immediate = !!options.immediate;
  createjs.Tween.removeTweens(connectivityOverlay);

  if (connectivityOverlayCard) {
    createjs.Tween.removeTweens(connectivityOverlayCard);
    connectivityOverlayCard.y = 0;
  }

  if (connectivityIconPulse) {
    createjs.Tween.removeTweens(connectivityIconPulse);
  }

  if (connectivityIconWrapper) {
    createjs.Tween.removeTweens(connectivityIconWrapper);
    connectivityIconWrapper.y = 0;
  }

  if (connectivityOverlayShine) {
    createjs.Tween.removeTweens(connectivityOverlayShine);
    connectivityOverlayShine.alpha = 0;
  }

  if (connectivityOverlayClose) {
    createjs.Tween.removeTweens(connectivityOverlayClose);
    connectivityOverlayClose.mouseEnabled = false;
  }

  if (connectivityOverlayCloseGlow) {
    createjs.Tween.removeTweens(connectivityOverlayCloseGlow);
  }

  if (immediate) {
    connectivityOverlay.visible = false;
    connectivityOverlay.alpha = 0;
    connectivityOverlay.scaleX = connectivityOverlay.scaleY = 1;
    connectivityOverlay.__active = false;
    connectivityOverlay.__onClose = null;

    if (connectivityOverlayClose) {
      createjs.Tween.removeTweens(connectivityOverlayClose);
      connectivityOverlayClose.visible = false;
      connectivityOverlayClose.alpha = 0;
      connectivityOverlayClose.mouseEnabled = false;
    }

    if (connectivityOverlay.__stage && connectivityOverlay.__stage.update) {
      try {
        connectivityOverlay.__stage.update();
      } catch (hideUpdateErrorImmediate) {}
    }
    return;
  }

  createjs.Tween.get(connectivityOverlay, { override: true })
    .to({ alpha: 0, scaleX: 0.97, scaleY: 0.97 }, 220, createjs.Ease.quadIn)
    .call(function () {
      connectivityOverlay.visible = false;
      connectivityOverlay.scaleX = connectivityOverlay.scaleY = 1;
      connectivityOverlay.__active = false;
      connectivityOverlay.__onClose = null;

      if (connectivityOverlayClose) {
        connectivityOverlayClose.visible = false;
        connectivityOverlayClose.alpha = 0;
        connectivityOverlayClose.mouseEnabled = false;
      }

      if (connectivityOverlay.__stage && connectivityOverlay.__stage.update) {
        try {
          connectivityOverlay.__stage.update();
        } catch (hideUpdateError) {}
      }
    });
}

function SAUIX_refreshConnectivityOverlayLayout(stageRef) {
  if (!connectivityOverlay || !connectivityOverlay.visible) {
    return;
  }

  layoutConnectivityOverlay(stageRef || connectivityOverlay.__stage || null);
}



function renderQuestionCardBackground() {
  if (!questionCardBackground) {
    return;
  }

  var halfWidth = QUESTION_CARD_WIDTH / 2;
  var halfHeight = QUESTION_CARD_HEIGHT / 2;

  questionCardBackground.graphics
    .clear()
    .setStrokeStyle(6, "round", "round")
    .beginLinearGradientStroke(
      ["rgba(233,222,255,0.85)", "rgba(146,122,255,0.6)"],
      [0, 1],
      -halfWidth,
      -halfHeight,
      halfWidth,
      halfHeight
    )
    .beginLinearGradientFill(
      ["rgba(120,89,235,0.98)", "rgba(54,30,132,0.98)"],
      [0, 1],
      -halfWidth,
      -halfHeight,
      halfWidth,
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
    var highlightPaddingX = 32;
    var highlightPaddingY = 26;
    var highlightWidth = QUESTION_CARD_WIDTH - highlightPaddingX * 2;
    var highlightHeight = QUESTION_CARD_HEIGHT - highlightPaddingY * 2;
    var highlightHalfWidth = highlightWidth / 2;
    var highlightHalfHeight = highlightHeight / 2;

    questionCardHighlight.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.34)", "rgba(255,255,255,0.02)"],
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
        Math.max(QUESTION_CARD_CORNER_RADIUS - 2, 18)
      );
    questionCardHighlight.alpha = 0.66;
  }
}

function ensureQuestionCard() {
  if (!container || !container.parent) {
    return;
  }

  if (!questionCardContainer) {
    questionCardContainer = new createjs.Container();
    questionCardContainer.x = canvas.width / 2;
    questionCardContainer.y = 288;
    questionCardContainer.alpha = 0;
    questionCardContainer.visible = false;
    questionCardContainer.mouseEnabled = false;
    questionCardContainer.mouseChildren = false;

    questionCardShadow = new createjs.Shape();
    var shadowWidth = QUESTION_CARD_WIDTH + 64;
    var shadowHeight = QUESTION_CARD_HEIGHT + 26;
    var shadowHalfWidth = shadowWidth / 2;
    var shadowHalfHeight = shadowHeight / 2;
    questionCardShadow.graphics
      .beginFill("rgba(8,18,36,0.32)")
      .drawRoundRect(
        -shadowHalfWidth,
        -shadowHalfHeight,
        shadowWidth,
        shadowHeight,
        QUESTION_CARD_CORNER_RADIUS + 10
      );
    questionCardShadow.y = 1;
    questionCardShadow.alpha = 0.32;
    questionCardContainer.addChild(questionCardShadow);

    questionCardBackground = new createjs.Shape();
    questionCardContainer.addChild(questionCardBackground);

    questionCardHighlight = new createjs.Shape();
    questionCardContainer.addChild(questionCardHighlight);

    renderQuestionCardBackground();

    question = new createjs.Text("", "800 80px 'Baloo 2'", "#F4FAFF");
    question.textAlign = "center";
    question.textBaseline = "middle";
    question.x = 0;
    question.y = 0;
    question.lineWidth = QUESTION_CARD_WIDTH - 120;
    question.lineHeight = 62;
    question.shadow = new createjs.Shadow("rgba(5,12,28,0.5)", 0, 10, 26);

    questionCardContainer.addChild(question);

    questionSubtitle = new createjs.Text(
      "",
      "500 26px 'Baloo 2'",
      "#C6D7FF"
    );
    questionSubtitle.textAlign = "center";
    questionSubtitle.textBaseline = "middle";
    questionSubtitle.x = 0;

    questionSubtitle.y = 0;
    questionSubtitle.lineWidth = QUESTION_CARD_WIDTH - 160;
    questionSubtitle.alpha = 0.9;
    questionSubtitle.shadow = new createjs.Shadow("rgba(5,12,28,0.32)", 0, 6, 14);
    questionCardContainer.addChild(questionSubtitle);

    layoutQuestionCardContents();

  }

  if (!questionCardContainer.parent || questionCardContainer.parent !== container.parent) {
    container.parent.addChild(questionCardContainer);
  }


  layoutQuestionCardContents();

}




function getTextBlockHeight(textField) {
  if (!textField) {
    return 0;
  }

  var measuredHeight = 0;

  if (typeof textField.getMeasuredHeight === "function") {
    measuredHeight = textField.getMeasuredHeight() || 0;
  }

  if (!measuredHeight) {
    var lineHeight = textField.lineHeight;

    if (!lineHeight && typeof textField.getMeasuredLineHeight === "function") {
      lineHeight = textField.getMeasuredLineHeight();
    }

    if (lineHeight) {
      var textValue = textField.text || "";
      var lines = textValue ? textValue.split(/\r?\n/) : [textValue];
      var visibleLineCount = 0;

      for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== "" || visibleLineCount > 0) {
          visibleLineCount++;
        }
      }

      if (!visibleLineCount) {
        visibleLineCount = 1;
      }

      measuredHeight = lineHeight * visibleLineCount;
    }
  }

  return measuredHeight;
}

function layoutQuestionCardContents() {
  if (!questionCardContainer || !question) {
    return;
  }

  var questionHeight = getTextBlockHeight(question);
  var subtitleHeight = 0;
  var hasSubtitle = false;

  if (questionSubtitle) {
    var subtitleText = questionSubtitle.text != null ? String(questionSubtitle.text) : "";
    hasSubtitle = subtitleText.trim().length > 0;

    if (hasSubtitle) {
      questionSubtitle.visible = true;
      subtitleHeight = getTextBlockHeight(questionSubtitle);
    } else {
      questionSubtitle.visible = false;
    }
  }

  var spacing = hasSubtitle ? 24 : 0;
  var totalHeight = questionHeight + subtitleHeight + spacing;
  var topY = -totalHeight / 2;

  if (!questionHeight) {
    question.y = 0;
  } else {
    question.y = Math.round(topY + questionHeight / 2);
  }

  if (questionSubtitle && hasSubtitle) {
    questionSubtitle.y = Math.round(
      question.y + questionHeight / 2 + spacing + subtitleHeight / 2
    );
  }
}

function emphasizeChoiceTile(index, isHover) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var glow = choiceGlowArr[index];
    var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;

    var baseScale = tile && tile.__baseScale ? tile.__baseScale : tile ? tile.scaleX : 1;
    var bgBase = bg && bg.__baseScale ? bg.__baseScale : 1;
    var hoverScale = isHover ? 1.06 : 1;

    if (bg) {
      drawChoiceTileBackground(bg, isHover ? CHOICE_TILE_HOVER_COLORS : CHOICE_TILE_BASE_COLORS);
      createjs.Tween.get(bg, { override: true })
        .to({ scaleX: bgBase * hoverScale, scaleY: bgBase * hoverScale, alpha: isHover ? 1 : 0.95 }, 160, createjs.Ease.quadOut);
    }

    if (tile) {
      createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * (isHover ? 1.05 : 1), scaleY: baseScale * (isHover ? 1.05 : 1) }, 160, createjs.Ease.quadOut);
    }

    if (glow) {
      createjs.Tween.get(glow, { override: true })
        .to({ alpha: isHover ? 0.52 : 0.38 }, 160, createjs.Ease.quadOut);
    }

    if (pulse) {
      pulse.visible = true;
      var pulseScale = pulse.__baseScale || baseScale;
      createjs.Tween.get(pulse, { override: true })
        .to({
          alpha: isHover ? 0.88 : 0.7,
          scaleX: pulseScale * (isHover ? 1.06 : 1),
          scaleY: pulseScale * (isHover ? 1.06 : 1)
        }, 180, createjs.Ease.quadOut);
    }
  }

function pressChoiceTile(index) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;

    if (tile) {
      var baseScale = tile.__baseScale || tile.scaleX;
      createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * 0.94, scaleY: baseScale * 0.94 }, 90, createjs.Ease.quadOut);
    }

    if (bg) {
      var bgBase = bg.__baseScale || 1;
      createjs.Tween.get(bg, { override: true })
        .to({ scaleX: bgBase * 0.96, scaleY: bgBase * 0.96, alpha: 1 }, 90, createjs.Ease.quadOut);
    }

    if (pulse) {
      var pulseScale = pulse.__baseScale || (tile ? tile.__baseScale || tile.scaleX : 1);
      createjs.Tween.get(pulse, { override: true })
        .to({ alpha: 0.4, scaleX: pulseScale * 0.9, scaleY: pulseScale * 0.9 }, 90, createjs.Ease.quadOut);
    }
  }

function releaseChoiceTile(index) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;

    if (tile) {
      var baseScale = tile.__baseScale || tile.scaleX;
      createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04 }, 120, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 150, createjs.Ease.quadIn);
    }

    if (bg) {
      var bgBase = bg.__baseScale || 1;
      createjs.Tween.get(bg, { override: true })
        .to({ scaleX: bgBase * 1.03, scaleY: bgBase * 1.03 }, 120, createjs.Ease.quadOut)
        .to({ scaleX: bgBase, scaleY: bgBase }, 150, createjs.Ease.quadIn);
    }

    if (pulse) {
      var pulseScale = pulse.__baseScale || (tile ? tile.__baseScale || tile.scaleX : 1);
      createjs.Tween.get(pulse, { override: true })
        .to({ alpha: 0.82, scaleX: pulseScale * 1.05, scaleY: pulseScale * 1.05 }, 120, createjs.Ease.quadOut)
        .to({ alpha: 0.7, scaleX: pulseScale, scaleY: pulseScale }, 160, createjs.Ease.quadIn);
    }
  }

function markChoiceResult(index, isCorrect) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var glow = choiceGlowArr[index];
    var overlay = typeof choiceDisabledOverlayArr !== "undefined" ? choiceDisabledOverlayArr[index] : null;
    var badge = typeof choiceReadyBadgeArr !== "undefined" ? choiceReadyBadgeArr[index] : null;
    var colors = isCorrect ? CHOICE_TILE_CORRECT_COLORS : CHOICE_TILE_WRONG_COLORS;

    stopChoiceIdleAnimation(index);
    if (badge) {
      stopChoiceReadyBadgeAnimation(badge);
      badge.visible = false;
      badge.alpha = 0;
    }

    if (bg) {
      drawChoiceTileBackground(bg, colors);
      var bgBase = bg.__baseScale || 1;
      createjs.Tween.get(bg, { override: true })
        .to({ scaleX: bgBase * 1.05, scaleY: bgBase * 1.05, alpha: 1 }, 160, createjs.Ease.quadOut)
        .to({ scaleX: bgBase, scaleY: bgBase }, 200, createjs.Ease.quadOut)
        .wait(680)
        .call(function () {
          drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
        });
    }

    if (tile) {
      var baseScale = tile.__baseScale || tile.scaleX;
      createjs.Tween.get(tile, { override: true })
        .to({ scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 160, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale, alpha: isCorrect ? 1 : 0.5 }, 220, createjs.Ease.quadOut);
    }

    if (glow) {
      createjs.Tween.get(glow, { override: true })
        .to({ alpha: isCorrect ? 0.5 : 0.2 }, 180, createjs.Ease.quadOut)
        .wait(isCorrect ? 520 : 760)
        .to({ alpha: 0.38 }, 220, createjs.Ease.quadOut);
    }

    if (typeof choicePulseArr !== "undefined" && choicePulseArr[index]) {
      var pulse = choicePulseArr[index];
      createjs.Tween.get(pulse, { override: true })
        .to({ alpha: 0 }, 200, createjs.Ease.quadOut);
    }

    if (overlay) {
      createjs.Tween.get(overlay, { override: true })
        .to({ alpha: 0, visible: false }, 140);
    }
  }

function animateClueSlotFill(index, isCorrect) {
    var bg = clueBgArr[index];
    if (!bg) {
      return;
    }

    var baseScale = bg.__baseScale || 1;
    var colors = isCorrect ? CLUE_SLOT_SUCCESS_COLORS : CLUE_SLOT_ERROR_COLORS;

    drawClueSlotBackground(bg, colors);
    createjs.Tween.get(bg, { override: true })
      .to({ scaleX: baseScale * 1.08, scaleY: baseScale * 1.08, alpha: 1 }, 160, createjs.Ease.quadOut)
      .to({ scaleX: baseScale, scaleY: baseScale }, 220, createjs.Ease.quadOut)
      .wait(isCorrect ? 800 : 1200)
      .call(function () {
        drawClueSlotBackground(bg, CLUE_SLOT_BASE_COLORS);
      });
  }

function detachChoiceInteractions(index) {
  var tile = choiceMcArr && choiceMcArr[index] ? choiceMcArr[index] : choiceArr[index];
  if (!tile) {
    return;
  }

  if (tile.__hoverListener) {
    tile.off("mouseover", tile.__hoverListener);
    tile.__hoverListener = null;
  }
  if (tile.__outListener) {
    tile.off("mouseout", tile.__outListener);
    tile.__outListener = null;
  }
  if (tile.__downListener) {
    tile.off("mousedown", tile.__downListener);
    tile.__downListener = null;
  }
  if (tile.__upListener) {
    tile.off("pressup", tile.__upListener);
    tile.__upListener = null;
  }
}

function attachChoiceInteractions(index) {
  var tile = choiceMcArr && choiceMcArr[index] ? choiceMcArr[index] : choiceArr[index];
  if (!tile) {
    return;
  }

  detachChoiceInteractions(index);

  tile.__hoverListener = tile.on("mouseover", function () {
    stopChoiceIdleAnimation(index);
    emphasizeChoiceTile(index, true);
  });
  tile.__outListener = tile.on("mouseout", function () {
    emphasizeChoiceTile(index, false);
    var resumeTarget = choiceArr[index];
    if (resumeTarget) {
      createjs.Tween.get(resumeTarget, { override: false })
        .wait(200)
        .call(function () {
          startChoiceIdleAnimation(index, true);
        });
    } else {
      startChoiceIdleAnimation(index, true);
    }
  });
  tile.__downListener = tile.on("mousedown", function () {
    pressChoiceTile(index);
  });
  tile.__upListener = tile.on("pressup", function () {
    releaseChoiceTile(index);
  });
}

function startChoiceIdleAnimation(index, force) {
  if (typeof index !== "number" || index < 0) {
    return;
  }

  if (!force && choiceIdleStates[index]) {
    return;
  }

  var label = choiceArr[index];
  if (!label) {
    return;
  }

  if (force) {
    stopChoiceIdleAnimation(index);
  }

  var baseScale = label.__baseScale || label.scaleX || 1;
  label.scaleX = baseScale;
  label.scaleY = baseScale;

  createjs.Tween.removeTweens(label);
  var idleLabelTween = createjs.Tween.get(label, { loop: true, override: false })
    .wait((index % 3) * 80)
    .to({ scaleX: baseScale * 1.06, scaleY: baseScale * 0.96 }, 360, createjs.Ease.sineOut)
    .to({ scaleX: baseScale * 0.98, scaleY: baseScale * 1.02 }, 360, createjs.Ease.sineInOut)
    .to({ scaleX: baseScale, scaleY: baseScale }, 320, createjs.Ease.sineInOut);
  label.__idleTween = idleLabelTween;

  var tileContainer = typeof choiceMcArr !== "undefined" && choiceMcArr[index] ? choiceMcArr[index] : null;
  if (tileContainer) {
    createjs.Tween.removeTweens(tileContainer);
    var baseY = typeof tileContainer.__targetY === "number" ? tileContainer.__targetY : tileContainer.y;
    tileContainer.__idleBaseY = baseY;
    tileContainer.y = baseY;
    tileContainer.__idleTween = createjs.Tween.get(tileContainer, { loop: true, override: false })
      .wait((index % 3) * 90)
      .to({ y: baseY - 10 }, 360, createjs.Ease.sineOut)
      .to({ y: baseY }, 420, createjs.Ease.sineInOut);
  }

  var bg = choiceBgArr[index];
  if (bg) {
    createjs.Tween.removeTweens(bg);
    var bgScale = bg.__baseScale || bg.scaleX || 1;
    bg.scaleX = bgScale;
    bg.scaleY = bgScale;
    bg.__idleTween = createjs.Tween.get(bg, { loop: true, override: false })
      .wait((index % 3) * 80 + 120)
      .to({ scaleX: bgScale * 1.06, scaleY: bgScale * 1.06 }, 360, createjs.Ease.sineOut)
      .to({ scaleX: bgScale * 0.97, scaleY: bgScale * 0.97 }, 320, createjs.Ease.sineInOut)
      .to({ scaleX: bgScale, scaleY: bgScale }, 320, createjs.Ease.sineOut);
  }

  var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;
  if (pulse) {
    var pulseScale = pulse.__baseScale || baseScale;
    createjs.Tween.removeTweens(pulse);
    pulse.visible = true;
    pulse.alpha = 0.78;
    pulse.scaleX = pulseScale;
    pulse.scaleY = pulseScale;
    pulse.__idleTween = createjs.Tween.get(pulse, { loop: true, override: false })
      .wait((index % 4) * 100)
      .to({ scaleX: pulseScale * 1.18, scaleY: pulseScale * 1.18, alpha: 0.92 }, 420, createjs.Ease.quadOut)
      .to({ scaleX: pulseScale * 1.32, scaleY: pulseScale * 1.32, alpha: 0 }, 320, createjs.Ease.quadIn)
      .call(function () {
        pulse.alpha = 0.78;
        pulse.scaleX = pulse.scaleY = pulseScale;
      });
  }

  var glow = choiceGlowArr[index];
  if (glow) {
    createjs.Tween.removeTweens(glow);
    var glowTargetScale = glow.__targetScale || baseScale * 1.3;
    glow.scaleX = glow.scaleY = glowTargetScale;
    var baseAlpha = glow.alpha && glow.alpha > 0 ? glow.alpha : 0.42;
    glow.alpha = baseAlpha;
    glow.__idleTween = createjs.Tween.get(glow, { loop: true, override: false })
      .wait((index % 3) * 110)
      .to({ alpha: Math.min(0.62, baseAlpha + 0.2) }, 360, createjs.Ease.sineInOut)
      .to({ alpha: baseAlpha }, 360, createjs.Ease.sineInOut);
  }

  choiceIdleStates[index] = true;
}

function stopChoiceIdleAnimation(index) {
  if (typeof index !== "number" || index < 0) {
    return;
  }

  choiceIdleStates[index] = false;

  var baseScale = 1;
  var label = choiceArr[index];
  if (label) {
    createjs.Tween.removeTweens(label);
    baseScale = label.__baseScale || label.scaleX || 1;
    label.scaleX = baseScale;
    label.scaleY = baseScale;
    label.__idleTween = null;
  }

  var tileContainer = typeof choiceMcArr !== "undefined" && choiceMcArr[index] ? choiceMcArr[index] : null;
  if (tileContainer) {
    createjs.Tween.removeTweens(tileContainer);
    if (typeof tileContainer.__idleBaseY === "number") {
      tileContainer.y = tileContainer.__idleBaseY;
    }
    tileContainer.__idleTween = null;
  }

  var bg = choiceBgArr[index];
  if (bg) {
    createjs.Tween.removeTweens(bg);
    var bgScale = bg.__baseScale || bg.scaleX || 1;
    bg.scaleX = bgScale;
    bg.scaleY = bgScale;
    bg.__idleTween = null;
  }

  var glow = choiceGlowArr[index];
  if (glow) {
    createjs.Tween.removeTweens(glow);
    var glowScale = glow.__targetScale || baseScale * 1.3;
    glow.scaleX = glow.scaleY = glowScale;
    glow.alpha = 0.38;
    glow.__idleTween = null;
  }

  if (typeof choicePulseArr !== "undefined" && choicePulseArr[index]) {
    var pulse = choicePulseArr[index];
    createjs.Tween.removeTweens(pulse);
    pulse.visible = false;
    pulse.alpha = 0;
    var pulseBase = pulse.__baseScale || (label ? label.__baseScale || label.scaleX || 1 : 1);
    pulse.scaleX = pulse.scaleY = pulseBase;
    pulse.__idleTween = null;
  }

  if (typeof choiceReadyBadgeArr !== "undefined") {
    var badge = choiceReadyBadgeArr[index];
    if (badge) {
      stopChoiceReadyBadgeAnimation(badge);
      badge.visible = false;
      badge.alpha = 0;
    }
  }
}

function setChoiceInteractiveState(index, isInteractive, options) {
  options = options || {};
  var immediate = !!options.immediate;

  var tile = choiceArr[index];
  var bg = choiceBgArr[index];
  var glow = choiceGlowArr[index];
  var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;
  var overlay = typeof choiceDisabledOverlayArr !== "undefined" ? choiceDisabledOverlayArr[index] : null;
  var badge = typeof choiceReadyBadgeArr !== "undefined" ? choiceReadyBadgeArr[index] : null;

  if (!tile && !bg && !overlay) {
    return;
  }

  var baseScale = tile && (tile.__baseScale || tile.scaleX) ? tile.__baseScale || tile.scaleX : 1;
  var bgScale = bg && (bg.__baseScale || bg.scaleX) ? bg.__baseScale || bg.scaleX : baseScale * 1.12;

  if (isInteractive) {
    if (bg) {
      drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
      if (immediate) {
        bg.alpha = 0.95;
        bg.scaleX = bgScale;
        bg.scaleY = bgScale;
      } else {
        createjs.Tween.get(bg, { override: true })
          .to({ alpha: 0.96, scaleX: bgScale, scaleY: bgScale }, 220, createjs.Ease.quadOut);
      }
    }
    if (tile) {
      if (immediate) {
        tile.alpha = 1;
      } else {
        createjs.Tween.get(tile, { override: true }).to({ alpha: 1 }, 200, createjs.Ease.quadOut);
      }
    }
    if (glow) {
      glow.visible = true;
      if (immediate) {
        glow.alpha = Math.max(0.38, glow.alpha || 0.38);
      } else {
        createjs.Tween.get(glow, { override: true })
          .to({ alpha: 0.42 }, 220, createjs.Ease.quadOut);
      }
    }
    if (pulse) {
      pulse.visible = true;
      var pulseScale = pulse.__baseScale || baseScale;
      if (immediate) {
        pulse.alpha = 0.75;
        pulse.scaleX = pulseScale;
        pulse.scaleY = pulseScale;
      } else {
        pulse.alpha = 0;
        pulse.scaleX = pulse.scaleY = pulseScale * 0.88;
        createjs.Tween.get(pulse, { override: true })
          .to({ alpha: 0.78, scaleX: pulseScale, scaleY: pulseScale }, 240, createjs.Ease.quadOut);
      }
    }
    if (overlay) {
      createjs.Tween.get(overlay, { override: true })
        .to({ alpha: 0 }, 180, createjs.Ease.quadOut)
        .call(function () {
          overlay.visible = false;
        });
    }
    if (badge && !options.suppressBadge) {
      badge.visible = true;
      var badgeScale = badge.__baseScale || badge.scaleX || 1;
      badge.scaleX = badge.scaleY = badgeScale * (immediate ? 1 : 0.7);
      badge.alpha = immediate ? 1 : 0;
      createjs.Tween.removeTweens(badge);
      if (immediate) {
        badge.alpha = 1;
        badge.scaleX = badge.scaleY = badgeScale;
        startChoiceReadyBadgeAnimation(badge);
      } else {
        createjs.Tween.get(badge, { override: true })
          .to({ alpha: 1, scaleX: badgeScale, scaleY: badgeScale }, 260, createjs.Ease.backOut)
          .call(function () {
            startChoiceReadyBadgeAnimation(badge);
          });
      }
    }
  } else {
    stopChoiceIdleAnimation(index);
    if (badge) {
      stopChoiceReadyBadgeAnimation(badge);
      badge.visible = false;
      badge.alpha = 0;
    }
    if (bg) {
      drawChoiceTileBackground(bg, CHOICE_TILE_DISABLED_COLORS);
      if (immediate) {
        bg.alpha = 0.62;
        bg.scaleX = bgScale;
        bg.scaleY = bgScale;
      } else {
        createjs.Tween.get(bg, { override: true })
          .to({ alpha: 0.62, scaleX: bgScale, scaleY: bgScale }, 180, createjs.Ease.quadOut);
      }
    }
    if (tile) {
      if (immediate) {
        tile.alpha = 0.58;
      } else {
        createjs.Tween.get(tile, { override: true })
          .to({ alpha: 0.58 }, 160, createjs.Ease.quadOut);
      }
    }
    if (glow) {
      createjs.Tween.get(glow, { override: true })
        .to({ alpha: 0.22 }, 160, createjs.Ease.quadOut);
    }
    if (pulse) {
      createjs.Tween.removeTweens(pulse);
      pulse.visible = false;
      pulse.alpha = 0;
    }
    if (overlay) {
      drawChoiceDisabledOverlay(overlay);
      overlay.visible = true;
      if (immediate) {
        overlay.alpha = 0.78;
      } else {
        overlay.alpha = 0;
        createjs.Tween.get(overlay, { override: true })
          .to({ alpha: 0.78 }, 180, createjs.Ease.quadOut);
      }
    }
  }
}

function resetChoiceTileTweens(index) {
  var tile = choiceArr[index];
  var bg = choiceBgArr[index];
  var glow = choiceGlowArr[index];
  var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;
  var overlay = typeof choiceDisabledOverlayArr !== "undefined" ? choiceDisabledOverlayArr[index] : null;
  var badge = typeof choiceReadyBadgeArr !== "undefined" ? choiceReadyBadgeArr[index] : null;

  if (tile) {
    createjs.Tween.removeTweens(tile);
  }
  if (bg) {
    createjs.Tween.removeTweens(bg);
  }
  if (glow) {
    createjs.Tween.removeTweens(glow);
  }
  if (pulse) {
    createjs.Tween.removeTweens(pulse);
  }
  if (overlay) {
    createjs.Tween.removeTweens(overlay);
  }
  if (badge) {
    stopChoiceReadyBadgeAnimation(badge);
    createjs.Tween.removeTweens(badge);
  }
}

if (typeof window !== "undefined") {
  window.SA_setChoiceInteractiveState = setChoiceInteractiveState;
  window.SA_resetChoiceTileTweens = resetChoiceTileTweens;
  window.SA_buildChoiceReadyBadge = buildChoiceReadyBadge;
  window.SA_drawChoiceDisabledOverlay = drawChoiceDisabledOverlay;
  window.SA_stopChoiceReadyBadgeAnimation = stopChoiceReadyBadgeAnimation;
}
  
  function renderQuestionCardBackground_htp() {
  if (!questionCardBackground_htp) {
    return;
  }

  var halfWidth = QUESTION_CARD_WIDTH / 2;
  var halfHeight = QUESTION_CARD_HEIGHT / 2;

  questionCardBackground_htp.graphics
    .clear()
    .setStrokeStyle(6, "round", "round")
    .beginLinearGradientStroke(
      ["rgba(233,222,255,0.85)", "rgba(146,122,255,0.6)"],
      [0, 1],
      -halfWidth,
      -halfHeight,
      halfWidth,
      halfHeight
    )
    .beginLinearGradientFill(
      ["rgba(120,89,235,0.98)", "rgba(54,30,132,0.98)"],
      [0, 1],
      -halfWidth,
      -halfHeight,
      halfWidth,
      halfHeight
    )
    .drawRoundRect(
      -halfWidth,
      -halfHeight,
      QUESTION_CARD_WIDTH,
      QUESTION_CARD_HEIGHT,
      QUESTION_CARD_CORNER_RADIUS + 6
    );

  if (questionCardHighlight_htp) {
    var highlightPaddingX = 32;
    var highlightPaddingY = 26;
    var highlightWidth = QUESTION_CARD_WIDTH - highlightPaddingX * 2;
    var highlightHeight = QUESTION_CARD_HEIGHT - highlightPaddingY * 2;
    var highlightHalfWidth = highlightWidth / 2;
    var highlightHalfHeight = highlightHeight / 2;

    questionCardHighlight_htp.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.34)", "rgba(255,255,255,0.02)"],
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
        Math.max(QUESTION_CARD_CORNER_RADIUS - 2, 18)
      );
    questionCardHighlight_htp.alpha = 0.66;
  }
}

function createAmbientBackground() {
  if (!ambientLayer || !canvas) {
    return;
  }

  ambientLayer.removeAllChildren();
  ambientLayer.mouseEnabled = false;
  ambientLayer.mouseChildren = false;

  if (!ambientGradientLayer) {
    ambientGradientLayer = new createjs.Container();
  } else {
    ambientGradientLayer.removeAllChildren();
  }

  if (!ambientAuroraLayer) {
    ambientAuroraLayer = new createjs.Container();
  } else {
    ambientAuroraLayer.removeAllChildren();
  }

  if (!ambientSparkLayer) {
    ambientSparkLayer = new createjs.Container();
  } else {
    ambientSparkLayer.removeAllChildren();
  }

  ambientLayer.addChild(ambientGradientLayer);
  ambientLayer.addChild(ambientAuroraLayer);
  ambientLayer.addChild(ambientSparkLayer);

  var gradientShape = new createjs.Shape();
  gradientShape.graphics
    .beginLinearGradientFill(
      ["#3c4cf7", "#6a6fff", "#a56bff"],
      [0, 0.55, 1],
      0,
      0,
      0,
      canvas.height
    )
    .drawRect(0, 0, canvas.width, canvas.height);
  gradientShape.alpha = 0.9;
  ambientGradientLayer.addChild(gradientShape);

  var topGlow = new createjs.Shape();
  topGlow.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.24)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      0,
      canvas.height * 0.65
    )
    .drawRect(0, 0, canvas.width, canvas.height * 0.65);
  topGlow.alpha = 0.6;
  ambientGradientLayer.addChild(topGlow);

  var centerHighlight = new createjs.Shape();
  centerHighlight.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.32)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      Math.max(canvas.width, canvas.height) * 0.18,
      0,
      0,
      Math.max(canvas.width, canvas.height) * 0.68
    )
    .drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  centerHighlight.x = canvas.width * 0.5;
  centerHighlight.y = canvas.height * 0.48;
  centerHighlight.alpha = 0.75;
  centerHighlight.compositeOperation = "lighter";
  ambientGradientLayer.addChild(centerHighlight);

  var bottomSheen = new createjs.Shape();
  bottomSheen.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.12)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      0,
      -canvas.height * 0.5
    )
    .drawRect(0, 0, canvas.width, canvas.height * 0.5);
  bottomSheen.y = canvas.height * 0.5;
  bottomSheen.alpha = 0.5;
  ambientGradientLayer.addChild(bottomSheen);
}


function createAmbientConstellation() {
  var cluster = new createjs.Container();
  cluster.mouseEnabled = false;
  cluster.mouseChildren = false;

  if (!canvas) {
    return cluster;
  }

  var nodeCount = 3 + Math.floor(Math.random() * 3);
  var radius = 40 + Math.random() * 80;
  var baseAngle = Math.random() * Math.PI * 2;
  var spread = 0.4 + Math.random() * 0.35;
  var points = [];

  for (var i = 0; i < nodeCount; i++) {
    var angle = baseAngle + i * spread * Math.PI;
    var distance = radius * (0.6 + Math.random() * 0.8);
    points.push({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    });
  }

  var line = new createjs.Shape();
  var graphics = line.graphics;
  graphics.setStrokeStyle(1.6);
  graphics.beginLinearGradientStroke(
    ["rgba(194, 220, 255, 0.85)", "rgba(194, 220, 255, 0)"],
    [0, 1],
    -radius,
    -radius,
    radius,
    radius
  );

  for (var p = 0; p < points.length; p++) {
    var point = points[p];
    if (p === 0) {
      graphics.moveTo(point.x, point.y);
    } else {
      graphics.lineTo(point.x, point.y);
    }
  }

  graphics.endStroke();
  line.alpha = 0.75;
  line.compositeOperation = "lighter";
  cluster.addChild(line);

  for (var n = 0; n < points.length; n++) {
    var node = new createjs.Container();
    var nodePoint = points[n];
    node.x = nodePoint.x;
    node.y = nodePoint.y;

    var glowRadius = 7 + Math.random() * 5;
    var glow = new createjs.Shape();
    glow.graphics
      .beginRadialGradientFill(
        ["rgba(230, 244, 255, 0.6)", "rgba(126, 188, 255, 0.08)", "rgba(0,0,0,0)"],
        [0, 0.55, 1],
        0,
        0,
        0,
        0,
        0,
        glowRadius * 2.4
      )
      .drawCircle(0, 0, glowRadius * 2.4);
    glow.alpha = 0.72;
    glow.compositeOperation = "lighter";
    node.addChild(glow);

    var core = new createjs.Shape();
    core.graphics
      .beginRadialGradientFill(
        ["rgba(255, 255, 255, 0.95)", "rgba(174, 214, 255, 0.4)", "rgba(0,0,0,0)"],
        [0, 0.7, 1],
        0,
        0,
        0,
        0,
        0,
        glowRadius
      )
      .drawCircle(0, 0, glowRadius);
    core.alpha = 0.82;
    node.addChild(core);

    var baseScale = 0.9 + Math.random() * 0.2;
    node.scaleX = node.scaleY = baseScale;

    (function (target, glowShape) {
      var initialAlpha = target.alpha || 1;
      var initialScale = target.scaleX || 1;
      createjs.Tween.get(target, { loop: true })
        .to(
          {
            alpha: Math.min(1, initialAlpha + 0.2),
            scaleX: initialScale * 1.12,
            scaleY: initialScale * 1.12
          },
          1600 + Math.random() * 1200,
          createjs.Ease.sineInOut
        )
        .to(
          {
            alpha: Math.max(0.55, initialAlpha - 0.25),
            scaleX: initialScale * 0.88,
            scaleY: initialScale * 0.88
          },
          1600 + Math.random() * 1200,
          createjs.Ease.sineInOut
        );

      if (glowShape) {
        var baseGlowAlpha = glowShape.alpha || 0.7;
        createjs.Tween.get(glowShape, { loop: true })
          .to(
            {
              alpha: Math.min(0.9, baseGlowAlpha + 0.15)
            },
            1400 + Math.random() * 1200,
            createjs.Ease.sineInOut
          )
          .to(
            {
              alpha: Math.max(0.4, baseGlowAlpha - 0.2)
            },
            1400 + Math.random() * 1200,
            createjs.Ease.sineInOut
          );
      }
    })(node, glow);

    cluster.addChild(node);
  }

  cluster.x = canvas.width * (0.18 + Math.random() * 0.64);
  cluster.y = canvas.height * (0.18 + Math.random() * 0.46);
  cluster.scaleX = cluster.scaleY = 0.65 + Math.random() * 0.35;
  cluster.rotation = -12 + Math.random() * 24;

  (function (target) {
    var baseX = target.x;
    var baseY = target.y;
    var baseRotation = target.rotation;

    var drift = function () {
      createjs.Tween.get(target)
        .to(
          {
            x: baseX + (-16 + Math.random() * 32),
            y: baseY + (-12 + Math.random() * 24),
            rotation: baseRotation + (-5 + Math.random() * 10)
          },
          4800 + Math.random() * 3400,
          createjs.Ease.sineInOut
        )
        .to(
          {
            x: baseX,
            y: baseY,
            rotation: baseRotation
          },
          4800 + Math.random() * 3400,
          createjs.Ease.sineInOut
        )
        .call(drift);
    };

    drift();
  })(cluster);

  return cluster;
}


function createAmbientShimmerConstellations() {
  var layer = new createjs.Container();
  layer.mouseEnabled = false;
  layer.mouseChildren = false;

  if (!canvas) {
    return layer;
  }

  var clusterCount = 3 + Math.floor(Math.random() * 3);

  for (var i = 0; i < clusterCount; i++) {
    var shimmer = new createjs.Container();
    shimmer.x = canvas.width * (0.15 + Math.random() * 0.7);
    shimmer.y = canvas.height * (0.12 + Math.random() * 0.5);
    shimmer.scaleX = shimmer.scaleY = 0.6 + Math.random() * 0.6;
    shimmer.alpha = 0.55 + Math.random() * 0.25;

    var tail = new createjs.Shape();
    var tailLength = 40 + Math.random() * 70;
    tail.graphics
      .setStrokeStyle(1.2)
      .beginLinearGradientStroke(
        ["rgba(156, 204, 255, 0.6)", "rgba(156, 204, 255, 0)"],
        [0, 1],
        -tailLength / 2,
        0,
        tailLength / 2,
        0
      )
      .moveTo(-tailLength / 2, 0)
      .quadraticCurveTo(0, -tailLength * 0.35, tailLength / 2, 0);
    tail.alpha = 0.75;
    tail.compositeOperation = "lighter";
    shimmer.addChild(tail);

    var pulse = new createjs.Shape();
    var pulseRadius = 10 + Math.random() * 8;
    pulse.graphics
      .beginRadialGradientFill(
        ["rgba(222, 241, 255, 0.7)", "rgba(150, 206, 255, 0.24)", "rgba(0,0,0,0)"],
        [0, 0.6, 1],
        0,
        0,
        0,
        0,
        0,
        pulseRadius * 2.8
      )
      .drawCircle(0, 0, pulseRadius * 2.8);
    pulse.alpha = 0.7;
    pulse.compositeOperation = "lighter";
    shimmer.addChild(pulse);

    var sparkle = new createjs.Shape();
    sparkle.graphics
      .beginFill("rgba(236, 248, 255, 0.95)")
      .drawPolyStar(0, 0, pulseRadius * 0.5, 4, 0.6, -90);
    sparkle.alpha = 0.9;
    shimmer.addChild(sparkle);

    (function (target, glowShape, tailShape) {
      var baseAlpha = target.alpha;
      createjs.Tween.get(target, { loop: true })
        .to({ alpha: Math.min(1, baseAlpha + 0.2) }, 2200 + Math.random() * 1600, createjs.Ease.sineInOut)
        .to({ alpha: Math.max(0.35, baseAlpha - 0.25) }, 2200 + Math.random() * 1600, createjs.Ease.sineInOut);

      if (glowShape) {
        var baseScale = glowShape.scaleX || 1;
        createjs.Tween.get(glowShape, { loop: true })
          .to({ scaleX: baseScale * 1.12, scaleY: baseScale * 1.12 }, 1800 + Math.random() * 1200, createjs.Ease.sineInOut)
          .to({ scaleX: baseScale * 0.88, scaleY: baseScale * 0.88 }, 1800 + Math.random() * 1200, createjs.Ease.sineInOut);
      }

      if (tailShape) {
        var baseTailRotation = -6 + Math.random() * 12;
        tailShape.rotation = baseTailRotation;
        createjs.Tween.get(tailShape, { loop: true })
          .to({ rotation: baseTailRotation + (-8 + Math.random() * 16) }, 2600 + Math.random() * 1800, createjs.Ease.sineInOut)
          .to({ rotation: baseTailRotation + (8 - Math.random() * 16) }, 2600 + Math.random() * 1800, createjs.Ease.sineInOut);
      }
    })(shimmer, pulse, tail);

    layer.addChild(shimmer);
  }

  return layer;
}


function createAmbientGlowOrb(radius, colors) {
  var palette = colors && colors.length ? colors : ["rgba(186, 209, 255, 0.4)", "rgba(186, 209, 255, 0)"];
  var stops = [];

  if (palette.length === 1) {
    palette = [palette[0], "rgba(0,0,0,0)"];
  }

  for (var i = 0; i < palette.length; i++) {
    stops.push(palette.length === 1 ? 1 : i / (palette.length - 1));
  }

  var orb = new createjs.Shape();
  orb.graphics
    .beginRadialGradientFill(palette, stops, 0, 0, 0, 0, 0, radius)
    .drawCircle(0, 0, radius);

  return orb;
}

function createAmbientBokehLayer(width, height, count) {
  var layer = new createjs.Container();
  layer.mouseEnabled = false;
  layer.mouseChildren = false;

  for (var i = 0; i < count; i++) {
    var radius = 70 + Math.random() * 120;
    var palette = Math.random() > 0.5
      ? ["rgba(255, 212, 255, 0.22)", "rgba(255, 212, 255, 0)"]
      : ["rgba(144, 198, 255, 0.24)", "rgba(144, 198, 255, 0)"];
    var glow = createAmbientGlowOrb(radius, palette);
    glow.x = Math.random() * width;
    glow.y = Math.random() * height;
    glow.alpha = 0.18 + Math.random() * 0.18;
    glow.scaleX = glow.scaleY = 0.65 + Math.random() * 0.45;
    glow.compositeOperation = "lighter";
    layer.addChild(glow);

    (function (target) {
      var baseScale = target.scaleX || 1;
      var baseAlpha = target.alpha || 0.2;

      createjs.Tween.get(target, { loop: true })
        .to(
          {
            scaleX: baseScale * 1.08,
            scaleY: baseScale * 1.08,
            alpha: Math.min(0.4, baseAlpha + 0.12)
          },
          4200 + Math.random() * 1800,
          createjs.Ease.sineInOut
        )
        .to(
          {
            scaleX: baseScale * 0.92,
            scaleY: baseScale * 0.92,
            alpha: Math.max(0.12, baseAlpha - 0.08)
          },
          4200 + Math.random() * 1800,
          createjs.Ease.sineInOut
        );
    })(glow);
  }

  return layer;
}

function createAmbientWave(width, thickness, amplitude, colors) {
  var wave = new createjs.Shape();
  var graphics = wave.graphics;
  var halfWidth = width / 2;
  var halfThickness = thickness / 2;
  var palette = colors && colors.length ? colors : ["rgba(154, 195, 255, 0.32)", "rgba(228, 165, 255, 0.18)"];

  graphics
    .beginLinearGradientFill(palette, [0, 1], -halfWidth, 0, halfWidth, 0)
    .moveTo(-halfWidth, -halfThickness * 0.35)
    .quadraticCurveTo(-halfWidth * 0.55, -halfThickness * (1 + amplitude), -halfWidth * 0.1, -halfThickness * (0.6 + amplitude))
    .quadraticCurveTo(halfWidth * 0.25, -halfThickness * amplitude, halfWidth, -halfThickness * 0.25)
    .lineTo(halfWidth, halfThickness * 0.45)
    .quadraticCurveTo(halfWidth * 0.28, halfThickness * (1.4 + amplitude), 0, halfThickness * 0.7)
    .quadraticCurveTo(-halfWidth * 0.45, halfThickness * 0.1, -halfWidth, -halfThickness * 0.05)
    .closePath();

  return wave;
}

function animateAmbientWave(wave) {
  if (!wave) {
    return;
  }

  var baseState = {
    y: wave.y,
    alpha: typeof wave.alpha === "number" ? wave.alpha : 0.5,
    scaleX: wave.scaleX || 1,
    scaleY: wave.scaleY || 1
  };

  var drift = function () {
    var duration = 4600 + Math.random() * 2800;
    var nextAlpha = Math.min(0.76, Math.max(0.28, baseState.alpha + (Math.random() * 0.18 - 0.09)));
    var nextScaleX = baseState.scaleX * (1 + (Math.random() * 0.1 - 0.05));
    var nextScaleY = baseState.scaleY * (1 + (Math.random() * 0.12 - 0.06));
    var nextSkewX = -6 + Math.random() * 12;
    var nextSkewY = -3 + Math.random() * 6;
    var nextY = baseState.y + (-22 + Math.random() * 44);

    createjs.Tween.get(wave, { override: true })
      .to(
        {
          alpha: nextAlpha,
          scaleX: nextScaleX,
          scaleY: nextScaleY,
          skewX: nextSkewX,
          skewY: nextSkewY,
          y: nextY
        },
        duration,
        createjs.Ease.sineInOut
      )
      .call(drift);
  };

  drift();
}

function createAmbientStarField(width, height, count) {
  var layer = new createjs.Container();
  layer.mouseEnabled = false;
  layer.mouseChildren = false;

  for (var i = 0; i < count; i++) {
    var star = new createjs.Container();
    var baseSize = 1.4 + Math.random() * 1.6;
    var sparkle = new createjs.Shape();
    sparkle.graphics
      .beginRadialGradientFill(
        ["rgba(255, 255, 255, 0.85)", "rgba(180, 214, 255, 0.2)", "rgba(0,0,0,0)"],
        [0, 0.6, 1],
        0,
        0,
        0,
        0,
        0,
        baseSize * 3
      )
      .drawCircle(0, 0, baseSize * 3);
    sparkle.alpha = 0.75;
    star.addChild(sparkle);

    var cross = new createjs.Shape();
    cross.graphics
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.95)", "rgba(255,255,255,0)"],
        [0, 1],
        0,
        -baseSize * 2.2,
        0,
        baseSize * 2.2
      )
      .drawRoundRect(-baseSize * 0.3, -baseSize * 2.2, baseSize * 0.6, baseSize * 4.4, baseSize * 0.3);
    cross.graphics
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.95)", "rgba(255,255,255,0)"],
        [0, 1],
        -baseSize * 2.2,
        0,
        baseSize * 2.2,
        0
      )
      .drawRoundRect(-baseSize * 2.2, -baseSize * 0.3, baseSize * 4.4, baseSize * 0.6, baseSize * 0.3);
    cross.alpha = 0.85;
    star.addChild(cross);

    star.x = Math.random() * width;
    star.y = Math.random() * height * 0.8 + height * 0.1;
    star.alpha = 0.35 + Math.random() * 0.4;
    star.compositeOperation = "lighter";
    layer.addChild(star);

    (function (target) {
      var baseAlpha = target.alpha;
      createjs.Tween.get(target, { loop: true })
        .to({ alpha: Math.min(0.9, baseAlpha + 0.25) }, 1800 + Math.random() * 1800, createjs.Ease.quadOut)
        .to({ alpha: Math.max(0.18, baseAlpha - 0.22) }, 1800 + Math.random() * 1800, createjs.Ease.quadIn);
    })(star);
  }

  return layer;
}

function createAmbientGlowOrbs(width, height, count) {
  var layer = new createjs.Container();
  layer.mouseEnabled = false;
  layer.mouseChildren = false;

  var palettes = [
    ["rgba(255, 205, 255, 0.42)", "rgba(255, 205, 255, 0)"],
    ["rgba(171, 215, 255, 0.38)", "rgba(171, 215, 255, 0)"]
  ];

  for (var i = 0; i < count; i++) {
    var palette = palettes[i % palettes.length];
    var radius = 34 + Math.random() * 56;
    var orb = createAmbientGlowOrb(radius, palette);
    var container = new createjs.Container();
    container.addChild(orb);
    container.x = Math.random() * width;
    container.y = Math.random() * height;
    container.alpha = 0.22 + Math.random() * 0.18;
    container.scaleX = container.scaleY = 0.8 + Math.random() * 0.4;
    container.compositeOperation = "lighter";
    layer.addChild(container);

    animateAmbientOrb(container);
  }

  return layer;
}

function createAmbientParticleField(width, height, count, options) {
  var layer = new createjs.Container();
  layer.name = "AmbientParticleLayer";
  layer.mouseEnabled = false;
  layer.mouseChildren = false;

  options = options || {};

  var palettes = options.palettes || [
    {
      glow: "rgba(255, 194, 244, 0.32)",
      mid: "rgba(255, 194, 244, 0.1)",
      core: "rgba(255, 244, 255, 0.95)",
      spark: "rgba(255, 232, 255, 0.82)"
    },
    {
      glow: "rgba(174, 211, 255, 0.34)",
      mid: "rgba(174, 211, 255, 0.1)",
      core: "rgba(236, 247, 255, 0.95)",
      spark: "rgba(214, 233, 255, 0.82)"
    },
    {
      glow: "rgba(162, 255, 233, 0.28)",
      mid: "rgba(162, 255, 233, 0.08)",
      core: "rgba(234, 255, 250, 0.92)",
      spark: "rgba(209, 255, 245, 0.8)"
    }
  ];

  var minRadius = typeof options.minRadius === "number" ? options.minRadius : 2.6;
  var maxRadius = typeof options.maxRadius === "number" ? options.maxRadius : 5;
  if (maxRadius < minRadius) {
    maxRadius = minRadius;
  }

  for (var i = 0; i < count; i++) {
    var particle = new createjs.Container();
    particle.compositeOperation = "lighter";
    var radius = minRadius + Math.random() * (maxRadius - minRadius);
    var palette = palettes[i % palettes.length];

    var glow = new createjs.Shape();
    glow.graphics
      .beginRadialGradientFill([palette.glow, "rgba(0,0,0,0)"], [0, 1], 0, 0, 0, 0, 0, radius * 2.4)
      .drawCircle(0, 0, radius * 2.4);
    glow.alpha = 0.4;
    particle.addChild(glow);

    var core = new createjs.Shape();
    core.graphics
      .beginRadialGradientFill([palette.core, palette.glow, palette.mid, "rgba(0,0,0,0)"], [0, 0.35, 0.8, 1], 0, 0, 0, 0, 0, radius * 1.3)
      .drawCircle(0, 0, radius * 1.3);
    core.alpha = 0.88;
    core.scaleX = core.scaleY = 1;
    particle.addChild(core);

    var spark = new createjs.Shape();
    spark.graphics
      .beginFill(palette.spark)
      .drawPolyStar(0, 0, radius * 0.7, 4, 0.6, -90);
    spark.alpha = 0.68;
    spark.scaleX = spark.scaleY = 0.75;
    particle.addChild(spark);

    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.alpha = 0.32 + Math.random() * 0.28;

    particle.__bounds = { width: width, height: height };
    particle.__core = core;
    particle.__glow = glow;
    particle.__spark = spark;
    particle.__pulseAttached = false;
    particle.__base = { x: particle.x, y: particle.y };
    particle.__drift = 30 + Math.random() * 60;

    layer.addChild(particle);
  }

  return layer;
}

function startAmbientParticleFloat(particle, immediate) {
  if (!particle || !particle.__bounds) {
    return;
  }

  if (!particle.__pulseAttached) {
    particle.__pulseAttached = true;

    if (particle.__core) {
      var baseCoreScale = particle.__core.scaleX || 1;
      var baseCoreAlpha = particle.__core.alpha || 1;
      createjs.Tween.get(particle.__core, { loop: true })
        .to(
          {
            scaleX: baseCoreScale * 1.12,
            scaleY: baseCoreScale * 1.12,
            alpha: Math.min(1, baseCoreAlpha + 0.08)
          },
          840,
          createjs.Ease.sineInOut
        )
        .to(
          {
            scaleX: baseCoreScale * 0.9,
            scaleY: baseCoreScale * 0.9,
            alpha: Math.max(0.4, baseCoreAlpha - 0.18)
          },
          840,
          createjs.Ease.sineInOut
        );
    }

    if (particle.__spark) {
      var baseSparkScale = particle.__spark.scaleX || 1;
      var baseSparkAlpha = particle.__spark.alpha || 1;
      createjs.Tween.get(particle.__spark, { loop: true })
        .to(
          {
            rotation: particle.__spark.rotation + 45,
            scaleX: baseSparkScale * 1.1,
            scaleY: baseSparkScale * 1.1,
            alpha: Math.min(1, baseSparkAlpha + 0.1)
          },
          980,
          createjs.Ease.quadInOut
        )
        .to(
          {
            rotation: particle.__spark.rotation + 90,
            scaleX: baseSparkScale * 0.85,
            scaleY: baseSparkScale * 0.85,
            alpha: Math.max(0.35, baseSparkAlpha - 0.12)
          },
          980,
          createjs.Ease.quadInOut
        );
    }

    if (particle.__glow) {
      var baseGlowAlpha = particle.__glow.alpha || 0.4;
      createjs.Tween.get(particle.__glow, { loop: true })
        .to({ alpha: Math.min(0.6, baseGlowAlpha + 0.1) }, 920, createjs.Ease.quadOut)
        .to({ alpha: Math.max(0.25, baseGlowAlpha - 0.15) }, 920, createjs.Ease.quadIn);
    }
  }

  var bounds = particle.__bounds;
  if (!particle.__base) {
    particle.__base = { x: particle.x, y: particle.y };
  }

  if (immediate) {
    particle.__base.x = Math.random() * bounds.width;
    particle.__base.y = Math.random() * bounds.height;
    particle.x = particle.__base.x;
    particle.y = particle.__base.y;
    particle.alpha = 0.3 + Math.random() * 0.3;
  }

  createjs.Tween.removeTweens(particle);

  var drift = function () {
    var duration = 3600 + Math.random() * 2800;
    var radius = particle.__drift || 40;
    var targetX = particle.__base.x + (Math.random() * 2 - 1) * radius;
    var targetY = particle.__base.y + (Math.random() * 2 - 1) * radius;
    targetX = Math.max(0, Math.min(bounds.width, targetX));
    targetY = Math.max(0, Math.min(bounds.height, targetY));
    var nextAlpha = 0.28 + Math.random() * 0.32;

    createjs.Tween.get(particle, { override: true })
      .to({ x: targetX, y: targetY, alpha: nextAlpha }, duration, createjs.Ease.sineInOut)
      .call(drift);
  };

  drift();
}

function animateAmbientOrb(orb) {
  if (!orb) {
    return;
  }

  var animate = function () {
    var targetX = Math.random() * canvas.width;
    var targetY = Math.random() * canvas.height;
    var targetAlpha = 0.35 + Math.random() * 0.3;
    var duration = 6000 + Math.random() * 5000;

    createjs.Tween.get(orb, { override: true })
      .to({ x: targetX, y: targetY, alpha: targetAlpha }, duration, createjs.Ease.sineInOut)
      .call(animate);
  };

  animate();
}

function animateAmbientAurora(target) {
  if (!target) {
    return;
  }

  target.regX = 0;
  target.regY = 0;

  var drift = function () {
    var nextScaleX = 1 + Math.random() * 0.18;
    var nextScaleY = 1 + Math.random() * 0.12;
    var nextSkew = -5 + Math.random() * 10;
    var nextAlpha = 0.38 + Math.random() * 0.22;
    var duration = 5200 + Math.random() * 2400;

    createjs.Tween.get(target, { override: true })
      .to({ scaleX: nextScaleX, scaleY: nextScaleY, skewX: nextSkew, alpha: nextAlpha }, duration, createjs.Ease.sineInOut)
      .call(drift);
  };

  drift();
}

function animateAmbientDiamond(target) {
  if (!target) {
    return;
  }

  var baseX = target.x;
  var baseY = target.y;
  var baseAlpha = target.alpha;

  createjs.Tween.get(target, { loop: true })
    .to(
      {
        rotation: target.rotation + 28,
        x: baseX + 22,
        y: baseY + 16,
        alpha: Math.min(0.36, baseAlpha + 0.12)
      },
      4200,
      createjs.Ease.sineInOut
    )
    .to(
      {
        rotation: target.rotation + 56,
        x: baseX - 18,
        y: baseY - 20,
        alpha: Math.max(0.12, baseAlpha - 0.06)
      },
      4200,
      createjs.Ease.sineInOut
    );
}

function spawnAmbientSpark(generation) {
  if (!ambientSparkLayer || !canvas) {
    return;
  }

  var activeGeneration = typeof generation === "number" ? generation : ambientSparkGeneration;
  var palette = [
    ["rgba(255,255,255,0.95)", "rgba(255, 189, 245, 0.6)"],
    ["rgba(255,255,255,0.95)", "rgba(165, 214, 255, 0.6)"],
    ["rgba(255,255,255,0.95)", "rgba(151, 255, 232, 0.55)"]
  ];
  var paletteIndex = Math.floor(Math.random() * palette.length);

  var spark = new createjs.Container();
  var radius = 4 + Math.random() * 6;
  var colors = palette[paletteIndex];

  var glow = new createjs.Shape();
  glow.graphics
    .beginRadialGradientFill([colors[0], colors[1], "rgba(255,255,255,0)"], [0, 0.45, 1], 0, 0, 0, 0, 0, radius * 2.4)
    .drawCircle(0, 0, radius * 2.4);
  glow.alpha = 0.95;
  spark.addChild(glow);

  var streak = new createjs.Shape();
  streak.graphics
    .beginLinearGradientFill(["rgba(255,255,255,0)", colors[1], "rgba(255,255,255,0)"], [0, 0.5, 1], 0, -radius * 1.2, 0, radius * 1.2)
    .drawRoundRect(-radius * 0.32, -radius * 1.2, radius * 0.64, radius * 2.4, radius * 0.32);
  streak.alpha = 0.75;
  streak.rotation = Math.random() * 180;
  spark.addChild(streak);

  spark.x = Math.random() * canvas.width;
  spark.y = canvas.height * 0.18 + Math.random() * canvas.height * 0.62;
  spark.alpha = 0;
  spark.compositeOperation = "lighter";

  ambientSparkLayer.addChild(spark);

  createjs.Tween.get(streak, { loop: true })
    .to({ rotation: streak.rotation + 120, scaleX: 1.2, scaleY: 1.2, alpha: 0.85 }, 680, createjs.Ease.quadInOut)
    .to({ rotation: streak.rotation + 240, scaleX: 0.8, scaleY: 0.8, alpha: 0.6 }, 680, createjs.Ease.quadInOut);

  var driftX = -40 + Math.random() * 80;
  var driftY = -50 + Math.random() * 100;
  var fadeIn = 300 + Math.random() * 260;
  var life = 1800 + Math.random() * 1400;

  createjs.Tween.get(spark)
    .wait(Math.random() * 900)
    .to({ alpha: 0.9 }, fadeIn, createjs.Ease.quadOut)
    .to({ x: spark.x + driftX, y: spark.y + driftY, alpha: 0 }, life, createjs.Ease.sineIn)
    .call(function () {
      createjs.Tween.removeTweens(streak);
      if (spark.parent) {
        spark.parent.removeChild(spark);
      }
      if (activeGeneration === ambientSparkGeneration) {
        spawnAmbientSpark(activeGeneration);
      }
    });
}





/* ===== ChoiceFX Helpers (CreateJS) - injected ===== */
function ChoiceFX_startIdleBob(displayObj){
  createjs.Tween.removeTweens(displayObj);
  createjs.Tween.get(displayObj, { loop: true })
    .to({ scaleX: 0.72, scaleY: 0.72}, 1200, createjs.Ease.quadOut)
    .to({ scaleX: 0.74, scaleY: 0.74 }, 1200, createjs.Ease.quadIn);
}

function ChoiceFX_addGlow(ch, on){
  ch.shadow = on
    ? new createjs.Shadow("rgba(255,182,72,0.9)", 0, 0, 28)
    : new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
}

function ChoiceFX_pressRipple(parent, x, y){
  const r = new createjs.Shape();
  r.alpha = 0.25;
  r.graphics.setStrokeStyle(6).beginStroke("#2EC4B6").drawCircle(0,0,1);
  r.x = x; r.y = y;
  parent.addChild(r);
  createjs.Tween.get(r)
    .to({ scaleX: 28, scaleY: 28, alpha: 0 }, 420, createjs.Ease.quadOut)
    .call(()=> parent.removeChild(r));
}

function ChoiceFX_randomConfetti(){
  const colors = ["#FF9F1C","#2EC4B6","#E71D36","#FDFFFC","#7F5AF0"];
  return colors[(Math.random()*colors.length)|0];
}

function ChoiceFX_confettiBurst(container, x, y){
  for (let i=0; i<16; i++){
    const p = new createjs.Shape();
    const sz = 6 + Math.random()*6;
    p.graphics.beginFill(ChoiceFX_randomConfetti()).drawRect(-sz/2, -sz/2, sz, sz);
    p.x = x; p.y = y; p.rotation = Math.random()*360;
    container.addChild(p);
    const dx = (-80 + Math.random()*160);
    const dy = (-140 + Math.random()*100);
    const tt = 500 + Math.random()*400;
    createjs.Tween.get(p)
      .to({ x: x+dx, y: y+dy, alpha: 0, rotation: p.rotation+360 }, tt, createjs.Ease.quadOut)
      .call(()=> container.removeChild(p));
  }
}

function ChoiceFX_wrongShake(target){
  const baseX = target.x;
  createjs.Tween.get(target)
    .to({ x: baseX - 10 }, 60)
    .to({ x: baseX + 10 }, 60)
    .to({ x: baseX - 6 }, 50)
    .to({ x: baseX + 6 }, 50)
    .to({ x: baseX }, 50);
}

function ChoiceFX_redFlash(obj){
  const old = obj.alpha;
  createjs.Tween.get(obj)
    .to({ alpha: 0.3 }, 70)
    .to({ alpha: old }, 120);
}

function ChoiceFX_drawFocusRing(target, on){
  if (!target) return;

  if (on){
    if (!target._ring){
      const ring = new createjs.Shape();
      ring.mouseEnabled = false;
      ring.mouseChildren = false;
      ring.graphics.setStrokeStyle(4)
        .beginStroke("#7F5AF0")
        .drawCircle(0, 0, 40);
      ring.alpha = 0.8;

      // Align the ring with the target
      ring.x = target.x;
      ring.y = target.y;
      ring.regX = target.regX || 0;
      ring.regY = target.regY || 0;

      // Insert just below the target in the parent's display list
      const parent = target.parent;
      if (parent){
        const idx = parent.getChildIndex(target);
        if (typeof parent.addChildAt === "function"){
          parent.addChildAt(ring, Math.max(0, idx));
        } else {
          parent.addChild(ring);
        }
      }
      target._ring = ring;
    } else {
      // keep ring in sync if target moved
      target._ring.x = target.x;
      target._ring.y = target.y;
    }
  } else if (target._ring){
    const r = target._ring;
    if (r.parent) r.parent.removeChild(r);
    target._ring = null;
  }
}

function ChoiceFX_addGlowPulse(obj){
  const offShadow = new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
  obj.shadow = new createjs.Shadow("rgba(255,200,0,0.8)", 0, 0, 20);
  createjs.Tween.get(obj).wait(100).call(()=> obj.shadow = offShadow);
}

/* Entrance animation for a passed array of choices */
function ChoiceFX_entrance(choiceArr, baseDelay){
  var startDelay = typeof baseDelay === "number" ? baseDelay : 1600;
  for (let i = 0; i < choiceArr.length; i++) {
    const ch = choiceArr[i];
    if(!ch) continue;
    if (typeof ch.scaleX === "undefined") continue;
    if (!ch.shadow) ch.shadow = new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
    ch.scaleX = ch.scaleY = 0.55;
    ch.alpha = 0;
    const baseY = ch.y || 620;
   // ch.y = baseY + 20;

    createjs.Tween.get(ch)
      .wait(startDelay + i*120)
      .to({ alpha: 1, scaleX: 0.72, scaleY: 0.72, y: baseY, rotation: 15 }, 320, createjs.Ease.quadOut)
      .to({ rotation: 0 }, 240, createjs.Ease.quadOut)
      .call(()=> ChoiceFX_startIdleBob(ch));
  }
}

/* Hover/HitArea wiring */
function ChoiceFX_bindHover(choiceArr){
  for (let i = 0; i < choiceArr.length; i++) {
    const ch = choiceArr[i];
    if(!ch) continue;

    const hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRoundRect(-70, -70, 140, 140, 20);
    ch.hitArea = hit;

    ch.cursor = "pointer";
    ch.mouseEnabled = true;

    ch.addEventListener("mouseover", function(e){
      const t = e.currentTarget;
      createjs.Tween.get(t, { override:true })
        .to({ scaleX: 0.78, scaleY: 0.78 }, 160, createjs.Ease.quadOut);
      ChoiceFX_addGlow(t, true);
      //ChoiceFX_drawFocusRing(t, true);
    });
    ch.addEventListener("mouseout", function(e){
      const t = e.currentTarget;
      createjs.Tween.get(t, { override:true })
        .to({ scaleX: 0.72, scaleY: 0.72}, 160, createjs.Ease.quadIn);
      ChoiceFX_addGlow(t, false);
     //ChoiceFX_drawFocusRing(t, false);
	 //t.y = t.y +4;
	 ChoiceFX_startIdleBob(t);
    });
  }
}

/* Reveal pop animation helper */
function ChoiceFX_revealPop(displayObj, style){
  const qObj = displayObj;
  if(!qObj) return;
  switch(style){
    case "spin":
      qObj.alpha = 0;
      qObj.rotation = -180;
      qObj.scaleX = qObj.scaleY = 0.4;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, rotation: 0, scaleX: 1.3, scaleY: 1.3 }, 280, createjs.Ease.backOut)
        .to({ scaleX: 1, scaleY: 1 }, 120)
        .call(() => ChoiceFX_addGlowPulse(qObj));
      break;
    case "soft":
      qObj.alpha = 0.2;
      qObj.scaleX = qObj.scaleY = 0.7;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200, createjs.Ease.sineOut)
        .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.sineInOut)
        .call(() => ChoiceFX_addGlowPulse(qObj));
      break;
    default: // "pop"
      qObj.scaleX = qObj.scaleY = 0;
      qObj.alpha = 0;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, scaleX: 1.4, scaleY: 1.4 }, 200, createjs.Ease.backOut)
        .to({ scaleX: 1, scaleY: 1 }, 150, createjs.Ease.quadOut)
        .call(() => ChoiceFX_addGlowPulse(qObj));
  }
}
/* ===== End ChoiceFX Helpers ===== */

/**
 * SAUI_attachQuestionLabelBG
 * Draws a centered, auto-sized rounded rectangle behind a Text for contrast.
 * Keeps your original Text (QusTxtString) untouched; mirrors visibility/alpha.
 */
function SAUI_attachQuestionLabelBG(textObj, parent, opts) {
  const cfg = Object.assign({
    padX: 24, padY: 12,
    fill: "rgba(0,0,0,0.55)",
    stroke: "rgba(255,255,255,0.12)", strokeW: 2,
    maxRadius: 20, addShadow: true, autoTick: true
  }, opts || {});

  const bg = new createjs.Shape();
  const idx = parent.getChildIndex(textObj);
  parent.addChildAt(bg, Math.max(0, idx)); // directly under the text

  function measure() {
    let b = textObj.getBounds();
    if (!b) { textObj.cache(0,0,1,1); textObj.uncache(); b = textObj.getBounds(); }
    return b;
  }

  function draw() {
    const b = measure(); if (!b) return;
    const w = b.width + cfg.padX * 2, h = b.height + cfg.padY * 2;
    const r = Math.min(cfg.maxRadius, h/2);
    const left = textObj.x - w/2, top = textObj.y - h/2;

    bg.graphics.clear()
      .setStrokeStyle(cfg.strokeW)
      .beginStroke(cfg.stroke)
      .beginFill(cfg.fill)
      .drawRoundRect(left, top, w, h, r)
      .endFill().endStroke();

    bg.visible = textObj.visible;
    bg.alpha = textObj.alpha;
    bg.shadow = cfg.addShadow ? new createjs.Shadow("rgba(0,0,0,0.35)", 0, 4, 10) : null;
  }

  draw();

  let tickH = null;
  if (cfg.autoTick) {
    tickH = createjs.Ticker.on("tick", () => {
      if (!bg.parent || !textObj.parent) { if (tickH) createjs.Ticker.off("tick", tickH); tickH = null; return; }
      bg.visible = textObj.visible;
      bg.alpha = textObj.alpha;
      draw();
    });
  }

  return {
    bg,
    refresh: draw,
    destroy: () => { if (tickH) createjs.Ticker.off("tick", tickH); if (bg.parent) bg.parent.removeChild(bg); }
  };
}

function SAUI_createCycleRaceSpeechBubble(options) {
  options = options || {};

  var bubble = new createjs.Container();
  bubble.visible = false;
  bubble.alpha = 0;
  bubble.mouseEnabled = false;
  bubble.mouseChildren = true;

  var defaultWidth = options.width != null ? options.width : 760;
  var defaultTail = options.tailHeight != null ? options.tailHeight : 56;

  bubble.__options = {
    width: defaultWidth,
    height: options.height != null ? options.height : 308,
    tailHeight: defaultTail,
    tailWidth: options.tailWidth != null ? options.tailWidth : 140,
    cornerRadius: options.cornerRadius != null ? options.cornerRadius : 54,
    title: options.title != null ? options.title : null,
    visualCenterOffset:
      options.visualCenterOffset != null
        ? options.visualCenterOffset
        : Math.round(defaultWidth * 0.014),
    contentOffsetX: options.contentOffsetX != null ? options.contentOffsetX : 0,
    contentOffsetY:
      options.contentOffsetY != null
        ? options.contentOffsetY
        : -defaultTail * 0.08
  };

  var shadow = new createjs.Shape();
  var pulse = new createjs.Shape();
  var body = new createjs.Shape();
  var highlight = new createjs.Shape();
  var content = new createjs.Container();
  var labelBg = new createjs.Shape();
  var labelText = new createjs.Text("", "800 32px 'Baloo 2'", "#F7FBFF");
  labelText.textAlign = "center";
  labelText.textBaseline = "middle";

  bubble.addChild(shadow, pulse, body, highlight, content, labelBg, labelText);

  bubble.__shadow = shadow;
  bubble.__pulse = pulse;
  bubble.__body = body;
  bubble.__highlight = highlight;
  bubble.__content = content;
  bubble.__labelBg = labelBg;
  bubble.__labelText = labelText;
  bubble.__palette = cycleRaceSpeechBubblePalette;
  bubble.__visualCenterOffset = bubble.__options.visualCenterOffset || 0;

  renderCycleRaceSpeechBubble(bubble, options);

  return bubble;
}

function SAUI_createCycleRaceQuestionLabel(options) {
  options = options || {};

  var fontSize = options.fontSize != null ? options.fontSize : 46;
  var maxWidth = options.maxWidth != null ? options.maxWidth : 520;
  var fill = options.color || "#FFFFFF";
  var text = new createjs.Text(
    options.text != null ? options.text : "",
    fontSize + "px 'Baloo 2'",
    fill
  );

  text.textAlign = "center";
  text.textBaseline = "middle";
  text.lineWidth = maxWidth;
  text.lineHeight =
    options.lineHeight != null
      ? options.lineHeight
      : Math.round(fontSize * 1.18);
  text.__baseScale = options.baseScale != null ? options.baseScale : 1;
  text.__textDirty = true;

  if (options.shadow !== false) {
    var shadow =
      options.shadow instanceof createjs.Shadow
        ? options.shadow
        : new createjs.Shadow("rgba(10,36,64,0.45)", 0, 3, Math.max(6, Math.round(fontSize * 0.16)));
    text.shadow = shadow;
  }

  return text;
}

function renderCycleRaceSpeechBubble(bubble, overrideOptions) {
  if (!bubble) {
    return;
  }

  bubble.__options = bubble.__options || {};
  overrideOptions = overrideOptions || {};

  var width =
    overrideOptions.width != null ? overrideOptions.width : bubble.__options.width;
  var height =
    overrideOptions.height != null ? overrideOptions.height : bubble.__options.height;
  var tailHeight =
    overrideOptions.tailHeight != null
      ? overrideOptions.tailHeight
      : bubble.__options.tailHeight;
  var tailWidth =
    overrideOptions.tailWidth != null ? overrideOptions.tailWidth : bubble.__options.tailWidth;
  var cornerRadius =
    overrideOptions.cornerRadius != null
      ? overrideOptions.cornerRadius
      : bubble.__options.cornerRadius;
  var title =
    overrideOptions.title != null ? overrideOptions.title : bubble.__options.title;
  var visualCenterOffset =
    overrideOptions.visualCenterOffset != null
      ? overrideOptions.visualCenterOffset
      : bubble.__options.visualCenterOffset;
  var contentOffsetX =
    overrideOptions.contentOffsetX != null
      ? overrideOptions.contentOffsetX
      : bubble.__options.contentOffsetX;
  var contentOffsetY =
    overrideOptions.contentOffsetY != null
      ? overrideOptions.contentOffsetY
      : bubble.__options.contentOffsetY;

  bubble.__options.width = width;
  bubble.__options.height = height;
  bubble.__options.tailHeight = tailHeight;
  bubble.__options.tailWidth = tailWidth;
  bubble.__options.cornerRadius = cornerRadius;
  bubble.__options.title = title;
  bubble.__options.visualCenterOffset = visualCenterOffset;
  bubble.__options.contentOffsetX = contentOffsetX;
  bubble.__options.contentOffsetY = contentOffsetY;
  bubble.__visualCenterOffset = visualCenterOffset || 0;

  var palette = bubble.__palette || cycleRaceSpeechBubblePalette;
  var bodyHeight = Math.max(height - tailHeight, 180);
  var halfWidth = width / 2;
  var halfBody = bodyHeight / 2;
  var topY = -halfBody;
  var bottomY = halfBody;
  var highlightInset = 26;
  var highlightRadius = Math.max(cornerRadius - 14, 24);
  var highlightTailHeight = Math.max(tailHeight - 18, 28);
  var highlightTailWidth = Math.max(tailWidth - 34, 86);

  var shadow = bubble.__shadow;
  var body = bubble.__body;
  var highlight = bubble.__highlight;
  var pulse = bubble.__pulse;
  var labelBg = bubble.__labelBg;
  var labelText = bubble.__labelText;
  var content = bubble.__content;

  if (shadow) {
    shadow.graphics
      .clear()
      .beginRadialGradientFill(
        ["rgba(8,18,44,0.28)", "rgba(8,18,44,0)"] ,
        [0, 1],
        0,
        bottomY + tailHeight * 0.62,
        0,
        0,
        bottomY + tailHeight * 0.62,
        width * 0.68
      )
      .drawEllipse(-width * 0.36, bottomY + tailHeight * 0.72, width * 0.72, 54);
    shadow.alpha = 0.52;
  }

  if (body) {
    body.graphics
      .clear()
      .setStrokeStyle(5, "round", "round")
      .beginLinearGradientStroke(
        palette.stroke,
        [0, 1],
        -halfWidth,
        topY,
        halfWidth,
        bottomY
      )
      .beginLinearGradientFill(
        palette.fill,
        [0, 1],
        -halfWidth,
        topY,
        halfWidth,
        bottomY
      )
      .moveTo(-halfWidth + cornerRadius, topY)
      .quadraticCurveTo(-halfWidth, topY, -halfWidth, topY + cornerRadius)
      .lineTo(-halfWidth, bottomY - cornerRadius)
      .quadraticCurveTo(-halfWidth, bottomY, -halfWidth + cornerRadius, bottomY)
      .lineTo(-tailWidth / 2, bottomY)
      .lineTo(0, bottomY + tailHeight)
      .lineTo(tailWidth / 2, bottomY)
      .lineTo(halfWidth - cornerRadius, bottomY)
      .quadraticCurveTo(halfWidth, bottomY, halfWidth, bottomY - cornerRadius)
      .lineTo(halfWidth, topY + cornerRadius)
      .quadraticCurveTo(halfWidth, topY, halfWidth - cornerRadius, topY)
      .lineTo(-halfWidth + cornerRadius, topY)
      .closePath();
  }

  if (pulse) {
    pulse.graphics
      .clear()
      .beginLinearGradientFill(
        palette.pulse,
        [0, 1],
        -halfWidth,
        topY,
        halfWidth,
        bottomY + tailHeight
      )
      .moveTo(-halfWidth + cornerRadius, topY)
      .quadraticCurveTo(-halfWidth, topY, -halfWidth, topY + cornerRadius)
      .lineTo(-halfWidth, bottomY - cornerRadius)
      .quadraticCurveTo(-halfWidth, bottomY, -halfWidth + cornerRadius, bottomY)
      .lineTo(-tailWidth / 2, bottomY)
      .lineTo(0, bottomY + tailHeight)
      .lineTo(tailWidth / 2, bottomY)
      .lineTo(halfWidth - cornerRadius, bottomY)
      .quadraticCurveTo(halfWidth, bottomY, halfWidth, bottomY - cornerRadius)
      .lineTo(halfWidth, topY + cornerRadius)
      .quadraticCurveTo(halfWidth, topY, halfWidth - cornerRadius, topY)
      .lineTo(-halfWidth + cornerRadius, topY)
      .closePath();
    pulse.alpha = 0;
    pulse.__baseScale = 1.04;
  }

  if (highlight) {
    var highlightTop = topY + highlightInset;
    var highlightBottom = bottomY - highlightInset;
    highlight.graphics
      .clear()
      .beginLinearGradientFill(
        palette.highlight,
        [0, 1],
        -halfWidth + highlightInset,
        highlightTop,
        halfWidth - highlightInset,
        highlightBottom
      )
      .moveTo(-halfWidth + highlightInset + highlightRadius, highlightTop)
      .quadraticCurveTo(
        -halfWidth + highlightInset,
        highlightTop,
        -halfWidth + highlightInset,
        highlightTop + highlightRadius
      )
      .lineTo(-halfWidth + highlightInset, highlightBottom - highlightRadius)
      .quadraticCurveTo(
        -halfWidth + highlightInset,
        highlightBottom,
        -halfWidth + highlightInset + highlightRadius,
        highlightBottom
      )
      .lineTo(-highlightTailWidth / 2, highlightBottom)
      .lineTo(0, highlightBottom + Math.max(highlightTailHeight - 12, 20))
      .lineTo(highlightTailWidth / 2, highlightBottom)
      .lineTo(halfWidth - highlightInset - highlightRadius, highlightBottom)
      .quadraticCurveTo(
        halfWidth - highlightInset,
        highlightBottom,
        halfWidth - highlightInset,
        highlightBottom - highlightRadius
      )
      .lineTo(halfWidth - highlightInset, highlightTop + highlightRadius)
      .quadraticCurveTo(
        halfWidth - highlightInset,
        highlightTop,
        halfWidth - highlightInset - highlightRadius,
        highlightTop
      )
      .lineTo(-halfWidth + highlightInset + highlightRadius, highlightTop)
      .closePath();
    highlight.alpha = 0.84;
  }

  if (labelBg) {
    if (title) {
      var labelWidth = Math.min(188, Math.max(150, width * 0.22));
      var labelHeight = 48;
      labelBg.graphics
        .clear()
        .beginLinearGradientFill(
          palette.label,
          [0, 1],
          -labelWidth / 2,
          0,
          labelWidth / 2,
          0
        )
        .drawRoundRect(-labelWidth / 2, -labelHeight / 2, labelWidth, labelHeight, labelHeight / 2);
      labelBg.x = -halfWidth + labelWidth / 2 + 28;
      labelBg.y = topY - labelHeight / 2 - 18;
      labelBg.alpha = 0.94;
      labelBg.visible = true;
    } else {
      labelBg.graphics.clear();
      labelBg.visible = false;
    }
  }

  if (labelText) {
    if (title) {
      labelText.text = title;
      labelText.font = "800 38px 'Baloo 2'";
      labelText.x = labelBg ? labelBg.x : -halfWidth + 90;
      labelText.y = labelBg ? labelBg.y : topY - 18;
      labelText.color = "#F7FBFF";
      labelText.visible = true;
    } else {
      labelText.visible = false;
    }
  }

  if (content) {
    content.x = contentOffsetX || 0;
    content.y = contentOffsetY != null ? contentOffsetY : -tailHeight * 0.08;
  }
}

function SAUI_showCycleRaceSpeechBubble(bubble, delay) {
  if (!bubble) {
    return;
  }

  renderCycleRaceSpeechBubble(bubble);

  bubble.visible = true;
  bubble.alpha = 0;

  if (typeof bubble.__homeX !== "number") {
    bubble.__homeX = typeof bubble.x === "number" ? bubble.x : 0;
  } else if (typeof bubble.x === "number") {
    bubble.__homeX = bubble.x;
  }

  if (typeof bubble.__homeY !== "number") {
    bubble.__homeY = typeof bubble.y === "number" ? bubble.y : 0;
  } else if (typeof bubble.y === "number") {
    bubble.__homeY = bubble.y;
  }

  var baseY = bubble.__homeY != null ? bubble.__homeY : 0;

  bubble.scaleX = bubble.scaleY = 0.9;
  bubble.y = baseY - 42;

  createjs.Tween.removeTweens(bubble);
  createjs.Tween.get(bubble, { override: true })
    .wait(delay || 0)
    .to(
      { alpha: 1, scaleX: 1.05, scaleY: 1.05, y: baseY + 12 },
      300,
      createjs.Ease.quartOut
    )
    .to({ scaleX: 1, scaleY: 1, y: baseY }, 260, createjs.Ease.bounceOut);

  if (bubble.__pulse) {
    var pulse = bubble.__pulse;
    pulse.alpha = 0.18;
    pulse.scaleX = pulse.scaleY = 1;
    createjs.Tween.removeTweens(pulse);
    createjs.Tween.get(pulse, { override: true, loop: true })
      .to({ alpha: 0.38, scaleX: pulse.__baseScale || 1.04, scaleY: pulse.__baseScale || 1.04 }, 1100, createjs.Ease.sineInOut)
      .to({ alpha: 0.18, scaleX: 1, scaleY: 1 }, 1100, createjs.Ease.sineInOut);
  }
}

function SAUI_hideCycleRaceSpeechBubble(bubble) {
  if (!bubble) {
    return;
  }

  var baseY =
    typeof bubble.__homeY === "number"
      ? bubble.__homeY
      : typeof bubble.y === "number"
      ? bubble.y
      : 0;

  createjs.Tween.removeTweens(bubble);
  createjs.Tween.get(bubble, { override: true })
    .to({ alpha: 0, scaleX: 0.94, scaleY: 0.94, y: baseY - 24 }, 180, createjs.Ease.quadIn)
    .call(function () {
      bubble.visible = false;
      bubble.scaleX = bubble.scaleY = 1;
      if (typeof bubble.__homeX === "number") {
        bubble.x = bubble.__homeX;
      }
      if (typeof bubble.__homeY === "number") {
        bubble.y = bubble.__homeY;
      }
    });

  if (bubble.__pulse) {
    createjs.Tween.removeTweens(bubble.__pulse);
    bubble.__pulse.alpha = 0;
  }
}

function SAUI_createCycleRaceHintBanner(options) {
  options = options || {};

  var banner = new createjs.Container();
  banner.visible = false;
  banner.alpha = 0;
  banner.mouseEnabled = false;
  banner.__palette = options.palette || cycleRaceHintPalette;
  banner.__options = {
    width: options.width,
    height: options.height,
    padX: options.padX != null ? options.padX : 42,
    padY: options.padY != null ? options.padY : 20,
    cornerRadius: options.cornerRadius,
    font: options.font || "800 28px 'Baloo 2'",
    text: options.text || "",
    textColor:
      options.textColor ||
      (banner.__palette && banner.__palette.text ? banner.__palette.text : "#243360")
  };

  var shadow = new createjs.Shape();
  var body = new createjs.Shape();
  var highlight = new createjs.Shape();
  var text = new createjs.Text(
    banner.__options.text,
    banner.__options.font,
    banner.__options.textColor
  );

  text.textAlign = "center";
  text.textBaseline = "middle";

  banner.addChild(shadow, body, highlight, text);

  banner.__shadow = shadow;
  banner.__body = body;
  banner.__highlight = highlight;
  banner.__text = text;

  renderCycleRaceHintBanner(banner, options);

  return banner;
}

function renderCycleRaceHintBanner(banner, overrideOptions) {
  if (!banner) {
    return;
  }

  overrideOptions = overrideOptions || {};
  banner.__options = banner.__options || {};

  var palette = banner.__palette || cycleRaceHintPalette;
  var text = banner.__text;

  if (!text) {
    return;
  }

  if (overrideOptions.font) {
    banner.__options.font = overrideOptions.font;
  }
  if (overrideOptions.textColor) {
    banner.__options.textColor = overrideOptions.textColor;
  }
  if (overrideOptions.text != null) {
    banner.__options.text = overrideOptions.text;
  }

  text.font = banner.__options.font || text.font;
  text.color = banner.__options.textColor || text.color;
  if (banner.__options.text != null) {
    text.text = banner.__options.text;
  }

  var padX =
    overrideOptions.padX != null
      ? overrideOptions.padX
      : banner.__options.padX != null
      ? banner.__options.padX
      : 42;
  var padY =
    overrideOptions.padY != null
      ? overrideOptions.padY
      : banner.__options.padY != null
      ? banner.__options.padY
      : 20;

  banner.__options.padX = padX;
  banner.__options.padY = padY;

  var measuredWidth = text.getMeasuredWidth ? text.getMeasuredWidth() : 0;
  var lineHeight = text.getMeasuredLineHeight ? text.getMeasuredLineHeight() : text.lineHeight || 36;

  var width =
    overrideOptions.width != null
      ? overrideOptions.width
      : banner.__options.width != null
      ? banner.__options.width
      : Math.max(360, measuredWidth + padX * 2);

  var height =
    overrideOptions.height != null
      ? overrideOptions.height
      : banner.__options.height != null
      ? banner.__options.height
      : Math.max(80, lineHeight + padY * 2);

  var cornerRadius =
    overrideOptions.cornerRadius != null
      ? overrideOptions.cornerRadius
      : banner.__options.cornerRadius != null
      ? banner.__options.cornerRadius
      : Math.min(height / 2, 44);

  banner.__options.width = width;
  banner.__options.height = height;
  banner.__options.cornerRadius = cornerRadius;

  var halfWidth = width / 2;
  var halfHeight = height / 2;

  if (banner.__shadow) {
    var glowColor = palette.glow || "rgba(12,24,58,0.35)";
    banner.__shadow.graphics
      .clear()
      .beginFill(glowColor)
      .drawRoundRect(-halfWidth, -halfHeight + 12, width, height, cornerRadius);
    banner.__shadow.alpha = 0.7;
    banner.__shadow.y = 8;
  }

  if (banner.__body) {
    banner.__body.graphics
      .clear()
      .setStrokeStyle(4, "round", "round")
      .beginLinearGradientStroke(palette.stroke, [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
      .beginLinearGradientFill(palette.fill, [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
      .drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius)
      .endFill();
  }

  if (banner.__highlight) {
    banner.__highlight.graphics
      .clear()
      .beginLinearGradientFill(
        palette.highlight,
        [0, 1],
        0,
        -halfHeight,
        0,
        halfHeight * 0.6
      )
      .drawRoundRect(-halfWidth + 8, -halfHeight + 8, width - 16, height * 0.58, Math.max(16, cornerRadius - 12));
    banner.__highlight.alpha = 0.78;
  }

  text.x = 0;
  text.y = 0;

  if (!banner.hitArea) {
    banner.hitArea = new createjs.Shape();
  }
  banner.hitArea.graphics
    .clear()
    .beginFill("#000")
    .drawRoundRect(-halfWidth, -halfHeight, width, height, cornerRadius);
}

function SAUI_startCycleRaceHintIdle(banner) {
  if (!banner || !banner.__highlight) {
    return;
  }

  if (banner.__highlightIdle) {
    return;
  }

  banner.__highlightIdle = createjs.Tween.get(banner.__highlight, {
    loop: true,
    override: true
  })
    .to({ alpha: 0.92 }, 1200, createjs.Ease.sineInOut)
    .to({ alpha: 0.68 }, 1200, createjs.Ease.sineInOut);
}

function SAUI_stopCycleRaceHintIdle(banner) {
  if (!banner || !banner.__highlight) {
    return;
  }

  if (banner.__highlightIdle) {
    createjs.Tween.removeTweens(banner.__highlight);
    banner.__highlightIdle = null;
  }
}

function SAUI_showCycleRaceHintBanner(banner, delay) {
  if (!banner) {
    return;
  }

  renderCycleRaceHintBanner(banner);

  banner.visible = true;
  banner.alpha = 0;
  banner.scaleX = banner.scaleY = 0.9;

  createjs.Tween.removeTweens(banner);
  createjs.Tween.get(banner, { override: true })
    .wait(delay || 0)
    .to({ alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 240, createjs.Ease.quadOut)
    .to({ scaleX: 1, scaleY: 1 }, 220, createjs.Ease.quadOut)
    .call(function () {
      SAUI_startCycleRaceHintIdle(banner);
    });
}

function SAUI_hideCycleRaceHintBanner(banner, options) {
  if (!banner) {
    if (options && typeof options.onComplete === "function") {
      options.onComplete();
    }
    return;
  }

  SAUI_stopCycleRaceHintIdle(banner);

  createjs.Tween.removeTweens(banner);
  createjs.Tween.get(banner, { override: true })
    .to({ alpha: 0, scaleX: 0.94, scaleY: 0.94 }, 200, createjs.Ease.quadIn)
    .call(function () {
      banner.visible = false;
      banner.scaleX = banner.scaleY = 1;
      if (options && typeof options.onComplete === "function") {
        options.onComplete();
      }
    });
}

function SAUI_createCycleRaceOptionBubble(options) {
  options = options || {};
  var variant = options.variant === "image" ? "image" : "text";

  var wrapper = new createjs.Container();
  wrapper.visible = false;
  wrapper.alpha = 0;
  wrapper.mouseEnabled = false;
  wrapper.mouseChildren = true;
  wrapper.__variant = variant;
  wrapper.__options = {
    width: options.width,
    height: options.height,
    cornerRadius: options.cornerRadius,
    radius: options.radius
  };
  wrapper.__palette = variant === "image" ? cycleRaceImageOptionPalette : cycleRaceTextOptionPalette;

  var shadow = new createjs.Shape();
  var pulse = new createjs.Shape();
  var background = new createjs.Shape();
  var highlight = new createjs.Shape();
  var sheen = new createjs.Shape();
  var content = new createjs.Container();
  var hitArea = new createjs.Shape();

  wrapper.addChild(shadow, pulse, background, highlight, sheen, content);

  wrapper.__shadow = shadow;
  wrapper.__pulse = pulse;
  wrapper.__background = background;
  wrapper.__highlight = highlight;
  wrapper.__sheen = sheen;
  wrapper.__content = content;
  wrapper.__hitArea = hitArea;
  wrapper.__pulse.__baseScale = variant === "image" ? 1.1 : 1.08;
  wrapper.__pulse.alpha = 0;
  wrapper.__wrapper = wrapper;

  layoutCycleRaceOptionBubble(wrapper, options);

  return wrapper;
}

function layoutCycleRaceOptionBubble(wrapper, overrideOptions) {
  if (!wrapper) {
    return;
  }

  overrideOptions = overrideOptions || {};

  var variant = wrapper.__variant || "text";
  var palette = wrapper.__palette || cycleRaceTextOptionPalette;

  var width =
    overrideOptions.width != null ? overrideOptions.width : wrapper.__options.width;
  var height =
    overrideOptions.height != null ? overrideOptions.height : wrapper.__options.height;
  var cornerRadius =
    overrideOptions.cornerRadius != null
      ? overrideOptions.cornerRadius
      : wrapper.__options.cornerRadius;
  var radius =
    overrideOptions.radius != null ? overrideOptions.radius : wrapper.__options.radius;

  var shadow = wrapper.__shadow;
  var pulse = wrapper.__pulse;
  var background = wrapper.__background;
  var highlight = wrapper.__highlight;
  var sheen = wrapper.__sheen;
  var content = wrapper.__content;
  var hitArea = wrapper.__hitArea;

  if (variant === "image") {
    var circleRadius = radius != null ? radius : 112;
    wrapper.__radius = circleRadius;
    wrapper.__width = circleRadius * 2;
    wrapper.__height = circleRadius * 2;

    if (shadow) {
      shadow.graphics
        .clear()
        .beginRadialGradientFill(
          ["rgba(8,18,44,0.32)", "rgba(8,18,44,0)"] ,
          [0, 1],
          0,
          circleRadius + 12,
          0,
          0,
          circleRadius + 12,
          circleRadius * 1.42
        )
        .drawEllipse(-circleRadius * 0.8, circleRadius + 18, circleRadius * 1.6, 52);
      shadow.alpha = 0.48;
    }

    if (pulse) {
      pulse.graphics
        .clear()
        .beginRadialGradientFill(
          [palette.fill[0], palette.fill[1]],
          [0, 1],
          0,
          -circleRadius * 0.65,
          circleRadius * 0.2,
          0,
          0,
          circleRadius * 1.18
        )
        .drawCircle(0, 0, circleRadius);
      pulse.alpha = 0;
    }

    if (hitArea) {
      hitArea.graphics.clear().beginFill("#000").drawCircle(0, 0, circleRadius);
    }

    if (content) {
      content.x = 0;
      content.y = 0;
    }

    if (sheen) {
      sheen.graphics
        .clear()
        .beginLinearGradientFill(
          palette.sheen || ["rgba(255,255,255,0.85)", "rgba(255,255,255,0)"] ,
          [0, 1],
          -circleRadius,
          0,
          circleRadius,
          0
        )
        .moveTo(-circleRadius * 0.6, -circleRadius)
        .lineTo(circleRadius * 0.1, -circleRadius)
        .lineTo(circleRadius * 0.8, circleRadius)
        .lineTo(-circleRadius * 0.4, circleRadius)
        .closePath();
      sheen.alpha = 0;
      sheen.x = -circleRadius;
      sheen.y = 0;
      wrapper.__sheenSpan = circleRadius * 2;
      wrapper.__sheenBaseX = sheen.x;
      wrapper.__sheenBaseY = sheen.y;
    }
  } else {
    var rectWidth = width != null ? width : 324;
    var rectHeight = height != null ? height : 120;
    var rectRadius = cornerRadius != null ? cornerRadius : 44;

    wrapper.__width = rectWidth;
    wrapper.__height = rectHeight;
    wrapper.__radius = rectRadius;

    if (shadow) {
      shadow.graphics
        .clear()
        .beginRadialGradientFill(
          ["rgba(8,18,44,0.32)", "rgba(8,18,44,0)"] ,
          [0, 1],
          0,
          rectHeight / 2 + 12,
          0,
          0,
          rectHeight / 2 + 12,
          rectWidth * 0.86
        )
        .drawEllipse(-rectWidth / 2, rectHeight / 2 + 18, rectWidth, 46);
      shadow.alpha = 0.46;
    }

    if (pulse) {
      pulse.graphics
        .clear()
        .beginLinearGradientFill(
          [palette.fill[0], palette.fill[1]],
          [0, 1],
          -rectWidth / 2,
          -rectHeight / 2,
          rectWidth / 2,
          rectHeight / 2
        )
        .drawRoundRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight, rectRadius);
      pulse.alpha = 0;
    }

    if (hitArea) {
      hitArea.graphics
        .clear()
        .beginFill("#000")
        .drawRoundRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight, rectRadius);
    }

    if (content) {
      content.x = 0;
      content.y = 0;
    }

    if (sheen) {
      var sheenWidth = rectWidth * 0.78;
      var sheenHeight = rectHeight * 0.36;
      sheen.graphics
        .clear()
        .beginLinearGradientFill(
          palette.sheen || ["rgba(255,255,255,0.8)", "rgba(255,255,255,0)"] ,
          [0, 1],
          -sheenWidth / 2,
          0,
          sheenWidth / 2,
          0
        )
        .moveTo(-sheenWidth / 2, -sheenHeight / 2)
        .lineTo(-sheenWidth / 2 + sheenHeight * 0.6, -sheenHeight / 2)
        .lineTo(sheenWidth / 2, sheenHeight / 2)
        .lineTo(sheenWidth / 2 - sheenHeight * 0.6, sheenHeight / 2)
        .closePath();
      sheen.alpha = 0;
      sheen.y = -rectHeight * 0.02;
      sheen.x = -rectWidth * 0.5;
      wrapper.__sheenSpan = rectWidth;
      wrapper.__sheenBaseX = sheen.x;
      wrapper.__sheenBaseY = sheen.y;
    }
  }

  paintCycleRaceOptionBackground(wrapper, wrapper.__palette.fill, wrapper.__palette.stroke);
}
function paintCycleRaceOptionBackground(wrapper, fillColors, strokeColors) {
  if (!wrapper) {
    return;
  }

  var variant = wrapper.__variant || "text";
  var background = wrapper.__background;
  var highlight = wrapper.__highlight;
  var width = wrapper.__width;
  var height = wrapper.__height;
  var radius = wrapper.__radius;
  var palette = wrapper.__palette || cycleRaceTextOptionPalette;

  var fill = fillColors || palette.fill;
  var stroke = strokeColors || palette.stroke;

  if (background) {
    background.graphics.clear().setStrokeStyle(4, "round", "round");

    if (variant === "image") {
      background.graphics
        .beginLinearGradientStroke(stroke, [0, 1], -radius, -radius, radius, radius)
        .beginRadialGradientFill(
          [fill[0], fill[1]],
          [0, 1],
          0,
          -radius * 0.6,
          radius * 0.2,
          0,
          0,
          radius
        )
        .drawCircle(0, 0, radius);
    } else {
      background.graphics
        .beginLinearGradientStroke(stroke, [0, 1], -width / 2, -height / 2, width / 2, height / 2)
        .beginLinearGradientFill(fill, [0, 1], -width / 2, -height / 2, width / 2, height / 2)
        .drawRoundRect(-width / 2, -height / 2, width, height, radius);
    }
  }

  if (highlight) {
    highlight.graphics.clear();

    if (variant === "image") {
      highlight.graphics
        .beginRadialGradientFill(
          palette.highlight,
          [0, 1],
          0,
          -radius * 0.65,
          radius * 0.25,
          0,
          0,
          radius * 0.92
        )
        .drawCircle(0, 0, Math.max(radius - 16, 40));
    } else {
      var insetX = Math.min(44, Math.max(28, width * 0.14));
      var insetY = Math.min(42, Math.max(24, height * 0.18));
      highlight.graphics
        .beginLinearGradientFill(
          palette.highlight,
          [0, 1],
          -width / 2 + insetX,
          -height / 2 + insetY,
          width / 2 - insetX,
          height / 2 - insetY
        )
        .drawRoundRect(
          -width / 2 + insetX,
          -height / 2 + insetY,
          width - insetX * 2,
          height - insetY * 2,
          Math.max(radius - 14, 20)
        );
    }
    highlight.alpha = 0.86;
  }
}

function SAUI_resetCycleRaceOptionBubble(wrapper) {
  if (!wrapper) {
    return;
  }

  paintCycleRaceOptionBackground(wrapper, wrapper.__palette.fill, wrapper.__palette.stroke);

  if (wrapper.__highlight) {
    createjs.Tween.removeTweens(wrapper.__highlight);
    wrapper.__highlight.alpha = 0.86;
  }

  if (wrapper.__pulse) {
    createjs.Tween.removeTweens(wrapper.__pulse);
    wrapper.__pulse.alpha = 0;
    wrapper.__pulse.scaleX = wrapper.__pulse.scaleY = 1;
  }

  if (wrapper.__sheen) {
    var sheen = wrapper.__sheen;
    createjs.Tween.removeTweens(sheen);
    sheen.alpha = 0.22;
    sheen.x = 0;
    sheen.y = 0;
  }

  if (typeof wrapper.__homeX === "number") {
    wrapper.x = wrapper.__homeX;
  }
  if (typeof wrapper.__homeY === "number") {
    wrapper.y = wrapper.__homeY;
  }

  wrapper.scaleX = wrapper.scaleY = 1;
  wrapper.alpha = 1;
}

function SAUI_showCycleRaceOptionBubble(wrapper, delay) {
  if (!wrapper) {
    return;
  }

  SAUI_resetCycleRaceOptionBubble(wrapper);

  wrapper.visible = true;
  wrapper.alpha = 0;
  wrapper.scaleX = wrapper.scaleY = 0.9;

  if (typeof wrapper.__homeX !== "number") {
    wrapper.__homeX = typeof wrapper.x === "number" ? wrapper.x : 0;
  } else if (typeof wrapper.x === "number") {
    wrapper.__homeX = wrapper.x;
  }

  if (typeof wrapper.__homeY !== "number") {
    wrapper.__homeY = typeof wrapper.y === "number" ? wrapper.y : 0;
  } else if (typeof wrapper.y === "number") {
    wrapper.__homeY = wrapper.y;
  }

  var baseY = wrapper.__homeY != null ? wrapper.__homeY : 0;
  wrapper.y = baseY + 48;

  createjs.Tween.removeTweens(wrapper);
  createjs.Tween.get(wrapper, { override: true })
    .wait(delay || 0)
    .to(
      { alpha: 1, scaleX: 1.08, scaleY: 1.08, y: baseY - 10 },
      280,
      createjs.Ease.quartOut
    )
    .to({ scaleX: 1, scaleY: 1, y: baseY }, 240, createjs.Ease.bounceOut);

  if (wrapper.__pulse) {
    var pulse = wrapper.__pulse;
    pulse.alpha = 0;
    pulse.scaleX = pulse.scaleY = 1;
    createjs.Tween.removeTweens(pulse);
    createjs.Tween.get(pulse, { override: true })
      .wait((delay || 0) + 80)
      .to({ alpha: 0.3, scaleX: pulse.__baseScale || 1.08, scaleY: pulse.__baseScale || 1.08 }, 320, createjs.Ease.quadOut)
      .to({ alpha: 0, scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadIn);
  }

  if (wrapper.__sheen) {
    wrapper.__sheen.alpha = 0.22;
    wrapper.__sheen.x = 0;
    wrapper.__sheen.y = 0;
  }
}

function SAUI_setCycleRaceOptionHoverState(wrapper, isHover) {
  if (!wrapper) {
    return;
  }

  var palette = wrapper.__palette || cycleRaceTextOptionPalette;
  paintCycleRaceOptionBackground(
    wrapper,
    isHover ? palette.hoverFill : palette.fill,
    isHover ? palette.hoverStroke : palette.stroke
  );

  if (wrapper.__highlight) {
    createjs.Tween.get(wrapper.__highlight, { override: true })
      .to({ alpha: isHover ? 1 : 0.86 }, 150, createjs.Ease.quadOut);
  }

  createjs.Tween.get(wrapper, { override: false })
    .to({ scaleX: isHover ? 1.04 : 1, scaleY: isHover ? 1.04 : 1 }, 160, createjs.Ease.quadOut);
}

function SAUI_startCycleRaceOptionIdle(wrapper) {
  if (!wrapper) {
    return;
  }

  if (typeof wrapper.__homeX === "number") {
    wrapper.x = wrapper.__homeX;
  }
  if (typeof wrapper.__homeY !== "number") {
    wrapper.__homeY = typeof wrapper.y === "number" ? wrapper.y : 0;
  }

  var baseY = wrapper.__homeY != null ? wrapper.__homeY : 0;

  if (wrapper.__pulse) {
    var pulse = wrapper.__pulse;
    createjs.Tween.removeTweens(pulse);
    pulse.alpha = 0.22;
    pulse.scaleX = pulse.scaleY = 1;
    createjs.Tween.get(pulse, { override: true, loop: true })
      .to({ alpha: 0.42, scaleX: pulse.__baseScale || 1.08, scaleY: pulse.__baseScale || 1.08 }, 900, createjs.Ease.sineInOut)
      .to({ alpha: 0.22, scaleX: 1, scaleY: 1 }, 900, createjs.Ease.sineInOut);
  }

  if (wrapper.__highlight) {
    var highlight = wrapper.__highlight;
    createjs.Tween.removeTweens(highlight);
    highlight.alpha = 0.88;
    createjs.Tween.get(highlight, { override: false, loop: true })
      .to({ alpha: 0.96 }, 720, createjs.Ease.sineInOut)
      .to({ alpha: 0.78 }, 720, createjs.Ease.sineInOut);
  }

  createjs.Tween.removeTweens(wrapper);
  createjs.Tween.get(wrapper, { override: false, loop: true })
    .wait(220 + Math.random() * 200)
    .to({ y: baseY - 12 }, 360, createjs.Ease.quadOut)
    .to({ y: baseY + 8 }, 420, createjs.Ease.sineInOut)
    .to({ y: baseY }, 360, createjs.Ease.sineOut)
    .wait(160);
}

function SAUI_stopCycleRaceOptionIdle(wrapper) {
  if (!wrapper) {
    return;
  }

  if (wrapper.__pulse) {
    createjs.Tween.removeTweens(wrapper.__pulse);
    wrapper.__pulse.alpha = 0;
    wrapper.__pulse.scaleX = wrapper.__pulse.scaleY = 1;
  }

  if (wrapper.__highlight) {
    createjs.Tween.removeTweens(wrapper.__highlight);
    wrapper.__highlight.alpha = 0.86;
  }

  createjs.Tween.removeTweens(wrapper);
  if (typeof wrapper.__homeX === "number") {
    wrapper.x = wrapper.__homeX;
  }
  if (typeof wrapper.__homeY === "number") {
    wrapper.y = wrapper.__homeY;
  }
  wrapper.scaleX = wrapper.scaleY = 1;
}

function SAUI_markCycleRaceOptionResult(wrapper, isCorrect) {
  if (!wrapper) {
    return;
  }

  var palette = wrapper.__palette || cycleRaceTextOptionPalette;
  paintCycleRaceOptionBackground(
    wrapper,
    isCorrect ? palette.correctFill : palette.wrongFill,
    isCorrect ? palette.correctStroke : palette.wrongStroke
  );

  if (wrapper.__highlight) {
    createjs.Tween.get(wrapper.__highlight, { override: true })
      .to({ alpha: isCorrect ? 1 : 0.6 }, 180, createjs.Ease.quadOut);
  }

  if (wrapper.__pulse) {
    createjs.Tween.removeTweens(wrapper.__pulse);
    wrapper.__pulse.alpha = 0;
  }

  if (wrapper.__sheen) {
    var sheen = wrapper.__sheen;
    createjs.Tween.removeTweens(sheen);
    sheen.alpha = 0;
  }

  createjs.Tween.get(wrapper, { override: false })
    .to({ scaleX: isCorrect ? 1.05 : 0.96, scaleY: isCorrect ? 1.05 : 0.96 }, 200, createjs.Ease.quadOut)
    .to({ scaleX: 1, scaleY: 1 }, 220, createjs.Ease.quadOut);
}

if (globalHelperScope) {
  globalHelperScope.SAUI_createCycleRaceSpeechBubble = SAUI_createCycleRaceSpeechBubble;
  globalHelperScope.SAUI_createCycleRaceQuestionLabel = SAUI_createCycleRaceQuestionLabel;
  globalHelperScope.SAUI_showCycleRaceSpeechBubble = SAUI_showCycleRaceSpeechBubble;
  globalHelperScope.SAUI_hideCycleRaceSpeechBubble = SAUI_hideCycleRaceSpeechBubble;
  globalHelperScope.SAUI_createCycleRaceHintBanner = SAUI_createCycleRaceHintBanner;
  globalHelperScope.SAUI_renderCycleRaceHintBanner = renderCycleRaceHintBanner;
  globalHelperScope.SAUI_showCycleRaceHintBanner = SAUI_showCycleRaceHintBanner;
  globalHelperScope.SAUI_hideCycleRaceHintBanner = SAUI_hideCycleRaceHintBanner;
  globalHelperScope.SAUI_createCycleRaceOptionBubble = SAUI_createCycleRaceOptionBubble;
  globalHelperScope.SAUI_showCycleRaceOptionBubble = SAUI_showCycleRaceOptionBubble;
  globalHelperScope.SAUI_resetCycleRaceOptionBubble = SAUI_resetCycleRaceOptionBubble;
  globalHelperScope.SAUI_setCycleRaceOptionHoverState = SAUI_setCycleRaceOptionHoverState;
  globalHelperScope.SAUI_startCycleRaceOptionIdle = SAUI_startCycleRaceOptionIdle;
  globalHelperScope.SAUI_stopCycleRaceOptionIdle = SAUI_stopCycleRaceOptionIdle;
  globalHelperScope.SAUI_markCycleRaceOptionResult = SAUI_markCycleRaceOptionResult;
  globalHelperScope.layoutCycleRaceOptionBubble = layoutCycleRaceOptionBubble;
  globalHelperScope.renderCycleRaceSpeechBubble = renderCycleRaceSpeechBubble;
}