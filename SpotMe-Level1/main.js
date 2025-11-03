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
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;;
var isBgSound = true;
var isEffSound = true;
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var currentX, currentY
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var qText;
var cappos = 0;
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var choiceChange1 = []
var quesArr = []
var qno2 = [];
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var sX = [570, 720, 570, 432];
var sY = [245, 405, 545, 405];
var sX1 = [640, 790, 640, 502];
var sY1 = [200, 365, 525, 365];
var choiceChange = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1]
var spriteChange = [0, 1, 2, 2, 0, 1, 2, 1, 0, 1]


var dummyArr = []

var shuffleArr1 = []
var shuffleArr2 = []
var btnx = [660, 916, 660, 414]
var btny = [198, 435, 698, 435]
var btnx2 = [660, 811, 660, 514]
var btny2 = [298, 435, 598, 435]
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
    gameAssetsPath = "SpotMe-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "questionText", src: questionTextPath + "SpotMe-Level1-QT.png" },
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "Basket.png" }
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

    for (i = 0; i < 4; i++) {
        dummyArr[i] = dummy.clone()
        dummyArr[i].name = i;
        dummyArr[i].x = btnx[i];
        dummyArr[i].y = btny[i];
        container.parent.addChild(dummyArr[i]);
        dummyArr[i].visible = false;
        dummyArr[i].gotoAndStop(i)
    }
    container.parent.addChild(question)

    for (i = 0; i < 2; i++) {
        quesArr[i] = choice1.clone();
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i];
        // quesArr[i].gotoAndStop(83);
    }


    chHolder.visible = false;
    chHolder.y = 35;
    qno2 = between(0, 32);
    if (isQuestionAllVariations) {
        // createGameWiseQuestions()
        choiceChange = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1]
        spriteChange = [0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2]
        // setTimeout(pickques, 1000);
    } else {
        choiceChange = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1]
        spriteChange = [0, 1, 2, 2, 0, 1, 2, 1, 0, 1]
        // setTimeout(pickques, 1000);
    }
    choiceChange.sort(randomSort)
    spriteChange.sort(randomSort)
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
    tx = 0;
    qscnt++;
    cnt++;
    quesCnt++;
    panelVisibleFn()

    questionText.gotoAndStop(0)
    if (choiceChange[cnt] == 0) {
        choiceChange1 = [0, 1]
    } else if (choiceChange[cnt] == 1) {
        choiceChange1 = [2, 0]
    } else if (choiceChange[cnt] == 2) {
        choiceChange1 = [3, 2]
    } else {
        choiceChange1 = [1, 3]
    }

    for (i = 0; i < 2; i++) {
        quesArr[i].x = sX[choiceChange1[i]];
        quesArr[i].y = sY[choiceChange1[i]];
        quesArr[i].visible = false;
    }
    question.gotoAndStop(qno2[cnt]);
    question.x = sX1[choiceChange1[0]];
    question.y = sY1[choiceChange1[0]];
    question.visible = false;
    //

    for (i = 0; i < 4; i++) {
        dummyArr[i].x = btnx2[i]
        dummyArr[i].y = btny2[i]
    }
    qno[cnt] = choiceChange[cnt];

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
    var rand = between(0, 1)
    for (i = 0; i < 2; i++) {
        quesArr[rand[i]].visible = true;
        quesArr[rand[i]].alpha = 0
        createjs.Tween.get(quesArr[rand[i]]).wait(tempVal2).to({ alpha: 1 }, tempVal2);
        tempVal2 += 200;
    }

    question.visible = true
    question.alpha = 0
    createjs.Tween.get(question).wait(3000).to({ y: sY1[choiceChange1[0]], alpha: 1 }, 500).to({ y: sY1[choiceChange1[0]] + 80 }, 1000, createjs.Ease.bounceOut).wait(500).call(changechoice1);

    var tempVal1 = 1400;
    var rand1 = between(0, 3)
    for (i = 0; i < 4; i++) {
        dummyArr[rand1[i]].visible = true
        dummyArr[rand1[i]].alpha = 0
        createjs.Tween.get(dummyArr[rand1[i]]).wait(tempVal1).to({ x: btnx[rand1[i]], y: btny[rand1[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        tempVal1 += 200;
    }
}

function AddListenerFn() {
    questionText.gotoAndStop(1)
    createjs.Tween.get(questionText).wait(200).to({ alpha: 1 }, 200);
    for (i = 0; i < 4; i++) {
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
  
    for (i = 0; i < 4; i++) {
        dummyArr[i].addEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = true;
        dummyArr[i].cursor = "pointer";
    }

}*/
function disablechoices() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
    }
}


function changechoice1() {
    question.visible = false
    if (choiceChange[cnt] == 0) {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [2, 1];
            shuffleArr2 = [0, 3];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [3, 1];
            shuffleArr2 = [2, 0];
        }
        else {
            shuffleArr1 = [1, 2];
            shuffleArr2 = [3, 1]
        }
        ans = shuffleArr1[1];

    }
    else if (choiceChange[cnt] == 1) {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [0, 1];
            shuffleArr2 = [2, 3];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [1, 0];
            shuffleArr2 = [3, 2];
        }
        else {
            shuffleArr1 = [3, 2];
            shuffleArr2 = [1, 0]
        }
        ans = shuffleArr1[1];
    }
    else if (choiceChange[cnt] == 2) {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [1, 3];
            shuffleArr2 = [3, 1];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [1, 2];
            shuffleArr2 = [3, 0];
        }
        else {
            shuffleArr1 = [2, 0];
            shuffleArr2 = [3, 1]
        }
        ans = shuffleArr1[1];
    }
    else {
        if (spriteChange[cnt] == 0) {
            shuffleArr1 = [2, 1];
            shuffleArr2 = [0, 3];
        }
        else if (spriteChange[cnt] == 1) {
            shuffleArr1 = [0, 2];
            shuffleArr2 = [1, 3];
        }
        else {
            shuffleArr1 = [3, 0];
            shuffleArr2 = [2, 3]
        }
        ans = shuffleArr1[1];
    }
    changeoption11();
}
/////////////////////////////////////////////////////////////////////////

function changeoption11() {
    createjs.Tween.get(quesArr[0]).to({ x: sX[shuffleArr1[0]], y: sY[shuffleArr1[0]] }, 300).wait(300);
    createjs.Tween.get(quesArr[1]).to({ x: sX[shuffleArr2[0]], y: sY[shuffleArr2[0]] }, 300).wait(300).call(changeoption12);
}
function changeoption12() {
    createjs.Tween.get(quesArr[0]).to({ x: sX[shuffleArr1[1]], y: sY[shuffleArr1[1]] }, 500).wait(400);
    createjs.Tween.get(quesArr[1]).to({ x: sX[shuffleArr2[1]], y: sY[shuffleArr2[1]] }, 500).wait(400).call(AddListenerFn);
}

////////////////////////////////////////////////////////////////////////////


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

function correct() {

}


function disableMouse() {
    for (i = 0; i < 4; i++) {
        dummyArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}