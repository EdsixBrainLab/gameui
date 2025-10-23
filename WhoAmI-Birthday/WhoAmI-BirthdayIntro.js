var INTRO_CLUE_ROW_Y = typeof CLUE_ROW_Y === "number" ? CLUE_ROW_Y : 475;
var INTRO_CHOICE_ROW_Y = typeof CHOICE_ROW_Y === "number" ? CHOICE_ROW_Y : 620;
var INTRO_QUESTION_Y = typeof QUESTION_CARD_Y === "number" ? QUESTION_CARD_Y : 280;

var introQuestionLetters = ["C", "A", "", "E"];
var introRevealLetters = ["C", "A", "K", "E"];
var introChoiceLetters = ["L", "M", "K"];

var introTitle = null;
var introPrompt = null;
var introQuestionContainer = null;
var introQuestionImage = null;
var introQuestionImageHolder = null;
var introQuestionGlow = null;
var introClueSlots = [];
var introChoiceTiles = [];
var introArrow = null;
var introFinger = null;
var introTimeline = null;

var INTRO_FALLBACK_PROMPT_TEXT =
  "Click on the correct letter to complete the name of the items in a birthday party";

var introGlobalScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : this;

var introMarkChoiceUsed =
  introGlobalScope && typeof introGlobalScope.SAUI_markChoiceTileUsed === "function"
    ? introGlobalScope.SAUI_markChoiceTileUsed
    : null;

var introBuildChoice =
  introGlobalScope && typeof introGlobalScope.SAUI_buildChoiceLetterDisplay === "function"
    ? introGlobalScope.SAUI_buildChoiceLetterDisplay
    : function () {
        var text = new createjs.Text("", CHOICE_LETTER_FONT, "#FFFFFF");
        text.textAlign = "center";
        text.textBaseline = "middle";
        text.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
        text.__baseScale = 0.8;
        return text;
      };

var introUpdateChoice =
  introGlobalScope && typeof introGlobalScope.SAUI_updateChoiceLetterDisplay === "function"
    ? introGlobalScope.SAUI_updateChoiceLetterDisplay
    : function (display, letter) {
        if (!display) {
          return;
        }
        display.text = letter || "";
        display.alpha = letter ? 1 : 0;
      };

var introBuildClue =
  introGlobalScope && typeof introGlobalScope.SAUI_buildClueLetterDisplay === "function"
    ? introGlobalScope.SAUI_buildClueLetterDisplay
    : function () {
        var text = new createjs.Text("", CLUE_LETTER_FONT, "#FFFFFF");
        text.textAlign = "center";
        text.textBaseline = "middle";
        text.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
        text.__baseScale = 1;
        return text;
      };

var introUpdateClue =
  introGlobalScope && typeof introGlobalScope.SAUI_updateClueLetterDisplay === "function"
    ? introGlobalScope.SAUI_updateClueLetterDisplay
    : function (display, letter) {
        if (!display) {
          return;
        }
        display.text = letter || "";
        display.alpha = letter ? 1 : 0;
      };

function formatIntroTitleText() {
  var rawTitle =
    (introGlobalScope &&
      typeof introGlobalScope.GameNameWithLvl === "string" &&
      introGlobalScope.GameNameWithLvl) ||
    (introGlobalScope &&
      typeof introGlobalScope.GameName === "string" &&
      introGlobalScope.GameName) ||
    "Who Am I";

  rawTitle = rawTitle.replace(/[_-]+/g, " ");
  rawTitle = rawTitle.replace(/([a-z])([A-Z])/g, "$1 $2");
  rawTitle = rawTitle.replace(/\s+/g, " ").trim();

  return rawTitle.replace(/\b([a-z])/gi, function (match) {
    return match.toUpperCase();
  });
}

function buildFallbackTitleDisplay() {
  var titleText = new createjs.Text(formatIntroTitleText(), "800 56px 'Baloo 2'", "#FFFFFF");
  titleText.textAlign = "center";
  titleText.textBaseline = "middle";
  titleText.shadow = new createjs.Shadow("rgba(5,12,28,0.45)", 0, 10, 26);
  titleText.mouseEnabled = false;
  titleText.mouseChildren = false;
  return titleText;
}

function buildFallbackPromptDisplay() {
  var prompt = new createjs.Text(
    INTRO_FALLBACK_PROMPT_TEXT,
    "700 28px 'Baloo 2'",
    "#EAF2FF"
  );
  prompt.textAlign = "center";
  prompt.textBaseline = "middle";
  prompt.lineWidth = 960;
  prompt.lineHeight = 40;
  prompt.shadow = new createjs.Shadow("rgba(6,16,38,0.36)", 0, 12, 26);
  prompt.mouseEnabled = false;
  prompt.mouseChildren = false;
  return prompt;
}

function buildFallbackArrowSprite() {
  var arrow = new createjs.Shape();
  arrow.graphics
    .beginFill("rgba(255,255,255,0.92)")
    .moveTo(0, 0)
    .lineTo(-68, -30)
    .lineTo(-68, 30)
    .closePath();
  arrow.shadow = new createjs.Shadow("rgba(8,18,36,0.22)", 0, 12, 18);
  arrow.setBounds(-68, -30, 68, 60);
  arrow.mouseEnabled = false;
  arrow.mouseChildren = false;
  return arrow;
}

function buildFallbackFingerSprite() {
  var finger = new createjs.Container();
  var palm = new createjs.Shape();
  palm.graphics
    .beginFill("rgba(255,255,255,0.95)")
    .drawRoundRect(-16, -4, 32, 64, 16);
  palm.shadow = new createjs.Shadow("rgba(8,18,36,0.18)", 0, 10, 22);
  var fingertip = new createjs.Shape();
  fingertip.graphics.beginFill("rgba(255,220,220,0.95)").drawCircle(0, -28, 16);
  finger.addChild(palm, fingertip);
  finger.setBounds(-16, -32, 32, 96);
  finger.mouseEnabled = false;
  finger.mouseChildren = false;
  finger.__baseScale = 0.78;
  finger.__pointerTipBase = { x: 8, y: 42 };
  finger.__pressDistanceBase = 18;
  return finger;
}

function cloneIntroDisplayObject(source, fallbackBuilder) {
  if (source && typeof source.clone === "function") {
    try {
      return source.clone();
    } catch (err) {
      // fall back to manual builders when cloning fails
    }
  }
  return typeof fallbackBuilder === "function" ? fallbackBuilder() : null;
}

function introStartPlaceholderTwinkle(target) {
  if (!target) {
    return;
  }
  createjs.Tween.get(target, { loop: true, override: true })
    .to({ alpha: 0.35 }, 600, createjs.Ease.sineInOut)
    .to({ alpha: 0.85 }, 600, createjs.Ease.sineInOut);
}

function introStopPlaceholderTwinkle(target) {
  if (!target) {
    return;
  }
  createjs.Tween.removeTweens(target);
  target.alpha = 0;
}

function buildIntroPlaceholderShape() {
  var shape = new createjs.Shape();
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
    38
  );
  g.drawCircle(0, 0, 38);
  g.beginFill("rgba(255,255,255,0.85)");
  g.drawPolyStar(0, 0, 12, 5, 0.5, -90);
  shape.alpha = 0;
  shape.mouseEnabled = false;
  shape.mouseChildren = false;
  return shape;
}

function buildIntroClueSlot() {
  var container = new createjs.Container();
  container.visible = false;
  container.alpha = 0;
  container.mouseEnabled = false;
  container.mouseChildren = false;

  var bg = new createjs.Shape();
  drawClueSlotBackground(bg, CLUE_SLOT_BASE_COLORS);
  bg.shadow = new createjs.Shadow("rgba(6,14,30,0.45)", 0, 10, 24);
  container.addChild(bg);

  var placeholder = buildIntroPlaceholderShape();
  placeholder.y = CLUE_LETTER_VERTICAL_OFFSET;
  container.addChild(placeholder);

  var label = introBuildClue();
  label.y = CLUE_LETTER_VERTICAL_OFFSET;
  container.addChild(label);

  container.bg = bg;
  container.placeholder = placeholder;
  container.label = label;

  return container;
}

function buildIntroChoiceTile() {
  var container = new createjs.Container();
  container.visible = false;
  container.alpha = 0;
  container.mouseEnabled = false;
  container.mouseChildren = false;

  var glow = new createjs.Shape();
  glow.graphics
    .beginRadialGradientFill([
      "rgba(209,178,255,0.6)",
      "rgba(209,178,255,0)"
    ], [0, 1], 0, 0, 0, 0, 0, 120)
    .drawCircle(0, 0, 120);
  glow.alpha = 0;
  glow.visible = true;
  container.addChild(glow);

  var bg = new createjs.Shape();
  drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
  bg.shadow = new createjs.Shadow("rgba(9,18,36,0.4)", 0, 16, 32);
  container.addChild(bg);

  var label = introBuildChoice();
  label.mouseEnabled = false;
  label.mouseChildren = false;
  container.addChild(label);

  container.glow = glow;
  container.bg = bg;
  container.label = label;

  return container;
}

function commongameintro() {
  var stageRef = container.parent || stage;
  var canvasCenterX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;

  introTitle = cloneIntroDisplayObject(
    typeof Title !== "undefined" ? Title : null,
    buildFallbackTitleDisplay
  );
  if (introTitle) {
    if (introTitle.textAlign != null) {
      introTitle.textAlign = "center";
    }
    if (introTitle.textBaseline != null) {
      introTitle.textBaseline = "middle";
    }
    introTitle.x = canvasCenterX;
    introTitle.y = INTRO_TITLE_Y;
    stageRef.addChild(introTitle);
  }

  introPrompt = cloneIntroDisplayObject(
    typeof QusTxtString !== "undefined" ? QusTxtString : null,
    buildFallbackPromptDisplay
  );
  if (introPrompt) {
    introPrompt.visible = true;
    introPrompt.alpha = 0;
    introPrompt.x = introTitle ? introTitle.x : canvasCenterX;
    var basePromptY =
      typeof QusTxtString !== "undefined" && QusTxtString && typeof QusTxtString.y === "number"
        ? QusTxtString.y
        : INTRO_PROMPT_Y - 55;
    introPrompt.y = basePromptY;
    if (typeof SAUI_attachQuestionLabelBG === "function") {
      introPrompt.__labelBG = SAUI_attachQuestionLabelBG(introPrompt, stageRef, {
        padX: 20,
        padY: 12,
        fill: "rgba(0,0,0,0.3)",
        stroke: "rgba(255,255,255,0.14)",
        strokeW: 2,
        maxRadius: 22
      });
    }
    stageRef.addChild(introPrompt);
  }

  introQuestionContainer = new createjs.Container();
  introQuestionContainer.visible = false;
  introQuestionContainer.alpha = 0;
  introQuestionContainer.mouseEnabled = false;
  introQuestionContainer.mouseChildren = false;
  introQuestionContainer.x = introTitle ? introTitle.x : canvasCenterX;
  introQuestionContainer.y = INTRO_QUESTION_Y;
  stageRef.addChild(introQuestionContainer);

  var cardShadow = new createjs.Shape();
  var shadowWidth = QUESTION_CARD_WIDTH + 48;
  var shadowHeight = QUESTION_CARD_HEIGHT + 24;
  cardShadow.graphics
    .beginFill("rgba(8,18,36,0.28)")
    .drawRoundRect(
      -shadowWidth / 2,
      -shadowHeight / 2,
      shadowWidth,
      shadowHeight,
      QUESTION_CARD_CORNER_RADIUS + 8
    );
  cardShadow.y = 6;
  cardShadow.alpha = 0.34;
  introQuestionContainer.addChild(cardShadow);

  var cardBg = new createjs.Shape();
  cardBg.graphics
    .beginLinearGradientFill(
      ["rgba(124,100,252,0.95)", "rgba(82,54,192,0.95)"],
      [0, 1],
      0,
      -QUESTION_CARD_HEIGHT / 2,
      0,
      QUESTION_CARD_HEIGHT / 2
    )
    .drawRoundRect(
      -QUESTION_CARD_WIDTH / 2,
      -QUESTION_CARD_HEIGHT / 2,
      QUESTION_CARD_WIDTH,
      QUESTION_CARD_HEIGHT,
      QUESTION_CARD_CORNER_RADIUS
    );
  introQuestionContainer.addChild(cardBg);

  introQuestionGlow = new createjs.Shape();
  introQuestionGlow.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.5)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      -60,
      0,
      0,
      0,
      QUESTION_CARD_WIDTH * 0.6
    )
    .drawCircle(0, 0, QUESTION_CARD_WIDTH * 0.6);
  introQuestionGlow.alpha = 0;
  introQuestionContainer.addChild(introQuestionGlow);

  introQuestionImageHolder = new createjs.Container();
  introQuestionImageHolder.mouseEnabled = false;
  introQuestionImageHolder.mouseChildren = false;
  introQuestionContainer.addChild(introQuestionImageHolder);

  if (typeof questionSprite !== "undefined" && questionSprite) {
    introQuestionImage = questionSprite.clone();
    introQuestionImage.visible = true;
    introQuestionImage.gotoAndStop(0);
    introQuestionImage.scaleX = introQuestionImage.scaleY = 0.62;
    introQuestionImageHolder.addChild(introQuestionImage);
  }

  introArrow = cloneIntroDisplayObject(
    typeof arrow1 !== "undefined" ? arrow1 : null,
    buildFallbackArrowSprite
  );
  introFinger = cloneIntroDisplayObject(
    typeof fingure !== "undefined" ? fingure : null,
    buildFallbackFingerSprite
  );
  configureIntroArrowSprite(introArrow);
  configureIntroFingerSprite(introFinger);
  if (introArrow) {
    introArrow.visible = false;
    introArrow.alpha = 0;
    stageRef.addChild(introArrow);
  }
  if (introFinger) {
    introFinger.visible = false;
    introFinger.alpha = 0;
    stageRef.addChild(introFinger);
  }

  var clueLayout = computeRowLayout(introQuestionLetters.length, {
    baseSpacing: 140,
    baseScale: 1,
    minScale: 0.82,
    maxSpan: 600,
    tileSpan: 108,
    centerX: introTitle.x
  });

  for (var i = 0; i < introQuestionLetters.length; i++) {
    if (!introClueSlots[i]) {
      introClueSlots[i] = buildIntroClueSlot();
      stageRef.addChild(introClueSlots[i]);
    }
    var slot = introClueSlots[i];
    slot.x = clueLayout.positions[i];
    slot.y = INTRO_CLUE_ROW_Y;
    slot.scaleX = slot.scaleY = clueLayout.scale;
    slot.visible = false;
    slot.alpha = 0;

    var letter = introQuestionLetters[i];
    drawClueSlotBackground(slot.bg, letter ? CLUE_SLOT_BASE_COLORS : CLUE_SLOT_HIGHLIGHT_COLORS);
    introUpdateClue(slot.label, letter);

    if (!letter) {
      slot.placeholder.visible = true;
      slot.placeholder.alpha = 0.85;
      introStartPlaceholderTwinkle(slot.placeholder);
    } else {
      slot.placeholder.visible = false;
      slot.placeholder.alpha = 0;
      introStopPlaceholderTwinkle(slot.placeholder);
    }
  }

  var choiceLayout = computeRowLayout(introChoiceLetters.length, {
    baseSpacing: 200,
    baseScale: 0.82,
    minScale: 0.68,
    maxSpan: 640,
    tileSpan: 160,
    centerX: introTitle.x
  });

  for (var j = 0; j < introChoiceLetters.length; j++) {
    if (!introChoiceTiles[j]) {
      introChoiceTiles[j] = buildIntroChoiceTile();
      stageRef.addChild(introChoiceTiles[j]);
    }
    var tile = introChoiceTiles[j];
    tile.x = choiceLayout.positions[j];
    tile.y = INTRO_CHOICE_ROW_Y;
    tile.scaleX = tile.scaleY = choiceLayout.scale;
    tile.visible = false;
    tile.alpha = 0;
    tile.label.__baseScale = choiceLayout.scale;
    introUpdateChoice(tile.label, introChoiceLetters[j]);
  }

  introSequence();
}

function introSequence() {
  var stageRef = container.parent || stage;
  var correctIndex = introChoiceLetters.indexOf("K");
  if (correctIndex < 0) {
    correctIndex = introChoiceLetters.length - 1;
  }

  introTimeline = new createjs.Timeline();

  introTimeline.addTween(
    createjs.Tween.get(introPrompt, { override: true })
      .wait(200)
      .to({ alpha: 1 }, 300, createjs.Ease.quadOut)
  );

  introTimeline.addTween(
    createjs.Tween.get(introQuestionContainer, { override: true })
      .wait(360)
      .to({ alpha: 1, scaleX: 0.86, scaleY: 0.86 }, 360, createjs.Ease.quadOut)
      .to({ scaleX: 0.82, scaleY: 0.82 }, 220, createjs.Ease.quadOut)
  );

  if (introQuestionGlow) {
    introTimeline.addTween(
      createjs.Tween.get(introQuestionGlow, { override: true })
        .wait(520)
        .to({ alpha: 0.78 }, 280, createjs.Ease.quadOut)
        .to({ alpha: 0.18 }, 420, createjs.Ease.quadOut)
    );
  }

  for (var i = 0; i < introClueSlots.length; i++) {
    var slot = introClueSlots[i];
    if (!slot) continue;
    introTimeline.addTween(
      createjs.Tween.get(slot, { override: true })
        .wait(620 + i * 120)
        .to({ alpha: 1 }, 260, createjs.Ease.quadOut)
    );
  }

  for (var j = 0; j < introChoiceTiles.length; j++) {
    var tile = introChoiceTiles[j];
    if (!tile) continue;
    introTimeline.addTween(
      createjs.Tween.get(tile, { override: true })
        .wait(980 + j * 160)
        .to({ alpha: 1 }, 280, createjs.Ease.quadOut)
    );
    introTimeline.addTween(
      createjs.Tween.get(tile.glow, { override: true })
        .wait(980 + j * 160)
        .to({ alpha: 0.6 }, 280, createjs.Ease.quadOut)
        .to({ alpha: 0.12 }, 420, createjs.Ease.quadOut)
    );
  }

  introTimeline.addTween(
    createjs.Tween.get(introArrow, { override: true })
      .wait(1500)
      .call(function () {
        introArrow.visible = true;
        introFinger.visible = true;
        var targetTile = introChoiceTiles[correctIndex];
        if (!targetTile) {
          return;
        }
        introArrow.x = targetTile.x + 18;
        introArrow.y = targetTile.y - 130;
        introFinger.x = targetTile.x + 40;
        introFinger.y = targetTile.y + 40;
        introFinger.alpha = 1;
      })
      .to({ alpha: 1 }, 240, createjs.Ease.quadOut)
      .wait(160)
      .call(function () {
        if (introMarkChoiceUsed) {
          introMarkChoiceUsed({
            tile: introChoiceTiles[correctIndex].label,
            background: introChoiceTiles[correctIndex].bg,
            glow: introChoiceTiles[correctIndex].glow,
            correct: true
          });
        } else {
          drawChoiceTileBackground(introChoiceTiles[correctIndex].bg, CHOICE_TILE_CORRECT_COLORS);
        }
        introUpdateClue(introClueSlots[2].label, introRevealLetters[2]);
        introClueSlots[2].placeholder.visible = false;
        introClueSlots[2].placeholder.alpha = 0;
      })
      .wait(260)
      .to({ alpha: 0 }, 320, createjs.Ease.quadOut)
      .call(function () {
        for (var i = 0; i < introChoiceTiles.length; i++) {
          if (!introChoiceTiles[i]) continue;
          drawChoiceTileBackground(introChoiceTiles[i].bg, CHOICE_TILE_BASE_COLORS);
          introUpdateChoice(introChoiceTiles[i].label, introChoiceLetters[i]);
        }
        introUpdateClue(introClueSlots[2].label, "");
        introClueSlots[2].placeholder.visible = true;
        introClueSlots[2].placeholder.alpha = 0.82;
        introStartPlaceholderTwinkle(introClueSlots[2].placeholder);
      })
      .wait(420)
      .to({ alpha: 1 }, 220, createjs.Ease.quadOut)
  );

  introTimeline.setPaused(false);
}

function stopIntro() {
  if (introTimeline) {
    introTimeline.setPaused(true);
    introTimeline = null;
  }
  if (introArrow) {
    introArrow.visible = false;
  }
  if (introFinger) {
    introFinger.visible = false;
  }
}

function removeGameIntro() {
  stopIntro();

  if (introTitle) {
    if (introTitle.parent) {
      introTitle.parent.removeChild(introTitle);
    }
    introTitle = null;
  }

  if (introPrompt) {
    if (introPrompt.__labelBG && typeof introPrompt.__labelBG.destroy === "function") {
      introPrompt.__labelBG.destroy();
    }
    if (introPrompt.parent) {
      introPrompt.parent.removeChild(introPrompt);
    }
    introPrompt = null;
  }

  if (introQuestionContainer) {
    introQuestionContainer.removeAllChildren();
    if (introQuestionContainer.parent) {
      introQuestionContainer.parent.removeChild(introQuestionContainer);
    }
    introQuestionContainer = null;
  }

  introQuestionImage = null;
  introQuestionImageHolder = null;
  introQuestionGlow = null;

  if (introArrow) {
    if (introArrow.parent) {
      introArrow.parent.removeChild(introArrow);
    }
    introArrow = null;
  }

  if (introFinger) {
    if (introFinger.parent) {
      introFinger.parent.removeChild(introFinger);
    }
    introFinger = null;
  }

  for (var i = 0; i < introClueSlots.length; i++) {
    var slot = introClueSlots[i];
    if (!slot) {
      continue;
    }
    if (slot.placeholder) {
      introStopPlaceholderTwinkle(slot.placeholder);
    }
    if (slot.parent) {
      slot.parent.removeChild(slot);
    }
    introClueSlots[i] = null;
  }

  introClueSlots.length = 0;

  for (var j = 0; j < introChoiceTiles.length; j++) {
    var tile = introChoiceTiles[j];
    if (!tile) {
      continue;
    }
    if (tile.parent) {
      tile.parent.removeChild(tile);
    }
    introChoiceTiles[j] = null;
  }

  introChoiceTiles.length = 0;
}
