///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 7, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,  quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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

var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var qbg2;
var currentX, currentY
var choiceBg, circle1Outline, question, questionText, question1
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno1 = []
var chpos = []
var choice1Arr = []
var choiceChange = [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6]
var choice2Arr = []
var btnX = [140, 520, 900, 313, 727, 313, 727]
var btnY = [260, 260, 260, 440, 440, 623, 623]
var btnX1 = [220, 500, 760, 1020, 360, 630, 890]
var btnY1 = [470, 470, 470, 470, 630, 630, 630]
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
var introImg
///////////////////////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
    checkBrowserSupport();
}
///////////////////////////////////////////////////////////////////
function init() {

    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    container = new createjs.Container();
    stage.addChild(container)
    createjs.Ticker.addEventListener("tick", stage);
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
    gameAssetsPath = "AlphaNumericEncode-Level6/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "questionText", src:questionTextPath + "AlphaNumericEncode-Level6-QT.png" },
            { id: "choiceBg", src: gameAssetsPath + "choiceBg1.png" },
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "choice2", src: gameAssetsPath + "ChoiceImages2.png" },
			{ id: "introImg", src: gameAssetsPath + "introImg.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;

    if (id == "introImg") {

		introImg = new createjs.Bitmap(preload.getResult('introImg'));
		container.parent.addChild(introImg);
		introImg.visible = false;
	}
    if (id == "questionText") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 81, "count": 64, "regY": 50, "width": 671 }
        });

        questionText = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(questionText);
        questionText.visible = false;
    }

    if (id == "choiceBg") {
        choiceBg = new createjs.Bitmap(preload.getResult('choiceBg'));
        container.parent.addChild(choiceBg);
        choiceBg.visible = false;
    }




    if (id == "choice1") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 143, "count": 64, "regY": 50, "width": 143 }
        });

        choice1 = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(choice1);
        choice1.visible = false;
    }

    if (id == "choice2") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 143, "count": 64, "regY": 50, "width": 143 }
        });

        choice2 = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(choice2);
        choice2.visible = false;
    }

}

function tick(e) {

    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    
   
    qtype.sort(randomSort)
    choiceChange.sort(randomSort)
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

    container.parent.addChild(questionText);
    questionText.visible = false;
    questionText.x = 360; questionText.y = 130;

    container.parent.addChild(choiceBg);
    choiceBg.visible = false;


    question = choice1.clone()
    container.parent.addChild(question);
    question.visible = false;
    question.x = 615
    question.y = 260
    question.scaleX = question.scaleY =.8


    question1 = choice2.clone()
    container.parent.addChild(question1);
    question1.visible = false;
    question1.x = 615
    question1.y = 260
    question1.scaleX = question1.scaleY =.8

    for (i = 0; i < 7; i++) {
        choice1Arr[i] = choice1.clone()
        container.parent.addChild(choice1Arr[i])
        choice1Arr[i].visible = false;
        choice1Arr[i].scaleX = choice1Arr[i].scaleY = .5
        choice2Arr[i] = choice2.clone()
        container.parent.addChild(choice2Arr[i])
        choice2Arr[i].visible = false;
        choice2Arr[i].scaleX = choice2Arr[i].scaleY = .5
    }

    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
       pickques()
    } else {
       pickques()
    }*/
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {

}

function helpEnable() {

}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = []
    panelVisibleFn()
    //=================================================================================================================================//
    choiceBg.visible = true;
    questionText.gotoAndStop(0);
    questionText.visible = true;
    
    qno = between(0, 34);
    qno1 = between(0, 34);

    for (i = 0; i < 7; i++) {
        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].gotoAndStop(qno[i])
        choice2Arr[i].gotoAndStop(qno1[i])
        choice1Arr[i].x = btnX[i]
        choice2Arr[i].x = btnX[i] + 200
        choice1Arr[i].y = btnY[i]
        choice2Arr[i].y = btnY[i] 
    }
    createTween();
  
}
function createTween() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 7; i++) {
        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].alpha = 0;
        choice2Arr[i].alpha = 0;
    }
    createjs.Tween.get(choice1Arr[0]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[0]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[1]).wait(200*8*1).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[1]).wait(200*8*1).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[2]).wait(200*8*2).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[2]).wait(200*8*2).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[3]).wait(200*8*3).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[3]).wait(200*8*3).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[4]).wait(200*8*4).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[4]).wait(200*8*4).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[5]).wait(200*8*5).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[5]).wait(200*8*5).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice1Arr[6]).wait(200*8*6).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
    createjs.Tween.get(choice2Arr[6]).wait(200*8*6).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY:1 }, 500)
  clearquesInterval = setInterval(createChoices, 200*8*8);
}
function createChoices() {
    clearInterval(clearquesInterval)
    clearquesInterval = 0

    choiceBg.visible = false;
    for (i = 0; i < 7; i++) {
        choice1Arr[i].visible = false;
        choice2Arr[i].visible = false;
    }

    chpos = between(0, 6)
    var rand = range(0, 6)
    if (qtype[cnt] == 1) {
        questionText.gotoAndStop(1)
        question1.visible = true
        question.visible = false
        question1.gotoAndStop(qno1[rand]);
        ans = qno[rand]

    } else {
        questionText.gotoAndStop(2)
        question.visible = true
        question1.visible = false
        question.gotoAndStop(qno[rand]);
        ans = qno1[rand]

    }
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    console.log("entered")
    if (qtype[cnt] == 1) {
        for (i = 0; i < 7; i++) {
            choice1Arr[i].visible = true
            choice1Arr[i].gotoAndStop(qno[chpos[i]])
            choice1Arr[i].name = qno[chpos[i]]
            choice1Arr[i].x = btnX1[i]
            choice1Arr[i].y = btnY1[i] 
        }
    } else {
        for (i = 0; i < 7; i++) {
            choice2Arr[i].visible = true
            choice2Arr[i].gotoAndStop(qno1[chpos[i]])
            choice2Arr[i].name = qno1[chpos[i]]
            choice2Arr[i].x = btnX1[i]
            choice2Arr[i].y = btnY1[i]
        }
    }
    createTween1();
}
function createTween1() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    if (qtype[cnt] == 1) {
        question1.visible = true
        question.visible = false
        question1.alpha = 0
        createjs.Tween.get(question1).wait(200).to({ alpha: 0, scaleX:1.15, scaleY:1.15 }, 500).to({ alpha: 1, scaleX:1.3, scaleY: 1.3 }, 500)


    } else {
        question.visible = true
        question1.visible = false
        question.alpha = 0
        createjs.Tween.get(question).wait(200).to({ alpha: 0, scaleX:1.15, scaleY:1.15 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)

    }


    if (qtype[cnt] == 1) {
        for (i = 0; i < 7; i++) {
            choice1Arr[i].visible = true
            choice1Arr[i].alpha = 0
            // choice1Arr[i].scaleX=choice1Arr[i].scaleY = .6

        }
        createjs.Tween.get(choice1Arr[0]).wait(200).to({ x: choice1Arr[0].x, y: 425, alpha: 0 }, 500).to({ x: choice1Arr[0].x, y: 445, alpha: 0.5 }, 500).to({ x: choice1Arr[0].x, y: 445, alpha: 1 })
        createjs.Tween.get(choice1Arr[1]).wait(300).to({ x: choice1Arr[1].x, y: 445, alpha: 0 }, 500).to({ x: choice1Arr[1].x, y: 425, alpha: 0.5 }, 500).to({ x: choice1Arr[1].x, y: 445, alpha: 1 })
        createjs.Tween.get(choice1Arr[2]).wait(600).to({ x: choice1Arr[2].x, y: 425, alpha: 0 }, 500).to({ x: choice1Arr[2].x, y: 445, alpha: 0.5 }, 500).to({ x: choice1Arr[2].x, y: 445, alpha: 1 })
        createjs.Tween.get(choice1Arr[3]).wait(800).to({ x: choice1Arr[3].x, y: 445, alpha: 0 }, 500).to({ x: choice1Arr[3].x, y: 425, alpha: 0.5 }, 500).to({ x: choice1Arr[3].x, y: 445, alpha: 1 })
        createjs.Tween.get(choice1Arr[4]).wait(1000).to({ x: choice1Arr[4].x, y: 605, alpha: 0 }, 500).to({ x: choice1Arr[4].x, y: 625, alpha: 0.5 }, 500).to({ x: choice1Arr[4].x, y: 605, alpha: 1 })
        createjs.Tween.get(choice1Arr[5]).wait(1200).to({ x: choice1Arr[5].x, y: 625, alpha: 0 }, 500).to({ x: choice1Arr[5].x, y: 605, alpha: 0.5 }, 500).to({ x: choice1Arr[5].x, y: 605, alpha: 1 })
        createjs.Tween.get(choice1Arr[6]).wait(1400).to({ x: choice1Arr[6].x, y: 625, alpha: 0 }, 500).to({ x: choice1Arr[6].x, y: 610, alpha: 0.5 }, 500).to({ x: choice1Arr[6].x, y: 606, alpha: 1 })
   
    } else {
        for (i = 0; i < 7; i++) {
            choice2Arr[i].visible = true
            choice2Arr[i].alpha = 0
            // choice2Arr[i].scaleX=choice2Arr[i].scaleY = .6
        }
        createjs.Tween.get(choice2Arr[0]).wait(200).to({ x: choice2Arr[0].x, y: 435, alpha: 0 }, 500).to({ x: choice2Arr[0].x, y: 455, alpha: 0.5 }, 500).to({ x: choice2Arr[0].x, y: 455, alpha: 1 })
        createjs.Tween.get(choice2Arr[1]).wait(300).to({ x: choice2Arr[1].x, y: 455, alpha: 0 }, 500).to({ x: choice2Arr[1].x, y: 435, alpha: 0.5 }, 500).to({ x: choice2Arr[1].x, y: 455, alpha: 1 })
        createjs.Tween.get(choice2Arr[2]).wait(600).to({ x: choice2Arr[2].x, y: 435, alpha: 0 }, 500).to({ x: choice2Arr[2].x, y: 455, alpha: 0.5 }, 500).to({ x: choice2Arr[2].x, y: 455, alpha: 1 })
        createjs.Tween.get(choice2Arr[3]).wait(800).to({ x: choice2Arr[3].x, y: 455, alpha: 0 }, 500).to({ x: choice2Arr[3].x, y: 435, alpha: 0.5 }, 500).to({ x: choice2Arr[3].x, y: 455, alpha: 1 })
        createjs.Tween.get(choice2Arr[4]).wait(1000).to({ x: choice2Arr[4].x, y: 590, alpha: 0 }, 500).to({ x: choice2Arr[4].x, y: 610, alpha: 0.5 }, 500).to({ x: choice2Arr[4].x, y: 610, alpha: 1 })
        createjs.Tween.get(choice2Arr[5]).wait(1200).to({ x: choice2Arr[5].x, y: 610, alpha: 0 }, 500).to({ x: choice2Arr[5].x, y: 590, alpha: 0.5 }, 500).to({ x: choice2Arr[5].x, y: 610, alpha: 1 })
        createjs.Tween.get(choice2Arr[6]).wait(1400).to({ x: choice2Arr[6].x, y: 610, alpha: 0 }, 500).to({ x: choice2Arr[6].x, y: 590, alpha: 0.5 }, 500).to({ x: choice2Arr[6].x, y: 610, alpha: 1 })
   
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3000)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    if (qtype[cnt] == 1) {
        for (i = 0; i < 7; i++) {
            choice1Arr[i].addEventListener("click", answerSelected)
            choice1Arr[i].mouseEnabled = true
            choice1Arr[i].cursor = "pointer"
        }
    } else {
        for (i = 0; i < 7; i++) {
            choice2Arr[i].addEventListener("click", answerSelected)
            choice2Arr[i].mouseEnabled = true
            choice2Arr[i].cursor = "pointer"
        }
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    for (i = 0; i < 7; i++) {
        choice1Arr[i].visible = false
        choice2Arr[i].visible = false
        choice1Arr[i].removeEventListener("click", answerSelected)
        choice2Arr[i].removeEventListener("click", answerSelected)
        choice1Arr[i].mouseEnabled = false
        choice2Arr[i].mouseEnabled = false
        choice1Arr[i].cursor = "default"
        choice2Arr[i].cursor = "default"
    }
    question.visible = false
    question1.visible = false
}

function answerSelected(e) {
    e.preventDefault();

    uans = e.currentTarget.name;
    console.log("uans= " + uans)

    gameResponseTimerStop();
    console.log(uans + "  == " + uans)

    if (ans == uans) {
        e.currentTarget.visible = true;
        disableMouse()
        getValidation("correct");
        disablechoices();
    } else {
        getValidation("wrong");
        disablechoices();
    }
}



function disableMouse() {
    if (qtype[cnt] == 1) {
        for (i = 0; i < 7; i++) {
            choice1Arr[i].mouseEnabled = false
        }
    } else {
        for (i = 0; i < 7; i++) {
            choice2Arr[i].mouseEnabled = false
        }
    }
}

function enableMouse() {

}