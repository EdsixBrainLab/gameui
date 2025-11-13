var introQues1, introQuestxt,introtextArr1, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 636; introQuestxtY = 120;
var introQues1X = 635, introQues1Y = 280

var introAlphaArr = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

function frameIndexToLetter(frameIndex) {
    if (frameIndex === 26) {
        return "_";
    }
    return introAlphaArr[frameIndex] || "";
}

function buildIntroChoiceLetter() {
    var txt = new createjs.Text("", "800 70px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.visible = false;
    return txt;
}

function updateIntroChoiceLetter(target, frameIndex) {
    if (!target) {
        return;
    }
    var value = frameIndex != null ? frameIndexToLetter(frameIndex) : "";
    target.text = value;
    target.alpha = value ? 1 : 0.15;
}

function buildIntroClueLetter() {
    var txt = new createjs.Text("", "800 64px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.32)", 0, 4, 12);
    txt.visible = false;
    return txt;
}

function updateIntroClueLetter(target, frameIndex) {
    if (!target) {
        return;
    }
    var value = frameIndex != null ? frameIndexToLetter(frameIndex) : "";
    target.text = value === "_" ? "_" : value;
    target.alpha = value ? 1 : 0.2;
}

var introChoice1X = 280, introChoice1Y = 590;
var introChoice2X = 500, introChoice2Y = 590;
var introChoice3X = 720, introChoice3Y = 590;
var introChoice4X = 940, introChoice4Y = 590;

var introClu1X = 380, introClu1Y = 220;
var introClu2X = 537, introClu2Y = 220;
var introClu3X = 691, introClu3Y = 220;
var introClu4X = 846, introClu4Y = 220;
var introArrowX = 944, introArrowY = 470;
var introfingureX = 970, introfingureY = 573;

var ArrowXArr = [, 500, 940, 720, 280], FingXArr = [, 505, 945, 725, 285]
var ArrowYArr = [, 470, 470, 470, 470], FingYArr = [, 590, 590, 590, 590]
var introClueArr = [] 
var introClueTxtArr = ["", 17, 0, 26, 13]

function commongameintro() {
    introClueArr = []
    introTitle = Title.clone()
    introClu1 = buildIntroClueLetter()
    introClu2 = buildIntroClueLetter()
    introClu3 = buildIntroClueLetter()
    introClu4 = buildIntroClueLetter()

    introChoice1 = buildIntroChoiceLetter()
    introChoice2 = buildIntroChoiceLetter()
    introChoice3 = buildIntroChoiceLetter()
    introChoice4 = buildIntroChoiceLetter()

    introArrow = arrow1.clone()
    introfingure = fingure.clone()


    container.parent.addChild(introTitle)
    introTitle.visible = true;



    var introSampleFrames = [17, 0, 26, 13];
    var introSampleText = "";
    for (var f = 0; f < introSampleFrames.length; f++) {
        introSampleText += frameIndexToLetter(introSampleFrames[f]) + (f < introSampleFrames.length - 1 ? "  " : "");
    }
    introQues1 = new createjs.Text(introSampleText, "800 70px 'Baloo 2'", "#F4FAFF");
    introQues1.textAlign = "center";
    introQues1.textBaseline = "middle";
    introQues1.shadow = new createjs.Shadow("rgba(6,16,40,0.46)", 0, 10, 26);
    container.parent.addChild(introQues1);
    introQues1.visible = false;
    introQues1.x = introQues1X;
    introQues1.y = introQues1Y + 130;

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;

    container.parent.addChild(introChoice1)
    introChoice1.x = introChoice1X;
    introChoice1.y = introChoice1Y;

    introChoice1.visible = false;
    updateIntroChoiceLetter(introChoice1, 13);
    container.parent.addChild(introChoice2)
    introChoice2.visible = false;
    introChoice2.x = introChoice2X;
    introChoice2.y = introChoice2Y;

    updateIntroChoiceLetter(introChoice2, 17)
    container.parent.addChild(introChoice3)
    introChoice3.visible = false;
    introChoice3.x = introChoice3X;
    introChoice3.y = introChoice3Y;

    updateIntroChoiceLetter(introChoice3, 0)
    container.parent.addChild(introChoice4)
    introChoice4.visible = false;
    introChoice4.x = introChoice4X;
    introChoice4.y = introChoice4Y;

    updateIntroChoiceLetter(introChoice4, 8)

    cluegotoArr = [, 26, 0, 17, 13]
    container.parent.addChild(introClu1)
    introClu1.x = introClu1X;
    introClu1.y = introClu1Y;
    introClu1.scaleX = introClu1.scaleY = 1;
    introClu1.visible = false;
    updateIntroClueLetter(introClu1, 17);
    container.parent.addChild(introClu2)
    introClu2.visible = false;
    introClu2.x = introClu2X;
    introClu2.y = introClu2Y;
    introClu2.scaleX = introClu2.scaleY = 1;
    updateIntroClueLetter(introClu2, 0)
    container.parent.addChild(introClu3)
    introClu3.visible = false;
    introClu3.x = introClu3X;
    introClu3.y = introClu3Y;
    introClu3.scaleX = introClu3.scaleY = 1;
    updateIntroClueLetter(introClu3, 26)
    container.parent.addChild(introClu4)
    introClu4.visible = false;
    introClu4.x = introClu4X;
    introClu4.y = introClu4Y;
    introClu4.scaleX = introClu4.scaleY = 1;
    updateIntroClueLetter(introClu4, 13)
    introClueArr.push("", introClu1, introClu2, introClu3, introClu4)

    introtextArr1 = new createjs.Text("I", "135px Veggieburger-Bold", "white")
    container.parent.addChild(introtextArr1);
    introtextArr1.textAlign = "center";
    introtextArr1.textBaseline = "middle";
    introtextArr1.x = 960
    introtextArr1.y = 620
    introtextArr1.visible = false;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);


}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()


}

function quesTween() {
     var val1 = 500
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = true;
           introClueArr[i].alpha=0;
        introClueArr[i].scaleX = introClueArr[i].scaleY = .95;
        updateIntroClueLetter(introClueArr[i], introClueTxtArr[i])
        if (i == 4) {
            createjs.Tween.get(introClueArr[i]) .wait(val1)
                .to({ alpha: 1, scaleX: .9, scaleY: .9 }, 250)
           
        }
        else {
            createjs.Tween.get(introClueArr[i]).wait(val1)
                .to({ alpha: 1, scaleX: .9, scaleY: .9 }, 250)
                
        }
        val1=val1+150
    }

    introQues1.visible = true;
    introQues1.alpha = 0
    createjs.Tween.get(introQues1)
        .wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    choiceTween();
}
function choiceTween() {
    var val = 700
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = true;
        updateIntroClueLetter(introClueArr[i], introClueTxtArr[i])
        this["introChoice" + i].y = 590, this["introChoice" + i].x = this["introChoice" + i].x;
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: 590, scaleX: .8, scaleY: .8, alpha: 1 }, val).call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: 590, scaleX: .8, scaleY: .8, alpha: 1 }, val);
        }
        val = val + 150
    }

    TempIntroVal = 0;
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
        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).wait(200).call(this.onComplete2)

    }
}
this.onComplete1 = function(e) {
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

this.onComplete2 = function(e) {
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
        updateIntroClueLetter(introClu3, 8)
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