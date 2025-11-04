var introQues1, introChoice1, introChoice2, introChoice3, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQues1X = 100, introQues1Y = 300
var introChoice1X = 143, introChoice1Y = -550;
var introChoice2X = 533, introChoice2Y = -550;
var introChoice3X = 923, introChoice3Y = -550;
var introArrowX = 220, introArrowY = 190;
var introfingureX = 280, introfingureY = 400;
var choiceYArr = [, 300, 300, 300]
var introDummyHolder;
function commongameintro() {
    introTitle = Title.clone()
    introQues1 = question.clone()
    introChoice1 = choice1.clone()
    introChoice2 = choice2.clone()
    introChoice3 = choice3.clone()
    introDummyHolder = holder.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    showQuestionPrompt(ANIMALWATCH_PROMPT_OBSERVE, { duration: 1000, onComplete: handleComplete1_1 });
    container.parent.addChild(introQues1)
    introQues1.x = introQues1X;
    introQues1.y = introQues1Y;
    introQues1.visible = false;
    introQues1.scaleX = introQues1.scaleY = 1.2;
    introQues1.gotoAndStop(0);


    container.parent.addChild(introDummyHolder);
    introDummyHolder.x = 220; introDummyHolder.y = 110
    introDummyHolder.scaleX = introDummyHolder.scaleY = .42
    introDummyHolder.visible = false;


    container.parent.addChild(introChoice1)
    introChoice1.x = introChoice1X;
    introChoice1.y = introChoice1Y;
    introChoice1.visible = true;
    introChoice1.scaleX = introChoice1.scaleY = .9
    introChoice1.gotoAndStop(0);
    container.parent.addChild(introChoice2)
    introChoice2.visible = true;
    introChoice2.x = introChoice2X;
    introChoice2.y = introChoice2Y;
    introChoice2.scaleX = introChoice2.scaleY = .9
    introChoice2.gotoAndStop(0)
    container.parent.addChild(introChoice3)
    introChoice3.visible = true;
    introChoice3.x = introChoice3X;
    introChoice3.y = introChoice3Y;
    introChoice3.scaleX = introChoice3.scaleY = .9
    introChoice3.gotoAndStop(0)

}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {

    introQues1.gotoAndStop(0);
    introQues1.visible = true;
    createjs.Tween.get(introQues1).wait(500).to({ alpha: 1 }, 500).wait(100).to({ scaleX: 1.24, scaleY: 1.24 }, 200).to({ scaleX: 1.2, scaleY: 1.2 }, 200)
        .to({ scaleX: 1.24, scaleY: 1.24 }, 200).to({ scaleX: 1.2, scaleY: 1.2 }, 200).wait(1500).call(handleComplete2_1);



}
function handleComplete2_1() {
    introQues1.visible = false;
    choiceTween()
}
function choiceTween() {
    showQuestionPrompt(getScenarioQuestionText(0), { duration: 1000 });
    var tempVal = 1500
    for (i = 3; i >= 1; i--) {
        this["introChoice" + i].visible = true;
        if (i > 1) {

            createjs.Tween.get(this["introChoice" + i])
                .to({ y: 330 }, tempVal, createjs.Ease.bounceOut).wait(tempVal);
        }
        else {
            createjs.Tween.get(this["introChoice" + i])
                .to({ y: 330 }, tempVal, createjs.Ease.bounceOut).wait(tempVal).call(handleComplete4_11);
        }
        tempVal = tempVal + 500

    }

}
function handleComplete4_11() {

    choiceTween1()
}

function choiceTween1() {

    introDummyHolder.visible = true
    introDummyHolder.alpha = 0;
    createjs.Tween.get(introDummyHolder).to({ alpha: 1 }, 1000).wait(1500).call(handleComplete4_1);

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
        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).wait(200).call(this.onComplete2)

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

    // // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        container.parent.removeChild(highlightTweenArr[1]);
    }
    // // }
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
    container.parent.removeChild(introQues1)
    introQues1.visible = false
    container.parent.removeChild(introChoice1)
    introChoice1.visible = false
    container.parent.removeChild(introChoice2)
    introChoice2.visible = false
    container.parent.removeChild(introChoice3)
    introChoice3.visible = false
    container.parent.removeChild(introDummyHolder)
    introDummyHolder.visible = false
    hideQuestionPrompt();

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
}