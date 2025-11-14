var introQues1, introQuestxt,introtextArr1, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 640; introQuestxtY = 132;
var introQues1X = 640, introQues1Y = 316

var introAlphaArr = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

function frameIndexToLetter(frameIndex) {
    if (frameIndex === 26) {
        return "_";
    }
    return introAlphaArr[frameIndex] || "";
}

function buildIntroChoiceLetter() {
    var builder = getIntroHelper("SA_buildChoiceLetterDisplay") || getIntroHelper("SAUI_buildChoiceLetterDisplay");
    if (typeof builder === "function") {
        var display = builder({ interactive: false, baseScale: 0.8 });
        if (display) {
            display.visible = false;
            return display;
        }
    }
    var txt = new createjs.Text("", "800 70px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.visible = false;
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 0.8;
    return txt;
}

function updateIntroChoiceLetter(target, frameIndex) {
    var updater = getIntroHelper("SA_updateChoiceLetterDisplay") || getIntroHelper("SAUI_updateChoiceLetterDisplay");
    if (typeof updater === "function") {
        updater(target, frameIndex != null ? frameIndexToLetter(frameIndex) : "");
        return;
    }
    if (!target) {
        return;
    }
    var value = frameIndex != null ? frameIndexToLetter(frameIndex) : "";
    target.text = value;
    target.alpha = value ? 1 : 0.15;
}

function buildIntroClueLetter() {
    var builder = getIntroHelper("SA_buildClueLetterDisplay") || getIntroHelper("SAUI_buildClueLetterDisplay");
    if (typeof builder === "function") {
        var display = builder({ baseScale: 1, interactive: false });
        if (display) {
            display.visible = false;
            return display;
        }
    }
    var txt = new createjs.Text("", "800 64px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.32)", 0, 4, 12);
    txt.visible = false;
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 1;
    return txt;
}

function updateIntroClueLetter(target, frameIndex) {
    var updater = getIntroHelper("SA_updateClueLetterDisplay") || getIntroHelper("SAUI_updateClueLetterDisplay");
    var letter = frameIndex != null ? frameIndexToLetter(frameIndex) : "";
    if (typeof updater === "function") {
        updater(target, letter);
        return;
    }
    if (!target) {
        return;
    }
    target.text = letter === "_" ? "_" : letter;
    target.alpha = letter ? 1 : 0.2;
}

var introChoice1X = 280, introChoice1Y = 590;
var introChoice2X = 500, introChoice2Y = 590;
var introChoice3X = 720, introChoice3Y = 590;
var introChoice4X = 940, introChoice4Y = 590;

var introChoicePosX = [, introChoice1X, introChoice2X, introChoice3X, introChoice4X];
var introChoicePosY = [, introChoice1Y, introChoice2Y, introChoice3Y, introChoice4Y];

var introClu1X = 380, introClu1Y = 220;
var introClu2X = 537, introClu2Y = 220;
var introClu3X = 691, introClu3Y = 220;
var introClu4X = 846, introClu4Y = 220;

var introChoiceDefaultX = [, introChoice1X, introChoice2X, introChoice3X, introChoice4X];
var introClueDefaultX = [, introClu1X, introClu2X, introClu3X, introClu4X];

var introCluePosX = [, introClu1X, introClu2X, introClu3X, introClu4X];
var introCluePosY = [, introClu1Y, introClu2Y, introClu3Y, introClu4Y];
var introArrowX = 944, introArrowY = 470;
var introfingureX = 970, introfingureY = 573;

var ArrowXArr = [, 500, 940, 720, 280], FingXArr = [, 505, 945, 725, 285]
var ArrowYArr = [, 470, 470, 470, 470], FingYArr = [, 590, 590, 590, 590]
var introClueArr = []
var introClueTxtArr = ["", 17, 0, 26, 13]
var introClueBgArr = []
var introChoiceBgArr = []
var introChoiceGlowArr = []
var introQuestionCard;

var introGlobalScope = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);

function getIntroQuestionPromptTemplate() {
    if (!introGlobalScope) {
        return null;
    }
    if (introGlobalScope.QusTxtString) {
        return introGlobalScope.QusTxtString;
    }
    if (introGlobalScope.SAUIX && introGlobalScope.SAUIX.QusTxtString) {
        return introGlobalScope.SAUIX.QusTxtString;
    }
    return null;
}

function getIntroHelper(name) {
    if (!name) {
        return null;
    }
    if (introGlobalScope && typeof introGlobalScope[name] === "function") {
        return introGlobalScope[name];
    }
    if (introGlobalScope && introGlobalScope.SAUIX && typeof introGlobalScope.SAUIX[name] === "function") {
        return introGlobalScope.SAUIX[name];
    }
    return null;
}

var computeIntroRow = getIntroHelper("SAUI_computeCenteredRow");
var highlightChoiceHelper = getIntroHelper("SAUI_highlightChoiceTile");
var highlightClueSlotHelper = getIntroHelper("SAUI_highlightClueSlot");
var styleClueSlotHelper = getIntroHelper("SAUI_styleClueSlot");

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

var buildIntroGlowShape = getIntroHelper("SAUI_buildIntroGlowShape");

function getIntroPromptBasePosition() {
    var baseX = introQuestxtX;
    var baseY = introQuestxtY;
    if (typeof QusTxtString !== "undefined" && QusTxtString) {
        if (typeof QusTxtString.x === "number") {
            baseX = QusTxtString.x;
        }
        if (typeof QusTxtString.y === "number") {
            baseY = QusTxtString.y;
        }
    }
    return { x: baseX, y: baseY };
}

function buildIntroPromptLabel() {
    var template = getIntroQuestionPromptTemplate();
    var prompt = null;
    if (template && typeof template.clone === "function") {
        try {
            prompt = template.clone();
        } catch (err) {
            prompt = null;
        }
    }
    if (!prompt) {
        prompt = new createjs.Text(
            "Choose the missing letter to complete the word.",
            template && template.font ? template.font : "700 28px 'Baloo 2'",
            template && template.color ? template.color : "#EAF2FF"
        );
        prompt.textAlign = template && template.textAlign ? template.textAlign : "center";
        prompt.textBaseline = template && template.textBaseline ? template.textBaseline : "middle";
        prompt.lineWidth = template && template.lineWidth ? template.lineWidth : 1000;
        prompt.lineHeight = template && template.lineHeight ? template.lineHeight : 40;
        prompt.shadow = template && template.shadow ? template.shadow.clone ? template.shadow.clone() : template.shadow : new createjs.Shadow("rgba(6,16,38,0.36)", 0, 12, 26);
    }

    var promptPos = getIntroPromptBasePosition();
    prompt.x = promptPos.x;
    prompt.y = promptPos.y;

    var promptParent = container && container.parent ? container.parent : null;
    if (promptParent && !prompt.__labelBG && typeof SAUI_attachQuestionLabelBG === "function") {
        prompt.__labelBG = SAUI_attachQuestionLabelBG(prompt, promptParent, {
            padX: 20,
            padY: 12,
            fill: "rgba(0,0,0,0.3)",
            stroke: "rgba(255,255,255,0.14)",
            strokeW: 2,
            maxRadius: 22
        });
    }

    if (prompt.__labelBG && typeof prompt.__labelBG.update === "function") {
        prompt.__labelBG.update();
    }

    return prompt;
}

function buildIntroChoiceBackground() {
    var shape = new createjs.Shape();
    drawChoiceTileBackground(shape);
    shape.alpha = 0;
    shape.visible = false;
    shape.mouseEnabled = false;
    shape.mouseChildren = false;
    return shape;
}

function buildIntroChoiceGlow() {
    var glow;
    if (typeof buildIntroGlowShape === "function") {
        glow = buildIntroGlowShape();
    }
    if (!glow) {
        glow = new createjs.Shape();
        drawChoiceSpeechWave(glow);
    }
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    return glow;
}

function buildIntroClueBackground() {
    var shape = new createjs.Shape();
    if (typeof styleClueSlotHelper === "function") {
        styleClueSlotHelper({ background: shape, baseScale: 1 });
    } else {
        drawClueSlotBackground(shape);
    }
    shape.alpha = 0;
    shape.visible = false;
    shape.mouseEnabled = false;
    shape.mouseChildren = false;
    return shape;
}

function commongameintro() {
    introClueArr = []
    introClueBgArr = []
    introChoiceBgArr = []
    introChoiceGlowArr = []
    if (typeof Title !== "undefined" && Title && typeof Title.clone === "function") {
        introTitle = Title.clone();
    } else {
        introTitle = null;
    }
    introClu1 = buildIntroClueLetter()
    introClu2 = buildIntroClueLetter()
    introClu3 = buildIntroClueLetter()
    introClu4 = buildIntroClueLetter()

    introChoice1 = buildIntroChoiceLetter()
    introChoice2 = buildIntroChoiceLetter()
    introChoice3 = buildIntroChoiceLetter()
    introChoice4 = buildIntroChoiceLetter()

    introArrow = typeof arrow1 !== "undefined" && arrow1 && typeof arrow1.clone === "function" ? arrow1.clone() : null;
    introfingure = typeof fingure !== "undefined" && fingure && typeof fingure.clone === "function" ? fingure.clone() : null;
    configureIntroArrowSprite(introArrow);
    configureIntroFingerSprite(introfingure);

var configureIntroArrowSprite = getIntroHelper("SAUI_configureIntroArrowSprite") || function (sprite) {
    if (!sprite) {
        return;
    }
    sprite.visible = false;
    sprite.alpha = 0;
};

    if (introTitle) {
        container.parent.addChild(introTitle)
        introTitle.visible = true;
    }

function buildIntroChoiceGlow() {
    var glow = new createjs.Shape();
    drawChoiceSpeechWave(glow);
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    return glow;
}

function buildIntroClueBackground() {
    var shape = new createjs.Shape();
    drawClueSlotBackground(shape);
    shape.alpha = 0;
    shape.visible = false;
    shape.mouseEnabled = false;
    shape.mouseChildren = false;
    return shape;
}

    var introSampleFrames = [17, 0, 26, 13];
    var introSampleText = "";
    for (var f = 0; f < introSampleFrames.length; f++) {
        introSampleText += frameIndexToLetter(introSampleFrames[f]) + (f < introSampleFrames.length - 1 ? "  " : "");
    }
    call_UI_introQuestionCardContainer(container, introSampleText);
    introQuestionCard = typeof questionCardContainer_htp !== "undefined" ? questionCardContainer_htp : null;
    if (introQuestionCard) {
        introQuestionCard.visible = false;
        introQuestionCard.alpha = 0;
    }
    if (typeof in_introQues1 !== "undefined") {
        introQues1 = in_introQues1;
    }
    if (introQues1) {
        introQues1.visible = false;
    }

    introQuestxt = buildIntroPromptLabel();
    if (container && container.parent) {
        container.parent.addChild(introQuestxt);
    }
    introQuestxt.visible = true;

    var resolvedChoiceX = introChoiceDefaultX.slice();
    if (typeof computeIntroRow === "function") {
        var choiceLayout = computeIntroRow(4, {
            centerX: introQuestxtX,
            baseSpacing: 184,
            maxSpan: 820
        });
        if (choiceLayout && choiceLayout.positions && choiceLayout.positions.length === 4) {
            resolvedChoiceX = [null].concat(choiceLayout.positions);
        }
    }

    for (var p = 1; p <= 4; p++) {
        introChoicePosX[p] = resolvedChoiceX[p] != null ? resolvedChoiceX[p] : introChoiceDefaultX[p];
    }

    var resolvedClueX = introClueDefaultX.slice();
    if (typeof computeIntroRow === "function") {
        var clueLayout = computeIntroRow(4, {
            centerX: introQues1X,
            baseSpacing: 150,
            maxSpan: 600
        });
        if (clueLayout && clueLayout.positions && clueLayout.positions.length === 4) {
            resolvedClueX = [null].concat(clueLayout.positions);
        }
    }

    for (var q = 1; q <= 4; q++) {
        introCluePosX[q] = resolvedClueX[q] != null ? resolvedClueX[q] : introClueDefaultX[q];
    }

    introArrowX = introChoicePosX[2];
    introArrowY = introChoicePosY[2] - 120;
    introfingureX = introChoicePosX[2];
    introfingureY = introChoicePosY[2] + 24;

    for (var c = 1; c < 5; c++) {
        if (!introChoiceGlowArr[c]) {
            introChoiceGlowArr[c] = buildIntroChoiceGlow();
            container.parent.addChild(introChoiceGlowArr[c]);
        }
        introChoiceGlowArr[c].x = introChoicePosX[c];
        introChoiceGlowArr[c].y = introChoicePosY[c];
        introChoiceGlowArr[c].alpha = 0;
        introChoiceGlowArr[c].visible = false;

        if (!introChoiceBgArr[c]) {
            introChoiceBgArr[c] = buildIntroChoiceBackground();
            container.parent.addChild(introChoiceBgArr[c]);
        }
        introChoiceBgArr[c].x = introChoicePosX[c];
        introChoiceBgArr[c].y = introChoicePosY[c];
        introChoiceBgArr[c].alpha = 0;
        introChoiceBgArr[c].visible = false;

        var choiceLabel = this["introChoice" + c];
        container.parent.addChild(choiceLabel);
        choiceLabel.x = introChoicePosX[c];
        choiceLabel.y = introChoicePosY[c];
        choiceLabel.visible = false;
        var choiceBaseScale = choiceLabel && choiceLabel.__baseScale ? choiceLabel.__baseScale : 0.8;
        choiceLabel.scaleX = choiceLabel.scaleY = choiceBaseScale;
        if (introChoiceGlowArr[c]) {
            introChoiceGlowArr[c].scaleX = introChoiceGlowArr[c].scaleY = choiceBaseScale * 1.32;
        }
        if (introChoiceBgArr[c]) {
            introChoiceBgArr[c].scaleX = introChoiceBgArr[c].scaleY = choiceBaseScale * 1.16;
            drawChoiceTileBackground(introChoiceBgArr[c]);
        }
    }

    updateIntroChoiceLetter(introChoice1, 13);
    updateIntroChoiceLetter(introChoice2, 17);
    updateIntroChoiceLetter(introChoice3, 0);
    updateIntroChoiceLetter(introChoice4, 8);

    cluegotoArr = [, 26, 0, 17, 13]
    for (var k = 1; k < 5; k++) {
        if (!introClueBgArr[k]) {
            introClueBgArr[k] = buildIntroClueBackground();
            container.parent.addChild(introClueBgArr[k]);
        }
        introClueBgArr[k].x = introCluePosX[k];
        introClueBgArr[k].y = introCluePosY[k];
        introClueBgArr[k].alpha = 0;
        introClueBgArr[k].visible = false;

        var clueLabel = this["introClu" + k];
        container.parent.addChild(clueLabel);
        clueLabel.x = introCluePosX[k];
        clueLabel.y = introCluePosY[k];
        var clueBaseScale = clueLabel && clueLabel.__baseScale ? clueLabel.__baseScale : 1;
        clueLabel.scaleX = clueLabel.scaleY = clueBaseScale;
        clueLabel.visible = false;
        updateIntroClueLetter(clueLabel, introClueTxtArr[k]);
        if (introClueBgArr[k]) {
            introClueBgArr[k].scaleX = introClueBgArr[k].scaleY = clueBaseScale * 1.08;
            if (typeof styleClueSlotHelper === "function") {
                styleClueSlotHelper({ background: introClueBgArr[k], baseScale: clueBaseScale * 1.08 });
            } else {
                drawClueSlotBackground(introClueBgArr[k]);
            }
        }
    }
    introClueArr.push("", introClu1, introClu2, introClu3, introClu4)

    introtextArr1 = new createjs.Text("I", "135px Veggieburger-Bold", "white")
    container.parent.addChild(introtextArr1);
    introtextArr1.textAlign = "center";
    introtextArr1.textBaseline = "middle";
    introtextArr1.x = 960
    introtextArr1.y = 620
    introtextArr1.visible = false;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()


}

function quesTween() {
     var val1 = 500
    for (i = 1; i < 5; i++) {
        if (introClueBgArr[i]) {
            introClueBgArr[i].visible = true;
            introClueBgArr[i].alpha = 0;
            introClueBgArr[i].scaleX = introClueBgArr[i].scaleY = .95;
            createjs.Tween.get(introClueBgArr[i]).wait(val1)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, createjs.Ease.quadOut);
        }

        introClueArr[i].visible = true;
        introClueArr[i].alpha = 0;
        introClueArr[i].scaleX = introClueArr[i].scaleY = .9;
        updateIntroClueLetter(introClueArr[i], introClueTxtArr[i])
        createjs.Tween.get(introClueArr[i]).wait(val1)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, createjs.Ease.quadOut);
        val1=val1+150
    }

    if (introQuestionCard) {
        introQuestionCard.visible = true;
        introQuestionCard.alpha = 0;
        introQuestionCard.scaleX = introQuestionCard.scaleY = 0.82;
        createjs.Tween.get(introQuestionCard, { override: true })
            .wait(900)
            .to({ alpha: 1, scaleX: 0.9, scaleY: 0.9 }, 400, createjs.Ease.quadOut)
            .call(handleComplete2_1);
    } else if (introQues1) {
        introQues1.visible = true;
        introQues1.alpha = 0;
        createjs.Tween.get(introQues1)
            .wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);
    } else {
        createjs.Tween.get({}).wait(1000).call(handleComplete2_1);
    }
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    choiceTween();
}
function choiceTween() {
    var val = 700
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = true;
        updateIntroClueLetter(introClueArr[i], introClueTxtArr[i])
        if (introChoiceGlowArr[i]) {
            introChoiceGlowArr[i].visible = true;
            introChoiceGlowArr[i].alpha = 0;
            introChoiceGlowArr[i].scaleX = introChoiceGlowArr[i].scaleY = .78;
            createjs.Tween.get(introChoiceGlowArr[i]).wait(val)
                .to({ alpha: 0.45, scaleX: .85, scaleY: .85 }, 280, createjs.Ease.quadOut);
        }
        if (introChoiceBgArr[i]) {
            introChoiceBgArr[i].visible = true;
            introChoiceBgArr[i].alpha = 0;
            introChoiceBgArr[i].scaleX = introChoiceBgArr[i].scaleY = .72;
            createjs.Tween.get(introChoiceBgArr[i]).wait(val)
                .to({ alpha: 1, scaleX: .82, scaleY: .82 }, 320, createjs.Ease.quadOut);
        }
        this["introChoice" + i].y = introChoicePosY[i] + 30;
        this["introChoice" + i].x = introChoicePosX[i];
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: introChoicePosY[i], scaleX: .82, scaleY: .82, alpha: 1 }, 320, createjs.Ease.quadOut).call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: introChoicePosY[i], scaleX: .82, scaleY: .82, alpha: 1 }, 320, createjs.Ease.quadOut);
        }
        val = val + 150
    }

    TempIntroVal = 0;
}

function handleComplete4_1() {

    createjs.Tween.removeAllTweens();
    setArrowTween()
}
function setArrowTween() {
    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        if (introArrow) {
            container.parent.addChild(introArrow);
            introArrow.visible = true;
            introArrow.x = introArrowX;
            introArrow.y = introArrowY;

            highlightTweenArr[0] = new createjs.MovieClip()
            container.parent.addChild(highlightTweenArr[0])
            highlightTweenArr[0] = createjs.Tween.get(introArrow)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .wait(400)
            .call(this.onComplete1)
        } else {
            highlightTweenArr[0] = null;
            createjs.Tween.get({}).wait(400).call(this.onComplete1);
        }

    }

}

function setFingureTween() {
    if (stopValue == 0) {
        console.log("setFingureTween  == stopValue")
        removeGameIntro()

    }
    else {

        if (introArrow && introArrow.parent) {
            introArrow.parent.removeChild(introArrow);
        }
        if (introArrow) {
            introArrow.visible = false;
        }
        if (introfingure) {
            container.parent.addChild(introfingure);
            introfingure.visible = true;
            introfingure.x = introfingureX;
            introfingure.y = introfingureY;
            highlightTweenArr[1] = new createjs.MovieClip()
            container.parent.addChild(highlightTweenArr[1])
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: introfingureX }, 350)
                .to({ x: introfingureX - 15 }, 350)
                .to({ x: introfingureX }, 350)
                .to({ x: introfingureX - 15 }, 350)
                .wait(200)
                .call(this.onComplete2)
        } else {
            highlightTweenArr[1] = null;
            createjs.Tween.get({}).wait(200).call(this.onComplete2);
        }

    }
}
this.onComplete1 = function(e) {
    createjs.Tween.removeAllTweens();

    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        if (container && container.parent) {
            container.parent.removeChild(highlightTweenArr[0]);
        }
    }

    if (introArrow && introArrow.parent) {
        introArrow.parent.removeChild(introArrow);
    }
    if (stopValue == 0) {
        console.log("onComplete1  == stopValue")
        removeGameIntro()

    } else {

        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function(e) {
    createjs.Tween.removeAllTweens();
    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        if (container && container.parent) {
            container.parent.removeChild(highlightTweenArr[1]);
        }
    }
    if (introfingure && introfingure.parent) {
        introfingure.parent.removeChild(introfingure);
    }
    if (introfingure) {
        introfingure.visible = false;
    }

    if (stopValue == 0) {
        console.log("onComplete2  == stopValue")
        removeGameIntro()

    }
    else {
       setTimeout(AnswerValidate,500)  
    }
}
function AnswerValidate()
{
        createjs.Tween.removeAllTweens();
        introtextArr1.visible = true;
        introtextArr1.alpha = 0
        var startX = typeof introChoicePosX[4] === "number" ? introChoicePosX[4] + 24 : 965;
        var startY = typeof introChoicePosY[4] === "number" ? introChoicePosY[4] + 35 : 625;
        var midX = (typeof introChoicePosX[4] === "number" && typeof introCluePosX[3] === "number") ? (introChoicePosX[4] + introCluePosX[3]) / 2 : 855;
        var midY = (typeof introChoicePosY[4] === "number" && typeof introCluePosY[3] === "number") ? (introChoicePosY[4] + introCluePosY[3]) / 2 : 480;
        var endX = typeof introCluePosX[3] === "number" ? introCluePosX[3] : 720;
        var endY = typeof introCluePosY[3] === "number" ? introCluePosY[3] - 40 : 280;
        introtextArr1.x = startX;
        introtextArr1.y = startY;
        createjs.Tween.get(introtextArr1).wait(200)
            .to({ x: startX, y: startY, scaleX: .8, scaleY: .8, alpha: 1 }, 500)
            .to({ x: midX, y: midY, scaleX: .8, scaleY: .8, alpha: 1 }, 500)
            .to({ visible:false, x: endX, y: endY, alpha: 0 }, 500)
             //  .to({ visible:false,x: 720, y: 250, alpha: 0}, 250)
               .call(ValueTween)
}
function ValueTween()
{
       createjs.Tween.removeAllTweens();
       introtextArr1.visible=false
        introClu3.visible = true;
        introClu3.alpha = 0;
        updateIntroClueLetter(introClu3, 8)
        createjs.Tween.get(introClu3)
            .to({ x: introCluePosX[3], y: introCluePosY[3], alpha: 1 }, 1000).call(setCallDelay)
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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    if (introArrow && introArrow.parent) {
        introArrow.parent.removeChild(introArrow);
    }
    if (introArrow) {
        introArrow.visible = false
    }
    if (introfingure && introfingure.parent) {
        introfingure.parent.removeChild(introfingure);
    }
    if (introfingure) {
        introfingure.visible = false
    }
    if (introQuestionCard) {
        if (introQuestionCard.parent) {
            introQuestionCard.parent.removeChild(introQuestionCard);
        }
        introQuestionCard.visible = false;
        introQuestionCard = null;
    }
    if (introQues1) {
        if (introQues1.parent) {
            introQues1.parent.removeChild(introQues1);
        }
        introQues1.visible = false
    }
    if (introQuestxt && introQuestxt.__labelBG && introQuestxt.__labelBG.parent) {
        introQuestxt.__labelBG.parent.removeChild(introQuestxt.__labelBG);
    }
    if (introQuestxt && introQuestxt.parent) {
        introQuestxt.parent.removeChild(introQuestxt)
    }
    if (introQuestxt) {
        introQuestxt.visible = false
    }
    for (var t = 1; t <= 4; t++) {
        var introChoice = this["introChoice" + t];
        if (introChoice && introChoice.parent) {
            introChoice.parent.removeChild(introChoice);
        }
        if (introChoice) {
            introChoice.visible = false;
        }
    }
    if (introtextArr1 && introtextArr1.parent) {
        introtextArr1.parent.removeChild(introtextArr1);
    }
    if (introtextArr1) {
        introtextArr1.visible = false
    }
    for (i = 1; i < 5; i++) {
        if (introChoiceGlowArr[i]) {
            if (introChoiceGlowArr[i].parent) {
                introChoiceGlowArr[i].parent.removeChild(introChoiceGlowArr[i]);
            }
            introChoiceGlowArr[i].visible = false;
        }
        if (introChoiceBgArr[i]) {
            if (introChoiceBgArr[i].parent) {
                introChoiceBgArr[i].parent.removeChild(introChoiceBgArr[i]);
            }
            introChoiceBgArr[i].visible = false;
        }
        if (introClueBgArr[i]) {
            if (introClueBgArr[i].parent) {
                introClueBgArr[i].parent.removeChild(introClueBgArr[i]);
            }
            introClueBgArr[i].visible = false;
        }
        if (introClueArr[i]) {
            introClueArr[i].visible = false;
            if (introClueArr[i].parent) {
                introClueArr[i].parent.removeChild(introClueArr[i]);
            }
        }
    }
    introClueArr = [];
    introClueBgArr = [];
    introChoiceBgArr = [];
    introChoiceGlowArr = [];

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        if (container && container.parent) {
            container.parent.removeChild(highlightTweenArr[0]);
        }
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        if (container && container.parent) {
            container.parent.removeChild(highlightTweenArr[1]);
        }
    }
    if (introfingure && introfingure.parent) {
        introfingure.parent.removeChild(introfingure);
    }
    if (introfingure) {
        introfingure.visible = false;
    }
}
