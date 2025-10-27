var introTitle, introQuestxt, introQues, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4
var introQuesX = 425, introQuesY = 215;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 1080, introArrowY = 170;
var introfingureX = 1090, introfingureY = 370;
var posX =  [160, 790]
var posX1 = [500,755,1010]
var posY1 = [270,490,270]
var introArr = []
var introArr1 = []
var val = [0,2,3]
var introQuestxtX = 640; introQuestxtY = 130;
function commongameintro() {
    introTitle = Title.clone();
    introchoice1 = choice1.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;
    introQuestxt.x = introQuestxtX;
    introQuestxt.y = introQuestxtY;

    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }
    container.parent.addChild(introTitle)
    introTitle.visible = true;

    container.parent.addChild(introImg1);
    introImg1.x = 330; introImg1.y = 200
    introImg1.regX = introImg1.regY = 50    
    introImg1.scaleX = introImg1.scaleY = 1.1
    introImg1.visible = false;

    for (i = 0; i < 2; i++) {
        introArr[i] = introchoice1.clone();
        container.parent.addChild(introArr[i]);
        introArr[i].visible = false;
        introArr[i].scaleX = introArr[i].scaleY = 1.2;
        introArr[i].gotoAndStop(val[i]);
        introArr[i].x = posX[i]
        introArr[i].y = 240
    }


    for (i = 0; i < 3; i++) {
        introArr1[i] = choice1.clone();
        container.parent.addChild(introArr1[i]);
        introArr1[i].visible = false; 
        introArr1[i].gotoAndStop(val[i]);
        introArr1[i].regX = introArr1[i].regY = 50;
        introArr1[i].scaleX=introArr1[i].scaleY=.8
        introArr1[i].x = posX1[i]
        introArr1[i].y = posY1[i]
    }

    

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.scaleX = introImg.scaleY = 1.1
    introImg.regX = introImg.regY = 50;
    introImg.y = 200;
    introImg.x = 330;

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
}
function quesTween() {

    for (i = 0; i < 2; i++) {
        introArr[i].visible = true;
        introArr[i].y = -400;
    }
    createjs.Tween.get(introArr[0]).wait(100)
        .to({ x: introArr[0].x, y: 240 }, 1500, createjs.Ease.bounceOut)
    createjs.Tween.get(introArr[1]).wait(800)
        .to({ x: introArr[1].x, y: 240 }, 1500, createjs.Ease.bounceOut).wait(2500).call(handleComplete2_1);

}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();


    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introchoice2()   
//    choiceTween()
        
    }
}

function introchoice2(){
    
    introImg1.visible = true;
    for (i = 0; i < 2; i++) {
        if (i == 1) {
            createjs.Tween.get(introArr[i]).wait(50).to({scaleX:.7,scaleY:.7, x:600,y:200}, 500).to({ alpha: 1 })

        }
        else {
            createjs.Tween.get(introArr[i]).wait(50).to({scaleX:.7,scaleY:.7, x:600,y:200 },500).to({ alpha: 1 })
        }
       
    }  
   
    createjs.Tween.get(introImg1).wait(50).to({ alpha: 1 },200)
    .call(handleComplete3_1);
}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();


    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introRemember()

    }
}
function introRemember() {
    for (i = 0; i < 2; i++) {
        introArr[i].visible = false;
    }
    introImg1.visible = false;
    introImg.visible = true;
    createjs.Tween.get(introImg).to({ alpha: 1, scaleX:1.1, scaleY:1.1 }, 700)
        .to({ scaleX:1.05, scaleY:1.05 }, 1000).to({ scaleX:1.1, scaleY:1.1 }, 500)
        .to({ scaleX:1.05, scaleY:1.05 }, 1000).wait(1500).call(handleComplete4_1);

}
function handleComplete4_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh1()
        // choiceTween()
    }
}
function introCh1() {
    createjs.Tween.get(introImg).to({ scaleX: .6, scaleY: .6, x: 70, y: 280 }, 500).wait(500).call(handleComplete5_1);
}
function handleComplete5_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        choiceTween()
    }
}
function choiceTween() { 
    for (i = 0; i < 2; i++) {
        introArr[i].visible = false;
    }
    
     introQuestxt.text="Which of these was not shown?";
		if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }
        introQuestxt.visible = true; 

    for (i = 0; i < 3; i++) {
        introArr1[i].visible = true;
        introArr1[i].alpha =0;
        
    }
    createjs.Tween.get(introArr1[1]).wait(200).to({ alpha: 0, scaleX: .75, scaleY: .75 }, 500).to({ alpha: 1, scaleX:.8, scaleY: .8 }, 500)
    createjs.Tween.get(introArr1[2]).wait(500).to({ alpha: 0, scaleX: .75, scaleY: .75 }, 500).to({ alpha: 1, scaleX:.8, scaleY: .8 }, 500)
    createjs.Tween.get(introArr1[0]).wait(700).to({ alpha: 0, scaleX: .75, scaleY: .75 }, 500).to({ alpha: 1, scaleX:.8, scaleY: .8 }, 500).wait(500).call(handleComplete6_1);

  
}
function handleComplete6_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh()
    }
}
function introCh() {
    createjs.Tween.get(introQuestxt).to({ alpha: 1, scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.05, scaleY: 1.05 }, 500)
        .to({ scaleX: 1, scaleY: 1 }, 500)
    createjs.Tween.get(introArr1[2]).wait(600).to({ alpha: 1, scaleX: .7, scaleY: .7 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 500).to({ scaleX: .7, scaleY: .7 }, 500)
        .to({ scaleX: .8, scaleY: .8 }, 700).wait(2000).call(handleComplete7_1);
    }
function handleComplete7_1() {
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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;

    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
 if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
  

    container.parent.removeChild(introchoice1)
    introchoice1.visible = false;
    container.parent.removeChild(introImg);
    introImg.visible = false;
    container.parent.removeChild(introImg1);
    introImg1.visible = false;

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }

    for (i = 0; i < 2; i++) {
        container.parent.removeChild(introArr[i]);
        introArr[i].visible = false;
    }


    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introArr1[i]);
        introArr1[i].visible = false; 
    }

}