///////////////////////////////////////////////////-------Common variables--------------/////////////////////////////////////////////////////////////////////
var messageField; //Message display field
var assets = [];
var cnt = -1,
    qscnt = -1,
    ans, uans, interval, time = 180,
    totalQuestions = 10,
    answeredQuestions = 0,
    choiceCnt = 3,
    quesCnt = 0,
    resTimerOut = 0,
    rst = 0,
    responseTime = 0;
var startBtn, introScrn, container, choice1, choice2, choice3, choice4, question, circleOutline, circle1Outline, boardMc, helpMc, quesMarkMc, questionText, quesHolderMc, resultLoading, preloadMc;
var mc, mc1, mc2, mc3, mc4, mc5, startMc, questionInterval = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0,
    aqcnt = 0,
    ccnt = 0,
    cqcnt = 0,
    gscore = 0,
    gscrper = 0,
    gtime = 0,
    rtime = 0,
    crtime = 0,
    wrtime = 0,
    currTime = 0;
var bg
var BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var rst1 = 0,
    crst = 0,
    wrst = 0,
    score = 0,
    puzzle_cycle, timeOver_Status = 0; //for db //q
var isBgSound = true;
var isEffSound = true;

var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;

var lastW, lastH, lastS = 1;
var borderPadding = 10,
    barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
var buttons, bt1, bt2, bt3, bt4, bg1
///////////////////////////////////////////////////////////////////////GAME SPECIFIC ARRAY//////////////////////////////////////////////////////////////
var qno = [];
var posArr = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
var directionArr = ["up", "up", "up", "up", "right", "right", "right", "right", "down", "down", "down", "down", "left", "left", "left", "left"]
var chpos = []
var tweenMcArr = []
var qch
var carsdisp = []
var carclr = []
var randDirectionArr = [0, 1, 2, 0, 1, 2, 0, 1, 2, 1]
var carArr1 = []
var carArr2 = []
var carArr3 = []
var carArr4 = []
var ccarArr = [
    [0, 5, 10, 15],
    [10, 0, 5, 15],
    [15, 5, 0, 10],
    [10, 15, 5, 0],
    [1, 6, 11, 12],
    [11, 6, 1, 12],
    [2, 7, 8, 13],
    [13, 8, 7, 2],
    [3, 4, 9, 14],
    [9, 3, 14, 4]
]
//////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
    checkBrowserSupport();
}
//////////////////////////////////////////////////
function init() {
    console.log("innt")

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
    gameAssetsPath = "CarPark-Level1/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(
            { id: "BGTitle", src: gameAssetsPath + "BGTitle.png" },
            { id: "choice1", src: gameAssetsPath + "CarQuestionImage.png" },
            { id: "holder", src: gameAssetsPath + "CarIntroHolder.png" },
            { id: "DirPosTrack", src: questionTextPath + "CarPark-Level1-QT5.png" },
            { id: "DirPosArrow", src: gameAssetsPath + "ClueDirPosArrow.png" },
            { id: "questionText", src: questionTextPath + "CarPark-Level1-QT1.png" },
            { id: "car", src: questionTextPath + "CarPark-Level1-QT2.png" },
            { id: "Buttons", src: gameAssetsPath + "question.png" },
            { id: "question1", src: questionTextPath + "CarPark-Level1-QT4.png" },
            { id: "DirPosCar", src: gameAssetsPath + "ClueDirPosCar.png" },
            { id: "DirPosQuestionText", src: questionTextPath + "CarPark-Level1-QT3.png" }

        )
        preloadAllAssets()
        stage.update();
    }
}
//=================================================================DONE LOADING=================================================================//
function doneLoading1(event) {
    var event = assets[i];
    var id = event.item.id;
    if (id == "BGTitle") {
        BGTitle = new createjs.Bitmap(preload.getResult('BGTitle'));
        container.parent.addChild(BGTitle);
        BGTitle.visible = false;
    }


    if (id == "car") {
        car1 = new createjs.Bitmap(preload.getResult('car'));
        container.parent.addChild(car1);
        car1.visible = false;
    }
    if (id == "holder") {
        holder = new createjs.Bitmap(preload.getResult('holder'));
        container.parent.addChild(holder);
        holder.visible = false;
    }
    if (id == "questionText") {
        questionText = new createjs.Bitmap(preload.getResult('questionText'));
        container.parent.addChild(questionText);
        questionText.visible = false;
    }

    if (id == "DirPosCar") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosCar")],
            "frames": { "regX": 50, "height": 49, "count": 0, "regY": 50, "width": 79 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosCar = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosCar);
        DirPosCar.visible = false;
    }
    if (id == "DirPosArrow") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosArrow")],
            "frames": { "regX": 50, "height": 49, "count": 0, "regY": 50, "width": 49 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosArrow = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosArrow);
        DirPosArrow.visible = false;
    }
    if (id == "DirPosQuestionText") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosQuestionText")],
            "frames": { "regX": 50, "height": 46, "count": 0, "regY": 50, "width": 197 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosQuestionText = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosQuestionText);
        DirPosQuestionText.visible = false;
    }
    if (id == "DirPosTrack") {
        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("DirPosTrack")],
            "frames": { "regX": 50, "height": 328, "count": 0, "regY": 50, "width": 355 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        DirPosTrack = new createjs.Sprite(spriteSheet5);
        container.parent.addChild(DirPosTrack);
        DirPosTrack.visible = false;
    }


    //
    if (id == "choice1") {
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 238, "count": 0, "regY": 50, "width": 238 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        choice1 = new createjs.Sprite(spriteSheet2);
        choice1.visible = false;
        mc = new createjs.MovieClip()
        container.parent.addChild(choice1);

        choice2 = new createjs.Sprite(spriteSheet2);
        choice2.visible = false;
        mc1 = new createjs.MovieClip()
        container.parent.addChild(choice2);
        /////
        choice3 = new createjs.Sprite(spriteSheet2);
        choice3.visible = false;
        mc2 = new createjs.MovieClip()
        container.parent.addChild(choice3);


        choice4 = new createjs.Sprite(spriteSheet2);
        choice4.visible = false;
        mc3 = new createjs.MovieClip()
        container.parent.addChild(choice4);
    };
    if (id == "question1") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("question1")],
            "frames": { "regX": 50, "height": 48, "count": 0, "regY": 50, "width": 181 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        q1 = new createjs.Sprite(spriteSheet1);
        q1.visible = false;
        container.parent.addChild(q1);
    };


    if (id == "Buttons") {
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("Buttons")],
            "frames": { "regX": 50, "height": 182, "count": 0, "regY": 50, "width": 210 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):

        });
        buttons = new createjs.Sprite(spriteSheet1);
        buttons.visible = false;
        container.parent.addChild(buttons);
    };
}


function tick(e) {
    stage.update();
}
/////////////////////////////////////////////////////////////////=======HANDLE CLICK========//////////////////////////////////////////////////////////////
function handleClick(e) {
    qno = between(0, 9);
    qno.sort(randomSort)
    posArr.sort(randomSort)
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
    BGTitle.visible = true;
    questionText.x = 0
    questionText.y = 0;
    DirPosQuestionText.visible = false
    DirPosQuestionText.gotoAndStop(0);
    DirPosQuestionText.x = 598, DirPosQuestionText.y = 341
    questionText.visible = false;
    // q1.x = 615; q1.y = 418.5;
    // q1.visible = false;
    // q1.scaleX = q1.scaleY = .75
    container.parent.addChild(car1);
    car1.visible = false;
    car1.x = 12;
    if (lang == "TamilQuestionText/") {
        q1.x = 618;
        q1.y = 283;
        q1.visible = false;
        questionText.x = 10;
        questionText.y = 45;        
        DirPosQuestionText.y = 390;
        car1.y = -10;
    } else if (lang == "VietnameseQuestionText/") {
        q1.x = 618;
        q1.y = 379.5;
        q1.visible = false;
    } else if (lang == "ArabicQuestionText/") {
        q1.x = 618;
        q1.y = 425;
        q1.visible = false;
        car1.x = 0;
        car1.y = 0;
    } else if (lang == "BanglaQuestionText/") {
        q1.x = 618;
        q1.y = 300
        q1.visible = false;
        DirPosQuestionText.x = 598, DirPosQuestionText.y = 400
        car1.x = 0;
    }  
    else {
        q1.x = 615;
        q1.y = 418.5;
        q1.visible = false;
        q1.scaleX = q1.scaleY = .75
    }

    var carX = [, 608.5, 250, 950, 605.5]
    var carY = [, 590, 312.5, 296.5, 60]
    for (i = 1; i <= 4; i++) {
        this["choice" + i].x = carX[i]
        this["choice" + i].y = carY[i];
        this["choice" + i].visible = false;
        this["choice" + i].scaleX = this["choice" + i].scaleY = .55
    }
    var btnX = [, 70, 325, 865, 1110]
    //var btnX = [, 100, 300, 900, 1100]
    for (i = 1; i <= 2; i++) {
        this["bt" + i] = buttons.clone();
        this["bt" + i].x = btnX[i]
        this["bt" + i].y = 560
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.85;
        this["bt" + i].visible = false;
        container.parent.addChild(this["bt" + i]);
    }

    for (i = 3; i <= 4; i++) {
        this["bt" + i] = buttons.clone();
        this["bt" + i].x = btnX[i];
        this["bt" + i].y = 560
        this["bt" + i].visible = false;
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.85;
        container.parent.addChild(this["bt" + i]);
    }
    bt1.gotoAndStop(3);
    bt1.name = "left";
    bt2.gotoAndStop(1);
    bt2.name = "right";
    bt3.gotoAndStop(0);
    bt3.name = "up";
    bt4.gotoAndStop(2);
    bt4.name = "down";
    container.parent.addChild(choice1, choice2, choice3, choice4)
    console.log("isQuestionAllVariations= " + isQuestionAllVariations)
    if (isQuestionAllVariations) {
        caseArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        //  createGameWiseQuestions()
        //  pickques()
    } else {
        caseArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        // pickques()
    }
    caseArr.sort(randomSort)
}
//==============================================================HELP ENABLE/DISABLE===================================================================//
function helpDisable() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = false;
    }
}

function helpEnable() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = true;
    }
}
//==================================================================PICKQUES==========================================================================//
function pickques() {
    pauseTimer()
    //for db
    tx = 0;
    qscnt++;
    //db
    var j = [];
    var m = [];
    cnt++;
    quesCnt++;
    chpos = []
    getCarrArr = []
    panelVisibleFn()
    //////////////////////////////////////////////////////////////////////////////////////////

    var qno1 = between(1, 4);
    DirPosQuestionText.gotoAndStop(0);
    console.log("ccarArr[qno[cnt]][i]++++++++++++++++++++++++++++ " + ccarArr[0][0])

    carsdisp = between(1, 3);

    var setCarColorArr = []

    for (i = 1; i <= choiceCnt; i++) {
        this["choice" + carsdisp[i]].visible = false;
        setCarColorArr.push(ccarArr[qno[cnt]][i - 1]);

    }

    setCarColorArr.sort(randomSort)

    for (i = 1; i <= choiceCnt; i++) {

        this["choice" + carsdisp[i]].gotoAndStop(ccarArr[qno[cnt]][i - 1]);
    }

    q1.gotoAndStop(setCarColorArr[1])
    q1.visible = false;

    if (directionArr[setCarColorArr[1]] == "down") {
        ans = "down";
    } else if (directionArr[setCarColorArr[1]] == "up") {
        ans = "up";
    } else if (directionArr[setCarColorArr[1]] == "right") {
        ans = "right";
    } else if (directionArr[setCarColorArr[1]] == "left") {
        ans = "left";
    }
    //////////////////////////////////////////////////////////////////////////////////////

    enablechoices()
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();

}

//====================================================================CHOICE ENABLE/DISABLE==============================================================//
function enablechoices() {
    for (i = 1; i <= 4; i++) {
        this["bt" + i].cursor = "pointer";
        this["bt" + i].visible = false;
        this["bt" + i].alpha = 0;
        this["bt" + i].mouseEnabled = true
    }

    CreateTween()
}

function CreateTween() {

    /////////////////////////////////////////////////////////////////
    createjs.Tween.get(this["choice" + carsdisp[1]]).wait(200)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    createjs.Tween.get(this["choice" + carsdisp[2]]).wait(400)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);
    createjs.Tween.get(this["choice" + carsdisp[3]]).wait(600)
        .to({ visible: true, alpha: 1, scaleX: .5, scaleY: .5 }, 500)
        .to({ visible: true, alpha: 1, scaleX: .55, scaleY: .55 }, 500, createjs.Ease.bounceInOut);

    /////////////////////////////////////////////////////////////////////

    questionText.visible = true;
    questionText.alpha = 0
    createjs.Tween.get(questionText).wait(1000)
        .to({ alpha: 1 }, 200);
    DirPosQuestionText.visible = true;
    DirPosQuestionText.alpha = 0
    createjs.Tween.get(DirPosQuestionText).wait(1000)
        .to({ alpha: 1, scaleX: .95, scaleY: .95 }, 100).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);

    car1.visible = true;
    car1.alpha = 0
    createjs.Tween.get(car1).wait(1000)
        .to({ alpha: 1 }, 200);
    createjs.Tween.get(DirPosQuestionText).wait(1500)
        .to({ scaleX: .95, scaleY: .95 }, 200)
        .to({ scaleX: 1, scaleY: 1 }, 200)
        .to({ scaleX: .95, scaleY: .95 }, 200)
        .to({ scaleX: 1, scaleY: 1 }, 200);
    q1.visible = true;
    q1.alpha = 0
    createjs.Tween.get(q1).wait(1500)
        .to({ alpha: 1, scaleX: .7, scaleY: .7 }, 200)
        .to({ scaleX: .75, scaleY: .75 }, 200)
        .to({ scaleX: .7, scaleY: .7 }, 200)
        .to({ scaleX: .75, scaleY: .75 }, 200)
    /////////////////button Tween////////////////////////////
    for (i = 1; i <= 4; i++) {
        this["bt" + i].scaleX = this["bt" + i].scaleY = 0.95;
        this["bt" + i].visible = true;
        this["bt" + i].alpha = 0;
    }
    createjs.Tween.get(this["bt" + 1]).wait(1500)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 2]).wait(1600)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 3]).wait(1700)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    createjs.Tween.get(this["bt" + 4]).wait(1800)
        .to({ y: 450, alpha: 1, scaleX: .95, scaleY: .95 }, 200)
        .to({ y: 565, alpha: 1, scaleX: 1, scaleY: 1 }, 200);
    repTimeClearInterval = setTimeout(AddListenerFn, 2500)
}

function AddListenerFn() {
    clearTimeout(repTimeClearInterval)
    console.log("eventlisterneer")
    for (i = 1; i <= 4; i++) {
        this["bt" + i].addEventListener("click", answerSelected);
    }
    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}

function disablechoices() {
    createjs.Tween.removeAllTweens();
    for (i = 1; i <= 4; i++) {
        this["bt" + i].removeEventListener("click", answerSelected);
        this["bt" + i].visible = false;
        this["bt" + i].alpha = .5;
    }

}

//=================================================================ANSWER SELECTION=======================================================================//
function answerSelected(e) {
    e.preventDefault();
    uans = e.currentTarget.name;
    console.log("answer" + uans);
    console.log(ans + " =correct= " + uans)
    gameResponseTimerStop();
    if (ans == uans) {

        e.currentTarget.visible = true;
        disableMouse()

        for (i = 1; i <= 4; i++) {
            this["bt" + i].removeEventListener("click", answerSelected);
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
    for (i = 1; i <= 4; i++) {
        this["bt" + i].mouseEnabled = false
    }
}

function enableMouse() {

}