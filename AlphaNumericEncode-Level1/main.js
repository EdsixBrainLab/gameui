var messageField;
var assets = [];
var cnt = -1,
  qscnt = -1,
  ans = "",
  uans = "",
  interval,
  time = 180,
  totalQuestions = 0,
  answeredQuestions = 0,
  choiceCnt = 4,
  quesCnt = 0,
  resTimerOut = 0,
  rst = 0,
  responseTime = 0;
var startBtn,
  introScrn,
  container,
  questionPromptText,
  questionLetterText,
  questionCard,
  questionDetailsText,
  choiceRoot;
var questionOrder = [];
var currentQuestion = null;
var currentChoiceObjects = [];
var isQuestionLocked = false;
var revealTimeout = null;
var questionIntroTween = null;
var hasShownChoiceAffordance = false;
var stage,
  canvas,
  loaderBar,
  loaderColor,
  loaderWidth,
  bar,
  loadProgressLabel;
var alphaNumericHUDReady = false;

var ALPHA_NUMERIC_QUESTION_BANK = [
  {
    prompt: "What is the matching code for the highlighted letter?",
    letter: "D",
    helper: "Count forward: A=1, B=2, C=3...",
    options: [
      { badge: "A", code: "D = 4", description: "A(1) → B(2) → C(3) → D(4)" },
      { badge: "B", code: "D = 5", description: "Too far – that's the code for E." },
      { badge: "C", code: "D = 3", description: "One step short – this is C." },
      { badge: "D", code: "D = 8", description: "Much higher than D." }
    ],
    correctIndex: 0
  },
  {
    prompt: "Select the code that pairs with the letter shown.",
    letter: "G",
    helper: "Keep adding 1 as you move along the alphabet.",
    options: [
      { badge: "A", code: "G = 5", description: "Five belongs to E." },
      { badge: "B", code: "G = 7", description: "A(1) … G(7)." },
      { badge: "C", code: "G = 8", description: "This would be for H." },
      { badge: "D", code: "G = 9", description: "This jumps ahead to I." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Tap the correct alpha-numeric code for this letter.",
    letter: "A",
    helper: "The alphabet starts counting from one.",
    options: [
      { badge: "A", code: "A = 0", description: "Numbers start from 1 in this game." },
      { badge: "B", code: "A = 1", description: "First letter matches the first number." },
      { badge: "C", code: "A = 2", description: "That would shift everything by one." },
      { badge: "D", code: "A = 26", description: "26 belongs to Z." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Which number code matches the letter?",
    letter: "M",
    helper: "M is halfway through the alphabet.",
    options: [
      { badge: "A", code: "M = 11", description: "That code is for K." },
      { badge: "B", code: "M = 12", description: "That code belongs to L." },
      { badge: "C", code: "M = 13", description: "A to M counts thirteen steps." },
      { badge: "D", code: "M = 15", description: "Too high – that is O." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Find the code that correctly describes the letter shown.",
    letter: "Q",
    helper: "After M=13, keep counting the letters.",
    options: [
      { badge: "A", code: "Q = 17", description: "N=14, O=15, P=16, Q=17." },
      { badge: "B", code: "Q = 19", description: "That would belong to S." },
      { badge: "C", code: "Q = 12", description: "Too low – that's L." },
      { badge: "D", code: "Q = 21", description: "This is the code for U." }
    ],
    correctIndex: 0
  },
  {
    prompt: "Choose the correct alpha-numeric code.",
    letter: "Z",
    helper: "The last letter pairs with the last number in the set.",
    options: [
      { badge: "A", code: "Z = 20", description: "Takes you only to T." },
      { badge: "B", code: "Z = 24", description: "This matches X." },
      { badge: "C", code: "Z = 25", description: "Y holds code 25." },
      { badge: "D", code: "Z = 26", description: "Z completes the count at twenty-six." }
    ],
    correctIndex: 3
  },
  {
    prompt: "Pick the matching code for the letter tile.",
    letter: "H",
    helper: "Continue counting upward until you reach H.",
    options: [
      { badge: "A", code: "H = 6", description: "F sits at six." },
      { badge: "B", code: "H = 7", description: "That's the code for G." },
      { badge: "C", code: "H = 8", description: "A(1)…H(8)." },
      { badge: "D", code: "H = 9", description: "One too many – that's I." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Tap the option that explains this letter's code.",
    letter: "C",
    helper: "A=1, B=2, so what comes next?",
    options: [
      { badge: "A", code: "C = 2", description: "That belongs to B." },
      { badge: "B", code: "C = 3", description: "Counting third in the alphabet." },
      { badge: "C", code: "C = 4", description: "Too far – that's D." },
      { badge: "D", code: "C = 5", description: "Way beyond – that's E." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Match the code to the letter shown in the card.",
    letter: "P",
    helper: "After M (13) and N (14) keep counting.",
    options: [
      { badge: "A", code: "P = 15", description: "This code belongs to O." },
      { badge: "B", code: "P = 16", description: "Yes – M=13, N=14, O=15, P=16." },
      { badge: "C", code: "P = 18", description: "This one fits R." },
      { badge: "D", code: "P = 20", description: "That jumps ahead to T." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Which code completes the pattern for this letter?",
    letter: "J",
    helper: "Think of the alphabet song – count to J.",
    options: [
      { badge: "A", code: "J = 8", description: "H holds eight." },
      { badge: "B", code: "J = 9", description: "That's the code for I." },
      { badge: "C", code: "J = 10", description: "J is the tenth letter." },
      { badge: "D", code: "J = 11", description: "This is the code for K." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Choose the right code for this letter tile.",
    letter: "B",
    helper: "After A=1, the count keeps climbing by one.",
    options: [
      { badge: "A", code: "B = 1", description: "That's the code for A." },
      { badge: "B", code: "B = 2", description: "Second letter, second number." },
      { badge: "C", code: "B = 3", description: "That jumps ahead to C." },
      { badge: "D", code: "B = 4", description: "Too far – that's D." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Which code links to the letter shown?",
    letter: "E",
    helper: "Keep counting forward to reach E.",
    options: [
      { badge: "A", code: "E = 4", description: "That belongs to D." },
      { badge: "B", code: "E = 5", description: "A(1)…E(5)." },
      { badge: "C", code: "E = 6", description: "This would match F." },
      { badge: "D", code: "E = 7", description: "Too high – that's G." }
    ],
    correctIndex: 1
  },
  {
    prompt: "Select the matching alpha-numeric pair.",
    letter: "F",
    helper: "Say the alphabet until you land on F.",
    options: [
      { badge: "A", code: "F = 4", description: "D owns four." },
      { badge: "B", code: "F = 5", description: "E matches five." },
      { badge: "C", code: "F = 6", description: "Six steps lead to F." },
      { badge: "D", code: "F = 7", description: "This is the value for G." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Tap the code that fits the letter spotlighted.",
    letter: "I",
    helper: "G=7, H=8 … what comes next?",
    options: [
      { badge: "A", code: "I = 7", description: "That's still G." },
      { badge: "B", code: "I = 8", description: "This one belongs to H." },
      { badge: "C", code: "I = 9", description: "Nine steps reach I." },
      { badge: "D", code: "I = 10", description: "That's for J." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Which code completes the clue for this letter?",
    letter: "L",
    helper: "After J=10 and K=11, keep counting.",
    options: [
      { badge: "A", code: "L = 10", description: "Too low – that's J." },
      { badge: "B", code: "L = 11", description: "This is the code for K." },
      { badge: "C", code: "L = 12", description: "L lands on twelve." },
      { badge: "D", code: "L = 13", description: "Thirteen reaches M." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Match the number code to the letter card.",
    letter: "N",
    helper: "M=13, so add one more for N.",
    options: [
      { badge: "A", code: "N = 12", description: "That's the value for L." },
      { badge: "B", code: "N = 13", description: "This is the code for M." },
      { badge: "C", code: "N = 14", description: "N comes in fourteenth." },
      { badge: "D", code: "N = 15", description: "That would be O." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Which option keeps the alphabet-to-number rule?",
    letter: "R",
    helper: "After Q=17, continue stepping forward.",
    options: [
      { badge: "A", code: "R = 16", description: "That's still P." },
      { badge: "B", code: "R = 17", description: "This one belongs to Q." },
      { badge: "C", code: "R = 18", description: "R sits at eighteen." },
      { badge: "D", code: "R = 20", description: "This would be T." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Tap the code that lines up with this letter.",
    letter: "S",
    helper: "R=18, so the next number is the answer.",
    options: [
      { badge: "A", code: "S = 17", description: "That's Q's value." },
      { badge: "B", code: "S = 18", description: "R sits at eighteen." },
      { badge: "C", code: "S = 19", description: "S arrives at nineteen." },
      { badge: "D", code: "S = 20", description: "This is for T." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Pick the matching code for the featured letter.",
    letter: "T",
    helper: "S=19 means the next number belongs to T.",
    options: [
      { badge: "A", code: "T = 18", description: "Too low – that's R." },
      { badge: "B", code: "T = 19", description: "That is S." },
      { badge: "C", code: "T = 20", description: "Twenty pairs with T." },
      { badge: "D", code: "T = 21", description: "This is for U." }
    ],
    correctIndex: 2
  },
  {
    prompt: "Complete the pairing for this letter tile.",
    letter: "U",
    helper: "T=20, so add one more to reach U.",
    options: [
      { badge: "A", code: "U = 19", description: "That's still S." },
      { badge: "B", code: "U = 20", description: "This belongs to T." },
      { badge: "C", code: "U = 21", description: "U holds twenty-one." },
      { badge: "D", code: "U = 22", description: "This jumps to V." }
    ],
    correctIndex: 2
  }
];

totalQuestions = ALPHA_NUMERIC_QUESTION_BANK.length;

var ALPHA_NUMERIC_CHOICE_STATES = {
  idle: {
    base: ["rgba(108,92,241,0.96)", "rgba(67,50,181,0.96)"],
    badge: ["#ffffff", "#efe8ff"],
    label: "rgba(255,255,255,0.78)",
    text: "#ffffff",
    badgeLabel: "#45319f",
    halo: 0.6,
    ring: "rgba(255,255,255,0.38)",
    ringAlpha: 0.55
  },
  hover: {
    base: ["rgba(134,114,255,0.98)", "rgba(86,66,214,0.98)"],
    badge: ["#ffffff", "#f5f1ff"],
    label: "rgba(255,255,255,0.92)",
    text: "#ffffff",
    badgeLabel: "#45319f",
    halo: 0.82,
    ring: "rgba(255,255,255,0.72)",
    ringAlpha: 0.92
  },
  press: {
    base: ["rgba(94,74,222,1)", "rgba(57,38,166,1)"],
    badge: ["#ffffff", "#e2d8ff"],
    label: "rgba(255,255,255,0.95)",
    text: "#ffffff",
    badgeLabel: "#45319f",
    halo: 0.9,
    ring: "rgba(255,255,255,0.86)",
    ringAlpha: 1
  },
  correct: {
    base: ["#3bd7b2", "#2a9d7a"],
    badge: ["#ffffff", "#ddfff4"],
    label: "rgba(255,255,255,0.95)",
    text: "#134c3e",
    badgeLabel: "#15503e",
    halo: 0.96,
    ring: "rgba(71,225,189,0.9)",
    ringAlpha: 1
  },
  wrong: {
    base: ["#ff809d", "#d44e75"],
    badge: ["#ffffff", "#ffe2eb"],
    label: "rgba(255,255,255,0.95)",
    text: "#511426",
    badgeLabel: "#4f1a2f",
    halo: 0.74,
    ring: "rgba(255,175,195,0.85)",
    ringAlpha: 0.95
  },
  disabled: {
    base: ["rgba(88,72,198,0.55)", "rgba(48,34,138,0.6)"],
    badge: ["#f1ecff", "#d6ccff"],
    label: "rgba(255,255,255,0.6)",
    text: "rgba(255,255,255,0.7)",
    badgeLabel: "#3b3188",
    halo: 0.38,
    ring: "rgba(255,255,255,0.22)",
    ringAlpha: 0.35
  }
};

var optionLabels = ["Option A", "Option B", "Option C", "Option D", "Option E", "Option F"];

window.onload = function () {
  checkBrowserSupport();
};

function init() {
  canvas = document.getElementById("gameCanvas");
  stage = new createjs.Stage(canvas);
  container = new createjs.Container();
  stage.addChild(container);
  call_UI_ambientOverlay(container);
  createjs.Ticker.addEventListener("tick", stage);

  loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
  loaderBar = new createjs.Container();
  bar = new createjs.Shape();
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, 20).endFill();
  loaderWidth = 300;

  callLoader();
  createLoader();
  createCanvasResize();

  stage.update();
  stage.enableMouseOver(40);

  assetsPath = "assets/";
  gameAssetsPath = "AlphaNumericEncode-Level1/";
  soundpath = "FA/";

  var success = createManifest();
  if (success === 1) {
    preloadAllAssets();
    stage.update();
  }
}

function doneLoading1(event) {
  loaderBar.visible = false;

  var item = event && event.item ? event.item : null;
  if (!item && typeof i !== "undefined" && assets && assets[i]) {
    item = assets[i].item;
  }

  if (item && item.id === "Title") {
    Title = new createjs.Bitmap(preload.getResult("Title"));
    Title.visible = false;
    container.parent.addChild(Title);
  }

  if (!alphaNumericHUDReady) {
    call_UI_gameQuestion(
      container,
      "Select the number code that matches the highlighted letter."
    );
    alphaNumericHUDReady = true;
  }

  stage.update();
}

function tick() {
  stage.update();
}

function handleClick() {
  questionOrder = buildQuestionOrder(totalQuestions);
  cnt = -1;
  qscnt = -1;
  quesCnt = 0;
  answeredQuestions = 0;
  hasShownChoiceAffordance = false;
  CreateGameStart();
  if (gameType === 0) {
    CreateGameElements();
    getStartQuestion();
  } else {
    getdomainpath();
  }
}

function buildQuestionOrder(count) {
  var order = [];
  for (var i = 0; i < count; i++) {
    order.push(i);
  }
  order.sort(function () {
    return Math.random() - 0.5;
  });
  return order;
}

function CreateGameElements() {
  interval = setInterval(countTime, 1000);

  container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;

  if (!choiceRoot) {
    choiceRoot = new createjs.Container();
    choiceRoot.name = "alphaNumericChoiceRoot";
  }

  buildQuestionCard();
  container.parent.addChild(choiceRoot);
  buildChoiceCards();
  stage.update();
}

function buildQuestionCard() {
  if (questionCard && questionCard.parent) {
    questionCard.parent.removeChild(questionCard);
  }

  questionCard = new createjs.Container();
  questionCard.name = "alphaNumericQuestionCard";
  questionCard.x = 640;
  questionCard.y = 260;

  var glow = new createjs.Shape();
  glow.graphics
    .beginRadialGradientFill([
      "rgba(121,108,255,0.45)",
      "rgba(121,108,255,0)"
    ], [0, 1], 0, 0, 0, 0, 0, 400)
    .drawCircle(0, 0, 400);
  glow.alpha = 0.45;

  var background = new createjs.Shape();
  background.graphics
    .beginLinearGradientFill([
      "rgba(255,255,255,0.96)",
      "rgba(236,240,255,0.92)"
    ], [0, 1], 0, -100, 0, 100)
    .drawRoundRect(-360, -120, 720, 240, 48);

  questionPromptText = new createjs.Text("", "700 32px Quicksand", "#2b2961");
  questionPromptText.textAlign = "center";
  questionPromptText.lineWidth = 620;
  questionPromptText.y = -36;

  questionDetailsText = new createjs.Text("", "500 22px Quicksand", "#554ca3");
  questionDetailsText.textAlign = "center";
  questionDetailsText.lineWidth = 620;
  questionDetailsText.y = 28;

  questionLetterText = new createjs.Text("", "700 64px Quicksand", "#4f36c2");
  questionLetterText.textAlign = "center";
  questionLetterText.y = 86;

  questionCard.addChild(glow, background, questionPromptText, questionDetailsText, questionLetterText);
  container.parent.addChild(questionCard);
}

function buildChoiceCards() {
  if (currentChoiceObjects.length) {
    for (var i = 0; i < currentChoiceObjects.length; i++) {
      var prev = currentChoiceObjects[i];
      if (prev && prev.container) {
        prev.container.removeAllEventListeners();
        if (prev.container.parent) {
          prev.container.parent.removeChild(prev.container);
        }
      }
    }
  }
  currentChoiceObjects = [];

  choiceRoot.removeAllChildren();

  for (var idx = 0; idx < choiceCnt; idx++) {
    var choiceObj = createChoiceCard(idx);
    currentChoiceObjects.push(choiceObj);
    choiceRoot.addChild(choiceObj.container);
  }
}

function createChoiceCard(index) {
  var container = new createjs.Container();
  container.name = "alphaNumericChoice" + index;
  container.cursor = "pointer";
  container.mouseChildren = false;
  container.alpha = 0;
  container.visible = false;

  var focusPulse = new createjs.Shape();
  focusPulse.graphics
    .beginFill("rgba(255,255,255,0.16)")
    .drawRoundRect(-254, -92, 508, 184, 48);
  focusPulse.alpha = 0;
  focusPulse.visible = false;

  var background = new createjs.Shape();
  background.graphics
    .beginLinearGradientFill(ALPHA_NUMERIC_CHOICE_STATES.idle.base, [0, 1], -220, -72, 220, 72)
    .drawRoundRect(-240, -78, 480, 156, 36);

  var badgeHalo = new createjs.Shape();
  badgeHalo.graphics
    .beginRadialGradientFill([
      "rgba(255,255,255,0.32)",
      "rgba(255,255,255,0)"
    ], [0, 1], 0, 0, 0, 0, 0, 70)
    .drawCircle(0, 0, 70);
  badgeHalo.x = -172;
  badgeHalo.alpha = 0.6;

  var badge = new createjs.Shape();
  badge.graphics
    .beginLinearGradientFill(ALPHA_NUMERIC_CHOICE_STATES.idle.badge, [0, 1], 0, -38, 0, 38)
    .drawCircle(0, 0, 38);
  badge.x = -172;

  var badgeLabel = new createjs.Text("", "700 28px Quicksand", "#45319f");
  badgeLabel.textAlign = "center";
  badgeLabel.textBaseline = "middle";
  badgeLabel.x = -172;

  var optionLabel = new createjs.Text(optionLabels[index] || "Option", "600 22px Quicksand", "rgba(255,255,255,0.78)");
  optionLabel.x = -104;
  optionLabel.y = -50;

  var codeText = new createjs.Text("", "700 34px Quicksand", "#ffffff");
  codeText.x = -104;
  codeText.y = -8;

  var descriptionText = new createjs.Text("", "500 22px Quicksand", "rgba(255,255,255,0.75)");
  descriptionText.x = -104;
  descriptionText.y = 34;
  descriptionText.lineWidth = 350;

  var focusRing = new createjs.Shape();
  focusRing.alpha = 0.55;
  focusRing.graphics
    .setStrokeStyle(6, "round", "round")
    .beginStroke("rgba(255,255,255,0.38)")
    .drawRoundRect(-248, -86, 496, 172, 44);

  container.addChild(
    focusPulse,
    background,
    badgeHalo,
    badge,
    badgeLabel,
    optionLabel,
    codeText,
    descriptionText,
    focusRing
  );

  container.background = background;
  container.badge = badge;
  container.badgeHalo = badgeHalo;
  container.badgeLabel = badgeLabel;
  container.optionLabel = optionLabel;
  container.codeText = codeText;
  container.descriptionText = descriptionText;
  container.focusRing = focusRing;
  container.focusPulse = focusPulse;
  container.choiceIndex = index;
  container.__state = "idle";
  container.__targetScale = 1;
  container.__targetX = 0;
  container.__targetY = 0;

  var hitArea = new createjs.Shape();
  hitArea.graphics.beginFill("#000").drawRoundRect(-260, -96, 520, 192, 48);
  container.hitArea = hitArea;

  container.on("mouseover", function (evt) {
    var card = evt.currentTarget;
    if (!isQuestionLocked) {
      applyChoiceState(card, "hover");
    }
  });

  container.on("mouseout", function (evt) {
    var card = evt.currentTarget;
    if (!isQuestionLocked) {
      applyChoiceState(card, "idle");
    }
  });

  container.on("mousedown", function (evt) {
    var card = evt.currentTarget;
    if (!isQuestionLocked) {
      applyChoiceState(card, "press");
    }
  });

  container.on("pressup", function (evt) {
    var card = evt.currentTarget;
    if (!isQuestionLocked) {
      applyChoiceState(card, "hover");
    }
  });

  container.on("click", function (evt) {
    answerSelected(evt.currentTarget);
  });

  return {
    container: container
  };
}

function applyChoiceState(card, state) {
  if (!card) {
    return;
  }
  var palette = ALPHA_NUMERIC_CHOICE_STATES[state] || ALPHA_NUMERIC_CHOICE_STATES.idle;
  card.__state = state;
  card.background.graphics
    .clear()
    .beginLinearGradientFill(palette.base, [0, 1], -220, -72, 220, 72)
    .drawRoundRect(-240, -78, 480, 156, 36);
  card.badge.graphics
    .clear()
    .beginLinearGradientFill(palette.badge, [0, 1], 0, -38, 0, 38)
    .drawCircle(0, 0, 38);
  card.badgeLabel.color = palette.badgeLabel || (state === "correct" ? "#15503e" : state === "wrong" ? "#4f1a2f" : "#45319f");
  card.optionLabel.color = palette.label;
  card.codeText.color = palette.text;
  card.descriptionText.color = palette.label;
  card.badgeHalo.alpha = palette.halo != null ? palette.halo : 0.6;
  if (card.focusRing) {
    card.focusRing.graphics
      .clear()
      .setStrokeStyle(6, "round", "round")
      .beginStroke(palette.ring || "rgba(255,255,255,0.38)")
      .drawRoundRect(-248, -86, 496, 172, 44);
    card.focusRing.alpha = palette.ringAlpha != null ? palette.ringAlpha : 0.55;
  }
  if (card.focusPulse && !card.__affordanceActive) {
    createjs.Tween.removeTweens(card.focusPulse);
    card.focusPulse.visible = false;
    card.focusPulse.alpha = 0;
  }
}

function resetChoiceAffordance(card) {
  if (!card) {
    return;
  }
  card.__affordanceActive = false;
  if (card.focusPulse) {
    createjs.Tween.removeTweens(card.focusPulse);
    card.focusPulse.visible = false;
    card.focusPulse.alpha = 0;
    var targetScale = card.__targetScale != null ? card.__targetScale : 1;
    card.focusPulse.scaleX = targetScale;
    card.focusPulse.scaleY = targetScale;
  }
}

function triggerChoiceAffordance(card) {
  if (!card || !card.focusPulse) {
    return;
  }
  resetChoiceAffordance(card);
  card.__affordanceActive = true;
  card.focusPulse.visible = true;
  var targetScale = card.__targetScale != null ? card.__targetScale : 1;
  card.focusPulse.scaleX = targetScale;
  card.focusPulse.scaleY = targetScale;
  createjs.Tween.get(card.focusPulse, { loop: 2, override: true })
    .to({ alpha: 0.85, scaleX: targetScale * 1.08, scaleY: targetScale * 1.08 }, 260, createjs.Ease.quadOut)
    .to({ alpha: 0, scaleX: targetScale * 1.18, scaleY: targetScale * 1.18 }, 260, createjs.Ease.quadIn)
    .call(function () {
      card.focusPulse.visible = false;
      card.focusPulse.alpha = 0;
      card.__affordanceActive = false;
    });
  if (card.focusRing) {
    createjs.Tween.get(card.focusRing, { override: true })
      .to({ alpha: 1 }, 200, createjs.Ease.quadOut)
      .to({ alpha: ALPHA_NUMERIC_CHOICE_STATES.idle.ringAlpha }, 340, createjs.Ease.quadIn);
  }
}

function layoutChoiceCards(count) {
  var total = parseInt(count, 10);
  if (!total || total <= 0) {
    return;
  }

  var centerX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;
  var rows = total <= 3 ? 1 : 2;
  var perRow = Math.ceil(total / rows);
  var rowSpacing = 182;
  var baseY = 472;
  var offsetY = ((rows - 1) * rowSpacing) / 2;
  var choiceIdx = 0;

  for (var r = 0; r < rows; r++) {
    if (choiceIdx >= total) {
      break;
    }

    var remaining = total - choiceIdx;
    var rowCount = Math.min(perRow, remaining);
    var layout =
      typeof SAUI_computeCenteredRow === "function"
        ? SAUI_computeCenteredRow(rowCount, {
            centerX: centerX,
            baseSpacing: 360,
            tileSpan: 480,
            maxSpan: 980,
            minScale: 0.88,
            baseScale: 1
          })
        : null;

    for (var c = 0; c < rowCount; c++) {
      var wrapper = currentChoiceObjects[choiceIdx];
      var card = wrapper ? wrapper.container : null;
      if (card) {
        var targetX;
        if (layout && layout.positions && layout.positions.length) {
          targetX = layout.positions[c];
        } else {
          var rowWidth = (rowCount - 1) * 360;
          targetX = centerX - rowWidth / 2 + c * 360;
        }
        var targetY = baseY + r * rowSpacing - offsetY;
        var scale = layout && typeof layout.scale === "number" ? layout.scale : 1;
        card.__targetX = targetX;
        card.__targetY = targetY;
        card.__targetScale = scale;
      }
      choiceIdx++;
    }
  }
}

function pickques() {
  pauseTimer();
  clearRevealTimeout();
  qscnt++;
  cnt++;
  quesCnt++;

  if (qscnt >= totalQuestions) {
    qscnt = totalQuestions - 1;
    return;
  }

  var nextIndex = questionOrder[qscnt];
  currentQuestion = ALPHA_NUMERIC_QUESTION_BANK[nextIndex];
  ans = String(currentQuestion.correctIndex);
  rst = 0;

  showQuestion(currentQuestion);
  enablechoices();
  gameResponseTimerStart();
  restartTimer();
  stage.update();
}

function showQuestion(question) {
  if (!question) {
    return;
  }

  QusTxtString.visible = true;
  QusTxtString.alpha = 0;
  QusTxtString.text = question.prompt;
  createjs.Tween.get(QusTxtString, { override: true }).to({ alpha: 1 }, 320);

  questionPromptText.text = question.prompt;
  questionDetailsText.text = question.helper || "";
  questionLetterText.text = question.letter || "";

  var options = question.options || [];
  choiceCnt = Math.min(options.length, currentChoiceObjects.length);
  layoutChoiceCards(choiceCnt);

  for (var i = 0; i < currentChoiceObjects.length; i++) {
    var wrapper = currentChoiceObjects[i];
    var card = wrapper ? wrapper.container : null;
    if (!card) {
      continue;
    }
    if (i < options.length) {
      var option = options[i];
      card.optionLabel.text = optionLabels[i] || ("Option " + String.fromCharCode(65 + i));
      card.codeText.text = option.code || "";
      card.descriptionText.text = option.description || "";
      card.badgeLabel.text = option.badge || String.fromCharCode(65 + i);
      card.visible = true;
      card.x = typeof card.__targetX === "number" ? card.__targetX : card.x;
      card.y = typeof card.__targetY === "number" ? card.__targetY : card.y;
      var targetScale = card.__targetScale != null ? card.__targetScale : 1;
      card.alpha = 0;
      card.scaleX = card.scaleY = targetScale * 0.94;
      card.mouseEnabled = true;
      resetChoiceAffordance(card);
      applyChoiceState(card, "idle");
      createjs.Tween.get(card, { override: true })
        .wait(120 + i * 80)
        .to({ alpha: 1, scaleX: targetScale, scaleY: targetScale }, 320, createjs.Ease.quadOut);
    } else {
      card.visible = false;
      card.alpha = 0;
      card.mouseEnabled = false;
    }
  }

  isQuestionLocked = false;

  if (!hasShownChoiceAffordance && quesCnt === 1) {
    var affordanceCard = null;
    for (var j = 0; j < currentChoiceObjects.length; j++) {
      var maybeCard = currentChoiceObjects[j] && currentChoiceObjects[j].container;
      if (maybeCard && maybeCard.visible) {
        affordanceCard = maybeCard;
        break;
      }
    }
    if (affordanceCard) {
      triggerChoiceAffordance(affordanceCard);
      hasShownChoiceAffordance = true;
    }
  }
}

function answerSelected(card) {
  if (!card || isQuestionLocked) {
    return;
  }

  isQuestionLocked = true;
  uans = String(card.choiceIndex);
  gameResponseTimerStop();

  resetChoiceAffordance(card);
  var isCorrect = uans === ans;
  if (isCorrect) {
    applyChoiceState(card, "correct");
    disableOtherChoices(card.choiceIndex);
    correct();
  } else {
    applyChoiceState(card, "wrong");
    disablechoices();
    highlightCorrectChoice();
    getValidation("wrong");
  }

  stage.update();
}

function correct() {
  disablechoices();
  highlightCorrectChoice();
  getValidation("correct");
}

function highlightCorrectChoice() {
  var correctIdx = parseInt(ans, 10);
  if (isNaN(correctIdx)) {
    return;
  }
  var correctCard = currentChoiceObjects[correctIdx];
  if (correctCard && correctCard.container) {
    applyChoiceState(correctCard.container, "correct");
  }
}

function disableOtherChoices(activeIndex) {
  for (var i = 0; i < currentChoiceObjects.length; i++) {
    var card = currentChoiceObjects[i] && currentChoiceObjects[i].container;
    if (!card) {
      continue;
    }
    if (i === activeIndex) {
      continue;
    }
    resetChoiceAffordance(card);
    applyChoiceState(card, "disabled");
    card.mouseEnabled = false;
  }
}

function disablechoices() {
  for (var i = 0; i < currentChoiceObjects.length; i++) {
    var card = currentChoiceObjects[i] && currentChoiceObjects[i].container;
    if (card) {
      card.mouseEnabled = false;
      resetChoiceAffordance(card);
      if (card.__state !== "correct" && card.__state !== "wrong") {
        applyChoiceState(card, "disabled");
      }
    }
  }
}

function enablechoices() {
  for (var i = 0; i < currentChoiceObjects.length; i++) {
    var card = currentChoiceObjects[i] && currentChoiceObjects[i].container;
    if (card) {
      card.mouseEnabled = true;
      resetChoiceAffordance(card);
      applyChoiceState(card, "idle");
    }
  }
  isQuestionLocked = false;
}

function helpDisable() {
  disablechoices();
}

function helpEnable() {
  enablechoices();
}

function clearRevealTimeout() {
  if (revealTimeout) {
    clearTimeout(revealTimeout);
    revealTimeout = null;
  }
}

function removeGameElements() {
  clearRevealTimeout();
  if (questionIntroTween) {
    questionIntroTween.setPaused(true);
    questionIntroTween = null;
  }
  if (questionCard && questionCard.parent) {
    questionCard.parent.removeChild(questionCard);
  }
  if (choiceRoot) {
    choiceRoot.removeAllChildren();
  }
  if (currentChoiceObjects && currentChoiceObjects.length) {
    for (var i = 0; i < currentChoiceObjects.length; i++) {
      var card = currentChoiceObjects[i] && currentChoiceObjects[i].container;
      if (card) {
        resetChoiceAffordance(card);
      }
    }
  }
  currentChoiceObjects = [];
}
