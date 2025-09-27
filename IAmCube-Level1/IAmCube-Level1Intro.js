var introTitle, introQuestxt, introQues, introQues1, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4, introchoice5
var introQuesX = 420, introQuesY = 320;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 260, introArrowY = 490;
var introfingureX = 290, introfingureY = 580;
var IntroArr = []
var introVal = 0;
function commongameintro() {
    introTitle = Title.clone();
    introQues = question1.clone();
    introQues1 = question.clone();
    introchoice1 = choice1.clone();
    introchoice2 = choice2.clone();
    introchoice3 = choice3.clone();
    introchoice4 = choice4.clone();
    introchoice5 = choice5.clone();
    // introHolder = chHolder.clone()
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    introQuestxt = questionText.clone();
    container.parent.addChild(introTitle)
    introTitle.visible = true;

    introVal = 0;
    container.parent.addChild(introQues1)
var INTRO_TITLE_Y = 96;
var INTRO_PROMPT_Y = 224;
    if (lang == "ArabicQuestionText/") {
        introQues1.x = 850; introQues1.y = 130;
        introQues1.scaleX = introQues1.scaleY = .7
    }
    else {
        introQues1.x = 860
        introQues1.y = 120
        introQues1.scaleX = introQues1.scaleY = 1
    }
    introQues1.gotoAndStop(2)
    // container.parent.addChild(introHolder)
    container.parent.addChild(introQues)
    introQues.visible = false;
    introQues.x = introQuesX
    introQues.y = introQuesY
    introQues.gotoAndStop(2)

    for (i = 1; i < 6; i++) {
        this["introchoice" + i].x = 90 + (i * 180);
        this["introchoice" + i].y = 600;
        container.parent.addChild(this["introchoice" + i])
        this["introchoice" + i].visible = false;
        this["introchoice" + i].scaleX = this["introchoice" + i].scaleY = 1.1;
        this["introchoice" + i].gotoAndStop(2);

    }

    container.parent.addChild(introImg)
    introImg.gotoAndStop(0)
    introImg.visible = false;
    introImg.x = 530;
    introImg.y = 300;
    introImg.scaleX = introImg.scaleY = .6

    container.parent.addChild(introImg1)
    introImg1.visible = false;
    introImg1.regX = introImg1.regY = 50;
    introImg1.scaleX = introImg1.scaleY = .8;
    introImg1.x = 960;
    introImg1.y = 300;

    container.parent.addChild(introImg2)
    introImg2.visible = false;
    introImg2.regX = introImg2.regY = 50;
    introImg2.scaleX = introImg2.scaleY = .8;
    introImg2.x = 960;
    introImg2.y = 300;

    container.parent.addChild(introImg3)
    introImg3.visible = false;
    introImg3.regX = introImg3.regY = 50;
    introImg3.scaleX = introImg3.scaleY = .8;
    introImg3.x = 960;
    introImg3.y = 300;

    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    introQues1.visible = true;
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        quesTween()
    }
}
function quesTween() {
    // introHolder.visible = true
    introQues.visible = true;
    introQues.x = -400;
    createjs.Tween.get(introQues).wait(500).to({ x: 1200, scaleX: .85, scaleY: .85, alpha: 1 }, 300)
        .to({ x: 510, scaleX: 1, scaleY: 1, alpha: 1 }, createjs.Ease.bounceInOut).call(handleComplete2_1)

}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        choiceTween()
    }
}
function choiceTween() {

    introQues1.visible = true;
    var temp = 200;


    for (i = 1; i < 6; i++) {
        this["introchoice" + i].visible = true;
        this["introchoice" + i].alpha = 0;
        if (i == 5) {

            createjs.Tween.get(this["introchoice" + i]).wait(temp)
                .to({ alpha: 1, x: this["introchoice" + i].x, y: 610 }, 1500, createjs.Ease.bounceOut).wait(500).call(handleComplete3_1)
        }
        else {


            createjs.Tween.get(this["introchoice" + i]).wait(temp)
                .to({ alpha: 1, x: this["introchoice" + i].x, y: 610 }, 1500, createjs.Ease.bounceOut)
        }

        temp = temp + 200;
    }
}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh()
    }
}
function introCh() {
    introImg.visible = true;
    createjs.Tween.get(introImg).to({ x: 930, y: 250 }, 500)
        .to({ scaleX: .7, scaleY: .7 }, 200).wait(1000).call(handleComplete4_1)
    introVal++;
}
function handleComplete4_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh1()
    }
}
function introCh1() {
    if (introVal == 7) {
        introImg.gotoAndStop(introVal)
        createjs.Tween.get(introImg).to({ visible: true }, 500).wait(500).call(handleComplete5_1)
    }
    else {
        introImg.gotoAndStop(introVal)
        createjs.Tween.get(introImg).to({ visible: true }, 500).wait(500).call(handleComplete4_1)
    }
    introVal++;
}
function handleComplete5_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh2()
    }
}
function introCh2() {
    createjs.Tween.get(introImg).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).wait(500)
    // createjs.Tween.get(introImg).to({x:introImg.x+200,y:introImg.y-50 ,scaleX:-1,scaleY:1}, 1000)
    createjs.Tween.get(introImg).wait(600).to({ visible: false });

    createjs.Tween.get(introImg1).wait(600).to({ visible: true })
        //     , scaleX: .85, scaleY: .85 }, 500)
        // .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        // .to({ scaleX: .8, scaleY: .8 }, 500).wait(500)
        .wait(1000)
        .call(handleComplete6_1)
}
function handleComplete6_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh3()
    }
}
function introCh3() {

    createjs.Tween.get(introImg1).to({ x: introImg1.x + 110, scaleX: -.8, scaleY: .8 }, 1000)
    createjs.Tween.get(introImg1).wait(600).to({ visible: false }, 500);
    introImg2.visible = true;
    introImg2.alpha = 0
    createjs.Tween.get(introImg2).wait(600).to({ alpha: 1, scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).wait(1000).call(handleComplete7_1)
}
function handleComplete7_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh4()
    }
}
function introCh4() {
    createjs.Tween.get(introImg3).to({ visible: true, scaleX: .85, scaleY: .85 }, 100)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .85, scaleY: .85 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).wait(1000).call(handleComplete8_1)
}
function handleComplete8_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        setArrowTween()
    }
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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    createjs.Tween.removeAllTweens();
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    container.parent.removeChild(introQues);
    introQues.visible = false
    container.parent.removeChild(introQues1);
    introQues1.visible = false
    // container.parent.removeChild(introHolder);
    // introHolder.visible = false
    container.parent.removeChild(introchoice1)
    introchoice1.visible = false
    container.parent.removeChild(introchoice2)
    introchoice2.visible = false
    container.parent.removeChild(introchoice3)
    introchoice3.visible = false
    container.parent.removeChild(introchoice4)
    introchoice4.visible = false
    container.parent.removeChild(introchoice5)
    introchoice5.visible = false

    container.parent.removeChild(introImg)
    introImg.visible = false;
    container.parent.removeChild(introImg1)
    introImg1.visible = false;
    container.parent.removeChild(introImg2)
    introImg2.visible = false;
    container.parent.removeChild(introImg3)
    introImg3.visible = false;

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }
    for (i = 1; i < 6; i++) {
        container.parent.removeChild(this["introchoice" + i])
        this["introchoice" + i].visible = false;

    }
}