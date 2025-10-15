
///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, chHolder, circleOutline, circle1Outline, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var ambientLayer,
  overlayLayer,
  questionSubtitle,
  questionCardContainer,
  questionCardBackground,
  questionCardHighlight,
  questionCardShadow;
  
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
 
  ///////////////////////////////////////////////////////////////////
 
///////////////////////////////////////////////////////////////////
window.onload = function (e) {
    checkBrowserSupport();
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
 


function init() {

    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);

    container = new createjs.Container();
    stage.addChild(container)
 call_UI_ambientOverlay(container);
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
 
    loaderBar.visible = false;
    stage.update();
    var event = assets[i];
    var id = event.item.id;
    // if (id == "chHolder") {
    //     chHolder = new createjs.Bitmap(preload.getResult('chHolder'));
    //     container.parent.addChild(chHolder);
    //     chHolder.visible = false;


    // }
	
	
	
	
 
  
  
     
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

call_UI_gameQuestion(container,"What lies opposite           when this sheet is folded into a cube?");

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


 


function CreateGameElements() {

    interval = setInterval(countTime, 1000);
     
    QusTxtString.visible = false;
    // questionText.x = 50; questionText.y = 110;
    // container.parent.addChild(chHolder);
    // chHolder.visible = false;

    container.parent.addChild(question);
    question.visible = false;
    if (lang == "ArabicQuestionText/") {
        question.x = 512; question.y = 130;
        question.scaleX = question.scaleY = .55
    }
    else {
        question.x = 512; question.y = 130;
        question.scaleX = question.scaleY = .55
    }
    container.parent.addChild(question1);
    question1.visible = false;
    question1.x = 450;
    question1.y = 320;
    question1.scaleX = question1.scaleY = 1.5;
 
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
    QusTxtString.visible = true;
    QusTxtString.alpha = 0;
    createjs.Tween.get(QusTxtString).wait(100).to({ alpha: 1 }, 500)
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


