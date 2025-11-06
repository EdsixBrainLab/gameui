var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introHolderArr = []
var introQuestxtX = 636; introQuestxtY = 100;
var introArrowX = 605, introArrowY = 291;
var introfingureX = 630, introfingureY = 445;
var choiceXArr1 = [1070, 627, 50]
var choiceYArr1 = [800, 800, 800]
var choiceXArr = [870, 627, 350]
var choiceYArr = [380, 220, 320]
var introChoiceArr = []
var introquesArr = [], introChoiceHoldArr = [], introHolder1, introDummyHolder, introHolder2;
function commongameintro() {
    introTitle = Title.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()

    introQuestxt = questionText.clone();
    introHolder = Basket.clone()
    introHolder1 = Basket1.clone()
    introHolder2 = Basket2.clone()
    introDummyHolder = holder.clone()
    for (i = 0; i < 3; i++) {
        introChoiceArr[i] = choice1.clone()
        //introChoiceHoldArr[i] = chholder.clone()
    }
    for (i = 0; i < 3; i++) {
        introquesArr[i] = choice1.clone()
    }


    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;
    introQuestxt.gotoAndStop(0)
    introQuestxt.x = 305; introQuestxt.y = 77

    container.parent.addChild(introHolder2)
    introHolder2.visible = false;
    introHolder2.y = introHolder2.y + 110


    container.parent.addChild(introHolder)
    introHolder.visible = false;
    introHolder.y = introHolder.y - 15

    for (i = 0; i < 3; i++) {
        container.parent.addChild(introquesArr[i])
        introquesArr[i].x = 627
        introquesArr[i].y = 800
        introquesArr[i].visible = false;
        introquesArr[i].gotoAndStop(i);
    }
    container.parent.addChild(introHolder1)
    introHolder1.visible = false;
    //introHolder1.y = introHolder1.y - 9
    introHolder1.y = -7

    for (i = 0; i < 3; i++) {

        // container.parent.addChild(introChoiceHoldArr[i])
        // introChoiceHoldArr[i].x = -290 + (i * 350); introChoiceHoldArr[i].y = 50
        // introChoiceHoldArr[i].scaleX = .9
        // introChoiceHoldArr[i].scaleY = .9
        // introChoiceHoldArr[i].visible = false;

        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].x = 270 + (i * 350); introChoiceArr[i].y = 445
        introChoiceArr[i].scaleX = 1
        introChoiceArr[i].scaleY = 1
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(i);
    }
    container.parent.addChild(introDummyHolder)
    introDummyHolder.visible = false;
    introDummyHolder.scaleX = introDummyHolder.scaleY = .5
    introDummyHolder.x = 178
    introDummyHolder.y = 145

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {
    introHolder2.visible = true;
    introHolder2.alpha = 0;
    createjs.Tween.get(introHolder2).to({ alpha: 1 }, 1000)
    introHolder.visible = true;
    introHolder.alpha = 0;
    createjs.Tween.get(introHolder).to({ alpha: 1 }, 1000)
    introHolder1.visible = false;
    introHolder1.alpha = 0;
    createjs.Tween.get(introHolder1).to({ alpha: 1 }, 1000).call(handleComplete2_1);

}
function handleComplete2_1() {
    choiceTween1()
}
function choiceTween1() {
    introquesArr[0].visible = true;
    introquesArr[0].alpha = 1;
    createjs.Tween.get(introquesArr[0]).to({ x: choiceXArr[0], y: choiceYArr[0] }, 700).to({ x: choiceXArr1[0], y: choiceYArr1[0] }, 700).wait(1000).call(handleComplete2_11);

}
function handleComplete2_11() {
    choiceTween11()
}
function choiceTween11() {

    introquesArr[1].visible = true;
    introquesArr[1].alpha = 1;
    createjs.Tween.get(introquesArr[1]).to({ x: choiceXArr[1], y: choiceYArr[1] }, 700).call(handleComplete2_11A);

}
function handleComplete2_11A() {
    choiceTween11A()
}
function choiceTween11A() {
    introHolder1.visible = true;
    createjs.Tween.get(introquesArr[1]).to({ x: choiceXArr1[1], y: choiceYArr1[1] }, 700).wait(1000).call(handleComplete2_111);

}
function handleComplete2_111() {
    choiceTween111()
}
function choiceTween111() {
    introquesArr[2].visible = true;
    introquesArr[2].alpha = 1;
    createjs.Tween.get(introquesArr[2]).to({ x: choiceXArr[2], y: choiceYArr[2] }, 700).to({ x: choiceXArr1[2], y: choiceYArr1[2] }, 700).wait(1000).call(handleComplete5_1);

}
function handleComplete5_1() {
    introHolder2.visible = false;
    introHolder.visible = false;
    introHolder1.visible = false;
    for (i = 0; i < 3; i++) {
        introquesArr[i].visible = false;
    }
    introQuestxt.gotoAndStop(1)
    if(lang == "HindiQuestionText/"){
        introQuestxt.y = introQuestxt.y + 30;
    }
    choiceTween12()
}
function choiceTween12() {

    for (i = 0; i < 3; i++) {
        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 0;
        // introChoiceHoldArr[i].visible = true;
        // introChoiceHoldArr[i].alpha = 0;
        if (i == 2) {
            createjs.Tween.get(introChoiceArr[i]).to({ alpha: 1 }, 550).wait(1000).call(handleComplete5_12);
           // createjs.Tween.get(introChoiceHoldArr[i]).to({ alpha: 1 }, 550).wait(1000).call(handleComplete5_12);
        }
        else {
            createjs.Tween.get(introChoiceArr[i]).to({ alpha: 1 }, 550)
           // createjs.Tween.get(introChoiceHoldArr[i]).to({ alpha: 1 }, 550)
        }

    }


}
function handleComplete5_12() {
    choiceTween2();
}
function choiceTween2() {
    introDummyHolder.visible = true;
    introDummyHolder.alpha = 0
    createjs.Tween.get(introDummyHolder).wait(500).to({ alpha: 1 }, 800).wait(1500).call(handleComplete4_1);


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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introDummyHolder)
    introDummyHolder.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false

    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false
        // container.parent.removeChild(introChoiceHoldArr[i])
        // introChoiceHoldArr[i].visible = false
        container.parent.removeChild(introquesArr[i])
        introquesArr[i].visible = false

    }
    container.parent.removeChild(introHolder1)
    introHolder1.visible = false;
    container.parent.removeChild(introHolder)
    introHolder.visible = false;
    container.parent.removeChild(introHolder2)
    introHolder2.visible = false;
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