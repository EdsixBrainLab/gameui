 
var messageField;

var assets = [];
var assetsPath,
  gameAssetsPath,
  soundpath,
  bg;
var cnt = -1,
  ans,
  qscnt = -1,
  uans,
  interval,
  time = 180,
  totalQuestions = 10,
  answeredQuestions = 0,
  choiceCnt = 10,
  quesCnt = 0,
  resTimerOut = 0,
  rst = 0,
  responseTime = 0,
  correctAnswer = "";

var startBtn,
  introScrn,
  container,
  question,
  statusText,
  backgroundLayer,
  windowContainer,
  resultLoading;
var parrotWowMc,
  parrotOopsMc,
  parrotGameOverMc,
  parrotTimeOverMc,
  btnImages;
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
var loadProgressLabel,
  progresPrecentage,
  loaderWidth;

var canvas,
  stage;
var windowTiles = [];
var windowCount = 10;
var sparrowWindowIndex = -1;
var windowRevealTimer = null;
var windowOpenDuration = 2500;
var windowInteractionEnabled = false;
var windowGridContainer;
var windowBackgroundColor = "#2c3e50";
var windowOpenColor = "#5dade2";
var sparrowSymbol;
var columns = 5;
var rows = 2;
var windowWidth = 150;
var windowHeight = 180;
var windowGapX = 36;
var windowGapY = 42;
var neutralMessageColor = "#0d1b2a";
var successMessageColor = "#146356";
var errorMessageColor = "#8b1e3f";

window.onload = function () {
  checkBrowserSupport();
};

function init() {
  canvas = document.getElementById("gameCanvas");
  stage = new createjs.Stage(canvas);
  container = new createjs.Container();
  stage.addChild(container);
  createjs.Ticker.addEventListener("tick", tick);

  loaderColor = createjs.Graphics.getRGB(254, 198, 44, 1);
  loaderBar = new createjs.Container();
  var txt = new createjs.Container();
  bar = new createjs.Shape();
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
  loaderWidth = 300;
  callLoader();
  createLoader();
  createCanvasResize();

  stage.enableMouseOver(40);

  assetsPath = "assets/";
  gameAssetsPath = "SparrowHunt-Level1/";
  soundpath = "FA/";

  var success = createManifest();
  if (success === 1) {
    preloadAllAssets();
    stage.update();
  }
}

function tick() {
  stage.update();
}

function doneLoading1(event) {
  var id = event.item.id;

  if (id === "resultLoading") {
    resultLoading = new createjs.Bitmap(preload.getResult("resultLoading"));
    resultLoading.visible = false;
    container.parent.addChild(resultLoading);
  }
}

function handleClick() {
  qno = [];
  for (var i = 0; i < totalQuestions; i++) {
    qno.push(i);
  }
  qno.sort(function () {
    return Math.random() - 0.5;
  });

  CreateGameStart();
  if (gameType === 0) {
    CreateGameElements();
    getStartQuestion();
  } else {
    getdomainpath();
  }
}

function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  ensureQuestionText();
  ensureStatusText();
  ensureWindowGrid();

  if (question) {
    question.visible = true;
    question.text = "Track the sparrow";
  }

  if (statusText) {
    statusText.visible = true;
    statusText.color = neutralMessageColor;
    statusText.text = "Watch carefully! All windows open together.";
  }
}

function ensureQuestionText() {
  if (!question) {
    question = new createjs.Text("", "700 48px 'Baloo 2'", "#1f3b73");
    question.textAlign = "center";
    question.textBaseline = "middle";
    question.x = canvas.width / 2;
    question.y = 160;
    question.lineHeight = 52;
    question.shadow = new createjs.Shadow("rgba(12,27,46,0.25)", 0, 4, 12);
    container.parent.addChild(question);
  }
}

function ensureStatusText() {
  if (!statusText) {
    statusText = new createjs.Text("", "400 28px 'Baloo 2'", neutralMessageColor);
    statusText.textAlign = "center";
    statusText.textBaseline = "middle";
    statusText.x = canvas.width / 2;
    statusText.y = 240;
    statusText.lineWidth = 720;
    statusText.shadow = new createjs.Shadow("rgba(12,27,46,0.2)", 0, 3, 8);
    container.parent.addChild(statusText);
  }
}

function ensureWindowGrid() {
  if (!windowGridContainer) {
    windowGridContainer = new createjs.Container();
    container.parent.addChild(windowGridContainer);
  }

  if (windowTiles.length === 0) {
    buildWindowTiles();
  }
}

function buildWindowTiles() {
  windowTiles = [];
  windowGridContainer.removeAllChildren();

  var totalWidth = columns * windowWidth + (columns - 1) * windowGapX;
  var totalHeight = rows * windowHeight + (rows - 1) * windowGapY;
  var startX = canvas.width / 2 - totalWidth / 2 + windowWidth / 2;
  var startY = 360 - totalHeight / 2 + windowHeight / 2;

  for (var i = 0; i < windowCount; i++) {
    var col = i % columns;
    var row = Math.floor(i / columns);
    var tile = createWindowTile(i);
    tile.x = startX + col * (windowWidth + windowGapX);
    tile.y = startY + row * (windowHeight + windowGapY);
    windowTiles.push(tile);
    windowGridContainer.addChild(tile);
  }
}

function createWindowTile(index) {
  var tileContainer = new createjs.Container();
  tileContainer.name = "windowTile" + index;
  tileContainer.windowIndex = index;
  tileContainer.mouseChildren = false;
  tileContainer.cursor = "default";
  tileContainer.regX = windowWidth / 2;
  tileContainer.regY = windowHeight / 2;

  var shadow = new createjs.Shape();
  shadow.graphics
    .beginFill("rgba(0,0,0,0.25)")
    .drawRoundRect(-windowWidth / 2 + 8, -windowHeight / 2 + 12, windowWidth - 16, windowHeight - 12, 18);
  shadow.alpha = 0.35;
  shadow.y = 12;
  tileContainer.addChild(shadow);

  var closedShape = new createjs.Shape();
  closedShape.graphics
    .beginLinearGradientFill(["#34495e", "#2c3e50"], [0, 1], 0, -windowHeight / 2, 0, windowHeight / 2)
    .drawRoundRect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight, 16);
  closedShape.name = "closed";
  tileContainer.addChild(closedShape);

  var openShape = new createjs.Shape();
  openShape.graphics
    .beginLinearGradientFill(["#a8dadc", "#48cae4"], [0, 1], 0, -windowHeight / 2, 0, windowHeight / 2)
    .drawRoundRect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight, 16);
  openShape.visible = false;
  openShape.name = "open";
  tileContainer.addChild(openShape);

  var frame = new createjs.Shape();
  frame.graphics
    .setStrokeStyle(6, "round")
    .beginStroke("rgba(255,255,255,0.65)")
    .drawRoundRect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight, 16);
  frame.alpha = 0.7;
  tileContainer.addChild(frame);

  var sparrow = createSparrow();
  sparrow.visible = false;
  sparrow.y = 0;
  sparrow.x = 0;
  tileContainer.addChild(sparrow);
  tileContainer.sparrow = sparrow;

  tileContainer.closedShape = closedShape;
  tileContainer.openShape = openShape;

  tileContainer.addEventListener("click", onWindowTileClick);

  return tileContainer;
}

function createSparrow() {
  var sparrowContainer = new createjs.Container();

  var body = new createjs.Shape();
  body.graphics.beginFill("#8d5524").drawEllipse(-28, -18, 56, 36);
  sparrowContainer.addChild(body);

  var wing = new createjs.Shape();
  wing.graphics.beginFill("#c68642").drawEllipse(-12, -14, 36, 28);
  wing.rotation = -20;
  wing.x = -4;
  wing.y = -2;
  sparrowContainer.addChild(wing);

  var head = new createjs.Shape();
  head.graphics.beginFill("#c68642").drawCircle(18, -6, 18);
  sparrowContainer.addChild(head);

  var eye = new createjs.Shape();
  eye.graphics.beginFill("#000").drawCircle(24, -10, 4);
  sparrowContainer.addChild(eye);

  var beak = new createjs.Shape();
  beak.graphics.beginFill("#f4a259").moveTo(36, -6).lineTo(48, 0).lineTo(36, 6).closePath();
  sparrowContainer.addChild(beak);

  var tail = new createjs.Shape();
  tail.graphics.beginFill("#6f4e37").drawRoundRect(-36, -6, 26, 12, 4);
  tail.rotation = -12;
  tail.x = -22;
  tail.y = 2;
  sparrowContainer.addChild(tail);

  return sparrowContainer;
}

function pickques() {
  pauseTimer();

  clearTimeout(windowRevealTimer);
  windowRevealTimer = null;
  resetWindowStates();

  tx = 0;
  qscnt++;
  cnt++;
  quesCnt++;
  correctAnswer = "";
  uans = "";

  if (typeof refreshHudValues === "function") {
    refreshHudValues();
  } else if (typeof gameQCntTxt !== "undefined" && gameQCntTxt) {
    gameQCntTxt.text = quesCnt + "/" + String(totalQuestions);
  }

  if (question) {
    question.text = "Track the sparrow";
  }

  if (statusText) {
    statusText.color = neutralMessageColor;
    statusText.text = "Watch carefully! All windows open together.";
  }

  sparrowWindowIndex = Math.floor(Math.random() * windowCount);
  revealWindows();
}

function revealWindows() {
  windowInteractionEnabled = false;

  for (var i = 0; i < windowTiles.length; i++) {
    var tile = windowTiles[i];
    if (!tile) continue;

    tile.closedShape.visible = false;
    tile.openShape.visible = true;
    tile.sparrow.visible = i === sparrowWindowIndex;
    tile.cursor = "default";
    tile.mouseEnabled = false;
    createjs.Tween.removeTweens(tile);
    tile.scaleX = tile.scaleY = 1;
    createjs.Tween.get(tile).to({ scaleX: 1.05, scaleY: 1.05 }, 180, createjs.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 180);
  }

  windowRevealTimer = setTimeout(closeWindows, windowOpenDuration);
}

function closeWindows() {
  windowRevealTimer = null;
  rst = 0;

  for (var i = 0; i < windowTiles.length; i++) {
    var tile = windowTiles[i];
    if (!tile) continue;
    tile.sparrow.visible = false;
    tile.openShape.visible = false;
    tile.closedShape.visible = true;
    tile.mouseEnabled = true;
    tile.cursor = "pointer";
  }

  correctAnswer = "Window " + (sparrowWindowIndex + 1);

  if (statusText) {
    statusText.color = neutralMessageColor;
    statusText.text = "Which window hid the sparrow?";
  }

  windowInteractionEnabled = true;
  gameResponseTimerStart();
  restartTimer();
}

function onWindowTileClick(event) {
  if (!windowInteractionEnabled) {
    return;
  }

  windowInteractionEnabled = false;
  clearTimeout(windowRevealTimer);
  windowRevealTimer = null;
  disableAllTiles();

  var tile = event.currentTarget;
  var selectedIndex = tile.windowIndex;
  uans = "Window " + (selectedIndex + 1);

  gameResponseTimerStop();
  pauseTimer();

  highlightSelection(tile, selectedIndex === sparrowWindowIndex);

  if (selectedIndex === sparrowWindowIndex) {
    handleCorrectSelection(tile);
  } else {
    handleIncorrectSelection(tile);
  }
}

function highlightSelection(tile, isCorrect) {
  tile.openShape.visible = true;
  tile.closedShape.visible = false;
  tile.sparrow.visible = isCorrect;
  createjs.Tween.get(tile).to({ scaleX: 1.08, scaleY: 1.08 }, 220, createjs.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 220);
}

function handleCorrectSelection(tile) {
  if (statusText) {
    statusText.color = successMessageColor;
    statusText.text = "👏 Well done! You earned 10 points.";
  }
  getValidation("correct");
}

function handleIncorrectSelection(tile) {
  if (statusText) {
    statusText.color = errorMessageColor;
    statusText.text = "Let's try again.";
  }

  revealSparrowTile();
  getValidation("wrong");
}

function revealSparrowTile() {
  var tile = windowTiles[sparrowWindowIndex];
  if (!tile) {
    return;
  }
  tile.openShape.visible = true;
  tile.closedShape.visible = false;
  tile.sparrow.visible = true;
}

function resetWindowStates() {
  for (var i = 0; i < windowTiles.length; i++) {
    var tile = windowTiles[i];
    if (!tile) continue;
    createjs.Tween.removeTweens(tile);
    tile.scaleX = tile.scaleY = 1;
    tile.openShape.visible = false;
    tile.closedShape.visible = true;
    tile.sparrow.visible = false;
    tile.mouseEnabled = false;
    tile.cursor = "default";
  }
  windowInteractionEnabled = false;
}

function clearWindowTimers() {
  clearTimeout(windowRevealTimer);
  windowRevealTimer = null;
}

function disableAllTiles() {
  for (var i = 0; i < windowTiles.length; i++) {
    var tile = windowTiles[i];
    if (!tile) continue;
    tile.mouseEnabled = false;
    tile.cursor = "default";
  }
}
 
