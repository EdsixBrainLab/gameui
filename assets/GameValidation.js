/////////////////////////////////////////////////
var removeTimeOut
var container1
var clrSent;
var stopValue
var starCnt = -1
var scBar = 0
var scores = 0;

var resultsOverlay,
  resultsOverlayBg,
  resultsCardContainer,
  resultsHeadingTxt,
  resultsSubheadingTxt,
  resultsScoreDial,
  resultsResponseDial,
  resultsQuestionsDial,
  resultsAttemptsDial,
  resultsCorrectDial;

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
    if (!SkipBtnMc) {
        return;
    }

    applyHowToPlayButtonState(SkipBtnMc, "skip");
    SkipBtnMc.visible = true;
    SkipBtnMc.mouseEnabled = true;
    container.parent.addChild(SkipBtnMc);
    skipMc = new createjs.MovieClip();
    container.parent.addChild(skipMc);
    skipMc.timeline.addTween(createjs.Tween.get(SkipBtnMc).to({ scaleX: .97, scaleY: .97 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
    SkipBtnMc.addEventListener("click", createDelayToStartGame);
    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc);
    SkipBtnMc.cursor = "pointer";
}

function isVisibleStartBtn() {
    if (!SkipBtnMc) {
        return;
    }

    applyHowToPlayButtonState(SkipBtnMc, "start");
    container.parent.addChild(SkipBtnMc);
    container.parent.addChild(skipMc);
    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc);
    console.log("isVisibleStartBtn");
    ////////////////////////////////////////////////////////////////////
}


//=============================================================================//
function createDelayToStartGame() {

    howToPlayImageMc.visible = false;

    SkipBtnMc.visible = false;
    SkipBtnMc.mouseEnabled = false;
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
    ensureResultsSummaryOverlay(container1);

    if (gameType == 0) {
        showScoreFn();
    }
    else {
        if (resultsOverlay) {
            resultsOverlay.visible = false;
        }
        if (bitmap) {
            bitmap.visible = true;
        }
        if (closeBtnFinal) {
            closeBtnFinal.visible = true;
            closeBtnFinal.mouseEnabled = true;
            closeBtnFinal.cursor = "pointer";
            closeBtnFinal.removeAllEventListeners("click");
            closeBtnFinal.addEventListener("click", closeGameFn);
            if (container1 && container1.parent) {
                container1.parent.addChild(closeBtnFinal);
            }
        }
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
function createResultsSummaryDial(radius, labelText, accentColors, options) {
    options = options || {};

    var container = new createjs.Container();
    container.radius = radius;

    var outerGlow = new createjs.Shape();
    outerGlow.graphics
        .beginRadialGradientFill(["rgba(0,0,0,0.3)", "rgba(0,0,0,0)"], [0, 1], 0, radius * 0.7, radius * 0.2, 0, radius * 0.7, radius + 30)
        .drawCircle(0, radius * 0.55, radius + 30);
    outerGlow.alpha = 0.35;
    container.addChild(outerGlow);

    var outerRing = new createjs.Shape();
    outerRing.graphics
        .beginRadialGradientFill(["rgba(255,255,255,0.45)", "rgba(255,255,255,0.08)"], [0, 1], 0, 0, 0, 0, 0, radius + 20)
        .drawCircle(0, 0, radius + 20);
    container.addChild(outerRing);

    var base = new createjs.Shape();
    base.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0.75)", "rgba(255,255,255,0.25)"], [0, 1], 0, -radius, 0, radius)
        .drawCircle(0, 0, radius);
    container.addChild(base);

    var inner = new createjs.Shape();
    inner.graphics
        .beginLinearGradientFill(["#FFFFFF", "#EEF4FF"], [0, 1], 0, -radius + 30, 0, radius - 26)
        .drawCircle(0, 0, radius - 28);
    container.addChild(inner);

    var accent = new createjs.Shape();
    container.addChild(accent);

    container.updateAccent = function (ratio) {
        var clamped = Math.max(0, Math.min(ratio, 1));
        accent.graphics.clear();
        if (clamped <= 0) {
            return;
        }

        accent.graphics
            .setStrokeStyle(options.accentStroke || 12, "round")
            .beginLinearGradientStroke(accentColors || ["#FFFFFF", "#FFFFFF"], [0, 1], -radius, 0, radius, 0)
            .arc(0, 0, radius - (options.accentInset || 16), -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * clamped));
    };

    var valueText = new createjs.Text("0", options.valueFont || "700 48px 'Baloo 2'", options.valueColor || "#1F2240");
    valueText.textAlign = "center";
    valueText.y = options.valueYOffset != null ? options.valueYOffset : -12;
    container.addChild(valueText);
    container.valueText = valueText;

    var label = new createjs.Text(labelText ? labelText.toUpperCase() : "", options.labelFont || "600 20px 'Baloo 2'", options.labelColor || "#FFFFFF");
    label.textAlign = "center";
    label.y = options.labelOffset != null ? options.labelOffset : radius + 34;
    container.addChild(label);
    container.labelText = label;

    container.updateAccent(0);

    return container;
}

function ensureResultsSummaryOverlay(parentContainer) {
    if (!resultsOverlay) {
        resultsOverlay = new createjs.Container();
        resultsOverlay.visible = false;
        resultsOverlay.alpha = 0;
        resultsOverlay.mouseEnabled = true;
        resultsOverlay.mouseChildren = true;

        resultsOverlayBg = new createjs.Shape();
        resultsOverlayBg.mouseEnabled = true;
        resultsOverlay.addChild(resultsOverlayBg);

        resultsCardContainer = new createjs.Container();
        resultsOverlay.addChild(resultsCardContainer);

        var cardBg = new createjs.Shape();
        cardBg.graphics
            .beginLinearGradientFill(["#FFB057", "#F25F9C", "#6A52FF"], [0, 0.45, 1], -430, -260, 430, 260)
            .drawRoundRect(-430, -260, 860, 520, 48);
        resultsCardContainer.addChild(cardBg);

        var cardOutline = new createjs.Shape();
        cardOutline.graphics
            .setStrokeStyle(4)
            .beginStroke("rgba(255,255,255,0.55)")
            .drawRoundRect(-430, -260, 860, 520, 48);
        resultsCardContainer.addChild(cardOutline);

        var cardHighlight = new createjs.Shape();
        cardHighlight.graphics
            .beginRadialGradientFill(["rgba(255,255,255,0.35)", "rgba(255,255,255,0)"], [0, 1], -220, -160, 0, -220, -160, 260)
            .drawCircle(-220, -160, 260);
        cardHighlight.alpha = 0.55;
        resultsCardContainer.addChild(cardHighlight);

        var sparkleCluster = new createjs.Shape();
        sparkleCluster.graphics
            .beginFill("rgba(255,255,255,0.65)").drawCircle(290, -170, 4)
            .drawCircle(330, -210, 2)
            .drawCircle(360, -130, 3)
            .drawCircle(-320, 140, 2)
            .drawCircle(-360, 110, 3);
        resultsCardContainer.addChild(sparkleCluster);

        resultsHeadingTxt = new createjs.Text("Performance Summary", "700 34px 'Baloo 2'", "#FFFFFF");
        resultsHeadingTxt.textAlign = "center";
        resultsHeadingTxt.y = -200;
        resultsCardContainer.addChild(resultsHeadingTxt);

        resultsSubheadingTxt = new createjs.Text("Here's how you performed in this round.", "400 20px 'Baloo 2'", "rgba(255,255,255,0.85)");
        resultsSubheadingTxt.textAlign = "center";
        resultsSubheadingTxt.y = -164;
        resultsCardContainer.addChild(resultsSubheadingTxt);

        resultsScoreDial = createResultsSummaryDial(112, "Score", ["#FFE36E", "#FF6F91"], {
            valueFont: "700 64px 'Baloo 2'",
            valueYOffset: -20,
            labelFont: "600 22px 'Baloo 2'",
            labelOffset: 78,
            accentStroke: 14,
            accentInset: 20,
            valueColor: "#1D1A3A",
        });
        resultsScoreDial.y = -40;
        resultsCardContainer.addChild(resultsScoreDial);

        resultsResponseDial = createResultsSummaryDial(86, "Response Time", ["#4FE4FF", "#4C7DFF"], {
            valueFont: "700 44px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 132,
        });
        resultsResponseDial.x = -270;
        resultsResponseDial.y = 150;
        resultsCardContainer.addChild(resultsResponseDial);

        resultsQuestionsDial = createResultsSummaryDial(86, "Questions", ["#FFD166", "#FF6F91"], {
            valueFont: "700 44px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 132,
        });
        resultsQuestionsDial.x = -90;
        resultsQuestionsDial.y = 150;
        resultsCardContainer.addChild(resultsQuestionsDial);

        resultsAttemptsDial = createResultsSummaryDial(86, "Attempts", ["#6CFFE5", "#28CFFF"], {
            valueFont: "700 44px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 132,
        });
        resultsAttemptsDial.x = 90;
        resultsAttemptsDial.y = 150;
        resultsCardContainer.addChild(resultsAttemptsDial);

        resultsCorrectDial = createResultsSummaryDial(86, "Correct", ["#9BFF6C", "#33C667"], {
            valueFont: "700 44px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 132,
        });
        resultsCorrectDial.x = 270;
        resultsCorrectDial.y = 150;
        resultsCardContainer.addChild(resultsCorrectDial);
    }

    if (parentContainer && resultsOverlay.parent !== parentContainer) {
        parentContainer.addChild(resultsOverlay);
    }
}

function layoutResultsSummaryOverlay() {
    if (!resultsOverlay) {
        return;
    }

    var stageWidth = typeof canvas !== "undefined" && canvas ? canvas.width : 1280;
    var stageHeight = typeof canvas !== "undefined" && canvas ? canvas.height : 720;

    if (resultsOverlayBg) {
        resultsOverlayBg.graphics.clear();
        resultsOverlayBg.graphics
            .beginFill("rgba(6, 10, 28, 0.82)")
            .drawRect(0, 0, stageWidth, stageHeight);
    }

    if (resultsCardContainer) {
        resultsCardContainer.x = stageWidth / 2;
        resultsCardContainer.y = stageHeight / 2;
    }

    positionResultsCloseBtn();
}

function positionResultsCloseBtn() {
    if (!closeBtnFinal || !resultsCardContainer) {
        return;
    }

    var halfWidth = 430;
    var halfHeight = 260;
    closeBtnFinal.x = resultsCardContainer.x + halfWidth - 44;
    closeBtnFinal.y = resultsCardContainer.y - halfHeight + 36;
}

function updateResultsSummary(values) {
    if (!resultsOverlay) {
        return;
    }

    var summary = values || {};
    var totalQ = summary.totalQuestions || 0;
    var answered = summary.answeredQuestions || 0;
    var correct = summary.correctAnswers || 0;
    var totalScore = summary.score || 0;
    var totalResponse = summary.responseTime || 0;

    if (resultsScoreDial) {
        resultsScoreDial.valueText.text = String(totalScore);
        var scoreRatio = Math.max(0, Math.min(totalScore / 100, 1));
        resultsScoreDial.updateAccent(scoreRatio);
    }

    if (resultsResponseDial) {
        resultsResponseDial.valueText.text = String(totalResponse);
        var maxResponse = typeof gtime !== "undefined" && gtime ? gtime : (totalResponse > 0 ? totalResponse : 1);
        var responseRatio = maxResponse ? Math.max(0, Math.min(totalResponse / maxResponse, 1)) : 0;
        resultsResponseDial.updateAccent(responseRatio);
    }

    if (resultsQuestionsDial) {
        resultsQuestionsDial.valueText.text = String(totalQ);
        resultsQuestionsDial.updateAccent(totalQ > 0 ? 1 : 0);
    }

    if (resultsAttemptsDial) {
        resultsAttemptsDial.valueText.text = String(answered);
        var attemptRatio = totalQ ? Math.max(0, Math.min(answered / totalQ, 1)) : (answered > 0 ? 1 : 0);
        resultsAttemptsDial.updateAccent(attemptRatio);
    }

    if (resultsCorrectDial) {
        resultsCorrectDial.valueText.text = String(correct);
        var correctRatio = totalQ ? Math.max(0, Math.min(correct / totalQ, 1)) : (correct > 0 ? 1 : 0);
        resultsCorrectDial.updateAccent(correctRatio);
    }
}

function showScoreFn() {

    if (typeof bitmap !== "undefined" && bitmap) {
        bitmap.visible = false;
    }

    if (typeof resultLoading !== "undefined" && resultLoading) {
        resultLoading.visible = false;
    }

    ensureResultsSummaryOverlay(container1);
    layoutResultsSummaryOverlay();

    updateResultsSummary({
        score: typeof score !== "undefined" ? score : 0,
        totalQuestions: typeof totalQuestions !== "undefined" ? totalQuestions : 0,
        answeredQuestions: typeof answeredQuestions !== "undefined" ? answeredQuestions : 0,
        correctAnswers: typeof ccnt !== "undefined" ? ccnt : 0,
        responseTime: typeof responseTime !== "undefined" ? responseTime : 0,
    });

    if (resultsOverlay) {
        resultsOverlay.visible = true;
        resultsOverlay.alpha = 0;
        createjs.Tween.removeTweens(resultsOverlay);
        createjs.Tween.get(resultsOverlay).to({ alpha: 1 }, 400, createjs.Ease.quadOut);
    }

    if (closeBtnFinal) {
        closeBtnFinal.visible = true;
        closeBtnFinal.mouseEnabled = true;
        closeBtnFinal.cursor = "pointer";
        closeBtnFinal.removeAllEventListeners("click");
        closeBtnFinal.addEventListener("click", closeGameFn);

        if (resultsOverlay) {
            resultsOverlay.addChild(closeBtnFinal);
            resultsOverlay.setChildIndex(closeBtnFinal, resultsOverlay.numChildren - 1);
        }

        positionResultsCloseBtn();
    }

    stage.update();
}
//------------------------------------------------------------------------------------------------//
function closeGameFn() {
    parent.jQuery.fancybox.close();
}
//-------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//



function removeScoreBoard() {
    clearTimeout(removeTimeOut)
    if (resultsOverlay) {
        resultsOverlay.visible = false;
    }
    if (closeBtnFinal) {
        closeBtnFinal.visible = false;
        closeBtnFinal.mouseEnabled = false;
    }
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