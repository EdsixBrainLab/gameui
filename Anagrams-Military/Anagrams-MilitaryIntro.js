var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 636; introQuestxtY = 120;
var introQues1X = 635, introQues1Y = 280
var introChoice1X = 280, introChoice1Y = 590;
var introChoice2X = 500, introChoice2Y = 590;
var introChoice3X = 720, introChoice3Y = 590;
var introChoice4X = 940, introChoice4Y = 590;
var introClu1X = 465, introClu1Y = 460;
var introClu2X = 575, introClu2Y = 460;
var introClu3X = 685, introClu3Y = 460;
var introClu4X = 795, introClu4Y = 460;
var introArrowX = 210, introArrowY = 350;
var introfingureX = 220, introfingureY = 520;
var ArrowXArr = [, 500, 940, 720, 280],FingXArr = [, 525, 965, 745, 305]
var ArrowYArr = [, 490, 490, 490, 490], FingYArr = [, 600, 600, 600, 600]
var introClueArr = []


function commongameintro() {
    introClueArr = []
    introTitle = Title.clone()
    introClu1 = clueMc.clone()
    introClu2 = clueMc.clone()
    introClu3 = clueMc.clone()
    introClu4 = clueMc.clone()
    introChoice1 = choice1.clone()
    introChoice2 = choice1.clone()
    introChoice3 = choice1.clone()
    introChoice4 = choice1.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
console.log("container.width ::"+container.width)
console.log("stage.width ::"+stage.width)
console.log("canvas.width ::"+canvas.width)
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 650;
    introTitle.y = INTRO_TITLE_Y;


    call_UI_introQuestionCardContainer(container,"host");

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke:"rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22});

    container.parent.addChild(introChoice1)
    introChoice1.x = introChoice1X;
    introChoice1.y = introChoice1Y;
    introChoice1.scaleX = introChoice1.scaleY = .8;
    introChoice1.visible = false;
    introChoice1.gotoAndStop(19);

    container.parent.addChild(introChoice2)
    introChoice2.visible = false;
    introChoice2.x = introChoice2X;
    introChoice2.y = introChoice2Y;
    introChoice2.scaleX = introChoice2.scaleY = .8;
    introChoice2.gotoAndStop(18)
    container.parent.addChild(introChoice3)
    introChoice3.visible = false;
    introChoice3.x = introChoice3X;
    introChoice3.y = introChoice3Y;
    introChoice3.scaleX = introChoice3.scaleY = .8;
    introChoice3.gotoAndStop(14)
    container.parent.addChild(introChoice4)
    introChoice4.visible = false;
    introChoice4.x = introChoice4X;
    introChoice4.y = introChoice4Y;
    introChoice4.scaleX = introChoice4.scaleY = .8;
    introChoice4.gotoAndStop(7)
    cluegotoArr = [, 18, 7, 14, 19]
    container.parent.addChild(introClu1)
    introClu1.x = introClu1X;
    introClu1.y = introClu1Y;
    introClu1.scaleX = introClu1.scaleY = 1;
    introClu1.visible = false;
    introClu1.gotoAndStop(26);
    container.parent.addChild(introClu2)
    introClu2.visible = false;
    introClu2.x = introClu2X;
    introClu2.y = introClu2Y;
    introClu2.scaleX = introClu2.scaleY = 1;
    introClu2.gotoAndStop(26)
    container.parent.addChild(introClu3)
    introClu3.visible = false;
    introClu3.x = introClu3X;
    introClu3.y = introClu3Y;
    introClu3.scaleX = introClu3.scaleY = 1;
    introClu3.gotoAndStop(26)
    container.parent.addChild(introClu4)
    introClu4.visible = false;
    introClu4.x = introClu4X;
    introClu4.y = introClu4Y;
    introClu4.scaleX = introClu4.scaleY = 1;
    introClu4.gotoAndStop(26)
    introClueArr.push("", introClu1, introClu2, introClu3, introClu4)

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}





function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {


    questionCardContainer_htp.visible = true;
    questionCardContainer_htp.alpha = 0
    createjs.Tween.get(questionCardContainer_htp).wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);



}
function handleComplete2_1() {
    choiceTween()
}
function choiceTween() {

    var val = 700
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = true;
        introClueArr[i].gotoAndStop(26)
        this["introChoice" + i].y = 590, this["introChoice" + i].x = this["introChoice" + i].x;
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i]).wait(val).to({ y: 620, scaleX: .8, scaleY: .8, alpha: 1 }, val).call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i]).wait(val).to({ y: 620, scaleX: .8, scaleY: .8, alpha: 1 }, val);
        }

        val = val + 150
    }
    TempIntroVal = 0;
}

function handleComplete4_1() {
    if (TempIntroVal == 0) { }
    else {
        introClueArr[TempIntroVal].visible = true;
        introClueArr[TempIntroVal].gotoAndStop(cluegotoArr[TempIntroVal])

        if( TempIntroVal == 1 )
        {
            console.log("TempIntroVal"+TempIntroVal);
            
            introChoice2.alpha = .5;
        }

      else  if( TempIntroVal == 2 )
        {
            console.log("TempIntroVal"+TempIntroVal);
         
            introChoice4.alpha = .5;
        }
     else if( TempIntroVal == 3 )
        {
            console.log("TempIntroVal"+TempIntroVal);
          
            introChoice3.alpha = .5;
        }

    }
    createjs.Tween.removeAllTweens();
    setArrowTween()
}
function setArrowTween() {
    TempIntroVal++;

    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
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
        console.log("setFingureTween  == stopValue")
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
    introClueArr[TempIntroVal].visible = true;
    introClueArr[TempIntroVal].gotoAndStop(cluegotoArr[TempIntroVal])
    if( TempIntroVal == 4 )
    {
        console.log("TempIntroVal"+TempIntroVal);

        introChoice1.alpha = .5;
    }
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
    container.parent.removeChild(questionCardContainer_htp)
    questionCardContainer_htp.visible = false
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    container.parent.removeChild(introChoice1)
    introChoice1.visible = false
    container.parent.removeChild(introChoice2)
    introChoice2.visible = false
    container.parent.removeChild(introChoice3)
    introChoice3.visible = false
    container.parent.removeChild(introChoice4)
    introChoice4.visible = false

    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = false;
    }
    container.parent.removeChild(introClu1)
    introClu1.visible = false
    container.parent.removeChild(introClu2)
    introClu2.visible = false
    container.parent.removeChild(introClu3)
    introClu3.visible = false
    container.parent.removeChild(introClu4)
    introClu4.visible = false

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