var messageField;		//Message display field

var assets = [];
var choiceArr = [];
var choiceMcArr = []
var textArr = []
var qno = [];
var strArr = []
var chpos = [];
var getChar = [];
var quesMcArr = []
var txtLabel;
var clueMcArr = [];
var clueArr = []
var clueTxtArr = []
var cnt = -1,qscnt=-1, ans, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, circleOutline, chHolderMC, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var words_arry = ["cake", "chocolate", "balloon", "gift", "cap", "candle", "icecream", "juice", "cupcake", "lollipop"];
var maxLetterCnt = 10
var quesArr = []
var answerArr = []
var decoyArr = []
var blankIndex = 0;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = ["178.3", "288.3", "398.3", "508.3", "618.3", "728.3", "688.3", "288.3", "338.3", "418.3", "498.3", "578.3"];
var btnY = ["497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "567.1", "567.1", "567.1", "567.1", "567.1"];
var rand1 = []
var btnPaddArr = ["", "", "", "365", "335", "305", "275", "245", "215", "185"]
var indx = []
var btnPadding = 50
var btnTxtPaddding = 543
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;
var cLen;
var questionTextMC;
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
var QusTxtString;

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

    loaderColor = createjs.Graphics.getRGB(255, 51, 51, 1);
    loaderBar = new createjs.Container();
    var txt = new createjs.Container();
    bar = new createjs.Shape();
    bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 300;

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
    gameAssetsPath = "WhoAmI-Birthday/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "question", src: gameAssetsPath + "question.png" }

        )
        preloadAllAssets()
        stage.update();
    }

}

//=====================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    console.log(" doneLoading ")
    loaderBar.visible = false;
    stage.update();
	
	call_UI_gameQuestion(container,"Click on the correct letter to complete the name of the items in a birthday party");
		 
    if (id == "question") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 348, "count": 64, "regY": 50, "width": 348 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        question = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(question);
        question.visible = false;

    }


    if (id == "chHolder") {
        chHolderMC = new createjs.Bitmap(preload.getResult('chHolder'));
        container.parent.addChild(chHolderMC)
        chHolderMC.visible = false;
    }

}

function tick(e) {

    stage.update();
}


/////////////////////////////////////////////////////////////////=======HANDLE CLICK========///////////////////////////////////////////////////////////////////

function handleClick(e) {
    qno = between(0, 9);   
    qno.splice(qno.indexOf(0), 1)  
    qno.push(0);   
 console.log("qno" + qno)
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
   container.parent.addChild(QusTxtString);
  QusTxtString.visible = false;
    container.parent.addChild(question);
    question.visible = false;
    question.x = 580;
    question.y = 235;
    question.visible = false;
    question.scaleX = question.scaleY = .8;
    //maxLetterCnt
    for (i = 0; i < 3; i++) {
        choiceArr[i] = createBirthdayChoiceTile();
        choiceArr[i].scaleX = choiceArr[i].scaleY = .65;
        choiceArr[i].visible = false;
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].x = 465 + (i * 160);
        choiceArr[i].y = 620;
    }

    for (i = 0; i < 10; i++) {
        quesArr[i] = createBirthdayQuestionTile();
        quesArr[i].visible = false;
        container.parent.addChild(quesArr[i]);
        quesArr[i].x = 105 + (i * 120);
        quesArr[i].y = 490;
    }
    if (isQuestionAllVariations) {
        //createGameWiseQuestions()
        chposArr = [0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2]
       // pickques()
    } else {
        chposArr = [0, 1, 2, 0, 1, 0, 2, 1, 0, 2]
        chposArr.sort(randomSort)
        //pickques()
    }
}

function helpDisable() {
    for (i = 0; i < cLen; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = false;
        }
    }
}

function helpEnable() {
    for (i = 0; i < cLen; i++) {
        if (choiceArr[i]) {
            choiceArr[i].mouseEnabled = true;
        }
    }
}
//=================================================================================================================================//
function pickques() {
    pauseTimer()
    tx = 0;
    qscnt++;
    cnt++;
    quesCnt++;
    chpos = [];
    strArr = [];
    getChar = []
    currentObj = []
    lCnt = -1;
    cLen = 0;
    alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    answerArr = [];
    decoyArr = [];
    wrdCnt = -1;
    //txtLabel.text = "";
    isCorrect = "";
        QusTxtString.visible = true;
   panelVisibleFn()
    correctAnswer = words_arry[qno[cnt]];
    question.gotoAndStop(qno[cnt])
    question.visible = false;
    ans = correctAnswer;
    var uppercaseAnswer = correctAnswer.toUpperCase();
    cLen = uppercaseAnswer.length;
    for (i = 0; i < cLen; i++) {
        answerArr[i] = uppercaseAnswer.charAt(i);
    }
    blankIndex = range(0, cLen - 1)
    var missingLetter = answerArr[blankIndex];
    var removeIndex = alphabetArr.indexOf(missingLetter);
    if (removeIndex > -1) {
        alphabetArr.splice(removeIndex, 1);
    }
    alphabetArr.sort(randomSort)
    for (i = 0; i < alphabetArr.length; i++) {
        if (decoyArr.length >= 2) {
            break;
        }
        if (alphabetArr[i] !== missingLetter && decoyArr.indexOf(alphabetArr[i]) === -1) {
            decoyArr.push(alphabetArr[i]);
        }
    }
    for (i = 0; i < cLen; i++) {
        styleBirthdayQuestionTile(quesArr[i], answerArr[i], i === blankIndex);
        quesArr[i].visible = false;
    }
    for (i = cLen; i < quesArr.length; i++) {
        quesArr[i].visible = false;
    }
    rand1 =chposArr[cnt]
    var decoyIndex = 0;
    for (i = 0; i < 3; i++) {
        var letterChoice = missingLetter;
        if (i !== rand1) {
            if (decoyIndex >= decoyArr.length) {
                decoyIndex = 0;
            }
            letterChoice = decoyArr[decoyIndex++];
        }
        styleBirthdayChoiceTile(choiceArr[i], letterChoice);
        choiceArr[i].name = letterChoice;
        choiceArr[i].letter = letterChoice;
        choiceArr[i].visible = false;
    }
    ans = missingLetter;
    console.log("correct3Answer= " + correctAnswer)
    for (i = 0; i < cLen; i++) {

        if (cLen == 3) {
            quesArr[i].x = 485 + (i * 150);
        }
        if (cLen == 4) {
            quesArr[i].x = 410 + (i * 150);
        }
        if (cLen == 5) {
            quesArr[i].x = 400 + (i * 120);
        }
        if (cLen == 6) {
            quesArr[i].x = 335 + (i * 120);
        }
        if (cLen == 7) {
            quesArr[i].x = 275 + (i * 120);
        }
        if (cLen == 8) {
            quesArr[i].x = 220 + (i * 120);
        }

        if (cLen == 9) {
            quesArr[i].x = 155 + (i * 120);
        }
        if (cLen == 10) {
            quesArr[i].x = 85 + (i * 120);
        }


    }
    createTween()
    question.Text = "";
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
function createTween() {


    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    question.regX=50;
    question.regY=50;
createjs.Tween.get(question)
  .wait(500)
  .to({ scaleX: 0.75, scaleY: 0.75, alpha: 1 }, 250)
  .to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 250)
  .call(() => { 
    try { 
      ChoiceFX_entrance(choiceArr, 1600); 
    } catch (_e) {} 
  }).to({ scaleX:.8,scaleY :.8,alpha: 1 }, 250)
var time=1000
    for (i = 0; i < cLen; i++) {
        console.log("clen111"+cLen)
        if(i==cLen-1)
        {
        quesArr[i].visible = true;
        quesArr[i].alpha = 0
        createjs.Tween.get(quesArr[i]).wait(time)
            .to({ alpha: 1 },500, createjs.Ease.bounceInOut)
        }
        else
        {
            quesArr[i].visible = true;
        quesArr[i].alpha = 0
        createjs.Tween.get(quesArr[i]).wait(time)
            .to({ alpha: 1 },500, createjs.Ease.bounceInOut) 
        }
            time=time+100
    }

    ///////////////////////////choice tween////////////////////////////////////
    var val =1800
    for (i = 0; i < 3; i++) {
        choiceArr[i].scaleX = choiceArr[i].scaleY = .65;
        choiceArr[i].y = 600, 
        choiceArr[i].visible = true;
         choiceArr[i].x = 465 + (i * 160);
        choiceArr[i].alpha = 0;
        if(i==2)
        {
        createjs.Tween.get(choiceArr[i]).wait(val)
        .to({ y: 620,rotation:180, scaleX: .65, scaleY: .65, alpha: .5 }, 100)
        .to({ y: 620,rotation:360, scaleX: .7, scaleY: .7, alpha: 1 }, 500)
        }
        else{
        createjs.Tween.get(choiceArr[i]).wait(val)
        .to({ y: 620,rotation:180, scaleX: .65, scaleY: .65, alpha: .5 }, 100)
        .to({ y: 620,rotation:360, scaleX: .7, scaleY: .7, alpha: 1 }, 500)
        }
        val = val + 150
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3000)



}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
  


    for (i = 0; i < 3; i++) {
        choiceArr[i].visible = true
        choiceArr[i].id = i
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].alpha = 1;
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].cursor = "pointer";
        choiceArr[i].addEventListener("click", answerSelected);
try { ChoiceFX_bindHover(choiceArr); } catch(_e){}
    }

    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

//===============================================//
function disablechoices() {
    for (i = 0; i < 3; i++) {
        choiceArr[i].removeEventListener("click", answerSelected)
        choiceArr[i].cursor = "default";
        choiceArr[i].visible = false;
    }
    for (i = 0; i < cLen; i++) {
        quesArr[i].visible = false
    }
    question.visible = false
}

function answerSelected(e) {
	  try { ChoiceFX_pressRipple(container, e.stageX, e.stageY); } catch(_e){}
    e.preventDefault();
    lCnt++;
    uans = e.currentTarget.name;
    e.currentTarget.mouseEnabled = false;
    e.currentTarget.alpha = 0.5;
    e.currentTarget.cursor = "default";
    console.log(ans+"        "+uans)

    gameResponseTimerStop();

    if (ans == uans) {
        currentX = e.currentTarget.x - 30
        currentY = e.currentTarget.y - 20
        disableMouse()

        styleBirthdayQuestionTile(quesArr[blankIndex], ans, false);
                try { ChoiceFX_revealPop(quesArr[blankIndex], "pop"); } catch(_e){}
        for (i = 0; i < 3; i++) {
            choiceArr[i].removeEventListener("click", answerSelected)
        }
        setTimeout(correct, 500)
    }
    else {
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
        choiceArr[i].mouseEnabled = false;
    }
}

function enableMouse() {

}


function buildBirthdayTile(options) {
    options = options || {};
    var tile = new createjs.Container();
    tile.mouseChildren = false;
    var width = options.width || 120;
    var height = options.height || 120;
    var radius = options.radius || 28;
    var font = options.font || "700 60px 'Nunito', 'Arial', sans-serif";
    var textColor = options.color || "#452a72";
    var textOffsetY = options.textOffsetY || 0;

    var bg = new createjs.Shape();
    tile.addChild(bg);

    var label = new createjs.Text("", font, textColor);
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = width / 2;
    label.y = height / 2 + textOffsetY;
    tile.addChild(label);

    tile.bg = bg;
    tile.label = label;
    tile.tileWidth = width;
    tile.tileHeight = height;
    tile.tileRadius = radius;
    tile.regX = width / 2;
    tile.regY = height / 2;
    tile.shadow = new createjs.Shadow("rgba(0,0,0,0.18)", 0, 6, 18);

    return tile;
}

function createBirthdayQuestionTile() {
    return buildBirthdayTile({
        width: 118,
        height: 128,
        radius: 32,
        font: "700 58px 'Nunito', 'Arial', sans-serif",
        color: "#452a72",
        textOffsetY: 2
    });
}

function createBirthdayChoiceTile() {
    return buildBirthdayTile({
        width: 136,
        height: 136,
        radius: 38,
        font: "700 64px 'Nunito', 'Arial', sans-serif",
        color: "#7a3600",
        textOffsetY: 3
    });
}

function styleBirthdayQuestionTile(tile, letter, isBlank) {
    if (!tile) {
        return;
    }
    var g = tile.bg.graphics;
    g.clear();
    var width = tile.tileWidth || 118;
    var height = tile.tileHeight || 128;
    var radius = tile.tileRadius || 32;
    var fill = isBlank ? ["#ffe8f5", "#ffd6eb"] : ["#ffffff", "#ffe2f4"];
    var stroke = isBlank ? "#ff9cc5" : "#ff7aa9";
    g.setStrokeStyle(4).beginStroke(stroke).beginLinearGradientFill(fill, 0, 0, 0, height).drawRoundRect(0, 0, width, height, radius);

    tile.label.text = isBlank ? "?" : letter;
    tile.label.color = isBlank ? "#ff6f9f" : "#452a72";
    tile.label.alpha = isBlank ? 0.65 : 1;
    tile.bg.alpha = isBlank ? 0.85 : 1;
}

function styleBirthdayChoiceTile(tile, letter) {
    if (!tile) {
        return;
    }
    var g = tile.bg.graphics;
    g.clear();
    var width = tile.tileWidth || 136;
    var height = tile.tileHeight || 136;
    var radius = tile.tileRadius || 38;
    g.setStrokeStyle(4).beginStroke("#ffb660").beginLinearGradientFill(["#fff4d4", "#ffd78a"], 0, 0, 0, height).drawRoundRect(0, 0, width, height, radius);
    tile.label.text = letter;
    tile.label.color = "#7a3600";
    tile.label.alpha = 1;
}

//===============================================================================================//



