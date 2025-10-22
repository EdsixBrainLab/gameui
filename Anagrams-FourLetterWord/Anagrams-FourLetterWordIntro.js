var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 636; introQuestxtY = 120;
var introQues1X = 630, introQues1Y = 280
var introChoice1X = 280, introChoice1Y = 545;
var introChoice2X = 500, introChoice2Y = 545;
var introChoice3X = 720, introChoice3Y = 545;
var introChoice4X = 940, introChoice4Y = 545;
var introClu1X = 556, introClu1Y = 408;
var introClu2X = 626, introClu2Y = 408;
var introClu3X = 696, introClu3Y = 408;
var introClu4X = 766, introClu4Y = 408;
var introClu5X = 216, introClu5Y = 478;
var introClu6X = 286, introClu6Y = 478;
var introClu7X = 356, introClu7Y = 478;
var introClu8X = 426, introClu8Y = 478;
var introClu9X = 891, introClu9Y = 478;
var introClu10X = 961, introClu10Y = 478;
var introClu11X = 1031, introClu11Y = 478;
var introClu12X = 1101, introClu12Y = 478;

var introArrowX = 214, introArrowY = 350;
var introfingureX = 220, introfingureY = 516;
var ArrowXArr = [, 502, 942, 722, 282, 282, 722, 942, 502, 282, 722, 502, 942], FingXArr = [, 520, 960, 740, 300, 300, 740, 960, 520, 300, 740, 520, 960]
var ArrowYArr = [, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490, 490], FingYArr = [, 586, 586, 586, 586, 586, 586, 586, 586, 586, 586, 586, 586]
var introClueArr = []
function commongameintro() {
    introClueArr = []
    introTitle = Title.clone()
    introClu1 = clueMc.clone()
    introClu2 = clueMc.clone()
    introClu3 = clueMc.clone()
    introClu4 = clueMc.clone()
    introClu5 = clueMc.clone()
    introClu6 = clueMc.clone()
    introClu7 = clueMc.clone()
    introClu8 = clueMc.clone()
    introClu9 = clueMc.clone()
    introClu10 = clueMc.clone()
    introClu11 = clueMc.clone()
    introClu12 = clueMc.clone()
    introChoice1 = choice1.clone()
    introChoice2 = choice1.clone()
    introChoice3 = choice1.clone()
    introChoice4 = choice1.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()

    introHolder = chHolderMC.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introHolder)
    introHolder.visible = false;

    introQues1 = new createjs.Text("diet", "50px lato-Bold", "#2f8c62");
    container.parent.addChild(introQues1)
    introQues1.x = introQues1X;
    introQues1.y = introQues1Y;
    introQues1.textAlign = "center";
    introQues1.textBaseline = "middle";
    introQues1.visible = false;


    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;

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
    introChoice2.gotoAndStop(4)
    container.parent.addChild(introChoice3)
    introChoice3.visible = false;
    introChoice3.x = introChoice3X;
    introChoice3.y = introChoice3Y;
    introChoice3.scaleX = introChoice3.scaleY = .8;
    introChoice3.gotoAndStop(8)
    container.parent.addChild(introChoice4)
    introChoice4.visible = false;
    introChoice4.x = introChoice4X;
    introChoice4.y = introChoice4Y;
    introChoice4.scaleX = introChoice4.scaleY = .8;
    introChoice4.gotoAndStop(3)
    cluegotoArr = [, 4, 3, 8, 19, 19, 8, 3, 4, 19, 8, 4, 3]
    container.parent.addChild(introClu1)
    introClu1.x = introClu1X;
    introClu1.y = introClu1Y;
    introClu1.scaleX = introClu1.scaleY = 1.1;
    introClu1.visible = false;
    introClu1.gotoAndStop(26);
    container.parent.addChild(introClu2)
    introClu2.visible = false;
    introClu2.x = introClu2X;
    introClu2.y = introClu2Y;
    introClu2.scaleX = introClu2.scaleY = 1.1;
    introClu2.gotoAndStop(26)
    container.parent.addChild(introClu3)
    introClu3.visible = false;
    introClu3.x = introClu3X;
    introClu3.y = introClu3Y;
    introClu3.scaleX = introClu3.scaleY = 1.1;
    introClu3.gotoAndStop(26)
    container.parent.addChild(introClu4);
    introClu4.visible = false;
    introClu4.x = introClu4X; introClu4.y = introClu4Y;
    introClu4.scaleX = introClu4.scaleY = 1.1;
    introClu4.gotoAndStop(26)
    container.parent.addChild(introClu5);
    introClu5.visible = false;
    introClu5.x = introClu5X; introClu5.y = introClu5Y;
    introClu5.scaleX = introClu5.scaleY = 1.1;
    introClu5.gotoAndStop(26)
    container.parent.addChild(introClu6);
    introClu6.visible = false;
    introClu6.x = introClu6X; introClu6.y = introClu6Y;
    introClu6.scaleX = introClu6.scaleY = 1.1;
    introClu6.gotoAndStop(26)
    container.parent.addChild(introClu7);
    introClu7.visible = false;
    introClu7.x = introClu7X; introClu7.y = introClu7Y;
    introClu7.scaleX = introClu7.scaleY = 1.1;
    introClu7.gotoAndStop(26)
    container.parent.addChild(introClu8);
    introClu8.visible = false;
    introClu8.x = introClu8X; introClu8.y = introClu8Y;
    introClu8.scaleX = introClu8.scaleY = 1.1;
    introClu8.gotoAndStop(26)
    container.parent.addChild(introClu9);
    introClu9.visible = false;
    introClu9.x = introClu9X; introClu9.y = introClu9Y;
    introClu9.scaleX = introClu9.scaleY = 1.1;
    introClu9.gotoAndStop(26)
    container.parent.addChild(introClu10);
    introClu10.visible = false;
    introClu10.x = introClu10X; introClu10.y = introClu10Y;
    introClu10.scaleX = introClu10.scaleY = 1.1;
    introClu10.gotoAndStop(26)
    container.parent.addChild(introClu11);
    introClu11.visible = false;
    introClu11.x = introClu11X; introClu11.y = introClu11Y;
    introClu11.scaleX = introClu11.scaleY = 1.1;
    introClu11.gotoAndStop(26)
    container.parent.addChild(introClu12);
    introClu12.visible = false;
    introClu12.x = introClu12X; introClu12.y = introClu12Y;
    introClu12.scaleX = introClu12.scaleY = 1.1;
    introClu12.gotoAndStop(26)

    introClueArr.push("", introClu1, introClu2, introClu3, introClu4, introClu5, introClu6, introClu7, introClu8, introClu9, introClu10, introClu11, introClu12)

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {
    introHolder.visible = true;
    introHolder.alpha = 0
    createjs.Tween.get(introHolder).to({ alpha: 1 }, 500)

    introQues1.visible = true;
    introQues1.alpha = 0
    createjs.Tween.get(introQues1).wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);



}
function handleComplete2_1() {
    choiceTween()
}
function choiceTween() {
    for (i = 1; i < 13; i++) {
        introClueArr[i].visible = true;
        introClueArr[i].gotoAndStop(26)
    }
    var val = 700
    for (i = 1; i < 5; i++) {

        this["introChoice" + i].y = 590, this["introChoice" + i].x = this["introChoice" + i].x;
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i]).wait(val).to({ y: 580, scaleX: .8, scaleY: .8, alpha: 1 }, val).call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i]).wait(val).to({ y: 580, scaleX: .8, scaleY: .8, alpha: 1 }, val);
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
        highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: ArrowYArr[TempIntroVal] + 10 }, 250).to({ y: ArrowYArr[TempIntroVal] }, 250)
            .to({ y: ArrowYArr[TempIntroVal] + 10 }, 250).to({ y: ArrowYArr[TempIntroVal] }, 250).wait(300).call(this.onComplete1)

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
        if (TempIntroVal == 12) {
            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 250).to({ x: FingXArr[TempIntroVal] - 15 }, 250)
                .to({ x: FingXArr[TempIntroVal] }, 250).to({ x: FingXArr[TempIntroVal] - 15 }, 250).wait(150).call(this.onComplete2)
        }
        else {
            highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: FingXArr[TempIntroVal] }, 250).to({ x: FingXArr[TempIntroVal] - 15 }, 250)
                .to({ x: FingXArr[TempIntroVal] }, 250).to({ x: FingXArr[TempIntroVal] - 15 }, 250).wait(150).call(handleComplete4_1)
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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introQues1)
    introQues1.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    container.parent.removeChild(introChoice1)
    introChoice1.visible = false
    container.parent.removeChild(introChoice2)
    introChoice2.visible = false
    container.parent.removeChild(introChoice3)
    introChoice3.visible = false
    container.parent.removeChild(introChoice4)
    introChoice4.visible = false
    container.parent.removeChild(introHolder)
    introHolder.visible = false;
    for (i = 1; i < 13; i++) {
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
    container.parent.removeChild(introClu5)
    introClu5.visible = false
    container.parent.removeChild(introClu6)
    introClu6.visible = false
    container.parent.removeChild(introClu7)
    introClu7.visible = false
    container.parent.removeChild(introClu8)
    introClu8.visible = false
    container.parent.removeChild(introClu9)
    introClu9.visible = false
    container.parent.removeChild(introClu10)
    introClu10.visible = false
    container.parent.removeChild(introClu11)
    introClu11.visible = false
    container.parent.removeChild(introClu12)
    introClu12.visible = false

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