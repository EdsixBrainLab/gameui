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
var startBtn, introScrn, container, question, circleOutline, chHolderMC, choice1, choice2, choice3, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var words_arry = ["parrot", "peacock", "pigeon", "quail", "crow", "kiwi", "eagle", "owl", "woodpecker", "flamingo",
"tern","quetzal","turkey","pelican","ostrich","rooster","toucan","uguisu","zebrafinch","nightingale"];
var maxLetterCnt = 10
var quesArr = []
var alphabetArr1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var maxLetterCnt = 10
var answerArr = []
var indexArr1 = []
var indexArr2 = []
var indexArr3 = []
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
    gameAssetsPath = "WhoAmI-Birds/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "chHolder", src: questionTextPath +"WhoAmI-Birds-QT.png" },     
            { id: "question", src: gameAssetsPath + "question.png" },
            { id: "question1", src: gameAssetsPath + "question1.png" },         
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" }
            
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
    if (id == "question") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question")],
            "frames": { "regX": 50, "height": 312, "count": 64, "regY": 50, "width": 313 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        question = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(question);
        question.visible = false;

    }
    if (id == "question1") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question1")],
            "frames": { "regX": 50, "height": 105, "count": 64, "regY": 50, "width": 102 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });
        question1 = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(question1);
        question1.visible = false;
        }
    if (id == "choice1") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 150, "count": 64, "regY": 50, "width": 149 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        choice1 = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(choice1);
        choice1.visible = false;

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
    qno = between(0, 19);   
         qno.splice(qno.indexOf(4), 1)  
    qno.push(4);
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
    chHolderMC.visible = false;
    container.parent.addChild(chHolderMC);
    chHolderMC.x=  chHolderMC.x+5
    container.parent.addChild(question);
    question.visible = false;
    question.x = 600;
    question.y = 250;
    question.visible = false;
    question.scaleX = question.scaleY = .8;
    container.parent.addChild(choice1);
    choice1.visible = false;
    //maxLetterCnt
    for (i = 0; i < 3; i++) {
        choiceArr[i] = choice1.clone()
        choiceArr[i].scaleX = choiceArr[i].scaleY = .65;
        choiceArr[i].visible = false;
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].x = 465 + (i * 160);
        choiceArr[i].y = 620;
    }
 
    for (i = 0; i < 11; i++) {
        quesArr[i] = question1.clone()
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
        choiceMcArr[i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 0; i < cLen; i++) {
        choiceMcArr[i].mouseEnabled = true;
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
    wrdCnt = -1;
    //txtLabel.text = "";
    isCorrect = "";
 panelVisibleFn()

    correctAnswer = words_arry[qno[cnt]];
    question.gotoAndStop(qno[cnt])
    question.visible = false;
    ans = correctAnswer;
    cLen = ans.length;
    console.log("correct3Answer= " + correctAnswer)
    for (i = 0; i < cLen; i++) {
        answerArr[i] = ans.charAt(i);
        indexArr1[i] = alphabetArr.indexOf(answerArr[i].toUpperCase())
        indexArr2[i] = alphabetArr1.indexOf(answerArr[i].toUpperCase())
        alphabetArr.splice(indexArr1[i], 1)
    }
    alphabetArr.sort(randomSort)
    for (i = 0; i < 3; i++) {
        indexArr3[i] = alphabetArr1.indexOf(alphabetArr[i].toUpperCase())
    }
    rand = range(0, cLen - 1)
    for (i = 0; i < cLen; i++) {
        quesArr[i].gotoAndStop(indexArr2[i])
        if (i == rand) {
            quesArr[i].gotoAndStop(26)
        }
        quesArr[i].visible = false;
    }
    rand1 =chposArr[cnt]
    for (i = 0; i < 3; i++) {
        choiceArr[i].gotoAndStop(indexArr3[i])
        choiceArr[i].name = indexArr3[i]
        if (i == rand1) {
            choiceArr[i].gotoAndStop(indexArr2[rand])
            choiceArr[i].name = indexArr2[rand]
        }
        choiceArr[i].visible = false;
    }
    ans = indexArr2[rand]
    console.log("correct3Answer= " + correctAnswer)
    for (i = 0; i < cLen; i++) {

        if (cLen == 3) {
            quesArr[i].x = 480 + (i * 150);
        }
        if (cLen == 4) {
            quesArr[i].x = 405 + (i * 150);
        }
        if (cLen == 5) {
            quesArr[i].x = 390 + (i * 120);
        }
        if (cLen == 6) {
            quesArr[i].x = 330 + (i * 120);
        }
        if (cLen == 7) {
            quesArr[i].x = 273 + (i * 120);
        }
        if (cLen == 8) {
            quesArr[i].x = 215 + (i * 120);
        }
        if (cLen == 9) {
            quesArr[i].x = 145 + (i * 120);
        }
        if (cLen == 10) {
            quesArr[i].x = 95 + (i * 120);
        }
        if (cLen == 11) {
            quesArr[i].x = 85 + (i * 110);
          
        }

    }
    createTween()
    question.Text = "";
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}
function createTween() {

chHolderMC.visible = true;
chHolderMC.alpha = 0
chHolderMC.y=-100
    createjs.Tween.get(chHolderMC).wait(300).to({ y:10,alpha: 1 }, 300)

    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    question.regX=50;
    question.regY=50;
    createjs.Tween.get(question).wait(500)
   .to({ scaleX:.75,scaleY :.75,alpha: 1 }, 250)
        .to({ scaleX:.8,scaleY :.8,alpha: 1 }, 250)
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
      
        quesArr[rand].gotoAndStop(indexArr2[rand])
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


//===============================================================================================//



