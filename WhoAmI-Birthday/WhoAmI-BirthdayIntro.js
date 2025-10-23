var introQues,introTitle, introQuestxt, introArrow, introfingure;
var introChoiceQues=[]
var introchoiceArr=[]
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuesTextX =0, introQuesTextY = -50;
var introArrowX = 765, introArrowY = 520;
var introfingureX =800, introfingureY = 590;
var introSampleLetters = ["C", "A", "K", "E"];
var introSampleBlankIndex = 2;
var introSampleChoiceLetters = ["L", "M", "K"];
var introSampleCorrectIndex = 2;
var introQuestionHolder;
var birthdayLayoutConfig = (typeof window !== "undefined" && window.WhoAmIBirthdayLayout) ? window.WhoAmIBirthdayLayout : {};
var introQuestionRowY = birthdayLayoutConfig.questionRowY || 492;
var introChoiceRowY = birthdayLayoutConfig.choiceRowY || 652;
var introHolderY = birthdayLayoutConfig.questionHolderY || 268;
var introQuestionSpacing = birthdayLayoutConfig.questionRowSpacing || 122;
var introChoiceSpacing = birthdayLayoutConfig.choiceRowSpacing || 186;
var introChoiceBaseScale = birthdayLayoutConfig.choiceBaseScale || 0.68;
var introQuestionImageScale = birthdayLayoutConfig.questionImageScale || 0.72;
var introComputeRowPositions = birthdayLayoutConfig.computeRowPositions || function(count, spacing, centerX) {
    var positions = [];
    var total = parseInt(count, 10);
    if (!total || total <= 0) {
        return positions;
    }
    var gap = spacing || 120;
    var center = (typeof centerX === "number" && isFinite(centerX)) ? centerX : ((stage && stage.canvas) ? stage.canvas.width / 2 : 640);
    if (total === 1) {
        positions.push(center);
        return positions;
    }
    var width = gap * (total - 1);
    var startX = center - (width / 2);
    for (var idx = 0; idx < total; idx++) {
        positions.push(startX + (idx * gap));
    }
    return positions;
};
var introGetCenterX = birthdayLayoutConfig.getStageCenter || function() {
    if (stage && stage.canvas) {
        return stage.canvas.width / 2;
    }
    return 640;
};
var introCreateHolder = birthdayLayoutConfig.createQuestionHolder || function() {
    if (typeof createBirthdayQuestionHolder === "function") {
        return createBirthdayQuestionHolder();
    }
    var placeholder = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.beginFill("rgba(255,255,255,0.35)").drawRoundRect(-180, -110, 360, 220, 40);
    placeholder.addChild(shape);
    return placeholder;
};
function commongameintro() {
     introTitle=Title.clone()
    container.parent.addChild(introTitle)
        introTitle.visible = true;
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 650;
    introTitle.y = INTRO_TITLE_Y;

    var centerX = introGetCenterX();

    introQuestionHolder = introCreateHolder();
    introQuestionHolder.visible = false;
    introQuestionHolder.alpha = 0;
    introQuestionHolder.x = centerX;
    introQuestionHolder.y = introHolderY;
    introQuestionHolder.mouseEnabled = false;
    container.parent.addChild(introQuestionHolder);

    introQues = question.clone();
    introQuestionHolder.addChild(introQues)
    introQues.x = 0;
    introQues.y = -6;
    introQues.visible = false;
    introQues.alpha = 0;
    introQues.gotoAndStop(0);
    introQues.regX = 50;
    introQues.regY = 50;
    introQues.scaleX = introQues.scaleY = introQuestionImageScale;
    introQues.mouseEnabled = false;

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke:"rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22});


    
    introArrow = arrow1.clone();
    introfingure = fingure.clone()
  
 


//////////////////////////////////////////////////////////////////////////

    var introLetterPositions = introComputeRowPositions(introSampleLetters.length, introQuestionSpacing, centerX);
    for (i = 0; i < 4; i++) {
        introChoiceQues[i] = createBirthdayQuestionTile();
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = 1;
        introChoiceQues[i].visible = false;
        container.parent.addChild(introChoiceQues[i])
        introChoiceQues[i].x = introLetterPositions[i] || centerX;
        introChoiceQues[i].y= introQuestionRowY;
    }
    var introChoicePositions = introComputeRowPositions(introSampleChoiceLetters.length, introChoiceSpacing, centerX);
     for (i = 0; i < 3; i++) {
        introchoiceArr[i] = createBirthdayChoiceTile();
        introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = introChoiceBaseScale;
        introchoiceArr[i].visible = false;
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].x = introChoicePositions[i] || centerX;
        introchoiceArr[i].y = introChoiceRowY;
    }

////////////////////////////////////////////////////////////////////////////////////
createjs.Tween.get(introQuestxt).to({ x: 635, y: INTRO_PROMPT_Y-50, visible: true, alpha: 1 }, 1500) .call(handleComplete1_1);

}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    var centerX = introGetCenterX();
    if (introQuestionHolder) {
        introQuestionHolder.x = centerX;
        introQuestionHolder.visible = true;
        introQuestionHolder.alpha = 0;
        introQuestionHolder.scaleX = introQuestionHolder.scaleY = 0.94;
        introQuestionHolder.y = introHolderY + 18;
        createjs.Tween.get(introQuestionHolder, { override: true })
            .wait(280)
            .to({ alpha: 1, scaleX: 1, scaleY: 1, y: introHolderY }, 320, createjs.Ease.quadOut);
    }
    if (introQues) {
        introQues.visible = true;
        introQues.alpha = 0;
        introQues.scaleX = introQues.scaleY = introQuestionImageScale * 0.92;
        createjs.Tween.get(introQues, { override: true })
            .wait(420)
            .to({ alpha: 1, scaleX: introQuestionImageScale + 0.05, scaleY: introQuestionImageScale + 0.05 }, 260, createjs.Ease.backOut)
            .to({ scaleX: introQuestionImageScale, scaleY: introQuestionImageScale }, 200, createjs.Ease.sineOut)
            .call(handleComplete2_1);
    } else {
        handleComplete2_1();
    }
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    QueschoiceTween()
}
function QueschoiceTween() {
    var baseDelay = 520;
    var centerX = introGetCenterX();
    var positions = introComputeRowPositions(introSampleLetters.length, introQuestionSpacing, centerX);
    for (i = 0; i < introSampleLetters.length; i++) {
        var tile = introChoiceQues[i];
        if (!tile) {
            continue;
        }
        tile.visible = true;
        tile.alpha = 0;
        tile.scaleX = tile.scaleY = 0.92;
        tile.x = positions[i] || centerX;
        tile.y = introQuestionRowY;
        styleBirthdayQuestionTile(tile, introSampleLetters[i], i === introSampleBlankIndex);
        var tween = createjs.Tween.get(tile, { override: true })
            .wait(baseDelay + (i * 140))
            .to({ alpha: 1, scaleX: 1.06, scaleY: 1.06 }, 260, createjs.Ease.backOut)
            .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineInOut);
        if (i === introSampleLetters.length - 1) {
            tween.call(handleComplete3_1);
        }
    }
}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
}
function choiceTween() {
    var baseDelay = 520;
    var centerX = introGetCenterX();
    var positions = introComputeRowPositions(introSampleChoiceLetters.length, introChoiceSpacing, centerX);
    for (i = 0; i < introSampleChoiceLetters.length; i++) {
        var tile = introchoiceArr[i];
        if (!tile) {
            continue;
        }
        styleBirthdayChoiceTile(tile, introSampleChoiceLetters[i]);
        tile.visible = true;
        tile.alpha = 0;
        tile.scaleX = tile.scaleY = Math.max(introChoiceBaseScale - 0.1, 0.5);
        tile.x = positions[i] || centerX;
        tile.y = introChoiceRowY + 28;
        var tween = createjs.Tween.get(tile, { override: true })
            .wait(baseDelay + (i * 150))
            .to({ alpha: 1, y: introChoiceRowY, scaleX: introChoiceBaseScale + 0.12, scaleY: introChoiceBaseScale + 0.12 }, 320, createjs.Ease.backOut)
            .to({ scaleX: introChoiceBaseScale, scaleY: introChoiceBaseScale }, 220, createjs.Ease.sineOut)
            .to({ scaleX: introChoiceBaseScale + 0.05, scaleY: introChoiceBaseScale + 0.05 }, 180, createjs.Ease.sineInOut)
            .to({ scaleX: introChoiceBaseScale, scaleY: introChoiceBaseScale }, 220, createjs.Ease.sineInOut);
        if (i === introSampleCorrectIndex) {
            tween.call(handleComplete3_2);
        }
    }
}
function handleComplete3_2() {
 createjs.Tween.removeAllTweens();
 setTimeout(setArrowTween,500)

}
function setArrowTween() {
    if(stopValue == 0) {
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
        .to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350)
        .to({ y: introArrowY + 10 }, 350)
       .to({ y: introArrowY }, 350)
       .to({ y: introArrowY + 10 }, 350)
       .to({ y: introArrowY }, 350).wait(400).call(this.onComplete1)
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
        .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
        .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
        .wait(200).call(this.onComplete2)        
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
         console.log("setCallDelay  == stopValue")   
        introChoiceQues[introSampleBlankIndex].visible = true
        styleBirthdayQuestionTile(introChoiceQues[introSampleBlankIndex], introSampleLetters[introSampleBlankIndex], false);
        createjs.Tween.get(introChoiceQues[introSampleBlankIndex])
            .to({ alpha: 1 }, 1000)
            .wait(500)
         createjs.Tween.get(introchoiceArr[introSampleCorrectIndex])
            .to({ alpha: 1,scaleX:.9,scaleY:.9}, 1000)
            .wait(500)
            .call(setCallDelay)
     }
       // setTimeout(setCallDelay, 1000)
   
}
function setCallDelay() {
    createjs.Tween.removeAllTweens();
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
    if (introQues && introQues.parent) {
        introQues.parent.removeChild(introQues);
    }
    if (introQuestionHolder && introQuestionHolder.parent) {
        introQuestionHolder.parent.removeChild(introQuestionHolder);
    }
    introQuestionHolder = null;
    introQues = null;
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    for (i = 0; i < 4; i++) {
        introChoiceQues[i].visible = false
        container.parent.removeChild(introChoiceQues[i])
    }
   for (i = 0; i < 3; i++) {
        introchoiceArr[i].visible = false
        container.parent.removeChild(introchoiceArr[i])
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