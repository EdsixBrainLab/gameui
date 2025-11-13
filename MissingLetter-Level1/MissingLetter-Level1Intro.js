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

var introChoicePosX = [, introChoice1X, introChoice2X, introChoice3X, introChoice4X];
var introChoicePosY = [, introChoice1Y, introChoice2Y, introChoice3Y, introChoice4Y];

var introClu1X = 380, introClu1Y = 220;
var introClu2X = 537, introClu2Y = 220;
var introClu3X = 691, introClu3Y = 220;
var introClu4X = 846, introClu4Y = 220;

var introCluePosX = [, introClu1X, introClu2X, introClu3X, introClu4X];
var introCluePosY = [, introClu1Y, introClu2Y, introClu3Y, introClu4Y];
var introArrowX = 944, introArrowY = 470;
var introfingureX = 970, introfingureY = 573;

var ArrowXArr = [, 500, 940, 720, 280], FingXArr = [, 505, 945, 725, 285]
var ArrowYArr = [, 470, 470, 470, 470], FingYArr = [, 590, 590, 590, 590]
var introClueArr = []
var introClueTxtArr = ["", 17, 0, 26, 13]
var introClueBgArr = []
var introChoiceBgArr = []
var introChoiceGlowArr = []
var introQuestionCard;

function buildIntroChoiceBackground() {
    var shape = new createjs.Shape();
    drawChoiceTileBackground(shape);
    shape.alpha = 0;
    shape.visible = false;
    shape.mouseEnabled = false;
    shape.mouseChildren = false;
    return shape;
}

function buildIntroChoiceGlow() {
    var glow = new createjs.Shape();
    drawChoiceSpeechWave(glow);
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    return glow;
}

function buildIntroClueBackground() {
    var shape = new createjs.Shape();
    drawClueSlotBackground(shape);
    shape.alpha = 0;
    shape.visible = false;
    shape.mouseEnabled = false;
    shape.mouseChildren = false;
    return shape;
}

function commongameintro() {
    introClueArr = []
    introClueBgArr = []
    introChoiceBgArr = []
    introChoiceGlowArr = []
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
    call_UI_introQuestionCardContainer(container, introSampleText);
    introQuestionCard = typeof questionCardContainer_htp !== "undefined" ? questionCardContainer_htp : null;
    if (introQuestionCard) {
        introQuestionCard.visible = false;
        introQuestionCard.alpha = 0;
    }
    if (typeof in_introQues1 !== "undefined") {
        introQues1 = in_introQues1;
    }
    if (introQues1) {
        introQues1.visible = false;
    }

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;

    for (var c = 1; c < 5; c++) {
        if (!introChoiceGlowArr[c]) {
            introChoiceGlowArr[c] = buildIntroChoiceGlow();
            container.parent.addChild(introChoiceGlowArr[c]);
        }
        introChoiceGlowArr[c].x = introChoicePosX[c];
        introChoiceGlowArr[c].y = introChoicePosY[c];
        introChoiceGlowArr[c].alpha = 0;
        introChoiceGlowArr[c].visible = false;

        if (!introChoiceBgArr[c]) {
            introChoiceBgArr[c] = buildIntroChoiceBackground();
            container.parent.addChild(introChoiceBgArr[c]);
        }
        introChoiceBgArr[c].x = introChoicePosX[c];
        introChoiceBgArr[c].y = introChoicePosY[c];
        introChoiceBgArr[c].alpha = 0;
        introChoiceBgArr[c].visible = false;

        var choiceLabel = this["introChoice" + c];
        container.parent.addChild(choiceLabel);
        choiceLabel.x = introChoicePosX[c];
        choiceLabel.y = introChoicePosY[c];
        choiceLabel.visible = false;
    }

    updateIntroChoiceLetter(introChoice1, 13);
    updateIntroChoiceLetter(introChoice2, 17);
    updateIntroChoiceLetter(introChoice3, 0);
    updateIntroChoiceLetter(introChoice4, 8);

    cluegotoArr = [, 26, 0, 17, 13]
    for (var k = 1; k < 5; k++) {
        if (!introClueBgArr[k]) {
            introClueBgArr[k] = buildIntroClueBackground();
            container.parent.addChild(introClueBgArr[k]);
        }
        introClueBgArr[k].x = introCluePosX[k];
        introClueBgArr[k].y = introCluePosY[k];
        introClueBgArr[k].alpha = 0;
        introClueBgArr[k].visible = false;

        var clueLabel = this["introClu" + k];
        container.parent.addChild(clueLabel);
        clueLabel.x = introCluePosX[k];
        clueLabel.y = introCluePosY[k];
        clueLabel.scaleX = clueLabel.scaleY = 1;
        clueLabel.visible = false;
        updateIntroClueLetter(clueLabel, introClueTxtArr[k]);
    }
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
        if (introClueBgArr[i]) {
            introClueBgArr[i].visible = true;
            introClueBgArr[i].alpha = 0;
            introClueBgArr[i].scaleX = introClueBgArr[i].scaleY = .95;
            createjs.Tween.get(introClueBgArr[i]).wait(val1)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, createjs.Ease.quadOut);
        }

        introClueArr[i].visible = true;
        introClueArr[i].alpha = 0;
        introClueArr[i].scaleX = introClueArr[i].scaleY = .9;
        updateIntroClueLetter(introClueArr[i], introClueTxtArr[i])
        createjs.Tween.get(introClueArr[i]).wait(val1)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, createjs.Ease.quadOut);
        val1=val1+150
    }

    if (introQuestionCard) {
        introQuestionCard.visible = true;
        introQuestionCard.alpha = 0;
        introQuestionCard.scaleX = introQuestionCard.scaleY = 0.82;
        createjs.Tween.get(introQuestionCard, { override: true })
            .wait(900)
            .to({ alpha: 1, scaleX: 0.9, scaleY: 0.9 }, 400, createjs.Ease.quadOut)
            .call(handleComplete2_1);
    } else if (introQues1) {
        introQues1.visible = true;
        introQues1.alpha = 0;
        createjs.Tween.get(introQues1)
            .wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);
    } else {
        createjs.Tween.get({}).wait(1000).call(handleComplete2_1);
    }
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
        if (introChoiceGlowArr[i]) {
            introChoiceGlowArr[i].visible = true;
            introChoiceGlowArr[i].alpha = 0;
            introChoiceGlowArr[i].scaleX = introChoiceGlowArr[i].scaleY = .78;
            createjs.Tween.get(introChoiceGlowArr[i]).wait(val)
                .to({ alpha: 0.45, scaleX: .85, scaleY: .85 }, 280, createjs.Ease.quadOut);
        }
        if (introChoiceBgArr[i]) {
            introChoiceBgArr[i].visible = true;
            introChoiceBgArr[i].alpha = 0;
            introChoiceBgArr[i].scaleX = introChoiceBgArr[i].scaleY = .72;
            createjs.Tween.get(introChoiceBgArr[i]).wait(val)
                .to({ alpha: 1, scaleX: .82, scaleY: .82 }, 320, createjs.Ease.quadOut);
        }
        this["introChoice" + i].y = introChoicePosY[i] + 30;
        this["introChoice" + i].x = introChoicePosX[i];
        this["introChoice" + i].visible = true;
        this["introChoice" + i].alpha = 0;
        if (i == 4) {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: introChoicePosY[i], scaleX: .82, scaleY: .82, alpha: 1 }, 320, createjs.Ease.quadOut).call(handleComplete4_1);
        }
        else {
            createjs.Tween.get(this["introChoice" + i])
                .wait(val)
                .to({ y: introChoicePosY[i], scaleX: .82, scaleY: .82, alpha: 1 }, 320, createjs.Ease.quadOut);
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
    if (introQuestionCard) {
        if (introQuestionCard.parent) {
            introQuestionCard.parent.removeChild(introQuestionCard);
        }
        introQuestionCard.visible = false;
        introQuestionCard = null;
    }
    if (introQues1) {
        if (introQues1.parent) {
            introQues1.parent.removeChild(introQues1);
        }
        introQues1.visible = false
    }
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
        if (introChoiceGlowArr[i]) {
            if (introChoiceGlowArr[i].parent) {
                introChoiceGlowArr[i].parent.removeChild(introChoiceGlowArr[i]);
            }
            introChoiceGlowArr[i].visible = false;
        }
        if (introChoiceBgArr[i]) {
            if (introChoiceBgArr[i].parent) {
                introChoiceBgArr[i].parent.removeChild(introChoiceBgArr[i]);
            }
            introChoiceBgArr[i].visible = false;
        }
        if (introClueBgArr[i]) {
            if (introClueBgArr[i].parent) {
                introClueBgArr[i].parent.removeChild(introClueBgArr[i]);
            }
            introClueBgArr[i].visible = false;
        }
        if (introClueArr[i]) {
            introClueArr[i].visible = false;
            if (introClueArr[i].parent) {
                introClueArr[i].parent.removeChild(introClueArr[i]);
            }
        }
    }
    introClueArr = [];
    introClueBgArr = [];
    introChoiceBgArr = [];
    introChoiceGlowArr = [];

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