var introTitle, introQuestxt, introQues, introArrow, introfingure, introText, introText1, introHolder
var introchoice1, introchoice2, introchoice3, introchoice4
var introQuesX = 425, introQuesY = 215;
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 615, introArrowY = 400;
var introfingureX = 640, introfingureY = 545;
var introArr = []
var randIntroArr = [0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4]
var count1 = -1;
var introrand1 = []
var introrand
var introArr1 = []
var val
var posX =  [140, 800, 460]
var posY = [350, 350, 550]

var posX1 =  [280, 618, 955]
var posY1 = [545, 545, 545]
var introQuestxtX = 640; var introQuestxtY = 130;
var introChoiceArr = []
function commongameintro() {
    introTitle = Title.clone();
    introchoice1 = choice1.clone();
    introchoice2 = choice2.clone();
    introHolder = choiceBg.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()

    container.parent.addChild(introTitle)
    introTitle.visible = true;

    container.parent.addChild(introHolder)
    introHolder.visible = false;


    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;
    introQuestxt.x = introQuestxtX;
    introQuestxt.y = introQuestxtY;
    introQuestxt.text = "Look at the associations below";
    introQuestxt.textAlign = "center";

    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    introQues = introchoice2.clone()
    container.parent.addChild(introQues);
    introQues.visible = false;
    introQues.x = 610
    introQues.y = 270
    introQues.scaleX = introQues.scaleY = 1.5

    for (i = 0; i < 3; i++) {
        introArr[i] = introchoice1.clone()
        container.parent.addChild(introArr[i])
        introArr[i].visible = false;
        introArr1[i] = introchoice2.clone()
        container.parent.addChild(introArr1[i])
        introArr1[i].visible = false;
        introArr[i].gotoAndStop(i)
        introArr1[i].gotoAndStop(i)
        introArr[i].x = posX[i] 
        introArr1[i].x = posX[i]  + 290
        introArr[i].y = posY[i]
        introArr1[i].y = posY[i]

    }
    for (i = 0; i < 3; i++) {
        introChoiceArr[i] = introchoice1.clone()
        container.parent.addChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;
        introChoiceArr[i].gotoAndStop(i)
        introChoiceArr[i].x = posX1[i]
        introChoiceArr[i].y = posY1[i]

    }

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.y=300;
    introImg.x =210;
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

    introHolder.visible = true;
    var temp1 = 100
    for (i = 0; i < 3; i++) {
        if (stopValue == 0) {
            removeGameIntro()
        }
        else {
            introArr[i].visible = true;
            introArr1[i].visible = true;
            introArr[i].scaleX= introArr[i].scaleY=1.3
            introArr1[i].scaleX= introArr1[i].scaleY=1.3
            introArr[i].alpha = 0;
            introArr1[i].alpha = 0;
            if (i == 2) {
              
                    
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
       
        choiceTween()
        
    }
}
function choiceTween() { 
   console.log("choiceTween")
        container.parent.removeChild(introHolder)
        introHolder.visible = false;
        for (i = 0; i < 3; i++) {
            introArr[i].visible = false;
            introArr1[i].visible = false;
    
        }
    
        introQuestxt.text = "Select the correct symbol that was associated with the letter/number";
        if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
            introQuestxt.__labelBG.update();
        }
        introQuestxt.visible = true;
    
    
        introQues.visible = true;
        introQues.gotoAndStop(1);
        introQues.scaleX=introQues.scaleY=1.5

        var temp2 = 200
            for (i = 0; i < 3; i++) {
                introChoiceArr[i].visible = true
                introChoiceArr[i].alpha = 0
                introChoiceArr[i].scaleX= introChoiceArr[i].scaleY=1.3
                if(i==2){
                createjs.Tween.get(introChoiceArr[i]).wait(temp2).to({ x: introChoiceArr[i].x, y: introChoiceArr[i].y, alpha: 0 }, 500).to({ x: introChoiceArr[i].x, y: 550, alpha: 0.5 }, 500).to({ x: introChoiceArr[i].x, y: introChoiceArr[i].y, alpha: 1 }).call(handleComplete3_1);
                     }
                     else{
                        createjs.Tween.get(introChoiceArr[i]).wait(temp2).to({ x: introChoiceArr[i].x, y: introChoiceArr[i].y, alpha: 0 }, 500).to({ x: introChoiceArr[i].x, y: 550, alpha: 0.5 }, 500).to({ x: introChoiceArr[i].x, y: introChoiceArr[i].y, alpha: 1 })
                
                     }
        temp2 += 200;
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
function introCh(){
    introImg.y = 360
    createjs.Tween.get(introImg).to({ visible : true }).to({ alpha : 0 }).to({alpha : 1 , y : 170 }, 500).wait(3500).call(handleComplete5_1);
}
function handleComplete5_1(){
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
        if (introQuestxt.__labelBG) {
            introQuestxt.__labelBG.destroy();
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

    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introArr[i])
        introArr[i].visible = false;
        container.parent.removeChild(introArr1[i])
        introArr1[i].visible = false;

    }
    for (i = 0; i <3; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;

    }
}