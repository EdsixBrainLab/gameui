
///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, chHolder, circleOutline, circle1Outline, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var isBgSound = true;
var isEffSound = true;
var currentX, currentY
var currentObj = []
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var px = [100, 320, 540, 760, 980]
var py = [295, 295, 295, 295, 490, 490]
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var currentX, currentY
var currentObj = []
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno1 = [];
var qno2 = [];
var chpos = [];
var choiceArr = []
var posArr = []
var choiceMcArr = []
var clk
var ansArr = [0, 1, 2, 3, 4]
var correctCnt
var introImg, introImg1, introImg2, introImg3
//register key functions
 var QusTxtString;
var 
  ambientGradientLayer,
  ambientOrbs = [];
  ///////////////////////////////////////////////////////////////////
 
///////////////////////////////////////////////////////////////////
window.onload = function (e) {
    checkBrowserSupport();
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
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
  createAmbientBackground();

    stage.update();
    stage.enableMouseOver(40);
    ///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

    /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

    assetsPath = "assets/";
    gameAssetsPath = "IAmCube-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "choice2", src: gameAssetsPath + "ChoiceImages2.png" },
            { id: "choice3", src: gameAssetsPath + "ChoiceImages3.png" },
            { id: "choice4", src: gameAssetsPath + "ChoiceImages4.png" },
            { id: "choice5", src: gameAssetsPath + "ChoiceImages5.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "question1", src: gameAssetsPath + "question1.png" },
            // { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "questionText", src: questionTextPath + "IAmCube-Level1-QT.png" },
            { id: "introImg", src: gameAssetsPath + "introImg.png" },
            { id: "introImg1", src: gameAssetsPath + "introImg1.png" },
            { id: "introImg2", src: gameAssetsPath + "introImg2.png" },
            { id: "introImg3", src: gameAssetsPath + "introImg3.png" }
        )
        preloadAllAssets()
        stage.update();
    }

}


//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
Title.x=650;
    loaderBar.visible = false;
    stage.update();
    var event = assets[i];
    var id = event.item.id;
    // if (id == "chHolder") {
    //     chHolder = new createjs.Bitmap(preload.getResult('chHolder'));
    //     container.parent.addChild(chHolder);
    //     chHolder.visible = false;


    // }
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
  
  
    if (id == "questionText") {
        questionText = new createjs.Bitmap(preload.getResult('questionText'));
        container.parent.addChild(questionText);
        questionText.visible = false;


    }
    if (id == "introImg") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("introImg")],
            "frames": { "regX": 50, "height": 347, "count": 0, "regY": 50, "width": 457 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        introImg = new createjs.Sprite(spriteSheet1);
        introImg.visible = false;
        container.parent.addChild(introImg);

    };
    if (id == "introImg1") {
        introImg1 = new createjs.Bitmap(preload.getResult('introImg1'));
        container.parent.addChild(introImg1);
        introImg1.visible = false;


    }
    if (id == "introImg2") {
        introImg2 = new createjs.Bitmap(preload.getResult('introImg2'));
        container.parent.addChild(introImg2);
        introImg2.visible = false;


    }
    if (id == "introImg3") {
        introImg3 = new createjs.Bitmap(preload.getResult('introImg3'));
        container.parent.addChild(introImg3);
        introImg3.visible = false;


    }
    if (id == "choice1" || id == "choice2" || id == "choice3" || id == "choice4" || id == "choice5") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 138, "count": 0, "regY": 50, "width": 138 },
        });
        choice1 = new createjs.Sprite(spriteSheet2);
        choice1.visible = false;
        container.parent.addChild(choice1);
        choice1.x = 400; choice1.y = 400;

        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 138, "count": 0, "regY": 50, "width": 138 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice2 = new createjs.Sprite(spriteSheet3);
        choice2.visible = false;
        container.parent.addChild(choice2);
        choice2.x = 700; choice2.y = 400;

        var spriteSheet4 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice3")],
            "frames": { "regX": 50, "height": 138, "count": 0, "regY": 50, "width": 138 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice3 = new createjs.Sprite(spriteSheet4);
        choice3.visible = false;
        container.parent.addChild(choice3);
        choice3.x = 750; choice3.y = 470;

        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice4")],
            "frames": { "regX": 50, "height": 138, "count": 0, "regY": 50, "width": 138 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice4 = new createjs.Sprite(spriteSheet5);
        choice4.visible = false;
        container.parent.addChild(choice4);
        choice4.x = 600; choice4.y = 470;

        var spriteSheet6 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice5")],
            "frames": { "regX": 50, "height": 138, "count": 0, "regY": 50, "width": 138 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice5 = new createjs.Sprite(spriteSheet6);
        choice5.visible = false;
        container.parent.addChild(choice5);
        choice5.x = 700; choice5.y = 470;

    };


    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 99, "count": 0, "regY": 50, "width": 100 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);

    };
    //
    if (id == "question1") {
        var spriteSheet7 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question1")],
            "frames": { "regX": 50, "height": 208, "count": 0, "regY": 50, "width": 335 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question1 = new createjs.Sprite(spriteSheet7);
        question1.visible = false;
        container.parent.addChild(question1);

    };



}

function tick(e) {
    stage.update();
}

/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
    qno = between(0, 49);
    cno = qno;
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
    container.parent.addChild(questionText);
    questionText.visible = false;
    // questionText.x = 50; questionText.y = 110;
    // container.parent.addChild(chHolder);
    // chHolder.visible = false;

    container.parent.addChild(question);
    question.visible = false;
    if (lang == "ArabicQuestionText/") {
        question.x = 850; question.y = 130;
        question.scaleX = question.scaleY = .7
    }
    else {
        question.x = 860; question.y = 120;
        question.scaleX = question.scaleY = 1
    }
    container.parent.addChild(question1);
    question1.visible = false;
    question1.x = 450;
    question1.y = 320;
    question1.scaleX = question1.scaleY = 1.5;
ensureQuestionCard();
    container.parent.addChild(choice1, choice2, choice3, choice4, choice5)
    choice1.visible = choice2.visible = false;
    choice3.visible = choice4.visible = choice5.visible = false;
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].x = 90 + (i * 180)
        this["choice" + i].y = 595
        this["choice" + i].scaleX = this["choice" + i].scaleY = 1.1
    }


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/
}

function helpDisable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = true;
    }
}

//=================================================================================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = [];
    currentObj = []
    panelVisibleFn()
    question.gotoAndStop(qno[cnt]);
    question1.gotoAndStop(qno[cnt]);

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].gotoAndStop(qno[cnt]);
        this["choice" + i].name = "ch" + i;
        chpos.push({ posx: this["choice" + i].x, posy: this["choice" + i].y })
    }
    ans = "ch1";
    chpos.sort(randomSort)

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].x = chpos[i - 1].posx
        this["choice" + i].y = chpos[i - 1].posy
    }
    createTween();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}


function createTween() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 500)
    // chHolder.visible = true;

    question1.visible = true;
    question1.x = -400;
    createjs.Tween.get(question1).wait(300).to({ x: 1200, scaleX: 1, scaleY: 1 }, 300)
        .to({ x: 510, scaleX: 1.1, scaleY: 1.1 }, createjs.Ease.bounceInOut)

    question.visible = true;
    // chHolder.visible = true;

    temp1 = 500

    for (i = 1; i <= choiceCnt; i++) {

        this["choice" + i].alpha = 0
        this["choice" + i].visible = true;
        createjs.Tween.get(this["choice" + i]).wait(temp1)
            .to({ alpha: 1, x: this["choice" + i].x, y: 600 }, 1500, createjs.Ease.bounceOut)
        temp1 = temp1 + 200;
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 2200)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].addEventListener("click", answerSelected);
        this["choice" + i].mouseEnabled = true
        this["choice" + i].visible = true;
        this["choice" + i].alpha = 1;
        this["choice" + i].cursor = "pointer";
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}


function enablechoices() {

}

function disablechoices() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].removeEventListener("click", answerSelected);

        this["choice" + i].visible = false;
        this["choice" + i].alpha = .5;
    }

}

function onRoll_over(e) {
    e.currentTarget.alpha = .5;
    stage.update();
}

function onRoll_out(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {
        currentX = e.currentTarget.x - 30
        currentY = e.currentTarget.y - 30
        e.currentTarget.visible = true;
        disableMouse()
        correct()


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
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false
    }
}

function enableMouse() {

}

//===========================================================================================//


