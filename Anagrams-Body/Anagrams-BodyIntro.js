var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 636; introQuestxtY = 120;
var introQues1X = 635, introQues1Y = 280
var introChoice1X = 280, introChoice1Y = 590;
var introChoice2X = 500, introChoice2Y = 590;
var introChoice3X = 720, introChoice3Y = 590;
var introChoice4X = 940, introChoice4Y = 590;
var introClu1X = 465, introClu1Y = 460;
var introClu2X = 575, introClu2Y = 460;
var introClu3X = 685, introClu3Y = 460;
var introClu4X = 795, introClu4Y = 460;
var introArrowX = 210, introArrowY = 350;
var introfingureX = 220, introfingureY = 520;
var ArrowXArr = [, 500, 940, 720, 280],FingXArr = [, 525, 965, 745, 305]
var ArrowYArr = [, 490, 490, 490, 490], FingYArr = [, 600, 600, 600, 600]
var introClueArr = []
var introClueBgArr = []
var introChoiceBgArr = []
var introChoiceGlowArr = []
var introChoiceRevealOrder = [, 2, 4, 3, 1]
var introGlobalScope = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this)

function getFallbackChoiceBuilder() {
    var txt = new createjs.Text("", "700 64px 'Nunito Sans'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = true;
    txt.mouseChildren = false;
    txt.__baseScale = 0.8;
    return txt;
}

function getFallbackClueBuilder() {
    var txt = new createjs.Text("", "700 60px 'Nunito Sans'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 1;
    return txt;
}

function getFallbackLetterUpdater() {
    return function (display, letter) {
        if (!display) {
            return;
        }
        var value = letter ? String(letter).toUpperCase() : "";
        display.text = value;
        display.alpha = value ? 1 : 0;
    };
}

var buildIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_buildChoiceLetterDisplay === "function" && window.SA_buildChoiceLetterDisplay) || getFallbackChoiceBuilder;
var updateIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_updateChoiceLetterDisplay === "function" && window.SA_updateChoiceLetterDisplay) || getFallbackLetterUpdater();
var buildIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_buildClueLetterDisplay === "function" && window.SA_buildClueLetterDisplay) || getFallbackClueBuilder;
var updateIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_updateClueLetterDisplay === "function" && window.SA_updateClueLetterDisplay) || getFallbackLetterUpdater();

function introChoiceIndexFromStep(step) {
    if (!step) {
        return step;
    }
    return introChoiceRevealOrder && introChoiceRevealOrder[step] ? introChoiceRevealOrder[step] : step;
}

function buildIntroGlowShape() {
    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill([
            "rgba(209,178,255,0.55)",
            "rgba(209,178,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 120)
        .drawCircle(0, 0, 120);
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    return glow;
}

function highlightIntroChoiceTile(index, isActive) {
    if (!index) {
        return;
    }

    var tile = introGlobalScope && introGlobalScope["introChoice" + index];
    var bg = introChoiceBgArr[index];
    var glow = introChoiceGlowArr[index];

    if (bg) {
        var baseScale = bg.__baseScale || 1;
        drawChoiceTileBackground(bg, isActive ? CHOICE_TILE_HOVER_COLORS : CHOICE_TILE_BASE_COLORS);
        createjs.Tween.get(bg, { override: true })
            .to({
                scaleX: baseScale * (isActive ? 1.05 : 1),
                scaleY: baseScale * (isActive ? 1.05 : 1),
                alpha: isActive ? 1 : 0.95
            }, 200, createjs.Ease.quadOut);
    }

    if (tile) {
        var tileBase = tile.__baseScale || tile.scaleX || 0.8;
        createjs.Tween.get(tile, { override: true })
            .to({
                scaleX: tileBase * (isActive ? 1.08 : 1),
                scaleY: tileBase * (isActive ? 1.08 : 1),
                alpha: isActive ? 1 : tile.alpha
            }, 200, createjs.Ease.quadOut);
    }

    if (glow) {
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: isActive ? 0.52 : 0.35 }, 220, createjs.Ease.quadOut);
    }
}

function setIntroChoiceUsed(index) {
    if (!index) {
        return;
    }

    var tile = introGlobalScope && introGlobalScope["introChoice" + index];
    var bg = introChoiceBgArr[index];
    var glow = introChoiceGlowArr[index];

    if (bg) {
        drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
        createjs.Tween.get(bg, { override: true })
            .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
    }

    if (tile) {
        createjs.Tween.get(tile, { override: true })
            .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
    }

    if (glow) {
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: 0.2 }, 200, createjs.Ease.quadOut);
    }
}

function styleIntroClueSlot(index, isFilled) {
    if (!index) {
        return;
    }

    var bg = introClueBgArr[index];
    if (!bg) {
        return;
    }

    var baseScale = bg.__baseScale || 1;
    var colors = isFilled ? CLUE_SLOT_SUCCESS_COLORS : CLUE_SLOT_BASE_COLORS;
    drawClueSlotBackground(bg, colors);
    createjs.Tween.get(bg, { override: true })
        .to({
            scaleX: baseScale * (isFilled ? 1.06 : 1),
            scaleY: baseScale * (isFilled ? 1.06 : 1),
            alpha: isFilled ? 1 : 0.95
        }, 220, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 180, createjs.Ease.quadOut);
}

function highlightIntroClueTarget(index) {
    if (!index) {
        return;
    }

    var bg = introClueBgArr[index];
    if (!bg) {
        return;
    }

    var baseScale = bg.__baseScale || 1;
    drawClueSlotBackground(bg, CLUE_SLOT_HIGHLIGHT_COLORS);
    createjs.Tween.get(bg, { override: true })
        .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04, alpha: 1 }, 220, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 200, createjs.Ease.quadOut);
}

function getFallbackChoiceBuilder() {
    var txt = new createjs.Text("", "700 64px 'Nunito Sans'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = true;
    txt.mouseChildren = false;
    txt.__baseScale = 0.8;
    return txt;
}

function getFallbackClueBuilder() {
    var txt = new createjs.Text("", "700 60px 'Nunito Sans'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 1;
    return txt;
}

function getFallbackLetterUpdater() {
    return function (display, letter) {
        if (!display) {
            return;
        }
        var value = letter ? String(letter).toUpperCase() : "";
        display.text = value;
        display.alpha = value ? 1 : 0;
    };
}

var buildIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_buildChoiceLetterDisplay === "function" && window.SA_buildChoiceLetterDisplay) || getFallbackChoiceBuilder;
var updateIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_updateChoiceLetterDisplay === "function" && window.SA_updateChoiceLetterDisplay) || getFallbackLetterUpdater();
var buildIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_buildClueLetterDisplay === "function" && window.SA_buildClueLetterDisplay) || getFallbackClueBuilder;
var updateIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_updateClueLetterDisplay === "function" && window.SA_updateClueLetterDisplay) || getFallbackLetterUpdater();


function commongameintro() {
    introClueArr = [];
    introClueBgArr = [null];
    introChoiceBgArr = [null];
    introChoiceGlowArr = [null];

    introTitle = Title.clone();
    introClu1 = buildIntroClueLetter();
    introClu2 = buildIntroClueLetter();
    introClu3 = buildIntroClueLetter();
    introClu4 = buildIntroClueLetter();
    introChoice1 = buildIntroChoiceLetter();
    introChoice2 = buildIntroChoiceLetter();
    introChoice3 = buildIntroChoiceLetter();
    introChoice4 = buildIntroChoiceLetter();
    introArrow = arrow1.clone();
    introfingure = fingure.clone();

    container.parent.addChild(introTitle);
    introTitle.visible = true;

    call_UI_introQuestionCardContainer(container, "sink");

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;

    var choiceConfigs = [
        { index: 1, x: introChoice1X, y: introChoice1Y, letter: "N" },
        { index: 2, x: introChoice2X, y: introChoice2Y, letter: "S" },
        { index: 3, x: introChoice3X, y: introChoice3Y, letter: "I" },
        { index: 4, x: introChoice4X, y: introChoice4Y, letter: "K" }
    ];

    for (var c = 0; c < choiceConfigs.length; c++) {
        var cfg = choiceConfigs[c];
        var glow = buildIntroGlowShape();
        glow.x = cfg.x;
        glow.y = cfg.y + 6;
        glow.visible = false;
        glow.alpha = 0;
        introChoiceGlowArr[cfg.index] = glow;
        container.parent.addChild(glow);

        var bg = new createjs.Shape();
        drawChoiceTileBackground(bg);
        bg.x = cfg.x;
        bg.y = cfg.y;
        bg.visible = false;
        bg.alpha = 0;
        bg.__baseScale = 0.8 * 1.18;
        bg.shadow = new createjs.Shadow("rgba(10,18,44,0.45)", 0, 12, 28);
        bg.mouseEnabled = false;
        bg.mouseChildren = false;
        introChoiceBgArr[cfg.index] = bg;
        container.parent.addChild(bg);

        var letter = introGlobalScope && introGlobalScope["introChoice" + cfg.index];
        if (!letter) {
            continue;
        }
        letter.x = cfg.x;
        letter.y = cfg.y;
        letter.scaleX = letter.scaleY = 0.8;
        letter.__baseScale = 0.8;
        letter.__baseX = cfg.x;
        letter.__baseY = cfg.y;
        letter.visible = false;
        updateIntroChoiceLetter(letter, cfg.letter);
        container.parent.addChild(letter);

        glow.scaleX = glow.scaleY = letter.__baseScale * 1.3;
    }

    var clueConfigs = [
        { index: 1, x: introClu1X, y: introClu1Y },
        { index: 2, x: introClu2X, y: introClu2Y },
        { index: 3, x: introClu3X, y: introClu3Y },
        { index: 4, x: introClu4X, y: introClu4Y }
    ];

    introClueArr.push("");
    for (var k = 0; k < clueConfigs.length; k++) {
        var clueCfg = clueConfigs[k];
        var clueBg = new createjs.Shape();
        drawClueSlotBackground(clueBg);
        clueBg.x = clueCfg.x;
        clueBg.y = clueCfg.y;
        clueBg.visible = false;
        clueBg.alpha = 0;
        clueBg.__baseScale = 1;
        clueBg.shadow = new createjs.Shadow("rgba(8,14,30,0.42)", 0, 10, 24);
        clueBg.mouseEnabled = false;
        clueBg.mouseChildren = false;
        introClueBgArr[clueCfg.index] = clueBg;
        container.parent.addChild(clueBg);

        var clueLetter = introGlobalScope && introGlobalScope["introClu" + clueCfg.index];
        if (!clueLetter) {
            continue;
        }
        clueLetter.x = clueCfg.x;
        clueLetter.y = clueCfg.y;
        clueLetter.scaleX = clueLetter.scaleY = 1;
        clueLetter.__baseX = clueCfg.x;
        clueLetter.__baseY = clueCfg.y;
        clueLetter.visible = false;
        updateIntroClueLetter(clueLetter, "");
        container.parent.addChild(clueLetter);
        introClueArr.push(clueLetter);
    }

    cluegotoArr = ["", "S", "K", "I", "N"];

    introArrow.visible = false;
    introfingure.visible = false;

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}






function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {


    questionCardContainer_htp.visible = true;
    questionCardContainer_htp.alpha = 0
    createjs.Tween.get(questionCardContainer_htp).wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);



}
function handleComplete2_1() {
    choiceTween()
}
function choiceTween() {

    var val = 700;
    for (i = 1; i < 5; i++) {
        var choiceLetter = introGlobalScope && introGlobalScope["introChoice" + i];
        var choiceBg = introChoiceBgArr[i];
        var choiceGlow = introChoiceGlowArr[i];
        var clueLetter = introClueArr[i];
        var clueBg = introClueBgArr[i];

        if (!choiceLetter) {
            continue;
        }

        if (clueBg) {
            clueBg.visible = true;
            clueBg.alpha = 0;
            clueBg.scaleX = clueBg.scaleY = clueBg.__baseScale || 1;
            createjs.Tween.get(clueBg, { override: true })
                .wait(Math.max(val - 320, 0))
                .to({ alpha: 0.95 }, 260, createjs.Ease.quadOut);
        }

        if (clueLetter) {
            clueLetter.visible = true;
            clueLetter.alpha = 0;
            updateIntroClueLetter(clueLetter, "");
            createjs.Tween.get(clueLetter, { override: true })
                .wait(Math.max(val - 120, 0))
                .to({ alpha: 1 }, 240, createjs.Ease.quadOut);
        }

        if (choiceBg) {
            var bgScale = choiceBg.__baseScale || ((choiceLetter && (choiceLetter.__baseScale || choiceLetter.scaleX)) ? (choiceLetter.__baseScale || choiceLetter.scaleX) * 1.18 : 1);
            choiceBg.scaleX = choiceBg.scaleY = bgScale * 0.92;
            choiceBg.visible = true;
            choiceBg.alpha = 0;
            createjs.Tween.get(choiceBg, { override: true })
                .wait(val)
                .to({ alpha: 0.96, scaleX: bgScale, scaleY: bgScale }, 300, createjs.Ease.quadOut);
        }

        if (choiceGlow) {
            var glowScale = (choiceLetter && (choiceLetter.__baseScale || choiceLetter.scaleX)) ? (choiceLetter.__baseScale || choiceLetter.scaleX) * 1.3 : 1.04;
            choiceGlow.scaleX = choiceGlow.scaleY = glowScale * 0.88;
            choiceGlow.visible = true;
            choiceGlow.alpha = 0;
            createjs.Tween.get(choiceGlow, { override: true })
                .wait(val + 80)
                .to({ alpha: 0.38, scaleX: glowScale, scaleY: glowScale }, 260, createjs.Ease.quadOut);
        }

        if (choiceLetter) {
            var baseScale = choiceLetter.__baseScale || choiceLetter.scaleX || 0.8;
            choiceLetter.visible = true;
            choiceLetter.alpha = 0;
            var baseY = choiceLetter.__baseY || choiceLetter.y || 0;
            choiceLetter.x = choiceLetter.__baseX || choiceLetter.x;
            choiceLetter.y = baseY - 30;
            var revealTween = createjs.Tween.get(choiceLetter, { override: true })
                .wait(val)
                .to({ y: baseY, scaleX: baseScale, scaleY: baseScale, alpha: 1 }, 320, createjs.Ease.quadOut);

            if (i == 4) {
                revealTween.call(handleComplete4_1);
            }
        }

        val = val + 150;
    }
    TempIntroVal = 0;
}


function handleComplete4_1() {
    if (TempIntroVal !== 0) {
        var clueLetter = introClueArr[TempIntroVal];
        if (clueLetter) {
            clueLetter.visible = true;
            updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
            styleIntroClueSlot(TempIntroVal, true);
        }

        var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        if (usedChoiceIndex) {
            highlightIntroChoiceTile(usedChoiceIndex, false);
            setIntroChoiceUsed(usedChoiceIndex);
        }
    }
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);
    setArrowTween();
}

function setArrowTween() {
    TempIntroVal++;

    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        if (TempIntroVal >= cluegotoArr.length) {
            removeGameIntro();
            return;
        }

        var targetChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        var targetChoice = targetChoiceIndex ? introGlobalScope && introGlobalScope["introChoice" + targetChoiceIndex] : null;

        if (TempIntroVal > 1) {
            var prevChoiceIndex = introChoiceIndexFromStep(TempIntroVal - 1);
            if (prevChoiceIndex) {
                highlightIntroChoiceTile(prevChoiceIndex, false);
            }
        }

        if (targetChoiceIndex && targetChoice && targetChoice.alpha >= 0.9) {
            highlightIntroChoiceTile(targetChoiceIndex, true);
        }

        var pendingClue = introClueArr[TempIntroVal];
        if (pendingClue && (!pendingClue.text || pendingClue.text === "")) {
            highlightIntroClueTarget(TempIntroVal);
        }

         container.parent.addChild(introArrow);
 
         introArrow.visible = true;
         introfingure.visible = false;
         introArrow.x = ArrowXArr[TempIntroVal];
         introArrow.y = ArrowYArr[TempIntroVal];
         highlightTweenArr[0] = new createjs.MovieClip()
         container.parent.addChild(highlightTweenArr[0])
         highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: ArrowYArr[TempIntroVal] + 10 }, 250).to({ y: ArrowYArr[TempIntroVal] }, 250).to({ y: ArrowYArr[TempIntroVal] + 10 }, 250)
             .to({ y: ArrowYArr[TempIntroVal] }, 250).wait(400).call(this.onComplete1)
 
     }
 
 }


function setFingureTween() {
    if (stopValue == 0) {
        console.log("setFingureTween  == stopValue")
        removeGameIntro()

    }
    else {

        container.parent.removeChild(introArrow);
        introArrow.visible = false;
        container.parent.addChild(introfingure);

        introfingure.visible = true;
        introfingure.x = FingXArr[TempIntroVal];
        introfingure.y = FingYArr[TempIntroVal];
        var activeChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        if (activeChoiceIndex) {
            var activeChoice = introGlobalScope && introGlobalScope["introChoice" + activeChoiceIndex];
            if (activeChoice && activeChoice.alpha >= 0.9) {
                highlightIntroChoiceTile(activeChoiceIndex, true);
            }
        }
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])
        if (TempIntroVal == 4) {
            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300)
                .to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300).wait(200).call(this.onComplete2)
        }
        else {
            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300)
                .to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300).wait(200).call(handleComplete4_1)
        }


    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);

    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        container.parent.removeChild(highlightTweenArr[0]);
    }

    container.parent.removeChild(introArrow);
    if (stopValue == 0) {
        console.log("onComplete1  == stopValue")
        removeGameIntro()

    } else {

        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);

    var clueLetter = introClueArr[TempIntroVal];
    if (clueLetter) {
        clueLetter.visible = true;
        updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
        styleIntroClueSlot(TempIntroVal, true);
    }

    var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
    if (usedChoiceIndex) {
        highlightIntroChoiceTile(usedChoiceIndex, false);
        setIntroChoiceUsed(usedChoiceIndex);
    }

    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        container.parent.removeChild(highlightTweenArr[1]);
    }

    container.parent.removeChild(introfingure);
    introfingure.visible = false;

    if (stopValue == 0) {
        console.log("onComplete2  == stopValue")
        removeGameIntro()

    }
    else {
        setTimeout(setCallDelay, 500)
    }


}

function setCallDelay() {
    clearInterval(removeIntraval)
    removeIntraval = 0
    setIntroCnt++
    console.log("check cnt = " + setIntroCnt)
    removeGameIntro()
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {

        commongameintro()
        if (setIntroCnt > 0) {
            isVisibleStartBtn()
        }
    }

}
function removeGameIntro() {
    createjs.Tween.removeAllTweens();
 
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(questionCardContainer_htp)
    questionCardContainer_htp.visible = false
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    container.parent.removeChild(introChoice1)
    introChoice1.visible = false
    container.parent.removeChild(introChoice2)
    introChoice2.visible = false
    container.parent.removeChild(introChoice3)
    introChoice3.visible = false
    container.parent.removeChild(introChoice4)
    introChoice4.visible = false
    for (i = 1; i < introChoiceBgArr.length; i++) {
        if (introChoiceBgArr[i]) {
            container.parent.removeChild(introChoiceBgArr[i]);
            introChoiceBgArr[i] = null;
        }
        if (introChoiceGlowArr[i]) {
            container.parent.removeChild(introChoiceGlowArr[i]);
            introChoiceGlowArr[i] = null;
        }
    }
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = false;
    }
    container.parent.removeChild(introClu1)
    introClu1.visible = false
    container.parent.removeChild(introClu2)
    introClu2.visible = false
    container.parent.removeChild(introClu3)
    introClu3.visible = false
    container.parent.removeChild(introClu4)
    introClu4.visible = false
    for (i = 1; i < introClueBgArr.length; i++) {
        if (introClueBgArr[i]) {
            container.parent.removeChild(introClueBgArr[i]);
            introClueBgArr[i] = null;
        }
    }
    introChoiceBgArr = [null];
    introChoiceGlowArr = [null];
    introClueBgArr = [null];

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }
    container.parent.removeChild(introfingure);
    introfingure.visible = false;
    introClueArr = [];
    cluegotoArr = [];
}