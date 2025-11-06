// ///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////

var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 3, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var currentX
var currentY
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var qnoI = []
var chpos = [];
var quesArr = []
var chposArr = []
var choiceArr = []
var currentObj = []

var choicePos = []
var clr, clr1, clr2, clrin1, clrin2, clrin3
var qno1 = []
var qno2 = []
var tweenMcArr1 = []
var tweenMcArr2 = []
var tweenMcArr3 = []
var pos = []
var chholderarr = []
var directionarr = []
var colorarr = []



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

    loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
    loaderBar = new createjs.Container();
    var txt = new createjs.Container();
    bar = new createjs.Shape();
    bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 300;
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
    gameAssetsPath = "BasketBall-Level2/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(

            //////////////////////////////////intro////////////////
            { id: "holder", src: gameAssetsPath + "holder.png" },
            ///////////////////////////////////////////////////////////
            { id: "Basket", src: gameAssetsPath + "Basket.png" },
            { id: "Basket1", src: gameAssetsPath + "Basket1.png" },
            { id: "Basket2", src: gameAssetsPath + "Basket2.png" },
            { id: "questionText", src: questionTextPath + "BasketBall-Level2-QT.png" },
            { id: "direction", src: questionTextPath + "BasketBall-Level2-QT2.png" },
            { id: "color", src: questionTextPath + "BasketBall-Level2-QT1.png" },
           // { id: "chholder", src: gameAssetsPath + "ChoiceHolder.png" },
           // { id: "chholder1", src: gameAssetsPath + "ChoiceHolder1.png" },
            { id: "question", src: gameAssetsPath + "question1.png" }

        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;

    }

    // if (id == "chholder") {
        // chholder = new createjs.Bitmap(preload.getResult('chholder'));
        // container.parent.addChild(chholder);
        // chholder.visible = false;
    // }
    // if (id == "chholder1") {
        // chholder1 = new createjs.Bitmap(preload.getResult('chholder1'));
        // container.parent.addChild(chholder1);
        // chholder1.visible = false;
    // }
    if (id == "Basket") {
        Basket = new createjs.Bitmap(preload.getResult('Basket'));
        container.parent.addChild(Basket);
        Basket.visible = false;
    }
    if (id == "Basket1") {
        Basket1 = new createjs.Bitmap(preload.getResult('Basket1'));
        container.parent.addChild(Basket1);
        Basket1.visible = false;
    }
    if (id == "Basket2") {
        Basket2 = new createjs.Bitmap(preload.getResult('Basket2'));
        container.parent.addChild(Basket2);
        Basket2.visible = false;

    }
    if (id == "color") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("color")],
            "frames": { "regX": 50, "height": 73, "count": 0, "regY": 50, "width": 167 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        color = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(color);
        color.visible = false;
        //			 
    }
    if (id == "direction") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("direction")],
            "frames": { "regX": 50, "height": 73, "count": 0, "regY": 50, "width": 167 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        direction = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(direction);
        direction.visible = false;
        //			 
    }
    if (id == "question") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 126, "count": 0, "regY": 50, "width": 127 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;
        //			 
    }

    if (id == "questionText") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questionText")],
            "frames": { "regX": 50, "height": 114, "count": 0, "regY": 50, "width": 756 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        questionText = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(questionText);
        questionText.visible = false;
        //			 
    }


}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////=======CREATION OF GAME ELEMENTS========///////////////////////////////////////////////////////////////////
function CreateGameElements() {
    interval = setInterval(countTime, 1000);

    container.parent.addChild(questionText);
    questionText.visible = false;
    questionText.x = 305; questionText.y = 75



    // container.parent.addChild(chholder1);
    // chholder1.visible = false;
    // chholder1.x = chholder1.x - 10

    container.parent.addChild(Basket2);
    Basket2.visible = false;
    Basket2.y = Basket2.y + 110

    container.parent.addChild(Basket);
    Basket.visible = false;
    Basket.y = Basket.y - 15

    for (i = 0; i < choiceCnt; i++) {
        quesArr[i] = choice1.clone()
        container.parent.addChild(quesArr[i])
        quesArr[i].x = 627
        quesArr[i].y = 800
        quesArr[i].visible = false;

    }
    container.parent.addChild(Basket1);
    Basket1.visible = false;
    Basket1.y = Basket1.y - 7
   // Basket1.y = -8

    for (i = 0; i < choiceCnt; i++) {
        directionarr[i] = direction.clone()
        container.parent.addChild(directionarr[i]);
        directionarr[i].visible = false;
        directionarr[i].scaleX = directionarr[i].scaleY = 1
    }
    directionarr[0].x = 444; directionarr[0].y = 300
    directionarr[1].x = 605; directionarr[1].y = 455
    directionarr[2].x = 763; directionarr[2].y = 300

    for (i = 0; i < choiceCnt; i++) {
        colorarr[i] = color.clone()
        container.parent.addChild(colorarr[i]);
        colorarr[i].visible = false;
        colorarr[i].scaleX = 1
        colorarr[i].scaleY = 1
    }
    colorarr[0].x = 445; colorarr[0].y = 300
    colorarr[1].x = 607; colorarr[1].y = 460
    colorarr[2].x = 762; colorarr[2].y = 300

    // for (i = 0; i < choiceCnt; i++) {
        // chholderarr[i] = chholder.clone()
        // container.parent.addChild(chholderarr[i]);
        // chholderarr[i].visible = false;
        // chholderarr[i].x = -285 + (i * 350); chholderarr[i].y = 50
        // chholderarr[i].scaleX = .9
        // chholderarr[i].scaleY = .9
    // }

    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i] = choice1.clone()
        container.parent.addChild(choiceArr[i])
        choiceArr[i].name = "ch" + i;
        choiceArr[i].x = 275 + (i * 350); choiceArr[i].y = 390
        choiceArr[i].scaleX = 1
        choiceArr[i].scaleY = 1
        choiceArr[i].visible = false;

    }


    if (isQuestionAllVariations) {

        choicePos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0]//25
        choicePos.sort(randomSort)
        pos = [0, 1, 6, 2, 6, 3, 4, 6, 5, 6, 0, 1, 6, 2, 6, 3, 4, 6, 5, 6, 0, 1, 6, 2, 6, 3, 4, 6, 5, 6, 2, 6, 3, 4, 6, 5, 6]
        pos.sort(randomSort);

    } else {
        choicePos = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
        choicePos.sort(randomSort)
        pos = [0, 1, 6, 2, 6, 3, 4, 6, 5, 6]
        pos.sort(randomSort);

    }
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
var a, temp1, temp2, temp3, temp4;
var rand1 = [];
function pickques() {
      //for db
      tx = 0;
      qscnt++;
      //db
    cnt++;
    quesCnt++;
    chposArr = []
    currentObj = []
    attemptCnt = 0

    pauseTimer()
    panelVisibleFn()
   
    
    //=================================================================

    qnoI = between(0, 6);
    qno1 = between(0, 2);

    questionText.visible = true;
    questionText.gotoAndStop(0)
    questionText.x = 305; questionText.y = 75
    Basket2.visible = true;
    Basket.visible = true;
    Basket1.visible = false;
    for (i = 0; i < choiceCnt; i++) {
        quesArr[i].gotoAndStop(qnoI[i])
        quesArr[i].visible = false;
        quesArr[i].x = 627
        quesArr[i].y = 800

    }


    if (qno1[0] == 0) {
        clr = setInterval(ball, 100);

        a = 0;
    }
    else if (qno1[0] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 0;
    }
    else if (qno1[0] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 0;
    }



}
function step2() {
    clearInterval(clrin1);
    quesArr[a].visible = false;
    Basket1.visible = false;
    if (qno1[1] == 0) {
        clr = setInterval(ball, 100);
        a = 1;
    }
    else if (qno1[1] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 1;
    }
    else if (qno1[1] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 1;
    }
}
function step3() {
    clearInterval(clrin2);
    quesArr[a].visible = false;
    Basket1.visible = false;
    if (qno1[2] == 0) {
        clr = setInterval(ball, 100);
        a = 2;
    }
    else if (qno1[2] == 1) {
        clr1 = setInterval(balllf, 100);
        a = 2;
    }
    else if (qno1[2] == 2) {
        clr2 = setInterval(ballrt, 100);
        a = 2;
    }

}
function ball() {
    clearInterval(clr);
    quesArr[a].visible = true;
    tweenMcArr1[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr1[0])
    container.parent.addChild(Basket1)
    Basket1.visible = false;
    temp1 = a;

    tweenMcArr1[0] = createjs.Tween.get(quesArr[a]).to({ y: 800 }, 300).to({ y: 550 }, 300).to({ y: 350 }, 300).to({ y: 220 }, 300).call(this.onComplete)
}


this.onComplete = function (e) {

    console.log("nextball")
    Basket1.visible = true;

    tweenMcArr1[0] = createjs.Tween.get(quesArr[a]).to({ y: quesArr[a].y }).to({ y: quesArr[a].y + 450 }, 450).to({ y: quesArr[a].y + 750 }, 350).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1300);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1000);
    }
    else {
        clrin3 = setInterval(enablechoices, 1300);


    }

}
function balllf() {
    clearInterval(clr1);
    quesArr[a].visible = true;
    tweenMcArr2[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr2[0])
    temp2 = a;

    tweenMcArr2[0] = createjs.Tween.get(quesArr[a]).to({ x: 627, y: 800 }, 300).to({ x: 550, y: 600 }, 300).to({ x: 450, y: 400 }, 300).to({ x: 350, y: 250 }, 300)
        .to({ x: 250, y: 400 }, 300).to({ x: 210, y: 800 }, 300).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1800);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1800);
    }
    else {
        clrin3 = setInterval(enablechoices, 1800);


    }
}

function ballrt() {
    clearInterval(clr2);
    quesArr[a].visible = true;
    tweenMcArr3[0] = new createjs.MovieClip()
    container.parent.addChild(tweenMcArr3[0])
    temp3 = a;

    tweenMcArr3[0] = createjs.Tween.get(quesArr[a]).to({ x: 627, y: 800 }, 300).to({ x: 750, y: 600 }, 300).to({ x: 850, y: 300 }, 300).to({ x: 950, y: 200 }, 300)
        .to({ x: 1000, y: 400 }, 300).to({ x: 1050, y: 800 }, 300).wait(400);
    if (a == 0) {
        clrin1 = setInterval(step2, 1800);
    }
    else if (a == 1) {
        clrin2 = setInterval(step3, 1800);
    }
    else {
        clrin3 = setInterval(enablechoices, 1800);


    }
}


//====================================================================CHOICE ENABLE/DISABLE==============================================================//

function enablechoices() {
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

    rand1 = []


    quesArr[a].visible = false;
    clearInterval(clrin3);
    questionText.visible = true;
    questionText.x = 305; questionText.y = 75
    Basket.visible = false;
    Basket1.visible = false;
    Basket2.visible = false;

    if (pos[cnt] == 0) {
        questionText.gotoAndStop(1)
       // chholder1.visible = true;
        rand1 = between(0, 6);
        temp1 = qnoI[temp1];
        var b = rand1.indexOf(temp1);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {

            colorarr[i].visible = true;
            colorarr[i].gotoAndStop(rand1[i])
            colorarr[i].name = i
        }
        colorarr[choicePos[cnt]].gotoAndStop(temp1);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].mouseEnabled = true;
            colorarr[i].cursor = "pointer";
            colorarr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 1) {
        questionText.gotoAndStop(2)
        //chholder1.visible = true;
        rand1 = between(0, 6);
        temp2 = qnoI[temp2];
        var b = rand1.indexOf(temp2);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {

            colorarr[i].visible = true;
            colorarr[i].gotoAndStop(rand1[i])
            colorarr[i].name = i
        }
        colorarr[choicePos[cnt]].gotoAndStop(temp2);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].mouseEnabled = true;
            colorarr[i].cursor = "pointer";
            colorarr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 2) {
        questionText.gotoAndStop(3)
        //chholder1.visible = true;
        rand1 = between(0, 6);
        temp3 = qnoI[temp3];
        var b = rand1.indexOf(temp3);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].visible = true;
            colorarr[i].gotoAndStop(rand1[i])
            colorarr[i].name = i
        }
        colorarr[choicePos[cnt]].gotoAndStop(temp3);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].mouseEnabled = true;
            colorarr[i].cursor = "pointer";
            colorarr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 3) {
        questionText.gotoAndStop(5)
        rand1 = between(0, 6);
        temp1 = qnoI[temp1];
        var b = rand1.indexOf(temp1);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
           // chholderarr[i].visible = true;
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp1);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].mouseEnabled = true;
            choiceArr[i].cursor = "pointer";
            choiceArr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 4) {
        questionText.gotoAndStop(6)
        rand1 = between(0, 6);
        temp2 = qnoI[temp2];
        var b = rand1.indexOf(temp2);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
           // chholderarr[i].visible = true;
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp2);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].mouseEnabled = true;
            choiceArr[i].cursor = "pointer";
            choiceArr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 5) {
        questionText.gotoAndStop(7)
        rand1 = between(0, 6);
        temp3 = qnoI[temp3];
        var b = rand1.indexOf(temp3);
        rand1.splice(b, 1);
        for (i = 0; i < choiceCnt; i++) {
           // chholderarr[i].visible = true;
            choiceArr[i].visible = true;
            choiceArr[i].gotoAndStop(rand1[i])
            choiceArr[i].name = i
        }
        choiceArr[choicePos[cnt]].gotoAndStop(temp3);
        ans = choicePos[cnt]
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].mouseEnabled = true;
            choiceArr[i].cursor = "pointer";
            choiceArr[i].addEventListener("click", answerSelected)
        }

    }
    else if (pos[cnt] == 6) {
        var color = ["Orange", "Green", "Maroon", "Blue", "Yellow", "Grey", "Red"]

        qno2 = [0, 1, 2];
        qno2.sort(randomSort)
        str = color[qnoI[qno2[0]]];

        if (str == "Orange")
            questionText.gotoAndStop(8)
        else if (str == "Green")
            questionText.gotoAndStop(9)
        else if (str == "Maroon")
            questionText.gotoAndStop(10)
        else if (str == "Blue")
            questionText.gotoAndStop(11)
        else if (str == "Yellow")
            questionText.gotoAndStop(12)
        else if (str == "Grey")
            questionText.gotoAndStop(13)
        else if (str == "Red")
            questionText.gotoAndStop(14)

        // questionTextLabel.text = "Where did the " + str + " color ball moves ?"

        rand1 = between(0, 2);
      //  chholder1.visible = true;
        for (i = 0; i < choiceCnt; i++) {
            directionarr[i].visible = true;
            directionarr[i].gotoAndStop(rand1[i])
            directionarr[i].name = rand1[i]
        }

        if (qno2[0] == temp1)
            ans = 2
        else if (qno2[0] == temp2)
            ans = 0
        else if (qno2[0] == temp3)
            ans = 1


        for (i = 0; i < choiceCnt; i++) {
            directionarr[i].mouseEnabled = true;
            directionarr[i].cursor = "pointer";
            directionarr[i].addEventListener("click", answerSelected)
        }

    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()

}



function disablechoices() {
   // chholder.visible = false
    questionText.visible = false;
    Basket.visible = false;
    Basket1.visible = false;
    Basket2.visible = false;
    if (pos[cnt] == 0) {
        //chholder1.visible = false;
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].visible = false;
            colorarr[i].mouseEnabled = false;
            colorarr[i].cursor = "default";
            colorarr[i].alpha = 1
            colorarr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 1) {
       // chholder1.visible = false;
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].visible = false;
            colorarr[i].mouseEnabled = false;
            colorarr[i].cursor = "default";
            colorarr[i].alpha = 1
            colorarr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 2) {
       // chholder1.visible = false;
        for (i = 0; i < choiceCnt; i++) {
            colorarr[i].visible = false;
            colorarr[i].mouseEnabled = false;
            colorarr[i].cursor = "default";
            colorarr[i].alpha = 1
            colorarr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 3) {
        for (i = 0; i < choiceCnt; i++) {
           // chholderarr[i].visible = false;
            choiceArr[i].visible = false;
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
            choiceArr[i].alpha = 1
            choiceArr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 4) {
        for (i = 0; i < choiceCnt; i++) {
           // chholderarr[i].visible = false;
            choiceArr[i].visible = false;
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
            choiceArr[i].alpha = 1
            choiceArr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 5) {
        for (i = 0; i < choiceCnt; i++) {
          //  chholderarr[i].visible = false;
            choiceArr[i].visible = false;
            choiceArr[i].mouseEnabled = false;
            choiceArr[i].cursor = "default";
            choiceArr[i].alpha = 1
            choiceArr[i].removeEventListener("click", answerSelected)

        }
    }
    else if (pos[cnt] == 6) {



       // chholder1.visible = false;
        for (i = 0; i < choiceCnt; i++) {
            directionarr[i].visible = false;
            directionarr[i].mouseEnabled = false;
            directionarr[i].cursor = "default";
            directionarr[i].alpha = 1
            directionarr[i].removeEventListener("click", answerSelected)

        }

    }


}
//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//
function onRoll_over(e) {
    e.currentTarget.alpha = .5;

    stage.update();
}

function onRoll_out(e) {
    e.currentTarget.alpha = 1;
    stage.update();
}
//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {

    e.preventDefault();
    uans = e.currentTarget.name;

    gameResponseTimerStop();

    console.log(ans + " =correct= " + uans)
    if (ans == uans) {

        e.currentTarget.removeEventListener("click", answerSelected)
        for (i = 0; i < choiceCnt; i++) {
            choiceArr[i].mouseEnabled = false;
        }

        setTimeout(correct, 200)

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

}

function enableMouse() {

}