
var introTitle, introQuestxt, introQues, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4
var introQuesX = 425, introQuesY = 215;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 450, introArrowY = 300;
var introfingureX = 445, introfingureY = 430;
var introArr = []
var randIntroArr = [0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4]
var count1 = -1;
var introrand1 = []
var introrand
var introArr1 = []
var val
var posX = [200, 577, 960, 375, 785, 585]
var posY = [255, 255, 255, 425, 425, 603]

var posX1 = [180, 432, 824, 1075, 508, 740]
var posY1 = [425, 425, 425, 425, 630, 630]
var introChoiceArr = []
function commongameintro() {
    introTitle = Title.clone();
    introchoice1 = choice1.clone();
    introchoice2 = choice2.clone();
    introHolder = choiceBg.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    if (QusTxtString && typeof QusTxtString.clone === "function") {
        introQuestxt = QusTxtString.clone();
    } else {
        introQuestxt = new createjs.Text("", "bold 46px Arial", "#ffffff");
        introQuestxt.textAlign = "center";
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    container.parent.addChild(introHolder)
    introHolder.visible = false;
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = false;
    introQuestxt.x = 640;
    introQuestxt.y = 130;
    introQuestxt.textAlign = "center";
    introQuestxt.text = "Look at the associations below";
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    introQues = introchoice2.clone()
    container.parent.addChild(introQues);
    introQues.visible = false;
    introQues.x = 605
    introQues.y = 270
    introQues.scaleX = introQues.scaleY = 1.5

    for (i = 0; i < 6; i++) {
        introArr[i] = introchoice1.clone()
        container.parent.addChild(introArr[i])
        introArr[i].visible = false;
        introArr1[i] = introchoice2.clone()
        container.parent.addChild(introArr1[i])
        introArr1[i].visible = false;
        introArr[i].gotoAndStop(i)
        introArr1[i].gotoAndStop(i)
        introArr[i].x = posX[i] - 50
        introArr1[i].x = posX[i] + 127
        introArr[i].y = posY[i]
        introArr1[i].y = posY[i]

    }
    for (i = 0; i < 6; i++) {
        introChoiceArr[i] = introchoice1.clone()
        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(i)
        introChoiceArr[i].x = posX1[i]
        introChoiceArr[i].y = posY1[i]

    }

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.y = 200;
    introImg.x = 135;

    introQuestxt.visible = true;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        quesTween()
    }
    // removeGameIntro()
}
function quesTween() {


    var temp1 = 100
    for (i = 0; i < 6; i++) {
        if (stopValue == 0) {
            removeGameIntro()
        }
        else {
            introArr[i].visible = true;
            introArr1[i].visible = true;
            introArr[i].alpha = 0;
            introArr1[i].alpha = 0;
            if (i == 5) {

                introHolder.visible = true;
                createjs.Tween.get(introArr[i]).wait(temp1).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                createjs.Tween.get(introArr1[i]).wait(temp1).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500).wait(1000).call(handleComplete2_1);

            }
            else {
                createjs.Tween.get(introArr[i]).wait(temp1).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                createjs.Tween.get(introArr1[i]).wait(temp1).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)

            }
            temp1 += 400;
        }

    }


}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();


    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        if (stopValue == 0) {
            removeGameIntro()
        } else {
            choiceTween()
        }
    }
}
function choiceTween() {
    //clearInterval(val);    
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        container.parent.removeChild(introHolder)
        introHolder.visible = false;
        for (i = 0; i < 6; i++) {
            introArr[i].visible = false;
            introArr1[i].visible = false;

        }

        introQuestxt.text = "Select the correct symbol that was associated with the letter/number";
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
            introQuestxt.__labelBG.update();
        }
        introQuestxt.visible = true;
        introQuestxt.alpha = 0;
        createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000)


        introQues.visible = true;
        introQues.alpha = 0;
        introQues.gotoAndStop(1);
        createjs.Tween.get(introQues).wait(200).to({ alpha: 0, scaleX: 1.45, scaleY: 1.45 }, 500).to({ alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 500)

        for (i = 0; i < 6; i++) {
            introChoiceArr[i].visible = true
            introChoiceArr[i].alpha = 0

        }
        createjs.Tween.get(introChoiceArr[0]).wait(200).to({ x: introChoiceArr[0].x, y: 405, alpha: 0 }, 500).to({ x: introChoiceArr[0].x, y: 425, alpha: 0.5 }, 500).to({ x: introChoiceArr[0].x, y: 425, alpha: 1 })
        createjs.Tween.get(introChoiceArr[1]).wait(300).to({ x: introChoiceArr[1].x, y: 425, alpha: 0 }, 500).to({ x: introChoiceArr[1].x, y: 405, alpha: 0.5 }, 500).to({ x: introChoiceArr[1].x, y: 425, alpha: 1 })
        createjs.Tween.get(introChoiceArr[2]).wait(600).to({ x: introChoiceArr[2].x, y: 405, alpha: 0 }, 500).to({ x: introChoiceArr[2].x, y: 425, alpha: 0.5 }, 500).to({ x: introChoiceArr[2].x, y: 425, alpha: 1 })
        createjs.Tween.get(introChoiceArr[3]).wait(800).to({ x: introChoiceArr[3].x, y: 425, alpha: 0 }, 500).to({ x: introChoiceArr[3].x, y: 405, alpha: 0.5 }, 500).to({ x: introChoiceArr[3].x, y: 425, alpha: 1 })
        createjs.Tween.get(introChoiceArr[4]).wait(1000).to({ x: introChoiceArr[4].x, y: 610, alpha: 0 }, 500).to({ x: introChoiceArr[4].x, y: 620, alpha: 0.5 }, 500).to({ x: introChoiceArr[4].x, y: 610, alpha: 1 })
        createjs.Tween.get(introChoiceArr[5]).wait(1200).to({ x: introChoiceArr[5].x, y: 620, alpha: 0 }, 500).to({ x: introChoiceArr[5].x, y: 610, alpha: 0.5 }, 500).to({ x: introChoiceArr[5].x, y: 610, alpha: 1 }).call(handleComplete3_1);

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
    introImg.y = 360
    createjs.Tween.get(introImg).to({ visible: true }).to({ alpha: 0 })
        .to({ alpha: 1, y: 100 }, 500).wait(3500).call(handleComplete5_1);
}
function handleComplete5_1() {
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
        container.parent.removeChild(highlightTweenArr[0]);
    }
    // }
    container.parent.removeChild(introArrow);
    if (stopValue == 0) {
        removeGameIntro()

    } else {
        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeAllTweens();

    // // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[1]) {
        container.parent.removeChild(highlightTweenArr[1]);
    }
    // // }
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
    console.log("removeGameIntro")
    createjs.Tween.removeAllTweens();

    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    if (introQuestxt) {
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.destroy === "function") {
            introQuestxt.__labelBG.destroy();
        } else if (introQuestxt.__labelBG && introQuestxt.__labelBG.parent) {
            introQuestxt.__labelBG.parent.removeChild(introQuestxt.__labelBG);
        }
        container.parent.removeChild(introQuestxt)
        introQuestxt.visible = false
        introQuestxt = null;
    }
    container.parent.removeChild(introQues);
    introQues.visible = false
    container.parent.removeChild(introHolder)
    introHolder.visible = false;

    container.parent.removeChild(introchoice1)
    introchoice1.visible = false;

    container.parent.removeChild(introImg);
    introImg.visible = false;

    container.parent.removeChild(introchoice2)
    introchoice2.visible = false;
    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }

    for (i = 0; i < 6; i++) {
        container.parent.removeChild(introArr[i])
        introArr[i].visible = false;
        container.parent.removeChild(introArr1[i])
        introArr1[i].visible = false;

    }
    for (i = 0; i < 6; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;

    }
}
