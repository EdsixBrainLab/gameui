///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, ans, qscnt = -1, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 2, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline,quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
var isBgSound = true;
var isEffSound = true;
var currentX, currentY
var currentObj = []
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
var qbg2;
var currentX, currentY
var choiceBg, ircle1Outline, question, questionText, question1
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qno1 = []
var chpos = []
var choice1Arr = []
var indxval = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
var choiceChange = [0, 1, 2, 3, 0, 1, 2, 3]
var choice2Arr = []
var btnX = [290, 290]
var btnY = [290, 540]
var btnX1 = [280, 955]
var btnY1 = [545, 545]
var qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
var introImg
var QusTxtString;
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
    gameAssetsPath = "AlphaNumericEncode-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
             
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

    
	
	call_UI_gameQuestion(container,"Look at the associations below");
	

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
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {

    choiceChange.sort(randomSort)

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
    container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;
    container.parent.addChild(choiceBg);
    choiceBg.visible = false;
    question = choice1.clone()
    container.parent.addChild(question);
    question.visible = false;
    // question.scaleX = question.scaleY = 1.3
    question1 = choice2.clone()
    question1.scaleX = question1.scaleY = .7
    container.parent.addChild(question1);
    question1.visible = false;
    // question1.scaleX = question1.scaleY = 1.3
    for (i = 0; i < 2; i++) {
        choice1Arr[i] = choice1.clone()
        container.parent.addChild(choice1Arr[i])
        choice1Arr[i].visible = false;
        choice1Arr[i].scaleX = choice1Arr[i].scaleY = 1
        choice2Arr[i] = choice2.clone()
        container.parent.addChild(choice2Arr[i])
        choice2Arr[i].visible = false;
        choice2Arr[i].scaleX = choice2Arr[i].scaleY = 1
    }

     if (isQuestionAllVariations) {
          createGameWiseQuestions()
          indxval = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2,1, 2, 1, 2, 1, 2, 1, 2, 1, 2,1, 2, 1, 2, 1, 2, 1, 2, 1, 2,1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
          //   pickques()
      } else {
        indxval = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        qtype = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        //   pickques()
      }
      qtype.sort(randomSort)
      indxval.sort(randomSort)
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
    //=================================================================================================================================//

     
    qno = between(0, 34);
    qno1 = between(0, 34);
    for (i = 0; i < 2; i++) {
        choice1Arr[i].visible = false;
        choice2Arr[i].visible = false;
        choice1Arr[i].gotoAndStop(qno[i])
        choice2Arr[i].gotoAndStop(qno1[i])
        choice1Arr[i].x = btnX[i]
        choice2Arr[i].x = btnX[i] + 645
        choice1Arr[i].y = btnY[i]
        choice2Arr[i].y = btnY[i] 
    }
    createTween();
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////
   
    QusTxtString.visible = true;
     
    choiceBg.visible = true;
    choiceBg.alpha = 0;
    createjs.Tween.get(choiceBg).wait(100).to({ alpha: 1 }, 500)
    for (i = 0; i < 2; i++) {
        choice1Arr[i].visible = true;
        choice2Arr[i].visible = true;
        choice1Arr[i].alpha = 0;
        choice2Arr[i].alpha = 0;

    }
    createjs.Tween.get(choice1Arr[0]).wait(200).to({ alpha: 0, scaleX:1.25, scaleY:1.25 }, 500).to({ alpha: 1, scaleX:1.3, scaleY:1.3 }, 500)
    createjs.Tween.get(choice2Arr[0]).wait(200).to({ alpha: 0, scaleX:1.25, scaleY:1.25 }, 500).to({ alpha: 1, scaleX:1.3, scaleY:1.3 }, 500)
    createjs.Tween.get(choice1Arr[1]).wait(900).to({ alpha: 0, scaleX:1.25, scaleY:1.25 }, 500).to({ alpha: 1, scaleX:1.3, scaleY:1.3 }, 500)
    createjs.Tween.get(choice2Arr[1]).wait(900).to({ alpha: 0, scaleX:1.25, scaleY:1.25 }, 500).to({ alpha: 1, scaleX:1.3, scaleY:1.3 }, 500)

   clearquesInterval = setInterval(createChoices, 5000);

}
function createChoices() {
    createjs.Tween.removeAllTweens();
    clearInterval(clearquesInterval)
    clearquesInterval = 0

       choiceBg.visible = false;
    for (i = 0; i < 2; i++) {
        choice1Arr[i].visible = false;
        choice2Arr[i].visible = false;
    }

    QusTxtString.visible = false;
    if (indxval[cnt] == 0) {
        chpos.push(0, 1)
    }
    else {
        chpos.push(1, 0)
    }

    var rand = range(0, 1)

    if (qtype[cnt] == 1) {
		SAUIX_setQuestionText("Select the correct symbol that was associated with the letter/number", { textAlign: "center" });
        question1.visible = false
        question.visible = false
        question1.gotoAndStop(qno1[rand]);
        ans = qno[rand]
        question1.x = 605
        question1.y = 290

    } else {
		SAUIX_setQuestionText("Select the correct letter/number that was associated with the symbol", { textAlign: "center" });
        question.visible = false
        question1.visible = false
        question.gotoAndStop(qno[rand]);
        ans = qno1[rand]
        question.x = 610
        question.y = 280
    }
   
     enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}

//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    console.log("entered")
    stopChoiceAnimations();
    if (qtype[cnt] == 1) {
        for (i = 0; i < 2; i++) {
            choice1Arr[i].visible = false
            choice1Arr[i].gotoAndStop(qno[chpos[i]])
            choice1Arr[i].name = qno[chpos[i]]
            choice1Arr[i].x = btnX1[i]
            choice1Arr[i].y = btnY1[i]
            choice1Arr[i].baseScale = 1.3

        }
    } else {
        for (i = 0; i < 2; i++) {
            choice2Arr[i].visible = false
            choice2Arr[i].gotoAndStop(qno1[chpos[i]])
            choice2Arr[i].name = qno1[chpos[i]]
            choice2Arr[i].x = btnX1[i]
            choice2Arr[i].y = btnY1[i]
            choice2Arr[i].baseScale = 1.3
        }
    }
    createTween1();
}
function createTween1() {
    QusTxtString.visible = true;



    if (qtype[cnt] == 1) {
        question1.visible = true
        question.visible = false
        animateQuestionPrompt(question1, 1.5, 200)

    } else {
        question.visible = true
        question1.visible = false
        animateQuestionPrompt(question, 1.5, 200)
    }
    if (qtype[cnt] == 1) {
        animateChoiceEntry(choice1Arr[0], 1.3, 510, 480)
        animateChoiceEntry(choice1Arr[1], 1.3, 510, 620)
    } else {
        console.log("122222222222222222222222222222222222222222222")
        animateChoiceEntry(choice2Arr[0], 1.3, 520, 520)
        animateChoiceEntry(choice2Arr[1], 1.3, 520, 660)
    }
    repTimeClearInterval = setTimeout(AddListenerFn, 2500)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    if (qtype[cnt] == 1) {
        for (i = 0; i < 2; i++) {
            choice1Arr[i].addEventListener("click", answerSelected)
            choice1Arr[i].addEventListener("mouseover", onChoiceHover)
            choice1Arr[i].addEventListener("mouseout", onChoiceOut)
            choice1Arr[i].mouseEnabled = true
            choice1Arr[i].cursor = "pointer"
        }
    } else {
        for (i = 0; i < 2; i++) {
            choice2Arr[i].addEventListener("click", answerSelected)
            choice2Arr[i].addEventListener("mouseover", onChoiceHover)
            choice2Arr[i].addEventListener("mouseout", onChoiceOut)
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
    stopChoiceAnimations();
    QusTxtString.visible = false
    for (i = 0; i < 2; i++) {
        choice1Arr[i].visible = false
        choice2Arr[i].visible = false
        choice1Arr[i].removeEventListener("click", answerSelected)
        choice2Arr[i].removeEventListener("click", answerSelected)
        choice1Arr[i].removeEventListener("mouseover", onChoiceHover)
        choice1Arr[i].removeEventListener("mouseout", onChoiceOut)
        choice2Arr[i].removeEventListener("mouseover", onChoiceHover)
        choice2Arr[i].removeEventListener("mouseout", onChoiceOut)
        choice1Arr[i].mouseEnabled = false
        choice2Arr[i].mouseEnabled = false
        choice1Arr[i].cursor = "default"
        choice2Arr[i].cursor = "default"
    }

    question.visible = false
    question1.visible = false
}

function answerSelected(e) {
    e.preventDefault();

    uans = e.currentTarget.name;
    console.log("uans= " + uans)

    gameResponseTimerStop();
    console.log(uans + "  == " + uans)

    if (ans == uans) {
        e.currentTarget.visible = true;
        disableMouse()
        for (i = 0; i < 2; i++) {
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
        for (i = 0; i < 2; i++) {
            choice1Arr[i].mouseEnabled = false
        }
    } else {
        for (i = 0; i < 2; i++) {
            choice2Arr[i].mouseEnabled = false
        }
    }
}

function enableMouse() {

}

function animateQuestionPrompt(target, baseScale, delay) {
    if (!target) { return; }
    target.alpha = 0;
    target.scaleX = target.scaleY = baseScale * 0.85;
    target.rotation = 0;
    createjs.Tween.get(target, { override: true })
        .wait(delay)
        .to({ alpha: 1, scaleX: baseScale * 1.05, scaleY: baseScale * 1.05 }, 350, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 260, createjs.Ease.quadInOut);
}

function animateChoiceEntry(choiceMc, baseScale, finalY, delay) {
    if (!choiceMc) { return; }
    choiceMc.baseScale = baseScale;
    choiceMc.rotation = 0;
    choiceMc.y = -220;
    choiceMc.visible = true;
    choiceMc.alpha = 0;
    choiceMc.scaleX = choiceMc.scaleY = baseScale * 0.7;
    createjs.Tween.get(choiceMc, { override: true })
        .wait(delay)
        .to({ alpha: 1, y: finalY + 28, scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 360, createjs.Ease.quadOut)
        .to({ y: finalY, scaleX: baseScale, scaleY: baseScale }, 280, createjs.Ease.bounceOut)
        .call(function () {
            startChoiceIdleAnimation(choiceMc);
        });
}

function startChoiceIdleAnimation(choiceMc) {
    if (!choiceMc) { return; }
    var baseScale = choiceMc.baseScale || 1;
    choiceMc.rotation = 0;
    createjs.Tween.get(choiceMc, { loop: true, override: true })
        .to({ scaleX: baseScale * 1.05, scaleY: baseScale * 0.94, rotation: 4 }, 300, createjs.Ease.sineInOut)
        .to({ scaleX: baseScale * 0.96, scaleY: baseScale * 1.04, rotation: -4 }, 340, createjs.Ease.sineInOut)
        .to({ scaleX: baseScale, scaleY: baseScale, rotation: 0 }, 280, createjs.Ease.sineInOut);
}

function stopChoiceAnimations() {
    for (i = 0; i < 2; i++) {
        if (choice1Arr[i]) {
            createjs.Tween.removeTweens(choice1Arr[i]);
            if (choice1Arr[i].baseScale) {
                choice1Arr[i].scaleX = choice1Arr[i].scaleY = choice1Arr[i].baseScale;
            }
            choice1Arr[i].rotation = 0;
        }
        if (choice2Arr[i]) {
            createjs.Tween.removeTweens(choice2Arr[i]);
            if (choice2Arr[i].baseScale) {
                choice2Arr[i].scaleX = choice2Arr[i].scaleY = choice2Arr[i].baseScale;
            }
            choice2Arr[i].rotation = 0;
        }
    }
}

function onChoiceHover(e) {
    var target = e.currentTarget;
    if (!target) { return; }
    var baseScale = target.baseScale || 1.3;
    createjs.Tween.removeTweens(target);
    createjs.Tween.get(target, { override: true })
        .to({ scaleX: baseScale * 1.12, scaleY: baseScale * 0.9, rotation: 0 }, 180, createjs.Ease.quadOut);
}

function onChoiceOut(e) {
    var target = e.currentTarget;
    if (!target) { return; }
    var baseScale = target.baseScale || 1.3;
    createjs.Tween.removeTweens(target);
    createjs.Tween.get(target, { override: true })
        .to({ scaleX: baseScale, scaleY: baseScale, rotation: 0 }, 200, createjs.Ease.quadOut)
        .call(function () {
            startChoiceIdleAnimation(target);
        });
}
