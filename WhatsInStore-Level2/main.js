///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
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
var currentX, currentY
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var text1
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var tween
var chpos = 0;
var question1, question2, queText, introImg;
var choiceArr = [];
var btnY = []
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];

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
    gameAssetsPath = "WhatsInStore-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "choice2", src: gameAssetsPath + "ChoiceImages2.png" },
            { id: "choice3", src: gameAssetsPath + "ChoiceImages3.png" },
            { id: "question", src: gameAssetsPath + "question1.png" },
            { id: "qHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "questionText", src: questionTextPath + "WhatsInStore-Level2-QT2.png" },
            { id: "queText", src: questionTextPath + "WhatsInStore-Level2-QT1.png" },
            { id: "introImg", src: gameAssetsPath + "introImg.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}

function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;

    if (id == "introImg") {

        introImg = new createjs.Bitmap(preload.getResult('introImg'));
        container.parent.addChild(introImg);
        introImg.visible = false;
    }

    if (id == "qHolder") {
        qHolderMc = new createjs.Bitmap(preload.getResult('qHolder'));
        container.parent.addChild(qHolderMc);
        qHolderMc.visible = false;

    }

    if (id == "queText") {
        queText = new createjs.Bitmap(preload.getResult('queText'));
        container.parent.addChild(queText);
        queText.visible = false;

    }

    if (id == "choice1" || id == "choice2" || id == "choice3" || id == "choice4") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 297, "count": 0, "regY": 50, "width": 296 }
        });

        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);

        var spriteSheet4 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 297, "count": 0, "regY": 50, "width": 296 }
        });

        choice2 = new createjs.Sprite(spriteSheet4);
        choice2.visible = false;
        container.parent.addChild(choice2);
        //
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice3")],
            "frames": { "regX": 50, "height": 297, "count": 0, "regY": 50, "width": 296 }
        });

        choice3 = new createjs.Sprite(spriteSheet5);
        choice3.visible = false;
        container.parent.addChild(choice3);
    }

    if (id == "question") {

        var spriteSheet6 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 563, "count": 0, "regY": 50, "width": 977 }
        });

        question = new createjs.Sprite(spriteSheet6);
        question.visible = false;
        container.parent.addChild(question);
    }

    if (lang == "TamilQuestionText/") {
        if (id == "questionText") {
            var spriteSheet2 = new createjs.SpriteSheet({
                framerate: 60,
                "images": [preload.getResult("questionText")],
                "frames": { "regX": 50, "height": 75, "count": 0, "regY": 50, "width": 876 }
            });
            questionText = new createjs.Sprite(spriteSheet2);
            container.parent.addChild(questionText);
            questionText.visible = false;
        }
    } else {
        if (id == "questionText") {
            var spriteSheet2 = new createjs.SpriteSheet({
                framerate: 60,
                "images": [preload.getResult("questionText")],
                "frames": { "regX": 50, "height": 77, "count": 0, "regY": 50, "width": 594 }
            });
            questionText = new createjs.Sprite(spriteSheet2);
            container.parent.addChild(questionText);
            questionText.visible = false;
        }
    }

}

function tick(e) {

    stage.update();
}
/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////


function handleClick(e) {
    qno = between(0, 11)
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

    container.parent.addChild(question)
    question.x = 205; question.y = 200;
    question.scaleX = question.scaleY = 1.3;

    container.parent.addChild(questionText);
    questionText.visible = false;
    questionText.x = 400; questionText.y = 120;

    container.parent.addChild(queText);
    queText.visible = false;

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].visible = false;
    }
    question.visible = false

    container.parent.addChild(qHolderMc)
    qHolderMc.visible = false;
    qHolderMc.x = qHolderMc.x
    qHolderMc.y = qHolderMc.y

    container.parent.addChild(choice1, choice2, choice3);
    choice1.x = 225; choice1.y = 310;
    choice2.x = 545; choice2.y = 310;
    choice3.x = 860; choice3.y = 310;

    choice1.visible = choice2.visible = choice3.visible = false;


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
       pickques()
    } else {
        pickques()
    }*/

}

function helpDisable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false
    }
}

function helpEnable() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = true
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
    clk = 0;
    correctCnt = 0;
    chpos = [];
    btnY = []
    panelVisibleFn()
    //=================================================================================================================================//
    questionText.visible = false
    queText.visible = true;
    qHolderMc.visible = false;

    var temp = qno[cnt] % 4
    question.visible = true;
    question.gotoAndStop(temp)
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].visible = false;
        this["choice" + i].gotoAndStop(qno[cnt])
    }
    createTween();
}
function createTween() {
    queText.visible = true;
   /*  queText.x = -1000;
    createjs.Tween.get(queText).wait(100).to({ x: 0, y: -20 }, 500, createjs.Ease.bounceOut) */

    question.visible = true;
    question.x = 1000;
    createjs.Tween.get(question).wait(100).to({ x: 70, y: 51 }, 500, createjs.Ease.bounceOut)

    clearquesInterval = setInterval(createChoices, 3000);
}
function createChoices() {
    clearInterval(clearquesInterval)
    clearquesInterval = 0;
    question.visible = false;
    queText.visible = false;
    qHolderMc.visible = false;
    questionText.gotoAndStop(qno[cnt]);
    questionText.visible = true

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].visible = true;
        this["choice" + i].gotoAndStop(qno[cnt])
        chpos.push({ posx: this["choice" + i].x, posy: this["choice" + i].y })
    }

    chpos.sort(randomSort);
    var vCnt = 0
    for (i = 1; i <= choiceCnt; i++) {
        vCnt++;
        this["choice" + vCnt].x = chpos[i - 1].posx;
        this["choice" + vCnt].y = chpos[i - 1].posy;
        btnY[i] = this["choice" + vCnt].y
    };
    ans = "ch1";
    createTween1();
}

function createTween1() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    qHolderMc.visible = false;
    qHolderMc.x = 1000;
    createjs.Tween.get(qHolderMc).wait(200).to({ x: 0 }, 500, createjs.Ease.bounceOut)


    var temp = 500;
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].alpha = 1;
        this["choice" + i].visible = true;
        this["choice" + i].y = 1000;

        createjs.Tween.get(this["choice" + i]).wait(temp).to({ y: btnY[i] }, 1000, createjs.Ease.bounceOut);
        temp += 200;
    }
    repTimeClearInterval = setTimeout(AddListenerFn, 2000)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].name = "ch" + i;
        this["choice" + i].cursor = "pointer";
        this["choice" + i].addEventListener("click", answerSelected);
        this["choice" + i].visible = true;
        this["choice" + i].alpha = 1;
        this["choice" + i].mouseEnabled = true
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

function enablechoices() {


}

//===============================================//
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
    e.currentTarget.removeEventListener("click", answerSelected);
    e.currentTarget.cursor = "default";
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {
        currentX = e.currentTarget.x + 45
        currentY = e.currentTarget.y + 45

        e.currentTarget.visible = true;
        disableMouse()

        setTimeout(correct, 500)
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