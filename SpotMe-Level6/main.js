///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 230, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 4, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
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
var currentX, currentY
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var qText;
var cappos = 0;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var qno = [];
var quesArr = []
var qnoI2 = [];
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var sX = [580, 740, 760, 671, 483, 393, 423];
var sY = [225, 300, 470, 600, 600, 465, 300];
var sX1 = [651, 814, 831, 741, 553, 463, 493];
var sY1 = [190, 260, 435, 563, 562, 427, 260];
var choiceChange = []
var dummyArr = []
var spriteChange = []
var shuffleArr1 = []
var shuffleArr2 = []
var shuffleArr3 = []
var btnx = [670, 916, 946, 856, 473, 380, 425]
var btny = [205, 300, 490, 680, 680, 490, 300]
var btnx2 = [660, 801, 831, 841, 473, 490, 515]
var btny2 = [295, 300, 490, 580, 580, 490, 300]
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
    gameAssetsPath = "SpotMe-Level6/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "Basket.png" },
            { id: "questionText", src: questionTextPath + "SpotMe-Level6-QT.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "chHolder") {
        chHolder = new createjs.Bitmap(preload.getResult('chHolder'));
        container.parent.addChild(chHolder);
        chHolder.visible = false;
    }
    if (id == "questionText") {

        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 119, "count": 0, "regY": 50, "width": 602 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        questionText = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(questionText);
        questionText.visible = false;
    }
    if (id == "choice1") {
        choice1 = new createjs.Bitmap(preload.getResult('choice1'));
        container.parent.addChild(choice1);
        choice1.visible = false;
    }
    if (id == "dummy") {

        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("dummy")],
            "frames": { "regX": 50, "height": 60, "count": 0, "regY": 50, "width": 60 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        dummy = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(dummy);
        dummy.visible = false;
    }

    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 94, "count": 0, "regY": 50, "width": 94 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);

    };
}

function tick(e) {

    stage.update();
}

/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 100);
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

    choice1.visible = false;
    question.visible = false;
    question.scaleX = question.scaleY = .7;

    questionText.visible = false;

    container.parent.addChild(questionText)
    questionText.x = 380; questionText.y = 90
    questionText.scaleX = questionText.scaleY = 1
    if(lang == "HindiQuestionText/"){
        questionText.scaleX = questionText.scaleY = .9
        questionText.x = 410;
        questionText.y = 100;
    }

    for (i = 0; i < 7; i++) {
        dummyArr[i] = dummy.clone()
        dummyArr[i].name = i;
        dummyArr[i].x = btnx[i];
        dummyArr[i].y = btny[i];
        container.parent.addChild(dummyArr[i]);
        dummyArr[i].visible = false;
        dummyArr[i].gotoAndStop(i)
    }

    container.parent.addChild(question)
    for (i = 0; i < 7; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i]
    }



    chHolder.visible = false;
    chHolder.y = -30

    qnoI2 = between(0, 32);


    if (isQuestionAllVariations) {
        //createGameWiseQuestions()
        choiceChange = [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1]
        //setTimeout(pickques, 1000);
    } else {
        choiceChange = [0, 1, 1, 1, 0, 0, 1, 0, 0, 1]
        //setTimeout(pickques, 1000);
    }


    choiceChange.sort(randomSort)
}

function helpDisable() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].mouseEnabled = true;
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
    panelVisibleFn()
    questionText.gotoAndStop(0)
   
    qnoI = between(0, 6)

    for (i = 0; i < 7; i++) {
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i];
        quesArr[i].visible = false;
    }
    question.gotoAndStop(qnoI2[cnt]);
    question.x = sX1[qnoI[0]];
    question.y = sY1[qnoI[0]];
    question.visible = false;
    //
    for (i = 0; i < 7; i++) {
        dummyArr[i].x = btnx2[i]
        dummyArr[i].y = btny2[i]
    }
    CreateTween();
}

function CreateTween() {
    questionText.visible = true;
    questionText.alpha = 0
    createjs.Tween.get(questionText).wait(200).to({ alpha: 1 }, 200);

    chHolder.x = -1700;
    chHolder.visible = true
    createjs.Tween.get(chHolder).wait(200).
        to({ x: 0, y: chHolder.y }, 500, createjs.Ease.bounceIn);

    var tempVal2 = 500
    var rand = between(0, 6)
    for (i = 0; i < 7; i++) {
        quesArr[rand[i]].visible = true;
        quesArr[rand[i]].alpha = 0
        createjs.Tween.get(quesArr[rand[i]]).wait(tempVal2).to({ alpha: 1 }, tempVal2);
        tempVal2 += 200;
    }

    question.visible = true
    question.alpha = 0
    createjs.Tween.get(question).wait(4000).to({ y: sY1[qnoI[0]], alpha: 1 }, 500).to({ y: sY1[qnoI[0]] + 70 }, 1000, createjs.Ease.bounceOut).wait(500).call(changechoice1);

    var tempVal1 = 1900;
    for (i = 0; i < 7; i++) {
        dummyArr[rand[i]].visible = true
        dummyArr[rand[i]].alpha = 0
        createjs.Tween.get(dummyArr[rand[i]]).wait(tempVal1).to({ x: btnx[rand[i]], y: btny[rand[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        tempVal1 += 200;
    }

}

function AddListenerFn() {
    questionText.gotoAndStop(1)
    createjs.Tween.get(questionText).wait(200).to({ alpha: 1 }, 200);
    for (i = 0; i < 7; i++) {
        dummyArr[i].addEventListener("click", answerSelected)
        dummyArr[i].cursor = "pointer"
        dummyArr[i].mouseEnabled = true
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
/*
function enablechoices() {    
    rst = 0;
    gameResponseTimerStart();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
  
    questionText.gotoAndStop(1)
    for (i = 0; i < 7; i++) {
        dummyArr[i].addEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = true;
        dummyArr[i].cursor = "pointer";
    }

}*/
function disablechoices() {
    for (i = 0; i < 7; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changechoice1() {
    question.visible = false;
    createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[4]], y: sY[qnoI[4]] }, 400).wait(500);
    createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[6]], y: sY[qnoI[6]] }, 400).wait(500);
    createjs.Tween.get(quesArr[qnoI[2]]).to({ x: sX[qnoI[2]], y: sY[qnoI[2]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI[3]]).to({ x: sX[qnoI[0]], y: sY[qnoI[0]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI[4]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI[5]]).to({ x: sX[qnoI[3]], y: sY[qnoI[3]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI[6]]).to({ x: sX[qnoI[5]], y: sY[qnoI[5]] }, 300).wait(400).call(changeoption11);
}
function changeoption11() {
    createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[6]], y: sY[qnoI[6]] }, 400).wait(500);
    if (choiceChange[cnt] == 0) {
        createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[4]], y: sY[qnoI[4]] }, 400).wait(500).call(changeoption12);
    } else {
        createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[4]], y: sY[qnoI[4]] }, 400).wait(500).call(AddListenerFn);
    }
    ans = qnoI[6]
}
function changeoption12() {
    createjs.Tween.get(quesArr[qnoI[0]]).to({ x: sX[qnoI[5]], y: sY[qnoI[5]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[1]]).to({ x: sX[qnoI[3]], y: sY[qnoI[3]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[2]]).to({ x: sX[qnoI[1]], y: sY[qnoI[1]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[3]]).to({ x: sX[qnoI[6]], y: sY[qnoI[6]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[4]]).to({ x: sX[qnoI[2]], y: sY[qnoI[2]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[5]]).to({ x: sX[qnoI[0]], y: sY[qnoI[0]] }, 600).wait(700);
    createjs.Tween.get(quesArr[qnoI[6]]).to({ x: sX[qnoI[4]], y: sY[qnoI[4]] }, 600).wait(700).call(AddListenerFn);
    ans = qnoI[5]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    gameResponseTimerStop();
    if (ans == uans) {
        getValidation("correct");
        disablechoices();
    } else {

        getValidation("wrong");
        disablechoices();
    }
}