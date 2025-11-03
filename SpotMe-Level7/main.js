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
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var tween
var chpos = 0;
var question1, question2;
var incr = 33;
var currentX, currentY

///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var dummyArr = []
var qno = [];
var qnoI1 = [];
var chpos = [];
var objArr = [];
var quesArr = []
var quesMcArr = []
var answer = [];
var qText;
var qnoI2 = [];
var chposArr = []
var arr3 = []
var ci = 1;
var question2
var fruitArray = ["Watermelon", "Pear", "Orange", "Apple", "Papaya", "Strawberry", "Banana", "Pineapple", "Grape", "Mango", "pomegranate", "Berry", "Kiwi", "Lemon", "Cake", "Corn", "Dice", "Doll", "Egg", "Football", "Gift", "Hat", "Hibiscus", "Ink bottle", "Jelly", "Lock", "Pen", "Quil", "Ring", "Flower", "Shell", "Strawberry", "Watch", "VolleyBall"];
var type_arry = [];
var chint = 0;
var sX = [585, 740, 760, 671, 483, 403, 423];
var sY = [225, 300, 470, 600, 600, 465, 300];

var sX1 = [644, 804, 821, 731, 543, 463, 483];
var sY1 = [190, 260, 435, 563, 562, 427, 260];

var posArray = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
var holder_arry = []
var cappos = 0;
var img1 = [], img2 = [];
var shapes_arry = []
var option_arry = ["2_8", "3_7", "4_6"]
var btnx = [660, 906, 936, 846, 463, 380, 405]
var btny = [195, 300, 490, 680, 680, 490, 300]
var btnx2 = [660, 801, 831, 801, 513, 490, 525]
var btny2 = [285, 300, 490, 680, 680, 490, 300]
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
    gameAssetsPath = "SpotMe-Level7/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "chHolder", src: gameAssetsPath + "chHolder.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "choice1", src: gameAssetsPath + "Basket.png" },
            { id: "dummy", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "questionText", src: questionTextPath + "SpotMe-Level7-QT.png" }
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
    if (lang == "TamilQuestionText/") {
        if (id == "questionText") {

            var spriteSheet1 = new createjs.SpriteSheet({
                framerate: 30,
                "images": [preload.getResult("questionText")],
                "frames": { "regX": 50, "height": 103, "count": 0, "regY": 50, "width": 634 },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            });
            //
            questionText = new createjs.Sprite(spriteSheet1);
            container.parent.addChild(questionText);
            questionText.visible = false;
        }
    } else {
        if (id == "questionText") {

            var spriteSheet1 = new createjs.SpriteSheet({
                framerate: 30,
                "images": [preload.getResult("questionText")],
                "frames": { "regX": 50, "height": 119, "count": 0, "regY": 50, "width": 592 },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            });
            //
            questionText = new createjs.Sprite(spriteSheet1);
            container.parent.addChild(questionText);
            questionText.visible = false;
        }
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
            "frames": { "regX": 60, "height": 94, "count": 0, "regY": 50, "width": 94 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);

    };
    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 94, "count": 0, "regY": 50, "width": 94 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        question1 = new createjs.Sprite(spriteSheet1);
        question1.visible = false;
        container.parent.addChild(question1);

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


    question.visible = false;
    question.scaleX = question.scaleY = .7;

    // question1 = question.clone();
    question2 = question.clone();
    container.parent.addChild(question2)


    if (lang == "EnglishQuestionText/") {
        question2.x = 950
        question2.y = 98
    }
    else if (lang == "TamilQuestionText/") {
        question2.x = 340
        question2.y = 85
    }
    else if (lang == "GujaratiQuestionText/") {
        question2.x = 680
        question2.y = 95
    }
    else if (lang == "HindiQuestionText/") {
        question2.x = 966
        question2.y = 110
    }
    else {
        question2.x = 950
        question2.y = 98
    }

    posArray.sort(randomSort);
    questionText.visible = false;
    container.parent.addChild(questionText)
    questionText.scaleX = questionText.scaleY = 1;
    // questionText.x = 377; questionText.y = 107
    if (lang == "GujaratiQuestionText/") {
        questionText.x = 420; questionText.y = 107
    } else if (lang == "ArabicQuestionText/") {
        questionText.x = 420; questionText.y = 107
    }
    else if (lang == "HindiQuestionText/") {
        questionText.scaleX = questionText.scaleY = .9;
        questionText.x = 410;
        questionText.y = 103;
    }
    else {
        questionText.x = 430; questionText.y = 98
    }

    questionText.gotoAndStop(0)

    // qText = new createjs.Text("Select the letter that marks the new position of ", "32px lato-BOLD", "white");
    // qText.x = 633;
    // qText.y = 332;
    // qText.lineWidth = 150;
    // qText.textAlign = "center";
    // container.parent.addChild(qText);
    // qText.visible = false;

    for (i = 0; i < 7; i++) {
        dummyArr[i] = dummy.clone()
        dummyArr[i].x = btnx[i];
        dummyArr[i].y = btny[i];
        container.parent.addChild(dummyArr[i]);
        dummyArr[i].visible = false;
        dummyArr[i].name = i;
        dummyArr[i].gotoAndStop(i)
    }
    container.parent.addChild(question)
    container.parent.addChild(question1)
    for (i = 0; i < 7; i++) {
        quesArr[i] = choice1.clone()
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i]
        quesArr[i].name = "ch" + i;
        container.parent.addChild(quesArr[i]);
        quesArr[i].visible = false;
        quesArr[i].scaleX = quesArr[i].scaleY = .8
    }

    chHolder.visible = false;
    // chHolder.y = -30



    qnoI2 = between(0, 32);

    //  setTimeout(pickques, 1000);

    /*  
    if (isQuestionAllVariations) {
        createGameWiseQuestions()
        setTimeout(pickques, 1000);
    } else {

        setTimeout(pickques, 1000);
    }
    */
}

function helpDisable() {
    for (i = 0; i < 7; i++) {
        quesArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < 7; i++) {
        quesArr[i].mouseEnabled = true;
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
    incr--
    quesCnt++;
    panelVisibleFn()
    questionText.scaleX = questionText.scaleY = 1
    questionText.gotoAndStop(0)
    qnoI1 = between(0, 6);
    qnoI = between(0, 6)
    questionText.visible = false

    for (i = 0; i < 7; i++) {
        quesArr[i].x = sX[i];
        quesArr[i].y = sY[i];
    }
    question.gotoAndStop(qnoI2[cnt]);
    question1.gotoAndStop(qnoI2[incr]);
    question.x = sX1[qnoI1[0]];
    question.y = sY1[qnoI1[0]];
    question1.x = sX1[qnoI1[1]];
    question1.y = sY1[qnoI1[1]];
    question.visible = false;
    question1.visible = false;

    //createjs.Tween.get(question).to({ y: sY[qnoI1[0]] + 30 }, 1000).wait(1000);
    //createjs.Tween.get(question1).to({ y: sY[qnoI1[1]] + 30 }, 1000).wait(1000);
    for (i = 0; i < 7; i++) {
        dummyArr[i].x = btnx2[i];
        dummyArr[i].y = btny2[i];
    }
    CreateTween();
}

function CreateTween() { 
    if (lang == "ArabicQuestionText/") {
        questionText.x = 355; questionText.y = 105
        questionText.scaleX = questionText.scaleY = 1
    }else if (lang == "ArabicQuestionText/") {
        questionText.x = 410;
        questionText.y = 103;
        questionText.scaleX = questionText.scaleY = 1
    }  
    questionText.gotoAndStop(0)
    questionText.visible = true;
    questionText.alpha = 0
    createjs.Tween.get(questionText).wait(200).to({ x: 395, y:103, alpha: 1 }, 200);

    chHolder.x = -1700;
    chHolder.visible = true;
    chHolder.scaleX = chHolder.scaleY = 1.05
    createjs.Tween.get(chHolder).wait(200).
        to({ x: -40, y: 0 }, 500, createjs.Ease.bounceIn);

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
    createjs.Tween.get(question).wait(4000).to({ y: question.y, alpha: 1 }, 500).to({ y: question.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500).call(changechoice1);
    question1.visible = true
    question1.alpha = 0
    createjs.Tween.get(question1).wait(4000).to({ y: question1.y, alpha: 1 }, 500).to({ y: question1.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500);

    var tempVal1 = 1900;
    for (i = 0; i < 7; i++) {
        dummyArr[rand[i]].visible = true
        dummyArr[rand[i]].alpha = 0
        createjs.Tween.get(dummyArr[rand[i]]).wait(tempVal1).to({ x: btnx[rand[i]], y: btny[rand[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
        tempVal1 += 200;
    }

}

function AddListenerFn() {
    //////////////////////////////////////////////////////////////////////////
    //qText.text = "Select the letter against the new position of " //+ fruitArray[qnoI2[incr]] + "  ?";
    question2.gotoAndStop(qnoI2[cnt])

    if (lang == "GujaratiQuestionText/") {
        questionText.x = 420; questionText.y = 107
    }
    else if (lang == "HindiQuestionText/") {
        questionText.x = 380; questionText.y = 115
    }

    else if (lang == "ArabicQuestionText/") {
        questionText.x = 370; questionText.y = 107
        questionText.scaleX = questionText.scaleY = 1.05;
    }

    else {
        questionText.x = 395;
        questionText.y = 98
    }
   

    questionText.gotoAndStop(1)

    question2.visible = true;
    questionText.alpha = .4
    question2.alpha = 0;
    createjs.Tween.get(questionText).wait(200).to({ alpha: 1 }, 200);
    createjs.Tween.get(question2).wait(200).to({ alpha: 1 }, 200);

    ////////////////////////////////////////////////////////////////////////

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
    questionText.visible = false
    rst = 0;
    gameResponseTimerStart();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

    qText.text = "Select the letter against the new position of " //+ fruitArray[qnoI2[incr]] + "  ?";
    question2.gotoAndStop(qnoI2[cnt])
    qText.visible = true;

    question2.visible = true
    for (i = 0; i < 7; i++) {
        dummyArr[i].addEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = true;
        dummyArr[i].cursor = "pointer";
        dummyArr[i].alpha = 1;
    }
}*/
function disablechoices() {
    questionText.visible = false;
    question2.visible = false
    for (i = 0; i < 7; i++) {
        dummyArr[i].removeEventListener("click", answerSelected);
        dummyArr[i].mouseEnabled = false;
        dummyArr[i].cursor = "default";
    }
}
function changechoice1() {
    question.visible = false
    question1.visible = false
    createjs.Tween.get(quesArr[qnoI1[0]]).to({ x: sX[qnoI1[3]], y: sY[qnoI1[3]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[1]]).to({ x: sX[qnoI1[6]], y: sY[qnoI1[6]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[2]]).to({ x: sX[qnoI1[0]], y: sY[qnoI1[0]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[3]]).to({ x: sX[qnoI1[2]], y: sY[qnoI1[2]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[6]]).to({ x: sX[qnoI1[1]], y: sY[qnoI1[1]] }, 300).wait(400).call(changeoption1);
}
function changeoption1() {
    createjs.Tween.get(quesArr[qnoI1[0]]).to({ x: sX[qnoI1[5]], y: sY[qnoI1[5]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[1]]).to({ x: sX[qnoI1[3]], y: sY[qnoI1[3]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[3]]).to({ x: sX[qnoI1[4]], y: sY[qnoI1[4]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[4]]).to({ x: sX[qnoI1[6]], y: sY[qnoI1[6]] }, 300).wait(400);
    createjs.Tween.get(quesArr[qnoI1[5]]).to({ x: sX[qnoI1[2]], y: sY[qnoI1[2]] }, 300).wait(400).call(AddListenerFn);
    ans = qnoI1[5]
}

function onRoll_over(e) {
    e.currentTarget.alpha = .8;
    stage.update();
}
function onRoll_out(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}

function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;

    gameResponseTimerStop();
    // pauseTimer();
    console.log(answer + " =correct= " + uans)
    if (ans == uans) {
        getValidation("correct");
        disablechoices();
    } else {
        getValidation("wrong");
        disablechoices();
    }
}