var introTitle, introArrow, introfingure, introquestion, introquestion1, introquestion2, introHolder;
var introChoice1TweenArr = []
var introchoiceArr = [], introquesArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 355, introArrowY = 160;
var introfingureX = 375, introfingureY = 250;
var introsX = [585, 740, 760, 671, 483, 403, 423];
var introsY = [225, 300, 470, 600, 600, 465, 300];
var introbtnx = [660, 906, 936, 846, 463, 380, 405]
var introbtny = [195, 300, 490, 680, 680, 490, 300]
var introbtnx2 = [660, 801, 831, 801, 513, 490, 525]
var introbtny2 = [285, 300, 490, 680, 680, 490, 300]
var color = "black", line1, line2, cmd
var startValX, startValY, startValX1, startValY1, startValX2, startValY2, startValX3, startValY3, startValX4, startValY4, startValX5, startValY5
function commongameintro() {
    startValX = 550, startValY = 620
    startValX1 = 490, startValY1 = 560
    startValX2 = 760, startValY2 = 560

    startValX3 = 740, startValY3 = 530
    startValX4 = 700, startValY4 = 610
    startValX5 = 550, startValY5 = 610
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    introTitle = Title.clone();
    introQuestionText = questionText.clone();
    introHolder = chHolder.clone();
    introquestion = question.clone()
    introquestion1 = question.clone()
    introquestion2 = question.clone()

    for (i = 0; i < 7; i++) {
        introquesArr[i] = choice1.clone()
        introchoiceArr[i] = dummy.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true
    container.parent.addChild(introHolder)
    introHolder.visible = false
    // introHolder.y = -30
    container.parent.addChild(introQuestionText)
    introQuestionText.visible = true
    introQuestionText.x = 395
    introQuestionText.y = 98;
    introQuestionText.scaleX = introQuestionText.scaleY = 1;
    if(lang == "HindiQuestionText/"){
        introQuestionText.scaleX = introQuestionText.scaleY = .9;
        introQuestionText.x = 410;
        introQuestionText.y = 110;
    }
    /////////////////////////////////////////////////////choice//////////////////////  
    for (i = 0; i < 7; i++) {
        introchoiceArr[i].x = introbtnx2[i];
        introchoiceArr[i].y = introbtny2[i];
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].visible = false;
        introchoiceArr[i].gotoAndStop(i)
    }
    ////////////////////////////////////////////////Line///////////////////////////////////////// 
    line1 = new createjs.Shape();
    container.parent.addChild(line1)
    line1.graphics.setStrokeStyle(3);
    line1.graphics.beginStroke("black");
    line1.visible = true
    line2 = new createjs.Shape();
    container.parent.addChild(line2)
    line2.graphics.setStrokeStyle(3);
    line2.graphics.beginStroke("blue");
    line2.visible = true
    /////////////////////////////////////////////////////question//////////////////////
    container.parent.addChild(introquestion)
    introquestion.visible = false
    introquestion.gotoAndStop(14)
    introquestion.x = 821
    introquestion.y = 435
    introquestion.scaleX = introquestion.scaleY = .7
    container.parent.addChild(introquestion1)
    introquestion1.visible = false
    introquestion1.gotoAndStop(13)
    introquestion1.x = 543
    introquestion1.y = 562
    introquestion1.scaleX = introquestion1.scaleY = .7
    container.parent.addChild(introquestion2)
    introquestion2.visible = false
    introquestion2.gotoAndStop(13)


    if (lang == "EnglishQuestionText/") {
        introquestion2.x = 945;
        introquestion2.y = 95;
    }
    else if (lang == "HindiQuestionText/") {
        introquestion2.x = 940
        introquestion2.y = 100
    }
    else if (lang == "TamilQuestionText/") {
        introquestion2.x = 350
        introquestion2.y = 95
    }
    else if (lang == "GujaratiQuestionText/") {
        introquestion2.x = 600
        introquestion2.y = 95
    }
    else {
        introquestion2.x = 920
        introquestion2.y = 98
    }

    introquestion2.scaleX = introquestion2.scaleY = .7
    /////////////////////////////////////  

    for (i = 0; i < 7; i++) {
        container.parent.addChild(introquesArr[i]);
        introquesArr[i].visible = false;
        introquesArr[i].x = introsX[i];
        introquesArr[i].y = introsY[i];
        introquesArr[i].scaleX = introquesArr[i].scaleY = .8
    }
    /////////////////////////////////////////////////////questiontext and holder anim////////////////////// 
    introQuestionText.gotoAndStop(0)
    introQuestionText.alpha = 0
    createjs.Tween.get(introQuestionText).wait(500).to({ alpha: 1 }, 500, createjs.Ease.bounceOut).call(handleComplete1_1)
}

function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {   // 
    introHolder.x = 1700;
    introHolder.visible = true;
    introHolder.scaleX = introHolder.scaleY = 1.05;
    createjs.Tween.get(introHolder).
        to({ x: -40, y: 0 }, 500, createjs.Ease.bounceIn);

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
    introquestion1.visible = true
    introquestion1.alpha = 0
    createjs.Tween.get(introquestion).wait(3500).to({ y: introquestion.y, alpha: 1 }, 500).to({ y: introquestion.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500).call(handleComplete2_1);
    introquestion1.visible = true
    introquestion1.alpha = 0
    createjs.Tween.get(introquestion1).wait(3500).to({ y: introquestion1.y, alpha: 1 }, 500).to({ y: introquestion1.y + 70 }, 1000, createjs.Ease.bounceOut).wait(500);

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
        introquestion1.visible = false
        createjs.Tween.removeAllTweens();
        introPosChange()
    }
}
function introPosChange() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Ticker.addEventListener("tick", lineTween);
        createjs.Ticker.addEventListener("tick", lineTween1);
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
        createjs.Tween.get(introquesArr[2]).to({ x: introsX[4], y: introsY[4] }, 500).wait(400);
        createjs.Tween.get(introquesArr[3]).to({ x: introsX[5], y: introsY[5] }, 500).wait(400);
        createjs.Tween.get(introquesArr[4]).to({ x: introsX[2], y: introsY[2] }, 500).wait(400);
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[3], y: introsY[3] }, 500).wait(400).call(introPosChange2);
    }
}

function introPosChange2() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[4], y: introsY[4] }, 500).wait(400);
        createjs.Tween.get(introquesArr[1]).to({ x: introsX[0], y: introsY[0] }, 500).wait(400);
        createjs.Tween.get(introquesArr[2]).to({ x: introsX[1], y: introsY[1] }, 500).wait(400);
        createjs.Tween.get(introquesArr[3]).to({ x: introsX[2], y: introsY[2] }, 500).wait(400);
        createjs.Tween.get(introquesArr[4]).to({ x: introsX[6], y: introsY[6] }, 500).wait(400);
        createjs.Tween.get(introquesArr[5]).to({ x: introsX[5], y: introsY[5] }, 500).wait(400);
        createjs.Tween.get(introquesArr[6]).to({ x: introsX[3], y: introsY[3] }, 500).wait(400).call(handleComplete3_1);
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
    introQuestionText.alpha = 0.4;
    introQuestionText.x = 395;
    if (lang == "ArabicQuestionText/") {
        introQuestionText.y = 115;
    }
    if(lang == "HindiQuestionText/"){
        introQuestionText.x = introQuestionText.x + 25;
    }
    introQuestionText.gotoAndStop(1)
    createjs.Tween.get(introQuestionText).wait(200).to({ alpha: 1 }, 200).call(handleComplete4_1);
    introquestion2.visible = true;
    introquestion2.alpha = 0
    createjs.Tween.get(introquestion2).wait(200).to({ alpha: 1 }, 200);
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
        removeGameIntro()
        createjs.Ticker.removeEventListener("tick", lineTween);
    } else {
        if (createjs.Ticker.paused) {

        }
        else {
            if (stopValue == 0) {
                removeGameIntro()
                createjs.Ticker.removeEventListener("tick", lineTween);
            } else {
                if (startValX == 490) {

                    if (startValX1 == 760) {
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
function lineTween1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        if (createjs.Ticker.paused) {

        }
        else {
            // cmd.style = "blue"
            if (stopValue == 0) {
                removeGameIntro()
            } else {
                if (startValX3 == 700) {

                    if (startValX4 == 550) {
                        if (startValY5 == 400) {
                            createjs.Ticker.removeEventListener("tick", lineTween1);
                        }
                        else {
                            line2.graphics.beginStroke("blue");
                            line2.visible = true
                            line2.graphics.moveTo(startValX5, startValY5);
                            startValX5 += 10;
                            startValY5 -= 10;
                            line2.graphics.lineTo(startValX5, startValY5);
                            line2.graphics.endStroke();
                        }
                    } else {
                        line2.graphics.beginStroke("blue");
                        line2.visible = true
                        line2.graphics.moveTo(startValX4, startValY4);
                        startValX4 -= 10;
                        line2.graphics.lineTo(startValX4, startValY4);
                        line2.graphics.endStroke();
                    }
                } else {
                    line2.graphics.beginStroke("blue");
                    line2.visible = true
                    line2.graphics.moveTo(startValX3, startValY3);
                    startValY3 += 20;
                    startValX3 -= 10;
                    line2.graphics.lineTo(startValX3, startValY3);
                    line2.graphics.endStroke();
                }
            }
        }
    }
}
function setArrowTween() {
    introquestion.x = 800
    introquestion.y = 325
    introquestion1.x = 483
    introquestion1.y = 337
    introquestion.visible = true
    introquestion1.visible = true
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
    line1.visible = false
    line2.visible = false
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
    container.parent.removeChild(introquestion1)
    introquestion1.visible = false
    container.parent.removeChild(introquestion2)
    introquestion2.visible = false
    container.parent.removeChild(introQuestionText)
    introQuestionText.visible = false
    container.parent.removeChild(line1)
    line1.visible = false
    container.parent.removeChild(line2)
    line2.visible = false
    for (i = 0; i < 7; i++) {
        container.parent.removeChild(introchoiceArr[i])
        introchoiceArr[i].visible = false;
        container.parent.removeChild(introquesArr[i]);
        introquesArr[i].visible = false;
    }
}