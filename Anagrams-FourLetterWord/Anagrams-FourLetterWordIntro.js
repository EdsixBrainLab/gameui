var introQues1,
  introQuestxt,
  introChoice1,
  introChoice2,
  introChoice3,
  introChoice4,
  introClu1,
  introClu2,
  introClu3,
  introClu4,
  introHolder,
  introArrow,
  introfingure,
  introTitle;
var introChoice1TweenArr = [];
var TempIntroVal;
var highlightTweenArr = [];
var cluegotoArr = [];
var setIntroCnt = 0;
var removeIntraval = 0;
var introQuestxtX = 640;
var introQuestxtY = 150;
var introQues1X = 640;
var introQues1Y = 294;
var introChoice1X = 376;
var introChoice1Y = 620;
var introChoice2X = 552;
var introChoice2Y = 620;
var introChoice3X = 728;
var introChoice3Y = 620;
var introChoice4X = 904;
var introChoice4Y = 620;
var introChoiceDefaultX = [
  null,
  introChoice1X,
  introChoice2X,
  introChoice3X,
  introChoice4X
];
var introCluFallbackX = [
  null,
  460,
  580,
  700,
  820
];
var INTRO_WORD_LENGTH = 4;
var introChoiceBaseSpacing = 174;
var introChoiceBaseScale = 0.74;
var introChoiceMinScale = 0.56;
var introChoiceTileSpan = 150;
var introClueBaseSpacing = 128;
var introClueBaseScale = 0.9;
var introClueMinScale = 0.72;
var introClueTileSpan = 102;
var introClueTopRowY = 360;
var introClueBottomRowY = 490;
var introClueRowYPositions = [
  introClueTopRowY,
  introClueBottomRowY,
  introClueBottomRowY
];
var introClueSideOffsetRatio = 0.28;
var introClueSideOffsetMax = 340;
var introClueMinCenterMargin = 220;
var introArrowY = introClueTopRowY - 46;
var introfingureX = introChoice2X;
var introfingureY = introChoice2Y + 32;
var ArrowXArr = [null];
var FingXArr = [null];
var ArrowYArr = [null];
var FingYArr = [null];
var introClueArr = [];
var introClueBgArr = [];
var introChoiceBgArr = [];
var introChoiceGlowArr = [];
var introSupportRowBgArr = [];
var introClueLayouts = [];
var introChoiceRevealOrder = [null];
var introCurrentDemoIndex = 0;
var introDemoWords = [
  { word: "EDIT", choiceOrder: [1, 2, 3, 4], row: 0 },
  { word: "TIDE", choiceOrder: [4, 3, 2, 1], row: 1 },
  { word: "TIED", choiceOrder: [4, 3, 1, 2], row: 2 }
];
var introChoiceLetters = ["E", "D", "I", "T"];
var introGlobalScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : this;

function getIntroHelper(name) {
  if (introGlobalScope && typeof introGlobalScope[name] === "function") {
    return introGlobalScope[name];
  }
  return null;
}

var computeIntroRow =
  getIntroHelper("SAUI_computeCenteredRow") ||
  getIntroHelper("SAUI_computeRowLayout");
var highlightChoiceHelper = getIntroHelper("SAUI_highlightChoiceTile");
var markChoiceUsedHelper = getIntroHelper("SAUI_markChoiceTileUsed");
var styleClueSlotHelper = getIntroHelper("SAUI_styleClueSlot");
var highlightClueSlotHelper = getIntroHelper("SAUI_highlightClueSlot");

function introResolveCanvasWidth() {
  if (typeof canvas !== "undefined" && canvas && !isNaN(canvas.width)) {
    return canvas.width;
  }
  if (
    introGlobalScope &&
    introGlobalScope.canvas &&
    !isNaN(introGlobalScope.canvas.width)
  ) {
    return introGlobalScope.canvas.width;
  }
  return 1280;
}

function introGetBaseCenterX() {
  if (typeof introQuestxtX === "number") {
    return introQuestxtX;
  }
  return introResolveCanvasWidth() / 2;
}

function introComputeRowCenter(rowIndex) {
  var width = introResolveCanvasWidth();
  var baseCenter = introGetBaseCenterX();
  var rawOffset = width * introClueSideOffsetRatio;
  var computedOffset = Math.min(
    introClueSideOffsetMax,
    Math.max(rawOffset, 240)
  );
  var minCenter = Math.min(introClueMinCenterMargin, width / 2);

  if (rowIndex === 1) {
    return Math.max(minCenter, baseCenter - computedOffset);
  }
  if (rowIndex === 2) {
    return Math.min(width - minCenter, baseCenter + computedOffset);
  }
  return baseCenter;
}

function introFallbackComputeRow(count, options) {
  options = options || {};
  var width = introResolveCanvasWidth();
  var centerX =
    typeof options.centerX === "number" ? options.centerX : width / 2;
  var baseSpacing =
    options.baseSpacing != null ? options.baseSpacing : 134;
  var baseScale = options.baseScale != null ? options.baseScale : 1;
  var minScale = options.minScale != null ? options.minScale : 0.8;
  var maxSpan =
    options.maxSpan != null ? options.maxSpan : Math.max(720, width * 0.72);
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
}

function introComputeClueRowLayout(rowIndex) {
  if (introClueLayouts[rowIndex]) {
    return introClueLayouts[rowIndex];
  }

  var width = introResolveCanvasWidth();
  var layoutOptions = {
    centerX: introComputeRowCenter(rowIndex),
    baseSpacing: introClueBaseSpacing,
    baseScale: introClueBaseScale,
    minScale: introClueMinScale,
    maxSpan: Math.max(720, width * 0.72),
    tileSpan: introClueTileSpan
  };

  var layout =
    typeof computeIntroRow === "function"
      ? computeIntroRow(INTRO_WORD_LENGTH, layoutOptions)
      : null;

  if (
    !layout ||
    !layout.positions ||
    layout.positions.length !== INTRO_WORD_LENGTH
  ) {
    layout = introFallbackComputeRow(INTRO_WORD_LENGTH, layoutOptions);
  }

  introClueLayouts[rowIndex] = layout;
  return layout;
}

function introGetClueRowY(rowIndex) {
  if (
    introClueRowYPositions &&
    typeof introClueRowYPositions[rowIndex] === "number"
  ) {
    return introClueRowYPositions[rowIndex];
  }
  return rowIndex === 0 ? introClueTopRowY : introClueBottomRowY;
}

var configureIntroArrowSprite =
  getIntroHelper("SAUI_configureIntroArrowSprite") ||
  function (sprite) {
    if (!sprite) {
      return;
    }
    sprite.visible = false;
    sprite.alpha = 0;
  };

var configureIntroFingerSprite =
  getIntroHelper("SAUI_configureIntroFingerSprite") ||
  function (sprite) {
    if (!sprite) {
      return;
    }
    sprite.visible = false;
    sprite.alpha = 0;
  };

var buildIntroGlowShape = getIntroHelper("SAUI_buildIntroGlowShape") || function () {
  var glow = new createjs.Shape();
  glow.graphics
    .beginRadialGradientFill(
      ["rgba(209,178,255,0.55)", "rgba(209,178,255,0)"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      120
    )
    .drawCircle(0, 0, 120);
  glow.alpha = 0;
  glow.visible = false;
  glow.mouseEnabled = false;
  glow.mouseChildren = false;
  return glow;
};

function buildIntroChoiceLetter() {
  var builder =
    getIntroHelper("SA_buildChoiceLetterDisplay") ||
    getIntroHelper("SAUI_buildChoiceLetterDisplay");
  if (typeof builder === "function") {
    return builder({ interactive: false, baseScale: introChoiceBaseScale });
  }
  var txt = new createjs.Text("", "700 64px 'Baloo 2'", "#FFFFFF");
  txt.textAlign = "center";
  txt.textBaseline = "middle";
  txt.mouseEnabled = false;
  txt.mouseChildren = false;
  txt.__baseScale = introChoiceBaseScale;
  return txt;
}

function updateIntroChoiceLetter(display, letter) {
  var updater =
    getIntroHelper("SA_updateChoiceLetterDisplay") ||
    getIntroHelper("SAUI_updateChoiceLetterDisplay");
  if (typeof updater === "function") {
    updater(display, letter);
    return;
  }
  if (!display) {
    return;
  }
  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0;
}

function buildIntroClueLetter() {
  var builder =
    getIntroHelper("SA_buildClueLetterDisplay") ||
    getIntroHelper("SAUI_buildClueLetterDisplay");
  if (typeof builder === "function") {
    return builder({ baseScale: introClueBaseScale, interactive: false });
  }
  var txt = new createjs.Text("", "700 60px 'Baloo 2'", "#FFFFFF");
  txt.textAlign = "center";
  txt.textBaseline = "middle";
  txt.mouseEnabled = false;
  txt.mouseChildren = false;
  txt.__baseScale = introClueBaseScale;
  return txt;
}

function updateIntroClueLetter(display, letter) {
  var updater =
    getIntroHelper("SA_updateClueLetterDisplay") ||
    getIntroHelper("SAUI_updateClueLetterDisplay");
  if (typeof updater === "function") {
    updater(display, letter);
    return;
  }
  if (!display) {
    return;
  }
  var value = letter ? String(letter).toUpperCase() : "";
  display.text = value;
  display.alpha = value ? 1 : 0;
}

function introChoiceIndexFromStep(step) {
  if (!step) {
    return step;
  }
  return introChoiceRevealOrder && introChoiceRevealOrder[step]
    ? introChoiceRevealOrder[step]
    : step;
}

function highlightIntroChoiceTile(index, isActive) {
  if (!index) {
    return;
  }

  var tile = introGlobalScope && introGlobalScope["introChoice" + index];
  var bg = introChoiceBgArr[index];
  var glow = introChoiceGlowArr[index];

  if (typeof highlightChoiceHelper === "function") {
    highlightChoiceHelper({
      tile: tile,
      background: bg,
      glow: glow,
      active: isActive
    });
    return;
  }

  if (bg) {
    var baseScale =
      bg.__baseScale != null ? bg.__baseScale : introChoiceBaseScale * 1.06;
    drawChoiceTileBackground(
      bg,
      isActive ? CHOICE_TILE_HOVER_COLORS : CHOICE_TILE_BASE_COLORS
    );
    createjs.Tween.get(bg, { override: true })
      .to(
        {
          scaleX: baseScale * (isActive ? 1.05 : 1),
          scaleY: baseScale * (isActive ? 1.05 : 1),
          alpha: isActive ? 1 : 0.95
        },
        200,
        createjs.Ease.quadOut
      );
  }

  if (tile) {
    var tileBase =
      tile.__baseScale || tile.scaleX || introChoiceBaseScale;
    createjs.Tween.get(tile, { override: true })
      .to(
        {
          scaleX: tileBase * (isActive ? 1.08 : 1),
          scaleY: tileBase * (isActive ? 1.08 : 1),
          alpha: isActive ? 1 : tile.alpha
        },
        200,
        createjs.Ease.quadOut
      );
  }

  if (glow) {
    createjs.Tween.get(glow, { override: true })
      .to({ alpha: isActive ? 0.52 : 0.35 }, 220, createjs.Ease.quadOut);
  }
}

function setIntroChoiceUsed(index) {
  if (!index) {
    return;
  }

  var tile = introGlobalScope && introGlobalScope["introChoice" + index];
  var bg = introChoiceBgArr[index];
  var glow = introChoiceGlowArr[index];

  if (typeof markChoiceUsedHelper === "function") {
    markChoiceUsedHelper({
      tile: tile,
      background: bg,
      glow: glow
    });
    return;
  }

  if (bg) {
    drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
    createjs.Tween.get(bg, { override: true })
      .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
  }

  if (tile) {
    createjs.Tween.get(tile, { override: true })
      .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
  }

  if (glow) {
    createjs.Tween.get(glow, { override: true })
      .to({ alpha: 0.2 }, 200, createjs.Ease.quadOut);
  }
}

function styleIntroClueSlot(index, isFilled) {
  if (!index) {
    return;
  }

  var bg = introClueBgArr[index];
  if (!bg) {
    return;
  }

  if (typeof styleClueSlotHelper === "function") {
    styleClueSlotHelper({
      background: bg,
      filled: isFilled
    });
    return;
  }

  var baseScale =
    bg.__baseScale != null ? bg.__baseScale : introClueBaseScale;
  var colors = isFilled ? CLUE_SLOT_SUCCESS_COLORS : CLUE_SLOT_BASE_COLORS;
  drawClueSlotBackground(bg, colors);
  createjs.Tween.get(bg, { override: true })
    .to(
      {
        scaleX: baseScale * (isFilled ? 1.06 : 1),
        scaleY: baseScale * (isFilled ? 1.06 : 1),
        alpha: isFilled ? 1 : 0.95
      },
      220,
      createjs.Ease.quadOut
    )
    .to({ scaleX: baseScale, scaleY: baseScale }, 180, createjs.Ease.quadOut);
}

function highlightIntroClueTarget(index) {
  if (!index) {
    return;
  }

  var bg = introClueBgArr[index];
  if (!bg) {
    return;
  }

  if (typeof highlightClueSlotHelper === "function") {
    highlightClueSlotHelper({ background: bg });
    return;
  }

  var baseScale =
    bg.__baseScale != null ? bg.__baseScale : introClueBaseScale;
  drawClueSlotBackground(bg, CLUE_SLOT_HIGHLIGHT_COLORS);
  createjs.Tween.get(bg, { override: true })
    .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04, alpha: 1 }, 220, createjs.Ease.quadOut)
    .to({ scaleX: baseScale, scaleY: baseScale }, 200, createjs.Ease.quadOut);
}

function ensureSupportRowBackground(rowIndex) {
  if (introSupportRowBgArr[rowIndex]) {
    return introSupportRowBgArr[rowIndex];
  }

  var rowBg = new createjs.Shape();
  var rowY = introGetClueRowY(rowIndex);
  var layout = introComputeClueRowLayout(rowIndex);
  var positions =
    layout && layout.positions && layout.positions.length === INTRO_WORD_LENGTH
      ? layout.positions
      : introCluFallbackX.slice(1);
  var leftX = positions[0] != null ? positions[0] : introCluFallbackX[1];
  var rightX =
    positions[positions.length - 1] != null
      ? positions[positions.length - 1]
      : introCluFallbackX[4];
  var width = Math.max(320, rightX - leftX + introClueTileSpan + 64);
  var height = 120;
  rowBg.graphics
    .beginLinearGradientFill(
      ["rgba(30,22,74,0.18)", "rgba(30,22,74,0.08)"],
      [0, 1],
      0,
      -height / 2,
      0,
      height / 2
    )
    .drawRoundRect(-width / 2, -height / 2, width, height, 44);
  rowBg.alpha = 0.45;
  rowBg.visible = false;
  rowBg.mouseEnabled = false;
  rowBg.mouseChildren = false;
  introSupportRowBgArr[rowIndex] = rowBg;
  container.parent.addChild(rowBg);
  return rowBg;
}

function commongameintro() {
  introClueArr = [];
  introClueBgArr = [null];
  introChoiceBgArr = [null];
  introChoiceGlowArr = [null];
  ArrowXArr = [null];
  ArrowYArr = [null];
  FingXArr = [null];
  FingYArr = [null];
  introChoiceRevealOrder = [null];
  introClueLayouts = [];
  TempIntroVal = 0;
  introArrowY = introClueTopRowY - 46;

  var demoConfig =
    introDemoWords[introCurrentDemoIndex] || introDemoWords[0] || {
      word: "EDIT",
      choiceOrder: [1, 2, 3, 4],
      row: 0
    };

  introTitle = Title.clone();
  introClu1 = buildIntroClueLetter();
  introClu2 = buildIntroClueLetter();
  introClu3 = buildIntroClueLetter();
  introClu4 = buildIntroClueLetter();
  introChoice1 = buildIntroChoiceLetter();
  introChoice2 = buildIntroChoiceLetter();
  introChoice3 = buildIntroChoiceLetter();
  introChoice4 = buildIntroChoiceLetter();
  introArrow = arrow1.clone();
  introfingure = fingure.clone();
  configureIntroArrowSprite(introArrow);
  configureIntroFingerSprite(introfingure);

  container.parent.addChild(introTitle);
  introTitle.visible = true;

  call_UI_introQuestionCardContainer(container, "DIET");

  introQuestxt = QusTxtString.clone();
  container.parent.addChild(introQuestxt);
  introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {
    padX: 20,
    padY: 12,
    fill: "rgba(0,0,0,0.3)",
    stroke: "rgba(255,255,255,0.14)",
    strokeW: 2,
    maxRadius: 22
  });
  introQuestxt.visible = true;
  introQuestxt.x = introQuestxtX;
  introQuestxt.y = introQuestxtY;

  if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
    introQuestxt.__labelBG.update();
  }

  var choicePointerTargets = {};
  var choiceConfigs = [
    { index: 1, letter: introChoiceLetters[0] },
    { index: 2, letter: introChoiceLetters[1] },
    { index: 3, letter: introChoiceLetters[2] },
    { index: 4, letter: introChoiceLetters[3] }
  ];

  var resolvedChoiceX = introChoiceDefaultX.slice();
  var choiceLayout = null;
  if (typeof computeIntroRow === "function") {
    choiceLayout = computeIntroRow(choiceConfigs.length, {
      centerX: introQuestxtX,
      baseSpacing: introChoiceBaseSpacing,
      baseScale: introChoiceBaseScale,
      minScale: introChoiceMinScale,
      tileSpan: introChoiceTileSpan,
      maxSpan: Math.max(720, introResolveCanvasWidth() * 0.72)
    });

    if (
      choiceLayout &&
      choiceLayout.positions &&
      choiceLayout.positions.length === choiceConfigs.length
    ) {
      resolvedChoiceX = [null];
      for (var p = 0; p < choiceLayout.positions.length; p++) {
        resolvedChoiceX.push(choiceLayout.positions[p]);
      }
    }
  }

  introChoice1X = resolvedChoiceX[1] != null ? resolvedChoiceX[1] : introChoiceDefaultX[1];
  introChoice2X = resolvedChoiceX[2] != null ? resolvedChoiceX[2] : introChoiceDefaultX[2];
  introChoice3X = resolvedChoiceX[3] != null ? resolvedChoiceX[3] : introChoiceDefaultX[3];
  introChoice4X = resolvedChoiceX[4] != null ? resolvedChoiceX[4] : introChoiceDefaultX[4];
  introfingureX = introChoice2X;
  introfingureY = introChoice2Y + 32;

  var resolvedChoiceScale =
    choiceLayout && typeof choiceLayout.scale === "number"
      ? choiceLayout.scale
      : introChoiceBaseScale;

  for (var c = 0; c < choiceConfigs.length; c++) {
    var cfg = choiceConfigs[c];
    cfg.x = resolvedChoiceX[cfg.index] != null ? resolvedChoiceX[cfg.index] : introChoiceDefaultX[cfg.index];
    cfg.y = introChoice1Y;
    var glow = buildIntroGlowShape();
    glow.x = cfg.x;
    glow.y = cfg.y + 6;
    glow.visible = false;
    glow.alpha = 0;
    introChoiceGlowArr[cfg.index] = glow;
    container.parent.addChild(glow);

    var bg = new createjs.Shape();
    drawChoiceTileBackground(bg);
    bg.x = cfg.x;
    bg.y = cfg.y;
    bg.visible = false;
    bg.alpha = 0;
    var baseLetterScale = resolvedChoiceScale;
    bg.__baseScale = baseLetterScale * 1.06;
    bg.shadow = new createjs.Shadow("rgba(10,18,44,0.45)", 0, 12, 28);
    bg.mouseEnabled = false;
    bg.mouseChildren = false;
    introChoiceBgArr[cfg.index] = bg;
    container.parent.addChild(bg);

    var letter = introGlobalScope && introGlobalScope["introChoice" + cfg.index];
    if (!letter) {
      continue;
    }
    letter.x = cfg.x;
    letter.y = cfg.y;
    letter.scaleX = letter.scaleY = baseLetterScale;
    letter.__baseScale = baseLetterScale;
    letter.__baseX = cfg.x;
    letter.__baseY = cfg.y;
    letter.visible = false;
    updateIntroChoiceLetter(letter, cfg.letter);
    container.parent.addChild(letter);

    var tileScale = letter.__baseScale || baseLetterScale;
    glow.scaleX = glow.scaleY = tileScale * 1.28;
    glow.__baseScale = glow.scaleX;

    var bgScale =
      bg.__baseScale != null ? bg.__baseScale : introChoiceBaseScale * 1.06;
    var tileHeight = 148 * bgScale;
    var tileTop = cfg.y - tileHeight / 2;
    var tipTargetY = tileTop + tileHeight * 0.28;
    choicePointerTargets[cfg.index] = {
      x: cfg.x,
      tipY: tipTargetY,
      tileTop: tileTop,
      tileHeight: tileHeight
    };
  }

  var clueRowIndex = typeof demoConfig.row === "number" ? demoConfig.row : 0;
  var clueLayout = introComputeClueRowLayout(clueRowIndex);
  var cluePositions =
    clueLayout &&
    clueLayout.positions &&
    clueLayout.positions.length === INTRO_WORD_LENGTH
      ? clueLayout.positions
      : introCluFallbackX.slice(1);
  var clueScale =
    clueLayout && typeof clueLayout.scale === "number"
      ? clueLayout.scale
      : introClueBaseScale;
  var clueY = introGetClueRowY(clueRowIndex);
  introArrowY = clueY - 46;

  for (var supportIndex = 0; supportIndex < introDemoWords.length; supportIndex++) {
    var supportBg = ensureSupportRowBackground(supportIndex);
    if (supportBg) {
      supportBg.y = introGetClueRowY(supportIndex);
      supportBg.visible = true;
      supportBg.alpha = supportIndex === clueRowIndex ? 0.55 : 0.25;
    }
  }

  var clueConfigs = [
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 }
  ];

  introClueArr.push("");
  for (var k = 0; k < clueConfigs.length; k++) {
    var clueCfg = clueConfigs[k];
    var resolvedX =
      cluePositions.length > k && cluePositions[k] != null
        ? cluePositions[k]
        : introCluFallbackX[clueCfg.index];
    clueCfg.x = resolvedX;
    clueCfg.y = clueY;

    var clueBg = new createjs.Shape();
    drawClueSlotBackground(clueBg);
    clueBg.x = clueCfg.x;
    clueBg.y = clueCfg.y;
    clueBg.scaleX = clueBg.scaleY = clueScale;
    clueBg.visible = false;
    clueBg.alpha = 0;
    clueBg.__baseScale = clueScale;
    clueBg.shadow = new createjs.Shadow("rgba(8,14,30,0.42)", 0, 10, 24);
    clueBg.mouseEnabled = false;
    clueBg.mouseChildren = false;
    introClueBgArr[clueCfg.index] = clueBg;
    container.parent.addChild(clueBg);

    var clueLetter = introGlobalScope && introGlobalScope["introClu" + clueCfg.index];
    if (!clueLetter) {
      continue;
    }
    clueLetter.x = clueCfg.x;
    clueLetter.y = clueCfg.y;
    clueLetter.scaleX = clueLetter.scaleY = clueScale;
    clueLetter.__baseX = clueCfg.x;
    clueLetter.__baseY = clueCfg.y;
    clueLetter.__baseScale = clueScale;
    clueLetter.visible = false;
    updateIntroClueLetter(clueLetter, "");
    container.parent.addChild(clueLetter);
    introClueArr.push(clueLetter);

    var slotHeight = 112 * clueScale;
    var clueTop = clueCfg.y - slotHeight / 2;
    var tipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
    ArrowXArr[clueCfg.index] = clueCfg.x;
    ArrowYArr[clueCfg.index] = clueTop - tipGap;
  }

  introChoiceRevealOrder = [null].concat(demoConfig.choiceOrder || [1, 2, 3, 4]);
  cluegotoArr = [""];
  var wordLetters = (demoConfig.word || "EDIT").split("");
  for (var w = 0; w < wordLetters.length; w++) {
    cluegotoArr.push(wordLetters[w]);
  }

  for (var step = 1; step < introChoiceRevealOrder.length; step++) {
    var choiceIndex = introChoiceIndexFromStep(step);
    var pointer = choicePointerTargets[choiceIndex];
    if (pointer) {
      FingXArr[step] = pointer.x;
      FingYArr[step] = pointer.tipY;
      ArrowXArr[step] = pointer.x;
      var arrowTipGap = introArrow && typeof introArrow.__tipGap === "number" ? introArrow.__tipGap : 24;
      var pointerTileTop = typeof pointer.tileTop === "number" ? pointer.tileTop : pointer.tipY - 32;
      var effectiveGap = Math.max(arrowTipGap - 12, arrowTipGap * 0.6);
      ArrowYArr[step] = pointerTileTop - effectiveGap;
    }
  }

  introArrow.visible = false;
  introArrow.alpha = 0;
  introfingure.visible = false;
  introfingure.alpha = 0;

  introQuestxt.alpha = 0;
  createjs.Tween.get(introQuestxt)
    .to({ alpha: 1 }, 1000)
    .call(handleComplete1_1);
}

function handleComplete1_1() {
  createjs.Tween.removeAllTweens();
  quesTween();
}

function quesTween() {
  questionCardContainer_htp.visible = true;
  questionCardContainer_htp.alpha = 0;
  createjs.Tween.get(questionCardContainer_htp)
    .wait(1000)
    .to({ alpha: 1 }, 500)
    .call(handleComplete2_1);
}

function handleComplete2_1() {
  choiceTween();
}

function choiceTween() {
  var val = 700;
  for (var i = 1; i < 5; i++) {
    var choiceLetter = introGlobalScope && introGlobalScope["introChoice" + i];
    var choiceBg = introChoiceBgArr[i];
    var choiceGlow = introChoiceGlowArr[i];
    var clueLetter = introClueArr[i];
    var clueBg = introClueBgArr[i];

    if (!choiceLetter) {
      continue;
    }
    highlightTweenArr[0] = null;
  }

    if (clueBg) {
      clueBg.visible = true;
      clueBg.alpha = 0;
      clueBg.scaleX = clueBg.scaleY =
        clueBg.__baseScale != null ? clueBg.__baseScale : introClueBaseScale;
      createjs.Tween.get(clueBg, { override: true })
        .wait(Math.max(val - 320, 0))
        .to({ alpha: 0.95 }, 260, createjs.Ease.quadOut);
    }

    if (clueLetter) {
      clueLetter.visible = true;
      clueLetter.alpha = 0;
      createjs.Tween.get(clueLetter, { override: true })
        .wait(Math.max(val - 320, 0))
        .to({ alpha: 0.95 }, 260, createjs.Ease.quadOut)
        .call(
          (function (idx) {
            return function () {
              styleIntroClueSlot(idx, false);
            };
          })(i)
        );
    }

    if (choiceBg) {
      choiceBg.visible = true;
      choiceBg.alpha = 0;
      choiceBg.scaleX = choiceBg.scaleY =
        choiceBg.__baseScale != null
          ? choiceBg.__baseScale
          : introChoiceBaseScale * 1.06;
      createjs.Tween.get(choiceBg, { override: true })
        .wait(val)
        .to({ alpha: 0.95 }, 320, createjs.Ease.quadOut);
    }

    if (choiceGlow) {
      choiceGlow.visible = true;
      choiceGlow.alpha = 0;
      var glowBase =
        choiceGlow.__baseScale != null
          ? choiceGlow.__baseScale
          : introChoiceBaseScale * 1.28;
      choiceGlow.scaleX = choiceGlow.scaleY = glowBase * 1.05;
      createjs.Tween.get(choiceGlow, { override: true })
        .wait(val)
        .to({ alpha: 0.35 }, 320, createjs.Ease.quadOut);
    }

    choiceLetter.visible = true;
    choiceLetter.alpha = 0;
    choiceLetter.y = introChoice1Y + 32;
    var revealTween = createjs.Tween.get(choiceLetter, { override: true })
      .wait(val)
      .to({ y: introChoice1Y, alpha: 1 }, 400, createjs.Ease.quadOut);

    if (i === 4) {
      revealTween.call(handleComplete4_1);
    }

    val += 220;
  }
  TempIntroVal = 0;
}

function handleComplete4_1() {
  if (TempIntroVal !== 0) {
    var clueLetter = introClueArr[TempIntroVal];
    if (clueLetter) {
      clueLetter.visible = true;
      updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
      styleIntroClueSlot(TempIntroVal, true);
    }
    highlightTweenArr[1] = null;
  }

    var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
    if (usedChoiceIndex) {
      highlightIntroChoiceTile(usedChoiceIndex, false);
      setIntroChoiceUsed(usedChoiceIndex);
    }
  }
  createjs.Tween.removeTweens(introArrow);
  createjs.Tween.removeTweens(introfingure);
  setArrowTween();
}

function setArrowTween() {
  TempIntroVal++;

  if (stopValue == 0) {
    removeGameIntro();
  } else {
    if (TempIntroVal >= cluegotoArr.length) {
      removeGameIntro();
      return;
    }

    var targetChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
    var targetChoice =
      targetChoiceIndex
        ? introGlobalScope && introGlobalScope["introChoice" + targetChoiceIndex]
        : null;

    if (TempIntroVal > 1) {
      var prevChoiceIndex = introChoiceIndexFromStep(TempIntroVal - 1);
      if (prevChoiceIndex) {
        highlightIntroChoiceTile(prevChoiceIndex, false);
      }
    }

    if (targetChoiceIndex && targetChoice && targetChoice.alpha >= 0.9) {
      highlightIntroChoiceTile(targetChoiceIndex, true);
    }

    var pendingClue = introClueArr[TempIntroVal];
    if (pendingClue && (!pendingClue.text || pendingClue.text === "")) {
      highlightIntroClueTarget(TempIntroVal);
    }

    container.parent.addChild(introArrow);
    container.parent.setChildIndex(
      introArrow,
      container.parent.numChildren - 1
    );

    introArrow.visible = true;
    introArrow.alpha = 0;
    introfingure.visible = false;
    introfingure.alpha = 0;

    var arrowTargetX =
      typeof ArrowXArr[TempIntroVal] === "number"
        ? ArrowXArr[TempIntroVal]
        : introGetBaseCenterX();
    var defaultTipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
    var fallbackTipY = introArrowY - (56 + defaultTipGap);
    var arrowTipY =
      typeof ArrowYArr[TempIntroVal] === "number"
        ? ArrowYArr[TempIntroVal]
        : fallbackTipY;
    var arrowBounce = introArrow && introArrow.__bounceOffset ? introArrow.__bounceOffset : 18;
    var arrowUpY = arrowTipY - arrowBounce;

    introArrow.x = arrowTargetX;
    introArrow.y = arrowTipY;

    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.get(introArrow)
      .to({ alpha: 1 }, 180, createjs.Ease.quadOut);

    highlightTweenArr[0] = createjs.Tween.get(introArrow)
      .to({ y: arrowUpY }, 250)
      .to({ y: arrowTipY }, 250)
      .to({ y: arrowUpY }, 250)
      .to({ y: arrowTipY }, 250)
      .wait(400)
      .call(this.onComplete1);
  }
}

function setFingureTween() {
  if (stopValue == 0) {
    removeGameIntro();
  } else {
    container.parent.removeChild(introArrow);
    introArrow.visible = false;
    introArrow.alpha = 0;
    container.parent.addChild(introfingure);
    container.parent.setChildIndex(
      introfingure,
      container.parent.numChildren - 1
    );

    var pointerOffsetX = introfingure.__pointerOffsetX || 0;
    var pointerOffsetY = introfingure.__pointerOffsetY || 0;
    var fingerTargetX =
      typeof FingXArr[TempIntroVal] === "number"
        ? FingXArr[TempIntroVal]
        : introfingureX;
    var fingerTargetY =
      typeof FingYArr[TempIntroVal] === "number"
        ? FingYArr[TempIntroVal]
        : introfingureY;
    var fingerBaseX = fingerTargetX - pointerOffsetX;
    var fingerBaseY = fingerTargetY - pointerOffsetY;
    var pressDistance =
      typeof introfingure.__pressDistance === "number"
        ? introfingure.__pressDistance
        : 18;
    var fingerPressX = fingerBaseX - pressDistance;

    introfingure.visible = true;
    introfingure.alpha = 0;
    introfingure.x = fingerBaseX;
    introfingure.y = fingerBaseY;

    createjs.Tween.removeTweens(introfingure);
    createjs.Tween.get(introfingure)
      .to({ alpha: 1 }, 180, createjs.Ease.quadOut);
    var activeChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
    if (activeChoiceIndex) {
      var activeChoice = introGlobalScope && introGlobalScope["introChoice" + activeChoiceIndex];
      if (activeChoice && activeChoice.alpha >= 0.9) {
        highlightIntroChoiceTile(activeChoiceIndex, true);
      }
    }
    var isFinalStep = TempIntroVal === cluegotoArr.length - 1;
    var fingerTween = createjs.Tween.get(introfingure)
      .to({ x: fingerBaseX }, 300)
      .to({ x: fingerPressX }, 300)
      .to({ x: fingerBaseX }, 300)
      .to({ x: fingerPressX }, 300)
      .wait(200);

    if (isFinalStep) {
      fingerTween.call(this.onComplete2);
    } else {
      fingerTween.call(handleComplete4_1);
    }

    highlightTweenArr[1] = fingerTween;
  }
}

this.onComplete1 = function () {
  createjs.Tween.removeTweens(introArrow);
  createjs.Tween.removeTweens(introfingure);

  if (highlightTweenArr[0]) {
    if (typeof highlightTweenArr[0].setPaused === "function") {
      highlightTweenArr[0].setPaused(true);
    }
    highlightTweenArr[0] = null;
  }

  container.parent.removeChild(introArrow);
  introArrow.visible = false;
  introArrow.alpha = 0;
  if (stopValue == 0) {
    removeGameIntro();
  } else {
    setTimeout(setFingureTween, 200);
  }
};

this.onComplete2 = function () {
  createjs.Tween.removeTweens(introArrow);
  createjs.Tween.removeTweens(introfingure);

  var clueLetter = introClueArr[TempIntroVal];
  if (clueLetter) {
    clueLetter.visible = true;
    updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
    styleIntroClueSlot(TempIntroVal, true);
  }

  var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
  if (usedChoiceIndex) {
    highlightIntroChoiceTile(usedChoiceIndex, false);
    setIntroChoiceUsed(usedChoiceIndex);
  }

  if (highlightTweenArr[1]) {
    if (typeof highlightTweenArr[1].setPaused === "function") {
      highlightTweenArr[1].setPaused(true);
    }
    highlightTweenArr[1] = null;
  }

  container.parent.removeChild(introfingure);
  introfingure.visible = false;
  introfingure.alpha = 0;

  if (stopValue == 0) {
    removeGameIntro();
  } else {
    setTimeout(setCallDelay, 500);
  }
};

function setCallDelay() {
  clearInterval(removeIntraval);
  removeIntraval = 0;
  setIntroCnt++;
  removeGameIntro();
  if (stopValue == 0) {
    removeGameIntro();
  } else {
    introCurrentDemoIndex = (introCurrentDemoIndex + 1) % introDemoWords.length;
    commongameintro();
    if (setIntroCnt > 0) {
      isVisibleStartBtn();
    }
  }
}

function removeGameIntro() {
  createjs.Tween.removeAllTweens();

  container.parent.removeChild(introArrow);
  introArrow.visible = false;
  introArrow.alpha = 0;
  container.parent.removeChild(introfingure);
  introfingure.visible = false;
  introfingure.alpha = 0;
  container.parent.removeChild(questionCardContainer_htp);
  questionCardContainer_htp.visible = false;
  if (introQuestxt && introQuestxt.__labelBG) {
    introQuestxt.__labelBG.destroy();
  }
  introQuestxt.visible = false;
  container.parent.removeChild(introQuestxt);
  introQuestxt = null;

  for (var i = 1; i < 5; i++) {
    var choiceLetter = introGlobalScope && introGlobalScope["introChoice" + i];
    if (choiceLetter) {
      container.parent.removeChild(choiceLetter);
      choiceLetter.visible = false;
    }
    if (introChoiceBgArr[i]) {
      container.parent.removeChild(introChoiceBgArr[i]);
      introChoiceBgArr[i] = null;
    }
    if (introChoiceGlowArr[i]) {
      container.parent.removeChild(introChoiceGlowArr[i]);
      introChoiceGlowArr[i] = null;
    }
    if (introClueArr[i]) {
      introClueArr[i].visible = false;
    }
    if (introClueBgArr[i]) {
      container.parent.removeChild(introClueBgArr[i]);
      introClueBgArr[i] = null;
    }
  }

  for (var r = 0; r < introSupportRowBgArr.length; r++) {
    if (introSupportRowBgArr[r]) {
      container.parent.removeChild(introSupportRowBgArr[r]);
      introSupportRowBgArr[r] = null;
    }
  }
  introSupportRowBgArr = [];

  if (highlightTweenArr[0]) {
    if (typeof highlightTweenArr[0].setPaused === "function") {
      highlightTweenArr[0].setPaused(true);
    }
    highlightTweenArr[0] = null;
  }
  if (highlightTweenArr[1]) {
    if (typeof highlightTweenArr[1].setPaused === "function") {
      highlightTweenArr[1].setPaused(true);
    }
    highlightTweenArr[1] = null;
  }
  introClueArr = [];
  cluegotoArr = [];
}

