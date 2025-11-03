var introTitle, introArrow, introfingure, introquestion, introHolder;
var introChoice1TweenArr = []
var introchoiceArr = [], introquesArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 370, introArrowY = 160;
var introfingureX = 390, introfingureY = 250;
var introsX = [580, 740, 760, 671, 483, 393, 423];
var introsY = [225, 300, 470, 600, 600, 465, 300];
var introbtnx = [670, 916, 946, 856, 473, 380, 425]
var introbtny = [205, 300, 490, 680, 680, 490, 300]
var introbtnx2 = [660, 801, 831, 841, 473, 490, 525]
var introbtny2 = [285, 300, 490, 580, 580, 490, 300]
var color = "black", line1
var startValX , startValY , startValX1 , startValY1,startValX2 , startValY2
function commongameintro() {
    startValX = 550, startValY = 620
    startValX1 = 490, startValY1 = 560
    startValX2 = 780, startValY2 = 560
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    introTitle = Title.clone();
    introQuestionText = questionText.clone();
    introHolder = chHolder.clone();
    introquestion = question.clone()
    for (i = 0; i < 7; i++) {
        introquesArr[i] = choice1.clone()
        introchoiceArr[i] = dummy.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true
    container.parent.addChild(introHolder)
    introHolder.visible = false
    introHolder.y = -30
    container.parent.addChild(introQuestionText)
    introQuestionText.visible = true
    introQuestionText.x = 380;
    introQuestionText.y = 90;
    introQuestionText.scaleX = introQuestionText.scaleY = 1
    if(lang == "HindiQuestionText/"){
        introQuestionText.scaleX = introQuestionText.scaleY = .9
        introQuestionText.x = 410;
        introQuestionText.y = 100;
    }
    /////////////////////////////////////////////////////choice//////////////////////  
    for (i = 0; i < 7; i++) {
        introchoiceArr[i].x = introbtnx2[i];
        introchoiceArr[i].y = introbtny2[i];
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].visible = false;
        introchoiceArr[i].gotoAndStop(i)
    }
    /////////////////////////////////////////////////////question//////////////////////
    container.parent.addChild(introquestion)
    introquestion.visible = false
    introquestion.gotoAndStop(23)
    introquestion.x = 553
    introquestion.y = 564
    introquestion.scaleX = introquestion.scaleY = .7

    for (i = 0; i < 7; i++) {
        container.parent.addChild(introquesArr[i]);
        introquesArr[i].visible = false;
        introquesArr[i].x = introsX[i];
        introquesArr[i].y = introsY[i];
    }
    ////////////////////////////////////////////////Line///////////////////////////////////////// 
    line1 = new createjs.Shape();
    container.parent.addChild(line1)
    line1.graphics.setStrokeStyle(5);
    line1.graphics.beginStroke(color);
    line1.visible = true
    /////////////////////////////////////////////////////questiontext and holder anim////////////////////// 
    introQuestionText.alpha = 0
    createjs.Tween.get(introQuestionText).wait(500).to({ alpha: 1 }, 500, createjs.Ease.bounceOut).call(handleComplete1_1)
}

function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {   // 
    introHolder.x = 1700;
    introHolder.visible = true
    createjs.Tween.get(introHolder).
        to({ x: 0, y: introHolder.y }, 500, createjs.Ease.bounceIn);

    var introtempVal2 = 500
    var introRand = [3, 6, 1, 5, 2, 4, 0]
    for (i = 0; i < 7; i++) {
        introquesArr[introRand[i]].visible = true;
        introquesArr[introRand[i]].alpha = 0
        //  createjs.Tween.get(introquesArr[i]).wait(500).to({ x: introquesArr[i].x + 50, alpha: 1 }, 300).to({ x: introquesArr[i].x }, 300, createjs.Ease.bounceOut).wait(300);
        createjs.Tween.get(introquesArr[introRand[i]]).wait(introtempVal2).to({ alpha: 1 }, introtempVal2);
        introtempVal2 += 200;
    }

    introquestion.visible = true
    introquestion.alpha = 0
    createjs.Tween.get(introquestion).wait(3000).to({ y: introquestion.y, alpha: 1 }, 500).to({ y: introquestion.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500).call(handleComplete2_1);

    var introtempVal1 = 1500;
    for (i = 0; i < 7; i++) {
        introchoiceArr[introRand[i]].visible = true
        introchoiceArr[introRand[i]].alpha = 0
        createjs.Tween.get(introchoiceArr[introRand[i]]).wait(introtempVal1).to({ x: introbtnx[introRand[i]], y: introbtny[introRand[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
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
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[2], y: introsY[2] }, 300).wait(300);
        createjs.Tween.get(introquesArr[1]).to({ x: introsX[0], y: introsY[0] }, 300).wait(300);
        createjs.Tween.get(introquesArr[2]).to({ x: introsX[3], y: introsY[3] }, 300).wait(300);
        createjs.Tween.get(introquesArr[3]).to({ x: introsX[4], y: introsY[4] }, 300).wait(300);
        createjs.Tween.get(introquesArr[4]).to({ x: introsX[5], y: introsY[5] }, 300).wait(300);
        createjs.Tween.get(introquesArr[5]).to({ x: introsX[6], y: introsY[6] }, 300).wait(300);
        createjs.Tween.get(introquesArr[6]).to({ x: introsX[1], y: introsY[1] }, 300).wait(300).call(introPosChange1);
    }
}
function introPosChange1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.get(introquesArr[2]).to({ x: introsX[4], y: introsY[4] }, 500).wait(700);
        createjs.Tween.get(introquesArr[3]).to({ x: introsX[5], y: introsY[5] }, 500).wait(700);
        createjs.Tween.get(introquesArr[4]).to({ x: introsX[2], y: introsY[2] }, 500).wait(700);
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[3], y: introsY[3] }, 500).wait(700).call(introPosChange2);
    }
}

function introPosChange2() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[4], y: introsY[4] }, 500).wait(400);
        createjs.Tween.get(introquesArr[1]).to({ x: introsX[0], y: introsY[0] }, 500).wait(400);
        createjs.Tween.get(introquesArr[2]).to({ x: introsX[3], y: introsY[3] }, 500).wait(400);
        createjs.Tween.get(introquesArr[3]).to({ x: introsX[2], y: introsY[2] }, 500).wait(400);
        createjs.Tween.get(introquesArr[4]).to({ x: introsX[6], y: introsY[6] }, 500).wait(400);
        createjs.Tween.get(introquesArr[5]).to({ x: introsX[5], y: introsY[5] }, 500).wait(400);
        createjs.Tween.get(introquesArr[6]).to({ x: introsX[1], y: introsY[1] }, 500).wait(400).call(handleComplete3_1);
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
    introQuestionText.gotoAndStop(1)
    createjs.Tween.get(introQuestionText).wait(200).to({ alpha: 1 }, 200).call(handleComplete4_1);
}
function handleComplete4_1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.removeAllTweens();
        setArrowTween()
    }
}

function lineTween() {
    if (stopValue == 0) {
        createjs.Ticker.removeEventListener("tick", lineTween);
        removeGameIntro()
    } else {
        if (createjs.Ticker.paused) {

        }
        else {
            if (stopValue == 0) {
                createjs.Ticker.removeEventListener("tick", lineTween);
                removeGameIntro()
            } else {
                if (startValX == 490) {
                  
                    if (startValX1 == 780) {    
                        if (startValY2 == 400) {
                            createjs.Ticker.removeEventListener("tick", lineTween);
                        }
                        else {
                            line1.graphics.beginStroke(color);
                            line1.visible = true
                            line1.graphics.moveTo(startValX2, startValY2);
                            startValX2 -= 15;
                            startValY2 -= 10;
                            line1.graphics.lineTo(startValX2, startValY2);
                            line1.graphics.endStroke();
                        }
                    } else {
                        line1.graphics.beginStroke(color);
                        line1.visible = true
                        line1.graphics.moveTo(startValX1, startValY1);
                        startValX1 += 10;
                        // startValY1 += 10;
                        line1.graphics.lineTo(startValX1, startValY1);
                        line1.graphics.endStroke();

                    }

                } else {
                    line1.graphics.beginStroke(color);
                    line1.visible = true
                    line1.graphics.moveTo(startValX, startValY);
                    startValY -= 10;
                    startValX -= 10;
                    line1.graphics.lineTo(startValX, startValY);
                    line1.graphics.endStroke();

                }
            }
        }
    }

}
function setArrowTween() {
    introquestion.visible = true
    introquestion.x = 493
    introquestion.y =336
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
    createjs.Tween.removeAllTweens();
    createjs.Ticker.removeEventListener("tick", lineTween);
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false

    container.parent.removeChild(introHolder)
    introHolder.visible = false
    container.parent.removeChild(introquestion)
    introquestion.visible = false
    container.parent.removeChild(introQuestionText)
    introQuestionText.visible = false
    container.parent.removeChild(line1)
    line1.visible = false
    for (i = 0; i < 7; i++) {
        container.parent.removeChild(introchoiceArr[i])
        introchoiceArr[i].visible = false;
        container.parent.removeChild(introquesArr[i]);
        introquesArr[i].visible = false;
    }
}