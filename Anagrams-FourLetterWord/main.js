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

var clueMcArr = [];
var clueArr = []

var choiceArrScale
var cnt = -1, ans, qscnt = -1, uans, interval, delayInterval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 12, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0, correctAnswer = "", lCnt = -1, wrdCnt = -1;
var startBtn, introScrn, container, question, circleOutline, chHolderMC, choice1, choice2, choice3, boardMc, helpMc, backGround1, kholderMc, ansPanelMc, clueMc, clueMc1, resultLoading, selectedAnswer = "", cLen = 0;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, btnImages, isCorrect = "";
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd, currTime = 0;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0;
var alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var nameArr = ["amen", "dale", "diet", "vile", "plea", "mate", "nets", "naps", "mite", "pone"]
var words_arry = ["mane", "deal", "edit", "evil", "leap", "meat", "nest", "pans", "emit", "nope"]
var ans = []

var maxLetterCnt = 12
var posx = [556, 626, 696, 766, 216, 286, 356, 426, 891, 961, 1031, 1101]
var posy = [427, 427, 427, 427, 507, 507, 507, 507, 507, 507, 507, 507]
/////////////////////////////////////////////////////////////////////////GAME SPECIFIC VARIABLES//////////////////////////////////////////////////////////
//var alphaarr = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
var btnX = ["178.3", "288.3", "398.3", "508.3", "618.3", "728.3", "688.3", "288.3", "338.3", "418.3", "498.3", "578.3"];
var btnY = ["497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "497.1", "567.1", "567.1", "567.1", "567.1", "567.1"];
var rand1 = []
var btnPaddArr = ["", "", "", "365", "335", "305", "275", "245", "215", "185"]
var indx = []
var btnPadding = 50
var btnTxtPaddding = 483
var repTimeClearInterval = 0
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var cLen;
var QusTxtString
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
var tent1 = 0;
var tent2 = 0;
var tent3 = 0;
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
    gameAssetsPath = "Anagrams-FourLetterWord/";
    soundpath = "FA/"

    var success = createManifest();
    if (success == 1) {
        manifest.push(


            { id: "chHolder", src: questionTextPath + "Anagrams-FourLetterWord-QT1.png" },
            { id: "choice1", src: gameAssetsPath + "ChoiceImages1.png" },
            { id: "QusTxtString", src: questionTextPath + "Anagrams-FourLetterWord-QT.png" },
            { id: "clueMc", src: gameAssetsPath + "clueImages.png" }


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

    if (id == "QusTxtString") {
        QusTxtString = new createjs.Bitmap(preload.getResult('QusTxtString'));
        container.parent.addChild(QusTxtString)
        QusTxtString.visible = false;
    }

    if (id == "choice1") {
        var choiceSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("choice1")],
            "frames": { "regX": 50, "height": 146, "count": 64, "regY": 50, "width": 174 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        choice1 = new createjs.Sprite(choiceSpriteSheet);
        container.parent.addChild(choice1);
        choice1.visible = false;

    }

    if (id == "clueMc") {
        var clueSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [preload.getResult("clueMc")],
            "frames": { "regX": 50, "height": 60, "count": 0, "regY": 50, "width": 67 },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        });

        clueMc = new createjs.Sprite(clueSpriteSheet);
        container.parent.addChild(clueMc);
        clueMc.visible = false;

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


    chHolderMC.visible = false;
    chHolderMC.y = chHolderMC.y - 7
    container.parent.addChild(chHolderMC, question);
    for (i = 0; i < maxLetterCnt; i++) {
        clueMcArr[i] = new createjs.MovieClip();
        container.parent.addChild(clueMcArr[i]);
        clueArr[i] = clueMc.clone();
        clueMcArr[i].addChild(clueArr[i])
        clueArr[i].gotoAndStop(26);
        clueArr[i].visible = false;
        clueArr[i].x = posx[i];
        clueArr[i].y = posy[i];


    }

    container.parent.addChild(choice1);
    choice1.visible = false;

    for (i = 0; i < 4; i++) {
        choiceArr[i] = choice1.clone()
        choiceArr[i].scaleX = choiceArr[i].scaleY = .8;
        choiceArr[i].visible = false;
        container.parent.addChild(choiceArr[i]);
        choiceArr[i].x = 205 + (i * 120);
        choiceArr[i].y = 620;
    }



    /*if(isQuestionAllVariations){
        createGameWiseQuestions()
        pickques()
    }else{
        pickques()
    }*/
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

    //for db
    tx = 0;
    qscnt++;
    //db
    cnt++;
    quesCnt++;
    chpos = [];
    strArr = [];
    getChar = []
    currentObj = []
    cLen = 0;
    wrdCnt = -1;
    panelVisibleFn()
    ans = []

    tent1 = 0;
    tent2 = 0;
    tent3 = 0;
    lCnt = -1;
    //==========================================================================================//
    chHolderMC.visible = true;
    QusTxtString.visible = true;


    isCorrect = "";
    chHolderMC.visible = true;
    correctAnswer = words_arry[qno[cnt]];

    question = new createjs.Text(nameArr[qno[cnt]], "70px Lato-Bold", "#2f8c62");
    question.textAlign = "center";
    question.textBaseline = "middle";
    question.x = 640;
    question.y = 275;
    question.visible = true;
    container.parent.addChild(question);


    for (i = 0; i < 12; i++) {

        clueArr[i].visible = false;
        clueArr[i].scaleX = clueArr[i].scaleY = 1;

    }


    enablechoices();
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}

function enablechoices() {
    var setRandArr = [];
    rand1 = []
    var getStr = nameArr[qno[cnt]];

    for (i = 0; i < 12; i++) {
        clueArr[i].visible = true;
        clueArr[i].gotoAndStop(26);
    }

    cLen = getStr.length;


    rand1 = between(0, 3)


    for (i = 0; i < 4; i++) {
        getChar[i] = getStr.charAt(i).toString().toUpperCase();

    }
    getStr = correctAnswer
    for (i = 0; i < 4; i++) {
        indx[i] = alphabetArr.indexOf(getChar[i])
    }



    for (i = 0; i < 4; i++) {
        choiceArr[rand1[i]].gotoAndStop(indx[i])
        choiceArr[i].visible = true
        choiceArr[rand1[i]].name = getChar[i]
        choiceArr[i].y = 600;

    };

    for (i = 0; i < 4; i++) {
        choiceArr[i].x = 340 + (i * 175);
    }

    pickanswers();
    for (i = 0; i < 4; i++) {
        choiceArr[i].visible = true
        choiceArr[i].id = i
        choiceArr[i].mouseEnabled = true;
        choiceArr[i].alpha = 1;

        choiceArr[i].mouseEnabled = true;
        choiceArr[i].cursor = "pointer";


    }


    question.Text = "";
    createTween()


}
function createTween() {

    chHolderMC.visible = true;
    chHolderMC.alpha = 0
    createjs.Tween.get(chHolderMC).wait(300).to({ alpha: 1 }, 300)

    ////////////////////////////////holder//////////////////////
    question.visible = true;
    question.alpha = 0
    createjs.Tween.get(question).wait(1000)
        .to({ alpha: 1 }, 1000)

    for (i = 0; i < 12; i++) {
        clueArr[i].visible = true;
        clueArr[i].alpha = 0
        createjs.Tween.get(clueArr[i]).wait(1000)
            .to({ alpha: 1 }, 1000)
    }

    ///////////////////////////choice tween////////////////////////////////////


    var val = 700
    for (i = 0; i < cLen; i++) {
        choiceArr[i].y = 570, choiceArr[i].x = choiceArr[i].x + 5;
        choiceArr[i].visible = true;
        choiceArr[i].alpha = 0;
		
        createjs.Tween.get(choiceArr[i]).wait(val).to({ y: 600, scaleX: choiceArrScale, scaleY: choiceArrScale, alpha: 1 }, val)
        val = val + 150
    }

    repTimeClearInterval = setTimeout(AddListenerFn, 3000)

  
}
function AddListenerFn() {

    clearTimeout(repTimeClearInterval)
    for (i = 0; i < cLen; i++) {
        choiceArr[i].addEventListener("click", answerSelected);
    }


    rst = 0;
    gameResponseTimerStart();
    restartTimer()
}


function pickanswers() {
    n = qno[cnt];

    switch (n) {
        case 0:

            ans[1] = "mane";
            ans[2] = "mean";
            ans[3] = "name";
            break;
        case 1:

            ans[1] = "deal";
            ans[2] = "lead";
            ans[3] = "lade";
            break;
        case 2:

            ans[1] = "edit";
            ans[2] = "tide";
            ans[3] = "tied";
            break;
        case 3:

            ans[1] = "evil";
            ans[2] = "live";
            ans[3] = "veil";
            break;
        case 4:

            ans[1] = "leap";
            ans[2] = "peal";
            ans[3] = "pale";
            break;
        case 5:

            ans[1] = "meat";
            ans[2] = "team";
            ans[3] = "tame";
            break;
        case 6:

            ans[1] = "nest";
            ans[2] = "sent";
            ans[3] = "tens";
            break;
        case 7:

            ans[1] = "pans";
            ans[2] = "span";
            ans[3] = "snap";
            break;
        case 8:

            ans[1] = "emit";
            ans[2] = "item";
            ans[3] = "time";
            break;
        case 9:

            ans[1] = "nope";
            ans[2] = "open";
            ans[3] = "peon";
            break;

    }
    console.log(ans[1] + " DDDDDDDDDDDDDDDDDDDDD")
    console.log(ans[2] + " DDDDDDDDDDDDDDDDDDDDD")
    console.log(ans[3] + " DDDDDDDDDDDDDDDDDDDDD")

}



//================================================//
function getCompareArray(aArr, aArr1) {
    var arr = []
    for (var i = 0; i < aArr.length; i++) {
        for (var j = 0; j < aArr1.length; j++) {
            if (aArr[i] == aArr1[j]) {
                aArr.splice(i, 1);
            }
        }
    }
    arr = aArr
    console.log("arr= " + arr)
    return arr
}

//===============================================//

function disablechoices() {
    for (i = 0; i < cLen; i++) {
        choiceArr[i].removeEventListener("click", answerSelected)

        choiceArr[i].cursor = "default";

        choiceArr[i].visible = false;

    }
    for (i = 0; i < 12; i++) {
        clueArr[i].visible = false;

    }
    question.visible = false
    chHolderMC.visible = false;
    //============================================//
    closeBtn.mouseEnabled = false;
    fullScreenBtn.mouseEnabled = false;
    volumeBtn.mouseEnabled = false;
}

function onRoll_over(e) {

}
function onRoll_out(e) {

}

function answerSelected(e) {
    e.preventDefault();
    lCnt++;

    uans = e.currentTarget.name;
    console.log("uans= " + uans)

    e.currentTarget.cursor = "pointer";

    strArr.push(uans);

    var str1 = uans;
    console.log("^^^^^^^" + str1)
    var indAnsVal = alphabetArr.indexOf(str1);
    clueArr[lCnt].gotoAndStop(indAnsVal);




    if (lCnt == 0 || lCnt == 4 || lCnt == 8) {
        str2 = str1.toLowerCase();
    } else {
        str2 = (str2 + str1).toLowerCase();
    }

    console.log("^^^^^^^" + str2)

    gameResponseTimerStop();

    if (lCnt == 3 || lCnt == 7 || lCnt == 11) {

        if (ans[1] == str2 && tent1 == 0) {
            console.log("ans[1]+++++++++++++++++++++++++++++++++++++" + ans[1])
            tent1++;
            str2 = [];
            if (lCnt == 11) {

                getValidation("correct");
                disablechoices();
            }

        }
        else if (ans[2] == str2 && tent2 == 0) {
            console.log("ans[1]+++++++++++++++++++++++++++++++++++++" + ans[1])
            tent2++;
            str2 = [];
            if (lCnt == 11) {

                getValidation("correct");
                disablechoices();
            }

        }
        else if (ans[3] == str2 && tent3 == 0) {
            console.log("ans[1]+++++++++++++++++++++++++++++++++++++" + lCnt)
            tent3++
            str2 = [];


            if (lCnt == 11) {

                getValidation("correct");
                disablechoices();
            }
        }
        else {
            getValidation("wrong");
            disablechoices();
        }
    }


}


function disableMouse() {
    for (i = 0; i < cLen; i++) {
        choiceArr[i].mouseEnabled = false;
    }
}

function enableMouse() {
    for (i = 0; i < cLen; i++) {

        var curName = choiceArr[i].id
        if (currentObj.indexOf(curName) == -1)
            choiceArr[i].mouseEnabled = true;
		
    }
}