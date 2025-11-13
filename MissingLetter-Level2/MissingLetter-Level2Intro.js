var introQues1, introQuestxt, introtextArr1, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 636; introQuestxtY = 120;
var introQues1X = 630, introQues1Y = 280

var introChoice1X = 280, introChoice1Y = 590;
var introChoice2X = 500, introChoice2Y = 590;
var introChoice3X = 720, introChoice3Y = 590;
var introChoice4X = 940, introChoice4Y = 590;

var introClu1X = 377, introClu1Y = 230;
var introClu2X = 532, introClu2Y = 230;
var introClu3X = 687, introClu3Y = 230;
var introClu4X = 842, introClu4Y = 230;
var introArrowX = 940, introArrowY = 470;
var introfingureX = 940, introfingureY = 570;

var ArrowXArr = [, 500, 940, 720, 280], FingXArr = [, 505, 945, 725, 285]
var ArrowYArr = [, 470, 470, 470, 470], FingYArr = [, 590, 590, 590, 590]
var introClueArr = []
var introClueTxtArr = ["", 17, 0, 26, 13]

function commongameintro() {
    introClueArr = []
    introTitle = Title.clone()
    introClu1 = quekey.clone()
    introClu2 = quekey.clone()
    introClu3 = quekey.clone()
    introClu4 = quekey.clone()

    introChoice1 = choice1.clone()
    introChoice2 = choice1.clone()
    introChoice3 = choice1.clone()
    introChoice4 = choice1.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    introQues1 = introClueText.clone()
    container.parent.addChild(introQues1);
    introQues1.visible = false;
    introQues1.x = -395; introQues1.y = 390;
    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;

    container.parent.addChild(introChoice1)
    introChoice1.x = introChoice1X;
    introChoice1.y = introChoice1Y;

    introChoice1.visible = false;
    introChoice1.gotoAndStop(13);
    container.parent.addChild(introChoice2)
    introChoice2.visible = false;
    introChoice2.x = introChoice2X;
    introChoice2.y = introChoice2Y;

    introChoice2.gotoAndStop(17)
    container.parent.addChild(introChoice3)
    introChoice3.visible = false;
    introChoice3.x = introChoice3X;
    introChoice3.y = introChoice3Y;

    introChoice3.gotoAndStop(0)
    container.parent.addChild(introChoice4)
    introChoice4.visible = false;
    introChoice4.x = introChoice4X;
    introChoice4.y = introChoice4Y;

    introChoice4.gotoAndStop(8)

    cluegotoArr = [, 26, 0, 17, 13]
    container.parent.addChild(introClu1)
    introClu1.x = introClu1X;
    introClu1.y = introClu1Y;
    introClu1.scaleX = introClu1.scaleY = 1;
    introClu1.visible = false;
    introClu1.gotoAndStop(17);
    container.parent.addChild(introClu2)
    introClu2.visible = false;
    introClu2.x = introClu2X;
    introClu2.y = introClu2Y;
    introClu2.scaleX = introClu2.scaleY = 1;
    introClu2.gotoAndStop(0)
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
    introClu4.gotoAndStop(13)
    introClueArr.push("", introClu1, introClu2, introClu3, introClu4)

    introtextArr1 = new createjs.Text("I", "135px Veggieburger-Bold", "white")
    container.parent.addChild(introtextArr1);
    introtextArr1.textAlign = "center";
    introtextArr1.textBaseline = "middle";
    introtextArr1.x = 960
    introtextArr1.y = 620
    introtextArr1.visible = false;
    introQuestxt. y = 0;
    if (lang == "ArabicQuestionText/") {
        introQuestxt.y = introQuestxt.y + 8;
    }

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete2_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {

    introQues1.visible = true;
    introQues1.alpha = 0
    introQues1
    createjs.Tween.get(introQues1)
        .to({ x: 395, alpha: 1 }, 500).call(handleComplete3_1);
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    QuesArrTween()
}
function QuesArrTween() {
    var val = 250
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = true;
        introClueArr[i].alpha = 0;
        introClueArr[i].gotoAndStop(introClueTxtArr[i])
        if (i == 4) {
            createjs.Tween.get(introClueArr[i]).wait(val)
                .to({ alpha: 1 }, val)
                .call(handleComplete1_1);
        }
        else {
            createjs.Tween.get(introClueArr[i])
                .wait(val)
                .to({ alpha: 1 }, val);
        }
        val = val + 150
    }
}
function handleComplete3_1() {
    choiceTween()
}
function choiceTween() {

    var val = 250
    for (i = 1; i < 5; i++) {

        this["introChoice" + i].y = 590, this["introChoice" + i].x = this["introChoice" + i].x;
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i]).wait(val)
                .to({ y: 590, scaleX: .8, scaleY: .8, alpha: 1 }, val).wait(500)
                .call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: 590, scaleX: .8, scaleY: .8, alpha: 1 }, val);
        }

        val = val + 150
    }
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

        highlightTweenArr[0] = createjs.Tween.get(introArrow)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350)
            .wait(400)
            .call(this.onComplete1)

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
        highlightTweenArr[1] = createjs.Tween.get(introfingure)
            .to({ x: introfingureX }, 350)
            .to({ x: introfingureX - 15 }, 350)
            .to({ x: introfingureX }, 350)
            .to({ x: introfingureX - 15 }, 350)
            .wait(200)
            .call(this.onComplete2)

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


      setTimeout(AnswerValidate,500)  

    }
}
function AnswerValidate()
{
        createjs.Tween.removeAllTweens();
        introtextArr1.visible = true;
        introtextArr1. alpha = 0
        introtextArr1.x=965
        introtextArr1.y=625
        createjs.Tween.get(introtextArr1).wait(200)
            .to({ x: 965, y: 625, scaleX: .8, scaleY: .8, alpha: 1 }, 500)
             .to({ x: 855, y: 480, scaleX: .8, scaleY: .8, alpha: 1 }, 500)
              .to({ visible:false,x: 720, y: 280,  alpha: 0 }, 500)
             //  .to({ visible:false,x: 720, y: 250, alpha: 0}, 250)
               .call(ValueTween)
}
function ValueTween()
{
       createjs.Tween.removeAllTweens();
       introtextArr1.visible=false
        introClu3.visible = true;
        introClu3.alpha = 0;
        introClu3.gotoAndStop(8)
        createjs.Tween.get(introClu3)
            .to({ x: 687, y: 230, alpha: 1 }, 1000).call(setCallDelay)
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
     container.parent.removeChild(introtextArr1)
    introtextArr1.visible = false
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