var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introHolder1, introHolder2, introDummyHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var highlightTweenArr = []
var TempIntroVal;
var setIntroCnt = 0
var introquestionInterval
var removeIntraval = 0
var introQuestxtX = 0; introQuestxtY = 50;
var introArrowX = 610, introArrowY = 180;
var introfingureX = 650, introfingureY = 430;
var choiceXArr = [-500, 1500, -500, 1500]
var choiceXArr1 = [540, 540, 540, 540]
var choiceYArr = [295, 295, 295, 295, 295]
var chGotoArr = [5, 9, 2]
var chGotoArr1 = [35, 0, 23, 8, 15]
var introChoiceArr = [], introPosArr = []

function commongameintro() {
    introTitle = Title.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introDummyHolder = holder.clone()

    introQs1 = question.clone()
    introQs2 = question.clone()


    for (i = 0; i < 3; i++) {
        introChoiceArr[i] = question.clone()
		 introChoiceArr[i].scaleX = introChoiceArr[i].scaleY = .7
    }

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    showQuestionPrompt(BACKTRACK_PROMPT_OBSERVE, { duration: 1000 });



    container.parent.addChild(introQs1)
    introQs1.visible = true;
    introQs1.x = 580; introQs1.y = 240
	introQs1.scaleX = introQs1.scaleY = .8
    introQs1.gotoAndStop(9);
    container.parent.addChild(introQs2)
    introQs2.visible = false;
    introQs2.x = 580; introQs2.y = 240
	introQs2.scaleX = introQs2.scaleY = .8
    introQs2.gotoAndStop(2);


    for (i = 0; i < 3; i++) {

        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].x = 163 + (i * 420);
        introChoiceArr[i].y = 260;
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(chGotoArr[i]);
    }

    container.parent.addChild(introDummyHolder)
    introDummyHolder.visible = false;
    introDummyHolder.scaleX = introDummyHolder.scaleY = .7
    if (lang == "HindiQuestionText/") {
        introDummyHolder.x = 220; introDummyHolder.y = 140;
    }else{
        introDummyHolder.x = 250; introDummyHolder.y = 175;
    }

    introQs1.y = -1200
    introQs1.alpha = 0
    createjs.Tween.get(introQs1)
        .to({ y: 247, alpha: 1 }, 2000).wait(1000)
		
		createjs.Tween.get(QusTxtString).to({ alpha: 1 }, 2000).wait(1000).call(handleComplete1_1);
 
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {
    introQs1.visible = false;

    introQs2.visible = true;
    introQs2.y = -1200
    introQs2.alpha = 0
    createjs.Tween.get(introQs2)
        .to({ y: 252, alpha: 1 }, 2000).wait(1000).call(handleComplete3_1);



}

function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    introQs2.visible = false;
    choiceTween1()
}
function choiceTween1() {
    showQuestionPrompt(BACKTRACK_PROMPT_SELECT, { duration: 300 });

    var introtempVal = 2000
    for (i = 0; i < 3; i++) {
        introChoiceArr[i].y = 1200
        introChoiceArr[i].alpha = 0
        introChoiceArr[i].visible = true;
        if (i == 0) {
            createjs.Tween.get(introChoiceArr[i]).wait(200)
                .to({ y: 292, alpha: 1 }, introtempVal).wait(introtempVal).call(handleComplete5_1);
        }
		if (i == 2) {
            createjs.Tween.get(introChoiceArr[i]).wait(200)
                .to({x:1020, y: 292, alpha: 1 }, introtempVal).wait(introtempVal).call(handleComplete5_1);
        }
        else {
            createjs.Tween.get(introChoiceArr[i]).wait(200)
                .to({ y: 292, alpha: 1 }, introtempVal).wait(introtempVal)
        }

    }


}

function handleComplete5_1() {

    choiceTween2()
}
function choiceTween2() {
    introDummyHolder.visible = true
    introDummyHolder.alpha = 0;
    createjs.Tween.get(introDummyHolder).wait(800).to({ alpha: 1 }, 1000).wait(1500).call(handleComplete4_1);

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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introDummyHolder)
    introDummyHolder.visible = false
   hideQuestionPrompt()
    container.parent.removeChild(introQs1)
    introQs1.visible = false
    container.parent.removeChild(introQs2)
    introQs2.visible = false

    for (i = 0; i < 3; i++) {
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