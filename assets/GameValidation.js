/////////////////////////////////////////////////
var removeTimeOut
var container1
var questionTxtR;
var attemptTxtR;
var correctTxtR;
var responseTxtR;
var scoreTxtR;
var clrSent;
var stopValue
var starCnt = -1
var scBar = 0
var scores = 0;

var answer_status;
var rightCnt = -1, wrongCnt = -1;
var es1 = [2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3]
var es2 = [5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6]
var feedbackContainer,
  feedbackBackgroundShape,
  feedbackAccentContainer,
  feedbackAccentGlow,
  feedbackAccentBg,
  feedbackIconShape,
  feedbackTitleTxt,
  feedbackMessageTxt;
function randomSort1(a, b) {
    if (Math.random() < 0.5) return -1;
    else return 1;
}
es1.sort(randomSort1);
function startAnimationHandler(evt) {


}

function isVisibleSkipBtn() {
    SkipBtnMc.visible = true;
    SkipBtnMc.gotoAndStop(0);
    skipMc = new createjs.MovieClip()
    container.parent.addChild(skipMc)
    skipMc.timeline.addTween(createjs.Tween.get(SkipBtnMc).to({ scaleX: .97, scaleY: .97 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
    SkipBtnMc.addEventListener("click", createDelayToStartGame);
    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)
    SkipBtnMc.cursor = "pointer";

}

function isVisibleStartBtn() {
    SkipBtnMc.gotoAndStop(1);
    container.parent.addChild(SkipBtnMc)
    container.parent.addChild(skipMc)
    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)
    console.log("isVisibleStartBtn");
    ////////////////////////////////////////////////////////////////////   
}


//=============================================================================//
function createDelayToStartGame() {

    howToPlayImageMc.visible = false;
    
    SkipBtnMc.visible = false;
    //gameIntroAnimMc.stop();
    stopValue = 0;
    removeGameIntro() // know 
    window.removeEventListener('focus', startIntro);
    window.removeEventListener('blur', stopGameIntro);
    TimerAnsScoreTweens()
    var isOnline = navigator.onLine;
    console.log("isOnline= " + isOnline)
    if (runningBg == 1) {
        uniquebackGround.visible = false;
        createBackgroundTweens()
    }

    setTimeout(handleClick, 1000);


    // if (isOnline) {

    //     if (runningBg == 1) {
    //         uniquebackGround.visible = false;
    //         createBackgroundTweens()
    //     }

    //     // TitleContaier.mouseEnabled = true;
    //     // TitleContaier.cursor = "move";
    //     // TitleContaier.addEventListener("pressmove", onObjectDownHandler1);
    //     // TitleContaier.addEventListener("pressup", getDragUp1);

    //     setTimeout(handleClick, 1000);
    // }
    // else {

    //     intChkVar = 0
    //     internetErrorFn()
    // }
}
//=============================================================================//



function onObjectDownHandler1(evt) {
    var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
    container.parent.addChild(evt.currentTarget);
    evt.currentTarget.x = p.x - 240
    evt.currentTarget.y = p.y - 70
    stage.update()
}
function getDragUp1(evt) {
    var setDropTarget;
    getDragObj = evt.currentTarget
    container.parent.addChild(getDragObj)

}



function animationEndHandler(e) {
    animEndCnt++
    if (animEndCnt == 1) {
        animEndCnt = 0
        if (getCorrectStr == "") {
            console.log("coming...")
            //  gameIntroAnimMc.addEventListener("tick",startAnimationHandler)
        } else {
            validCnt++
            console.log("get validation= " + validCnt)
            if (validCnt == 2) {

                //  getCorrectValidation();
            }
        }
    }
}

function ensureFeedbackContainer() {
    if (feedbackContainer) {
        return;
    }

    feedbackContainer = new createjs.Container();
    feedbackContainer.x = 650;
    feedbackContainer.y = 240;
    feedbackContainer.alpha = 0;
    feedbackContainer.visible = false;
    feedbackContainer.mouseEnabled = false;
    feedbackContainer.mouseChildren = false;

    feedbackBackgroundShape = new createjs.Shape();
    feedbackContainer.addChild(feedbackBackgroundShape);

    feedbackAccentContainer = new createjs.Container();
    feedbackAccentContainer.x = -190;
    feedbackAccentContainer.y = 0;
    feedbackContainer.addChild(feedbackAccentContainer);

    feedbackAccentGlow = new createjs.Shape();
    feedbackAccentGlow.graphics
        .beginRadialGradientFill(["rgba(255,255,255,0.2)", "rgba(255,255,255,0)"] , [0, 1], 0, 0, 0, 0, 0, 48)
        .drawCircle(0, 0, 48);
    feedbackAccentGlow.alpha = 0.45;
    feedbackAccentContainer.addChild(feedbackAccentGlow);

    feedbackAccentBg = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackAccentBg);

    feedbackIconShape = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackIconShape);

    feedbackTitleTxt = new createjs.Text("", "700 26px 'Baloo 2'", "#FFFFFF");
    feedbackTitleTxt.textAlign = "left";
    feedbackTitleTxt.x = -120;
    feedbackTitleTxt.y = -20;
    feedbackContainer.addChild(feedbackTitleTxt);

    feedbackMessageTxt = new createjs.Text("", "400 18px 'Baloo 2'", "#E3ECFF");
    feedbackMessageTxt.textAlign = "left";
    feedbackMessageTxt.lineWidth = 320;
    feedbackMessageTxt.x = -120;
    feedbackMessageTxt.y = 14;
    feedbackContainer.addChild(feedbackMessageTxt);

    container.parent.addChild(feedbackContainer);
}

function showFeedbackBanner(isCorrect) {
    ensureFeedbackContainer();

    var accentColor = isCorrect ? "#3EE0B8" : "#FF7B9C";
    var gradient = isCorrect
        ? ["rgba(16,57,54,0.95)", "rgba(21,40,86,0.95)"]
        : ["rgba(82,22,38,0.95)", "rgba(41,23,61,0.95)"];

    feedbackBackgroundShape.graphics
        .clear()
        .beginLinearGradientFill(gradient, [0, 1], -240, 0, 240, 0)
        .drawRoundRect(-240, -50, 480, 100, 28);

    feedbackAccentBg.graphics
        .clear()
        .beginLinearGradientFill([accentColor, "rgba(255,255,255,0.2)"] , [0, 1], -30, -30, 30, 30)
        .drawCircle(0, 0, 28);

    feedbackAccentGlow.alpha = isCorrect ? 0.4 : 0.45;

    feedbackIconShape.graphics.clear();
    feedbackIconShape.graphics.setStrokeStyle(5, "round").beginStroke("#ffffff");
    if (isCorrect) {
        feedbackIconShape.graphics.moveTo(-10, 0).lineTo(-2, 10).lineTo(16, -12);
    } else {
        feedbackIconShape.graphics.moveTo(-12, -12).lineTo(12, 12);
        feedbackIconShape.graphics.moveTo(12, -12).lineTo(-12, 12);
    }

    var answerText = typeof correctAnswer !== "undefined" && correctAnswer ? correctAnswer.toUpperCase() : "";
    if (isCorrect) {
        feedbackTitleTxt.text = "Great job!";
        feedbackMessageTxt.text = answerText ? "You formed \"" + answerText + "\" correctly." : "That was a perfect match.";
    } else {
        feedbackTitleTxt.text = "Keep trying!";
        feedbackMessageTxt.text = answerText
            ? "The word was \"" + answerText + "\". Give the next one a go!"
            : "Take a breath and try the next one.";
    }

    feedbackContainer.visible = true;
    feedbackContainer.alpha = 0;
    feedbackContainer.y = 240;

    createjs.Tween.removeTweens(feedbackContainer);
    createjs.Tween.get(feedbackContainer)
        .to({ alpha: 1, y: 140 }, 240, createjs.Ease.quadOut)
        .wait(1400)
        .to({ alpha: 0, y: 100 }, 320, createjs.Ease.quadIn)
        .call(function () {
            feedbackContainer.visible = false;
        });

    feedbackAccentContainer.scaleX = feedbackAccentContainer.scaleY = 0.8;
    createjs.Tween.get(feedbackAccentContainer, { override: true })
        .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.elasticOut);
}
function getValidation(aStr) {

    rightCnt++;
    var isCorrectAnswer = aStr == "correct";

    closeBtn.mouseEnabled = false;
    fullScreenBtn.mouseEnabled = false;
    volumeBtn.mouseEnabled = false;

    scores = 0;
    if (isCorrectAnswer) {

        ccnt = ccnt + 1;
        ans = 0;
        ans = ccnt;
        calculatescore();
        crst = crst + rst;
        gameScoreTxt.text = score + "";
        scBar++;

        if (correctImg) {
            correctImg.visible = false;
        }

        if (typeof highlightScoreHud === "function") {
            highlightScoreHud();
        } else if (typeof animateHudMetric === "function") {
            animateHudMetric(gameScoreTxt);
        }

        if (typeof launchConfetti === "function") {
            launchConfetti(40);
        }

        if (typeof showStarburst === "function") {
            showStarburst(canvas.width / 2, 180);
        }

        if (!isEffSound) {
            correctSnd.play();
            correctSnd.volume = 0;
        } else {
            correctSnd.play();
            correctSnd.volume = 1;
        }

    } else {

        wrongCnt++;
        console.log("wr " + wrongCnt);
        ccnt = ccnt;
        ans = 0;
        ans = ccnt;
        rst1 = rst1 + rst;
        wrst = wrst + rst;

        if (wrongImg) {
            wrongImg.visible = false;
        }

        if (typeof shakeHudCard === "function") {
            shakeHudCard(hudQuestionCardContainer);
        }

        if (!isEffSound) {
            wrongSnd.play();
            wrongSnd.volume = 0;
        } else {
            wrongSnd.play();
            wrongSnd.volume = 1;
        }

    }

    if (typeof answeredQuestions !== "undefined") {
        answeredQuestions += 1;
    }

    if (typeof refreshHudValues === "function") {
        refreshHudValues();
    }

    showFeedbackBanner(isCorrectAnswer);

    if (rst == 0) {
        rst = 1;
    }
    responseTime += rst;
    console.log("responseTime= " + responseTime);
    answer_status = aStr;
    clrSent = setTimeout(sentscore, 1000);

}
//=================================================================================================================//

function sentscore() {

    clearTimeout(clrSent);
    console.log("url1= " + url1)
    if (gameType == 0) {
        if (qscnt < totalQuestions - 1 && time > 0) {

            wrongImg.visible = false;
            correctImg.visible = false;
            // restartTimer();

            closeBtn.mouseEnabled = true;
            fullScreenBtn.mouseEnabled = true;
            volumeBtn.mouseEnabled = true;

            TimerAnsScoreTweens()
            if (runningBg == 1) {
                uniquebackGround.visible = false;
                createBackgroundTweens()
            }
            if (gameTimerIsDynamic == false) {
                time = 18;
                if (typeof setTimerCriticalState === "function") {
                    setTimerCriticalState(false);
                }
                if (typeof refreshHudValues === "function") {
                    refreshHudValues();
                } else {
                    gameTimerTxt.text = String(time);
                }
            }
            

            pickques();
        }
        else if (time > 0) {
            clearInterval(interval);
            bgSnd.stop();
            gameOverSnd.play();
            gameOverSnd.volume = 1;
            gameOverImg.visible = true;
            container.parent.addChild(gameOverImg)
            stage.update()
            gameOverSnd.addEventListener("complete", handleComplete1);

        }
        else {
            clearInterval(interval)
            bgSnd.stop();
            stage.update()
            handleComplete1()

        }
    } else {
        var isOnline = navigator.onLine;
        console.log("isOnline= " + isOnline)
        if (isOnline) {
            if (puzzle_cycle == 1) {
                ScoreRedirect(nav, url1, sid, gid, rst, time, ans, uans, answer_status, qno[cnt], scores, puzzle_cycle, timeOver_Status);
            }
            else {

            }
        }
        else {
            intChkVar = 0
            internetErrorFn()
        }

    }

}

//=================================================================================================================//
function handleComplete(e) {
    console.log("answ====== = " + answeredQuestions + " cnt = " + cnt)
    var isOnline = navigator.onLine;
    console.log("isOnline= " + isOnline)
    if (isOnline) {
        if (qscnt < totalQuestions - 1) {
            wrongImg.visible = false;
            correctImg.visible = false;
            restartTimer();
            closeBtn.mouseEnabled = true;
            fullScreenBtn.mouseEnabled = true;
            volumeBtn.mouseEnabled = true;
            TimerAnsScoreTweens()
            if (runningBg == 1) {
                uniquebackGround.visible = false;
                createBackgroundTweens()
            }

            pickques();
        } else {
            clearInterval(interval);
            bgSnd.stop();
            gameOverSnd.play();
            gameOverSnd.volume = 1;
            gameOverImg.visible = true;
            container.parent.addChild(gameOverImg)
            stage.update()
            gameOverSnd.addEventListener("complete", handleComplete1);
        }//

    }
    else {

        intChkVar = 0
        internetErrorFn()
    }


}

function handleComplete1(e) {
	console.log("handleComplete1");
    timeOverImg.visible = false;
    gameOverImg.visible = false;
    clearInterval(interval);
    gameResponseTimerStop();
    correctSnd.stop();
    wrongSnd.stop();
    gameOverSnd.stop();
    tickSnd.stop();
    bgSnd.stop();
    if (container.parent) {
        container.parent.removeAllChildren();
    }
    // var container3 = new createjs.Container();
    // stage.addChild(container3)
    container1 = new createjs.Container();
    stage.addChild(container1)
    container1.parent.addChild(resultLoading)


console.log("before computeresult");
    computeresult();
}

//=================================================================================================================//
function computeresult() {
console.log("computeresult");
    stage.mouseEnabled = false;


    /*if (gameType == 0) {
        if (time == 0) {
            if (gameAssetsPath == "BallAndBox-Level1/" || gameAssetsPath == "BallAndBox-Level2/") {
                gtime = 220;
            } else if (gameAssetsPath == "CoordinateGraph-Level1/" || gameAssetsPath == "CoordinateGraph-Level2/") {
                gtime = 250;
            } else if (gameAssetsPath == "SpotMyPlace-Level1/" || gameAssetsPath == "SpotMyPlace-Level2/") {
                gtime = 220;
            } else if (gameAssetsPath == "GraphDecoder/") {
                gtime = 240;
            } else if (gameAssetsPath == "AnimalWatch-Level1/" || gameAssetsPath == "AnimalWatch-Level2/") {
                gtime = 240;
            } else if (gameAssetsPath == "DarkLight-Level1/" || gameAssetsPath == "DarkLight-Level2/" || gameAssetsPath == "DarkLight-Level3/" || gameAssetsPath == "DarkLight-Level4/" || gameAssetsPath == "DarkLight-Level5/" || gameAssetsPath == "DarkLight-Level6/") {
                gtime = 240;
            } else {
                gtime = 180;
            }

        } else {
            gtime = time;
        }

    }
    else 
	*/
	{
        var responseValue = 1;

        tqcnt = totalQuestions;
        aqcnt = answeredQuestions;
        cqcnt = ccnt;
        gscore = score;


        if (time == 0) {
            if (gameAssetsPath == "BallAndBox-Level1/" || gameAssetsPath == "BallAndBox-Level2/") {
                gtime = 220;
            } else if (gameAssetsPath == "CoordinateGraph-Level1/" || gameAssetsPath == "CoordinateGraph-Level2/") {
                gtime = 250;
            } else if (gameAssetsPath == "SpotMyPlace-Level1/" || gameAssetsPath == "SpotMyPlace-Level2/") {
                gtime = 220;
            } else if (gameAssetsPath == "GraphDecoder/") {
                gtime = 240;
            } else if (gameAssetsPath == "AnimalWatch-Level1/" || gameAssetsPath == "AnimalWatch-Level2/") {
                gtime = 240;
            } else if (gameAssetsPath == "DarkLight-Level1/" || gameAssetsPath == "DarkLight-Level2/" || gameAssetsPath == "DarkLight-Level3/" || gameAssetsPath == "DarkLight-Level4/" || gameAssetsPath == "DarkLight-Level5/" || gameAssetsPath == "DarkLight-Level6/") {
                gtime = 240;
            } else {
                gtime = 180;
            }

        } else {
            gtime = time;
        }


        rtime = responseTime;
        crtime = crst;
        wrtime = wrst;

        htmlRedirect(nav, url, tqcnt, aqcnt, cqcnt, gscore, gtime, rtime, crtime, wrtime)
    }


    //////////////////////////////////////////////////////////////////////////////
    container1.parent.addChild(scoreImgMc);
    scoreImgMc.x = 540;
    scoreImgMc.y = 130;
    scoreImgMc.visible = true;

    if (score == 0) {
        scoreImgMc.gotoAndStop(0)
    }
    else if (score <= 10) {
        scoreImgMc.gotoAndStop(1)
    }
    else if (score > 10 && score <= 20) {
        scoreImgMc.gotoAndStop(2)
    }
    else if (score > 20 && score <= 30) {
        scoreImgMc.gotoAndStop(3)
    }

    else if (score > 30 && score <= 40) {
        scoreImgMc.gotoAndStop(4)
    }
    else if (score > 40 && score <= 50) {
        scoreImgMc.gotoAndStop(5)
    }
    else if (score > 50 && score <= 60) {
        scoreImgMc.gotoAndStop(6)
    }
    else if (score > 60 && score <= 70) {
        scoreImgMc.gotoAndStop(7)
    }
    else if (score > 70 && score <= 80) {
        scoreImgMc.gotoAndStop(8)
    }
    else if (score > 80 && score <= 90) {
        scoreImgMc.gotoAndStop(9)
    }
    else if (score > 90 && score < 100) {
        scoreImgMc.gotoAndStop(9)
    }
    else if (score == 100) {
        scoreImgMc.gotoAndStop(10)
    }


    container1.parent.addChild(ResponseImgMc);
    ResponseImgMc.x = 150;
    ResponseImgMc.y = 410;
    ResponseImgMc.visible = true;

    if (responseTime == 0) {
        ResponseImgMc.gotoAndStop(0)
    }

    else if (responseTime > 0 && responseTime <= 20) {
        ResponseImgMc.gotoAndStop(1)
    }

    else if (responseTime > 20 && responseTime <= 40) {
        ResponseImgMc.gotoAndStop(2)
    }

    else if (responseTime > 40 && responseTime <= 60) {
        ResponseImgMc.gotoAndStop(3)
    }

    else if (responseTime > 60 && responseTime <= 80) {
        ResponseImgMc.gotoAndStop(4)
    }

    else if (responseTime > 80 && responseTime <= 100) {
        ResponseImgMc.gotoAndStop(5)
    }

    else if (responseTime > 100 && responseTime <= 120) {
        ResponseImgMc.gotoAndStop(6)
    }

    else if (responseTime > 120 && responseTime <= 140) {
        ResponseImgMc.gotoAndStop(7)
    }
    else if (responseTime > 140 && responseTime <= 160) {
        ResponseImgMc.gotoAndStop(8)
    }
    else if (responseTime > 160 && responseTime <= 180) {
        ResponseImgMc.gotoAndStop(9)
    }
    else if (responseTime == 180) {
        ResponseImgMc.gotoAndStop(10)
    }

    container1.parent.addChild(questionImgMc);
    questionImgMc.x = 420;
    questionImgMc.y = 410;
    questionImgMc.visible = true;
    questionImgMc.gotoAndStop(totalQuestions)

    container1.parent.addChild(AttemptsImgMc);
    AttemptsImgMc.x = 690;
    AttemptsImgMc.y = 410;
    AttemptsImgMc.visible = true;
    AttemptsImgMc.gotoAndStop(answeredQuestions)

    container1.parent.addChild(CorrectImgMc);
    CorrectImgMc.x = 960;
    CorrectImgMc.y = 410;
    CorrectImgMc.visible = true;
    CorrectImgMc.gotoAndStop(ccnt)

    questionTxtR = new createjs.Text(totalQuestions, "bold 60px 'Baloo 2'", "black");
    container1.parent.addChild(questionTxtR);
    questionTxtR.x = 502; questionTxtR.y = 493;
    questionTxtR.textAlign = "center";
    questionTxtR.textBaseline = "middle";

    //
    attemptTxtR = new createjs.Text(answeredQuestions, "bold 60px 'Baloo 2'", "black");
    container1.parent.addChild(attemptTxtR);
    attemptTxtR.x = 772; attemptTxtR.y = 493;
    attemptTxtR.textAlign = "center";
    attemptTxtR.textBaseline = "middle";

    correctTxtR = new createjs.Text(ccnt, "bold 60px 'Baloo 2'", "black");
    container1.parent.addChild(correctTxtR);
    correctTxtR.x = 1045; correctTxtR.y = 493;
    correctTxtR.textAlign = "center";
    correctTxtR.textBaseline = "middle";
    //
    responseTxtR = new createjs.Text(responseTime, "bold 60px 'Baloo 2'", "black");
    container1.parent.addChild(responseTxtR);
    responseTxtR.x = 232; responseTxtR.y = 493;
    responseTxtR.textAlign = "center";
    responseTxtR.textBaseline = "middle";

    //
    scoreTxtR = new createjs.Text(score, "bold 70px 'Baloo 2'", "black");
    container1.parent.addChild(scoreTxtR);
    scoreTxtR.x = 633; scoreTxtR.y = 225;
    scoreTxtR.textAlign = "center";
    scoreTxtR.textBaseline = "middle";

    container1.parent.addChild(closeBtnFinal);
    closeBtnFinal.visible = true;
    closeBtnFinal.mouseEnabled = true
    closeBtnFinal.cursor = "pointer";
    closeBtnFinal.addEventListener("click", closeGameFn);



    var container2 = new createjs.Container();
    stage.addChild(container2)
    container2.parent.addChild(bitmap)

    if (gameType == 0) {
        showScoreFn()
    }
    else {
        bitmap.visible = true;
        questionTxtR.visible = false;
        attemptTxtR.visible = false;
        correctTxtR.visible = false;
        responseTxtR.visible = false;
        scoreTxtR.visible = false;
    }



    //////////////////////////////////////////////////////////////////////////////////
}
//----------------------------------------------------------------------------------------------------------------//
function calculatescore() {
console.log("rstrst:"+rst);
    switch (rst) {

        case 0:


        case 1:


        case 2:


        case 3:

            score = score + 10;

            scores = 10;

            break;



        case 4:

            score = score + 9;

            scores = 9;

            break;

        case 5:

            score = score + 8;

            scores = 8;

            break;

        case 6:

            score = score + 7;

            scores = 7;

            break;

        case 7:

            score = score + 6;

            scores = 6;

            break;

        case 8:

            score = score + 5;

            scores = 5;

            break;

        case 9:

            score = score + 4;

            scores = 4;

            break;

        case 10:

            score = score + 3;

            scores = 3;

            break;

        default:

            score = score + 2;

            scores = 2;

            break;

    }
    rst1 = rst1 + rst;
}
function showScoreFn() {

    bitmap.visible = false;
    resultLoading.visible = true;
    questionTxtR.visible = true;
    questionTxtR.text = totalQuestions;
    attemptTxtR.visible = true;
    attemptTxtR.text = answeredQuestions;
    correctTxtR.visible = true;
    correctTxtR.text = ccnt;
    responseTxtR.visible = true;
    responseTxtR.text = responseTime;
    scoreTxtR.visible = true;
    scoreTxtR.text = score;
}
//------------------------------------------------------------------------------------------------//
function closeGameFn() {
    parent.jQuery.fancybox.close();
}
//-------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//



function removeScoreBoard() {
    clearTimeout(removeTimeOut)
    bitmap.visible = false;
    questionTxtR.visible = false;
    attemptTxtR.visible = false;
    correctTxtR.visible = false;
    responseTxtR.visible = false;
    scoreTxtR.visible = false;
    intChkVar = 1;
    internetErrorFn()
}
//-------------------------------------------------------------------------------------------------//
function playSound(id, loop) {

    return createjs.Sound.play(id, loop);

}

//------------------------------------------------------------------------------------------//

function range(max, min) {

    //  var rNum = range(0,6)

    return Math.floor(min + (max - min) * Math.random());

}

//------------------------------------------------------------------------------------------//

function randomSort(a, b) {

    if (Math.random() < 0.5) return -1;

    else return 1;

}

//------------------------------------------------------------------------------------------//

function between(startNumber, endNumber) {

    //var fArr = between(0,49)

    var baseNumber = []

    var randNumber = []

    for (j = startNumber; j <= endNumber; j++) {

        baseNumber[j] = j;

    }

    for (j = endNumber; j > startNumber; j--) {

        var tempRandom = startNumber + Math.floor(Math.random() * (j - startNumber));

        randNumber[j] = baseNumber[tempRandom];

        baseNumber[tempRandom] = baseNumber[j];

    }

    randNumber[startNumber] = baseNumber[startNumber];

    return randNumber;

}