var introArrow, introquestion, introquestionText, introfingure, introTitle, introHolder, introYes, introNo;
var introquesArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introChoiceX = [, 163, 585, 1018]
var introChoiceY = 233
var introArrowX = 660, introArrowY = 500;
var introfingureX = 690, introfingureY = 590;
var introquestionX = 1015; introquestionY = -240;
// var introquestionTextX = 270, introquestionTextY = 155////////////Eng
var introquestionTextX = 310, introquestionTextY = 130
var introyesx = 660, introyesy = 630;
var intronox = 1040; intronoy = 630;

function commongameintro() {
    introTitle = Title.clone()
    introHolder = qhHolder.clone()
    introquestion = question.clone()
    introArrow = arrow1.clone()
    introquestionText = questionText.clone()
    introfingure = fingure.clone()
    introYes = yesMc.clone()
    introNo = noMc.clone()
    for (i = 1; i <= 3; i++) {
        introquesArr[i] = choice1.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introHolder)
    introHolder.visible = false;
    container.parent.addChild(introHintImg)
    introHintImg.visible = false;
    introHintImg.rotation = 0
    introHintImg.x = 310
    introHintImg.y = 150
    container.parent.addChild(introHintImg1)
    introHintImg1.visible = false;
    container.parent.addChild(introHintImg2)
    introHintImg2.visible = false;
    introHintImg1.x = 310
    introHintImg1.y = 200
    container.parent.addChild(introquestion)
    introquestion.visible = false
    container.parent.addChild(introYes)
    introYes.visible = false
    container.parent.addChild(introNo)
    introNo.visible = false
    container.parent.addChild(introquestionText);
    introquestionText.visible = true;
    introquestionText.scaleX = introquestionText.scaleY = 1;
    console.log('lang '+lang);
    if (lang == "TamilQuestionText/") {
        introquestionText.x = 340;
        introquestionText.y = 130;
    } else if (lang == "ArabicQuestionText/") {
        introquestionText.scaleY = 1.2;
        introquestionText.scaleY = 1.7;
        introquestionText.x = 315;
        introquestionText.y = 130;
    }
    else {
        introquestionText.x = introquestionTextX
        introquestionText.y = introquestionTextY
    }


    for (i = 1; i <= 3; i++) {
        container.parent.addChild(introquesArr[i])
        introquesArr[i].visible = false;
        introquesArr[i].x = -1900
        introquesArr[i].y = introChoiceY
        introquesArr[i].gotoAndStop(4 + i);
        introquesArr[i].scaleX = introquesArr[i].scaleY = 1.2
    }

    introNo.x = intronox
    introNo.y = intronoy
    introYes.x = introyesx
    introYes.y = introyesy
    introquestion.x = introquestionX
    introquestion.y = introquestionY

    introquestionText.alpha = 0;
    introquestionText.gotoAndStop(0)
    createjs.Tween.get(introquestionText).to({ alpha: 1 }, 1000).call(handleComplete1_1);

}

function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {

    var introtempVal = 0;
    for (i = 1; i <= 3; i++) {
        introquesArr[i].visible = true
        introquesArr[i].alpha = 0.2
        if (i == 3) {
            createjs.Tween.get(introquesArr[i]).wait(1000).to({ alpha: 1, x: introChoiceX[i] }, introtempVal, createjs.Ease.bounceOut).wait(2500).call(handleComplete2_1);
        } else {
            createjs.Tween.get(introquesArr[i]).wait(1000).to({ alpha: 1, x: introChoiceX[i] }, introtempVal, createjs.Ease.bounceOut);
        }
        introtempVal += 400;
    }
}

function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
    // setArrowTween()
}
function choiceTween() {
    var introvalX = [, 430, 600, 720]
    // var introvalY=[,380,700]
    for (i = 1; i <= 3; i++) {
        createjs.Tween.get(introquesArr[i]).wait(50).to({ x: introvalX[i], y: 290, scaleX: .9, scaleY: .9 }, 500).to({ alpha: 1 })
    }
    introHintImg1.visible = true;
    introHintImg1.alpha = 0
    createjs.Tween.get(introHintImg1).to({ alpha: 1, scaleX: .7, scaleY: .7 }, 300)
        .to({ scaleX: .8, scaleY: .8 }, 300).call(handleComplete3_1);

}

function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    choiceTween1()
}
function choiceTween1() {
    for (i = 1; i <= 3; i++) {
        introquesArr[i].visible = false;
    }
    introHintImg1.visible = false;
    introHintImg.visible = true;
    introHintImg.scaleX = introHintImg.scaleY = .8
    createjs.Tween.get(introHintImg).to({ alpha: 1, scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 1000);

    createjs.Tween.get(introHintImg).wait(3000).to({ scaleX: .5, scaleY: .5, x: 20, y: 250 }, 500).wait(500).call(handleComplete4_1);

}

function handleComplete4_1() {
    createjs.Tween.removeAllTweens();
    choiceTween2()
}

function choiceTween2() {
    // introHintImg.rotation=340
    introquestionText.gotoAndStop(1)
    introquestionText.visible = true;
    introquestionText.alpha = 0
    createjs.Tween.get(introquestionText).wait(400).to({ alpha: 1 }, 200);

    introHintImg2.visible = true;
    introHintImg2.alpha = 0
    createjs.Tween.get(introHintImg2).wait(1000).to({ alpha: 1 }, 600, createjs.Ease.bounceOut);


    createjs.Tween.get(introYes).wait(2000)
        .to({ visible: true, alpha: .5, rotation: 180, scaleX: .4, scaleY: .4 }, 600)
        .to({ visible: true, alpha: 1, rotation: 360, scaleX: .8, scaleY: .8 }, 1000)

    createjs.Tween.get(introNo).wait(2500)
        .to({ visible: true, alpha: .5, rotation: 180, scaleX: .4, scaleY: .4 }, 600)
        .to({ visible: true, alpha: 1, rotation: 360, scaleX: .8, scaleY: .8 }, 1000).wait(1000).call(handleComplete5_1)



}
function handleComplete5_1() {
    createjs.Tween.removeAllTweens();
    setArrowTween()
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
    createjs.Tween.removeAllTweens();
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false
    container.parent.removeChild(introHolder)
    introHolder.visible = false
    container.parent.removeChild(introquestion)
    introquestion.visible = false
    container.parent.removeChild(introquestionText)
    introquestionText.visible = false
    container.parent.removeChild(introNo)
    introNo.visible = false
    container.parent.removeChild(introYes)
    introYes.visible = false
    container.parent.removeChild(introHintImg)
    introHintImg.visible = false
    container.parent.removeChild(introHintImg1)
    introHintImg1.visible = false
    container.parent.removeChild(introHintImg2)
    introHintImg2.visible = false
    for (i = 1; i <= 3; i++) {
        container.parent.removeChild(introquesArr[i])
        introquesArr[i].visible = false
    }
}