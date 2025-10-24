var alphaNumericIntroRoot;
var alphaNumericIntroOptions = [];
var alphaNumericIntroTweens = [];
var ALPHA_NUMERIC_INTRO_DATA = {
    prompt: "Tap the matching code to answer the question.",
    question: "Which code matches the letter shown?",
    sampleLetter: "G",
    choices: [
        { badge: "A", code: "A = 1", description: "Each letter has a number." },
        { badge: "G", code: "G = 7", description: "Tap the matching code." },
        { badge: "K", code: "K = 11", description: "Look for the highlighted number." }
    ],
    highlightedIndex: 1
};

function alphaNumericIntroResolvePalette(state) {
    var sharedPalette =
        typeof ALPHA_NUMERIC_CHOICE_STATES !== "undefined"
            ? ALPHA_NUMERIC_CHOICE_STATES
            : null;

    if (state === "highlight" && sharedPalette && sharedPalette.hover) {
        return {
            base: sharedPalette.hover.base,
            badge: sharedPalette.hover.badge,
            label: sharedPalette.hover.label,
            text: sharedPalette.hover.text,
            badgeLabel: sharedPalette.hover.badgeLabel || "#45319f",
            halo: sharedPalette.hover.halo != null ? sharedPalette.hover.halo : 0.82,
            ring: "rgba(255,255,255,0.92)",
            ringAlpha: 1
        };
    }

    if (state === "highlight") {
        return {
            base: ["rgba(140,236,255,0.98)", "rgba(86,168,246,0.98)"],
            badge: ["#ffffff", "#f2f9ff"],
            label: "rgba(255,255,255,0.94)",
            text: "#ffffff",
            badgeLabel: "#2539a2",
            halo: 0.92,
            ring: "rgba(255,255,255,0.96)",
            ringAlpha: 1
        };
    }

    if (sharedPalette && sharedPalette[state]) {
        return sharedPalette[state];
    }

    var fallback = {
        idle: {
            base: ["rgba(110,92,250,0.95)", "rgba(72,54,188,0.96)"],
            badge: ["#ffffff", "#efe8ff"],
            label: "rgba(255,255,255,0.78)",
            text: "#ffffff",
            badgeLabel: "#45319f",
            halo: 0.6,
            ring: "rgba(255,255,255,0.38)",
            ringAlpha: 0.55
        },
        hover: {
            base: ["#8a74ff", "#5b48d4"],
            badge: ["#ffffff", "#efe8ff"],
            label: "rgba(255,255,255,0.9)",
            text: "#ffffff",
            badgeLabel: "#45319f",
            halo: 0.82,
            ring: "rgba(255,255,255,0.75)",
            ringAlpha: 0.92
        },
        highlight: {
            base: ["#3ee3b5", "#27b08c"],
            badge: ["#ffffff", "#d7fff4"],
            label: "rgba(255,255,255,0.92)",
            text: "#153c33",
            badgeLabel: "#15503e",
            halo: 0.95,
            ring: "rgba(70,218,184,0.92)",
            ringAlpha: 1
        }
    };

    return fallback[state] || fallback.idle;
}

function alphaNumericIntroApplyPalette(option, palette) {
    if (!option || !palette) {
        return;
    }

    option.background.graphics
        .clear()
        .beginLinearGradientFill(palette.base, [0, 1], -220, -72, 220, 72)
        .drawRoundRect(-240, -78, 480, 156, 36);
    option.badgeCircle.graphics
        .clear()
        .beginLinearGradientFill(palette.badge, [0, 1], 0, -36, 0, 36)
        .drawCircle(0, 0, 36);
    option.optionLabel.color = palette.label;
    option.optionCode.color = palette.text;
    option.optionDescription.color = palette.label;
    option.badgeLabel.color = palette.badgeLabel || "#45319f";
    option.badgeHalo.alpha = palette.halo != null ? palette.halo : 0.6;
    if (option.focusRing) {
        option.focusRing.graphics
            .clear()
            .setStrokeStyle(6, "round", "round")
            .beginStroke(palette.ring || "rgba(255,255,255,0.4)")
            .drawRoundRect(-248, -86, 496, 172, 44);
        option.focusRing.alpha = palette.ringAlpha != null ? palette.ringAlpha : 0.55;
    }
}

function alphaNumericIntroResetAffordance(option) {
    if (!option || !option.focusPulse) {
        return;
    }
    createjs.Tween.removeTweens(option.focusPulse);
    option.focusPulse.visible = false;
    option.focusPulse.alpha = 0;
    var baseScale = option.scaleX != null ? option.scaleX : 1;
    option.focusPulse.scaleX = baseScale;
    option.focusPulse.scaleY = baseScale;
    option.__affordanceActive = false;
}

function alphaNumericIntroTriggerAffordance(option) {
    if (!option || !option.focusPulse) {
        return;
    }
    alphaNumericIntroResetAffordance(option);
    option.__affordanceActive = true;
    option.focusPulse.visible = true;
    var baseScale = option.scaleX != null ? option.scaleX : 1;
    option.focusPulse.scaleX = option.focusPulse.scaleY = baseScale;
    createjs.Tween.get(option.focusPulse, { loop: 2, override: true })
        .to({ alpha: 0.85, scaleX: baseScale * 1.08, scaleY: baseScale * 1.08 }, 240, createjs.Ease.quadOut)
        .to({ alpha: 0, scaleX: baseScale * 1.18, scaleY: baseScale * 1.18 }, 240, createjs.Ease.quadIn)
        .call(function () {
            if (option && option.focusPulse) {
                option.focusPulse.visible = false;
                option.focusPulse.alpha = 0;
                option.__affordanceActive = false;
            }
        });
}

function alphaNumericIntroComputeLayout(count) {
    var total = parseInt(count, 10);
    if (!total || total <= 0) {
        return [];
    }

    var centerX = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;
    var rows = total <= 3 ? 1 : 2;
    var perRow = Math.ceil(total / rows);
    var rowSpacing = 182;
    var baseY = 470;
    var offsetY = ((rows - 1) * rowSpacing) / 2;
    var layoutData = [];
    var choiceIdx = 0;

    for (var r = 0; r < rows; r++) {
        if (choiceIdx >= total) {
            break;
        }

        var remaining = total - choiceIdx;
        var rowCount = Math.min(perRow, remaining);
        var layout =
            typeof SAUI_computeCenteredRow === "function"
                ? SAUI_computeCenteredRow(rowCount, {
                    centerX: centerX,
                    baseSpacing: 360,
                    tileSpan: 480,
                    maxSpan: 980,
                    minScale: 0.9,
                    baseScale: 1
                })
                : null;

        for (var c = 0; c < rowCount; c++) {
            var x;
            if (layout && layout.positions && layout.positions.length) {
                x = layout.positions[c];
            } else {
                var rowWidth = (rowCount - 1) * 360;
                x = centerX - rowWidth / 2 + c * 360;
            }
            layoutData.push({
                x: x,
                y: baseY + r * rowSpacing - offsetY,
                scale: layout && typeof layout.scale === "number" ? layout.scale : 1
            });
            choiceIdx++;
        }
    }

    return layoutData;
}

function alphaNumericBuildIntroOption(choice, index) {
    var wrapper = new createjs.Container();
    wrapper.cursor = "pointer";
    wrapper.mouseChildren = false;

    var focusPulse = new createjs.Shape();
    focusPulse.graphics
        .beginFill("rgba(255,255,255,0.16)")
        .drawRoundRect(-254, -92, 508, 184, 48);
    focusPulse.alpha = 0;
    focusPulse.visible = false;

    var background = new createjs.Shape();
    background.graphics
        .beginLinearGradientFill([
            "rgba(110,92,250,0.95)",
            "rgba(72,54,188,0.96)"
        ], [0, 1], -220, -72, 220, 72)
        .drawRoundRect(-240, -78, 480, 156, 36);

    var badgeHalo = new createjs.Shape();
    badgeHalo.graphics
        .beginRadialGradientFill([
            "rgba(255,255,255,0.32)",
            "rgba(255,255,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 64)
        .drawCircle(0, 0, 64);
    badgeHalo.alpha = 0.6;
    badgeHalo.x = -150;

    var badgeCircle = new createjs.Shape();
    badgeCircle.graphics
        .beginLinearGradientFill([
            "#fff",
            "#e6dcff"
        ], [0, 1], 0, -36, 0, 36)
        .drawCircle(0, 0, 36);
    badgeCircle.x = -150;

    var badgeLabel = new createjs.Text(choice.badge || "", "700 26px Quicksand", "#45319f");
    badgeLabel.textAlign = "center";
    badgeLabel.textBaseline = "middle";
    badgeLabel.x = -150;

    var optionLabel = new createjs.Text("Option " + String.fromCharCode(65 + index), "600 20px Quicksand", "rgba(255,255,255,0.82)");
    optionLabel.x = -90;
    optionLabel.y = -42;

    var optionCode = new createjs.Text(choice.code || "", "700 32px Quicksand", "#ffffff");
    optionCode.x = -90;
    optionCode.y = -6;

    var optionDescription = new createjs.Text(choice.description || "", "500 22px Quicksand", "rgba(255,255,255,0.78)");
    optionDescription.x = -90;
    optionDescription.y = 34;

    var focusRing = new createjs.Shape();
    focusRing.graphics
        .setStrokeStyle(6, "round", "round")
        .beginStroke("rgba(255,255,255,0.38)")
        .drawRoundRect(-248, -86, 496, 172, 44);
    focusRing.alpha = 0.55;

    wrapper.addChild(
        focusPulse,
        background,
        badgeHalo,
        badgeCircle,
        badgeLabel,
        optionLabel,
        optionCode,
        optionDescription,
        focusRing
    );

    wrapper.background = background;
    wrapper.badgeHalo = badgeHalo;
    wrapper.badgeCircle = badgeCircle;
    wrapper.optionLabel = optionLabel;
    wrapper.optionCode = optionCode;
    wrapper.optionDescription = optionDescription;
    wrapper.badgeLabel = badgeLabel;
    wrapper.focusRing = focusRing;
    wrapper.focusPulse = focusPulse;
    wrapper.__baseY = 0;
    wrapper.__baseIntroState = "idle";
    wrapper.__currentIntroState = "idle";

    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#000").drawRoundRect(-260, -96, 520, 192, 48);
    wrapper.hitArea = hitArea;

    wrapper.on("mouseover", function () {
        alphaNumericIntroSetState(wrapper, "hover", { updateBase: false });
        alphaNumericIntroTriggerAffordance(wrapper);
    });
    wrapper.on("mouseout", function () {
        alphaNumericIntroResetAffordance(wrapper);
        var baseState = wrapper.__baseIntroState || "idle";
        alphaNumericIntroSetState(wrapper, baseState);
    });

    return wrapper;
}

function alphaNumericIntroSetState(option, state, options) {
    if (!option) {
        return;
    }

    var targetState = state || "idle";
    var shouldUpdateBase = !(options && options.updateBase === false) && targetState !== "hover";
    if (shouldUpdateBase) {
        option.__baseIntroState = targetState;
    }
    option.__currentIntroState = targetState;

    var palette = alphaNumericIntroResolvePalette(targetState === "hover" ? "hover" : targetState);
    alphaNumericIntroApplyPalette(option, palette);
}

function commongameintro() {
    if (!container || !container.parent) {
        return;
    }

    removeGameIntro();

    alphaNumericIntroRoot = new createjs.Container();
    alphaNumericIntroRoot.name = "alphaNumericIntroRoot";
    container.parent.addChild(alphaNumericIntroRoot);

    call_UI_gameQuestion(container, ALPHA_NUMERIC_INTRO_DATA.prompt);

    var introTitle = Title ? Title.clone() : new createjs.Text("AlphaNumeric Encode", "700 48px Quicksand", "#ffffff");
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 640;
    introTitle.y = INTRO_TITLE_Y;
    alphaNumericIntroRoot.addChild(introTitle);

    var questionCard = new createjs.Container();
    questionCard.x = 640;
    questionCard.y = 270;

    var cardBackground = new createjs.Shape();
    cardBackground.graphics
        .beginLinearGradientFill([
            "rgba(255,255,255,0.96)",
            "rgba(236,240,255,0.92)"
        ], [0, 1], 0, -90, 0, 90)
        .drawRoundRect(-360, -110, 720, 220, 48);

    var cardGlow = new createjs.Shape();
    cardGlow.graphics
        .beginRadialGradientFill([
            "rgba(121,108,255,0.5)",
            "rgba(121,108,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 420)
        .drawCircle(0, 0, 420);
    cardGlow.alpha = 0.55;

    var questionLabel = new createjs.Text(ALPHA_NUMERIC_INTRO_DATA.question, "700 32px Quicksand", "#2b2961");
    questionLabel.textAlign = "center";
    questionLabel.lineWidth = 620;
    questionLabel.y = -24;

    var letterBadge = new createjs.Text(ALPHA_NUMERIC_INTRO_DATA.sampleLetter || "A", "700 64px Quicksand", "#4f36c2");
    letterBadge.textAlign = "center";
    letterBadge.y = 48;

    questionCard.addChild(cardGlow, cardBackground, questionLabel, letterBadge);
    alphaNumericIntroRoot.addChild(questionCard);

    alphaNumericIntroOptions = [];
    alphaNumericIntroTweens = [];

    var helperText = new createjs.Text(
        "Glowing cards are the answer options. Tap the highlighted one to start!",
        "600 24px Quicksand",
        "rgba(255,255,255,0.82)"
    );
    helperText.textAlign = "center";
    helperText.x = typeof getCanvasCenterX === "function" ? getCanvasCenterX() : 640;
    helperText.y = 652;
    helperText.alpha = 0;
    alphaNumericIntroRoot.addChild(helperText);

    var choices = ALPHA_NUMERIC_INTRO_DATA.choices || [];
    var layoutData = alphaNumericIntroComputeLayout(choices.length);
    for (var idx = 0; idx < choices.length; idx++) {
        var option = alphaNumericBuildIntroOption(choices[idx], idx);
        var layout = layoutData[idx] || { x: 640, y: 460 + idx * 170, scale: 1 };
        option.x = layout.x;
        option.y = layout.y;
        option.alpha = 0;
        option.scaleX = option.scaleY = layout.scale * 0.92;
        alphaNumericIntroRoot.addChild(option);
        alphaNumericIntroOptions.push(option);

        var tween = createjs.Tween.get(option)
            .wait(160 + idx * 120)
            .to({ alpha: 1, scaleX: layout.scale, scaleY: layout.scale }, 360, createjs.Ease.quadOut)
            .call((function (target) {
                return function () {
                    alphaNumericIntroSetState(target, "idle");
                };
            })(option));
        alphaNumericIntroTweens.push(tween);
    }

    createjs.Tween.get(helperText)
        .wait(choices.length ? 320 + choices.length * 90 : 200)
        .to({ alpha: 1 }, 320);

    var highlightIndex = ALPHA_NUMERIC_INTRO_DATA.highlightedIndex;
    if (typeof highlightIndex === "number" && alphaNumericIntroOptions[highlightIndex]) {
        var targetOption = alphaNumericIntroOptions[highlightIndex];
        var targetScale = layoutData[highlightIndex] && layoutData[highlightIndex].scale ? layoutData[highlightIndex].scale : 1;
        alphaNumericIntroSetState(targetOption, "highlight");
        var pulse = createjs.Tween.get(targetOption, { loop: true, override: false })
            .to({ scaleX: targetScale * 1.05, scaleY: targetScale * 1.05 }, 360, createjs.Ease.quadOut)
            .to({ scaleX: targetScale, scaleY: targetScale }, 340, createjs.Ease.quadIn);
        alphaNumericIntroTweens.push(pulse);
        createjs.Tween.get(targetOption)
            .wait(360 + highlightIndex * 120)
            .call(function () {
                alphaNumericIntroTriggerAffordance(targetOption);
            });
    }

    stage.update();
}

function removeGameIntro() {
    if (alphaNumericIntroTweens && alphaNumericIntroTweens.length) {
        for (var i = 0; i < alphaNumericIntroTweens.length; i++) {
            try {
                alphaNumericIntroTweens[i].setPaused(true);
            } catch (err) { }
        }
    }
    alphaNumericIntroTweens = [];

    if (alphaNumericIntroOptions && alphaNumericIntroOptions.length) {
        for (var j = 0; j < alphaNumericIntroOptions.length; j++) {
            var option = alphaNumericIntroOptions[j];
            if (option) {
                option.removeAllEventListeners();
                alphaNumericIntroResetAffordance(option);
                createjs.Tween.removeTweens(option);
            }
        }
    }
    alphaNumericIntroOptions = [];

    if (alphaNumericIntroRoot && alphaNumericIntroRoot.parent) {
        alphaNumericIntroRoot.parent.removeChild(alphaNumericIntroRoot);
    }
    alphaNumericIntroRoot = null;
}
