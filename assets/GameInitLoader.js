//////////////////////////////////////////////////////////////////======LOADER=======///////////////////////////////////////////////////////////////////////
var wrongSnd, gameOverSnd, timeOverSnd, correctSnd, BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var scoreImgMc, ResponseImgMc, questionImgMc, AttemptsImgMc, CorrectImgMc;
var intChkVar = -1
var gamename = "gname=" + getJSName;
//var introStartCnt = -1;
var titleName;
// var TitleBtn, TitleBtn1, TitleBtn2, TitleBtn3, TitleBtn4;
var TitleContaier;
var extradot = "";

//var introStartCnt = -1;
var TotalAssetsCnt = 33
var betweenChars = ' '; // a space
var volumeBtn1, QuesCntMc1, fullScreenBtn1, closeBtn1, QuesCntMc2;
var hudContainer,
    hudBackgroundShape,
    hudHighlightShape,
    scoreCardContainer,
    timerCardContainer,
    hudQuestionCardContainer,

    controlContainer,
    volumeBtnWrapper,
    fullScreenBtnWrapper,
    closeBtnWrapper,
    questionProgressBarBg,
    questionProgressBarFill;

var HowToPlayScreenImg,
    howToPlayImageMc;

var HUD_CARD_WIDTH = 50;
var HUD_CARD_HEIGHT = 50;
var HUD_CARD_CORNER_RADIUS = 20;
var HUD_CARD_ACCENT_WIDTH = 140;
var HUD_CARD_SPACING = 590;
var QUESTION_PROGRESS_WIDTH = 80;

function formatTimerValue(totalSeconds) {
    totalSeconds = Math.max(0, parseInt(totalSeconds, 10) || 0);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
   // return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	return totalSeconds;
}

if (typeof window !== "undefined") {
    window.formatTimerValue = formatTimerValue;
}






function createLoader() {

    loaderColor = createjs.Graphics.getRGB(254, 198, 44, 1);
    var loaderColor1 = createjs.Graphics.getRGB(254, 198, 44, 1);
    loaderBar = new createjs.Container();
    var txt = new createjs.Container();
    bar = new createjs.Shape();
    bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 600;

    //

    loadProgressLabel = new createjs.Text("", "20px 'Baloo 2'", "#000");
    loadProgressLabel.lineWidth = 400;
    loadProgressLabel.textAlign = "center";
    txt.addChild(loadProgressLabel)
    txt.x = 260;
    txt.y = 35;


    var bgBar = new createjs.Shape();
    var padding = 3
    bgBar.graphics.setStrokeStyle(2).beginStroke(loaderColor1).drawRoundRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding, 5);
    loaderBar.x = 1300 - loaderWidth >> 1;
    loaderBar.y = 1220 - barHeight >> 1;
    loaderBar.addChild(bar, bgBar, txt);
    stage.addChild(loaderBar);



}


//////////////////////////////////////////////////////////////////======DEFAULT MANIFEST ASSETS=======////////////////////////////////////////////////////////



function createManifest() {

    var VarTitle = GameNameWithLvl + "-Title.png";

    /* Always specify the following terms as given  

         1. redirecturl.json path as "redirectJsonPath"

         2. Intro text image name as "IntroScreen.png""

    */
    manifest = [
        ////////////////////===PARROT IMAGES====////////////////

        { id: "correctImg", src: assetsPathLang + "wow.png" },
        { id: "wrongImg", src: assetsPathLang + "oops.png" },
        { id: "gameOverImg", src: assetsPathLang + "gameover.png" },
        { id: "timeOverImg", src: assetsPathLang + "timeover.png" },
        { id: "questionOverImg", src: assetsPathLang + "questionover.png" },
        //////////////////====AUDIO=====//////////////////////// //4

        { id: "begin", src: assetsPathLang + "bg_snd.ogg" },
        { id: "correct", src: assetsPathLang + "wow_s.ogg" },
        { id: "wrong", src: assetsPathLang + "oops_s.ogg" },
        { id: "gameOver", src: assetsPathLang + "Game_over.ogg" },
        { id: "timeOver", src: assetsPathLang + "timeover_s.ogg" },
        { id: "tick", src: assetsPathLang + "TickSound.ogg" },


        /////////////////////===RESULT===///////////////////// 10

        { id: "resultLoading", src: assetsPathLang + "ResultLoading.jpg" },
        { id: "domainPath", src: redirectJsonPath + "redirecturl_org.json" },
        ///////////////////====OTHERS====///////////////////// 12


        /////////////////=====COMMON GAME ASSETS=====/////////////////14

        //common game assets

        { id: "uniquebackGround", src: gameAssetsPath + "/Background.png" },
        { id: "Title", src: "commonTitle/" + VarTitle },
        ///////////////////////////////////////////////////////////////20
        { id: "Grid", src: assetsPath + "Grid.png" },
        { id: "arrow1", src: assetsPath + "Arrow1.png" },
        { id: "fingure", src: assetsPath + "Fingure.png" },
        { id: "handCursor", src: assetsPath + "handCursor.png" },
        { id: "SkipBtn", src: assetsPathLang + "SkipBtn.png" },
        { id: "HowToPlayScreen", src: assetsPathLang + "HowToPlayScreen.png" },

        { id: "scoreImgMc", src: assetsPath + "Score.png" },
        { id: "ResponseImgMc", src: assetsPath + "ResponseTime.png" },
        { id: "questionImgMc", src: assetsPath + "questionImg.png" },
        { id: "AttemptsImgMc", src: assetsPath + "Attempts.png" },
        { id: "CorrectImgMc", src: assetsPath + "Correct.png" },
        { id: "closeBtn", src: assetsPath + "closeBtn.png" },
        { id: "closeBtnFinal", src: assetsPath + "closeBtn.png" },
        { id: "nxtBtnFinal", src: assetsPath + "nxtBtn.png" },


        { id: "volumeBtn", src: assetsPath + "volumeBtn.png" },
        { id: "QuesCntMc", src: assetsPath + "QuesCntMc.png" },
        { id: "fullScreenBtn", src: assetsPath + "fullscreenBtn.png" },
        ////////////////////////////////////////////////////////////////////39
        { id: "GameFinishedImg", src: assetsPath + "GameFinished.png" },

        ////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////

    ];

    return 1;

}



//////////////////////////////////////////////////////////////////======PRELOADING OF ASSETS=======///////////////////////////////////////////////////////////



function preloadAllAssets() {

    createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);

    if (!createjs.Sound.initializeDefaultPlugins()) { return; }



    createjs.Sound.alternateExtensions = ["mp3"];

    createjs.WebAudioPlugin.playEmptySound();

    preload = new createjs.LoadQueue(true);

    preload.installPlugin(createjs.Sound);

    preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed

    preload.addEventListener("fileload", fileLoaded);

    preload.addEventListener("progress", updateLoading);

    preload.loadManifest(manifest);

    stage.update();

}



function updateLoading(event) {

    bar.scaleX = event.loaded * loaderWidth;



    progresPrecentage = Math.round(event.loaded * 100);


    if (assetsPathLang == "assets/VietnamAssets/") {
        loadProgressLabel.text = "              " + progresPrecentage + "% Đang tải trò chơi...";

    } else if (assetsPathLang == "assets/TamilAssets/") {
        loadProgressLabel.text = " " + progresPrecentage + "% ஆட்டம் தயாராகிக் கொண்டிருக்கிறது...";
        loadProgressLabel.lineWidth = 1200;
        loadProgressLabel.font = "bold 23px Segoe UI";
    } else if (assetsPathLang == "assets/GujaratiAssets/") {
        loadProgressLabel.text = "              " + progresPrecentage + "% ગેમ લોડ થાય છે...";

    } else if (assetsPathLang == "assets/HindiAssets/") {
        loadProgressLabel.text = "              " + progresPrecentage + "%खेल लोड हो रहा है...";
        loadProgressLabel.font = "bold 23px Segoe UI";

    } else {
        loadProgressLabel.lineWidth = 1200;

        if (progresPrecentage > 0 && progresPrecentage <= 25) {
            loadProgressLabel.text = "              " + "Loading game assets" + extradot;

        }
        else if (progresPrecentage > 25 && progresPrecentage <= 50) {
            loadProgressLabel.text = "              " + "Loading animations" + extradot;
        }
        else if (progresPrecentage > 50 && progresPrecentage <= 75) {
            loadProgressLabel.text = "              " + "Personalising your session" + extradot;

        }
        else if (progresPrecentage > 75 && progresPrecentage <= 100) {
            loadProgressLabel.text = "              " + "Loading your session" + extradot;

        }
        if (extradot == "") {
            extradot = "."
        }
        else if (extradot == "...") {
            extradot = ".";
        }
        else {
            extradot = extradot + ".";
        }
        // loadProgressLabel.text = "              " + progresPrecentage + "% Game Loading...";
    }


    stage.update();

}



function fileLoaded(e) {

    assets.push(e);
}



function doneLoading(event) {
    loaderBar.visible = false;
    bar.visible = false;
    stage.removeChild(loaderBar);
    stage.update();
    var len = assets.length
    console.log("assets.length=" + len)
    for (i = 0; i < len; i++) {
        //   if (i < 24) { with parrot
        if (i < TotalAssetsCnt) {

            var event = assets[i];

            var id = event.item.id;

            console.log(id)

            if (id == "Grid") {
                Grid = new createjs.Bitmap(preload.getResult('Grid'));
                container.parent.addChild(Grid);
                Grid.visible = false;
                continue;
            }

            if (id == "closeBtn") {
                closeBtn = new createjs.Bitmap(preload.getResult('closeBtn'));
                container.parent.addChild(closeBtn);
                closeBtn.x = 1215
                closeBtn.y = 40
                closeBtn.visible = false;
                continue;
            }


            if (id == "closeBtnFinal") {
                closeBtnFinal = new createjs.Bitmap(preload.getResult('closeBtnFinal'));
                container.parent.addChild(closeBtnFinal);
                closeBtnFinal.visible = false;
                closeBtnFinal.x = 1215
                closeBtnFinal.y = 10
                continue;
            }
            if (id == "nxtBtnFinal") {
                nxtBtnFinal = new createjs.Bitmap(preload.getResult('nxtBtnFinal'));
                container.parent.addChild(nxtBtnFinal);
                nxtBtnFinal.visible = false;
                nxtBtnFinal.x = 1050;
                nxtBtnFinal.y = 100
                continue;
            }


            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (id == "QuesCntMc") {
                QuesCntMc = new createjs.Bitmap(preload.getResult('QuesCntMc'));
                container.parent.addChild(QuesCntMc);
                QuesCntMc.y = QuesCntMc.y + 0
                QuesCntMc.visible = false;
                continue;
            }

            if (id == "fullScreenBtn") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("fullScreenBtn")],
                    "frames": { "regX": 50, "height": 55, "count": 0, "regY": 50, "width": 55 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                fullScreenBtn = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(fullScreenBtn);
                fullScreenBtn.x = 1242;
                fullScreenBtn.y = 160;
                fullScreenBtn.visible = false;
                continue;
            }

            if (id == "volumeBtn") {
                var spriteSheet5 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("volumeBtn")],
                    "frames": { "regX": 50, "height": 44, "count": 0, "regY": 50, "width": 48 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                volumeBtn = new createjs.Sprite(spriteSheet5);
                container.parent.addChild(volumeBtn);
                volumeBtn.x = 1240;
                volumeBtn.y = 72;
                volumeBtn.visible = false;
                continue;

            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (id == "arrow1") {

                arrow1 = new createjs.Bitmap(preload.getResult('arrow1'));
                container.parent.addChild(arrow1);
                arrow1.visible = false;
                continue;
            }
            if (id == "fingure") {

                fingure = new createjs.Bitmap(preload.getResult('fingure'));
                container.parent.addChild(fingure);
                fingure.visible = false;
                continue;
            }
            ///////////////////////////////////////////////////////bg////////////////////////////


            if (runningBg == 1) {
            if (id == "uniquebackGround") {
                uniquebackGround = new createjs.Bitmap(preload.getResult('uniquebackGround'));
                if (typeof ambientLayer !== "undefined" && ambientLayer) {
                    ambientLayer.addChildAt(uniquebackGround, 0);
                } else {
                    container.parent.addChildAt(uniquebackGround, 0);
                }
                uniquebackGround.alpha = 0.35;
                uniquebackGround.visible = false;
                continue;
            }




            } else {

                if (id == "uniquebackGround") {
                    uniquebackGround = new createjs.Bitmap(preload.getResult('uniquebackGround'));
                    if (typeof ambientLayer !== "undefined" && ambientLayer) {
                        ambientLayer.addChildAt(uniquebackGround, 0);
                    } else {
                        container.parent.addChildAt(uniquebackGround, 0);
                    }
                    uniquebackGround.alpha = 0.35;
                    uniquebackGround.visible = true;
                    continue;
                }



            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////

            if (id == "Title") {
                //Title = new createjs.Bitmap(preload.getResult('Title'));
                Title = new createjs.Text(GameName, "bold 58px 'Baloo 2'", "#b40deb");
				Title.textAlign = "center";		
				Title.x = canvas.width/ 2;
				Title.y = 40;  
				Title.shadow = new createjs.Shadow("red", 1, 1, 1);
                container.parent.addChild(Title);
				
                Title.visible = false;
                continue;
            }



            if (id == "resultLoading") {
                resultLoading = new createjs.Bitmap(preload.getResult('resultLoading'));
                container.parent.addChild(resultLoading);
                resultLoading.visible = false;
                continue;

            }



            if (id == "scoreImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("scoreImgMc")],
                    "frames": { "regX": 50, "height": 306, "count": 0, "regY": 50, "width": 306 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                scoreImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(scoreImgMc);
                scoreImgMc.visible = false;
                continue;
            }
            if (id == "ResponseImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("ResponseImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 281 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                ResponseImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(ResponseImgMc);
                ResponseImgMc.visible = false;
                continue;
            }
            if (id == "questionImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("questionImgMc")],
                    "frames": { "regX": 50, "height": 280, "count": 0, "regY": 50, "width": 282 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                questionImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(questionImgMc);
                questionImgMc.visible = false;
                continue;
            }
            if (id == "AttemptsImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("AttemptsImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 282 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                AttemptsImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(AttemptsImgMc);
                AttemptsImgMc.visible = false;
                continue;
            }
            if (id == "CorrectImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("CorrectImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 281 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                CorrectImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(CorrectImgMc);
                CorrectImgMc.visible = false;
                continue;
            }

            if (id == "correctImg") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    amerate: 30,
                    "images": [preload.getResult("correctImg")],
                    "frames": { "regX": 50, "height": 465.95, "count": 0, "regY": 50, "width": 245 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                correctImg = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(correctImg);
                correctImg.x = 569;
                correctImg.y = 200;
                correctImg.visible = false;
                continue;
            }

            if (id == "wrongImg") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    amerate: 30,
                    "images": [preload.getResult("wrongImg")],
                    "frames": { "regX": 50, "height": 465.95, "count": 0, "regY": 50, "width": 245 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                wrongImg = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(wrongImg);
                wrongImg.x = 569;
                wrongImg.y = 200;
                wrongImg.visible = false;

                continue;
            }
            if (id == "gameOverImg") {
                gameOverImg = new createjs.Bitmap(preload.getResult('gameOverImg'));
                container.parent.addChild(gameOverImg);
                gameOverImg.visible = false;

                continue;
            }
            if (id == "timeOverImg") {
                timeOverImg = new createjs.Bitmap(preload.getResult('timeOverImg'));
                container.parent.addChild(timeOverImg);
                timeOverImg.visible = false;

                continue;
            }
            if (id == "questionOverImg") {
                questionOverImg = new createjs.Bitmap(preload.getResult('questionOverImg'));
                container.parent.addChild(questionOverImg);
                questionOverImg.visible = false;

                continue;
            }


            if (id == "domainPath") {
                var json = preload.getResult("domainPath");
                console.log(json); // true
                url = json.path;
                url1 = json.scoreupdate;
                console.log("check= " + url1)
                url2 = json.get_info;
                nav = json.nav;
                continue;
            }
            if (id == "SkipBtn") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("SkipBtn")],
                    "frames": { "regX": 50, "height": 137, "count": 0, "regY": 50, "width": 262 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                SkipBtnMc = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(SkipBtnMc);
                SkipBtnMc.x = 1095;
                SkipBtnMc.y = 60
                SkipBtnMc.visible = false;

                continue;
            }
            if (id == "handCursor") {
                handCursor = new createjs.Bitmap(preload.getResult('handCursor'));
                container.parent.addChild(handCursor);
                handCursor.visible = false;

                continue;
            }

            if (id == "HowToPlayScreen") {
                howToPlayImageMc = new createjs.Bitmap(preload.getResult('HowToPlayScreen'));
                container.parent.addChild(howToPlayImageMc);
                howToPlayImageMc.visible = false;
                howToPlayImageMc.x = howToPlayImageMc.x - 20
                continue;
            }

            if (id == "GameFinishedImg") {
                GameFinishedImg = new createjs.Bitmap(preload.getResult('GameFinishedImg'));
                container.parent.addChild(GameFinishedImg);
                GameFinishedImg.visible = false;
                continue;
            }

        } else {
			console.log("progressbarremove")

            doneLoading1(event)

        }

    }

    volumeBtn = volumeBtn.clone();
    volumeBtn.scaleX = volumeBtn.scaleY = 1;
    volumeBtn.x = 363;
    volumeBtn.y = 87;
    fullScreenBtn = fullScreenBtn.clone();
    fullScreenBtn.x = 1160;
    fullScreenBtn.y = 80;
    fullScreenBtn.scaleX = fullScreenBtn.scaleY = 1.1;
    QuesCntMc = QuesCntMc.clone();
    closeBtn = closeBtn.clone();

    closeBtn.x = 1202;
    closeBtn.y = 30;
    closeBtn.scaleX = closeBtn.scaleY = 1;
    bgSnd = createjs.Sound.play("begin");
    bgSnd.volume = 0;
    correctSnd = createjs.Sound.play("correct");
    correctSnd.volume = 0;
    wrongSnd = createjs.Sound.play("wrong");
    wrongSnd.volume = 0;
    gameOverSnd = createjs.Sound.play("gameOver");
    gameOverSnd.volume = 0;
    timeOverSnd = createjs.Sound.play("timeOver");
    timeOverSnd.volume = 0;

    tickSnd = createjs.Sound.play("tick", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
    tickSnd.volume = 0;

    createjs.Ticker.addEventListener("tick", tick);

    createjs.Touch.enable(stage, true, true)
    watchRestart();

}
function watchRestart() {
    //watch for clicks

    stage.addChild(messageField);


    gameScoreTxt = new createjs.Text("0", "700 32px 'Baloo 2'", "#FFFFFF");
    gameScoreTxt.textAlign = "left";
    gameScoreTxt.textBaseline = "middle";
    gameScoreTxt.shadow = new createjs.Shadow("rgba(12, 21, 40, 0.35)", 0, 4, 12);

    gameTimerTxt = new createjs.Text(formatTimerValue(time), "bold 28px 'Digital'", "#F6FBFF");
    gameTimerTxt.textAlign = "left";
    gameTimerTxt.textBaseline = "middle";
    gameTimerTxt.shadow = new createjs.Shadow("rgba(5, 16, 32, 0.3)", 0, 4, 12);

    gameQCntTxt = new createjs.Text("", "700 28px 'Baloo 2'", "#FFFFFF");
    gameQCntTxt.textAlign = "left";
    gameQCntTxt.textBaseline = "middle";
    gameQCntTxt.shadow = new createjs.Shadow("rgba(12, 21, 40, 0.35)", 0, 4, 12);

    gameScoreTxt.scaleX = gameScoreTxt.scaleY = 1;
    gameTimerTxt.scaleX = gameTimerTxt.scaleY = 1;
    gameQCntTxt.scaleX = gameQCntTxt.scaleY = 1;

    buildHudLayout();
    refreshHudValues();

    if (hudContainer) {
        hudContainer.visible = false;
    }

    if (!HowToPlayScreenImg) {
        HowToPlayScreenImg = buildHowToPlayOverlay();
    }

    var overlayParent = container && container.parent ? container.parent : stage;
    if (HowToPlayScreenImg && overlayParent) {
        if (!HowToPlayScreenImg.parent) {
            overlayParent.addChild(HowToPlayScreenImg);
        } else {
            overlayParent.setChildIndex(HowToPlayScreenImg, overlayParent.numChildren - 1);
        }
        HowToPlayScreenImg.visible = true;
    }




    //createjs.Ticker.interval = 25;
   // createjs.Ticker.framerate = 30;

    if (UniqueGameName == "CycleRace") {
        createjs.Ticker.setFPS(10);
    } else {
        createjs.Ticker.setFPS(20);
    }


    container.parent.addChild(handCursor);
    handCursor.visible = true;
    var hcursorMc = new createjs.MovieClip()
    container.parent.addChild(hcursorMc)
    hcursorMc.timeline.addTween(createjs.Tween.get(handCursor).to({ scaleX: .98, scaleY: .98 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
    handCursor.addEventListener("click", toggleFullScreen);
    handCursor.addEventListener("click", createHowToPlay)


    stage.update(); //update the stage to show text;



}

function createHudIconWrapper(primaryColor, glowColor) {
    var wrapper = new createjs.Container();
    wrapper.baseScale = 1;
    wrapper.mouseChildren = true;
    wrapper.mouseEnabled = true;

    var glow = new createjs.Shape();
    glow.graphics.beginRadialGradientFill([glowColor, "rgba(255,255,255,0)"] , [0, 1], 0, 0, 0, 0, 0, 34).drawCircle(0, 0, 18);
    glow.alpha = 0.45;
    wrapper.addChild(glow);

    var background = new createjs.Shape();
    background.graphics.beginLinearGradientFill([primaryColor, "rgba(255,255,255,0.08)"], [0, 1], -28, -28, 28, 28).drawCircle(0, 0, 12);
    wrapper.addChild(background);

    var ring = new createjs.Shape();
    ring.graphics.setStrokeStyle(2).beginStroke("rgba(255,255,255,0.5)").drawCircle(0, 0, 12);
    wrapper.addChild(ring);

    wrapper.background = background;
    wrapper.glow = glow;
    wrapper.ring = ring;

    return wrapper;
}

function drawHudIcon(iconShape, type, paletteColor) {
    if (!iconShape) {
        return;
    }

    iconShape.graphics.clear();

    switch (type) {
        case "score":
            var starColor = paletteColor || "#FACC6B";
            iconShape.graphics.beginFill(starColor).drawPolyStar(0, 0, 14, 5, 0.55, -90);
            iconShape.graphics.setStrokeStyle(2).beginStroke("rgba(12, 27, 46, 0.45)").drawPolyStar(0, 0, 14, 5, 0.55, -90);
            break;
        case "timer":
            var strokeColor = paletteColor || "#66B9FF";
            iconShape.graphics.setStrokeStyle(3).beginStroke(strokeColor).drawCircle(0, 0, 14);
            iconShape.graphics.setStrokeStyle(3).beginStroke(strokeColor).moveTo(0, 0).lineTo(0, -10);
            iconShape.graphics.setStrokeStyle(3).beginStroke(strokeColor).moveTo(0, 0).lineTo(9, 4);
            break;
        case "question":
            var fillColor = paletteColor || "#6EE7B7";
            iconShape.graphics.beginFill(fillColor).drawRoundRect(-11, -11, 22, 22, 6);
            iconShape.graphics.setStrokeStyle(3, "round").beginStroke("#0d1b2a");
            //iconShape.graphics.moveTo(-4, -3);
            //iconShape.graphics.quadraticCurveTo(-4, -12, 4, -12);
            //iconShape.graphics.quadraticCurveTo(12, -12, 12, -4);
            //iconShape.graphics.quadraticCurveTo(12, 0, 6, 2);
            //iconShape.graphics.quadraticCurveTo(2, 4, 2, 8);
            iconShape.graphics.endStroke();
            //iconShape.graphics.beginFill("#0d1b2a").drawCircle(2, 12, 2);
            break;
    }
}

function createHudCard(label, type) {
    var card = new createjs.Container();
    card.baseScale = 1;
    card.type = type;

    var gradientMap = {
        score: ["rgba(21, 45, 86, 0.92)", "rgba(36, 94, 168, 0.92)"],
        timer: ["rgba(20, 42, 74, 0.92)", "rgba(45, 86, 148, 0.92)"],
        question: ["rgba(18, 60, 53, 0.92)", "rgba(34, 110, 95, 0.92)"]
    };

    /*var accentMap = {
        score: ["rgba(255, 255, 255, 0.16)", "rgba(255, 255, 255, 1)"],
        timer: ["rgba(102, 185, 255, 0.35)", "rgba(102, 185, 255, 1)"],
        question: ["rgba(110, 231, 183, 0.32)", "rgba(110, 231, 183, 1)"]
    };*/

    var accentMap = {
        score: ["rgba(255, 255, 255, 0.16)", "rgba(255, 255, 255, 0.03)"],
        timer: ["rgba(102, 185, 255, 0.35)", "rgba(102, 185, 255, 0.08)"],
        question: ["rgba(110, 231, 183, 0.32)", "rgba(110, 231, 183, 0.08)"]
    };

    var gradient = gradientMap[type] || gradientMap.score;
    var accent = accentMap[type] || accentMap.score;

    var cardWidth = HUD_CARD_WIDTH;
    var cardHeight = HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = HUD_CARD_CORNER_RADIUS;

    var background = new createjs.Shape();
    background.graphics
        .beginLinearGradientFill(gradient, [0, 1], -halfWidth, 0, halfWidth, 0)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
    background.alpha = 0.96;
    card.addChild(background);

    var accentShape = new createjs.Shape();
    accentShape.graphics
        .beginLinearGradientFill(accent, [0, 1], -halfWidth, -halfHeight, -halfWidth + HUD_CARD_ACCENT_WIDTH, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, HUD_CARD_ACCENT_WIDTH, cardHeight, cornerRadius);
    accentShape.alpha = 0.9;
    card.addChild(accentShape);

    var highlight = new createjs.Shape();
    highlight.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"], [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
    highlight.alpha = 0.24;
    card.addChild(highlight);

    var icon = new createjs.Shape();
    icon.x = -halfWidth + 26;
    icon.y = 0;
    drawHudIcon(icon, type);
    card.addChild(icon);

    var labelText = new createjs.Text(label.toUpperCase(), "600 12px 'Baloo 2'", "#C4DBFF");
    labelText.textAlign = "left";
    labelText.x = icon.x + 42;
    labelText.y = -18;
    card.addChild(labelText);

    var valueHolder = new createjs.Container();
    valueHolder.x = labelText.x;
    valueHolder.y = 10;
    card.addChild(valueHolder);

    card.background = background;
    card.iconAccent = accentShape;
    card.highlight = highlight;
    card.icon = icon;
    card.label = labelText;
    card.valueHolder = valueHolder;
    card.baseGradient = gradient;
    card.baseAccent = accent;
    card.__cardWidth = cardWidth;
    card.__cardHeight = cardHeight;
    card.__cornerRadius = cornerRadius;
    card.__accentWidth = HUD_CARD_ACCENT_WIDTH;

    return card;
}

function buildHudLayout() {
	console.log("buildHudLayout");
    if (!container || !container.parent) {
        return;
    }

    if (hudContainer && hudContainer.parent) {
        hudContainer.parent.removeChild(hudContainer);
    }

    hudContainer = new createjs.Container();
    hudContainer.x = canvas.width / 2;
    hudContainer.y = 8;
    hudContainer.alpha = 1;
    hudContainer.visible = true;

    scoreCardContainer = createHudCard("Score", "score");
    scoreCardContainer.x = -680;
    scoreCardContainer.baseX = scoreCardContainer.x;
    hudContainer.addChild(scoreCardContainer);

    timerCardContainer = createHudCard("Seconds Left", "timer");
    timerCardContainer.x = -530;
    timerCardContainer.baseX = timerCardContainer.x;
    hudContainer.addChild(timerCardContainer);

    hudQuestionCardContainer = createHudCard("Question", "question");
    hudQuestionCardContainer.x = 280;
    hudQuestionCardContainer.baseX = hudQuestionCardContainer.x;
    hudContainer.addChild(hudQuestionCardContainer);

    if (scoreCardContainer.valueHolder) {
        scoreCardContainer.valueHolder.addChild(gameScoreTxt);
        gameScoreTxt.textAlign = "left";
        gameScoreTxt.x = 0;
        gameScoreTxt.y = -2;
    }

    if (timerCardContainer.valueHolder) {
        timerCardContainer.valueHolder.addChild(gameTimerTxt);
        gameTimerTxt.textAlign = "left";
        gameTimerTxt.x = 0;
        gameTimerTxt.y = -2;
    }

    if (hudQuestionCardContainer.valueHolder) {
        hudQuestionCardContainer.valueHolder.addChild(gameQCntTxt);
        gameQCntTxt.textAlign = "left";
        gameQCntTxt.x = 0;
        gameQCntTxt.y = -2;
    }

    questionProgressBarBg = new createjs.Shape();
    questionProgressBarBg.graphics.beginFill("rgba(255,255,255,0.14)").drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);
    questionProgressBarBg.x = -HUD_CARD_WIDTH / 2 + 48;
    questionProgressBarBg.y = 22;
    hudQuestionCardContainer.addChild(questionProgressBarBg);

    questionProgressBarFill = new createjs.Shape();
    questionProgressBarFill.graphics.beginLinearGradientFill(["#34d399", "#60a5fa"], [0, 1], 0, 0, QUESTION_PROGRESS_WIDTH, 0).drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);
    questionProgressBarFill.x = -HUD_CARD_WIDTH / 2 + 48;
    questionProgressBarFill.y = 22;
    questionProgressBarFill.scaleX = 0;
    hudQuestionCardContainer.addChild(questionProgressBarFill);

    controlContainer = new createjs.Container();
    controlContainer.x = 420 + HUD_CARD_WIDTH * 0.85;
    controlContainer.baseX = controlContainer.x;

    var controlBg = new createjs.Shape();
    var controlWidth = 120;
    var controlHeight = 53;
    controlBg.graphics.beginLinearGradientFill(["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"], [0, 1], -controlWidth / 2, -controlHeight / 2, controlWidth / 2, controlHeight / 2).drawRoundRect(-controlWidth / 2, -controlHeight / 2, controlWidth, controlHeight, 24);
    controlBg.alpha = 0.88;
    controlContainer.addChild(controlBg);
    controlBg.mouseEnabled = false;

    volumeBtnWrapper = createHudIconWrapper("rgba(102,185,255,0.85)", "rgba(102,185,255,0.5)");
    volumeBtnWrapper.x = -30;
    volumeBtnWrapper.cursor = "pointer";
    controlContainer.addChild(volumeBtnWrapper);

    fullScreenBtnWrapper = createHudIconWrapper("rgba(158,108,237,0.85)", "rgba(158,108,237,0.5)");
    fullScreenBtnWrapper.x = 0;
    fullScreenBtnWrapper.cursor = "pointer";
    controlContainer.addChild(fullScreenBtnWrapper);

    closeBtnWrapper = createHudIconWrapper("rgba(255,138,128,0.9)", "rgba(255,138,128,0.55)");
    closeBtnWrapper.x = 30;
    closeBtnWrapper.cursor = "pointer";
    controlContainer.addChild(closeBtnWrapper);

    if (volumeBtn) {
        if (volumeBtn.parent) {
            volumeBtn.parent.removeChild(volumeBtn);
        }
        volumeBtn.regX = 25;
        volumeBtn.regY = 25;
        volumeBtn.scaleX = volumeBtn.scaleY = 0.35;
        volumeBtn.x = 18;
        volumeBtn.y = 18;
        volumeBtnWrapper.addChild(volumeBtn);
    }

    if (fullScreenBtn) {
        if (fullScreenBtn.parent) {
            fullScreenBtn.parent.removeChild(fullScreenBtn);
        }
        fullScreenBtn.regX = 27;
        fullScreenBtn.regY = 27;
        fullScreenBtn.scaleX = fullScreenBtn.scaleY = 0.35;
        fullScreenBtn.x = 19;
        fullScreenBtn.y = 18;
        fullScreenBtnWrapper.addChild(fullScreenBtn);
    }

    if (closeBtn) {
        if (closeBtn.parent) {
            closeBtn.parent.removeChild(closeBtn);
        }
        if (closeBtn.image) {
            closeBtn.regX = closeBtn.image.width / 2;
            closeBtn.regY = closeBtn.image.height / 2;
        }
        closeBtn.scaleX = closeBtn.scaleY = 0.33;
        closeBtn.x = 0;
        closeBtn.y = 0;
        closeBtnWrapper.addChild(closeBtn);
    }

    hudContainer.addChild(controlContainer);

    container.parent.addChild(hudContainer);
    //container.parent.setChildIndex(hudContainer, container.parent.getNumChildren() - 1);
    container.parent.setChildIndex(hudContainer, 99999999);

    setTimerCriticalState(false);
    updateQuestionProgress();
}

function refreshHudValues() {
    if (!gameScoreTxt || !gameTimerTxt || !gameQCntTxt) {
        return;
    }

    var currentScore = typeof score !== "undefined" ? score : 0;
    gameScoreTxt.text = String(currentScore);

    var timerValue = typeof formatTimerValue === "function" ? formatTimerValue(time) : String(parseInt(time, 10) || 0);
    gameTimerTxt.text = timerValue;

    var total = typeof totalQuestions !== "undefined" ? totalQuestions : 0;
    var currentQuestion = typeof quesCnt !== "undefined" ? quesCnt : 0;
    if (total > 0) {
        currentQuestion = Math.min(Math.max(currentQuestion, 1), total);
    } else {
        currentQuestion = Math.max(currentQuestion, 1);
    }

    gameQCntTxt.text = currentQuestion + "/" + total;

    if (typeof setTimerCriticalState === "function") {
        setTimerCriticalState(time <= 13);
    }

    updateQuestionProgress();
}

function updateQuestionProgress() {
    if (!questionProgressBarFill) {
        return;
    }

    var answered = typeof answeredQuestions !== "undefined" ? answeredQuestions : 0;
    var currentQuestionIndex = typeof quesCnt !== "undefined" ? quesCnt : answered;
    var total = typeof totalQuestions !== "undefined" ? totalQuestions : 0;
    var completed = Math.max(answered, Math.min(currentQuestionIndex, total));
    var progress = total > 0 ? Math.min(completed / total, 1) : 0;

    createjs.Tween.get(questionProgressBarFill, { override: true })
        .to({ scaleX: progress }, 250, createjs.Ease.quadOut);
}

function animateHudMetric(target) {
    if (!target) {
        return;
    }

    target.scaleX = target.scaleY = 1;

    createjs.Tween.get(target, { override: true })
        .to({ scaleX: 1.12, scaleY: 1.12 }, 160, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.quadIn);
}

function pulseHudCard(card) {
    if (!card) {
        return;
    }

    createjs.Tween.get(card, { override: true })
        .to({ scaleX: 1.03, scaleY: 1.03 }, 180, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);
}

function shakeHudCard(card) {
    if (!card) {
        return;
    }

    var baseX = typeof card.baseX !== "undefined" ? card.baseX : card.x;
    card.baseX = baseX;

    createjs.Tween.get(card, { override: true })
        .to({ x: baseX - 6 }, 60, createjs.Ease.quadOut)
        .to({ x: baseX + 6 }, 80, createjs.Ease.quadInOut)
        .to({ x: baseX }, 90, createjs.Ease.quadOut);
}

function revealHud() {
    if (!hudContainer) {
        return;
    }

    var targetY = 60;
    hudContainer.alpha = 0;
    hudContainer.y = targetY - 12;

    createjs.Tween.get(hudContainer, { override: true })
        .to({ alpha: 1, y: targetY }, 320, createjs.Ease.quadOut);
}

function animateIconWrapper(wrapper, isHover) {
    if (!wrapper) {
        return;
    }

    var targetScale = isHover ? 1.12 : 1;
    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: targetScale, scaleY: targetScale }, 150, createjs.Ease.quadOut);

    if (wrapper.glow) {
        wrapper.glow.alpha = isHover ? 0.65 : 0.45;
    }

    if (wrapper.ring) {
        wrapper.ring.alpha = isHover ? 0.9 : 0.6;
    }
}

function pressIconWrapper(wrapper) {
    if (!wrapper) {
        return;
    }

    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: 0.92, scaleY: 0.92 }, 90, createjs.Ease.quadOut);
}

function releaseIconWrapper(wrapper) {
    if (!wrapper) {
        return;
    }

    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: 1.08, scaleY: 1.08 }, 120, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 160, createjs.Ease.quadIn);
}

function highlightScoreHud() {
    animateHudMetric(gameScoreTxt);
    pulseHudCard(scoreCardContainer);
}

function setTimerCriticalState(isCritical) {
	
    if (!timerCardContainer) {
        return;
    }
console.log("time:::::"+time);
console.log("timerCardContainer.__isCritical:::::"+timerCardContainer.__isCritical);
console.log("isCritical:::::"+isCritical);
  //  if (timerCardContainer.__isCritical === isCritical) {
   //     return;
  //  }


    timerCardContainer.__isCritical = isCritical;
	var colors =timerCardContainer.baseGradient;
if(time<=13 && time>5){     colors = isCritical ? ["rgba(255,152,0,0.95)", "rgba(212,138,29,0.95)"] : timerCardContainer.baseGradient; }
if(time<=5){     colors = isCritical ? ["rgba(88,26,36,0.95)", "rgba(148,41,52,0.95)"] : timerCardContainer.baseGradient;}

    var cardWidth = timerCardContainer.__cardWidth || HUD_CARD_WIDTH;
    var cardHeight = timerCardContainer.__cardHeight || HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = timerCardContainer.__cornerRadius || HUD_CARD_CORNER_RADIUS;
    var accentWidth = timerCardContainer.__accentWidth || HUD_CARD_ACCENT_WIDTH;

    timerCardContainer.background.graphics
        .clear()
        .beginLinearGradientFill(colors, [0, 1], -halfWidth, 0, halfWidth, 0)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
var accentColors =timerCardContainer.baseAccent;
   
if(time<=13 && time>5){  accentColors = isCritical ? ["rgba(245,192,112,0.45)", "rgba(245,192,112,0.1)"] : timerCardContainer.baseAccent;}
if(time<=5){   accentColors = isCritical ? ["rgba(255,135,135,0.45)", "rgba(255,135,135,0.1)"] : timerCardContainer.baseAccent;}
    timerCardContainer.iconAccent.graphics
        .clear()
        .beginLinearGradientFill(accentColors, [0, 1], -halfWidth, -halfHeight, -halfWidth + accentWidth, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, accentWidth, cardHeight, cornerRadius);

    drawHudIcon(timerCardContainer.icon, "timer", isCritical ? "#FF9DA5" : "#66B9FF");
    gameTimerTxt.color = isCritical ? "#FFD7D7" : "#F6FBFF";
}

function buildHowToPlayOverlay() {
    var overlay = new createjs.Container();
    overlay.name = "HowToPlayOverlay";

    var background = new createjs.Shape();
    background.graphics
        .beginLinearGradientFill(["#FFF8E6", "#FFE1AE"], [0, 1], 0, 0, 0, 720)
        .drawRect(0, 0, 1280, 720);
    overlay.addChild(background);

    var pattern = drawHoneycombPattern(1280, 720, 44);
    pattern.alpha = 0.45;
    overlay.addChild(pattern);

    var header = createHowToPlayHeader();
    overlay.addChild(header);

    var subtitle = new createjs.Text("Personalising your session.", "600 26px 'Baloo 2'", "#9A5A1E");
    subtitle.textAlign = "center";
    subtitle.x = 640;
    subtitle.y = 500;
    subtitle.shadow = new createjs.Shadow("rgba(255, 255, 255, 0.45)", 0, 6, 20);
    overlay.addChild(subtitle);

    var progress = createHowToPlayProgressBar();
    progress.x = 340;
    progress.y = 560;
    overlay.addChild(progress);

    var footer = new createjs.Text("Get ready for a quick warm-up!", "500 22px 'Baloo 2'", "#B36B1C");
    footer.textAlign = "center";
    footer.x = 640;
    footer.y = 610;
    overlay.addChild(footer);

    var accentCircle = new createjs.Shape();
    accentCircle.graphics.beginFill("rgba(255,255,255,0.35)").drawCircle(1100, 150, 26);
    overlay.addChild(accentCircle);

    var accentCircle2 = new createjs.Shape();
    accentCircle2.graphics.beginFill("rgba(255,255,255,0.2)").drawCircle(1020, 210, 16);
    overlay.addChild(accentCircle2);

    return overlay;
}

function drawHoneycombPattern(width, height, radius) {
    var shape = new createjs.Shape();
    var graphics = shape.graphics;
    var hexHeight = Math.sqrt(3) * radius;
    var horizontalSpacing = radius * 1.5;
    var row = 0;

    for (var y = radius; y < height + hexHeight; y += hexHeight, row++) {
        var offsetX = (row % 2) ? horizontalSpacing / 2 : 0;
        for (var x = radius; x < width + radius; x += horizontalSpacing) {
            var centerX = x + offsetX;
            var fill = row % 2 === 0 ? "rgba(255, 255, 255, 0.32)" : "rgba(255, 255, 255, 0.22)";
            graphics.beginFill(fill).drawPolyStar(centerX, y, radius, 6, 0, 30);
        }
    }

    return shape;
}

function createHowToPlayHeader() {
    var container = new createjs.Container();
    container.x = 80;
    container.y = 60;

    var card = new createjs.Shape();
    card.graphics
        .beginLinearGradientFill(["#FFB760", "#FF8D3C"], [0, 1], 0, 0, 240, 0)
        .drawRoundRect(0, 0, 280, 130, 34);
    card.shadow = new createjs.Shadow("rgba(227, 138, 45, 0.35)", 0, 14, 24);
    container.addChild(card);

    var iconBackground = new createjs.Shape();
    iconBackground.graphics.beginFill("#FFFFFF").drawCircle(78, 65, 36);
    container.addChild(iconBackground);

    var icon = new createjs.Text("!", "700 58px 'Baloo 2'", "#FF8D3C");
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = 78;
    icon.y = 65;
    container.addChild(icon);

    var title = new createjs.Text("HOW\nTO PLAY", "700 34px 'Baloo 2'", "#FFFFFF");
    title.lineHeight = 38;
    title.x = 132;
    title.y = 26;
    container.addChild(title);

    return container;
}

function createHowToPlayProgressBar() {
    var container = new createjs.Container();

    var shadow = new createjs.Shape();
    shadow.graphics.beginFill("rgba(223, 163, 79, 0.25)").drawRoundRect(6, 10, 612, 20, 12);
    shadow.alpha = 0.7;
    container.addChild(shadow);

    var background = new createjs.Shape();
    background.graphics.beginFill("rgba(255,255,255,0.8)").drawRoundRect(0, 0, 600, 18, 12);
    container.addChild(background);

    var fill = new createjs.Shape();
    fill.graphics
        .beginLinearGradientFill(["#FFB760", "#FF8D3C"], [0, 1], 0, 0, 600, 0)
        .drawRoundRect(0, 0, 600, 18, 12);
    fill.scaleX = 0.35;
    container.addChild(fill);

    var label = new createjs.Text("Preparing your experience...", "600 20px 'Baloo 2'", "#9A5A1E");
    label.textAlign = "center";
    label.x = 300;
    label.y = 26;
    container.addChild(label);

    container.progressFill = fill;

    return container;
}


//==========================================================================//
function createHowToPlay() {
    handCursor.visible = false;
    HowToPlayScreenImg.visible = false;

    createGameIntroAnimationPlay(true)
}
//==========================================================================//
function createHowToPlayHandler(evt) {

    // console.log(evt.currentTarget.currentFrame +" == "+   evt.currentTarget.totalFrames)
    if (evt.currentTarget.currentFrame == evt.currentTarget.totalFrames - 1) {
        var totalFrame = evt.currentTarget.totalFrames

        evt.currentTarget.gotoAndStop(totalFrame - 1)
        evt.currentTarget.removeEventListener("tick", createHowToPlayHandler)

        clearHowToPlayInterval = setInterval(gameHowToPlayAnimation, 1000);
    }
}
//===========================================================================================//
function gameHowToPlayAnimation() {

    clearInterval(clearHowToPlayInterval)
    // if()
    // {

    //     createGameIntroAnimationPlay(true) // GameOrientation.js
    // }
}
//===========================================================================================//

function createGameIntroAnimationPlay() {
    //////////////////////////////////////Dynamicintro///////////////////////

    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)

    commongameintro() //   know
    //  introStartCnt++;
    startAnimationHandler(null)
    isVisibleSkipBtn()
    //////////////////////////////////////////////////////////////////////////////
    /*howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)
    gameIntroAnimMc.visible = true;
    gameIntroAnimMc.gotoAndPlay(0);
     commongameintro();
    gameIntroAnimMc.addEventListener("tick", startAnimationHandler);*/

}
//===========================================================================================//
function setStopRotation() {
    console.log("Stop Rotation 1 " + isScreenRotation + " ======== " + isGamePlay)
    if (isGamePlay) {
        pauseTimer()
    }
}

function setResumeRotation() {
    console.log("get value of = " + isGamePlay)
    if (isScreenRotation == "0" && !isGamePlay) {
        isScreenRotation = "5";
    }
    if (isGamePlay) {
        restartTimer()
    }
}
//================================================================================================//


function createBackgroundTweens() {


    cbg1.visible = cbg2.visible = cbg3.visible = true;
    bg1.x = 0;
    cbg1.x = 1280;
    var objTween = 100000
    var objTween = 100000

    createjs.Tween.get(bg1, { loop: true }).to({ x: -1280 }, objTween)
    createjs.Tween.get(cbg1, { loop: true }).to({ x: 0 }, objTween)

    bg2.x = 0;
    cbg2.x = 1280;
    var objTween1 = 80000
    var objTween1 = 80000

    createjs.Tween.get(bg2, { loop: true }).to({ x: -1280 }, objTween1)
    createjs.Tween.get(cbg2, { loop: true }).to({ x: 0 }, objTween1)

    bg3.x = 0;
    cbg3.x = 1280;
    var objTween2 = 60000
    var objTween2 = 60000

    createjs.Tween.get(bg3, { loop: true }).to({ x: -1280 }, objTween2)
    createjs.Tween.get(cbg3, { loop: true }).to({ x: 0 }, objTween2)



}

//===========================================================================================//

function TimerAnsScoreTweens() {

    // QuesCntMc.alpha = 0.7
    // createjs.Tween.get(QuesCntMc, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.7 }, 1000)


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function panelVisibleFn() {
    if (QuesCntMc) {
        QuesCntMc.visible = false;
    }

    if (typeof howToPlayImageMc !== "undefined" && howToPlayImageMc) {
        howToPlayImageMc.visible = false;
    }

    if (typeof HowToPlayScreenImg !== "undefined" && HowToPlayScreenImg) {
        HowToPlayScreenImg.visible = false;
    }

    if (typeof handCursor !== "undefined" && handCursor) {
        handCursor.visible = false;
    }

    if (hudContainer && container && container.parent && !hudContainer.parent) {
        container.parent.addChild(hudContainer);
    }

    if (hudContainer) {
        hudContainer.visible = true;
        revealHud();
    }

    if (volumeBtn) {
        volumeBtn.mouseEnabled = true;
        volumeBtn.visible = true;
        volumeBtn.removeAllEventListeners("mouseover");
        volumeBtn.removeAllEventListeners("mouseout");
        volumeBtn.removeAllEventListeners("mousedown");
        volumeBtn.removeAllEventListeners("pressup");
        volumeBtn.on("mouseover", function () {
            animateIconWrapper(volumeBtnWrapper, true);
        });
        volumeBtn.on("mouseout", function () {
            animateIconWrapper(volumeBtnWrapper, false);
        });
        volumeBtn.on("mousedown", function () {
            pressIconWrapper(volumeBtnWrapper);
        });
        volumeBtn.on("pressup", function () {
            releaseIconWrapper(volumeBtnWrapper);
        });
    }

    if (fullScreenBtn) {
        fullScreenBtn.mouseEnabled = true;
        fullScreenBtn.visible = true;
        fullScreenBtn.removeAllEventListeners("mouseover");
        fullScreenBtn.removeAllEventListeners("mouseout");
        fullScreenBtn.removeAllEventListeners("mousedown");
        fullScreenBtn.removeAllEventListeners("pressup");
        fullScreenBtn.on("mouseover", function () {
            animateIconWrapper(fullScreenBtnWrapper, true);
            fullScreenBtn.shadow = new createjs.Shadow("#9CC5FF", 0, 0, 16);
        });
        fullScreenBtn.on("mouseout", function () {
            animateIconWrapper(fullScreenBtnWrapper, false);
            fullScreenBtn.shadow = null;
        });
        fullScreenBtn.on("mousedown", function () {
            pressIconWrapper(fullScreenBtnWrapper);
        });
        fullScreenBtn.on("pressup", function () {
            releaseIconWrapper(fullScreenBtnWrapper);
        });
    }

    if (closeBtn) {
        closeBtn.mouseEnabled = true;
        closeBtn.visible = true;
        closeBtn.removeAllEventListeners("mouseover");
        closeBtn.removeAllEventListeners("mouseout");
        closeBtn.removeAllEventListeners("mousedown");
        closeBtn.removeAllEventListeners("pressup");
        closeBtn.on("mouseover", function () {
            animateIconWrapper(closeBtnWrapper, true);
            closeBtn.shadow = new createjs.Shadow("rgba(255,138,128,0.6)", 0, 0, 18);
        });
        closeBtn.on("mouseout", function () {
            animateIconWrapper(closeBtnWrapper, false);
            closeBtn.shadow = null;
        });
        closeBtn.on("mousedown", function () {
            pressIconWrapper(closeBtnWrapper);
        });
        closeBtn.on("pressup", function () {
            releaseIconWrapper(closeBtnWrapper);
        });
    }

    gameScoreTxt.visible = true;
    gameTimerTxt.visible = true;
    gameQCntTxt.visible = true;

    refreshHudValues();
    pulseHudCard(hudQuestionCardContainer);
}
 
///////////////////////////////////////////////////

function internetErrorFn() {
    pauseTimer()
    timeOverImg.visible = false;
    gameOverImg.visible = false;
    questionOverImg.visible = false;
    gameResponseTimerStop();
    correctSnd.stop();
    wrongSnd.stop();
    gameOverSnd.stop();
    tickSnd.stop();
    bgSnd.stop();

    if (container.parent) {
        container.parent.removeAllChildren();
    }

    container4 = new createjs.Container();
    stage.addChild(container4)
    container4.parent.addChild(GameFinishedImg);
    GameFinishedImg.visible = true;

    container4.parent.addChild(closeBtnFinal);
    closeBtnFinal.visible = true;
    closeBtnFinal.addEventListener("click", closeGameFn);
    closeBtnFinal.cursor = "pointer";

    var setFinishedTxt = new createjs.Text("", "60px 'Baloo 2'", "white");
    setFinishedTxt.textAlign = "center";
    setFinishedTxt.textBaseline = "middle";
    setFinishedTxt.lineWidth = 1000
    setFinishedTxt.lineHeight = 63
    setFinishedTxt.x = 640;
    setFinishedTxt.y = 367;
    setFinishedTxt.visible = true;
    container4.parent.addChild(setFinishedTxt);

    if (intChkVar == 0) {
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "ઈન્ટરનેટ કનેક્શન નથી. ફરી પ્રયત્ન કરો...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "...لا يوجد اتصال بالإنترنت. حاول مرة اخرى";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "No Internet Connection. Please try again...";
        } else {
            setFinishedTxt.text = "No Internet Connection. Please try again...";

        }
    }
    if (intChkVar == 1) {
        // setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "                          તમે દરેક કોયડા ઉકેલી લીધા છે.                           પરિણામ જાણવા ઉપર દર્શાવેલ close પર ક્લિક કરો...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "                           ...لقد أكملت جميع الألغاز                           انقر على إغلاق في الأعلى لرؤية النتائج";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        } else {
            setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        }
        if (container1.parent) {
            container1.parent.removeAllChildren();
        }

    } else if (intChkVar == 2) {
        // setFinishedTxt.text = "You have completed this puzzle...";
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "તમે આ કોયડો ઉકેલી લીધો છે...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "...لقد أكملت هذا اللغز";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "You have completed this puzzle...";
        } else {
            setFinishedTxt.text = "You have completed this puzzle...";
        }

        if (container1.parent) {
            container1.parent.removeAllChildren();
        }
    }




    if (setFinishedTxt.text.length <= 35) {
        setFinishedTxt.y = 407;
    } else if (setFinishedTxt.text.length <= 70) {
        setFinishedTxt.font = "bold 40px 'Baloo 2'"
        setFinishedTxt.y = 407;
    } else {
        setFinishedTxt.font = "bold 40px 'Baloo 2'"
        setFinishedTxt.y = 377;
    }
    intChkVar = -1

}