var introQues,introTitle, introQuestxt, introArrow, introfingure;
var introChoiceQues=[]
var introchoiceArr=[]
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuesTextX =0, introQuesTextY = -50;
var introQuesX = 540, introQuesY =200
var introArrowX = 765, introArrowY = 520;
var introfingureX =800, introfingureY = 590;
var introQuestionLetters = ["C", "A", "", "E"];
var introQuestionRevealLetters = ["C", "A", "K", "E"];
var introChoiceLetters = ["L", "M", "K"];
var INTRO_CLUE_ROW_Y = typeof CLUE_ROW_Y === "number" ? CLUE_ROW_Y : 490;
var INTRO_CHOICE_ROW_Y = typeof CHOICE_ROW_Y === "number" ? CHOICE_ROW_Y : 620;
var introQuestionPanel = null;
var introQuestionPanelBg = null;
var introQuestionPanelHighlight = null;
var introQuestionImageHolder = null;
var introCluePanelBg = null;
var introChoicePanelBg = null;
function commongameintro() {
    var stageRef = container.parent || stage;
     introTitle=Title.clone()
    stageRef.addChild(introTitle)
        introTitle.visible = true;
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 650;
    introTitle.y = INTRO_TITLE_Y;

    introQuestxt = QusTxtString.clone();
    stageRef.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, stageRef, {padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke:"rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22});

    var promptX = QusTxtString && typeof QusTxtString.x === "number"
        ? QusTxtString.x
        : canvas && !isNaN(canvas.width)
        ? canvas.width / 2
        : 640;
    var promptY = QusTxtString && typeof QusTxtString.y === "number" ? QusTxtString.y : INTRO_PROMPT_Y - 55;
    introQuestxt.x = promptX;
    introQuestxt.y = promptY - 40;
    introQuestxt.visible = false;
    introQuestxt.alpha = 0;

    if (!introQuestionPanel) {
        introQuestionPanel = new createjs.Container();
        introQuestionPanel.visible = false;
        introQuestionPanel.alpha = 0;
        introQuestionPanel.mouseEnabled = false;
        introQuestionPanel.mouseChildren = false;

        introQuestionPanelBg = new createjs.Shape();
        introQuestionPanelBg.shadow = new createjs.Shadow("rgba(6,14,36,0.42)", 0, 18, 44);
        introQuestionPanel.addChild(introQuestionPanelBg);

        introQuestionPanelHighlight = new createjs.Shape();
        introQuestionPanelHighlight.mouseEnabled = false;
        introQuestionPanelHighlight.mouseChildren = false;
        introQuestionPanelHighlight.alpha = 0.72;
        introQuestionPanelHighlight.graphics
            .beginRadialGradientFill(
                ["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"],
                [0, 1],
                0,
                0,
                0,
                0,
                0,
                128
            )
            .drawCircle(0, 0, 128);
        introQuestionPanelHighlight.y = -QUESTION_PANEL_HEIGHT * 0.18;
        introQuestionPanel.addChild(introQuestionPanelHighlight);

        introQuestionImageHolder = new createjs.Container();
        introQuestionImageHolder.mouseEnabled = false;
        introQuestionImageHolder.mouseChildren = false;
        introQuestionPanel.addChild(introQuestionImageHolder);

        stageRef.addChild(introQuestionPanel);
    }

    drawQuestionPanelBackground(introQuestionPanelBg, QUESTION_PANEL_WIDTH, QUESTION_PANEL_HEIGHT);
    introQuestionPanel.x = promptX;
    introQuestionPanel.y = typeof QUESTION_PANEL_Y === "number" ? QUESTION_PANEL_Y : 300;
    introQuestionPanel.scaleX = introQuestionPanel.scaleY = QUESTION_PANEL_BASE_SCALE;
    introQuestionPanel.visible = false;
    introQuestionPanel.alpha = 0;
    if (introQuestionPanelHighlight) {
        introQuestionPanelHighlight.alpha = 0.72;
        introQuestionPanelHighlight.scaleX = introQuestionPanelHighlight.scaleY = 1;
    }

    introQuestionImageHolder.removeAllChildren();
    introQues = question.clone();
    introQues.regX = 174;
    introQues.regY = 174;
    introQues.x = 0;
    introQues.y = 16;
    introQues.scaleX = introQues.scaleY = 0.66;
    introQues.visible = false;
    introQues.gotoAndStop(0);
    introQuestionImageHolder.addChild(introQues);

    if (!introCluePanelBg) {
        introCluePanelBg = new createjs.Shape();
        introCluePanelBg.visible = false;
        introCluePanelBg.alpha = 0;
        introCluePanelBg.mouseEnabled = false;
        introCluePanelBg.mouseChildren = false;
        introCluePanelBg.shadow = new createjs.Shadow("rgba(5,12,28,0.36)", 0, 16, 36);
        stageRef.addChild(introCluePanelBg);
    }

    if (!introChoicePanelBg) {
        introChoicePanelBg = new createjs.Shape();
        introChoicePanelBg.visible = false;
        introChoicePanelBg.alpha = 0;
        introChoicePanelBg.mouseEnabled = false;
        introChoicePanelBg.mouseChildren = false;
        introChoicePanelBg.shadow = new createjs.Shadow("rgba(5,12,28,0.36)", 0, 18, 38);
        stageRef.addChild(introChoicePanelBg);
    }

    introCluePanelBg.y = INTRO_CLUE_ROW_Y;
    introChoicePanelBg.y = INTRO_CHOICE_ROW_Y;

    introArrow = arrow1.clone();
    introfingure = fingure.clone()




//////////////////////////////////////////////////////////////////////////

    var questionLayout = computeRowLayout(introQuestionLetters.length, {
        baseSpacing: 134,
        baseScale: 1,
        minScale: 0.82,
        maxSpan: 600,
        tileSpan: 108,
        centerX: promptX
    });

    for (i = 0; i < introQuestionLetters.length; i++) {
        if (!introChoiceQues[i]) {
            introChoiceQues[i] = new createjs.Container();
            introChoiceQues[i].visible = false;
            introChoiceQues[i].alpha = 0;
            introChoiceQues[i].mouseEnabled = false;
            introChoiceQues[i].mouseChildren = false;
            var introSlotBg = new createjs.Shape();
            drawClueSlotBackground(introSlotBg);
            introSlotBg.shadow = new createjs.Shadow("rgba(6,14,30,0.45)", 0, 10, 28);
            introChoiceQues[i].addChild(introSlotBg);
            var introSlotPlaceholder = new createjs.Shape();
            drawClueSlotPlaceholder(introSlotPlaceholder);
            introSlotPlaceholder.x = 0;
            introSlotPlaceholder.y = CLUE_LETTER_VERTICAL_OFFSET;
            introSlotPlaceholder.visible = false;
            introSlotPlaceholder.alpha = 0;
            introSlotPlaceholder.mouseEnabled = false;
            introSlotPlaceholder.mouseChildren = false;
            introChoiceQues[i].addChild(introSlotPlaceholder);
            var introSlotLabel = buildClueLetterDisplay();
            introSlotLabel.x = 0;
            introSlotLabel.y = CLUE_LETTER_VERTICAL_OFFSET;
            introChoiceQues[i].addChild(introSlotLabel);
            introChoiceQues[i].bg = introSlotBg;
            introChoiceQues[i].placeholder = introSlotPlaceholder;
            introChoiceQues[i].label = introSlotLabel;
            stageRef.addChild(introChoiceQues[i]);
        }

        introChoiceQues[i].x = questionLayout.positions[i];
        introChoiceQues[i].y = INTRO_CLUE_ROW_Y;
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = questionLayout.scale;
        introChoiceQues[i].__baseScale = questionLayout.scale;
        introChoiceQues[i].visible = false;
        introChoiceQues[i].alpha = 0;

        var introLetter = introQuestionLetters[i];
        if (introChoiceQues[i].bg) {
            drawClueSlotBackground(introChoiceQues[i].bg, introLetter ? CLUE_SLOT_BASE_COLORS : CLUE_SLOT_HIGHLIGHT_COLORS);
        }
        if (introChoiceQues[i].placeholder) {
            if (!introLetter) {
                introChoiceQues[i].placeholder.visible = true;
                introChoiceQues[i].placeholder.alpha = 0.82;
                startCluePlaceholderTwinkle(introChoiceQues[i]);
            } else {
                stopCluePlaceholderTwinkle(introChoiceQues[i]);
                introChoiceQues[i].placeholder.visible = false;
                introChoiceQues[i].placeholder.alpha = 0;
            }
        }
        if (introChoiceQues[i].label) {
            updateClueLetterDisplay(introChoiceQues[i].label, introLetter);
            introChoiceQues[i].label.alpha = introLetter ? 1 : 0;
        }
    }

    if (introCluePanelBg) {
        var introSlotCount = introQuestionLetters.length;
        if (introSlotCount > 0 && questionLayout.positions.length >= introSlotCount) {
            var introSlotScale = questionLayout.scale;
            var introSlotWidth = 108 * introSlotScale;
            var introSlotLeft = questionLayout.positions[0] - introSlotWidth / 2;
            var introSlotRight = questionLayout.positions[introSlotCount - 1] + introSlotWidth / 2;
            var introSlotCenter = (introSlotLeft + introSlotRight) / 2;
            var introSlotPanelWidth = (introSlotRight - introSlotLeft) + CLUE_PANEL_SIDE_PADDING * 2;
            updatePanelBackground(
                introCluePanelBg,
                introSlotCenter,
                introSlotPanelWidth,
                CLUE_PANEL_HEIGHT,
                drawCluePanelBackground
            );
            introCluePanelBg.visible = true;
            introCluePanelBg.alpha = 0;
        } else {
            introCluePanelBg.visible = false;
        }
    }

    var introChoiceLayout = computeRowLayout(introChoiceLetters.length, {
        baseSpacing: 186,
        baseScale: 0.72,
        minScale: 0.68,
        maxSpan: 540,
        tileSpan: 148,
        centerX: promptX
    });

    for (i = 0; i < introChoiceLetters.length; i++) {
        if (!introchoiceArr[i]) {
            introchoiceArr[i] = new createjs.Container();
            introchoiceArr[i].visible = false;
            introchoiceArr[i].alpha = 0;
            introchoiceArr[i].mouseEnabled = false;
            introchoiceArr[i].mouseChildren = false;
            introchoiceArr[i].shadow = new createjs.Shadow("rgba(0,0,0,0.25)", 0, 6, 12);
            var introChoiceBg = new createjs.Shape();
            drawChoiceTileBackground(introChoiceBg);
            introchoiceArr[i].addChild(introChoiceBg);
            var introChoiceLabel = buildChoiceLetterDisplay();
            introChoiceLabel.x = 0;
            introChoiceLabel.y = 0;
            introchoiceArr[i].addChild(introChoiceLabel);
            introchoiceArr[i].bg = introChoiceBg;
            introchoiceArr[i].label = introChoiceLabel;
            stageRef.addChild(introchoiceArr[i]);
        }

        introchoiceArr[i].x = introChoiceLayout.positions[i];
        introchoiceArr[i].y = INTRO_CHOICE_ROW_Y;
        introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = introChoiceLayout.scale;
        introchoiceArr[i].__baseScale = introChoiceLayout.scale;
        introchoiceArr[i].visible = false;
        introchoiceArr[i].alpha = 0;
        if (introchoiceArr[i].bg) {
            drawChoiceTileBackground(introchoiceArr[i].bg);
        }
        if (introchoiceArr[i].label) {
            updateChoiceLetterDisplay(introchoiceArr[i].label, introChoiceLetters[i]);
            introchoiceArr[i].label.alpha = 1;
        }
    }

    if (introChoicePanelBg) {
        var introChoiceCount = introChoiceLetters.length;
        if (introChoiceCount > 0 && introChoiceLayout.positions.length >= introChoiceCount) {
            var introChoiceScale = introChoiceLayout.scale;
            var introChoiceWidth = 148 * introChoiceScale;
            var introChoiceLeft = introChoiceLayout.positions[0] - introChoiceWidth / 2;
            var introChoiceRight = introChoiceLayout.positions[introChoiceCount - 1] + introChoiceWidth / 2;
            var introChoiceCenter = (introChoiceLeft + introChoiceRight) / 2;
            var introChoicePanelWidth = (introChoiceRight - introChoiceLeft) + CHOICE_PANEL_SIDE_PADDING * 2;
            updatePanelBackground(
                introChoicePanelBg,
                introChoiceCenter,
                introChoicePanelWidth,
                CHOICE_PANEL_HEIGHT,
                drawChoicePanelBackground
            );
            introChoicePanelBg.visible = true;
            introChoicePanelBg.alpha = 0;
        } else {
            introChoicePanelBg.visible = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////
    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        try {
            introQuestxt.__labelBG.update();
        } catch (_e) {}
    }

createjs.Tween.get(introQuestxt).to({ x: promptX, y: promptY, visible: true, alpha: 1 }, 1500) .call(handleComplete1_1);
     
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    if (introQuestionPanel) {
        introQuestionPanel.visible = true;
        introQuestionPanel.alpha = 0;
        var introPanelBase = QUESTION_PANEL_BASE_SCALE;
        introQuestionPanel.scaleX = introQuestionPanel.scaleY = introPanelBase * 0.88;
        createjs.Tween.get(introQuestionPanel, { override: true })
            .wait(320)
            .to({ alpha: 1, scaleX: introPanelBase * 1.02, scaleY: introPanelBase * 1.02 }, 320, createjs.Ease.backOut)
            .to({ scaleX: introPanelBase, scaleY: introPanelBase }, 220, createjs.Ease.quadOut);
    }

    if (introQuestionPanelHighlight) {
        introQuestionPanelHighlight.alpha = 0.72;
        introQuestionPanelHighlight.scaleX = introQuestionPanelHighlight.scaleY = 1.08;
        createjs.Tween.get(introQuestionPanelHighlight, { override: true })
            .wait(360)
            .to({ alpha: 0.95, scaleX: 1, scaleY: 1 }, 320, createjs.Ease.quadOut)
            .to({ alpha: 0.7 }, 260, createjs.Ease.quadInOut);
    }

    if (introQues) {
        introQues.visible = true;
        introQues.alpha = 0;
        introQues.scaleX = introQues.scaleY = 0.6;
        createjs.Tween.get(introQues, { override: true })
            .wait(360)
            .to({ alpha: 1, scaleX: 0.68, scaleY: 0.68 }, 320, createjs.Ease.quadOut)
            .to({ scaleX: 0.66, scaleY: 0.66 }, 220, createjs.Ease.quadOut)
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
    var time1=500
    if (introCluePanelBg && introCluePanelBg.visible) {
        introCluePanelBg.alpha = 0;
        createjs.Tween.get(introCluePanelBg, { override: true })
            .wait(Math.max(0, time1 - 220))
            .to({ alpha: 1 }, 320, createjs.Ease.quadOut);
    }
 for (i = 0; i < introQuestionLetters.length; i++) {
        if (!introChoiceQues[i]) {
            continue;
        }
        var letter = introQuestionLetters[i];
        if (introChoiceQues[i].bg) {
            drawClueSlotBackground(introChoiceQues[i].bg, letter ? CLUE_SLOT_BASE_COLORS : CLUE_SLOT_HIGHLIGHT_COLORS);
        }
        if (introChoiceQues[i].label) {
            updateClueLetterDisplay(introChoiceQues[i].label, letter);
            introChoiceQues[i].label.alpha = letter ? 1 : 0;
        }
        introChoiceQues[i].visible = true
        introChoiceQues[i].alpha=0;
        introChoiceQues[i].rotation = 0;
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = (introChoiceQues[i].__baseScale || 1) * 0.9;
     if(i==introQuestionLetters.length-1)
     {

        createjs.Tween.get(introChoiceQues[i]).wait(time1)
            .to({ alpha: 1, scaleX: introChoiceQues[i].__baseScale || 1, scaleY: introChoiceQues[i].__baseScale || 1 }, time1, createjs.Ease.bounceInOut)

            .call(handleComplete3_1)
    }
    else{
 createjs.Tween.get(introChoiceQues[i]).wait(time1)
           .to({ alpha:1, scaleX: introChoiceQues[i].__baseScale || 1, scaleY: introChoiceQues[i].__baseScale || 1 }, time1, createjs.Ease.bounceInOut)

    }
    time1=time1+200
 }

}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
}
function choiceTween() {
var val =500
    if (introChoicePanelBg && introChoicePanelBg.visible) {
        introChoicePanelBg.alpha = 0;
        createjs.Tween.get(introChoicePanelBg, { override: true })
            .wait(Math.max(0, val - 200))
            .to({ alpha: 1 }, 280, createjs.Ease.quadOut);
    }
  for (i = 0; i < introChoiceLetters.length; i++) {
        if (!introchoiceArr[i]) {
            continue;
        }
        var baseScale = introchoiceArr[i].__baseScale || 0.72;
        if (introchoiceArr[i].bg) {
            drawChoiceTileBackground(introchoiceArr[i].bg);
        }
        if (introchoiceArr[i].label) {
            updateChoiceLetterDisplay(introchoiceArr[i].label, introChoiceLetters[i]);
            introchoiceArr[i].label.alpha = 1;
        }
        introchoiceArr[i].visible = true;
        introchoiceArr[i].alpha=0
        introchoiceArr[i].rotation = 0;
        introchoiceArr[i].y = INTRO_CHOICE_ROW_Y;
        introchoiceArr[i].scaleX=introchoiceArr[i].scaleY=baseScale*0.65
        if(i==introChoiceLetters.length-1)
{
         createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: INTRO_CHOICE_ROW_Y,rotation:180, scaleX: baseScale*0.7, scaleY: baseScale*0.7, alpha: .5 }, 200)
        .to({ y: INTRO_CHOICE_ROW_Y,rotation:360, scaleX: baseScale, scaleY: baseScale, alpha: 1 }, 200)
            .call(handleComplete3_2)
}  else{
createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: INTRO_CHOICE_ROW_Y,rotation:180, scaleX: baseScale*0.7, scaleY: baseScale*0.7, alpha: .5 }, 200)
        .to({ y: INTRO_CHOICE_ROW_Y,rotation:360, scaleX: baseScale, scaleY: baseScale, alpha: 1 }, 200)
            }
              val = val + 150
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
        introChoiceQues[2].visible = true
        if (introChoiceQues[2].bg) {
            drawClueSlotBackground(introChoiceQues[2].bg, CLUE_SLOT_SUCCESS_COLORS);
        }
        stopCluePlaceholderTwinkle(introChoiceQues[2]);
        if (introChoiceQues[2].placeholder) {
            introChoiceQues[2].placeholder.visible = false;
            introChoiceQues[2].placeholder.alpha = 0;
        }
        if (introChoiceQues[2].label) {
            updateClueLetterDisplay(introChoiceQues[2].label, introQuestionRevealLetters[2]);
            introChoiceQues[2].label.alpha = 1;
        }
        createjs.Tween.get(introChoiceQues[2])
            .to({ alpha: 1, scaleX: introChoiceQues[2].__baseScale || 1, scaleY: introChoiceQues[2].__baseScale || 1 }, 1000)
            .wait(500)
         createjs.Tween.get(introchoiceArr[2])
            .to({ alpha: 1,scaleX:(introchoiceArr[2].__baseScale || 0.72)*1.25,scaleY:(introchoiceArr[2].__baseScale || 0.72)*1.25}, 1000)
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
    if (introQuestionPanel && introQuestionPanel.parent) {
        introQuestionPanel.visible = false;
        introQuestionPanel.alpha = 0;
    }
    if (introQuestionImageHolder) {
        introQuestionImageHolder.removeAllChildren();
    }
    introQues.visible = false
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    if (introCluePanelBg && introCluePanelBg.parent) {
        introCluePanelBg.visible = false;
        introCluePanelBg.alpha = 0;
    }
    if (introChoicePanelBg && introChoicePanelBg.parent) {
        introChoicePanelBg.visible = false;
        introChoicePanelBg.alpha = 0;
    }
    for (i = 0; i < introChoiceQues.length; i++) {
        if (introChoiceQues[i]) {
            stopCluePlaceholderTwinkle(introChoiceQues[i]);
            if (introChoiceQues[i].placeholder) {
                introChoiceQues[i].placeholder.visible = false;
                introChoiceQues[i].placeholder.alpha = 0;
            }
            introChoiceQues[i].visible = false
            container.parent.removeChild(introChoiceQues[i])
        }
    }
   for (i = 0; i < introchoiceArr.length; i++) {
        if (introchoiceArr[i]) {
            introchoiceArr[i].visible = false
            container.parent.removeChild(introchoiceArr[i])
        }
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