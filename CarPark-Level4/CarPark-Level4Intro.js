(function () {
    if (typeof createjs === "undefined") {
        return;
    }

    var INTRO_PROMPT_POSITION = { x: 615, y: 525.5 };
    var INTRO_CHOICE_POSITIONS = [
        { x: 608.5, y: 590 },
        { x: 250, y: 312.5 },
        { x: 950, y: 296.5 },
        { x: 605.5, y: 60 }
    ];
    var INTRO_BUTTON_POSITIONS = [
        { x: 70, y: 560 },
        { x: 325, y: 560 },
        { x: 865, y: 560 },
        { x: 1110, y: 560 }
    ];
    var INTRO_CHOICE_FRAMES = [2, 5, 15, 8];
    var INTRO_BUTTON_FRAMES = [3, 1, 0, 2];
    var INTRO_CHOICE_SCALE = 0.6;
    var INTRO_BUTTON_SCALE = 0.82;
    var INTRO_PHASE_TIMEOUT = 4800;
    var INTRO_PROMPT_COLOR_INDEX = 0;
    var INTRO_TEXT_POSITION = { x: 0, y: 110 };
    var INTRO_DIRPOS_TEXT_POSITION = { x: 700, y: 551 };

    function resolveLocalizedPromptPosition(usedDirPosGraphic) {
        var base = usedDirPosGraphic ? INTRO_DIRPOS_TEXT_POSITION : INTRO_TEXT_POSITION;
        var position = { x: base.x, y: base.y };

        if (typeof lang === "string") {
            var normalizedLang = lang.toLowerCase();

            if (usedDirPosGraphic) {
                if (normalizedLang === "tamilquestiontext/" || normalizedLang === "banglaquestiontext/") {
                    position.y = 610;
                }
            } else {
                if (normalizedLang === "tamilquestiontext/" || normalizedLang === "banglaquestiontext/") {
                    position.y = 165;
                }
            }
        }

        return position;
    }

    var Questxt = 0;
    var setIntroCnt = 0;
    var removeIntraval = 0;
    var carParkIntroState = null;

    function shouldSkipIntro() {
        return typeof stopValue !== "undefined" && stopValue === 0;
    }

    function getStageParent() {
        if (!container || !container.parent) {
            return null;
        }

        return container.parent;
    }

    function cloneAsset(source) {
        if (!source || typeof source.clone !== "function") {
            return null;
        }

        try {
            return source.clone();
        } catch (err) {
            return null;
        }
    }

    function trackTween(state, target) {
        if (!state || !target) {
            return;
        }

        if (!state.tweenTargets) {
            state.tweenTargets = [];
        }

        if (state.tweenTargets.indexOf(target) === -1) {
            state.tweenTargets.push(target);
        }
    }

    function scheduleTimeout(state, callback, delay) {
        if (!state || typeof callback !== "function") {
            return null;
        }

        var handle = setTimeout(function () {
            if (state.timeouts) {
                var idx = state.timeouts.indexOf(handle);
                if (idx !== -1) {
                    state.timeouts.splice(idx, 1);
                }
            }

            callback();
        }, typeof delay === "number" ? delay : 0);

        if (!state.timeouts) {
            state.timeouts = [];
        }

        state.timeouts.push(handle);
        return handle;
    }

    function clearStateTimeouts(state) {
        if (!state || !state.timeouts) {
            return;
        }

        for (var i = 0; i < state.timeouts.length; i++) {
            clearTimeout(state.timeouts[i]);
        }

        state.timeouts.length = 0;
    }

    function removeDisplayObjects(state) {
        if (!state || !state.parent) {
            return;
        }

        var parent = state.parent;
        var toRemove = state.displayObjects || [];
        for (var i = 0; i < toRemove.length; i++) {
            var child = toRemove[i];
            if (child && child.parent === parent) {
                parent.removeChild(child);
            }
        }

        state.displayObjects = [];
    }

    function clearPrompt(state) {
        if (!state) {
            return;
        }

        if (state.promptMode === "textPrompt") {
            if (typeof clearCarParkPromptAnchorOverride === "function") {
                clearCarParkPromptAnchorOverride();
            }

            if (typeof hideCarParkPrompt === "function") {
                hideCarParkPrompt();
            }
        } else if (state.promptDisplay) {
            if (state.promptDisplay.parent === state.parent) {
                state.parent.removeChild(state.promptDisplay);
            }
        }

        state.promptDisplay = null;
        state.promptMode = null;
    }

    function stopChoiceTweens(state) {
        if (!state || !state.tweenTargets) {
            return;
        }

        for (var i = 0; i < state.tweenTargets.length; i++) {
            createjs.Tween.removeTweens(state.tweenTargets[i]);
        }

        state.tweenTargets.length = 0;
    }

    function destroyIntroState() {
        if (!carParkIntroState) {
            return;
        }

        clearStateTimeouts(carParkIntroState);
        stopChoiceTweens(carParkIntroState);
        clearPrompt(carParkIntroState);
        removeDisplayObjects(carParkIntroState);

        carParkIntroState = null;
    }

    function applyTitlePosition(target) {
        if (!target) {
            return;
        }

        if (typeof applyTitlePanelPosition === "function") {
            applyTitlePanelPosition(target);
            return;
        }

        target.x = 120;
        target.y = 220;
    }

    function showPromptForPhase(state, phase) {
        if (!state) {
            return;
        }

        var useTextPrompt = typeof shouldUseCarParkTextPrompt === "function" ? shouldUseCarParkTextPrompt() : true;

        if (useTextPrompt) {
            state.promptMode = "textPrompt";

            if (typeof ensureCarParkPromptContainer === "function") {
                ensureCarParkPromptContainer();
            }

            if (typeof setCarParkPromptAnchorOverride === "function") {
                setCarParkPromptAnchorOverride({ x: INTRO_PROMPT_POSITION.x, y: INTRO_PROMPT_POSITION.y });
            }

            if (typeof prepareCarParkPromptForReveal === "function") {
                prepareCarParkPromptForReveal();
            }

            if (typeof updateCarParkPrompt === "function") {
                updateCarParkPrompt(INTRO_PROMPT_COLOR_INDEX, phase);
            }

            if (typeof revealCarParkPrompt === "function") {
                revealCarParkPrompt();
            }
            return;
        }

        var promptGraphic = null;
        var usedDirPosGraphic = false;
        if (typeof DirPosQuestionText !== "undefined" && DirPosQuestionText) {
            promptGraphic = cloneAsset(DirPosQuestionText);
            if (promptGraphic && typeof promptGraphic.gotoAndStop === "function") {
                promptGraphic.gotoAndStop(phase === 1 ? 1 : 0);
                usedDirPosGraphic = true;
            }
        }

        if (!promptGraphic && typeof questionText !== "undefined" && questionText) {
            promptGraphic = cloneAsset(questionText);
        }

        if (promptGraphic) {
            promptGraphic.visible = true;
            promptGraphic.alpha = 0;
            var promptPosition = resolveLocalizedPromptPosition(usedDirPosGraphic);
            promptGraphic.x = promptPosition.x;
            promptGraphic.y = promptPosition.y;
            state.parent.addChild(promptGraphic);
            state.displayObjects.push(promptGraphic);
            state.promptDisplay = promptGraphic;
            trackTween(state, promptGraphic);
            createjs.Tween.get(promptGraphic).to({ alpha: 1 }, 300, createjs.Ease.quadOut);
        }
    }

    function pulseChoice(target) {
        if (!target) {
            return;
        }

        var baseScale = target.__introBaseScale || INTRO_CHOICE_SCALE;
        target.scaleX = target.scaleY = baseScale;
        createjs.Tween.get(target, { loop: true })
            .to({ scaleX: baseScale * 1.05, scaleY: baseScale * 1.05 }, 360, createjs.Ease.sineInOut)
            .to({ scaleX: baseScale, scaleY: baseScale }, 360, createjs.Ease.sineInOut);
    }

    function animateChoices(state, onComplete) {
        if (!state) {
            if (typeof onComplete === "function") {
                onComplete();
            }
            return;
        }

        var delay = 0;
        for (var i = 0; i < state.choices.length; i++) {
            (function (choice, wait) {
                if (!choice) {
                    return;
                }

                choice.alpha = 0;
                choice.visible = true;
                trackTween(state, choice);
                createjs.Tween.get(choice)
                    .wait(wait)
                    .to({ alpha: 1, scaleX: INTRO_CHOICE_SCALE, scaleY: INTRO_CHOICE_SCALE }, 420, createjs.Ease.quadOut)
                    .call(function () {
                        pulseChoice(choice);
                    });
            })(state.choices[i], delay);

            delay += 180;
        }

        if (typeof onComplete === "function") {
            scheduleTimeout(state, onComplete, delay + 600);
        }
    }

    function animateButtons(state) {
        if (!state || !state.buttons.length) {
            return;
        }

        var delay = 120;
        for (var i = 0; i < state.buttons.length; i++) {
            var button = state.buttons[i];
            if (!button) {
                continue;
            }

            button.visible = true;
            button.alpha = 0;
            button.y = INTRO_BUTTON_POSITIONS[i].y + 20;
            trackTween(state, button);
            createjs.Tween.get(button)
                .wait(delay * (i + 1))
                .to({ alpha: 1, y: INTRO_BUTTON_POSITIONS[i].y, scaleX: INTRO_BUTTON_SCALE, scaleY: INTRO_BUTTON_SCALE }, 340, createjs.Ease.quadOut)
                .to({ scaleX: INTRO_BUTTON_SCALE * 0.95, scaleY: INTRO_BUTTON_SCALE * 0.95 }, 220, createjs.Ease.sineInOut)
                .to({ scaleX: INTRO_BUTTON_SCALE, scaleY: INTRO_BUTTON_SCALE }, 220, createjs.Ease.sineInOut);
        }
    }

    function buildIntroPhase(phase) {
        var parent = getStageParent();
        if (!parent) {
            return null;
        }

        var state = {
            parent: parent,
            phase: phase,
            choices: [],
            buttons: [],
            displayObjects: [],
            tweenTargets: [],
            timeouts: []
        };

        var background = cloneAsset(typeof holder !== "undefined" ? holder : null);
        if (background) {
            background.visible = true;
            parent.addChild(background);
            state.displayObjects.push(background);
        }

        var titleClone = cloneAsset(typeof Title !== "undefined" ? Title : null);
        if (titleClone) {
            applyTitlePosition(titleClone);
            titleClone.visible = true;
            parent.addChild(titleClone);
            state.displayObjects.push(titleClone);
        }

        var choiceTemplates = [
            typeof choice1 !== "undefined" ? choice1 : null,
            typeof choice2 !== "undefined" ? choice2 : null,
            typeof choice3 !== "undefined" ? choice3 : null,
            typeof choice4 !== "undefined" ? choice4 : null
        ];
        for (var i = 0; i < choiceTemplates.length; i++) {
            var choiceClone = cloneAsset(typeof choiceTemplates[i] !== "undefined" ? choiceTemplates[i] : null);
            if (!choiceClone) {
                state.choices.push(null);
                continue;
            }

            choiceClone.visible = false;
            if (typeof choiceClone.gotoAndStop === "function") {
                choiceClone.gotoAndStop(INTRO_CHOICE_FRAMES[i]);
            }

            choiceClone.x = INTRO_CHOICE_POSITIONS[i].x;
            choiceClone.y = INTRO_CHOICE_POSITIONS[i].y;
            choiceClone.scaleX = choiceClone.scaleY = INTRO_CHOICE_SCALE * 0.8;
            choiceClone.__introBaseScale = INTRO_CHOICE_SCALE;

            parent.addChild(choiceClone);
            state.displayObjects.push(choiceClone);
            state.choices.push(choiceClone);
        }

        if (typeof buttons !== "undefined" && buttons) {
            for (var j = 0; j < INTRO_BUTTON_POSITIONS.length; j++) {
                var buttonClone = cloneAsset(buttons);
                if (!buttonClone) {
                    state.buttons.push(null);
                    continue;
                }

                if (typeof buttonClone.gotoAndStop === "function") {
                    buttonClone.gotoAndStop(INTRO_BUTTON_FRAMES[j]);
                }

                buttonClone.x = INTRO_BUTTON_POSITIONS[j].x;
                buttonClone.y = INTRO_BUTTON_POSITIONS[j].y;
                buttonClone.scaleX = buttonClone.scaleY = INTRO_BUTTON_SCALE;
                buttonClone.visible = false;

                parent.addChild(buttonClone);
                state.displayObjects.push(buttonClone);
                state.buttons.push(buttonClone);
            }
        }

        return state;
    }

    function startIntroPhase(phase) {
        destroyIntroState();

        if (shouldSkipIntro()) {
            removeGameIntro();
            return;
        }

        var state = buildIntroPhase(phase);
        if (!state) {
            return;
        }

        carParkIntroState = state;
        showPromptForPhase(state, phase);

        animateChoices(state, function () {
            animateButtons(state);
            scheduleTimeout(state, function () {
                if (phase === 0) {
                    Questxt = 1;
                    commongameintro1();
                } else {
                    removeGameIntro();
                    if (typeof isVisibleStartBtn === "function") {
                        isVisibleStartBtn();
                    }
                }
            }, INTRO_PHASE_TIMEOUT);
        });
    }

    function carDisplay() {
        startIntroPhase(Questxt || 0);
    }

    function commongameintro() {
        Questxt = 0;
        carDisplay();
    }

    function commongameintro1() {
        Questxt = 1;
        carDisplay();
    }

    function setCallDelay() {
        clearInterval(removeIntraval);
        removeIntraval = 0;
        setIntroCnt++;

        removeGameIntro();

        if (shouldSkipIntro()) {
            return;
        }

        commongameintro();
    }

    function removeGameIntro() {
        destroyIntroState();
    }

    if (typeof window !== "undefined") {
        window.carDisplay = carDisplay;
        window.commongameintro = commongameintro;
        window.commongameintro1 = commongameintro1;
        window.setCallDelay = setCallDelay;
        window.removeGameIntro = removeGameIntro;
    }
})();

