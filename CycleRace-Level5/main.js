
//////////////////////////////////////////////////////===========COMMON GAME VARIABLES==========/////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var assetsPath, gameAssetsPath, soundpath, bg;
var cnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 4, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, question, quesMarkMc, questionText, resultLoading, preloadMc, background2, chHolderMc;
var startMc, questionInterval = 0, chHolderMc = 0, backGround1;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc, gameTitleMc;
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
var TOTAL_CYCLE = 7; // 
var stgWidth = 1050;

var isMobile, resizeCnt;
var pArr = []
var chVal, speed, count, introImg, introHintTextMc
//////////////////////////////////////////////////////==========GAME SPECIFIC ARRAYS============/////////////////////////////////////////////////////////////
var choiceArr = []
var choiceArr1 = []
var qno = []
var chPosArr = [1, 0, 2, 3, 1, 0, 2, 3, 1, 0, 0, 1, 2, 3, 1, 2] // Only 16 for all variations // Only 10 for 10 question variations

var chPosArr1 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]// Only 10  questions Alternatively // change array to 10 for 10 question variations

var chPosArr2 = [7, 1, 2, 3, 4, 5, 6]  // IF Cycle Count reduces the array values should be reduced//
var chPosArr3 = [7, 1, 2, 3, 4, 5, 6]

var self = this


var posY = [, 400, 420, 440, 460, 480, 500, 530, 545] // Cycle Y Position
var s1 = "";

var width_array = ["156.25", "156.25", "156.25", "156.25", "152.75", "156.25", "156.75", "156.25"] // Finish Position for cycles
var cycle_array = [];
var speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.8]; // Speed of cycles
var speed_arry_1 = []

var sp = -1

/////////////////////////////////////////////////////////=========BROWSER SUPPORT============////////////////////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
	checkBrowserSupport();

}
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
	gameAssetsPath = "CycleRace-Level5/";
	soundpath = "FA/"

	var success = createManifest();
	if (success == 1) {
		manifest.push(

			{ id: "tMc", src: gameAssetsPath + "targetPanel.png" },
			{ id: "track1", src: gameAssetsPath + "Background.png" },
			{ id: "questiontext", src: questionTextPath + "CycleRace-Level5-QT1.png" },
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
			{ id: "question2", src: questionTextPath + "CycleRace-Level5-QT2.png" },
			{ id: "choice1", src: questionTextPath + "CycleRace-Level5-QT3.png" },
			{ id: "introHintTextMc", src: questionTextPath + "CycleRace-Level5-QT4.png" }
		)
		preloadAllAssets()
		stage.update();
	}

}
////////////////////////////////////////////////////////////==========PRELOADER===========////////////////////////////////////////////////////////////////      
function doneLoading1(event) {
	var event = assets[i];
	var id = event.item.id;
	if (id == "questiontext") {

		questionText = new createjs.Bitmap(preload.getResult('questiontext'));
		container.parent.addChild(questionText);
		questionText.visible = false;
	}
	if (id == "introHintTextMc") {

		introHintTextMc = new createjs.Bitmap(preload.getResult('introHintTextMc'));
		container.parent.addChild(introHintTextMc);
		introHintTextMc.visible = false;
	}
	if (id == "introImg") {

		introImg = new createjs.Bitmap(preload.getResult('introImg'));
		container.parent.addChild(introImg);
		introImg.visible = false;
	}
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
		questionText1 = question2.clone();
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
	}


	if (id == "chHolder") {
		chHolderMc = new createjs.Bitmap(preload.getResult('chHolder'));
		container.parent.addChild(chHolderMc);
		chHolderMc.visible = false;
	}


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
	}
	container.parent.addChild(targetMc);
	targetMc.visible = false;

	container.parent.addChild(Title)
    Title.visible = true;

	container.parent.addChild(questionText);
	for (i = 1; i <= TOTAL_CYCLE; i++) {
		this["cycle" + i].visible = false;
		container.parent.addChild(this["cycle" + i])
		this["cycle" + i].scaleX = this["cycle" + i].scaleY = .5;
		this["cycle" + i].x = this["cycle" + i].x - 80
		this["cycle" + i].y = posY[i];

	}
	container.parent.addChild(question1, question2)
	container.parent.addChild(choice1, choice2)

	question1.gotoAndStop(0)
	question2.gotoAndStop(0)

	choice1.gotoAndStop(0)
	choice2.gotoAndStop(0)

	var choiceXArr = [420, 790, 420, 790]
	var choiceYArr = [290, 290, 420, 420]

	for (i = 0; i < choiceCnt; i++) {
		choiceArr[i] = choice1.clone()
		choiceArr[i].visible = false;
		choiceArr[i].x = choiceXArr[i]
		choiceArr[i].y = choiceYArr[i]
		container.parent.addChild(choiceArr[i])
	}

	var choiceX1Arr = [220, 420, 620, 820]

	for (i = 0; i < choiceCnt; i++) {
		choiceArr1[i] = choice2.clone()
		container.parent.addChild(choiceArr1[i])
		choiceArr1[i].visible = false;
		choiceArr1[i].x = choiceX1Arr[i]
		choiceArr1[i].scaleX = choiceArr1[i].scaleY = .8;
		choiceArr1[i].y = 400;
	}

	chPosArr.sort(randomSort)
	chPosArr2.sort(randomSort)
	chPosArr3.sort(randomSort)

	// container.parent.addChild(TitleBtn);
	// TitleBtn.visible=true;
	
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

	cnt++;
	quesCnt++;
	cycle_array = []

	panelVisibleFn()
	//=================================================================================================================================//
	chHolderMc.x = 0;
	track1[0].x = 0;
	track1[1].x = 1280;

	container.parent.addChild(questionText);
	questionText.visible = true;

	targetMc.visible = false;
	// speed_arry_1 = [1.8, 1.6, 1.4, 1.2, 1.0, 0.6, 0.3];
	// speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.6];
	speed_arry_1 = [1.6, 1.4, 1.2, 1.0, 0.8, 0.6, 0.4];
	speed_arry = [1.6, 1.4, 0.6, 0.4, 1.2, 1.0, 0.8]
	speed_arry.sort(randomSort);
	pArr = between(1, TOTAL_CYCLE)
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i] = this["cycle" + pArr[i + 1]].clone()
		container.parent.addChild(cycle_array[i])
		cycle_array[i].visible = true
		cycle_array[i].x = this["cycle" + (i + 1)].x
		cycle_array[i].y = posY[i + 1] + 20
	}
	//cycle_array = between(1, TOTAL_CYCLE);
	//questionFrame = Math.ceil(Math.random() * TOTAL_CYCLE);
	console.log("check= " + pArr)

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
			createjs.Ticker.removeEventListener("tick", roadMove)
			
			targetMc.visible = true;
		 
			targetMc.x = 935;
			targetMc.y = 550;

			StopCycles()
		}
		
	}
	var getFirstPlace =  event.currentTarget.x; 
	targetMc.x = getFirstPlace
	targetMc.y = 555;

  	 
	// if (event.currentTarget.x < 900 && event.currentTarget.x > 896.5) {
	
	// 	targetMc.x = 0 - 190;
	// }
	// else if (event.currentTarget.x < 896) {
	// 	console.log("22222222222")
	// 	targetMc.x = 0 - 200;

	// }
	// else if (event.currentTarget.x == 896.20000) {
	// 	console.log("4444444444444444444444")
	// 	targetMc.x = 0 - 160;

	// }
	// else if (event.currentTarget.x < 905 && event.currentTarget.x > 900) {
	// 	console.log("5555555555555")
	// 	targetMc.x = 0 - 180;

	// }
	// else {
	// 	console.log("3333333333")
	// 	targetMc.x = 0 - 190;
	// }
}

//=============================================================================================//
function StopCycles() {
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].stop()
		cycle_array[i].removeEventListener("tick", cycleMove)
		 
	}
	cycle_array.sort(function(a, b){return b-a});

 


	for (i = 1; i <= TOTAL_CYCLE; i++) {
		this["cycle" + i].stop()

	}
	if (chPosArr1[cnt] == 0) {
		type1Cnt++
		for (i = 0; i < 8; i++) {
			if (chPosArr2[type1Cnt] == pArr[i + 1]) {
				speed = speed_arry[i]
			}
		}
		// [1.8, 1.6, 1.4, 1.2, 1.0, 0.8, 0.6, 0.4];

		if (speed == 1.6) {
			chVal = 0
		} else if (speed == 1.4) {
			chVal = 1
		}
		else if (speed == 1.2) {
			chVal = 2
		}
		else if (speed == 1.0) {
			chVal = 3
		}
		else if (speed ==  0.8) {
			chVal = 4
		}
		else if (speed == 0.6) {
			chVal = 5
		}
		else if (speed == 0.4) {
			chVal = 6
		}
	}
	else {
		type2Cnt++;
		speed = speed_arry_1[chPosArr3[type2Cnt] - 1]
		count = speed_arry.indexOf(speed)
	}
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

	container.parent.addChild(chHolderMc);
	container.parent.addChild(question1, question2)

	questionText.visible = false;
	chHolderMc.visible = true;
	question1.x = 150; question1.y = 245;
	question2.x = 360; question2.y = 220;

	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].visible = false
	}
	if (chPosArr1[cnt] == 0) {
		question1.visible = true;
		question1.gotoAndStop(chPosArr2[type1Cnt] - 1)

		container.parent.addChild(questionText1);
		questionText1.gotoAndStop(9);
		questionText1.x = 440; questionText1.y = 230;
		questionText1.visible = true;

		rand = between(0, TOTAL_CYCLE - 1)
		val = rand.indexOf(chVal)
		rand.splice(val, 1)

		chHolderMc.x = chHolderMc.x + 30;

		for (i = 0; i < choiceCnt; i++) {
			choiceArr[i].visible = true;
			container.parent.addChild(choiceArr[i])
			choiceArr[i].gotoAndStop(rand[i])
			choiceArr[i].name = rand[i]
		}
		choiceArr[chPosArr[cnt]].gotoAndStop(chVal)
		choiceArr[chPosArr[cnt]].name = chVal
		ans = chVal
	} else {

		question2.visible = true;
		question2.gotoAndStop(chPosArr3[type2Cnt] - 1)

		rand = between(0, TOTAL_CYCLE - 1)
		val = rand.indexOf(pArr[count + 1] - 1)
		rand.splice(val, 1)

		for (i = 0; i < choiceCnt; i++) {
			choiceArr1[i].visible = true;
			container.parent.addChild(choiceArr1[i])
			choiceArr1[i].gotoAndStop(rand[i])
			choiceArr1[i].name = rand[i]
		}
		choiceArr1[chPosArr[cnt]].gotoAndStop(pArr[count + 1] - 1)
		choiceArr1[chPosArr[cnt]].name = pArr[count + 1] - 1
		ans = pArr[count + 1] - 1
	}


	enablechoices();
	createjs.Ticker.addEventListener("tick", tick);
	stage.update();
}

//====================================================================================================================================//
function enablechoices() {
	if (chPosArr1[cnt] == 0) {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr[i].visible = false;
		}
	} else {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr1[i].visible = false;
		}
	}

	createTween()
}
function createTween() {
	if (chPosArr1[cnt] == 0) {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr[i].visible = true;
			choiceArr[i].alpha = 0;
		}
		createjs.Tween.get(choiceArr[0]).wait(100).to({ alpha: 0 }, 500).to({ alpha: 1 })
		createjs.Tween.get(choiceArr[1]).wait(200).to({ alpha: 0 }, 500).to({ alpha: 1 })
		createjs.Tween.get(choiceArr[2]).wait(300).to({ alpha: 0 }, 500).to({ alpha: 1 })
		createjs.Tween.get(choiceArr[3]).wait(400).to({ alpha: 0 }, 500).to({ alpha: 1 })
	} else {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr1[i].visible = true;
			choiceArr1[i].alpha = 0;
		}
		createjs.Tween.get(choiceArr1[0]).wait(200).to({ x: choiceArr1[0].x, y: 310, alpha: 0 }, 500).to({ x: choiceArr1[0].x, y: 330, alpha: 0.5 }, 500).to({ x: choiceArr1[0].x, y: 310, alpha: 1 })
		createjs.Tween.get(choiceArr1[1]).wait(300).to({ x: choiceArr1[1].x, y: 330, alpha: 0 }, 500).to({ x: choiceArr1[1].x, y: 310, alpha: 0.5 }, 500).to({ x: choiceArr1[1].x, y: 310, alpha: 1 })
		createjs.Tween.get(choiceArr1[2]).wait(600).to({ x: choiceArr1[2].x, y: 310, alpha: 0 }, 500).to({ x: choiceArr1[2].x, y: 330, alpha: 0.5 }, 500).to({ x: choiceArr1[2].x, y: 310, alpha: 1 })
		createjs.Tween.get(choiceArr1[3]).wait(800).to({ x: choiceArr1[3].x, y: 330, alpha: 0 }, 500).to({ x: choiceArr1[3].x, y: 310, alpha: 0.5 }, 500).to({ x: choiceArr1[3].x, y: 310, alpha: 1 })

	}


	repTimeClearInterval = setTimeout(AddListenerFn, 1400)
}
function AddListenerFn() {
	clearTimeout(repTimeClearInterval)
	console.log("eventlisterneer")
	if (chPosArr1[cnt] == 0) {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr[i].cursor = "pointer";
			choiceArr[i].addEventListener("click", answerSelected)
			choiceArr[i].cursor = "pointer";
			choiceArr[i].mouseEnabled = true
		}
	} else {
		for (i = 0; i < choiceCnt; i++) {
			choiceArr1[i].cursor = "pointer";
			choiceArr1[i].addEventListener("click", answerSelected)
			choiceArr1[i].cursor = "pointer";
			choiceArr1[i].mouseEnabled = true
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
		choiceArr[i].cursor = "default";
		choiceArr1[i].visible = false
		choiceArr1[i].removeEventListener("click", answerSelected);
		choiceArr1[i].cursor = "default";
	}
	questionText1.visible = false;
	chHolderMc.visible = false;
	question1.visible = false;
	question2.visible = false;
}
function answerSelected(e) {
	e.preventDefault();
	uans = e.currentTarget.name;
	console.log("answer" + uans);
	console.log(ans + " =correct= " + uans)
	gameResponseTimerStop();
	if (ans == uans) {
		e.currentTarget.visible = true;
		disableMouse()
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

	for (i = 0; i < choiceCnt; i++) {
		choiceArr[i].mouseEnabled = false
		choiceArr1[i].mouseEnabled = false
	}
}

function enableMouse() {

}





