var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 640; introQuestxtY = 150;
var introQues1X = 640, introQues1Y = 294
var introChoice1X = 376, introChoice1Y = 640;
var introChoice2X = 552, introChoice2Y = 640;
var introChoice3X = 728, introChoice3Y = 640;
var introChoice4X = 904, introChoice4Y = 640;
var introClu1X = 460, introClu1Y = 490;
var introClu2X = 580, introClu2Y = 490;
var introClu3X = 700, introClu3Y = 490;
var introClu4X = 820, introClu4Y = 490;
var introChoiceDefaultX = [
    null,
    introChoice1X,
    introChoice2X,
    introChoice3X,
    introChoice4X
];
var introClueDefaultX = [
    null,
    introClu1X,
    introClu2X,
    introClu3X,
    introClu4X
];
var introArrowX = introChoice2X, introArrowY = introClu1Y - 46;
var introfingureX = introChoice2X, introfingureY = introChoice2Y + 32;
var ArrowXArr = [null], FingXArr = [null];
var ArrowYArr = [null], FingYArr = [null];
var introClueArr = []
var introClueBgArr = []
var introChoiceBgArr = []
var introChoiceGlowArr = []
var introChoiceRevealOrder = [null, 2, 3, 1, 4]
var introGlobalScope = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this)

function getIntroHelper(name) {
    if (introGlobalScope && typeof introGlobalScope[name] === "function") {
        return introGlobalScope[name];
    }
    return null;
}

var computeIntroRow = getIntroHelper("SAUI_computeCenteredRow");
var highlightChoiceHelper = getIntroHelper("SAUI_highlightChoiceTile");
var markChoiceUsedHelper = getIntroHelper("SAUI_markChoiceTileUsed");
var styleClueSlotHelper = getIntroHelper("SAUI_styleClueSlot");
var highlightClueSlotHelper = getIntroHelper("SAUI_highlightClueSlot");

var configureIntroArrowSprite = getIntroHelper("SAUI_configureIntroArrowSprite") || function (sprite) {
    if (!sprite) {
        return;
    }
    sprite.visible = false;
    sprite.alpha = 0;
};

var configureIntroFingerSprite = getIntroHelper("SAUI_configureIntroFingerSprite") || function (sprite) {
    if (!sprite) {
        return;
    }
    sprite.visible = false;
    sprite.alpha = 0;
};

var buildIntroGlowShape = getIntroHelper("SAUI_buildIntroGlowShape") || function () {
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
};

function buildIntroChoiceLetter() {
    var builder = getIntroHelper("SA_buildChoiceLetterDisplay") || getIntroHelper("SAUI_buildChoiceLetterDisplay");
    if (typeof builder === "function") {
        return builder({ interactive: false, baseScale: 0.8 });
    }
    var txt = new createjs.Text("", "700 64px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 0.8;
    return txt;
}

function updateIntroChoiceLetter(display, letter) {
    var updater = getIntroHelper("SA_updateChoiceLetterDisplay") || getIntroHelper("SAUI_updateChoiceLetterDisplay");
    if (typeof updater === "function") {
        updater(display, letter);
        return;
    }
    if (!display) {
        return;
    }
    var value = letter ? String(letter).toUpperCase() : "";
    display.text = value;
    display.alpha = value ? 1 : 0;
}

function buildIntroClueLetter() {
    var builder = getIntroHelper("SA_buildClueLetterDisplay") || getIntroHelper("SAUI_buildClueLetterDisplay");
    if (typeof builder === "function") {
        return builder({ baseScale: 1, interactive: false });
    }
    var txt = new createjs.Text("", "700 60px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 1;
    return txt;
}

function updateIntroClueLetter(display, letter) {
    var updater = getIntroHelper("SA_updateClueLetterDisplay") || getIntroHelper("SAUI_updateClueLetterDisplay");
    if (typeof updater === "function") {
        updater(display, letter);
        return;
    }
    if (!display) {
        return;
    }
    var value = letter ? String(letter).toUpperCase() : "";
    display.text = value;
    display.alpha = value ? 1 : 0;
}

function introChoiceIndexFromStep(step) {
    if (!step) {
        return step;
    }
    return introChoiceRevealOrder && introChoiceRevealOrder[step] ? introChoiceRevealOrder[step] : step;
}

function highlightIntroChoiceTile(index, isActive) {
    if (!index) {
        return;
    }

    var tile = introGlobalScope && introGlobalScope["introChoice" + index];
    var bg = introChoiceBgArr[index];
    var glow = introChoiceGlowArr[index];

    if (typeof highlightChoiceHelper === "function") {
        highlightChoiceHelper({
            tile: tile,
            background: bg,
            glow: glow,
            active: isActive
        });
        return;
    }

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

    if (typeof markChoiceUsedHelper === "function") {
        markChoiceUsedHelper({
            tile: tile,
            background: bg,
            glow: glow
        });
        return;
    }

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

    if (typeof styleClueSlotHelper === "function") {
        styleClueSlotHelper({
            background: bg,
            filled: isFilled
        });
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

    if (typeof highlightClueSlotHelper === "function") {
        highlightClueSlotHelper({ background: bg });
        return;
    }

    var baseScale = bg.__baseScale || 1;
    drawClueSlotBackground(bg, CLUE_SLOT_HIGHLIGHT_COLORS);
    createjs.Tween.get(bg, { override: true })
        .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04, alpha: 1 }, 220, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 200, createjs.Ease.quadOut);
}


function commongameintro() {
	
    introClueArr = [];
    introClueBgArr = [null];
    introChoiceBgArr = [null];
    introChoiceGlowArr = [null];
    ArrowXArr = [null];
    ArrowYArr = [null];
    FingXArr = [null];
    FingYArr = [null];

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
    configureIntroArrowSprite(introArrow);
    configureIntroFingerSprite(introfingure);

    container.parent.addChild(introTitle);
    introTitle.visible = true;

                call_UI_introQuestionCardContainer(container, "THIS");

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;
    introQuestxt.x = introQuestxtX;
    introQuestxt.y = introQuestxtY;

    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    var choicePointerTargets = {};
    var choiceConfigs = [
        { index: 1, letter: "T" },
        { index: 2, letter: "H" },
        { index: 3, letter: "I" },
        { index: 4, letter: "S" }
    ];

    var resolvedChoiceX = introChoiceDefaultX.slice();
    if (typeof computeIntroRow === "function") {
        var choiceLayout = computeIntroRow(choiceConfigs.length, {
            centerX: introQuestxtX,
            baseSpacing: 184,
            maxSpan: 820
        });

        if (choiceLayout && choiceLayout.positions && choiceLayout.positions.length === choiceConfigs.length) {
            resolvedChoiceX = [null];
            for (var p = 0; p < choiceLayout.positions.length; p++) {
                resolvedChoiceX.push(choiceLayout.positions[p]);
            }
        }
    }

    introChoice1X = resolvedChoiceX[1] != null ? resolvedChoiceX[1] : introChoiceDefaultX[1];
    introChoice2X = resolvedChoiceX[2] != null ? resolvedChoiceX[2] : introChoiceDefaultX[2];
    introChoice3X = resolvedChoiceX[3] != null ? resolvedChoiceX[3] : introChoiceDefaultX[3];
    introChoice4X = resolvedChoiceX[4] != null ? resolvedChoiceX[4] : introChoiceDefaultX[4];
    introArrowX = introChoice2X;
    introArrowY = introClu1Y - 46;
    introfingureX = introChoice2X;
    introfingureY = introChoice2Y + 32;

    for (var c = 0; c < choiceConfigs.length; c++) {
        var cfg = choiceConfigs[c];
        cfg.x = resolvedChoiceX[cfg.index] != null ? resolvedChoiceX[cfg.index] : introChoiceDefaultX[cfg.index];
        cfg.y = introChoice1Y;
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
        var baseLetterScale = 0.8;
        bg.__baseScale = baseLetterScale * 1.08;
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
        letter.scaleX = letter.scaleY = baseLetterScale;
        letter.__baseScale = baseLetterScale;
        letter.__baseX = cfg.x;
        letter.__baseY = cfg.y;
        letter.visible = false;
        updateIntroChoiceLetter(letter, cfg.letter);
        container.parent.addChild(letter);

        var tileScale = letter.__baseScale || baseLetterScale;
        glow.scaleX = glow.scaleY = tileScale * 1.28;

        var bgScale = bg.__baseScale || tileScale * 1.08;
        var tileHeight = 148 * bgScale;
        var tileTop = cfg.y - tileHeight / 2;
        var tipTargetY = tileTop + tileHeight * 0.28;
        choicePointerTargets[cfg.index] = {
            x: cfg.x,
            tipY: tipTargetY,
            tileTop: tileTop,
            tileHeight: tileHeight
        };
    }

    var clueConfigs = [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 }
    ];

    var resolvedClueX = introClueDefaultX.slice();
    if (typeof computeIntroRow === "function") {
        var clueLayout = computeIntroRow(clueConfigs.length, {
            centerX: introQuestxtX,
            baseSpacing: 132,
            maxSpan: 640
        });

        if (clueLayout && clueLayout.positions && clueLayout.positions.length === clueConfigs.length) {
            resolvedClueX = [null];
            for (var q = 0; q < clueLayout.positions.length; q++) {
                resolvedClueX.push(clueLayout.positions[q]);
            }
        }
    }

    introClu1X = resolvedClueX[1] != null ? resolvedClueX[1] : introClueDefaultX[1];
    introClu2X = resolvedClueX[2] != null ? resolvedClueX[2] : introClueDefaultX[2];
    introClu3X = resolvedClueX[3] != null ? resolvedClueX[3] : introClueDefaultX[3];
    introClu4X = resolvedClueX[4] != null ? resolvedClueX[4] : introClueDefaultX[4];
    introArrowY = introClu1Y - 46;

    introClueArr.push("");
    for (var k = 0; k < clueConfigs.length; k++) {
        var clueCfg = clueConfigs[k];
        clueCfg.x = resolvedClueX[clueCfg.index] != null ? resolvedClueX[clueCfg.index] : introClueDefaultX[clueCfg.index];
        clueCfg.y = introClu1Y;
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

        var clueScale = clueBg.__baseScale || 1;
        var slotHeight = 112 * clueScale;
        var clueTop = clueCfg.y - slotHeight / 2;
        var tipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
        ArrowXArr[clueCfg.index] = clueCfg.x;
        ArrowYArr[clueCfg.index] = clueTop - tipGap;
    }

    for (var step = 1; step < introChoiceRevealOrder.length; step++) {
        var choiceIndex = introChoiceIndexFromStep(step);
        var pointer = choicePointerTargets[choiceIndex];

        if (pointer) {
            FingXArr[step] = pointer.x;
            FingYArr[step] = pointer.tipY;
            ArrowXArr[step] = pointer.x;
            var arrowTipGap = introArrow && typeof introArrow.__tipGap === "number" ? introArrow.__tipGap : 24;
            var pointerTileTop = typeof pointer.tileTop === "number" ? pointer.tileTop : pointer.tipY - 32;
            var effectiveGap = Math.max(arrowTipGap - 12, arrowTipGap * 0.6);
            ArrowYArr[step] = pointerTileTop - effectiveGap;
        }
    }

    cluegotoArr = ["", "H", "I", "T", "S"];

    introArrow.visible = false;
    introArrow.alpha = 0;
    introfingure.visible = false;
    introfingure.alpha = 0;

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
        container.parent.setChildIndex(introArrow, container.parent.numChildren - 1);

        introArrow.visible = true;
        introArrow.alpha = 0;
        introfingure.visible = false;
        introfingure.alpha = 0;

        var arrowTargetX = typeof ArrowXArr[TempIntroVal] === "number" ? ArrowXArr[TempIntroVal] : introClu1X;
        var defaultTipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
        var fallbackTipY = introClu1Y - (56 + defaultTipGap);
        var arrowTipY = typeof ArrowYArr[TempIntroVal] === "number" ? ArrowYArr[TempIntroVal] : fallbackTipY;
        var arrowBounce = introArrow && introArrow.__bounceOffset ? introArrow.__bounceOffset : 18;
        var arrowUpY = arrowTipY - arrowBounce;

        introArrow.x = arrowTargetX;
        introArrow.y = arrowTipY;

        createjs.Tween.removeTweens(introArrow);
        createjs.Tween.get(introArrow)
            .to({ alpha: 1 }, 180, createjs.Ease.quadOut);

        highlightTweenArr[0] = createjs.Tween.get(introArrow)
            .to({ y: arrowUpY }, 250)
            .to({ y: arrowTipY }, 250)
            .to({ y: arrowUpY }, 250)
            .to({ y: arrowTipY }, 250)
            .wait(400)
            .call(this.onComplete1)

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
        introArrow.alpha = 0;
        container.parent.addChild(introfingure);
        container.parent.setChildIndex(introfingure, container.parent.numChildren - 1);

        var pointerOffsetX = introfingure.__pointerOffsetX || 0;
        var pointerOffsetY = introfingure.__pointerOffsetY || 0;
        var fingerTargetX = typeof FingXArr[TempIntroVal] === "number" ? FingXArr[TempIntroVal] : introfingureX;
        var fingerTargetY = typeof FingYArr[TempIntroVal] === "number" ? FingYArr[TempIntroVal] : introfingureY;
        var fingerBaseX = fingerTargetX - pointerOffsetX;
        var fingerBaseY = fingerTargetY - pointerOffsetY;
        var pressDistance = typeof introfingure.__pressDistance === "number" ? introfingure.__pressDistance : 18;
        var fingerPressX = fingerBaseX - pressDistance;

        introfingure.visible = true;
        introfingure.alpha = 0;
        introfingure.x = fingerBaseX;
        introfingure.y = fingerBaseY;

        createjs.Tween.removeTweens(introfingure);
        createjs.Tween.get(introfingure)
            .to({ alpha: 1 }, 180, createjs.Ease.quadOut);
        var activeChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        if (activeChoiceIndex) {
            var activeChoice = introGlobalScope && introGlobalScope["introChoice" + activeChoiceIndex];
            if (activeChoice && activeChoice.alpha >= 0.9) {
                highlightIntroChoiceTile(activeChoiceIndex, true);
            }
        }
        if (TempIntroVal == 4) {
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .wait(200)
                .call(this.onComplete2)
        }
        else {
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .wait(200)
                .call(handleComplete4_1)
        }


    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);

    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        if (typeof highlightTweenArr[0].setPaused === "function") {
            highlightTweenArr[0].setPaused(true);
        }
        highlightTweenArr[0] = null;
    }

    container.parent.removeChild(introArrow);
    introArrow.visible = false;
    introArrow.alpha = 0;
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
        if (typeof highlightTweenArr[1].setPaused === "function") {
            highlightTweenArr[1].setPaused(true);
        }
        highlightTweenArr[1] = null;
    }

    container.parent.removeChild(introfingure);
    introfingure.visible = false;
    introfingure.alpha = 0;

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
    introArrow.alpha = 0
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    introfingure.alpha = 0
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
        if (typeof highlightTweenArr[0].setPaused === "function") {
            highlightTweenArr[0].setPaused(true);
        }
        highlightTweenArr[0] = null;
    }
    if (highlightTweenArr[1]) {
        if (typeof highlightTweenArr[1].setPaused === "function") {
            highlightTweenArr[1].setPaused(true);
        }
        highlightTweenArr[1] = null;
    }
    container.parent.removeChild(introfingure);
    introfingure.visible = false;
    introfingure.alpha = 0;
    introClueArr = [];
    cluegotoArr = ["", "H", "I", "T", "S"];
}
