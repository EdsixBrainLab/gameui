///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 240, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var currentX, currentY
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var count;
var rand
var rand1 = []
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var choiceArr = [];
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
    gameAssetsPath = "AnimalWatch-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            //////////////////////intro///////////////////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            /////////////////////////////////////////////////////////////
            { id: "choice1", src: gameAssetsPath + "choiceImages1.png" },
            { id: "choice2", src: gameAssetsPath + "choiceImages2.png" },
            { id: "choice3", src: gameAssetsPath + "choiceImages3.png" },
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "questiontext", src: questionTextPath + "AnimalWatch-Level2-QT.png" }

        )
        preloadAllAssets()
        stage.update();
    }
}
//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }
    if (id == "choice1" || id == "choice2" || id == "choice3") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet2);
        choice1.visible = false;
        container.parent.addChild(choice1);
        choice1.x = 400; choice1.y = 400;

        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice2")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice2 = new createjs.Sprite(spriteSheet3);
        choice2.visible = false;
        container.parent.addChild(choice2);
        choice2.x = 700; choice2.y = 400;

        var spriteSheet4 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice3")],
            "frames": { "regX": 50, "height": 334, "count": 0, "regY": 50, "width": 334 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice3 = new createjs.Sprite(spriteSheet4);
        choice3.visible = false;
        container.parent.addChild(choice3);
        choice3.x = 750; choice3.y = 470;


    };

    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 367, "count": 0, "regY": 50, "width": 1005 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        question = new createjs.Sprite(spriteSheet1);
        question.visible = false;
        container.parent.addChild(question);

    };

    if (id == "questiontext") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questiontext")],
            "frames": { "regX": 50, "height": 82, "count": 0, "regY": 50, "width": 638 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        questiontext = new createjs.Sprite(spriteSheet1);
        questiontext.visible = false;
        container.parent.addChild(questiontext);

    };

}

function tick(e) {

    stage.update();
}

/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 9);
    console.log(qno)
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

    container.parent.addChild(questiontext);
    questiontext.visible = false;
    questiontext.x = 380; questiontext.y = 110;

    container.parent.addChild(question);
    question.visible = false;
    question.scaleX = question.scaleY = 1.2;
    question.x = 110; question.y = 310;


    container.parent.addChild(choice1, choice2, choice3)
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].visible = false;
    }

    choice1.x = 133;
    choice1.y = choice2.y = choice3.y = 300;
    choice2.x = 523;
    choice3.x = 913;

    /*if(isQuestionAllVariations){
        createGameWiseQuestions()     
        pickques()
    }else{
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
    panelVisibleFn()
    questiontext.visible = false
    questiontext.gotoAndStop(10);
    question.gotoAndStop(qno[cnt]);
    question.visible = false;



    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

    createTween()

}
function createTween() {

    questiontext.visible = true;
    questiontext.alpha = 0
    questiontext.scaleX = .99
    createjs.Tween.get(questiontext).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)



    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    ///////////////////////////choice tween////////////////////////////////////



    showDuration = setInterval(showQuestion, 5000);



}
function showQuestion() {
    clearInterval(showDuration)
    pauseTimer()
    question.visible = false;

    questiontext.gotoAndStop(qno[cnt])
    questiontext.visible = false
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

    enablechoices();
}

function enablechoices() {
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].name = "ch" + i
        this["choice" + i].visible = false;
        this["choice" + i].alpha = 1;
        this["choice" + i].mouseEnabled = true
        this["choice" + i].cursor = "pointer";
    }
    createTween1()



}
function createTween1() {

    questiontext.visible = true;
    questiontext.alpha = 0
    questiontext.scaleX = .99
    createjs.Tween.get(questiontext).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)



    ///////////////////////////choice tween////////////////////////////////////


    var val = 700
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].y = -500
        this["choice" + i].visible = true;
        this["choice" + i].alpha = 1;
        createjs.Tween.get(this["choice" + i]).wait(val).to({ y: 330 }, val, createjs.Ease.bounceOut)
        val = val + 150
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3000)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].addEventListener("click", answerSelected);
    }


    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].removeEventListener("click", answerSelected);
        this["choice" + i].visible = false;
        this["choice" + i].alpha = .5;
        this["choice" + i].cursor = "default";
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

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + i].mouseEnabled = false
    }
}

function enableMouse() {

}

