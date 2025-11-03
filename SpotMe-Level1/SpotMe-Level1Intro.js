var introTitle, introArrow, introfingure, introquestion, introHolder;
var introChoice1TweenArr = []
var introchoiceArr = [], introquesArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 870, introArrowY = 290;
var introfingureX = 880, introfingureY = 390;
var introsX = [570, 720, 570, 440];
var introsY = [245, 405, 545, 405];
var introbtnx = [660, 916, 660, 414]
var introbtny = [198, 435, 698, 435]
var introbtnx2 = [640, 790, 640, 510]
var introbtny2 = [298, 435, 598, 435]
var color = "black", line1, line2
var startValX , startValY ,startValX1,startValY1 
function commongameintro() {
    startValX = 640, startValY = 295
    startValX1 = 640, startValY1 = 575
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    introTitle = Title.clone();
    introQuestionText = questionText.clone();
    introHolder = chHolder.clone();
    introquestion = question.clone()
    for (i = 0; i < 2; i++) {
        introquesArr[i] = choice1.clone()
    }
    for (i = 0; i < 4; i++) {
        introchoiceArr[i] = dummy.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true
    container.parent.addChild(introHolder)
    introHolder.visible = false
    introHolder.y = 35;
    container.parent.addChild(introQuestionText)
    introQuestionText.visible = true
    introQuestionText.x = 380
    introQuestionText.y = 90


    /////////////////////////////////////////////////////choice//////////////////////  
    for (i = 0; i < 4; i++) {
        introchoiceArr[i].x = introbtnx2[i];
        introchoiceArr[i].y = introbtny2[i];
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].visible = false;
        introchoiceArr[i].gotoAndStop(i)
    }
    /////////////////////////////////////////////////////question//////////////////////
    container.parent.addChild(introquestion)
    introquestion.visible = false
    introquestion.gotoAndStop(8)
    introquestion.x = 640
    introquestion.y = 200
    introquestion.scaleX = introquestion.scaleY = .7

    for (i = 0; i < 2; i++) {
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
    line1.visible=true
    line2 = new createjs.Shape();
    container.parent.addChild(line2)
    line2.graphics.setStrokeStyle(5);
    line2.graphics.beginStroke(color);
    line2.visible=true
    /////////////////////////////////////////////////////questiontext and holder anim////////////////////// 

    introQuestionText.alpha = 0
    createjs.Tween.get(introQuestionText).wait(500).to({ alpha: 1 }, 500, createjs.Ease.bounceOut).call(handleComplete1_1)
}

function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    introHolder.x = -1700;
    introHolder.visible = true
    createjs.Tween.get(introHolder).
        to({ x: 0, y: introHolder.y }, 500, createjs.Ease.bounceIn);

    var introtempVal2 = 500
    var introRand = [1, 0]
    for (i = 0; i < 2; i++) {
        introquesArr[introRand[i]].visible = true;
        introquesArr[introRand[i]].alpha = 0
        //  createjs.Tween.get(introquesArr[i]).wait(500).to({ x: introquesArr[i].x + 50, alpha: 1 }, 300).to({ x: introquesArr[i].x }, 300, createjs.Ease.bounceOut).wait(300);
        createjs.Tween.get(introquesArr[introRand[i]]).wait(introtempVal2).to({ alpha: 1 }, introtempVal2);
        introtempVal2 += 200;
    }
    introquestion.visible = true
    introquestion.alpha = 0
    createjs.Tween.get(introquestion).wait(2500).to({ y: introquestion.y, alpha: 1 }, 500).to({ y: introquestion.y + 83 }, 1000, createjs.Ease.bounceOut).wait(500).call(handleComplete2_1);

    var introtempVal1 = 1000;
    var introRand1 = [1, 0, 3, 2]
    for (i = 0; i < 4; i++) {
        introchoiceArr[introRand1[i]].visible = true
        introchoiceArr[introRand1[i]].alpha = 0
        createjs.Tween.get(introchoiceArr[introRand1[i]]).wait(introtempVal1).to({ x: introbtnx[introRand1[i]], y: introbtny[introRand1[i]], alpha: 1 }, 500, createjs.Ease.bounceOut).wait(500);
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
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[2], y: introsY[2] }, 1000).wait(1000);
        createjs.Tween.get(introquesArr[1]).to({ x: introsX[0], y: introsY[0] }, 1000).wait(1000).call(introPosChange1);
    }
}
function introPosChange1() {
    if (stopValue == 0) {
        removeGameIntro()
    } else {
        createjs.Tween.get(introquesArr[0]).to({ x: introsX[1], y: introsY[1] }, 1000).wait(1000);
        createjs.Tween.get(introquesArr[1]).to({ x: introsX[3], y: introsY[3] }, 1000).wait(1000).call(handleComplete3_1);
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

// function handleComplete4_1() {
//     if (stopValue == 0) {
//         removeGameIntro()
//     } else {
//         createjs.Tween.removeAllTweens();
//         // lineTween()
//      //   createjs.Ticker.addEventListener("tick", lineTween);
//     }
// }
function lineTween() {
    if( createjs.Ticker.paused ){

    }
    else{
        if (stopValue == 0) {
            createjs.Ticker.removeEventListener("tick", lineTween);
            removeGameIntro()
        } else {
            if (startValY == 575) {
                if (startValY1 == 440) {
                    createjs.Ticker.removeEventListener("tick", lineTween);
                   // handleComplete5_1()
                } else {
                    line2.graphics.beginStroke(color);
                    line2.visible=true
                    line2.graphics.moveTo(startValX1, startValY1);
                    startValX1 += 5;
                    startValY1 -= 5;
                    line2.graphics.lineTo(startValX1, startValY1);
                    line2.graphics.endStroke();
                }
            } else {
                line1.graphics.beginStroke(color);
                line1.visible=true
                line1.graphics.moveTo(startValX, startValY);
                startValY += 10;
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
    introquestion.x = 790
    introquestion.y =440
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
    container.parent.removeChild(introQuestionText)
    introQuestionText.visible = false
    container.parent.removeChild(line1)
    container.parent.removeChild(line2)
    line1.visible=false
    line2.visible=false
    for (i = 0; i < 4; i++) {
        container.parent.removeChild(introchoiceArr[i])
        introchoiceArr[i].visible = false;
    }
    for (i = 0; i < 2; i++) {
        container.parent.removeChild(introquesArr[i]);
        introquesArr[i].visible = false;
    }

}