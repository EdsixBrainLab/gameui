var introTitle, introQuestxt, introQues, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4
var introQuesX = 425, introQuesY = 215;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 720, introArrowY = 220;
var introfingureX = 750, introfingureY = 390;
var posX11 =  [100, 940, 510, 100, 940]
var posY11 = [190, 190, 340, 460, 460]
var posX12 = [490,690,890,1090]
var posY12 = [400,400,400,400]
var introArr = []
var introArr1 = []
var val = [0,2,3,4,5]
var val1 = [4,6,0,2]

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

function commongameintro() {
    introTitle = Title.clone();
    introchoice1 = choice1.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.destroy === "function") {
        introQuestxt.__labelBG.destroy();
    }
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {
        padX: 20,
        padY: 12,
        fill: "rgba(0,0,0,0.3)",
        stroke: "rgba(255,255,255,0.14)",
        strokeW: 2,
        maxRadius: 22
    });

    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introImg1);
    introImg1.x = 330; introImg1.y = 190
    introImg1.regX = introImg1.regY = 50    
    introImg1.scaleX = introImg1.scaleY = 1.1
    introImg1.visible = false;
    for (i = 0; i < 5; i++) {
        introArr[i] = introchoice1.clone();
        container.parent.addChild(introArr[i]);
        introArr[i].visible = false;
        introArr[i].scaleX = introArr[i].scaleY = 1.2;
        introArr[i].gotoAndStop(val[i]);
        introArr[i].x = posX11[i]
        introArr[i].y = posY11[i]
    }


    for (i = 0; i < 4; i++) {
        introArr1[i] = choice1.clone();
        container.parent.addChild(introArr1[i]);
        introArr1[i].visible = false;
        introArr1[i].regX = introArr1[i].regY = 50;
        introArr1[i].gotoAndStop(val1[i]);
        introArr1[i].x = posX12[i]
        introArr1[i].y =  posY12[i]
        introArr1[i].scaleX = introArr1[i].scaleY = 0.75;
        introArr1[i].baseScale = 0.75;
        introArr1[i].__choiceIndex = i;
        introArr1[i].__targetX = introArr1[i].x;
        introArr1[i].__targetY = 330;
    }

    introQuestxt.visible = true;
    introQuestxt.x = 400
    introQuestxt.y = 140
    introQuestxt.alpha = 1;
    introQuestxt.text = "Remember these objects";
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.scaleX = introImg.scaleY = 1.1
    introImg.regX = introImg.regY = 50;
    introImg.y = 190;
    introImg.x = 330;

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
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

    for (i = 0; i < 5; i++) {
        introArr[i].visible = true;
        introArr[i].alpha = 0
    }
    createjs.Tween.get(introArr[0]).wait(200).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr[1]).wait(600).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr[2]).wait(800).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr[3]).wait(1000).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr[4]).wait(1400).to({ alpha: 0, scaleX: .95, scaleY: .95 }, 500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500).wait(3000).call(handleComplete2_1);


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
    introImg1.visible =true;
    for (i = 0; i < 5; i++) {
        if (i == 4) {
            createjs.Tween.get(introArr[i]).wait(50).to({scaleX:.7,scaleY:.7, x:600,y:200}, 500).to({ alpha: 1 })

        }
        else {
            createjs.Tween.get(introArr[i]).wait(50).to({scaleX:.7,scaleY:.7, x:600,y:200 },500).to({ alpha: 1 })
        }
       
    }  
    
    createjs.Tween.get(introImg1).wait(50).to({ alpha: 1 },200)
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
    for (i = 0; i < 5; i++) {
        introArr[i].visible = false;
    }
    introImg1.visible = false;
    introImg.visible = true;
    createjs.Tween.get(introImg).to({ alpha: 1, scaleX:1.1, scaleY:1.1 }, 700)
        .to({ scaleX:1.05, scaleY:1.05 }, 1000).to({ scaleX:1.1, scaleY:1.1 }, 500)
        .to({ scaleX:1.05, scaleY:1.05 }, 1000).wait(1500).call(handleComplete4_1);

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
    createjs.Tween.get(introImg).to({ scaleX: .6, scaleY: .6, x: 70, y: 280 }, 500).wait(500).call(handleComplete5_1);
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

    for (i = 0; i < 5; i++) {
        introArr[i].visible = false;
    }
    
    introQuestxt.visible = true;
    introQuestxt.text = "Which of these was not shown?";
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    clearIntroChoiceAnimations(introArr1);
    for (i = 0; i < 4; i++) {
        introArr1[i].visible = true;
        introArr1[i].alpha = 0;
        introArr1[i].mouseEnabled = false;
        introArr1[i].cursor = "default";
        introArr1[i].__choiceIndex = i;
        introArr1[i].baseScale = (typeof introArr1[i].baseScale === "number") ? introArr1[i].baseScale : 0.75;
        introArr1[i].__targetX = introArr1[i].__targetX || introArr1[i].x;
        introArr1[i].__targetY = (typeof introArr1[i].__targetY === "number") ? introArr1[i].__targetY : 330;
        introArr1[i].scaleX = introArr1[i].scaleY = Math.max(introArr1[i].baseScale - 0.18, introArr1[i].baseScale * 0.6);
        introArr1[i].y = introArr1[i].__targetY + 70;
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
    createjs.Tween.get(introQuestxt).to({ alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr1[1]).wait(600).to({ alpha: 1, scaleX: .65, scaleY:.65 }, 500)
        .to({ scaleX: .75, scaleY:  .75 }, 500).to({ scaleX: .65, scaleY:.65 }, 500)
        .to({ scaleX:  .75, scaleY:  .75 }, 700).wait(2000).call(handleComplete7_1);
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

function setFingureTween() {
    if (stopValue == 0) {
        removeGameIntro()

    }
    else {

        container.parent.removeChild(introArrow);
        introArrow.visible = false;
        container.parent.addChild(introfingure);
        introfingure.visible = true;
        introfingure.x = introfingureX;
        introfingure.y = introfingureY;
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])
        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).wait(200).call(this.onComplete2)

    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeAllTweens();
    // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[0]) {
        container.parent.removeChild(highlightTweenArr[0]);
    }
    // }
    container.parent.removeChild(introArrow);
    if (stopValue == 0) {
        removeGameIntro()

    } else {
        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeAllTweens();

    // // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[1]) {
        container.parent.removeChild(highlightTweenArr[1]);
    }
    // // }
    container.parent.removeChild(introfingure);
    introfingure.visible = false;

    if (stopValue == 0) {
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
    removeGameIntro()
    if (stopValue == 0) {
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
    console.log("removeGameIntro")
    createjs.Tween.removeAllTweens();
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;

    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    if (introQuestxt) {
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.destroy === "function") {
            introQuestxt.__labelBG.destroy();
        }
        introQuestxt.visible = false;
        container.parent.removeChild(introQuestxt)
        introQuestxt = null;
    }
  
    container.parent.removeChild(introImg);
    introImg.visible = false;
    container.parent.removeChild(introImg1);
    introImg1.visible = false;


    container.parent.removeChild(introchoice1)
    introchoice1.visible = false;

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }

    for (i = 0; i < 5; i++) {
        container.parent.removeChild(introArr[i]);
        introArr[i].visible = false;
    }


    for (i = 0; i < 4; i++) {
        container.parent.removeChild(introArr1[i]);
        introArr1[i].visible = false;
    }

    clearIntroChoiceAnimations(introArr1);

}