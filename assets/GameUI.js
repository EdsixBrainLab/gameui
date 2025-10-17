var ambientLayer,
  overlayLayer,
  ambientGradientLayer,
  ambientAuroraLayer,
  ambientSparkLayer,
  ambientOrbs = [],
  ambientSparkGeneration = 0;
var questionSubtitle,  questionCardContainer,  questionCardBackground, questionCardHighlight,  questionCardShadow,  circleOutline, questionCardContainer_htp,questionCardShadow_htp,in_introQues1;
var QusTxtString;
var INTRO_TITLE_Y = 75;
var INTRO_PROMPT_Y = 210;
var QUESTION_CARD_WIDTH = 720;
var QUESTION_CARD_HEIGHT = 168;
var QUESTION_CARD_CORNER_RADIUS = 44;

var CHOICE_TILE_BASE_COLORS = ["rgba(104,84,214,0.98)", "rgba(68,52,158,0.98)"];
var CHOICE_TILE_HOVER_COLORS = ["rgba(140,110,248,1)", "rgba(94,68,208,1)"];
var CHOICE_TILE_CORRECT_COLORS = ["rgba(72,204,164,0.98)", "rgba(38,132,110,0.98)"];
var CHOICE_TILE_WRONG_COLORS = ["rgba(242,132,152,0.98)", "rgba(170,64,102,0.98)"];
var CLUE_SLOT_BASE_COLORS = ["rgba(32,58,104,0.92)", "rgba(19,36,74,0.92)"];
var CLUE_SLOT_HIGHLIGHT_COLORS = ["rgba(89,156,255,0.9)", "rgba(44,92,178,0.9)"];
var CLUE_SLOT_SUCCESS_COLORS = ["rgba(72,196,167,0.92)", "rgba(42,128,104,0.92)"];
var CLUE_SLOT_ERROR_COLORS = ["rgba(255,125,141,0.92)", "rgba(158,42,64,0.92)"];

var choiceDisableOverlayArr = [];
var choiceReadyPulseArr = [];
var choiceReadyBadgeArr = [];
var choiceReadyTweenArr = [];
var choiceReadyBadgeTweenArr = [];
var choiceLiveAccentArr = [];
var choiceLiveAccentTweenArr = [];

var timeUpOverlay,
  timeUpOverlayBg,
  timeUpIconContainer,
  timeUpIconHand,
  timeUpIconGlow,
  timeUpText;

function call_UI_ambientOverlay(incontainer) {
  ambientLayer = new createjs.Container();
  incontainer.addChild(ambientLayer);
  overlayLayer = new createjs.Container();
  incontainer.addChild(overlayLayer);
  createAmbientBackground();
}

function call_UI_gameQuestion(incontainer, in_questiontext) {
  QusTxtString = new createjs.Text(
    in_questiontext,
    "700 40px 'Baloo 2'",
    "#F6F1FF"
  );
  QusTxtString.shadow = new createjs.Shadow("rgba(8,14,32,0.45)", 0, 12, 24);
  QusTxtString.textAlign = "center";
  QusTxtString.textBaseline = "middle";
  QusTxtString.lineWidth = 1000;
  QusTxtString.lineHeight = 40;
  var promptCenterX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;
  QusTxtString.x = promptCenterX;
  QusTxtString.y = INTRO_PROMPT_Y - 20;
  QusTxtString.alpha = 0.98;
  incontainer.parent.addChild(QusTxtString);
  QusTxtString.visible = false;
  QusTxtString.__labelBG = SAUI_attachQuestionLabelBG(QusTxtString, incontainer.parent, {
    padX: 32,
    padY: 18,
    fill: "rgba(34,24,78,0.68)",
    stroke: "rgba(255,255,255,0.18)",
    strokeW: 2,
    maxRadius: 28
  });

  QusTxtString.__layoutHalfHeight = (QusTxtString.lineHeight || 34) / 2;

  if (typeof refreshResponsiveLayout === "function") {
    refreshResponsiveLayout(true);
  }
}

function call_UI_introQuestionCardContainer(incontainer, in_question) {
  questionCardContainer_htp = new createjs.Container();
  questionCardContainer_htp.x = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : introQues1X;
  questionCardContainer_htp.y = introQues1Y;
  questionCardContainer_htp.alpha = 0;
  questionCardContainer_htp.visible = false;
  questionCardContainer_htp.mouseEnabled = false;
  questionCardContainer_htp.mouseChildren = false;
  questionCardContainer_htp.__baseY = introQues1Y;

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

  in_introQues1 = new createjs.Text(in_question, "800 66px 'Baloo 2'", "#F4FAFF");
  in_introQues1.x = 0;
  in_introQues1.y = 0;
  in_introQues1.textAlign = "center";
  in_introQues1.textBaseline = "middle";
  in_introQues1.shadow = new createjs.Shadow("rgba(5,12,28,0.5)", 0, 10, 26);
  in_introQues1.visible = true;

  questionCardContainer_htp.addChild(in_introQues1);
  incontainer.parent.addChild(questionCardContainer_htp);
}

  if (timeUpIconContainer) {
    createjs.Tween.removeTweens(timeUpIconContainer);
    timeUpIconContainer.scaleX = timeUpIconContainer.scaleY = 1;
    createjs.Tween.get(timeUpIconContainer, { override: true })
      .to({ scaleX: 1.08, scaleY: 1.08 }, 320, createjs.Ease.backOut)
      .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadInOut);
  }

  createjs.Tween.get(overlay)
    .wait(1180)
    .to({ alpha: 0 }, 240, createjs.Ease.quadIn)
    .call(function () {
      hideGameplayTimeUpBanner(true);
      if (typeof onComplete === "function") {
        onComplete();
      }
    });
}

function drawChoiceTileBackground(targetShape, colors) {
  if (targetShape) {
    var gradient = colors || CHOICE_TILE_BASE_COLORS;
    targetShape.graphics
      .clear()
      .beginLinearGradientFill(gradient, [0, 1], -120, -80, 120, 80)
      .drawRoundRect(-68, -54, 152, 132, 38)
      .beginLinearGradientStroke(["rgba(255,255,255,0.26)", "rgba(255,255,255,0)"] , [0, 1], -120, -64, 120, 64)
      .setStrokeStyle(2)
      .drawRoundRect(-68, -54, 152, 132, 38);
  }
}

function drawClueSlotBackground(targetShape, colors) {
  if (targetShape) {
    var gradient = colors || CLUE_SLOT_BASE_COLORS;
    targetShape.graphics
      .clear()
      .beginLinearGradientFill(gradient, [0, 1], -60, -60, 60, 60)
      .drawRoundRect(-42, -50, 100, 100, 20);
  }
}

function ensureChoiceDecorations(index) {
  if (!(index == null || index < 0) && container && container.parent) {
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

    if (!choiceLiveAccentArr[index]) {
      var accent = new createjs.Shape();
      var accentGraphics = accent.graphics;
      accentGraphics
        .beginLinearGradientFill(
          ["rgba(124,196,255,0.38)", "rgba(124,196,255,0)", "rgba(96,148,255,0)"] ,
          [0, 0.6, 1],
          0,
          -60,
          0,
          42
        )
        .drawRoundRect(-54, -32, 108, 48, 28);
      accentGraphics
        .beginLinearGradientFill(
          ["rgba(124,196,255,0.32)", "rgba(124,196,255,0)"] ,
          [0, 1],
          0,
          0,
          0,
          40
        )
        .moveTo(-10, 12)
        .lineTo(0, 32)
        .lineTo(10, 12)
        .closePath();
      accent.visible = false;
      accent.alpha = 0;
      accent.mouseEnabled = false;
      accent.mouseChildren = false;
      choiceLiveAccentArr[index] = accent;
      parent.addChild(accent);
    }
  }
}

function positionChoiceDecorations(index) {
  if (choiceArr[index] && container && container.parent) {
    var parent = container.parent;
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var overlay = choiceDisableOverlayArr[index];
    var pulse = choiceReadyPulseArr[index];
    var badge = choiceReadyBadgeArr[index];
    var glow = choiceGlowArr ? choiceGlowArr[index] : null;
    var baseScale = tile.__baseScale || tile.scaleX || 1;
    var bgScale = bg && bg.__baseScale ? bg.__baseScale : baseScale * 1.08;
    var accent = choiceLiveAccentArr[index];

    if (bg) {
      bg.x = tile.x;
      bg.y = tile.y;
      bg.visible = tile.visible;
      bg.scaleX = bg.scaleY = bgScale;
      try {
        parent.setChildIndex(bg, Math.max(parent.getChildIndex(tile) - 1, 0));
      } catch (err) {}
    }

    if (glow) {
      glow.x = tile.x;
      glow.y = tile.y + 6;
      glow.scaleX = glow.scaleY = glow.__targetScale || baseScale * 1.26;
      try {
        parent.setChildIndex(glow, parent.getChildIndex(tile) - 1);
      } catch (err) {}
    }

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

    if (accent) {
      var accentOffset = Math.max(76, baseScale * 92);
      accent.x = tile.x;
      accent.y = tile.y - accentOffset;
      accent.__baseScale = baseScale * 1.05;
      accent.scaleX = accent.scaleY = accent.__baseScale;
      try {
        parent.setChildIndex(accent, parent.getChildIndex(tile) + 4);
      } catch (err) {}
    }
  }
}

function stopChoiceReadyPulse(index) {
  if (index != null) {
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
}

function stopChoiceReadyBadgeAnimation(index) {
  var badge = choiceReadyBadgeArr[index];
  if (badge) {
    if (choiceReadyBadgeTweenArr[index]) {
      try {
        choiceReadyBadgeTweenArr[index].setPaused(true);
      } catch (err) {}
      choiceReadyBadgeTweenArr[index] = null;
    }

    createjs.Tween.removeTweens(badge);
    badge.scaleX = badge.scaleY = 1;
    badge.alpha = 0;
  }
}

function hideChoiceReadyBadge(index) {
  var badge = choiceReadyBadgeArr[index];
  if (badge) {
    stopChoiceReadyBadgeAnimation(index);
    badge.visible = false;
    badge.alpha = 0;
    badge.scaleX = badge.scaleY = 1;
  }
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
  stopChoiceLiveAccent(index);
}

function setChoiceDisabledAppearance(index) {
  if (choiceArr[index]) {
    var overlay = choiceDisableOverlayArr[index];
    var pulse = choiceReadyPulseArr[index];

    if (overlay) {
      overlay.visible = true;
      overlay.alpha = 0.45;
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
    stopChoiceLiveAccent(index);
  }
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
    stopChoiceReadyBadgeAnimation(index);
    badge.visible = true;
    badge.scaleX = badge.scaleY = 0.6;
    badge.alpha = 0;
    choiceReadyBadgeTweenArr[index] = createjs.Tween.get(badge, { override: true })
      .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 260, createjs.Ease.backOut)
      .wait(900)
      .to({ alpha: 0 }, 220, createjs.Ease.quadIn)
      .call(function () {
        badge.visible = false;
        badge.scaleX = badge.scaleY = 1;
        choiceReadyBadgeTweenArr[index] = null;
      });
  }

  startChoiceLiveAccent(index);
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

  stopChoiceLiveAccent(index);
}

function startChoiceLiveAccent(index) {
  var accent = choiceLiveAccentArr[index];
  var tile = choiceArr[index];
  if (accent && tile) {
    stopChoiceLiveAccent(index);

    if (typeof positionChoiceDecorations === "function") {
      positionChoiceDecorations(index);
    }

    accent.visible = true;
    accent.alpha = 0;
    var baseScale = accent.__baseScale || (tile.__baseScale || tile.scaleX || 1) * 1.05;
    accent.scaleX = accent.scaleY = baseScale * 0.86;
    accent.__baseScale = baseScale;

    choiceLiveAccentTweenArr[index] = createjs.Tween.get(accent, { loop: true })
      .to({ alpha: 0.55, scaleX: baseScale, scaleY: baseScale }, 320, createjs.Ease.quadOut)
      .to({ alpha: 0.18, scaleX: baseScale * 1.12, scaleY: baseScale * 1.12 }, 420, createjs.Ease.quadIn)
      .wait(160);
  }
}

function stopChoiceLiveAccent(index) {
  var accent = choiceLiveAccentArr[index];
  if (accent) {
    if (choiceLiveAccentTweenArr[index]) {
      try {
        choiceLiveAccentTweenArr[index].setPaused(true);
      } catch (err) {}
      choiceLiveAccentTweenArr[index] = null;
    }

    createjs.Tween.removeTweens(accent);
    accent.alpha = 0;
    accent.visible = false;
    if (accent.__baseScale) {
      accent.scaleX = accent.scaleY = accent.__baseScale;
    }
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
      ["rgba(18,34,72,0.96)", "rgba(12,24,52,0.96)"],
      [0, 1],
      -200,
      -80,
      200,
      80
    )
    .drawRoundRect(-220, -92, 440, 184, 36);
  timeUpOverlay.addChild(timeUpOverlayBg);

  var overlayHighlight = new createjs.Shape();
  overlayHighlight.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.18)", "rgba(255,255,255,0)"],
      [0, 1],
      -180,
      -60,
      180,
      60
    )
    .drawRoundRect(-184, -66, 368, 132, 28);
  overlayHighlight.alpha = 0.65;
  timeUpOverlay.addChild(overlayHighlight);

  timeUpIconContainer = new createjs.Container();
  timeUpIconContainer.x = -110;
  timeUpOverlay.addChild(timeUpIconContainer);

  var iconBg = new createjs.Shape();
  iconBg.graphics
    .beginLinearGradientFill(
      ["#623ff5", "#8d65ff"],
      [0, 1],
      -42,
      -42,
      42,
      42
    )
    .drawCircle(0, 0, 46);
  timeUpIconContainer.addChild(iconBg);

  var iconInner = new createjs.Shape();
  iconInner.graphics
    .beginLinearGradientFill(
      ["rgba(255,255,255,0.26)", "rgba(255,255,255,0)"],
      [0, 1],
      -26,
      -26,
      26,
      26
    )
    .drawCircle(0, 0, 32);
  iconInner.y = -4;
  timeUpIconContainer.addChild(iconInner);

  var iconTick = new createjs.Shape();
  iconTick.graphics
    .setStrokeStyle(4, "round")
    .beginStroke("rgba(255,255,255,0.88)")
    .moveTo(0, -30)
    .lineTo(0, 0)
    .lineTo(24, 0);
  iconTick.shadow = new createjs.Shadow("rgba(18,26,52,0.55)", 0, 6, 8);
  iconTick.rotation = -6;
  timeUpIconContainer.addChild(iconTick);

  timeUpIconHand = new createjs.Shape();
  timeUpIconHand.graphics
    .setStrokeStyle(6, "round")
    .beginStroke("#F9F0FF")
    .moveTo(0, 0)
    .lineTo(0, -24)
    .moveTo(0, 0)
    .lineTo(20, 0);
  timeUpIconHand.shadow = new createjs.Shadow("rgba(18,26,52,0.65)", 0, 4, 6);
  timeUpIconHand.rotation = -42;
  timeUpIconContainer.addChild(timeUpIconHand);

  timeUpIconGlow = new createjs.Shape();
  timeUpIconGlow.graphics
    .beginRadialGradientFill(
      ["rgba(124,206,255,0.48)", "rgba(124,206,255,0)"] ,
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      86
    )
    .drawCircle(0, 0, 86);
  timeUpIconGlow.alpha = 0;
  timeUpIconContainer.addChildAt(timeUpIconGlow, 0);

  var iconSpark = new createjs.Shape();
  iconSpark.graphics
    .beginRadialGradientFill(
      ["rgba(255,255,255,0.42)", "rgba(255,255,255,0)"],
      [0, 1],
      0,
      0,
      0,
      0,
      0,
      64
    )
    .drawCircle(0, 0, 64);
  iconSpark.alpha = 0.65;
  timeUpIconContainer.addChild(iconSpark);

  timeUpText = new createjs.Text("Time's Up!", "800 44px 'Baloo 2'", "#F7F2FF");
  timeUpText.textAlign = "left";
  timeUpText.textBaseline = "middle";
  timeUpText.shadow = new createjs.Shadow("rgba(6,12,28,0.6)", 0, 6, 10);
  timeUpText.x = -42;
  timeUpOverlay.addChild(timeUpText);

  container.parent.addChild(timeUpOverlay);

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

  var centerX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvas && !isNaN(canvas.width) ? canvas.width / 2 : 0;
  var centerY = canvas && !isNaN(canvas.height) ? canvas.height / 2 : 360;

  overlay.x = centerX;
  overlay.y = centerY - 20;
  overlay.scaleX = overlay.scaleY = 0.92;
  overlay.alpha = 0;
  overlay.visible = true;

  createjs.Tween.removeTweens(overlay);
  createjs.Tween.get(overlay, { override: true })
    .to({ alpha: 1, scaleX: 1.04, scaleY: 1.04 }, 260, createjs.Ease.quadOut)
    .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.quadInOut);

  if (timeUpIconHand) {
    createjs.Tween.removeTweens(timeUpIconHand);
    timeUpIconHand.rotation = -42;
    createjs.Tween.get(timeUpIconHand, { override: true })
      .to({ rotation: 12 }, 420, createjs.Ease.quadOut)
      .to({ rotation: -8 }, 260, createjs.Ease.quadInOut);
  }

  if (timeUpIconGlow) {
    createjs.Tween.removeTweens(timeUpIconGlow);
    timeUpIconGlow.alpha = 0.08;
    timeUpIconGlow.scaleX = timeUpIconGlow.scaleY = 0.9;
    createjs.Tween.get(timeUpIconGlow, { override: true, loop: true })
      .to({ alpha: 0.46, scaleX: 1.05, scaleY: 1.05 }, 360, createjs.Ease.quadOut)
      .to({ alpha: 0.12, scaleX: 0.92, scaleY: 0.92 }, 420, createjs.Ease.quadIn);
  }

  if (timeUpIconContainer) {
    createjs.Tween.removeTweens(timeUpIconContainer);
    timeUpIconContainer.scaleX = timeUpIconContainer.scaleY = 1;
    createjs.Tween.get(timeUpIconContainer, { override: true })
      .to({ scaleX: 1.08, scaleY: 1.08 }, 320, createjs.Ease.backOut)
      .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadInOut);
  }

  createjs.Tween.get(overlay)
    .wait(1180)
    .to({ alpha: 0 }, 240, createjs.Ease.quadIn)
    .call(function () {
      hideGameplayTimeUpBanner(true);
      if (typeof onComplete === "function") {
        onComplete();
      }
    });
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

  if (timeUpIconGlow) {
    createjs.Tween.removeTweens(timeUpIconGlow);
    timeUpIconGlow.alpha = 0;
  }

  if (timeUpIconContainer) {
    createjs.Tween.removeTweens(timeUpIconContainer);
    timeUpIconContainer.scaleX = timeUpIconContainer.scaleY = 1;
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
    questionCardContainer.x = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvas && !isNaN(canvas.width) ? canvas.width / 2 : 0;
    questionCardContainer.y = 280;
    questionCardContainer.__baseY = 280;
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

    question = new createjs.Text("", "800 60px 'Baloo 2'", "#F4FAFF");
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

function layoutGameplayQuestionCard() {
  if (!questionCardContainer) {
    return;
  }

  var centerX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvas && !isNaN(canvas.width) ? canvas.width / 2 : 0;
  questionCardContainer.x = centerX;
  if (typeof questionCardContainer.__baseY === "number") {
    questionCardContainer.y = questionCardContainer.__baseY;
  } else {
    questionCardContainer.y = questionCardContainer.y || 280;
    questionCardContainer.__baseY = questionCardContainer.y;
  }

  layoutQuestionCardContents();
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
    stopChoiceLiveAccent(index);
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
        .wait(isCorrect ? 420 : 900)
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
        .wait(isCorrect ? 420 : 900)
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

  var idleLabelTween = createjs.Tween.get(label, { loop: true, override: false })
    .to({ scaleX: baseScale * 1.02, scaleY: baseScale * 0.98 }, 340, createjs.Ease.sineInOut)
    .to({ scaleX: baseScale, scaleY: baseScale }, 320, createjs.Ease.sineInOut);
  label.__idleTween = idleLabelTween;

  var pulse = typeof choicePulseArr !== "undefined" ? choicePulseArr[index] : null;
  if (pulse) {
    var pulseScale = pulse.__baseScale || baseScale;
    pulse.visible = true;
    pulse.alpha = pulse.alpha && pulse.alpha > 0 ? pulse.alpha : 0.7;
    pulse.scaleX = pulseScale;
    pulse.scaleY = pulseScale;
    pulse.__idleTween = createjs.Tween.get(pulse, { loop: true, override: false })
      .to({ scaleX: pulseScale * 1.1, scaleY: pulseScale * 1.1, alpha: 0.86 }, 520, createjs.Ease.sineOut)
      .to({ scaleX: pulseScale * 0.92, scaleY: pulseScale * 0.92, alpha: 0.5 }, 460, createjs.Ease.sineIn);
  }

  var glow = choiceGlowArr[index];
  if (glow) {
    var glowTargetScale = glow.__targetScale || (baseScale * 1.3);
    glow.scaleX = glow.scaleY = glowTargetScale;
    var baseAlpha = glow.alpha && glow.alpha > 0 ? glow.alpha : 0.38;
    glow.alpha = baseAlpha;
    glow.__idleTween = createjs.Tween.get(glow, { loop: true, override: false })
      .to({ alpha: Math.min(0.54, baseAlpha + 0.14) }, 520, createjs.Ease.sineInOut)
      .to({ alpha: baseAlpha }, 480, createjs.Ease.sineInOut);
  }

  choiceIdleStates[index] = true;
}

function stopChoiceIdleAnimation(index) {
  if (typeof index !== "number" || index < 0) {
    return;
  }

  choiceIdleStates[index] = false;

  var label = choiceArr[index];
  if (label) {
    createjs.Tween.removeTweens(label);
    var baseScale = label.__baseScale || label.scaleX || 1;
    label.scaleX = baseScale;
    label.scaleY = baseScale;
    label.__idleTween = null;
  }

  var glow = choiceGlowArr[index];
  if (glow) {
    createjs.Tween.removeTweens(glow);
    glow.alpha = 0.38;
    glow.__idleTween = null;
  }

  if (typeof choicePulseArr !== "undefined" && choicePulseArr[index]) {
    var pulse = choicePulseArr[index];
    createjs.Tween.removeTweens(pulse);
    pulse.visible = false;
    pulse.alpha = 0;
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

  ambientSparkGeneration += 1;
  var sparkGeneration = ambientSparkGeneration;

  var gradientShape = new createjs.Shape();
  gradientShape.graphics
    .beginLinearGradientFill(
      ["#0f0b2e", "#20124d", "#2f1d64", "#431f6f"],
      [0, 0.35, 0.72, 1],
      0,
      0,
      0,
      canvas.height
    )
    .drawRect(0, 0, canvas.width, canvas.height);
  gradientShape.alpha = 0.98;
  ambientGradientLayer.addChild(gradientShape);

  var dawnBloom = createAmbientGlowOrb(Math.max(canvas.width, canvas.height) * 0.52, [
    "rgba(255, 186, 255, 0.65)",
    "rgba(255, 186, 255, 0)"
  ]);
  dawnBloom.x = canvas.width * 0.58;
  dawnBloom.y = canvas.height * 0.46;
  dawnBloom.alpha = 0.86;
  dawnBloom.compositeOperation = "lighter";
  ambientGradientLayer.addChild(dawnBloom);

  var horizonGlow = createAmbientGlowOrb(Math.max(canvas.width, canvas.height) * 0.74, [
    "rgba(126, 193, 255, 0.4)",
    "rgba(126, 193, 255, 0)"
  ]);
  horizonGlow.x = canvas.width * 0.18;
  horizonGlow.y = canvas.height * 0.18;
  horizonGlow.alpha = 0.6;
  horizonGlow.compositeOperation = "lighter";
  ambientGradientLayer.addChild(horizonGlow);

  var lowerGlow = createAmbientGlowOrb(Math.max(canvas.width, canvas.height) * 0.62, [
    "rgba(147, 255, 232, 0.5)",
    "rgba(147, 255, 232, 0)"
  ]);
  lowerGlow.x = canvas.width * 0.84;
  lowerGlow.y = canvas.height * 0.78;
  lowerGlow.alpha = 0.58;
  lowerGlow.compositeOperation = "lighter";
  ambientGradientLayer.addChild(lowerGlow);

  var softWash = new createjs.Shape();
  softWash.graphics
    .beginLinearGradientFill(
      [
        "rgba(255, 200, 255, 0.24)",
        "rgba(116, 182, 255, 0.16)",
        "rgba(97, 82, 235, 0.18)"
      ],
      [0, 0.45, 1],
      -canvas.width * 0.4,
      -canvas.height * 0.2,
      canvas.width * 0.4,
      canvas.height * 0.55
    )
    .drawRoundRectComplex(
      -canvas.width * 0.5,
      -canvas.height * 0.32,
      canvas.width * 1.1,
      canvas.height * 0.95,
      260,
      260,
      320,
      320
    );
  softWash.x = canvas.width * 0.58;
  softWash.y = canvas.height * 0.46;
  softWash.alpha = 0.32;
  softWash.compositeOperation = "lighter";
  ambientGradientLayer.addChild(softWash);

  var bokehLayer = createAmbientBokehLayer(canvas.width, canvas.height, 12);
  ambientGradientLayer.addChild(bokehLayer);

  var auroraBackdrop = new createjs.Shape();
  var auroraWidth = canvas.width * 1.2;
  var auroraHeight = Math.max(canvas.height * 0.7, 360);
  auroraBackdrop.graphics
    .beginLinearGradientFill(
      [
        "rgba(109, 175, 255, 0.28)",
        "rgba(178, 122, 255, 0.36)",
        "rgba(255, 169, 239, 0.24)"
      ],
      [0, 0.55, 1],
      -auroraWidth / 2,
      -auroraHeight / 2,
      auroraWidth / 2,
      auroraHeight / 2
    )
    .drawEllipse(-auroraWidth / 2, -auroraHeight / 2, auroraWidth, auroraHeight);
  auroraBackdrop.x = canvas.width * 0.52;
  auroraBackdrop.y = canvas.height * 0.46;
  auroraBackdrop.alpha = 0.62;
  auroraBackdrop.compositeOperation = "lighter";
  ambientAuroraLayer.addChild(auroraBackdrop);
  animateAmbientAurora(auroraBackdrop);

  var crestWave = createAmbientWave(canvas.width * 0.88, 110, 0.22, [
    "rgba(138, 195, 255, 0.35)",
    "rgba(216, 158, 255, 0.18)"
  ]);
  crestWave.x = canvas.width * 0.52;
  crestWave.y = canvas.height * 0.34;
  crestWave.alpha = 0.54;
  crestWave.compositeOperation = "lighter";
  ambientAuroraLayer.addChild(crestWave);
  animateAmbientWave(crestWave);

  var innerWave = createAmbientWave(canvas.width * 0.72, 140, 0.28, [
    "rgba(86, 234, 225, 0.26)",
    "rgba(140, 172, 255, 0.18)"
  ]);
  innerWave.x = canvas.width * 0.6;
  innerWave.y = canvas.height * 0.52;
  innerWave.alpha = 0.48;
  innerWave.rotation = -6;
  innerWave.compositeOperation = "lighter";
  ambientAuroraLayer.addChild(innerWave);
  animateAmbientWave(innerWave);

  var trailingWave = createAmbientWave(canvas.width * 0.96, 90, 0.18, [
    "rgba(255, 208, 248, 0.28)",
    "rgba(147, 190, 255, 0.18)"
  ]);
  trailingWave.x = canvas.width * 0.38;
  trailingWave.y = canvas.height * 0.62;
  trailingWave.alpha = 0.45;
  trailingWave.rotation = 7;
  trailingWave.compositeOperation = "lighter";
  ambientAuroraLayer.addChild(trailingWave);
  animateAmbientWave(trailingWave);

  var constellationLayer = new createjs.Container();
  constellationLayer.alpha = 0.52;
  ambientAuroraLayer.addChild(constellationLayer);

  for (var c = 0; c < 5; c++) {
    constellationLayer.addChild(createAmbientConstellation());
  }

  var shimmerConstellations = createAmbientShimmerConstellations();
  shimmerConstellations.alpha = 0.65;
  shimmerConstellations.compositeOperation = "lighter";
  ambientAuroraLayer.addChild(shimmerConstellations);

  var starField = createAmbientStarField(canvas.width, canvas.height, 26);
  ambientAuroraLayer.addChild(starField);

  var glowOrbs = createAmbientGlowOrbs(canvas.width, canvas.height, 5);
  ambientAuroraLayer.addChild(glowOrbs);

  var particleField = createAmbientParticleField(canvas.width, canvas.height, 44, {
    minRadius: 1.4,
    maxRadius: 3.4
  });
  ambientSparkLayer.addChild(particleField);

  for (var p = 0; p < particleField.numChildren; p++) {
    startAmbientParticleFloat(particleField.getChildAt(p), true);
  }

  var vignette = new createjs.Shape();
  var radius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
  vignette.graphics
    .beginRadialGradientFill(
      ["rgba(0,0,0,0)", "rgba(5, 8, 24, 0.68)"],
      [0.55, 1],
      0,
      0,
      radius * 0.36,
      0,
      0,
      radius
    )
    .drawRect(0, 0, canvas.width, canvas.height);
  vignette.alpha = 0.92;
  ambientGradientLayer.addChild(vignette);

  for (var s = 0; s < 7; s++) {
    spawnAmbientSpark(sparkGeneration);
  }
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
  //const baseY = displayObj.y;
  createjs.Tween.get(displayObj, { loop: true })
    .to({ scaleX: 0.72, scaleY: 0.72}, 900, createjs.Ease.quadOut)
    .to({ scaleX: 0.74, scaleY: 0.74 }, 900, createjs.Ease.quadIn);
	
}

function ChoiceFX_addGlow(ch, on){
  ch.shadow = on
    ? new createjs.Shadow("rgba(255,182,72,0.9)", 0, 0, 28)
    : new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
}

function ChoiceFX_pressRipple(parent, x, y){
  var r = new createjs.Shape();
  r.alpha = 0.25;
  r.graphics.setStrokeStyle(6).beginStroke("#2EC4B6").drawCircle(0,0,1);
  r.x = x; r.y = y;
  parent.addChild(r);
  createjs.Tween.get(r)
    .to({ scaleX: 28, scaleY: 28, alpha: 0 }, 420, createjs.Ease.quadOut)
    .call(function(){ parent.removeChild(r); });
}

function ChoiceFX_randomConfetti(){
  var colors = ["#FF9F1C","#2EC4B6","#E71D36","#FDFFFC","#7F5AF0"];
  return colors[(Math.random()*colors.length)|0];
}

function ChoiceFX_confettiBurst(container, x, y){
  for (var i=0; i<16; i++){
    var p = new createjs.Shape();
    var sz = 6 + Math.random()*6;
    p.graphics.beginFill(ChoiceFX_randomConfetti()).drawRect(-sz/2, -sz/2, sz, sz);
    p.x = x; p.y = y; p.rotation = Math.random()*360;
    container.addChild(p);
    var dx = (-80 + Math.random()*160);
    var dy = (-140 + Math.random()*100);
    var tt = 500 + Math.random()*400;
    createjs.Tween.get(p)
      .to({ x: x+dx, y: y+dy, alpha: 0, rotation: p.rotation+360 }, tt, createjs.Ease.quadOut)
      .call(function(){ container.removeChild(p); });
  }
}

function ChoiceFX_wrongShake(target){
  var baseX = target.x;
  createjs.Tween.get(target)
    .to({ x: baseX - 10 }, 60)
    .to({ x: baseX + 10 }, 60)
    .to({ x: baseX - 6 }, 50)
    .to({ x: baseX + 6 }, 50)
    .to({ x: baseX }, 50);
}

function ChoiceFX_redFlash(obj){
  var old = obj.alpha;
  createjs.Tween.get(obj)
    .to({ alpha: 0.3 }, 70)
    .to({ alpha: old }, 120);
}

function ChoiceFX_drawFocusRing(target, on){
  if (!target) return;

  if (on){
    if (!target._ring){
      var ring = new createjs.Shape();
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
      var parent = target.parent;
      if (parent){
        var idx = parent.getChildIndex(target);
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
    var r = target._ring;
    if (r.parent) r.parent.removeChild(r);
    target._ring = null;
  }
}

function ChoiceFX_addGlowPulse(obj){
  var offShadow = new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
  obj.shadow = new createjs.Shadow("rgba(255,200,0,0.8)", 0, 0, 20);
  createjs.Tween.get(obj).wait(100).call(function(){ obj.shadow = offShadow; });
}

/* Entrance animation for a passed array of choices */
function ChoiceFX_entrance(choiceArr, baseDelay){
  var startDelay = typeof baseDelay === "number" ? baseDelay : 1600;
  for (var i = 0; i < choiceArr.length; i++) {
    var ch = choiceArr[i];
    if(!ch) continue;
    if (typeof ch.scaleX === "undefined") continue;
    if (!ch.shadow) ch.shadow = new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
    ch.scaleX = ch.scaleY = 0.55;
    ch.alpha = 0;
    var baseY = ch.y || 620;
   // ch.y = baseY + 20;

    createjs.Tween.get(ch)
      .wait(startDelay + i*120)
      .to({ alpha: 1, scaleX: 0.72, scaleY: 0.72, y: baseY, rotation: 15 }, 220, createjs.Ease.quadOut)
      .to({ rotation: 0 }, 180, createjs.Ease.quadOut)
      .call(function(){ ChoiceFX_startIdleBob(ch); });
  }
}

/* Hover/HitArea wiring */
function ChoiceFX_bindHover(choiceArr){
  for (var i = 0; i < choiceArr.length; i++) {
    var ch = choiceArr[i];
    if(!ch) continue;

    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRoundRect(-70, -70, 140, 140, 20);
    ch.hitArea = hit;

    ch.cursor = "pointer";
    ch.mouseEnabled = true;

    ch.addEventListener("mouseover", function(e){
      var t = e.currentTarget;
      createjs.Tween.get(t, { override:true })
        .to({ scaleX: 0.78, scaleY: 0.78 }, 160, createjs.Ease.quadOut);
      ChoiceFX_addGlow(t, true);
      //ChoiceFX_drawFocusRing(t, true);
    });
    ch.addEventListener("mouseout", function(e){
      var t = e.currentTarget;
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
  var qObj = displayObj;
  if(!qObj) return;
  switch(style){
    case "spin":
      qObj.alpha = 0;
      qObj.rotation = -180;
      qObj.scaleX = qObj.scaleY = 0.4;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, rotation: 0, scaleX: 1.3, scaleY: 1.3 }, 280, createjs.Ease.backOut)
        .to({ scaleX: 1, scaleY: 1 }, 120)
        .call(function(){ ChoiceFX_addGlowPulse(qObj); });
      break;
    case "soft":
      qObj.alpha = 0.2;
      qObj.scaleX = qObj.scaleY = 0.7;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200, createjs.Ease.sineOut)
        .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.sineInOut)
        .call(function(){ ChoiceFX_addGlowPulse(qObj); });
      break;
    default: // "pop"
      qObj.scaleX = qObj.scaleY = 0;
      qObj.alpha = 0;
      createjs.Tween.get(qObj)
        .to({ alpha: 1, scaleX: 1.4, scaleY: 1.4 }, 200, createjs.Ease.backOut)
        .to({ scaleX: 1, scaleY: 1 }, 150, createjs.Ease.quadOut)
        .call(function(){ ChoiceFX_addGlowPulse(qObj); });
  }
}
/* ===== End ChoiceFX Helpers ===== */

/**
 * SAUI_attachQuestionLabelBG
 * Draws a centered, auto-sized rounded rectangle behind a Text for contrast.
 * Keeps your original Text (QusTxtString) untouched; mirrors visibility/alpha.
 */
function SAUI_attachQuestionLabelBG(textObj, parent, opts) {
  var defaults = {
    padX: 24,
    padY: 12,
    fill: "rgba(0,0,0,0.55)",
    stroke: "rgba(255,255,255,0.12)",
    strokeW: 2,
    maxRadius: 20,
    addShadow: true,
    autoTick: true
  };

  var cfg = {};
  for (var defKey in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, defKey)) {
      cfg[defKey] = defaults[defKey];
    }
  }

  if (opts) {
    for (var optKey in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, optKey)) {
        cfg[optKey] = opts[optKey];
      }
    }
  }

  var bg = new createjs.Shape();
  var idx = parent.getChildIndex(textObj);
  parent.addChildAt(bg, Math.max(0, idx)); // directly under the text

  function measure() {
    var b = textObj.getBounds();
    if (!b) { textObj.cache(0,0,1,1); textObj.uncache(); b = textObj.getBounds(); }
    return b;
  }

  function draw() {
    var b = measure(); if (!b) return;
    var w = b.width + cfg.padX * 2, h = b.height + cfg.padY * 2;
    var r = Math.min(cfg.maxRadius, h/2);
    var left = textObj.x - w/2, top = textObj.y - h/2;

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

  var tickH = null;
  if (cfg.autoTick) {
    tickH = createjs.Ticker.on("tick", function() {
      if (!bg.parent || !textObj.parent) { if (tickH) createjs.Ticker.off("tick", tickH); tickH = null; return; }
      bg.visible = textObj.visible;
      bg.alpha = textObj.alpha;
      draw();
    });
  }

  return {
    bg: bg,
    refresh: draw,
    destroy: function () {
      if (tickH) {
        createjs.Ticker.off("tick", tickH);
      }
      if (bg.parent) {
        bg.parent.removeChild(bg);
      }
    }
  };
}

var GameUIGlobal = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this;
if (GameUIGlobal) {
  GameUIGlobal.call_UI_ambientOverlay = call_UI_ambientOverlay;
  GameUIGlobal.call_UI_gameQuestion = call_UI_gameQuestion;
  GameUIGlobal.call_UI_introQuestionCardContainer = call_UI_introQuestionCardContainer;
  GameUIGlobal.drawChoiceTileBackground = drawChoiceTileBackground;
  GameUIGlobal.drawClueSlotBackground = drawClueSlotBackground;
  GameUIGlobal.ensureChoiceDecorations = ensureChoiceDecorations;
  GameUIGlobal.positionChoiceDecorations = positionChoiceDecorations;
  GameUIGlobal.stopChoiceReadyPulse = stopChoiceReadyPulse;
  GameUIGlobal.stopChoiceReadyBadgeAnimation = stopChoiceReadyBadgeAnimation;
  GameUIGlobal.hideChoiceReadyBadge = hideChoiceReadyBadge;
  GameUIGlobal.hideChoiceDecorations = hideChoiceDecorations;
  GameUIGlobal.setChoiceDisabledAppearance = setChoiceDisabledAppearance;
  GameUIGlobal.activateChoiceReadyAppearance = activateChoiceReadyAppearance;
  GameUIGlobal.resetChoiceTileVisual = resetChoiceTileVisual;
  GameUIGlobal.startChoiceLiveAccent = startChoiceLiveAccent;
  GameUIGlobal.stopChoiceLiveAccent = stopChoiceLiveAccent;
  GameUIGlobal.showGameplayTimeUpBanner = showGameplayTimeUpBanner;
  GameUIGlobal.hideGameplayTimeUpBanner = hideGameplayTimeUpBanner;
  GameUIGlobal.SAUI_attachQuestionLabelBG = SAUI_attachQuestionLabelBG;
  if (typeof renderQuestionCardBackground === "function") {
    GameUIGlobal.renderQuestionCardBackground = renderQuestionCardBackground;
  }
  if (typeof renderQuestionCardBackground_htp === "function") {
    GameUIGlobal.renderQuestionCardBackground_htp = renderQuestionCardBackground_htp;
  }
}
