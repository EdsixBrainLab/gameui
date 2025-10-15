var ambientLayer,overlayLayer,ambientGradientLayer,ambientOrbs = [];
var questionSubtitle,
  questionCardContainer,
  questionCardBackground,
  questionCardHighlight,
  questionCardShadow,
  circleOutline,
  questionCardContainer_htp,
  questionCardShadow_htp,
  questionCardGlow_htp,
  questionCardFrame_htp,
  in_introQues1;
var INTRO_TITLE_Y = 75;
var INTRO_PROMPT_Y = 184;
var QUESTION_CARD_WIDTH = 600;
var QUESTION_CARD_HEIGHT = 168;
var QUESTION_CARD_CORNER_RADIUS = 44;

var CHOICE_TILE_BASE_COLORS = ["rgba(28,52,92,0.95)", "rgba(15,32,66,0.95)"];
var CHOICE_TILE_HOVER_COLORS = ["rgba(70,118,210,0.98)", "rgba(40,72,148,0.98)"];
var CHOICE_TILE_CORRECT_COLORS = ["rgba(58,196,150,0.98)", "rgba(30,128,96,0.98)"];
var CHOICE_TILE_WRONG_COLORS = ["rgba(236,118,135,0.98)", "rgba(160,58,92,0.98)"];
var CLUE_SLOT_BASE_COLORS = ["rgba(32,58,104,0.92)", "rgba(19,36,74,0.92)"];
var CLUE_SLOT_HIGHLIGHT_COLORS = ["rgba(89,156,255,0.9)", "rgba(44,92,178,0.9)"];
var CLUE_SLOT_SUCCESS_COLORS = ["rgba(72,196,167,0.92)", "rgba(42,128,104,0.92)"];
var CLUE_SLOT_ERROR_COLORS = ["rgba(255,125,141,0.92)", "rgba(158,42,64,0.92)"];

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
      "700 30px 'Baloo 2'",
      "#EAF2FF"
    );
    QusTxtString.shadow = new createjs.Shadow("rgba(6,16,38,0.28)", 0, 10, 20);
    QusTxtString.textAlign = "center";
    QusTxtString.textBaseline = "middle";
    QusTxtString.lineWidth = 1000;
    QusTxtString.lineHeight = 30;
    QusTxtString.x = 635;
    QusTxtString.y = INTRO_PROMPT_Y-55;
    QusTxtString.alpha = 0.96;
QusTxtString.shadow = new createjs.Shadow("black", 1, 1, 1);
    incontainer.parent.addChild(QusTxtString);
    QusTxtString.visible = false;
	QusTxtString.__labelBG = SAUI_attachQuestionLabelBG(QusTxtString, incontainer.parent, {
    padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22
  });
	
	
	
	
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

    var glowWidth_htp = QUESTION_CARD_WIDTH + 220;
    var glowHeight_htp = QUESTION_CARD_HEIGHT + 140;
    questionCardGlow_htp = new createjs.Shape();
    questionCardGlow_htp.graphics
      .beginRadialGradientFill(
        [
          "rgba(255, 192, 237, 0.75)",
          "rgba(145, 121, 255, 0.55)",
          "rgba(80, 46, 140, 0)"
        ],
        [0, 0.45, 1],
        0,
        0,
        0,
        0,
        0,
        Math.max(glowWidth_htp, glowHeight_htp) / 2
      )
      .drawEllipse(
        -glowWidth_htp / 2,
        -glowHeight_htp / 2,
        glowWidth_htp,
        glowHeight_htp
      );
    questionCardGlow_htp.alpha = 0.55;
    questionCardGlow_htp.compositeOperation = "lighter";
    questionCardContainer_htp.addChild(questionCardGlow_htp);

    questionCardShadow_htp = new createjs.Shape();
    var shadowWidth_htp = QUESTION_CARD_WIDTH + 68;
    var shadowHeight_htp = QUESTION_CARD_HEIGHT + 34;
    var shadowHalfWidth_htp = shadowWidth_htp / 2;
    var shadowHalfHeight_htp = shadowHeight_htp / 2;
    questionCardShadow_htp.graphics
      .beginFill("rgba(20, 8, 44, 0.45)")
      .drawRoundRect(
        -shadowHalfWidth_htp,
        -shadowHalfHeight_htp,
        shadowWidth_htp,
        shadowHeight_htp,
        QUESTION_CARD_CORNER_RADIUS + 16
      );
    questionCardShadow_htp.y = 2;
    questionCardShadow_htp.alpha = 0.38;
    questionCardShadow_htp.compositeOperation = "multiply";
    questionCardContainer_htp.addChild(questionCardShadow_htp);

    questionCardBackground_htp = new createjs.Shape();
    questionCardContainer_htp.addChild(questionCardBackground_htp);

    questionCardHighlight_htp = new createjs.Shape();
    questionCardHighlight_htp.compositeOperation = "lighter";
    questionCardContainer_htp.addChild(questionCardHighlight_htp);

    questionCardFrame_htp = new createjs.Shape();
    questionCardContainer_htp.addChild(questionCardFrame_htp);

    renderQuestionCardBackground_htp();

    in_introQues1 = new createjs.Text(in_question, "800 60px 'Baloo 2'", "#FFF6FF");
    in_introQues1.x = 0;
    in_introQues1.y = 0;
    in_introQues1.textAlign = "center";
    in_introQues1.textBaseline = "middle";
    in_introQues1.lineWidth = QUESTION_CARD_WIDTH - 120;
    in_introQues1.shadow = new createjs.Shadow("rgba(14, 6, 35, 0.58)", 0, 12, 32);
    in_introQues1.visible = true;

    questionCardContainer_htp.addChild(in_introQues1);
    incontainer.parent.addChild(questionCardContainer_htp);

}



function drawChoiceTileBackground(targetShape, colors) {
  if (!targetShape) {
    return;
  }

  var gradient = colors || CHOICE_TILE_BASE_COLORS;
  targetShape.graphics
    .clear()
    .beginLinearGradientFill(gradient, [0, 1], -90, -90, 90, 90)
    .drawRoundRect(-32, -45, 130, 130, 30);
}

function drawClueSlotBackground(targetShape, colors) {
  if (!targetShape) {
    return;
  }

  var gradient = colors || CLUE_SLOT_BASE_COLORS;
  targetShape.graphics
    .clear()
    .beginLinearGradientFill(gradient, [0, 1], -60, -60, 60, 60)
    .drawRoundRect(-42, -50, 100, 100, 20);
}


function renderQuestionCardBackground() {
  if (!questionCardBackground) {
    return;
  }

  var halfWidth = QUESTION_CARD_WIDTH / 2;
  var halfHeight = QUESTION_CARD_HEIGHT / 2;

  questionCardBackground.graphics
    .clear()
    .beginLinearGradientFill(
      [
        "rgba(18,38,76,0.95)",
        "rgba(14,28,58,0.95)"
      ],
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
      QUESTION_CARD_CORNER_RADIUS
    );

  if (questionCardHighlight) {
    var highlightPaddingX = 24;
    var highlightPaddingY = 18;
    var highlightWidth = QUESTION_CARD_WIDTH - highlightPaddingX * 2;
    var highlightHeight = QUESTION_CARD_HEIGHT - highlightPaddingY * 2;
    var highlightHalfWidth = highlightWidth / 2;
    var highlightHalfHeight = highlightHeight / 2;

    questionCardHighlight.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.18)", "rgba(255,255,255,0)"],
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
        Math.max(QUESTION_CARD_CORNER_RADIUS - 6, 12)
      );
    questionCardHighlight.alpha = 0.45;
  }
}

function ensureQuestionCard() {
  if (!container || !container.parent) {
    return;
  }

  if (!questionCardContainer) {
    questionCardContainer = new createjs.Container();
    questionCardContainer.x = canvas.width / 2;
    questionCardContainer.y = 250;
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

function emphasizeChoiceTile(index, isHover) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var glow = choiceGlowArr[index];

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
  }

function pressChoiceTile(index) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];

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
  }

function releaseChoiceTile(index) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];

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
  }

function markChoiceResult(index, isCorrect) {
    var tile = choiceArr[index];
    var bg = choiceBgArr[index];
    var glow = choiceGlowArr[index];
    var colors = isCorrect ? CHOICE_TILE_CORRECT_COLORS : CHOICE_TILE_WRONG_COLORS;

    if (bg) {
      drawChoiceTileBackground(bg, colors);
      var bgBase = bg.__baseScale || 1;
      createjs.Tween.get(bg, { override: true })
        .to({ scaleX: bgBase * 1.05, scaleY: bgBase * 1.05, alpha: 1 }, 160, createjs.Ease.quadOut)
        .to({ scaleX: bgBase, scaleY: bgBase }, 200, createjs.Ease.quadOut)
        .wait(900)
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
        .wait(isCorrect ? 600 : 900)
        .to({ alpha: 0.38 }, 220, createjs.Ease.quadOut);
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
    var tile = choiceArr[index];
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
    var tile = choiceArr[index];
    if (!tile) {
      return;
    }

    detachChoiceInteractions(index);

    tile.__hoverListener = tile.on("mouseover", function () {
      emphasizeChoiceTile(index, true);
    });
    tile.__outListener = tile.on("mouseout", function () {
      emphasizeChoiceTile(index, false);
    });
    tile.__downListener = tile.on("mousedown", function () {
      pressChoiceTile(index);
    });
    tile.__upListener = tile.on("pressup", function () {
      releaseChoiceTile(index);
    });
  }
  
  function renderQuestionCardBackground_htp() {
  if (!questionCardBackground_htp) {
    return;
  }

  var halfWidth = QUESTION_CARD_WIDTH / 2;
  var halfHeight = QUESTION_CARD_HEIGHT / 2;

  questionCardBackground_htp.graphics
    .clear()
    .beginLinearGradientFill(
      [
        "rgba(70, 45, 140, 0.94)",
        "rgba(133, 62, 182, 0.95)",
        "rgba(251, 110, 160, 0.92)"
      ],
      [0, 0.55, 1],
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
      QUESTION_CARD_CORNER_RADIUS
    );

  if (questionCardHighlight_htp) {
    var highlightPaddingX = 24;
    var highlightPaddingY = 18;
    var highlightWidth = QUESTION_CARD_WIDTH - highlightPaddingX * 2;
    var highlightHeight = QUESTION_CARD_HEIGHT - highlightPaddingY * 2;
    var highlightHalfWidth = highlightWidth / 2;
    var highlightHalfHeight = highlightHeight / 2;

    questionCardHighlight_htp.graphics
      .clear()
      .beginLinearGradientFill(
        ["rgba(255,255,255,0.58)", "rgba(255,255,255,0.16)", "rgba(255,255,255,0)"],
        [0, 0.52, 1],
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
        Math.max(QUESTION_CARD_CORNER_RADIUS - 6, 12)
      );
    questionCardHighlight_htp.alpha = 0.55;
  }

  if (questionCardFrame_htp) {
    questionCardFrame_htp.graphics
      .clear()
      .setStrokeStyle(3)
      .beginLinearGradientStroke(
        ["rgba(255, 220, 255, 0.82)", "rgba(144, 196, 255, 0.82)"],
        [0, 1],
        -halfWidth,
        0,
        halfWidth,
        0
      )
      .drawRoundRect(
        -halfWidth,
        -halfHeight,
        QUESTION_CARD_WIDTH,
        QUESTION_CARD_HEIGHT,
        QUESTION_CARD_CORNER_RADIUS + 2
      );
    questionCardFrame_htp.alpha = 0.95;
    if (!questionCardFrame_htp.shadow) {
      questionCardFrame_htp.shadow = new createjs.Shadow("rgba(255, 173, 231, 0.35)", 0, 0, 18);
    }
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

  ambientLayer.addChild(ambientGradientLayer);

  var gradientShape = new createjs.Shape();
  gradientShape.graphics
    .beginLinearGradientFill(
      ["#0d1b2a", "#1a3a7a", "#0b1425"],
      [0, 0.65, 1],
      0,
      0,
      canvas.width,
      canvas.height
    )
    .drawRect(0, 0, canvas.width, canvas.height);
  gradientShape.alpha = 0.92;
  ambientGradientLayer.addChild(gradientShape);

  ambientOrbs = [];
  var orbColors = [
    ["rgba(99, 179, 237, 0.45)", "rgba(99, 179, 237, 0)"],
    ["rgba(158, 108, 237, 0.4)", "rgba(158, 108, 237, 0)"],
    ["rgba(109, 226, 183, 0.4)", "rgba(109, 226, 183, 0)"]
  ];

  for (var i = 0; i < 5; i++) {
    var orb = new createjs.Shape();
    var radius = 160 + Math.random() * 140;
    var palette = orbColors[i % orbColors.length];
    orb.graphics
      .beginRadialGradientFill(["rgba(255,255,255,0.2)", palette[0], palette[1]], [0, 0.45, 1], 0, 0, 0, 0, 0, radius)
      .drawCircle(0, 0, radius);
    orb.x = Math.random() * canvas.width;
    orb.y = Math.random() * canvas.height;
    orb.alpha = 0.55;
    ambientGradientLayer.addChild(orb);
    ambientOrbs.push(orb);
    animateAmbientOrb(orb);
  }

  var grid = new createjs.Shape();
  var spacing = 140;
  grid.graphics.setStrokeStyle(1).beginStroke("rgba(255, 255, 255, 0.06)");
  for (var x = -spacing; x < canvas.width + spacing; x += spacing) {
    grid.graphics.moveTo(x, -spacing).lineTo(x + canvas.height + spacing, canvas.height + spacing);
  }
  grid.alpha = 0.35;
  ambientGradientLayer.addChild(grid);
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
      .to({ alpha: 1, scaleX: 0.72, scaleY: 0.72, y: baseY, rotation: 15 }, 220, createjs.Ease.quadOut)
      .to({ rotation: 0 }, 180, createjs.Ease.quadOut)
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
