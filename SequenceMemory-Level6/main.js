
///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 5, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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
var currentX, currentY
var currentObj = []
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var px = [100, 320, 540, 760, 980]
var py = [295, 295, 295, 295, 490, 490]
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var repTimeClearInterval = 0
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno1 = [];
var qno11 = [];
var qno12 = [];
var qno = []
var chpos = [];
var choiceArr = []
var posArr = []
var choiceMcArr = []
var clk
var ansArr = [0, 1, 2, 3, 4]
var correctCnt

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
    gameAssetsPath = "SequenceMemory-Level6/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "holder", src: gameAssetsPath + "holder.png" },
            { id: "holder1", src: gameAssetsPath + "holder1.png" },
            { id: "choice1", src: gameAssetsPath + "choiceImages1.png" },
            { id: "questiontext", src: questionTextPath + "SequenceMemory-Level6-QT.png" },         
            { id: "posimg", src: gameAssetsPath + "positionImage1.png" }


        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    loaderBar.visible = false;
    stage.update();
    var event = assets[i];
    var id = event.item.id;


    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;
    }

    if (id == "holder1") {
        holder1 = new createjs.Bitmap(preload.getResult('holder1'));
        container.parent.addChild(holder1);
        holder1.visible = false;
    }

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 199, "count": 0, "regY": 50, "width": 199 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;

    }
    if (id == "questiontext") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("questiontext")],
            "frames": { "regX": 50, "height": 106, "count": 0, "regY": 50, "width": 676 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        //
        questionText = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(questionText);
        questionText.visible = false;

    }

    if (id == "posimg") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("posimg")],
            "frames": { "regX": 50, "height": 88, "count": 0, "regY": 50, "width": 88 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        posimg = new createjs.Sprite(spriteSheet1);
        posimg.visible = false;
        container.parent.addChild(posimg);
    };

}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////=======CREATION OF GAME ELEMENTS========///////////////////////////////////////////////////////////////////

function CreateGameElements() {
    interval = setInterval(countTime, 1000);


    container.parent.addChild(questionText);
    questionText.x = 355; questionText.y = 130
    questionText.visible = false;


    for (i = 0; i < 5; i++) {
        choiceArr[i] = choice1.clone()
        container.parent.addChild(choiceArr[i])
        choiceArr[i].visible = false
        choiceArr[i].scaleX = choiceArr[i].scaleY = 1
        choiceArr[i].x = px[i] + 50;
        console.log(choiceArr[i].x)
        choiceArr[i].y = 295

        posArr[i] = posimg.clone()
        container.parent.addChild(posArr[i])
        posArr[i].visible = false

        posArr[i].x = px[i] + 110
        posArr[i].y = 505
        console.log(posArr[i].x)


    }


    /*if (isQuestionAllVariations) {
        createGameWiseQuestions()
      pickques()
    } else {
      pickques()
    }*/
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {

}

function helpEnable() {

}
//==================================================================PICKQUES==========================================================================//
function pickques() {

    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = [];
    currentObj = []
    clk = 0;
    correctCnt = 0;
    panelVisibleFn()
    ////////////////////////////////////////////////////////////////////////
    questionText.gotoAndStop(0);

    qno1 = between(0, 49)
    for (i = 0; i < 5; i++) {
        choiceArr[i].gotoAndStop(qno1[i])
        posArr[i].visible = false
        choiceArr[i].visible = false
        choiceArr[i].name = i
        choiceArr[i].x = px[i] + 50;
        console.log(choiceArr[i].x)
        choiceArr[i].y = 295

        chpos.push({ posx: choiceArr[i].x, posy: choiceArr[i].y })
    }
    console.log("chpos" + chpos)
    createTween()
    questionInterval = setInterval(delayStartQuestion, 5000) // two seconds 


}
function createTween() {

    questionText.visible = true;
    questionText.alpha = 0
    questionText.scaleX = .99
    createjs.Tween.get(questionText).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300)



    ///////////////////////////choice tween////////////////////////////////////



    var val = 500
    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        choiceArr[i].scaleX = .90
        choiceArr[i].scaleY = .90
        createjs.Tween.get(choiceArr[i]).wait(val).to({ scaleX: 1, scaleY: 1, alpha: 1 }, val)
        val = val + 150
    }

}
function delayStartQuestion() {
    clearInterval(questionInterval);

    questionText.gotoAndStop(1);

    var chpos1 = between(0, 4)
    var shuffle = between(0, 4)
    var j;
    for (i = 0; i < choiceCnt; i++) {

        if (chpos1[i] == i) {
            j = -1;
        }
        else {

            j++;
        }
    }
    if (j == -1) {

        var tempval1 = chpos1[shuffle[0]];
        chpos1[shuffle[0]] = chpos1[shuffle[1]]
        chpos1[shuffle[1]] = tempval1

    }

    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].x = chpos[chpos1[i]].posx
        choiceArr[i].y = chpos[chpos1[i]].posy
        choiceArr[i].visible = true
        choiceArr[i].cursor = "pointer";
    }

    enablechoices();
    rst = 0;
    gameResponseTimerStart();

    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].alpha = 1;
    }
}

function disablechoices() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].removeEventListener("click", answerSelected);
        posArr[i].visible = false
        choiceArr[i].visible = false;
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
    e.currentTarget.removeEventListener("click", answerSelected);
    e.currentTarget.cursor = "default";
    e.currentTarget.disablechoices = true;
    var dx = e.currentTarget.x;
    var dy = e.currentTarget.y;
    console.log(dx);
    console.log(dy);
    ans = "multipleAns"
    clk++;
    uans = e.currentTarget.name

    gameResponseTimerStop();


    if (clk <= 5) {
        console.log("clk" + clk)
        console.log(ansArr[clk] + " =$$$$$$$$$= " + uans)
        if (ansArr[clk - 1] == uans) {
            currentObj[clk - 1] = e.currentTarget.name;
            correctCnt++;
            if (dx == 150 && dy == 295) {
                posArr[0].visible = true;
                container.parent.addChild(posArr[0]);
                posArr[0].gotoAndStop(clk)
            }
            else if (dx == 370 && dy == 295) {
                posArr[1].visible = true;
                container.parent.addChild(posArr[1]);
                posArr[1].gotoAndStop(clk)

            }
            else if (dx == 590 && dy == 295) {
                posArr[2].visible = true;
                container.parent.addChild(posArr[2]);
                posArr[2].gotoAndStop(clk)
            }
            else if (dx == 810 && dy == 295) {
                posArr[3].visible = true;
                container.parent.addChild(posArr[3]);
                posArr[3].gotoAndStop(clk)
            }
            else if (dx == 1030 && dy == 295) {
                posArr[4].visible = true;
                container.parent.addChild(posArr[4]);
                posArr[4].gotoAndStop(clk)

            }


            if (correctCnt == 5) {
                setTimeout(correct, 800)

            }
        }
        else {
            getValidation("wrong");
            disablechoices();
        }
    }

}
function correct() {
    getValidation("correct");
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < choiceCnt; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function enableMouse() {
    for (i = 0; i < choiceCnt; i++) {

        var curName = choiceArr[i].name
        if (currentObj.indexOf(curName) == -1)
            choiceArr[i].mouseEnabled = true;
    }
}
