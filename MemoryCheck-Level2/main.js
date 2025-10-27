///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, cmnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,  quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0,puzzle_cycle,timeOver_Status=0;//for db //q
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

var choiceArr = [];
var choiceMcArr = []
var posArr = []
var qno = [];
var pos = []
var qno1 = []

var ansArr = ["", 1, 2, 3]

var btnx = []
var btny = []

var btnPadding = 50;


///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qnoI = [];
var choiceArr = [];
var choiceArr1 = []
var xArr = [];
var yArr = [];
var tweenMcArr = [];
var choicePos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var qno1 = []
var qno2 = []
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var introImg,introImg1
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
    gameAssetsPath = "MemoryCheck-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
          
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "questionText", src:  questionTextPath + "MemoryCheck-Level2-QT.png" },
			{ id: "introImg", src: gameAssetsPath + "introImg.png" },
            { id: "introImg1", src: gameAssetsPath + "introholder1.png" }
       
        )
        preloadAllAssets()
        stage.update();
    }
}
//====================================================//


function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
  
    if (id == "introImg") {

		introImg = new createjs.Bitmap(preload.getResult('introImg'));
		container.parent.addChild(introImg);
		introImg.visible = false;
    }
    if (id == "introImg1") {

		introImg1 = new createjs.Bitmap(preload.getResult('introImg1'));
		container.parent.addChild(introImg1);
		introImg1.visible = false;
	}
    if (id == "questionText") {
        var quesTextSprisheet = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 134, "count": 64, "regY": 50, "width": 650 }
        });

        questionText = new createjs.Sprite(quesTextSprisheet);
        container.parent.addChild(questionText);
        questionText.visible = false;

    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 255, "count": 0, "regY": 0, "width": 255 }
        });
        choice1 = new createjs.Sprite(spriteSheet1);
        choice1.visible = false;
        container.parent.addChild(choice1);
    }

   }

function tick(e) {

    stage.update();
}

/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////


function handleClick(e) {
    qno=between(0,100)
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
    //bg.visible = true
    container.parent.addChild(questionText);
    questionText.visible = false;
    questionText.x = 360; questionText.y = 120;

    for (i = 0; i < 3; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].visible = false;

    }
    for (i = 0; i < 4; i++) {
        choiceArr1[i] = choice1.clone();
        container.parent.addChild(choiceArr1[i]);
        choiceArr1[i].visible = false;

    }

  if (isQuestionAllVariations) {
        qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
       // createGameWiseQuestions()
        //pickques()
    } else {
        qtype.sort(randomSort)
      //  pickques()
    }
}

function helpDisable() {
    for (i = 0; i < 4; i++) {
        choiceArr1[i].mouseEnabled = false;
    }

}

function helpEnable() {

    for (i = 0; i < 4; i++) {
        choiceArr1[i].mouseEnabled = true;
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
    cmnt++
    clk = 0;
    correctCnt = 0;
    chpos = [];

	panelVisibleFn()
    btnx = [60, 474, 890]
    btny = [250, 250, 250]
    questionText.gotoAndStop(0);

    qno1 = between(0, 39);

    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = false;
        choiceArr[i].gotoAndStop(qno1[i]);
        choiceArr[i].x = btnx[i]
        choiceArr[i].y = 270
        choiceArr[i].scaleX = choiceArr[i].scaleY = 1.3
    }
    createTween();

}
function createTween() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].y = -400;
    }
    createjs.Tween.get(choiceArr[0]).wait(100)
        .to({ x: choiceArr[0].x, y: 270 }, 1500, createjs.Ease.bounceOut)
    createjs.Tween.get(choiceArr[1]).wait(800)
        .to({ x: choiceArr[1].x, y: 270 }, 1500, createjs.Ease.bounceOut)
    createjs.Tween.get(choiceArr[2]).wait(1500)
        .to({ x: choiceArr[2].x, y: 270 }, 1500, createjs.Ease.bounceOut)

    clearquesInterval = setInterval(createChoices, 4000);
}
function createChoices() {
    console.log("createChoices")
    clearInterval(clearquesInterval)
    clearquesInterval = 0;
 
    
    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = false;

    }
    for (i = 0; i < 4; i++) {
        choiceArr1[i].visible = false;

    }

    switch (qtype[cnt]) {
        case 1:
            questionText.gotoAndStop(1);
            for (i = 0; i < 4; i++) {
                j = i + 1;
                choiceArr1[i].gotoAndStop(qno1[i]);
                choiceArr1[i].visible = false;
                choiceArr1[i].scaleX = choiceArr1[i].scaleY = 1.1
                console.log(j)
            }
            choiceArr1[3].gotoAndStop(qno1[9])

            ans = "ch3";
            console.log("ans" + ans)
            break;
        case 2:
            questionText.gotoAndStop(2);
            choiceArr1[0].visible = false;
            choiceArr1[1].visible = false;
            choiceArr1[2].visible = false;
            choiceArr1[3].visible = false;

            choiceArr1[0].scaleX = choiceArr1[0].scaleY = 1.1
            choiceArr1[1].scaleX = choiceArr1[1].scaleY = 1.1
            choiceArr1[2].scaleX = choiceArr1[2].scaleY = 1.1
            choiceArr1[3].scaleX = choiceArr1[3].scaleY = 1.1

            choiceArr1[0].gotoAndStop(qno1[0])
            choiceArr1[1].gotoAndStop(qno1[9]);
            choiceArr1[2].gotoAndStop(qno1[10]);
            choiceArr1[3].gotoAndStop(qno1[11]);

            ans = "ch0";
            console.log("ans" + ans)
            break;
    }

    console.log("len= " + choiceArr1.length)
    chpos = between(0, 3);
    console.log(chpos);
    for (i = 0; i < 4; i++) {

        switch (i) {
            case 0:
                choiceArr1[chpos[i]].x = 35;
                choiceArr1[chpos[i]].y = 280;

                break;
            case 1:
                choiceArr1[chpos[i]].x = 345;
                choiceArr1[chpos[i]].y = 280;
                break;

            case 2:
                choiceArr1[chpos[i]].x = 655;
                choiceArr1[chpos[i]].y = 280;
                break;
            case 3:
                choiceArr1[chpos[i]].x = 965;
                choiceArr1[chpos[i]].y = 280;
                break;
        }
    }
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}


function enablechoices() {
    for (i = 0; i < 4; i++) {
        choiceArr1[i].name = "ch" + i;
        choiceArr1[i].visible = false;

    }
    createTween1();
}
function createTween1() {
    questionText.visible = true;
    questionText.alpha = 0;
    createjs.Tween.get(questionText).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 4; i++) {
        choiceArr1[i].visible = false;
        choiceArr1[i].alpha = 0;
        choiceArr1[i].scaleX= choiceArr1[i].scaleY=1.1

    }
    createjs.Tween.get(choiceArr1[0]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 200).to({alpha:0.5,rotation:180},200)
        .to({ visible: true, alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 200,createjs.Ease.bounceIn).to({alpha:1,rotation:360},200)
        .to({ visible: true, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200,createjs.Ease.bounceIn)
        createjs.Tween.get(choiceArr1[1]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 200).to({alpha:0.5,rotation:180},200)
        .to({ visible: true, alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 200,createjs.Ease.bounceIn).to({alpha:1,rotation:360},200)
        .to({ visible: true, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200,createjs.Ease.bounceIn)
        createjs.Tween.get(choiceArr1[2]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 200).to({alpha:0.5,rotation:180},200)
        .to({ visible: true, alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 200,createjs.Ease.bounceIn).to({alpha:1,rotation:360},200)
        .to({ visible: true, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200,createjs.Ease.bounceIn)
        createjs.Tween.get(choiceArr1[3]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 200).to({alpha:0.5,rotation:180},200)
        .to({ visible: true, alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 200,createjs.Ease.bounceIn).to({alpha:1,rotation:360},200)
        .to({ visible: true, alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200,createjs.Ease.bounceIn)

    repTimeClearInterval = setTimeout(AddListenerFn, 2000)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 0; i < 4; i++) {
        choiceArr1[i].addEventListener("click", answerSelected);
        choiceArr1[i].cursor = "pointer";
        choiceArr1[i].name = "ch" + i;
        choiceArr1[i].visible = true;
        choiceArr1[i].mouseEnabled = true

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    for (i = 0; i < 4; i++) {
        choiceArr1[i].alpha = 1
        choiceArr1[i].removeEventListener("click", answerSelected);
        choiceArr1[i].cursor = "default";
        choiceArr1[i].visible = false
    }

}

function onRoll_over(e) {
    e.currentTarget.alpha = .5
    stage.update();
}
function onRoll_out(e) {
    e.currentTarget.alpha = 1
    stage.update();
}

function answerSelected(e) {
    clk++;
    e.preventDefault();
    gameResponseTimerStop();
    uans = e.currentTarget.name;
    e.currentTarget.removeEventListener(answerSelected);
    if (ans == uans) {
        currentX = e.currentTarget.x + 85
        currentY = e.currentTarget.y +90
        disableMouse()
        for (i = 0; i < 4; i++) {
            choiceArr1[i].removeEventListener("click", answerSelected);
        }
        
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
    for (i = 0; i < 4; i++) {
        choiceArr1[i].mouseEnabled = false
    }
}

function enableMouse() {

}
//===========================================================================================//
