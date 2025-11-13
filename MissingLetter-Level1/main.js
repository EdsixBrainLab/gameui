///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 2, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
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

var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var index;
var j = 1;
var ques, clueTextField
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var alphaArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var quesArr = ["byte", "chat", "dump", "aged", "aqua", "atom", "auto", "body", "peon", "yoga", "edit", "inch", "oath", "pity",
    "quiz", "desk", "rain", "vote", "sail", "leap", "ugly", "wing", "zero", "zeal", "city",
    "open", "feed", "jeep", "clap", "obey", "half", "item", "iron", "kick", "list", "gate", "bake", "date", "late",
    "page", "pray", "task", "mask", "home", "pond", "hold", "bold", "here", "fear", "bite"];

var choiceArr = []
var ansRemovedArr = []
var farr = []
var tweenMcArr = []
var btn1 = [100, 200, 350, 500, 650];
var btn2 = [80, 230, 380, 530, 680];

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
    gameAssetsPath = "MissingLetter-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "choice1", src: gameAssetsPath + "anskey.png" }


        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {

    if (!QusTxtString) {
        call_UI_gameQuestion(container, "Choose the missing letter to complete the word.");
    }

    var event = assets[i];
    var id = event.item.id;

    if (id == "choice1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 175, "count": 0, "regY": 50, "width": 178 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet1);
        container.parent.addChild(choice1);
        choice1.visible = false;
        choice1.x = 200; choice1.y = 450;
        console.log("get Choice1= " + choice1)
    };


}

function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 49);
    qno.splice(qno.indexOf(16), 1)
    qno.push(16);
    console.log("qno" + qno)
    console.log("quesArr= " + quesArr)
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
    questiontext = QusTxtString
    container.parent.addChild(questiontext);
    questiontext.visible = false;

    if (!clueTextField) {
        clueTextField = new createjs.Text("", "800 70px 'Baloo 2'", "#F4FAFF");
        clueTextField.textAlign = "center";
        clueTextField.textBaseline = "middle";
        clueTextField.shadow = new createjs.Shadow("rgba(6,16,40,0.46)", 0, 10, 26);
        clueTextField.lineWidth = 780;
        clueTextField.x = canvas.width / 2;
        clueTextField.y = 420;
        container.parent.addChild(clueTextField);
    }
    clueTextField.visible = false;

    for (i = 0; i < 5; i++) {
        choiceArr[i] = choice1.clone();
        container.parent.addChild(choiceArr[i])
        choiceArr[i].visible = false
        choiceArr[i].x = 213 + (i * 200);
        choiceArr[i].y = 585;
        choiceArr[i].scaleX = choiceArr[i].scaleY = .85;


    }

}
//==============================================================HELP ENABLE/DISABLE===================================================================//
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
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    ansRemovedArr = [];
    panelVisibleFn();

    ques = quesArr[qno[cnt]];
    console.log("qno"+qno[cnt])
    var ran = Math.floor(Math.random() * ques.length);
    if (clueTextField) {
        var clueChars = ques.toUpperCase().split("");
        if (ran >= 0 && ran < clueChars.length) {
            clueChars[ran] = "_";
        }
        clueTextField.text = clueChars.join("  ");
        clueTextField.visible = false;
        clueTextField.alpha = 1;
    }
    ans = ques.charAt(ran);
    console.log("ans" + ans)
    farr = [];

    index = alphaArr.indexOf(ans);
    for (i = 0; i < 26; i++) {
        if (i != index) {
            ansRemovedArr.push(alphaArr[i]);
        }
    }

    ansRemovedArr.sort(randomSort)

    farr.push(ans, ansRemovedArr[0], ansRemovedArr[1], ansRemovedArr[2], ansRemovedArr[3]);
    farr.sort(randomSort);
    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 0; i < 5; i++) {
        var index = alphaArr.indexOf(farr[i]);
        choiceArr[i].gotoAndStop(index);
        choiceArr[i].name = alphaArr[index];
        choiceArr[i].visible = false;
        choiceArr[i].alpha = 0;

    }
    createTween();
}
function createTween() {
    //////////////////////////////QuestionText////////////////////////////    
    questiontext.visible = true
    questiontext.alpha = 0;
    createjs.Tween.get(questiontext).wait(200)
        .to({ alpha: 1, y: 20 })
    /////////////////////////////////////
    if (clueTextField) {
        clueTextField.visible = true;
        clueTextField.alpha = 0;
        createjs.Tween.get(clueTextField).wait(700).to({ alpha: 1 }, 500)
    }
    ///////////////////////////choice tween////////////////////////////////////
    for (i = 0; i < 5; i++) {
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
        /*  createjs.Tween.get(choiceArr[i]).wait(900)          
       .to({ visible: true, alpha: 1,y:565, scaleX:.95, scaleY: .95},500)
      .to({ visible: true,alpha: 1,y:585, scaleX: .95, scaleY: .95 }, 500)*/
    }
     createjs.Tween.get(choiceArr[0]).wait(900)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[1]).wait(1000)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[2]).wait(1100)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[3]).wait(1200)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    createjs.Tween.get(choiceArr[4]).wait(1300)
        .to({ visible: true, alpha: 1, y: 565, scaleX: .6, scaleY: .6 }, 500)
        .to({ visible: true, alpha: 1, y: 585, scaleX: .65, scaleY: .65 }, 500)
    //////////////////////////////////////////////////////////////////

    repTimeClearInterval = setTimeout(AddListenerFn, 2000)
}
function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 0; i < 5; i++) {
        choiceArr[i].cursor = "pointer";
        choiceArr[i].mouseEnabled = true
        choiceArr[i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}


function disablechoices() {
    createjs.Tween.removeAllTweens();
    for (i = 0; i < 5; i++) {
        choiceArr[i].removeEventListener("click", answerSelected);
        choiceArr[i].visible = false;
        choiceArr[i].alpha = .5;
        choiceArr[i].mouseEnabled = false
    }
     questiontext.visible = false;  
    if (clueTextField) {
        clueTextField.visible = false;
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

    gameResponseTimerStop();
    if (ans == uans) {
        currentX = e.currentTarget.x - 20
        currentY = e.currentTarget.y - 20
        e.currentTarget.visible = true;
        disableMouse()

        for (i = 0; i < 5; i++) {
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
    if (clueTextField) {
        clueTextField.text = ques ? ques.toUpperCase().split("").join("  ") : clueTextField.text;
    }
    disablechoices();
}


function disableMouse() {
    for (i = 0; i < 5; i++) {
        choiceArr[i].mouseEnabled = false
    }
}

function enableMouse() {

}