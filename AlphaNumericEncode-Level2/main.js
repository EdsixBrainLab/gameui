//////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var isBgSound = true;
var isEffSound = true;

var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;

var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////s
var currentX, currentY
var currentObj = []
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno1 = []
var chpos = []
var choice1Arr = []
var choice2Arr = []
var indxval = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
var choiceChange = [0, 1, 2, 3, 0, 1, 2, 3]
var choice2Arr = []
var btnX = [140, 800, 460]
var btnY = [350, 350, 550]
var btnX1 = [280, 618, 955]
var btnY1 = [545, 545, 545]
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var introImg
//register key functions
///////////////////////////////////////////////////////////////////
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
    gameAssetsPath = "AlphaNumericEncode-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "questionText", src: questionTextPath + "AlphaNumericEncode-Level2-QT.png" },
            { id: "choiceBg", src: gameAssetsPath + "qhHolder1.png" },
            { id: "choice1", src: gameAssetsPath + "question1.png" },
            { id: "choice2", src: gameAssetsPath + "question2.png" },
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
    if (id == "circle1Outline") {
        circle1Outline = new createjs.Bitmap(preload.getResult('circle1Outline'));
        container.parent.addChild(circle1Outline);
        circle1Outline.visible = false;
    }

    if (id == "questionText") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 81, "count": 0, "regY": 50, "width": 671 }
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
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========/////////////////////////////////////////////////////////////////
function handleClick(e) {

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
    questionText.x = 360; questionText.y = 140;

    container.parent.addChild(choiceBg);
    choiceBg.visible = false;
    question = choice1.clone()
    container.parent.addChild(question);
    question.visible = false;

    question1 = choice2.clone()
    question1.scaleX = question1.scaleY = .7
    container.parent.addChild(question1);
    question1.visible = false;

    for (i = 0; i < choiceCnt; i++) {
        choice1Arr[i] = choice1.clone()
        container.parent.addChild(choice1Arr[i])
        choice1Arr[i].visible = false;
        choice1Arr[i].scaleX = choice1Arr[i].scaleY = 1
        choice2Arr[i] = choice2.clone()
        container.parent.addChild(choice2Arr[i])
        choice2Arr[i].visible = false;
        choice2Arr[i].scaleX = choice2Arr[i].scaleY = 1

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
    tx = 0;
    cnt++;
    qscnt++;
    quesCnt++;
    chpos = []

    panelVisibleFn()
    //==================================================================//

    questionText.gotoAndStop(0);
    questionText.visible = true;
    qno = between(0, 34);
    qno1 = between(0, 34);
    for (i = 0; i < choiceCnt; i++) {

        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].gotoAndStop(qno[i])
        choice2Arr[i].gotoAndStop(qno1[i])
        choice1Arr[i].x = btnX[i]
        choice2Arr[i].x = btnX[i] + 290
        choice1Arr[i].y = btnY[i]
        choice2Arr[i].y = btnY[i]
    }
    createTween();

   
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)
    choiceBg.visible = true;
    for (i = 0; i < 3; i++) {
        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].alpha = 0;
        choice2Arr[i].alpha = 0;

    }
    createjs.Tween.get(choice1Arr[0]).wait(200).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
    createjs.Tween.get(choice2Arr[0]).wait(200).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
    createjs.Tween.get(choice1Arr[1]).wait(600).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
    createjs.Tween.get(choice2Arr[1]).wait(600).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
    createjs.Tween.get(choice1Arr[2]).wait(1000).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
    createjs.Tween.get(choice2Arr[2]).wait(1000).to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 500).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
 
   clearquesInterval = setInterval(createChoices, 5000);

}
function createChoices() {
    clearInterval(clearquesInterval)
    clearquesInterval = 0

       choiceBg.visible = false;
    for (i = 0; i < 3; i++) {
        choice1Arr[i].visible = false;
        choice2Arr[i].visible = false;
    }

    questionText.visible = false;
    if (indxval[cnt] == 0) {
        chpos.push(0, 1,2)
    }
    else {
        chpos.push(1,2, 0)
    }

    var rand = range(2,0, 1)

    if (qtype[cnt] == 1) {
        questionText.gotoAndStop(1)
        question1.visible = false
        question.visible = false
        question1.gotoAndStop(qno1[rand]);
        ans = qno[rand]
        question1.x = 610
        question1.y = 270

    } else {
        questionText.gotoAndStop(2)
        question.visible = false
        question1.visible = false
        question.gotoAndStop(qno[rand]);
        ans = qno1[rand]
        question.x = 610
        question.y = 260
    }
   
     enablechoices();
     createjs.Ticker.addEventListener("tick", tick);
     stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    console.log("entered")
    if (qtype[cnt] == 1) {
        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].visible = false
            choice1Arr[i].gotoAndStop(qno[chpos[i]])
            choice1Arr[i].name = qno[chpos[i]]
            choice1Arr[i].x = btnX1[i]
            choice1Arr[i].y = btnY1[i]

        }
    } else {
        for (i = 0; i < choiceCnt; i++) {
            choice2Arr[i].visible = false
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
        createjs.Tween.get(question1).wait(200).to({ alpha: 0, scaleX: 1.45, scaleY: 1.45 }, 500).to({ alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 500)

    } else {
        question.visible = true
        question1.visible = false
        question.alpha = 0
        createjs.Tween.get(question).wait(200).to({ alpha: 0, scaleX: 1.45, scaleY: 1.45 }, 500).to({ alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 500)
    }

    var temp = 200
    if (qtype[cnt] == 1) {
        for (i = 0; i < 3; i++) {
            choice1Arr[i].visible = true
            choice1Arr[i].alpha = 0
            createjs.Tween.get(choice1Arr[i]).wait(temp).to({ x: choice1Arr[i].x, y: choice1Arr[i].y, alpha: 0 }, 500).to({ x: choice1Arr[i].x, y: 550, alpha: 0.5 }, 500).to({ x: choice1Arr[i].x, y: choice1Arr[i].y, alpha: 1 })
            temp += 200;
        }

       
    } else {
        for (i = 0; i < 3; i++) {
            choice2Arr[i].visible = true
            choice2Arr[i].alpha = 0
            createjs.Tween.get(choice2Arr[i]).wait(temp).to({ x: choice2Arr[i].x, y: choice2Arr[i].y, alpha: 0 }, 500).to({ x: choice2Arr[i].x, y: 550, alpha: 0.5 }, 500).to({ x: choice2Arr[i].x, y: choice2Arr[i].y, alpha: 1 })
            temp += 200;
        }
    }
    repTimeClearInterval = setTimeout(AddListenerFn, 2500)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    if (qtype[cnt] == 1) {
        for (i = 0; i < choiceCnt; i++) {
            choice1Arr[i].addEventListener("click", answerSelected)
            choice1Arr[i].mouseEnabled = true
            choice1Arr[i].cursor = "pointer"
        }
    } else {
        for (i = 0; i < choiceCnt; i++) {
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
    createjs.Tween.removeAllTweens();
    questionText.visible = false
    for (i = 0; i < choiceCnt; i++) {
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
//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//

function onRoll_over(e) {
    var overNum = e.currentTarget.name;
    for (i = 0; i < choiceCnt; i++) {

    }

}
//
function onRoll_out(e) {
    for (i = 0; i < choiceCnt; i++) {
    }
}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {
    e.preventDefault();

    uans = e.currentTarget.name;
    console.log("uans= " + uans)

    gameResponseTimerStop();
    console.log(uans + "  == " + uans)

    if (ans == uans) {
        e.currentTarget.visible = true;
        disableMouse()

        for (i = 0; i < 3; i++) {
            choice1Arr[i].removeEventListener("click", answerSelected)
            choice2Arr[i].removeEventListener("click", answerSelected)
        }
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
    if (qtype[cnt] == 1) {
        for (i = 0; i < 3; i++) {
            choice1Arr[i].mouseEnabled = false
        }
    } else {
        for (i = 0; i < 3; i++) {
            choice2Arr[i].mouseEnabled = false
        }
    }
}

function enableMouse() {

}