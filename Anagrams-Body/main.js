var messageField; //Message display field

var assets = [];
var choiceArr = [];
var choiceBgArr = [];
var choiceGlowArr = [];
var choiceMcArr = [];
var textArr = [];
var qno = [];
var strArr = [];
var chpos = [];
var getChar = [];
var quesMcArr = [];

var clueMcArr = [];
var clueArr = [];
var clueBgArr = [];

var choiceArrScale;
var cnt = -1,
  ans,
  qscnt = -1,
  uans,
  interval,
  delayInterval,
  time = 18,
  totalQuestions = 10,
  answeredQuestions = 0,
  choiceCnt = 12,
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
  ambientLayer,
  overlayLayer,
  question,
  questionSubtitle,
  questionCardContainer,
  questionCardBackground,
  questionCardHighlight,
  questionCardShadow,
  circleOutline,
  chHolderMC,
  choice1,
  choice2,
  choice3,
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
  "Z",
];
var nameArr = [
  "are",
  "keen",
  "inch",
  "cafe",
  "earth",
  "sink",
  "fringe",
  "waits",
  "lamp",
  "gel",
  "snail",
  "fits",
  "bread",
  "pines",
  "retain",
  "ones",
  "silver",
  "ship",
];
var words_arry = [
  "ear",
  "knee",
  "chin",
  "face",
  "heart",
  "skin",
  "finger",
  "waist",
  "palm",
  "leg",
  "nails",
  "fist",
  "beard",
  "spine",
  "retina",
  "nose",
  "livers",
  "hips",
];

var maxLetterCnt = 13;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = [
  "178.3",
  "288.3",
  "398.3",
  "508.3",
  "618.3",
  "728.3",
  "688.3",
  "288.3",
  "338.3",
  "418.3",
  "498.3",
  "578.3",
];
var btnY = [
  "497.1",
  "497.1",
  "497.1",
  "497.1",
  "497.1",
  "497.1",
  "497.1",
  "567.1",
  "567.1",
  "567.1",
  "567.1",
  "567.1",
];
var rand1 = [];
var btnPaddArr = ["", "", "", "365", "335", "305", "275", "245", "215", "185"];
var indx = [];
var btnPadding = 50;
var btnTxtPaddding = 483;
var repTimeClearInterval = 0;
var rst1 = 0,
  crst = 0,
  wrst = 0,
  score = 0,
  puzzle_cycle,
  timeOver_Status = 0; //for db //q
var cLen;
var QusTxtString;
var questionTextMC;
var isBgSound = true;
var isEffSound = true;
var currentX, currentY;
var currentObj = [];
var url = "";
var nav = "";
var isResp = true;
var respDim = "both";
var isScale = true;
var scaleType = 1;

var lastW,
  lastH,
  lastS = 1;

var borderPadding = 10,
  barHeight = 20;

var loadProgressLabel, progresPrecentage, loaderWidth;
var confettiContainer,
  ambientGradientLayer,
  ambientOrbs = [];
///////////////////////////////////////////////////////////////////
window.onload = function (e) {
  checkBrowserSupport();
};
///////////////////////////////////////////////////////////////////
const confettiColors = ["#FFD700", "#FF6F61", "#4CAF50", "#2196F3", "#FFEB3B", "#FF9800"];

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

function launchConfetti(count = 50) {
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 6 + 4;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const shape = new createjs.Shape();

        shape.graphics.beginFill(color).drawRect(-size / 2, -size / 2, size, size);
        shape.x = canvas.width / 2;
        shape.y = 0;
        shape.rotation = Math.random() * 360;
        shape.alpha = 0.9;

        confettiContainer.addChild(shape);
        const duration = Math.random() * 1000 + 1500;
        const targetX = Math.random() * canvas.width;
        const targetY = canvas.height + 50;
        createjs.Tween.get(shape)
            .to({ x: targetX, y: targetY, rotation: shape.rotation + 360 }, duration, createjs.Ease.quadOut)
            .call(() => confettiContainer.removeChild(shape));
    }
}

function showStarburst(x, y) {
    const star = new createjs.Shape();
    const g = star.graphics;
    g.beginFill("#FFD700").drawPolyStar(0, 0, 30, 5, 0.6, -90);
    star.x = x;
    star.y = y;
        star.visible=true;
    star.alpha = 0;
    star.scaleX = star.scaleY = 0.5;
    container.addChild(star);

    createjs.Tween.get(star)
        .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut)
        .to({ alpha: 0, scaleX: 1.5, scaleY: 1.5 }, 300);
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


function init() {
  canvas = document.getElementById("gameCanvas");
  stage = new createjs.Stage(canvas);
  container = new createjs.Container();
  stage.addChild(container);
  ambientLayer = new createjs.Container();
  container.addChild(ambientLayer);
  overlayLayer = new createjs.Container();
  container.addChild(overlayLayer);

  createjs.Ticker.addEventListener("tick", stage);


  loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
  loaderBar = new createjs.Container();
  var txt = new createjs.Container();
  bar = new createjs.Shape();
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
  loaderWidth = 300;
  callLoader();
  createLoader();
  createCanvasResize();
confettiContainer = new createjs.Container();
overlayLayer.addChild(confettiContainer);
confettiContainer.x = 0;
confettiContainer.y = 0;
confettiContainer.visible = true;
confettiContainer.mask = null;
confettiContainer.alpha = 1;

createAmbientBackground();

  stage.update();
  stage.enableMouseOver(40);
  ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

  /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

  assetsPath = "assets/";
  gameAssetsPath = "Anagrams-Body/";
  soundpath = "FA/";

  var success = createManifest();
  if (success == 1) {
    manifest.push(
      { id: "chHolder", src: questionTextPath + "Anagrams-Body-QT1.png" },
      { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
      { id: "QusTxtString", src: questionTextPath + "Anagrams-Body-QT.png" },
      { id: "clueMc", src: gameAssetsPath + "clueImage.png" }
    );
    preloadAllAssets();
    stage.update();
  }
}

//=====================================================================//
function doneLoading1(event) {
  var event = assets[i];
  var id = event.item.id;
  console.log(" doneLoading ");
loaderBar.visible = false;
  stage.update();

  if (id == "QusTxtString") {

    QusTxtString = new createjs.Text(
      "Find the name of a part of the body that is an anagram of",
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

    container.parent.addChild(QusTxtString);
    QusTxtString.visible = false;
  }

  if (id == "choice1") {
    var choiceSpriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [preload.getResult("choice1")],
      frames: { regX: 50, height: 146, count: 64, regY: 50, width: 174 },
      // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    });

    choice1 = new createjs.Sprite(choiceSpriteSheet);
    container.parent.addChild(choice1);
    choice1.visible = false;
  }

  if (id == "clueMc") {
    var clueSpriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [preload.getResult("clueMc")],
     frames: { "regX": 50, "height": 107, "count": 0, "regY": 50, "width": 120 },
	  //frames: { regX: 50, height: 60, count: 0, regY: 50, width: 67 },
      // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    });

    clueMc = new createjs.Sprite(clueSpriteSheet);
    container.parent.addChild(clueMc);
    clueMc.visible = false;
  }

  if (id == "chHolder") {
    chHolderMC = new createjs.Bitmap(preload.getResult("chHolder"));
    container.parent.addChild(chHolderMC);
    chHolderMC.visible = false;
  }
}

function tick(e) {
  stage.update();
}

/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
  qno = between(0, 17);
  qno.splice(qno.indexOf(5), 1);
  CreateGameStart();
  if (gameType == 0) {
    CreateGameElements();
    getStartQuestion();
  } else {
    //for db
    getdomainpath();
    //end
  }
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

function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;

  chHolderMC.visible = false;
  chHolderMC.y = chHolderMC.y - 7;
  container.parent.addChild(chHolderMC);

  ensureQuestionCard();

  for (i = 0; i < maxLetterCnt; i++) {
    if (!clueBgArr[i]) {
      clueBgArr[i] = new createjs.Shape();
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].alpha = 0;
      clueBgArr[i].visible = false;
      clueBgArr[i].shadow = new createjs.Shadow("rgba(6,14,30,0.45)", 0, 10, 28);
      clueBgArr[i].__baseScale = 1;
      clueBgArr[i].mouseEnabled = false;
      clueBgArr[i].mouseChildren = false;
      container.parent.addChild(clueBgArr[i]);
    }

    clueMcArr[i] = new createjs.MovieClip();
    container.parent.addChild(clueMcArr[i]);
    clueArr[i] = clueMc.clone();
    clueMcArr[i].addChild(clueArr[i]);
    clueArr[i].gotoAndStop(26);
    clueArr[i].visible = false;
    clueArr[i].x = 355 + i * 70 - 14;
    clueArr[i].y = 490;
  }

  container.parent.addChild(choice1);
  choice1.visible = false;

  for (i = 0; i < maxLetterCnt; i++) {
    if (!choiceBgArr[i]) {
      choiceBgArr[i] = new createjs.Shape();
      drawChoiceTileBackground(choiceBgArr[i]);
      choiceBgArr[i].alpha = 0;
      choiceBgArr[i].visible = false;
      choiceBgArr[i].shadow = new createjs.Shadow("rgba(9,18,36,0.4)", 0, 18, 36);
      choiceBgArr[i].__baseScale = 1;
      choiceBgArr[i].mouseEnabled = false;
      choiceBgArr[i].mouseChildren = false;
      container.parent.addChild(choiceBgArr[i]);
    }

    if (!choiceGlowArr[i]) {
      choiceGlowArr[i] = new createjs.Shape();
      choiceGlowArr[i].graphics
        .beginRadialGradientFill([
          "rgba(104,174,255,0.4)",
          "rgba(104,174,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 120)
        .drawCircle(0, 0, 120);
      choiceGlowArr[i].alpha = 0;
      choiceGlowArr[i].visible = false;
      choiceGlowArr[i].mouseEnabled = false;
      choiceGlowArr[i].mouseChildren = false;
      container.parent.addChild(choiceGlowArr[i]);
    }

    choiceArr[i] = choice1.clone();
    choiceArr[i].scaleX = choiceArr[i].scaleY = 0.8;
    choiceArr[i].visible = false;
    container.parent.addChild(choiceArr[i]);
    choiceArr[i].x = 205 + i * 120;
    choiceArr[i].y = 620;
  }

  if (questionCardContainer && container.parent) {
    container.parent.setChildIndex(questionCardContainer, container.parent.getNumChildren() - 1);
  }

  /*if(isQuestionAllVariations){
        createGameWiseQuestions()
        pickques()
    }else{
        pickques()
    }*/
}

function helpDisable() {
  for (i = 0; i < cLen; i++) {
    choiceMcArr[i].mouseEnabled = false;
  }
}

function helpEnable() {
  for (i = 0; i < cLen; i++) {
    choiceMcArr[i].mouseEnabled = true;
  }
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
//=================================================================================================================================//
function pickques() {
  pauseTimer();

  //for db
  tx = 0;
  qscnt++;
  //db
  cnt++;
  quesCnt++;
  if (typeof refreshHudValues === "function") {
    refreshHudValues();
  } else if (typeof gameQCntTxt !== "undefined" && gameQCntTxt) {
    gameQCntTxt.text = quesCnt + "/" + String(totalQuestions);
  }
  chpos = [];
  strArr = [];
  getChar = [];
  currentObj = [];
  lCnt = -1;
  cLen = 0;
  panelVisibleFn();

  //==========================================================================================//
  chHolderMC.visible = false;
  QusTxtString.visible = true;
  wrdCnt = -1;

  isCorrect = "";
  chHolderMC.visible = false;
  correctAnswer = words_arry[qno[cnt]];

  if (question) {
    question.text = nameArr[qno[cnt]].toUpperCase();
    question.visible = true;
  }

  if (questionSubtitle) {

    questionSubtitle.text = "";
  }

  layoutQuestionCardContents();


  if (questionCardContainer) {
    questionCardContainer.visible = true;
    questionCardContainer.alpha = 0;
    questionCardContainer.scaleX = questionCardContainer.scaleY = 0.5;
  }

  ans = correctAnswer;

  console.log("correct3Answer= " + correctAnswer);
  enablechoices();
  createjs.Ticker.addEventListener("tick", tick);
  stage.update();
}

function enablechoices() {
  var getStr = nameArr[qno[cnt]];
  console.log("getStr=" + getStr);

  cLen = getStr.length;
  rand1 = between(0, cLen - 1);

  for (i = 0; i < maxLetterCnt; i++) {
    if (choiceArr[i]) {
      choiceArr[i].visible = i < cLen;
      choiceArr[i].alpha = 0;
      choiceArr[i].mouseEnabled = false;
      detachChoiceInteractions(i);
    }
    if (choiceBgArr[i]) {
      drawChoiceTileBackground(choiceBgArr[i]);
      choiceBgArr[i].visible = false;
      choiceBgArr[i].alpha = 0;
    }
    if (choiceGlowArr[i]) {
      choiceGlowArr[i].visible = false;
      choiceGlowArr[i].alpha = 0;
    }
    if (clueArr[i]) {
      clueArr[i].visible = false;
      clueArr[i].gotoAndStop(26);
    }
    if (clueBgArr[i]) {
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].visible = false;
      clueBgArr[i].alpha = 0;
    }
  }

  for (i = 0; i < cLen; i++) {
    getChar[i] = correctAnswer.charAt(i).toString().toUpperCase();
    indx[i] = alphabetArr.indexOf(getChar[i]);
    choiceArr[rand1[i]].gotoAndStop(indx[i]);
    choiceArr[rand1[i]].name = getChar[i];
  }


  choiceArrScale = 0.8;

  for (i = 0; i < cLen; i++) {
    choiceArr[i].scaleX = choiceArr[i].scaleY = 0.8;
    choiceArr[i].y = 600;
    clueArr[i].y = 445;
    clueArr[i].scaleX = clueArr[i].scaleY = 1;

    if (cLen == 2) {
      clueArr[i].x = 585 + i * 90 - 14;
      choiceArr[i].x = 430 + i * 175;
    }

    if (cLen == 3) {
      clueArr[i].x = 510 + i * 120;
      choiceArr[i].x = 430 + i * 175;
    }
    if (cLen == 4) {
      clueArr[i].x = 465 + i * 110;
      choiceArr[i].x = 340 + i * 175;
    }
    if (cLen == 5) {
      clueArr[i].x = 410 + i * 110;
      choiceArr[i].x = 230 + i * 185;
    }
    if (cLen == 6) {
      clueArr[i].x = 370 + i * 110 - 14;
      choiceArr[i].x = 165 + i * 175;
    }
    if (cLen == 7) {
      clueArr[i].x = 320 + i * 110 - 14;
      choiceArr[i].x = 92 + i * 170;
    }
    if (cLen == 8) {
      clueArr[i].x = 260 + i * 110 - 14;
      choiceArr[i].x = 77 + i * 150;
    }

    if (cLen == 9) {
      choiceArrScale = 0.7;
      clueArr[i].x = 210 + i * 110 - 14;
      choiceArr[i].x = 43 + i * 140;
    }
    if (cLen == 10) {
      choiceArrScale = 0.7;
      choiceArr[i].scaleX = choiceArr[i].scaleY = 0.7;
      clueArr[i].x = 388 + i * 63 - 14;
      choiceArr[i].x = 65 + i * 120;
    }
    if (cLen == 11) {
      choiceArr[i].scaleX = choiceArr[i].scaleY = 0.65;
      clueArr[i].x = 358 + i * 63 - 14;
      choiceArr[i].x = 35 + i * 114;
    }
    if (cLen == 12) {
      choiceArrScale = 0.65;
      choiceArr[i].scaleX = choiceArr[i].scaleY = 0.65;
      clueArr[i].x = 326 + i * 63 - 14;
      choiceArr[i].x = 28 + i * 105;
    }
    if (cLen == 13) {
      choiceArrScale = 0.58;
      choiceArr[i].scaleX = choiceArr[i].scaleY = 0.58;
      clueArr[i].x = 295 + i * 63 - 14;
      choiceArr[i].x = 27 + i * 97;
    }

    if (clueBgArr[i]) {
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].x = clueArr[i].x;
      clueBgArr[i].y = clueArr[i].y;
      clueBgArr[i].visible = true;
      clueBgArr[i].alpha = 0;
      clueBgArr[i].__baseScale = 1;
    }

    if (choiceBgArr[i]) {
      var tileScale = choiceArr[i].scaleX || choiceArrScale;
      choiceBgArr[i].x = choiceArr[i].x;
      choiceBgArr[i].y = choiceArr[i].y;
      choiceBgArr[i].scaleX = choiceBgArr[i].scaleY = tileScale * 1.18;
      choiceBgArr[i].__baseScale = tileScale * 1.18;
      choiceBgArr[i].visible = true;
      choiceBgArr[i].alpha = 0;
    }

    if (choiceGlowArr[i]) {
      choiceGlowArr[i].x = choiceArr[i].x;
      choiceGlowArr[i].y = choiceArr[i].y + 6;
      choiceGlowArr[i].scaleX = choiceGlowArr[i].scaleY = (choiceArr[i].scaleX || choiceArrScale) * 1.3;
      choiceGlowArr[i].__targetScale = choiceGlowArr[i].scaleX;
      choiceGlowArr[i].visible = true;
      choiceGlowArr[i].alpha = 0;
    }

    choiceArr[i].visible = true;
    choiceArr[i].id = i;
    choiceArr[i].mouseEnabled = true;
    choiceArr[i].cursor = "pointer";
    choiceArr[i].__baseScale = choiceArr[i].scaleX;
  }


  if (questionCardContainer) {
    var targetCenterX = canvas && !isNaN(canvas.width) ? canvas.width / 2 : 0;

    if (cLen > 0 && clueArr[0] && clueArr[cLen - 1]) {
      var firstSlotX = clueArr[0].x;
      var lastSlotX = clueArr[cLen - 1].x;

      if (!isNaN(firstSlotX) && !isNaN(lastSlotX)) {
        targetCenterX = (firstSlotX + lastSlotX) / 2;
      }
    }

    questionCardContainer.x = targetCenterX;
    layoutQuestionCardContents();
  }

 
  createTween();
}
function createTween() {
  chHolderMC.visible = false;
  chHolderMC.alpha = 0;
  createjs.Tween.get(chHolderMC).wait(300).to({ alpha: 1 }, 300);

  if (questionCardContainer) {
    questionCardContainer.visible = true;
    questionCardContainer.alpha = 0;
    questionCardContainer.scaleX = questionCardContainer.scaleY = 0.5;
    createjs.Tween.get(questionCardContainer, { override: true })
      .wait(180)
      .to({ alpha: 1, scaleX: .5, scaleY: .5 }, 380, createjs.Ease.quadOut);
  }


  if (question) {
    question.alpha = 0;
    createjs.Tween.get(question, { override: true })
      .wait(260)
      .to({ alpha: 1 }, 320, createjs.Ease.quadOut);
  }

 
  var clueDelay = 360;
  for (i = 0; i < cLen; i++) {
    if (clueBgArr[i]) {
      clueBgArr[i].alpha = 0;
      clueBgArr[i].visible = true;
      createjs.Tween.get(clueBgArr[i], { override: true })
        .wait(clueDelay + i * 90)
        .to({ alpha: 0.95, scaleX: clueBgArr[i].__baseScale, scaleY: clueBgArr[i].__baseScale }, 260, createjs.Ease.quadOut);
    }

    clueArr[i].visible = true;
    clueArr[i].alpha = 0;
    createjs.Tween.get(clueArr[i], { override: true })
      .wait(clueDelay + i * 90 + 140)
      .to({ alpha: 1 }, 240, createjs.Ease.quadOut);
  }

  var val = 420;
  for (i = 0; i < cLen; i++) {
    var targetScale = choiceArr[i].__baseScale || choiceArrScale;

    var bgTargetScale = choiceBgArr[i] ? choiceBgArr[i].__baseScale || targetScale * 1.18 : null;
    if (choiceBgArr[i]) {
      choiceBgArr[i].alpha = 0;
      choiceBgArr[i].scaleX = choiceBgArr[i].scaleY = bgTargetScale * 0.9;
      createjs.Tween.get(choiceBgArr[i], { override: true })
        .wait(val)
        .to({ alpha: 0.95, scaleX: bgTargetScale, scaleY: bgTargetScale }, 300, createjs.Ease.quadOut);
    }

    var glowTargetScale = choiceGlowArr[i] ? choiceGlowArr[i].__targetScale || targetScale * 1.3 : null;
    if (choiceGlowArr[i]) {
      choiceGlowArr[i].alpha = 0;
      choiceGlowArr[i].scaleX = choiceGlowArr[i].scaleY = glowTargetScale * 0.9;
      createjs.Tween.get(choiceGlowArr[i], { override: true })
        .wait(val + 80)
        .to({ alpha: 0.38, scaleX: glowTargetScale, scaleY: glowTargetScale }, 260, createjs.Ease.quadOut);
    }

    choiceArr[i].visible = true;
    choiceArr[i].alpha = 0;
    choiceArr[i].y = 570;
    choiceArr[i].scaleX = choiceArr[i].scaleY = targetScale * 1.12;
    createjs.Tween.get(choiceArr[i], { override: true })
      .wait(val)
      .to({ y: 600, scaleX: targetScale, scaleY: targetScale, alpha: 1 }, 320, createjs.Ease.quadOut);

    val += 140;
  }

  repTimeClearInterval = setTimeout(AddListenerFn, 3000);
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

function AddListenerFn() {
  clearTimeout(repTimeClearInterval);
  for (i = 0; i < cLen; i++) {
    choiceArr[i].addEventListener("click", answerSelected);
    attachChoiceInteractions(i);
  }

  rst = 0;
  gameResponseTimerStart();
  restartTimer();
}
//================================================//
function getCompareArray(aArr, aArr1) {
  var arr = [];
  for (var i = 0; i < aArr.length; i++) {
    for (var j = 0; j < aArr1.length; j++) {
      if (aArr[i] == aArr1[j]) {
        aArr.splice(i, 1);
      }
    }
  }
  arr = aArr;
  console.log("arr= " + arr);
  return arr;
}
//===============================================//
function disablechoices() {
  for (i = 0; i < cLen; i++) {
    choiceArr[i].removeEventListener("click", answerSelected);
    detachChoiceInteractions(i);

    choiceArr[i].cursor = "default";
    choiceArr[i].mouseEnabled = false;
    clueArr[i].visible = false;
    choiceArr[i].visible = false;

    if (choiceBgArr[i]) {
      createjs.Tween.get(choiceBgArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
    if (choiceGlowArr[i]) {
      createjs.Tween.get(choiceGlowArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
    if (clueBgArr[i]) {
      createjs.Tween.get(clueBgArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
  }
  if (questionCardContainer) {
    questionCardContainer.visible = false;
  }
  chHolderMC.visible = false;

  //============================================//
  closeBtn.mouseEnabled = false;
  fullScreenBtn.mouseEnabled = false;
  volumeBtn.mouseEnabled = false;
}

function answerSelected(e) {
  e.preventDefault();
  lCnt++;
  uans = e.currentTarget.name;
  console.log("uans= " + uans);
  var selectedIndex = e.currentTarget.id;
  e.currentTarget.mouseEnabled = false;
  e.currentTarget.cursor = "default";
  detachChoiceInteractions(selectedIndex);
e.currentTarget.visible=false;
  strArr.push(uans);
  var str1 = uans;
  var indAnsVal = alphabetArr.indexOf(str1);
  clueArr[lCnt].gotoAndStop(indAnsVal);
  animateClueSlotFill(lCnt, getChar[lCnt] == str1);
  markChoiceResult(selectedIndex, getChar[lCnt] == str1);

  gameResponseTimerStop();
  // pauseTimer();

  if (getChar[lCnt] == str1) {
    currentObj[lCnt] = e.currentTarget.id;

    if (cLen == strArr.length) {
      setTimeout(correct, 500);
    }
  } else {
    disablechoices();
    getValidation("wrong");
  }
}

function correct() {
	//launchConfetti(20); // number of pieces
	//showStarburst(canvas.width / 2, canvas.height / 2);

   getValidation("correct");
   disablechoices();
}

function disableMouse() {
  for (i = 0; i < cLen; i++) {
    choiceArr[i].mouseEnabled = false;
  }
}

function enableMouse() {
  for (i = 0; i < cLen; i++) {
    var curName = choiceArr[i].id;
    if (currentObj.indexOf(curName) == -1) choiceArr[i].mouseEnabled = true;
  }
}

//===============================================================================================//