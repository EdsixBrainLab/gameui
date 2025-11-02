var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var highlightTweenArr = []
var TempIntroVal;
var setIntroCnt = 0
var introquestionInterval
var removeIntraval = 0
var introQuestxtX = 0; introQuestxtY = 50;
var introArrowX = 620, introArrowY = 450;
var introfingureX = 650, introfingureY = 500;
var choiceXArr = [100, 320, 540, 760, 980]
var choiceXArr1 = [760, 540, 100, 980, 320]
var choiceYArr = [345, 345, 345, 345, 345]
var chGotoArr = [8, 23, 7, 15, 0]
var chGotoArr1 = [7, 0, 23, 8, 15]
var introChoiceArr = [], introPosArr = []
var ArrowXArr = [825, 605, 165, 1055, 385], FingXArr = [845, 625, 185, 1075, 405]
var ArrowYArr = [200, 200, 200, 200, 200], FingYArr = [380, 380, 380, 380, 380]
var introDummyHolder, introDummyHolder1;
function commongameintro() {
    introTitle = Title.clone()
    for (i = 0; i < 5; i++) {
        introChoiceArr[i] = choice1.clone()
    }
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    for (i = 0; i < 5; i++) {
        introPosArr[i] = posimg.clone()
    }
    introDummyHolder = holder.clone()
    introDummyHolder1 = holder1.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;

    introQuestxt = questiontext.clone()
    container.parent.addChild(introQuestxt);
    introQuestxt.x = 400; introQuestxt.y = 135
    introQuestxt.visible = true;
    introQuestxt.gotoAndStop(0);

    container.parent.addChild(introDummyHolder1);
    introDummyHolder1.x = 305; introDummyHolder1.y = 136
    introDummyHolder1.scaleX = introDummyHolder1.scaleY = 1
    introDummyHolder1.visible = false;

    container.parent.addChild(introDummyHolder);
    introDummyHolder.x = 305; introDummyHolder.y = 136;
    introDummyHolder.scaleX = introDummyHolder.scaleY = .65
    introDummyHolder.visible = false;

    for (i = 0; i < 5; i++) {
        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].x = choiceXArr[i] + 45;
        introChoiceArr[i].y = choiceYArr[i];
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(chGotoArr[i]);
    }
    for (i = 0; i < 5; i++) {

        container.parent.addChild(introPosArr[i])
        introPosArr[i].x = choiceXArr1[i] + 98;
        introPosArr[i].y = choiceYArr[i] + 200;
        introPosArr[i].visible = false;
        introPosArr[i].gotoAndStop(i + 1);
    }

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {
    var tempVal = 500
    for (i = 0; i < 5; i++) {
        introChoiceArr[i].y = choiceYArr[i] - 15;
        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(introChoiceArr[i]).wait(tempVal).to({ y: choiceYArr[i], scaleX: 1, scaleY: 1, alpha: 1 }, tempVal).wait(500).call(handleComplete2_1);
        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(tempVal).to({ y: choiceYArr[i], scaleX: 1, scaleY: 1, alpha: 1 }, tempVal);
        }

        tempVal = tempVal + 150
    }


}
function handleComplete2_1() {
    choiceTween1()
}
function choiceTween1() {

    for (i = 0; i < 5; i++) {
        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 1
        if (i < 4) {
            createjs.Tween.get(introChoiceArr[i]).wait(100).to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).wait(10)

        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(100).to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.06, scaleY: 1.06 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).wait(2000).call(handleComplete4A_11);
        }
    }

}

function handleComplete4A_11() {
    introDummyHolder1.visible = true
    choiceTweenA()
}

function choiceTweenA() {

    for (i = 0; i < 5; i++) {
        if (i < 4) {
            createjs.Tween.get(introChoiceArr[i]).wait(500).to({ x: 600 }, 500)
        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(500).to({ x: 600 }, 500).call(handleComplete4B_11);
        }
    }

}
function handleComplete4B_11() {
    introDummyHolder1.visible = false
    for (i = 0; i < 5; i++) {
        introChoiceArr[i].visible = false;
    }
    introDummyHolder.scaleX = introDummyHolder.scaleY = 1.3
    introDummyHolder.x = 350; introDummyHolder.y = 150
    introDummyHolder.visible = true
    choiceTweenB()
}

function choiceTweenB() {

    createjs.Tween.get(introDummyHolder).wait(500).to({ x: 180, y: 80, scaleX: .7, scaleY: .7 }, 1000).call(handleComplete4_11);


}

function handleComplete4_11() {
    choiceTween()
}

function choiceTween() {

    introQuestxt.gotoAndStop(1);
    for (i = 0; i < 5; i++) {
        introChoiceArr[i].visible = true;
        introChoiceArr[i].x = choiceXArr[i] + 45;
        introChoiceArr[i].gotoAndStop(chGotoArr1[i]);
    }
    createjs.Tween.get(introDummyHolder).wait(100).to({ scaleX: .65, scaleY: .65 }, 200).to({ scaleX: .7, scaleY: .7 }, 200)
        .to({ scaleX: .65, scaleY: .65 }, 200).to({ scaleX: .7, scaleY: .7 }, 200).wait(500).call(handleComplete4_1);
    TempIntroVal = -1;

}

function handleComplete4_1() {

    if (TempIntroVal == -1) { }
    else { introPosArr[TempIntroVal].visible = true; }
    setArrowTween();

}
function setArrowTween() {
    TempIntroVal++;

    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        container.parent.addChild(introArrow);
        introArrow.visible = true;
        introfingure.visible = false;
        introArrow.x = ArrowXArr[TempIntroVal];
        introArrow.y = ArrowYArr[TempIntroVal];
        highlightTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[0])
        highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: ArrowYArr[TempIntroVal] + 10 }, 250).to({ y: ArrowYArr[TempIntroVal] }, 250).to({ y: ArrowYArr[TempIntroVal] + 10 }, 250)
            .to({ y: ArrowYArr[TempIntroVal] }, 250).wait(400).call(this.onComplete1)

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
        introfingure.x = FingXArr[TempIntroVal];
        introfingure.y = FingYArr[TempIntroVal];
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])

        if (TempIntroVal == 4) {

            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300)
                .to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300).wait(200).call(this.onComplete2)
        }
        else {
            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300)
                .to({ x: FingXArr[TempIntroVal] }, 300).to({ x: FingXArr[TempIntroVal] - 15 }, 300).wait(200).call(handleComplete4_1)
        }


    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeAllTweens();

    if (highlightTweenArr[0]) {

        container.parent.removeChild(highlightTweenArr[0]);
    }

    container.parent.removeChild(introArrow);
    if (stopValue == 0) {
        removeGameIntro()

    } else {
        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeAllTweens();
    introPosArr[TempIntroVal].visible = true;
    if (highlightTweenArr[1]) {
        container.parent.removeChild(highlightTweenArr[1]);
    }

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
    createjs.Tween.removeAllTweens();
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introDummyHolder)
    introDummyHolder.visible = false
    container.parent.removeChild(introDummyHolder1)
    introDummyHolder1.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    for (i = 0; i < 5; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false
    }
    for (i = 0; i < 5; i++) {
        container.parent.addChild(introPosArr[i])
        introPosArr[i].visible = false
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