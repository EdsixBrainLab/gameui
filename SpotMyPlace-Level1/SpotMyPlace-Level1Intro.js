var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var TempIntroVal;
var introrepTimeClearInterval = 0
var introQuestxtX = 390; introQuestxtY = 140;
var introQuesX = 100; introQuesY = 300;
var introArrowX = 620, introArrowY = 100;
var introfingureX = 650, introfingureY = 300;
var choiceXArr = [200, 450, 700, 200, 450, 700];
var choiceYArr = [250, 250, 250, 500, 500, 500];
var choiceXArr1 = [200, 450, 700, 200, 450, 700];
var choiceYArr1 = [258, 258, 258, 490, 490, 490];
var introDummyHolder

var introChoiceArr = [], introChoiceHolderArr = []
function commongameintro() {
    introTitle = Title.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introQues = question.clone()
    introDummyHolder = holder.clone()
    for (i = 0; i < 6; i++) {
        introChoiceArr[i] = choice1.clone()
    }
    for (i = 0; i < 6; i++) {
        introChoiceHolderArr[i] = choiceMc.clone()
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    container.parent.addChild(introQues)
    introQues.visible = false;
    introQues.x = introQuesX; introQues.y = introQuesY

    introQuestxt = questiontext.clone()
    container.parent.addChild(introQuestxt);
    introQuestxt.x = introQuestxtX; introQuestxt.y = introQuestxtY
    introQuestxt.visible = true;


    for (i = 0; i < 6; i++) {
        container.parent.addChild(introChoiceHolderArr[i])
        introChoiceHolderArr[i].x = choiceXArr1[i] + 350;
        introChoiceHolderArr[i].y = choiceYArr1[i] - 50;
        introChoiceHolderArr[i].visible = false;
        introChoiceHolderArr[i].scaleX = introChoiceHolderArr[i].scaleY = .9
    }
    for (i = 0; i < 6; i++) {
        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].x = choiceXArr[i] + 350;
        introChoiceArr[i].y = choiceYArr[i];
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(i);
        introChoiceArr[i].scaleX = introChoiceArr[i].scaleY = 1
    }


    container.parent.addChild(introDummyHolder)
    introDummyHolder.visible = false;
    // introDummyHolder.scaleX = introDummyHolder.scaleY = .7
    introDummyHolder.x = 210
    introDummyHolder.y = 135

    introQuestxt.gotoAndStop(0)
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {
    var tempVal = 700
    for (i = 0; i < 6; i++) {

        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 0;
        if (i == 5) {
            createjs.Tween.get(introChoiceArr[i]).wait(tempVal).to({ alpha: 1, scaleX: 1, scaleY: 1 }, tempVal).wait(500).call(handleComplete2_1);
        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(tempVal).to({ alpha: 1, scaleX: 1, scaleY: 1 }, tempVal);
        }

        tempVal = tempVal + 60
    }


}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
}
function choiceTween() {
    for (i = 0; i < 6; i++) {

        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 1
        if (i < 5) {
            createjs.Tween.get(introChoiceArr[i]).wait(100).to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).wait(10)

        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(100).to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).wait(1500).call(handleComplete4_11);
        }
    }

}
function handleComplete4_11() {
    createjs.Tween.removeAllTweens();
    SetIntroQues();
}
function SetIntroQues() {
    for (i = 0; i < 6; i++) {
        introChoiceArr[i].visible = false;
    }
    introQuestxt.gotoAndStop(1)
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 300)
    introQues.visible = true
    introQues.alpha = 0;
    createjs.Tween.get(introQues).to({ alpha: 1 }, 300)
    var tempVal = 900
    for (i = 0; i < 6; i++) {

        introChoiceHolderArr[i].visible = true;
        introChoiceHolderArr[i].alpha = 0;
        if (i == 5) {
            createjs.Tween.get(introChoiceHolderArr[i]).wait(tempVal).to({ alpha: 1, scaleX: .9, scaleY: .9 }, tempVal).call(handleComplete4A_11);
        }
        else {
            createjs.Tween.get(introChoiceHolderArr[i]).wait(tempVal).to({ alpha: 1, scaleX: .9, scaleY: .9 }, tempVal);
        }

        tempVal = tempVal + 60
    }

}


function handleComplete4A_11() {
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        choiceTweenA()
    }
}
function choiceTweenA() {
    introDummyHolder.visible = true;
    introDummyHolder.alpha = 0
    createjs.Tween.get(introDummyHolder).wait(500).to({ alpha: 1 }, 800).call(handleComplete6_1);

}
function handleComplete6_1() {
    choiceTween3();
}
function choiceTween3() {
    introDummyHolder.visible = true
    createjs.Tween.get(introDummyHolder).wait(500).to({ scaleX: .9, scaleY: .9 }, 250).to({ scaleX: 1, scaleY: 1 }, 250)
        .to({ scaleX: .9, scaleY: .9 }, 250).to({ scaleX: 1, scaleY: 1 }, 250).wait(1000).call(handleComplete4_1);

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

    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        container.parent.removeChild(highlightTweenArr[0]);
    }

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

    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        container.parent.removeChild(highlightTweenArr[1]);
    }

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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false

    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    container.parent.removeChild(introQues)
    introQues.visible = false
    container.parent.removeChild(introDummyHolder)
    introDummyHolder.visible = false
    for (i = 0; i < 6; i++) {
        container.parent.removeChild(introChoiceHolderArr[i])
        introChoiceHolderArr[i].visible = false

        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false
    }

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