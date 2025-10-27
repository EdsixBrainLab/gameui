///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, cmnt = -1, ans, uans, interval, time = 18, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,  quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
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

var choiceArr = [];
var choiceArr1 = [];
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
var xArr = [];
var yArr = [];
var tweenMcArr = [];
var choicePos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var qno1 = []
var qno2 = []
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var introImg
var QusTxtString;
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
	call_UI_ambientOverlay(container);
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
    gameAssetsPath = "MemoryCheck-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
 			{ id: "introImg", src: gameAssetsPath + "introImg.png" }, 
            { id: "introImg1", src: gameAssetsPath + "introholder1.png" },
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
   call_UI_gameQuestion(container,"Remember these objects");



    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 60,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 0, "height": 272, "count": 0, "regY": 0, "width": 275 }
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
    qno = between(0, 100)
    qtype.sort(randomSort)

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

   // bg.visible = true
    container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;

    for (i = 0; i < 3; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].visible = false;
        choiceArr[i].scaleX = choiceArr[i].scaleY = 1.2;
    }

    for (i = 0; i < 2; i++) {
        choiceArr1[i] = choice1.clone();
        container.parent.addChild(choiceArr1[i]);
        choiceArr1[i].visible = false;
        choiceArr1[i].scaleX = choiceArr1[i].scaleY = 1.2;
    }

    if (isQuestionAllVariations) {
        qtype = []
        qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]

        // createGameWiseQuestions()
        //  pickques()
    } else {
        //  pickques()
    }

}

function helpDisable() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false;
    }

}

function helpEnable() {

    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = true;
    }
}
//=================================================================================================================================//
function pickques() {
    pauseTimer()
    tx = 0;
    cnt++;
    qscnt++;

    quesCnt++;
    cmnt++
    clk = 0;
    correctCnt = 0;
    chpos = [];

	panelVisibleFn()
    btnx = [160, 790]
    SAUIX_setQuestionText("Remember these objects", { textAlign: "center" });

    qno1 = between(0, 39);

    for (i = 0; i < 2; i++) {
        choiceArr1[i].visible = false;
        choiceArr1[i].gotoAndStop(qno1[i]);
        choiceArr1[i].x = btnx[i]
        choiceArr1[i].y = 240

    }
    createTween();

}
function createTween() {
    QusTxtString.visible = true;
     createjs.Tween.get(QusTxtString).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 2; i++) {
        choiceArr1[i].visible = true;
        choiceArr1[i].y = -400;
    }
    createjs.Tween.get(choiceArr1[0]).wait(100)
        .to({ x: choiceArr1[0].x, y: 240 }, 1500, createjs.Ease.bounceOut)
    createjs.Tween.get(choiceArr1[1]).wait(800)
        .to({ x: choiceArr1[1].x, y: 240 }, 1500, createjs.Ease.bounceOut)

    clearquesInterval = setInterval(createChoices, 5000);

}
function createChoices() {
    console.log("createChoices")
    clearInterval(clearquesInterval)
    clearquesInterval = 0;
  

    for (i = 0; i < 2; i++) {
        choiceArr1[i].visible = false;
    }

    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = false;

    }
    qnoI[cnt] = qtype[cnt]
    switch (qtype[cnt]) {
        case 1:
            SAUIX_setQuestionText("Which of these was not shown?", { textAlign: "center" });
            for (i = 0; i < 3; i++) {
                j = i + 1;
                choiceArr[i].gotoAndStop(qno1[i]);
                choiceArr[i].visible = false;
                console.log(j)
            }
            choiceArr[2].gotoAndStop(qno1[9])

            ans = "ch2";
            console.log("ans" + ans)
            break;
        case 2:
            SAUIX_setQuestionText("Which of these was shown?", { textAlign: "center" });
            choiceArr[0].visible = false;
            choiceArr[1].visible = false;
            choiceArr[2].visible = false;

            choiceArr[0].gotoAndStop(qno1[0])
            choiceArr[1].gotoAndStop(qno1[9]);
            choiceArr[2].gotoAndStop(qno1[10]);

            ans = "ch0";
            console.log("ans" + ans)
            break;
    }

    console.log("len= " + choiceArr.length)
    chpos = between(0, 2);
    console.log(chpos);
    for (i = 0; i < 3; i++) {

        switch (i) {
            case 0:
                choiceArr[chpos[i]].x = 80;
                choiceArr[chpos[i]].y = 240;

                break;
            case 1:
                choiceArr[chpos[i]].x = 505;
                choiceArr[chpos[i]].y = 380;
                break;

            case 2:
                choiceArr[chpos[i]].x = 910;
                choiceArr[chpos[i]].y = 240;
                break;

        }
    }
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

}


function enablechoices() {
    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true;

    }

    createTween1();
}
function createTween1() {
    QusTxtString.visible = true;
     createjs.Tween.get(QusTxtString).wait(100).to({ alpha: 1 }, 1000)

    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha =0;
        
    }
    createjs.Tween.get(choiceArr[1]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[2]).wait(500).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY: 1 }, 500)
    createjs.Tween.get(choiceArr[0]).wait(700).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX:1, scaleY: 1 }, 500)

    repTimeClearInterval = setTimeout(AddListenerFn, 1400)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 0; i < 3; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
        choiceArr[i].cursor = "pointer";
        choiceArr[i].name = "ch" + i;
        choiceArr[i].visible = true;
        choiceArr[i].mouseEnabled = true

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}
function disablechoices() {
    for (i = 0; i < 3; i++) {
        choiceArr[i].alpha = 1
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].cursor = "default";
        choiceArr[i].visible = false
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
        currentX = e.currentTarget.x + 110
        currentY = e.currentTarget.y + 120
        disableMouse()

        for (i = 0; i < 3; i++) {
            choiceArr[i].removeEventListener("click", answerSelected);
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
    for (i = 0; i < 3; i++) {
        choiceArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}
//===========================================================================================//
