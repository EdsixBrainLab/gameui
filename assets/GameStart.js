var tickFlag = 0;
/*
var gameType = 0;//gameType=0 (for no db)   and gameType=1 (for with db)
var isQuestionAllVariations = true;///only no db gametype can set all variation
*/

var gameType = 0;
var isQuestionAllVariations = false;
var betweenChars = ' '; // a space
//var gameTimerIsDynamic = false

var gameScoreTxt
var timeOverImgTimer = 0
var removeTimerTweenKill

function CreateGameStart() {

    pauseTimer();

    if (typeof hideGameplayTimeUpBanner === "function") {
        hideGameplayTimeUpBanner(true);
    }

    document.getElementById("gameCanvas").style.background = 'white';
    //////////////////////////////
    closeBtn.visible = false;
    fullScreenBtn.visible = false;
    volumeBtn.visible = false;
    QuesCntMc.visible = false;
    gameScoreTxt.text = "0";
    if (typeof answeredQuestions !== "undefined") {
        answeredQuestions = 0;
    }

    if (hudContainer) {
        hudContainer.visible = false;
    }


    if (gameTimerIsDynamic) {
        time = 180;
    } else {
        time = 18;
    }
    if (typeof setTimerCriticalState === "function") {
        setTimerCriticalState(false);
    }

    if (typeof refreshHudValues === "function") {
        refreshHudValues();
    } else {
        gameTimerTxt.text = parseInt(time);
    }

    // alert(gameTimerTxt.split('').join(betweenChars));
    closeBtn.cursor = "pointer"
    fullScreenBtn.cursor = "pointer"
    volumeBtn.cursor = "pointer"
    closeBtn.addEventListener("click", closeGameHandler);

    fullScreenBtn.addEventListener("click", toggleFullScreen);
    volumeBtn.addEventListener("click", settingBarSelected);
    /////////////////////////////////////////////////////////////////////////////////////////////////
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

    if (bgSnd) {
        bgSnd.stop();
    }
    bgSnd = createjs.Sound.play("begin", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
    bgSnd.volume = 0.2;
    bgSnd.on("complete", bgSndPlaying, null, false);
    stage.update();

}

function closeGameHandler() {
    parent.jQuery.fancybox.close();
    console.log("closeGameHandler")
}



function bgSndPlaying() {
    bgSnd.play();
    bgSnd.volume = 0.2;
    bgSnd.on("complete", bgSndPlaying, null, false);
}


function settingBarSelected(event) {
    event.preventDefault();

    if (event.currentTarget.currentFrame == 0) {
        event.currentTarget.gotoAndStop(1);

        bgSnd.stop();
        correctSnd.stop();
        wrongSnd.stop();
        gameOverSnd.stop();
        tickSnd.stop();

        isEffSound = false;

    } else if (event.currentTarget.currentFrame == 1) {

        event.currentTarget.gotoAndStop(0);
        bgSnd.play();
        isEffSound = true;
    }


    stage.update();
}

//=======================================================END OF BOARD================================================//
this.countTime = function () {
    time--;
    console.log('get timer = ' + time);
    var timerDisplay = typeof formatTimerValue === "function" ? formatTimerValue(time) : String(time);
    gameTimerTxt.text = timerDisplay;
    gameTimerTxt.scaleX = gameTimerTxt.scaleY = 1;
    createjs.Tween.get(gameTimerTxt)
        .wait(200)
        .to({ scaleX: 1.35, scaleY: 1.35 }, 320, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 240, createjs.Ease.quadIn);

    if (typeof setTimerCriticalState === "function") {
		console.log('get timeraaaaaa = ' + time);
        setTimerCriticalState(time <= 13);
    }

    // gameTimerTxt.text = String(time)
    // gameTimerTxt.split('').join(betweenChars);


    if (time <= 5) {
        console.log('tickFlag- ' + tickFlag);
        
            if (tickFlag == 0) {
                tickSnd = createjs.Sound.play("tick", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
                tickSnd.volume = 1;
                tickSnd.play();
                bgSnd.stop();
            }
            tickFlag = 1;
       
    }
	if (gameTimerIsDynamic) { } else {
            if (time == 8) {
               // container.parent.addChild(questionOverImg);
              //  questionOverImg.visible = true;
              //  questionOverImg.alpha = 0.6;
            //questionOverImg.y = -720
            //createjs.Tween.get(questionOverImg).wait(100).to({ alpha: 1, x: 0, y: 0 }, 8000)
            }
        }
    
    if (self.time == 0) {
        console.log('timeover totalQuestions= ' + qscnt )
if (questionOverImg) {
                    questionOverImg.visible = false;
					questionOverImg.alpha = 0;
                }
        clearInterval(interval);
        tickSnd.stop();
        tickFlag = 1;

        createjs.Tween.removeTweens(gameTimerTxt);
        gameTimerTxt.scaleX = gameTimerTxt.scaleY = 1;

        rst1 = rst1 + rst;
        answer_status = "U";
        uans = "NotAnswered";
        ans = "NotAnswered";
        ccnt = ccnt;
        ans = 0;
        ans = ccnt;
        scores = 0;
        gameResponseTimerStop();

        var isLastQuestion = qscnt >= totalQuestions - 1;

        if (!isLastQuestion) {
            if (gameTimerIsDynamic) {
                if (bgSnd) {
                    bgSnd.play();
                }

                if (questionOverImg) {
                    questionOverImg.visible = false;
					questionOverImg.alpha = 0;
                }

                time = 18;
                currTime = time;

                if (typeof setTimerCriticalState === "function") {
                    setTimerCriticalState(false);
                }

                if (typeof refreshHudValues === "function") {
                    refreshHudValues();
                } else {
                    gameTimerTxt.text = String(time);
                }

                setTimeout(function () {
                    pickques();
                }, 600);
            } else {
                if (bgSnd) {
                    bgSnd.play();
                }

                /*container.parent.addChild(questionOverImg);
                questionOverImg.visible = true;
                questionOverImg.alpha = 1;
                questionOverImg.y = -720;
                createjs.Tween.get(questionOverImg).wait(100).to({ alpha: 1, x: 0, y: 0 }, 8000);*/

                if (typeof showGameplayTimeUpBanner === "function") {
                    showGameplayTimeUpBanner(function () {
                        removeTimeOverImg({ deferOverlayHide: true });
                    });
                } else {
                    timeOverImgTimer = setInterval(removeTimeOverImg, 300);
                }
            }
        } else {
            if (bgSnd) {
                bgSnd.stop();
            }

            if (timeOverImg) {
                timeOverImg.visible = false;
            }

            correctSnd.stop();
            wrongSnd.stop();
            gameOverSnd.stop();
            tickSnd.stop();

            var handleTimeOverComplete = function () {
                if (handleTimeOverComplete.__handled) {
                    return;
                }
                handleTimeOverComplete.__handled = true;
                if (timeOverSnd) {
                    timeOverSnd.removeEventListener("complete", handleTimeOverComplete);
                }
                sentscore();
            };

            if (timeOverSnd) {
                timeOverSnd.play();
                timeOverSnd.volume = 1;
                timeOverSnd.addEventListener("complete", handleTimeOverComplete);
            }

            if (typeof showGameplayTimeUpBanner === "function") {
                showGameplayTimeUpBanner(handleTimeOverComplete);
            } else {
                timeOverImgTimer = setInterval(removeTimeOverImg, 300);
            }

            setTimeout(handleTimeOverComplete, 1500);
        }

        try {
            disablechoices();
        } catch (err) {
            console.log("Error: disablechoices")
        }
    }
}

function removeTimeOverImg(options) {
    clearInterval(timeOverImgTimer);
    var opts = options || {};
    var deferOverlayHide = !!opts.deferOverlayHide;

    if (!deferOverlayHide && typeof hideGameplayTimeUpBanner === "function") {
        hideGameplayTimeUpBanner(true);
    }
    timeOverImg.visible = false;
    time = 18;
    currTime = time;
    createjs.Tween.removeTweens(gameTimerTxt);
    gameTimerTxt.scaleX = gameTimerTxt.scaleY = 1;

    if (typeof setTimerCriticalState === "function") {
        setTimerCriticalState(false);
    }

    if (typeof refreshHudValues === "function") {
        refreshHudValues();
    } else {
        gameTimerTxt.text = String(time);
    }

    var proceedCalled = false;
    function continueToNextQuestion() {
        if (proceedCalled) {
            return;
        }
        proceedCalled = true;
        pickques();
    }

    var hookHandled = false;
    var timeExpiredHook = null;

    if (typeof SA_handleTimeExpiredBeforeNextQuestion === "function") {
        timeExpiredHook = SA_handleTimeExpiredBeforeNextQuestion;
    } else if (typeof handleTimeExpiredBeforeNextQuestion === "function") {
        timeExpiredHook = handleTimeExpiredBeforeNextQuestion;
    }

    if (timeExpiredHook) {
        try {
            hookHandled = timeExpiredHook(continueToNextQuestion) === true;
        } catch (hookError) {
            console.log("Error: time expired hook", hookError);
            hookHandled = false;
        }
    }

    if (!hookHandled) {
        continueToNextQuestion();
    }
}

function pauseTimer() {
    currTime = time;
    clearInterval(interval);
}

function restartTimer() {
    tickFlag = 0;
    time = currTime;
    interval = setInterval(countTime, 1000);
}
//----------------------------RESPONSE TIMER-------------------------------------------//
function gameResponseTimerStart() {
    resTimerOut = setInterval(function () {
        rst++;

    }, 1000);
}

function gameResponseTimerStop() {
    tickSnd.stop();
    tickFlag = 1;
    clearInterval(resTimerOut);
}