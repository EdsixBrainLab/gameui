//////////////////////////////////////////////////////////////////======LOADER=======///////////////////////////////////////////////////////////////////////
var wrongSnd, gameOverSnd, timeOverSnd, correctSnd, BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var scoreImgMc, ResponseImgMc, questionImgMc, AttemptsImgMc, CorrectImgMc;
var intChkVar = -1
var gamename = "gname=" + getJSName;
//var introStartCnt = -1;
var titleName;
// var TitleBtn, TitleBtn1, TitleBtn2, TitleBtn3, TitleBtn4;
var TitleContaier;
var extradot = "";

//var introStartCnt = -1;
var TotalAssetsCnt = 33
var betweenChars = ' '; // a space
var volumeBtn1, QuesCntMc1, fullScreenBtn1, closeBtn1, QuesCntMc2;
var hudContainer,
    hudBackgroundShape,
    hudHighlightShape,
    scoreCardContainer,
    timerCardContainer,
    hudQuestionCardContainer,

    controlContainer,
    volumeBtnWrapper,
    fullScreenBtnWrapper,
    closeBtnWrapper,
    questionProgressBarBg,
    questionProgressBarFill;

var HowToPlayScreenImg,
    howToPlayImageMc,
    loadProgressPercentLabel;
var lastDisplayedScore = null,
    lastDisplayedTime = null,
    lastDisplayedQuestion = null;

var HUD_CARD_WIDTH = 50;
var HUD_CARD_HEIGHT = 50;
var HUD_CARD_CORNER_RADIUS = 20;
var HUD_CARD_ACCENT_WIDTH = 140;
var HUD_CARD_SPACING = 590;
var QUESTION_PROGRESS_WIDTH = 80;
var activeHudThemeMode = null;
var cachedHudThemeConfig = null;
var HUD_THEME_PRESETS = {
    dark: {
        cards: {
            score: {
                background: ["rgba(248,251,255,0.96)", "rgba(213,231,255,0.96)"],
                accent: ["rgba(142,196,255,0.75)", "rgba(142,196,255,0.35)"],
                iconStyle: {
                    //fill: "#30578F",
					fill: "#FFD166",
                    strokeColor: "rgba(255,255,255,0.65)",
                    strokeWidth: 2
                }
            },
            question: {
                background: ["rgba(244,250,255,0.96)", "rgba(214,236,255,0.96)"],
                accent: ["rgba(129,209,255,0.65)", "rgba(129,209,255,0.3)"],
                iconStyle: {fill: "#1F6F5A",
                    strokeColor: "#2F6CB7",
                    strokeWidth: 3
                }
            },
            timer: {
                background: ["rgba(245,255,250,0.96)", "rgba(220,246,236,0.96)"],
                accent: ["rgba(110,231,183,0.65)", "rgba(110,231,183,0.3)"],
                iconStyle: {
                    
                    strokeColor: "#1F6F5A",
                    strokeWidth: 3
                }
            }
        },
        cardBackgroundAlpha: 1,
        cardAccentAlpha: 0.9,
        cardHighlight: {
            colors: ["rgba(255,255,255,0.92)", "rgba(255,255,255,0)"],
            alpha: 0.35
        },
        textStyles: {
            label: {
                color: "#2D517C",
                shadow: { color: "rgba(255,255,255,0.6)", x: 0, y: 2, blur: 4 }
            },
            value: {
                color: "#133559",
                shadow: { color: "rgba(255,255,255,0.55)", x: 0, y: 3, blur: 8 }
            },
            timerValue: {
                color: "#214874",
                shadow: { color: "rgba(255,255,255,0.5)", x: 0, y: 3, blur: 8 }
            }
        },
        questionProgress: {
            background: "rgba(32,71,115,0.18)",
            fill: ["#2f7ceb", "#3dd88c"]
        },
        controlBackground: {
            colors: ["rgba(234,244,255,0.9)", "rgba(210,229,255,0.9)"],
            alpha: 0.95
        },
        controlPalette: {
            volume: { primary: "rgba(76,143,233,0.9)", glow: "rgba(76,143,233,0.55)" },
            fullscreen: { primary: "rgba(133,111,240,0.9)", glow: "rgba(133,111,240,0.55)" },
            close: { primary: "rgba(238,87,102,0.92)", glow: "rgba(238,87,102,0.6)" }
        },
        iconWrapper: {
            ringColor: "rgba(49,95,160,0.55)",
            ringAlpha: 0.65,
            hoverRingAlpha: 0.92,
            glowAlpha: 0.45,
            hoverGlowAlpha: 0.65,
            backgroundGradient: ["rgba(255,255,255,0.95)", "rgba(226,239,255,0.95)"]
        },
        timerCritical: {
            warning: {
                background: ["rgba(255,228,173,0.96)", "rgba(255,200,118,0.96)"],
                accent: ["rgba(255,187,92,0.65)", "rgba(255,187,92,0.28)"],
                icon: "#BA4B2F",
                text: "#9C3C20"
            },
            danger: {
                background: ["rgba(255,212,212,0.96)", "rgba(254,153,153,0.96)"],
                accent: ["rgba(253,116,116,0.65)", "rgba(253,116,116,0.28)"],
                icon: "#B42332",
                text: "#881421"
            },
            normalIcon: "#2F6CB7",
            normalText: "#214874"
        }
    },
    light: {
        cards: {
            score: {
                background: ["rgba(24,41,74,0.94)", "rgba(36,67,118,0.94)"],
                accent: ["rgba(74,126,213,0.6)", "rgba(74,126,213,0.25)"],
                iconStyle: {
                    fill: "#FFD166",
                    strokeColor: "rgba(8,22,45,0.5)",
                    strokeWidth: 2
                }
            },
            question: {
                background: ["rgba(22,45,83,0.94)", "rgba(33,70,120,0.94)"],
                accent: ["rgba(104,181,255,0.55)", "rgba(104,181,255,0.22)"],
                iconStyle: {fill: "#6EE7B7",
                    strokeColor: "#8CD0FF",
                    strokeWidth: 3
                }
            },
            timer: {
                background: ["rgba(19,58,52,0.94)", "rgba(33,95,88,0.94)"],
                accent: ["rgba(95,234,212,0.55)", "rgba(95,234,212,0.22)"],
                iconStyle: {
                    
                    strokeColor: "rgba(7,28,26,1)",
                    strokeWidth: 3
                }
            }
        },
        cardBackgroundAlpha: 0.96,
        cardAccentAlpha: 0.92,
        cardHighlight: {
            colors: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0)"],
            alpha: 0.2
        },
        textStyles: {
            label: {
                color: "#D6E6FF",
                shadow: { color: "rgba(4,14,32,0.8)", x: 0, y: 2, blur: 8 }
            },
            value: {
                color: "#FFFFFF",
                shadow: { color: "rgba(4,14,32,0.65)", x: 0, y: 4, blur: 14 }
            },
            timerValue: {
                color: "#F6FBFF",
                shadow: { color: "rgba(4,14,32,0.7)", x: 0, y: 4, blur: 16 }
            }
        },
        questionProgress: {
            background: "rgba(7,19,40,0.42)",
            fill: ["#34d399", "#60a5fa"]
        },
        controlBackground: {
            colors: ["rgba(10,25,54,0.75)", "rgba(15,34,70,0.55)"],
            alpha: 0.85
        },
        controlPalette: {
            volume: { primary: "rgba(102,185,255,0.85)", glow: "rgba(102,185,255,0.45)" },
            fullscreen: { primary: "rgba(158,108,237,0.85)", glow: "rgba(158,108,237,0.45)" },
            close: { primary: "rgba(255,138,128,0.9)", glow: "rgba(255,138,128,0.5)" }
        },
        iconWrapper: {
            ringColor: "rgba(197,219,255,0.65)",
            ringAlpha: 0.75,
            hoverRingAlpha: 0.95,
            glowAlpha: 0.55,
            hoverGlowAlpha: 0.75,
            backgroundGradient: ["rgba(26,46,79,0.9)", "rgba(41,73,122,0.85)"]
        },
        timerCritical: {
            warning: {
                background: ["rgba(255,159,67,0.92)", "rgba(215,118,23,0.92)"],
                accent: ["rgba(255,198,124,0.45)", "rgba(255,198,124,0.15)"],
                icon: "#FFE082",
                text: "#FFF3E0"
            },
            danger: {
                background: ["rgba(153,27,39,0.92)", "rgba(220,38,38,0.92)"],
                accent: ["rgba(248,113,113,0.45)", "rgba(248,113,113,0.18)"],
                icon: "#FFD1DC",
                text: "#FFE4E6"
            },
            normalIcon: "#66B9FF",
            normalText: "#F6FBFF"
        }
    }
};

function cloneArray(source) {
    return source && source.slice ? source.slice() : source;
}

function resolveHudThemeMode() {
    var scopes = [];

    if (typeof window !== "undefined") {
        scopes.push(window);
    }

    if (typeof globalThis !== "undefined") {
        scopes.push(globalThis);
    }

    for (var i = 0; i < scopes.length; i++) {
        var scope = scopes[i];
        if (!scope) {
            continue;
        }

        if (typeof scope.headerPanelThemeMode !== "undefined") {
            return String(scope.headerPanelThemeMode).toLowerCase();
        }

        if (typeof scope.hudThemeMode !== "undefined") {
            return String(scope.hudThemeMode).toLowerCase();
        }

        if (typeof scope.headerPanelTheme !== "undefined") {
            return String(scope.headerPanelTheme).toLowerCase();
        }
    }

    if (typeof headerPanelThemeMode !== "undefined") {
        return String(headerPanelThemeMode).toLowerCase();
    }

    if (typeof hudThemeMode !== "undefined") {
        return String(hudThemeMode).toLowerCase();
    }

    if (typeof headerPanelTheme !== "undefined") {
        return String(headerPanelTheme).toLowerCase();
    }

    return "dark";
}

function getHudThemeConfig() {
    var mode = resolveHudThemeMode();
    if (!HUD_THEME_PRESETS[mode]) {
        mode = "dark";
    }
    if (cachedHudThemeConfig && activeHudThemeMode === mode) {
        return cachedHudThemeConfig;
    }

    activeHudThemeMode = mode;
    cachedHudThemeConfig = HUD_THEME_PRESETS[mode];

    return cachedHudThemeConfig;
}

function applyTextStyle(target, style) {
    if (!target || !style) {
        return;
    }

    if (typeof style.color !== "undefined") {
        target.color = style.color;
    }

    if (style.shadow) {
        target.shadow = new createjs.Shadow(
            style.shadow.color || "rgba(0,0,0,0)",
            style.shadow.x || 0,
            style.shadow.y || 0,
            style.shadow.blur || 0
        );
    } else {
        target.shadow = null;
    }
}

function updateHudIconWrapper(wrapper, paletteConfig, theme) {
    if (!wrapper) {
        return;
    }

    var wrapperTheme = theme.iconWrapper || {};
    var primary = paletteConfig && paletteConfig.primary ? paletteConfig.primary : (wrapperTheme.defaultPrimary || "rgba(120,144,255,0.75)");
    var glowColor = paletteConfig && paletteConfig.glow ? paletteConfig.glow : primary;
    var gradientColors = wrapperTheme.backgroundGradient ? cloneArray(wrapperTheme.backgroundGradient) : [primary, "rgba(255,255,255,0.08)"];

    if (wrapper.glow) {
        wrapper.glow.graphics
            .clear()
            .beginRadialGradientFill([glowColor, "rgba(255,255,255,0)"] , [0, 1], 0, 0, 0, 0, 0, 34)
            .drawCircle(0, 0, 18);

        var glowAlpha = typeof wrapperTheme.glowAlpha === "number" ? wrapperTheme.glowAlpha : 0.45;
        var hoverGlowAlpha = typeof wrapperTheme.hoverGlowAlpha === "number" ? wrapperTheme.hoverGlowAlpha : glowAlpha + 0.2;
        wrapper.glow.alpha = glowAlpha;
        wrapper.glow.baseAlpha = glowAlpha;
        wrapper.glow.hoverAlpha = hoverGlowAlpha;
    }

    if (wrapper.background) {
        wrapper.background.graphics
            .clear()
            .beginLinearGradientFill(gradientColors, [0, 1], -28, -28, 28, 28)
            .drawCircle(0, 0, 12);
    }

    if (wrapper.ring) {
        var ringColor = wrapperTheme.ringColor || "rgba(255,255,255,0.5)";
        var ringAlpha = typeof wrapperTheme.ringAlpha === "number" ? wrapperTheme.ringAlpha : 0.6;
        var hoverRingAlpha = typeof wrapperTheme.hoverRingAlpha === "number" ? wrapperTheme.hoverRingAlpha : 0.9;

        wrapper.ring.graphics
            .clear()
            .setStrokeStyle(2)
            .beginStroke(ringColor)
            .drawCircle(0, 0, 12);

        wrapper.ring.alpha = ringAlpha;
        wrapper.ring.baseAlpha = ringAlpha;
        wrapper.ring.hoverAlpha = hoverRingAlpha;
    }
}

function applyHudThemeToCard(card, type, theme) {
    if (!card) {
        return;
    }

    var cardsTheme = theme.cards || {};
    var cardTheme = cardsTheme[type] || cardsTheme.score || {};

    var gradient = cloneArray(cardTheme.background || card.baseGradient || []);
    var accent = cloneArray(cardTheme.accent || card.baseAccent || []);
    var highlightConfig = theme.cardHighlight || {};
    var highlightColors = cloneArray((highlightConfig && highlightConfig.colors) || ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"]);

    var cardWidth = card.__cardWidth || HUD_CARD_WIDTH;
    var cardHeight = card.__cardHeight || HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = card.__cornerRadius || HUD_CARD_CORNER_RADIUS;
    var accentWidth = card.__accentWidth || HUD_CARD_ACCENT_WIDTH;

    if (card.background) {
        card.background.graphics
            .clear()
            .beginLinearGradientFill((gradient && gradient.length ? gradient : card.baseGradient || []), [0, 1], -halfWidth, 0, halfWidth, 0)
            .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

        var backgroundAlpha = typeof cardTheme.backgroundAlpha === "number" ? cardTheme.backgroundAlpha : theme.cardBackgroundAlpha;
        card.background.alpha = typeof backgroundAlpha === "number" ? backgroundAlpha : card.background.alpha;
    }

    if (card.iconAccent) {
        card.iconAccent.graphics
            .clear()
            .beginLinearGradientFill((accent && accent.length ? accent : gradient), [0, 1], -halfWidth, -halfHeight, -halfWidth + accentWidth, halfHeight)
            .drawRoundRect(-halfWidth, -halfHeight, accentWidth, cardHeight, cornerRadius);

        var accentAlpha = typeof cardTheme.accentAlpha === "number" ? cardTheme.accentAlpha : theme.cardAccentAlpha;
        card.iconAccent.alpha = typeof accentAlpha === "number" ? accentAlpha : card.iconAccent.alpha;
    }

    if (card.highlight) {
        card.highlight.graphics
            .clear()
            .beginLinearGradientFill((highlightColors && highlightColors.length ? highlightColors : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"]), [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
            .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

        var highlightAlpha = typeof cardTheme.highlightAlpha === "number" ? cardTheme.highlightAlpha : highlightConfig.alpha;
        card.highlight.alpha = typeof highlightAlpha === "number" ? highlightAlpha : card.highlight.alpha;
    }

    if (card.icon) {
        var iconStyle = mergeIconStyle(cardTheme.iconStyle || {}, null);
        card.baseIconStyle = mergeIconStyle(cardTheme.iconStyle || {}, null);
        drawHudIcon(card.icon, type, iconStyle);
    }

    if (card.label) {
        var labelStyle = theme.textStyles ? theme.textStyles.label : null;
        if (labelStyle && typeof labelStyle.color !== "undefined") {
            card.label.color = labelStyle.color;
        }
        applyTextStyle(card.label, labelStyle || {});
    }

    card.baseGradient = cloneArray(gradient);
    card.baseAccent = cloneArray(accent);
}

function applyHudThemeToQuestionProgress(theme) {
    if (!questionProgressBarBg || !questionProgressBarFill) {
        return;
    }

    var progressTheme = theme.questionProgress || {};
    var progressFillColors = (progressTheme.fill && progressTheme.fill.length) ? progressTheme.fill : ["#34d399", "#60a5fa"];
    var fillScale = questionProgressBarFill.scaleX;

    questionProgressBarBg.graphics
        .clear()
        .beginFill(progressTheme.background || "rgba(255,255,255,0.14)")
        .drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);

    questionProgressBarFill.graphics
        .clear()
        .beginLinearGradientFill(progressFillColors, [0, 1], 0, 0, QUESTION_PROGRESS_WIDTH, 0)
        .drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);

    questionProgressBarFill.scaleX = typeof fillScale === "number" ? fillScale : questionProgressBarFill.scaleX;
}

function applyHudThemeToControls(theme) {
    if (!controlContainer) {
        return;
    }

    var controlTheme = theme.controlBackground || {};
    var controlPalette = theme.controlPalette || {};

    if (controlContainer.backgroundShape) {
        var controlBg = controlContainer.backgroundShape;
        var controlWidth = controlBg.__width || 120;
        var controlHeight = controlBg.__height || 53;
        var controlRadius = controlBg.__radius || 24;
        var bgColors = (controlTheme.colors && controlTheme.colors.length) ? controlTheme.colors : ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"];

        controlBg.graphics
            .clear()
            .beginLinearGradientFill(bgColors, [0, 1], -controlWidth / 2, -controlHeight / 2, controlWidth / 2, controlHeight / 2)
            .drawRoundRect(-controlWidth / 2, -controlHeight / 2, controlWidth, controlHeight, controlRadius);

        controlBg.alpha = typeof controlTheme.alpha === "number" ? controlTheme.alpha : controlBg.alpha;
    }

    updateHudIconWrapper(controlContainer.volumeWrapper, controlPalette.volume || {}, theme);
    updateHudIconWrapper(controlContainer.fullscreenWrapper, controlPalette.fullscreen || {}, theme);
    updateHudIconWrapper(controlContainer.closeWrapper, controlPalette.close || {}, theme);
}

function applyHudThemeToTexts(theme) {
    if (!theme || !theme.textStyles) {
        return;
    }

    var textStyles = theme.textStyles;

    if (gameScoreTxt) {
        var valueStyle = textStyles.value || {};
        if (typeof valueStyle.color !== "undefined") {
            gameScoreTxt.color = valueStyle.color;
        }
        applyTextStyle(gameScoreTxt, valueStyle);
        gameScoreTxt.__baseColor = gameScoreTxt.color;
        gameScoreTxt.__baseShadow = gameScoreTxt.shadow;
    }

    if (gameQCntTxt) {
        var questionStyle = textStyles.value || {};
        if (typeof questionStyle.color !== "undefined") {
            gameQCntTxt.color = questionStyle.color;
        }
        applyTextStyle(gameQCntTxt, questionStyle);
        gameQCntTxt.__baseColor = gameQCntTxt.color;
        gameQCntTxt.__baseShadow = gameQCntTxt.shadow;
    }

    if (gameTimerTxt) {
        var timerStyle = textStyles.timerValue || textStyles.value || {};
        if (typeof timerStyle.color !== "undefined") {
            gameTimerTxt.color = timerStyle.color;
        }
        applyTextStyle(gameTimerTxt, timerStyle);
        gameTimerTxt.__baseColor = gameTimerTxt.color;
        gameTimerTxt.__baseShadow = gameTimerTxt.shadow;
    }
}

function applyHudThemeToHud() {
    var theme = getHudThemeConfig();
    if (!theme) {
        return;
    }

    applyHudThemeToCard(scoreCardContainer, "score", theme);
    applyHudThemeToCard(timerCardContainer, "timer", theme);
    applyHudThemeToCard(hudQuestionCardContainer, "question", theme);

    applyHudThemeToTexts(theme);
    applyHudThemeToQuestionProgress(theme);
    applyHudThemeToControls(theme);

    if (typeof setTimerCriticalState === "function" && timerCardContainer) {
        setTimerCriticalState(!!timerCardContainer.__isCritical);
    }

    if (stage) {
        stage.update();
    }
}

function resetHudThemeCache() {
    cachedHudThemeConfig = null;
    activeHudThemeMode = null;
}

function refreshHudTheme() {
    resetHudThemeCache();
    applyHudThemeToHud();
}

function setHudThemeMode(mode) {
    if (typeof mode !== "string") {
        return;
    }

    var normalized = mode.toLowerCase();
    if (!HUD_THEME_PRESETS[normalized]) {
        normalized = "dark";
    }

    if (typeof headerPanelThemeMode !== "undefined") {
        headerPanelThemeMode = normalized;
    }

    if (typeof window !== "undefined") {
        window.headerPanelThemeMode = normalized;
    }

    if (typeof globalThis !== "undefined") {
        globalThis.headerPanelThemeMode = normalized;
    }

    resetHudThemeCache();
    applyHudThemeToHud();
}

if (typeof window !== "undefined") {
    window.setHudThemeMode = setHudThemeMode;
    window.refreshHudTheme = refreshHudTheme;
}

if (typeof globalThis !== "undefined") {
    globalThis.setHudThemeMode = setHudThemeMode;
    globalThis.refreshHudTheme = refreshHudTheme;
}

function mergeIconStyle(base, override) {
    var result = {};

    if (base) {
        if (typeof base.fill !== "undefined") {
            result.fill = base.fill;
        }
        if (typeof base.strokeColor !== "undefined") {
            result.strokeColor = base.strokeColor;
        }
        if (typeof base.strokeWidth !== "undefined") {
            result.strokeWidth = base.strokeWidth;
        }
    }

    if (override) {
        if (typeof override === "string") {
            result.fill = override;
            result.strokeColor = override;
        } else {
            if (typeof override.fill !== "undefined") {
                result.fill = override.fill;
            }
            if (typeof override.strokeColor !== "undefined") {
                result.strokeColor = override.strokeColor;
            }
            if (typeof override.strokeWidth !== "undefined") {
                result.strokeWidth = override.strokeWidth;
            }
        }
    }

    return result;
}

function formatTimerValue(totalSeconds) {
    totalSeconds = Math.max(0, parseInt(totalSeconds, 10) || 0);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
   // return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	return totalSeconds;
}


if (typeof window !== "undefined") {
    window.formatTimerValue = formatTimerValue;
}






function createLoader() {

    loaderWidth = 600;

    if (!HowToPlayScreenImg) {
        HowToPlayScreenImg = buildHowToPlayOverlay();
    }

    loaderBar = HowToPlayScreenImg;
    bar = HowToPlayScreenImg && HowToPlayScreenImg.progressFill ? HowToPlayScreenImg.progressFill : null;
    loadProgressLabel = HowToPlayScreenImg && HowToPlayScreenImg.progressLabel ? HowToPlayScreenImg.progressLabel : null;
    loadProgressPercentLabel = HowToPlayScreenImg && HowToPlayScreenImg.progressPercent ? HowToPlayScreenImg.progressPercent : null;

    if (loaderBar) {
        loaderBar.visible = true;
        if (!loaderBar.parent) {
            stage.addChild(loaderBar);
        } else {
            stage.setChildIndex(loaderBar, stage.numChildren - 1);
        }
    }

    prepareHowToPlayOverlayForLoading(HowToPlayScreenImg);
    hideLoaderProceedButton();

    stage.update();



}


//////////////////////////////////////////////////////////////////======DEFAULT MANIFEST ASSETS=======////////////////////////////////////////////////////////



function createManifest() {

    var VarTitle = GameNameWithLvl + "-Title.png";

    /* Always specify the following terms as given  

         1. redirecturl.json path as "redirectJsonPath"

         2. Intro text image name as "IntroScreen.png""

    */
    manifest = [
        ////////////////////===PARROT IMAGES====////////////////

        { id: "correctImg", src: assetsPathLang + "wow.png" },
        { id: "wrongImg", src: assetsPathLang + "oops.png" },
        { id: "gameOverImg", src: assetsPathLang + "gameover.png" },
        { id: "timeOverImg", src: assetsPathLang + "timeover.png" },
        { id: "questionOverImg", src: assetsPathLang + "questionover.png" },
        //////////////////====AUDIO=====//////////////////////// //4

        { id: "begin", src: assetsPathLang + "bg_snd.ogg" },
        { id: "correct", src: assetsPathLang + "wow_s.ogg" },
        { id: "wrong", src: assetsPathLang + "oops_s.ogg" },
        { id: "gameOver", src: assetsPathLang + "Game_over.ogg" },
        { id: "timeOver", src: assetsPathLang + "timeover_s.ogg" },
        { id: "tick", src: assetsPathLang + "TickSound.ogg" },


        /////////////////////===RESULT===///////////////////// 10

        { id: "resultLoading", src: assetsPathLang + "ResultLoading.jpg" },
        { id: "domainPath", src: redirectJsonPath + "redirecturl_org.json" },
        ///////////////////====OTHERS====///////////////////// 12


        /////////////////=====COMMON GAME ASSETS=====/////////////////14

        //common game assets

        { id: "uniquebackGround", src: gameAssetsPath + "/Background.png" },
        { id: "Title", src: "commonTitle/" + VarTitle },
        ///////////////////////////////////////////////////////////////20
        { id: "Grid", src: assetsPath + "Grid.png" },
        { id: "arrow1", src: assetsPath + "Arrow1.png" },
        { id: "fingure", src: assetsPath + "Fingure.png" },
        { id: "handCursor", src: assetsPath + "handCursor.png" },
        { id: "SkipBtn", src: assetsPathLang + "SkipBtn.png" },
        { id: "HowToPlayScreen", src: assetsPathLang + "HowToPlayScreen.png" },

        { id: "scoreImgMc", src: assetsPath + "Score.png" },
        { id: "ResponseImgMc", src: assetsPath + "ResponseTime.png" },
        { id: "questionImgMc", src: assetsPath + "questionImg.png" },
        { id: "AttemptsImgMc", src: assetsPath + "Attempts.png" },
        { id: "CorrectImgMc", src: assetsPath + "Correct.png" },
        { id: "closeBtn", src: assetsPath + "closeBtn.png" },
        { id: "closeBtnFinal", src: assetsPath + "closeBtn.png" },
        { id: "nxtBtnFinal", src: assetsPath + "nxtBtn.png" },


        { id: "volumeBtn", src: assetsPath + "volumeBtn.png" },
        { id: "QuesCntMc", src: assetsPath + "QuesCntMc.png" },
        { id: "fullScreenBtn", src: assetsPath + "fullscreenBtn.png" },
        ////////////////////////////////////////////////////////////////////39
        { id: "GameFinishedImg", src: assetsPath + "GameFinished.png" },

        ////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////

    ];

    return 1;

}



//////////////////////////////////////////////////////////////////======PRELOADING OF ASSETS=======///////////////////////////////////////////////////////////



function preloadAllAssets() {

    createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);

    if (!createjs.Sound.initializeDefaultPlugins()) { return; }



    createjs.Sound.alternateExtensions = ["mp3"];

    createjs.WebAudioPlugin.playEmptySound();

    preload = new createjs.LoadQueue(true);

    preload.installPlugin(createjs.Sound);

    preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed

    preload.addEventListener("fileload", fileLoaded);

    preload.addEventListener("progress", updateLoading);

    preload.loadManifest(manifest);

    stage.update();

}



function updateLoading(event) {

    var progressRatio = Math.max(0, Math.min(1, (event && event.loaded) || 0));
    if (bar) {
        createjs.Tween.get(bar, { override: true })
            .to({ scaleX: progressRatio }, 280, createjs.Ease.quadOut);
        bar.scaleX = progressRatio;
    }

    progresPrecentage = Math.round(progressRatio * 100);

    if (loadProgressPercentLabel) {
        loadProgressPercentLabel.text = progresPrecentage + "%";
    }

    if (HowToPlayScreenImg && HowToPlayScreenImg.proceedButton) {
        if (progresPrecentage < 100) {
            hideLoaderProceedButton();
        }
    }

    if (progressRatio >= 1) {
        hideHowToPlayProgressBar();
    }

    if (!loadProgressLabel) {
        stage.update();
        return;
    }

    if (assetsPathLang == "assets/VietnamAssets/") {
        loadProgressLabel.lineWidth = 540;
        loadProgressLabel.text = progresPrecentage + "% Đang tải trò chơi...";

    } else if (assetsPathLang == "assets/TamilAssets/") {
        loadProgressLabel.text = progresPrecentage + "% ஆட்டம் தயாராகிக் கொண்டிருக்கிறது...";
        loadProgressLabel.lineWidth = 540;
        loadProgressLabel.font = "bold 23px Segoe UI";
    } else if (assetsPathLang == "assets/GujaratiAssets/") {
        loadProgressLabel.lineWidth = 540;
        loadProgressLabel.text = progresPrecentage + "% ગેમ લોડ થાય છે...";

    } else if (assetsPathLang == "assets/HindiAssets/") {
        loadProgressLabel.lineWidth = 540;
        loadProgressLabel.text = progresPrecentage + "%खेल लोड हो रहा है...";
        loadProgressLabel.font = "bold 23px Segoe UI";

    } else {
        loadProgressLabel.lineWidth = 432;

        if (progresPrecentage >= 0 && progresPrecentage <= 25) {
            loadProgressLabel.text = "Collecting game assets" + extradot;

        }
        else if (progresPrecentage > 25 && progresPrecentage <= 50) {
            loadProgressLabel.text = "Uploading core files" + extradot;
        }
        else if (progresPrecentage > 50 && progresPrecentage <= 75) {
            loadProgressLabel.text = "Uploading animations" + extradot;

        }
        else if (progresPrecentage > 75 && progresPrecentage < 100) {
            loadProgressLabel.text = "Finalising setup" + extradot;

        } else {
            loadProgressLabel.text = "Ready to start";
        }
        if (extradot == "") {
            extradot = ".";
        }
        else if (extradot == "...") {
            extradot = ".";
        }
        else {
            extradot = extradot + ".";
        }
    }


    stage.update();

}







function fileLoaded(e) {

    assets.push(e);
}



function doneLoading(event) {
    if (bar) {
        createjs.Tween.get(bar, { override: true }).to({ scaleX: 1 }, 200, createjs.Ease.quadOut);
    }
    if (loadProgressPercentLabel) {
        loadProgressPercentLabel.text = "100%";
    }
    if (loadProgressLabel && assetsPathLang != "assets/VietnamAssets/" && assetsPathLang != "assets/TamilAssets/" && assetsPathLang != "assets/GujaratiAssets/" && assetsPathLang != "assets/HindiAssets/") {
        loadProgressLabel.text = "Ready to start";
    }
    if (loaderBar) {
        loaderBar.visible = true;
        if (loaderBar.parent) {
            loaderBar.parent.setChildIndex(loaderBar, loaderBar.parent.numChildren - 1);
        }
    }
    hideHowToPlayProgressBar();
    showLoaderProceedButton();
    stage.update();
    var len = assets.length;
    for (i = 0; i < len; i++) {
        //   if (i < 24) { with parrot
        if (i < TotalAssetsCnt) {

            var event = assets[i];

            var id = event.item.id;

            console.log(id)

            if (id == "Grid") {
                Grid = new createjs.Bitmap(preload.getResult('Grid'));
                container.parent.addChild(Grid);
                Grid.visible = false;
                continue;
            }

            if (id == "closeBtn") {
                closeBtn = new createjs.Bitmap(preload.getResult('closeBtn'));
                container.parent.addChild(closeBtn);
                closeBtn.x = 1215
                closeBtn.y = 40
                closeBtn.visible = false;
                continue;
            }


            if (id == "closeBtnFinal") {
                closeBtnFinal = new createjs.Bitmap(preload.getResult('closeBtnFinal'));
                container.parent.addChild(closeBtnFinal);
                closeBtnFinal.visible = false;
                closeBtnFinal.x = 1215
                closeBtnFinal.y = 10
                continue;
            }
            if (id == "nxtBtnFinal") {
                nxtBtnFinal = new createjs.Bitmap(preload.getResult('nxtBtnFinal'));
                container.parent.addChild(nxtBtnFinal);
                nxtBtnFinal.visible = false;
                nxtBtnFinal.x = 1050;
                nxtBtnFinal.y = 100
                continue;
            }


            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (id == "QuesCntMc") {
                QuesCntMc = new createjs.Bitmap(preload.getResult('QuesCntMc'));
                container.parent.addChild(QuesCntMc);
                QuesCntMc.y = QuesCntMc.y + 0
                QuesCntMc.visible = false;
                continue;
            }

            if (id == "fullScreenBtn") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("fullScreenBtn")],
                    "frames": { "regX": 50, "height": 55, "count": 0, "regY": 50, "width": 55 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                fullScreenBtn = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(fullScreenBtn);
                fullScreenBtn.x = 1242;
                fullScreenBtn.y = 160;
                fullScreenBtn.visible = false;
                continue;
            }

            if (id == "volumeBtn") {
                var spriteSheet5 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("volumeBtn")],
                    "frames": { "regX": 50, "height": 44, "count": 0, "regY": 50, "width": 48 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                volumeBtn = new createjs.Sprite(spriteSheet5);
                container.parent.addChild(volumeBtn);
                volumeBtn.x = 1240;
                volumeBtn.y = 72;
                volumeBtn.visible = false;
                continue;

            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (id == "arrow1") {

                arrow1 = new createjs.Bitmap(preload.getResult('arrow1'));
                container.parent.addChild(arrow1);
                arrow1.visible = false;
                continue;
            }
            if (id == "fingure") {

                fingure = new createjs.Bitmap(preload.getResult('fingure'));
                container.parent.addChild(fingure);
                fingure.visible = false;
                continue;
            }
            ///////////////////////////////////////////////////////bg////////////////////////////


            if (runningBg == 1) {
            if (id == "uniquebackGround") {
                uniquebackGround = new createjs.Bitmap(preload.getResult('uniquebackGround'));
                if (typeof ambientLayer !== "undefined" && ambientLayer) {
                    ambientLayer.addChildAt(uniquebackGround, 0);
                } else {
                    container.parent.addChildAt(uniquebackGround, 0);
                }
                uniquebackGround.alpha = 0.35;
                uniquebackGround.visible = false;
                continue;
            }




            } else {

                if (id == "uniquebackGround") {
                    uniquebackGround = new createjs.Bitmap(preload.getResult('uniquebackGround'));
                    if (typeof ambientLayer !== "undefined" && ambientLayer) {
                        ambientLayer.addChildAt(uniquebackGround, 0);
                    } else {
                        container.parent.addChildAt(uniquebackGround, 0);
                    }
                    uniquebackGround.alpha = 1;
                    uniquebackGround.visible = true;
                    continue;
                }



            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////

            if (id == "Title") {
                //Title = new createjs.Bitmap(preload.getResult('Title'));
                Title = new createjs.Text(GameName, "bold 58px 'Baloo 2'", "#b40deb");
				Title.textAlign = "center";		
				Title.x = canvas.width/ 2;
				Title.y = 40;  
				Title.shadow = new createjs.Shadow("red", 1, 1, 1);
                container.parent.addChild(Title);
				
                Title.visible = false;
                continue;
            }



            if (id == "resultLoading") {
                resultLoading = new createjs.Bitmap(preload.getResult('resultLoading'));
                container.parent.addChild(resultLoading);
                resultLoading.visible = false;
                continue;

            }



            if (id == "scoreImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("scoreImgMc")],
                    "frames": { "regX": 50, "height": 306, "count": 0, "regY": 50, "width": 306 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                scoreImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(scoreImgMc);
                scoreImgMc.visible = false;
                continue;
            }
            if (id == "ResponseImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("ResponseImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 281 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                ResponseImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(ResponseImgMc);
                ResponseImgMc.visible = false;
                continue;
            }
            if (id == "questionImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("questionImgMc")],
                    "frames": { "regX": 50, "height": 280, "count": 0, "regY": 50, "width": 282 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                questionImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(questionImgMc);
                questionImgMc.visible = false;
                continue;
            }
            if (id == "AttemptsImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("AttemptsImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 282 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                AttemptsImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(AttemptsImgMc);
                AttemptsImgMc.visible = false;
                continue;
            }
            if (id == "CorrectImgMc") {
                var spriteSheet3 = new createjs.SpriteSheet({
                    framerate: 30,
                    "images": [preload.getResult("CorrectImgMc")],
                    "frames": { "regX": 50, "height": 282, "count": 0, "regY": 50, "width": 281 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                CorrectImgMc = new createjs.Sprite(spriteSheet3);
                container.parent.addChild(CorrectImgMc);
                CorrectImgMc.visible = false;
                continue;
            }

            if (id == "correctImg") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    amerate: 30,
                    "images": [preload.getResult("correctImg")],
                    "frames": { "regX": 50, "height": 465.95, "count": 0, "regY": 50, "width": 245 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                correctImg = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(correctImg);
                correctImg.x = 569;
                correctImg.y = 200;
                correctImg.visible = false;
                continue;
            }

            if (id == "wrongImg") {
                var spriteSheet4 = new createjs.SpriteSheet({
                    amerate: 30,
                    "images": [preload.getResult("wrongImg")],
                    "frames": { "regX": 50, "height": 465.95, "count": 0, "regY": 50, "width": 245 },
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                });
                //
                wrongImg = new createjs.Sprite(spriteSheet4);
                container.parent.addChild(wrongImg);
                wrongImg.x = 569;
                wrongImg.y = 200;
                wrongImg.visible = false;

                continue;
            }
            if (id == "gameOverImg") {
                gameOverImg = new createjs.Bitmap(preload.getResult('gameOverImg'));
                container.parent.addChild(gameOverImg);
                gameOverImg.visible = false;

                continue;
            }
            if (id == "timeOverImg") {
                timeOverImg = new createjs.Bitmap(preload.getResult('timeOverImg'));
                container.parent.addChild(timeOverImg);
                timeOverImg.visible = false;

                continue;
            }
            if (id == "questionOverImg") {
                questionOverImg = new createjs.Bitmap(preload.getResult('questionOverImg'));
                container.parent.addChild(questionOverImg);
                questionOverImg.visible = false;

                continue;
            }


            if (id == "domainPath") {
                var json = preload.getResult("domainPath");
                console.log(json); // true
                url = json.path;
                url1 = json.scoreupdate;
                console.log("check= " + url1)
                url2 = json.get_info;
                nav = json.nav;
                continue;
            }
            if (id == "SkipBtn") {
                SkipBtnMc = createIntroActionButton();
                container.parent.addChild(SkipBtnMc);
                var stageWidth = (typeof canvas !== "undefined" && canvas) ? canvas.width : 1280;
                SkipBtnMc.x = stageWidth - 220;
                SkipBtnMc.y = 74;
                SkipBtnMc.visible = false;

                continue;
            }
            if (id == "handCursor") {
                handCursor = new createjs.Bitmap(preload.getResult('handCursor'));
                container.parent.addChild(handCursor);
                handCursor.visible = false;

                continue;
            }

            if (id == "HowToPlayScreen") {
                howToPlayImageMc = buildGameIntroOverlay();
                container.parent.addChild(howToPlayImageMc);
                howToPlayImageMc.visible = false;
                continue;
            }

            if (id == "GameFinishedImg") {
                GameFinishedImg = new createjs.Bitmap(preload.getResult('GameFinishedImg'));
                container.parent.addChild(GameFinishedImg);
                GameFinishedImg.visible = false;
                continue;
            }

        } else {
            doneLoading1(event)

        }

    }

    volumeBtn = volumeBtn.clone();
    volumeBtn.scaleX = volumeBtn.scaleY = 1;
    volumeBtn.x = 363;
    volumeBtn.y = 87;
    fullScreenBtn = fullScreenBtn.clone();
    fullScreenBtn.x = 1160;
    fullScreenBtn.y = 80;
    fullScreenBtn.scaleX = fullScreenBtn.scaleY = 1.1;
    QuesCntMc = QuesCntMc.clone();
    closeBtn = closeBtn.clone();

    closeBtn.x = 1202;
    closeBtn.y = 30;
    closeBtn.scaleX = closeBtn.scaleY = 1;
    bgSnd = createjs.Sound.play("begin");
    bgSnd.volume = 0;
    correctSnd = createjs.Sound.play("correct");
    correctSnd.volume = 0;
    wrongSnd = createjs.Sound.play("wrong");
    wrongSnd.volume = 0;
    gameOverSnd = createjs.Sound.play("gameOver");
    gameOverSnd.volume = 0;
    timeOverSnd = createjs.Sound.play("timeOver");
    timeOverSnd.volume = 0;

    tickSnd = createjs.Sound.play("tick", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
    tickSnd.volume = 0;

    createjs.Ticker.addEventListener("tick", tick);

    createjs.Touch.enable(stage, true, true)
    watchRestart();

}
function watchRestart() {
    //watch for clicks

    stage.addChild(messageField);


    var hudTheme = getHudThemeConfig();
    var valueTextStyle = hudTheme.textStyles ? hudTheme.textStyles.value : null;
    var timerTextStyle = hudTheme.textStyles ? hudTheme.textStyles.timerValue : null;

    gameScoreTxt = new createjs.Text("0", "700 32px 'Baloo 2'", (valueTextStyle && valueTextStyle.color) || "#FFFFFF");
    gameScoreTxt.textAlign = "left";
    gameScoreTxt.textBaseline = "middle";
    applyTextStyle(gameScoreTxt, valueTextStyle);
    gameScoreTxt.__baseColor = gameScoreTxt.color;
    gameScoreTxt.__baseShadow = gameScoreTxt.shadow;

    gameTimerTxt = new createjs.Text(formatTimerValue(time), "bold 28px 'Digital'", (timerTextStyle && timerTextStyle.color) || "#F6FBFF");
    gameTimerTxt.textAlign = "left";
    gameTimerTxt.textBaseline = "middle";
    applyTextStyle(gameTimerTxt, timerTextStyle);
    gameTimerTxt.__baseColor = gameTimerTxt.color;
    gameTimerTxt.__baseShadow = gameTimerTxt.shadow;

    gameQCntTxt = new createjs.Text("", "700 28px 'Baloo 2'", (valueTextStyle && valueTextStyle.color) || "#FFFFFF");
    gameQCntTxt.textAlign = "left";
    gameQCntTxt.textBaseline = "middle";
    applyTextStyle(gameQCntTxt, valueTextStyle);
    gameQCntTxt.__baseColor = gameQCntTxt.color;
    gameQCntTxt.__baseShadow = gameQCntTxt.shadow;

    gameScoreTxt.scaleX = gameScoreTxt.scaleY = 1;
    gameTimerTxt.scaleX = gameTimerTxt.scaleY = 1;
    gameQCntTxt.scaleX = gameQCntTxt.scaleY = 1;

    buildHudLayout();
    refreshHudValues();

    if (hudContainer) {
        hudContainer.visible = false;
    }

    if (!HowToPlayScreenImg) {
        HowToPlayScreenImg = buildHowToPlayOverlay();
    }

    var overlayParent = container && container.parent ? container.parent : stage;
    if (HowToPlayScreenImg && overlayParent) {
        if (!HowToPlayScreenImg.parent) {
            overlayParent.addChild(HowToPlayScreenImg);
        } else {
            overlayParent.setChildIndex(HowToPlayScreenImg, overlayParent.numChildren - 1);
        }
        HowToPlayScreenImg.visible = true;
    }




    //createjs.Ticker.interval = 25;
   // createjs.Ticker.framerate = 30;

    if (UniqueGameName == "CycleRace") {
        createjs.Ticker.setFPS(10);
    } else {
        createjs.Ticker.setFPS(20);
    }


    if (typeof handCursor !== "undefined" && handCursor) {
        handCursor.visible = false;
        handCursor.removeAllEventListeners();
        if (handCursor.parent) {
            handCursor.parent.removeChild(handCursor);
        }
    }



    stage.update(); //update the stage to show text;



}

function createHudIconWrapper(primaryColor, glowColor) {
    var wrapper = new createjs.Container();
    wrapper.baseScale = 1;
    wrapper.mouseChildren = true;
    wrapper.mouseEnabled = true;

    var theme = getHudThemeConfig();
    var wrapperTheme = theme.iconWrapper || {};

    var resolvedPrimary = primaryColor || (wrapperTheme.defaultPrimary || "rgba(120,144,255,0.75)");
    var gradientColors = wrapperTheme.backgroundGradient ? cloneArray(wrapperTheme.backgroundGradient) : [resolvedPrimary, "rgba(255,255,255,0.08)"];
    var resolvedGlowColor = glowColor || resolvedPrimary;

    var glow = new createjs.Shape();
    glow.graphics.beginRadialGradientFill([resolvedGlowColor, "rgba(255,255,255,0)"] , [0, 1], 0, 0, 0, 0, 0, 34).drawCircle(0, 0, 18);
    var glowAlpha = typeof wrapperTheme.glowAlpha === "number" ? wrapperTheme.glowAlpha : 0.45;
    var hoverGlowAlpha = typeof wrapperTheme.hoverGlowAlpha === "number" ? wrapperTheme.hoverGlowAlpha : glowAlpha + 0.2;
    glow.alpha = glowAlpha;
    glow.baseAlpha = glowAlpha;
    glow.hoverAlpha = hoverGlowAlpha;
    wrapper.addChild(glow);

    var background = new createjs.Shape();
    background.graphics.beginLinearGradientFill(gradientColors, [0, 1], -28, -28, 28, 28).drawCircle(0, 0, 12);
    wrapper.addChild(background);

    var ring = new createjs.Shape();
    var ringColor = wrapperTheme.ringColor || "rgba(255,255,255,0.5)";
    var ringAlpha = typeof wrapperTheme.ringAlpha === "number" ? wrapperTheme.ringAlpha : 0.6;
    var hoverRingAlpha = typeof wrapperTheme.hoverRingAlpha === "number" ? wrapperTheme.hoverRingAlpha : 0.9;
    ring.graphics.setStrokeStyle(2).beginStroke(ringColor).drawCircle(0, 0, 12);
    ring.alpha = ringAlpha;
    ring.baseAlpha = ringAlpha;
    ring.hoverAlpha = hoverRingAlpha;
    wrapper.addChild(ring);

    wrapper.background = background;
    wrapper.glow = glow;
    wrapper.ring = ring;

    return wrapper;
}

function drawHudIcon(iconShape, type, overrideStyle) {
    if (!iconShape) {
        return;
    }

    var theme = getHudThemeConfig();
    var cardsTheme = theme.cards || {};
    var baseCardTheme = cardsTheme[type] || cardsTheme.score || {};
    var iconStyle = mergeIconStyle(baseCardTheme.iconStyle || {}, overrideStyle);

    iconShape.graphics.clear();

    switch (type) {
        case "score":
            var starColor = iconStyle.fill || "#FACC6B";
            iconShape.graphics.beginFill(starColor).drawPolyStar(0, 0, 14, 5, 0.55, -90);
            if (iconStyle.strokeColor) {
                iconShape.graphics.setStrokeStyle(iconStyle.strokeWidth || 2).beginStroke(iconStyle.strokeColor).drawPolyStar(0, 0, 14, 5, 0.55, -90);
            }
            break;
        case "timer":
            var strokeColor = iconStyle.strokeColor || iconStyle.fill || "#66B9FF";
            var strokeWidth = iconStyle.strokeWidth || 3;
            iconShape.graphics.setStrokeStyle(strokeWidth).beginStroke(strokeColor).drawCircle(0, 0, 14);
            iconShape.graphics.setStrokeStyle(strokeWidth).beginStroke(strokeColor).moveTo(0, 0).lineTo(0, -10);
            iconShape.graphics.setStrokeStyle(strokeWidth).beginStroke(strokeColor).moveTo(0, 0).lineTo(9, 4);
            break;
        case "question":
            var fillColor = iconStyle.fill || "#6EE7B7";
            iconShape.graphics.beginFill(fillColor).drawRoundRect(-11, -11, 22, 22, 6);
            if (iconStyle.strokeColor) {
                iconShape.graphics.setStrokeStyle(iconStyle.strokeWidth || 3, "round").beginStroke(iconStyle.strokeColor);
            }
            iconShape.graphics.endStroke();
            break;
    }

    iconShape.__iconStyle = iconStyle;
}

function createHudCard(label, type) {
    var card = new createjs.Container();
    card.baseScale = 1;
    card.type = type;

    var theme = getHudThemeConfig();
    var cardsTheme = theme.cards || {};
    var baseCardTheme = cardsTheme[type] || cardsTheme.score || {};

    var gradient = cloneArray(baseCardTheme.background || []);
    var accent = cloneArray(baseCardTheme.accent || []);
    var highlightConfig = theme.cardHighlight || {};
    var highlightColors = cloneArray(highlightConfig.colors || ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"]);

    var cardWidth = HUD_CARD_WIDTH;
    var cardHeight = HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = HUD_CARD_CORNER_RADIUS;

    var background = new createjs.Shape();
    background.graphics
        .beginLinearGradientFill((gradient && gradient.length ? gradient : ["rgba(21, 45, 86, 0.92)", "rgba(36, 94, 168, 0.92)"]), [0, 1], -halfWidth, 0, halfWidth, 0)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
    var backgroundAlpha = typeof baseCardTheme.backgroundAlpha === "number" ? baseCardTheme.backgroundAlpha : theme.cardBackgroundAlpha;
    background.alpha = typeof backgroundAlpha === "number" ? backgroundAlpha : 0.96;
	
	
	var borderColor = baseCardTheme.borderColor || "#000"; // Customize or use from theme
var borderThickness = .5; // Change thickness as needed

var border = new createjs.Shape();
border.graphics
    .setStrokeStyle(borderThickness)
    .beginStroke(borderColor)
    .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
card.addChild(border); // Add after background so it appears on top (or before to appear behind)


    card.addChild(background);

    var accentShape = new createjs.Shape();
    accentShape.graphics
        .beginLinearGradientFill((accent && accent.length ? accent : gradient), [0, 1], -halfWidth, -halfHeight, -halfWidth + HUD_CARD_ACCENT_WIDTH, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, HUD_CARD_ACCENT_WIDTH, cardHeight, cornerRadius);
    var accentAlpha = typeof baseCardTheme.accentAlpha === "number" ? baseCardTheme.accentAlpha : theme.cardAccentAlpha;
    accentShape.alpha = typeof accentAlpha === "number" ? accentAlpha : 0.9;
	
	

    card.addChild(accentShape);
	
	// ✅ Add border to the accent shape
var accentBorderColor = baseCardTheme.accentBorderColor || "#000"; // Or pick a theme-based color
var accentBorderThickness = .2;

var accentBorder = new createjs.Shape();
accentBorder.graphics
    .setStrokeStyle(accentBorderThickness)
    .beginStroke(accentBorderColor)
    .drawRoundRect(-halfWidth, -halfHeight, HUD_CARD_ACCENT_WIDTH, cardHeight, cornerRadius);
card.addChild(accentBorder);



    var highlight = new createjs.Shape();
    highlight.graphics
        .beginLinearGradientFill((highlightColors && highlightColors.length ? highlightColors : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"]), [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
    var highlightAlpha = typeof highlightConfig.alpha === "number" ? highlightConfig.alpha : 0.24;
    highlight.alpha = highlightAlpha;
    highlight.baseAlpha = highlightAlpha;
    card.addChild(highlight);

    var icon = new createjs.Shape();
    icon.x = -halfWidth + 26;
    icon.y = 0;
    var baseIconStyle = mergeIconStyle(baseCardTheme.iconStyle || {}, null);
    drawHudIcon(icon, type, baseIconStyle);
    card.addChild(icon);
    var effectLayer = new createjs.Container();
    effectLayer.mouseEnabled = false;
    effectLayer.mouseChildren = false;
    effectLayer.name = type + "Effects";
    effectLayer.compositeOperation = "lighter";
    card.addChild(effectLayer);

    var labelStyle = theme.textStyles ? theme.textStyles.label : null;
    var labelColor = (labelStyle && labelStyle.color) || "#C4DBFF";
    var labelText = new createjs.Text(label.toUpperCase(), "600 12px 'Baloo 2'", labelColor);
    labelText.textAlign = "left";
    labelText.x = icon.x + 42;
    labelText.y = -18;
    applyTextStyle(labelText, labelStyle);
    card.addChild(labelText);

    var valueHolder = new createjs.Container();
    valueHolder.x = labelText.x;
    valueHolder.y = 10;
    card.addChild(valueHolder);

    card.background = background;
    card.iconAccent = accentShape;
    card.highlight = highlight;
    card.icon = icon;
    card.label = labelText;
    card.valueHolder = valueHolder;
    card.effectLayer = effectLayer;
    card.baseGradient = cloneArray(gradient && gradient.length ? gradient : ["rgba(21, 45, 86, 0.92)", "rgba(36, 94, 168, 0.92)"]);
    card.baseAccent = cloneArray(accent && accent.length ? accent : card.baseGradient);
    card.baseIconStyle = mergeIconStyle(baseIconStyle, null);
    card.__cardWidth = cardWidth;
    card.__cardHeight = cardHeight;
    card.__cornerRadius = cornerRadius;
    card.__accentWidth = HUD_CARD_ACCENT_WIDTH;

    return card;
}

function buildHudLayout() {
    if (!container || !container.parent) {
        return;
    }

    if (hudContainer && hudContainer.parent) {
        hudContainer.parent.removeChild(hudContainer);
    }

    lastDisplayedScore = null;
    lastDisplayedTime = null;
    lastDisplayedQuestion = null;

    var hudTheme = getHudThemeConfig();

    hudContainer = new createjs.Container();
    hudContainer.x = canvas.width / 2;
    hudContainer.y = 8;
    hudContainer.alpha = 1;
    hudContainer.visible = true;

    scoreCardContainer = createHudCard("Score", "score");
    scoreCardContainer.x = -680;
    scoreCardContainer.baseX = scoreCardContainer.x;
	hudContainer.addChild(scoreCardContainer);

    timerCardContainer = createHudCard("Seconds Left", "timer");
    timerCardContainer.x = -530;
    timerCardContainer.baseX = timerCardContainer.x;
    hudContainer.addChild(timerCardContainer);

    hudQuestionCardContainer = createHudCard("Question", "question");
    hudQuestionCardContainer.x = 280;
    hudQuestionCardContainer.baseX = hudQuestionCardContainer.x;
    hudContainer.addChild(hudQuestionCardContainer);

    if (scoreCardContainer.valueHolder) {
        scoreCardContainer.valueHolder.addChild(gameScoreTxt);
        gameScoreTxt.textAlign = "left";
        gameScoreTxt.x = 0;
        gameScoreTxt.y = -2;
    }

    if (timerCardContainer.valueHolder) {
        timerCardContainer.valueHolder.addChild(gameTimerTxt);
        gameTimerTxt.textAlign = "left";
        gameTimerTxt.x = 0;
        gameTimerTxt.y = -2;
    }

    if (hudQuestionCardContainer.valueHolder) {
        hudQuestionCardContainer.valueHolder.addChild(gameQCntTxt);
        gameQCntTxt.textAlign = "left";
        gameQCntTxt.x = 0;
        gameQCntTxt.y = -2;
    }

    var progressTheme = hudTheme.questionProgress || {};
    var progressBgColor = progressTheme.background || "rgba(255,255,255,0.14)";

    questionProgressBarBg = new createjs.Shape();
    questionProgressBarBg.graphics.beginFill(progressBgColor).drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);
    questionProgressBarBg.x = -HUD_CARD_WIDTH / 2 + 48;
    questionProgressBarBg.y = 22;
    hudQuestionCardContainer.addChild(questionProgressBarBg);

    questionProgressBarFill = new createjs.Shape();
    var progressFillColors = (progressTheme.fill && progressTheme.fill.length) ? progressTheme.fill : ["#34d399", "#60a5fa"];
    questionProgressBarFill.graphics.beginLinearGradientFill(progressFillColors, [0, 1], 0, 0, QUESTION_PROGRESS_WIDTH, 0).drawRoundRect(0, 0, QUESTION_PROGRESS_WIDTH, 8, 4);
    questionProgressBarFill.x = -HUD_CARD_WIDTH / 2 + 48;
    questionProgressBarFill.y = 22;
    questionProgressBarFill.scaleX = 0;
    hudQuestionCardContainer.addChild(questionProgressBarFill);

    controlContainer = new createjs.Container();
    controlContainer.x = 420 + HUD_CARD_WIDTH * 0.85;
    controlContainer.baseX = controlContainer.x;

    var controlBg = new createjs.Shape();
    var controlWidth = 120;
    var controlHeight = 53;
    var controlBackgroundTheme = hudTheme.controlBackground || {};
    var controlColors = (controlBackgroundTheme.colors && controlBackgroundTheme.colors.length) ? controlBackgroundTheme.colors : ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"];
    controlBg.graphics.beginLinearGradientFill(controlColors, [0, 1], -controlWidth / 2, -controlHeight / 2, controlWidth / 2, controlHeight / 2).drawRoundRect(-controlWidth / 2, -controlHeight / 2, controlWidth, controlHeight, 24);
    controlBg.alpha = typeof controlBackgroundTheme.alpha === "number" ? controlBackgroundTheme.alpha : 0.88;
    controlBg.__width = controlWidth;
    controlBg.__height = controlHeight;
    controlBg.__radius = 24;
    controlContainer.addChild(controlBg);
    controlBg.mouseEnabled = false;
    controlContainer.backgroundShape = controlBg;

    var controlPalette = hudTheme.controlPalette || {};
    var volumePalette = controlPalette.volume || {};
    var fullscreenPalette = controlPalette.fullscreen || {};
    var closePalette = controlPalette.close || {};

    volumeBtnWrapper = createHudIconWrapper(volumePalette.primary, volumePalette.glow);
    volumeBtnWrapper.x = -30;
    volumeBtnWrapper.cursor = "pointer";
    controlContainer.addChild(volumeBtnWrapper);
    controlContainer.volumeWrapper = volumeBtnWrapper;

    fullScreenBtnWrapper = createHudIconWrapper(fullscreenPalette.primary, fullscreenPalette.glow);
    fullScreenBtnWrapper.x = 0;
    fullScreenBtnWrapper.cursor = "pointer";
    controlContainer.addChild(fullScreenBtnWrapper);
    controlContainer.fullscreenWrapper = fullScreenBtnWrapper;

    closeBtnWrapper = createHudIconWrapper(closePalette.primary, closePalette.glow);
    closeBtnWrapper.x = 30;
    closeBtnWrapper.cursor = "pointer";
    controlContainer.addChild(closeBtnWrapper);
    controlContainer.closeWrapper = closeBtnWrapper;

    if (volumeBtn) {
        if (volumeBtn.parent) {
            volumeBtn.parent.removeChild(volumeBtn);
        }
        volumeBtn.regX = 25;
        volumeBtn.regY = 25;
        volumeBtn.scaleX = volumeBtn.scaleY = 0.35;
        volumeBtn.x = 18;
        volumeBtn.y = 18;
        volumeBtnWrapper.addChild(volumeBtn);
    }

    if (fullScreenBtn) {
        if (fullScreenBtn.parent) {
            fullScreenBtn.parent.removeChild(fullScreenBtn);
        }
        fullScreenBtn.regX = 27;
        fullScreenBtn.regY = 27;
        fullScreenBtn.scaleX = fullScreenBtn.scaleY = 0.35;
        fullScreenBtn.x = 19;
        fullScreenBtn.y = 18;
        fullScreenBtnWrapper.addChild(fullScreenBtn);
    }

    if (closeBtn) {
        if (closeBtn.parent) {
            closeBtn.parent.removeChild(closeBtn);
        }
        if (closeBtn.image) {
            closeBtn.regX = closeBtn.image.width / 2;
            closeBtn.regY = closeBtn.image.height / 2;
        }
        closeBtn.scaleX = closeBtn.scaleY = 0.33;
        closeBtn.x = 0;
        closeBtn.y = 0;
        closeBtnWrapper.addChild(closeBtn);
    }

    hudContainer.addChild(controlContainer);

    container.parent.addChild(hudContainer);
    //container.parent.setChildIndex(hudContainer, container.parent.getNumChildren() - 1);
    container.parent.setChildIndex(hudContainer, 99999999);

    applyHudThemeToHud();
    setTimerCriticalState(false);
    updateQuestionProgress();

    startHudAmbientAnimations();
}

function refreshHudValues() {
    if (!gameScoreTxt || !gameTimerTxt || !gameQCntTxt) {
        return;
    }

    var currentScore = typeof score !== "undefined" ? score : 0;
    gameScoreTxt.text = String(currentScore);

    if (lastDisplayedScore !== null && currentScore > lastDisplayedScore && (!scoreCardContainer || !scoreCardContainer.__scoreCelebrating)) {
        animateScoreCelebration();
    }
    lastDisplayedScore = currentScore;

    var timerValue = typeof formatTimerValue === "function" ? formatTimerValue(time) : String(parseInt(time, 10) || 0);
    gameTimerTxt.text = timerValue;

    var numericTime = typeof time !== "undefined" ? parseInt(time, 10) || 0 : 0;
    if (lastDisplayedTime !== null && numericTime !== lastDisplayedTime) {
        animateTimerTick();
    }
    lastDisplayedTime = numericTime;

    var total = typeof totalQuestions !== "undefined" ? totalQuestions : 0;
    var currentQuestion = typeof quesCnt !== "undefined" ? quesCnt : 0;
    if (total > 0) {
        currentQuestion = Math.min(Math.max(currentQuestion, 1), total);
    } else {
        currentQuestion = Math.max(currentQuestion, 1);
    }

    gameQCntTxt.text = currentQuestion + "/" + total;

    if (lastDisplayedQuestion !== null && currentQuestion > lastDisplayedQuestion) {
        animateQuestionAdvance();
    }
    lastDisplayedQuestion = currentQuestion;

    if (typeof setTimerCriticalState === "function") {
        setTimerCriticalState(time <= 13);
    }

    updateQuestionProgress();
}

function updateQuestionProgress() {
    if (!questionProgressBarFill) {
        return;
    }

    var answered = typeof answeredQuestions !== "undefined" ? answeredQuestions : 0;
    var currentQuestionIndex = typeof quesCnt !== "undefined" ? quesCnt : answered;
    var total = typeof totalQuestions !== "undefined" ? totalQuestions : 0;
    var completed = Math.max(answered, Math.min(currentQuestionIndex, total));
    var progress = total > 0 ? Math.min(completed / total, 1) : 0;

    createjs.Tween.get(questionProgressBarFill, { override: true })
        .to({ scaleX: progress }, 250, createjs.Ease.quadOut);
}

function animateHudMetric(target) {
    if (!target) {
        return;
    }

    target.scaleX = target.scaleY = 1;

    createjs.Tween.get(target, { override: true })
        .to({ scaleX: 1.12, scaleY: 1.12 }, 160, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 180, createjs.Ease.quadIn);
}

function pulseHudCard(card) {
    if (!card) {
        return;
    }

    createjs.Tween.get(card, { override: true })
        .to({ scaleX: 1.03, scaleY: 1.03 }, 180, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);

    flashHudCardHighlight(card);
}

function shakeHudCard(card) {
    if (!card) {
        return;
    }

    var baseX = typeof card.baseX !== "undefined" ? card.baseX : card.x;
    card.baseX = baseX;

    createjs.Tween.get(card, { override: true })
        .to({ x: baseX - 6 }, 60, createjs.Ease.quadOut)
        .to({ x: baseX + 6 }, 80, createjs.Ease.quadInOut)
        .to({ x: baseX }, 90, createjs.Ease.quadOut);
}

function revealHud() {
    if (!hudContainer) {
        return;
    }

    var targetY = 60;
    hudContainer.alpha = 0;
    hudContainer.y = targetY - 12;

    createjs.Tween.get(hudContainer, { override: true })
        .to({ alpha: 1, y: targetY }, 320, createjs.Ease.quadOut);
}

function animateIconWrapper(wrapper, isHover) {
    if (!wrapper) {
        return;
    }

    var targetScale = isHover ? 1.12 : 1;
    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: targetScale, scaleY: targetScale }, 150, createjs.Ease.quadOut);

    if (wrapper.glow) {
        var baseGlowAlpha = typeof wrapper.glow.baseAlpha === "number" ? wrapper.glow.baseAlpha : wrapper.glow.alpha;
        var hoverGlowAlpha = typeof wrapper.glow.hoverAlpha === "number" ? wrapper.glow.hoverAlpha : baseGlowAlpha;
        wrapper.glow.alpha = isHover ? hoverGlowAlpha : baseGlowAlpha;
    }

    if (wrapper.ring) {
        var baseRingAlpha = typeof wrapper.ring.baseAlpha === "number" ? wrapper.ring.baseAlpha : wrapper.ring.alpha;
        var hoverRingAlpha = typeof wrapper.ring.hoverAlpha === "number" ? wrapper.ring.hoverAlpha : baseRingAlpha;
        wrapper.ring.alpha = isHover ? hoverRingAlpha : baseRingAlpha;
    }
}

function pressIconWrapper(wrapper) {
    if (!wrapper) {
        return;
    }

    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: 0.92, scaleY: 0.92 }, 90, createjs.Ease.quadOut);
}

function releaseIconWrapper(wrapper) {
    if (!wrapper) {
        return;
    }

    createjs.Tween.get(wrapper, { override: true })
        .to({ scaleX: 1.08, scaleY: 1.08 }, 120, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 160, createjs.Ease.quadIn);
}

function highlightScoreHud() {
    animateScoreCelebration();
}

function flashHudCardHighlight(card) {
    if (!card || !card.highlight) {
        return;
    }

    var highlight = card.highlight;
    if (typeof highlight.baseAlpha !== "number") {
        highlight.baseAlpha = highlight.alpha;
    }

    var baseAlpha = typeof highlight.baseAlpha === "number" ? highlight.baseAlpha : highlight.alpha;
    var targetAlpha = Math.min(baseAlpha + 0.35, 1);

    createjs.Tween.get(highlight, { override: true })
        .to({ alpha: targetAlpha }, 150, createjs.Ease.quadOut)
        .to({ alpha: baseAlpha }, 280, createjs.Ease.quadIn);
}
function animateScoreCelebration() {
    if (!scoreCardContainer) {
        return;
    }

    scoreCardContainer.__scoreCelebrating = true;

    animateHudMetric(gameScoreTxt);
    pulseHudCard(scoreCardContainer);

    var animationStarted = animateHudIconImpact(scoreCardContainer, "score", {
        scale: 1.34,
        overshoot: 0.9,
        settle: 1.08,
        rotation: 26,
        upDuration: 170,
        overshootDuration: 150,
        settleDuration: 150,
        downDuration: 220,
        onComplete: function () {
            scoreCardContainer.__scoreCelebrating = false;
        }
    });

    if (!animationStarted) {
        scoreCardContainer.__scoreCelebrating = false;
    }

    spawnScoreCardSparkles();
}

function animateTimerTick() {
    if (!timerCardContainer) {
        return;
    }

    animateHudMetric(gameTimerTxt);
    flashHudCardHighlight(timerCardContainer);

    animateHudIconImpact(timerCardContainer, "timer", {
        scale: 1.14,
        overshoot: 0.95,
        settle: 1.02,
        upDuration: 120,
        overshootDuration: 120,
        settleDuration: 110,
        downDuration: 180
    });

    spawnTimerPulse();
}

function animateQuestionAdvance() {
    if (!hudQuestionCardContainer) {
        return;
    }

    animateHudMetric(gameQCntTxt);
    pulseHudCard(hudQuestionCardContainer);

    animateHudIconImpact(hudQuestionCardContainer, "question", {
        scale: 1.18,
        overshoot: 0.94,
        settle: 1.04,
        upDuration: 150,
        overshootDuration: 140,
        settleDuration: 120,
        downDuration: 200
    });

    spawnQuestionAdvancePulse();
}

function animateHudIconImpact(card, type, options) {
    if (!card || !card.icon) {
        if (options && typeof options.onComplete === "function") {
            options.onComplete();
        }
        return false;
    }

    var icon = card.icon;
    icon.__impactActive = true;

    createjs.Tween.removeTweens(icon);

    var scaleUp = options && typeof options.scale === "number" ? options.scale : 1.24;
    var overshootScale = options && typeof options.overshoot === "number" ? options.overshoot : 0.94;
    var settleScale = options && typeof options.settle === "number" ? options.settle : 1.02;
    var rotation = options && typeof options.rotation === "number" ? options.rotation : 0;

    var upDuration = options && options.upDuration ? options.upDuration : 160;
    var overshootDuration = options && options.overshootDuration ? options.overshootDuration : 140;
    var settleDuration = options && options.settleDuration ? options.settleDuration : 120;
    var downDuration = options && options.downDuration ? options.downDuration : 180;

    createjs.Tween.get(icon, { override: true })
        .to({ scaleX: scaleUp, scaleY: scaleUp, rotation: rotation }, upDuration, createjs.Ease.quadOut)
        .to({ scaleX: overshootScale, scaleY: overshootScale, rotation: -rotation * 0.45 }, overshootDuration, createjs.Ease.quadInOut)
        .to({ scaleX: settleScale, scaleY: settleScale, rotation: rotation * 0.18 }, settleDuration, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1, rotation: 0 }, downDuration, createjs.Ease.quadIn)
        .call(function () {
            icon.__impactActive = false;
            if (options && typeof options.onComplete === "function") {
                options.onComplete();
            }
            restartIconIdleAnimation(card, type);
        });

    return true;
}

function spawnScoreCardSparkles() {
    if (!scoreCardContainer || !scoreCardContainer.effectLayer || !scoreCardContainer.icon) {
        return;
    }

    var layer = scoreCardContainer.effectLayer;
    var baseX = scoreCardContainer.icon.x;
    var baseY = scoreCardContainer.icon.y;
    var colors = ["#FDE68A", "#FCD34D", "#FACC15", "#F97316"];

    for (var i = 0; i < 6; i++) {
        var sparkle = new createjs.Shape();
        var color = colors[i % colors.length];
        sparkle.graphics.beginFill(color).drawPolyStar(0, 0, 4 + Math.random() * 3.5, 5, 0.55, -90);
        sparkle.alpha = 0;
        sparkle.scaleX = sparkle.scaleY = 0;
        sparkle.x = baseX;
        sparkle.y = baseY;
        sparkle.compositeOperation = "lighter";
        layer.addChild(sparkle);

        (function (shape, delay, offset) {
            var angle = offset + Math.random() * 0.5;
            var distance = 14 + Math.random() * 18;
            var targetX = baseX + Math.cos(angle) * distance;
            var targetY = baseY + Math.sin(angle) * distance - 2;

            createjs.Tween.get(shape)
                .wait(delay)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 130, createjs.Ease.quadOut)
                .to({ x: targetX, y: targetY, alpha: 0, scaleX: 0.2, scaleY: 0.2 }, 320, createjs.Ease.quadIn)
                .call(function () {
                    if (shape.parent) {
                        shape.parent.removeChild(shape);
                    }
                });
        })(sparkle, i * 45, (Math.PI * 2 * i) / 6);
    }
}

function spawnTimerPulse() {
    if (!timerCardContainer || !timerCardContainer.effectLayer || !timerCardContainer.icon) {
        return;
    }

    var baseX = timerCardContainer.icon.x;
    var baseY = timerCardContainer.icon.y;
    var layer = timerCardContainer.effectLayer;

    for (var i = 0; i < 2; i++) {
        var pulse = new createjs.Shape();
        pulse.graphics.setStrokeStyle(2).beginStroke("rgba(130,200,255,0.85)").drawCircle(0, 0, 14);
        pulse.alpha = 0.7;
        pulse.scaleX = pulse.scaleY = 0.45;
        pulse.x = baseX;
        pulse.y = baseY;
        layer.addChild(pulse);

        (function (shape, delay) {
            createjs.Tween.get(shape)
                .wait(delay)
                .to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 420, createjs.Ease.quadOut)
                .call(function () {
                    if (shape.parent) {
                        shape.parent.removeChild(shape);
                    }
                });
        })(pulse, i * 90);
    }
}

function spawnQuestionAdvancePulse() {
    if (!hudQuestionCardContainer || !hudQuestionCardContainer.effectLayer || !hudQuestionCardContainer.icon) {
        return;
    }

    var ripple = new createjs.Shape();
    ripple.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(110,231,183,0.85)")
        .drawRoundRect(-12, -12, 24, 24, 6);
    ripple.alpha = 0.75;
    ripple.scaleX = ripple.scaleY = 0.8;
    ripple.x = hudQuestionCardContainer.icon.x;
    ripple.y = hudQuestionCardContainer.icon.y;
    hudQuestionCardContainer.effectLayer.addChild(ripple);

    createjs.Tween.get(ripple)
        .to({ scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 380, createjs.Ease.quadOut)
        .call(function () {
            if (ripple.parent) {
                ripple.parent.removeChild(ripple);
            }
        });
}

function restartIconIdleAnimation(card, type) {
    if (!card || !card.icon) {
        return;
    }

    var icon = card.icon;
    if (icon.__impactActive) {
        return;
    }

    createjs.Tween.removeTweens(icon);
    icon.scaleX = icon.scaleY = 1;
    icon.rotation = 0;

    switch (type) {
        case "score":
            createjs.Tween.get(icon, { loop: true })
                .wait(800)
                .to({ rotation: 8 }, 1600, createjs.Ease.sineInOut)
                .to({ rotation: -8 }, 1600, createjs.Ease.sineInOut);
            break;
        case "timer":
            createjs.Tween.get(icon, { loop: true })
                .to({ rotation: -6 }, 1200, createjs.Ease.sineInOut)
                .to({ rotation: 6 }, 1200, createjs.Ease.sineInOut);
            break;
        case "question":
            createjs.Tween.get(icon, { loop: true })
                .to({ scaleX: 1.06, scaleY: 1.06 }, 1400, createjs.Ease.sineInOut)
                .to({ scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.sineInOut);
            break;
    }
}

function startHudAmbientAnimations() {
    restartIconIdleAnimation(scoreCardContainer, "score");
    restartIconIdleAnimation(timerCardContainer, "timer");
    restartIconIdleAnimation(hudQuestionCardContainer, "question");
}

function setTimerCriticalState(isCritical) {
    if (!timerCardContainer) {
        return;
    }

    timerCardContainer.__isCritical = isCritical;

    var hudTheme = getHudThemeConfig();
    var timerTheme = hudTheme.timerCritical || {};
    var stateConfig = null;

    if (isCritical) {
        if (time <= 5 && timerTheme.danger) {
            stateConfig = timerTheme.danger;
        } else if (time <= 13 && timerTheme.warning) {
            stateConfig = timerTheme.warning;
        }
    }

    var baseGradient = timerCardContainer.baseGradient || cloneArray(((hudTheme.cards && hudTheme.cards.timer) ? hudTheme.cards.timer.background : []) || []);
    var baseAccent = timerCardContainer.baseAccent || cloneArray(((hudTheme.cards && hudTheme.cards.timer) ? hudTheme.cards.timer.accent : []) || []);

    var colors = stateConfig && stateConfig.background ? cloneArray(stateConfig.background) : cloneArray(baseGradient);
    var accentColors = stateConfig && stateConfig.accent ? cloneArray(stateConfig.accent) : cloneArray(baseAccent);

    var cardWidth = timerCardContainer.__cardWidth || HUD_CARD_WIDTH;
    var cardHeight = timerCardContainer.__cardHeight || HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = timerCardContainer.__cornerRadius || HUD_CARD_CORNER_RADIUS;
    var accentWidth = timerCardContainer.__accentWidth || HUD_CARD_ACCENT_WIDTH;

    timerCardContainer.background.graphics
        .clear()
        .beginLinearGradientFill((colors && colors.length ? colors : baseGradient), [0, 1], -halfWidth, 0, halfWidth, 0)
        .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

    timerCardContainer.iconAccent.graphics
        .clear()
        .beginLinearGradientFill((accentColors && accentColors.length ? accentColors : baseAccent), [0, 1], -halfWidth, -halfHeight, -halfWidth + accentWidth, halfHeight)
        .drawRoundRect(-halfWidth, -halfHeight, accentWidth, cardHeight, cornerRadius);

    var baseIconStyle = mergeIconStyle(timerCardContainer.baseIconStyle || {}, null);

    if (!baseIconStyle.strokeColor && timerTheme.normalIcon) {
        baseIconStyle.strokeColor = timerTheme.normalIcon;
    }

    var iconStyle = stateConfig && stateConfig.icon ? mergeIconStyle(baseIconStyle, { strokeColor: stateConfig.icon }) : baseIconStyle;
    drawHudIcon(timerCardContainer.icon, "timer", iconStyle);

    if (gameTimerTxt) {
        if (!gameTimerTxt.__baseColor) {
            gameTimerTxt.__baseColor = timerTheme.normalText || (hudTheme.textStyles && hudTheme.textStyles.timerValue && hudTheme.textStyles.timerValue.color) || gameTimerTxt.color;
        }

        if (stateConfig && stateConfig.text) {
            gameTimerTxt.color = stateConfig.text;
        } else {
            gameTimerTxt.color = timerTheme.normalText || gameTimerTxt.__baseColor;
        }
    }
}

function buildHowToPlayOverlay() {
    var overlay = new createjs.Container();
    overlay.name = "HowToPlayOverlay";

    var background = new createjs.Shape();
    background.graphics
        .beginLinearGradientFill(["#FFF4DB", "#FFD8A4"], [0, 1], 0, 0, 0, 720)
        .drawRect(0, 0, 1280, 720);
    overlay.addChild(background);

    var pattern = drawHoneycombPattern(1280, 720, 44);
    pattern.alpha = 0.32;
    overlay.addChild(pattern);

    var header = createHowToPlayHeader();
    overlay.addChild(header);

    var instructions = createHowToPlayInstructions();
    overlay.addChild(instructions);

    var progress = createHowToPlayProgressBar();
    overlay.addChild(progress);

    overlay.backgroundShape = background;
    overlay.honeycombPattern = pattern;
    overlay.header = header;
    overlay.instructionsCard = instructions;
    overlay.progressFill = progress.progressFill;
    overlay.progressLabel = progress.progressLabel;
    overlay.progressPercent = progress.progressPercent;
    overlay.progressShine = progress.progressShine;
    overlay.progressMask = progress.progressMask;
    overlay.progressContainer = progress;

    var proceedButton = createLoaderProceedButton();
    proceedButton.x = 640;
    proceedButton.y = 610;
    overlay.addChild(proceedButton);

    overlay.proceedButton = proceedButton;

    var accentLarge = new createjs.Shape();
    accentLarge.graphics.beginFill("rgba(255,255,255,0.18)").drawCircle(1080, 160, 46);
    overlay.addChild(accentLarge);

    var accentSmall = new createjs.Shape();
    accentSmall.graphics.beginFill("rgba(255,255,255,0.12)").drawCircle(220, 140, 32);
    overlay.addChild(accentSmall);

    header.baseY = header.y;
    instructions.baseY = instructions.y;
    progress.baseY = progress.y;
    accentLarge.baseScale = accentLarge.scaleX = accentLarge.scaleY = 1;
    accentSmall.baseScale = accentSmall.scaleX = accentSmall.scaleY = 1;
    overlay.accentLarge = accentLarge;
    overlay.accentSmall = accentSmall;

    return overlay;
}

function createHowToPlayInstructions() {
    var container = new createjs.Container();
    container.regX = 324;
    container.regY = 146;
    container.x = 640;
    container.y = 244 + container.regY;

    var card = new createjs.Shape();
    card.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0.97)", "rgba(255,239,220,0.97)"], [0, 1], 0, 0, 0, 292)
        .drawRoundRect(0, 0, 648, 292, 42);
    card.shadow = new createjs.Shadow("rgba(211, 132, 43, 0.28)", 0, 18, 38);
    card.regX = 324;
    card.regY = 146;
    card.x = 324;
    card.y = 146;
    container.addChild(card);

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill([
            "rgba(255, 193, 125, 0.35)",
            "rgba(255, 157, 70, 0.1)",
            "rgba(255, 157, 70, 0)"
        ], [0, 0.5, 1], 324, 146, 0, 324, 146, 296)
        .drawEllipse(-90, -60, 800, 360);
    glow.alpha = 0.32;
    glow.compositeOperation = "lighter";
    container.addChildAt(glow, 0);
    container.glowShape = glow;

    var title = new createjs.Text("Before you start", "700 30px 'Baloo 2'", "#B36B1C");
    title.x = 46;
    title.y = 38;
    container.addChild(title);

    var steps = [
        "Review the How to Play tips carefully.",
        "Start the game once you understand the rules.",
        "Score is awarded for correct answers and quick responses.",
        "Submitted answers are final, you cannot go back."
    ];

    for (var i = 0; i < steps.length; i++) {
        var itemY = 100 + i * 46;

        var badge = new createjs.Shape();
        badge.graphics
            .beginLinearGradientFill(["#FFB760", "#FF8D3C"], [0, 1], -20, -20, 20, 20)
            .drawCircle(0, 0, 20);
        badge.x = 68;
        badge.y = itemY;
        container.addChild(badge);

        var badgeText = new createjs.Text((i + 1).toString(), "700 20px 'Baloo 2'", "#FFFFFF");
        badgeText.textAlign = "center";
        badgeText.textBaseline = "middle";
        badgeText.x = badge.x;
        badgeText.y = badge.y;
        container.addChild(badgeText);

        var stepText = new createjs.Text(steps[i], "500 18px 'Baloo 2'", "#6B3A15");
        stepText.lineHeight = 30;
        stepText.lineWidth = 496;
        stepText.x = 114;
        stepText.y = itemY-8;
        container.addChild(stepText);

        if (i < steps.length - 1) {
            var divider = new createjs.Shape();
            divider.graphics.beginFill("rgba(255, 200, 150, 0.32)").drawRoundRect(114, itemY + 18, 484, 2, 1);
            container.addChild(divider);
        }
    }

    container.cardShape = card;

    return container;
}



function drawHoneycombPattern(width, height, radius) {
    var shape = new createjs.Shape();
    var graphics = shape.graphics;
    var hexHeight = Math.sqrt(3) * radius;
    var horizontalSpacing = radius * 1.5;
    var row = 0;

    for (var y = radius; y < height + hexHeight; y += hexHeight, row++) {
        var offsetX = (row % 2) ? horizontalSpacing / 2 : 0;
        for (var x = radius; x < width + radius; x += horizontalSpacing) {
            var centerX = x + offsetX;
            var fill = row % 2 === 0 ? "rgba(255, 255, 255, 0.32)" : "rgba(255, 255, 255, 0.22)";
            graphics.beginFill(fill).drawPolyStar(centerX, y, radius, 6, 0, 30);
        }
    }

    return shape;
}

function createHowToPlayHeader() {
    var container = new createjs.Container();
    container.regX = 260;
    container.regY = 0;
    container.x = 640;
    container.y = 78;

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            ["rgba(255, 171, 94, 0.35)", "rgba(255, 171, 94, 0.08)", "rgba(255, 171, 94, 0)"],
            [0, 0.6, 1],
            0,
            0,
            0,
            0,
            0,
            260
        )
        .drawCircle(0, 0, 240);
    glow.alpha = 0.8;
    glow.x = 252;
    glow.y = 60;
    glow.compositeOperation = "lighter";
    container.addChild(glow);
    container.glowShape = glow;

    var card = new createjs.Shape();
    card.graphics
        .beginLinearGradientFill(["#FFB760", "#FF924A"], [0, 1], 0, 0, 520, 0)
        .drawRoundRect(0, 0, 520, 120, 42);
    card.shadow = new createjs.Shadow("rgba(170, 74, 16, 0.28)", 0, 18, 32);
    container.addChild(card);
    container.cardShape = card;
    container.cardWidth = 520;

    var cardHighlight = new createjs.Shape();
    cardHighlight.graphics
        .beginLinearGradientFill(
            ["rgba(255, 255, 255, 0.65)", "rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0)"],
            [0, 0.5, 1],
            0,
            0,
            520,
            0
        )
        .drawRoundRect(12, 8, 496, 52, 28);
    cardHighlight.alpha = 0.85;
    //container.addChild(cardHighlight);

    var highlightMask = new createjs.Shape();
    highlightMask.graphics.drawRoundRect(0, 0, 520, 120, 42);
    highlightMask.visible = false;
    container.addChild(highlightMask);

    var animatedHighlight = new createjs.Shape();
    animatedHighlight.graphics
        .beginLinearGradientFill(
            [
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0.45)",
                "rgba(255, 255, 255, 0)"
            ],
            [0, 0.5, 1],
            -120,
            0,
            120,
            0
        )
        .drawRoundRect(-120, -16, 240, 152, 60);
    animatedHighlight.alpha = 0;
    animatedHighlight.x = -160;
    animatedHighlight.y = -16;
    animatedHighlight.mask = highlightMask;
    animatedHighlight.compositeOperation = "lighter";
    container.addChild(animatedHighlight);
    container.highlightSweep = animatedHighlight;

    var tildeWave = createHowToPlayTildeWave(260, 16);
    tildeWave.x = 180;
    tildeWave.y = 94;
    container.addChild(tildeWave);
    container.tildeWave = tildeWave;

    var iconHalo = new createjs.Shape();
    iconHalo.graphics
        .beginRadialGradientFill(
            ["rgba(255, 255, 255, 0.95)", "rgba(255, 230, 195, 0.15)", "rgba(255, 230, 195, 0)"],
            [0, 0.55, 1],
            0,
            0,
            0,
            0,
            0,
            74
        )
        .drawCircle(0, 0, 70);
    iconHalo.x = 8;
    iconHalo.y = 5;
    iconHalo.alpha = 0.9;
    container.addChild(iconHalo);

    var iconBackground = new createjs.Shape();
    iconBackground.graphics
        .beginLinearGradientFill(["#FFFFFF", "#FFE7C8"], [0, 1], -36, -36, 36, 36)
        .drawCircle(0, 0, 42);
    iconBackground.x = 98;
    iconBackground.y = 60;
    container.addChild(iconBackground);

    var icon = new createjs.Text("\u2139", "700 50px 'Baloo 2'", "#FF8D3C");
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = iconBackground.x;
    icon.y = iconBackground.y;
    container.addChild(icon);

    var label = new createjs.Text("How to Play", "700 40px 'Baloo 2'", "#FFFFFF");
    label.x = 182;
    label.y = 26;
    container.addChild(label);

    var subtitle = new createjs.Text("Follow these quick tips before you start", "500 18px 'Baloo 2'", "rgba(255,255,255,0.9)");
    subtitle.x = 182;
    subtitle.y = 70;
    container.addChild(subtitle);

    var accent = new createjs.Shape();
    accent.graphics
        .beginLinearGradientFill(["rgba(255, 255, 255, 0.45)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"], [0, 0.6, 1], 0, 18, 0, 102)
        .drawRoundRect(420, 18, 72, 84, 34);
    accent.alpha = 0.35;
    container.addChild(accent);

    return container;
}

function createHowToPlayProgressBar() {
    var container = new createjs.Container();
    container.regX = 324;
    container.regY = 54;
    container.x = 640;
    container.y = 580 + container.regY;

    var shadow = new createjs.Shape();
    shadow.graphics
        .beginRadialGradientFill([
            "rgba(211, 132, 43, 0.32)",
            "rgba(211, 132, 43, 0)"
        ], [0, 1], 324, 44, 0, 324, 44, 300)
        .drawRoundRect(-4, 6, 656, 118, 34);
    shadow.alpha = 0.78;
    container.addChild(shadow);

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0.98)", "rgba(255,231,199,0.98)"], [0, 1], 0, 0, 0, 108)
        .drawRoundRect(0, 0, 648, 108, 34);
    frame.shadow = new createjs.Shadow("rgba(194, 119, 40, 0.22)", 0, 16, 34);
    container.addChild(frame);

    var status = new createjs.Text("Collecting game assets", "600 22px 'Baloo 2'", "#A25C1D");
    status.x = 48;
    status.y = 26;
    status.lineWidth = 432;
    container.addChild(status);

    var percent = new createjs.Text("0%", "700 32px 'Baloo 2'", "#FF7A1F");
    percent.textAlign = "right";
    percent.x = 600;
    percent.y = 22;
    container.addChild(percent);

    var track = new createjs.Shape();
    track.graphics
        .beginLinearGradientFill(["rgba(255, 205, 158, 0.55)", "rgba(255, 221, 191, 0.2)"], [0, 1], 0, 0, 560, 0)
        .drawRoundRect(0, 0, 560, 20, 12);
    track.x = 44;
    track.y = 66;
    container.addChild(track);

    var fillMask = new createjs.Shape();
    fillMask.graphics.drawRoundRect(0, 0, 560, 20, 12);
    fillMask.x = 44;
    fillMask.y = 66;

    var fillContainer = new createjs.Container();
    fillContainer.x = 44;
    fillContainer.y = 66;
    fillContainer.scaleX = 0;

    var fill = new createjs.Shape();
    fill.graphics
        .beginLinearGradientFill(["#FFB863", "#FF8D3C"], [0, 1], 0, 0, 560, 0)
        .drawRoundRect(0, 0, 560, 20, 12);
    fillContainer.addChild(fill);

    var pulse = new createjs.Shape();
    pulse.graphics
        .beginLinearGradientFill([
            "rgba(255,255,255,0.05)",
            "rgba(255,255,255,0.45)",
            "rgba(255,255,255,0.05)"
        ], [0, 0.5, 1], 0, 0, 280, 0)
        .drawRect(-140, 0, 280, 20);
    pulse.alpha = 0;
    pulse.x = -140;
    pulse.compositeOperation = "lighter";
    fillContainer.addChild(pulse);

    var shine = new createjs.Shape();
    shine.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0)", "rgba(255,255,255,0.75)", "rgba(255,255,255,0)"], [0, 0.5, 1], 0, 0, 220, 0)
        .drawRect(-110, -12, 220, 40);
    shine.alpha = 0;
    shine.compositeOperation = "lighter";
    shine.x = 0;
    shine.y = 0;
    fillContainer.addChild(shine);

    fillContainer.mask = fillMask;

    container.addChild(fillContainer);
    container.addChild(fillMask);
    fillMask.visible = false;

    container.progressFill = fillContainer;
    container.progressLabel = status;
    container.progressPercent = percent;
    container.progressShine = shine;
    container.progressMask = fillMask;
    container.progressPulse = pulse;

    return container;
}

function createHowToPlayTildeWave(width, strokeHeight) {
    var container = new createjs.Container();
    container.alpha = 0.72;
    container.baseAlpha = container.alpha;

    var mask = new createjs.Shape();
    mask.graphics.drawRoundRect(0, -strokeHeight, width, strokeHeight * 2, strokeHeight);
    container.mask = mask;
    container.maskShape = mask;

    var waveContent = new createjs.Container();
    container.addChild(waveContent);

    var patternWidth = width * 2;
    var amplitude = strokeHeight * 0.6;
    var wavelength = Math.max(48, width / 5);

    var base = new createjs.Shape();
    var baseGraphics = base.graphics;
    baseGraphics.setStrokeStyle(strokeHeight, "round", "round");
    baseGraphics.beginLinearGradientStroke(
        ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.12)"],
        [0, 1],
        0,
        0,
        patternWidth,
        0
    );
    baseGraphics.moveTo(0, 0);
    for (var x = 0; x <= patternWidth; x += wavelength) {
        baseGraphics.quadraticCurveTo(x + wavelength * 0.25, -amplitude, x + wavelength * 0.5, 0);
        baseGraphics.quadraticCurveTo(x + wavelength * 0.75, amplitude, x + wavelength, 0);
    }
    waveContent.addChild(base);

    var highlight = new createjs.Shape();
    var highlightGraphics = highlight.graphics;
    highlightGraphics.setStrokeStyle(strokeHeight * 0.45, "round", "round");
    highlightGraphics.beginStroke("rgba(255, 255, 255, 0.85)");
    highlightGraphics.moveTo(0, -strokeHeight * 0.12);
    for (var hx = 0; hx <= patternWidth; hx += wavelength) {
        highlightGraphics.quadraticCurveTo(hx + wavelength * 0.25, -amplitude * 0.9, hx + wavelength * 0.5, -strokeHeight * 0.12);
        highlightGraphics.quadraticCurveTo(hx + wavelength * 0.75, amplitude * 0.65, hx + wavelength, -strokeHeight * 0.12);
    }
    highlight.alpha = 0.85;
    highlight.compositeOperation = "lighter";
    waveContent.addChild(highlight);

    waveContent.x = -width;
    container.waveContent = waveContent;
    container.wavePatternWidth = patternWidth;
    container.waveWavelength = wavelength;
    container.waveHighlight = highlight;

    return container;
}

function startHowToPlayTildeWaveAnimation(waveContainer) {
    if (!waveContainer || waveContainer.__tildeAnimationAttached) {
        return;
    }

    waveContainer.__tildeAnimationAttached = true;

    var waveContent = waveContainer.waveContent;
    if (waveContent) {
        var baseX = waveContent.x;
        var waveShift = waveContainer.waveWavelength || 60;
        createjs.Tween.get(waveContent, { loop: true })
            .to({ x: baseX - waveShift }, 2200, createjs.Ease.linear)
            .set({ x: baseX });
    }

    if (waveContainer.waveHighlight) {
        var highlightBaseAlpha = waveContainer.waveHighlight.alpha;
        createjs.Tween.get(waveContainer.waveHighlight, { loop: true })
            .to({ alpha: Math.min(1, highlightBaseAlpha + 0.1) }, 1800, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.2, highlightBaseAlpha - 0.15) }, 1800, createjs.Ease.sineInOut);
    }

    var baseAlpha = typeof waveContainer.baseAlpha === "number" ? waveContainer.baseAlpha : waveContainer.alpha;
    var highAlpha = Math.min(1, baseAlpha + 0.12);
    var lowAlpha = Math.max(0, baseAlpha - 0.15);

    createjs.Tween.get(waveContainer, { loop: true })
        .to({ alpha: highAlpha }, 2000, createjs.Ease.sineInOut)
        .to({ alpha: lowAlpha }, 2000, createjs.Ease.sineInOut);
}

function startProgressFillShimmer(shineShape, pulseShape) {
    if (!shineShape && !pulseShape) {
        return;
    }

    if (shineShape) {
        createjs.Tween.removeTweens(shineShape);
        shineShape.alpha = 0;
        shineShape.x = -140;

        createjs.Tween.get(shineShape, { loop: true })
            .to({ alpha: 0.82 }, 320, createjs.Ease.quadOut)
            .to({ x: 560, alpha: 0 }, 900, createjs.Ease.quadInOut)
            .wait(320)
            .call(function () {
                shineShape.x = -140;
                shineShape.alpha = 0;
            });
    }

    if (pulseShape) {
        createjs.Tween.removeTweens(pulseShape);
        pulseShape.alpha = 0;
        pulseShape.x = -140;

        createjs.Tween.get(pulseShape, { loop: true })
            .wait(220)
            .to({ alpha: 0.6 }, 380, createjs.Ease.quadOut)
            .to({ x: 560, alpha: 0 }, 1180, createjs.Ease.quadIn)
            .call(function () {
                pulseShape.alpha = 0;
                pulseShape.x = -140;
            });
    }
}

function stopProgressFillShimmer(shineShape, pulseShape) {
    if (!shineShape && !pulseShape) {
        return;
    }

    if (shineShape) {
        createjs.Tween.removeTweens(shineShape);
        shineShape.alpha = 0;
    }

    if (pulseShape) {
        createjs.Tween.removeTweens(pulseShape);
        pulseShape.alpha = 0;
        pulseShape.x = -140;
    }
}

function applyHowToPlayAmbientAnimations(overlay) {
    if (!overlay || overlay.__ambientAnimationAttached) {
        return;
    }

    overlay.__ambientAnimationAttached = true;

    if (overlay.honeycombPattern) {
        var pattern = overlay.honeycombPattern;
        pattern.y = 0;
        createjs.Tween.get(pattern, { loop: true })
            .to({ y: -24, alpha: 0.28 }, 4200, createjs.Ease.sineInOut)
            .to({ y: 0, alpha: 0.32 }, 4200, createjs.Ease.sineInOut);
    }

    if (overlay.header && overlay.header.glowShape) {
        var headerGlow = overlay.header.glowShape;
        headerGlow.alpha = 0.24;
        createjs.Tween.get(headerGlow, { loop: true })
            .to({ alpha: 0.38 }, 2200, createjs.Ease.sineInOut)
            .to({ alpha: 0.2 }, 2200, createjs.Ease.sineInOut);
    }

    if (overlay.header && overlay.header.tildeWave) {
        startHowToPlayTildeWaveAnimation(overlay.header.tildeWave);
    }

    if (overlay.accentLarge) {
        var large = overlay.accentLarge;
        createjs.Tween.get(large, { loop: true })
            .to({ scaleX: 1.08, scaleY: 1.08, alpha: 0.26 }, 2600, createjs.Ease.quadInOut)
            .to({ scaleX: 0.96, scaleY: 0.96, alpha: 0.14 }, 2600, createjs.Ease.quadInOut);
    }

    if (overlay.accentSmall) {
        var small = overlay.accentSmall;
        createjs.Tween.get(small, { loop: true })
            .to({ scaleX: 1.15, scaleY: 1.15, alpha: 0.2 }, 2400, createjs.Ease.quadInOut)
            .to({ scaleX: 0.9, scaleY: 0.9, alpha: 0.1 }, 2400, createjs.Ease.quadInOut);
    }

    if (overlay.instructionsCard && overlay.instructionsCard.glowShape) {
        overlay.instructionsCard.glowShape.alpha = 0.28;
    }
}

function animateHowToPlayOverlayEntry(overlay) {
    if (!overlay) {
        return;
    }

    applyHowToPlayAmbientAnimations(overlay);

    if (overlay.header) {
        overlay.header.alpha = 0;
        overlay.header.y = overlay.header.baseY - 24;
        createjs.Tween.get(overlay.header, { override: true })
            .to({ alpha: 1, y: overlay.header.baseY }, 360, createjs.Ease.quadOut)
            .call(function () {
                startHowToPlayHeaderIdleAnimation(overlay.header);
            });
    }

    if (overlay.instructionsCard) {
        overlay.instructionsCard.alpha = 0;
        overlay.instructionsCard.y = overlay.instructionsCard.baseY + 24;
        createjs.Tween.get(overlay.instructionsCard, { override: true })
            .wait(80)
            .to({ alpha: 1, y: overlay.instructionsCard.baseY }, 420, createjs.Ease.quadOut)
            .call(function () {
                startHowToPlayInstructionsIdleAnimation(overlay.instructionsCard);
            });
    }
}

function startHowToPlayHeaderIdleAnimation(header) {
    if (!header || header.__idleAnimationAttached) {
        return;
    }

    header.__idleAnimationAttached = true;

    if (header.highlightSweep && header.cardWidth) {
        var sweep = header.highlightSweep;
        var travelStart = -160;
        var travelEnd = header.cardWidth + 160;

        sweep.x = travelStart;
        sweep.alpha = 0;

        createjs.Tween.get(sweep, { loop: true })
            .to({ alpha: 0.85 }, 320, createjs.Ease.quadOut)
            .to({ x: travelEnd }, 1400, createjs.Ease.quadInOut)
            .to({ alpha: 0 }, 280, createjs.Ease.quadIn)
            .set({ x: travelStart })
            .wait(480);
    }

    if (header.tildeWave) {
        startHowToPlayTildeWaveAnimation(header.tildeWave);
    }
}

function startHowToPlayInstructionsIdleAnimation(cardContainer) {
    if (!cardContainer) {
        return;
    }

    createjs.Tween.removeTweens(cardContainer);

    if (cardContainer.cardShape) {
        createjs.Tween.removeTweens(cardContainer.cardShape);
        cardContainer.cardShape.scaleX = 1;
        cardContainer.cardShape.scaleY = 1;
    }
}

function resetHowToPlayProgressBar(overlay) {
    if (!overlay || !overlay.progressContainer) {
        return;
    }

    var progress = overlay.progressContainer;
    createjs.Tween.removeTweens(progress);
    progress.visible = true;
    progress.__hiding = false;
    progress.alpha = 0;
    progress.y = progress.baseY + 24;
    createjs.Tween.get(progress, { override: true })
        .wait(140)
        .to({ alpha: 1, y: progress.baseY }, 420, createjs.Ease.quadOut);

    if (overlay.progressFill) {
        createjs.Tween.removeTweens(overlay.progressFill);
        overlay.progressFill.scaleX = 0;
    }

    if (overlay.progressPulse) {
        createjs.Tween.removeTweens(overlay.progressPulse);
        overlay.progressPulse.alpha = 0;
        overlay.progressPulse.x = -140;
    }

    if (overlay.progressPercent) {
        overlay.progressPercent.text = "0%";
    }

    if (overlay.progressLabel) {
        if (assetsPathLang == "assets/VietnamAssets/") {
            overlay.progressLabel.text = "0% Đang tải trò chơi...";
            overlay.progressLabel.lineWidth = 540;
        } else if (assetsPathLang == "assets/TamilAssets/") {
            overlay.progressLabel.text = "0% ஆட்டம் தயாராகிக் கொண்டிருக்கிறது...";
            overlay.progressLabel.lineWidth = 540;
            overlay.progressLabel.font = "bold 23px Segoe UI";
        } else if (assetsPathLang == "assets/GujaratiAssets/") {
            overlay.progressLabel.text = "0% ગેમ લોડ થાય છે...";
            overlay.progressLabel.lineWidth = 540;
        } else if (assetsPathLang == "assets/HindiAssets/") {
            overlay.progressLabel.text = "0%खेल लोड हो रहा है...";
            overlay.progressLabel.lineWidth = 540;
            overlay.progressLabel.font = "bold 23px Segoe UI";
        } else {
            overlay.progressLabel.text = "Collecting game assets";
            overlay.progressLabel.lineWidth = 432;
            overlay.progressLabel.font = "600 22px 'Baloo 2'";
        }
    }

    if (overlay.progressShine || overlay.progressPulse) {
        startProgressFillShimmer(overlay.progressShine, overlay.progressPulse);
    }
}

function prepareHowToPlayOverlayForLoading(overlay) {
    if (!overlay) {
        return;
    }

    overlay.visible = true;
    animateHowToPlayOverlayEntry(overlay);
    resetHowToPlayProgressBar(overlay);
}

function hideHowToPlayProgressBar() {
    if (!HowToPlayScreenImg || !HowToPlayScreenImg.progressContainer) {
        return;
    }

    var progress = HowToPlayScreenImg.progressContainer;
    if (!progress.visible || progress.__hiding) {
        return;
    }

    progress.__hiding = true;
    createjs.Tween.get(progress, { override: true })
        .to({ alpha: 0, y: progress.baseY - 18 }, 320, createjs.Ease.quadIn)
        .call(function () {
            progress.visible = false;
            progress.y = progress.baseY;
            progress.__hiding = false;
        });

    stopProgressFillShimmer(HowToPlayScreenImg.progressShine, HowToPlayScreenImg.progressPulse);
}


function createLoaderProceedButton() {
    var button = new createjs.Container();
    button.visible = false;
    button.alpha = 0;
    button.scaleX = button.scaleY = 0.92;
    button.mouseEnabled = false;
    button.mouseChildren = false;

    var shadow = new createjs.Shape();
    shadow.graphics.beginFill("rgba(211, 132, 43, 0.28)").drawRoundRect(-110, -32, 220, 64, 24);
    shadow.alpha = 0.75;
    shadow.y = 4;
    button.addChild(shadow);

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(["#FFB760", "#FF8D3C"], [0, 1], -110, 0, 110, 0)
        .drawRoundRect(-110, -36, 220, 72, 24);
    button.addChild(frame);

    var label = new createjs.Text("Proceed", "700 28px 'Baloo 2'", "#FFFFFF");
    label.textAlign = "center";
    label.textBaseline = "middle";
    button.addChild(label);

    button.cursor = "pointer";

    return button;
}

function buildGameIntroOverlay() {
    var overlay = new createjs.Container();
    overlay.name = "GameIntroOverlay";
    overlay.mouseEnabled = false;
    overlay.mouseChildren = false;

   

    var header = createIntroHowToPlayHeader();
    overlay.addChild(header);
    header.baseY = header.y;
    startHowToPlayHeaderIdleAnimation(header);

    var accent = new createjs.Shape();
    accent.graphics.beginFill("rgba(255,255,255,0.12)").drawCircle(1150, 120, 52);
    overlay.addChild(accent);

    return overlay;
}

function createIntroHowToPlayHeader() {
    var container = new createjs.Container();
    container.name = "IntroHowToPlayBadge";
    container.x = 50;
    container.y = 32;

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill([
            "rgba(255, 174, 102, 0.38)",
            "rgba(255, 174, 102, 0.12)",
            "rgba(255, 174, 102, 0)"
        ], [0, 0.55, 1], 0, 0, 0, 0, 0, 180)
        .drawCircle(0, 0, 180);
    glow.alpha = 0.85;
    glow.x = 154;
    glow.y = 52;
    glow.compositeOperation = "lighter";
    container.addChild(glow);
    container.glowShape = glow;

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(["#FFB760", "#FF924A"], [0, 1], 0, 0, 280, 0)
        .drawRoundRect(0, 0, 280, 85, 40);
    frame.shadow = new createjs.Shadow("rgba(5, 12, 28, 0.38)", 0, 14, 28);
    container.addChild(frame);
    container.cardShape = frame;

    /*var highlight = new createjs.Shape();
    highlight.graphics
        .beginLinearGradientFill([
            "rgba(255,255,255,0.75)",
            "rgba(255,255,255,0.22)",
            "rgba(255,255,255,0)"
        ], [0, 0.52, 1], 0, 0, 320, 0)
        .drawRoundRect(16, 10, 388, 46, 24);
    highlight.alpha = 0.88;
    container.addChild(highlight);*/

    var wave = createHowToPlayTildeWave(210, 14);
    wave.x = 160;
    wave.y = 84;
    container.addChild(wave);
    container.tildeWave = wave;

    var iconHalo = new createjs.Shape();
    iconHalo.graphics
        .beginRadialGradientFill([
            "rgba(255, 255, 255, 0.95)",
            "rgba(255, 230, 195, 0.15)",
            "rgba(255, 230, 195, 0)"
        ], [0, 0.55, 1], 0, 0, 0, 0, 0, 68)
        .drawCircle(0, 0, 64);
    iconHalo.x = 40;
    iconHalo.y = 43;
    container.addChild(iconHalo);

    var iconBackground = new createjs.Shape();
    iconBackground.graphics
        .beginLinearGradientFill(["#FFFFFF", "#FFE7C8"], [0, 1], -34, -34, 34, 34)
        .drawCircle(0, 0, 36);
    iconBackground.x = iconHalo.x;
    iconBackground.y = iconHalo.y;
    container.addChild(iconBackground);

    var icon = new createjs.Text("\u2139", "700 44px 'Baloo 2'", "#FF8D3C");
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = iconBackground.x;
    icon.y = iconBackground.y;
    container.addChild(icon);

    var title = new createjs.Text("How to Play", "700 32px 'Baloo 2'", "#FFFFFF");
    title.x = 84;
    title.y = 18;
    container.addChild(title);

    var subtitle = new createjs.Text("Watch animation carefully", "500 16px 'Baloo 2'", "rgba(255,255,255,0.9)");
    subtitle.x = 84;
    subtitle.y = 58;
    container.addChild(subtitle);

    return container;
}

function createIntroActionButton() {
    var button = new createjs.Container();
    button.name = "IntroActionButton";
    button.mouseChildren = false;
    button.mouseEnabled = false;
    button.cursor = "pointer";
    button.shadow = new createjs.Shadow("rgba(6, 14, 33, 0.26)", 0, 14, 28);

     

    var base = new createjs.Shape();
    base.name = "base";
    button.addChild(base);
 

    var icon = new createjs.Text("", "700 32px 'Baloo 2'", "#FFFFFF");
    icon.name = "icon";
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = -128;
    icon.y = 5;
    button.addChild(icon);

    var label = new createjs.Text("", "700 28px 'Baloo 2'", "#FFFFFF");
    label.name = "label";
    label.textAlign = "left";
    label.textBaseline = "middle";
    label.x = -95;
    label.y = 5;
    button.addChild(label);

 

    applyHowToPlayButtonState(button, "skip");

    button.scaleX = button.scaleY = 0.96;

    return button;
}

function applyHowToPlayButtonState(button, state) {
    if (!button) {
        return;
    }

    var base = button.getChildByName("base");
    var highlight = button.getChildByName("highlight");
    var label = button.getChildByName("label");
    var icon = button.getChildByName("icon");
    var glow = button.getChildByName("glow");

    if (base) {
        base.graphics.clear();
    }
    if (highlight) {
        highlight.graphics.clear();
    }
    if (glow) {
        glow.graphics.clear();
    }

    if (state === "start") {
        if (glow) {
            glow.graphics
                .beginRadialGradientFill(
                    ["rgba(255, 166, 94, 0.45)", "rgba(255, 166, 94, 0)"],
                    [0, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    180
                )
                .drawCircle(0, 0, 170);
            glow.alpha = 0.95;
        }
        if (base) {
            base.graphics
                .setStrokeStyle(2)
                .beginStroke("rgba(245, 107, 32, 0.85)")
                .beginLinearGradientFill(["#FFB760", "#FF7A2F"], [0, 1], -160, 0, 160, 0)
                .drawRoundRect(-160, -44, 150, 88, 30);
        }
        if (highlight) {
            highlight.graphics
                .beginLinearGradientFill(
                    ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.18)", "rgba(255,255,255,0)"],
                    [0, 0.55, 1],
                    -160,
                    -44,
                    160,
                    14
                )
                .drawRoundRect(-160, -44, 320, 58, 28);
        }
        if (icon) {
            icon.text = "\u25B6";
            icon.font = "700 34px 'Baloo 2'";
            icon.color = "#FFFFFF";
        }
        if (label) {
            label.text = "Start";
            label.font = "700 28px 'Baloo 2'";
            label.color = "#FFFFFF";
        }
        button.shadow = new createjs.Shadow("rgba(8, 17, 38, 0.38)", 0, 18, 34);
    } else {
        if (glow) {
            glow.graphics
                .beginRadialGradientFill(
                    ["rgba(255, 170, 115, 0.55)", "rgba(255, 170, 115, 0)"],
                    [0, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    165
                )
                .drawCircle(0, 0, 165);
            glow.alpha = 0.9;
        }
        if (base) {
            base.graphics
                .setStrokeStyle(2)
                .beginStroke("rgba(240, 102, 37, 0.75)")
                .beginLinearGradientFill(["#FFB06A", "#FF7C3A"], [0, 1], -160, 0, 160, 0)
                .drawRoundRect(-160, -44, 150, 88, 30);
        }
        if (highlight) {
            highlight.graphics
                .beginLinearGradientFill(
                    [
                        "rgba(255, 255, 255, 0.72)",
                        "rgba(255, 255, 255, 0.18)",
                        "rgba(255, 255, 255, 0)"
                    ],
                    [0, 0.55, 1],
                    -160,
                    -44,
                    160,
                    16
                )
                .drawRoundRect(-160, -44, 320, 60, 28);
        }
        if (icon) {
            icon.text = "\u279C";
            icon.font = "700 30px 'Baloo 2'";
            icon.color = "#FFFFFF";
        }
        if (label) {
            label.text = "Skip";
            label.font = "700 26px 'Baloo 2'";
            label.color = "#FFFFFF";
        }
        button.shadow = new createjs.Shadow("rgba(6, 14, 33, 0.32)", 0, 16, 32);
    }

    button.state = state;
}

function attachProceedButtonListeners(button) {
    if (!button || button._loaderProceedHooked) {
        return;
    }

    button._loaderProceedHooked = true;

    button.on("click", function () {
        hideLoaderProceedButton();

        var globalContext = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : null);

        var toggleInvoked = false;
        if (typeof togglefullscreen === "function") {
            try {
                togglefullscreen();
                toggleInvoked = true;
            } catch (e) {
                console.log("togglefullscreen invocation failed", e);
            }
        } else if (globalContext && typeof globalContext.togglefullscreen === "function") {
            try {
                globalContext.togglefullscreen();
                toggleInvoked = true;
            } catch (e) {
                console.log("window.togglefullscreen invocation failed", e);
            }
        }

        if (!toggleInvoked) {
            if (typeof toggleFullScreen === "function") {
                try {
                    toggleFullScreen();
                    toggleInvoked = true;
                } catch (e) {
                    console.log("toggleFullScreen unavailable", e);
                }
            } else if (globalContext && typeof globalContext.toggleFullScreen === "function") {
                try {
                    globalContext.toggleFullScreen();
                    toggleInvoked = true;
                } catch (e) {
                    console.log("window.toggleFullScreen unavailable", e);
                }
            }
        }

        var howToPlayInvoked = false;
        if (typeof createhowtoplay === "function") {
            try {
                createhowtoplay();
                howToPlayInvoked = true;
            } catch (e) {
                console.log("createhowtoplay invocation failed", e);
            }
        } else if (globalContext && typeof globalContext.createhowtoplay === "function") {
            try {
                globalContext.createhowtoplay();
                howToPlayInvoked = true;
            } catch (e) {
                console.log("window.createhowtoplay invocation failed", e);
            }
        }

        if (!howToPlayInvoked) {
            if (typeof createHowToPlay === "function") {
                try {
                    createHowToPlay();
                    howToPlayInvoked = true;
                } catch (e) {
                    console.log("createHowToPlay invocation failed", e);
                }
            } else if (globalContext && typeof globalContext.createHowToPlay === "function") {
                try {
                    globalContext.createHowToPlay();
                    howToPlayInvoked = true;
                } catch (e) {
                    console.log("window.createHowToPlay invocation failed", e);
                }
            }
        }
    });

    button.on("rollover", function () {
        createjs.Tween.get(button, { override: true }).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut);
    });

    button.on("rollout", function () {
        createjs.Tween.get(button, { override: true }).to({ scaleX: 0.94, scaleY: 0.94 }, 200, createjs.Ease.quadOut);
    });

    button.scaleX = button.scaleY = 0.94;
}

function showLoaderProceedButton() {
    if (!HowToPlayScreenImg || !HowToPlayScreenImg.proceedButton) {
        return;
    }

    var button = HowToPlayScreenImg.proceedButton;
    attachProceedButtonListeners(button);
    button.visible = true;
    button.mouseEnabled = true;
    button.mouseChildren = true;
    if (button.alpha < 1) {
        button.alpha = 0;
    }
    if (button.scaleX < 1 || button.scaleY < 1) {
        button.scaleX = button.scaleY = 0.92;
    }
    createjs.Tween.get(button, { override: true })
        .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadOut);

    // Ensure the control is visible even if tweens do not advance (e.g., paused tickers)
    button.alpha = 1;
    button.scaleX = button.scaleY = 1;
setInterval(() => {
    createjs.Tween.get(button, { override: true })
        .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut)
        .to({ scaleX: 0.94, scaleY: 0.94 }, 200, createjs.Ease.quadOut);
}, 1000);
    if (stage && typeof stage.update === "function") {
        stage.update();
    }
}

function hideLoaderProceedButton() {
    if (!HowToPlayScreenImg || !HowToPlayScreenImg.proceedButton) {
        return;
    }

    var button = HowToPlayScreenImg.proceedButton;
    if (button.visible || button.alpha > 0) {
        createjs.Tween.get(button, { override: true }).to({ alpha: 0, scaleX: 0.92, scaleY: 0.92 }, 160, createjs.Ease.quadIn);
    }
    button.alpha = 0;
    button.scaleX = button.scaleY = 0.92;
    button.mouseEnabled = false;
    button.mouseChildren = false;
    button.visible = false;

    if (stage && typeof stage.update === "function") {
        stage.update();
    }
}


//==========================================================================//
function createHowToPlay() {
    if (typeof handCursor !== "undefined" && handCursor) {
        handCursor.visible = false;
    }
    hideLoaderProceedButton();

    if (HowToPlayScreenImg) {
        HowToPlayScreenImg.visible = false;
    }

    createGameIntroAnimationPlay(true)
}
//==========================================================================//
function createHowToPlayHandler(evt) {

    // console.log(evt.currentTarget.currentFrame +" == "+   evt.currentTarget.totalFrames)
    if (evt.currentTarget.currentFrame == evt.currentTarget.totalFrames - 1) {
        var totalFrame = evt.currentTarget.totalFrames

        evt.currentTarget.gotoAndStop(totalFrame - 1)
        evt.currentTarget.removeEventListener("tick", createHowToPlayHandler)

        clearHowToPlayInterval = setInterval(gameHowToPlayAnimation, 1000);
    }
}
//===========================================================================================//
function gameHowToPlayAnimation() {

    clearInterval(clearHowToPlayInterval)
    // if()
    // {

    //     createGameIntroAnimationPlay(true) // GameOrientation.js
    // }
}
//===========================================================================================//

function createGameIntroAnimationPlay() {
    //////////////////////////////////////Dynamicintro///////////////////////

    howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)

    commongameintro() //   know
    //  introStartCnt++;
    startAnimationHandler(null)
    isVisibleSkipBtn()
    //////////////////////////////////////////////////////////////////////////////
    /*howToPlayImageMc.visible = true;
    container.parent.addChild(howToPlayImageMc)
    gameIntroAnimMc.visible = true;
    gameIntroAnimMc.gotoAndPlay(0);
     commongameintro();
    gameIntroAnimMc.addEventListener("tick", startAnimationHandler);*/

}
//===========================================================================================//
function setStopRotation() {
    console.log("Stop Rotation 1 " + isScreenRotation + " ======== " + isGamePlay)
    if (isGamePlay) {
        pauseTimer()
    }
}

function setResumeRotation() {
    console.log("get value of = " + isGamePlay)
    if (isScreenRotation == "0" && !isGamePlay) {
        isScreenRotation = "5";
    }
    if (isGamePlay) {
        restartTimer()
    }
}
//================================================================================================//


function createBackgroundTweens() {


    cbg1.visible = cbg2.visible = cbg3.visible = true;
    bg1.x = 0;
    cbg1.x = 1280;
    var objTween = 100000
    var objTween = 100000

    createjs.Tween.get(bg1, { loop: true }).to({ x: -1280 }, objTween)
    createjs.Tween.get(cbg1, { loop: true }).to({ x: 0 }, objTween)

    bg2.x = 0;
    cbg2.x = 1280;
    var objTween1 = 80000
    var objTween1 = 80000

    createjs.Tween.get(bg2, { loop: true }).to({ x: -1280 }, objTween1)
    createjs.Tween.get(cbg2, { loop: true }).to({ x: 0 }, objTween1)

    bg3.x = 0;
    cbg3.x = 1280;
    var objTween2 = 60000
    var objTween2 = 60000

    createjs.Tween.get(bg3, { loop: true }).to({ x: -1280 }, objTween2)
    createjs.Tween.get(cbg3, { loop: true }).to({ x: 0 }, objTween2)



}

//===========================================================================================//

function TimerAnsScoreTweens() {

    // QuesCntMc.alpha = 0.7
    // createjs.Tween.get(QuesCntMc, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.7 }, 1000)


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function panelVisibleFn() {
    if (QuesCntMc) {
        QuesCntMc.visible = false;
    }

    if (typeof howToPlayImageMc !== "undefined" && howToPlayImageMc) {
        howToPlayImageMc.visible = false;
    }

    if (typeof HowToPlayScreenImg !== "undefined" && HowToPlayScreenImg) {
        HowToPlayScreenImg.visible = false;
    }

    if (typeof handCursor !== "undefined" && handCursor) {
        handCursor.visible = false;
    }

    if (hudContainer && container && container.parent && !hudContainer.parent) {
        container.parent.addChild(hudContainer);
    }

    if (hudContainer) {
        hudContainer.visible = true;
        revealHud();
    }

    if (volumeBtn) {
        volumeBtn.mouseEnabled = true;
        volumeBtn.visible = true;
        volumeBtn.removeAllEventListeners("mouseover");
        volumeBtn.removeAllEventListeners("mouseout");
        volumeBtn.removeAllEventListeners("mousedown");
        volumeBtn.removeAllEventListeners("pressup");
        volumeBtn.on("mouseover", function () {
            animateIconWrapper(volumeBtnWrapper, true);
        });
        volumeBtn.on("mouseout", function () {
            animateIconWrapper(volumeBtnWrapper, false);
        });
        volumeBtn.on("mousedown", function () {
            pressIconWrapper(volumeBtnWrapper);
        });
        volumeBtn.on("pressup", function () {
            releaseIconWrapper(volumeBtnWrapper);
        });
    }

    if (fullScreenBtn) {
        fullScreenBtn.mouseEnabled = true;
        fullScreenBtn.visible = true;
        fullScreenBtn.removeAllEventListeners("mouseover");
        fullScreenBtn.removeAllEventListeners("mouseout");
        fullScreenBtn.removeAllEventListeners("mousedown");
        fullScreenBtn.removeAllEventListeners("pressup");
        fullScreenBtn.on("mouseover", function () {
            animateIconWrapper(fullScreenBtnWrapper, true);
            fullScreenBtn.shadow = new createjs.Shadow("#9CC5FF", 0, 0, 16);
        });
        fullScreenBtn.on("mouseout", function () {
            animateIconWrapper(fullScreenBtnWrapper, false);
            fullScreenBtn.shadow = null;
        });
        fullScreenBtn.on("mousedown", function () {
            pressIconWrapper(fullScreenBtnWrapper);
        });
        fullScreenBtn.on("pressup", function () {
            releaseIconWrapper(fullScreenBtnWrapper);
        });
    }

    if (closeBtn) {
        closeBtn.mouseEnabled = true;
        closeBtn.visible = true;
        closeBtn.removeAllEventListeners("mouseover");
        closeBtn.removeAllEventListeners("mouseout");
        closeBtn.removeAllEventListeners("mousedown");
        closeBtn.removeAllEventListeners("pressup");
        closeBtn.on("mouseover", function () {
            animateIconWrapper(closeBtnWrapper, true);
            closeBtn.shadow = new createjs.Shadow("rgba(255,138,128,0.6)", 0, 0, 18);
        });
        closeBtn.on("mouseout", function () {
            animateIconWrapper(closeBtnWrapper, false);
            closeBtn.shadow = null;
        });
        closeBtn.on("mousedown", function () {
            pressIconWrapper(closeBtnWrapper);
        });
        closeBtn.on("pressup", function () {
            releaseIconWrapper(closeBtnWrapper);
        });
    }

    gameScoreTxt.visible = true;
    gameTimerTxt.visible = true;
    gameQCntTxt.visible = true;

    refreshHudValues();
    pulseHudCard(hudQuestionCardContainer);
}
 
///////////////////////////////////////////////////

function internetErrorFn() {
    pauseTimer()
    timeOverImg.visible = false;
    gameOverImg.visible = false;
    questionOverImg.visible = false;
    gameResponseTimerStop();
    correctSnd.stop();
    wrongSnd.stop();
    gameOverSnd.stop();
    tickSnd.stop();
    bgSnd.stop();

    if (typeof resultsOverlay !== "undefined" && resultsOverlay) {
        resultsOverlay.visible = false;
    }

    if (container.parent) {
        container.parent.removeAllChildren();
    }

    container4 = new createjs.Container();
    stage.addChild(container4)
    container4.parent.addChild(GameFinishedImg);
    GameFinishedImg.visible = true;

    container4.parent.addChild(closeBtnFinal);
    closeBtnFinal.visible = true;
    closeBtnFinal.addEventListener("click", closeGameFn);
    closeBtnFinal.cursor = "pointer";

    var setFinishedTxt = new createjs.Text("", "60px 'Baloo 2'", "white");
    setFinishedTxt.textAlign = "center";
    setFinishedTxt.textBaseline = "middle";
    setFinishedTxt.lineWidth = 1000
    setFinishedTxt.lineHeight = 63
    setFinishedTxt.x = 640;
    setFinishedTxt.y = 367;
    setFinishedTxt.visible = true;
    container4.parent.addChild(setFinishedTxt);

    if (intChkVar == 0) {
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "ઈન્ટરનેટ કનેક્શન નથી. ફરી પ્રયત્ન કરો...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "...لا يوجد اتصال بالإنترنت. حاول مرة اخرى";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "No Internet Connection. Please try again...";
        } else {
            setFinishedTxt.text = "No Internet Connection. Please try again...";

        }
    }
    if (intChkVar == 1) {
        // setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "                          તમે દરેક કોયડા ઉકેલી લીધા છે.                           પરિણામ જાણવા ઉપર દર્શાવેલ close પર ક્લિક કરો...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "                           ...لقد أكملت جميع الألغاز                           انقر على إغلاق في الأعلى لرؤية النتائج";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        } else {
            setFinishedTxt.text = "                          You have completed all the puzzles.                           Click close at top to see the results...";
        }
        if (container1.parent) {
            container1.parent.removeAllChildren();
        }

    } else if (intChkVar == 2) {
        // setFinishedTxt.text = "You have completed this puzzle...";
        if (assetsPathLang == "assets/GujaratiAssets/") {
            setFinishedTxt.text = "તમે આ કોયડો ઉકેલી લીધો છે...";
        } else if (assetsPathLang == "assets/ArabicAssets/") {
            setFinishedTxt.text = "...لقد أكملت هذا اللغز";
        } else if (assetsPathLang == "assets/TamilAssets/") {
            setFinishedTxt.text = "You have completed this puzzle...";
        } else {
            setFinishedTxt.text = "You have completed this puzzle...";
        }

        if (container1.parent) {
            container1.parent.removeAllChildren();
        }
    }




    if (setFinishedTxt.text.length <= 35) {
        setFinishedTxt.y = 407;
    } else if (setFinishedTxt.text.length <= 70) {
        setFinishedTxt.font = "bold 40px 'Baloo 2'"
        setFinishedTxt.y = 407;
    } else {
        setFinishedTxt.font = "bold 40px 'Baloo 2'"
        setFinishedTxt.y = 377;
    }
    intChkVar = -1

}