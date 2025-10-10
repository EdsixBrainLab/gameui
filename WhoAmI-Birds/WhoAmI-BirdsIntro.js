
var introQues, introTitle, introQuestxt, introArrow, introfingure;
var introChoiceQues = []
var introchoiceArr = []
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuesTextX = 0, introQuesTextY = -50;
var introQuesX = QUESTION_CENTER_X, introQuesY = QUESTION_BASE_Y - 160;
var introArrowX = QUESTION_CENTER_X + 165, introArrowY = CHOICE_BASE_Y - 20;
var introfingureX = QUESTION_CENTER_X + 210, introfingureY = CHOICE_BASE_Y + 35;
function commongameintro() {
    introTitle = Title.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    introQues = question.clone();
    introQuestxt = chHolderMC.clone();
    introArrow = arrow1.clone();
    introfingure = fingure.clone()

    container.parent.addChild(introQues)
    introQues.x = introQuesX;
    introQues.y = introQuesY;
    introQues.visible = false;
    introQues.gotoAndStop(4);


    //////////////////////////////////////////////////////////////////////////

    for (i = 0; i < 4; i++) {
        introChoiceQues[i] = question1.clone()
        container.parent.addChild(introChoiceQues[i])
        introChoiceQues[i].visible = false
        introChoiceQues[i].y = QUESTION_BASE_Y;
        introChoiceQues[i].gotoAndStop(i);
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = 1.1;
    }
    for (i = 0; i < 3; i++) {
        introchoiceArr[i] = choice1.clone()
        introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = CHOICE_SCALE;
        introchoiceArr[i].visible = false;
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].x = QUESTION_CENTER_X - CHOICE_SPACING + (i * CHOICE_SPACING);
        introchoiceArr[i].y = CHOICE_BASE_Y;
    }

    positionIntroLetters(4);

    ////////////////////////////////////////////////////////////////////////////////////
    container.parent.addChild(introQuestxt)
    introQuestxt.alpha = 0;
    introQuestxt.y = introQuesTextY
    createjs.Tween.get(introQuestxt).to({ x: introQuesTextX, y: 0, visible: true, alpha: 1 }, 800, createjs.Ease.quadOut)
        .call(handleComplete1_1);

}

function positionIntroLetters(letterCount) {
    var spacing = getLetterSpacing ? getLetterSpacing(letterCount) : QUESTION_LETTER_SPACING;
    var totalWidth = (letterCount - 1) * spacing;
    var startX = QUESTION_CENTER_X - totalWidth / 2;
    for (i = 0; i < letterCount; i++) {
        introChoiceQues[i].x = startX + (i * spacing);
    }
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    introQues.visible = true;
    introQues.alpha = 0;
    introQues.scaleX = introQues.scaleY = .6
    createjs.Tween.get(introQues).wait(200).to({ alpha: 1, scaleX: .82, scaleY: .82 }, 320, createjs.Ease.backOut)
        .to({ scaleX: .8, scaleY: .8 }, 180)
        .call(handleComplete2_1)

}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    QueschoiceTween()
}
function QueschoiceTween() {
    var time1 = 350
    for (i = 0; i < 4; i++) {
        introChoiceQues[i].visible = true
        introChoiceQues[i].alpha = 0;
        introChoiceQues[0].gotoAndStop(2);
        introChoiceQues[1].gotoAndStop(17);
        introChoiceQues[2].gotoAndStop(26);
        introChoiceQues[3].gotoAndStop(22);
        introChoiceQues[i].y = QUESTION_BASE_Y - 25;
        if (i == 3) {

            createjs.Tween.get(introChoiceQues[i]).wait(time1)
                .to({ alpha: 1, y: QUESTION_BASE_Y }, 250, createjs.Ease.quadOut)

                .call(handleComplete3_1)
        }
        else {
            createjs.Tween.get(introChoiceQues[i]).wait(time1)
                .to({ alpha: 1, y: QUESTION_BASE_Y }, 250, createjs.Ease.quadOut)

        }
        time1 = time1 + 120
    }

}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
}
function choiceTween() {
    var val = 650
    for (i = 0; i < 3; i++) {
        introchoiceArr[i].visible = true;
        introchoiceArr[i].alpha = 0
        introchoiceArr[i].gotoAndStop(i + 7);
        introchoiceArr[2].gotoAndStop(14);
        introchoiceArr[i].scaleX = CHOICE_SCALE - 0.08;
        introchoiceArr[i].y = CHOICE_BASE_Y + 80;
        if (i == 2) {
            createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: CHOICE_BASE_Y, scaleX: CHOICE_SCALE + 0.08, scaleY: CHOICE_SCALE + 0.08, alpha: 1 }, 260, createjs.Ease.quadOut)
                .to({ scaleX: CHOICE_SCALE, scaleY: CHOICE_SCALE }, 180, createjs.Ease.quadOut)
                .call(handleComplete3_2)
        } else {
            createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: CHOICE_BASE_Y, scaleX: CHOICE_SCALE + 0.08, scaleY: CHOICE_SCALE + 0.08, alpha: 1 }, 260, createjs.Ease.quadOut)
                .to({ scaleX: CHOICE_SCALE, scaleY: CHOICE_SCALE }, 180, createjs.Ease.quadOut)
        }
        val = val + 150
    }
}
function handleComplete3_2() {
    createjs.Tween.removeAllTweens();
    setTimeout(setArrowTween, 500)

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
        highlightTweenArr[0] = createjs.Tween.get(introArrow)
            .to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350).wait(400).call(this.onComplete1)
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
            .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
            .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
            .wait(200).call(this.onComplete2)
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
        console.log("setCallDelay  == stopValue")
        introChoiceQues[2].visible = true
        introChoiceQues[2].gotoAndStop(14);
        createjs.Tween.get(introChoiceQues[2])
            .to({ alpha: 1 }, 500)
            .wait(400)
        createjs.Tween.get(introchoiceArr[2])
            .to({ alpha: 1, scaleX: CHOICE_SCALE + 0.12, scaleY: CHOICE_SCALE + 0.12 }, 350, createjs.Ease.backOut)
            .wait(350)
            .call(setCallDelay)
    }
    // setTimeout(setCallDelay, 1000)

}
function setCallDelay() {
    createjs.Tween.removeAllTweens();
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
    container.parent.removeChild(introQues)
    introQues.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    for (i = 0; i < 4; i++) {
        introChoiceQues[i].visible = false
        container.parent.removeChild(introChoiceQues[i])
    }
    for (i = 0; i < 3; i++) {
        introchoiceArr[i].visible = false
        container.parent.removeChild(introchoiceArr[i])
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