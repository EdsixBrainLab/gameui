//////////////////////////////////////////////////////////////////======LOADER=======///////////////////////////////////////////////////////////////////////
var wrongSnd, gameOverSnd, timeOverSnd, correctSnd, BetterLuck, Excellent, Nice, Good, Super, TryAgain;
var scoreImgMc, ResponseImgMc, questionImgMc, AttemptsImgMc, CorrectImgMc,uniquebackGround;
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
    loadProgressPercentLabel,
    loaderBar;
var lastDisplayedScore = null,
    lastDisplayedTime = null,
    lastDisplayedQuestion = null;
var howToPlayWaveTransferred = false;

function buildVectorArrowIcon() {
    var icon = new createjs.Container();

    var baseGlow = new createjs.Shape();
    baseGlow.graphics
        .clear()
        .beginRadialGradientFill(
            ["rgba(168,120,255,0.32)", "rgba(90,34,172,0)"],
            [0, 1],
            0,
            0,
            0,
            0,
            0,
            112
        )
        .drawEllipse(-88, -84, 176, 170);
    baseGlow.alpha = 0.64;

    var arrow = new createjs.Shape();
    var g = arrow.graphics;
    g.clear();
    g.setStrokeStyle(3.2, "round", "round");
    g.beginLinearGradientStroke(
        ["rgba(255,255,255,0.75)", "rgba(255,255,255,0.18)"],
        [0, 1],
        0,
        -66,
        0,
        78
    );
    g.beginLinearGradientFill(["#F7C7FF", "#CFA0FF", "#7C3AED"], [0, 0.5, 1], 0, -66, 0, 78);
    g.moveTo(0, 78);
    g.lineTo(42, 24);
    g.lineTo(24, 24);
    g.quadraticCurveTo(30, 16, 24, 10);
    g.lineTo(24, -54);
    g.quadraticCurveTo(0, -70, -24, -54);
    g.lineTo(-24, 10);
    g.quadraticCurveTo(-30, 16, -24, 24);
    g.lineTo(-42, 24);
    g.closePath();

    var bodyHighlight = new createjs.Shape();
    bodyHighlight.graphics
        .clear()
        .beginLinearGradientFill(
            ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.08)"],
            [0, 1],
            0,
            -50,
            0,
            64
        )
        .moveTo(0, 64)
        .lineTo(30, 24)
        .lineTo(16, 24)
        .quadraticCurveTo(22, 16, 16, 12)
        .lineTo(16, -46)
        .quadraticCurveTo(0, -58, -16, -46)
        .lineTo(-16, 12)
        .quadraticCurveTo(-22, 16, -16, 24)
        .lineTo(-30, 24)
        .closePath();
    bodyHighlight.alpha = 0.92;

    var edgeHighlight = new createjs.Shape();
    edgeHighlight.graphics
        .clear()
        .beginLinearGradientStroke(
            ["rgba(255,255,255,0.55)", "rgba(255,255,255,0)"],
            [0, 1],
            -24,
            -50,
            24,
            52
        )
        .setStrokeStyle(3.4, "round", "round")
        .moveTo(-22, -46)
        .quadraticCurveTo(-6, -60, 0, -60)
        .quadraticCurveTo(6, -60, 22, -46)
        .lineTo(22, 14)
        .quadraticCurveTo(28, 20, 20, 28)
        .lineTo(14, 28)
        .quadraticCurveTo(6, 56, 0, 64)
        .quadraticCurveTo(-6, 56, -14, 28)
        .lineTo(-20, 28)
        .quadraticCurveTo(-28, 20, -22, 14);
    edgeHighlight.alpha = 0.58;

    var coreShine = new createjs.Shape();
    coreShine.graphics
        .clear()
        .beginRadialGradientFill(
            ["rgba(255,255,255,0.45)", "rgba(255,255,255,0)"],
            [0, 1],
            0,
            24,
            0,
            0,
            24,
            48
        )
        .drawEllipse(-12, 20, 24, 28);

    icon.addChild(baseGlow, arrow, bodyHighlight, edgeHighlight, coreShine);
    icon.shadow = new createjs.Shadow("rgba(20,14,60,0.22)", 0, 6, 16);
    icon.mouseEnabled = false;
    icon.mouseChildren = false;
    icon.cache(-92, -102, 184, 206);
    icon.setBounds(-88, -92, 176, 182);
    icon.__tipGap = 22;
    icon.__bounceOffset = 12;

    icon.clone = function () {
        var clone = buildVectorArrowIcon();
        clone.scaleX = icon.scaleX;
        clone.scaleY = icon.scaleY;
        return clone;
    };

    return icon;
}


function buildVectorHandIcon() {
    var icon = new createjs.Container();

    var baseGlow = new createjs.Shape();
    baseGlow.graphics
        .clear()
        .beginRadialGradientFill(
            ["rgba(108,78,255,0.34)", "rgba(58,18,140,0)"],
            [0, 1],
            0,
            0,
            0,
            0,
            0,
            132
        )
        .drawEllipse(-114, -58, 228, 116);
    baseGlow.alpha = 0.6;

    var gestureTrail = new createjs.Shape();
    gestureTrail.graphics
        .clear()
        .setStrokeStyle(5.2, "round", "round")
        .beginLinearGradientStroke(
            ["rgba(236,209,255,0.46)", "rgba(129,140,248,0.18)"],
            [0, 1],
            -148,
            -86,
            126,
            116
        )
        .moveTo(-142, -38)
        .quadraticCurveTo(-78, 6, -18, 26)
        .quadraticCurveTo(56, 50, 118, 102);
    gestureTrail.alpha = 0.48;

    var hand = new createjs.Container();

    var hand = new createjs.Container();

    var cuff = new createjs.Shape();
    cuff.graphics
        .clear()
        .setStrokeStyle(2.6, "round", "round")
        .beginStroke("rgba(255,255,255,0.46)")
        .beginLinearGradientFill(["#4338CA", "#6D28D9", "#F472B6"], [0, 0.52, 1], -62, 154, 92, 228)
        .drawRoundRectComplex(-62, 154, 124, 74, 34, 32, 36, 38);

    var cuffHighlight = new createjs.Shape();
    cuffHighlight.graphics
        .clear()
        .beginLinearGradientFill(["rgba(255,255,255,0.78)", "rgba(255,255,255,0)"], [0, 1], -40, 168, 52, 208)
        .drawRoundRect(-46, 168, 92, 28, 18);
    cuffHighlight.alpha = 0.84;

    var cuffShadow = new createjs.Shape();
    cuffShadow.graphics
        .clear()
        .beginLinearGradientFill(["rgba(18,16,72,0.32)", "rgba(18,16,72,0)"], [0, 1], -58, 206, 68, 246)
        .drawRoundRect(-58, 204, 116, 26, 16);
    cuffShadow.alpha = 0.7;

    var palmBase = new createjs.Shape();
    palmBase.graphics
        .clear()
        .beginLinearGradientFill(["#FFE9F3", "#FDB6D1", "#F06292"], [0, 0.52, 1], -76, 58, 86, 216)
        .moveTo(-48, 86)
        .quadraticCurveTo(-92, 130, -62, 188)
        .quadraticCurveTo(-20, 244, 44, 210)
        .quadraticCurveTo(92, 184, 84, 124)
        .quadraticCurveTo(78, 74, 30, 74)
        .quadraticCurveTo(-6, 78, -6, 120)
        .quadraticCurveTo(-6, 142, 10, 156)
        .quadraticCurveTo(-32, 138, -28, 102)
        .quadraticCurveTo(-28, 88, -16, 82)
        .quadraticCurveTo(-28, 78, -48, 86)
        .closePath();

    var palmHighlight = new createjs.Shape();
    palmHighlight.graphics
        .clear()
        .beginLinearGradientFill(["rgba(255,255,255,0.86)", "rgba(255,255,255,0)"], [0, 1], -32, 86, 56, 196)
        .moveTo(-32, 96)
        .quadraticCurveTo(-62, 140, -24, 182)
        .quadraticCurveTo(20, 220, 66, 184)
        .quadraticCurveTo(84, 156, 66, 118)
        .quadraticCurveTo(40, 92, 6, 102)
        .quadraticCurveTo(-12, 116, 0, 146)
        .quadraticCurveTo(-24, 134, -22, 104)
        .quadraticCurveTo(-22, 92, -12, 88)
        .quadraticCurveTo(-20, 84, -32, 96)
        .closePath();
    palmHighlight.alpha = 0.82;

    var palmShadow = new createjs.Shape();
    palmShadow.graphics
        .clear()
        .beginLinearGradientFill(["rgba(236,72,153,0.34)", "rgba(236,72,153,0)"], [0, 1], -42, 120, 56, 214)
        .moveTo(-18, 118)
        .quadraticCurveTo(30, 164, 74, 148)
        .quadraticCurveTo(26, 198, -4, 178)
        .quadraticCurveTo(-34, 154, -18, 118)
        .closePath();
    palmShadow.alpha = 0.68;

    var thumb = new createjs.Shape();
    thumb.graphics
        .clear()
        .beginLinearGradientFill(["#FFF0F6", "#FCC5D9", "#FB7185"], [0, 0.48, 1], -104, 108, 0, 206)
        .moveTo(-40, 100)
        .quadraticCurveTo(-108, 134, -90, 188)
        .quadraticCurveTo(-68, 232, -16, 208)
        .quadraticCurveTo(18, 188, -2, 142)
        .quadraticCurveTo(-18, 110, -40, 100)
        .closePath();
    palmShadow.alpha = 0.72;

    var thumbShadow = new createjs.Shape();
    thumbShadow.graphics
        .clear()
        .beginLinearGradientFill(["rgba(236,72,153,0.3)", "rgba(236,72,153,0)"], [0, 1], -78, 154, -6, 214)
        .moveTo(-32, 126)
        .quadraticCurveTo(-72, 174, -38, 206)
        .quadraticCurveTo(-6, 222, 0, 188)
        .quadraticCurveTo(-10, 156, -20, 142)
        .closePath();
    thumbShadow.alpha = 0.64;

    var thumbHighlight = new createjs.Shape();
    thumbHighlight.graphics
        .clear()
        .beginLinearGradientFill(["rgba(255,255,255,0.82)", "rgba(255,255,255,0)"], [0, 1], -64, 120, -2, 194)
        .moveTo(-36, 110)
        .quadraticCurveTo(-86, 144, -72, 188)
        .quadraticCurveTo(-50, 220, -14, 204)
        .quadraticCurveTo(10, 190, -4, 154)
        .quadraticCurveTo(-16, 126, -36, 110)
        .closePath();
    thumbHighlight.alpha = 0.76;

    var curledFingers = new createjs.Shape();
    curledFingers.graphics
        .clear()
        .beginLinearGradientFill(["#FFF6FB", "#F9C0D7", "#EC4899"], [0, 0.5, 1], -30, 18, 50, 148)
        .moveTo(-24, 72)
        .quadraticCurveTo(-60, 18, -20, -14)
        .quadraticCurveTo(16, -42, 34, 10)
        .quadraticCurveTo(46, 54, 18, 90)
        .quadraticCurveTo(-2, 116, -24, 98)
        .closePath();

    var curledHighlight = new createjs.Shape();
    curledHighlight.graphics
        .clear()
        .beginLinearGradientFill(["rgba(255,255,255,0.88)", "rgba(255,255,255,0)"], [0, 1], -16, 0, 40, 108)
        .moveTo(-16, 62)
        .quadraticCurveTo(-38, 18, -6, -6)
        .quadraticCurveTo(20, -22, 30, 22)
        .quadraticCurveTo(40, 56, 16, 86)
        .quadraticCurveTo(-2, 102, -16, 88)
        .closePath();
    curledHighlight.alpha = 0.78;

    var indexFinger = new createjs.Shape();
    indexFinger.graphics
        .clear()
        .beginLinearGradientFill(["#FFFDFC", "#FFD6E5", "#F472B6"], [0, 0.52, 1], -24, -148, 40, 164)
        .moveTo(0, -152)
        .quadraticCurveTo(-16, -148, -22, -118)
        .quadraticCurveTo(-32, -72, -22, -14)
        .quadraticCurveTo(-12, 54, -12, 112)
        .quadraticCurveTo(-12, 160, 8, 184)
        .quadraticCurveTo(28, 204, 48, 170)
        .quadraticCurveTo(60, 138, 54, 62)
        .quadraticCurveTo(46, -18, 28, -104)
        .quadraticCurveTo(16, -144, 0, -152)
        .closePath();

    var indexShadow = new createjs.Shape();
    indexShadow.graphics
        .clear()
        .beginLinearGradientFill(["rgba(236,72,153,0.4)", "rgba(236,72,153,0)"], [0, 1], -8, -12, 48, 140)
        .moveTo(-14, -30)
        .quadraticCurveTo(34, -8, 32, 90)
        .quadraticCurveTo(22, 146, 0, 148)
        .quadraticCurveTo(-18, 118, -14, -30)
        .closePath();
    indexShadow.alpha = 0.56;

    var indexHighlight = new createjs.Shape();
    indexHighlight.graphics
        .clear()
        .beginRadialGradientFill(
            ["rgba(255,255,255,0.94)", "rgba(255,255,255,0)"],
            [0, 1],
            14,
            -114,
            0,
            14,
            -114,
            54
        )
        .drawEllipse(-4, -138, 28, 102);
    indexHighlight.alpha = 0.88;

    var fingerNail = new createjs.Shape();
    fingerNail.graphics
        .clear()
        .beginLinearGradientFill(["#FFE8ED", "#FFD1DA"], [0, 1], -4, -138, 16, -110)
        .drawRoundRectComplex(-10, -134, 20, 26, 10, 10, 12, 12);
    fingerNail.alpha = 0.9;

    var knuckleLines = new createjs.Shape();
    knuckleLines.graphics
        .clear()
        .setStrokeStyle(1.8, "round", "round")
        .beginStroke("rgba(255,255,255,0.56)")
        .moveTo(-26, 114)
        .quadraticCurveTo(-4, 126, 18, 114)
        .moveTo(-20, 68)
        .quadraticCurveTo(6, 56, 26, 68)
        .moveTo(-14, 26)
        .quadraticCurveTo(8, 18, 26, 26);
    knuckleLines.alpha = 0.66;

    hand.addChild(
        cuffShadow,
        cuff,
        cuffHighlight,
        palmBase,
        palmShadow,
        palmHighlight,
        thumb,
        thumbShadow,
        thumbHighlight,
        curledFingers,
        curledHighlight,
        indexShadow,
        indexFinger,
        fingerNail,
        indexHighlight,
        knuckleLines
    );

    var fingertip = { x: 0, y: -152 };

    var fingertipAura = new createjs.Shape();
    fingertipAura.graphics
        .clear()
        .beginRadialGradientFill(
            ["rgba(255,250,255,0.92)", "rgba(236,72,153,0)"],
            [0, 1],
            0,
            0,
            0,
            0,
            0,
            52
        )
        .drawCircle(0, 0, 52);
    fingertipAura.alpha = 0.86;

    var burst = new createjs.Shape();
    var burstGraphics = burst.graphics;
    burstGraphics.clear();
    burstGraphics.setStrokeStyle(2.6, "round", "round");
    burstGraphics.beginStroke("rgba(129,140,248,0.88)");
    var burstRadius = 82;
    for (var i = 0; i < 8; i++) {
        var angle = -Math.PI / 2 + (i * Math.PI) / 4;
        var inner = burstRadius - 16;
        var outer = burstRadius;
        var cx = Math.cos(angle);
        var cy = Math.sin(angle);
        burstGraphics.moveTo(cx * inner, cy * inner);
        burstGraphics.lineTo(cx * outer, cy * outer);
    }
    burst.alpha = 0.44;

    var burstPieces = new createjs.Container();
    var palette = ["#7C3AED", "#C084FC", "#F9A8D4"];
    for (var j = 0; j < 6; j++) {
        var piece = new createjs.Shape();
        var color = palette[j % palette.length];
        var pieceGraphics = piece.graphics;
        pieceGraphics.clear();
        var pieceAngle = -Math.PI / 2 + (j * Math.PI) / 3;
        var radius = 60;
        var px = Math.cos(pieceAngle) * radius;
        var py = Math.sin(pieceAngle) * radius;
        if (j % 3 === 0) {
            pieceGraphics.beginFill(color).drawCircle(0, 0, 7);
        } else if (j % 3 === 1) {
            pieceGraphics.beginFill(color).drawRoundRect(-7, -4, 14, 8, 4);
        } else {
            pieceGraphics.beginFill(color)
                .moveTo(0, -9)
                .lineTo(7, 5)
                .lineTo(-7, 5)
                .closePath();
        }
        piece.alpha = 0.92;
        piece.x = px;
        piece.y = py;
        piece.rotation = (pieceAngle * 180) / Math.PI;
        burstPieces.addChild(piece);
    }

    var tapPulse = new createjs.Shape();
    tapPulse.graphics
        .clear()
        .setStrokeStyle(4.6, "round", "round")
        .beginStroke("rgba(236,72,153,0.7)")
        .drawCircle(0, 0, 28);
    tapPulse.alpha = 0;

    createjs.Tween.get(tapPulse, { loop: true })
        .wait(260)
        .to({ alpha: 0.85, scaleX: 1.1, scaleY: 1.1 }, 320, createjs.Ease.quadOut)
        .to({ alpha: 0, scaleX: 1.44, scaleY: 1.44 }, 280, createjs.Ease.quadIn)
        .wait(320)
        .set({ scaleX: 1, scaleY: 1 });

    var effects = new createjs.Container();
    fingertipAura.x = 0;
    fingertipAura.y = fingertip.y;
    burst.x = 0;
    burst.y = fingertip.y;
    burstPieces.x = 0;
    burstPieces.y = fingertip.y;
    tapPulse.x = 0;
    tapPulse.y = fingertip.y;
    effects.addChild(fingertipAura, burst, burstPieces, tapPulse);

    icon.addChild(baseGlow, gestureTrail, hand, effects);

    hand.regX = fingertip.x;
    hand.regY = fingertip.y;
    hand.rotation = -38;

    effects.regX = fingertip.x;
    effects.regY = fingertip.y;
    effects.rotation = -38;

    baseGlow.x = -12;
    baseGlow.y = 106;
    gestureTrail.x = -8;
    gestureTrail.y = 70;

    icon.mouseEnabled = false;
    icon.mouseChildren = false;
    icon.shadow = new createjs.Shadow("rgba(18,14,64,0.3)", 0, 12, 30);
    icon.cache(-228, -300, 456, 560);

    icon.__pointerTipBase = { x: 0, y: 0 };
    icon.__pointerTip = icon.__pointerTipBase;
    icon.__baseScale = 0.64;
    icon.__pressDistanceBase = 22;
    icon.__pressDistance = icon.__pressDistanceBase;

    icon.clone = function () {
        var clone = buildVectorHandIcon();
        clone.scaleX = icon.scaleX;
        clone.scaleY = icon.scaleY;
        return clone;
    };

    return icon;
}



function buildVectorCursorIcon() {
    var icon = new createjs.Container();

    var halo = new createjs.Shape();
    halo.graphics
        .clear()
        .beginRadialGradientFill([
            "rgba(198,181,255,0.45)",
            "rgba(198,181,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 48)
        .drawCircle(0, 0, 48);
    halo.alpha = 0.82;

    var inner = new createjs.Shape();
    inner.graphics
        .clear()
        .beginLinearGradientFill(["#22D3EE", "#6366F1"], [0, 1], -24, -24, 28, 28)
        .drawCircle(0, 0, 24);
    inner.shadow = new createjs.Shadow("rgba(14,18,48,0.28)", 0, 6, 16);

    var ring = new createjs.Shape();
    ring.graphics
        .clear()
        .setStrokeStyle(3)
        .beginLinearGradientStroke(["rgba(255,255,255,0.95)", "rgba(255,255,255,0.25)"], [0, 1], -26, -26, 26, 26)
        .drawCircle(0, 0, 28);

    var tip = new createjs.Shape();
    tip.graphics
        .clear()
        .beginLinearGradientFill(["#F8FAFC", "#C084FC"], [0, 1], -9, -30, 21, 16)
        .moveTo(-9, -9)
        .lineTo(21, 9)
        .lineTo(0, 32)
        .closePath();
    tip.shadow = new createjs.Shadow("rgba(18,16,46,0.26)", 0, 4, 12);

    var tipHighlight = new createjs.Shape();
    tipHighlight.graphics
        .clear()
        .beginLinearGradientStroke(["rgba(255,255,255,0.9)", "rgba(255,255,255,0)"], [0, 1], -6, -18, 12, 10)
        .moveTo(-4, -6)
        .lineTo(12, 6)
        .lineTo(0, 22);
    tipHighlight.alpha = 0.65;

    icon.addChild(halo, inner, ring, tip, tipHighlight);
    icon.mouseEnabled = false;
    icon.mouseChildren = false;
    icon.shadow = new createjs.Shadow("rgba(18,16,48,0.2)", 0, 6, 18);
    icon.cache(-70, -70, 140, 140);

    icon.clone = function () {
        var clone = buildVectorCursorIcon();
        clone.scaleX = icon.scaleX;
        clone.scaleY = icon.scaleY;
        return clone;
    };

    return icon;
}


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
                background: ["rgba(104,122,255,0.98)", "rgba(162,108,255,0.96)"],
                accent: ["rgba(255,210,158,0.86)", "rgba(255,162,132,0.45)"],
                iconStyle: {
                    fill: "#E879F9",
                    gradient: ["#F0ABFC", "#C084FC"],
                    strokeColor: "rgba(76,29,149,0.8)",
                    strokeWidth: 2.6,
                    shadow: { color: "rgba(5,10,32,0.6)", x: 0, y: 3, blur: 14 }
                },
                ambient: {
                    halo: "rgba(238,208,255,0.88)",
                    haloAlpha: 0.78,
                    ring: "rgba(204,148,255,0.84)",
                    ringAlpha: 0.78,
                    spark: "#F7C7FF",
                    sparkAlpha: 0.92
                }
            },
            question: {
                background: ["rgba(92,150,255,0.97)", "rgba(148,126,255,0.95)"],
                accent: ["rgba(156,228,255,0.74)", "rgba(132,184,255,0.4)"],
                iconStyle: {
                    fill: "#93A5FD",
                    gradient: ["#A5B4FC", "#6366F1"],
                    strokeColor: "#4338CA",
                    strokeWidth: 3.2,
                    shadow: { color: "rgba(6,14,40,0.55)", x: 0, y: 3, blur: 12 }
                },
                ambient: {
                    halo: "rgba(188,214,255,0.92)",
                    haloAlpha: 0.74,
                    ring: "rgba(150,182,255,0.86)",
                    ringAlpha: 0.78,
                    spark: "#9DD7FF",
                    sparkAlpha: 0.9
                }
            },
            timer: {
                background: ["rgba(74,206,230,0.97)", "rgba(112,158,255,0.95)"],
                accent: ["rgba(134,244,216,0.76)", "rgba(144,202,255,0.42)"],
                iconStyle: {
                    fill: "#38BDF8",
                    gradient: ["#7DD3FC", "#0EA5E9"],
                    strokeColor: "#000",
                    strokeWidth: 3.2,
                    shadow: { color: "rgba(4,18,36,0.55)", x: 0, y: 3, blur: 10 }
                },
                ambient: {
                    halo: "rgba(164,232,255,0.9)",
                    haloAlpha: 0.74,
                    ring: "rgba(150,208,255,0.86)",
                    ringAlpha: 0.78,
                    spark: "#A5F3FF",
                    sparkAlpha: 0.92
                }
            }
        },
        cardBackgroundAlpha: 1,
        cardAccentAlpha: 1,
        cardHighlight: {
            colors: ["rgba(255,255,255,0.52)", "rgba(255,255,255,0.08)"],
            alpha: 0.48
        },
        cardDecor: {
            outline: { color: "rgba(202,218,255,0.82)", alpha: 0.96, width: 1.2 },
            accentOutline: { color: "rgba(226,208,255,0.88)", alpha: 0.94, width: 1.1 },
glass: { colors: ["rgba(255,255,255,0.86)", "rgba(255,255,255,0.16)"], alpha: 0.78, heightRatio: 0.64 },
            bottomGlow: { colors: ["rgba(124,156,255,0.1)", "rgba(208,140,255,0.5)"], alpha: 0.72 }
        },
        textStyles: {
            label: {
                color: "#F7F9FF",
                shadow: { color: "rgba(4,10,24,0.72)", x: 0, y: 3, blur: 9 }
            },
            value: {
                color: "#FFFFFF",
                shadow: { color: "rgba(4,12,30,0.76)", x: 0, y: 5, blur: 14 }
            },
            timerValue: {
                color: "#FFFFFF",
                shadow: { color: "rgba(4,12,30,0.76)", x: 0, y: 5, blur: 14 }
            }
        },
        questionProgress: {
            background: "rgba(18,36,76,0.5)",
            fill: ["#8896FF", "#FF8AF2"]
        },
        controlBackground: {
            colors: ["rgba(42,62,138,0.78)", "rgba(68,46,128,0.74)"],
            alpha: 0.96
        },
        controlGlass: {
            highlight: { colors: ["rgba(255,255,255,0.82)", "rgba(255,255,255,0.1)"], alpha: 0.88, heightRatio: 0.62 },
            glow: { colors: ["rgba(120,104,255,0.12)", "rgba(255,150,230,0.38)"], alpha: 0.74, heightRatio: 0.6 },
            outline: { color: "rgba(204,220,255,0.58)", alpha: 0.96, width: 1.1 }
        },
        controlPalette: {
            volume: { primary: "rgba(118,182,255,0.94)", glow: "rgba(118,182,255,0.62)" },
            fullscreen: { primary: "rgba(184,150,255,0.94)", glow: "rgba(184,150,255,0.6)" },
            close: { primary: "rgba(255,140,170,0.96)", glow: "rgba(255,140,170,0.66)" }
        },
        iconWrapper: {
            ringColor: "rgba(204,218,255,0.86)",
            ringAlpha: 0.94,
            hoverRingAlpha: 1,
            glowAlpha: 0.72,
            hoverGlowAlpha: 0.92,
            backgroundGradient: ["rgba(74,92,188,0.96)", "rgba(42,50,124,0.82)"],
            backgroundAlpha: 0.98,
            //highlightGradient: ["rgba(255,255,255,0.94)", "rgba(255,255,255,0.16)"],
            highlightAlpha: 0.82,
            stroke: { color: "rgba(216,230,255,0.54)", width: 1.2, alpha: 0.98 }
        },
        timerCritical: {
            warning: {
                background: ["rgba(255,213,160,0.9)", "rgba(255,187,124,0.9)"],
                accent: ["rgba(255,204,140,0.58)", "rgba(255,204,140,0.25)"],
                icon: "#A4472D",
                text: "#592716"
            },
            danger: {
                background: ["rgba(255,184,196,0.92)", "rgba(255,136,156,0.92)"],
                accent: ["rgba(255,150,170,0.6)", "rgba(255,150,170,0.24)"],
                icon: "#8F1E2C",
                text: "#520F18"
            },
            normalIcon: "#9DE9FF",
            normalText: "#F7FAFF"
        }
    },
    light: {
        cards: {
            score: {
                background: ["rgba(255,234,214,0.98)", "rgba(255,205,176,0.96)"],
                accent: ["rgba(255,189,116,0.72)", "rgba(255,173,128,0.32)"],
                iconStyle: {
                    fill: "#F472B6",
                    gradient: ["#FBCFE8", "#EC4899"],
                    strokeColor: "rgba(76,29,149,0.8)",
                    strokeWidth: 2.6,
                    shadow: { color: "rgba(152,64,18,0.3)", x: 0, y: 2, blur: 11 }
                },
                ambient: {
                    halo: "rgba(255,208,232,0.92)",
                    haloAlpha: 0.78,
                    ring: "rgba(255,162,206,0.78)",
                    ringAlpha: 0.76,
                    spark: "#FFC3E2",
                    sparkAlpha: 0.92
                }
            },
            question: {
                background: ["rgba(230,238,255,0.98)", "rgba(204,216,255,0.96)"],
                accent: ["rgba(164,210,255,0.7)", "rgba(178,176,255,0.32)"],
                iconStyle: {
                    fill: "#667BFF",
                    gradient: ["#93C5FD", "#6366F1"],
                    strokeColor: "#4338CA",
                    strokeWidth: 3.2,
                    shadow: { color: "rgba(37,99,235,0.3)", x: 0, y: 2, blur: 10 }
                },
                ambient: {
                    halo: "rgba(198,210,255,0.9)",
                    haloAlpha: 0.76,
                    ring: "rgba(158,188,255,0.82)",
                    ringAlpha: 0.74,
                    spark: "#9AB8FF",
                    sparkAlpha: 0.92
                }
            },
            timer: {
                background: ["rgba(222,246,252,0.98)", "rgba(188,232,242,0.96)"],
                accent: ["rgba(148,232,208,0.7)", "rgba(156,214,255,0.3)"],
                iconStyle: {
                    fill: "#1EA7FF",
                    gradient: ["#7CD4FD", "#0EA5E9"],
                    strokeColor: "#000",
                    strokeWidth: 3.1,
                    shadow: { color: "rgba(34,116,165,0.38)", x: 0, y: 2, blur: 10 }
                },
                ambient: {
                    halo: "rgba(196,240,255,0.92)",
                    haloAlpha: 0.78,
                    ring: "rgba(176,214,255,0.84)",
                    ringAlpha: 0.76,
                    spark: "#7DD3FC",
                    sparkAlpha: 0.92
                }
            }
        },
        cardBackgroundAlpha: 1,
        cardAccentAlpha: 1,
        cardHighlight: {
            colors: ["rgba(255,255,255,0.58)", "rgba(255,255,255,0.12)"],
            alpha: 0.52
        },
        cardDecor: {
            outline: { color: "rgba(78,118,196,0.3)", alpha: 0.96, width: 1.2 },
            accentOutline: { color: "rgba(98,142,216,0.42)", alpha: 0.9, width: 1.1 },
            glass: { colors: ["rgba(255,255,255,0.96)", "rgba(255,255,255,0.4)"], alpha: 0.78, heightRatio: 0.64 },
            bottomGlow: { colors: ["rgba(148,192,255,0.08)", "rgba(250,170,212,0.42)"], alpha: 0.6 }
        },
        textStyles: {
            label: {
                color: "#2B3E66",
                shadow: { color: "rgba(18,42,92,0.18)", x: 0, y: 3, blur: 8 }
            },
            value: {
                color: "#15274A",
                shadow: { color: "rgba(20,46,108,0.26)", x: 0, y: 4, blur: 12 }
            },
            timerValue: {
                color: "#15274A",
                shadow: { color: "rgba(20,46,108,0.26)", x: 0, y: 4, blur: 12 }
            }
        },
        questionProgress: {
            background: "rgba(48,92,162,0.2)",
            fill: ["#6366F1", "#EC4899"]
        },
        controlBackground: {
            colors: ["rgba(255,255,255,0.92)", "rgba(232,242,255,0.9)"],
            alpha: 0.98
        },
        controlGlass: {
            highlight: { colors: ["rgba(255,255,255,0.96)", "rgba(255,255,255,0.36)"], alpha: 0.92, heightRatio: 0.62 },
            glow: { colors: ["rgba(125,111,255,0.12)", "rgba(255,164,226,0.34)"], alpha: 0.6, heightRatio: 0.52 },
            outline: { color: "rgba(126,164,232,0.46)", alpha: 0.95, width: 1.1 }
        },
        controlPalette: {
            volume: { primary: "rgba(92,142,236,0.98)", glow: "rgba(92,142,236,0.64)" },
            fullscreen: { primary: "rgba(142,118,255,0.98)", glow: "rgba(142,118,255,0.64)" },
            close: { primary: "rgba(242,124,142,0.98)", glow: "rgba(242,124,142,0.66)" }
        },
        iconWrapper: {
            ringColor: "rgba(112,148,220,0.68)",
            ringAlpha: 0.86,
            hoverRingAlpha: 1,
            glowAlpha: 0.66,
            hoverGlowAlpha: 0.86,
            backgroundGradient: ["rgba(244,232,255,0.96)", "rgba(210,220,255,0.9)"],
            backgroundAlpha: 1,
            highlightGradient: ["rgba(255,255,255,0.98)", "rgba(255,255,255,0.44)"],
            highlightAlpha: 0.92,
            stroke: { color: "rgba(118,162,228,0.52)", width: 1.1, alpha: 0.96 }
        },
        timerCritical: {
            warning: {
                background: ["rgba(255,235,195,0.97)", "rgba(255,209,150,0.94)"],
                accent: ["rgba(255,210,150,0.6)", "rgba(255,210,150,0.28)"],
                icon: "#B45309",
                text: "#8B4007"
            },
            danger: {
                background: ["rgba(255,212,220,0.97)", "rgba(255,168,186,0.94)"],
                accent: ["rgba(255,178,194,0.6)", "rgba(255,178,194,0.28)"],
                icon: "#BE123C",
                text: "#9F1239"
            },
            normalIcon: "#6366F1",
            normalText: "#1F2F4E"
        }
    }
};



function getCanvasScale(axis) {
    if (typeof stage !== "undefined" && stage) {
        var scale = axis === "y" ? stage.scaleY : stage.scaleX;
        if (typeof scale === "number" && !isNaN(scale) && scale !== 0) {
            return scale;
        }
    }
    return 1;
}

function getLogicalCanvasWidth() {
    if (typeof canvas !== "undefined" && canvas && typeof canvas.width === "number") {
        var scaleX = getCanvasScale("x");
        return canvas.width / scaleX;
    }
    return 1280;
}

function getLogicalCanvasHeight() {
    if (typeof canvas !== "undefined" && canvas && typeof canvas.height === "number") {
        var scaleY = getCanvasScale("y");
        return canvas.height / scaleY;
    }
    return 720;
}

function getCanvasCenterX() {
    return getLogicalCanvasWidth() / 2;
}

var lastResponsiveLayoutWidth = null,
    lastResponsiveLayoutHeight = null,
    responsiveResizeListenerAttached = false;

function getCanvasMetrics() {
    var width = getLogicalCanvasWidth();
    var height = getLogicalCanvasHeight();

    return {
        width: width,
        height: height,
        centerX: width / 2,
        centerY: height / 2
    };
}

function getHudElementWidth(element, fallbackWidth) {
    if (!element) {
        return fallbackWidth || 0;
    }

    if (typeof element.__layoutWidth === "number") {
        return element.__layoutWidth;
    }

    if (element.backgroundShape && typeof element.backgroundShape.__width === "number") {
        return element.backgroundShape.__width;
    }

    if (element.cardShape && element.cardShape.getBounds) {
        var cardBounds = element.cardShape.getBounds();
        if (cardBounds) {
            return cardBounds.width;
        }
    }

    if (element.getBounds) {
        var bounds = element.getBounds();
        if (bounds) {
            return bounds.width;
        }
    }

    if (element.nominalBounds) {
        return element.nominalBounds.width;
    }

    return fallbackWidth || 0;
}

function layoutOverlayToCanvas(overlay, baseWidth, baseHeight) {
    if (!overlay) {
        return;
    }

    var metrics = getCanvasMetrics();
    var stageWidth = metrics.width;
    var stageHeight = metrics.height;

    var referenceWidth = baseWidth || overlay.__baseWidth || stageWidth;
    var referenceHeight = baseHeight || overlay.__baseHeight || stageHeight;

    if (!referenceWidth || !referenceHeight) {
        return;
    }

    var scaleX = stageWidth / referenceWidth;
    var scaleY = stageHeight / referenceHeight;
    var scale = Math.min(scaleX, scaleY);

    overlay.scaleX = overlay.scaleY = scale;

    var offsetX = (stageWidth - referenceWidth * scale) / 2;
    var offsetY = (stageHeight - referenceHeight * scale) / 2;

    overlay.x = offsetX;
    overlay.y = offsetY;
}

if (typeof globalThis !== "undefined") {
    globalThis.layoutOverlayToCanvas = layoutOverlayToCanvas;
}

function buildGameplayBackdrop() {
    var width = 1360;
    var height = 768;

    var backdrop = new createjs.Container();
    backdrop.name = "GameplayBackdrop";
    backdrop.mouseEnabled = false;
    backdrop.mouseChildren = false;

    var base = new createjs.Shape();
    base.graphics
        .beginLinearGradientFill(["#130B3A", "#1F1551", "#2C1C69", "#3A1B6F"], [0, 0.32, 0.68, 1], 0, 0, width, height)
        .drawRect(0, 0, width, height);
    backdrop.addChild(base);

    var horizonGlow = new createjs.Shape();
    horizonGlow.graphics
        .beginRadialGradientFill(
            ["rgba(124,87,255,0)", "rgba(155,78,255,0.52)", "rgba(252,146,222,0)"],
            [0, 0.68, 1],
            width * 0.5,
            height * 0.62,
            width * 0.1,
            width * 0.5,
            height * 0.62,
            width * 0.76
        )
        .drawRect(0, 0, width, height);
    horizonGlow.alpha = 0.58;
    horizonGlow.compositeOperation = "lighter";
    backdrop.addChild(horizonGlow);

    var topGlow = new createjs.Shape();
    topGlow.graphics
        .beginRadialGradientFill(
            ["rgba(255,188,244,0.38)", "rgba(166,130,255,0.2)", "rgba(110,76,210,0)"],
            [0, 0.78, 1],
            width * 0.26,
            height * 0.08,
            width * 0.05,
            width * 0.26,
            height * 0.08,
            width * 0.34
        )
        .drawRect(0, 0, width, height);
    topGlow.alpha = 0.45;
    topGlow.compositeOperation = "lighter";
    backdrop.addChild(topGlow);

    var deepVignette = new createjs.Shape();
    deepVignette.graphics
        .beginRadialGradientFill(["rgba(24, 12, 48, 0)", "rgba(24, 12, 48, 0.78)", "rgba(10, 4, 26, 0.94)"], [0, 0.72, 1], width / 2, height * 0.64, width * 0.12, width / 2, height * 0.64, width * 0.78)
        .drawRect(0, 0, width, height);
    deepVignette.alpha = 0.88;
    backdrop.addChild(deepVignette);

    var auroraGroup = new createjs.Container();
    auroraGroup.mouseChildren = auroraGroup.mouseEnabled = false;

    var upperAurora = new createjs.Shape();
    upperAurora.graphics
        .beginLinearGradientFill([
            "rgba(163, 134, 255, 0.16)",
            "rgba(195, 124, 255, 0.58)",
            "rgba(255, 164, 236, 0.18)"
        ], [0, 0.54, 1], 0, 0, width, 0)
        .moveTo(-width * 0.2, height * 0.16)
        .bezierCurveTo(width * 0.14, -height * 0.04, width * 0.58, height * 0.2, width * 1.12, height * 0.08)
        .lineTo(width * 1.12, height * 0.22)
        .bezierCurveTo(width * 0.64, height * 0.32, width * 0.2, height * 0.14, -width * 0.12, height * 0.24)
        .closePath();
    upperAurora.alpha = 0.82;
    upperAurora.compositeOperation = "lighter";
    auroraGroup.addChild(upperAurora);

    var midAurora = new createjs.Shape();
    midAurora.graphics
        .beginLinearGradientFill([
            "rgba(122, 102, 255, 0.18)",
            "rgba(150, 118, 255, 0.44)",
            "rgba(255, 153, 228, 0.2)"
        ], [0, 0.58, 1], 0, height * 0.5, width, height * 0.5)
        .moveTo(-width * 0.18, height * 0.42)
        .bezierCurveTo(width * 0.18, height * 0.32, width * 0.62, height * 0.52, width * 1.08, height * 0.44)
        .lineTo(width * 1.08, height * 0.58)
        .bezierCurveTo(width * 0.64, height * 0.66, width * 0.22, height * 0.48, -width * 0.12, height * 0.56)
        .closePath();
    midAurora.alpha = 0.72;
    midAurora.compositeOperation = "lighter";
    auroraGroup.addChild(midAurora);

    var lowerAurora = new createjs.Shape();
    lowerAurora.graphics
        .beginLinearGradientFill([
            "rgba(118, 102, 255, 0.16)",
            "rgba(168, 112, 255, 0.34)",
            "rgba(255, 150, 222, 0.16)"
        ], [0, 0.56, 1], 0, height, width, height)
        .moveTo(-width * 0.22, height * 0.74)
        .bezierCurveTo(width * 0.18, height * 0.58, width * 0.62, height * 0.94, width * 1.12, height * 0.86)
        .lineTo(width * 1.12, height * 1.04)
        .bezierCurveTo(width * 0.66, height * 1.14, width * 0.24, height * 0.86, -width * 0.14, height * 0.96)
        .closePath();
    lowerAurora.alpha = 0.66;
    lowerAurora.compositeOperation = "lighter";
    auroraGroup.addChild(lowerAurora);

    backdrop.addChild(auroraGroup);

    var glowLayer = new createjs.Container();
    glowLayer.mouseChildren = glowLayer.mouseEnabled = false;

    var topLeftGlow = createBackdropGlow(width * 0.36, ["rgba(255,170,237,0.58)", "rgba(67,26,104,0)"]);
    topLeftGlow.x = width * 0.12;
    topLeftGlow.y = height * 0.14;
    glowLayer.addChild(topLeftGlow);

    var midGlow = createBackdropGlow(width * 0.58, ["rgba(145,128,255,0.55)", "rgba(34,18,84,0)"]);
    midGlow.x = width * 0.48;
    midGlow.y = height * 0.56;
    glowLayer.addChild(midGlow);

    var bottomRightGlow = createBackdropGlow(width * 0.46, ["rgba(255,156,225,0.48)", "rgba(28,16,72,0)"]);
    bottomRightGlow.x = width * 0.84;
    bottomRightGlow.y = height * 0.76;
    glowLayer.addChild(bottomRightGlow);

    glowLayer.alpha = 0.85;
    backdrop.addChild(glowLayer);

    var beamLayer = new createjs.Container();
    beamLayer.mouseEnabled = beamLayer.mouseChildren = false;
    var beams = [];
    for (var b = 0; b < 3; b++) {
        var beam = new createjs.Shape();
        var beamWidth = width * (0.12 + b * 0.02);
        beam.graphics
            .beginLinearGradientFill(
                ["rgba(151,120,255,0)", "rgba(151,120,255,0.34)", "rgba(255,164,236,0)"],
                [0, 0.52, 1],
                0,
                0,
                beamWidth,
                0
            )
            .drawRoundRect(-beamWidth / 2, -height * 0.3, beamWidth, height * 0.6, beamWidth * 0.4);
        beam.alpha = 0.42 + b * 0.08;
        beam.x = width * (0.28 + 0.24 * b);
        beam.y = height * (0.56 + b * 0.04);
        beam.rotation = -6 + b * 4;
        beam.compositeOperation = "lighter";
        beamLayer.addChild(beam);
        beams.push(beam);
    }
    backdrop.addChild(beamLayer);

    var constellationLayer = new createjs.Shape();
    var constellationGraphics = constellationLayer.graphics;
    constellationGraphics
        .setStrokeStyle(1.4)
        .beginStroke("rgba(181,212,255,0.35)")
        .moveTo(width * 0.16, height * 0.32)
        .bezierCurveTo(width * 0.28, height * 0.22, width * 0.48, height * 0.28, width * 0.62, height * 0.26)
        .bezierCurveTo(width * 0.78, height * 0.24, width * 0.88, height * 0.32, width * 0.92, height * 0.42);
    constellationGraphics
        .moveTo(width * 0.18, height * 0.52)
        .bezierCurveTo(width * 0.34, height * 0.46, width * 0.56, height * 0.6, width * 0.74, height * 0.5)
        .bezierCurveTo(width * 0.86, height * 0.44, width * 0.92, height * 0.54, width * 0.94, height * 0.64);
    constellationGraphics
        .moveTo(width * 0.1, height * 0.68)
        .bezierCurveTo(width * 0.28, height * 0.62, width * 0.46, height * 0.74, width * 0.68, height * 0.68)
        .bezierCurveTo(width * 0.82, height * 0.64, width * 0.9, height * 0.72, width * 0.92, height * 0.8);
    constellationLayer.alpha = 0.42;
    constellationLayer.compositeOperation = "lighter";
    backdrop.addChild(constellationLayer);

    var ringLayer = new createjs.Container();
    ringLayer.mouseEnabled = ringLayer.mouseChildren = false;
    var rings = [];
    for (var r = 0; r < 2; r++) {
        var ring = new createjs.Shape();
        var ringWidth = width * (0.52 + r * 0.18);
        var ringHeight = height * (0.28 + r * 0.12);
        ring.graphics
            .setStrokeStyle(2)
            .beginStroke("rgba(186,140,255,0.24)")
            .drawEllipse(-ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight);
        ring.alpha = 0.32 - r * 0.06;
        ring.x = width * 0.52;
        ring.y = height * (0.58 + r * 0.04);
        ring.compositeOperation = "lighter";
        ringLayer.addChild(ring);
        rings.push(ring);
    }
    backdrop.addChild(ringLayer);

    var orbLayer = new createjs.Container();
    orbLayer.mouseEnabled = orbLayer.mouseChildren = false;
    var orbs = [];
    var orbPalettes = [
        ["rgba(255,178,236,0.62)", "rgba(255,255,255,0.06)"],
        ["rgba(187,138,255,0.6)", "rgba(255,255,255,0.06)"],
        ["rgba(152,118,255,0.56)", "rgba(255,255,255,0.06)"]
    ];

    for (var o = 0; o < 8; o++) {
        var orb = createBackdropOrb(70 + Math.random() * 80, orbPalettes[o % orbPalettes.length]);
        orb.x = width * (0.16 + Math.random() * 0.7);
        orb.y = height * (0.18 + Math.random() * 0.6);
        orb.alpha = 0.32 + Math.random() * 0.28;
        orbLayer.addChild(orb);
        orbs.push(orb);
    }
    backdrop.addChild(orbLayer);

    var diamondLayer = new createjs.Container();
    diamondLayer.mouseEnabled = diamondLayer.mouseChildren = false;
    var diamonds = [];
    var diamondPalettes = [
        ["rgba(255,206,228,0.85)", "rgba(255,146,210,0.45)"],
        ["rgba(203,168,255,0.85)", "rgba(155,114,255,0.45)"],
        ["rgba(232,176,255,0.85)", "rgba(188,120,255,0.45)"],
    ];
    for (var d = 0; d < 10; d++) {
        var diamond = createBackdropDiamond(20 + Math.random() * 18, diamondPalettes[d % diamondPalettes.length]);
        diamond.x = width * (0.12 + Math.random() * 0.76);
        diamond.y = height * (0.16 + Math.random() * 0.68);
        diamondLayer.addChild(diamond);
        diamonds.push(diamond);
    }
    backdrop.addChild(diamondLayer);

    var sparkleLayer = new createjs.Container();
    sparkleLayer.mouseEnabled = sparkleLayer.mouseChildren = false;
    var sparkles = [];
    for (var s = 0; s < 14; s++) {
        var sparkle = createBackdropSparkle(8 + Math.random() * 10);
        sparkle.x = width * (0.12 + Math.random() * 0.76);
        sparkle.y = height * (0.18 + Math.random() * 0.62);
        sparkleLayer.addChild(sparkle);
        sparkles.push(sparkle);
    }
    backdrop.addChild(sparkleLayer);

    var particleLayer = createHowToPlayParticleField(width, height, 32);
    particleLayer.alpha = 0.68;
    backdrop.addChild(particleLayer);

    var highlightSweep = new createjs.Shape();
    highlightSweep.graphics
        .beginLinearGradientFill(
            ["rgba(255,255,255,0)", "rgba(255,255,255,0.45)", "rgba(255,255,255,0)"],
            [0, 0.5, 1],
            0,
            0,
            width * 0.24,
            0
        )
        .drawRect(-width * 0.12, -height * 0.14, width * 0.24, height * 1.24);
    highlightSweep.alpha = 0.26;
    highlightSweep.compositeOperation = "lighter";
    highlightSweep.x = width * 0.22;
    highlightSweep.y = height * 0.52;
    backdrop.addChild(highlightSweep);

    var frameGlow = new createjs.Shape();
    frameGlow.graphics
        .beginLinearGradientStroke(["rgba(255,255,255,0.2)", "rgba(255,255,255,0)"], [0, 1], 0, 0, width, height)
        .setStrokeStyle(2)
        .drawRoundRect(2, 2, width - 4, height - 4, 28);
    frameGlow.alpha = 0.4;
    frameGlow.compositeOperation = "lighter";
    backdrop.addChild(frameGlow);

    backdrop.horizonGlow = horizonGlow;
    backdrop.topGlow = topGlow;
    backdrop.auroraGroup = auroraGroup;
    backdrop.upperAurora = upperAurora;
    backdrop.midAurora = midAurora;
    backdrop.lowerAurora = lowerAurora;
    backdrop.glowLayer = glowLayer;
    backdrop.lightColumns = beams;
    backdrop.constellationLayer = constellationLayer;
    backdrop.ringLayer = rings;
    backdrop.orbLayer = orbs;
    backdrop.diamondLayer = diamonds;
    backdrop.sparkleLayer = sparkles;
    backdrop.particleLayer = particleLayer;
    backdrop.highlightSweep = highlightSweep;
    backdrop.frameGlow = frameGlow;

    backdrop.__baseWidth = width;
    backdrop.__baseHeight = height;

    layoutOverlayToCanvas(backdrop, width, height);
    applyGameplayBackdropAnimations(backdrop);

    return backdrop;
}

function createBackdropGlow(radius, colors) {
    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(colors || ["rgba(255,255,255,0.6)", "rgba(255,255,255,0)"] , [0, 1], 0, 0, radius * 0.1, 0, 0, radius)
        .drawCircle(0, 0, radius);
    glow.compositeOperation = "lighter";
    glow.alpha = 0.9;
    glow.__baseRadius = radius;
    return glow;
}

function createBackdropOrb(radius, colors) {
    var orb = new createjs.Shape();
    var palette = colors || ["rgba(255,255,255,0.4)", "rgba(255,255,255,0)"];
    orb.graphics
        .beginRadialGradientFill(palette, [0, 1], -radius * 0.2, -radius * 0.2, radius * 0.1, 0, 0, radius)
        .drawCircle(0, 0, radius);
    orb.compositeOperation = "lighter";
    orb.__baseRadius = radius;
    orb.__baseScale = 0.85 + Math.random() * 0.3;
    orb.scaleX = orb.scaleY = orb.__baseScale;
    orb.__floatDistance = 12 + Math.random() * 18;
    return orb;
}

function createBackdropSparkle(size) {
    var sparkle = new createjs.Shape();
    sparkle.graphics
        .beginLinearGradientFill(
            ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.1)"],
            [0, 1],
            -size,
            -size,
            size,
            size
        )
        .drawPolyStar(0, 0, size, 4, 0.4, 45);
    sparkle.alpha = 0.85;
    sparkle.compositeOperation = "lighter";
    sparkle.__pulseRange = 0.25 + Math.random() * 0.35;
    sparkle.__baseScale = 0.7 + Math.random() * 0.3;
    sparkle.scaleX = sparkle.scaleY = sparkle.__baseScale;
    return sparkle;
}

function createBackdropDiamond(size, colors) {
    var palette = colors || ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.35)"];
    var diamond = new createjs.Shape();
    diamond.graphics
        .beginLinearGradientFill(palette, [0, 1], 0, -size, 0, size)
        .drawPolyStar(0, 0, size, 4, 0, 45);
    diamond.alpha = 0.72;
    diamond.compositeOperation = "lighter";
    diamond.__pulseRange = 0.18 + Math.random() * 0.22;
    diamond.__baseScale = 0.82 + Math.random() * 0.24;
    diamond.__rotateSpeed = (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
    diamond.scaleX = diamond.scaleY = diamond.__baseScale;
    return diamond;
}

function applyGameplayBackdropAnimations(backdrop) {
    if (!backdrop || backdrop.__ambientAnimationAttached) {
        return;
    }

    backdrop.__ambientAnimationAttached = true;

    if (backdrop.upperAurora) {
        var baseAlphaTop = backdrop.upperAurora.alpha;
        createjs.Tween.get(backdrop.upperAurora, { loop: true })
            .to({ alpha: Math.min(1, baseAlphaTop + 0.18), skewX: 8 }, 5200, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.36, baseAlphaTop - 0.26), skewX: -6 }, 5200, createjs.Ease.sineInOut);
    }

    if (backdrop.midAurora) {
        var baseAlphaMid = backdrop.midAurora.alpha;
        createjs.Tween.get(backdrop.midAurora, { loop: true })
            .to({ alpha: Math.min(0.88, baseAlphaMid + 0.16), skewX: -5 }, 5600, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.34, baseAlphaMid - 0.22), skewX: 7 }, 5600, createjs.Ease.sineInOut);
    }

    if (backdrop.lowerAurora) {
        var baseAlphaBottom = backdrop.lowerAurora.alpha;
        createjs.Tween.get(backdrop.lowerAurora, { loop: true })
            .to({ alpha: Math.min(0.92, baseAlphaBottom + 0.18), skewX: -7 }, 5600, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.32, baseAlphaBottom - 0.22), skewX: 5 }, 5600, createjs.Ease.sineInOut);
    }

    if (backdrop.horizonGlow) {
        var baseScale = backdrop.horizonGlow.scaleX || 1;
        createjs.Tween.get(backdrop.horizonGlow, { loop: true })
            .to({ alpha: 1, scaleX: baseScale * 1.04, scaleY: baseScale * 1.06 }, 4600, createjs.Ease.sineInOut)
            .to({ alpha: 0.82, scaleX: baseScale, scaleY: baseScale }, 4600, createjs.Ease.sineInOut);
    }

    if (backdrop.topGlow) {
        var topBaseAlpha = backdrop.topGlow.alpha;
        createjs.Tween.get(backdrop.topGlow, { loop: true })
            .to({ alpha: Math.min(0.92, topBaseAlpha + 0.1), x: backdrop.topGlow.x + 6 }, 4200, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.6, topBaseAlpha - 0.12), x: backdrop.topGlow.x - 6 }, 4200, createjs.Ease.sineInOut)
            .to({ alpha: topBaseAlpha, x: backdrop.topGlow.x }, 2000, createjs.Ease.sineInOut);
    }

    if (backdrop.glowLayer && backdrop.glowLayer.children) {
        backdrop.glowLayer.children.forEach(function (glow, index) {
            if (!glow) {
                return;
            }

            var baseAlpha = glow.alpha;
            createjs.Tween.get(glow, { loop: true })
                .wait(index * 420)
                .to({ alpha: Math.min(1, baseAlpha + 0.18), scaleX: 1.08, scaleY: 1.08 }, 3800, createjs.Ease.sineInOut)
                .to({ alpha: Math.max(0.32, baseAlpha - 0.22), scaleX: 0.96, scaleY: 0.96 }, 3800, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.lightColumns && backdrop.lightColumns.length) {
        backdrop.lightColumns.forEach(function (column, idx) {
            if (!column) {
                return;
            }

            var baseAlpha = column.alpha;
            createjs.Tween.get(column, { loop: true })
                .wait(idx * 560)
                .to({ alpha: Math.min(0.88, baseAlpha + 0.22), skewX: 8, rotation: column.rotation + 4 }, 4200, createjs.Ease.sineInOut)
                .to({ alpha: Math.max(0.22, baseAlpha - 0.18), skewX: -6, rotation: column.rotation - 4 }, 4200, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.orbLayer && backdrop.orbLayer.length) {
        backdrop.orbLayer.forEach(function (orb) {
            if (!orb) {
                return;
            }

            var baseY = orb.y;
            var baseScale = orb.__baseScale || orb.scaleX || 1;
            var floatDistance = orb.__floatDistance || 14;
            createjs.Tween.get(orb, { loop: true })
                .wait(Math.random() * 2200)
                .to({ y: baseY - floatDistance, scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 3600, createjs.Ease.sineInOut)
                .to({ y: baseY + floatDistance, scaleX: baseScale * 0.94, scaleY: baseScale * 0.94 }, 3600, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.sparkleLayer && backdrop.sparkleLayer.length) {
        backdrop.sparkleLayer.forEach(function (sparkle) {
            if (!sparkle) {
                return;
            }

            var baseScale = sparkle.__baseScale || sparkle.scaleX || 1;
            var pulseRange = sparkle.__pulseRange || 0.35;
            createjs.Tween.get(sparkle, { loop: true })
                .wait(Math.random() * 1800)
                .to({ scaleX: baseScale + pulseRange, scaleY: baseScale + pulseRange, alpha: 1 }, 2600, createjs.Ease.sineInOut)
                .to({ scaleX: baseScale, scaleY: baseScale, alpha: 0.45 }, 2600, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.diamondLayer && backdrop.diamondLayer.length) {
        backdrop.diamondLayer.forEach(function (diamond, index) {
            if (!diamond) {
                return;
            }

            var baseScaleDiamond = diamond.__baseScale || diamond.scaleX || 1;
            var pulse = diamond.__pulseRange || 0.2;
            var rotateSpeed = diamond.__rotateSpeed || 0.15;

            createjs.Tween.get(diamond, { loop: true })
                .wait(index * 320)
                .to({ scaleX: baseScaleDiamond + pulse, scaleY: baseScaleDiamond + pulse, rotation: diamond.rotation + rotateSpeed * 180 }, 3000, createjs.Ease.sineInOut)
                .to({ scaleX: baseScaleDiamond, scaleY: baseScaleDiamond, rotation: diamond.rotation + rotateSpeed * 360 }, 3000, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.ringLayer && backdrop.ringLayer.length) {
        backdrop.ringLayer.forEach(function (ring, idx) {
            if (!ring) {
                return;
            }

            var baseAlphaRing = ring.alpha;
            createjs.Tween.get(ring, { loop: true })
                .wait(idx * 420)
                .to({ alpha: Math.min(0.4, baseAlphaRing + 0.08), rotation: ring.rotation + 4 }, 5200, createjs.Ease.sineInOut)
                .to({ alpha: Math.max(0.18, baseAlphaRing - 0.08), rotation: ring.rotation - 4 }, 5200, createjs.Ease.sineInOut);
        });
    }

    if (backdrop.constellationLayer) {
        var baseAlphaConstellation = backdrop.constellationLayer.alpha;
        createjs.Tween.get(backdrop.constellationLayer, { loop: true })
            .to({ alpha: Math.min(0.9, baseAlphaConstellation + 0.2) }, 3200, createjs.Ease.sineInOut)
            .to({ alpha: Math.max(0.25, baseAlphaConstellation - 0.25) }, 3200, createjs.Ease.sineInOut);
    }

    if (backdrop.particleLayer && backdrop.particleLayer.children) {
        for (var i = 0; i < backdrop.particleLayer.children.length; i++) {
            startHowToPlayParticleFloat(backdrop.particleLayer.children[i], true);
        }
    }

    if (backdrop.highlightSweep) {
        var sweep = backdrop.highlightSweep;
        var baseX = sweep.x;
        createjs.Tween.get(sweep, { loop: true })
            .to({ x: baseX + backdrop.__baseWidth * 0.46, alpha: 0.42 }, 5000, createjs.Ease.quadInOut)
            .to({ x: baseX + backdrop.__baseWidth * 0.62, alpha: 0 }, 1400, createjs.Ease.quadIn)
            .set({ x: baseX - backdrop.__baseWidth * 0.38, alpha: 0 })
            .wait(2100)
            .to({ alpha: 0.32 }, 720, createjs.Ease.quadOut)
            .to({ x: baseX, alpha: 0.3 }, 4800, createjs.Ease.quadInOut);
    }
}

function ensureTitleShimmerAnimation() {
    if (typeof Title === "undefined" || !Title || Title.__shimmerAnimating) {
        return;
    }

    var badgeWidth = (Title.__layoutHalfWidth || 220) * 2;
    Title.__shimmerAnimating = true;

    if (Title.__shimmer) {
        var shimmer = Title.__shimmer;
        shimmer.x = -badgeWidth;
        createjs.Tween.get(shimmer, { loop: true })
            .to({ x: badgeWidth }, 4200, createjs.Ease.quadInOut)
            .wait(1600);
    }

    if (!Title.__breathingAnimationAttached) {
        Title.__breathingAnimationAttached = true;
        var baseY = typeof Title.__layoutTargetY === "number" ? Title.__layoutTargetY : Title.y;
        Title.__breathingTween = createjs.Tween.get(Title, { loop: true })
            .wait(680)
            .to({ y: baseY - 6 }, 3400, createjs.Ease.sineInOut)
            .to({ y: baseY + 4 }, 3400, createjs.Ease.sineInOut);
    }
}

function showIntroTitleBadge() {
    if (typeof Title === "undefined" || !Title) {
        return;
    }

    var targetY = typeof Title.__layoutTargetY === "number" ? Title.__layoutTargetY : Title.y;

    if (typeof targetY !== "number") {
        var metrics = getCanvasMetrics();
        var stageHeight = metrics && metrics.height ? metrics.height : 720;
        var fallbackHalf = typeof Title.__layoutHalfHeight === "number" ? Title.__layoutHalfHeight : 38;
        targetY = Math.max(stageHeight * 0.08 + fallbackHalf, fallbackHalf + 56);
    }

    Title.__layoutTargetY = targetY;

    createjs.Tween.removeTweens(Title);

    if (Title.__shimmer) {
        createjs.Tween.removeTweens(Title.__shimmer);
        Title.__shimmer.x = -((Title.__layoutHalfWidth || 220) * 2);
    }

    Title.__shimmerAnimating = false;
    Title.__breathingAnimationAttached = false;
    Title.__breathingTween = null;

    var firstIntro = !Title.__introBadgeActive;

    Title.visible = true;
    Title.alpha = firstIntro ? 0 : 1;
    Title.y = firstIntro ? targetY - 22 : targetY;

    createjs.Tween.get(Title, { override: true })
        .to({ alpha: 1, y: targetY }, firstIntro ? 560 : 360, createjs.Ease.quadOut)
        .call(function () {
            Title.__introBadgeActive = true;
            Title.__introShown = true;
            Title.__layoutTargetY = targetY;
            ensureTitleShimmerAnimation();
        });
}

function ensureResponsiveResizeListener() {
    if (responsiveResizeListenerAttached) {
        return;
    }

    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("resize", function () {
            refreshResponsiveLayout(true);
            if (stage && typeof stage.update === "function") {
                stage.update();
            }
        });
        responsiveResizeListenerAttached = true;
    }
}

function layoutHudElements(canvasWidth, canvasHeight) {
    if (!hudContainer) {
        return;
    }

    var metrics = getCanvasMetrics();
    var stageWidth = typeof canvasWidth === "number" ? canvasWidth : metrics.width;
    var stageHeight = typeof canvasHeight === "number" ? canvasHeight : metrics.height;

    var safeMargin = Math.max(36, stageWidth * 0.045);
    var availableWidth = Math.max(stageWidth - safeMargin * 2, 320);

    var scoreWidth = getHudElementWidth(scoreCardContainer, 220);
    var timerWidth = getHudElementWidth(timerCardContainer, 220);
    var questionWidth = getHudElementWidth(hudQuestionCardContainer, 240);
    var controlWidth = getHudElementWidth(controlContainer, 160);

    var baseGap = Math.max(24, Math.min(64, stageWidth * 0.04));
    var layoutWidth = scoreWidth + timerWidth + questionWidth + controlWidth + baseGap * 3;

    if (layoutWidth > availableWidth) {
        var overflow = layoutWidth - availableWidth;
        var gapReduction = Math.min(baseGap - 16, overflow / 3);
        if (gapReduction > 0) {
            baseGap -= gapReduction;
            layoutWidth = scoreWidth + timerWidth + questionWidth + controlWidth + baseGap * 3;
        }
    }

    var scale = 1;
    if (layoutWidth > availableWidth) {
        scale = Math.max(0.72, availableWidth / layoutWidth);
    }

    hudContainer.scaleX = hudContainer.scaleY = scale;

    var positions = [];
    var cursor = -layoutWidth / 2 + scoreWidth / 2;
    positions.push(cursor);

    cursor += scoreWidth / 2 + baseGap + timerWidth / 2;
    positions.push(cursor);

    cursor += timerWidth / 2 + baseGap + questionWidth / 2;
    positions.push(cursor);

    cursor += questionWidth / 2 + baseGap + controlWidth / 2;
    positions.push(cursor);
    if (scoreCardContainer) {
        scoreCardContainer.x = positions[0]-210;
        scoreCardContainer.baseX = positions[0]-210;
    }
    if (timerCardContainer) {
        timerCardContainer.x = positions[1]-330;
        timerCardContainer.baseX = positions[1]-330;
    }
    if (hudQuestionCardContainer) {
        hudQuestionCardContainer.x = positions[2]+200;
        hudQuestionCardContainer.baseX = positions[2]+200;
    }
    if (controlContainer) {
        controlContainer.x = positions[3]+150;
        controlContainer.baseX = positions[3]+150;
    }

    var topPadding = Math.max(48, stageHeight * 0.055);
    hudContainer.y = topPadding;

    var desiredCenter = stageWidth / 2;
    var halfLayout = layoutWidth / 2;
    var leftGlobal = desiredCenter + (-halfLayout) * scale;
    var rightGlobal = desiredCenter + halfLayout * scale;
    var leftLimit = safeMargin;
    var rightLimit = stageWidth - safeMargin;

    if (leftGlobal < leftLimit) {
        desiredCenter += (leftLimit - leftGlobal);
    }
    if (rightGlobal > rightLimit) {
        desiredCenter -= (rightGlobal - rightLimit);
    }

    hudContainer.x = desiredCenter;
}

function layoutIntroElements(canvasWidth, canvasHeight) {
    var metrics = getCanvasMetrics();
    var stageWidth = typeof canvasWidth === "number" ? canvasWidth : metrics.width;
    var stageHeight = typeof canvasHeight === "number" ? canvasHeight : metrics.height;
    var safeMargin = Math.max(7, stageWidth * 0.05);
    var baseHorizontalMarginRatio = 22 / 1280;
    var baseTopMarginRatio = 16 / 720;

    var titleBottomEdge = 0;

    if (typeof Title !== "undefined" && Title) {
        var titleHalfHeight = typeof Title.__layoutHalfHeight === "number"
            ? Title.__layoutHalfHeight
            : (Title.getBounds ? (Title.getBounds().height || 0) / 2 : 38);
        var topMargin = stageHeight * baseTopMarginRatio;
        var minimumTop = titleHalfHeight + Math.max(safeMargin * 0.15, 7);
        Title.x = stageWidth / 2;
        Title.y = Math.max(topMargin + titleHalfHeight, minimumTop);
console.log("topMargin::"+topMargin)
console.log("titleHalfHeight::"+titleHalfHeight)
console.log("minimumTop::"+minimumTop)

        var titleSafeTop = titleHalfHeight + Math.max(safeMargin * 0.1, 36);
        var titleLift = Math.min(
            Math.max(Title.y - titleSafeTop, 0),
            stageHeight * 0.025
        );
        if (titleLift > 0) {
            Title.y -= titleLift;
        }
        Title.__layoutTargetY = Title.y;

        titleBottomEdge = Title.y + titleHalfHeight;
    }

    if (!titleBottomEdge && typeof Title !== "undefined" && Title) {
        var fallbackHalf = typeof Title.__layoutHalfHeight === "number" ? Title.__layoutHalfHeight : 38;
        var fallbackY = typeof Title.__layoutTargetY === "number" ? Title.__layoutTargetY : Title.y || 0;
        titleBottomEdge = fallbackY + fallbackHalf;
    }

    if (typeof QusTxtString !== "undefined" && QusTxtString) {
        var measuredPromptHeight = 0;

        if (typeof QusTxtString.getMeasuredHeight === "function") {
            measuredPromptHeight = QusTxtString.getMeasuredHeight() || 0;
        }

        if (!measuredPromptHeight) {
            var promptLineHeight = QusTxtString.lineHeight;

            if (!promptLineHeight && typeof QusTxtString.getMeasuredLineHeight === "function") {
                promptLineHeight = QusTxtString.getMeasuredLineHeight();
            }

            measuredPromptHeight = promptLineHeight || 34;
        }

        var promptHalfHeight = measuredPromptHeight / 2;
        var promptSpacing = Math.max(stageHeight * 0.028, 40);
        var promptMinY = promptHalfHeight + Math.max(safeMargin * 0.28, 60);
        var promptBaseline = titleBottomEdge
            ? titleBottomEdge + promptSpacing + promptHalfHeight
            : stageHeight * 0.24 + promptHalfHeight;

        QusTxtString.x = stageWidth / 2;
        var promptTargetY = Math.max(promptBaseline, promptMinY);
        var promptLift = Math.min(
            Math.max(promptTargetY - promptMinY, 0),
            stageHeight * 0.04
        );
        QusTxtString.y = promptTargetY - promptLift+15;
        QusTxtString.__layoutHalfHeight = promptHalfHeight;

        if (QusTxtString.__labelBG && typeof QusTxtString.__labelBG.refresh === "function") {
            QusTxtString.__labelBG.refresh();
        }
    }

    if (typeof questionCardContainer_htp !== "undefined" && questionCardContainer_htp) {
        questionCardContainer_htp.x = stageWidth / 2;
        if (typeof questionCardContainer_htp.__baseY === "number") {
            questionCardContainer_htp.y = questionCardContainer_htp.__baseY;
        }
    }

    if (typeof SkipBtnMc !== "undefined" && SkipBtnMc) {
        var halfWidth = typeof SkipBtnMc.__layoutHalfWidth === "number" ? SkipBtnMc.__layoutHalfWidth : 160;
        var halfHeight = typeof SkipBtnMc.__layoutHalfHeight === "number" ? SkipBtnMc.__layoutHalfHeight : 44;

        var desiredMargin = stageWidth * baseHorizontalMarginRatio;
        var computedMargin = Math.max(desiredMargin, safeMargin * 0.3);
        SkipBtnMc.x = stageWidth - computedMargin - halfWidth;

        var desiredTop = stageHeight * baseTopMarginRatio;
        var alignedY = desiredTop + halfHeight;
        var minimumY = halfHeight + Math.max(safeMargin * 0.12, stageHeight * 0.02);
        SkipBtnMc.y = Math.max(alignedY, minimumY);
    }
}

function refreshResponsiveLayout(force) {
    ensureResponsiveResizeListener();

    var metrics = getCanvasMetrics();
    var width = metrics.width;
    var height = metrics.height;

    if (!force && width === lastResponsiveLayoutWidth && height === lastResponsiveLayoutHeight) {
        return;
    }

    lastResponsiveLayoutWidth = width;
    lastResponsiveLayoutHeight = height;

    layoutHudElements(width, height);
    layoutIntroElements(width, height);
    if (typeof layoutGameplayQuestionCard === "function") {
        layoutGameplayQuestionCard();
    }

    layoutOverlayToCanvas(HowToPlayScreenImg, 1280, 720);
    layoutOverlayToCanvas(howToPlayImageMc, 1280, 720);
    layoutOverlayToCanvas(loaderBar, 1280, 720);
    if (uniquebackGround) {
        layoutOverlayToCanvas(
            uniquebackGround,
            uniquebackGround.__baseWidth || 1280,
            uniquebackGround.__baseHeight || 720
        );
    }

    if (typeof layoutTimeUpOverlay === "function") {
        layoutTimeUpOverlay();
    }

    // SAUIX: reflow tooltip positions
    SAUIX_refreshTooltipsPositions(false);
}

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

        if (typeof wrapperTheme.backgroundAlpha === "number") {
            wrapper.background.alpha = wrapperTheme.backgroundAlpha;
        }
    }

    if (wrapper.highlight) {
        var highlightGradient = wrapperTheme.highlightGradient ? cloneArray(wrapperTheme.highlightGradient) : ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.05)"];
        wrapper.highlight.graphics
            .clear()
            .beginLinearGradientFill(highlightGradient, [0, 1], -12, -16, 12, 4)
            .drawEllipse(-10, -14, 20, 18);

        var highlightAlpha = typeof wrapperTheme.highlightAlpha === "number" ? wrapperTheme.highlightAlpha : wrapper.highlight.alpha;
        wrapper.highlight.alpha = typeof highlightAlpha === "number" ? highlightAlpha : 0.75;
    }

    if (wrapper.strokeOutline) {
        var strokeConfig = wrapperTheme.stroke || {};
        if (typeof strokeConfig === "string") {
            strokeConfig = { color: strokeConfig };
        }

        wrapper.strokeOutline.graphics.clear();
        if (strokeConfig.color) {
            var strokeWidth = typeof strokeConfig.width === "number" ? strokeConfig.width : 1;
            wrapper.strokeOutline.graphics
                .setStrokeStyle(strokeWidth)
                .beginStroke(strokeConfig.color)
                .drawCircle(0, 0, 10.5);

            var strokeAlpha = typeof strokeConfig.alpha === "number" ? strokeConfig.alpha : wrapper.strokeOutline.alpha;
            wrapper.strokeOutline.alpha = typeof strokeAlpha === "number" ? strokeAlpha : 0.9;
            wrapper.strokeOutline.visible = true;
        } else {
            wrapper.strokeOutline.visible = false;
        }
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

function applyAlphaToColor(color, alpha) {
    if (typeof alpha !== "number") {
        alpha = 1;
    }

    if (!color || typeof color !== "string") {
        return "rgba(255,255,255," + alpha + ")";
    }

    var rgbaMatch = color.match(/rgba?\(([^)]+)\)/i);
    if (rgbaMatch) {
        var parts = rgbaMatch[1].split(/\s*,\s*/);
        var r = parseFloat(parts[0]);
        var g = parseFloat(parts[1]);
        var b = parseFloat(parts[2]);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            return "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + alpha + ")";
        }
    }

    if (color.charAt(0) === "#") {
        var hex = color.substring(1);
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length === 6) {
            var rHex = parseInt(hex.substring(0, 2), 16);
            var gHex = parseInt(hex.substring(2, 4), 16);
            var bHex = parseInt(hex.substring(4, 6), 16);
            if (!isNaN(rHex) && !isNaN(gHex) && !isNaN(bHex)) {
                return "rgba(" + rHex + "," + gHex + "," + bHex + "," + alpha + ")";
            }
        }
    }

    return color;
}

function ensureHudIconAmbientDecor(card) {
    if (!card || !card.effectLayer) {
        return null;
    }

    if (!card.__ambientDecor) {
        var layer = card.effectLayer;

        var halo = new createjs.Shape();
        halo.name = "ambientHalo";
        halo.alpha = 0.7;
        layer.addChild(halo);

        var ring = new createjs.Shape();
        ring.name = "ambientRing";
        ring.alpha = 0.7;
        layer.addChild(ring);

        var orbit = new createjs.Container();
        orbit.name = "ambientOrbit";
        var orbitGlow = new createjs.Shape();
        orbitGlow.name = "ambientOrbitGlow";
        orbitGlow.alpha = 0.35;
        orbit.addChild(orbitGlow);
        var orb = new createjs.Shape();
        orb.name = "ambientOrb";
        orb.x = 18;
        orb.alpha = 0.85;
        orbit.addChild(orb);
        layer.addChild(orbit);

        var sparkle = new createjs.Shape();
        sparkle.name = "ambientSparkle";
        sparkle.alpha = 0.85;
        layer.addChild(sparkle);

        card.__ambientDecor = {
            halo: halo,
            ring: ring,
            orbit: orbit,
            orbitGlow: orbitGlow,
            orbitOrb: orb,
            sparkle: sparkle
        };
    }

    return card.__ambientDecor;
}

function updateHudIconAmbientDecor(card, type, theme) {
    if (!card) {
        return;
    }

    var decor = ensureHudIconAmbientDecor(card);
    if (!decor) {
        return;
    }

    var icon = card.icon;
    var baseX = icon ? icon.x : 0;
    var baseY = icon ? icon.y : 0;

    var cardsTheme = theme && theme.cards ? theme.cards : {};
    var cardTheme = cardsTheme[type] || cardsTheme.score || {};
    var ambient = cardTheme.ambient || {};

    var accentColors = [];
    if (cardTheme.accent) {
        accentColors = Array.isArray(cardTheme.accent) ? cardTheme.accent : [cardTheme.accent];
    }

    var backgroundColors = [];
    if (cardTheme.background) {
        backgroundColors = Array.isArray(cardTheme.background) ? cardTheme.background : [cardTheme.background];
    }

    var haloColor = ambient.halo || (accentColors.length ? accentColors[0] : (backgroundColors.length ? backgroundColors[0] : "rgba(255,255,255,0.85)"));
    var ringColor = ambient.ring || (accentColors.length ? accentColors[accentColors.length - 1] : haloColor);
    var sparkColor = ambient.spark || (cardTheme.iconStyle && (cardTheme.iconStyle.fill || cardTheme.iconStyle.strokeColor)) || haloColor;

    var haloAlpha = typeof ambient.haloAlpha === "number" ? ambient.haloAlpha : 0.7;
    var ringAlpha = typeof ambient.ringAlpha === "number" ? ambient.ringAlpha : 0.72;
    var sparkAlpha = typeof ambient.sparkAlpha === "number" ? ambient.sparkAlpha : 0.82;

    if (decor.halo) {
        decor.halo.graphics
            .clear()
            .beginRadialGradientFill([applyAlphaToColor(haloColor, haloAlpha), applyAlphaToColor(haloColor, 0)], [0, 1], 0, 0, 0, 0, 0, 34)
            .drawCircle(0, 0, 28);
        decor.halo.x = baseX;
        decor.halo.y = baseY;
        decor.halo.alpha = haloAlpha;
        decor.halo.baseAlpha = haloAlpha;
        decor.halo.scaleX = decor.halo.scaleY = 1;
    }

    if (decor.ring) {
        decor.ring.graphics
            .clear()
            .setStrokeStyle(1.6)
            .beginStroke(applyAlphaToColor(ringColor, Math.min(ringAlpha + 0.08, 1)))
            .drawCircle(0, 0, 18);
        decor.ring.x = baseX;
        decor.ring.y = baseY;
        decor.ring.alpha = ringAlpha;
        decor.ring.baseAlpha = ringAlpha;
        decor.ring.scaleX = decor.ring.scaleY = 1;
    }

    if (decor.orbit) {
        decor.orbit.x = baseX;
        decor.orbit.y = baseY;
        decor.orbit.rotation = 0;
        if (decor.orbitGlow) {
            decor.orbitGlow.graphics
                .clear()
                .beginRadialGradientFill([applyAlphaToColor(sparkColor, sparkAlpha * 0.45), applyAlphaToColor(sparkColor, 0)], [0, 1], 0, 0, 0, 0, 0, 20)
                .drawCircle(0, 0, 20);
            decor.orbitGlow.alpha = sparkAlpha * 0.45;
        }
        if (decor.orbitOrb) {
            decor.orbitOrb.graphics
                .clear()
                .beginRadialGradientFill([applyAlphaToColor(sparkColor, sparkAlpha), applyAlphaToColor(sparkColor, 0)], [0, 1], 0, 0, 0, 0, 0, 6)
                .drawCircle(0, 0, 6);
            decor.orbitOrb.x = 18;
            decor.orbitOrb.y = 0;
            decor.orbitOrb.alpha = sparkAlpha;
            decor.orbitOrb.baseAlpha = sparkAlpha;
            decor.orbitOrb.scaleX = decor.orbitOrb.scaleY = 1;
        }
    }

    if (decor.sparkle) {
        decor.sparkle.graphics
            .clear()
            .beginRadialGradientFill([applyAlphaToColor(sparkColor, sparkAlpha), applyAlphaToColor(sparkColor, 0)], [0, 1], 0, 0, 0, 0, 0, 12)
            .drawPolyStar(0, 0, 6, 5, 0.6, -90);
        decor.sparkle.x = baseX;
        decor.sparkle.y = baseY - 16;
        decor.sparkle.alpha = sparkAlpha;
        decor.sparkle.baseAlpha = sparkAlpha;
        decor.sparkle.scaleX = decor.sparkle.scaleY = 0.8;
    }

    card.__ambientDecor = decor;
    card.__ambientDecor.__colorsApplied = true;
}

function startHudIconAmbientLoop(card, type) {
    if (!card) {
        return;
    }

    var decor = card.__ambientDecor || ensureHudIconAmbientDecor(card);
    if (!decor) {
        return;
    }

    var icon = card.icon;
    var baseX = icon ? icon.x : 0;
    var baseY = icon ? icon.y : 0;

    if (decor.halo) {
        createjs.Tween.removeTweens(decor.halo);
        decor.halo.x = baseX;
        decor.halo.y = baseY;
        var haloAlpha = typeof decor.halo.baseAlpha === "number" ? decor.halo.baseAlpha : decor.halo.alpha;
        decor.halo.alpha = haloAlpha;
        decor.halo.scaleX = decor.halo.scaleY = 1;
        createjs.Tween.get(decor.halo, { loop: true })
            .to({ alpha: haloAlpha * 1.15, scaleX: 1.08, scaleY: 1.08 }, 1800, createjs.Ease.sineInOut)
            .to({ alpha: haloAlpha * 0.85, scaleX: 0.92, scaleY: 0.92 }, 1800, createjs.Ease.sineInOut);
    }

    if (decor.ring) {
        createjs.Tween.removeTweens(decor.ring);
        decor.ring.x = baseX;
        decor.ring.y = baseY;
        var ringAlpha = typeof decor.ring.baseAlpha === "number" ? decor.ring.baseAlpha : decor.ring.alpha;
        decor.ring.alpha = ringAlpha;
        decor.ring.scaleX = decor.ring.scaleY = 1;
        createjs.Tween.get(decor.ring, { loop: true })
            .to({ scaleX: 1.12, scaleY: 1.12, alpha: ringAlpha * 1.05 }, 1600, createjs.Ease.sineInOut)
            .to({ scaleX: 0.94, scaleY: 0.94, alpha: ringAlpha * 0.7 }, 1600, createjs.Ease.sineInOut);
    }

    if (decor.orbit) {
        createjs.Tween.removeTweens(decor.orbit);
        decor.orbit.x = baseX;
        decor.orbit.y = baseY;
        decor.orbit.rotation = 0;
        var orbitDuration = type === "timer" ? 5200 : type === "score" ? 6400 : 5600;
        createjs.Tween.get(decor.orbit, { loop: true })
            .to({ rotation: 360 }, orbitDuration);
    }

    if (decor.orbitOrb) {
        createjs.Tween.removeTweens(decor.orbitOrb);
        var orbAlpha = typeof decor.orbitOrb.baseAlpha === "number" ? decor.orbitOrb.baseAlpha : decor.orbitOrb.alpha;
        decor.orbitOrb.alpha = orbAlpha;
        decor.orbitOrb.scaleX = decor.orbitOrb.scaleY = 1;
        createjs.Tween.get(decor.orbitOrb, { loop: true })
            .to({ scaleX: 1.18, scaleY: 1.18, alpha: orbAlpha * 0.8 }, 1500, createjs.Ease.sineInOut)
            .to({ scaleX: 0.92, scaleY: 0.92, alpha: orbAlpha }, 1500, createjs.Ease.sineInOut);
    }

    if (decor.sparkle) {
        createjs.Tween.removeTweens(decor.sparkle);
        var sparkleAlpha = typeof decor.sparkle.baseAlpha === "number" ? decor.sparkle.baseAlpha : decor.sparkle.alpha;
        decor.sparkle.alpha = sparkleAlpha;
        decor.sparkle.x = baseX;
        decor.sparkle.y = baseY - 16;
        decor.sparkle.scaleX = decor.sparkle.scaleY = 0.8;
        createjs.Tween.get(decor.sparkle, { loop: true })
            .to({ y: baseY - 24, alpha: sparkleAlpha * 0.35, scaleX: 1.05, scaleY: 1.05 }, 1400, createjs.Ease.sineOut)
            .to({ y: baseY - 14, alpha: sparkleAlpha, scaleX: 0.8, scaleY: 0.8 }, 1200, createjs.Ease.sineIn);
    }
}

function ensureHudCardAmbientPulse(card) {
    if (!card) {
        return;
    }

    if (card.highlight) {
        var highlight = card.highlight;
        var baseAlpha = typeof highlight.baseAlpha === "number" ? highlight.baseAlpha : highlight.alpha || 0.6;
        highlight.baseAlpha = baseAlpha;
        highlight.alpha = baseAlpha;
        createjs.Tween.removeTweens(highlight);
        createjs.Tween.get(highlight, { loop: true })
            .to({ alpha: baseAlpha * 1.08 }, 1800, createjs.Ease.sineInOut)
            .to({ alpha: baseAlpha * 0.72 }, 1800, createjs.Ease.sineInOut);
    }

    if (card.glassOverlay && card.glassOverlay.visible !== false) {
        var glass = card.glassOverlay;
        var glassAlpha = typeof glass.__baseAlpha === "number" ? glass.__baseAlpha : (typeof glass.alpha === "number" ? glass.alpha : 0.6);
        glass.__baseAlpha = glassAlpha;
        glass.alpha = glassAlpha;
        createjs.Tween.removeTweens(glass);
        createjs.Tween.get(glass, { loop: true })
            .to({ alpha: glassAlpha * 1.12 }, 2200, createjs.Ease.sineInOut)
            .to({ alpha: glassAlpha * 0.82 }, 2200, createjs.Ease.sineInOut);
    }

    if (card.bottomGlow && card.bottomGlow.visible !== false) {
        var glow = card.bottomGlow;
        var glowAlpha = typeof glow.__baseAlpha === "number" ? glow.__baseAlpha : (typeof glow.alpha === "number" ? glow.alpha : 0.5);
        glow.__baseAlpha = glowAlpha;
        glow.alpha = glowAlpha;
        createjs.Tween.removeTweens(glow);
        createjs.Tween.get(glow, { loop: true })
            .to({ alpha: glowAlpha * 1.18 }, 2400, createjs.Ease.sineInOut)
            .to({ alpha: glowAlpha * 0.68 }, 2400, createjs.Ease.sineInOut);
    }
}

function burstHudAmbient(card) {
    if (!card || !card.__ambientDecor) {
        return;
    }

    var decor = card.__ambientDecor;

    if (decor.halo) {
        var haloAlpha = typeof decor.halo.baseAlpha === "number" ? decor.halo.baseAlpha : decor.halo.alpha;
        createjs.Tween.get(decor.halo, { override: false })
            .to({ alpha: haloAlpha * 1.45, scaleX: 1.18, scaleY: 1.18 }, 200, createjs.Ease.quadOut)
            .to({ alpha: haloAlpha, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.quadIn);
    }

    if (decor.sparkle) {
        var sparkleAlpha = typeof decor.sparkle.baseAlpha === "number" ? decor.sparkle.baseAlpha : decor.sparkle.alpha;
        createjs.Tween.get(decor.sparkle, { override: false })
            .to({ alpha: Math.min(sparkleAlpha * 1.2, 1), scaleX: 1.2, scaleY: 1.2 }, 160, createjs.Ease.quadOut)
            .to({ alpha: sparkleAlpha, scaleX: 0.85, scaleY: 0.85 }, 360, createjs.Ease.quadIn);
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

    var cardDecor = theme.cardDecor || {};
    var decorDefaults = card.__decorDefaults || {};

    var outlineConfig = normalizeDecorConfig(cardDecor.outline, decorDefaults.outline);
    outlineConfig = normalizeDecorConfig(cardTheme.outline, outlineConfig);

    var accentOutlineConfig = normalizeDecorConfig(cardDecor.accentOutline || outlineConfig, decorDefaults.accentOutline);
    accentOutlineConfig = normalizeDecorConfig(cardTheme.accentOutline, accentOutlineConfig);

    var glassConfig = normalizeDecorConfig(cardDecor.glass, decorDefaults.glass);
    glassConfig = normalizeDecorConfig(cardTheme.glass, glassConfig);

    var bottomGlowConfig = normalizeDecorConfig(cardDecor.bottomGlow, decorDefaults.bottomGlow);
    bottomGlowConfig = normalizeDecorConfig(cardTheme.bottomGlow, bottomGlowConfig);

    if (card.background) {
        card.background.graphics
            .clear()
            .beginLinearGradientFill((gradient && gradient.length ? gradient : card.baseGradient || []), [0, 1], -halfWidth, 0, halfWidth, 0)
            .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

        var backgroundAlpha = typeof cardTheme.backgroundAlpha === "number" ? cardTheme.backgroundAlpha : theme.cardBackgroundAlpha;
        if (typeof backgroundAlpha === "number") {
            card.background.alpha = backgroundAlpha;
        }
    }

    if (card.iconAccent) {
        card.iconAccent.graphics
            .clear()
            .beginLinearGradientFill((accent && accent.length ? accent : gradient), [0, 1], -halfWidth, -halfHeight, -halfWidth + accentWidth, halfHeight)
            .drawRoundRect(-halfWidth, -halfHeight, accentWidth, cardHeight, cornerRadius);

        var accentAlpha = typeof cardTheme.accentAlpha === "number" ? cardTheme.accentAlpha : theme.cardAccentAlpha;
        if (typeof accentAlpha === "number") {
            card.iconAccent.alpha = accentAlpha;
        }
    }

    if (card.bottomGlow) {
        var glowColors = bottomGlowConfig.colors;
        card.bottomGlow.graphics.clear();
        if (glowColors && glowColors.length) {
            var glowHeightRatio = typeof bottomGlowConfig.heightRatio === "number" ? bottomGlowConfig.heightRatio : 0.55;
            glowHeightRatio = Math.max(0.2, Math.min(glowHeightRatio, 1));
            var glowHeight = cardHeight * glowHeightRatio;
            var glowTop = halfHeight - glowHeight;
            card.bottomGlow.graphics
                .beginLinearGradientFill(glowColors, [0, 1], -halfWidth, glowTop, halfWidth, halfHeight)
                .drawRoundRectComplex(
                    -halfWidth,
                    halfHeight - glowHeight,
                    cardWidth,
                    glowHeight,
                    Math.max(cornerRadius * 0.35, 6),
                    Math.max(cornerRadius * 0.35, 6),
                    cornerRadius,
                    cornerRadius
                );
            var glowAlpha = typeof bottomGlowConfig.alpha === "number" ? bottomGlowConfig.alpha : card.bottomGlow.alpha;
            card.bottomGlow.alpha = typeof glowAlpha === "number" ? glowAlpha : 0.5;
            card.bottomGlow.visible = true;
        } else {
            card.bottomGlow.visible = false;
        }
    }

    if (card.highlight) {
        card.highlight.graphics
            .clear()
            .beginLinearGradientFill((highlightColors && highlightColors.length ? highlightColors : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"]), [0, 1], -halfWidth, -halfHeight, halfWidth, halfHeight)
            .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);

        var highlightAlpha = typeof cardTheme.highlightAlpha === "number" ? cardTheme.highlightAlpha : highlightConfig.alpha;
        if (typeof highlightAlpha === "number") {
            card.highlight.alpha = highlightAlpha;
            card.highlight.baseAlpha = highlightAlpha;
        } else if (typeof card.highlight.baseAlpha === "undefined") {
            card.highlight.baseAlpha = card.highlight.alpha;
        }
    }

    if (card.glassOverlay) {
        var glassColors = glassConfig.colors;
        card.glassOverlay.graphics.clear();
        if (glassColors && glassColors.length) {
            var glassHeightRatio = typeof glassConfig.heightRatio === "number" ? glassConfig.heightRatio : 0.6;
            glassHeightRatio = Math.max(0.2, Math.min(glassHeightRatio, 1));
            var glassHeight = cardHeight * glassHeightRatio;
            card.glassOverlay.graphics
                .beginLinearGradientFill(glassColors, [0, 1], -halfWidth, -halfHeight, halfWidth, -halfHeight + glassHeight)
                .drawRoundRectComplex(
                    -halfWidth,
                    -halfHeight,
                    cardWidth,
                    glassHeight,
                    cornerRadius,
                    cornerRadius,
                    Math.max(cornerRadius * 0.45, 8),
                    Math.max(cornerRadius * 0.45, 8)
                );
            var glassAlpha = typeof glassConfig.alpha === "number" ? glassConfig.alpha : card.glassOverlay.alpha;
            card.glassOverlay.alpha = typeof glassAlpha === "number" ? glassAlpha : 0.6;
            card.glassOverlay.visible = true;
        } else {
            card.glassOverlay.visible = false;
        }
    }

    if (card.outline) {
        card.outline.graphics.clear();
        if (outlineConfig.color) {
            var outlineWidth = typeof outlineConfig.width === "number" ? outlineConfig.width : 1;
            card.outline.graphics
                .setStrokeStyle(outlineWidth)
                .beginStroke(outlineConfig.color)
                .drawRoundRect(-halfWidth, -halfHeight, cardWidth, cardHeight, cornerRadius);
            var outlineAlpha = typeof outlineConfig.alpha === "number" ? outlineConfig.alpha : card.outline.alpha;
            card.outline.alpha = typeof outlineAlpha === "number" ? outlineAlpha : 0.9;
            card.outline.visible = true;
        } else {
            card.outline.visible = false;
        }
    }

    if (card.accentOutline) {
        card.accentOutline.graphics.clear();
        if (accentOutlineConfig.color) {
            var accentOutlineWidth = typeof accentOutlineConfig.width === "number" ? accentOutlineConfig.width : 1;
            card.accentOutline.graphics
                .setStrokeStyle(accentOutlineWidth)
                .beginStroke(accentOutlineConfig.color)
                .drawRoundRect(-halfWidth, -halfHeight, accentWidth, cardHeight, cornerRadius);
            var accentOutlineAlpha = typeof accentOutlineConfig.alpha === "number" ? accentOutlineConfig.alpha : card.accentOutline.alpha;
            card.accentOutline.alpha = typeof accentOutlineAlpha === "number" ? accentOutlineAlpha : 0.8;
            card.accentOutline.visible = true;
        } else {
            card.accentOutline.visible = false;
        }
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
    card.__decorDefaults = {
        outline: outlineConfig,
        accentOutline: accentOutlineConfig,
        glass: glassConfig,
        bottomGlow: bottomGlowConfig
    };

    updateHudIconAmbientDecor(card, type, theme);
    restartIconIdleAnimation(card, type);
    ensureHudCardAmbientPulse(card);
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
    var controlGlass = theme.controlGlass || {};

    var controlBg = controlContainer.backgroundShape || null;
    var controlWidth = controlBg ? (controlBg.__width || 120) : 120;
    var controlHeight = controlBg ? (controlBg.__height || 53) : 53;
    var controlRadius = controlBg ? (controlBg.__radius || 24) : 24;

    if (controlBg) {
        var bgColors = (controlTheme.colors && controlTheme.colors.length) ? controlTheme.colors : ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"];

        controlBg.graphics
            .clear()
            .beginLinearGradientFill(bgColors, [0, 1], -controlWidth / 2, -controlHeight / 2, controlWidth / 2, controlHeight / 2)
            .drawRoundRect(-controlWidth / 2, -controlHeight / 2, controlWidth, controlHeight, controlRadius);

        if (typeof controlTheme.alpha === "number") {
            controlBg.alpha = controlTheme.alpha;
        }
    }

    var glassDefaults = controlContainer.__glassDefaults || {};
    var highlightConfig = normalizeDecorConfig(controlGlass.highlight, glassDefaults.highlight);
    var glowConfig = normalizeDecorConfig(controlGlass.glow, glassDefaults.glow);
    var outlineConfig = normalizeDecorConfig(controlGlass.outline, glassDefaults.outline);

    controlContainer.__glassDefaults = {
        highlight: highlightConfig,
        glow: glowConfig,
        outline: outlineConfig
    };

    if (controlContainer.glowShape) {
        var glowShape = controlContainer.glowShape;
        glowShape.graphics.clear();
        if (glowConfig.colors && glowConfig.colors.length) {
            var glowHeightRatio = typeof glowConfig.heightRatio === "number" ? glowConfig.heightRatio : 0.55;
            glowHeightRatio = Math.max(0.2, Math.min(glowHeightRatio, 1));
            var glowHeight = controlHeight * glowHeightRatio;
            glowShape.graphics
                .beginLinearGradientFill(glowConfig.colors, [0, 1], -controlWidth / 2, controlHeight / 2 - glowHeight, controlWidth / 2, controlHeight / 2)
                .drawRoundRectComplex(
                    -controlWidth / 2,
                    controlHeight / 2 - glowHeight,
                    controlWidth,
                    glowHeight,
                    Math.max(controlRadius * 0.4, 10),
                    Math.max(controlRadius * 0.4, 10),
                    controlRadius,
                    controlRadius
                );
            var glowAlpha = typeof glowConfig.alpha === "number" ? glowConfig.alpha : glowShape.alpha;
            glowShape.alpha = typeof glowAlpha === "number" ? glowAlpha : 0.5;
            glowShape.visible = true;
        } else {
            glowShape.visible = false;
        }
    }

    if (controlContainer.highlightShape) {
        var highlightShape = controlContainer.highlightShape;
        highlightShape.graphics.clear();
        if (highlightConfig.colors && highlightConfig.colors.length) {
            var highlightHeightRatio = typeof highlightConfig.heightRatio === "number" ? highlightConfig.heightRatio : 0.58;
            highlightHeightRatio = Math.max(0.25, Math.min(highlightHeightRatio, 1));
            var highlightHeight = controlHeight * highlightHeightRatio;
            highlightShape.graphics
                .beginLinearGradientFill(highlightConfig.colors, [0, 1], -controlWidth / 2, -controlHeight / 2, controlWidth / 2, -controlHeight / 2 + highlightHeight)
                .drawRoundRectComplex(
                    -controlWidth / 2,
                    -controlHeight / 2,
                    controlWidth,
                    highlightHeight,
                    controlRadius,
                    controlRadius,
                    Math.max(controlRadius * 0.4, 10),
                    Math.max(controlRadius * 0.4, 10)
                );
            var highlightAlpha = typeof highlightConfig.alpha === "number" ? highlightConfig.alpha : highlightShape.alpha;
            highlightShape.alpha = typeof highlightAlpha === "number" ? highlightAlpha : 0.75;
            highlightShape.visible = true;
        } else {
            highlightShape.visible = false;
        }
    }

    if (controlContainer.outlineShape) {
        var outlineShape = controlContainer.outlineShape;
        outlineShape.graphics.clear();
        if (outlineConfig.color) {
            var outlineWidth = typeof outlineConfig.width === "number" ? outlineConfig.width : 1;
            outlineShape.graphics
                .setStrokeStyle(outlineWidth)
                .beginStroke(outlineConfig.color)
                .drawRoundRect(-controlWidth / 2, -controlHeight / 2, controlWidth, controlHeight, controlRadius);
            var outlineAlpha = typeof outlineConfig.alpha === "number" ? outlineConfig.alpha : outlineShape.alpha;
            outlineShape.alpha = typeof outlineAlpha === "number" ? outlineAlpha : 0.85;
            outlineShape.visible = true;
        } else {
            outlineShape.visible = false;
        }
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

    if (typeof startHudAmbientAnimations === "function") {
        startHudAmbientAnimations();
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
        if (base.gradient && base.gradient.length) {
            result.gradient = base.gradient.slice();
        }
        if (base.shadow) {
            result.shadow = {
                color: base.shadow.color,
                x: typeof base.shadow.x === "number" ? base.shadow.x : 0,
                y: typeof base.shadow.y === "number" ? base.shadow.y : 0,
                blur: typeof base.shadow.blur === "number" ? base.shadow.blur : 0
            };
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
            if (override.gradient && override.gradient.length) {
                result.gradient = override.gradient.slice();
            }
            if (override.shadow) {
                result.shadow = {
                    color: override.shadow.color,
                    x: typeof override.shadow.x === "number" ? override.shadow.x : 0,
                    y: typeof override.shadow.y === "number" ? override.shadow.y : 0,
                    blur: typeof override.shadow.blur === "number" ? override.shadow.blur : 0
                };
            }
        }
    }

    return result;
}

function normalizeDecorConfig(config, fallback) {
    var result = {};

    if (typeof config === "string") {
        result.color = config;
    } else if (config && typeof config === "object") {
        if (typeof config.color !== "undefined") {
            result.color = config.color;
        }
        if (typeof config.alpha === "number") {
            result.alpha = config.alpha;
        }
        if (typeof config.width === "number") {
            result.width = config.width;
        }
        if (config.colors && config.colors.length) {
            result.colors = cloneArray(config.colors);
        }
        if (typeof config.heightRatio === "number") {
            result.heightRatio = config.heightRatio;
        }
    }

    if (typeof fallback === "string") {
        fallback = { color: fallback };
    }

    if (fallback && typeof fallback === "object") {
        if (typeof result.color === "undefined" && typeof fallback.color !== "undefined") {
            result.color = fallback.color;
        }
        if (typeof result.alpha === "undefined" && typeof fallback.alpha === "number") {
            result.alpha = fallback.alpha;
        }
        if (typeof result.width === "undefined" && typeof fallback.width === "number") {
            result.width = fallback.width;
        }
        if (!result.colors && fallback.colors && fallback.colors.length) {
            result.colors = cloneArray(fallback.colors);
        }
        if (typeof result.heightRatio === "undefined" && typeof fallback.heightRatio === "number") {
            result.heightRatio = fallback.heightRatio;
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
    transferHowToPlayTildeWaveToProceedButton();
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

                arrow1 = buildVectorArrowIcon();
                container.parent.addChild(arrow1);
                arrow1.visible = false;
                arrow1.scaleX = arrow1.scaleY = 0.72;
                continue;
            }
            if (id == "fingure") {

                fingure = buildVectorHandIcon();
                container.parent.addChild(fingure);
                fingure.visible = false;
                fingure.scaleX = fingure.scaleY = 0.55;
                continue;
            }
            ///////////////////////////////////////////////////////bg////////////////////////////


            if (id == "uniquebackGround") {
                uniquebackGround = buildGameplayBackdrop();

                if (typeof ambientLayer !== "undefined" && ambientLayer) {
                    ambientLayer.addChildAt(uniquebackGround, 0);
                } else if (container.parent) {
                    container.parent.addChildAt(uniquebackGround, 0);
                }

                if (runningBg == 1) {
                    uniquebackGround.alpha = 0.35;
                    uniquebackGround.visible = false;
                } else {
                    uniquebackGround.alpha = 1;
                    uniquebackGround.visible = true;
                }

                continue;
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////

            if (id == "Title") {
                var formattedTitle = GameNameWithLvl.replace(/-/g, " ")
                    .replace(/(?!^)([A-Z])/g, " $1")
                    .toUpperCase()
                    .split("LEVEL")[0]
                    .trim();

                var fontFamily = "'Baloo 2'";
                var fontWeight = "800";
                var badgePadding = 200;
                var minBadgeWidth = 360;
                var maxBadgeWidth = 640;
                var minBadgeHeight = 52;
                var badgeVerticalPadding = 28;
                var fontSizes = [44, 40, 36, 32, 28];
                var titleLabel;

                for (var sizeIndex = 0; sizeIndex < fontSizes.length; sizeIndex++) {
                    var fontSize = fontSizes[sizeIndex];
                    titleLabel = new createjs.Text(
                        formattedTitle,
                        fontWeight + " " + fontSize + "px " + fontFamily,
                        "#F9F7FF"
                    );
                    titleLabel.textAlign = "left";
                    titleLabel.textBaseline = "middle";
                    titleLabel.shadow = new createjs.Shadow("rgba(10,18,44,0.55)", 0, 10, 26);

                    if (
                        titleLabel.getMeasuredWidth() + badgePadding <= maxBadgeWidth ||
                        sizeIndex === fontSizes.length - 1
                    ) {
                        break;
                    }
                }

                var measuredTitleWidth = titleLabel.getMeasuredWidth();
                var badgeWidth = Math.max(
                    minBadgeWidth,
                    Math.min(maxBadgeWidth, measuredTitleWidth + badgePadding)
                );

                titleLabel.lineWidth = badgeWidth - 180;
                var textHeight = titleLabel.getMeasuredHeight();
                var badgeHeight = Math.max(
                    minBadgeHeight,
                    Math.round(textHeight + badgeVerticalPadding)
                );
                var badgeCornerRadius = Math.min(40, Math.round(badgeHeight * 0.45));
                var highlightCornerRadius = Math.max(16, badgeCornerRadius - 8);

                TitleContaier = new createjs.Container();
                TitleContaier.mouseEnabled = false;
                TitleContaier.mouseChildren = false;

                var badgeShadow = new createjs.Shape();
                badgeShadow.graphics
                    .beginFill("rgba(6,12,28,0.55)")
                    .drawRoundRect(
                        -badgeWidth / 2,
                        -badgeHeight / 2 + 10,
                        badgeWidth,
                        badgeHeight,
                        Math.min(badgeCornerRadius + 4, 44)
                    );
                badgeShadow.alpha = 0.34;
                TitleContaier.addChild(badgeShadow);

                var badgeGlow = new createjs.Shape();
                badgeGlow.graphics
                    .beginRadialGradientFill(
                        ["rgba(255,255,255,0.65)", "rgba(176,118,255,0.55)", "rgba(176,118,255,0)"],
                        [0, 0.45, 1],
                        0,
                        0,
                        badgeWidth * 0.35,
                        0,
                        0,
                        badgeWidth
                    )
                    .drawRoundRect(
                        -badgeWidth / 2,
                        -badgeHeight / 2,
                        badgeWidth,
                        badgeHeight,
                        Math.min(badgeCornerRadius + 2, 42)
                    );
                badgeGlow.alpha = 0.65;
                badgeGlow.compositeOperation = "lighter";
                TitleContaier.addChild(badgeGlow);

                var badgeBackground = new createjs.Shape();
                badgeBackground.graphics
                    .beginLinearGradientFill([
                        "#4528B6",
                        "#7044E2",
                        "#FF6FB5"
                    ], [0, 0.55, 1], -badgeWidth / 2, -badgeHeight / 2, badgeWidth / 2, badgeHeight / 2)
                    .drawRoundRect(
                        -badgeWidth / 2,
                        -badgeHeight / 2,
                        badgeWidth,
                        badgeHeight,
                        Math.min(badgeCornerRadius + 2, 42)
                    );
                TitleContaier.addChild(badgeBackground);

                var badgeOutline = new createjs.Shape();
                badgeOutline.graphics
                    .setStrokeStyle(2)
                    .beginStroke("rgba(255,255,255,0.45)")
                    .drawRoundRect(
                        -badgeWidth / 2 + 1,
                        -badgeHeight / 2 + 1,
                        badgeWidth - 2,
                        badgeHeight - 2,
                        Math.max(badgeCornerRadius - 2, 20)
                    );
                badgeOutline.alpha = 0.6;
                TitleContaier.addChild(badgeOutline);

                var badgeHighlight = new createjs.Shape();
                badgeHighlight.graphics
                    .beginLinearGradientFill([
                        "rgba(255,255,255,0.55)",
                        "rgba(255,255,255,0)"
                    ], [0, 1], -badgeWidth / 2 + 8, -badgeHeight / 2 + 6, badgeWidth / 2, 0)
                    .drawRoundRect(
                        -badgeWidth / 2 + 6,
                        -badgeHeight / 2 + 6,
                        badgeWidth - 12,
                        badgeHeight / 2,
                        highlightCornerRadius
                    );
                badgeHighlight.alpha = 0.5;
                TitleContaier.addChild(badgeHighlight);

                var iconOrb = new createjs.Shape();
                iconOrb.graphics
                    .beginRadialGradientFill(
                        ["rgba(255,255,255,0.9)", "rgba(255,190,128,0.85)", "rgba(255,190,128,0)"],
                        [0, 0.55, 1],
                        0,
                        0,
                        0,
                        0,
                        0,
                        32
                    )
                    .drawCircle(0, 0, 26);
                iconOrb.x = -badgeWidth / 2 + 54;
                iconOrb.y = 0;
                iconOrb.alpha = 0.9;
                iconOrb.compositeOperation = "lighter";
                TitleContaier.addChild(iconOrb);

                var iconGlyph = new createjs.Shape();
                iconGlyph.graphics
                    .setStrokeStyle(3)
                    .beginStroke("rgba(72,23,143,0.85)")
                    .beginFill("rgba(255,255,255,0.92)")
                    .moveTo(0, -10)
                    .lineTo(10, 0)
                    .lineTo(0, 10)
                    .lineTo(-10, 0)
                    .closePath();
                iconGlyph.x = iconOrb.x;
                iconGlyph.y = iconOrb.y;
                iconGlyph.alpha = 0.9;
                TitleContaier.addChild(iconGlyph);

                titleLabel.lineWidth = badgeWidth - 180;
                titleLabel.x = iconOrb.x + 40;
                titleLabel.y = 2;
                TitleContaier.addChild(titleLabel);

                TitleContaier.x = getCanvasCenterX();
                TitleContaier.y = badgeHeight / 2;
                TitleContaier.__layoutHalfWidth = badgeWidth / 2;
                TitleContaier.__layoutHalfHeight = badgeHeight / 2;
                TitleContaier.__label = titleLabel;

                Title = TitleContaier;
                container.parent.addChild(TitleContaier);

                Title.visible = false;
                Title.__introBadgeActive = false;
                refreshResponsiveLayout(true);
                showIntroTitleBadge();
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
                SkipBtnMc.visible = false;
                refreshResponsiveLayout(true);

                continue;
            }
            if (id == "handCursor") {
                handCursor = buildVectorCursorIcon();
                container.parent.addChild(handCursor);
                handCursor.visible = false;
                handCursor.scaleX = handCursor.scaleY = 0.65;

                continue;
            }

            if (id == "HowToPlayScreen") {
                howToPlayImageMc = buildGameIntroOverlay();
                container.parent.addChild(howToPlayImageMc);
                howToPlayImageMc.visible = false;
                refreshResponsiveLayout(true);
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

    gameTimerTxt = new createjs.Text(formatTimerValue(time), "bold 32px 'Digital'", (timerTextStyle && timerTextStyle.color) || "#F6FBFF");
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

    if (typeof Title !== "undefined" && Title) {
        createjs.Tween.removeTweens(Title);
        Title.visible = false;
        Title.alpha = 0;
        Title.__introShown = false;
        Title.__breathingAnimationAttached = false;
        Title.__breathingTween = null;
        if (Title.__shimmer) {
            createjs.Tween.removeTweens(Title.__shimmer);
            Title.__shimmer.x = -((Title.__layoutHalfWidth || 220) * 2);
        }
        Title.__shimmerAnimating = false;
    }

    refreshResponsiveLayout(true);
    showIntroTitleBadge();




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
    background.alpha = typeof wrapperTheme.backgroundAlpha === "number" ? wrapperTheme.backgroundAlpha : 1;
    wrapper.addChild(background);

    var highlight = new createjs.Shape();
    highlight.mouseEnabled = false;
    highlight.mouseChildren = false;
    wrapper.addChild(highlight);

    var ring = new createjs.Shape();
    wrapper.addChild(ring);

    var strokeOutline = new createjs.Shape();
    strokeOutline.mouseEnabled = false;
    strokeOutline.mouseChildren = false;
    wrapper.addChild(strokeOutline);

    wrapper.background = background;
    wrapper.glow = glow;
    wrapper.ring = ring;
    wrapper.highlight = highlight;
    wrapper.strokeOutline = strokeOutline;

    updateHudIconWrapper(wrapper, { primary: resolvedPrimary, glow: resolvedGlowColor }, theme);

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
            var starColors = (iconStyle.gradient && iconStyle.gradient.length) ? iconStyle.gradient : [iconStyle.fill || "#FACC6B", iconStyle.fill || "#FACC6B"];
            iconShape.graphics
                .beginLinearGradientFill(starColors, [0, 1], -14, -14, 14, 14)
                .drawPolyStar(0, 0, 14, 5, 0.55, -90);

            var starHighlight = iconStyle.highlight || starColors[starColors.length - 1] || starColors[0];
            iconShape.graphics
                .beginRadialGradientFill([
                    applyAlphaToColor(starHighlight, 0.92),
                    applyAlphaToColor(starHighlight, 0)
                ], [0, 1], 0, -2, 0, 0, 0, 10)
                .drawPolyStar(0, 0, 10, 5, 0.5, -90);

            if (iconStyle.strokeColor) {
                iconShape.graphics
                    .setStrokeStyle(iconStyle.strokeWidth || 2.4, "round")
                    .beginStroke(iconStyle.strokeColor)
                    .drawPolyStar(0, 0, 14, 5, 0.55, -90);
            }
            break;
        case "timer":
            var strokeColor = iconStyle.strokeColor || iconStyle.fill || "#66B9FF";
            var strokeWidth = iconStyle.strokeWidth || 3;
            var timerGradient = (iconStyle.gradient && iconStyle.gradient.length) ? iconStyle.gradient : [strokeColor, strokeColor];
            var faceFill = iconStyle.fill || timerGradient[0];

            iconShape.graphics
                .beginLinearGradientFill(timerGradient, [0, 1], -12, -12, 12, 12)
                .drawCircle(0, 0, 12);

            iconShape.graphics
                .beginRadialGradientFill([
                    applyAlphaToColor(faceFill, 0.9),
                    applyAlphaToColor(faceFill, 0)
                ], [0, 1], 0, -3, 0, 0, 0, 9)
                .drawCircle(0, 0, 9);

            iconShape.graphics
                .beginFill(applyAlphaToColor(strokeColor, 0.18))
                .drawCircle(0, 0, 4.5);

            iconShape.graphics
                .setStrokeStyle(strokeWidth, "round")
                .beginStroke(strokeColor)
                .drawCircle(0, 0, 12.5);

            iconShape.graphics
                .setStrokeStyle(strokeWidth, "round")
                .beginStroke(strokeColor)
                .moveTo(0, 0)
                .lineTo(0, -9);

            iconShape.graphics
                .setStrokeStyle(strokeWidth, "round")
                .beginStroke(strokeColor)
                .moveTo(0, 0)
                .lineTo(7.5, 3.5);
            break;
        case "question":
            var fillColor = iconStyle.fill || "#6EE7B7";
            var questionColors = (iconStyle.gradient && iconStyle.gradient.length) ? iconStyle.gradient : [fillColor, fillColor];
            iconShape.graphics
                .beginLinearGradientFill(questionColors, [0, 1], -11, -11, 11, 11)
                .drawRoundRect(-11, -11, 22, 22, 6);
            iconShape.graphics
                .beginRadialGradientFill([
                    applyAlphaToColor(questionColors[questionColors.length - 1], 0.82),
                    applyAlphaToColor(questionColors[0], 0)
                ], [0, 1], 0, -5, 0, 0, 0, 10)
                .drawRoundRect(-9, -9, 18, 18, 5);
            if (iconStyle.strokeColor) {
                iconShape.graphics
                    .setStrokeStyle(iconStyle.strokeWidth || 3, "round")
                    .beginStroke(iconStyle.strokeColor)
                    .drawRoundRect(-11, -11, 22, 22, 6);
            }
            break;
    }

    iconShape.__iconStyle = iconStyle;

    if (iconStyle.shadow) {
        iconShape.shadow = new createjs.Shadow(
            iconStyle.shadow.color || "rgba(0,0,0,0.3)",
            typeof iconStyle.shadow.x === "number" ? iconStyle.shadow.x : 0,
            typeof iconStyle.shadow.y === "number" ? iconStyle.shadow.y : 0,
            typeof iconStyle.shadow.blur === "number" ? iconStyle.shadow.blur : 0
        );
    } else {
        iconShape.shadow = null;
    }
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

    var cardWidth = HUD_CARD_WIDTH;
    var cardHeight = HUD_CARD_HEIGHT;
    var halfWidth = cardWidth / 2;
    var halfHeight = cardHeight / 2;
    var cornerRadius = HUD_CARD_CORNER_RADIUS;

    var cardDecor = theme.cardDecor || {};
    var outlineConfig = normalizeDecorConfig(baseCardTheme.outline, cardDecor.outline);
    var accentOutlineConfig = normalizeDecorConfig(baseCardTheme.accentOutline, cardDecor.accentOutline || outlineConfig);
    var glassConfig = normalizeDecorConfig(baseCardTheme.glass, cardDecor.glass);
    var bottomGlowConfig = normalizeDecorConfig(baseCardTheme.bottomGlow, cardDecor.bottomGlow);

    var background = new createjs.Shape();
    background.mouseEnabled = false;
    background.mouseChildren = false;
    card.addChild(background);

    var accentShape = new createjs.Shape();
    accentShape.mouseEnabled = false;
    accentShape.mouseChildren = false;
    card.addChild(accentShape);

    var bottomGlow = new createjs.Shape();
    bottomGlow.mouseEnabled = false;
    bottomGlow.mouseChildren = false;
    card.addChild(bottomGlow);

    var highlight = new createjs.Shape();
    highlight.mouseEnabled = false;
    highlight.mouseChildren = false;
    card.addChild(highlight);

    var glassOverlay = new createjs.Shape();
    glassOverlay.mouseEnabled = false;
    glassOverlay.mouseChildren = false;
    card.addChild(glassOverlay);

    var accentOutline = new createjs.Shape();
    accentOutline.mouseEnabled = false;
    accentOutline.mouseChildren = false;
    card.addChild(accentOutline);

    var outline = new createjs.Shape();
    outline.mouseEnabled = false;
    outline.mouseChildren = false;
    card.addChild(outline);

    var icon = new createjs.Shape();
    icon.x = -halfWidth + 26;
    icon.y = 0;
    card.addChild(icon);

    var effectLayer = new createjs.Container();
    effectLayer.mouseEnabled = false;
    effectLayer.mouseChildren = false;
    effectLayer.name = type + 'Effects';
    effectLayer.compositeOperation = 'lighter';
    card.addChild(effectLayer);

    var labelStyle = theme.textStyles ? theme.textStyles.label : null;
    var labelColor = (labelStyle && labelStyle.color) || '#C4DBFF';
    var labelText = new createjs.Text(label.toUpperCase(), "600 12px 'Baloo 2'", labelColor);
    labelText.textAlign = 'left';
    labelText.x = icon.x - 20;
    labelText.y = -38;
    applyTextStyle(labelText, labelStyle);
    card.addChild(labelText);

    var valueHolder = new createjs.Container();
    valueHolder.x = icon.x + 42;
    valueHolder.y = 0;
    card.addChild(valueHolder);

    card.background = background;
    card.iconAccent = accentShape;
    card.bottomGlow = bottomGlow;
    card.highlight = highlight;
    card.glassOverlay = glassOverlay;
    card.accentOutline = accentOutline;
    card.outline = outline;
    card.icon = icon;
    card.label = labelText;
    card.valueHolder = valueHolder;
    card.effectLayer = effectLayer;
    card.baseGradient = cloneArray((gradient && gradient.length ? gradient : ["rgba(21,45,86,0.9)", "rgba(36,94,168,0.9)"]));
    card.baseAccent = cloneArray((accent && accent.length ? accent : card.baseGradient));
    card.baseIconStyle = mergeIconStyle(baseCardTheme.iconStyle || {}, null);
    card.__decorDefaults = {
        outline: outlineConfig,
        accentOutline: accentOutlineConfig,
        glass: glassConfig,
        bottomGlow: bottomGlowConfig
    };
    card.__cardWidth = cardWidth;
    card.__cardHeight = cardHeight;
    card.__cornerRadius = cornerRadius;
    card.__accentWidth = HUD_CARD_ACCENT_WIDTH;

    var measuredLabelWidth = labelText && labelText.getMeasuredWidth ? labelText.getMeasuredWidth() : 0;
    var layoutLeft = Math.min(-halfWidth, icon.x - 24);
    var layoutRight = Math.max(
        halfWidth,
        -halfWidth + HUD_CARD_ACCENT_WIDTH,
        labelText.x + measuredLabelWidth + 28,
        valueHolder.x + 140
    );
    var layoutWidth = layoutRight - layoutLeft;
    if (layoutWidth < 220) {
        layoutWidth = 220;
    }

    card.__layoutLeft = layoutLeft;
    card.__layoutRight = layoutRight;
    card.__layoutWidth = layoutWidth;

    applyHudThemeToCard(card, type, theme);

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
    hudContainer.alpha = 1;
    hudContainer.visible = true;

    scoreCardContainer = createHudCard("Score", "score");
    hudContainer.addChild(scoreCardContainer);

    timerCardContainer = createHudCard("Time Left (in seconds)", "timer");
    hudContainer.addChild(timerCardContainer);

    hudQuestionCardContainer = createHudCard("Question", "question");
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
        gameTimerTxt.y = 0;
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

    var controlGlowShape = new createjs.Shape();
    controlGlowShape.mouseEnabled = false;
    controlGlowShape.mouseChildren = false;
    controlGlowShape.compositeOperation = "lighter";
    controlContainer.addChild(controlGlowShape);
    controlContainer.glowShape = controlGlowShape;

    var controlHighlightShape = new createjs.Shape();
    controlHighlightShape.mouseEnabled = false;
    controlHighlightShape.mouseChildren = false;
    controlHighlightShape.compositeOperation = "lighter";
    controlContainer.addChild(controlHighlightShape);
    controlContainer.highlightShape = controlHighlightShape;

    var controlOutlineShape = new createjs.Shape();
    controlOutlineShape.mouseEnabled = false;
    controlOutlineShape.mouseChildren = false;
    controlContainer.addChild(controlOutlineShape);
    controlContainer.outlineShape = controlOutlineShape;

    var controlGlassTheme = hudTheme.controlGlass || {};
    controlContainer.__glassDefaults = {
        highlight: normalizeDecorConfig(controlGlassTheme.highlight, null),
        glow: normalizeDecorConfig(controlGlassTheme.glow, null),
        outline: normalizeDecorConfig(controlGlassTheme.outline, null)
    };

    controlContainer.__layoutWidth = controlWidth + 64;

    var controlPalette = hudTheme.controlPalette || {};
    var volumePalette = controlPalette.volume || {};
    var fullscreenPalette = controlPalette.fullscreen || {};
    var closePalette = controlPalette.close || {};

    volumeBtnWrapper = createHudIconWrapper(volumePalette.primary, volumePalette.glow);
    volumeBtnWrapper.x = -40;
    volumeBtnWrapper.cursor = "pointer";
    controlContainer.addChild(volumeBtnWrapper);
    controlContainer.volumeWrapper = volumeBtnWrapper;

    fullScreenBtnWrapper = createHudIconWrapper(fullscreenPalette.primary, fullscreenPalette.glow);
    fullScreenBtnWrapper.x = 0;
    fullScreenBtnWrapper.cursor = "pointer";
    controlContainer.addChild(fullScreenBtnWrapper);
    controlContainer.fullscreenWrapper = fullScreenBtnWrapper;

    closeBtnWrapper = createHudIconWrapper(closePalette.primary, closePalette.glow);
    closeBtnWrapper.x = 40;
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
closeBtnWrapper.scaleX=closeBtnWrapper.scaleY=1.2
fullScreenBtnWrapper.scaleX=fullScreenBtnWrapper.scaleY=1.2
volumeBtnWrapper.scaleX=volumeBtnWrapper.scaleY=1.2

// SAUIX: attach HUD tooltips
SAUIX_attachControlTooltips();

    hudContainer.addChild(controlContainer);

    container.parent.addChild(hudContainer);
    //container.parent.setChildIndex(hudContainer, container.parent.getNumChildren() - 1);
    container.parent.setChildIndex(hudContainer, 99999999);

    applyHudThemeToHud();
    setTimerCriticalState(false);
    updateQuestionProgress();

    refreshResponsiveLayout(true);
}

function refreshHudValues() {
    if (!gameScoreTxt || !gameTimerTxt || !gameQCntTxt) {
        return;
    }

    var currentScore = typeof score !== "undefined" ? score : 0;
    gameScoreTxt.text = String(currentScore);
animateScoreCelebration();
    /*if (lastDisplayedScore !== null && currentScore > lastDisplayedScore && (!scoreCardContainer || !scoreCardContainer.__scoreCelebrating)) {
        animateScoreCelebration();
    }*/
    lastDisplayedScore = currentScore;

    var timerValue = typeof formatTimerValue === "function" ? formatTimerValue(time) : String(parseInt(time, 10) || 0);
    gameTimerTxt.text = timerValue;

    var numericTime = typeof time !== "undefined" ? parseInt(time, 10) || 0 : 0;
   animateTimerTick();
/*   if (lastDisplayedTime !== null && numericTime !== lastDisplayedTime) {
        animateTimerTick();
    }*/
    lastDisplayedTime = numericTime;

    var total = typeof totalQuestions !== "undefined" ? totalQuestions : 0;
    var currentQuestion = typeof quesCnt !== "undefined" ? quesCnt : 0;
    if (total > 0) {
        currentQuestion = Math.min(Math.max(currentQuestion, 1), total);
    } else {
        currentQuestion = Math.max(currentQuestion, 1);
    }

    gameQCntTxt.text = currentQuestion + "/" + total;
animateQuestionAdvance();
   /* if (lastDisplayedQuestion !== null && currentQuestion > lastDisplayedQuestion) {
        animateQuestionAdvance();
    }*/
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

    layoutHudElements();

    var targetY = hudContainer.y;
    hudContainer.alpha = 0;
    hudContainer.y = targetY - 12;

    createjs.Tween.get(hudContainer, { override: true })
        .to({ alpha: 1, y: targetY }, 320, createjs.Ease.quadOut);
}

function animateIconWrapper(wrapper, isHover) {
    if (!wrapper) {
        return;
    }

    var targetScale = isHover ? 1.32 : 1.2;
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
        .to({ alpha: baseAlpha }, 280, createjs.Ease.quadIn)
        .call(function () {
            ensureHudCardAmbientPulse(card);
        });
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
    burstHudAmbient(card);

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
    icon.y = 0;

    startHudIconAmbientLoop(card, type);

    var initialStates = {
        score: { rotation: -9, y: 3, scale: 0.97 },
        timer: { rotation: 12, y: 0, scale: 1.06 },
        question: { rotation: -4, y: 3, scale: 0.96 }
    };

    if (initialStates[type]) {
        var preset = initialStates[type];
        icon.rotation = typeof preset.rotation === "number" ? preset.rotation : icon.rotation;
        icon.y = typeof preset.y === "number" ? preset.y : icon.y;
        var presetScale = typeof preset.scale === "number" ? preset.scale : 1;
        icon.scaleX = icon.scaleY = presetScale;
    }

    var idleTween = null;

    switch (type) {
        case "score":
            idleTween = createjs.Tween.get(icon, { loop: true })
                .to({ rotation: 10, y: -3, scaleX: 1.05, scaleY: 1.05 }, 1400, createjs.Ease.sineInOut)
                .to({ rotation: -10, y: 3, scaleX: 0.96, scaleY: 0.96 }, 1400, createjs.Ease.sineInOut)
                .to({ rotation: 0, y: 0, scaleX: 1, scaleY: 1 }, 900, createjs.Ease.sineInOut);
            break;
        case "timer":
            idleTween = createjs.Tween.get(icon, { loop: true })
                .to({ rotation: -12, scaleX: 0.94, scaleY: 0.94 }, 900, createjs.Ease.sineInOut)
                .to({ rotation: 14, scaleX: 1.08, scaleY: 1.08 }, 900, createjs.Ease.sineInOut)
                .to({ rotation: 0, scaleX: 1, scaleY: 1 }, 800, createjs.Ease.sineInOut);
            break;
        case "question":
            idleTween = createjs.Tween.get(icon, { loop: true })
                .to({ y: -3, rotation: 4, scaleX: 1.07, scaleY: 1.07 }, 1300, createjs.Ease.sineInOut)
                .to({ y: 2, rotation: -4, scaleX: 0.96, scaleY: 0.96 }, 1300, createjs.Ease.sineInOut)
                .to({ y: 0, rotation: 0, scaleX: 1, scaleY: 1 }, 900, createjs.Ease.sineInOut);
            break;
    }

    if (idleTween) {
        icon.__idleTween = idleTween;
        var totalDuration = 0;
        switch (type) {
            case "score":
                totalDuration = 1400 + 1400 + 900;
                break;
            case "timer":
                totalDuration = 900 + 900 + 800;
                break;
            case "question":
                totalDuration = 1300 + 1300 + 900;
                break;
        }

        if (totalDuration > 0 && typeof idleTween.setPosition === "function") {
            idleTween.setPosition(Math.random() * totalDuration);
        }
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
    // Alternative palette ideas:
    //   var duskCurrent = ["#101936", "#1E2F4F", "#234565"];
    //   var velvetBloom = ["#1B153A", "#35295F", "#4B3F7F"];
    background.graphics
        .beginLinearGradientFill(["#25145A", "#3A1F77", "#54359B"], [0, 0.5, 1], 0, 0, 0, 720)
        .drawRect(0, 0, 1280, 720);
    overlay.addChild(background);

    var colorWash = new createjs.Shape();
    colorWash.graphics
        .beginLinearGradientFill(
            [
                "rgba(157, 120, 236, 0.5)",
                "rgba(202, 132, 238, 0.42)",
                "rgba(248, 162, 235, 0.36)"
            ],
            [0, 0.52, 1],
            0,
            0,
            1280,
            720
        )
        .drawRect(0, 0, 1280, 720);
    colorWash.compositeOperation = "lighter";
    overlay.addChild(colorWash);

    var vignette = new createjs.Shape();
    vignette.graphics
        .beginRadialGradientFill(
            ["rgba(38, 22, 74, 0)", "rgba(34, 16, 64, 0.42)"],
            [0, 1],
            640,
            360,
            0,
            640,
            360,
            720
        )
        .drawRect(0, 0, 1280, 720);
    overlay.addChild(vignette);

    var pattern = drawHoneycombPattern(1280, 720, 44);
    pattern.alpha = 0.05;
    overlay.addChild(pattern);

    overlay.particleLayer = null;

    var header = createHowToPlayHeader();
    overlay.addChild(header);

    var instructions = createHowToPlayInstructions();
    overlay.addChild(instructions);

    var progress = createHowToPlayProgressBar();
    overlay.addChild(progress);

    overlay.backgroundShape = background;
    overlay.vignetteShape = vignette;
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

    header.baseY = header.y;
    instructions.baseY = instructions.y;
    progress.baseY = progress.y;
    overlay.accentLarge = null;
    overlay.accentSmall = null;
    overlay.ambientOrbs = [];

    overlay.__baseWidth = 1280;
    overlay.__baseHeight = 720;
    layoutOverlayToCanvas(overlay, overlay.__baseWidth, overlay.__baseHeight);

    return overlay;
}

function createHowToPlayParticleField(width, height, count) {
    var layer = new createjs.Container();
    layer.name = "HowToPlayParticleLayer";
    layer.mouseEnabled = false;
    layer.mouseChildren = false;

    var palettes = [
        {
            inner: "rgba(255, 255, 255, 0.95)",
            mid: "rgba(255, 204, 244, 0.58)",
            outer: "rgba(255, 204, 244, 0)",
            spark: "rgba(255, 242, 255, 0.95)"
        },
        {
            inner: "rgba(255, 255, 255, 0.95)",
            mid: "rgba(194, 168, 255, 0.58)",
            outer: "rgba(194, 168, 255, 0)",
            spark: "rgba(232, 220, 255, 0.95)"
        },
        {
            inner: "rgba(255, 255, 255, 0.95)",
            mid: "rgba(214, 158, 255, 0.58)",
            outer: "rgba(214, 158, 255, 0)",
            spark: "rgba(248, 222, 255, 0.95)"
        }
    ];

    for (var i = 0; i < count; i++) {
        var radius = 3 + Math.random() * 4;
        var palette = palettes[Math.floor(Math.random() * palettes.length)];
        var particle = new createjs.Container();
        particle.compositeOperation = "lighter";

        var glow = new createjs.Shape();
        glow.graphics
            .beginRadialGradientFill(
                [palette.mid, palette.outer],
                [0, 1],
                0,
                0,
                0,
                0,
                0,
                radius * 2.2
            )
            .drawCircle(0, 0, radius * 2.2);
        glow.alpha = 0.38 + Math.random() * 0.18;
        glow.__baseAlpha = glow.alpha;
        particle.addChild(glow);

        var core = new createjs.Shape();
        core.graphics
            .beginRadialGradientFill(
                [palette.inner, palette.mid, palette.outer],
                [0, 0.55, 1],
                0,
                0,
                0,
                0,
                0,
                radius
            )
            .drawCircle(0, 0, radius);
        core.alpha = 0.9;
        core.__baseScale = 1;
        core.__baseAlpha = core.alpha;
        particle.addChild(core);

        var spark = new createjs.Shape();
        spark.graphics
            .beginFill(palette.spark)
            .drawPolyStar(0, 0, radius * 0.9, 4, 0.6, -90);
        spark.alpha = 0.65 + Math.random() * 0.2;
        spark.scaleX = spark.scaleY = 0.7 + Math.random() * 0.2;
        spark.__baseScale = spark.scaleX;
        spark.__baseAlpha = spark.alpha;
        particle.addChild(spark);

        particle.__particleBounds = { width: width, height: height };
        particle.__core = core;
        particle.__glow = glow;
        particle.__spark = spark;
        particle.__pulseAttached = false;

        layer.addChild(particle);
    }

    return layer;
}

function startHowToPlayParticleFloat(particle, immediate) {
    if (!particle || !particle.__particleBounds) {
        return;
    }

    createjs.Tween.removeTweens(particle);

    if (!particle.__pulseAttached) {
        particle.__pulseAttached = true;

        if (particle.__core) {
            createjs.Tween.get(particle.__core, { loop: true })
                .to(
                    {
                        scaleX: particle.__core.__baseScale * 1.12,
                        scaleY: particle.__core.__baseScale * 1.12,
                        alpha: Math.min(1, particle.__core.__baseAlpha + 0.08)
                    },
                    860,
                    createjs.Ease.sineInOut
                )
                .to(
                    {
                        scaleX: particle.__core.__baseScale * 0.92,
                        scaleY: particle.__core.__baseScale * 0.92,
                        alpha: Math.max(0.4, particle.__core.__baseAlpha - 0.18)
                    },
                    860,
                    createjs.Ease.sineInOut
                );
        }

        if (particle.__spark) {
            createjs.Tween.get(particle.__spark, { loop: true })
                .to(
                    {
                        scaleX: particle.__spark.__baseScale * 1.18,
                        scaleY: particle.__spark.__baseScale * 1.18,
                        alpha: Math.min(1, particle.__spark.__baseAlpha + 0.12)
                    },
                    680,
                    createjs.Ease.quadOut
                )
                .to(
                    {
                        scaleX: particle.__spark.__baseScale * 0.86,
                        scaleY: particle.__spark.__baseScale * 0.86,
                        alpha: Math.max(0.25, particle.__spark.__baseAlpha - 0.2)
                    },
                    680,
                    createjs.Ease.quadIn
                );
        }

        if (particle.__glow) {
            createjs.Tween.get(particle.__glow, { loop: true })
                .to({ alpha: particle.__glow.__baseAlpha + 0.1 }, 1200, createjs.Ease.sineInOut)
                .to({ alpha: Math.max(0.18, particle.__glow.__baseAlpha - 0.12) }, 1200, createjs.Ease.sineInOut);
        }
    }

    var bounds = particle.__particleBounds;
    var startX = Math.random() * bounds.width;
    var startY = immediate ? Math.random() * bounds.height : bounds.height + Math.random() * 80;
    var driftX = startX + (Math.random() * 160 - 80);
    var endY = -60 - Math.random() * 160;
    var startScale = 0.45 + Math.random() * 0.35;
    var endScale = startScale * (0.6 + Math.random() * 0.5);
    var floatDuration = 4600 + Math.random() * 2800;
    var delay = immediate ? Math.random() * 1200 : Math.random() * 400;
    var spin = (Math.random() * 120 + 60) * (Math.random() > 0.5 ? 1 : -1);

    particle.x = startX;
    particle.y = startY;
    particle.scaleX = particle.scaleY = startScale;
    particle.rotation = Math.random() * 360;
    particle.alpha = 0;

    createjs.Tween.get(particle, { override: true })
        .wait(delay)
        .to({ alpha: 0.85 }, 520, createjs.Ease.quadOut)
        .to(
            {
                x: driftX,
                y: endY,
                alpha: 0,
                scaleX: endScale,
                scaleY: endScale,
                rotation: particle.rotation + spin
            },
            floatDuration,
            createjs.Ease.quadIn
        )
        .call(function () {
            startHowToPlayParticleFloat(particle, false);
        });
}

function createHowToPlayInstructions() {
    var container = new createjs.Container();
    container.regX = 324;
    container.regY = 146;
    container.x = 640;
    container.y = 244 + container.regY;

    var card = new createjs.Shape();
    card.graphics
        .beginLinearGradientFill(
            ["rgba(251, 244, 255, 0.96)", "rgba(242, 231, 255, 0.96)", "rgba(234, 222, 255, 0.95)"],
            [0, 0.56, 1],
            0,
            0,
            0,
            292
        )
        .drawRoundRect(0, 0, 648, 292, 42);
    card.shadow = new createjs.Shadow("rgba(6, 10, 28, 0.54)", 0, 26, 52);
    card.regX = 324;
    card.regY = 146;
    card.x = 324;
    card.y = 146;
    container.addChild(card);

    var cardStroke = new createjs.Shape();
    cardStroke.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(172, 130, 255, 0.36)")
        .drawRoundRect(0, 0, 648, 292, 42);
    cardStroke.regX = 324;
    cardStroke.regY = 146;
    cardStroke.x = 324;
    cardStroke.y = 146;
    container.addChild(cardStroke);

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            [
                "rgba(124, 58, 237, 0.42)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(186, 118, 255, 0)"
            ],
            [0, 0.64, 1],
            324,
            146,
            0,
            324,
            146,
            320
        )
        .drawEllipse(-90, -60, 800, 360);
    glow.alpha = 0.72;
    glow.compositeOperation = "lighter";
    container.addChildAt(glow, 0);
    container.glowShape = glow;

    var highlight = new createjs.Shape();
    highlight.graphics
        .beginLinearGradientFill(
            ["rgba(255, 255, 255, 0.84)", "rgba(244, 232, 255, 0.44)", "rgba(221, 201, 255, 0.16)"],
            [0, 0.6, 1],
            36,
            28,
            612,
            120
        )
        .drawRoundRect(24, 24, 600, 52, 22);
    highlight.alpha = 0.86;
    container.addChild(highlight);
    container.glassHighlight = highlight;

    var title = new createjs.Text("Before you start", "700 30px 'Baloo 2'", "#341c68");
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
        var itemY = 116 + i * 46;

        var badge = new createjs.Shape();
        // Alternate bullet options: ["#2DD4BF", "#0EA5E9"] for a teal hue or ["#818CF8", "#6366F1"] for a softer purple.
        badge.graphics
            .beginRadialGradientFill(["#7C3AED", "#EC4899"], [0, 1], 0, 0, 0, 0, 0, 22)
            .drawCircle(0, 0, 22);
        badge.x = 68;
        badge.y = itemY;
        badge.alpha = 0.95;
        container.addChild(badge);

        var badgeText = new createjs.Text((i + 1).toString(), "700 20px 'Baloo 2'", "#FDF7FF");
        badgeText.textAlign = "center";
        badgeText.textBaseline = "middle";
        badgeText.x = badge.x;
        badgeText.y = badge.y;
        container.addChild(badgeText);

        var stepText = new createjs.Text(steps[i], "500 18px 'Baloo 2'", "rgba(51, 33, 92, 0.94)");
        stepText.lineHeight = 30;
        stepText.lineWidth = 496;
        stepText.x = 114;
        stepText.y = itemY - 8;
        container.addChild(stepText);

        if (i < steps.length - 1) {
            var divider = new createjs.Shape();
            divider.graphics.beginFill("rgba(175, 134, 255, 0.36)").drawRoundRect(114, itemY + 18, 484, 2, 1);
            container.addChild(divider);
        }
    }

    container.cardShape = card;
    container.cardStroke = cardStroke;

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
            var fill = row % 2 === 0 ? "rgba(88, 52, 148, 0.12)" : "rgba(68, 36, 120, 0.1)";
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
            ["rgba(163, 134, 255, 0.6)", "rgba(244, 143, 227, 0.32)", "rgba(66, 32, 120, 0)"],
            [0, 0.6, 1],
            0,
            0,
            0,
            0,
            0,
            260
        )
        .drawCircle(0, 0, 240);
    glow.alpha = 0.74;
    glow.x = 252;
    glow.y = 60;
    glow.compositeOperation = "lighter";
    container.addChild(glow);
    container.glowShape = glow;

    var card = new createjs.Shape();
    card.graphics
        .beginLinearGradientFill(
            ["rgba(250, 244, 255, 0.97)", "rgba(240, 230, 255, 0.97)", "rgba(232, 220, 255, 0.96)"],
            [0, 0.54, 1],
            0,
            0,
            520,
            0
        )
        .drawRoundRect(0, 0, 520, 120, 42);
    card.shadow = new createjs.Shadow("rgba(4, 12, 30, 0.55)", 0, 28, 48);
    container.addChild(card);
    container.cardShape = card;
    container.cardWidth = 520;
    container.__highlightSweepAttached = false;

    var cardStroke = new createjs.Shape();
    cardStroke.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(167, 123, 255, 0.38)")
        .drawRoundRect(1, 1, 518, 118, 40);
    container.addChild(cardStroke);

    var tildeWave = createHowToPlayTildeWave(260, 16);
    tildeWave.x = 186;
    tildeWave.y = 94;
    container.addChild(tildeWave);
    container.tildeWave = tildeWave;

    var iconHalo = new createjs.Shape();
    iconHalo.graphics
        .beginRadialGradientFill(
            ["rgba(148, 118, 255, 0.85)", "rgba(255, 143, 222, 0.28)", "rgba(70, 28, 118, 0)"],
            [0, 0.58, 1],
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
    iconHalo.alpha = 0.88;
    container.addChild(iconHalo);

    var iconBackground = new createjs.Shape();
    // Swap this gradient for ["#2DD4BF", "#0EA5E9"] or ["#A855F7", "#6366F1"] if you want a different accent mood.
    iconBackground.graphics
        .beginRadialGradientFill(["#7C3AED", "#EC4899"], [0, 1], 0, 0, 0, 0, 0, 44)
        .drawCircle(0, 0, 42);
    iconBackground.x = 98;
    iconBackground.y = 60;
    container.addChild(iconBackground);

    var icon = new createjs.Text("\u2139", "700 50px 'Baloo 2'", "#FDF7FF");
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = iconBackground.x;
    icon.y = iconBackground.y + 8;
    container.addChild(icon);

    var label = new createjs.Text("How to Play", "700 40px 'Baloo 2'", "#2f1c63");
    label.x = 182;
    label.y = 26;
    container.addChild(label);

    var subtitle = new createjs.Text(
        "Follow these quick tips before you start",
        "500 18px 'Baloo 2'",
        "rgba(54, 33, 92, 0.82)"
    );
    subtitle.x = 182;
    subtitle.y = 70;
    container.addChild(subtitle);

    var accent = new createjs.Shape();
    accent.graphics
        .beginLinearGradientFill(
            ["rgba(124, 58, 237, 0.45)", "rgba(236, 72, 153, 0.24)", "rgba(255, 255, 255, 0)"],
            [0, 0.58, 1],
            0,
            18,
            0,
            102
        )
        .drawRoundRect(420, 18, 72, 84, 34);
    accent.alpha = 0.58;
    container.addChild(accent);

    return container;
}

function createHowToPlayProgressBar() {
    var container = new createjs.Container();
    container.regX = 324;
    container.regY = 54;
    container.x = 640;
    container.y = 580 + container.regY;

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(
            ["rgba(30, 18, 60, 0.95)", "rgba(46, 22, 84, 0.93)", "rgba(68, 24, 108, 0.9)"],
            [0, 0.54, 1],
            0,
            0,
            0,
            108
        )
        .drawRoundRect(0, 0, 648, 108, 34);
    frame.shadow = new createjs.Shadow("rgba(4, 9, 24, 0.55)", 0, 24, 48);
    container.addChild(frame);

    var frameStroke = new createjs.Shape();
    frameStroke.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(186, 140, 255, 0.45)")
        .drawRoundRect(1, 1, 646, 106, 32);
    container.addChild(frameStroke);

    var status = new createjs.Text("Collecting game assets", "600 22px 'Baloo 2'", "rgba(247, 236, 255, 0.92)");
    status.x = 48;
    status.y = 26;
    status.lineWidth = 432;
    container.addChild(status);

    var percent = new createjs.Text("0%", "700 32px 'Baloo 2'", "#F9A8E6");
    percent.textAlign = "right";
    percent.x = 600;
    percent.y = 22;
    container.addChild(percent);

    var track = new createjs.Shape();
    track.graphics
        .beginLinearGradientFill(
            ["rgba(76, 38, 140, 0.55)", "rgba(120, 58, 184, 0.5)", "rgba(172, 64, 208, 0.46)"],
            [0, 0.54, 1],
            0,
            0,
            560,
            0
        )
        .drawRoundRect(0, 0, 560, 20, 12);
    track.x = 44;
    track.y = 66;
    container.addChild(track);

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            [
                "rgba(167, 123, 255, 0.32)",
                "rgba(167, 123, 255, 0)"
            ],
            [0, 1],
            324,
            80,
            0,
            324,
            80,
            200
        )
        .drawEllipse(44, 60, 560, 48);
    glow.compositeOperation = "lighter";
    glow.alpha = 0.75;
    container.addChild(glow);

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
        .beginLinearGradientFill(["#6F6EFF", "#A566FF", "#FF8FE0"], [0, 0.5, 1], 0, 0, 560, 0)
        .drawRoundRect(0, 0, 560, 20, 12);
    fillContainer.addChild(fill);

    var pulse = new createjs.Shape();
    pulse.graphics
        .beginLinearGradientFill(
            [
                "rgba(255, 255, 255, 0.12)",
                "rgba(247, 210, 255, 0.6)",
                "rgba(255, 255, 255, 0.12)"
            ],
            [0, 0.52, 1],
            0,
            0,
            280,
            0
        )
        .drawRect(-140, 0, 280, 20);
    pulse.alpha = 0;
    pulse.x = -140;
    pulse.compositeOperation = "lighter";
    fillContainer.addChild(pulse);

    var shine = new createjs.Shape();
    shine.graphics
        .beginLinearGradientFill(["rgba(255,255,255,0)", "rgba(244, 225, 255, 0.85)", "rgba(255,255,255,0)"], [0, 0.54, 1], 0, 0, 220, 0)
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
    container.waveBaseX = waveContent.x;
    container.waveHighlightBaseAlpha = highlight.alpha;

    return container;
}

function startHowToPlayTildeWaveAnimation(waveContainer) {
    if (!waveContainer || waveContainer.__tildeAnimationAttached) {
        return;
    }

    waveContainer.__tildeAnimationAttached = true;

    var waveContent = waveContainer.waveContent;
    if (waveContent) {
        var baseX = typeof waveContainer.waveBaseX === "number" ? waveContainer.waveBaseX : waveContent.x;
        waveContent.x = baseX;
        var waveShift = waveContainer.waveWavelength || 60;
        createjs.Tween.get(waveContent, { loop: true })
            .to({ x: baseX - waveShift }, 2200, createjs.Ease.linear)
            .set({ x: baseX });
    }

    if (waveContainer.waveHighlight) {
        var highlightBaseAlpha = typeof waveContainer.waveHighlightBaseAlpha === "number"
            ? waveContainer.waveHighlightBaseAlpha
            : waveContainer.waveHighlight.alpha;
        waveContainer.waveHighlight.alpha = highlightBaseAlpha;
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

function stopHowToPlayTildeWaveAnimation(waveContainer) {
    if (!waveContainer) {
        return;
    }

    createjs.Tween.removeTweens(waveContainer);
    if (typeof waveContainer.baseAlpha === "number") {
        waveContainer.alpha = waveContainer.baseAlpha;
    }

    if (waveContainer.waveContent) {
        createjs.Tween.removeTweens(waveContainer.waveContent);
        if (typeof waveContainer.waveBaseX === "number") {
            waveContainer.waveContent.x = waveContainer.waveBaseX;
        }
    }

    if (waveContainer.waveHighlight) {
        createjs.Tween.removeTweens(waveContainer.waveHighlight);
        if (typeof waveContainer.waveHighlightBaseAlpha === "number") {
            waveContainer.waveHighlight.alpha = waveContainer.waveHighlightBaseAlpha;
        }
    }

    waveContainer.__tildeAnimationAttached = false;
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
            .to({ y: -24, alpha: 0.2 }, 4200, createjs.Ease.sineInOut)
            .to({ y: 0, alpha: 0.14 }, 4200, createjs.Ease.sineInOut);
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

    if (overlay.particleLayer && overlay.particleLayer.children && overlay.particleLayer.children.length) {
        for (var p = 0; p < overlay.particleLayer.children.length; p++) {
            startHowToPlayParticleFloat(overlay.particleLayer.children[p], true);
        }
    }

    if (overlay.ambientOrbs && overlay.ambientOrbs.length) {
        for (var i = 0; i < overlay.ambientOrbs.length; i++) {
            (function (orb, index) {
                if (!orb) {
                    return;
                }
                var baseScaleX = orb.scaleX || 1;
                var baseScaleY = orb.scaleY || 1;
                var baseAlpha = typeof orb.alpha === "number" ? orb.alpha : 0.6;
                createjs.Tween.get(orb, { loop: true })
                    .wait(index * 280)
                    .to({ scaleX: baseScaleX * 1.08, scaleY: baseScaleY * 1.08, alpha: Math.min(1, baseAlpha + 0.12) }, 3200, createjs.Ease.sineInOut)
                    .to({ scaleX: baseScaleX * 0.94, scaleY: baseScaleY * 0.94, alpha: Math.max(0.2, baseAlpha - 0.15) }, 3200, createjs.Ease.sineInOut);
            })(overlay.ambientOrbs[i], i);
        }
    }

    if (overlay.instructionsCard && overlay.instructionsCard.glowShape) {
        overlay.instructionsCard.glowShape.alpha = 0.42;
        createjs.Tween.get(overlay.instructionsCard.glowShape, { loop: true })
            .to({ alpha: 0.55 }, 3200, createjs.Ease.sineInOut)
            .to({ alpha: 0.34 }, 3200, createjs.Ease.sineInOut);
    }

    if (overlay.instructionsCard && overlay.instructionsCard.glassHighlight) {
        var glass = overlay.instructionsCard.glassHighlight;
        createjs.Tween.get(glass, { loop: true })
            .to({ alpha: 0.85 }, 2600, createjs.Ease.sineInOut)
            .to({ alpha: 0.6 }, 2600, createjs.Ease.sineInOut);
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

        createjs.Tween.removeTweens(sweep);
        sweep.baseX = travelStart;
        sweep.x = travelStart;
        sweep.alpha = 0;
        header.__highlightSweepAttached = true;

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

function stopHowToPlayHeaderIdleAnimation(header) {
    if (!header) {
        return;
    }

    header.__idleAnimationAttached = false;

    header.__highlightSweepAttached = false;

    if (header.highlightSweep) {
        createjs.Tween.removeTweens(header.highlightSweep);
        header.highlightSweep.alpha = 0;
        header.highlightSweep.x = typeof header.highlightSweep.baseX === "number" ? header.highlightSweep.baseX : -160;
    }

    if (header.tildeWave) {
        stopHowToPlayTildeWaveAnimation(header.tildeWave);
        header.tildeWave.visible = false;
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
    resetHowToPlayWaveStates(overlay);
    animateHowToPlayOverlayEntry(overlay);
    resetHowToPlayProgressBar(overlay);
}

function resetHowToPlayWaveStates(overlay) {
    howToPlayWaveTransferred = false;

    if (!overlay) {
        return;
    }

    if (overlay.header && overlay.header.tildeWave) {
        var headerWave = overlay.header.tildeWave;
        headerWave.visible = true;
        stopHowToPlayTildeWaveAnimation(headerWave);
        if (overlay.__ambientAnimationAttached) {
            startHowToPlayTildeWaveAnimation(headerWave);
        }
    }

    if (overlay.header) {
        overlay.header.__highlightSweepAttached = false;
    }

    if (overlay.header && overlay.header.highlightSweep) {
        var headerHighlight = overlay.header.highlightSweep;
        createjs.Tween.removeTweens(headerHighlight);
        headerHighlight.alpha = 0;
        headerHighlight.x = typeof headerHighlight.baseX === "number" ? headerHighlight.baseX : -160;
    }

    if (overlay.proceedButton && overlay.proceedButton.tildeWave) {
        var buttonWave = overlay.proceedButton.tildeWave;
        stopHowToPlayTildeWaveAnimation(buttonWave);
        buttonWave.visible = false;
    }
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
    shadow.graphics.beginFill("rgba(35, 25, 82, 0.6)").drawRoundRect(-118, -34, 236, 68, 26);
    shadow.alpha = 0.75;
    shadow.y = 6;
    button.addChild(shadow);

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            ["rgba(255, 184, 226, 0.48)", "rgba(129, 119, 255, 0.26)", "rgba(72, 59, 170, 0)"],
            [0, 0.6, 1],
            0,
            0,
            0,
            0,
            0,
            130
        )
        .drawCircle(0, 0, 130);
    glow.alpha = 0.64;
    glow.compositeOperation = "lighter";
    button.addChild(glow);
    button.glowShape = glow;

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(["#6f6eff", "#a566ff", "#ff8fe0"], [0, 0.5, 1], -118, 0, 118, 0)
        .drawRoundRect(-112, -36, 224, 72, 26);
    frame.shadow = new createjs.Shadow("rgba(6, 8, 24, 0.45)", 0, 20, 36);
    button.addChild(frame);

    var highlightMask = new createjs.Shape();
    highlightMask.graphics.drawRoundRect(-112, -36, 224, 72, 26);
    highlightMask.visible = false;
    button.addChild(highlightMask);

    var highlight = new createjs.Shape();
    highlight.graphics
        .beginLinearGradientFill(
            ["rgba(255, 255, 255, 0)", "rgba(255, 246, 255, 0.42)", "rgba(255, 255, 255, 0)"],
            [0, 0.5, 1],
            -72,
            0,
            72,
            0
        )
        .drawRoundRect(-72, -40, 144, 80, 26);
    highlight.alpha = 0;
    highlight.mask = highlightMask;
    highlight.compositeOperation = "lighter";
    highlight.x = -140;
    highlight.baseX = -140;
    button.addChild(highlight);
    button.highlightSweep = highlight;
    button.highlightMask = highlightMask;

  

    var frameStroke = new createjs.Shape();
    frameStroke.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(255, 255, 255, 0.6)")
        .drawRoundRect(-112, -36, 224, 72, 26);
    button.addChild(frameStroke);

    var label = new createjs.Text("Proceed", "700 28px 'Baloo 2'", "#FFFFFF");
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.y = label.y + 4;
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

    overlay.__baseWidth = 1280;
    overlay.__baseHeight = 720;
    layoutOverlayToCanvas(overlay, overlay.__baseWidth, overlay.__baseHeight);

    return overlay;
}

function createIntroHowToPlayHeader() {
    var container = new createjs.Container();
    container.name = "IntroHowToPlayBadge";
    container.x = 22;
    container.y = 16;

    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill(
            ["rgba(174, 134, 255, 0.46)", "rgba(244, 150, 229, 0.3)", "rgba(78, 34, 129, 0)"],
            [0, 0.56, 1],
            0,
            0,
            0,
            0,
            0,
            148
        )
        .drawCircle(0, 0, 200);
    glow.alpha = 0.86;
    glow.x = 154;
    glow.y = 56;
    glow.compositeOperation = "lighter";
    container.addChild(glow);
    container.glowShape = glow;

    var frame = new createjs.Shape();
    frame.graphics
        .beginLinearGradientFill(
            ["rgba(38, 20, 76, 0.96)", "rgba(62, 24, 102, 0.94)", "rgba(90, 26, 128, 0.92)"],
            [0, 0.54, 1],
            0,
            0,
            236,
            0
        )
        .drawRoundRect(0, 0, 236, 74, 32);
    frame.shadow = new createjs.Shadow("rgba(10, 12, 36, 0.48)", 0, 18, 36);
    container.addChild(frame);
    container.cardShape = frame;
    container.cardWidth = 236;

    var sheen = new createjs.Shape();
    sheen.graphics
        .beginLinearGradientFill(
            ["rgba(255, 255, 255, 0.28)", "rgba(215, 186, 255, 0.12)", "rgba(255, 255, 255, 0)"],
            [0, 0.52, 1],
            0,
            0,
            236,
            0
        )
        .drawRoundRect(6, 6, 224, 62, 26);
    sheen.alpha = 0.7;
    container.addChild(sheen);

    var accent = new createjs.Shape();
    accent.graphics
        .beginLinearGradientFill(
            ["rgba(164, 120, 255, 0.55)", "rgba(255, 148, 220, 0.3)", "rgba(255, 255, 255, 0)"],
            [0, 0.58, 1],
            0,
            10,
            0,
            64
        )
        .drawRoundRect(182, 10, 50, 54, 24);
    accent.alpha = 0.65;
    container.addChild(accent);

    var frameStroke = new createjs.Shape();
    frameStroke.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(198, 152, 255, 0.55)")
        .drawRoundRect(1, 1, 234, 72, 30);
    container.addChild(frameStroke);
    container.__highlightSweepAttached = false;

    var sparkleGlow = new createjs.Shape();
    sparkleGlow.graphics
        .beginRadialGradientFill(
            ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0)"],
            [0, 1],
            0,
            0,
            0,
            0,
            0,
            14
        )
        .drawCircle(0, 0, 14);
    sparkleGlow.alpha = 0.85;
    sparkleGlow.x = 212;
    sparkleGlow.y = 22;
    container.addChild(sparkleGlow);

    var sparkleCore = new createjs.Shape();
    sparkleCore.graphics
        .beginFill("rgba(255, 255, 255, 0.95)")
        .drawPolyStar(0, 0, 4.5, 4, 0.6, -90);
    sparkleCore.alpha = 0.9;
    sparkleCore.x = sparkleGlow.x;
    sparkleCore.y = sparkleGlow.y;
    container.addChild(sparkleCore);

    var wave = createHowToPlayTildeWave(216, 14);
    wave.x = 172;
    wave.y = 86;
    container.addChild(wave);
    container.tildeWave = wave;

    var iconHalo = new createjs.Shape();
    iconHalo.graphics
        .beginRadialGradientFill(
            ["rgba(255, 240, 255, 0.9)", "rgba(210, 168, 255, 0.3)", "rgba(118, 76, 196, 0)"],
            [0, 0.56, 1],
            0,
            0,
            0,
            0,
            0,
            34
        )
        .drawCircle(0, 0, 32);
    iconHalo.x = 38;
    iconHalo.y = 38;
    container.addChild(iconHalo);

    var iconRing = new createjs.Shape();
    iconRing.graphics
        .setStrokeStyle(2)
        .beginStroke("rgba(188, 146, 255, 0.9)")
        .drawCircle(0, 0, 26);
    iconRing.alpha = 0.85;
    iconRing.x = iconHalo.x;
    iconRing.y = iconHalo.y;
    container.addChild(iconRing);

    var iconBackground = new createjs.Shape();
    iconBackground.graphics
        .beginRadialGradientFill(["#7C3AED", "#EC4899"], [0, 1], 0, 0, 0, 0, 0, 24)
        .drawCircle(0, 0, 24);
    iconBackground.x = iconHalo.x;
    iconBackground.y = iconHalo.y;
    container.addChild(iconBackground);

    var icon = new createjs.Text("\u2139", "700 30px 'Baloo 2'", "#FFFFFF");
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = iconBackground.x;
    icon.y = iconBackground.y + 4;
    container.addChild(icon);

    var title = new createjs.Text("How to Play", "700 24px 'Baloo 2'", "#fef6ff");
    title.x = 74;
    title.y = 12;
    container.addChild(title);

    var subtitle = new createjs.Text(
        "Follow the quick guide",
        "500 12px 'Baloo 2'",
        "rgba(230, 212, 255, 0.8)"
    );
    subtitle.x = 74;
    subtitle.y = 40;
    container.addChild(subtitle);

    var underline = new createjs.Shape();
    underline.graphics
        .beginLinearGradientFill(["rgba(152, 118, 255, 0.85)", "rgba(255, 154, 228, 0.55)"], [0, 1], 0, 0, 80, 0)
        .drawRoundRect(74, 58, 86, 4, 2);
    underline.alpha = 0.9;
    container.addChild(underline);

    return container;
}

function createIntroActionButton() {
    var button = new createjs.Container();
    button.name = "IntroActionButton";
    button.mouseChildren = false;
    button.mouseEnabled = false;
    button.cursor = "pointer";
    button.shadow = new createjs.Shadow("rgba(10, 12, 34, 0.48)", 0, 20, 40);

    var BUTTON_WIDTH = 236;
    var BUTTON_HEIGHT = 74;
    var BUTTON_CORNER = 32;

    var glow = new createjs.Shape();
    glow.name = "glow";
    glow.alpha = 0.8;
    button.addChild(glow);
    button.glowShape = glow;

    var base = new createjs.Shape();
    base.name = "base";
    button.addChild(base);

    var outline = new createjs.Shape();
    outline.name = "outline";
    button.addChild(outline);

    var highlightMask = new createjs.Shape();
    highlightMask.name = "highlightMask";
    highlightMask.graphics.drawRoundRect(
        -BUTTON_WIDTH / 2 + 6,
        -BUTTON_HEIGHT / 2 + 6,
        BUTTON_WIDTH - 12,
        BUTTON_HEIGHT - 12,
        BUTTON_CORNER - 6
    );
    highlightMask.visible = false;
    button.addChild(highlightMask);

    var highlight = new createjs.Shape();
    highlight.name = "highlight";
    highlight.alpha = 0;
    highlight.mask = highlightMask;
    highlight.compositeOperation = "lighter";
    highlight.baseX = -148;
    highlight.x = highlight.baseX;
    highlight.graphics
        .beginLinearGradientFill(
            ["rgba(255, 255, 255, 0)", "rgba(255, 246, 255, 0.6)", "rgba(255, 255, 255, 0)"],
            [0, 0.5, 1],
            -72,
            0,
            72,
            0
        )
        .drawRoundRect(-72, -42, 144, 84, 28);
    button.addChild(highlight);
    button.highlightSweep = highlight;
    button.highlightMask = highlightMask;

    var iconBadge = new createjs.Shape();
    iconBadge.name = "iconBadge";
    iconBadge.x = -82;
    iconBadge.y = 0;
    button.addChild(iconBadge);

    var icon = new createjs.Text("", "700 30px 'Baloo 2'", "#FFFFFF");
    icon.name = "icon";
    icon.textAlign = "center";
    icon.textBaseline = "middle";
    icon.x = -82;
    icon.y = 0;
    button.addChild(icon);

    var label = new createjs.Text("", "700 28px 'Baloo 2'", "#FFFFFF");
    label.name = "label";
    label.textAlign = "left";
    label.textBaseline = "middle";
    label.x = -28;
    label.y = 0;
    label.shadow = new createjs.Shadow("rgba(6, 8, 24, 0.65)", 0, 3, 6);
    button.addChild(label);

    button.__glowTweenAttached = false;
    button.__highlightTweenAttached = false;
    button.__outlineWidth = BUTTON_WIDTH;
    button.__outlineHeight = BUTTON_HEIGHT;
    button.__outlineCorner = BUTTON_CORNER;
    applyHowToPlayButtonState(button, "skip");

    button.scaleX = button.scaleY = 0.96;
    button.__layoutHalfWidth = BUTTON_WIDTH / 2;
    button.__layoutHalfHeight = BUTTON_HEIGHT / 2;

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
    var iconBadge = button.getChildByName("iconBadge");
    var outline = button.getChildByName("outline");
    var glow = button.getChildByName("glow");
    if (base) {
        base.graphics.clear();
    }
    if (highlight) {
        highlight.graphics.clear();
        createjs.Tween.removeTweens(highlight);
        if (typeof highlight.baseX !== "number") {
            highlight.baseX = -148;
        }
        highlight.x = highlight.baseX;
        highlight.alpha = 0;
    }
    if (glow) {
        glow.graphics.clear();
        createjs.Tween.removeTweens(glow);
        glow.scaleX = glow.scaleY = 1;
    }

    button.__glowTweenAttached = false;
    button.__highlightTweenAttached = false;

    var outlineWidth = typeof button.__outlineWidth === "number" ? button.__outlineWidth : 236;
    var outlineHeight = typeof button.__outlineHeight === "number" ? button.__outlineHeight : 74;
    var outlineCorner = typeof button.__outlineCorner === "number" ? button.__outlineCorner : 32;

    if (outline) {
        outline.graphics.clear();
        outline.graphics
            .setStrokeStyle(2)
            .beginStroke("rgba(200, 170, 255, 0.45)")
            .drawRoundRect(
                -outlineWidth / 2,
                -outlineHeight / 2,
                outlineWidth,
                outlineHeight,
                outlineCorner
            );
    }

    var baseFillGradient = [
        "rgba(28, 16, 70, 0.96)",
        "rgba(46, 22, 104, 0.94)",
        "rgba(76, 31, 146, 0.92)"
    ];
    var baseStrokeGradient = [
        "rgba(158, 204, 255, 0.82)",
        "rgba(210, 176, 255, 0.72)"
    ];

    var highlightFill;

    if (state === "start") {
        if (glow) {
            glow.graphics
                .beginRadialGradientFill(
                    ["rgba(148, 227, 255, 0.6)", "rgba(148, 227, 255, 0)", "rgba(92, 70, 186, 0)"],
                    [0, 0.65, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    186
                )
                .drawCircle(0, 0, 186);
            glow.alpha = 0.92;
        }

        highlightFill = [
            "rgba(255, 255, 255, 0)",
            "rgba(255, 246, 255, 0.64)",
            "rgba(255, 255, 255, 0)"
        ];

        if (base) {
            base.graphics
                .beginLinearGradientStroke(baseStrokeGradient, [0, 1], -outlineWidth / 2, 0, outlineWidth / 2, 0)
                .setStrokeStyle(3)
                .beginLinearGradientFill(
                    [
                        "rgba(56, 88, 198, 0.97)",
                        "rgba(100, 68, 204, 0.95)",
                        "rgba(162, 86, 228, 0.94)"
                    ],
                    [0, 0.5, 1],
                    -outlineWidth / 2,
                    0,
                    outlineWidth / 2,
                    0
                )
                .drawRoundRect(-outlineWidth / 2, -outlineHeight / 2, outlineWidth, outlineHeight, outlineCorner);
        }

        if (iconBadge) {
            iconBadge.graphics.clear();
            iconBadge.graphics
                .beginRadialGradientFill(
                    ["rgba(255, 255, 255, 0.26)", "rgba(255, 255, 255, 0)"],
                    [0, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    38
                )
                .drawCircle(0, 0, 38);
            iconBadge.graphics
                .beginRadialGradientFill(["#ffd082", "#ff7fc0"], [0, 1], 0, 0, 0, 0, 0, 30)
                .drawCircle(0, 0, 30);
        }

        if (icon) {
            icon.text = "\u25B6";
            icon.font = "700 32px 'Baloo 2'";
            icon.color = "#fff7ff";
            icon.shadow = new createjs.Shadow("rgba(6, 8, 24, 0.5)", 0, 2, 6);
        }

        if (label) {
            label.text = "Start";
            label.font = "700 28px 'Baloo 2'";
            label.color = "#F7FAFF";
        }

        button.shadow = new createjs.Shadow("rgba(10, 12, 34, 0.55)", 0, 22, 44);
    } else {
        if (glow) {
            glow.graphics
                .beginRadialGradientFill(
                    ["rgba(136, 214, 255, 0.5)", "rgba(136, 214, 255, 0)", "rgba(80, 56, 166, 0)"],
                    [0, 0.65, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    180
                )
                .drawCircle(0, 0, 180);
            glow.alpha = 0.86;
        }

        highlightFill = [
            "rgba(255, 255, 255, 0)",
            "rgba(248, 236, 255, 0.58)",
            "rgba(255, 255, 255, 0)"
        ];

        if (base) {
            base.graphics
                .beginLinearGradientStroke(baseStrokeGradient, [0, 1], -outlineWidth / 2, 0, outlineWidth / 2, 0)
                .setStrokeStyle(3)
                .beginLinearGradientFill(baseFillGradient, [0, 0.5, 1], -outlineWidth / 2, 0, outlineWidth / 2, 0)
                .drawRoundRect(-outlineWidth / 2, -outlineHeight / 2, outlineWidth, outlineHeight, outlineCorner);
        }

        if (iconBadge) {
            iconBadge.graphics.clear();
            iconBadge.graphics
                .beginRadialGradientFill(
                    ["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)"],
                    [0, 1],
                    0,
                    0,
                    0,
                    0,
                    0,
                    36
                )
                .drawCircle(0, 0, 36);
            iconBadge.graphics
                .beginRadialGradientFill(["#9bcaff", "#c79cff"], [0, 1], 0, 0, 0, 0, 0, 28)
                .drawCircle(0, 0, 28);
        }

        if (icon) {
            icon.text = "\u279C";
            icon.font = "700 30px 'Baloo 2'";
            icon.color = "#fff2ff";
            icon.shadow = new createjs.Shadow("rgba(6, 8, 24, 0.45)", 0, 2, 5);
        }

        if (label) {
            label.text = "Skip";
            label.font = "700 26px 'Baloo 2'";
            label.color = "#F2F4FF";
        }

        button.shadow = new createjs.Shadow("rgba(8, 10, 30, 0.46)", 0, 20, 40);
    }

    if (highlight) {
        highlight.graphics
            .beginLinearGradientFill(highlightFill, [0, 0.5, 1], -72, 0, 72, 0)
            .drawRoundRect(-72, -42, 144, 84, 28);
        highlight.baseX = -148;
        highlight.x = highlight.baseX;
    }

    if (glow) {
        glow.alpha = state === "start" ? 0.92 : 0.86;
    }
    if (button.highlightMask && highlight) {
        highlight.mask = button.highlightMask;
    }

    if (label) {
        label.x = icon ? icon.x + 44 : -12;
        label.shadow = label.shadow || new createjs.Shadow("rgba(6, 8, 24, 0.65)", 0, 3, 6);
    }

    button.state = state;
    button.__layoutHalfWidth = outlineWidth / 2;
    button.__layoutHalfHeight = outlineHeight / 2;
}

function startIntroActionButtonAnimations(button) {
    if (!button) {
        return;
    }

    var glow = button.glowShape || button.getChildByName("glow");
    var highlight = button.highlightSweep || button.getChildByName("highlight");
    var state = button.state || "skip";

    var hasActiveTween = createjs.Tween && typeof createjs.Tween.hasActiveTweens === "function";

    if (glow) {
        var glowActive = hasActiveTween ? createjs.Tween.hasActiveTweens(glow) : false;
        if (!button.__glowTweenAttached || !glowActive) {
            createjs.Tween.removeTweens(glow);
            button.__glowTweenAttached = true;
            var maxAlpha = state === "start" ? 0.95 : 0.88;
            var minAlpha = state === "start" ? 0.74 : 0.66;
            var maxScale = state === "start" ? 1.14 : 1.08;

            createjs.Tween.get(glow, { loop: true })
                .to({ alpha: maxAlpha, scaleX: maxScale, scaleY: maxScale }, 640, createjs.Ease.quadOut)
                .to({ alpha: minAlpha, scaleX: 1, scaleY: 1 }, 680, createjs.Ease.quadInOut);
        }
    }

    if (highlight) {
        var highlightActive = hasActiveTween ? createjs.Tween.hasActiveTweens(highlight) : false;
        if (!button.__highlightTweenAttached || !highlightActive) {
            var startX = typeof highlight.baseX === "number" ? highlight.baseX : -148;
            var travelSpan = 296;
            var endX = startX + travelSpan;
            var sweepAlpha = state === "start" ? 0.62 : 0.48;
            var travelDuration = 1280;

            createjs.Tween.removeTweens(highlight);
            highlight.x = startX;
            highlight.alpha = 0;

            button.__highlightTweenAttached = true;

            createjs.Tween.get(highlight, { loop: true })
                .to({ alpha: sweepAlpha }, 280, createjs.Ease.quadOut)
                .to({ x: endX }, travelDuration, createjs.Ease.quadInOut)
                .to({ alpha: 0 }, 260, createjs.Ease.quadIn)
                .set({ x: startX })
                .wait(420);
        }
    }
}

function stopIntroActionButtonAnimations(button) {
    if (!button) {
        return;
    }

    var glow = button.glowShape || button.getChildByName("glow");
    var highlight = button.highlightSweep || button.getChildByName("highlight");
    var state = button.state || "skip";

    if (glow) {
        createjs.Tween.removeTweens(glow);
        glow.scaleX = glow.scaleY = 1;
        glow.alpha = state === "start" ? 0.92 : 0.82;
    }
    button.__glowTweenAttached = false;

    if (highlight) {
        createjs.Tween.removeTweens(highlight);
        highlight.alpha = 0;
        if (typeof highlight.baseX === "number") {
            highlight.x = highlight.baseX;
        }
    }
    button.__highlightTweenAttached = false;
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

    if (HowToPlayScreenImg.header) {
        stopHowToPlayHeaderIdleAnimation(HowToPlayScreenImg.header);
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

    createjs.Tween.removeTweens(button);
    button.__pulseTweenAttached = false;
    button.__highlightSweepAttached = false;

    if (button.glowShape) {
        createjs.Tween.removeTweens(button.glowShape);
        button.glowShape.alpha = 0.75;
        button.glowShape.scaleX = button.glowShape.scaleY = 1;
        button.glowShape.__glowTweenAttached = false;
    }

    if (button.highlightSweep) {
        createjs.Tween.removeTweens(button.highlightSweep);
        button.highlightSweep.alpha = 0;
        button.highlightSweep.x = typeof button.highlightSweep.baseX === "number" ? button.highlightSweep.baseX : -140;
    }

    if (button.tildeWave) {
        button.tildeWave.visible = howToPlayWaveTransferred;
        if (button.tildeWave.visible) {
            startHowToPlayTildeWaveAnimation(button.tildeWave);
        }
    }

    createjs.Tween.get(button, { override: true })
        .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 260, createjs.Ease.quadOut)
        .call(function () {
            startProceedButtonPulse(button);
            startProceedButtonGlow(button);
            startProceedButtonHighlightSweep(button);
        });

    // Ensure the control is visible even if tweens do not advance (e.g., paused tickers)
    button.alpha = 1;
    button.scaleX = button.scaleY = 1;
    if (stage && typeof stage.update === "function") {
        stage.update();
    }
}

function transferHowToPlayTildeWaveToProceedButton() {
    if (howToPlayWaveTransferred) {
        return;
    }

    if (!HowToPlayScreenImg) {
        return;
    }

    var headerWave = HowToPlayScreenImg.header && HowToPlayScreenImg.header.tildeWave
        ? HowToPlayScreenImg.header.tildeWave
        : null;
    if (headerWave) {
        stopHowToPlayTildeWaveAnimation(headerWave);
        headerWave.visible = false;
    }

    var proceedButton = HowToPlayScreenImg.proceedButton;
    if (proceedButton && proceedButton.tildeWave) {
        proceedButton.tildeWave.visible = true;
        startHowToPlayTildeWaveAnimation(proceedButton.tildeWave);
    }

    howToPlayWaveTransferred = true;
}

function hideLoaderProceedButton() {
    if (!HowToPlayScreenImg || !HowToPlayScreenImg.proceedButton) {
        return;
    }

    var button = HowToPlayScreenImg.proceedButton;
    if (button.visible || button.alpha > 0) {
        createjs.Tween.get(button, { override: true }).to({ alpha: 0, scaleX: 0.92, scaleY: 0.92 }, 160, createjs.Ease.quadIn);
    }
    createjs.Tween.removeTweens(button);
    button.__pulseTweenAttached = false;
    if (button.glowShape) {
        createjs.Tween.removeTweens(button.glowShape);
        button.glowShape.__glowTweenAttached = false;
    }
    if (button.highlightSweep) {
        createjs.Tween.removeTweens(button.highlightSweep);
        button.highlightSweep.alpha = 0;
        button.highlightSweep.x = typeof button.highlightSweep.baseX === "number" ? button.highlightSweep.baseX : -140;
        button.__highlightSweepAttached = false;
    }
    button.alpha = 0;
    button.scaleX = button.scaleY = 0.92;
    button.mouseEnabled = false;
    button.mouseChildren = false;
    button.visible = false;

    if (button.tildeWave) {
        stopHowToPlayTildeWaveAnimation(button.tildeWave);
        button.tildeWave.visible = false;
    }

    if (stage && typeof stage.update === "function") {
        stage.update();
    }
}

function startProceedButtonPulse(button) {
    if (!button || button.__pulseTweenAttached) {
        return;
    }

    button.__pulseTweenAttached = true;
    createjs.Tween.get(button, { loop: true })
        .to({ scaleX: 1.05, scaleY: 1.05 }, 360, createjs.Ease.quadOut)
        .to({ scaleX: 1, scaleY: 1 }, 420, createjs.Ease.quadInOut);
}

function startProceedButtonGlow(button) {
    if (!button) {
        return;
    }

    var glow = button.glowShape;
    if (glow && !glow.__glowTweenAttached) {
        glow.__glowTweenAttached = true;
        createjs.Tween.get(glow, { loop: true })
            .to({ alpha: 0.78, scaleX: 1.12, scaleY: 1.12 }, 520, createjs.Ease.quadOut)
            .to({ alpha: 0.5, scaleX: 1, scaleY: 1 }, 560, createjs.Ease.quadIn);
    }

}

function startProceedButtonHighlightSweep(button) {
    if (!button || !button.highlightSweep || button.__highlightSweepAttached) {
        return;
    }

    var sweep = button.highlightSweep;
    var startX = typeof sweep.baseX === "number" ? sweep.baseX : -140;
    var endX = 140;

    createjs.Tween.removeTweens(sweep);
    sweep.x = startX;
    sweep.alpha = 0;

    button.__highlightSweepAttached = true;

    createjs.Tween.get(sweep, { loop: true })
        .to({ alpha: 0.45 }, 280, createjs.Ease.quadOut)
        .to({ x: endX }, 1280, createjs.Ease.quadInOut)
        .to({ alpha: 0 }, 260, createjs.Ease.quadIn)
        .set({ x: startX })
        .wait(420);
}


//==========================================================================//
var __isCreatingHowToPlay = false;

function createHowToPlay() {
    if (__isCreatingHowToPlay) {
        return;
    }

    __isCreatingHowToPlay = true;
    try {
        if (typeof handCursor !== "undefined" && handCursor) {
            handCursor.visible = false;
        }
        hideLoaderProceedButton();

        if (HowToPlayScreenImg) {
            HowToPlayScreenImg.visible = false;
        }

        createGameIntroAnimationPlay(true);
    } finally {
        __isCreatingHowToPlay = false;
    }
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
    refreshResponsiveLayout(true);

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
        // SAUIX tooltip refs
        var __tipVol = controlContainer && controlContainer.getChildByName("saux_tip_vol");
        var __tipFS = controlContainer && controlContainer.getChildByName("saux_tip_fs");
        var __tipClose = controlContainer && controlContainer.getChildByName("saux_tip_close");
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
            SAUIX_refreshTooltipsPositions();
            SAUIX_showTooltip(__tipVol);
        });
        volumeBtn.on("mouseout", function () {
            animateIconWrapper(volumeBtnWrapper, false);
            SAUIX_hideTooltip(__tipVol);
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
            SAUIX_refreshTooltipsPositions();
            SAUIX_showTooltip(__tipFS);
        });
        fullScreenBtn.on("mouseout", function () {
            animateIconWrapper(fullScreenBtnWrapper, false);
            fullScreenBtn.shadow = null;
            SAUIX_hideTooltip(__tipFS);
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
            SAUIX_refreshTooltipsPositions();
            SAUIX_showTooltip(__tipClose);
            closeBtn.shadow = new createjs.Shadow("rgba(255,138,128,0.6)", 0, 0, 18);
        });
        closeBtn.on("mouseout", function () {
            animateIconWrapper(closeBtnWrapper, false);
            SAUIX_hideTooltip(__tipClose);
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

    if (typeof Title !== "undefined" && Title) {
        Title.visible = true;

        var targetY = Title.y;
        Title.__layoutTargetY = targetY;

        var startingY = targetY;
        var startingAlpha = 1;

        if (!Title.__introShown) {
            startingY = targetY - 26;
            startingAlpha = 0;
            Title.__introShown = true;
        }

        Title.alpha = startingAlpha;
        Title.y = startingY;

        createjs.Tween.get(Title, { override: true })
            .to({ alpha: 1, y: targetY }, 460, createjs.Ease.quadOut);

        ensureTitleShimmerAnimation();
    }

    if (uniquebackGround) {
        if (runningBg == 1) {
            uniquebackGround.visible = false;
            uniquebackGround.alpha = 0.35;
        } else {
            uniquebackGround.visible = true;
            uniquebackGround.alpha = 1;
        }

        if (!uniquebackGround.__ambientAnimationAttached) {
            applyGameplayBackdropAnimations(uniquebackGround);
        }
    }
}
 
///////////////////////////////////////////////////

function internetErrorFn() {
    pauseTimer()
    timeOverImg.visible = false;
    gameOverImg.visible = false;
    questionOverImg.visible = false;
    if (typeof hideGameplayTimeUpBanner === "function") {
        hideGameplayTimeUpBanner(true);
    }
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
    stage.addChild(container4);

    if (GameFinishedImg) {
        GameFinishedImg.visible = false;
        if (GameFinishedImg.parent) {
            GameFinishedImg.parent.removeChild(GameFinishedImg);
        }
    }

    container4.parent.addChild(closeBtnFinal);
    closeBtnFinal.visible = true;
    closeBtnFinal.addEventListener("click", closeGameFn);
    closeBtnFinal.cursor = "pointer";

    var setFinishedTxt = new createjs.Text("", "600 46px 'Baloo 2'", "#F5ECFF");
    setFinishedTxt.textAlign = "center";
    setFinishedTxt.textBaseline = "middle";
    setFinishedTxt.lineWidth = 560;
    setFinishedTxt.lineHeight = 62;
    setFinishedTxt.x = 640;
    setFinishedTxt.y = 372;
    setFinishedTxt.visible = true;
    container4.parent.addChild(setFinishedTxt);

    var langKey = typeof assetsPathLang === "string" ? assetsPathLang : "";
    var copyType = "offline";

    if (intChkVar == 1) {
        copyType = "completeAll";
    } else if (intChkVar == 2) {
        copyType = "completeOne";
    }

    var overlayCopy = null;
    if (typeof SAUIX_getConnectivityCopy === "function") {
        overlayCopy = SAUIX_getConnectivityCopy(copyType, langKey);
    }

    if (overlayCopy && overlayCopy.title) {
        setFinishedTxt.text = overlayCopy.title;
    } else {
        if (intChkVar == 0) {
            if (assetsPathLang == "assets/GujaratiAssets/") {
                setFinishedTxt.text = "ઈન્ટરનેટ કનેક્શન નથી. ફરી પ્રયત્ન કરો...";
            } else if (assetsPathLang == "assets/ArabicAssets/") {
                setFinishedTxt.text = "...لا يوجد اتصال بالإنترنت. حاول مرة اخرى";
            } else if (assetsPathLang == "assets/TamilAssets/") {
                setFinishedTxt.text = "You're offline right now.";
            } else {
                setFinishedTxt.text = "You're offline right now.";

            }
        }
        if (intChkVar == 1) {
            if (assetsPathLang == "assets/GujaratiAssets/") {
                setFinishedTxt.text = "તમે દરેક કોયડા ઉકેલી લીધા છે. પરિણામ જાણવા ઉપર દર્શાવેલ close પર ક્લિક કરો...";
            } else if (assetsPathLang == "assets/ArabicAssets/") {
                setFinishedTxt.text = "لقد أكملت جميع الألغاز. انقر على إغلاق في الأعلى لرؤية النتائج...";
            } else if (assetsPathLang == "assets/TamilAssets/") {
                setFinishedTxt.text = "You have completed all the puzzles. Click close at top to see the results...";
            } else {
                setFinishedTxt.text = "You have completed all the puzzles. Click close at top to see the results...";
            }
        } else if (intChkVar == 2) {
            if (assetsPathLang == "assets/GujaratiAssets/") {
                setFinishedTxt.text = "તમે આ કોયડો ઉકેલી લીધો છે...";
            } else if (assetsPathLang == "assets/ArabicAssets/") {
                setFinishedTxt.text = "لقد أكملت هذا اللغز...";
            } else if (assetsPathLang == "assets/TamilAssets/") {
                setFinishedTxt.text = "You have completed this puzzle...";
            } else {
                setFinishedTxt.text = "You have completed this puzzle...";
            }
        }
    }

    if (intChkVar == 1 || intChkVar == 2) {
        if (container1.parent) {
            container1.parent.removeAllChildren();
        }
    }

    var measuredHeight = 0;
    try {
        measuredHeight = setFinishedTxt.getMeasuredHeight();
    } catch (setFinishedMeasureErr) {
        measuredHeight = 0;
    }

    if (!measuredHeight || !isFinite(measuredHeight)) {
        measuredHeight = setFinishedTxt.lineHeight || 62;
    }

    if (setFinishedTxt.text.length > 70) {
        setFinishedTxt.font = "600 40px 'Baloo 2'";
        setFinishedTxt.lineHeight = 58;
        try {
            measuredHeight = setFinishedTxt.getMeasuredHeight();
        } catch (setFinishedReMeasureErr) {
            measuredHeight = setFinishedTxt.lineHeight || 58;
        }
        if (!measuredHeight || !isFinite(measuredHeight)) {
            measuredHeight = setFinishedTxt.lineHeight || 58;
        }
    }

    var blockHeight = Math.max(measuredHeight, setFinishedTxt.lineHeight || 62);
    var targetCenterY = 372;
    if (blockHeight > 0) {
        targetCenterY = 360 + blockHeight / 2;
    }
    setFinishedTxt.y = targetCenterY;

    var shouldUseOverlay = typeof SAUIX_showConnectivityOverlay === "function" && overlayCopy;
    if (shouldUseOverlay) {
        SAUIX_showConnectivityOverlay({
            stage: stage,
            message: overlayCopy.title,
            detail: overlayCopy.detail,
            iconType: overlayCopy.iconType,
        });
        setFinishedTxt.visible = false;
    }
    intChkVar = -1

}


// ===== SAUIX: HUD tooltips (responsive, theme-aware) =====
function SAUIX_clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
function SAUIX_getStageMetrics() {
  var w = getLogicalCanvasWidth ? getLogicalCanvasWidth() : 1280;
  var h = getLogicalCanvasHeight ? getLogicalCanvasHeight() : 720;
  return { w: w, h: h, scale: SAUIX_clamp(w / 1280, 0.75, 1.25) };
}
function SAUIX_themeInfo() {
  var isDark=false, bgCols=null, labelColor=null, theme=null;
  try{ theme=getHudThemeConfig?getHudThemeConfig():null; }catch(e){}
  if (theme){
    isDark = !!(theme.isDark || theme.mode==="dark" || theme.appearance==="dark");
    if (theme.controlBackground && theme.controlBackground.colors && theme.controlBackground.colors.length>=2) bgCols=theme.controlBackground.colors.slice(0,2);
    if (theme.textStyles && theme.textStyles.label && theme.textStyles.label.color) labelColor = theme.textStyles.label.color;
  }
  if (!bgCols) bgCols = isDark ? ["rgba(18,26,40,0.98)","rgba(8,12,22,0.98)"] : ["rgba(255,255,255,0.98)","rgba(226,239,255,0.98)"];
  if (!labelColor) labelColor = isDark ? "#EAF2FF" : "#133559";
  return { isDark:isDark, bgCols:bgCols, labelColor:labelColor };
}
function SAUIX_createHudTooltip(text) {
  var t=SAUIX_themeInfo();
  var tip=new createjs.Container(); tip.mouseEnabled=false; tip.mouseChildren=false; tip.alpha=0; tip.visible=false; tip.name="saux_tip";
  var padX=12,padY=8,radius=10;
  var bg=new createjs.Shape();
  bg.graphics.beginLinearGradientFill(t.bgCols,[0,1],-100,-40,100,40).drawRoundRect(0,0,100,36,radius);
  bg.shadow=new createjs.Shadow("rgba(6,16,38,0.22)",0,6,14); tip.addChild(bg);
  var caretUp=new createjs.Shape(); caretUp.graphics.beginFill(t.bgCols[1]).moveTo(0,0).lineTo(12,0).lineTo(6,8).closePath(); caretUp.x=18; caretUp.y=36; caretUp.shadow=new createjs.Shadow("rgba(6,16,38,0.18)",0,4,8); tip.addChild(caretUp);
  var caretDn=new createjs.Shape(); caretDn.graphics.beginFill(t.bgCols[1]).moveTo(0,8).lineTo(12,8).lineTo(6,0).closePath(); caretDn.x=18; caretDn.y=-8; caretDn.shadow=new createjs.Shadow("rgba(6,16,38,0.18)",0,4,8); caretDn.visible=false; tip.addChild(caretDn);
  var label=new createjs.Text(String(text||""),"600 16px 'Baloo 2'", t.labelColor); label.textBaseline="middle"; label.x=padX; label.y=18; tip.addChild(label);
  var w=Math.max(60,Math.ceil(label.getMeasuredWidth())+padX*2), h=Math.max(32,Math.ceil(label.getMeasuredLineHeight())+padY*2);
  bg.graphics.clear().beginLinearGradientFill(t.bgCols,[0,1],-w/2,-h/2,w/2,h/2).drawRoundRect(0,0,w,h,radius); caretUp.y=h-2;
  tip.__w=w; tip.__h=h; tip.__caretUp=caretUp; tip.__caretDn=caretDn;
  return tip;
}
function SAUIX_positionTooltip(tip, anchor, align){
  if(!tip||!anchor) return;
  var M=SAUIX_getStageMetrics(), s=SAUIX_clamp(M.scale,0.85,1.2), margin=8;
  var w=tip.__w*s, h=tip.__h*s;
  tip.scaleX=tip.scaleY=s;
  var x=(anchor.x - w/2) + (align==="right"?-8:(align==="left"?8:0));
  var y=anchor.y - h - 20;
  var band=Math.max(240, Math.min(420, M.w*0.35));
  if (x < -band) x = -band;
  if (x + w > band) x = band - w;
  var topLimit=-M.h/2+margin, bottomLimit=M.h/2-margin;
  var flipBelow = (y < topLimit);
  if (flipBelow){ y = anchor.y + 20; if (y + h > bottomLimit) y = bottomLimit - h; tip.__caretUp.visible=false; tip.__caretDn.visible=true; tip.__caretDn.y=0; }
  else { if (y < topLimit) y = topLimit; tip.__caretUp.visible=true; tip.__caretDn.visible=false; tip.__caretUp.y=tip.__h-2; }
  tip.x=x; tip.y=y;
}
function SAUIX_attachControlTooltips(){
  if (!controlContainer) return;
  ["saux_tip_vol","saux_tip_fs","saux_tip_close"].forEach(function(n){ var old=controlContainer.getChildByName(n); if(old) controlContainer.removeChild(old); });
  var tipVol=SAUIX_createHudTooltip("Volume"); tipVol.name="saux_tip_vol"; controlContainer.addChild(tipVol);
  var tipFS=SAUIX_createHudTooltip("Fullscreen"); tipFS.name="saux_tip_fs"; controlContainer.addChild(tipFS);
  var tipClose=SAUIX_createHudTooltip("Close"); tipClose.name="saux_tip_close"; controlContainer.addChild(tipClose);
  if (controlContainer.setChildIndex){ controlContainer.setChildIndex(tipVol, controlContainer.getNumChildren()-1); controlContainer.setChildIndex(tipFS, controlContainer.getNumChildren()-1); controlContainer.setChildIndex(tipClose, controlContainer.getNumChildren()-1); }
  SAUIX_refreshTooltipsPositions(true);
}
function SAUIX_refreshTooltipsPositions(forceHide){
  if (!controlContainer) return;
  var tipVol=controlContainer.getChildByName("saux_tip_vol");
  var tipFS=controlContainer.getChildByName("saux_tip_fs");
  var tipClose=controlContainer.getChildByName("saux_tip_close");
  if (tipVol && volumeBtnWrapper) SAUIX_positionTooltip(tipVol, volumeBtnWrapper, "left");
  if (tipFS && fullScreenBtnWrapper) SAUIX_positionTooltip(tipFS, fullScreenBtnWrapper, "center");
  if (tipClose && closeBtnWrapper) SAUIX_positionTooltip(tipClose, closeBtnWrapper, "right");
  if (forceHide) [tipVol, tipFS, tipClose].forEach(function(t){ if(t){ t.visible=false; t.alpha=0; }});
}
function SAUIX_showTooltip(tip){ if(!tip) return; tip.visible=true; createjs.Tween.get(tip,{override:true}).to({alpha:1, y:tip.y-2},140,createjs.Ease.quadOut); }
function SAUIX_hideTooltip(tip){ if(!tip) return; createjs.Tween.get(tip,{override:true}).to({alpha:0, y:tip.y+2},120,createjs.Ease.quadIn).call(function(){ tip.visible=false; }); }