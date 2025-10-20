var CycleIntroArr = [];
var introQuestxt, introQuestxt1, introChoice,introText, introTarget, introcycle1, introcycle2, introcycle3, introcycle4, introcycle5, introcycle9, introChHolder, introTarget
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introArrowX = 820, introArrowY = 350;
var introfingureX = 860, introfingureY = 460;
var cycleTweenArr = []
var introChoiceArr = []
var posY1 = [420, 440, 480, 500]
//var posY1 = [350, 380, 400, 440, 470, 510]
//var introCycleCntArr = [1, 2, 3, 4, 5, 9]
var introCycleCntArr = [1, 2, 3, 9]
var value = [0, 2, 1, 8]
var introHintTextMc;
var introQuestionBubble = null;
var introImageChoiceWrappers = [];
var introImageChoicePositions = [];

function introGetSpriteDimensions(sprite) {

    if (!sprite) {
        return null;
    }

    if (sprite.__naturalWidth && sprite.__naturalHeight) {
        return {
            width: sprite.__naturalWidth,
            height: sprite.__naturalHeight
        };
    }

    var bounds = null;

    if (typeof sprite.getBounds === "function") {
        bounds = sprite.getBounds();
    }

    if (!bounds && sprite.spriteSheet && typeof sprite.spriteSheet.getFrameBounds === "function") {
        bounds = sprite.spriteSheet.getFrameBounds(sprite.currentFrame || 0);
    }

    if (!bounds && sprite.spriteSheet && typeof sprite.spriteSheet.getFrame === "function") {
        var frame = sprite.spriteSheet.getFrame(sprite.currentFrame || 0);
        if (frame && frame.rect) {
            bounds = {
                width: frame.rect.width,
                height: frame.rect.height
            };
        }
    }

    if (!bounds && sprite.image) {
        bounds = {
            width: sprite.image.width || 0,
            height: sprite.image.height || 0
        };
    }

    if (!bounds) {
        return null;
    }

    return {
        width: bounds.width || 0,
        height: bounds.height || 0
    };
}

function introConfigureQuestionSprite(sprite, options) {

    if (!sprite) {
        return { width: 0, height: 0, offsetX: 0, offsetY: 0 };
    }

    options = options || {};

    if (typeof configureCycleRaceQuestionSprite === "function" && typeof cycleRaceQuestionBubble !== "undefined") {
        var previousBubble = cycleRaceQuestionBubble;
        cycleRaceQuestionBubble = introQuestionBubble;
        try {
            return configureCycleRaceQuestionSprite(sprite, options);
        } finally {
            cycleRaceQuestionBubble = previousBubble;
        }
    }

    var dims = introGetSpriteDimensions(sprite);
    if (!dims || !dims.width || !dims.height) {
        return { width: 0, height: 0, offsetX: 0, offsetY: 0 };
    }

    var bubbleOptions = (introQuestionBubble && introQuestionBubble.__options) || {};
    var availableWidth =
        options.maxWidth != null ? options.maxWidth : (bubbleOptions.width || 760) - 200;
    var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
    var availableHeight = options.maxHeight != null ? options.maxHeight : bodyHeight - 80;
    var baseScale =
        options.baseScale != null
            ? options.baseScale
            : sprite.__baseScale != null
            ? sprite.__baseScale
            : sprite.scaleX || 1;

    var scaleX = dims.width ? availableWidth / dims.width : baseScale;
    var scaleY = dims.height ? availableHeight / dims.height : baseScale;
    var targetScale = Math.min(baseScale, scaleX, scaleY);
    if (options.minScale != null) {
        targetScale = Math.max(options.minScale, targetScale);
    }

    sprite.scaleX = sprite.scaleY = targetScale;
    sprite.regX = dims.width / 2;
    sprite.regY = dims.height / 2;
    sprite.x = 0;
    sprite.y = 0;

    var visible = null;
    if (typeof measureCycleRaceSpriteVisibleBounds === "function") {
        visible = measureCycleRaceSpriteVisibleBounds(sprite);
    }

    var layoutWidth = (visible && visible.width ? visible.width : dims.width) * targetScale;
    var layoutHeight = (visible && visible.height ? visible.height : dims.height) * targetScale;
    var offsetX = visible && visible.centerOffsetX ? visible.centerOffsetX * targetScale : 0;
    var offsetY = visible && visible.centerOffsetY ? visible.centerOffsetY * targetScale : 0;

    sprite.__layoutWidth = layoutWidth;
    sprite.__layoutHeight = layoutHeight;
    sprite.__visualOffsetX = offsetX;
    sprite.__visualOffsetY = offsetY;

    return {
        width: layoutWidth,
        height: layoutHeight,
        offsetX: offsetX,
        offsetY: offsetY
    };
}

function getIntroQuestionLayoutMetrics() {

    var centerX = 640;
    var bubbleWidth = 780;
    var bubbleY = 248;
    var tailHeight = 60;
    var bodyHeight = 240;

    if (introQuestionBubble) {
        if (typeof introQuestionBubble.x === "number") {
            centerX = introQuestionBubble.x;
        }
        if (typeof introQuestionBubble.y === "number") {
            bubbleY = introQuestionBubble.y;
        }
        if (typeof introQuestionBubble.__visualCenterOffset === "number") {
            centerX += introQuestionBubble.__visualCenterOffset;
        } else if (
            introQuestionBubble.__options &&
            typeof introQuestionBubble.__options.visualCenterOffset === "number"
        ) {
            centerX += introQuestionBubble.__options.visualCenterOffset;
        }
        if (introQuestionBubble.__options) {
            if (introQuestionBubble.__options.width != null) {
                bubbleWidth = introQuestionBubble.__options.width;
            }
            if (introQuestionBubble.__options.tailHeight != null) {
                tailHeight = introQuestionBubble.__options.tailHeight;
            }
            if (introQuestionBubble.__options.height != null) {
                bodyHeight = Math.max(
                    introQuestionBubble.__options.height - tailHeight,
                    180
                );
            }
        }
    }

    var bubbleBottom = bubbleY + bodyHeight / 2 + tailHeight;

    return {
        centerX: centerX,
        width: bubbleWidth,
        bottom: bubbleBottom
    };
}

function computeIntroImageChoiceLayout() {

    var fallbackX = [360, 520, 760, 920];
    var fallbackY = [556, 556, 556, 556];

    if (typeof SAUI_computeCenteredRow !== "function") {
        return {
            xPositions: fallbackX,
            yPositions: fallbackY
        };
    }

    var metrics = getIntroQuestionLayoutMetrics();
    var circleDiameter = 224;
    var horizontalPadding = 72;
    var availableSpan = Math.max(metrics.width - horizontalPadding * 2, circleDiameter * 4 + 240);
    var rowY = Math.max(metrics.bottom + 108, fallbackY[0]);

    var imageRowLayout = SAUI_computeCenteredRow(4, {
        centerX: metrics.centerX,
        baseSpacing: circleDiameter + 86,
        tileSpan: circleDiameter,
        maxSpan: availableSpan
    });

    var positions =
        imageRowLayout && imageRowLayout.positions && imageRowLayout.positions.length >= 4
            ? imageRowLayout.positions
            : [
                  metrics.centerX - circleDiameter * 1.5,
                  metrics.centerX - circleDiameter * 0.5,
                  metrics.centerX + circleDiameter * 0.5,
                  metrics.centerX + circleDiameter * 1.5
              ];

    return {
        xPositions: positions,
        yPositions: [rowY, rowY, rowY, rowY]
    };
}

function introCenterOptionBitmap(bitmap) {

    if (typeof centerCycleRaceOptionBitmap === "function") {
        return centerCycleRaceOptionBitmap(bitmap);
    }

    if (!bitmap || bitmap.__introCentered) {
        return;
    }

    var bounds = null;

    if (typeof getBitmapNaturalBounds === "function") {
        bounds = getBitmapNaturalBounds(bitmap);
    }

    if (!bounds && typeof bitmap.getBounds === "function") {
        bounds = bitmap.getBounds();
    }

    if (!bounds && bitmap.image) {
        bounds = {
            x: 0,
            y: 0,
            width: bitmap.image.width || 0,
            height: bitmap.image.height || 0
        };
    }

    if (!bounds || !bounds.width || !bounds.height) {
        return;
    }

    var originX = (bounds.x || 0) + bounds.width / 2;
    var originY = (bounds.y || 0) + bounds.height / 2;

    bitmap.regX = originX;
    bitmap.regY = originY;
    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.__introCentered = true;
}

function ensureIntroQuestionSurface() {

    if (typeof SAUI_createCycleRaceSpeechBubble === "function") {
        if (!introQuestionBubble) {
            introQuestionBubble = SAUI_createCycleRaceSpeechBubble({
                width: 780,
                height: 300,
                tailHeight: 60,
                tailWidth: 150,
                cornerRadius: 52,
                title: null,
                visualCenterOffset: 16,
                contentOffsetY: -12
            });
            introQuestionBubble.x = 640;
            introQuestionBubble.y = 248;
        }

        if (!introQuestionBubble.parent) {
            container.parent.addChild(introQuestionBubble);
        }

        var content = introQuestionBubble.__content || introQuestionBubble;
        if (introQuestxt1 && introQuestxt1.parent !== content) {
            content.addChild(introQuestxt1);
        }
        if (introImg && introImg.parent !== content) {
            content.addChild(introImg);
        }

        introQuestionBubble.visible = false;
        introQuestionBubble.alpha = 0;
    } else {
        if (introQuestxt1 && !introQuestxt1.parent) {
            container.parent.addChild(introQuestxt1);
        }
        if (introImg && !introImg.parent) {
            container.parent.addChild(introImg);
        }
    }
}

function layoutIntroQuestionContent() {

    if (!introQuestionBubble) {
        return null;
    }

    var content = introQuestionBubble.__content || introQuestionBubble;
    var bubbleOptions = introQuestionBubble.__options || {};
    var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
    var innerTop = -bodyHeight / 2 + 36;
    var innerBottom = bodyHeight / 2 - 36;
    var availableWidth = (bubbleOptions.width || 760) - 220;
    var nodes = [];

    if (introQuestxt1 && introQuestxt1.visible && introQuestxt1.parent === content) {
        var textMetrics = introConfigureQuestionSprite(introQuestxt1, {
            maxWidth: availableWidth - 16,
            maxHeight: Math.max(bodyHeight * 0.38, 120)
        });
        nodes.push({ node: introQuestxt1, metrics: textMetrics });
    }

    if (introImg && introImg.visible && introImg.parent === content) {
        var imageMetrics = introConfigureQuestionSprite(introImg, {
            maxWidth: availableWidth,
            maxHeight: Math.max(bodyHeight * 0.6, 160)
        });
        nodes.push({ node: introImg, metrics: imageMetrics });
    }

    if (!nodes.length) {
        return null;
    }

    var spacing = nodes.length > 1 ? Math.min(48, Math.max(30, bodyHeight * 0.1)) : 0;
    var totalHeight = 0;

    for (var i = 0; i < nodes.length; i++) {
        var entry = nodes[i];
        var height = entry.metrics && entry.metrics.height ? entry.metrics.height : entry.node.__layoutHeight || 0;
        if (!height && typeof entry.node.getBounds === "function") {
            var b = entry.node.getBounds();
            if (b) {
                height = (b.height || 0) * Math.abs(entry.node.scaleY || 1);
            }
        }
        entry.__height = height;
        totalHeight += height;
        if (i < nodes.length - 1) {
            totalHeight += spacing;
        }
    }

    var centerY = (innerTop + innerBottom) / 2;
    var currentY = centerY - totalHeight / 2;

    for (var j = 0; j < nodes.length; j++) {
        var item = nodes[j];
        var width = item.metrics && item.metrics.width ? item.metrics.width : item.node.__layoutWidth || 0;
        var heightVal = item.__height || 0;
        var offsetX = item.metrics && item.metrics.offsetX ? item.metrics.offsetX : item.node.__visualOffsetX || 0;
        var offsetY = item.metrics && item.metrics.offsetY ? item.metrics.offsetY : item.node.__visualOffsetY || 0;
        var halfHeight = heightVal / 2;
        var targetCenterY = currentY + halfHeight;

        if (targetCenterY - halfHeight + offsetY < innerTop) {
            targetCenterY = innerTop + halfHeight - offsetY;
        }
        if (targetCenterY + halfHeight + offsetY > innerBottom) {
            targetCenterY = innerBottom - halfHeight - offsetY;
        }

        item.node.x = -offsetX;
        item.node.y = targetCenterY - offsetY;
        item.node.__introTargetY = item.node.y;
        item.node.__introTargetX = item.node.x;

        currentY += heightVal + (j < nodes.length - 1 ? spacing : 0);
    }

    return { nodes: nodes };
}

function initializeIntroChoiceWrappers() {

    var layout = computeIntroImageChoiceLayout();
    var positionsX = layout.xPositions || [];
    var positionsY = layout.yPositions || [];

    for (var idx = 0; idx < introChoiceArr.length; idx++) {
        introImageChoicePositions[idx] = {
            x: positionsX[idx] != null ? positionsX[idx] : 360 + idx * 120,
            y: positionsY[idx] != null ? positionsY[idx] : 556
        };

        var wrapper = introImageChoiceWrappers[idx];
        if (!wrapper && typeof SAUI_createCycleRaceOptionBubble === "function") {
            wrapper = SAUI_createCycleRaceOptionBubble({ variant: "image" });
            introImageChoiceWrappers[idx] = wrapper;
        }

        if (wrapper) {
            wrapper.visible = false;
            wrapper.alpha = 0;
            wrapper.mouseEnabled = false;
            wrapper.cursor = "default";
            wrapper.x = introImageChoicePositions[idx].x;
            wrapper.y = introImageChoicePositions[idx].y;
            wrapper.__homeX = wrapper.x;
            wrapper.__homeY = wrapper.y;
            if (!wrapper.parent) {
                container.parent.addChild(wrapper);
            }
            if (wrapper.__content && wrapper.__content.numChildren) {
                wrapper.__content.removeAllChildren();
            }
        }

        if (introChoiceArr[idx]) {
            introCenterOptionBitmap(introChoiceArr[idx]);
            introChoiceArr[idx].visible = true;
            introChoiceArr[idx].alpha = 1;
            introChoiceArr[idx].x = 0;
            introChoiceArr[idx].y = 0;
            if (wrapper && wrapper.__content && introChoiceArr[idx].parent !== wrapper.__content) {
                wrapper.__content.addChild(introChoiceArr[idx]);
            } else if (wrapper && introChoiceArr[idx].parent !== wrapper) {
                wrapper.addChild(introChoiceArr[idx]);
            } else if (!wrapper && !introChoiceArr[idx].parent) {
                container.parent.addChild(introChoiceArr[idx]);
                introChoiceArr[idx].x = introImageChoicePositions[idx].x;
                introChoiceArr[idx].y = introImageChoicePositions[idx].y;
            }
        }
    }
}

function showIntroQuestionBubble(delay) {

    if (!introQuestionBubble) {
        return;
    }

    if (typeof SAUI_showCycleRaceSpeechBubble === "function") {
        SAUI_showCycleRaceSpeechBubble(introQuestionBubble, delay || 0);
    } else {
        introQuestionBubble.visible = true;
        introQuestionBubble.alpha = 1;
    }
}

function hideIntroQuestionBubble() {

    if (!introQuestionBubble) {
        return;
    }

    if (typeof SAUI_hideCycleRaceSpeechBubble === "function") {
        SAUI_hideCycleRaceSpeechBubble(introQuestionBubble);
    } else {
        introQuestionBubble.visible = false;
        introQuestionBubble.alpha = 0;
    }
}
function commongameintro() {
    Title.visible=true;
     
    introQuestxt1 = questionText1.clone();
    introcycle1 = cycle1.clone();
    introcycle2 = cycle2.clone();
    introcycle3 = cycle3.clone();
	
  	introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke:"rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22});
	
    introcycle9 = cycle9.clone();
    introChoice = choice2.clone();
    introChHolder = chHolderMc.clone();
    introTarget = targetMc.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    container.parent.addChild(introTarget);
    introTarget.visible = true;
    introTarget.x = 1100;
    introTarget.y = 550;

    
    
    for (i = 0; i < 4; i++) {
       
        CycleIntroArr[i] = this["introcycle" + introCycleCntArr[i]].clone();
        container.parent.addChild(CycleIntroArr[i]);
        CycleIntroArr[i].scaleX = CycleIntroArr[i].scaleY = .5
        CycleIntroArr[i].x = 100
        CycleIntroArr[i].y = posY1[i]
        CycleIntroArr[i].stop();
        CycleIntroArr[i].visible = true;

    }
    introChHolder.visible = false;
    for (i = 0; i < 4; i++) {
        introChoiceArr[i] = introChoice.clone()
        introChoiceArr[i].visible = false;
        introChoiceArr[i].scaleX = introChoiceArr[i].scaleY = .78;
        introChoiceArr[i].x = 0;
        introChoiceArr[i].y = 0;
        introChoiceArr[i].gotoAndStop(value[i]);

    }
    introQuestxt1.gotoAndStop(8)
    introQuestxt1.visible = false;
    introQuestxt1.alpha = 0;

    introImg.visible = false;
    introImg.alpha = 0;
    introImg.scaleX=introImg.scaleY=.7
    introImg.x = 0;
    introImg.y = 0;

    ensureIntroQuestionSurface();
    initializeIntroChoiceWrappers();
    layoutIntroQuestionContent();

    //introText = new createjs.Text("Remember their positions", "30px Lato-Bold", "white")
    introText = new createjs.Text("", "30px Lato-Bold", "white")
    container.parent.addChild(introText);
    introText.textAlign = "center";
    introText.textBaseline = "middle";
    introText.x = 940;
    introText.y = 670;
    introText.visible = false;

     
      

    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;
    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();

    setTimeout(getRaceStarted, 400)

    setTimeout(setRaceCreateCycle1, 300)
    setTimeout(setRaceCreateCycle2, 300)
    setTimeout(setRaceCreateCycle3, 300)
    // setTimeout(setRaceCreateCycle4, 500)
    // setTimeout(setRaceCreateCycle5, 500)
    setTimeout(setRaceCreateCycle6, 300)


     

}
function introCycle() {
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i].currentFrame == 13) {
            CycleIntroArr[i].gotoAndPlay(0)
        }
    }

}
function getRaceStarted() {
    if (stopValue == 0) {
        console.log("getRaceStarted  == stopValue")
        removeGameIntro()

    }
    else {
        for (i = 0; i < 4; i++) {

            CycleIntroArr[i].play();
            CycleIntroArr[i].addEventListener("tick", introCycle)
        }

    }

}
function getRaceStop() {

    for (i = 0; i < 4; i++) {

        CycleIntroArr[i].stop();
        CycleIntroArr[i].removeEventListener("tick", introCycle)


    }

}
function setRaceCreateCycle1() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle1  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[0])
        cycleTweenArr[0] = createjs.Tween.get(CycleIntroArr[0]).to({ x: 100 }, 390).to({ x: 200 }, 390).to({ x: 330 }, 390).to({ x: 400 }, 390).
            to({ x: 500 }, 390).to({ x: 600 }, 390).to({ x: 700 }, 390).to({ x: 800 }, 390).to({ x: 900 }, 390).wait(400).call(this.onComplete);
    }
}
function setRaceCreateCycle2() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle2  == stopValue")
        removeGameIntro()

    }
    else {

        cycleTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[1])
        cycleTweenArr[1] = createjs.Tween.get(CycleIntroArr[1]).to({ x: 100 }, 340).to({ x: 200 }, 340).to({ x: 300 }, 340).to({ x: 400 }, 340).to({ x: 500 }, 340)
            .to({ x: 600 }, 340).to({ x: 700 }, 340).to({ x: 800 }, 340).to({ x: 900 }, 340).to({ x: 1000 }, 340).to({ x: 1050 }, 340).wait(400)
    }
}

function setRaceCreateCycle3() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle3  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[2] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[2])
        cycleTweenArr[2] = createjs.Tween.get(CycleIntroArr[2]).to({ x: 100 }, 460).to({ x: 250 }, 460).to({ x: 350 }, 460)
            .to({ x: 450 }, 460).to({ x: 550 }, 460).to({ x: 650 }, 460).to({ x: 750 }, 460).to({ x: 850 }, 460).wait(400)
    }
}

function setRaceCreateCycle6() {
    if (stopValue == 0) {
        console.log("setRaceCreateCycle6  == stopValue")
        removeGameIntro()

    }
    else {
        cycleTweenArr[3] = new createjs.MovieClip()
        container.parent.addChild(cycleTweenArr[3])
        cycleTweenArr[3] = createjs.Tween.get(CycleIntroArr[3]).to({ x: 100 }, 490).to({ x: 200 }, 490)
            .to({ x: 300 }, 490).to({ x: 400 }, 490).to({ x: 500 }, 490).to({ x: 600 }, 490).to({ x: 700 }, 490).wait(400)
    }
}

this.onComplete = function (e) {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
        getRaceStop();
		
		// Replace image with dynamic text
introHintTextMc = new createjs.Text("Remember their positions", "bold 28px 'Baloo 2'", "red");
introHintTextMc.x = canvas.width / 2;
introHintTextMc.y = 400;
introHintTextMc.textAlign = "center";
introHintTextMc.shadow = new createjs.Shadow("#000000", 2, 2, 5);
introHintTextMc.alpha = 0;
stage.addChild(introHintTextMc);

// Animate visibility with tween (similar to original)
createjs.Tween.get(introHintTextMc)
  .to({ alpha: 1 }, 1000)
  .wait(3000)
  .call(handleComplete20_1);

 

      
    }

}
function handleComplete20_1(){
	introHintTextMc.alpha = 0;
    createjs.Tween.removeAllTweens();
    setIntroDelay()
}
function setIntroDelay() {
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
    //container.parent.removeChild(introQuestxt)
	if (introQuestxt && introQuestxt.__labelBG) 
	{
		introQuestxt.__labelBG.destroy();           
	}
		introQuestxt.visible = false;
		container.parent.removeChild(introQuestxt);
		//introQuestxt = null;

    container.parent.removeChild(introTarget)
    introTarget.visible = false;
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i]) {
            container.parent.removeChild(CycleIntroArr[i]);
        }
    }
    setTimeout(setIntroHolder, 50)
}
}
function setIntroHolder() {
    if (stopValue == 0) {
        console.log("setIntroHolder  == stopValue")
        removeGameIntro()

    }
    else {
        introText.visible=false;
        introHintTextMc.alpha = 0;
        if (introChHolder) {
            introChHolder.visible = false;
        }
        ensureIntroQuestionSurface();
        if (introImg) {
            introImg.visible = false;
            introImg.alpha = 0;
        }
        if (introQuestxt1) {
            introQuestxt1.visible = true;
            introQuestxt1.alpha = 0;
        }
        layoutIntroQuestionContent();
        showIntroQuestionBubble(100);
        if (introQuestxt1) {
            createjs.Tween.get(introQuestxt1).to({ alpha: 1 }, 700).call(handleComplete1_5);
        } else {
            handleComplete1_5();
        }

    }


}
function handleComplete1_5() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("onComplete  == stopValue")
        removeGameIntro()

    }
    else {
        choiceTween()
    }

}
function choiceTween() {

    layoutIntroQuestionContent();
    initializeIntroChoiceWrappers();

    var longestDelay = 0;

    for (i = 0; i < introChoiceArr.length; i++) {
        var wrapper = introImageChoiceWrappers[i];
        var delay = 220 + i * 140;

        if (wrapper && typeof SAUI_showCycleRaceOptionBubble === "function") {
            SAUI_showCycleRaceOptionBubble(wrapper, delay);
            if (typeof SAUI_startCycleRaceOptionIdle === "function") {
                (function (targetWrapper, waitDelay) {
                    createjs.Tween.get(targetWrapper, { override: false })
                        .wait(waitDelay + 620)
                        .call(function () {
                            SAUI_startCycleRaceOptionIdle(targetWrapper);
                        });
                })(wrapper, delay);
            }
            longestDelay = Math.max(longestDelay, delay);
        } else if (introChoiceArr[i]) {
            var choiceDisplay = introChoiceArr[i];
            choiceDisplay.visible = true;
            choiceDisplay.alpha = 0;
            if (introImageChoicePositions[i]) {
                choiceDisplay.x = introImageChoicePositions[i].x;
                choiceDisplay.y = introImageChoicePositions[i].y;
            }
            createjs.Tween.get(choiceDisplay)
                .wait(delay)
                .to({ alpha: 1 }, 320, createjs.Ease.quadOut);
            longestDelay = Math.max(longestDelay, delay);
        }
    }

    createjs.Tween.get({}).wait(longestDelay + 1800).call(handleComplete1_6);

}
function handleComplete1_6() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("handleComplete1_5  == stopValue")
        removeGameIntro()

    }
    else {
        introCh()
    }

}
function introCh(){
    ensureIntroQuestionSurface();
    if (introQuestxt1) {
        introQuestxt1.visible = false;
    }
    if (!introImg) {
        handleComplete2_1();
        return;
    }
    introImg.visible = true;
    introImg.alpha = 0;
    layoutIntroQuestionContent();
    var targetY = typeof introImg.__introTargetY === "number" ? introImg.__introTargetY : 0;
    var targetX = typeof introImg.__introTargetX === "number" ? introImg.__introTargetX : 0;
    introImg.y = targetY + 120;
    introImg.x = targetX;
    createjs.Tween.get(introImg)
        .to({ alpha: 1, y: targetY }, 520, createjs.Ease.quartOut)
        .wait(4000)
        .call(handleComplete2_1);
}
function handleComplete2_1(){
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
        highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: introArrowY + 10 }, 450).to({ y: introArrowY }, 450).to({ y: introArrowY + 10 }, 450)
            .to({ y: introArrowY }, 450).to({ y: introArrowY + 10 }, 450).to({ y: introArrowY }, 450).wait(400).call(this.onComplete1)

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
        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 450).to({ x: introfingureX - 15 }, 450).to({ x: introfingureX }, 450).to({ x: introfingureX - 15 }, 450).wait(200).call(this.onComplete2)

    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeAllTweens();
    // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        container.parent.removeChild(highlightTweenArr[0]);
    }
    // }
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

    // // for (i = 0; i < 2; i++) {
    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        container.parent.removeChild(highlightTweenArr[1]);
    }
    // // }
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
    Title.visible=false;
    createjs.Tween.removeAllTweens();
    hideIntroQuestionBubble();
    if (introQuestxt1) {
        introQuestxt1.visible = false;
        introQuestxt1.alpha = 0;
        if (introQuestionBubble && introQuestionBubble.__content && introQuestxt1.parent === introQuestionBubble.__content) {
            introQuestionBubble.__content.removeChild(introQuestxt1);
        }
    }
    if (introImg) {
        introImg.visible = false;
        introImg.alpha = 0;
        if (introQuestionBubble && introQuestionBubble.__content && introImg.parent === introQuestionBubble.__content) {
            introQuestionBubble.__content.removeChild(introImg);
        }
    }
    for (i = 0; i < introImageChoiceWrappers.length; i++) {
        var wrapper = introImageChoiceWrappers[i];
        if (wrapper) {
            if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                SAUI_stopCycleRaceOptionIdle(wrapper);
            }
            wrapper.visible = false;
            wrapper.alpha = 0;
            wrapper.mouseEnabled = false;
        }
        if (introChoiceArr[i]) {
            introChoiceArr[i].visible = false;
            introChoiceArr[i].alpha = 0;
        }
    }
    container.parent.removeChild(introTarget)
    introTarget.visible = false
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
    container.parent.removeChild(introcycle1)
    introcycle1.visible = false
    container.parent.removeChild(introcycle2)
    introcycle2.visible = false
    container.parent.removeChild(introcycle3)
    introcycle3.visible = false
    container.parent.removeChild(introcycle9)
    introcycle9.visible = false
    container.parent.removeChild(introChHolder)
    introChHolder.visible = false;

    container.parent.removeChild(introHintTextMc)
    introHintTextMc.alpha = 0;
    

    if (highlightTweenArr[0]) {
        highlightTweenArr[0].setPaused(false);
        container.parent.removeChild(highlightTweenArr[0]);
    }
    if (highlightTweenArr[1]) {
        highlightTweenArr[1].setPaused(false);
        container.parent.removeChild(highlightTweenArr[1]);
    }
    getRaceStop();
    for (i = 0; i < 4; i++) {
        if (CycleIntroArr[i]) {
            container.parent.removeChild(CycleIntroArr[i]);
        }
    }
    for (i = 0; i < 4; i++) {
        container.parent.removeChild(introChoiceArr[i])
        introChoiceArr[i].visible = false;
    }
}