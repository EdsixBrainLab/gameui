var introQues,introTitle, introQuestxt, introArrow, introfingure;
var introChoiceQues=[]
var introchoiceArr=[]
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 640; introQuestxtY = 135;

var introQuesTextX =0, introQuesTextY = -50;
var introArrowX = 835, introArrowY = 520;
var introfingureX =840, introfingureY = 640;
var introConfigSource = (typeof window !== "undefined" && window.WhoAmIIntroConfig) ? window.WhoAmIIntroConfig : {};
var introSampleWord = "";
var introSampleLetters = [];
var introSampleBlankIndex = 0;
var introSampleChoiceLetters = [];
var introSampleCorrectIndex = 0;
function introGenerateSampleData() {
    introConfigSource = (typeof window !== "undefined" && window.WhoAmIIntroConfig)
        ? window.WhoAmIIntroConfig
        : introConfigSource || {};
    introSampleWord = "";
    if (introConfigSource && typeof introConfigSource.sampleWord === "string") {
        introSampleWord = introConfigSource.sampleWord.trim();
    }
    if (!introSampleWord) {
        introSampleWord = "cake";
    }
    introSampleWord = introSampleWord.toUpperCase();
    introSampleLetters = introSampleWord.split("");
    if (!introSampleLetters.length) {
        introSampleLetters = ["A"];
    }
    var requestedBlank = (introConfigSource && typeof introConfigSource.blankIndex === "number")
        ? introConfigSource.blankIndex
        : Math.floor(introSampleLetters.length / 2);
    if (requestedBlank < 0) {
        requestedBlank = 0;
    }
    if (requestedBlank >= introSampleLetters.length) {
        requestedBlank = introSampleLetters.length - 1;
    }
    introSampleBlankIndex = requestedBlank;
    var missingLetter = introSampleLetters[introSampleBlankIndex] || "A";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var decoys = [];
    if (introConfigSource && Array.isArray(introConfigSource.decoyLetters)) {
        for (var d = 0; d < introConfigSource.decoyLetters.length; d++) {
            var decoyLetter = ("" + introConfigSource.decoyLetters[d]).trim().toUpperCase();
            if (decoyLetter && decoyLetter !== missingLetter && decoys.indexOf(decoyLetter) === -1) {
                decoys.push(decoyLetter);
            }
        }
    }
    for (var idx = 0; decoys.length < 2 && idx < alphabet.length; idx++) {
        var candidate = alphabet[idx];
        if (candidate === missingLetter) {
            continue;
        }
        if (decoys.indexOf(candidate) === -1) {
            decoys.push(candidate);
        }
    }
    if (decoys.length < 2) {
        decoys.push("B");
    }
    if (decoys.length < 2) {
        decoys.push("C");
    }
    var choiceList = decoys.slice(0, 2);
    var requestedCorrect = (introConfigSource && typeof introConfigSource.correctIndex === "number")
        ? introConfigSource.correctIndex
        : 1;
    if (requestedCorrect < 0) {
        requestedCorrect = 0;
    }
    if (requestedCorrect > choiceList.length) {
        requestedCorrect = choiceList.length;
    }
    introSampleCorrectIndex = requestedCorrect;
    choiceList.splice(introSampleCorrectIndex, 0, missingLetter);
    introSampleChoiceLetters = choiceList;
}
introGenerateSampleData();
var introQuestionHolder;
var introLayoutRoot;
var birthdayLayoutConfig = (typeof window !== "undefined" && window.WhoAmIBirthdayLayout) ? window.WhoAmIBirthdayLayout : {};
var introQuestionRowY = birthdayLayoutConfig.questionRowY || 500;
var introChoiceRowY = birthdayLayoutConfig.choiceRowY || 648;
var introHolderY = birthdayLayoutConfig.questionHolderY || 300;
var introQuestionSpacing = birthdayLayoutConfig.questionRowSpacing || 138;
var introChoiceSpacing = birthdayLayoutConfig.choiceRowSpacing || 190;
var introChoiceBaseScale = birthdayLayoutConfig.choiceBaseScale || 0.7;
var introQuestionImageScale = birthdayLayoutConfig.questionImageScale || 0.66;
function introGetCenterX() {
    if (birthdayLayoutConfig && typeof birthdayLayoutConfig.getStageCenter === "function") {
        var configCenter = birthdayLayoutConfig.getStageCenter();
        if (typeof configCenter === "number" && isFinite(configCenter)) {
            return configCenter;
        }
    }

    if (typeof getCanvasCenterX === "function") {
        var logicalCenter = getCanvasCenterX();
        if (typeof logicalCenter === "number" && isFinite(logicalCenter)) {
            return logicalCenter;
        }
    }

    if (stage && stage.canvas && typeof stage.canvas.width === "number") {
        var scaleX = (stage && typeof stage.scaleX === "number" && isFinite(stage.scaleX) && stage.scaleX !== 0)
            ? stage.scaleX
            : 1;
        return (stage.canvas.width / scaleX) / 2;
    }

    if (typeof canvas !== "undefined" && canvas && typeof canvas.width === "number") {
        return canvas.width / 2;
    }

    return 640;
}

function introComputeRowPositions(count, spacing, centerX) {
    if (birthdayLayoutConfig && typeof birthdayLayoutConfig.computeRowPositions === "function") {
        return birthdayLayoutConfig.computeRowPositions(count, spacing, centerX);
    }

    var positions = [];
    var total = parseInt(count, 10);
    if (!total || total <= 0) {
        return positions;
    }

    var gap = spacing || 120;
    var center = (typeof centerX === "number" && isFinite(centerX)) ? centerX : introGetCenterX();
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
}
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
var introStartChoicePulse = birthdayLayoutConfig.startChoicePulse || function(tile, baseScale) {
    if (tile) {
        var scale = typeof baseScale === "number" ? baseScale : (tile.baseScale || introChoiceBaseScale || 1);
        if (tile.__pulseTween) {
            tile.__pulseTween.setPaused(true);
        }
        tile.scaleX = tile.scaleY = scale;
        tile.__pulseTween = createjs.Tween.get(tile, { loop: true })
            .wait(220)
            .to({ scaleX: scale + 0.06, scaleY: scale + 0.06 }, 420, createjs.Ease.sineInOut)
            .to({ scaleX: scale, scaleY: scale }, 420, createjs.Ease.sineInOut);
    }
};
var introStopChoicePulse = birthdayLayoutConfig.stopChoicePulse || function(tile) {
    if (tile) {
        if (tile.__pulseTween) {
            tile.__pulseTween.setPaused(true);
            tile.__pulseTween = null;
        }
        if (typeof tile.baseScale === "number") {
            tile.scaleX = tile.scaleY = tile.baseScale;
        }
    }
};
function commongameintro() {
    introGenerateSampleData();
     introTitle=Title.clone()
    container.parent.addChild(introTitle)
        introTitle.visible = true;
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 650;
    introTitle.y = INTRO_TITLE_Y;

    if (introLayoutRoot && introLayoutRoot.parent) {
        introLayoutRoot.parent.removeChild(introLayoutRoot);
    }
    introLayoutRoot = new createjs.Container();
    introLayoutRoot.name = "birthdayIntroLayout";
    introLayoutRoot.mouseChildren = true;
    introLayoutRoot.mouseEnabled = false;
    container.parent.addChild(introLayoutRoot);

    var centerX = introGetCenterX();
    introLayoutRoot.x = centerX;
    introLayoutRoot.y = 0;
    var layoutCenterX = introLayoutRoot ? 0 : centerX;

    introQuestionHolder = introCreateHolder();
    introQuestionHolder.visible = false;
    introQuestionHolder.alpha = 0;
    introQuestionHolder.x = layoutCenterX;
    introQuestionHolder.y = introHolderY;
    introQuestionHolder.mouseEnabled = false;
    introLayoutRoot.addChild(introQuestionHolder);

    introQues = question.clone();
    introQuestionHolder.addChild(introQues)
    introQues.x = -48;
    introQues.y = -36;
    introQues.visible = false;
    introQues.alpha = 0;
    introQues.gotoAndStop(0);
    introQues.regX = 50;
    introQues.regY = 50;
    introQues.scaleX = introQues.scaleY = introQuestionImageScale;
    introQues.mouseEnabled = false;

     introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;
    introQuestxt.x = introQuestxtX;
    introQuestxt.y = introQuestxtY;

    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    
    introArrow = arrow1.clone();
    introfingure = fingure.clone()
  
 


//////////////////////////////////////////////////////////////////////////

    var introLetterPositions = introComputeRowPositions(introSampleLetters.length, introQuestionSpacing, layoutCenterX);
    for (i = 0; i < 4; i++) {
        introChoiceQues[i] = createBirthdayQuestionTile();
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = 1;
        introChoiceQues[i].visible = false;
        introChoiceQues[i].baseScale = 1;
        introLayoutRoot.addChild(introChoiceQues[i])
        introChoiceQues[i].x = introLetterPositions[i] || layoutCenterX;
        introChoiceQues[i].y= introQuestionRowY;
    }
    var introChoicePositions = introComputeRowPositions(introSampleChoiceLetters.length, introChoiceSpacing, layoutCenterX);
    for (i = 0; i < 3; i++) {
        introchoiceArr[i] = createBirthdayChoiceTile();
        introchoiceArr[i].baseScale = introChoiceBaseScale;
        if (introchoiceArr[i].inner) {
            introchoiceArr[i].inner.scaleX = introchoiceArr[i].inner.scaleY = introChoiceBaseScale;
        } else {
            introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = introChoiceBaseScale;
        }
        introchoiceArr[i].visible = false;
        introLayoutRoot.addChild(introchoiceArr[i]);
        introchoiceArr[i].x = introChoicePositions[i] || layoutCenterX;
        introchoiceArr[i].y = introChoiceRowY;
        introchoiceArr[i].__targetY = introChoiceRowY;
    }

////////////////////////////////////////////////////////////////////////////////////
     introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);

}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    var centerX = introGetCenterX();
    if (introLayoutRoot) {
        introLayoutRoot.x = centerX;
    }
    var layoutCenterX = introLayoutRoot ? 0 : centerX;
    if (introQuestionHolder) {
        introQuestionHolder.x = layoutCenterX;
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
    if (introLayoutRoot) {
        introLayoutRoot.x = centerX;
    }
    var layoutCenterX = introLayoutRoot ? 0 : centerX;
    var positions = introComputeRowPositions(introSampleLetters.length, introQuestionSpacing, layoutCenterX);
    for (i = 0; i < introSampleLetters.length; i++) {
        var tile = introChoiceQues[i];
        if (!tile) {
            continue;
        }
        tile.visible = true;
        tile.alpha = 0;
        tile.scaleX = tile.scaleY = 0.92;
        tile.x = positions[i] || layoutCenterX;
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
    if (introLayoutRoot) {
        introLayoutRoot.x = centerX;
    }
    var layoutCenterX = introLayoutRoot ? 0 : centerX;
    var positions = introComputeRowPositions(introSampleChoiceLetters.length, introChoiceSpacing, layoutCenterX);
    for (i = 0; i < introSampleChoiceLetters.length; i++) {
        var tile = introchoiceArr[i];
        if (!tile) {
            continue;
        }
        styleBirthdayChoiceTile(tile, introSampleChoiceLetters[i]);
        introStopChoicePulse(tile);
        tile.visible = true;
        tile.alpha = 0;
        if (tile.inner) {
            tile.inner.scaleX = tile.inner.scaleY = Math.max(introChoiceBaseScale - 0.18, 0.4);
        } else {
            tile.scaleX = tile.scaleY = Math.max(introChoiceBaseScale - 0.18, 0.4);
        }
        tile.x = positions[i] || layoutCenterX;
        tile.y = introChoiceRowY + 48;
        tile.mouseEnabled = false;
        tile.cursor = "default";
        (function(target, index) {
            var revealDelay = baseDelay + (index * 160);
            createjs.Tween.get(target, { override: true })
                .wait(revealDelay)
                .to({ alpha: 1, y: introChoiceRowY }, 320, createjs.Ease.quadOut);

            var scaleTarget = target.inner || target;
            createjs.Tween.get(scaleTarget, { override: true })
                .wait(revealDelay)
                .to({ scaleX: introChoiceBaseScale + 0.18, scaleY: introChoiceBaseScale + 0.18 }, 360, createjs.Ease.backOut)
                .to({ scaleX: introChoiceBaseScale, scaleY: introChoiceBaseScale }, 240, createjs.Ease.sineOut)
                .call(function () {
                    introStartChoicePulse(target, introChoiceBaseScale);
                    if (index === introSampleCorrectIndex) {
                        handleComplete3_2();
                    }
                });
        })(tile, i);
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
        introStopChoicePulse(introchoiceArr[introSampleCorrectIndex]);
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

    if (introArrow && introArrow.parent) {
        introArrow.parent.removeChild(introArrow);
    }
    if (introArrow) {
        introArrow.visible = false;
    }
    if (introfingure && introfingure.parent) {
        introfingure.parent.removeChild(introfingure);
    }
    if (introfingure) {
        introfingure.visible = false;
    }
    if (introQues && introQues.parent) {
        introQues.parent.removeChild(introQues);
    }
    introQues = null;
    if (introQuestionHolder && introQuestionHolder.parent) {
        introQuestionHolder.parent.removeChild(introQuestionHolder);
    }
    introQuestionHolder = null;
    if (introQuestxt && introQuestxt.__labelBG) {
        introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
    }
    if (introQuestxt && introQuestxt.parent) {
        introQuestxt.parent.removeChild(introQuestxt);
    }
    if (introQuestxt) {
        introQuestxt.visible = false;
    }
    introQuestxt = null;
    for (i = 0; i < 4; i++) {
        if (!introChoiceQues[i]) {
            continue;
        }
        introChoiceQues[i].visible = false;
        if (introChoiceQues[i].parent) {
            introChoiceQues[i].parent.removeChild(introChoiceQues[i]);
        }
    }
    for (i = 0; i < 3; i++) {
        if (!introchoiceArr[i]) {
            continue;
        }
        introStopChoicePulse(introchoiceArr[i]);
        introchoiceArr[i].visible = false;
        introchoiceArr[i].mouseEnabled = false;
        if (introchoiceArr[i].parent) {
            introchoiceArr[i].parent.removeChild(introchoiceArr[i]);
        }
    }
    if (introLayoutRoot && introLayoutRoot.parent) {
        introLayoutRoot.parent.removeChild(introLayoutRoot);
    }
    introLayoutRoot = null;
    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        if (highlightTweenArr[0].parent) {
            highlightTweenArr[0].parent.removeChild(highlightTweenArr[0]);
        }
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        if (highlightTweenArr[1].parent) {
            highlightTweenArr[1].parent.removeChild(highlightTweenArr[1]);
        }
    }
}