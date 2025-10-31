var introTitle, introQuestxt, introQues, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4
var introQuestxtX = 640, introQuestxtY = 150;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 900, introArrowY = 520;
var introfingureX = 920, introfingureY = 420;
var posX11 = [200, 400, 600, 800, 280, 480, 680]
var posY11 = [220, 220, 220, 220, 470, 470, 470]
var posX12 = [240, 520, 800, 360, 680]
var posY12 = [330, 330, 330, 520, 520]
var introArr = []
var introArr1 = []
var val = [0, 1, 2, 3, 4, 5, 6]
var val1 = [4, 0, 2, 7, 3]

function animateIntroChoiceOptions(choiceArray, onComplete) {
    if (!choiceArray) { return; }
    var pendingTweens = 0;
    var hasTweens = false;

    for (var idx = 0; idx < choiceArray.length; idx++) {
        var tile = choiceArray[idx];
        if (!tile) { continue; }
        hasTweens = true;
        pendingTweens++;
        stopIntroChoicePulse(tile);

        var baseScale = (typeof tile.baseScale === "number") ? tile.baseScale : (tile.scaleX || 1);
        var targetX = (typeof tile.__targetX === "number") ? tile.__targetX : tile.x;
        var targetY = (typeof tile.__targetY === "number") ? tile.__targetY : tile.y;

        tile.baseScale = baseScale;
        tile.__targetX = targetX;
        tile.__targetY = targetY;
        tile.__choiceIndex = (typeof tile.__choiceIndex === "number") ? tile.__choiceIndex : idx;

        tile.visible = true;
        tile.alpha = 0;
        tile.mouseEnabled = false;
        tile.cursor = "default";
        tile.x = targetX;
        tile.y = targetY + 70;
        tile.scaleX = tile.scaleY = Math.max(baseScale - 0.18, baseScale * 0.6);

        (function (target, base, finalY, order) {
            var delay = 200 + (order * 150);
            createjs.Tween.get(target, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: finalY }, 320, createjs.Ease.quadOut);

            createjs.Tween.get(target, { override: false })
                .wait(delay)
                .to({ scaleX: base + 0.18, scaleY: base + 0.18 }, 360, createjs.Ease.backOut)
                .to({ scaleX: base, scaleY: base }, 260, createjs.Ease.sineOut)
                .call(function () {
                    startIntroChoicePulse(target, base, finalY, order);
                    pendingTweens = Math.max(0, pendingTweens - 1);
                    if (!pendingTweens && typeof onComplete === "function") {
                        onComplete();
                    }
                });
        })(tile, baseScale, targetY, tile.__choiceIndex);
    }

    if (!hasTweens && typeof onComplete === "function") {
        onComplete();
    }
}

function startIntroChoicePulse(tile, baseScale, targetY, index) {
    if (!tile) { return; }
    stopIntroChoicePulse(tile);
    var scale = (typeof baseScale === "number") ? baseScale : (tile.baseScale || tile.scaleX || 1);
    var finalY = (typeof targetY === "number") ? targetY : (tile.__targetY || tile.y);
    var stagger = (typeof index === "number") ? index : (tile.__choiceIndex || 0);

    tile.baseScale = scale;
    tile.__targetY = finalY;
    tile.scaleX = tile.scaleY = scale;
    tile.y = finalY;

    tile.__introPulse = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 100)
        .to({ scaleX: scale * 1.05, scaleY: scale * 0.95 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale * 0.98, scaleY: scale * 1.02 }, 360, createjs.Ease.sineInOut)
        .to({ scaleX: scale, scaleY: scale }, 320, createjs.Ease.sineInOut);

    tile.__introBob = createjs.Tween.get(tile, { loop: true, override: false })
        .wait((stagger % 2) * 120)
        .to({ y: finalY - 8 }, 360, createjs.Ease.sineOut)
        .to({ y: finalY }, 420, createjs.Ease.sineInOut);
}

function stopIntroChoicePulse(tile) {
    if (!tile) { return; }
    if (tile.__introPulse) {
        tile.__introPulse.setPaused(true);
        tile.__introPulse = null;
    }
    if (tile.__introBob) {
        tile.__introBob.setPaused(true);
        tile.__introBob = null;
    }
    createjs.Tween.removeTweens(tile);
    if (tile.baseScale) {
        tile.scaleX = tile.scaleY = tile.baseScale;
    }
    if (typeof tile.__targetY === "number") {
        tile.y = tile.__targetY;
    }
    if (typeof tile.__targetX === "number") {
        tile.x = tile.__targetX;
    }
}

function clearIntroChoiceAnimations(choiceArray) {
    if (!choiceArray) { return; }
    for (var i = 0; i < choiceArray.length; i++) {
        if (choiceArray[i]) {
            stopIntroChoicePulse(choiceArray[i]);
        }
    }
}

function setIntroQuestionText(copy, options) {
    if (!introQuestxt) { return; }
    introQuestxt.visible = true;
    introQuestxt.text = copy;
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }
    createjs.Tween.removeTweens(introQuestxt);
    introQuestxt.alpha = 0;
    var delay = options && typeof options.delay === "number" ? options.delay : 0;
    var tween = createjs.Tween.get(introQuestxt, { override: true })
        .wait(delay)
        .to({ alpha: 1 }, 600, createjs.Ease.sineOut);
    if (options && typeof options.onComplete === "function") {
        tween.call(options.onComplete);
    }
}

function commongameintro() {
    introTitle = Title.clone();
    introchoice1 = choice1.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introQuestxt = QusTxtString ? QusTxtString.clone() : null;

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    container.parent.addChild(introImg1);
    introImg1.x = 330; introImg1.y = 200
    introImg1.regX = introImg1.regY = 50
    introImg1.scaleX = introImg1.scaleY = 1.1
    introImg1.visible = false;

    for (i = 0; i < val.length; i++) {
        introArr[i] = introchoice1.clone();
        container.parent.addChild(introArr[i]);
        introArr[i].visible = false;
        introArr[i].gotoAndStop(val[i]);
        introArr[i].x = posX11[i]
        introArr[i].y = posY11[i]
        introArr[i].scaleX = introArr[i].scaleY = 0.98;
        introArr[i].baseScale = introArr[i].scaleX;
        introArr[i].__targetX = introArr[i].x;
        introArr[i].__targetY = introArr[i].y;
    }

    for (i = 0; i < val1.length; i++) {
        introArr1[i] = choice1.clone();
        container.parent.addChild(introArr1[i]);
        introArr1[i].visible = false;
        introArr1[i].regX = introArr1[i].regY = 50;
        introArr1[i].gotoAndStop(val1[i]);
        introArr1[i].x = posX12[i]
        introArr1[i].y = posY12[i]
        introArr1[i].baseScale = 0.88;
        introArr1[i].scaleX = introArr1[i].scaleY = introArr1[i].baseScale;
        introArr1[i].__targetX = introArr1[i].x;
        introArr1[i].__targetY = introArr1[i].y;
        introArr1[i].__choiceIndex = i;
    }

    if (introQuestxt) {
        container.parent.addChild(introQuestxt);
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.destroy === "function") {
            introQuestxt.__labelBG.destroy();
        }
        introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
        introQuestxt.visible = true;
        introQuestxt.x = introQuestxtX;
        introQuestxt.y = introQuestxtY;
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
            introQuestxt.__labelBG.update();
        }
    }

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.scaleX = introImg.scaleY = 1.1
    introImg.regX = introImg.regY = 50;
    introImg.y = 200;
    introImg.x = 330;

    if (introQuestxt) {
        setIntroQuestionText("Remember these objects", { onComplete: handleComplete1_1 });
    } else {
        handleComplete1_1();
    }
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        quesTween()
    }
}
function quesTween() {

    var pending = 0;
    for (i = 0; i < introArr.length; i++) {
        introArr[i].visible = true;
        introArr[i].alpha = 0;
        introArr[i].x = introArr[i].__targetX;
        introArr[i].y = introArr[i].__targetY - 260;
        var baseScale = introArr[i].baseScale || introArr[i].scaleX || 1;
        introArr[i].scaleX = introArr[i].scaleY = baseScale;
        pending++;
        (function (tile, targetY, order, scale) {
            var delay = 200 + (order * 120);
            createjs.Tween.get(tile, { override: true })
                .wait(delay)
                .to({ alpha: 1, y: targetY }, 520, createjs.Ease.bounceOut)
                .call(function () {
                    pending = Math.max(0, pending - 1);
                    if (!pending) {
                        handleComplete2_1();
                    }
                });

            createjs.Tween.get(tile, { override: false })
                .wait(delay)
                .to({ scaleX: scale + 0.08, scaleY: scale + 0.08 }, 320, createjs.Ease.backOut)
                .to({ scaleX: scale, scaleY: scale }, 260, createjs.Ease.sineOut);
        })(introArr[i], introArr[i].__targetY, i, baseScale);
    }
    if (!pending) {
        handleComplete2_1();
    }
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();


    if (stopValue == 0) {
        removeGameIntro()
    }
    else {

        introchoice2()

    }
}
function introchoice2() {

    introImg1.visible = true;
    for (i = 0; i < introArr.length; i++) {
        createjs.Tween.get(introArr[i]).wait(50).to({ scaleX: .7, scaleY: .7, x: 600, y: 220 }, 500).to({ alpha: 1 })
    }

    createjs.Tween.get(introImg1).wait(50).to({ alpha: 1 }, 200)
        .call(handleComplete3_1);
}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();


    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introRemember()

    }
}
function introRemember() {
    for (i = 0; i < introArr.length; i++) {
        introArr[i].visible = false;
    }
    introImg1.visible = false;
    introImg.visible = true;
    createjs.Tween.get(introImg).to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 700)
        .to({ scaleX: 1.05, scaleY: 1.05 }, 1000).to({ scaleX: 1.1, scaleY: 1.1 }, 500)
        .to({ scaleX: 1.05, scaleY: 1.05 }, 1000).wait(1500).call(handleComplete4_1);

}
function handleComplete4_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh1()
        // choiceTween()
    }
}
function introCh1() {
    createjs.Tween.get(introImg).to({ scaleX: .6, scaleY: .6, x: 70, y: 300 }, 500).wait(500).call(handleComplete5_1);
}
function handleComplete5_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        choiceTween()
    }
}
function choiceTween() {

    for (i = 0; i < introArr.length; i++) {
        introArr[i].visible = false;
    }

    setIntroQuestionText("Which of these was not shown?", { delay: 0 });

    clearIntroChoiceAnimations(introArr1);
    for (i = 0; i < introArr1.length; i++) {
        introArr1[i].visible = false;
        introArr1[i].alpha = 0;
        introArr1[i].mouseEnabled = false;
        introArr1[i].cursor = "default";
        introArr1[i].scaleX = introArr1[i].scaleY = introArr1[i].baseScale || introArr1[i].scaleX || 1;
        introArr1[i].__choiceIndex = i;
    }

    animateIntroChoiceOptions(introArr1, function () {
        handleComplete6_1();
    });

}
function handleComplete6_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh()
    }
}
function introCh() {
    clearIntroChoiceAnimations(introArr1);
    if (introQuestxt) {
        createjs.Tween.get(introQuestxt).to({ alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.05, scaleY: 1.05 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500)
    }
    if (introArr1[4]) {
        createjs.Tween.get(introArr1[4]).wait(600).to({ alpha: 1, scaleX: .95, scaleY: .95 }, 500)
            .to({ scaleX: 1.05, scaleY: 1.05 }, 500).to({ scaleX: .95, scaleY: .95 }, 500)
            .to({ scaleX: 1.05, scaleY: 1.05 }, 700).wait(2000).call(handleComplete7_1);
    } else {
        setTimeout(handleComplete7_1, 2000);
    }
}
function handleComplete7_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("handleComplete1_5  == stopValue")
        removeGameIntro()

    }
    else {
        setArrowTween()
    }
}
function setArrowTween() {
    if (stopValue == 0) {
        removeGameIntro()

    }
    else {
        container.parent.addChild(introArrow);
        introArrow.visible = true;
        introArrow.x = introArrowX;
        introArrow.y = introArrowY;
        highlightTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[0])
        highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350).wait(400).call(this.onComplete1)

    }

}
function onComplete1() {
    if (stopValue == 0) {
        console.log("onComplete1 == stopValue")
        removeGameIntro()
    }
    else {
        setTimeout(fingureVisible, 1000)
    }
}
function fingureVisible() {
    if (stopValue == 0) {
        removeGameIntro()

    }
    else {
        container.parent.addChild(introfingure);
        introfingure.visible = true;
        introfingure.x = introfingureX;
        introfingure.y = introfingureY;
        introfingure.scaleX = introfingure.scaleY = 1.1
        introfingure.alpha = 0;
        createjs.Tween.get(introfingure).to({ alpha: 1 }, 300).to({ y: introfingureY + 15 }, 350).to({ y: introfingureY }, 300).wait(2000).call(handleComplete8_1);
    }
}
function handleComplete8_1() {
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        removeGameIntro()
    }
}
