///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField; //Message display field
var assets = [];
var cnt = -1,
    qscnt = -1,
    ans, uans, interval, time = 18,
    totalQuestions = 10,
    answeredQuestions = 0,
    choiceCnt = 4,
    quesCnt = 0,
    resTimerOut = 0,
    rst = 0,
    responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var questionPromptContainer,
  questionPromptPrefix,
  questionPromptFocus,
  questionPromptFocusHighlight,
  questionPromptMiddle,
  questionPromptColor,
  questionPromptSuffix;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0,
    aqcnt = 0,
    ccnt = 0,
    cqcnt = 0,
    gscore = 0,
    gscrper = 0,
    gtime = 0,
    rtime = 0,
    crtime = 0,
    wrtime = 0,
    currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0,
    crst = 0,
    wrst = 0,
    score = 0,
    puzzle_cycle, timeOver_Status = 0; //for db //q
var isBgSound = true;
var isEffSound = true;

var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;

var headerPanelThemeMode = "light";
if (typeof window !== "undefined") {
    window.headerPanelThemeMode = headerPanelThemeMode;
}

var lastW, lastH, lastS = 1;
var borderPadding = 10,
    barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var buttons, bt1, bt2, bt3, bt4, bg1
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var posArr = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
var directionArr = ["up", "up", "up", "up", "right", "right", "right", "right", "down", "down", "down", "down", "left", "left", "left", "left"]
var chpos = []
var tweenMcArr = []
var qch
var carsdisp = []
var carclr = []
var caseArr = []
var randDirectionArr = [0, 1, 2, 0, 1, 2, 0, 1, 2, 1]
var carArr1 = []
var carArr2 = []
var carArr3 = []
var carArr4 = []
var ccarArr = [
    [0, 5, 10, 15],
    [10, 0, 5, 15],
    [15, 5, 0, 10],
    [10, 15, 5, 0],
    [1, 6, 11, 12],
    [11, 6, 1, 12],
    [2, 7, 8, 13],
    [13, 8, 7, 2],
    [3, 4, 9, 14],
    [9, 3, 14, 4]
]
var dirCar = [
    [8, 13, 2, 7],
    [2, 8, 13, 7],
    [2, 8, 13, 7],
    [7, 13, 8, 2],
    [1, 2, 3, 0],
    [3, 2, 1, 0],
    [2, 3, 0, 1],
    [1, 0, 3, 2],
    [3, 0, 1, 2],
    [1, 3, 2, 0]
]

 var QusTxtString;
var
  ambientGradientLayer,
  ambientOrbs = [];

// Adjust these coordinates to reposition the title panel specifically for CarPark Level 4.
var CARPARK_TITLE_PANEL_POSITION = {
  x: 120,
  y: 220
};

if (typeof window !== "undefined") {
  window.__carParkLevel4TitlePosition = CARPARK_TITLE_PANEL_POSITION;
}

function getTitlePanelPosition() {
  return CARPARK_TITLE_PANEL_POSITION;
}

function applyTitlePanelPosition(target) {
  if (!target) {
    return;
  }

  var position = getTitlePanelPosition();
  target.x = position.x;
  target.y = position.y;

  target.__layoutTargetX = position.x;
  target.__layoutTargetY = position.y;
  if (!target.__manualLayoutPosition) {
    target.__manualLayoutPosition = { x: position.x, y: position.y };
  } else {
    target.__manualLayoutPosition.x = position.x;
    target.__manualLayoutPosition.y = position.y;
  }
}

function setCarParkTitlePanelPosition(x, y) {
  if (typeof x === "number" && !isNaN(x)) {
    CARPARK_TITLE_PANEL_POSITION.x = x;
  }
  if (typeof y === "number" && !isNaN(y)) {
    CARPARK_TITLE_PANEL_POSITION.y = y;
  }

  if (typeof window !== "undefined") {
    window.__carParkLevel4TitlePosition = CARPARK_TITLE_PANEL_POSITION;
  }

  if (typeof Title !== "undefined" && Title) {
    applyTitlePanelPosition(Title);
  }

  if (typeof introTitle !== "undefined" && introTitle) {
    applyTitlePanelPosition(introTitle);
  }
}
  
//////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
    checkBrowserSupport();
}
//////////////////////////////////////////////////

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

var CAR_PARK_PROMPT_COLOR_DATA = [
  { name: "RED", fill: "#FF4D5D" },
  { name: "YELLOW", fill: "#FFC531" },
  { name: "BLUE", fill: "#3E82FF" },
  { name: "GREEN", fill: "#32C46C" }
];

function shouldUseCarParkTextPrompt() {
  if (typeof lang === "undefined" || lang === null) {
    return true;
  }

  var normalized = String(lang).toLowerCase();
  normalized = normalized.replace(/\\+/g, "/");

  if (
    !normalized ||
    normalized === "englishquestiontext/" ||
    normalized === "englishquestiontext"
  ) {
    return true;
  }

  return false;
}

function getCarParkPromptColorData(index) {
  if (typeof index !== "number") {
    return CAR_PARK_PROMPT_COLOR_DATA[0];
  }

  var normalized = index % CAR_PARK_PROMPT_COLOR_DATA.length;
  if (normalized < 0) {
    normalized += CAR_PARK_PROMPT_COLOR_DATA.length;
  }

  return CAR_PARK_PROMPT_COLOR_DATA[normalized] || CAR_PARK_PROMPT_COLOR_DATA[0];
}

function positionCarParkPromptContainer() {
  if (!questionPromptContainer || !canvas) {
    return;
  }

  questionPromptContainer.x = canvas.width / 2;
  questionPromptContainer.y = 340;

  questionPromptContainer.__layoutTargetX = questionPromptContainer.x;
  questionPromptContainer.__layoutTargetY = questionPromptContainer.y;
  if (!questionPromptContainer.__manualLayoutPosition) {
    questionPromptContainer.__manualLayoutPosition = {
      x: questionPromptContainer.x,
      y: questionPromptContainer.y
    };
  } else {
    questionPromptContainer.__manualLayoutPosition.x = questionPromptContainer.x;
    questionPromptContainer.__manualLayoutPosition.y = questionPromptContainer.y;
  }
}

function layoutCarParkPromptParts() {
  if (!questionPromptContainer) {
    return;
  }

  var parts = [
    questionPromptPrefix,
    questionPromptFocus,
    questionPromptMiddle,
    questionPromptColor,
    questionPromptSuffix
  ];

  var totalWidth = 0;
  var focusWidth = 0;
  var focusHeight = 0;

  if (questionPromptFocus) {
    if (typeof questionPromptFocus.getMeasuredWidth === "function") {
      focusWidth = questionPromptFocus.getMeasuredWidth();
    }

    if (typeof questionPromptFocus.getMeasuredHeight === "function") {
      focusHeight = questionPromptFocus.getMeasuredHeight();
    } else if (typeof questionPromptFocus.getMeasuredLineHeight === "function") {
      focusHeight = questionPromptFocus.getMeasuredLineHeight();
    }

    if (!focusHeight) {
      focusHeight = 56;
    }
  }

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) {
      continue;
    }

    var measuredWidth = part.getMeasuredWidth ? part.getMeasuredWidth() : 0;
    totalWidth += measuredWidth;
  }

  var startX = -totalWidth / 2;
  var currentX = startX;

  for (var j = 0; j < parts.length; j++) {
    var currentPart = parts[j];
    if (!currentPart) {
      continue;
    }

    var width = currentPart.getMeasuredWidth ? currentPart.getMeasuredWidth() : 0;
    currentPart.x = currentX;
    currentPart.y = 0;
    currentX += width;
  }

  if (questionPromptFocusHighlight && questionPromptFocus) {
    var paddingX = 22;
    var paddingY = 14;
    var highlightWidth = focusWidth + paddingX * 2;
    var highlightHeight = focusHeight + paddingY * 2;
    var highlightFill = questionPromptFocusHighlight.__fillColor || "rgba(255,188,120,0.22)";

    questionPromptFocusHighlight.graphics
      .clear()
      .beginFill(highlightFill)
      .drawRoundRect(0, -highlightHeight / 2, highlightWidth, highlightHeight, 28);

    questionPromptFocusHighlight.x = questionPromptFocus.x - paddingX;
    questionPromptFocusHighlight.y = questionPromptFocus.y;
  }
}

function ensureCarParkPromptContainer() {
  if (!shouldUseCarParkTextPrompt() || !container || !container.parent) {
    return;
  }

  if (!questionPromptContainer) {
    questionPromptContainer = new createjs.Container();
    questionPromptContainer.visible = false;
    questionPromptContainer.alpha = 0;
    questionPromptContainer.mouseEnabled = false;
    questionPromptContainer.mouseChildren = false;

    questionPromptPrefix = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
    questionPromptPrefix.textAlign = "left";
    questionPromptPrefix.textBaseline = "middle";
    questionPromptPrefix.shadow = new createjs.Shadow("rgba(8,24,44,0.35)", 0, 8, 18);
    questionPromptContainer.addChild(questionPromptPrefix);

    questionPromptFocusHighlight = new createjs.Shape();
    questionPromptContainer.addChild(questionPromptFocusHighlight);

    questionPromptFocus = new createjs.Text("", "800 54px 'Baloo 2'", "#FFB347");
    questionPromptFocus.textAlign = "left";
    questionPromptFocus.textBaseline = "middle";
    questionPromptFocus.shadow = new createjs.Shadow("rgba(8,24,44,0.3)", 0, 10, 22);
    questionPromptContainer.addChild(questionPromptFocus);

    questionPromptMiddle = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
    questionPromptMiddle.textAlign = "left";
    questionPromptMiddle.textBaseline = "middle";
    questionPromptMiddle.shadow = new createjs.Shadow("rgba(8,24,44,0.35)", 0, 8, 18);
    questionPromptContainer.addChild(questionPromptMiddle);

    questionPromptColor = new createjs.Text("", "800 52px 'Baloo 2'", "#3E82FF");
    questionPromptColor.textAlign = "left";
    questionPromptColor.textBaseline = "middle";
    questionPromptColor.shadow = new createjs.Shadow("rgba(8,24,44,0.32)", 0, 10, 24);
    questionPromptContainer.addChild(questionPromptColor);

    questionPromptSuffix = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
    questionPromptSuffix.textAlign = "left";
    questionPromptSuffix.textBaseline = "middle";
    questionPromptSuffix.shadow = new createjs.Shadow("rgba(8,24,44,0.35)", 0, 8, 18);
    questionPromptContainer.addChild(questionPromptSuffix);
  }

  positionCarParkPromptContainer();

  if (!questionPromptContainer.parent) {
    container.parent.addChild(questionPromptContainer);
  }
}

function prepareCarParkPromptForReveal() {
  if (!shouldUseCarParkTextPrompt()) {
    return;
  }

  ensureCarParkPromptContainer();

  if (!questionPromptContainer) {
    return;
  }

  questionPromptContainer.visible = false;
  questionPromptContainer.alpha = 0;

  if (questionPromptFocus) {
    questionPromptFocus.scaleX = questionPromptFocus.scaleY = 1;
  }

  if (questionPromptFocusHighlight) {
    questionPromptFocusHighlight.scaleX = questionPromptFocusHighlight.scaleY = 1;
  }

  if (questionPromptColor) {
    questionPromptColor.scaleX = questionPromptColor.scaleY = 1;
  }
}

function updateCarParkPrompt(colorIndex, questionType) {
  if (!shouldUseCarParkTextPrompt()) {
    return;
  }

  ensureCarParkPromptContainer();

  if (!questionPromptContainer) {
    return;
  }

  var colorData = getCarParkPromptColorData(colorIndex);
  var isPositionPrompt = questionType === 1;
  var focusWord = isPositionPrompt ? "position" : "direction";
  var colorLabel = colorData && colorData.name ? colorData.name.toLowerCase() : "";

  if (questionPromptPrefix) {
    questionPromptPrefix.text = "What is the ";
  }

  if (questionPromptFocus) {
    questionPromptFocus.text = focusWord;
    questionPromptFocus.color = isPositionPrompt ? "#FF9D40" : "#FFB347";
  }

  if (questionPromptFocusHighlight) {
    questionPromptFocusHighlight.__fillColor = isPositionPrompt
      ? "rgba(255,170,102,0.24)"
      : "rgba(255,188,120,0.22)";
  }

  if (questionPromptMiddle) {
    questionPromptMiddle.text = " of the ";
  }

  if (questionPromptColor) {
    questionPromptColor.text = colorLabel;
    questionPromptColor.color = colorData.fill || "#3E82FF";
  }

  if (questionPromptSuffix) {
    questionPromptSuffix.text = " car?";
  }

  layoutCarParkPromptParts();

  positionCarParkPromptContainer();
}

function revealCarParkPrompt() {
  if (!shouldUseCarParkTextPrompt() || !questionPromptContainer) {
    return;
  }

  positionCarParkPromptContainer();
  questionPromptContainer.visible = true;
  questionPromptContainer.alpha = 0;

  createjs.Tween.get(questionPromptContainer)
    .to({ alpha: 1 }, 220, createjs.Ease.quadOut);

  if (questionPromptFocus) {
    questionPromptFocus.scaleX = questionPromptFocus.scaleY = 1;
    createjs.Tween.get(questionPromptFocus)
      .to({ scaleX: 1.1, scaleY: 1.1 }, 220, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineInOut);
  }

  if (questionPromptFocusHighlight) {
    questionPromptFocusHighlight.scaleX = questionPromptFocusHighlight.scaleY = 1;
    createjs.Tween.get(questionPromptFocusHighlight)
      .to({ scaleX: 1.08, scaleY: 1.08 }, 220, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineInOut);
  }

  if (questionPromptColor) {
    questionPromptColor.scaleX = questionPromptColor.scaleY = 1;
    createjs.Tween.get(questionPromptColor)
      .wait(120)
      .to({ scaleX: 1.08, scaleY: 1.08 }, 200, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.sineInOut);
  }
}

function hideCarParkPrompt() {
  if (!questionPromptContainer) {
    return;
  }

  questionPromptContainer.visible = false;
  questionPromptContainer.alpha = 0;
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
    console.log("innt")

    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    container = new createjs.Container();
    stage.addChild(container)
	ambientLayer = new createjs.Container();
  container.addChild(ambientLayer);
  overlayLayer = new createjs.Container();
  stage.addChild(overlayLayer);
    createjs.Ticker.addEventListener("tick", stage);
	
	loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
  loaderBar = new createjs.Container();
  var txt = new createjs.Container();
  	 
  bar = new createjs.Shape();
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
  loaderWidth = 300;
  
                                                                                                                                             
    callLoader();
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
    gameAssetsPath = "CarPark-Level4/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push({
            id: "choice1", src: gameAssetsPath + "CarQuestionImage.png"
        },
            { id: "holder", src: gameAssetsPath + "CarIntroHolder.png" },
            { id: "DirPosTrack", src: questionTextPath + "CarPark-Level4-QT5.png" }, { id: "DirPosArrow", src: gameAssetsPath + "ClueDirPosArrow.png" }, { id: "questionText", src: questionTextPath + "CarPark-Level4-QT1.png" }, { id: "car", src: questionTextPath + "CarPark-Level4-QT2.png" }, { id: "Buttons", src: gameAssetsPath + "question.png" }, { id: "question1", src: questionTextPath + "CarPark-Level4-QT4.png" }, { id: "DirPosCar", src: gameAssetsPath + "ClueDirPosCar.png" }, { id: "DirPosQuestionText", src: questionTextPath + "CarPark-Level4-QT3.png" }

        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
        applyTitlePanelPosition(Title);
    var event = assets[i];
    var id = event.item.id;

if (id == "QusTxtString") {
	  
	  const boxWidth = 400;
const boxX = (canvas.width - boxWidth) / 2;  
		QusTxtString = new createjs.Text("Find the name of a part of the body that is an anagram of ", "bold 32px 'Baloo 2'", "#b40deb");
		QusTxtString.shadow = new createjs.Shadow("red", 1, 1, 1);
		QusTxtString.textAlign = "center";
		QusTxtString.x = canvas.width / 2; // center of the custom width box
		QusTxtString.y = 180; 
		
		
    //QusTxtString = new createjs.Bitmap(preload.getResult("QusTxtString"));
    container.parent.addChild(QusTxtString);
    QusTxtString.visible = false;
  }
  
    if (id == "car") {
        car1 = new createjs.Bitmap(preload.getResult('car'));
        container.parent.addChild(car1);
        car1.visible = false;
    }
    
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;
    }
    if (id == "questionText") {
        questionText = new createjs.Bitmap(preload.getResult('questionText'));
        container.parent.addChild(questionText);
        questionText.visible = false;
    }

    if (id == "DirPosCar") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosCar")],
            "frames": { "regX": 50, "height": 49, "count": 0, "regY": 50, "width": 79 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosCar = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosCar);
        DirPosCar.visible = false;
    }
    if (id == "DirPosArrow") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosArrow")],
            "frames": { "regX": 50, "height": 49, "count": 0, "regY": 50, "width": 49 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosArrow = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosArrow);
        DirPosArrow.visible = false;
    }
    if (id == "DirPosQuestionText") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosQuestionText")],
            "frames": { "regX": 50, "height": 46, "count": 0, "regY": 50, "width": 197 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosQuestionText = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosQuestionText);
        DirPosQuestionText.visible = false;
    }
    if (id == "DirPosTrack") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosTrack")],
            "frames": { "regX": 50, "height": 328, "count": 0, "regY": 50, "width": 355 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosTrack = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosTrack);
        DirPosTrack.visible = false;
    }


    //
    if (id == "choice1") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 238, "count": 0, "regY": 50, "width": 238 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet2);
        choice1.visible = false;
        mc = new createjs.MovieClip()
        container.parent.addChild(choice1);

        choice2 = new createjs.Sprite(spriteSheet2);
        choice2.visible = false;
        mc1 = new createjs.MovieClip()
        container.parent.addChild(choice2);
        /////
        choice3 = new createjs.Sprite(spriteSheet2);
        choice3.visible = false;
        mc2 = new createjs.MovieClip()
        container.parent.addChild(choice3);


        choice4 = new createjs.Sprite(spriteSheet2);
        choice4.visible = false;
        mc3 = new createjs.MovieClip()
        container.parent.addChild(choice4);
    };
    if (id == "question1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question1")],
            "frames": { "regX": 50, "height": 48, "count": 0, "regY": 50, "width": 181 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        q1 = new createjs.Sprite(spriteSheet1);
        q1.visible = false;
        container.parent.addChild(q1);
    };


    if (id == "Buttons") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("Buttons")],
            "frames": { "regX": 50, "height": 182, "count": 0, "regY": 50, "width": 210 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        buttons = new createjs.Sprite(spriteSheet1);
        buttons.visible = false;
        container.parent.addChild(buttons);
    };
    applyTitlePanelPosition(Title);
    introTitle = Title.clone();
    applyTitlePanelPosition(introTitle);
    introTitle.visible = true;
    container.parent.addChild(introTitle)

}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 9);
    qno.sort(randomSort)
    posArr.sort(randomSort)

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
    
    questionText.x = 0
    questionText.y = 0;
    DirPosQuestionText.visible = false
    DirPosQuestionText.gotoAndStop(0);
    DirPosQuestionText.x = 598, DirPosQuestionText.y = 341
    questionText.visible = false;

    ensureCarParkPromptContainer();
    if (shouldUseCarParkTextPrompt()) {
        hideCarParkPrompt();
        if (questionText) {
            questionText.visible = false;
        }
        if (DirPosQuestionText) {
            DirPosQuestionText.visible = false;
        }
        if (q1) {
            q1.visible = false;
        }
        if (car1) {
            car1.visible = false;
        }
    }

    container.parent.addChild(car1);
    car1.visible = false;
    car1.x = 12;
    car1.y = 0;
    console.log("getlan = " + lang)
    if (lang == "TamilQuestionText/") {
        q1.x = 618;
        q1.y = 283;
        q1.visible = false;
        questionText.x = 10;
        questionText.y = 45;        
        DirPosQuestionText.y = 390;
        car1.y = -10;

    } else if ( lang == "VietnameseQuestionText/") {
        q1.x = 618;
        q1.y = 379.5;
        q1.visible = false;
        car1.x = 12;
        car1.y = 0;

    } else if (lang == "ArabicQuestionText/") {
        q1.x = 618;
        q1.y = 425;
        q1.visible = false;
        car1.x = 0;
        car1.y = 0;

    } else if (lang == "BanglaQuestionText/") {
        q1.x = 618;
        q1.y = 300
        q1.visible = false;
        DirPosQuestionText.x = 598, DirPosQuestionText.y = 400
        car1.x = 0;
    }
    //  else if (lang == "HindiQuestionText/") {
    //     q1.x = 615;
    //     q1.y = 382.5;
    //     q1.visible = false;
    //     q1.scaleX = q1.scaleY = .75
    //     DirPosQuestionText.x = 598, DirPosQuestionText.y = 340
    //     car1.x = car1.x - 5;
    //     car1.y = car1.y - 8;
    // } 
    else {
        q1.x = 615;
        q1.y = 418.5;
        q1.visible = false;
        q1.scaleX = q1.scaleY = .75
        car1.x = 12;
        car1.y = 0;
    }



    var carX = [, 608.5, 250, 950, 605.5]
    var carY = [, 590, 312.5, 296.5, 60]
    for (i = 1; i <= 4; i++) {
        this["choice" + i].x = carX[i]
        this["choice" + i].y = carY[i];
        this["choice" + i].visible = false;
        this["choice" + i].scaleX = this["choice" + i].scaleY = .55
    }
    var btnX = [, 70, 325, 865, 1110]
    //var btnX = [, 100, 300, 900, 1100]
    for (i = 1; i <= 2; i++) {
        this["bt" + i] = buttons.clone();
        this["bt" + i].x = btnX[i]
        this["bt" + i].y = 560
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.85;
        this["bt" + i].visible = false;
        container.parent.addChild(this["bt" + i]);
    }

    for (i = 3; i <= 4; i++) {
        this["bt" + i] = buttons.clone();
        this["bt" + i].x = btnX[i];
        this["bt" + i].y = 560
        this["bt" + i].visible = false;
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.85;
        container.parent.addChild(this["bt" + i]);
    }
    bt1.gotoAndStop(3);
    bt1.name = "left";
    bt2.gotoAndStop(1);
    bt2.name = "right";
    bt3.gotoAndStop(0);
    bt3.name = "up";
    bt4.gotoAndStop(2);
    bt4.name = "down";
    container.parent.addChild(choice1, choice2, choice3, choice4)
    console.log("isQuestionAllVariations= " + isQuestionAllVariations)
    if (isQuestionAllVariations) {
        caseArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        //  createGameWiseQuestions()
        //  pickques()
    } else {
        caseArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        // pickques()
    }
    caseArr.sort(randomSort)
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    var j = [];
    var m = [];
    cnt++;
    quesCnt++;
    getCarrArr = []
    panelVisibleFn()
    if (shouldUseCarParkTextPrompt()) {
        prepareCarParkPromptForReveal();
    } else {
        hideCarParkPrompt();
    }
    //////////////////////////////////////////////////////////////////////////////////////////  
    var qno1 = between(1, 4);
    carsdisp = between(1, 4);
    var setCarColorArr = []
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + carsdisp[i]].visible = false;
        setCarColorArr.push(ccarArr[qno[cnt]][i - 1]);
    }
    setCarColorArr.sort(randomSort)
    ///////////////////////////////////////////////////////////////////
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + carsdisp[i]].visible = true;
        this["choice" + carsdisp[i]].alpha = 0
        this["choice" + i].scaleX = this["choice" + i].scaleY = .55
        this["choice" + carsdisp[i]].gotoAndStop(ccarArr[qno[cnt]][i - 1]);
    }
    setCarColorArr.sort(randomSort)
    var tempval = ccarArr[qno[cnt]].indexOf(setCarColorArr[1])
    var tempAns = carsdisp[tempval + 1];
    q1.gotoAndStop(setCarColorArr[1])
    if (shouldUseCarParkTextPrompt()) {
        q1.visible = false;
    } else {
        q1.visible = true;
    }
    if (shouldUseCarParkTextPrompt()) {
        updateCarParkPrompt(setCarColorArr[1], caseArr[qno[cnt]]);
    }
    if (caseArr[qno[cnt]] == 0) {
        DirPosQuestionText.gotoAndStop(0);
        if (directionArr[setCarColorArr[1]] == "down") {
            console.log("down")
            ans = "down";
        } else if (directionArr[setCarColorArr[1]] == "up") {
            console.log("up")
            ans = "up";
        } else if (directionArr[setCarColorArr[1]] == "right") {
            console.log("right")
            ans = "right";
        } else if (directionArr[setCarColorArr[1]] == "left") {
            console.log("left")
            ans = "left";
        }
    } else {
        DirPosQuestionText.gotoAndStop(1);
        if (tempAns == 1) {
            console.log("down")
            ans = "down";
        } else if (tempAns == 2) {
            console.log("left")
            ans = "left";
        } else if (tempAns == 3) {
            console.log("right")
            ans = "right";
        } else if (tempAns == 4) {
            console.log("up")
            ans = "up";
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////

    CreateTween()
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

}




function CreateTween() {

    /////////////////////////////////////////////////////////////////
    createjs.Tween.get(this["choice" + carsdisp[1]]).wait(200)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    createjs.Tween.get(this["choice" + carsdisp[2]]).wait(400)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    createjs.Tween.get(this["choice" + carsdisp[3]]).wait(600)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    createjs.Tween.get(this["choice" + carsdisp[4]]).wait(800)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    /////////////////////////////////////////////////////////////////////

    if (shouldUseCarParkTextPrompt()) {
        revealCarParkPrompt();
        if (questionText) {
            questionText.visible = false;
        }
        if (DirPosQuestionText) {
            DirPosQuestionText.visible = false;
        }
        if (car1) {
            car1.visible = false;
        }
        if (q1) {
            q1.visible = false;
        }
    } else {
        questionText.visible = true;
        questionText.alpha = 0
        createjs.Tween.get(questionText).wait(1000)
            .to({ alpha: 1 }, 200);
        DirPosQuestionText.visible = true;
        DirPosQuestionText.alpha = 0
        createjs.Tween.get(DirPosQuestionText).wait(1000)
            .to({ alpha: 1, scaleX: .95, scaleY: .95 }, 100).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        // q1.visible = true;
        // q1.alpha = 0
        // createjs.Tween.get(q1).wait(1500)
        //     .to({ alpha: 1, scaleX: .7, scaleY: .7 }, 100)
        //     .to({  scaleX: .75, scaleY: .75 }, 100)
        car1.visible = true;
        car1.alpha = 0
        createjs.Tween.get(car1).wait(1000)
            .to({ alpha: 1 }, 200);
        createjs.Tween.get(DirPosQuestionText).wait(1500)
            .to({ scaleX: .95, scaleY: .95 }, 200)
            .to({ scaleX: 1, scaleY: 1 }, 200)
            .to({ scaleX: .95, scaleY: .95 }, 200)
            .to({ scaleX: 1, scaleY: 1 }, 200);
        q1.visible = true;
        q1.alpha = 0
        createjs.Tween.get(q1).wait(1500)
            .to({ alpha: 1, scaleX: .7, scaleY: .7 }, 200)
            .to({ scaleX: .75, scaleY: .75 }, 200)
            .to({ scaleX: .7, scaleY: .7 }, 200)
            .to({ scaleX: .75, scaleY: .75 }, 200);
    }

    /////////////////button Tween////////////////////////////
    for (i = 1; i <= 4; i++) {
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.95;
        this["bt" + i].visible = true;
        this["bt" + i].alpha = 0;
    }
    createjs.Tween.get(this["bt" + 1]).wait(1500)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 2]).wait(1600)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 3]).wait(1700)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 4]).wait(1800)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    repTimeClearInterval = setTimeout(AddListenerFn, 2500)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 1; i <= 4; i++) {
        this["bt" + i].cursor = "pointer";
        this["bt" + i].alpha = 1;
        this["bt" + i].mouseEnabled = true
        this["bt" + i].visible = true;
        this["bt" + i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

function disablechoices() {
    for (i = 1; i <= 4; i++) {

        this["bt" + i].alpha = 0;
        this["bt" + i].mouseEnabled = false
        this["bt" + i].removeEventListener("click", answerSelected);
        this["bt" + i].visible = false;
    }

}

//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {
        //  currentX = e.currentTarget.x - 20
        //  currentY = e.currentTarget.y - 30
        e.currentTarget.visible = true;
        disableMouse()

        for (i = 1; i <= 4; i++) {
            this["bt" + i].removeEventListener("click", answerSelected);
        }
        setTimeout(correct, 500)
    } else {
        getValidation("wrong");
        disablechoices();
    }

}

function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = false
    }
}

function enableMouse() {

}