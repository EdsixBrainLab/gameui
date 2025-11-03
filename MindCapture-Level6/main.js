
///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, ansHolder, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc, introHintImg, introHintImg1, introHintImg2;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc, ch1 = 0, ch = 0, qqcnt = -1, clk = 0, correctCnt = 0;
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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var tween
var yesMc, noMc
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var quesArr = []
var qno1 = []
var qno = []
var pos = []
var btnx = []
var posChangeArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

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
    gameAssetsPath = "MindCapture-Level6/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "introHintImg1", src: gameAssetsPath + "Introhintimg.png" },
            { id: "introHintImg", src: gameAssetsPath + "Introhintimg1.png" },
            { id: "introHintImg2", src: gameAssetsPath + "Introhintimg2.png" },
            { id: "qhHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "questionText", src: questionTextPath + "MindCapture-Level6-QT.png" },
            { id: "no", src: questionTextPath + "MindCapture-Level6-QT1.png" },
            { id: "yes", src: questionTextPath + "MindCapture-Level6-QT2.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();

    if (id == "introHintImg1") {
        introHintImg1 = new createjs.Bitmap(preload.getResult('introHintImg1'));
        container.parent.addChild(introHintImg1);
        introHintImg1.visible = false;
    }
    if (id == "introHintImg") {
        introHintImg = new createjs.Bitmap(preload.getResult('introHintImg'));
        container.parent.addChild(introHintImg);
        introHintImg.visible = false;
    }
    if (id == "introHintImg2") {
        introHintImg2 = new createjs.Bitmap(preload.getResult('introHintImg2'));
        container.parent.addChild(introHintImg2);
        introHintImg2.visible = false;
    }
    if (id == "qhHolder") {
        qhHolder = new createjs.Bitmap(preload.getResult('qhHolder'));
        container.parent.addChild(qhHolder);
        qhHolder.visible = false;

    }

    if (id == "questionText") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 81, "count": 64, "regY": 50, "width": 757 }
            // "frames": { "regX": 50, "height": 59, "count": 64, "regY": 50, "width": 674 }//Guj
        });

        questionText = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(questionText);
        questionText.visible = false;

    }

    if (id == "yes") {
        yesMc = new createjs.Bitmap(preload.getResult('yes'));
        container.parent.addChild(yesMc);
        yesMc.regX = 50
        yesMc.regY = 50
        yesMc.visible = false;

    }

    if (id == "no") {
        noMc = new createjs.Bitmap(preload.getResult('no'));
        container.parent.addChild(noMc);
        noMc.regX = 50
        noMc.regY = 50
        noMc.visible = false;

    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 82, "height": 257, "count": 64, "regY": 0, "width": 257 }
        });

        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);

    }

    if (id == "question") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("question")],
            "frames": { "regX": 82, "height": 250, "count": 64, "regY": 0, "width": 249 }
        });

        question = new createjs.Sprite(spriteSheet2);
        question.visible = false;
        container.parent.addChild(question);

    }

}

function tick(e) {

    stage.update();
}
/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 100)
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
    questionText.scaleX = questionText.scaleY = 1;
    if (lang == "TamilQuestionText/") {
        questionText.x = 340; questionText.y = 130;

    } else if (lang == "ArabicQuestionText/") {
        questionText.scaleX = questionText.scaleY = 1.2;
        questionText.x = 363;
        questionText.y = 127;
    }
    else {
        questionText.x = 310; questionText.y = 130;
    }
    // questionText.x = 353; questionText.y = 135;///GUJARATI
    qhHolder.visible = false;
    container.parent.addChild(qhHolder)

    container.parent.addChild(choice1);
    choice1.visible = false;

    btnx = [, 175, 460, 760, 1040, 325, 605, 890]
    for (i = 1; i <= 7; i++) {
        quesArr[i] = question.clone();
        container.parent.addChild(quesArr[i]);
        //  quesArr[i].scaleX=quesArr[i].scaleY=1.2;
        quesArr[i].visible = false;
        if (i <= 4) {
            quesArr[i].y = 213
        } else {
            quesArr[i].y = 453
        }
        quesArr[i].x = btnx[i]
        quesArr[i].scaleX = quesArr[i].scaleY = .8
    }

    question.visible = false;
    container.parent.addChild(question);

    container.parent.addChild(yesMc, noMc);
    container.parent.addChild(choice1);
    posChangeArr.sort(randomSort)
    yesMc.name = "Y";
    yesMc.x = 415; yesMc.y = 640;
    noMc.name = "N";
    noMc.x = 800; noMc.y = 640;

    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/
}

function helpEnable() {
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true
}

function helpDisable() {
    yesMc.mouseEnabled = false
    noMc.mouseEnabled = false
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
    qhHolder.visible = false

    qno1 = between(1, 9);
    question.visible = false;
    yesMc.visible = false;
    noMc.visible = false;
    for (i = 1; i <= 7; i++) {
        quesArr[i].gotoAndStop(qno1[i]);
        quesArr[i].visible = true;
        postionofobjects(i)
        pos[i] = ans1;
        quesArr[i].x = 1900
    }

    createTween();
    createChoices();
}

function createChoices() {

    qch = [1, 2, 3, 4, 5, 6, 7]
    qch.sort(randomSort)
    qch1 = [1, 2, 3, 4, 5, 6, 7]
    qch1.sort(randomSort)
    var randVal
    var rand = qno1[qch[1]] * 3

    if (rand == 0) {
        randVal = range(0, 2)
    } else if (rand == 3) {
        randVal = range(3, 5)
    } else if (rand == 6) {
        randVal = range(6, 8)
    } else if (rand == 9) {
        randVal = range(9, 11)
    } else if (rand == 12) {
        randVal = range(12, 14)
    } else if (rand == 15) {
        randVal = range(15, 17)
    } else if (rand == 18) {
        randVal = range(18, 20)
    } else if (rand == 21) {
        randVal = range(21, 23)
    } else if (rand == 24) {
        randVal = range(24, 26)
    } else if (rand == 27) {
        randVal = range(27, 29)
    }

    choice1.gotoAndStop(randVal);
    choice1.scaleX = choice1.scaleY = .6

    switch ((rand)) {
        case 0:
        case 1:
        case 2:
            ans1 = "musicalinstruments";
            break;
        case 3:
        case 4:
        case 5:
            ans1 = "fruits";
            break;
        case 6:
        case 7:
        case 8:
            ans1 = "birds";
            break;
        case 9:
        case 10:
        case 11:
            ans1 = "alphabets";
            break;
        case 12:
        case 13:
        case 14:
            ans1 = "transports";
            break;
        case 15:
        case 16:
        case 17:
            ans1 = "vegetables";
            break;
        case 18:
        case 19:
        case 20:
            ans1 = "animals";
            break;
        case 21:
        case 22:
        case 23:
            ans1 = "insects";
            break;
        case 24:
        case 25:
        case 26:
            ans1 = "shapes";
            break;
        case 27:
        case 28:
        case 29:
            ans1 = "flowers";
            break;
    }

    switch (qch1[1]) {
        case 1:
            choice1.x = 173
            break;
        case 2:
            choice1.x = 467;
            break;
        case 3:
            choice1.x = 760
            break;
        case 4:
            choice1.x = 1053
            break;
        case 5:
            choice1.x = 320
            break;
        case 6:
            choice1.x = 615
            break;
        case 7:
            choice1.x = 905
            break;
    }
    ans2 = pos[qch1[1]];

    if (ans1 == ans2) {
        ans = "Y";
    }
    else {
        ans = "N";
    }
}

function postionofobjects(t) {
    switch (qno1[t]) {
        case 0:
            ans1 = "musicalinstruments";
            break;
        case 1:
            ans1 = "fruits";
            break;
        case 2:
            ans1 = "birds";
            break;
        case 3:
            ans1 = "alphabets";
            break;
        case 4:
            ans1 = "transports";
            break;
        case 5:
            ans1 = "vegetables";
            break;
        case 6:
            ans1 = "animals";
            break;
        case 7:
            ans1 = "insects";
            break;
        case 8:
            ans1 = "shapes";
            break;
        case 9:
            ans1 = "flowers";
            break;
    }
}


function createTween() {
    questionText.visible = true;
    questionText.alpha = 0
    createjs.Tween.get(questionText).wait(400).to({ alpha: 1 }, 200);

    // qhHolder.visible = true;
    // qhHolder.alpha = 0
    // qhHolder.x = 120
    // createjs.Tween.get(qhHolder).wait(700).to({ alpha: 1, x: 0 }, 200, createjs.Ease.bounceOut);

    var tempVal = 700;
    for (i = 1; i <= 7; i++) {
        quesArr[i].visible = true
        quesArr[i].alpha = 0.2
        createjs.Tween.get(quesArr[i]).wait(1000).to({ alpha: 1, x: btnx[i] }, tempVal, createjs.Ease.bounceOut);
        tempVal += 200;
    }
    setTimeout(createTween1, 6000);
}


function createTween1() {
    questionText.gotoAndStop(1)
    questionText.visible = true;
    questionText.alpha = 0
    createjs.Tween.get(questionText).wait(400).to({ alpha: 1 }, 200);

    qhHolder.visible = true;
    qhHolder.alpha = 0
    qhHolder.x = -120
    createjs.Tween.get(qhHolder).wait(700).to({ alpha: 1, x: 0 }, 200, createjs.Ease.bounceOut);


    for (i = 1; i <= 7; i++) {
        quesArr[i].visible = false;
    }

    choice1.visible = true;
    choice1.alpha = 0
    if (posChangeArr[cnt] == 0) {
        choice1.y = -300
        if (qch1[1] > 4) {
            createjs.Tween.get(choice1).wait(1000).to({ alpha: 1, x: choice1.x, y: 450 }, 600, createjs.Ease.bounceOut);
        } else {
            createjs.Tween.get(choice1).wait(1000).to({ alpha: 1, x: choice1.x, y: 230 }, 600, createjs.Ease.bounceOut);
        }
    } else {
        choice1.y = 900
        if (qch1[1] > 4) {
            createjs.Tween.get(choice1).wait(1000).to({ alpha: 1, x: choice1.x, y: 450 }, 600, createjs.Ease.bounceOut);
        } else {
            createjs.Tween.get(choice1).wait(1000).to({ alpha: 1, x: choice1.x, y: 230 }, 600, createjs.Ease.bounceOut);
        }

    }


    createjs.Tween.get(yesMc).wait(500)
        .to({ visible: true, alpha: .5, rotation: 180, scaleX: .4, scaleY: .4 }, 600)
        .to({ visible: true, alpha: 1, rotation: 360, scaleX: .8, scaleY: .8 }, 1000)

    createjs.Tween.get(noMc).wait(1000)
        .to({ visible: true, alpha: .5, rotation: 180, scaleX: .4, scaleY: .4 }, 600)
        .to({ visible: true, alpha: 1, rotation: 360, scaleX: .8, scaleY: .8 }, 1000)

    repTimeClearInterval = setTimeout(AddListenerFn, 2600)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)

    yesMc.addEventListener("click", answerSelected);
    noMc.addEventListener("click", answerSelected);
    yesMc.cursor = "pointer";
    noMc.cursor = "pointer";
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true

    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
/*
function enablechoices() {
    yesMc.alpha = 1
    noMc.alpha = 1
    yesMc.addEventListener("click", answerSelected);
    noMc.addEventListener("click", answerSelected);
    yesMc.cursor = "pointer";
    noMc.cursor = "pointer";
    yesMc.mouseEnabled = true
    noMc.mouseEnabled = true
}*/

//===============================================//

function disablechoices() {

    yesMc.removeEventListener("click", answerSelected);
    noMc.removeEventListener("click", answerSelected);
    yesMc.cursor = "default";
    noMc.cursor = "";
    choice1.visible = false

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
    gameResponseTimerStop();
    // pauseTimer();
    uans = e.currentTarget.name;
    console.log(uans)
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
    yesMc.mouseEnabled = false
    noMc.mouseEnabled = false

}

function enableMouse() {

}
//===============================================================================================//

