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

function getGameplayCenterX() {
  if (typeof getCanvasCenterX === "function") {
    return getCanvasCenterX();
  }
  if (typeof canvas !== "undefined" && canvas && !isNaN(canvas.width)) {
    return canvas.width / 2;
  }
  return 640;
}

function buildChoiceLayout(letterCount) {
  var count = Math.max(1, letterCount || 1);
  var centerX = getGameplayCenterX();
  var layout = {
    choiceScale: 0.82,
    choiceSpacing: 150,
    clueScale: 1,
    clueSpacing: 110,
    choiceY: 620,
    clueY: 455
  };

  if (count <= 3) {
    layout.choiceScale = 0.86;
    layout.choiceSpacing = 176;
    layout.clueSpacing = 120;
  } else if (count <= 5) {
    layout.choiceScale = 0.82;
    layout.choiceSpacing = 162;
    layout.clueSpacing = 112;
  } else if (count <= 7) {
    layout.choiceScale = 0.78;
    layout.choiceSpacing = 150;
    layout.clueSpacing = 106;
  } else if (count <= 9) {
    layout.choiceScale = 0.72;
    layout.choiceSpacing = 138;
    layout.clueScale = 0.94;
    layout.clueSpacing = 102;
  } else if (count <= 11) {
    layout.choiceScale = 0.66;
    layout.choiceSpacing = 124;
    layout.clueScale = 0.9;
    layout.clueSpacing = 96;
  } else {
    layout.choiceScale = 0.6;
    layout.choiceSpacing = 116;
    layout.clueScale = 0.86;
    layout.clueSpacing = 92;
  }

  layout.choiceStart = centerX - ((count - 1) * layout.choiceSpacing) / 2;
  layout.clueStart = centerX - ((count - 1) * layout.clueSpacing) / 2;
  layout.choiceBgScale = layout.choiceScale * 1.18;
  layout.choiceGlowScale = layout.choiceScale * 1.32;
  layout.clueBgScale = layout.clueScale * 1.08;

  return layout;
}
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
  gameAssetsPath = "Anagrams-Body/";
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

 
   call_UI_gameQuestion(container,"Find the name of a part of the body that is an anagram of");
 

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



function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;



  ensureQuestionCard();

  if (typeof hideGameplayTimeUpBanner === "function") {
    hideGameplayTimeUpBanner(true);
  }

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

    if (typeof ensureChoiceDecorations === "function") {
      ensureChoiceDecorations(i);
      hideChoiceDecorations(i);
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
    choiceMcArr[i].mouseEnabled = false;
  }
}

function helpEnable() {
  for (i = 0; i < cLen; i++) {
    choiceMcArr[i].mouseEnabled = true;
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

    if (typeof resetChoiceTileVisual === "function") {
      resetChoiceTileVisual(i);
      if (!choiceArr[i] || !choiceArr[i].visible) {
        hideChoiceDecorations(i);
      }
    }
  }

  for (i = 0; i < cLen; i++) {
    getChar[i] = correctAnswer.charAt(i).toString().toUpperCase();
    indx[i] = alphabetArr.indexOf(getChar[i]);
    choiceArr[rand1[i]].gotoAndStop(indx[i]);
    choiceArr[rand1[i]].name = getChar[i];
  }


  choiceArrScale = 0.8;
  var layout = buildChoiceLayout(cLen);
  choiceArrScale = layout.choiceScale;

  for (i = 0; i < cLen; i++) {
    var choiceX = layout.choiceStart + i * layout.choiceSpacing;
    var clueX = layout.clueStart + i * layout.clueSpacing;

    choiceArr[i].scaleX = choiceArr[i].scaleY = layout.choiceScale;
    choiceArr[i].x = choiceX;
    choiceArr[i].y = layout.choiceY;
    choiceArr[i].visible = true;
    choiceArr[i].id = i;
    choiceArr[i].mouseEnabled = false;
    choiceArr[i].cursor = "default";
    choiceArr[i].__baseScale = layout.choiceScale;

    clueArr[i].x = clueX;
    clueArr[i].y = layout.clueY;
    clueArr[i].scaleX = clueArr[i].scaleY = layout.clueScale;

    if (clueBgArr[i]) {
      drawClueSlotBackground(clueBgArr[i]);
      clueBgArr[i].x = clueX;
      clueBgArr[i].y = layout.clueY;
      clueBgArr[i].visible = true;
      clueBgArr[i].alpha = 0;
      clueBgArr[i].scaleX = clueBgArr[i].scaleY = layout.clueBgScale;
      clueBgArr[i].__baseScale = layout.clueBgScale;
    }

    if (choiceBgArr[i]) {
      drawChoiceTileBackground(choiceBgArr[i]);
      choiceBgArr[i].x = choiceX;
      choiceBgArr[i].y = layout.choiceY;
      choiceBgArr[i].scaleX = choiceBgArr[i].scaleY = layout.choiceBgScale;
      choiceBgArr[i].__baseScale = layout.choiceBgScale;
      choiceBgArr[i].visible = true;
      choiceBgArr[i].alpha = 0;
    }

    if (choiceGlowArr[i]) {
      choiceGlowArr[i].x = choiceX;
      choiceGlowArr[i].y = layout.choiceY + 6;
      choiceGlowArr[i].scaleX = choiceGlowArr[i].scaleY = layout.choiceGlowScale;
      choiceGlowArr[i].__targetScale = layout.choiceGlowScale;
      choiceGlowArr[i].visible = true;
      choiceGlowArr[i].alpha = 0;
    }

    if (typeof positionChoiceDecorations === "function") {
      positionChoiceDecorations(i);
      setChoiceDisabledAppearance(i);
    }
  }


  if (questionCardContainer) {
    var targetCenterX = getGameplayCenterX();

    if (cLen > 0 && clueArr[0] && clueArr[cLen - 1]) {
      var firstSlotX = clueArr[0].x;
      var lastSlotX = clueArr[cLen - 1].x;

      if (!isNaN(firstSlotX) && !isNaN(lastSlotX)) {
        targetCenterX = (firstSlotX + lastSlotX) / 2;
      }
    }

    questionCardContainer.x = targetCenterX;
    questionCardContainer.y = 280;
    questionCardContainer.__baseY = 280;
    layoutQuestionCardContents();
  }

 
  createTween();
}
function createTween() {


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

    var endChoiceY = choiceArr[i].y;
    var startChoiceY = endChoiceY - 30;
    choiceArr[i].y = startChoiceY;

    if (typeof positionChoiceDecorations === "function") {
      positionChoiceDecorations(i);
    }

    if (typeof stopChoiceReadyPulse === "function") {
      stopChoiceReadyPulse(i);
    }

    if (typeof hideChoiceReadyBadge === "function") {
      hideChoiceReadyBadge(i);
    }

    if (typeof choiceDisableOverlayArr !== "undefined" && choiceDisableOverlayArr[i]) {
      var overlay = choiceDisableOverlayArr[i];
      var overlayScale = overlay.__baseScale || (bgTargetScale || targetScale * 1.18);
      overlay.visible = true;
      overlay.alpha = 0;
      overlay.scaleX = overlay.scaleY = overlayScale * 0.94;
      overlay.y = startChoiceY;
      createjs.Tween.get(overlay, { override: true })
        .wait(val + 80)
        .to({ alpha: 0.6, scaleX: overlayScale, scaleY: overlayScale, y: endChoiceY }, 280, createjs.Ease.quadOut);
    }

    choiceArr[i].visible = true;
    choiceArr[i].alpha = 0;
    choiceArr[i].scaleX = choiceArr[i].scaleY = targetScale * 1.12;
    createjs.Tween.get(choiceArr[i], { override: true })
      .wait(val)
      .to({ y: endChoiceY, scaleX: targetScale, scaleY: targetScale, alpha: 1 }, 320, createjs.Ease.quadOut);

    val += 140;
  }

  repTimeClearInterval = setTimeout(AddListenerFn, 3000);
}


function AddListenerFn() {
  clearTimeout(repTimeClearInterval);
  for (i = 0; i < cLen; i++) {
    choiceArr[i].addEventListener("click", answerSelected);
    attachChoiceInteractions(i);
    choiceArr[i].mouseEnabled = true;
    choiceArr[i].cursor = "pointer";
    if (typeof activateChoiceReadyAppearance === "function") {
      activateChoiceReadyAppearance(i);
    }
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

    if (typeof hideChoiceDecorations === "function") {
      hideChoiceDecorations(i);
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
e.currentTarget.visible=false;
  strArr.push(uans);
  var str1 = uans;
  var indAnsVal = alphabetArr.indexOf(str1);
  clueArr[lCnt].gotoAndStop(indAnsVal);
  animateClueSlotFill(lCnt, getChar[lCnt] == str1);
  markChoiceResult(selectedIndex, getChar[lCnt] == str1);

  if (typeof stopChoiceReadyPulse === "function") {
    stopChoiceReadyPulse(selectedIndex);
  }
  if (typeof hideChoiceReadyBadge === "function") {
    hideChoiceReadyBadge(selectedIndex);
  }

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