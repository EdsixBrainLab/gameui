var messageField; //Message display field

var assets = [];
var choiceArr = [];
var choiceBgArr = [];
var choiceGlowArr = [];
var choiceMcArr = [];
var choicePulseArr = [];
var choiceDisabledOverlayArr = [];
var choiceReadyBadgeArr = [];
var textArr = [];
var qno = [];
var strArr = [];
var chpos = [];
var getChar = [];
var quesMcArr = [];

var clueMcArr = [];
var clueArr = [];
var clueBgArr = [];

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
  question,
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
  "last",
  "pera",
  "rcie",
  "nbsea",
  "atpas",
  "esatk",
  "adreb",
  "ecaler",
  "sguar",
  "noeyh",
  "iepcs",
  "enolm",
  "molne",
  "vileo",
  "erpag",
  "nnoio",
  "lgarci",
  "hceees",
  "trbeut",
  "acrem",
  "lpepa",
  "oangm",
  "avgua",
  "paaapy",
  "anaanb",
  "atmtoo",
  "atotop",
  "artocr",
  "adihsr",
  "rgebur",
  "iazpz",
  "octa",
  "leonod",
  "lnasmo",
  "miprsh",
];
var words_arry = [
  "salt",
  "pear",
  "rice",
  "beans",
  "pasta",
  "steak",
  "bread",
  "cereal",
  "sugar",
  "honey",
  "spice",
  "lemon",
  "melon",
  "olive",
  "grape",
  "onion",
  "garlic",
  "cheese",
  "butter",
  "cream",
  "apple",
  "mango",
  "guava",
  "papaya",
  "banana",
  "tomato",
  "potato",
  "carrot",
  "radish",
  "burger",
  "pizza",
  "taco",
  "noodle",
  "salmon",
  "shrimp",
];

var CHOICE_LETTER_FONT = "800 66px 'Baloo 2'";
var CLUE_LETTER_FONT = "800 60px 'Baloo 2'";
var CLUE_LETTER_VERTICAL_OFFSET = 6;
var LETTER_FILL_COLOR = "#FFFFFF";
var LETTER_SHADOW = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);

var CHOICE_ROW_Y = 620;
var CHOICE_ROW_ENTRY_OFFSET = 42;
var CLUE_ROW_Y = 470;

var globalHelperScope =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : this;

var letterHelpers =
  globalHelperScope && typeof globalHelperScope.SAUI_createAnagramLetterHelpers === "function"
    ? globalHelperScope.SAUI_createAnagramLetterHelpers({
        choiceInteractive: true,
        choiceScale: 0.8,
        choiceFont: CHOICE_LETTER_FONT,
        choiceColor: LETTER_FILL_COLOR,
        choiceShadow: LETTER_SHADOW,
        choiceHitRadius: 78,
        clueScale: 1,
        clueFont: CLUE_LETTER_FONT,
        clueColor: LETTER_FILL_COLOR,
        clueShadow: LETTER_SHADOW
      })
    : null;

var buildChoiceLetterDisplay =
  letterHelpers && typeof letterHelpers.buildChoice === "function"
    ? letterHelpers.buildChoice
    : function () {
        var label = new createjs.Text("", CHOICE_LETTER_FONT, LETTER_FILL_COLOR);
        label.textAlign = "center";
        label.textBaseline = "middle";
        label.shadow = LETTER_SHADOW;
        label.mouseEnabled = true;
        label.mouseChildren = false;
        label.__baseScale = 0.8;
        label.__isChoiceLetter = true;
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
        label.shadow = LETTER_SHADOW;
        label.mouseEnabled = false;
        label.mouseChildren = false;
        label.__baseScale = 1;
        label.__isClueLetter = true;
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

var computeRowLayout = function (count, options) {
  if (globalHelperScope && typeof globalHelperScope.SAUI_computeRowLayout === "function") {
    return globalHelperScope.SAUI_computeRowLayout(count, options);
  }
  if (globalHelperScope && typeof globalHelperScope.SAUI_computeCenteredRow === "function") {
    return globalHelperScope.SAUI_computeCenteredRow(count, options);
  }

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

///////////////////////////////////////////////////////////////////
window.onload = function (e) {
  checkBrowserSupport();
};
///////////////////////////////////////////////////////////////////
 








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
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
  loaderWidth = 300;
  callLoader();
  createLoader();
  createCanvasResize();
  stage.update();
  stage.enableMouseOver(40);
  ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

  /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

  assetsPath = "assets/";
  gameAssetsPath = "Anagrams-Food/";
  soundpath = "FA/";

  var success = createManifest();
  if (success == 1) {
    manifest.push(
      { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
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

 
     call_UI_gameQuestion(container, "Find the word related to food that is an anagram of");
 

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

  
}

function tick(e) {
  stage.update();
}

/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
  qno = between(0, nameArr.length-1);
  qno.splice(qno.indexOf(1), 1);
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



function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;



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

    if (!clueMcArr[i]) {
      clueMcArr[i] = new createjs.Container();
      clueMcArr[i].mouseEnabled = false;
      clueMcArr[i].mouseChildren = false;
      container.parent.addChild(clueMcArr[i]);
    }

    if (!clueArr[i]) {
      clueArr[i] = buildClueLetterDisplay();
      clueMcArr[i].addChild(clueArr[i]);
    }

    updateClueLetterDisplay(clueArr[i], "");
    clueArr[i].visible = false;
    clueArr[i].x = 355 + i * 70 - 14;
    clueArr[i].y = CLUE_ROW_Y + CLUE_LETTER_VERTICAL_OFFSET;
  }

  for (i = 0; i < maxLetterCnt; i++) {
    if (!choiceMcArr[i]) {
      choiceMcArr[i] = new createjs.Container();
      choiceMcArr[i].visible = false;
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].mouseChildren = false;
      choiceMcArr[i].alpha = 0;
      choiceMcArr[i].id = i;
      container.parent.addChild(choiceMcArr[i]);
    }

    if (!choiceGlowArr[i]) {
      choiceGlowArr[i] = new createjs.Shape();
      choiceGlowArr[i].graphics
        .beginRadialGradientFill([
          "rgba(209,178,255,0.6)",
          "rgba(209,178,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 120)
        .drawCircle(0, 0, 120);
      choiceGlowArr[i].alpha = 0;
      choiceGlowArr[i].visible = false;
      choiceGlowArr[i].mouseEnabled = false;
      choiceGlowArr[i].mouseChildren = false;
    }

    if (!choiceBgArr[i]) {
      choiceBgArr[i] = new createjs.Shape();
      drawChoiceTileBackground(choiceBgArr[i]);
      choiceBgArr[i].alpha = 0;
      choiceBgArr[i].visible = false;
      choiceBgArr[i].shadow = new createjs.Shadow("rgba(9,18,36,0.4)", 0, 18, 36);
      choiceBgArr[i].__baseScale = 1;
      choiceBgArr[i].mouseEnabled = false;
      choiceBgArr[i].mouseChildren = false;
    }

    if (!choiceDisabledOverlayArr[i]) {
      choiceDisabledOverlayArr[i] = new createjs.Shape();
      drawChoiceDisabledOverlay(choiceDisabledOverlayArr[i]);
      choiceDisabledOverlayArr[i].alpha = 0;
      choiceDisabledOverlayArr[i].visible = false;
      choiceDisabledOverlayArr[i].mouseEnabled = false;
      choiceDisabledOverlayArr[i].mouseChildren = false;
    }

    if (!choicePulseArr[i]) {
      choicePulseArr[i] = new createjs.Shape();
      drawChoiceSpeechWave(choicePulseArr[i]);
      choicePulseArr[i].alpha = 0;
      choicePulseArr[i].visible = false;
      choicePulseArr[i].mouseEnabled = false;
      choicePulseArr[i].mouseChildren = false;
    }

    if (!choiceArr[i]) {
      choiceArr[i] = buildChoiceLetterDisplay();
      choiceArr[i].mouseEnabled = false;
      choiceArr[i].mouseChildren = false;
    }

    if (!choiceReadyBadgeArr[i] && typeof SA_buildChoiceReadyBadge === "function") {
      choiceReadyBadgeArr[i] = SA_buildChoiceReadyBadge();
    }

    if (choiceMcArr[i]) {
      var tileContainer = choiceMcArr[i];

      if (choiceGlowArr[i] && choiceGlowArr[i].parent !== tileContainer) {
        tileContainer.addChild(choiceGlowArr[i]);
      }
      if (choiceBgArr[i] && choiceBgArr[i].parent !== tileContainer) {
        tileContainer.addChild(choiceBgArr[i]);
      }
      if (choiceDisabledOverlayArr[i] && choiceDisabledOverlayArr[i].parent !== tileContainer) {
        tileContainer.addChild(choiceDisabledOverlayArr[i]);
      }
      if (choicePulseArr[i] && choicePulseArr[i].parent !== tileContainer) {
        tileContainer.addChild(choicePulseArr[i]);
      }
      if (choiceArr[i] && choiceArr[i].parent !== tileContainer) {
        tileContainer.addChild(choiceArr[i]);
      }
      if (choiceReadyBadgeArr[i] && choiceReadyBadgeArr[i].parent !== tileContainer) {
        tileContainer.addChild(choiceReadyBadgeArr[i]);
      }

      if (!tileContainer.__hitArea) {
        tileContainer.__hitArea = new createjs.Shape();
        tileContainer.hitArea = tileContainer.__hitArea;
      }
    }

    updateChoiceLetterDisplay(choiceArr[i], "");
    choiceArr[i].visible = false;
    choiceArr[i].scaleX = choiceArr[i].scaleY = choiceArr[i].__baseScale || 0.8;
    choiceArr[i].x = 0;
    choiceArr[i].y = 0;

    if (typeof SA_resetChoiceTileTweens === "function") {
      SA_resetChoiceTileTweens(i);
    }
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
    if (choiceMcArr[i]) {
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].cursor = "default";
    }
    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }
  }
}

function helpEnable() {
  for (i = 0; i < cLen; i++) {
    if (choiceMcArr[i]) {
      choiceMcArr[i].mouseEnabled = true;
      choiceMcArr[i].cursor = "pointer";
    }
    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, true);
    }
    startChoiceIdleAnimation(i, true);
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
  QusTxtString.visible = true;
  wrdCnt = -1;

  isCorrect = "";
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
    questionCardContainer.scaleX = questionCardContainer.scaleY = 0.78;
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
    if (choiceMcArr[i]) {
      choiceMcArr[i].removeEventListener("click", answerSelected);
      choiceMcArr[i].visible = false;
      choiceMcArr[i].alpha = 0;
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].cursor = "default";
      choiceMcArr[i].name = "";
      choiceMcArr[i].id = i;
    }
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
    if (choiceDisabledOverlayArr[i]) {
      choiceDisabledOverlayArr[i].visible = false;
      choiceDisabledOverlayArr[i].alpha = 0;
    }
    if (choicePulseArr[i]) {
      drawChoiceSpeechWave(choicePulseArr[i]);
      choicePulseArr[i].visible = false;
      choicePulseArr[i].alpha = 0;
      choicePulseArr[i].scaleX = choicePulseArr[i].scaleY = 1;
    }
    if (clueArr[i]) {
      clueArr[i].visible = false;
      updateClueLetterDisplay(clueArr[i], "");
    }
    if (clueBgArr[i]) {
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].visible = false;
      clueBgArr[i].alpha = 0;
    }

    if (choiceReadyBadgeArr[i]) {
      choiceReadyBadgeArr[i].visible = false;
      choiceReadyBadgeArr[i].alpha = 0;
      if (typeof SA_stopChoiceReadyBadgeAnimation === "function") {
        SA_stopChoiceReadyBadgeAnimation(choiceReadyBadgeArr[i]);
      }
    }

    stopChoiceIdleAnimation(i);
  }

  for (i = 0; i < cLen; i++) {
    getChar[i] = correctAnswer.charAt(i).toString().toUpperCase();
    indx[i] = alphabetArr.indexOf(getChar[i]);
    updateChoiceLetterDisplay(choiceArr[rand1[i]], getChar[i]);
    choiceArr[rand1[i]].name = getChar[i];
    if (choiceMcArr[rand1[i]]) {
      choiceMcArr[rand1[i]].name = getChar[i];
      choiceMcArr[rand1[i]].id = rand1[i];
    }
  }


  var choiceLayout = computeRowLayout(cLen, {
    baseSpacing: 182,
    baseScale: 0.8,
    minScale: 0.58,
    maxSpan: 720,
    tileSpan: 158
  });

  var clueLayout = computeRowLayout(cLen, {
    baseSpacing: 134,
    baseScale: 1,
    minScale: 0.82,
    maxSpan: 720,
    tileSpan: 108
  });

  for (i = 0; i < cLen; i++) {
    var tileScale = choiceLayout.scale;
    var slotScale = clueLayout.scale;
    var tileX = choiceLayout.positions[i] || 0;
    var slotX = clueLayout.positions[i] || 0;
    var tileContainer = choiceMcArr[i];

    if (tileContainer) {
      tileContainer.visible = true;
      tileContainer.alpha = 0;
      tileContainer.x = tileX;
      tileContainer.y = CHOICE_ROW_Y;
      tileContainer.__targetY = CHOICE_ROW_Y;
      tileContainer.cursor = "default";
      tileContainer.mouseEnabled = false;

      if (tileContainer.__hitArea) {
        var hitSize = 172 * tileScale;
        tileContainer.__hitArea.graphics
          .clear()
          .beginFill("#000")
          .drawRoundRect(-hitSize / 2, -hitSize / 2, hitSize, hitSize, 52 * tileScale);
      }
    }

    if (choiceArr[i]) {
      choiceArr[i].visible = true;
      choiceArr[i].alpha = 0;
      choiceArr[i].x = 0;
      choiceArr[i].y = 0;
      choiceArr[i].scaleX = choiceArr[i].scaleY = tileScale;
      choiceArr[i].__baseScale = tileScale;
      choiceArr[i].id = i;
      choiceArr[i].cursor = "default";
      choiceArr[i].mouseEnabled = false;
    }

    if (choiceBgArr[i]) {
      drawChoiceTileBackground(choiceBgArr[i]);
      choiceBgArr[i].x = 0;
      choiceBgArr[i].y = 0;
      choiceBgArr[i].scaleX = choiceBgArr[i].scaleY = tileScale * 1.12;
      choiceBgArr[i].__baseScale = tileScale * 1.12;
      choiceBgArr[i].visible = true;
      choiceBgArr[i].alpha = 0;
    }

    if (choiceDisabledOverlayArr[i]) {
      drawChoiceDisabledOverlay(choiceDisabledOverlayArr[i]);
      choiceDisabledOverlayArr[i].x = 0;
      choiceDisabledOverlayArr[i].y = 0;
      choiceDisabledOverlayArr[i].scaleX = choiceDisabledOverlayArr[i].scaleY = tileScale * 1.12;
      choiceDisabledOverlayArr[i].visible = false;
      choiceDisabledOverlayArr[i].alpha = 0;
    }

    if (choicePulseArr[i]) {
      drawChoiceSpeechWave(choicePulseArr[i]);
      choicePulseArr[i].x = 0;
      choicePulseArr[i].y = 0;
      choicePulseArr[i].scaleX = choicePulseArr[i].scaleY = tileScale;
      choicePulseArr[i].alpha = 0;
      choicePulseArr[i].visible = true;
      choicePulseArr[i].__baseScale = tileScale;
    }

    if (choiceGlowArr[i]) {
      choiceGlowArr[i].x = 0;
      choiceGlowArr[i].y = 6 * tileScale;
      choiceGlowArr[i].scaleX = choiceGlowArr[i].scaleY = tileScale * 1.3;
      choiceGlowArr[i].__targetScale = choiceGlowArr[i].scaleX;
      choiceGlowArr[i].visible = true;
      choiceGlowArr[i].alpha = 0;
    }

    if (choiceReadyBadgeArr[i]) {
      var badge = choiceReadyBadgeArr[i];
      var badgeOffset = (148 * tileScale) / 2 + 34;
      badge.x = 0;
      badge.y = -badgeOffset;
      var badgeDesignScale = badge.__designScale || badge.__baseScale || 1;
      badge.__designScale = badgeDesignScale;
      badge.scaleX = badge.scaleY = tileScale * badgeDesignScale;
      badge.__baseScale = tileScale * badgeDesignScale;
      badge.visible = false;
      badge.alpha = 0;
    }

    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }

    if (clueArr[i]) {
      clueArr[i].visible = true;
      clueArr[i].alpha = 0;
      clueArr[i].x = slotX;
      clueArr[i].y = CLUE_ROW_Y + CLUE_LETTER_VERTICAL_OFFSET;
      clueArr[i].scaleX = clueArr[i].scaleY = slotScale;
    }

    if (clueBgArr[i]) {
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].x = slotX;
      clueBgArr[i].y = CLUE_ROW_Y;
      clueBgArr[i].scaleX = clueBgArr[i].scaleY = slotScale;
      clueBgArr[i].visible = true;
      clueBgArr[i].alpha = 0;
      clueBgArr[i].__baseScale = slotScale;
    }
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


  if (questionCardContainer) {
    questionCardContainer.visible = true;
    questionCardContainer.alpha = 0;
    questionCardContainer.scaleX = questionCardContainer.scaleY = 0.78;
    createjs.Tween.get(questionCardContainer, { override: true })
      .wait(180)
      .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 380, createjs.Ease.quadOut);
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

  var hasEnabledChoices = false;
  var lastRevealTween = null;
  function ensureChoicesInteractive() {
    if (hasEnabledChoices) {
      return;
    }
    hasEnabledChoices = true;
    AddListenerFn();
  }

  var val = 420;
  for (i = 0; i < cLen; i++) {
    var tileContainer = choiceMcArr[i];
    var targetScale = choiceArr[i] && choiceArr[i].__baseScale ? choiceArr[i].__baseScale : 0.8;

    if (tileContainer) {
      tileContainer.visible = true;
      tileContainer.alpha = 0;
      tileContainer.y = (tileContainer.__targetY || CHOICE_ROW_Y) - CHOICE_ROW_ENTRY_OFFSET;
      createjs.Tween.get(tileContainer, { override: true })
        .wait(val)
        .to(
          {
            alpha: 1,
            y: tileContainer.__targetY || CHOICE_ROW_Y
          },
          320,
          createjs.Ease.quadOut
        );
    }

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

    if (choicePulseArr[i]) {
      var pulseScale = choicePulseArr[i].__baseScale || targetScale;
      choicePulseArr[i].alpha = 0;
      choicePulseArr[i].scaleX = choicePulseArr[i].scaleY = pulseScale * 0.84;
      createjs.Tween.get(choicePulseArr[i], { override: true })
        .wait(val + 120)
        .to({ alpha: 0.78, scaleX: pulseScale, scaleY: pulseScale }, 320, createjs.Ease.quadOut);
    }

    if (choiceArr[i]) {
      choiceArr[i].visible = true;
      choiceArr[i].alpha = 0;
      choiceArr[i].scaleX = choiceArr[i].scaleY = targetScale * 1.12;
      var revealTween = createjs.Tween.get(choiceArr[i], { override: true })
        .wait(val)
        .to({ scaleX: targetScale, scaleY: targetScale, alpha: 1 }, 320, createjs.Ease.quadOut)
        .call(
          (function (index) {
            return function () {
              if (choiceMcArr[index] && choiceMcArr[index].mouseEnabled) {
                startChoiceIdleAnimation(index, true);
              }
            };
          })(i)
        );
      lastRevealTween = revealTween;
    }

    val += 140;
  }

  if (lastRevealTween) {
    lastRevealTween.call(ensureChoicesInteractive);
  } else {
    ensureChoicesInteractive();
  }
}


function AddListenerFn() {
  for (i = 0; i < cLen; i++) {
    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, true);
    }
    if (choiceMcArr[i]) {
      choiceMcArr[i].addEventListener("click", answerSelected);
      choiceMcArr[i].mouseEnabled = true;
      choiceMcArr[i].cursor = "pointer";
    }
    attachChoiceInteractions(i);
    startChoiceIdleAnimation(i, true);
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
    if (choiceMcArr[i]) {
      choiceMcArr[i].removeEventListener("click", answerSelected);
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].cursor = "default";
      choiceMcArr[i].visible = false;
    }
    detachChoiceInteractions(i);

    clueArr[i].visible = false;
    if (choiceArr[i]) {
      choiceArr[i].visible = false;
    }

    stopChoiceIdleAnimation(i);

    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }

    if (choiceBgArr[i]) {
      createjs.Tween.get(choiceBgArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
    if (choiceGlowArr[i]) {
      createjs.Tween.get(choiceGlowArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
    if (choicePulseArr[i]) {
      createjs.Tween.get(choicePulseArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
    if (clueBgArr[i]) {
      createjs.Tween.get(clueBgArr[i], { override: true }).to({ alpha: 0 }, 160, createjs.Ease.quadOut);
    }
  }
  if (questionCardContainer) {
    questionCardContainer.visible = false;
  }

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
  stopChoiceIdleAnimation(selectedIndex);
  if (choicePulseArr[selectedIndex]) {
    choicePulseArr[selectedIndex].visible = false;
  }
  if (choiceArr[selectedIndex]) {
    choiceArr[selectedIndex].visible = false;
  }
  strArr.push(uans);
  var str1 = uans;
  var indAnsVal = alphabetArr.indexOf(str1);
  updateClueLetterDisplay(clueArr[lCnt], str1);
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
 	//showStarburst(canvas.width / 2, canvas.height / 2);

   getValidation("correct");
   disablechoices();
}

function disableMouse() {
  for (i = 0; i < cLen; i++) {
    if (choiceMcArr[i]) {
      choiceMcArr[i].mouseEnabled = false;
      choiceMcArr[i].cursor = "default";
    }
    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, false, { immediate: true, suppressBadge: true });
    }
  }
}

function enableMouse() {
  for (i = 0; i < cLen; i++) {
    var curName = choiceArr[i] ? choiceArr[i].id : i;
    if (choiceMcArr[i] && currentObj.indexOf(curName) == -1) {
      choiceMcArr[i].mouseEnabled = true;
      choiceMcArr[i].cursor = "pointer";
    }
    if (typeof SA_setChoiceInteractiveState === "function") {
      SA_setChoiceInteractiveState(i, true);
    }
    startChoiceIdleAnimation(i, true);
  }
}

//===============================================================================================//
