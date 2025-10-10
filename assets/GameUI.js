var ambientLayer,overlayLayer,ambientGradientLayer,ambientOrbs = [];
var questionSubtitle,  questionCardContainer,  questionCardBackground, questionCardHighlight,  questionCardShadow,  circleOutline, questionCardContainer_htp,questionCardShadow_htp,in_introQues1;
var INTRO_TITLE_Y = 50;
var INTRO_PROMPT_Y = 184;
var INTRO_TITLE_Y,INTRO_PROMPT_Y;
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
    QusTxtString.lineWidth = 760;
    QusTxtString.lineHeight = 42;
    QusTxtString.x = 635;
    QusTxtString.y = INTRO_PROMPT_Y-50;
    QusTxtString.alpha = 0.96;

    incontainer.parent.addChild(QusTxtString);
    QusTxtString.visible = false;
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
	
    in_introQues1 = new createjs.Text(in_question, "800 60px 'Baloo 2'", "#F4FAFF");
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
    questionCardHighlight_htp.alpha = 0.45;
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