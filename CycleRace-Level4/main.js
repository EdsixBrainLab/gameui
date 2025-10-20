
//////////////////////////////////////////////////////===========COMMON GAME VARIABLES==========/////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var assetsPath, gameAssetsPath, soundpath, bg;
var cnt = -1, qscnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 4, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, question, quesMarkMc, questionText, questionText1, resultLoading, preloadMc, background2, chHolderMc;
var startMc, questionInterval = 0, chHolderMc = 0, backGround1;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc, targetMc, titleBg;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0, type1Cnt = -1, type2Cnt = -1;
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
var settitle = 0;
////////////////////////////////////////////////////==========GAME SPECIFIC VARIABLES============/////////////////////////////////////////////////////////////
var position = 0;
var randomIndex = 39;
var bg1;
var runcnt = 0
var trackSpeed = 20;
var TOTAL_CYCLE = 6; // 
var stgWidth = 1050;

var isMobile, resizeCnt;
var pArr = []
var chVal, speed, count, spliceVal, introImg,introHintTextMc;
var qno1 = []
var qno = []
//////////////////////////////////////////////////////==========GAME SPECIFIC ARRAYS============/////////////////////////////////////////////////////////////
var choiceArr = []
var choiceArr1 = []

var cycleRaceQuestionBubble,
  cycleRaceTextChoiceWrappers = [],
  cycleRaceImageChoiceWrappers = [],
  cycleRaceTextChoicePositions = [],
  cycleRaceImageChoicePositions = [],
  cycleRaceHoverInHandler = null,
  cycleRaceHoverOutHandler = null;

var chPosArr = [1, 0, 2, 3, 1, 0, 2, 3, 1, 0] // Only 4 Choice 

var chPosArr1 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]// Only 10 questions Alternatively 

var chPosArr2 = [1, 2, 3, 4, 5, 6, 7, 8]  // IF Cycle Count reduces the array values should be reduced//
var chPosArr3 = [1, 2, 3, 4, 5, 6]

var self = this


var posY = [, 422, 442, 465, 483, 525, 545, 555, 588] // Cycle Y Position
var s1 = "";

var width_array = ["156.25", "156.25", "156.25", "156.25", "152.75", "156.25", "156.75", "156.25"] // Finish Position for cycles
var cycle_array = [];
//var speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.5, 0.8]; // Speed of cycles
var speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.5, 0.8]; // Speed of cycles

var speed_arry_1 = []

var sp = -1

/////////////////////////////////////////////////////////=========BROWSER SUPPORT============////////////////////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
	checkBrowserSupport();

}
var QusTxtString;
///////////////////////////////////////////////////////////////=========INITIALIZATION==========///////////////////////////////////////////////////////////////
function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	container = new createjs.Container();
	stage.addChild(container)

	cycleContainer = new createjs.Container()
	stage.addChild(cycleContainer);
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
	gameAssetsPath = "CycleRace-Level4/";
	soundpath = "FA/"

	var success = createManifest();
	if (success == 1) {
		manifest.push(


	{ id: "tMc", src: gameAssetsPath + "targetPanel.png" },
			{ id: "track1", src: gameAssetsPath + "Background.png" },
 
			{ id: "cycle1", src: gameAssetsPath + "BlueBoyCycle.png" },
			{ id: "cycle2", src: gameAssetsPath + "RedBoyCycle.png" },
			{ id: "cycle3", src: gameAssetsPath + "VioletBoyCycle.png" },
			{ id: "cycle4", src: gameAssetsPath + "YellowBoyCycle.png" },
			{ id: "cycle5", src: gameAssetsPath + "BlueGirlCycle.png" },
			{ id: "cycle6", src: gameAssetsPath + "GreenGirlCycle.png" },
			{ id: "cycle7", src: gameAssetsPath + "PinkGirlCycle.png" },
			{ id: "cycle8", src: gameAssetsPath + "YellowGirlCycle.png" },
			{ id: "cycle9", src: gameAssetsPath + "DemoGreenCycle.png" },

			{ id: "question1", src: gameAssetsPath + "ChoiceImages2.png" },
			{ id: "choice2", src: gameAssetsPath + "ChoiceImages2.png" },
			{ id: "chHolder", src: gameAssetsPath + "chHolder.png" },
			{ id: "introImg", src: gameAssetsPath + "introImg.png" },
			{ id: "question2", src: questionTextPath + "CycleRace-Level4-QT2.png" },
			{ id: "choice1", src: questionTextPath + "CycleRace-Level4-QT3.png" },
			{ id: "introHintTextMc", src: questionTextPath + "CycleRace-Level4-QT4.png" }
		)
		
		preloadAllAssets()
		stage.update();
	}

}
////////////////////////////////////////////////////////////==========PRELOADER===========////////////////////////////////////////////////////////////////      
function doneLoading1(event) {
	var event = assets[i];
	var id = event.item.id;
	uniquebackGround.alpha = 0;
	uniquebackGround.visible=false;
	if (id == "introImg") {

		introImg = new createjs.Bitmap(preload.getResult('introImg'));
		container.parent.addChild(introImg);
		introImg.visible = false;
	}
	if (id == "introHintTextMc") {

		introHintTextMc = new createjs.Bitmap(preload.getResult('introHintTextMc'));
		container.parent.addChild(introHintTextMc);
		introHintTextMc.visible = false;
	}
call_UI_gameQuestion(container,"Watch the animation carefully and answer the question");
	 

	if (id == "cycle1" || id == "cycle2" || id == "cycle3" || id == "cycle4" || id == "cycle5" || id == "cycle6" || id == "cycle7" || id == "cycle8" || id == "cycle9") {

		//	getCycles([])
		// Blueboycycle
		var spriteSheet1 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle1")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]
			}
		});
		cycle1 = new createjs.Sprite(spriteSheet1, "run");
		cycle1.x = 125;
		cycle1.y = 240;
		cycle1.stop();
		//
		// Redboycycle
		var spriteSheet2 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle2")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]
			}
		});
		cycle2 = new createjs.Sprite(spriteSheet2, "run");
		cycle2.x = 125;
		cycle2.y = 270;
		cycle2.stop();
		//VioletBoyCycle
		var spriteSheet3 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle3")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
		cycle3 = new createjs.Sprite(spriteSheet3, "run");
		cycle3.x = 125;
		cycle3.y = 300;
		cycle3.stop();


		var spriteSheet4 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle4")],
			"frames": { "regX": 82, "height": 307, "count": 307, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
		cycle4 = new createjs.Sprite(spriteSheet4, "run");
		cycle4.x = 125;
		cycle4.y = 330;
		cycle4.stop();

		//BlueGirl
		var spriteSheet5 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle5")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle5 = new createjs.Sprite(spriteSheet5, "run");
		cycle5.x = 125;
		cycle5.y = 360;
		cycle5.stop();
		//GreenGirl
		var spriteSheet6 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle6")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle6 = new createjs.Sprite(spriteSheet6, "run");
		cycle6.x = 125;
		cycle6.y = 390;
		cycle6.stop();
		//PinkGirl
		var spriteSheet7 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle7")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle7 = new createjs.Sprite(spriteSheet7, "run");
		cycle7.x = 125;
		cycle7.y = 390;
		cycle7.stop();
		//YellowGirl
		var spriteSheet8 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle8")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle8 = new createjs.Sprite(spriteSheet8, "run");
		cycle8.x = 125;
		cycle8.y = 420;
		cycle8.stop();

		var spriteSheet9 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle9")],
			"frames": { "regX": 82, "height": 311, "count": 308, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle9 = new createjs.Sprite(spriteSheet9, "run");
		// cycle9.x = 125;
		// cycle9.y = 420;
		cycle9.stop();

	}
	if (id == "track1") {
		track1 = new createjs.Bitmap(preload.getResult('track1'));
		container.parent.addChild(track1);
		track1.visible = false;
	}
	if (id == "track2") {
		track2 = new createjs.Bitmap(preload.getResult('track2'));
		container.parent.addChild(track2);
		track2.visible = false;
	}
	if (id == "tMc") {
		targetMc = new createjs.Bitmap(preload.getResult('tMc'));
		container.parent.addChild(targetMc);
		targetMc.visible = false;

	}

	if (id == "quesPanel") {
		var comp1 = AdobeAn.getComposition("685EFC8BED094E4F9358ADF4819FC236");
		var lib2 = comp1.getLibrary();
		quesPanel = new lib2.questionPanel()
		container.parent.addChild(quesPanel);
		quesPanel.visible = false;
	}

	if (id == "question1") {
		var spriteSheet9 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("question1")],
			"frames": { "regX": 82, "height": 239, "count": 300, "regY": 0, "width": 241 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                question1 = new createjs.Sprite(spriteSheet9, "run");
                container.parent.addChild(question1);

                question1.visible = false
                question1.regX = 241 / 2;
                question1.regY = 239 / 2;
                question1.x = 0;
                question1.y = 0;


	}
	if (id == "question2") {
		var spriteSheet10 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("question2")],
			"frames": { "regX": 82, "height": 63, "count": 300, "regY": 0, "width": 574 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                question2 = new createjs.Sprite(spriteSheet10, "run");
                container.parent.addChild(question2);

                question2.visible = false;
                question2.regX = 574 / 2;
                question2.regY = 63 / 2;
                question2.x = 0;
                question2.y = 0;
                questionText1 = question2.clone();
                questionText1.regX = question2.regX;
                questionText1.regY = question2.regY;
	}
	//

	if (id == "choice1") {
		var spriteSheet11 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("choice1")],
			"frames": { "regX": 82, "height": 78, "count": 0, "regY": 0, "width": 266 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                choice1 = new createjs.Sprite(spriteSheet11);
                container.parent.addChild(choice1);

                choice1.visible = false
                choice1.regX = 266 / 2;
                choice1.regY = 78 / 2;
                choice1.x = 0;
                choice1.y = 0;
        }
        if (id == "choice2") {
                var spriteSheet11 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("choice2")],
			"frames": { "regX": 82, "height": 239, "count": 0, "regY": 0, "width": 241 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                choice2 = new createjs.Sprite(spriteSheet11);
                container.parent.addChild(choice2);
                choice2.visible = false
                choice2.regX = 241 / 2;
                choice2.regY = 239 / 2;
                choice2.x = 0;
                choice2.y = 0;
        }


	if (id == "chHolder") {
		chHolderMc = new createjs.Bitmap(preload.getResult('chHolder'));
		container.parent.addChild(chHolderMc);
		chHolderMc.visible = false;
	}


	//=============================================================================//


}

function tick(e) {
	stage.update();
}
/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////=========GAME ELEMENTS CREATION===========//////////////////////////////////////////////////////
function CreateGameElements() {

	interval = setInterval(countTime, 1000);
	for (i = 0; i < 2; i++) {
		track1[i] = track1.clone()
		container.parent.addChild(track1[i])
		track1[i].visible = true;
		//track1[i].alpha=.1  
		stage.setChildIndex(track1[i], 1); // bring red to top
  stage.update();
	}
	container.parent.addChild(QusTxtString);
	// questionText.visible = true;
	container.parent.addChild(targetMc);
	targetMc.visible = false;

	container.parent.addChild(Title)
    Title.visible = true;

	for (i = 1; i <= 8; i++) {
		this["cycle" + i].visible = false;
		container.parent.addChild(this["cycle" + i])
		this["cycle" + i].scaleX = this["cycle" + i].scaleY = .5;
		this["cycle" + i].x = this["cycle" + i].x - 80
		this["cycle" + i].y = posY[i];

	}
        var choiceXArr = [480, 800, 480, 800]
        var choiceYArr = [468, 468, 598, 598]
        if (typeof SAUI_computeCenteredRow === "function") {
                var textRowLayout = SAUI_computeCenteredRow(2, {
                        centerX: 640,
                        baseSpacing: 340,
                        tileSpan: 340,
                        maxSpan: 680
                });
                var textRowPositions = textRowLayout && textRowLayout.positions;
                if (textRowPositions && textRowPositions.length >= 2) {
                        choiceXArr = [
                                textRowPositions[0],
                                textRowPositions[1],
                                textRowPositions[0],
                                textRowPositions[1]
                        ];
                }
                choiceYArr = [468, 468, 598, 598];
        }

        for (i = 0; i < choiceCnt; i++) {
                choiceArr[i] = choice1.clone()
                choiceArr[i].visible = false;
                choiceArr[i].x = 0;
                choiceArr[i].y = 0;
        }

        var choiceX1Arr =  [320, 520, 760, 960]
        var choiceY1Arr = [540, 540, 540, 540]
        if (typeof SAUI_computeCenteredRow === "function") {
                var imageRowLayout = SAUI_computeCenteredRow(4, {
                        centerX: 640,
                        baseSpacing: 220,
                        tileSpan: 220,
                        maxSpan: 880
                });
                var imageRowPositions = imageRowLayout && imageRowLayout.positions;
                if (imageRowPositions && imageRowPositions.length >= 4) {
                        choiceX1Arr = imageRowPositions;
                }
                choiceY1Arr = [540, 540, 540, 540];
        }

        for (i = 0; i < choiceCnt; i++) {
                choiceArr1[i] = choice2.clone()
                choiceArr1[i].visible = false;
                choiceArr1[i].scaleX = choiceArr1[i].scaleY = .78;
                choiceArr1[i].x = 0;
                choiceArr1[i].y = 0;
        }

        ensureCycleRaceQuestionSurface();
        initializeCycleRaceChoiceWrappers(
                choiceXArr,
                choiceYArr,
                choiceX1Arr,
                choiceY1Arr
        );

	// container.parent.addChild(TitleBtn);
	// TitleBtn.visible=true;
	
	chPosArr.sort(randomSort)
	//	chPosArr1.sort(randomSort)
	chPosArr2.sort(randomSort)
	chPosArr3.sort(randomSort)

	//this["cycle"+1].visible = true;


	console.log("isQuestionAllVariations= " + isQuestionAllVariations)
	/*if (isQuestionAllVariations) {
		createGameWiseQuestions()
		pickques()
	} else {
		pickques()
	}*/
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
	if (typeof refreshHudValues === "function") {
    refreshHudValues();
  } else if (typeof gameQCntTxt !== "undefined" && gameQCntTxt) {
    gameQCntTxt.text = quesCnt + "/" + String(totalQuestions);
  }
	cycle_array = []


	panelVisibleFn()
	//=================================================================================================================================//

	chHolderMc.x = 0;
	track1[0].x = 0;
	track1[1].x = 1280;

	container.parent.addChild(QusTxtString);
	QusTxtString.visible = true;

	targetMc.visible = false;
	//speed_arry_1 = [1.4, 1.3, 1.2, 1, 0.9, 0.8];
	  speed_arry_1 = [1.4, 1.2, 1, 0.8, 0.6, 0.4];



	//speed_arry = [1.4, 1, 1.2, 1.3, 0.8, 0.9];
	speed_arry =   [1.4, 1, 0.8, 1.2, 0.4, 0.6];

	speed_arry.sort(randomSort);
	pArr = between(1, 8)
	rand1 = range(1, 6)
	if (chPosArr1[cnt] == 0) {
		type1Cnt++
		spliceVal = pArr.indexOf(chPosArr2[type1Cnt])
		pArr.splice(spliceVal, 1)
		pArr[rand1] = chPosArr2[type1Cnt]
		for (i = 0; i < TOTAL_CYCLE; i++) {
			cycle_array[i] = this["cycle" + pArr[i + 1]].clone()
			container.parent.addChild(cycle_array[i])
			cycle_array[i].visible = true
			cycle_array[i].x = this["cycle" + (i + 1)].x
			cycle_array[i].y = posY[i + 1]
		}
	} else {
		for (i = 0; i < TOTAL_CYCLE; i++) {
			cycle_array[i] = this["cycle" + pArr[i + 1]].clone()
			container.parent.addChild(cycle_array[i])
			cycle_array[i].visible = true
			cycle_array[i].x = this["cycle" + (i + 1)].x
			cycle_array[i].y = posY[i + 1]
		}
	}
	//cycle_array = between(1, TOTAL_CYCLE);
	//questionFrame = Math.ceil(Math.random() * TOTAL_CYCLE);
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].play();
		cycle_array[i].addEventListener("tick", cycleMove)
	}

	createjs.Ticker.addEventListener("tick", roadMove)

	stage.update();
}

function cycleMove(event) {
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].x += speed_arry[i];
		if (cycle_array[i].currentFrame == 13) {
			cycle_array[i].gotoAndPlay(0)
		}
		var getStageValue = stgWidth - (width_array[i])

		if (event.currentTarget.x > getStageValue) {

			event.currentTarget.removeEventListener("tick", cycleMove);
			createjs.Ticker.removeEventListener("tick", roadMove);


			targetMc.visible = true;
			targetMc.x = 935;
			targetMc.y = 550;

			StopCycles()
		}
		var getFirstPlace = event.currentTarget.x;
		targetMc.x = getFirstPlace
		targetMc.y = 555;
	}
	}
//=============================================================================================//
function StopCycles() {

	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].stop()
		cycle_array[i].removeEventListener("tick", cycleMove)
	}
	for (i = 1; i <= TOTAL_CYCLE; i++) {
		this["cycle" + i].stop()
	}


	if (chPosArr1[cnt] == 0) {
		for (i = 0; i < TOTAL_CYCLE; i++) {
			if (chPosArr2[type1Cnt] == pArr[i + 1]) {
				speed = speed_arry[i]
			}
		}
		if (speed == 1.4) {
			chVal = 0
		} else if (speed == 1.2) {

			chVal = 1
		}
		else if (speed == 1) {

			chVal = 2
		}
		else if (speed == 0.8) {

			chVal = 3
		}
		else if (speed ==  0.6) {

			chVal = 4
		}

		else if (speed == 0.4) {
			chVal = 5


		}

	}
	else {
		type2Cnt++;
		speed = speed_arry_1[chPosArr3[type2Cnt] - 1]
		count = speed_arry.indexOf(speed)
	}
	console.log(speed)


	quesIntervel = setInterval(createQuestions, 3000);

}


//=============================================================================================//
function targetAdded() {
	targetMc.visible = true;

	targetMc.target.gotoAndPlay(2);
	createjs.Ticker.removeEventListener("tick", roadMove)
}
//=========================================================================================//
function roadMove(event) {
	track1[0].x -= trackSpeed;
	track1[1].x -= trackSpeed;


	if (track1[0].x < -1260) {
		track1[0].x = 1280;
	} else if (track1[1].x < -1260) {
		track1[1].x = 1280;

	}
}

//=============================================================================================//
function createQuestions() {
        clearInterval(quesIntervel)

        QusTxtString.visible = false;

        cycleRaceResetQuestionDisplay();

        for (i = 0; i < TOTAL_CYCLE; i++) {
                cycle_array[i].visible = false
        }

        if (cycleRaceQuestionBubble) {
                if (typeof SAUI_showCycleRaceSpeechBubble === "function") {
                        SAUI_showCycleRaceSpeechBubble(cycleRaceQuestionBubble, 40);
                } else {
                        cycleRaceQuestionBubble.visible = true;
                        cycleRaceQuestionBubble.alpha = 1;
                }
        }

        if (chPosArr1[cnt] == 0) {
                question1.visible = true;
                question1.scaleX = question1.scaleY = 1.02
                question1.gotoAndStop(chPosArr2[type1Cnt] - 1)
                question1.x = -220;
                question1.y = 6;

                if (questionText1) {
                        questionText1.visible = true;
                        questionText1.gotoAndStop(9);
                        questionText1.scaleX = questionText1.scaleY = 0.94;
                        questionText1.x = 200;
                        questionText1.y = -12;
                }

                rand = between(0, TOTAL_CYCLE - 1)
                val = rand.indexOf(chVal)
                rand.splice(val, 1)

                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = true;
                        choiceArr[i].gotoAndStop(rand[i])
                        choiceArr[i].name = rand[i]
                        if (choiceArr[i].__wrapper) {
                                if (typeof SAUI_resetCycleRaceOptionBubble === "function") {
                                        SAUI_resetCycleRaceOptionBubble(choiceArr[i].__wrapper);
                                }
                                if (choiceArr[i].__wrapper.__badgeLabel) {
                                        choiceArr[i].__wrapper.__badgeLabel.text = String.fromCharCode(65 + i);
                                }
                        } else {
                                choiceArr[i].alpha = 1;
                                choiceArr[i].x = cycleRaceTextChoicePositions[i].x;
                                choiceArr[i].y = cycleRaceTextChoicePositions[i].y;
                        }
                }
                choiceArr[chPosArr[cnt]].gotoAndStop(chVal)
                choiceArr[chPosArr[cnt]].name = chVal

                ans = chVal;

        } else {
                question2.visible = true;
                question2.scaleX = question2.scaleY = 1;
                question2.gotoAndStop(chPosArr3[type2Cnt] - 1)
                question2.x = 0;
                question2.y = -8;
                if (questionText1) {
                        questionText1.visible = false;
                }
                rand = between(0, 7)
                val = rand.indexOf(pArr[count + 1] - 1)
                rand.splice(val, 1)

                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = true;
                        choiceArr1[i].gotoAndStop(rand[i])
                        choiceArr1[i].name = rand[i]
                        if (choiceArr1[i].__wrapper) {
                                if (typeof SAUI_resetCycleRaceOptionBubble === "function") {
                                        SAUI_resetCycleRaceOptionBubble(choiceArr1[i].__wrapper);
                                }
                                if (choiceArr1[i].__wrapper.__badgeLabel) {
                                        choiceArr1[i].__wrapper.__badgeLabel.text = String.fromCharCode(65 + i);
                                }
                        } else {
                                choiceArr1[i].alpha = 1;
                                choiceArr1[i].x = cycleRaceImageChoicePositions[i].x;
                                choiceArr1[i].y = cycleRaceImageChoicePositions[i].y;
                        }
                }

                choiceArr1[chPosArr[cnt]].gotoAndStop(pArr[count + 1] - 1)
                choiceArr1[chPosArr[cnt]].name = pArr[count + 1] - 1
                ans = pArr[count + 1] - 1

        }

        enablechoices();
        createjs.Ticker.addEventListener("tick", tick);
        stage.update();

}

//==============================================================================================================================
======//
function enablechoices() {

        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = false;
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.visible = false;
                                choiceArr[i].__wrapper.alpha = 0;
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = false;
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.visible = false;
                                choiceArr1[i].__wrapper.alpha = 0;
                        }
                }
        }
        createTween()
}
function createTween() {
        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = true;
                        choiceArr[i].alpha = 1;
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.visible = true;
                                if (typeof SAUI_showCycleRaceOptionBubble === "function") {
                                        SAUI_showCycleRaceOptionBubble(choiceArr[i].__wrapper, 120 + i * 90);
                                } else {
                                        choiceArr[i].__wrapper.alpha = 1;
                                }
                        } else {
                                choiceArr[i].alpha = 0;
                                createjs.Tween.get(choiceArr[i]).wait(120 * (i + 1)).to({ alpha: 1 }, 360);
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = true;
                        choiceArr1[i].alpha = 1;
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.visible = true;
                                if (typeof SAUI_showCycleRaceOptionBubble === "function") {
                                        SAUI_showCycleRaceOptionBubble(choiceArr1[i].__wrapper, 160 + i * 110);
                                } else {
                                        choiceArr1[i].__wrapper.alpha = 1;
                                }
                        } else {
                                choiceArr1[i].alpha = 0;
                                createjs.Tween.get(choiceArr1[i]).wait(160 * (i + 1)).to({ alpha: 1 }, 360);
                        }
                }

        }

        repTimeClearInterval = setTimeout(AddListenerFn, 1400)
}
function AddListenerFn() {
        clearTimeout(repTimeClearInterval)
        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].cursor = "pointer";
                        choiceArr[i].visible = true;
                        choiceArr[i].addEventListener("click", answerSelected)
                        choiceArr[i].mouseEnabled = true
                        if (cycleRaceHoverInHandler) {
                                choiceArr[i].addEventListener("mouseover", cycleRaceHoverInHandler);
                                choiceArr[i].addEventListener("mouseout", cycleRaceHoverOutHandler);
                        }
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.cursor = "pointer";
                                if (typeof SAUI_startCycleRaceOptionIdle === "function") {
                                        SAUI_startCycleRaceOptionIdle(choiceArr[i].__wrapper);
                                }
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].cursor = "pointer";
                        choiceArr1[i].visible = true;
                        choiceArr1[i].addEventListener("click", answerSelected)
                        choiceArr1[i].mouseEnabled = true
                        if (cycleRaceHoverInHandler) {
                                choiceArr1[i].addEventListener("mouseover", cycleRaceHoverInHandler);
                                choiceArr1[i].addEventListener("mouseout", cycleRaceHoverOutHandler);
                        }
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.cursor = "pointer";
                                if (typeof SAUI_startCycleRaceOptionIdle === "function") {
                                        SAUI_startCycleRaceOptionIdle(choiceArr1[i].__wrapper);
                                }
                        }
                }
        }
        rst = 0;
        gameResponseTimerStart();
        restartTimer()
}
function disablechoices() {
        for (i = 0; i < choiceCnt; i++) {
                choiceArr[i].visible = false
                choiceArr[i].removeEventListener("click", answerSelected);
                if (cycleRaceHoverInHandler) {
                        choiceArr[i].removeEventListener("mouseover", cycleRaceHoverInHandler);
                        choiceArr[i].removeEventListener("mouseout", cycleRaceHoverOutHandler);
                }
                choiceArr[i].cursor = "default";
                if (choiceArr[i].__wrapper) {
                        choiceArr[i].__wrapper.visible = false;
                        choiceArr[i].__wrapper.alpha = 0;
                        choiceArr[i].__wrapper.mouseEnabled = false;
                        choiceArr[i].__wrapper.cursor = "default";
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(choiceArr[i].__wrapper);
                        }
                }
                choiceArr1[i].visible = false
                choiceArr1[i].removeEventListener("click", answerSelected);
                if (cycleRaceHoverInHandler) {
                        choiceArr1[i].removeEventListener("mouseover", cycleRaceHoverInHandler);
                        choiceArr1[i].removeEventListener("mouseout", cycleRaceHoverOutHandler);
                }
                choiceArr1[i].cursor = "default";
                if (choiceArr1[i].__wrapper) {
                        choiceArr1[i].__wrapper.visible = false;
                        choiceArr1[i].__wrapper.alpha = 0;
                        choiceArr1[i].__wrapper.mouseEnabled = false;
                        choiceArr1[i].__wrapper.cursor = "default";
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(choiceArr1[i].__wrapper);
                        }
                }
        }
        if (questionText1) {
                questionText1.visible = false;
        }
        if (cycleRaceQuestionBubble && typeof SAUI_hideCycleRaceSpeechBubble === "function") {
                SAUI_hideCycleRaceSpeechBubble(cycleRaceQuestionBubble);
        }
        if (chHolderMc) {
                chHolderMc.visible = false;
        }
        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
}
//===================================================================MOUSE ROLL OVER/ROLL OUT===================================
===========================//

function answerSelected(e) {
        e.preventDefault();
        uans = e.currentTarget.name;
        console.log("answer" + uans);
        console.log(ans + " =correct= " + uans)
        gameResponseTimerStop();
        var wrapper = e.currentTarget.__wrapper;
        if (wrapper) {
                if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                        SAUI_stopCycleRaceOptionIdle(wrapper);
                }
                if (typeof SAUI_setCycleRaceOptionHoverState === "function") {
                        SAUI_setCycleRaceOptionHoverState(wrapper, false);
                }
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(wrapper, ans == uans);
                }
        }
        if (ans != uans) {
                cycleRaceMarkCorrectWrapper();
        }
        if (ans == uans) {

                getValidation("correct");
                disablechoices();
        } else {
                getValidation("wrong");
                disablechoices();
        }
}
function ensureCycleRaceQuestionSurface() {

        if (typeof SAUI_createCycleRaceSpeechBubble === "function") {
                if (!cycleRaceQuestionBubble) {
                        cycleRaceQuestionBubble = SAUI_createCycleRaceSpeechBubble({
                                width: 780,
                                height: 300,
                                tailHeight: 60,
                                tailWidth: 150,
                                cornerRadius: 52,
                                title: "Question"
                        });
                        cycleRaceQuestionBubble.x = 640;
                        cycleRaceQuestionBubble.y = 248;
                }

                if (!cycleRaceQuestionBubble.parent) {
                        container.parent.addChild(cycleRaceQuestionBubble);
                }

                if (cycleRaceQuestionBubble.__content) {
                        if (question1 && question1.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(question1);
                        }
                        if (question2 && question2.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(question2);
                        }
                        if (questionText1 && questionText1.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(questionText1);
                        }
                }
        } else {
                if (question1 && !question1.parent) {
                        container.parent.addChild(question1);
                }
                if (question2 && !question2.parent) {
                        container.parent.addChild(question2);
                }
                if (questionText1 && !questionText1.parent) {
                        container.parent.addChild(questionText1);
                }
        }

        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
        if (questionText1) {
                questionText1.visible = false;
        }
}

function initializeCycleRaceChoiceWrappers(choiceXArr, choiceYArr, choiceX1Arr, choiceY1Arr) {

        cycleRaceTextChoicePositions = [];
        cycleRaceImageChoicePositions = [];

        for (var idx = 0; idx < choiceCnt; idx++) {
                cycleRaceTextChoicePositions[idx] = {
                        x: choiceXArr[idx],
                        y: choiceYArr[idx]
                };
                cycleRaceImageChoicePositions[idx] = {
                        x: choiceX1Arr[idx],
                        y: choiceY1Arr[idx]
                };
        }

        if (!cycleRaceHoverInHandler) {
                cycleRaceHoverInHandler = function (e) {
                        if (!e || !e.currentTarget) {
                                return;
                        }
                        var wrapper = e.currentTarget.__wrapper;
                        if (wrapper && typeof SAUI_setCycleRaceOptionHoverState === "function") {
                                SAUI_setCycleRaceOptionHoverState(wrapper, true);
                        }
                };
                cycleRaceHoverOutHandler = function (e) {
                        if (!e || !e.currentTarget) {
                                return;
                        }
                        var wrapper = e.currentTarget.__wrapper;
                        if (wrapper && typeof SAUI_setCycleRaceOptionHoverState === "function") {
                                SAUI_setCycleRaceOptionHoverState(wrapper, false);
                        }
                };
        }

        for (var i1 = 0; i1 < choiceCnt; i1++) {
                var textWrapper = cycleRaceTextChoiceWrappers[i1];
                if (!textWrapper && typeof SAUI_createCycleRaceOptionBubble === "function") {
                        textWrapper = SAUI_createCycleRaceOptionBubble({ variant: "text" });
                        cycleRaceTextChoiceWrappers[i1] = textWrapper;
                }

                if (textWrapper) {
                        textWrapper.visible = false;
                        textWrapper.alpha = 0;
                        textWrapper.mouseEnabled = false;
                        textWrapper.cursor = "default";
                        textWrapper.x = cycleRaceTextChoicePositions[i1].x;
                        textWrapper.y = cycleRaceTextChoicePositions[i1].y;
                        if (!textWrapper.parent) {
                                container.parent.addChild(textWrapper);
                        }
                        if (textWrapper.__content && choiceArr[i1] && choiceArr[i1].parent !== textWrapper.__content) {
                                textWrapper.__content.addChild(choiceArr[i1]);
                        } else if (choiceArr[i1] && choiceArr[i1].parent !== textWrapper) {
                                textWrapper.addChild(choiceArr[i1]);
                        }
                        if (textWrapper.__badgeLabel) {
                                textWrapper.__badgeLabel.text = "";
                        }
                } else if (choiceArr[i1] && !choiceArr[i1].parent) {
                        container.parent.addChild(choiceArr[i1]);
                }

                if (choiceArr[i1]) {
                        choiceArr[i1].visible = false;
                        choiceArr[i1].alpha = 1;
                        choiceArr[i1].x = 0;
                        choiceArr[i1].y = 0;
                        choiceArr[i1].mouseChildren = false;
                        choiceArr[i1].cursor = "pointer";
                        choiceArr[i1].__wrapper = textWrapper;
                        if (textWrapper && textWrapper.__hitArea) {
                                choiceArr[i1].hitArea = textWrapper.__hitArea;
                        } else if (!textWrapper) {
                                choiceArr[i1].x = cycleRaceTextChoicePositions[i1].x;
                                choiceArr[i1].y = cycleRaceTextChoicePositions[i1].y;
                        }
                }

                var imageWrapper = cycleRaceImageChoiceWrappers[i1];
                if (!imageWrapper && typeof SAUI_createCycleRaceOptionBubble === "function") {
                        imageWrapper = SAUI_createCycleRaceOptionBubble({ variant: "image" });
                        cycleRaceImageChoiceWrappers[i1] = imageWrapper;
                }

                if (imageWrapper) {
                        imageWrapper.visible = false;
                        imageWrapper.alpha = 0;
                        imageWrapper.mouseEnabled = false;
                        imageWrapper.cursor = "default";
                        imageWrapper.x = cycleRaceImageChoicePositions[i1].x;
                        imageWrapper.y = cycleRaceImageChoicePositions[i1].y;
                        if (!imageWrapper.parent) {
                                container.parent.addChild(imageWrapper);
                        }
                        if (imageWrapper.__content && choiceArr1[i1] && choiceArr1[i1].parent !== imageWrapper.__content) {
                                imageWrapper.__content.addChild(choiceArr1[i1]);
                        } else if (choiceArr1[i1] && choiceArr1[i1].parent !== imageWrapper) {
                                imageWrapper.addChild(choiceArr1[i1]);
                        }
                        if (imageWrapper.__badgeLabel) {
                                imageWrapper.__badgeLabel.text = "";
                        }
                } else if (choiceArr1[i1] && !choiceArr1[i1].parent) {
                        container.parent.addChild(choiceArr1[i1]);
                }

                if (choiceArr1[i1]) {
                        choiceArr1[i1].visible = false;
                        choiceArr1[i1].alpha = 1;
                        choiceArr1[i1].x = 0;
                        choiceArr1[i1].y = 0;
                        choiceArr1[i1].mouseChildren = false;
                        choiceArr1[i1].cursor = "pointer";
                        choiceArr1[i1].__wrapper = imageWrapper;
                        if (imageWrapper && imageWrapper.__hitArea) {
                                choiceArr1[i1].hitArea = imageWrapper.__hitArea;
                        } else if (!imageWrapper) {
                                choiceArr1[i1].x = cycleRaceImageChoicePositions[i1].x;
                                choiceArr1[i1].y = cycleRaceImageChoicePositions[i1].y;
                        }
                }
        }
}

function cycleRaceResetQuestionDisplay() {

        if (cycleRaceQuestionBubble) {
                if (typeof SAUI_hideCycleRaceSpeechBubble === "function") {
                        SAUI_hideCycleRaceSpeechBubble(cycleRaceQuestionBubble);
                } else {
                        cycleRaceQuestionBubble.visible = false;
                        cycleRaceQuestionBubble.alpha = 0;
                }
        }

        for (var i2 = 0; i2 < choiceCnt; i2++) {
                if (cycleRaceTextChoiceWrappers[i2]) {
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(cycleRaceTextChoiceWrappers[i2]);
                        }
                        cycleRaceTextChoiceWrappers[i2].visible = false;
                        cycleRaceTextChoiceWrappers[i2].alpha = 0;
                        cycleRaceTextChoiceWrappers[i2].mouseEnabled = false;
                        if (cycleRaceTextChoiceWrappers[i2].__badgeLabel) {
                                cycleRaceTextChoiceWrappers[i2].__badgeLabel.text = "";
                        }
                }
                if (cycleRaceImageChoiceWrappers[i2]) {
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(cycleRaceImageChoiceWrappers[i2]);
                        }
                        cycleRaceImageChoiceWrappers[i2].visible = false;
                        cycleRaceImageChoiceWrappers[i2].alpha = 0;
                        cycleRaceImageChoiceWrappers[i2].mouseEnabled = false;
                        if (cycleRaceImageChoiceWrappers[i2].__badgeLabel) {
                                cycleRaceImageChoiceWrappers[i2].__badgeLabel.text = "";
                        }
                }
                if (choiceArr[i2]) {
                        choiceArr[i2].visible = false;
                        choiceArr[i2].alpha = 1;
                }
                if (choiceArr1[i2]) {
                        choiceArr1[i2].visible = false;
                        choiceArr1[i2].alpha = 1;
                }
        }

        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
        if (questionText1) {
                questionText1.visible = false;
        }
}

function cycleRaceMarkCorrectWrapper() {
        if (chPosArr1[cnt] == 0 && choiceArr[chPosArr[cnt]] && choiceArr[chPosArr[cnt]].__wrapper) {
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(choiceArr[chPosArr[cnt]].__wrapper, true);
                }
        } else if (choiceArr1[chPosArr[cnt]] && choiceArr1[chPosArr[cnt]].__wrapper) {
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(choiceArr1[chPosArr[cnt]].__wrapper, true);
                }
        }
}
