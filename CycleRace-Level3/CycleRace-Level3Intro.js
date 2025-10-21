var CycleIntroArr = [];
var introQuestxt, introQuestxt1, introChoice,introText, introTarget, introcycle1, introcycle2, introcycle3, introcycle4, introcycle5, introcycle9, introChHolder, introTarget
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 820, introArrowY = 250;
var introfingureX = 860, introfingureY = 360;
var cycleTweenArr = []
var introChoiceArr = []
var btnx = [220, 420, 620, 820]
var posY1 = [420, 440, 480, 500]
//var posY1 = [350, 380, 400, 440, 470, 510]
//var introCycleCntArr = [1, 2, 3, 4, 5, 9]
var introCycleCntArr = [1, 2, 3, 9]
var value = [0, 2, 1, 8]
function commongameintro() {
    Title.visible=true;
    introQuestxt = questionText.clone();
    introQuestxt1 = questionText1.clone();
    introcycle1 = cycle1.clone();
    introcycle2 = cycle2.clone();
    introcycle3 = cycle3.clone();
  
    introcycle9 = cycle9.clone();
    introChoice = choice2.clone();
    introChHolder = chHolderMc.clone();
    introTarget = targetMc.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    container.parent.addChild(introTarget);
    introTarget.visible = true;
    introTarget.x = 1100;
    introTarget.y = 550;

    
    
    for (i = 0; i < 4; i++) {
       
        CycleIntroArr[i] = this["introcycle" + introCycleCntArr[i]].clone();
        container.parent.addChild(CycleIntroArr[i]);
        CycleIntroArr[i].scaleX = CycleIntroArr[i].scaleY = .5
        CycleIntroArr[i].x = 100
        CycleIntroArr[i].y = posY1[i]
        CycleIntroArr[i].stop();
        CycleIntroArr[i].visible = true;

    }
    container.parent.addChild(introChHolder)
    for (i = 0; i < 4; i++) {
        introChoiceArr[i] = introChoice.clone()
        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;
        introChoiceArr[i].x = btnx[i]
        introChoiceArr[i].scaleX = introChoiceArr[i].scaleY = .8;
        introChoiceArr[i].y = 310;
        introChoiceArr[i].gotoAndStop(value[i]);

    }
    container.parent.addChild(introQuestxt1);
    introQuestxt1.gotoAndStop(8)
    introQuestxt1.x = 360; introQuestxt1.y = 230;
    introQuestxt1.visible = false;
    introQuestxt1.alpha = 0;

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.scaleX=introImg.scaleY=.7
    introImg.y=225;
    introImg.x =915;

    //introText = new createjs.Text("Remember their positions", "30px Lato-Bold", "white")
    introText = new createjs.Text("", "30px Lato-Bold", "white")
    container.parent.addChild(introText);
    introText.textAlign = "center";
    introText.textBaseline = "middle";
    introText.x = 940;
    introText.y = 670;
    introText.visible = false;

     
    container.parent.addChild(introHintTextMc);
    introHintTextMc.visible = false;


    

    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();

    setTimeout(getRaceStarted, 400)

    setTimeout(setRaceCreateCycle1, 300)
    setTimeout(setRaceCreateCycle2, 300)
    setTimeout(setRaceCreateCycle3, 300)
    // setTimeout(setRaceCreateCycle4, 500)
    // setTimeout(setRaceCreateCycle5, 500)
    setTimeout(setRaceCreateCycle6, 300)


     

}
function introCycle() {
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i].currentFrame == 13) {
            CycleIntroArr[i].gotoAndPlay(0)
        }
    }

}
function getRaceStarted() {
    if (stopValue == 0) {
        console.log("getRaceStarted  == stopValue")
        removeGameIntro()

    }
    else {
        for (i = 0; i < 4; i++) {

            CycleIntroArr[i].play();
            CycleIntroArr[i].addEventListener("tick", introCycle)
        }

    }

}
function getRaceStop() {

    for (i = 0; i < 4; i++) {

        CycleIntroArr[i].stop();
        CycleIntroArr[i].removeEventListener("tick", introCycle)


    }

}
function setRaceCreateCycle1() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle1  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[0])
        cycleTweenArr[0] = createjs.Tween.get(CycleIntroArr[0]).to({ x: 100 }, 390).to({ x: 200 }, 390).to({ x: 330 }, 390).to({ x: 400 }, 390).
            to({ x: 500 }, 390).to({ x: 600 }, 390).to({ x: 700 }, 390).to({ x: 800 }, 390).to({ x: 900 }, 390).wait(400).call(this.onComplete);
    }
}
function setRaceCreateCycle2() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle2  == stopValue")
        removeGameIntro()

    }
    else {

        cycleTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[1])
        cycleTweenArr[1] = createjs.Tween.get(CycleIntroArr[1]).to({ x: 100 }, 340).to({ x: 200 }, 340).to({ x: 300 }, 340).to({ x: 400 }, 340).to({ x: 500 }, 340)
            .to({ x: 600 }, 340).to({ x: 700 }, 340).to({ x: 800 }, 340).to({ x: 900 }, 340).to({ x: 1000 }, 340).to({ x: 1050 }, 340).wait(400)
    }
}

function setRaceCreateCycle3() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle3  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[2] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[2])
        cycleTweenArr[2] = createjs.Tween.get(CycleIntroArr[2]).to({ x: 100 }, 460).to({ x: 250 }, 460).to({ x: 350 }, 460)
            .to({ x: 450 }, 460).to({ x: 550 }, 460).to({ x: 650 }, 460).to({ x: 750 }, 460).to({ x: 850 }, 460).wait(400)
    }
}

function setRaceCreateCycle6() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle6  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[3] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[3])
        cycleTweenArr[3] = createjs.Tween.get(CycleIntroArr[3]).to({ x: 100 }, 490).to({ x: 200 }, 490)
            .to({ x: 300 }, 490).to({ x: 400 }, 490).to({ x: 500 }, 490).to({ x: 600 }, 490).to({ x: 700 }, 490).wait(400)
    }
}

this.onComplete = function (e) {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
        getRaceStop();
        createjs.Tween.get(introHintTextMc).to({ visible: true }, 1000).wait(3000).call(handleComplete20_1);

      
    }

}
function handleComplete20_1(){
    createjs.Tween.removeAllTweens();
    setIntroDelay()
}
function setIntroDelay() {
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
    container.parent.removeChild(introQuestxt)

    container.parent.removeChild(introTarget)
    introTarget.visible = false;
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i]) {
            container.parent.removeChild(CycleIntroArr[i]);
        }
    }
    setTimeout(setIntroHolder, 50)
}
}
function setIntroHolder() {
    if (stopValue == 0) {
        console.log("setIntroHolder  == stopValue")
        removeGameIntro()

    }
    else {
        introText.visible=false;
        introHintTextMc.visible = false;
        introChHolder.visible = true;       
        introQuestxt1.visible = true;
        introQuestxt1.alpha = 0;
        createjs.Tween.get(introQuestxt1).to({ alpha: 1 },1000).call(handleComplete1_5);

    }


}
function handleComplete1_5() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
        choiceTween()
    }

}
function choiceTween() {

    for (i = 0; i < 4; i++) {
        introChoiceArr[i].visible = true;
        introChoiceArr[i].alpha = 0;
    }
    createjs.Tween.get(introChoiceArr[0]).wait(100).to({ x: introChoiceArr[0].x, y: 310, alpha: 0 }, 500).to({ x: introChoiceArr[0].x, y: 330, alpha: 0.5 }, 500).to({ x: introChoiceArr[0].x, y: 310, alpha: 1 })
    createjs.Tween.get(introChoiceArr[1]).wait(200).to({ x: introChoiceArr[1].x, y: 330, alpha: 0 }, 500).to({ x: introChoiceArr[1].x, y: 310, alpha: 0.5 }, 500).to({ x: introChoiceArr[1].x, y: 310, alpha: 1 })
    createjs.Tween.get(introChoiceArr[2]).wait(300).to({ x: introChoiceArr[2].x, y: 310, alpha: 0 }, 500).to({ x: introChoiceArr[2].x, y: 330, alpha: 0.5 }, 500).to({ x: introChoiceArr[2].x, y: 310, alpha: 1 })
    createjs.Tween.get(introChoiceArr[3]).wait(400).to({ x: introChoiceArr[3].x, y: 330, alpha: 0 }, 500).to({ x: introChoiceArr[3].x, y: 310, alpha: 0.5 }, 500).to({ x: introChoiceArr[3].x, y: 310, alpha: 1 }).wait(2000).call(handleComplete1_6);


}
function handleComplete1_6() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("handleComplete1_5  == stopValue")
        removeGameIntro()

    }
    else {
        introCh()
    }

}
function introCh(){
    introImg.y = 400
    createjs.Tween.get(introImg).to({ visible : true }).to({ alpha : 0 }).to({alpha : 1 , y : 205 }, 500).wait(4000).call(handleComplete2_1);
}
function handleComplete2_1(){
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
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    container.parent.addChild(introQuestxt1);
    introQuestxt1.visible = false
    container.parent.removeChild(introcycle1)
    introcycle1.visible = false
    container.parent.removeChild(introcycle2)
    introcycle2.visible = false
    container.parent.removeChild(introcycle3)
    introcycle3.visible = false
    container.parent.removeChild(introImg);
    introImg.visible = false;
    container.parent.removeChild(introcycle9)
    introcycle9.visible = false
    container.parent.removeChild(introChHolder)
    introChHolder.visible = false;

    container.parent.removeChild(introHintTextMc)
    introHintTextMc.visible = false;
    

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }
    getRaceStop();
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i]) {
            container.parent.removeChild(CycleIntroArr[i]);
        }
    }
    for (i = 0; i < 4; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;
    }
}