var introTitle, introArrow, introfingure, introquestion, introHolder;
var introChoice1TweenArr = []
var introchoiceArr = [], introquesArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 290, introArrowY = 525;
var introfingureX = 310, introfingureY = 600;
var introsX = [570, 775, 355];
var introsY = [225, 600, 600];
var introbtnx = [660, 970, 335]
var introbtny = [205, 665, 665]
var introbtnx2 = [660, 850, 460]
var introbtny2 = [285, 665, 665]
var color = "black", line1
var startValX = 640, startValY = 315
var startValX1 = 780, startValY1 = 595
var introPromptLabel;
var SPOTME_INTRO_BOARD_SCALE = typeof SPOTME_BOARD_SCALE === "number" ? SPOTME_BOARD_SCALE : 0.86;
var SPOTME_INTRO_REFERENCE_SCALE = typeof SPOTME_REFERENCE_SCALE === "number" ? SPOTME_REFERENCE_SCALE : 0.86;
var SPOTME_INTRO_CHOICE_SCALE = typeof SPOTME_CHOICE_SCALE === "number" ? SPOTME_CHOICE_SCALE : 0.86;
var SPOTME_INTRO_QUESTION_SCALE = typeof SPOTME_QUESTION_SCALE === "number" ? SPOTME_QUESTION_SCALE : 0.64;
var SPOTME_INTRO_BOARD_POS = typeof SPOTME_BOARD_BASE_POS === "object" && SPOTME_BOARD_BASE_POS
    ? { x: SPOTME_BOARD_BASE_POS.x, y: SPOTME_BOARD_BASE_POS.y }
    : { x: -9, y: 10 };

function introResolveDisplaySize(target) {
    if (!target) {
        return { width: 0, height: 0 };
    }

    if (typeof target.getBounds === "function") {
        var bounds = target.getBounds();
        if (bounds) {
            return { width: bounds.width || 0, height: bounds.height || 0 };
        }
    }

    if (target.image) {
        return {
            width: target.image.width || 0,
            height: target.image.height || 0
        };
    }

    if (target.spriteSheet) {
        if (typeof target.spriteSheet.getFrame === "function") {
            var frame = target.spriteSheet.getFrame(target.currentFrame || 0);
            if (frame && frame.rect) {
                return { width: frame.rect.width || 0, height: frame.rect.height || 0 };
            }
        }

        if (typeof target.spriteSheet.getFrameBounds === "function") {
            var rect = target.spriteSheet.getFrameBounds(target.currentFrame || 0);
            if (rect) {
                return { width: rect.width || 0, height: rect.height || 0 };
            }
        }

        if (target.spriteSheet._frameWidth || target.spriteSheet._frameHeight) {
            return {
                width: target.spriteSheet._frameWidth || 0,
                height: target.spriteSheet._frameHeight || 0
            };
        }
    }

    return { width: 0, height: 0 };
}

function introApplyScaleMeta(target, scale) {
    if (!target) {
        return;
    }

    var appliedScale = typeof scale === "number" ? scale : 1;
    target.scaleX = target.scaleY = appliedScale;
    var size = introResolveDisplaySize(target);
    target.__introOffsetX = size.width * (1 - appliedScale) / 2;
    target.__introOffsetY = size.height * (1 - appliedScale) / 2;
}

function introGetScaledPosition(target, x, y) {
    return {
        x: x + (target && target.__introOffsetX ? target.__introOffsetX : 0),
        y: y + (target && target.__introOffsetY ? target.__introOffsetY : 0)
    };
}

function introSetScaledXY(target, x, y) {
    if (!target) {
        return;
    }

    var pos = introGetScaledPosition(target, x, y);
    target.x = pos.x;
    target.y = pos.y;
}

if (typeof SPOTME_PROMPT_OBSERVE === "undefined") {
    var SPOTME_PROMPT_OBSERVE = "Observe the reference baskets carefully.";
}
if (typeof SPOTME_PROMPT_SELECT === "undefined") {
    var SPOTME_PROMPT_SELECT = "Select the basket with the odd object.";
}

function ensureIntroPromptLabel(copy) {
    if (!container || !container.parent) {
        return null;
    }

    if (!introPromptLabel || !introPromptLabel.parent) {
        var baseX = typeof QusTxtString !== "undefined" && QusTxtString && typeof QusTxtString.x === "number"
            ? QusTxtString.x
            : (typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640);
        var baseY = typeof QusTxtString !== "undefined" && QusTxtString && typeof QusTxtString.y === "number"
            ? QusTxtString.y
            : (typeof INTRO_PROMPT_Y === "number" ? INTRO_PROMPT_Y - 55 : 155);

        if (introPromptLabel && introPromptLabel.__labelBG && typeof introPromptLabel.__labelBG.destroy === "function") {
            introPromptLabel.__labelBG.destroy();
        }

        if (typeof QusTxtString !== "undefined" && QusTxtString && typeof QusTxtString.clone === "function") {
            introPromptLabel = QusTxtString.clone();
        } else {
            introPromptLabel = new createjs.Text("", "800 60px 'Baloo 2'", "#F4FAFF");
            introPromptLabel.textAlign = "center";
            introPromptLabel.textBaseline = "middle";
            introPromptLabel.lineWidth = 1000;
            introPromptLabel.shadow = new createjs.Shadow("rgba(5,12,28,0.5)", 0, 10, 26);
        }

        introPromptLabel.x = baseX;
        introPromptLabel.y = baseY;
        introPromptLabel.alpha = 1;
        introPromptLabel.visible = true;
        container.parent.addChild(introPromptLabel);

        if (typeof SAUI_attachQuestionLabelBG === "function") {
            introPromptLabel.__labelBG = SAUI_attachQuestionLabelBG(introPromptLabel, container.parent, {
                padX: 20,
                padY: 12,
                fill: "rgba(0,0,0,0.3)",
                stroke: "rgba(255,255,255,0.14)",
                strokeW: 2,
                maxRadius: 22
            });
        }
    }

    if (typeof copy !== "undefined") {
        updateIntroPromptLabel(copy);
    }

    return introPromptLabel;
}

function updateIntroPromptLabel(copy) {
    if (!introPromptLabel) {
        return;
    }

    var textValue = typeof copy === "string" ? copy : copy === "" ? "" : introPromptLabel.text;
    introPromptLabel.text = textValue || "";
    introPromptLabel.visible = !!textValue;

    if (introPromptLabel.__labelBG && typeof introPromptLabel.__labelBG.update === "function") {
        introPromptLabel.__labelBG.update();
    }
}

function disposeIntroPromptLabel() {
    if (!introPromptLabel) {
        return;
    }

    if (introPromptLabel.__labelBG) {
        if (typeof introPromptLabel.__labelBG.destroy === "function") {
            introPromptLabel.__labelBG.destroy();
        } else if (introPromptLabel.__labelBG.parent) {
            introPromptLabel.__labelBG.parent.removeChild(introPromptLabel.__labelBG);
        }
        introPromptLabel.__labelBG = null;
    }

    if (introPromptLabel.parent) {
        introPromptLabel.parent.removeChild(introPromptLabel);
    }

    introPromptLabel = null;
}
function commongameintro() {
    startValX = 640, startValY = 315
    startValX1 = 780, startValY1 = 595
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    introTitle = Title.clone();
    introHolder = chHolder.clone();
    introquestion = question.clone();
    for (i = 0; i < 3; i++) {
        introquesArr[i] = choice1.clone();
    }
    for (i = 0; i < 3; i++) {
        introchoiceArr[i] = dummy.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true
    container.parent.addChild(introHolder)
    introHolder.visible = false
    introApplyScaleMeta(introHolder, SPOTME_INTRO_BOARD_SCALE);
    introSetScaledXY(introHolder, SPOTME_INTRO_BOARD_POS.x, SPOTME_INTRO_BOARD_POS.y);
    ensureIntroPromptLabel(SPOTME_PROMPT_OBSERVE);
    if (introPromptLabel) {
        introPromptLabel.alpha = 0;
        introPromptLabel.visible = true;
    }

    /////////////////////////////////////////////////////choice//////////////////////
    for (i = 0; i < 3; i++) {
        introApplyScaleMeta(introchoiceArr[i], SPOTME_INTRO_CHOICE_SCALE);
        introSetScaledXY(introchoiceArr[i], introbtnx2[i], introbtny2[i]);
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].visible = false;
        introchoiceArr[i].gotoAndStop(i)
    }
    /////////////////////////////////////////////////////question//////////////////////
    container.parent.addChild(introquestion)
    introquestion.visible = false
    introquestion.gotoAndStop(6)
    introApplyScaleMeta(introquestion, SPOTME_INTRO_QUESTION_SCALE);
    introSetScaledXY(introquestion, 640, 165);

    for (i = 0; i < 3; i++) {
        container.parent.addChild(introquesArr[i]);
        introquesArr[i].visible = false;
        introApplyScaleMeta(introquesArr[i], SPOTME_INTRO_REFERENCE_SCALE);
        introSetScaledXY(introquesArr[i], introsX[i], introsY[i]);
    }
    ////////////////////////////////////////////////Line///////////////////////////////////////// 
    line1 = new createjs.Shape();
    container.parent.addChild(line1)
    line1.graphics.setStrokeStyle(5);
    line1.graphics.beginStroke(color);
    line1.visible = true
    /////////////////////////////////////////////////////questiontext and holder anim////////////////////// 
    if (introPromptLabel) {
        updateIntroPromptLabel(SPOTME_PROMPT_OBSERVE);
        createjs.Tween.get(introPromptLabel)
            .wait(500)
            .to({ alpha: 1 }, 500, createjs.Ease.bounceOut)
            .call(handleComplete1_1);
    } else {
        handleComplete1_1();
    }
}

function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    introSetScaledXY(introHolder, SPOTME_INTRO_BOARD_POS.x - 1700, SPOTME_INTRO_BOARD_POS.y);
    introHolder.visible = true
    var boardTarget = introGetScaledPosition(introHolder, SPOTME_INTRO_BOARD_POS.x, SPOTME_INTRO_BOARD_POS.y);
    createjs.Tween.get(introHolder).
        to({ x: boardTarget.x, y: boardTarget.y }, 500, createjs.Ease.bounceIn);

    var introtempVal2 = 500
    var introRand = [2, 1, 0]
    for (i = 0; i < 3; i++) {
        introquesArr[introRand[i]].visible = true;
        introquesArr[introRand[i]].alpha = 0
        var introReferenceTarget = introGetScaledPosition(introquesArr[introRand[i]], introsX[introRand[i]], introsY[introRand[i]]);
        createjs.Tween.get(introquesArr[introRand[i]]).set({ x: introReferenceTarget.x, y: introReferenceTarget.y })
            .wait(introtempVal2).to({ alpha: 1 }, introtempVal2);
        introtempVal2 += 200;
    }
    introquestion.visible = true
    introquestion.alpha = 0
    var introQuestionTarget = introGetScaledPosition(introquestion, 640, 165);
    createjs.Tween.get(introquestion)
        .set({ x: introQuestionTarget.x, y: introQuestionTarget.y })
        .wait(2500).to({ alpha: 1 }, 500)
        .to({ y: introQuestionTarget.y + 95 }, 1000, createjs.Ease.bounceOut)
        .wait(500).call(handleComplete2_1);

    var introtempVal1 = 1000;
    for (i = 0; i < 3; i++) {
        introchoiceArr[introRand[i]].visible = true
        introchoiceArr[introRand[i]].alpha = 0
        var introChoiceTarget = introGetScaledPosition(introchoiceArr[introRand[i]], introbtnx[introRand[i]], introbtny[introRand[i]]);
        createjs.Tween.get(introchoiceArr[introRand[i]]).wait(introtempVal1)
            .to({ x: introChoiceTarget.x, y: introChoiceTarget.y, alpha: 1 }, 500, createjs.Ease.bounceOut)
            .wait(500);
        introtempVal1 += 200;
    }
}
function handleComplete2_1() {

    if (stopValue == 0) {
        removeGameIntro()
    } else {
        introquestion.visible = false
        createjs.Tween.removeAllTweens();
        introPosChange()
    }
}
function introPosChange() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Ticker.addEventListener("tick", lineTween);
        var firstTarget = introGetScaledPosition(introquesArr[0], introsX[1], introsY[1]);
        createjs.Tween.get(introquesArr[0]).to({ x: firstTarget.x, y: firstTarget.y }, 600).wait(600);
        var secondTarget = introGetScaledPosition(introquesArr[1], introsX[2], introsY[2]);
        createjs.Tween.get(introquesArr[1]).to({ x: secondTarget.x, y: secondTarget.y }, 600).wait(600);
        var thirdTarget = introGetScaledPosition(introquesArr[2], introsX[0], introsY[0]);
        createjs.Tween.get(introquesArr[2]).to({ x: thirdTarget.x, y: thirdTarget.y }, 600).wait(900).call(introPosChange1);
    }
}
function introPosChange1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        var firstTarget = introGetScaledPosition(introquesArr[0], introsX[2], introsY[2]);
        createjs.Tween.get(introquesArr[0]).to({ x: firstTarget.x, y: firstTarget.y }, 800).wait(800);
        var secondTarget = introGetScaledPosition(introquesArr[1], introsX[1], introsY[1]);
        createjs.Tween.get(introquesArr[1]).to({ x: secondTarget.x, y: secondTarget.y }, 800).wait(800);
        var thirdTarget = introGetScaledPosition(introquesArr[2], introsX[0], introsY[0]);
        createjs.Tween.get(introquesArr[2]).to({ x: thirdTarget.x, y: thirdTarget.y }, 800).wait(800).call(handleComplete3_1);
    }
}
function handleComplete3_1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.removeAllTweens();
        questionTextTween()
    }
}
function questionTextTween() {
    ensureIntroPromptLabel(SPOTME_PROMPT_SELECT);
    if (introPromptLabel) {
        introPromptLabel.alpha = 0;
        updateIntroPromptLabel(SPOTME_PROMPT_SELECT);
        introPromptLabel.visible = true;
        createjs.Tween.get(introPromptLabel).wait(200).to({ alpha: 1 }, 200).call(handleComplete4_1);
    } else {
        handleComplete4_1();
    }
}
// function handleComplete4_1() {
//     if (stopValue == 0) {
//         removeGameIntro()
//     } else {
//         createjs.Tween.removeAllTweens();
//         // lineTween()
//         createjs.Ticker.addEventListener("tick", lineTween);
//     }
// }
function lineTween() {
    if (createjs.Ticker.paused) {

    }
    else {
        if (stopValue == 0) {
            removeGameIntro()
            createjs.Ticker.removeEventListener("tick", lineTween);
        } else {
            if (startValY == 595) {
                if (startValX1 == 470) {
                    createjs.Ticker.removeEventListener("tick", lineTween);
                    // handleComplete5_1()
                } else {
                    line1.graphics.beginStroke(color);
                    line1.visible = true
                    line1.graphics.moveTo(startValX1, startValY1);
                    startValX1 -= 10;
                    // startValY1 -= 10;
                    line1.graphics.lineTo(startValX1, startValY1);
                    line1.graphics.endStroke();
                }
            } else {
                line1.graphics.beginStroke(color);
                line1.visible = true
                line1.graphics.moveTo(startValX, startValY);
                startValY += 10;
                startValX += 5;
                line1.graphics.lineTo(startValX, startValY);
                line1.graphics.endStroke();
            }
        }
    }
}
function handleComplete4_1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.removeAllTweens();
        setArrowTween()
    }
}
function setArrowTween() {
    introquestion.visible = true
    var introQuestionSelectTarget = introGetScaledPosition(introquestion, 420, 630);
    introquestion.x = introQuestionSelectTarget.x;
    introquestion.y = introQuestionSelectTarget.y;
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
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
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
        //setTimeout(setstarAnimation, 1000)
    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeAllTweens();
    // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        container.parent.removeChild(highlightTweenArr[0]);
    }
    // }
    container.parent.removeChild(introArrow);
    if (stopValue == 0) {
        console.log("onComplete1  == stopValue")
        removeGameIntro()

    } else {
        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeAllTweens();


    container.parent.removeChild(introfingure);
    introfingure.visible = false;

    if (stopValue == 0) {
        console.log("onComplete2  == stopValue")
        removeGameIntro()

    }
    else {
        console.log("///setcallDelat=====+");
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
    createjs.Ticker.removeEventListener("tick", lineTween);
    createjs.Tween.removeAllTweens();
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false

    container.parent.removeChild(introHolder)
    introHolder.visible = false
    container.parent.removeChild(introquestion)
    introquestion.visible = false
    disposeIntroPromptLabel()
    container.parent.removeChild(line1)
    line1.visible = false
    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introchoiceArr[i])
        introchoiceArr[i].visible = false;
    }
    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introquesArr[i]);
        introquesArr[i].visible = false;
    }

}