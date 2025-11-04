///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 220, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 9, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var ques1, ques2, ques3, ques4, ques5, chHolderMc;
var text1, text2, text3, choiceMc2, choiceMc3;
var arrCnt = 0;
var currentX, currentY
var answer
var btny = [40, 153, 265, 377, 490]

var quesArr = []
var btnx1 = [50, 317, 585, 50, 317, 585, 50, 317, 585]
var btny1 = [170, 170, 170, 350, 350, 350, 530, 530, 530]
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI1 = []
var qnoI = [];
var qno = [];

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
    gameAssetsPath = "SpotMyPlace-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////////////////intro////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            ///////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "question.png" },
            { id: "questiontext", src: questionTextPath + "SpotMyPlace-Level2-QT.png" },
            { id: "answerImg", src: gameAssetsPath + "Answer.png" }
        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    var event = assets[i];
    var id = event.item.id;
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }

    if (id == "questiontext") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questiontext")],
            "frames": { "regX": 50, "height": 68, "count": 0, "regY": 50, "width": 605 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        questionText = new createjs.Sprite(spriteSheet3);
        questionText.visible = false;
        container.parent.addChild(questionText);
    };
    if (id == "answerImg") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("answerImg")],
            "frames": { "regX": 0, "height": 341, "count": 100, "regY": 0, "width": 342 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        answerImg = new createjs.Sprite(spriteSheet3);
        answerImg.visible = false;
        container.parent.addChild(answerImg);
    };

    if (id == "choice1") {
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 177, "count": 100, "regY": 0, "width": 178 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet3);
        choice1.visible = false;
        container.parent.addChild(choice1);
    };

}

function tick(e) {

    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
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
    questionText.x = 390; questionText.y = 110

    for (i = 0; i < 9; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i])
        quesArr[i].visible = false;
        quesArr[i].x = btnx1[i]
        quesArr[i].y = btny1[i]
        quesArr[i].name = i
        quesArr[i].scaleX = quesArr[i].scaleY = .9
    }

    question = answerImg.clone()
    question.x = 840
    question.y = 240
    container.parent.addChild(question);
    question.visible = false


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
        pickques()
    } else {
        pickques()
    }*/

    stage.update();
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < 10; i++) {
        quesArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 10; i++) {
        quesArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    //for db
    
    pauseTimer()
    tx = 0;
    qscnt++;
    //db

    cnt++;
    quesCnt++;
    arrCnt++;

    fpushArr = [];
    qnoI1 = []
    qnoI = []
    panelVisibleFn()
    //----------------------------------------------------------------------------------------------

    qnoI1 = range(0, 8)
    qnoI = between(0, 24)

    question.visible = false
    questionText.visible = true
    questionText.gotoAndStop(0)
    for (i = 0; i < 9; i++) {

        quesArr[i].gotoAndStop(qnoI[i])
        quesArr[i].visible = false

    }

    // setTimeout(questiondisplay, 4000)

    cnt1 = -1;
    setTimeout(showflowers, 700)



}
function showflowers() {
    cnt1++;
    quesArr[cnt1].visible = true;

    setTimeout(creatDelayfn, 500)
}
function creatDelayfn() {

    if (cnt1 < 8) {
        showflowers()
    }
    else {
        setTimeout(questiondisplay, 500)

    }

}

function questiondisplay() {
    // pauseTimer()
    questionText.gotoAndStop(1)
    questionText.visible = false
    for (i = 0; i < 10; i++) {
        if (i == 9) {
            question.gotoAndStop(qnoI[qnoI1])
            question.visible = false
        }
        else {
            quesArr[i].gotoAndStop(25)
            quesArr[i].visible = true
        }
    }
    ans = qnoI1
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
    enablechoices();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 0; i < 9; i++) {
        quesArr[i].visible = false;
        quesArr[i].cursor = "pointer";
        quesArr[i].visible = true
        quesArr[i].mouseEnabled = true
    }
    createTween()

}
function createTween() {

    questionText.visible = true;
    questionText.alpha = 0
    questionText.scaleX = .99
    createjs.Tween.get(questionText).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)


    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    ///////////////////////////choice tween////////////////////////////////////


    repTimeClearInterval = setTimeout(AddListenerFn, 1500)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
    for (i = 0; i < 9; i++) {
        quesArr[i].addEventListener("click", answerSelected)
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}

function disablechoices() {
    for (i = 0; i < 9; i++) {
        quesArr[i].visible = false;
        quesArr[i].cursor = "pointer";
        quesArr[i].addEventListener("click", answerSelected)
        quesArr[i].mouseEnabled = false
    }
    question.visible = false



}

//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//
function onRoll_over(e) {

}

function onRoll_out(e) {

}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {

    e.preventDefault();
    uans = e.currentTarget.name;

    gameResponseTimerStop();
    // pauseTimer();
    if (ans == uans) {

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
    for (i = 0; i < 9; i++) {

        quesArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}