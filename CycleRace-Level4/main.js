
//////////////////////////////////////////////////////===========COMMON GAME VARIABLES==========/////////////////////////////////////////////////////////////
var messageField;		//Message display field
var assets = [];
var assetsPath, gameAssetsPath, soundpath, bg;
var cnt = -1, qscnt = -1, qscnt = -1, ans, uans, interval, time = 180, totalQuestions = 10, answeredQuestions = 0, choiceCnt = 4, quesCnt = 0, resTimerOut = 0, rst = 0, responseTime = 0;
var startBtn, introScrn, container, question, quesMarkMc, questionText, questionText1, resultLoading, preloadMc, background2, chHolderMc;
var startMc, questionInterval = 0, chHolderMc = 0, backGround1;
var parrotWowMc, parrotOopsMc, parrotGameOverMc, parrotTimeOverMc, gameIntroAnimMc, targetMc, titleBg;
var bgSnd, correctSnd, wrongSnd, gameOverSnd, timeOverSnd, tickSnd;
var tqcnt = 0, aqcnt = 0, ccnt = 0, cqcnt = 0, gscore = 0, gscrper = 0, gtime = 0, rtime = 0, crtime = 0, wrtime = 0, currTime = 0, type1Cnt = -1, type2Cnt = -1;
var rst1 = 0, crst = 0, wrst = 0, score = 0, puzzle_cycle, timeOver_Status = 0;//for db //q
var isBgSound = true;
var isEffSound = true;
var url = "";
var nav = "";
var isResp = true;
var respDim = 'both'
var isScale = true
var scaleType = 1;
var lastW, lastH, lastS = 1;
var borderPadding = 10, barHeight = 20;
var loadProgressLabel, progresPrecentage, loaderWidth;
var settitle = 0;
////////////////////////////////////////////////////==========GAME SPECIFIC VARIABLES============/////////////////////////////////////////////////////////////
var position = 0;
var randomIndex = 39;
var bg1;
var runcnt = 0
var trackSpeed = 20;
var TOTAL_CYCLE = 6; // 
var stgWidth = 1050;

var isMobile, resizeCnt;
var pArr = []
var chVal, speed, count, spliceVal, introImg,introHintTextMc;
var qno1 = []
var qno = []
//////////////////////////////////////////////////////==========GAME SPECIFIC ARRAYS============/////////////////////////////////////////////////////////////
var choiceArr = []
var choiceArr1 = []

var cycleRaceQuestionBubble,
  cycleRaceTextChoiceWrappers = [],
  cycleRaceImageChoiceWrappers = [],
  cycleRaceTextChoicePositions = [],
  cycleRaceImageChoicePositions = [],
  cycleRaceHoverInHandler = null,
  cycleRaceHoverOutHandler = null;

var cycleRaceTrimCanvas = null;
var cycleRaceTrimContext = null;

var cycleRaceQuestionTextMeasure = null;
var cycleRaceImageQuestionTexts = [
        "Who finished first?",
        "Who finished second?",
        "Who finished third?",
        "Who finished fourth?",
        "Who finished fifth?",
        "Who finished sixth?"
];
var cycleRaceTextModePrompt = "Choose the racer that matches the clue.";
var cycleRaceIntroPrompt = "Watch the race carefully and remember the racers' finishing places.";

function getCycleRaceTrimContext(width, height) {

        if (typeof document === "undefined" || !document.createElement) {
                return null;
        }

        if (!cycleRaceTrimCanvas) {
                cycleRaceTrimCanvas = document.createElement("canvas");
        }

        var canvas = cycleRaceTrimCanvas;
        canvas.width = Math.max(1, Math.ceil(width));
        canvas.height = Math.max(1, Math.ceil(height));

        cycleRaceTrimContext = canvas.getContext("2d");

        if (!cycleRaceTrimContext) {
                return null;
        }

        cycleRaceTrimContext.clearRect(0, 0, canvas.width, canvas.height);

        return cycleRaceTrimContext;
}

function measureCycleRaceSpriteVisibleBounds(sprite) {

        if (!sprite || !sprite.spriteSheet || typeof sprite.spriteSheet.getFrame !== "function") {
                return null;
        }

        var frameIndex = sprite.currentFrame != null ? sprite.currentFrame : sprite._currentFrame || 0;
        var frame = sprite.spriteSheet.getFrame(frameIndex);

        if (!frame || !frame.image || !frame.rect) {
                return null;
        }

        var rect = frame.rect;
        var cacheStore = sprite.spriteSheet.__cycleRaceVisibleBoundsCache;

        if (!cacheStore) {
                cacheStore = sprite.spriteSheet.__cycleRaceVisibleBoundsCache = {};
        }

        var imageId = "";

        if (frame.image) {
                imageId = frame.image.currentSrc || frame.image.src || frame.image.id || "";
        }

        var cacheKey = [
                frameIndex,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                imageId
        ].join("|");

        if (cacheStore[cacheKey] !== undefined) {
                return cacheStore[cacheKey];
        }

        var ctx = getCycleRaceTrimContext(rect.width, rect.height);

        if (!ctx) {
                cacheStore[cacheKey] = null;
                return null;
        }

        try {
                ctx.drawImage(
                        frame.image,
                        rect.x,
                        rect.y,
                        rect.width,
                        rect.height,
                        0,
                        0,
                        rect.width,
                        rect.height
                );
        } catch (err) {
                cacheStore[cacheKey] = null;
                return null;
        }

        var imageData;

        try {
                imageData = ctx.getImageData(0, 0, rect.width, rect.height).data;
        } catch (err) {
                cacheStore[cacheKey] = null;
                return null;
        }

        var left = rect.width;
        var right = -1;
        var top = rect.height;
        var bottom = -1;

        for (var y = 0; y < rect.height; y++) {
                for (var x = 0; x < rect.width; x++) {
                        var alpha = imageData[(y * rect.width + x) * 4 + 3];

                        if (alpha > 8) {
                                if (x < left) {
                                        left = x;
                                }
                                if (x > right) {
                                        right = x;
                                }
                                if (y < top) {
                                        top = y;
                                }
                                if (y > bottom) {
                                        bottom = y;
                                }
                        }
                }
        }

        if (right < left || bottom < top) {
                cacheStore[cacheKey] = null;
                return null;
        }

        var visibleWidth = right - left + 1;
        var visibleHeight = bottom - top + 1;
        var result = {
                left: left,
                top: top,
                width: visibleWidth,
                height: visibleHeight,
                centerOffsetX: left + visibleWidth / 2 - rect.width / 2,
                centerOffsetY: top + visibleHeight / 2 - rect.height / 2
        };

        cacheStore[cacheKey] = result;

        return result;
}

function isCycleRaceTextDisplay(node) {

        if (typeof createjs === "undefined" || !createjs.Text) {
                return false;
        }

        return node instanceof createjs.Text;
}

function createCycleRaceQuestionTextDisplay(options) {

        if (typeof createjs === "undefined" || !createjs.Text) {
                return null;
        }

        options = options || {};

        var font = options.font || "700 36px 'Baloo 2'";
        var color = options.color || "#2F2F2F";
        var text = new createjs.Text("", font, color);
        text.textAlign = options.textAlign || "center";
        text.textBaseline = options.textBaseline || "middle";
        text.lineHeight = options.lineHeight || 44;
        text.visible = false;
        text.__baseScale = 1;
        text.__rawText = "";
        text.__layoutWidth = 0;
        text.__layoutHeight = 0;
        text.__visualOffsetX = 0;
        text.__visualOffsetY = 0;

        return text;
}

function setCycleRaceQuestionText(display, text) {

        if (!display) {
                return;
        }

        var value = text != null ? String(text) : "";

        display.__rawText = value;
        if (typeof display.text === "string" || typeof display.text === "undefined") {
                display.text = value;
        }

        display.__layoutWidth = 0;
        display.__layoutHeight = 0;
        display.__visualOffsetX = 0;
        display.__visualOffsetY = 0;
}

function wrapCycleRaceQuestionText(rawText, font, maxWidth) {

        var resultLines = [];

        if (rawText == null) {
                return resultLines;
        }

        var textValue = String(rawText).replace(/\r\n/g, "\n");
        var paragraphs = textValue.split("\n");

        if (!cycleRaceQuestionTextMeasure && typeof createjs !== "undefined" && createjs.Text) {
                cycleRaceQuestionTextMeasure = new createjs.Text("", font || "700 36px 'Baloo 2'", "#000000");
        }

        var measure = cycleRaceQuestionTextMeasure;
        var limit = maxWidth && maxWidth > 0 ? maxWidth : 0;

        for (var p = 0; p < paragraphs.length; p++) {
                var paragraph = paragraphs[p];

                if (!limit) {
                        resultLines.push(paragraph);
                        continue;
                }

                var trimmed = paragraph.trim();
                if (!trimmed) {
                        resultLines.push("");
                        continue;
                }

                var words = trimmed.split(/\s+/);
                var current = "";

                for (var w = 0; w < words.length; w++) {
                        var word = words[w];
                        if (!word) {
                                continue;
                        }

                        var candidate = current ? current + " " + word : word;

                        if (measure) {
                                if (font) {
                                        measure.font = font;
                                }
                                measure.text = candidate;
                        }

                        var width = measure && typeof measure.getMeasuredWidth === "function"
                                ? measure.getMeasuredWidth()
                                : 0;

                        if (limit > 0 && width > limit && current) {
                                resultLines.push(current);
                                current = "";
                                w--;
                                continue;
                        }

                        if (limit > 0 && width > limit) {
                                resultLines.push(candidate);
                                current = "";
                                continue;
                        }

                        current = candidate;
                }

                if (current) {
                        resultLines.push(current);
                }
        }

        if (!resultLines.length) {
                resultLines.push("");
        }

        return resultLines;
}

function configureCycleRaceQuestionDisplay(node, options) {

        if (isCycleRaceTextDisplay(node)) {
                return configureCycleRaceQuestionText(node, options);
        }

        return configureCycleRaceQuestionSprite(node, options || {});
}

function configureCycleRaceQuestionText(textDisplay, options) {

        if (!textDisplay) {
                return { width: 0, height: 0, offsetX: 0, offsetY: 0 };
        }

        options = options || {};

        var bubbleOptions = (cycleRaceQuestionBubble && cycleRaceQuestionBubble.__options) || {};
        var availableWidth = options.maxWidth != null ? options.maxWidth : (bubbleOptions.width || 760) - 220;
        var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
        var availableHeight = options.maxHeight != null ? options.maxHeight : bodyHeight - 80;
        var wrapWidth = options.wrapWidth != null ? options.wrapWidth : availableWidth;
        wrapWidth = Math.max(40, wrapWidth || 0);

        var font = textDisplay.font || "700 36px 'Baloo 2'";
        var lines = wrapCycleRaceQuestionText(textDisplay.__rawText != null ? textDisplay.__rawText : textDisplay.text, font, wrapWidth);

        if (!cycleRaceQuestionTextMeasure && typeof createjs !== "undefined" && createjs.Text) {
                cycleRaceQuestionTextMeasure = new createjs.Text("", font, textDisplay.color || "#2F2F2F");
        }

        var measure = cycleRaceQuestionTextMeasure;
        if (measure && font) {
                measure.font = font;
        }

        var lineHeight = options.lineHeight != null ? options.lineHeight : 0;
        if (!lineHeight && measure && typeof measure.getMeasuredLineHeight === "function") {
                lineHeight = measure.getMeasuredLineHeight() * 1.15;
        }
        if (!lineHeight || !isFinite(lineHeight)) {
                lineHeight = textDisplay.lineHeight || 44;
        }
        if (!lineHeight || !isFinite(lineHeight)) {
                lineHeight = 44;
        }

        var width = 0;
        if (measure && typeof measure.getMeasuredWidth === "function") {
                for (var i = 0; i < lines.length; i++) {
                        measure.text = lines[i];
                        var measured = measure.getMeasuredWidth();
                        if (!isFinite(measured)) {
                                measured = 0;
                        }
                        if (measured > width) {
                                width = measured;
                        }
                }
        } else {
                for (var j = 0; j < lines.length; j++) {
                        if (lines[j].length > width) {
                                width = lines[j].length * 18;
                        }
                }
        }

        width = Math.min(width, wrapWidth);

        var height = lines.length ? lineHeight * lines.length : 0;
        if (availableHeight && availableHeight > 0) {
                height = Math.min(height, availableHeight);
        }

        textDisplay.text = lines.join("\n");
        textDisplay.lineHeight = lineHeight;
        textDisplay.regX = width / 2;
        textDisplay.regY = height / 2;
        textDisplay.x = 0;
        textDisplay.y = 0;
        textDisplay.scaleX = textDisplay.scaleY = 1;
        textDisplay.__layoutWidth = width;
        textDisplay.__layoutHeight = height;
        textDisplay.__visualOffsetX = 0;
        textDisplay.__visualOffsetY = 0;

        return {
                width: width,
                height: height,
                offsetX: 0,
                offsetY: 0
        };
}

function getCycleRaceImageQuestionText(index) {

        if (!cycleRaceImageQuestionTexts || !cycleRaceImageQuestionTexts.length) {
                return "";
        }

        if (index == null || isNaN(index)) {
                return cycleRaceImageQuestionTexts[0] || "";
        }

        if (index < 0 || index >= cycleRaceImageQuestionTexts.length) {
                var normalized = ((index % cycleRaceImageQuestionTexts.length) + cycleRaceImageQuestionTexts.length) %
                        cycleRaceImageQuestionTexts.length;
                return cycleRaceImageQuestionTexts[normalized] || "";
        }

        return cycleRaceImageQuestionTexts[index] || "";
}

function getCycleRaceTextPrompt() {

        return cycleRaceTextModePrompt || "";
}

function getCycleRaceIntroPrompt() {

        return cycleRaceIntroPrompt || cycleRaceTextModePrompt || "";
}

function updateCycleRaceQuestionTextData(data) {

        if (!data) {
                return;
        }

        if (Array.isArray(data.imageQuestions)) {
                cycleRaceImageQuestionTexts = data.imageQuestions.map(function (entry) {
                        return entry != null ? String(entry) : "";
                });
        }

        if (typeof data.textModePrompt === "string") {
                cycleRaceTextModePrompt = data.textModePrompt;
        }

        if (typeof data.introPrompt === "string") {
                cycleRaceIntroPrompt = data.introPrompt;
        }

        if (questionText1) {
                setCycleRaceQuestionText(questionText1, getCycleRaceTextPrompt());
        }

        if (typeof introQuestxt1 !== "undefined" && introQuestxt1) {
                setCycleRaceQuestionText(introQuestxt1, getCycleRaceIntroPrompt());
        }
}

function ensureCycleRaceQuestionTextDisplays() {

        if (typeof createjs === "undefined" || !createjs.Text) {
                return;
        }

        if (!container || !container.parent) {
                return;
        }

        if (!isCycleRaceTextDisplay(question2)) {
                if (question2 && question2.parent) {
                        question2.parent.removeChild(question2);
                }
                question2 = createCycleRaceQuestionTextDisplay();
                if (question2) {
                        container.parent.addChild(question2);
                }
        }

        if (!isCycleRaceTextDisplay(questionText1)) {
                if (questionText1 && questionText1.parent) {
                        questionText1.parent.removeChild(questionText1);
                }
                questionText1 = createCycleRaceQuestionTextDisplay({ font: "700 32px 'Baloo 2'", lineHeight: 40 });
                if (questionText1) {
                        container.parent.addChild(questionText1);
                }
        }

        if (question2) {
                setCycleRaceQuestionText(question2, "");
                question2.visible = false;
        }

        if (questionText1) {
                setCycleRaceQuestionText(questionText1, getCycleRaceTextPrompt());
                questionText1.visible = false;
        }
}

function getCycleRaceQuestionLayoutMetrics() {

        var centerX = 640;
        var bubbleWidth = 780;
        var bubbleY = 248;
        var tailHeight = 60;
        var bodyHeight = 240;

        if (cycleRaceQuestionBubble) {
                if (typeof cycleRaceQuestionBubble.x === "number") {
                        centerX = cycleRaceQuestionBubble.x;
                }
                if (typeof cycleRaceQuestionBubble.y === "number") {
                        bubbleY = cycleRaceQuestionBubble.y;
                }
                if (typeof cycleRaceQuestionBubble.__visualCenterOffset === "number") {
                        centerX += cycleRaceQuestionBubble.__visualCenterOffset;
                } else if (
                        cycleRaceQuestionBubble.__options &&
                        typeof cycleRaceQuestionBubble.__options.visualCenterOffset === "number"
                ) {
                        centerX += cycleRaceQuestionBubble.__options.visualCenterOffset;
                }
                if (cycleRaceQuestionBubble.__options) {
                        if (cycleRaceQuestionBubble.__options.width != null) {
                                bubbleWidth = cycleRaceQuestionBubble.__options.width;
                        }
                        if (cycleRaceQuestionBubble.__options.tailHeight != null) {
                                tailHeight = cycleRaceQuestionBubble.__options.tailHeight;
                        }
                        if (cycleRaceQuestionBubble.__options.height != null) {
                                bodyHeight = Math.max(
                                        cycleRaceQuestionBubble.__options.height - tailHeight,
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

function computeCycleRaceTextChoiceLayout() {

        var fallbackX = [480, 800, 480, 800];
        var fallbackY = [512, 512, 648, 648];

        if (typeof SAUI_computeCenteredRow !== "function") {
                return {
                        xPositions: fallbackX,
                        yPositions: fallbackY
                };
        }

        var metrics = getCycleRaceQuestionLayoutMetrics();
        var wrapperWidth = 324;
        var horizontalPadding = 96;
        var availableSpan = Math.max(metrics.width - horizontalPadding * 2, wrapperWidth * 2 + 140);
        var rowSpacing = 144;
        var startY = Math.max(metrics.bottom + 84, fallbackY[0]);

        var textRowLayout = SAUI_computeCenteredRow(2, {
                centerX: metrics.centerX,
                baseSpacing: wrapperWidth + 148,
                tileSpan: wrapperWidth,
                maxSpan: availableSpan
        });

        var positions =
                textRowLayout && textRowLayout.positions && textRowLayout.positions.length >= 2
                        ? textRowLayout.positions
                        : [metrics.centerX - wrapperWidth * 0.5, metrics.centerX + wrapperWidth * 0.5];

        return {
                xPositions: [positions[0], positions[1], positions[0], positions[1]],
                yPositions: [startY, startY, startY + rowSpacing, startY + rowSpacing]
        };
}

function computeCycleRaceImageChoiceLayout() {

        var fallbackX = [360, 520, 760, 920];
        var fallbackY = [556, 556, 556, 556];

        if (typeof SAUI_computeCenteredRow !== "function") {
                return {
                        xPositions: fallbackX,
                        yPositions: fallbackY
                };
        }

        var metrics = getCycleRaceQuestionLayoutMetrics();
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

function centerCycleRaceOptionBitmap(bitmap) {

        if (!bitmap || bitmap.__cycleRaceCentered) {
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
        bitmap.__cycleRaceCentered = true;
}

function getCycleRaceSpriteDimensions(sprite) {

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

function configureCycleRaceQuestionSprite(sprite, options) {

        if (!sprite) {
                return { width: 0, height: 0 };
        }

        options = options || {};

        var dims = getCycleRaceSpriteDimensions(sprite);
        if (!dims || !dims.width || !dims.height) {
                return { width: 0, height: 0 };
        }

        var bubbleOptions = (cycleRaceQuestionBubble && cycleRaceQuestionBubble.__options) || {};
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

        var scaleX = availableWidth > 0 ? availableWidth / dims.width : baseScale;
        var scaleY = availableHeight > 0 ? availableHeight / dims.height : baseScale;
        var targetScale = Math.min(baseScale, scaleX, scaleY);
        if (options.minScale != null) {
                targetScale = Math.max(options.minScale, targetScale);
        }

        sprite.scaleX = sprite.scaleY = targetScale;
        sprite.regX = dims.width / 2;
        sprite.regY = dims.height / 2;
        sprite.x = 0;
        sprite.y = 0;

        var visible = measureCycleRaceSpriteVisibleBounds(sprite);
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

function layoutCycleRaceTextQuestionContent() {

        if (!cycleRaceQuestionBubble) {
                return;
        }

        var bubbleOptions = cycleRaceQuestionBubble.__options || {};
        var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
        var innerTop = -bodyHeight / 2 + 36;
        var innerBottom = bodyHeight / 2 - 32;
        var availableWidth = (bubbleOptions.width || 760) - 220;
        var spacing = Math.min(54, Math.max(32, bodyHeight * 0.12));

        if (question1 && question1.visible) {
                var q1Metrics = configureCycleRaceQuestionDisplay(question1, {
                        maxWidth: availableWidth,
                        maxHeight: Math.max(bodyHeight * 0.56, 140),
                        baseScale:
                                question1.__baseScale != null ? question1.__baseScale : question1.scaleX || 1
                });
                question1.x = 0;
                var q1OffsetY = q1Metrics && q1Metrics.offsetY ? q1Metrics.offsetY : question1.__visualOffsetY || 0;
                var q1HalfHeight = (q1Metrics && q1Metrics.height ? q1Metrics.height : question1.__layoutHeight || 0) / 2;
                question1.y = innerTop + q1HalfHeight - q1OffsetY;
        }

        if (questionText1 && questionText1.visible) {
                var qTextMetrics = configureCycleRaceQuestionDisplay(questionText1, {
                        maxWidth: availableWidth - 16,
                        maxHeight: Math.max(bodyHeight * 0.32, 100),
                        baseScale:
                                questionText1.__baseScale != null ? questionText1.__baseScale : questionText1.scaleX || 1
                });
                questionText1.x = 0;
                var anchorY;
                if (question1 && question1.visible) {
                        anchorY =
                                question1.y +
                                ((question1.__layoutHeight || 0) / 2 + (question1.__visualOffsetY || 0));
                } else {
                        anchorY = innerTop + 8;
                }
                var qTextOffsetY = qTextMetrics && qTextMetrics.offsetY ? qTextMetrics.offsetY : questionText1.__visualOffsetY || 0;
                var qTextHalfHeight = (qTextMetrics && qTextMetrics.height ? qTextMetrics.height : questionText1.__layoutHeight || 0) / 2;
                var desiredTop = anchorY + spacing;
                var desiredCenter = desiredTop + qTextHalfHeight - qTextOffsetY;
                var minCenter = innerTop + qTextHalfHeight - qTextOffsetY;
                var maxCenter = innerBottom - qTextHalfHeight - qTextOffsetY;
                if (minCenter > maxCenter) {
                        questionText1.y = (innerTop + innerBottom) / 2 - qTextOffsetY;
                } else {
                        if (desiredCenter < minCenter) {
                                desiredCenter = minCenter;
                        } else if (desiredCenter > maxCenter) {
                                desiredCenter = maxCenter;
                        }
                        questionText1.y = desiredCenter;
                }
        }

        alignCycleRaceQuestionContent();
}

function layoutCycleRaceImageQuestionContent() {

        if (!cycleRaceQuestionBubble || !question2 || !question2.visible) {
                return;
        }

        var bubbleOptions = cycleRaceQuestionBubble.__options || {};
        var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
        var innerTop = -bodyHeight / 2 + 36;
        var innerBottom = bodyHeight / 2 - 32;
        var availableWidth = (bubbleOptions.width || 760) - 220;

        var q2Metrics = configureCycleRaceQuestionDisplay(question2, {
                maxWidth: availableWidth,
                maxHeight: Math.max(bodyHeight * 0.68, 140),
                baseScale: question2.__baseScale != null ? question2.__baseScale : question2.scaleX || 1
        });
        question2.x = 0;
        var q2OffsetY = q2Metrics && q2Metrics.offsetY ? q2Metrics.offsetY : question2.__visualOffsetY || 0;
        var q2HalfHeight = (q2Metrics && q2Metrics.height ? q2Metrics.height : question2.__layoutHeight || 0) / 2;
        var minCenter = innerTop + q2HalfHeight - q2OffsetY;
        var maxCenter = innerBottom - q2HalfHeight - q2OffsetY;
        var centerY = (innerTop + innerBottom) / 2 - q2OffsetY;
        if (minCenter > maxCenter) {
                centerY = (innerTop + innerBottom) / 2 - q2OffsetY;
        } else {
                if (centerY < minCenter) {
                        centerY = minCenter;
                } else if (centerY > maxCenter) {
                        centerY = maxCenter;
                }
        }
        question2.y = centerY;

        alignCycleRaceQuestionContent();
}

function alignCycleRaceQuestionContent() {

        if (!cycleRaceQuestionBubble || !cycleRaceQuestionBubble.__content) {
                return;
        }

        var contentNodes = [];
        var nodeMetrics = [];

        if (question1 && question1.visible && question1.parent === cycleRaceQuestionBubble.__content) {
                contentNodes.push(question1);
        }
        if (questionText1 && questionText1.visible && questionText1.parent === cycleRaceQuestionBubble.__content) {
                contentNodes.push(questionText1);
        }
        if (question2 && question2.visible && question2.parent === cycleRaceQuestionBubble.__content) {
                contentNodes.push(question2);
        }

        if (!contentNodes.length) {
                return;
        }

        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;

        for (var i = 0; i < contentNodes.length; i++) {
                var node = contentNodes[i];
                var width = typeof node.__layoutWidth === "number" ? node.__layoutWidth : 0;
                var height = typeof node.__layoutHeight === "number" ? node.__layoutHeight : 0;
                var offsetX = typeof node.__visualOffsetX === "number" ? node.__visualOffsetX : 0;
                var offsetY = typeof node.__visualOffsetY === "number" ? node.__visualOffsetY : 0;

                if ((!width || !height) && typeof node.getBounds === "function") {
                        var rawBounds = node.getBounds();
                        if (rawBounds) {
                                if (!width) {
                                        width = Math.abs((rawBounds.width || 0) * (node.scaleX || 1));
                                }
                                if (!height) {
                                        height = Math.abs((rawBounds.height || 0) * (node.scaleY || 1));
                                }
                        }
                }

                nodeMetrics.push({
                        node: node,
                        width: width,
                        height: height,
                        offsetX: offsetX,
                        offsetY: offsetY
                });

                var left = node.x - width / 2 + offsetX;
                var right = node.x + width / 2 + offsetX;
                var top = node.y - height / 2 + offsetY;
                var bottom = node.y + height / 2 + offsetY;

                if (left < minX) {
                        minX = left;
                }
                if (right > maxX) {
                        maxX = right;
                }
                if (top < minY) {
                        minY = top;
                }
                if (bottom > maxY) {
                        maxY = bottom;
                }
        }

        if (!isFinite(minX) || !isFinite(maxX) || !isFinite(minY) || !isFinite(maxY)) {
                return;
        }

        var centerX = (minX + maxX) / 2;
        var centerY = (minY + maxY) / 2;

        var bubbleOptions = cycleRaceQuestionBubble.__options || {};
        var bodyHeight = Math.max((bubbleOptions.height || 300) - (bubbleOptions.tailHeight || 60), 200);
        var innerTop = -bodyHeight / 2 + 36;
        var innerBottom = bodyHeight / 2 - 36;
        var targetCenterY = (innerTop + innerBottom) / 2;

        var deltaX = centerX;
        var deltaY = centerY - targetCenterY;

        for (var j = 0; j < nodeMetrics.length; j++) {
                var entry = nodeMetrics[j];
                var targetX = entry.node.x - deltaX;
                var targetY = entry.node.y - deltaY;
                var halfHeight = (entry.height || 0) / 2;
                var offsetY = entry.offsetY || 0;

                if (targetY - halfHeight + offsetY < innerTop) {
                        targetY += innerTop - (targetY - halfHeight + offsetY);
                }
                if (targetY + halfHeight + offsetY > innerBottom) {
                        targetY -= targetY + halfHeight + offsetY - innerBottom;
                }

                entry.node.x = targetX;
                entry.node.y = targetY;
        }
}

function cycleRaceInvokeChoice(choiceDisplay) {

        if (!choiceDisplay) {
                return;
        }

        answerSelected({
                preventDefault: function () {},
                currentTarget: choiceDisplay
        });
}

function cycleRaceAttachWrapperListeners(wrapper, choiceDisplay) {

        if (!wrapper || !choiceDisplay) {
                return;
        }

        wrapper.__linkedChoice = choiceDisplay;
        wrapper.mouseEnabled = true;
        wrapper.cursor = "pointer";

        if (wrapper.__cycleRaceClickHandler) {
                wrapper.removeEventListener("click", wrapper.__cycleRaceClickHandler);
        }

        wrapper.__cycleRaceClickHandler = function () {
                if (!wrapper.__linkedChoice || !wrapper.__linkedChoice.mouseEnabled) {
                        return;
                }
                cycleRaceInvokeChoice(wrapper.__linkedChoice);
        };

        wrapper.addEventListener("click", wrapper.__cycleRaceClickHandler);
}

function cycleRaceDetachWrapperListeners(wrapper) {

        if (!wrapper) {
                return;
        }

        if (wrapper.__cycleRaceClickHandler) {
                wrapper.removeEventListener("click", wrapper.__cycleRaceClickHandler);
        }

        wrapper.mouseEnabled = false;
        wrapper.cursor = "default";
        wrapper.__linkedChoice = null;
}

var chPosArr = [1, 0, 2, 3, 1, 0, 2, 3, 1, 0] // Only 4 Choice 

var chPosArr1 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]// Only 10 questions Alternatively 

var chPosArr2 = [1, 2, 3, 4, 5, 6, 7, 8]  // IF Cycle Count reduces the array values should be reduced//
var chPosArr3 = [1, 2, 3, 4, 5, 6]

var self = this


var posY = [, 422, 442, 465, 483, 525, 545, 555, 588] // Cycle Y Position
var s1 = "";

var width_array = ["156.25", "156.25", "156.25", "156.25", "152.75", "156.25", "156.75", "156.25"] // Finish Position for cycles
var cycle_array = [];
//var speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.5, 0.8]; // Speed of cycles
var speed_arry = [1.8, 1.6, 1.0, 0.3, 1.2, 1.4, 0.5, 0.8]; // Speed of cycles

var speed_arry_1 = []

var sp = -1

/////////////////////////////////////////////////////////=========BROWSER SUPPORT============////////////////////////////////////////////////////////////////
//register key functions
window.onload = function (e) {
	checkBrowserSupport();

}
var QusTxtString;
///////////////////////////////////////////////////////////////=========INITIALIZATION==========///////////////////////////////////////////////////////////////
function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	container = new createjs.Container();
	stage.addChild(container)

        cycleContainer = new createjs.Container()
        stage.addChild(cycleContainer);
        ensureCycleRaceQuestionTextDisplays();
        callLoader();
        createLoader()
        createCanvasResize()

	stage.update();
	stage.enableMouseOver(40);
	///////////////////////////////////////////////////////////////=========MANIFEST==========///////////////////////////////////////////////////////////////

    /*Always specify the following terms as given in manifest array. 
         1. choice image name as "ChoiceImages1.png"
         2. question text image name as "questiontext.png"
     */

	assetsPath = "assets/";
	gameAssetsPath = "CycleRace-Level4/";
	soundpath = "FA/"

	var success = createManifest();
	if (success == 1) {
		manifest.push(


	{ id: "tMc", src: gameAssetsPath + "targetPanel.png" },
			{ id: "track1", src: gameAssetsPath + "Background.png" },
 
			{ id: "cycle1", src: gameAssetsPath + "BlueBoyCycle.png" },
			{ id: "cycle2", src: gameAssetsPath + "RedBoyCycle.png" },
			{ id: "cycle3", src: gameAssetsPath + "VioletBoyCycle.png" },
			{ id: "cycle4", src: gameAssetsPath + "YellowBoyCycle.png" },
			{ id: "cycle5", src: gameAssetsPath + "BlueGirlCycle.png" },
			{ id: "cycle6", src: gameAssetsPath + "GreenGirlCycle.png" },
			{ id: "cycle7", src: gameAssetsPath + "PinkGirlCycle.png" },
			{ id: "cycle8", src: gameAssetsPath + "YellowGirlCycle.png" },
			{ id: "cycle9", src: gameAssetsPath + "DemoGreenCycle.png" },

			{ id: "question1", src: gameAssetsPath + "ChoiceImages2.png" },
			{ id: "choice2", src: gameAssetsPath + "ChoiceImages2.png" },
			{ id: "chHolder", src: gameAssetsPath + "chHolder.png" },
                        { id: "introImg", src: gameAssetsPath + "introImg.png" },
                        {
                                id: "questionTextData",
                                src: questionTextPath + "CycleRace-Level4-QT2.json"
                        },
                        { id: "choice1", src: questionTextPath + "CycleRace-Level4-QT3.png" },
                        { id: "introHintTextMc", src: questionTextPath + "CycleRace-Level4-QT4.png" }
                )
		
		preloadAllAssets()
		stage.update();
	}

}
////////////////////////////////////////////////////////////==========PRELOADER===========////////////////////////////////////////////////////////////////      
function doneLoading1(event) {
	var event = assets[i];
	var id = event.item.id;
	uniquebackGround.alpha = 0;
	uniquebackGround.visible=false;
	if (id == "introImg") {

		introImg = new createjs.Bitmap(preload.getResult('introImg'));
		container.parent.addChild(introImg);
		introImg.visible = false;
	}
	if (id == "introHintTextMc") {

		introHintTextMc = new createjs.Bitmap(preload.getResult('introHintTextMc'));
		container.parent.addChild(introHintTextMc);
		introHintTextMc.visible = false;
	}
call_UI_gameQuestion(container,"Watch the animation carefully and answer the question");
	 

	if (id == "cycle1" || id == "cycle2" || id == "cycle3" || id == "cycle4" || id == "cycle5" || id == "cycle6" || id == "cycle7" || id == "cycle8" || id == "cycle9") {

		//	getCycles([])
		// Blueboycycle
		var spriteSheet1 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle1")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]
			}
		});
		cycle1 = new createjs.Sprite(spriteSheet1, "run");
		cycle1.x = 125;
		cycle1.y = 240;
		cycle1.stop();
		//
		// Redboycycle
		var spriteSheet2 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle2")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]
			}
		});
		cycle2 = new createjs.Sprite(spriteSheet2, "run");
		cycle2.x = 125;
		cycle2.y = 270;
		cycle2.stop();
		//VioletBoyCycle
		var spriteSheet3 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle3")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
		cycle3 = new createjs.Sprite(spriteSheet3, "run");
		cycle3.x = 125;
		cycle3.y = 300;
		cycle3.stop();


		var spriteSheet4 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle4")],
			"frames": { "regX": 82, "height": 307, "count": 307, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
		cycle4 = new createjs.Sprite(spriteSheet4, "run");
		cycle4.x = 125;
		cycle4.y = 330;
		cycle4.stop();

		//BlueGirl
		var spriteSheet5 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle5")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle5 = new createjs.Sprite(spriteSheet5, "run");
		cycle5.x = 125;
		cycle5.y = 360;
		cycle5.stop();
		//GreenGirl
		var spriteSheet6 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle6")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle6 = new createjs.Sprite(spriteSheet6, "run");
		cycle6.x = 125;
		cycle6.y = 390;
		cycle6.stop();
		//PinkGirl
		var spriteSheet7 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle7")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle7 = new createjs.Sprite(spriteSheet7, "run");
		cycle7.x = 125;
		cycle7.y = 390;
		cycle7.stop();
		//YellowGirl
		var spriteSheet8 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle8")],
			"frames": { "regX": 82, "height": 311, "count": 300, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle8 = new createjs.Sprite(spriteSheet8, "run");
		cycle8.x = 125;
		cycle8.y = 420;
		cycle8.stop();

		var spriteSheet9 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("cycle9")],
			"frames": { "regX": 82, "height": 311, "count": 308, "regY": 0, "width": 270 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});

		cycle9 = new createjs.Sprite(spriteSheet9, "run");
		// cycle9.x = 125;
		// cycle9.y = 420;
		cycle9.stop();

	}
	if (id == "track1") {
		track1 = new createjs.Bitmap(preload.getResult('track1'));
		container.parent.addChild(track1);
		track1.visible = false;
	}
	if (id == "track2") {
		track2 = new createjs.Bitmap(preload.getResult('track2'));
		container.parent.addChild(track2);
		track2.visible = false;
	}
	if (id == "tMc") {
		targetMc = new createjs.Bitmap(preload.getResult('tMc'));
		container.parent.addChild(targetMc);
		targetMc.visible = false;

	}

	if (id == "quesPanel") {
		var comp1 = AdobeAn.getComposition("685EFC8BED094E4F9358ADF4819FC236");
		var lib2 = comp1.getLibrary();
		quesPanel = new lib2.questionPanel()
		container.parent.addChild(quesPanel);
		quesPanel.visible = false;
	}

        if (id == "question1") {
                var spriteSheet9 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("question1")],
			"frames": { "regX": 82, "height": 239, "count": 300, "regY": 0, "width": 241 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                question1 = new createjs.Sprite(spriteSheet9, "run");
                container.parent.addChild(question1);

                question1.visible = false
                question1.regX = 241 / 2;
                question1.regY = 239 / 2;
                question1.x = 0;
                question1.y = 0;
                question1.__naturalWidth = 241;
                question1.__naturalHeight = 239;
                question1.__baseScale = 1.02;


        }
        if (id == "questionTextData") {
                updateCycleRaceQuestionTextData(event.result || {});
                ensureCycleRaceQuestionTextDisplays();
        }
	//

	if (id == "choice1") {
		var spriteSheet11 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("choice1")],
			"frames": { "regX": 82, "height": 78, "count": 0, "regY": 0, "width": 266 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                choice1 = new createjs.Sprite(spriteSheet11);
                container.parent.addChild(choice1);

                choice1.visible = false
                choice1.regX = 266 / 2;
                choice1.regY = 78 / 2;
                choice1.x = 0;
                choice1.y = 0;
        }
        if (id == "choice2") {
                var spriteSheet11 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preload.getResult("choice2")],
			"frames": { "regX": 82, "height": 239, "count": 0, "regY": 0, "width": 241 },
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 16, "run", .4]

			}
		});
                choice2 = new createjs.Sprite(spriteSheet11);
                container.parent.addChild(choice2);
                choice2.visible = false
                choice2.regX = 241 / 2;
                choice2.regY = 239 / 2;
                choice2.x = 0;
                choice2.y = 0;
        }


	if (id == "chHolder") {
		chHolderMc = new createjs.Bitmap(preload.getResult('chHolder'));
		container.parent.addChild(chHolderMc);
		chHolderMc.visible = false;
	}


	//=============================================================================//


}

function tick(e) {
	stage.update();
}
/////////////////////////////////////////////////////////////////=======GAME START========///////////////////////////////////////////////////////////////////
function handleClick(e) {
	qno = between(0, 100)

	CreateGameStart()
	if (gameType == 0) {
		CreateGameElements()
		getStartQuestion();
	} else {
		//for db
		getdomainpath()
		//end
	}


}
////////////////////////////////////////////////////////////=========GAME ELEMENTS CREATION===========//////////////////////////////////////////////////////
function CreateGameElements() {

	interval = setInterval(countTime, 1000);
	for (i = 0; i < 2; i++) {
		track1[i] = track1.clone()
		container.parent.addChild(track1[i])
		track1[i].visible = true;
		//track1[i].alpha=.1  
		stage.setChildIndex(track1[i], 1); // bring red to top
  stage.update();
	}
	container.parent.addChild(QusTxtString);
	// questionText.visible = true;
	container.parent.addChild(targetMc);
	targetMc.visible = false;

	container.parent.addChild(Title)
    Title.visible = true;

	for (i = 1; i <= 8; i++) {
		this["cycle" + i].visible = false;
		container.parent.addChild(this["cycle" + i])
		this["cycle" + i].scaleX = this["cycle" + i].scaleY = .5;
		this["cycle" + i].x = this["cycle" + i].x - 80
		this["cycle" + i].y = posY[i];

	}
        var textChoiceLayout = computeCycleRaceTextChoiceLayout();
        var choiceXArr =
                textChoiceLayout && textChoiceLayout.xPositions && textChoiceLayout.xPositions.length >= choiceCnt
                        ? textChoiceLayout.xPositions.slice(0)
                        : [480, 800, 480, 800];
        var choiceYArr =
                textChoiceLayout && textChoiceLayout.yPositions && textChoiceLayout.yPositions.length >= choiceCnt
                        ? textChoiceLayout.yPositions.slice(0)
                        : [512, 512, 648, 648];

        for (i = 0; i < choiceCnt; i++) {
                choiceArr[i] = choice1.clone()
                choiceArr[i].visible = false;
                choiceArr[i].x = 0;
                choiceArr[i].y = 0;
        }

        var imageChoiceLayout = computeCycleRaceImageChoiceLayout();
        var choiceX1Arr =
                imageChoiceLayout && imageChoiceLayout.xPositions && imageChoiceLayout.xPositions.length >= choiceCnt
                        ? imageChoiceLayout.xPositions.slice(0)
                        : [360, 520, 760, 920];
        var choiceY1Arr =
                imageChoiceLayout && imageChoiceLayout.yPositions && imageChoiceLayout.yPositions.length >= choiceCnt
                        ? imageChoiceLayout.yPositions.slice(0)
                        : [556, 556, 556, 556];

        for (i = 0; i < choiceCnt; i++) {
                choiceArr1[i] = choice2.clone()
                choiceArr1[i].visible = false;
                choiceArr1[i].scaleX = choiceArr1[i].scaleY = .78;
                choiceArr1[i].x = 0;
                choiceArr1[i].y = 0;
        }

        ensureCycleRaceQuestionSurface();
        initializeCycleRaceChoiceWrappers(
                choiceXArr,
                choiceYArr,
                choiceX1Arr,
                choiceY1Arr
        );

	// container.parent.addChild(TitleBtn);
	// TitleBtn.visible=true;
	
	chPosArr.sort(randomSort)
	//	chPosArr1.sort(randomSort)
	chPosArr2.sort(randomSort)
	chPosArr3.sort(randomSort)

	//this["cycle"+1].visible = true;


	console.log("isQuestionAllVariations= " + isQuestionAllVariations)
	/*if (isQuestionAllVariations) {
		createGameWiseQuestions()
		pickques()
	} else {
		pickques()
	}*/
}

//=================================================================================================================================//
function pickques() {
	pauseTimer()
	//for db
	tx = 0;
	qscnt++;
	//db
	cnt++;
	quesCnt++;
	if (typeof refreshHudValues === "function") {
    refreshHudValues();
  } else if (typeof gameQCntTxt !== "undefined" && gameQCntTxt) {
    gameQCntTxt.text = quesCnt + "/" + String(totalQuestions);
  }
	cycle_array = []


	panelVisibleFn()
	//=================================================================================================================================//

	chHolderMc.x = 0;
	track1[0].x = 0;
	track1[1].x = 1280;

	container.parent.addChild(QusTxtString);
	QusTxtString.visible = true;

	targetMc.visible = false;
	//speed_arry_1 = [1.4, 1.3, 1.2, 1, 0.9, 0.8];
	  speed_arry_1 = [1.4, 1.2, 1, 0.8, 0.6, 0.4];



	//speed_arry = [1.4, 1, 1.2, 1.3, 0.8, 0.9];
	speed_arry =   [1.4, 1, 0.8, 1.2, 0.4, 0.6];

	speed_arry.sort(randomSort);
	pArr = between(1, 8)
	rand1 = range(1, 6)
	if (chPosArr1[cnt] == 0) {
		type1Cnt++
		spliceVal = pArr.indexOf(chPosArr2[type1Cnt])
		pArr.splice(spliceVal, 1)
		pArr[rand1] = chPosArr2[type1Cnt]
		for (i = 0; i < TOTAL_CYCLE; i++) {
			cycle_array[i] = this["cycle" + pArr[i + 1]].clone()
			container.parent.addChild(cycle_array[i])
			cycle_array[i].visible = true
			cycle_array[i].x = this["cycle" + (i + 1)].x
			cycle_array[i].y = posY[i + 1]
		}
	} else {
		for (i = 0; i < TOTAL_CYCLE; i++) {
			cycle_array[i] = this["cycle" + pArr[i + 1]].clone()
			container.parent.addChild(cycle_array[i])
			cycle_array[i].visible = true
			cycle_array[i].x = this["cycle" + (i + 1)].x
			cycle_array[i].y = posY[i + 1]
		}
	}
	//cycle_array = between(1, TOTAL_CYCLE);
	//questionFrame = Math.ceil(Math.random() * TOTAL_CYCLE);
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].play();
		cycle_array[i].addEventListener("tick", cycleMove)
	}

	createjs.Ticker.addEventListener("tick", roadMove)

	stage.update();
}

function cycleMove(event) {
	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].x += speed_arry[i];
		if (cycle_array[i].currentFrame == 13) {
			cycle_array[i].gotoAndPlay(0)
		}
		var getStageValue = stgWidth - (width_array[i])

		if (event.currentTarget.x > getStageValue) {

			event.currentTarget.removeEventListener("tick", cycleMove);
			createjs.Ticker.removeEventListener("tick", roadMove);


			targetMc.visible = true;
			targetMc.x = 935;
			targetMc.y = 550;

			StopCycles()
		}
		var getFirstPlace = event.currentTarget.x;
		targetMc.x = getFirstPlace
		targetMc.y = 555;
	}
	}
//=============================================================================================//
function StopCycles() {

	for (i = 0; i < TOTAL_CYCLE; i++) {
		cycle_array[i].stop()
		cycle_array[i].removeEventListener("tick", cycleMove)
	}
	for (i = 1; i <= TOTAL_CYCLE; i++) {
		this["cycle" + i].stop()
	}


	if (chPosArr1[cnt] == 0) {
		for (i = 0; i < TOTAL_CYCLE; i++) {
			if (chPosArr2[type1Cnt] == pArr[i + 1]) {
				speed = speed_arry[i]
			}
		}
		if (speed == 1.4) {
			chVal = 0
		} else if (speed == 1.2) {

			chVal = 1
		}
		else if (speed == 1) {

			chVal = 2
		}
		else if (speed == 0.8) {

			chVal = 3
		}
		else if (speed ==  0.6) {

			chVal = 4
		}

		else if (speed == 0.4) {
			chVal = 5


		}

	}
	else {
		type2Cnt++;
		speed = speed_arry_1[chPosArr3[type2Cnt] - 1]
		count = speed_arry.indexOf(speed)
	}
	console.log(speed)


	quesIntervel = setInterval(createQuestions, 3000);

}


//=============================================================================================//
function targetAdded() {
	targetMc.visible = true;

	targetMc.target.gotoAndPlay(2);
	createjs.Ticker.removeEventListener("tick", roadMove)
}
//=========================================================================================//
function roadMove(event) {
	track1[0].x -= trackSpeed;
	track1[1].x -= trackSpeed;


	if (track1[0].x < -1260) {
		track1[0].x = 1280;
	} else if (track1[1].x < -1260) {
		track1[1].x = 1280;

	}
}

//=============================================================================================//
function createQuestions() {
        clearInterval(quesIntervel)

        QusTxtString.visible = false;

        cycleRaceResetQuestionDisplay();

        for (i = 0; i < TOTAL_CYCLE; i++) {
                cycle_array[i].visible = false
        }

        if (cycleRaceQuestionBubble) {
                if (typeof SAUI_showCycleRaceSpeechBubble === "function") {
                        SAUI_showCycleRaceSpeechBubble(cycleRaceQuestionBubble, 40);
                } else {
                        cycleRaceQuestionBubble.visible = true;
                        cycleRaceQuestionBubble.alpha = 1;
                }
        }

        if (chPosArr1[cnt] == 0) {
                if (question2) {
                        question2.visible = false;
                }
                question1.visible = true;
                question1.scaleX = question1.scaleY = question1.__baseScale != null ? question1.__baseScale : 1;
                question1.gotoAndStop(chPosArr2[type1Cnt] - 1)
                question1.x = 0;
                question1.y = 0;

                if (questionText1) {
                        var promptText = getCycleRaceTextPrompt();
                        var hasPrompt = promptText && String(promptText).trim().length > 0;
                        setCycleRaceQuestionText(questionText1, promptText);
                        questionText1.visible = !!hasPrompt;
                        questionText1.scaleX = questionText1.scaleY = 1;
                        questionText1.x = 0;
                        questionText1.y = 0;
                }

                layoutCycleRaceTextQuestionContent();

                rand = between(0, TOTAL_CYCLE - 1)
                val = rand.indexOf(chVal)
                rand.splice(val, 1)

                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = true;
                        choiceArr[i].gotoAndStop(rand[i])
                        choiceArr[i].name = rand[i]
                        if (choiceArr[i].__wrapper) {
                                if (typeof SAUI_resetCycleRaceOptionBubble === "function") {
                                        SAUI_resetCycleRaceOptionBubble(choiceArr[i].__wrapper);
                                }
                        } else {
                                choiceArr[i].alpha = 1;
                                choiceArr[i].x = cycleRaceTextChoicePositions[i].x;
                                choiceArr[i].y = cycleRaceTextChoicePositions[i].y;
                        }
                }
                choiceArr[chPosArr[cnt]].gotoAndStop(chVal)
                choiceArr[chPosArr[cnt]].name = chVal

                ans = chVal;

        } else {
                var questionTextValue = getCycleRaceImageQuestionText(chPosArr3[type2Cnt] - 1);
                var hasImagePrompt = questionTextValue && String(questionTextValue).trim().length > 0;
                if (question2) {
                        setCycleRaceQuestionText(question2, questionTextValue);
                        question2.visible = !!hasImagePrompt;
                        question2.scaleX = question2.scaleY = 1;
                        question2.x = 0;
                        question2.y = 0;
                }
                layoutCycleRaceImageQuestionContent();
                if (questionText1) {
                        questionText1.visible = false;
                }
                if (question1) {
                        question1.visible = false;
                }
                rand = between(0, 7)
                val = rand.indexOf(pArr[count + 1] - 1)
                rand.splice(val, 1)

                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = true;
                        choiceArr1[i].gotoAndStop(rand[i])
                        choiceArr1[i].name = rand[i]
                        if (choiceArr1[i].__wrapper) {
                                if (typeof SAUI_resetCycleRaceOptionBubble === "function") {
                                        SAUI_resetCycleRaceOptionBubble(choiceArr1[i].__wrapper);
                                }
                        } else {
                                choiceArr1[i].alpha = 1;
                                choiceArr1[i].x = cycleRaceImageChoicePositions[i].x;
                                choiceArr1[i].y = cycleRaceImageChoicePositions[i].y;
                        }
                }

                choiceArr1[chPosArr[cnt]].gotoAndStop(pArr[count + 1] - 1)
                choiceArr1[chPosArr[cnt]].name = pArr[count + 1] - 1
                ans = pArr[count + 1] - 1

        }

        enablechoices();
        createjs.Ticker.addEventListener("tick", tick);
        stage.update();

}

//====================================================================================================================================//
function enablechoices() {

        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = false;
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.visible = false;
                                choiceArr[i].__wrapper.alpha = 0;
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = false;
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.visible = false;
                                choiceArr1[i].__wrapper.alpha = 0;
                        }
                }
        }
        createTween()
}
function createTween() {
        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].visible = true;
                        choiceArr[i].alpha = 1;
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.visible = true;
                                if (typeof SAUI_showCycleRaceOptionBubble === "function") {
                                        SAUI_showCycleRaceOptionBubble(choiceArr[i].__wrapper, 120 + i * 90);
                                } else {
                                        choiceArr[i].__wrapper.alpha = 1;
                                }
                        } else {
                                choiceArr[i].alpha = 0;
                                createjs.Tween.get(choiceArr[i]).wait(120 * (i + 1)).to({ alpha: 1 }, 360);
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].visible = true;
                        choiceArr1[i].alpha = 1;
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.visible = true;
                                if (typeof SAUI_showCycleRaceOptionBubble === "function") {
                                        SAUI_showCycleRaceOptionBubble(choiceArr1[i].__wrapper, 160 + i * 110);
                                } else {
                                        choiceArr1[i].__wrapper.alpha = 1;
                                }
                        } else {
                                choiceArr1[i].alpha = 0;
                                createjs.Tween.get(choiceArr1[i]).wait(160 * (i + 1)).to({ alpha: 1 }, 360);
                        }
                }

        }

        repTimeClearInterval = setTimeout(AddListenerFn, 1400)
}
function AddListenerFn() {
        clearTimeout(repTimeClearInterval)
        if (chPosArr1[cnt] == 0) {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr[i].cursor = "pointer";
                        choiceArr[i].visible = true;
                        choiceArr[i].addEventListener("click", answerSelected)
                        choiceArr[i].mouseEnabled = true
                        if (cycleRaceHoverInHandler) {
                                choiceArr[i].addEventListener("mouseover", cycleRaceHoverInHandler);
                                choiceArr[i].addEventListener("mouseout", cycleRaceHoverOutHandler);
                        }
                        if (choiceArr[i].__wrapper) {
                                choiceArr[i].__wrapper.cursor = "pointer";
                                cycleRaceAttachWrapperListeners(choiceArr[i].__wrapper, choiceArr[i]);
                                if (typeof SAUI_startCycleRaceOptionIdle === "function") {
                                        SAUI_startCycleRaceOptionIdle(choiceArr[i].__wrapper);
                                }
                        }
                }
        } else {
                for (i = 0; i < choiceCnt; i++) {
                        choiceArr1[i].cursor = "pointer";
                        choiceArr1[i].visible = true;
                        choiceArr1[i].addEventListener("click", answerSelected)
                        choiceArr1[i].mouseEnabled = true
                        if (cycleRaceHoverInHandler) {
                                choiceArr1[i].addEventListener("mouseover", cycleRaceHoverInHandler);
                                choiceArr1[i].addEventListener("mouseout", cycleRaceHoverOutHandler);
                        }
                        if (choiceArr1[i].__wrapper) {
                                choiceArr1[i].__wrapper.cursor = "pointer";
                                cycleRaceAttachWrapperListeners(choiceArr1[i].__wrapper, choiceArr1[i]);
                                if (typeof SAUI_startCycleRaceOptionIdle === "function") {
                                        SAUI_startCycleRaceOptionIdle(choiceArr1[i].__wrapper);
                                }
                        }
                }
        }
        rst = 0;
        gameResponseTimerStart();
        restartTimer()
}
function disablechoices() {
        for (i = 0; i < choiceCnt; i++) {
                choiceArr[i].visible = false
                choiceArr[i].removeEventListener("click", answerSelected);
                if (cycleRaceHoverInHandler) {
                        choiceArr[i].removeEventListener("mouseover", cycleRaceHoverInHandler);
                        choiceArr[i].removeEventListener("mouseout", cycleRaceHoverOutHandler);
                }
                choiceArr[i].cursor = "default";
                if (choiceArr[i].__wrapper) {
                        choiceArr[i].__wrapper.visible = false;
                        choiceArr[i].__wrapper.alpha = 0;
                        choiceArr[i].__wrapper.mouseEnabled = false;
                        choiceArr[i].__wrapper.cursor = "default";
                        cycleRaceDetachWrapperListeners(choiceArr[i].__wrapper);
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(choiceArr[i].__wrapper);
                        }
                }
                choiceArr1[i].visible = false
                choiceArr1[i].removeEventListener("click", answerSelected);
                if (cycleRaceHoverInHandler) {
                        choiceArr1[i].removeEventListener("mouseover", cycleRaceHoverInHandler);
                        choiceArr1[i].removeEventListener("mouseout", cycleRaceHoverOutHandler);
                }
                choiceArr1[i].cursor = "default";
                if (choiceArr1[i].__wrapper) {
                        choiceArr1[i].__wrapper.visible = false;
                        choiceArr1[i].__wrapper.alpha = 0;
                        choiceArr1[i].__wrapper.mouseEnabled = false;
                        choiceArr1[i].__wrapper.cursor = "default";
                        cycleRaceDetachWrapperListeners(choiceArr1[i].__wrapper);
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(choiceArr1[i].__wrapper);
                        }
                }
        }
        if (questionText1) {
                questionText1.visible = false;
        }
        if (cycleRaceQuestionBubble && typeof SAUI_hideCycleRaceSpeechBubble === "function") {
                SAUI_hideCycleRaceSpeechBubble(cycleRaceQuestionBubble);
        }
        if (chHolderMc) {
                chHolderMc.visible = false;
        }
        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
}
//===================================================================MOUSE ROLL OVER/ROLL OUT==============================================================//

function answerSelected(e) {
        e.preventDefault();
        uans = e.currentTarget.name;
        console.log("answer" + uans);
        console.log(ans + " =correct= " + uans)
        gameResponseTimerStop();
        var wrapper = e.currentTarget.__wrapper;
        if (wrapper) {
                if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                        SAUI_stopCycleRaceOptionIdle(wrapper);
                }
                if (typeof SAUI_setCycleRaceOptionHoverState === "function") {
                        SAUI_setCycleRaceOptionHoverState(wrapper, false);
                }
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(wrapper, ans == uans);
                }
        }
        if (ans != uans) {
                cycleRaceMarkCorrectWrapper();
        }
        if (ans == uans) {

                getValidation("correct");
                disablechoices();
        } else {
                getValidation("wrong");
                disablechoices();
        }
}
function ensureCycleRaceQuestionSurface() {

        if (typeof SAUI_createCycleRaceSpeechBubble === "function") {
                if (!cycleRaceQuestionBubble) {
                        cycleRaceQuestionBubble = SAUI_createCycleRaceSpeechBubble({
                                width: 780,
                                height: 300,
                                tailHeight: 60,
                                tailWidth: 150,
                                cornerRadius: 52,
                                title: null,
                                visualCenterOffset: 16,
                                contentOffsetY: -12
                        });
                        cycleRaceQuestionBubble.x = 640;
                        cycleRaceQuestionBubble.y = 248;
                }

                if (!cycleRaceQuestionBubble.parent) {
                        container.parent.addChild(cycleRaceQuestionBubble);
                }

                if (cycleRaceQuestionBubble.__content) {
                        if (question1 && question1.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(question1);
                        }
                        if (question2 && question2.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(question2);
                        }
                        if (questionText1 && questionText1.parent !== cycleRaceQuestionBubble.__content) {
                                cycleRaceQuestionBubble.__content.addChild(questionText1);
                        }
                }
        } else {
                if (question1 && !question1.parent) {
                        container.parent.addChild(question1);
                }
                if (question2 && !question2.parent) {
                        container.parent.addChild(question2);
                }
                if (questionText1 && !questionText1.parent) {
                        container.parent.addChild(questionText1);
                }
        }

        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
        if (questionText1) {
                questionText1.visible = false;
        }
}

function initializeCycleRaceChoiceWrappers(choiceXArr, choiceYArr, choiceX1Arr, choiceY1Arr) {

        cycleRaceTextChoicePositions = [];
        cycleRaceImageChoicePositions = [];

        for (var idx = 0; idx < choiceCnt; idx++) {
                cycleRaceTextChoicePositions[idx] = {
                        x: choiceXArr[idx],
                        y: choiceYArr[idx]
                };
                cycleRaceImageChoicePositions[idx] = {
                        x: choiceX1Arr[idx],
                        y: choiceY1Arr[idx]
                };
        }

        if (!cycleRaceHoverInHandler) {
                cycleRaceHoverInHandler = function (e) {
                        if (!e || !e.currentTarget) {
                                return;
                        }
                        var wrapper = e.currentTarget.__wrapper;
                        if (wrapper && typeof SAUI_setCycleRaceOptionHoverState === "function") {
                                SAUI_setCycleRaceOptionHoverState(wrapper, true);
                        }
                };
                cycleRaceHoverOutHandler = function (e) {
                        if (!e || !e.currentTarget) {
                                return;
                        }
                        var wrapper = e.currentTarget.__wrapper;
                        if (wrapper && typeof SAUI_setCycleRaceOptionHoverState === "function") {
                                SAUI_setCycleRaceOptionHoverState(wrapper, false);
                        }
                };
        }

        for (var i1 = 0; i1 < choiceCnt; i1++) {
                var textWrapper = cycleRaceTextChoiceWrappers[i1];
                if (!textWrapper && typeof SAUI_createCycleRaceOptionBubble === "function") {
                        textWrapper = SAUI_createCycleRaceOptionBubble({ variant: "text" });
                        cycleRaceTextChoiceWrappers[i1] = textWrapper;
                }

                if (textWrapper) {
                        cycleRaceDetachWrapperListeners(textWrapper);
                        textWrapper.visible = false;
                        textWrapper.alpha = 0;
                        textWrapper.mouseEnabled = false;
                        textWrapper.cursor = "default";
                        textWrapper.x = cycleRaceTextChoicePositions[i1].x;
                        textWrapper.y = cycleRaceTextChoicePositions[i1].y;
                        textWrapper.__homeX = textWrapper.x;
                        textWrapper.__homeY = textWrapper.y;
                        if (!textWrapper.parent) {
                                container.parent.addChild(textWrapper);
                        }
                        if (textWrapper.__content && choiceArr[i1] && choiceArr[i1].parent !== textWrapper.__content) {
                                textWrapper.__content.addChild(choiceArr[i1]);
                        } else if (choiceArr[i1] && choiceArr[i1].parent !== textWrapper) {
                                textWrapper.addChild(choiceArr[i1]);
                        }
                } else if (choiceArr[i1] && !choiceArr[i1].parent) {
                        container.parent.addChild(choiceArr[i1]);
                }

                if (choiceArr[i1]) {
                        choiceArr[i1].visible = false;
                        choiceArr[i1].alpha = 1;
                        centerCycleRaceOptionBitmap(choiceArr[i1]);
                        choiceArr[i1].mouseChildren = false;
                        choiceArr[i1].cursor = "pointer";
                        choiceArr[i1].__wrapper = textWrapper;
                        if (textWrapper && textWrapper.__hitArea) {
                                choiceArr[i1].hitArea = textWrapper.__hitArea;
                        } else if (!textWrapper) {
                                centerCycleRaceOptionBitmap(choiceArr[i1]);
                                choiceArr[i1].x = cycleRaceTextChoicePositions[i1].x;
                                choiceArr[i1].y = cycleRaceTextChoicePositions[i1].y;
                        }
                }

                var imageWrapper = cycleRaceImageChoiceWrappers[i1];
                if (!imageWrapper && typeof SAUI_createCycleRaceOptionBubble === "function") {
                        imageWrapper = SAUI_createCycleRaceOptionBubble({ variant: "image" });
                        cycleRaceImageChoiceWrappers[i1] = imageWrapper;
                }

                if (imageWrapper) {
                        cycleRaceDetachWrapperListeners(imageWrapper);
                        imageWrapper.visible = false;
                        imageWrapper.alpha = 0;
                        imageWrapper.mouseEnabled = false;
                        imageWrapper.cursor = "default";
                        imageWrapper.x = cycleRaceImageChoicePositions[i1].x;
                        imageWrapper.y = cycleRaceImageChoicePositions[i1].y;
                        imageWrapper.__homeX = imageWrapper.x;
                        imageWrapper.__homeY = imageWrapper.y;
                        if (!imageWrapper.parent) {
                                container.parent.addChild(imageWrapper);
                        }
                        if (imageWrapper.__content && choiceArr1[i1] && choiceArr1[i1].parent !== imageWrapper.__content) {
                                imageWrapper.__content.addChild(choiceArr1[i1]);
                        } else if (choiceArr1[i1] && choiceArr1[i1].parent !== imageWrapper) {
                                imageWrapper.addChild(choiceArr1[i1]);
                        }
                } else if (choiceArr1[i1] && !choiceArr1[i1].parent) {
                        container.parent.addChild(choiceArr1[i1]);
                }

                if (choiceArr1[i1]) {
                        choiceArr1[i1].visible = false;
                        choiceArr1[i1].alpha = 1;
                        centerCycleRaceOptionBitmap(choiceArr1[i1]);
                        choiceArr1[i1].mouseChildren = false;
                        choiceArr1[i1].cursor = "pointer";
                        choiceArr1[i1].__wrapper = imageWrapper;
                        if (imageWrapper && imageWrapper.__hitArea) {
                                choiceArr1[i1].hitArea = imageWrapper.__hitArea;
                        } else if (!imageWrapper) {
                                centerCycleRaceOptionBitmap(choiceArr1[i1]);
                                choiceArr1[i1].x = cycleRaceImageChoicePositions[i1].x;
                                choiceArr1[i1].y = cycleRaceImageChoicePositions[i1].y;
                        }
                }
        }
}

function cycleRaceResetQuestionDisplay() {

        if (cycleRaceQuestionBubble) {
                if (typeof SAUI_hideCycleRaceSpeechBubble === "function") {
                        SAUI_hideCycleRaceSpeechBubble(cycleRaceQuestionBubble);
                } else {
                        cycleRaceQuestionBubble.visible = false;
                        cycleRaceQuestionBubble.alpha = 0;
                }
        }

        for (var i2 = 0; i2 < choiceCnt; i2++) {
                if (cycleRaceTextChoiceWrappers[i2]) {
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(cycleRaceTextChoiceWrappers[i2]);
                        }
                        cycleRaceDetachWrapperListeners(cycleRaceTextChoiceWrappers[i2]);
                        cycleRaceTextChoiceWrappers[i2].visible = false;
                        cycleRaceTextChoiceWrappers[i2].alpha = 0;
                        cycleRaceTextChoiceWrappers[i2].mouseEnabled = false;
                }
                if (cycleRaceImageChoiceWrappers[i2]) {
                        if (typeof SAUI_stopCycleRaceOptionIdle === "function") {
                                SAUI_stopCycleRaceOptionIdle(cycleRaceImageChoiceWrappers[i2]);
                        }
                        cycleRaceDetachWrapperListeners(cycleRaceImageChoiceWrappers[i2]);
                        cycleRaceImageChoiceWrappers[i2].visible = false;
                        cycleRaceImageChoiceWrappers[i2].alpha = 0;
                        cycleRaceImageChoiceWrappers[i2].mouseEnabled = false;
                }
                if (choiceArr[i2]) {
                        choiceArr[i2].visible = false;
                        choiceArr[i2].alpha = 1;
                }
                if (choiceArr1[i2]) {
                        choiceArr1[i2].visible = false;
                        choiceArr1[i2].alpha = 1;
                }
        }

        if (question1) {
                question1.visible = false;
        }
        if (question2) {
                question2.visible = false;
        }
        if (questionText1) {
                questionText1.visible = false;
        }
}

function cycleRaceMarkCorrectWrapper() {
        if (chPosArr1[cnt] == 0 && choiceArr[chPosArr[cnt]] && choiceArr[chPosArr[cnt]].__wrapper) {
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(choiceArr[chPosArr[cnt]].__wrapper, true);
                }
        } else if (choiceArr1[chPosArr[cnt]] && choiceArr1[chPosArr[cnt]].__wrapper) {
                if (typeof SAUI_markCycleRaceOptionResult === "function") {
                        SAUI_markCycleRaceOptionResult(choiceArr1[chPosArr[cnt]].__wrapper, true);
                }
        }
}