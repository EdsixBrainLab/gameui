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
  resultsCardMask,
  resultsCardSheen,
  resultsCardAmbientGlow,
  resultsScoreRibbon,
  resultsCardAurora,
  resultsCardAuroraTrail,
  resultsCardSparkleLayer,
  resultsCardSparkles,
  resultsHeadingTxt,
  resultsSubheadingTxt,
  resultsScoreDial,
  resultsResponseDial,
  resultsQuestionsDial,
  resultsAttemptsDial,
  resultsCorrectDial,
  resultsScorePulse;

var resultsCloseBtnGlow,
  resultsCloseBtnHighlight,
  resultsCloseBtnIconShape;

var answer_status;
var rightCnt = -1, wrongCnt = -1;
var es1 = [2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3, 2, 0, 3, 4, 1, 4, 2, 0, 1, 3]
var es2 = [5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6, 5, 6, 7, 6, 5, 7, 7, 6, 5, 6]
var feedbackContainer,
  feedbackBackgroundShape,
  feedbackOverlayShape,
  feedbackOutlineShape,
  feedbackSheenShape,
  feedbackAccentContainer,
  feedbackAccentGlow,
  feedbackAccentBg,
  feedbackIconBackdrop,
  feedbackIconHalo,
  feedbackPulseRing,
  feedbackIconShape,
  feedbackParticleLayer,
  feedbackTitleTxt,
  feedbackMessageTxt;

var confettiLayer;
var confettiColors = ["#f9d342", "#ff6f61", "#50c878", "#4fc3f7", "#af7ac5", "#ffd1dc"]; // soft vibrant palette

function applyColorAlpha(color, alpha) {
    if (typeof alpha !== "number") {
        alpha = 1;
    }

    if (!color || typeof color !== "string") {
        return "rgba(255,255,255," + alpha + ")";
    }

    var rgbaMatch = color.match(/rgba?\(([^)]+)\)/i);
    if (rgbaMatch) {
        var parts = rgbaMatch[1].split(/\s*,\s*/);
        var r = parseFloat(parts[0]);
        var g = parseFloat(parts[1]);
        var b = parseFloat(parts[2]);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            return "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + alpha + ")";
        }
    }

    if (color.charAt(0) === "#") {
        var hex = color.substring(1);
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length === 6) {
            var rHex = parseInt(hex.substring(0, 2), 16);
            var gHex = parseInt(hex.substring(2, 4), 16);
            var bHex = parseInt(hex.substring(4, 6), 16);
            if (!isNaN(rHex) && !isNaN(gHex) && !isNaN(bHex)) {
                return "rgba(" + rHex + "," + gHex + "," + bHex + "," + alpha + ")";
            }
        }
    }

    return color;
}
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
    if (typeof startIntroActionButtonAnimations === "function") {
        startIntroActionButtonAnimations(SkipBtnMc);
    }
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
    if (typeof startIntroActionButtonAnimations === "function") {
        startIntroActionButtonAnimations(SkipBtnMc);
    }
    ////////////////////////////////////////////////////////////////////
}


//=============================================================================//
function createDelayToStartGame() {

    howToPlayImageMc.visible = false;

    if (typeof stopIntroActionButtonAnimations === "function" && SkipBtnMc) {
        stopIntroActionButtonAnimations(SkipBtnMc);
    }
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
    feedbackContainer.y = 340;
    feedbackContainer.alpha = 0;
    feedbackContainer.visible = false;
    feedbackContainer.mouseEnabled = false;
    feedbackContainer.mouseChildren = false;
    feedbackContainer.shadow = new createjs.Shadow("rgba(8,18,46,0.4)", 0, 18, 36);

    feedbackParticleLayer = new createjs.Container();
    feedbackParticleLayer.mouseEnabled = false;
    feedbackParticleLayer.mouseChildren = false;
    feedbackContainer.addChild(feedbackParticleLayer);

    feedbackBackgroundShape = new createjs.Shape();
    feedbackContainer.addChild(feedbackBackgroundShape);

    feedbackOverlayShape = new createjs.Shape();
    feedbackOverlayShape.alpha = 0.9;
    feedbackContainer.addChild(feedbackOverlayShape);

    feedbackOutlineShape = new createjs.Shape();
    feedbackContainer.addChild(feedbackOutlineShape);

    feedbackAccentContainer = new createjs.Container();
    feedbackAccentContainer.x = -210;
    feedbackAccentContainer.y = 0;
    feedbackAccentContainer.mouseEnabled = false;
    feedbackAccentContainer.mouseChildren = false;
    feedbackContainer.addChild(feedbackAccentContainer);

    feedbackIconHalo = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackIconHalo);

    feedbackAccentGlow = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackAccentGlow);

    feedbackPulseRing = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackPulseRing);

    feedbackAccentBg = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackAccentBg);

    feedbackIconBackdrop = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackIconBackdrop);

    feedbackIconShape = new createjs.Shape();
    feedbackAccentContainer.addChild(feedbackIconShape);

    feedbackSheenShape = new createjs.Shape();
    feedbackSheenShape.alpha = 0;
    feedbackContainer.addChild(feedbackSheenShape);

    feedbackTitleTxt = new createjs.Text("", "800 28px 'Baloo 2'", "#FFFFFF");
    feedbackTitleTxt.textAlign = "left";
    feedbackTitleTxt.x = -120;
    feedbackTitleTxt.y = -26;
    feedbackContainer.addChild(feedbackTitleTxt);

    feedbackMessageTxt = new createjs.Text("", "400 18px 'Baloo 2'", "#E3ECFF");
    feedbackMessageTxt.textAlign = "left";
    feedbackMessageTxt.lineWidth = 360;
    feedbackMessageTxt.lineHeight = 24;
    feedbackMessageTxt.x = -120;
    feedbackMessageTxt.y = 18;
    feedbackContainer.addChild(feedbackMessageTxt);

    container.parent.addChild(feedbackContainer);
}

function getFeedbackPalette(isCorrect) {
    if (isCorrect) {
        return {
            cardGradient: ["rgba(20,68,104,0.96)", "rgba(34,82,142,0.96)"],
            overlayGradient: ["rgba(255,255,255,0.28)", "rgba(255,255,255,0.05)"],
            outline: "rgba(166,242,236,0.68)",
            accentGradient: ["#2DD4BF", "#38BDF8"],
            accentHalo: "rgba(45,212,191,0.6)",
            iconBackdrop: "#164E63",
            pulseRing: "rgba(56,189,248,0.35)",
            iconStroke: "#F0FDFA",
            titleColor: "#ECFEFF",
            messageColor: "#D1FAF9",
            particleColors: ["#2DD4BF", "#5EEAD4", "#38BDF8", "#C4F1F9"],
            sparkColor: "#FFFFFF"
        };
    }

    return {
        cardGradient: ["rgba(72,24,60,0.96)", "rgba(46,28,84,0.96)"],
        overlayGradient: ["rgba(255,255,255,0.24)", "rgba(255,255,255,0.04)"],
        outline: "rgba(255,184,210,0.62)",
        accentGradient: ["#FB7185", "#C084FC"],
        accentHalo: "rgba(251,113,133,0.55)",
        iconBackdrop: "#3B0B2B",
        pulseRing: "rgba(236,72,153,0.32)",
        iconStroke: "#FFE4F1",
        titleColor: "#FFE4F1",
        messageColor: "#FBCFE8",
        particleColors: ["#FB7185", "#F472B6", "#C084FC", "#FDA4AF"],
        sparkColor: "#FFFFFF"
    };
}

function animateFeedbackAccent(palette, isCorrect) {
    if (!feedbackAccentContainer) {
        return;
    }

    feedbackAccentContainer.scaleX = feedbackAccentContainer.scaleY = 0.88;
    createjs.Tween.removeTweens(feedbackAccentContainer);
    createjs.Tween.get(feedbackAccentContainer, { override: true })
        .to({ scaleX: 1.08, scaleY: 1.08 }, 280, createjs.Ease.backOut)
        .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.sineInOut);

    if (feedbackPulseRing) {
        feedbackPulseRing.alpha = 0.75;
        feedbackPulseRing.scaleX = feedbackPulseRing.scaleY = 0.55;
        createjs.Tween.removeTweens(feedbackPulseRing);
        createjs.Tween.get(feedbackPulseRing, { override: true })
            .to({ scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 540, createjs.Ease.quadOut);
    }

    if (feedbackAccentGlow) {
        createjs.Tween.removeTweens(feedbackAccentGlow);
        feedbackAccentGlow.alpha = 0.65;
        createjs.Tween.get(feedbackAccentGlow, { override: true })
            .to({ alpha: 0.4 }, 420, createjs.Ease.quadOut)
            .to({ alpha: 0.6 }, 380, createjs.Ease.quadIn);
    }

    if (feedbackIconHalo) {
        createjs.Tween.removeTweens(feedbackIconHalo);
        feedbackIconHalo.alpha = 0.8;
        feedbackIconHalo.scaleX = feedbackIconHalo.scaleY = 1;
        createjs.Tween.get(feedbackIconHalo, { override: true })
            .to({ alpha: 0.45, scaleX: 1.12, scaleY: 1.12 }, 480, createjs.Ease.quadOut)
            .to({ alpha: 0.72, scaleX: 1, scaleY: 1 }, 420, createjs.Ease.quadIn);
    }

    if (feedbackIconShape) {
        createjs.Tween.removeTweens(feedbackIconShape);
        feedbackIconShape.scaleX = feedbackIconShape.scaleY = 0.86;
        createjs.Tween.get(feedbackIconShape, { override: true })
            .to({ scaleX: 1.08, scaleY: 1.08 }, 260, createjs.Ease.elasticOut)
            .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.sineInOut);
    }
}

function animateFeedbackSheen(palette) {
    if (!feedbackSheenShape) {
        return;
    }

    var cardWidth = 520;
    var cardHeight = 128;

    feedbackSheenShape.graphics.clear();
    feedbackSheenShape.graphics
        .beginLinearGradientFill([
            applyColorAlpha(palette.sparkColor, 0),
            applyColorAlpha(palette.sparkColor, 0.6),
            applyColorAlpha(palette.sparkColor, 0)
        ], [0, 0.5, 1], -60, 0, 60, 0)
        .drawRoundRect(-60, -cardHeight, 120, cardHeight * 2, 60);

    feedbackSheenShape.alpha = 0;
    feedbackSheenShape.x = -cardWidth / 2 - 70;
    feedbackSheenShape.y = 0;
    feedbackSheenShape.rotation = 18;

    createjs.Tween.removeTweens(feedbackSheenShape);
    createjs.Tween.get(feedbackSheenShape, { override: true })
        .to({ alpha: 0.65 }, 220, createjs.Ease.quadOut)
        .to({ x: cardWidth / 2 + 70 }, 720, createjs.Ease.quadInOut)
        .to({ alpha: 0 }, 160, createjs.Ease.quadIn);
}

function spawnFeedbackParticles(palette, isCorrect) {
    if (!feedbackParticleLayer) {
        return;
    }

    feedbackParticleLayer.removeAllChildren();

    var colors = palette.particleColors || ["#ffffff"];
    var burstCount = isCorrect ? 12 : 10;

    for (var i = 0; i < burstCount; i++) {
        var particle = new createjs.Shape();
        var color = colors[i % colors.length];
        var radius = 6 + Math.random() * 7;
        var startX = -40 + Math.random() * 80;
        var startY = -10 + Math.random() * 20;

        if (isCorrect) {
            particle.graphics.beginFill(color).drawPolyStar(0, 0, radius, 5, 0.5, -90);
        } else {
            particle.graphics
                .beginFill(applyColorAlpha(color, 0.2))
                .drawCircle(0, 0, radius * 0.45);
            particle.graphics
                .setStrokeStyle(2)
                .beginStroke(color)
                .drawPolyStar(0, 0, radius, 4, 0.5, -90);
        }

        particle.x = startX;
        particle.y = startY;
        particle.alpha = 0;

        feedbackParticleLayer.addChild(particle);

        var travelX = (Math.random() * (isCorrect ? 260 : 160) + 80) * (Math.random() < 0.5 ? -1 : 1);
        var travelY = isCorrect ? -(80 + Math.random() * 110) : (40 + Math.random() * 70);

        createjs.Tween.get(particle)
            .wait(i * 30)
            .to({ alpha: 1 }, 100)
            .to({ x: startX + travelX, y: startY + travelY, rotation: (Math.random() * 240 - 120) }, 900 + Math.random() * 420, createjs.Ease.quadOut)
            .to({ alpha: 0 }, 260, createjs.Ease.quadIn)
            .call((function (target) {
                return function () {
                    if (target.parent) {
                        target.parent.removeChild(target);
                    }
                };
            })(particle));
    }
}

function showFeedbackBanner(isCorrect) {
    ensureFeedbackContainer();

    var palette = getFeedbackPalette(isCorrect);
    var cardWidth = 520;
    var cardHeight = 128;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = 36;

    feedbackBackgroundShape.graphics
        .clear()
        .beginLinearGradientFill(palette.cardGradient, [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

    feedbackOverlayShape.graphics
        .clear()
        .beginLinearGradientFill(palette.overlayGradient, [0, 1], -halfWidth, -halfHeight, halfWidth, -halfHeight / 4)
        .drawRoundRectComplex(
            -halfWidth,
            -halfHeight,
            cardWidth,
            cardHeight * 0.55,
            cornerRadius,
            cornerRadius,
            Math.max(cornerRadius * 0.5, 16),
            Math.max(cornerRadius * 0.5, 16)
        );

    feedbackOutlineShape.graphics
        .clear()
        .setStrokeStyle(2)
        .beginStroke(palette.outline)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

    var accentRadius = 36;
    feedbackIconHalo.graphics
        .clear()
        .beginRadialGradientFill([
            applyColorAlpha(palette.accentHalo, 0.9),
            applyColorAlpha(palette.accentHalo, 0)
        ], [0, 1], 0, 0, 0, 0, 0, accentRadius * 1.6)
        .drawCircle(0, 0, accentRadius * 1.6);

    feedbackAccentGlow.graphics
        .clear()
        .beginRadialGradientFill([
            applyColorAlpha(palette.accentGradient[0], 0.85),
            applyColorAlpha(palette.accentGradient[0], 0)
        ], [0, 1], 0, 0, 0, 0, 0, accentRadius * 1.2)
        .drawCircle(0, 0, accentRadius * 1.2);

    feedbackPulseRing.graphics
        .clear()
        .setStrokeStyle(3)
        .beginStroke(palette.pulseRing)
        .drawCircle(0, 0, accentRadius + 6);
    feedbackPulseRing.alpha = 0;

    feedbackAccentBg.graphics
        .clear()
        .beginLinearGradientFill(palette.accentGradient, [0, 1], -accentRadius, -accentRadius, accentRadius, accentRadius)
        .drawCircle(0, 0, accentRadius);

    var backdropColor = palette.iconBackdrop || palette.accentGradient[0];
    feedbackIconBackdrop.graphics
        .clear()
        .beginRadialGradientFill([
            applyColorAlpha(backdropColor, 0.95),
            applyColorAlpha(backdropColor, 0.15)
        ], [0, 1], 0, 0, 0, 0, 0, accentRadius * 0.72)
        .drawCircle(0, 0, accentRadius * 0.72);

    feedbackIconShape.graphics.clear();
    feedbackIconShape.graphics.setStrokeStyle(6, "round").beginStroke(palette.iconStroke);
    if (isCorrect) {
        feedbackIconShape.graphics.moveTo(-10, 4).lineTo(-2, 14).lineTo(18, -14);
    } else {
        feedbackIconShape.graphics.moveTo(-12, -12).lineTo(12, 12);
        feedbackIconShape.graphics.moveTo(12, -12).lineTo(-12, 12);
    }
    feedbackIconShape.shadow = new createjs.Shadow(applyColorAlpha(palette.iconStroke, 0.35), 0, 6, 14);

    feedbackTitleTxt.color = palette.titleColor;
    feedbackMessageTxt.color = palette.messageColor;

    var answerText = typeof correctAnswer !== "undefined" && correctAnswer ? correctAnswer.toUpperCase() : "";
    if (isCorrect) {
        feedbackTitleTxt.text = answerText ? "Brilliant match!" : "Brilliant match!";
        feedbackMessageTxt.text = answerText
            ? "\"" + answerText + "\" locked in perfectly. Keep that momentum!"
            : "Everything clicked beautifully—ride the streak!";
    } else {
        feedbackTitleTxt.text = "Almost there!";
        feedbackMessageTxt.text = answerText
            ? "The answer was \"" + answerText + "\". Shake it off and take on the next one!"
            : "Take a breath, reset, and crush the next puzzle.";
    }

    feedbackParticleLayer.removeAllChildren();

    feedbackContainer.visible = true;
    feedbackContainer.alpha = 0;
    feedbackContainer.scaleX = feedbackContainer.scaleY = 0.92;
    feedbackContainer.y = 260;

    createjs.Tween.removeTweens(feedbackContainer);
    createjs.Tween.get(feedbackContainer, { override: true })
        .to({ alpha: 1, y: 340, scaleX: 1, scaleY: 1 }, 340, createjs.Ease.backOut)
        .wait(1600)
        .to({ alpha: 0, y: 220, scaleX: 0.96, scaleY: 0.96 }, 360, createjs.Ease.quadIn)
        .call(function () {
            feedbackContainer.visible = false;
            feedbackParticleLayer.removeAllChildren();
        });

    animateFeedbackAccent(palette, isCorrect);
    animateFeedbackSheen(palette);
    spawnFeedbackParticles(palette, isCorrect);
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
    clrSent = setTimeout(sentscore, 2000);

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

    var glowColorStops = options.glowStops || ["rgba(8,14,40,0.28)", "rgba(8,14,40,0)"];
    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(glowColorStops, [0, 1], 0, radius * 0.55, radius * 0.1, 0, radius * 0.55, radius + 46)
        .drawCircle(0, radius * 0.55, radius + 46);
    glow.alpha = options.glowAlpha != null ? options.glowAlpha : 0.55;
    container.addChild(glow);

    var halo = new createjs.Shape();
    halo.graphics
        .beginRadialGradientFill(["rgba(255,255,255,0.55)", "rgba(255,255,255,0.08)"], [0, 1], 0, 0, 0, 0, 0, radius + 26)
        .drawCircle(0, 0, radius + 26);
    halo.alpha = 0.85;
    container.addChild(halo);

    var base = new createjs.Shape();
    base.graphics
        .beginLinearGradientFill(options.baseGradient || ["rgba(255,255,255,0.95)", "rgba(236,240,255,0.65)"], [0, 1], 0, -radius, 0, radius)
        .drawCircle(0, 0, radius);
    container.addChild(base);

    var inner = new createjs.Shape();
    inner.graphics
        .beginLinearGradientFill(options.innerGradient || ["#FFFFFF", "#E7ECFF"], [0, 1], 0, -radius + 28, 0, radius - 30)
        .drawCircle(0, 0, radius - 30);
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
            .setStrokeStyle(options.accentStroke || 14, "round")
            .beginLinearGradientStroke(accentColors || ["#FFFFFF", "#FFFFFF"], [0, 1], -radius, 0, radius, 0)
            .arc(0, 0, radius - (options.accentInset || 20), -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * clamped));
    };

    var valueText = new createjs.Text("0", options.valueFont || "700 48px 'Baloo 2'", options.valueColor || "#182048");
    valueText.textAlign = "center";
    valueText.y = options.valueYOffset != null ? options.valueYOffset : -12;
    valueText.shadow = new createjs.Shadow(options.valueShadowColor || "rgba(15,18,42,0.35)", 0, 6, 18);
    container.addChild(valueText);
    container.valueText = valueText;

    var label = new createjs.Text(labelText ? labelText.toUpperCase() : "", options.labelFont || "600 20px 'Baloo 2'", options.labelColor || "rgba(255,255,255,0.92)");
    label.textAlign = "center";
    label.y = options.labelOffset != null ? options.labelOffset : radius + 34;
    label.letterSpacing = options.labelLetterSpacing != null ? options.labelLetterSpacing : 2;
    label.shadow = options.labelShadow || new createjs.Shadow("rgba(10,16,36,0.4)", 0, 3, 10);
    container.addChild(label);
    container.labelText = label;

    container.updateAccent(0);

    return container;
}

function ensureVectorCloseButton() {
    if (closeBtnFinal && closeBtnFinal.isVectorClose) {
        return closeBtnFinal;
    }

    var previousParent = closeBtnFinal && closeBtnFinal.parent ? closeBtnFinal.parent : null;
    var previousIndex = previousParent ? previousParent.getChildIndex(closeBtnFinal) : -1;

    if (closeBtnFinal && closeBtnFinal.parent) {
        closeBtnFinal.parent.removeChild(closeBtnFinal);
    }

    var closeContainer = new createjs.Container();
    closeContainer.visible = false;
    closeContainer.alpha = 0;
    closeContainer.mouseChildren = false;
    closeContainer.mouseEnabled = true;
    closeContainer.isVectorClose = true;
    closeContainer.cursor = "pointer";
    closeContainer.shadow = new createjs.Shadow("rgba(10, 18, 44, 0.45)", 0, 8, 18);

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            ["rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"],
            [0, 0.6, 1],
            0,
            0,
            0,
            0,
            0,
            40
        )
        .drawCircle(0, 0, 40);
    glow.alpha = 0.25;
    closeContainer.addChild(glow);

    var base = new createjs.Shape();
    base.graphics
        .beginLinearGradientFill(["#FF8A94", "#FFB15F"], [0, 1], -32, -32, 32, 32)
        .drawRoundRect(-28, -28, 56, 56, 18);
    closeContainer.addChild(base);

    var highlight = new createjs.Shape();
    highlight.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(255, 255, 255, 0.88)")
        .drawRoundRect(-26, -26, 52, 52, 16);
    highlight.alpha = 0.85;
    closeContainer.addChild(highlight);

    var icon = new createjs.Shape();
    icon.graphics
        .setStrokeStyle(4, "round", "round")
        .beginStroke("#FFFFFF")
        .moveTo(-11, -11)
        .lineTo(11, 11)
        .moveTo(-11, 11)
        .lineTo(11, -11);
    icon.alpha = 0.92;
    closeContainer.addChild(icon);

    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000000").drawCircle(0, 0, 30);
    closeContainer.hitArea = hit;

    closeContainer.on("mouseover", function () {
        createjs.Tween.get(highlight, { override: true }).to({ alpha: 1 }, 160, createjs.Ease.quadOut);
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: 0.45, scaleX: 1.05, scaleY: 1.05 }, 180, createjs.Ease.quadOut);
    });

    closeContainer.on("mouseout", function () {
        createjs.Tween.get(highlight, { override: true }).to({ alpha: 0.85 }, 200, createjs.Ease.quadOut);
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: 0.25, scaleX: 1, scaleY: 1 }, 220, createjs.Ease.quadOut);
    });

    closeBtnFinal = closeContainer;
    resultsCloseBtnGlow = glow;
    resultsCloseBtnHighlight = highlight;
    resultsCloseBtnIconShape = icon;

    if (previousParent) {
        previousParent.addChildAt(closeBtnFinal, previousIndex >= 0 ? previousIndex : previousParent.numChildren);
    }

    return closeBtnFinal;
}

function ensureResultsSummaryOverlay(parentContainer) {
    ensureVectorCloseButton();
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
            .beginLinearGradientFill(["#FFAA6B", "#F66BC6", "#6C6BFF"], [0, 0.48, 1], -460, -280, 460, 280)
            .drawRoundRect(-460, -280, 920, 560, 52);
        cardBg.shadow = new createjs.Shadow("rgba(10,18,44,0.55)", 0, 26, 64);
        resultsCardContainer.addChild(cardBg);
        resultsCardMask = new createjs.Shape();
        resultsCardMask.graphics.drawRoundRect(-440, -240, 880, 480, 46);
        resultsCardMask.visible = false;
        resultsCardMask.mouseEnabled = false;
        resultsCardMask.mouseChildren = false;
        resultsCardContainer.addChild(resultsCardMask);
        resultsCardAurora = new createjs.Shape();
        resultsCardAurora.graphics
            .beginLinearGradientFill(["rgba(255,255,255,0.45)", "rgba(255,255,255,0)"], [0, 1], -420, -180, 320, 220)
            .drawRoundRect(-440, -240, 880, 480, 46);
        resultsCardAurora.alpha = 0.45;
        resultsCardAurora.rotation = -6;
        resultsCardAurora.mask = resultsCardMask;
        resultsCardContainer.addChild(resultsCardAurora);

        resultsCardAuroraTrail = new createjs.Shape();
        resultsCardAuroraTrail.graphics
            .beginLinearGradientFill(["rgba(255,255,255,0)", "rgba(255,255,255,0.35)", "rgba(255,255,255,0)"], [0, 0.65, 1], -360, 0, 360, 0)
            .drawRoundRect(-440, -240, 880, 480, 46);
        resultsCardAuroraTrail.alpha = 0.3;
        resultsCardAuroraTrail.mask = resultsCardMask;
        resultsCardContainer.addChild(resultsCardAuroraTrail);

        resultsCardSparkleLayer = new createjs.Container();
        resultsCardSparkleLayer.mask = resultsCardMask;
        resultsCardContainer.addChild(resultsCardSparkleLayer);
        resultsCardSparkles = [];
        for (var sparkleIndex = 0; sparkleIndex < 6; sparkleIndex++) {
            var sparkle = new createjs.Shape();
            sparkle.graphics
                .beginRadialGradientFill(
                    ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.35)", "rgba(255,255,255,0)"],
                    [0, 0.4, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    14
                )
                .drawCircle(0, 0, 14);
            sparkle.alpha = 0;
            sparkle.x = -360 + Math.random() * 720;
            sparkle.y = -200 + Math.random() * 400;
            resultsCardSparkleLayer.addChild(sparkle);
            resultsCardSparkles.push(sparkle);
        }

        var cardInnerSheen = new createjs.Shape();
        cardInnerSheen.graphics
            .beginLinearGradientFill(["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"], [0, 1], -440, -200, 200, 120)
            .drawRoundRect(-440, -240, 880, 480, 46);
        cardInnerSheen.alpha = 0.35;
        cardInnerSheen.mask = resultsCardMask;
        resultsCardContainer.addChild(cardInnerSheen);

        var cardOutline = new createjs.Shape();
        cardOutline.graphics
            .setStrokeStyle(3.5)
            .beginStroke("rgba(255,255,255,0.72)")
            .drawRoundRect(-460, -280, 920, 560, 52);
        resultsCardContainer.addChild(cardOutline);

        var cardGlow = new createjs.Shape();
        cardGlow.graphics
            .beginRadialGradientFill(["rgba(255,255,255,0.45)", "rgba(255,255,255,0)"], [0, 1], -260, -200, 0, -260, -200, 320)
            .drawCircle(-260, -200, 320);
        cardGlow.alpha = 0.5;
        resultsCardContainer.addChild(cardGlow);
        resultsCardAmbientGlow = new createjs.Shape();
        resultsCardAmbientGlow.graphics
            .beginRadialGradientFill(
                ["rgba(255,255,255,0)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0)"],
                [0, 0.55, 1],
                0,
                0,
                0,
                0,
                0,
                420
            )
            .drawCircle(0, 0, 420);
        resultsCardAmbientGlow.alpha = 0.2;
        resultsCardAmbientGlow.scaleX = resultsCardAmbientGlow.scaleY = 1;
        resultsCardAmbientGlow.mask = resultsCardMask;
        resultsCardContainer.addChild(resultsCardAmbientGlow);

        var scoreRibbon = new createjs.Shape();
        scoreRibbon.graphics
            .beginLinearGradientFill(["rgba(255,255,255,0.22)", "rgba(255,255,255,0.05)"], [0, 1], -320, 0, 320, 0)
            .drawRoundRect(-320, -54, 640, 108, 54);
        scoreRibbon.regX = 0;
        scoreRibbon.regY = 0;
        scoreRibbon.rotation = -18;
        scoreRibbon.alpha = 0.65;
        resultsCardContainer.addChild(scoreRibbon);
        resultsScoreRibbon = scoreRibbon;

        resultsCardSheen = new createjs.Shape();
        resultsCardSheen.graphics
            .beginLinearGradientFill(
                ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0)"],
                [0, 0.55, 1],
                -200,
                0,
                200,
                0
            )
            .drawRoundRect(-240, -260, 480, 520, 52);
        resultsCardSheen.alpha = 0;
        resultsCardSheen.x = -360;
        resultsCardSheen.mask = resultsCardMask;
        resultsCardSheen.compositeOperation = "lighter";
        resultsCardContainer.addChild(resultsCardSheen);

        var headerContainer = new createjs.Container();
        headerContainer.y = -200;
        resultsCardContainer.addChild(headerContainer);

        resultsHeadingTxt = new createjs.Text("Performance Summary", "700 36px 'Baloo 2'", "#FFFFFF");
        resultsHeadingTxt.textAlign = "center";
        resultsHeadingTxt.shadow = new createjs.Shadow("rgba(8,14,40,0.5)", 0, 6, 24);
        headerContainer.addChild(resultsHeadingTxt);

        resultsSubheadingTxt = new createjs.Text("Here's how you performed in this round.", "400 20px 'Baloo 2'", "rgba(255,255,255,0.9)");
        resultsSubheadingTxt.textAlign = "center";
        resultsSubheadingTxt.y = 38;
        headerContainer.addChild(resultsSubheadingTxt);

        var headerUnderline = new createjs.Shape();
        headerUnderline.graphics
            .setStrokeStyle(2)
            .beginStroke("rgba(255,255,255,0.45)")
            .moveTo(-140, 70)
            .lineTo(140, 70);
        headerContainer.addChild(headerUnderline);

        resultsScoreDial = createResultsSummaryDial(120, "Score", ["#FFE58A", "#FF7DA6"], {
            valueFont: "700 68px 'Baloo 2'",
            valueYOffset: -18,
            labelFont: "600 24px 'Baloo 2'",
            labelOffset: 88,
            accentStroke: 16,
            accentInset: 22,
            valueColor: "#1B1B3F",
            baseGradient: ["rgba(255,255,255,0.96)", "rgba(237,242,255,0.72)"],
            innerGradient: ["#FFFFFF", "#E9F0FF"],
            glowAlpha: 0.45,
            valueShadowColor: "rgba(12,20,48,0.4)",
            labelShadow: new createjs.Shadow("rgba(13,19,42,0.35)", 0, 3, 12),
        });
        resultsScoreDial.y = -24;
        resultsCardContainer.addChild(resultsScoreDial);
        resultsScorePulse = new createjs.Shape();
        resultsScorePulse.graphics
            .beginRadialGradientFill(["rgba(255,255,255,0.4)", "rgba(255,255,255,0)", "rgba(255,255,255,0)"], [0, 0.55, 1], 0, 0, 0, 0, 0, 150)
            .drawCircle(0, 0, 150);
        resultsScorePulse.alpha = 0;
        resultsScorePulse.scaleX = resultsScorePulse.scaleY = 0.65;
        resultsScorePulse.compositeOperation = "lighter";
        resultsScorePulse.x = resultsScoreDial.x;
        resultsScorePulse.y = resultsScoreDial.y;
        resultsCardContainer.addChild(resultsScorePulse);
        resultsCardContainer.setChildIndex(resultsScorePulse, resultsCardContainer.getChildIndex(resultsScoreDial));

        var footerY = 170;

        resultsResponseDial = createResultsSummaryDial(90, "Response Time", ["#5BEBFF", "#547BFF"], {
            valueFont: "700 46px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 134,
            baseGradient: ["rgba(255,255,255,0.92)", "rgba(231,243,255,0.6)"],
            innerGradient: ["#FFFFFF", "#EAF5FF"],
            glowAlpha: 0.5,
        });
        resultsResponseDial.x = -255;
        resultsResponseDial.y = footerY;
        resultsCardContainer.addChild(resultsResponseDial);

        resultsQuestionsDial = createResultsSummaryDial(90, "Questions", ["#FFD271", "#FF7BAE"], {
            valueFont: "700 46px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 134,
            baseGradient: ["rgba(255,255,255,0.92)", "rgba(251,243,255,0.6)"],
            innerGradient: ["#FFFFFF", "#F7ECFF"],
            glowAlpha: 0.5,
        });
        resultsQuestionsDial.x = -85;
        resultsQuestionsDial.y = footerY;
        resultsCardContainer.addChild(resultsQuestionsDial);

        resultsAttemptsDial = createResultsSummaryDial(90, "Attempts", ["#6CF2E6", "#30D6FF"], {
            valueFont: "700 46px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 134,
            baseGradient: ["rgba(255,255,255,0.92)", "rgba(231,255,251,0.6)"],
            innerGradient: ["#FFFFFF", "#E9FFFB"],
            glowAlpha: 0.5,
        });
        resultsAttemptsDial.x = 85;
        resultsAttemptsDial.y = footerY;
        resultsCardContainer.addChild(resultsAttemptsDial);

        resultsCorrectDial = createResultsSummaryDial(90, "Correct", ["#9EFF7D", "#35C86A"], {
            valueFont: "700 46px 'Baloo 2'",
            labelFont: "600 18px 'Baloo 2'",
            labelOffset: 134,
            baseGradient: ["rgba(255,255,255,0.92)", "rgba(231,255,236,0.6)"],
            innerGradient: ["#FFFFFF", "#E6FFEF"],
            glowAlpha: 0.5,
        });
        resultsCorrectDial.x = 255;
        resultsCorrectDial.y = footerY;
        resultsCardContainer.addChild(resultsCorrectDial);

        var footerDivider = new createjs.Shape();
        footerDivider.graphics
            .setStrokeStyle(1.5)
            .beginStroke("rgba(255,255,255,0.38)")
            .moveTo(-360, footerY - 110)
            .lineTo(360, footerY - 110);
        footerDivider.alpha = 0.4;
        resultsCardContainer.addChildAt(footerDivider, resultsCardContainer.getChildIndex(resultsResponseDial));

        resultsCardContainer.setChildIndex(cardOutline, resultsCardContainer.numChildren - 1);
    }

    if (parentContainer && resultsOverlay.parent !== parentContainer) {
        parentContainer.addChild(resultsOverlay);
    }
}

function layoutResultsSummaryOverlay() {
    if (!resultsOverlay) {
        return;
    }

    var stageWidth = 1280;
    var stageHeight = 720;

    if (typeof stage !== "undefined" && stage && stage.canvas) {
        var scaleX = stage.scaleX || 1;
        var scaleY = stage.scaleY || 1;
        stageWidth = stage.canvas.width / scaleX;
        stageHeight = stage.canvas.height / scaleY;
    } else if (typeof canvas !== "undefined" && canvas) {
        stageWidth = canvas.width;
        stageHeight = canvas.height;
    }

    if (resultsOverlayBg) {
        resultsOverlayBg.graphics.clear();
        resultsOverlayBg.graphics
            .beginFill("rgba(6, 10, 28, 0.82)")
            .drawRect(0, 0, stageWidth, stageHeight);
        resultsOverlayBg.x = 0;
        resultsOverlayBg.y = 0;
    }

    if (resultsCardContainer) {
        resultsCardContainer.x = stageWidth / 2;
        resultsCardContainer.y = stageHeight / 2;
    }

    positionResultsCloseBtn();
}

function refreshResultsSummaryAnimations() {
    if (!resultsOverlay) {
        return;
    }

    if (resultsCardContainer) {
        resultsCardContainer.alpha = 0;
        resultsCardContainer.scaleX = resultsCardContainer.scaleY = 0.94;
        createjs.Tween.removeTweens(resultsCardContainer);
        createjs.Tween.get(resultsCardContainer)
            .to({ alpha: 1, scaleX: 1.02, scaleY: 1.02 }, 420, createjs.Ease.quartOut)
            .to({ scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadInOut);
    }

    if (resultsCardAurora) {
        resultsCardAurora.rotation = -8;
        resultsCardAurora.alpha = 0.38;
        createjs.Tween.removeTweens(resultsCardAurora);
        createjs.Tween.get(resultsCardAurora, { loop: true })
            .to({ rotation: 4, alpha: 0.52 }, 4200, createjs.Ease.sineInOut)
            .to({ rotation: -8, alpha: 0.38 }, 4200, createjs.Ease.sineInOut);
    }

    if (resultsCardAuroraTrail) {
        resultsCardAuroraTrail.alpha = 0.24;
        resultsCardAuroraTrail.x = 0;
        createjs.Tween.removeTweens(resultsCardAuroraTrail);
        createjs.Tween.get(resultsCardAuroraTrail, { loop: true })
            .to({ x: 46, alpha: 0.42 }, 3600, createjs.Ease.sineInOut)
            .to({ x: -36, alpha: 0.28 }, 3600, createjs.Ease.sineInOut)
            .to({ x: 0, alpha: 0.24 }, 1600, createjs.Ease.sineInOut);
    }

    if (resultsCardSparkles && resultsCardSparkles.length) {
        for (var s = 0; s < resultsCardSparkles.length; s++) {
            var sparkle = resultsCardSparkles[s];
            sparkle.alpha = 0;
            sparkle.scaleX = sparkle.scaleY = 0.4;
            sparkle.x = -360 + Math.random() * 720;
            sparkle.y = -200 + Math.random() * 400;
            createjs.Tween.removeTweens(sparkle);
            (function (target, delay) {
                createjs.Tween.get(target, { loop: true })
                    .wait(delay)
                    .to({ alpha: 0.9, scaleX: 1, scaleY: 1 }, 320, createjs.Ease.quadOut)
                    .to({ alpha: 0, scaleX: 0.4, scaleY: 0.4 }, 520, createjs.Ease.quadIn)
                    .call(function () {
                        target.x = -360 + Math.random() * 720;
                        target.y = -200 + Math.random() * 400;
                    });
            })(sparkle, 200 * s);
        }
    }

    if (resultsScoreRibbon) {
        resultsScoreRibbon.rotation = -24;
        createjs.Tween.removeTweens(resultsScoreRibbon);
        createjs.Tween.get(resultsScoreRibbon)
            .to({ rotation: -18 }, 520, createjs.Ease.quartOut)
            .to({ rotation: -20 }, 1600, createjs.Ease.sineInOut)
            .to({ rotation: -18 }, 1600, createjs.Ease.sineInOut);
    }

    if (resultsCardSheen) {
        resultsCardSheen.alpha = 0;
        resultsCardSheen.x = -360;
        createjs.Tween.removeTweens(resultsCardSheen);
        createjs.Tween.get(resultsCardSheen, { loop: true })
            .wait(800)
            .to({ alpha: 0.75 }, 200, createjs.Ease.quadOut)
            .to({ x: 360 }, 1700, createjs.Ease.sineOut)
            .to({ alpha: 0 }, 260)
            .set({ x: -360 });
    }

    if (resultsCardAmbientGlow) {
        resultsCardAmbientGlow.alpha = 0.2;
        resultsCardAmbientGlow.scaleX = resultsCardAmbientGlow.scaleY = 1;
        createjs.Tween.removeTweens(resultsCardAmbientGlow);
        createjs.Tween.get(resultsCardAmbientGlow, { loop: true })
            .to({ alpha: 0.42, scaleX: 1.05, scaleY: 1.05 }, 2000, createjs.Ease.sineInOut)
            .to({ alpha: 0.2, scaleX: 1, scaleY: 1 }, 2200, createjs.Ease.sineInOut);
    }

    if (closeBtnFinal && closeBtnFinal.isVectorClose) {
        closeBtnFinal.alpha = 0;
        closeBtnFinal.scaleX = closeBtnFinal.scaleY = 0.85;
        createjs.Tween.removeTweens(closeBtnFinal);
        createjs.Tween.get(closeBtnFinal)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 360, createjs.Ease.quartOut)
            .to({ scaleX: 1.04, scaleY: 1.04 }, 800, createjs.Ease.sineInOut)
            .to({ scaleX: 1, scaleY: 1 }, 820, createjs.Ease.sineInOut);
    }

    if (resultsCloseBtnGlow) {
        resultsCloseBtnGlow.alpha = 0.25;
        resultsCloseBtnGlow.scaleX = resultsCloseBtnGlow.scaleY = 1;
        createjs.Tween.removeTweens(resultsCloseBtnGlow);
        createjs.Tween.get(resultsCloseBtnGlow, { loop: true })
            .to({ alpha: 0.45, scaleX: 1.08, scaleY: 1.08 }, 1400, createjs.Ease.sineInOut)
            .to({ alpha: 0.25, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.sineInOut);
    }

    if (resultsCloseBtnHighlight) {
        resultsCloseBtnHighlight.alpha = 0.85;
        createjs.Tween.removeTweens(resultsCloseBtnHighlight);
        createjs.Tween.get(resultsCloseBtnHighlight, { loop: true })
            .to({ alpha: 1 }, 900, createjs.Ease.sineInOut)
            .to({ alpha: 0.8 }, 900, createjs.Ease.sineInOut);
    }

    if (resultsScorePulse) {
        resultsScorePulse.alpha = 0;
        resultsScorePulse.scaleX = resultsScorePulse.scaleY = 0.65;
    }

    var dialTargets = [
        resultsScoreDial,
        resultsResponseDial,
        resultsQuestionsDial,
        resultsAttemptsDial,
        resultsCorrectDial,
    ];

    for (var i = 0; i < dialTargets.length; i++) {
        var dial = dialTargets[i];
        if (!dial) {
            continue;
        }

        dial.scaleX = dial.scaleY = 1;
        createjs.Tween.removeTweens(dial);
        createjs.Tween.get(dial, { loop: true })
            .wait(400 + i * 180)
            .to({ scaleX: 1.04, scaleY: 1.04 }, 1400, createjs.Ease.sineInOut)
            .to({ scaleX: 1, scaleY: 1 }, 1600, createjs.Ease.sineInOut);
    }
}

function triggerResultsScorePulse() {
    if (!resultsScorePulse) {
        return;
    }

    resultsScorePulse.alpha = 0.55;
    resultsScorePulse.scaleX = resultsScorePulse.scaleY = 0.65;
    createjs.Tween.removeTweens(resultsScorePulse);
    createjs.Tween.get(resultsScorePulse)
        .to({ alpha: 0.75, scaleX: 1.08, scaleY: 1.08 }, 360, createjs.Ease.quadOut)
        .to({ alpha: 0 }, 520, createjs.Ease.quadIn)
        .call(function () {
            resultsScorePulse.scaleX = resultsScorePulse.scaleY = 0.65;
        });
}

function positionResultsCloseBtn() {
    if (!closeBtnFinal || !resultsCardContainer) {
        return;
    }

    var halfWidth = 460;
    var halfHeight = 280;
    var offsetX = closeBtnFinal.isVectorClose ? 52 : 44;
    var offsetY = closeBtnFinal.isVectorClose ? 52 : 36;
    closeBtnFinal.x = resultsCardContainer.x + halfWidth - offsetX;
    closeBtnFinal.y = resultsCardContainer.y - halfHeight + offsetY;
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
        if (totalScore > 0) {
            triggerResultsScorePulse();
        } else if (resultsScorePulse) {
            resultsScorePulse.alpha = 0;
        }
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

    refreshResultsSummaryAnimations();

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

function ensureConfettiLayer() {
    if (confettiLayer && confettiLayer.parent) {
        if (typeof stage !== "undefined" && stage) {
            stage.setChildIndex(confettiLayer, stage.numChildren - 1);
        }
        return confettiLayer;
    }

    if (typeof stage === "undefined" || !stage) {
        return null;
    }

    confettiLayer = new createjs.Container();
    confettiLayer.mouseEnabled = false;
    confettiLayer.mouseChildren = false;
    confettiLayer.name = "confettiLayer";

    stage.addChild(confettiLayer);
    stage.setChildIndex(confettiLayer, stage.numChildren - 1);

    return confettiLayer;
}

function launchConfetti(particleCount) {
    var layer = ensureConfettiLayer();
    if (!layer) {
        return;
    }

    var baseCount = particleCount != null ? particleCount : 30;
    var count = Math.max(Math.round(baseCount * 1.4), baseCount + 12);
    var canvasWidth = typeof canvas !== "undefined" && canvas && !isNaN(canvas.width) ? canvas.width : 1280;
    var centerX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : canvasWidth / 2;
    var centerY = 180;
    var spread = Math.max(320, Math.min(canvasWidth * 0.65, 520));

    for (var i = 0; i < count; i++) {
        var confetti = new createjs.Shape();
        var size = 6 + Math.random() * 6;
        var color = confettiColors[(Math.random() * confettiColors.length) | 0];
        confetti.graphics.beginFill(color).drawRect(-size / 2, -size / 2, size, size);
        var horizontalOffset = Math.random() * spread - spread / 2;
        confetti.x = centerX + horizontalOffset;
        confetti.y = centerY - (Math.random() * 30 + 10);
        confetti.rotation = Math.random() * 360;
        confetti.alpha = 0.92;
        layer.addChild(confetti);

        (function (shape, offset) {
            var driftX = offset * 0.45 + (Math.random() - 0.5) * 120;
            var fallDistance = 420 + Math.random() * 260;
            var duration = 1200 + Math.random() * 900;
            var spin = (Math.random() > 0.5 ? 360 : -360) * (1 + Math.random());

            createjs.Tween.get(shape)
                .to({
                    x: shape.x + driftX,
                    y: shape.y + fallDistance,
                    rotation: shape.rotation + spin,
                    alpha: 0.2
                }, duration, createjs.Ease.quadIn)
                .call(function () {
                    if (shape.parent) {
                        shape.parent.removeChild(shape);
                    }
                    if (typeof stage !== "undefined" && stage) {
                        stage.update();
                    }
                });
        })(confetti, horizontalOffset);
    }

    if (typeof stage !== "undefined" && stage) {
        stage.update();
    }
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