var introTitle, introQuestxt, introQuestxt1, introQues, introArrow, introfingure, introHolder
var introQuesX = 210, introQuesY = 250;
var introArr = []
var highlightTweenArr = []
var val = [4, 0, 27, 7, 3]
var setIntroCnt = 0
var removeIntraval = 0
var posY = []
var introArrowX = 537, introArrowY = 300;
var introfingureX = 580, introfingureY = 448;
var inc = 0, j = 0
function commongameintro() {
    introTitle = Title.clone()
   // introHolder = qHolderMc.clone()
    introQues = question.clone()
    introChoice1 = choice1.clone()
    introChoice2 = choice2.clone()
    introChoice3 = choice3.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introQuestxt = queText.clone();
    if (isEnglishQuestionText) {
        introQuestxt1 = createQuestionTextDisplay(getQuestionPrompt(3));
    } else {
        introQuestxt1 = questionText.clone();
    }


    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introQuestxt1);
    introQuestxt1.visible = false;
    if (!isEnglishQuestionText) {
        introQuestxt1.regX = introQuestxt1.regY = 50
        introQuestxt1.x = 430; introQuestxt1.y = 180;
        introQuestxt1.gotoAndStop(3)
    } else {
        introQuestxt1.alpha = 0;
    }

    // container.parent.addChild(introHolder)
    // introHolder.visible = false;

    container.parent.addChild(introQues)
    introQues.scaleX=introQues.scaleY=1.3
    introQues.visible = false;
    introQues.x = introQuesX
    introQues.y = introQuesY

    container.parent.addChild(introChoice1, introChoice2, introChoice3);
    introChoice1.scaleX = introChoice1.scaleY = .7
    introChoice2.scaleX = introChoice2.scaleY = .7
    introChoice3.scaleX = introChoice3.scaleY = .7
    introChoice1.x = 495; introChoice1.y = 480;
    introChoice2.x = 700; introChoice2.y = 280;
    introChoice3.x = 930; introChoice3.y = 480;
    posY = [, 370, 370, 370]

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.regX = introImg.regY = 50
    // introImg.scaleX=introImg.scaleY=.7
    introImg.y = 120;
    introImg.x = 70;

    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;
  /*   introQuestxt.x = -130;  
    introQuestxt.y = -60;
    introQuestxt.alpha = 1;
    introQuestxt.scaleX = introQuestxt.scaleY = 1.2; */
    handleComplete1_1();
    /* createjs.Tween.get(introQuestxt).wait(50).to({alpha:1, x: 0,y:-15}, 500, createjs.Ease.bounceOut).call(handleComplete1_1); */
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    introQues.visible = true;
    introQues.x = 1000;
    createjs.Tween.get(introQues).to({alpha:1, x: 70,y:51 }, 500, createjs.Ease.bounceOut).wait(4000).call(handleComplete2_1)


}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    introQuestxt.visible = false;
    introQues.visible = false;

    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introRemember()

    }
}
function introRemember() {
introQuestxt1.visible=true
    introImg.y = 0
    createjs.Tween.get(introImg).to({ visible: true }).to({ alpha: 0 }).to({ alpha: 1, y: 240 }, 500).call(handleComplete4_1);



}
function handleComplete4_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {

        choiceTween()
    }
}
function choiceTween() {

    // introHolder.visible = true;
    // introHolder.scaleX = introHolder.scaleY = .8
    // introHolder.x = 1000;
    // introHolder.y = 100;
    // createjs.Tween.get(introHolder).wait(100).to({ x: 330 }, 500, createjs.Ease.bounceOut)

    var temp1 = 500;
    for (i = 1; i <= 3; i++) {

        this["introChoice" + i].visible = true;
        this["introChoice" + i].y = 1000;
        if (i == 3) {
            createjs.Tween.get(this["introChoice" + i]).wait(temp1).to({ y: posY[i] }, 1000, createjs.Ease.bounceOut).wait(300).call(handleComplete5_1);

        }
        else {
            createjs.Tween.get(this["introChoice" + i]).wait(temp1).to({ y: posY[i] }, 1000, createjs.Ease.bounceOut)

        }
        temp1 += 200;
    }
}

function handleComplete5_1() {

    createjs.Tween.removeAllTweens();
    introCh();
}
function introCh() {
    createjs.Tween.get(introQuestxt1).to({ alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introImg).wait(800).to({ alpha: 1, scaleX: .9, scaleY: .9 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: .9, scaleY: .9 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 700).wait(2000).call(handleComplete6_1);
}
function handleComplete6_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("handleComplete1_5  == stopValue")
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
        introfingure.visible = false;
        introArrow.x = introArrowX
        introArrow.y = introArrowY
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
        introfingure.x = introfingureX
        introfingure.y = introfingureY
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])

        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
            .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).wait(200).call(this.onComplete2)



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
        inc = 0
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
    container.parent.removeChild(introQuestxt1);
    introQuestxt1.visible = false;
    container.parent.removeChild(introChoice1, introChoice2, introChoice3);
    introChoice1.visible = introChoice2.visible = introChoice3.visible = false;
    // container.parent.removeChild(introHolder)
    // introHolder.visible = false;

    container.parent.removeChild(introImg);
    introImg.visible = false;
    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }

}