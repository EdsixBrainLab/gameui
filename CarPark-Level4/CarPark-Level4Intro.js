var introQuescar, IntroColorHolder, IntroBackground, introQuestionText, introcolor, introTitle, introArrow, introfingure, introArrow1, introfingure1;
var introChoice1TweenArr = []
var introChoice = [];
var introbutton = [];
///////////////////////////Movie Click.Var /////////////////////////////////
var introquesArr = []
var introPosCarTime = []
var ChoiceTime;
var introDirPosArrowTime = [];
var introDirPosCarTime = [];
var introColorTime;
//////////////////////////Clue Var//////////////////////////////
var introDirPosCar = [];
var introDirPosQuestionText = [];
var introDirPosTrack = [];
var introDirPosArrow = [];

////////////////////////////x & Y Axis////////////////////////////
var introDirPosTrackX = [1200, -150];
var introDirPosTrackY = [75, 75];
var introDirPosArrowX = [978, 326.5];
var introDirPosArrowY = [114, 305];
var introDirPosCarX = [950.5,310];
var introDirPosCarY = [69, 348];
var introDirPosQuestionTextX = 700, introDirPosQuestionTextY = 441 + 110
////////////////////////////////////////////////////////////
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
//////////////////////////////Images X & Y////////////////////////////
var introQuestionTextX = 0, introQuestionTextY = 110
var introcolorX = 615, introcolorY = 415.5 + 110;
var IntrocarX = [, 608.5, 250, 950, 605.5]
var IntrocarY = [, 590, 312.5, 296.5, 60]
var introbuttonbtnX = [, 65, 315, 860, 1105]
var introArrowX = 90, introArrowY = 480;
var introfingureX = 120, introfingureY = 580;
var introArrow1X = 830, introArrow1Y = 470;
var introfingure1X = 890, introfingure1Y = 580;
var introQuescarX = 60, introQuescarY = 45 + 110
//////////////////////////////////////////////////////////////////////
var Questxt;
var INTRO_TITLE_Y = 96;
var INTRO_PROMPT_Y = 224;
var INTRO_DIRECTION_COLOR_FRAME = 4;
var INTRO_POSITION_COLOR_FRAME = 10;
var carParkIntroPromptActive = false;
var introPromptHelperWaiters = [];
var introPromptRevealTimers = [];
var carParkIntroPromptFallbackReady = false;

if (typeof shouldUseCarParkTextPrompt !== "function") {
    var shouldUseCarParkTextPrompt = function () {
        if (typeof lang === "undefined" || lang === null) {
            return true;
        }

        var normalized = String(lang).toLowerCase();
        normalized = normalized.replace(/\\+/g, "/");

        return (
            !normalized ||
            normalized === "englishquestiontext/" ||
            normalized === "englishquestiontext"
        );
    };
}

if (typeof CAR_PARK_PROMPT_COLOR_DATA === "undefined") {
    var CAR_PARK_PROMPT_COLOR_DATA = [
        { name: "RED", fill: "#FF4D5D" },
        { name: "YELLOW", fill: "#FFC531" },
        { name: "BLUE", fill: "#3E82FF" },
        { name: "GREEN", fill: "#32C46C" }
    ];
}

if (typeof getCarParkPromptColorData !== "function") {
    var getCarParkPromptColorData = function (index) {
        if (typeof index !== "number") {
            return CAR_PARK_PROMPT_COLOR_DATA[0];
        }

        var normalized = index % CAR_PARK_PROMPT_COLOR_DATA.length;
        if (normalized < 0) {
            normalized += CAR_PARK_PROMPT_COLOR_DATA.length;
        }

        return CAR_PARK_PROMPT_COLOR_DATA[normalized] || CAR_PARK_PROMPT_COLOR_DATA[0];
    };
}

if (typeof questionPromptContainer === "undefined") {
    var questionPromptContainer = null;
}
if (typeof questionPromptPrefix === "undefined") {
    var questionPromptPrefix = null;
}
if (typeof questionPromptFocusHighlight === "undefined") {
    var questionPromptFocusHighlight = null;
}
if (typeof questionPromptFocus === "undefined") {
    var questionPromptFocus = null;
}
if (typeof questionPromptMiddle === "undefined") {
    var questionPromptMiddle = null;
}
if (typeof questionPromptColor === "undefined") {
    var questionPromptColor = null;
}
if (typeof questionPromptSuffix === "undefined") {
    var questionPromptSuffix = null;
}
if (typeof questionPromptMask === "undefined") {
    var questionPromptMask = null;
}
if (typeof questionPromptCircleRadius === "undefined") {
    var questionPromptCircleRadius = 0;
}
if (typeof questionPromptContentWidth === "undefined") {
    var questionPromptContentWidth = 0;
}
if (typeof questionPromptContentHeight === "undefined") {
    var questionPromptContentHeight = 0;
}
if (typeof carParkPromptAnchorOverride === "undefined") {
    var carParkPromptAnchorOverride = null;
}

var CAR_PARK_INTRO_PROMPT_DEFAULT_POSITION = { x: 780, y: 460 };

function ensureCarParkIntroPromptContainer() {
    if (typeof createjs === "undefined" || !container || !container.parent) {
        return null;
    }

    if (!questionPromptContainer) {
        questionPromptContainer = new createjs.Container();
        questionPromptContainer.visible = false;
        questionPromptContainer.alpha = 0;
        questionPromptContainer.mouseEnabled = false;
        questionPromptContainer.mouseChildren = false;

        questionPromptPrefix = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
        questionPromptPrefix.textAlign = "left";
        questionPromptPrefix.textBaseline = "middle";
        questionPromptContainer.addChild(questionPromptPrefix);

        questionPromptFocusHighlight = new createjs.Shape();
        questionPromptFocusHighlight.visible = false;
        questionPromptContainer.addChild(questionPromptFocusHighlight);

        questionPromptFocus = new createjs.Text("", "800 54px 'Baloo 2'", "#FFB347");
        questionPromptFocus.textAlign = "left";
        questionPromptFocus.textBaseline = "middle";
        questionPromptContainer.addChild(questionPromptFocus);

        questionPromptMiddle = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
        questionPromptMiddle.textAlign = "left";
        questionPromptMiddle.textBaseline = "middle";
        questionPromptContainer.addChild(questionPromptMiddle);

        questionPromptColor = new createjs.Text("", "800 52px 'Baloo 2'", "#3E82FF");
        questionPromptColor.textAlign = "left";
        questionPromptColor.textBaseline = "middle";
        questionPromptContainer.addChild(questionPromptColor);

        questionPromptSuffix = new createjs.Text("", "700 50px 'Baloo 2'", "#16335F");
        questionPromptSuffix.textAlign = "left";
        questionPromptSuffix.textBaseline = "middle";
        questionPromptContainer.addChild(questionPromptSuffix);
    }

    if (!questionPromptContainer.parent) {
        container.parent.addChild(questionPromptContainer);
    }

    carParkIntroPromptFallbackReady = true;
    layoutCarParkPromptParts();
    positionCarParkPromptContainer();
    ensureCarParkPromptLayer();

    return questionPromptContainer;
}

if (typeof layoutCarParkPromptParts !== "function") {
    var layoutCarParkPromptParts = function () {
        if (!questionPromptContainer) {
            return;
        }

        var parts = [
            questionPromptPrefix,
            questionPromptFocus,
            questionPromptMiddle,
            questionPromptColor,
            questionPromptSuffix
        ];
        var spacing = 18;
        var totalWidth = 0;
        var maxHeight = 0;
        var widths = [];

        for (var idx = 0; idx < parts.length; idx++) {
            var part = parts[idx];
            if (!part) {
                widths[idx] = 0;
                continue;
            }

            var width = Math.max(0, part.getMeasuredWidth());
            var height = Math.max(0, part.getMeasuredLineHeight ? part.getMeasuredLineHeight() : part.getMeasuredHeight());
            widths[idx] = width;
            if (width > 0) {
                totalWidth += width;
                if (idx < parts.length - 1) {
                    totalWidth += spacing;
                }
            }
            if (height > maxHeight) {
                maxHeight = height;
            }
        }

        var startX = -totalWidth / 2;
        var cursorX = startX;

        for (var i = 0; i < parts.length; i++) {
            var textPart = parts[i];
            if (!textPart) {
                continue;
            }

            textPart.x = cursorX;
            textPart.y = 0;
            cursorX += widths[i] + spacing;
        }

        if (questionPromptFocusHighlight && questionPromptFocus) {
            var highlightFill = questionPromptFocusHighlight.__fillColor || "rgba(255,188,120,0.22)";
            var focusWidth = widths[1] || questionPromptFocus.getMeasuredWidth();
            var focusHeight = Math.max(
                56,
                questionPromptFocus.getMeasuredLineHeight ? questionPromptFocus.getMeasuredLineHeight() : questionPromptFocus.getMeasuredHeight()
            );
            var highlightWidth = focusWidth + 48;
            var highlightHeight = focusHeight + 26;
            questionPromptFocusHighlight.graphics
                .clear()
                .beginFill(highlightFill)
                .drawRoundRect(-highlightWidth / 2, -highlightHeight / 2, highlightWidth, highlightHeight, highlightHeight / 2);

            var focusLeft = questionPromptFocus.x;
            questionPromptFocusHighlight.x = focusLeft + focusWidth / 2;
            questionPromptFocusHighlight.y = 0;
            questionPromptFocusHighlight.visible = focusWidth > 0;
        }

        questionPromptContentWidth = totalWidth;
        questionPromptContentHeight = maxHeight;
    };
}

if (typeof positionCarParkPromptContainer !== "function") {
    var positionCarParkPromptContainer = function () {
        if (!questionPromptContainer) {
            return;
        }

        var anchorTarget = null;
        if (carParkPromptAnchorOverride && carParkPromptAnchorOverride.anchor) {
            anchorTarget = carParkPromptAnchorOverride.anchor;
        }

        var resolvedX = CAR_PARK_INTRO_PROMPT_DEFAULT_POSITION.x;
        var resolvedY = CAR_PARK_INTRO_PROMPT_DEFAULT_POSITION.y;

        if (anchorTarget) {
            if (typeof anchorTarget.x === "number") {
                resolvedX = anchorTarget.x;
            }
            if (typeof anchorTarget.y === "number") {
                resolvedY = anchorTarget.y;
            }
        }

        questionPromptContainer.x = resolvedX;
        questionPromptContainer.y = resolvedY;
    };
}

if (typeof ensureCarParkPromptContainer !== "function") {
    var ensureCarParkPromptContainer = function () {
        ensureCarParkIntroPromptContainer();
    };
}

if (typeof ensureCarParkPromptLayer !== "function") {
    var ensureCarParkPromptLayer = function () {
        if (!questionPromptContainer || !questionPromptContainer.parent) {
            return;
        }

        var parent = questionPromptContainer.parent;
        if (typeof parent.setChildIndex !== "function" || typeof parent.getChildIndex !== "function") {
            return;
        }

        var targetIndex = parent.numChildren - 1;
        if (parent.getChildIndex(questionPromptContainer) !== targetIndex) {
            parent.setChildIndex(questionPromptContainer, targetIndex);
        }
    };
}

if (typeof setCarParkPromptAnchorOverride !== "function") {
    var setCarParkPromptAnchorOverride = function (anchor, radius) {
        if (!anchor) {
            carParkPromptAnchorOverride = null;
            return;
        }

        if (typeof anchor.x === "number" && typeof anchor.y === "number") {
            carParkPromptAnchorOverride = {
                anchor: { x: anchor.x, y: anchor.y },
                radius: typeof radius === "number" ? radius : null
            };
        } else if (anchor.anchor) {
            carParkPromptAnchorOverride = {
                anchor: {
                    x: anchor.anchor.x || 0,
                    y: anchor.anchor.y || 0
                },
                radius: typeof anchor.radius === "number" ? anchor.radius : null
            };
        }

        positionCarParkPromptContainer();
    };
}

if (typeof clearCarParkPromptAnchorOverride !== "function") {
    var clearCarParkPromptAnchorOverride = function () {
        carParkPromptAnchorOverride = null;
    };
}

if (typeof setCarParkPromptAnchorFromTarget !== "function") {
    var setCarParkPromptAnchorFromTarget = function (target) {
        if (!target) {
            return;
        }

        var anchorPoint = { x: target.x || 0, y: target.y || 0 };

        if (typeof target.localToGlobal === "function") {
            var regX = typeof target.regX === "number" ? target.regX : 0;
            var regY = typeof target.regY === "number" ? target.regY : 0;
            var globalPoint = target.localToGlobal(regX, regY);
            if (globalPoint) {
                anchorPoint = { x: globalPoint.x, y: globalPoint.y };
            }
        }

        setCarParkPromptAnchorOverride(anchorPoint, null);
    };
}

if (typeof prepareCarParkPromptForReveal !== "function") {
    var prepareCarParkPromptForReveal = function () {
        ensureCarParkIntroPromptContainer();
        if (!questionPromptContainer) {
            return;
        }

        questionPromptContainer.visible = false;
        questionPromptContainer.alpha = 0;
        ensureCarParkPromptLayer();
    };
}

if (typeof updateCarParkPrompt !== "function") {
    var updateCarParkPrompt = function (colorIndex, questionType) {
        ensureCarParkIntroPromptContainer();
        if (!questionPromptContainer) {
            return;
        }

        var colorData = getCarParkPromptColorData(colorIndex);
        var isPositionPrompt = questionType === 1;

        if (questionPromptPrefix) {
            questionPromptPrefix.text = "what is the";
        }

        if (questionPromptFocus) {
            questionPromptFocus.text = isPositionPrompt ? "position" : "direction";
            questionPromptFocus.color = isPositionPrompt ? "#FF9D40" : "#FFB347";
        }

        if (questionPromptFocusHighlight) {
            questionPromptFocusHighlight.__fillColor = isPositionPrompt
                ? "rgba(255,170,102,0.24)"
                : "rgba(255,188,120,0.22)";
        }

        if (questionPromptMiddle) {
            questionPromptMiddle.text = "of the";
        }

        if (questionPromptColor) {
            questionPromptColor.text = colorData && colorData.name ? colorData.name.toLowerCase() : "";
            questionPromptColor.color = colorData && colorData.fill ? colorData.fill : "#3E82FF";
        }

        if (questionPromptSuffix) {
            questionPromptSuffix.text = "car?";
        }

        layoutCarParkPromptParts();
        positionCarParkPromptContainer();
        ensureCarParkPromptLayer();
    };
}

if (typeof revealCarParkPrompt !== "function") {
    var revealCarParkPrompt = function () {
        ensureCarParkIntroPromptContainer();
        if (!questionPromptContainer) {
            return;
        }

        layoutCarParkPromptParts();
        positionCarParkPromptContainer();
        ensureCarParkPromptLayer();
        questionPromptContainer.visible = true;
        questionPromptContainer.alpha = 0;

        if (typeof createjs !== "undefined" && createjs.Tween) {
            createjs.Tween.get(questionPromptContainer, { override: true })
                .to({ alpha: 1 }, 240, createjs.Ease ? createjs.Ease.quadOut : null);

            if (questionPromptFocus && createjs.Tween) {
                createjs.Tween.get(questionPromptFocus, { override: true })
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 220, createjs.Ease ? createjs.Ease.quadOut : null)
                    .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease ? createjs.Ease.sineInOut : null);
            }
        } else {
            questionPromptContainer.alpha = 1;
        }
    };
}

if (typeof hideCarParkPrompt !== "function") {
    var hideCarParkPrompt = function () {
        if (!questionPromptContainer) {
            return;
        }

        questionPromptContainer.visible = false;
        questionPromptContainer.alpha = 0;
    };
}

function areCarParkPromptHelpersReady() {
    return (
        typeof ensureCarParkPromptContainer === "function" &&
        typeof prepareCarParkPromptForReveal === "function" &&
        typeof updateCarParkPrompt === "function" &&
        typeof revealCarParkPrompt === "function" &&
        typeof ensureCarParkPromptLayer === "function"
    );
}

function releaseIntroPromptWaiter(id) {
    if (!introPromptHelperWaiters || !introPromptHelperWaiters.length) {
        return;
    }

    var next = [];
    for (var i = 0; i < introPromptHelperWaiters.length; i++) {
        if (introPromptHelperWaiters[i] !== id) {
            next.push(introPromptHelperWaiters[i]);
        }
    }

    introPromptHelperWaiters = next;
}

function releaseIntroPromptRevealTimer(id) {
    if (!introPromptRevealTimers || !introPromptRevealTimers.length) {
        return;
    }

    var next = [];
    for (var i = 0; i < introPromptRevealTimers.length; i++) {
        if (introPromptRevealTimers[i] !== id) {
            next.push(introPromptRevealTimers[i]);
        }
    }

    introPromptRevealTimers = next;
}

function clearIntroPromptHelperWaiters() {
    if (!introPromptHelperWaiters || !introPromptHelperWaiters.length) {
        return;
    }

    for (var i = 0; i < introPromptHelperWaiters.length; i++) {
        clearInterval(introPromptHelperWaiters[i]);
    }

    introPromptHelperWaiters.length = 0;
}

function clearIntroPromptRevealTimers() {
    if (!introPromptRevealTimers || !introPromptRevealTimers.length) {
        return;
    }

    for (var i = 0; i < introPromptRevealTimers.length; i++) {
        clearTimeout(introPromptRevealTimers[i]);
    }

    introPromptRevealTimers.length = 0;
}

function cancelCarParkIntroPromptSchedulers() {
    clearIntroPromptHelperWaiters();
    clearIntroPromptRevealTimers();
}

function runWhenCarParkPromptReady(handler) {
    if (!shouldUseCarParkIntroTextPrompt() || typeof handler !== "function") {
        return false;
    }

    if (areCarParkPromptHelpersReady()) {
        handler();
        return true;
    }

    var attempts = 0;
    var maxAttempts = 180;
    var waitInterval = setInterval(function () {
        if (!shouldUseCarParkIntroTextPrompt()) {
            clearInterval(waitInterval);
            releaseIntroPromptWaiter(waitInterval);
            return;
        }

        if (areCarParkPromptHelpersReady()) {
            clearInterval(waitInterval);
            releaseIntroPromptWaiter(waitInterval);
            handler();
            return;
        }

        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(waitInterval);
            releaseIntroPromptWaiter(waitInterval);
        }
    }, 16);

    introPromptHelperWaiters.push(waitInterval);
    return false;
}

function scheduleCarParkIntroPromptReveal(callback, delay) {
    if (typeof callback !== "function") {
        return null;
    }

    var timeoutId = setTimeout(function () {
        releaseIntroPromptRevealTimer(timeoutId);
        if (!carParkIntroPromptActive || !shouldUseCarParkIntroTextPrompt()) {
            return;
        }

        callback();
    }, typeof delay === "number" ? delay : 0);

    introPromptRevealTimers.push(timeoutId);
    return timeoutId;
}

function shouldUseCarParkIntroTextPrompt() {
    if (typeof shouldUseCarParkTextPrompt === "function") {
        return shouldUseCarParkTextPrompt();
    }

    return true;
}

function resolveIntroPromptColorIndex(frameIndex) {
    if (typeof frameIndex !== "number" || isNaN(frameIndex)) {
        return 0;
    }

    return frameIndex;
}

function resolveIntroPromptAnchorTarget(questionType) {
    if (typeof questionType === "number" && introDirPosQuestionText && introDirPosQuestionText.length) {
        var dirPosTarget = introDirPosQuestionText[questionType];
        if (!dirPosTarget && questionType === 1 && introDirPosQuestionText[0]) {
            dirPosTarget = introDirPosQuestionText[0];
        }

        if (dirPosTarget && dirPosTarget.parent) {
            return dirPosTarget;
        }
    }

    if (introcolor && introcolor.parent) {
        return introcolor;
    }

    if (introQuestionText && introQuestionText.parent) {
        return introQuestionText;
    }

    return null;
}

function queueIntroPromptReveal(questionType, frameIndex) {
    if (!shouldUseCarParkIntroTextPrompt()) {
        return;
    }

    runWhenCarParkPromptReady(function () {
        if (!carParkIntroPromptActive) {
            return;
        }

        if (typeof ensureCarParkPromptContainer === "function") {
            ensureCarParkPromptContainer();
        }

        var anchorTarget = resolveIntroPromptAnchorTarget(questionType);
        if (anchorTarget) {
            if (typeof setCarParkPromptAnchorFromTarget === "function") {
                setCarParkPromptAnchorFromTarget(anchorTarget);
            } else if (typeof setCarParkPromptAnchorOverride === "function") {
                setCarParkPromptAnchorOverride({ x: anchorTarget.x || 0, y: anchorTarget.y || 0 });
            }
        }

        if (typeof prepareCarParkPromptForReveal === "function") {
            prepareCarParkPromptForReveal();
        }

        if (typeof updateCarParkPrompt === "function") {
            updateCarParkPrompt(resolveIntroPromptColorIndex(frameIndex), questionType);
        }

        if (typeof ensureCarParkPromptLayer === "function") {
            ensureCarParkPromptLayer();
        }

        if (typeof revealCarParkPrompt === "function") {
            clearIntroPromptRevealTimers();
            revealCarParkPrompt();
        } else if (questionPromptContainer) {
            questionPromptContainer.visible = true;
            questionPromptContainer.alpha = 1;
        }
    });
}

function resolveCarParkIntroTitlePosition() {
    if (typeof getTitlePanelPosition === "function") {
        var resolved = getTitlePanelPosition();
        if (resolved && typeof resolved.x === "number" && typeof resolved.y === "number") {
            return { x: resolved.x, y: resolved.y };
        }
    }

    if (typeof CARPARK_TITLE_PANEL_POSITION !== "undefined" && CARPARK_TITLE_PANEL_POSITION) {
        if (typeof CARPARK_TITLE_PANEL_POSITION.x === "number" && typeof CARPARK_TITLE_PANEL_POSITION.y === "number") {
            return { x: CARPARK_TITLE_PANEL_POSITION.x, y: CARPARK_TITLE_PANEL_POSITION.y };
        }
    }

    if (typeof window !== "undefined" && window.__carParkLevel4TitlePosition) {
        var introWindowPos = window.__carParkLevel4TitlePosition;
        if (typeof introWindowPos.x === "number" && typeof introWindowPos.y === "number") {
            return { x: introWindowPos.x, y: introWindowPos.y };
        }
    }

    return { x: 120, y: 320 };
}

function applyResolvedIntroTitlePosition(target, position) {
    if (!target || !position) {
        return;
    }

    target.x = position.x;
    target.y = position.y;

    target.__layoutTargetX = position.x;
    target.__layoutTargetY = position.y;

    if (!target.__manualLayoutPosition) {
        target.__manualLayoutPosition = { x: position.x, y: position.y };
    } else {
        target.__manualLayoutPosition.x = position.x;
        target.__manualLayoutPosition.y = position.y;
    }
}

function ensureIntroTitleLayer(target) {
    if (!target || !container || !container.parent || typeof container.parent.setChildIndex !== "function") {
        return;
    }

    container.parent.setChildIndex(target, container.parent.numChildren - 1);
}

function addIntroLayerChild(child) {
    if (!child || !container || !container.parent || typeof container.parent.addChild !== "function") {
        return;
    }

    container.parent.addChild(child);

    if (typeof ensureCarParkPromptLayer === "function") {
        ensureCarParkPromptLayer();
    }

    if (introTitle && introTitle.parent) {
        ensureIntroTitleLayer(introTitle);
    }
}

function commongameintro() {
    cancelCarParkIntroPromptSchedulers();
    carParkIntroPromptActive = shouldUseCarParkIntroTextPrompt();

    var introTitlePosition = resolveCarParkIntroTitlePosition();

    if (typeof Title !== "undefined" && Title) {
        applyResolvedIntroTitlePosition(Title, introTitlePosition);
    }
    Questxt = 0;
    IntroBackground = holder.clone();
    if (typeof Title !== "undefined" && Title) {
        introTitle = Title.clone();
    } else {
        introTitle = null;
    }
    introQuescar = car1.clone();
    introcolor = q1.clone();
    introQuestionText = questionText.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introArrow1 = arrow1.clone()
    introfingure1 = fingure.clone()

    IntroBackground.visible = true;
    addIntroLayerChild(IntroBackground)
    introQuescar.visible = false;
    addIntroLayerChild(introQuescar)
    introQuescar.regX = introQuescar.regY = 50
    introQuescar.x = introQuescarX;
    introQuescar.y = introQuescarY;
    introQuescar.scaleX = introQuescar.scaleY = 1

    introColorTime = new createjs.MovieClip();
    addIntroLayerChild(introColorTime);
    introcolor.visible = false;
    addIntroLayerChild(introcolor)
    introcolor.x = introcolorX;
    introcolor.y = introcolorY;
    introColorTime.addChild(introcolor)

    /////////////////////////////////////////////////////car nd button//////////////////////
    for (i = 1; i <= 4; i++) {

        introChoice[i] = this["choice" + i].clone();
        addIntroLayerChild(introChoice[i])
        introChoice[i].scaleX = introChoice[i].scaleY = .6
        introChoice[i].visible = false;

        /////////////////////////////////////////////////////////
    }
    for (i = 1; i <= 4; i++) {
        introbutton[i] = buttons.clone();
        addIntroLayerChild(introbutton[i]);
        introbutton[i].x = introbuttonbtnX[i]
        introbutton[i].y = 590;
        introbutton[i].scaleX = introbutton[i].scaleY = 0.95;
        introbutton[i].visible = false;
    }
    introQuestionText.visible = false;
    addIntroLayerChild(introQuestionText)
    introQuestionText.x = introQuestionTextX;
    introQuestionText.y = introQuestionTextY;

    if (shouldUseCarParkIntroTextPrompt()) {
        introQuestionText.visible = false;
    }

    if (introTitle) {
        applyResolvedIntroTitlePosition(introTitle, introTitlePosition);
        introTitle.visible = true;
        introTitle.alpha = 1;
    }

    for (i = 0; i < 2; i++) {
        ////////////////////in qtxt direction nd position image///////////////////////////
        introquesArr[i] = new createjs.MovieClip();
        addIntroLayerChild(introquesArr[i]);
        introDirPosQuestionText[i] = DirPosQuestionText.clone();
        addIntroLayerChild(introDirPosQuestionText[i])
        introDirPosQuestionText[i].visible = false;
        introDirPosQuestionText[i].x = introDirPosQuestionTextX;
        introDirPosQuestionText[i].y = introDirPosQuestionTextY;
        introDirPosQuestionText[i].gotoAndStop(i)
        introquesArr[i].addChild(introDirPosQuestionText[i]);
        ///////////////////////////////////////Round track clueimage///////////////////////////////////////

        introDirPosTrack[i] = DirPosTrack.clone();
        addIntroLayerChild(introDirPosTrack[i])
        introDirPosTrack[i].visible = false;
        introDirPosTrack[i].x = introDirPosTrackX[i];
        introDirPosTrack[i].y = introDirPosTrackY[i];
        introDirPosTrack[i].gotoAndStop(i)

    }
    for (i = 0; i < 2; i++) {
        ////////////////////ClueDirPosCar///////////////////////////////////
        introDirPosCarTime[i] = new createjs.MovieClip();
        addIntroLayerChild(introDirPosCarTime[i]);
        introDirPosCar[i] = DirPosCar.clone();
        addIntroLayerChild(introDirPosCar[i])

        /////////////////////////////////////////////
        introDirPosCar[i].visible = false;
        introDirPosCar[i].x = introDirPosCarX[i];
        introDirPosCar[i].y = introDirPosCarY[i];
        introDirPosCar[i].gotoAndStop(i)
        introDirPosCarTime[i].addChild(introDirPosCar[i]);
        ///////////////////////Arrow for Dir & Pos/////////////////////////////
        introDirPosArrowTime[i] = new createjs.MovieClip();
        addIntroLayerChild(introDirPosArrowTime[i]);
        introDirPosArrow[i] = DirPosArrow.clone();
        addIntroLayerChild(introDirPosArrow[i])
        /////////////////////////////////////////////
        introDirPosArrow[i].visible = false;
        introDirPosArrow[i].x = introDirPosArrowX[i];
        introDirPosArrow[i].y = introDirPosArrowY[i];
        introDirPosArrow[i].gotoAndStop(i)
        introDirPosArrowTime[i].addChild(introDirPosArrow[i]);

    }

    if (introTitle) {
        addIntroLayerChild(introTitle)
    }
    if(lang == "TamilQuestionText/"  ){
        introcolor.x = 618;
        introcolor.y = 400
        for (i = 0; i < 2; i++) {
            introDirPosQuestionText[i].y = 610
        }
        introQuescar.x = 60;
        introQuescar.y = 152
        introQuestionText.y = 165;
    } else if(lang == "VietnameseQuestionText/"){
        introcolor.x = 618;
        introcolor.y = 488.5
    }
    else if(lang == "ArabicQuestionText/")
    {
        introcolor.x = 618; introcolor.y = 528;
        introcolor.visible = false;
     
        introQuescar.x = 50;
        introQuescar.y = 155
    } 
    else if(lang == "BanglaQuestionText/")
        {
            introcolor.x = 618; introcolor.y = 400
            introcolor.visible = false;
            for (i = 0; i < 2; i++) {
                introDirPosQuestionText[i].y = 600        
            }
            introQuescar.x = 50;
            introQuescar.y = 155
        }  

//  else if(lang == "HindiQuestionText/")
//         {
//             introcolor.x = introcolorX;
//             introcolor.y = introcolorY - 44;
//             introQuestionText.y = introQuestionText.y - 10
// 			  for (i = 0; i < 2; i++) {
//                 introDirPosQuestionText[i].y = 535;        
//             }
//         }   		
		
        else{
        introcolor.x = introcolorX;
        introcolor.y = introcolorY;
    }
    if (shouldUseCarParkIntroTextPrompt()) {
        runWhenCarParkPromptReady(function () {
            if (!carParkIntroPromptActive) {
                return;
            }

            if (typeof ensureCarParkPromptContainer === "function") {
                ensureCarParkPromptContainer();
            }

            if (introcolor) {
                if (typeof setCarParkPromptAnchorFromTarget === "function") {
                    setCarParkPromptAnchorFromTarget(introcolor);
                } else if (typeof setCarParkPromptAnchorOverride === "function") {
                    setCarParkPromptAnchorOverride({ x: introcolor.x || 0, y: introcolor.y || 0 });
                }
            }

            if (typeof hideCarParkPrompt === "function") {
                hideCarParkPrompt();
            }

            if (typeof ensureCarParkPromptLayer === "function") {
                ensureCarParkPromptLayer();
            }
        });
    }
    carDisplay();
}

function carDisplay() {
    createjs.Tween.removeAllTweens();
    ////////////////////car display?//////////////////////
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        for (i = 1; i <= 4; i++) {
            introChoice[i] = this["choice" + i].clone();
            addIntroLayerChild(introChoice[i])
            introChoice[i].alpha = 0;
            introChoice[i].scaleX = introChoice[i].scaleY = .55
            introChoice[i].visible = false;
        }
        var choicei = [2, 5, 15, 8]
        //down car///
        introChoice[1].gotoAndStop(2)
        createjs.Tween.get(introChoice[1]).wait(600)
            .to({ visible: true, x: 608, y: 625, alpha: 1 }, 800).to({ x: 603, y: 580 }, 500)
            .to({ rotation: 90, x: 682, y: 630 }, 100, createjs.Ease.bounceOut)

        ///left car// 
        introChoice[2].gotoAndStop(5)
        createjs.Tween.get(introChoice[2]).wait(600)
            .to({ visible: true, x: 90, y: 405, alpha: 1 }, 800)
            .to({ x: 250, y: 290 + 100, alpha: 1 }, 500)
            .to({ rotation: -90, x: 300,  y: 491 }, 100, createjs.Ease.bounceOut)


        //right car.//
        introChoice[3].gotoAndStop(15)
        createjs.Tween.get(introChoice[3]).wait(600)
            .to({ visible: true, x: 1150, y: 290 + 115, alpha: 1 }, 800)
            .to({ visible: true, x: 950, y: 290 + 115, alpha: 1 }, 500)
            .to({ rotation: -90, x: 950, y: 372 + 115  }, 100, createjs.Ease.bounceOut)

        //up car//  
        introChoice[4].gotoAndStop(8)
        createjs.Tween.get(introChoice[4]).wait(600)
            .to({ visible: true, x: 600, y: 10, alpha: 1 }, 800)
            .to({ visible: true, x: 600, y: 60, alpha: 1 }, 500)
            .to({ rotation: 90, x: 682, y: 110 }, 100, createjs.Ease.bounceOut)
            .wait(500).call(handleComplete1_1);

    }
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        quesTween()
    }
}

function quesTween() {
    if (Questxt == 0) {
        if (!shouldUseCarParkIntroTextPrompt()) {
            introQuestionText.visible = true;
            introQuestionText.alpha = 0;
            createjs.Tween.get(introQuestionText).wait(250)
                .to({ alpha: 1, x: 0 }, 500)
                .to({ alpha: 1, x: 0, scaleX: 1, scaleY: 1 }, 500)

            introDirPosQuestionText[0].visible = true;
            introDirPosQuestionText[0].alpha = 0;
            introDirPosQuestionText[0].gotoAndStop(0)
            introDirPosQuestionText[0].regX = introDirPosQuestionText[0].regY = 100
            introDirPosQuestionText[0].scaleX = 1; introDirPosQuestionText[0].scaleY = 1
            introquesArr[0].timeline.addTween(createjs.Tween.get(introDirPosQuestionText[0])
                .to({ scaleX: .95, scaleY: .95 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
            createjs.Tween.get(introDirPosQuestionText[0]).wait(250)
                .to({ alpha: 1, scaleY: 1, scaleX: 1 }, 250, createjs.Ease.bounceOut)
                .to({ alpha: 1, scaleY: .95, scaleX: .95 }, 250, createjs.Ease.bounceOut)
        } else {
            introQuestionText.visible = false;
            introDirPosQuestionText[0].visible = false;
            queueIntroPromptReveal(0, INTRO_DIRECTION_COLOR_FRAME);
        }

        introQuescar.visible = true;
        introQuescar.alpha = 0;
        createjs.Tween.get(introQuescar)
            .wait(750)
            .to({ alpha: 1, regX: 50, regY: 50, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.bounceOut)
            .call(handleComplete2_1);
    }
    else {
        for (i = 1; i <= 4; i++) {
            introChoice[i].alpha = 1;
            introChoice[i].visible = true;
        }

        if (!shouldUseCarParkIntroTextPrompt()) {
            introQuestionText.visible = true;
            introQuestionText.alpha = 0;
            createjs.Tween.get(introQuestionText).wait(250)
                .to({ alpha: 1, x: 0 }, 500)
                .to({ alpha: 1, x: 0, scaleX: 1, scaleY: 1 }, 500)

            introDirPosQuestionText[1].visible = true;
            introDirPosQuestionText[1].alpha = 0;
            introDirPosQuestionText[1].gotoAndStop(1)
            introDirPosQuestionText[1].regX = introDirPosQuestionText[1].regY = 100
            introDirPosQuestionText[1].scaleX = 1; introDirPosQuestionText[1].scaleY = 1
            introquesArr[1].timeline.addTween(createjs.Tween.get(introDirPosQuestionText[1])
                .to({ scaleX: .95, scaleY: .95 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
            createjs.Tween.get(introDirPosQuestionText[1]).wait(250)
                .to({ alpha: 1, scaleY: 1, scaleX: 1 }, 250, createjs.Ease.bounceOut)
                .to({ alpha: 1, scaleY: .95, scaleX: .95 }, 250, createjs.Ease.bounceOut)
        } else {
            introQuestionText.visible = false;
            introDirPosQuestionText[1].visible = false;
            queueIntroPromptReveal(1, INTRO_POSITION_COLOR_FRAME);
        }

        introQuescar.visible = true;
        introQuescar.alpha = 0;
        createjs.Tween.get(introQuescar)
            .wait(750)
            .to({ alpha: 1, regX: 50, regY: 50, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.bounceOut)
            .call(handleComplete2_1);
    }
} function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        choiceTween()
    }
}
function choiceTween() {
    if (Questxt == 0) {
        introcolor.gotoAndStop(4)
        introcolor.visible = true;
        introcolor.alpha = 0;
        introcolor.scaleX = introcolor.scaleY = .75
        ///////////////////////////////////////////////////////////////////

        introColorTime.timeline.addTween(createjs.Tween.get(introcolor)
            .to({ scaleX: .7, scaleY: .7 }, 15).to({ scaleX: .75, scaleY: .75 }, 16).wait(1));
        ///////////////////////////////////////////////////////////////////
        createjs.Tween.get(introcolor)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 600)
            .to({ alpha: 1, scaleX: .7, scaleY: .7 }, 600)
            .call(handleComplete2_2)
    }
    else {


        introcolor.gotoAndStop(10)
        introcolor.visible = true;
        introcolor.alpha = 0;
        ///////////////////////////////////////////////////////////////////////////
        introColorTime.timeline.addTween(createjs.Tween.get(introcolor)
            .to({ scaleX: .7, scaleY: .7 }, 15).to({ scaleX: .75, scaleY: .75 }, 16).wait(1));
        ///////////////////////////////////////////////////////////////////
        createjs.Tween.get(introcolor)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 600)
            .to({ alpha: 1, scaleX: .7, scaleY: .7 }, 600)
            .call(handleComplete2_2)
    }
}

function handleComplete2_2() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {

        buttonTween()
    }
}
function buttonTween() {


    for (i = 1; i <= 4; i++) {
        introbutton[i].x = introbuttonbtnX[i]
        introbutton[i].y = 560;
        introbutton[i].scaleX = introbutton.scaleY = 0.95;
        introbutton[i].visible = true;
        introbutton[i].alpha = 0;
    }
    introbutton[1].gotoAndStop(3);
    introbutton[2].gotoAndStop(1);
    introbutton[3].gotoAndStop(0);
    introbutton[4].gotoAndStop(2);
    createjs.Tween.get(introbutton[1]).wait(100)
        .to({ y: 580, alpha: 1, scaleX: .8, scaleY: .8 }, 400)
        .to({ y: 600, alpha: 1, scaleX: .75, scaleY: .75 }, 400);
    createjs.Tween.get(introbutton[2]).wait(200)
        .to({ y: 580, alpha: 1, scaleX: .8, scaleY: .8 }, 400)
        .to({ y: 600, alpha: 1, scaleX: .75, scaleY: .75 }, 400);
    createjs.Tween.get(introbutton[3]).wait(300)
        .to({ y: 580, alpha: 1, scaleX: .8, scaleY: .8 }, 400)
        .to({ y: 600, alpha: 1, scaleX: .75, scaleY: .75 }, 400);
    createjs.Tween.get(introbutton[4]).wait(400)
        .to({ y: 580, alpha: 1, scaleX: .8, scaleY: .8 }, 400)
        .to({ y: 600, alpha: 1, scaleX: .75, scaleY: .75 }, 400)
        .call(handleComplete3_01);
}



function handleComplete3_01() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        TweenChoice()
    }
}
function TweenChoice() {
    if (Questxt == 0) {
        introDirPosTrack[0].visible = true;
        introDirPosTrack[0].alpha = 0
        createjs.Tween.get(introDirPosTrack[0])
            .to({ visible: true, x: 828, scaleX: .5, scaleY: .5, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .95, scaleY: .95, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .85, scaleY: .85, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .95, scaleY: .95, alpha: 1 }, 500)
            .call(handleComplete3_1)

    }
    else {
        introDirPosTrack[1].visible = true;
        introDirPosTrack[1].alpha = 0
        createjs.Tween.get(introDirPosTrack[1])
            .to({ visible: true, x: 180, scaleX: .5, scaleY: .5, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .95, scaleY: .95, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .85, scaleY: .85, alpha: 1 }, 500)
            .to({ visible: true, scaleX: .95, scaleY: .95, alpha: 1 }, 500)
            .call(handleComplete3_1)
    }
}

function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        CarImageClue()
    }
}
function CarImageClue() {
    if (Questxt == 0) {
        introDirPosCar[0].visible = true;
        introDirPosCar[0].alpha = 1
        introDirPosCar[0].scaleX = introDirPosCar[0].scaleY = 1.1

        //////////////////////////////////////////////////////////////////////
        introDirPosCarTime[0].timeline.addTween(createjs.Tween.get(introDirPosCar[0])
            .to({ scaleX: 1.05, scaleY: 1.05 }, 19).to({ scaleX: 1.1, scaleY: 1.1 }, 20).wait(1));
        /////////////////////////////////////////////////////////////////  
        createjs.Tween.get(introDirPosCar[0])
            .to({ visible: true, scaleX: 1.05, scaleY: 1.05, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.05, scaleY: 1.05, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .call(handleComplete3_2)
    }
    else {
        introDirPosCar[1].visible = true;
        introDirPosCar[1].alpha = 0
        introDirPosCar[1].scaleX = introDirPosCar[1].scaleY = 1.1
        //////////////////////////////////////////////////
        introDirPosCarTime[1].timeline.addTween(createjs.Tween.get(introDirPosCar[1])
            .to({ scaleX: 1.05, scaleY: 1.05 }, 19).to({ scaleX: 1.1, scaleY: 1.1 }, 20).wait(1));
        ///////////////////////////////////////////////////
        createjs.Tween.get(introDirPosCar[1])
            .to({ visible: true, scaleX: 1.05, scaleY: 1.05, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.05, scaleY: 1.05, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)

            .call(handleComplete3_2)
    }
}

function handleComplete3_2() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {
        ArrowImageClue()
    }
}
function ArrowImageClue() {

    if (Questxt == 0) {

        introDirPosArrow[0].visible = true;
        introDirPosArrow[0].alpha = 0
        introDirPosArrow[0].scaleX = introDirPosArrow[0].scaleY = 1.1
        /////////////////////////////////////////////////////////////////  
        introDirPosArrowTime[0].timeline.addTween(createjs.Tween.get(introDirPosArrow[0])
            .to({ scaleX: 1, scaleY: 1 }, 19).to({ scaleX: 1.1, scaleY: 1.1 }, 20).wait(1));
        ///////////////////////////////////////////////////////////////////
        createjs.Tween.get(introDirPosArrow[0])
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1, scaleY: 1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.15, scaleY: 1.15, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1, scaleY: 1, alpha: 1 }, 600)
        ChoiceTime = new createjs.MovieClip();
        addIntroLayerChild(ChoiceTime);
        ChoiceTime.timeline.addTween(createjs.Tween.get(introChoice[4])
            .to({ scaleX: .6, scaleY: .6 }, 19).to({ scaleX: .55, scaleY: .55 }, 20).wait(1));
        createjs.Tween.get(introChoice[4])
            .to({ visible: true, scaleX: .55, scaleY: .55, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .5, scaleY: .5, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .55, scaleY: .55, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .5, scaleY: .5, alpha: 1 }, 600)
            .call(handleComplete3_3)
    }
    else {



        introDirPosArrow[1].visible = true;
        introDirPosArrow[1].alpha = 0
        introDirPosArrow[1].scaleX = introDirPosArrow[1].scaleY = 1.1
        /////////////////////////////////////////////////////////////////  
        introDirPosArrowTime[1].timeline.addTween(createjs.Tween.get(introDirPosArrow[1])
            .to({ scaleX: 1, scaleY: 1 }, 19).to({ scaleX: 1.1, scaleY: 1.1 }, 20).wait(1));
        ///////////////////////////////////////////////////////////////////
        createjs.Tween.get(introDirPosArrow[1])
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1, scaleY: 1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 600)
            .to({ visible: true, scaleX: 1, scaleY: 1, alpha: 1 }, 600)
        /////////////////////////////////
        ChoiceTime = new createjs.MovieClip();
        addIntroLayerChild(ChoiceTime);
        ChoiceTime.timeline.addTween(createjs.Tween.get(introChoice[1])
            .to({ scaleX: .6, scaleY: .6 }, 19).to({ scaleX: .55, scaleY: .55 }, 20).wait(1));
        ////////////////////////////////////////////////////////////
        createjs.Tween.get(introChoice[1])
            .to({ visible: true, scaleX: .55, scaleY: .55, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .5, scaleY: .5, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .55, scaleY: .55, alpha: 1 }, 600)
            .to({ visible: true, scaleX: .5, scaleY: .5, alpha: 1 }, 600)
            .call(handleComplete3_3)
    }
}

function handleComplete3_3() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
        removeGameIntro()
    }
    else {

        ButtonTween()
    }
}
function ButtonTween() {
    if (Questxt == 0) {


        //////////////////////////////////////////
        createjs.Tween.get(introbutton[1])
            .to({ alpha: 1, scaleX: .8, scaleY: .8 }, 500)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 500)
            .to({ alpha: 1, scaleX: .8, scaleY: .8 }, 500)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 500).wait(500)

            .call(handleComplete3_4)
    }
    else {
        createjs.Tween.get(introbutton[4])
            .to({ alpha: 1, scaleX: .8, scaleY: .8 }, 500)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 500)
            .to({ alpha: 1, scaleX: .8, scaleY: .8 }, 500)
            .to({ alpha: 1, scaleX: .75, scaleY: .75 }, 500).wait(500)


            .call(handleComplete3_4)
    }
}
function handleComplete3_4() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("setCallDelay  == stopValue")
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
        addIntroLayerChild(introArrow);
        introArrow.visible = true;
        introArrow.x = introArrowX;
        introArrow.y = introArrowY;
        highlightTweenArr[0] = new createjs.MovieClip()
        addIntroLayerChild(highlightTweenArr[0])

        if (Questxt == 0) {
            highlightTweenArr[0] = createjs.Tween.get(introArrow)
                .to({ y: introArrowY + 10 }, 350)
                .to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350)
                .to({ y: introArrowY }, 350)
                .to({ y: introArrowY + 10 }, 350)
                .to({ y: introArrowY }, 350)
                .wait(400)
                .call(this.onComplete1)
        }
        else {
            introArrow.x = 1105;
            highlightTweenArr[0] = createjs.Tween.get(introArrow)
                .to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350)
                .to({ y: introArrowY }, 350)
                .to({ y: introArrowY + 10 }, 350)
                .to({ y: introArrowY }, 350)
                .wait(400)
                .call(this.onComplete1)
        }

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
        addIntroLayerChild(introfingure);
        introfingure.visible = true;
        introfingure.x = introfingureX;
        introfingure.y = introfingureY;
        highlightTweenArr[1] = new createjs.MovieClip()
        addIntroLayerChild(highlightTweenArr[1])
        if (Questxt == 0) {
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: introfingureX }, 350)
                .to({ x: introfingureX - 15 }, 350)
                .to({ x: introfingureX }, 350)
                .to({ x: introfingureX - 15 }, 350)
                .wait(200)
                .call(this.onComplete2)

        }
        else {
            introfingure.x = 1135
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: introfingure.x }, 350)
                .to({ x: introfingure.x - 15 }, 350)
                .to({ x: introfingure.x }, 350)
                .to({ x: introfingure.x - 15 }, 350)
                .wait(200)
                .call(this.onComplete2)
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
        if (Questxt == 1) {
            console.log("///setcallDelat=====+");
            setTimeout(setCallDelay, 500)
        }
        else {
            console.log("///commongameintro1=====+");
            setTimeout(commongameintro1, 500)
        }
    }

}
function commongameintro1() {
    createjs.Tween.removeAllTweens();
    Questxt = 1;
    if (shouldUseCarParkIntroTextPrompt()) {
        clearIntroPromptRevealTimers();
        runWhenCarParkPromptReady(function () {
            if (typeof hideCarParkPrompt === "function") {
                hideCarParkPrompt();
            }
        });
    }
    if (stopValue == 0) {
        console.log("onComplete2  == stopValue")
        removeGameIntro()
    }
    else {
        createjs.Tween.removeAllTweens();
        introArrow.visible = false
        introfingure.visible = false
        introQuescar.visible = false
        introcolor.visible = false
        introQuestionText.visible = false
        introDirPosTrack[0].visible = false;
        introDirPosArrow[0].visible = false;   

        for (i = 1; i <= 4; i++) {
            introChoice[i].visible = false;     
            introbutton[i].visible = false;
        }   
        introDirPosQuestionText[0].visible = false;    
        introDirPosCar[0].visible = false
        introDirPosCarTime[0].visible = false;
        container.parent.removeChild(introDirPosCarTime[0]);
        setTimeout(carDisplay, 500)
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
    cancelCarParkIntroPromptSchedulers();
    carParkIntroPromptActive = false;

    if (shouldUseCarParkIntroTextPrompt()) {
        runWhenCarParkPromptReady(function () {
            if (typeof clearCarParkPromptAnchorOverride === "function") {
                clearCarParkPromptAnchorOverride();
            }

            if (typeof hideCarParkPrompt === "function") {
                hideCarParkPrompt();
            }
        });
    }

    if (introTitle) {
        introTitle.visible = false;
        container.parent.removeChild(introTitle)
    }
    
    IntroBackground.visible = false;
    container.parent.removeChild(IntroBackground)
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false

    container.parent.removeChild(introQuescar)
    introQuescar.visible = false
    container.parent.removeChild(introcolor)
    introcolor.visible = false
    container.parent.removeChild(introQuestionText)
    introQuestionText.visible = false

    for (i = 0; i < 2; i++) {
        ///////////////////Images /////////////////////////
        container.parent.removeChild(introDirPosCar[i])
        introDirPosCar[i].visible = false
        container.parent.removeChild(introDirPosQuestionText[i])
        introDirPosQuestionText[i].visible = false;
          container.parent.removeChild(introDirPosArrow[i])
         introDirPosArrow[i].visible = false;
            container.parent.removeChild(introDirPosTrack[i])
        introDirPosTrack[i].visible = false;
        //////////////////Movie Clip to false/////////////////////
        container.parent.removeChild(introquesArr[i]);
        container.parent.removeChild(introDirPosCarTime[i]);
        introquesArr[i].visible = false;
        container.parent.removeChild(introDirPosArrowTime[i]);
        ///////////////////////////////////////////
     

    }

    for (i = 1; i <= 4; i++) {

        container.parent.removeChild(introChoice[i])
        introChoice[i].visible = false;
    }


    for (i = 1; i <= 4; i++) {
        container.parent.removeChild(introbutton[i]);
        introbutton[i].visible = false;
    }
    ////////////////////////////////////////////////

    container.parent.removeChild(introColorTime);
    container.parent.removeChild(ChoiceTime);

    ///////////////////////////////////////////////////
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