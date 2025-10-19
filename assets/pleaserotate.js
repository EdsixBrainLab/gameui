var isScreenRotation= "";
var isGetOrientation;
var isGamePlay = false;

(function(){
    var PleaseRotate = {},
        currentOrientation = null,
        isMobile1 = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent),
        init = false,
        orientationMediaQuery = null,
        orientationCheckTimer = null,
        visualViewportListenerAttached = false;

    var options = {
        startOnPageLoad: true,
        onHide: function(){},
        onShow: function(){},
        forcePortrait: false,
        message: "Please Rotate Your Device",
        subMessage: "(OR ENABLE AUTO-ROTATE)",
        allowClickBypass: false,
        onlyMobile: true,
        zIndex: 3000,
        iconNode: null
    };

    var cssRules = [
        "#pleaserotate-backdrop { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; padding: clamp(24px, 6vw, 48px); background: radial-gradient(circle at 12% 20%, rgba(143, 110, 255, 0.6), transparent 58%), radial-gradient(circle at 86% 24%, rgba(255, 144, 240, 0.52), transparent 64%), linear-gradient(135deg, rgba(10, 6, 38, 0.96) 0%, rgba(28, 12, 74, 0.94) 38%, rgba(52, 20, 122, 0.92) 76%, rgba(78, 28, 152, 0.9) 100%); color: #f6f2ff; font-family: 'Baloo 2','Questrial-Regular',sans-serif; letter-spacing: 0.02em; text-transform: none; opacity: 0; transition: opacity 260ms ease; z-index: 9999; box-sizing: border-box; }",
        "#pleaserotate-backdrop.is-visible { opacity: 1; }",
        "#pleaserotate-container { position: relative; width: min(430px, 92vw); display: flex; flex-direction: column; align-items: center; gap: clamp(18px, 4vw, 26px); padding: clamp(28px, 7vw, 40px) clamp(30px, 7vw, 42px); border-radius: 30px; background: linear-gradient(165deg, rgba(98, 66, 224, 0.88), rgba(142, 88, 238, 0.84) 56%, rgba(192, 118, 255, 0.8)); box-shadow: 0 28px 70px rgba(22, 6, 58, 0.5), 0 8px 18px rgba(76, 33, 180, 0.38), inset 0 0 0 1px rgba(255, 255, 255, 0.22); text-align: center; backdrop-filter: blur(26px); -webkit-backdrop-filter: blur(26px); overflow: hidden; }",
        "#pleaserotate-container::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(255, 255, 255, 0.16) 100%); mix-blend-mode: screen; opacity: 0.68; pointer-events: none; }",
        "#pleaserotate-container::after { content: ''; position: absolute; inset: 18%; border-radius: 24px; background: radial-gradient(circle at 42% 0%, rgba(255, 255, 255, 0.42), transparent 74%); pointer-events: none; }",
        "#pleaserotate-graphic { position: relative; width: clamp(132px, 34vw, 176px); height: clamp(132px, 34vw, 176px); display: flex; align-items: center; justify-items: center; justify-content: center; }",
        "#pleaserotate-graphic .pr-icon__glow { position: absolute; inset: 0; border-radius: 36px; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.36), rgba(176, 132, 255, 0.1) 64%, transparent 82%); filter: blur(0.4px); opacity: 0.92; animation: pr-glow 6.2s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__orbit { position: absolute; width: 96%; height: 96%; border-radius: 50%; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), rgba(118, 82, 236, 0.3) 60%, rgba(24, 12, 74, 0) 80%); box-shadow: inset 0 0 26px rgba(120, 84, 240, 0.32); opacity: 0.9; }",
        "#pleaserotate-graphic .pr-icon__ring { position: absolute; width: 80%; height: 80%; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.42); border-top-color: rgba(255, 255, 255, 0.88); border-left-color: rgba(255, 255, 255, 0.78); transform: rotate(-26deg); transform-origin: 50% 50%; animation: pr-ring 8s linear infinite; box-shadow: 0 0 16px rgba(255, 255, 255, 0.28); }",
        "#pleaserotate-graphic .pr-icon__ring::after { content: ''; position: absolute; top: -6px; right: 18px; width: 12px; height: 12px; border-radius: 50%; background: linear-gradient(135deg, #ffe8ff, #ffffff 62%); box-shadow: 0 0 12px rgba(255, 255, 255, 0.68); }",
        "#pleaserotate-graphic .pr-icon__device { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 24px; box-shadow: 0 20px 32px rgba(14, 6, 46, 0.46), inset 0 0 0 1px rgba(255, 255, 255, 0.16); }",
        "#pleaserotate-graphic .pr-icon__device-screen { width: 76%; height: 72%; border-radius: 18px; background: linear-gradient(165deg, rgba(122, 88, 236, 0.88), rgba(186, 134, 255, 0.72)); box-shadow: inset 0 0 14px rgba(255, 255, 255, 0.28); }",
        "#pleaserotate-graphic .pr-icon__device-notch { position: absolute; top: 12%; left: 50%; width: 34%; height: 6px; border-radius: 3px; background: rgba(255, 255, 255, 0.38); transform: translateX(-50%); box-shadow: 0 0 6px rgba(255, 255, 255, 0.32); }",
        "#pleaserotate-graphic .pr-icon__device--portrait { width: 58%; height: 76%; left: 50%; top: 52%; transform: translate(-50%, -50%) rotate(12deg); background: linear-gradient(140deg, rgba(26, 14, 74, 0.96), rgba(78, 40, 164, 0.92)); animation: pr-device 6s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__device--landscape { width: 78%; height: 56%; left: 54%; top: 48%; transform: translate(-50%, -50%) rotate(-78deg); background: linear-gradient(145deg, rgba(36, 22, 92, 0.42), rgba(132, 94, 240, 0.28)); border: 1px solid rgba(255, 255, 255, 0.24); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); opacity: 0.72; animation: pr-device-ghost 6.4s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__device--landscape .pr-icon__device-screen { background: linear-gradient(160deg, rgba(158, 132, 255, 0.24), rgba(255, 255, 255, 0.08)); }",
        "#pleaserotate-graphic .pr-icon__arrow { position: absolute; width: 92%; height: 92%; transform-origin: 50% 50%; animation: pr-arrow 6.6s ease-in-out infinite; filter: drop-shadow(0 10px 16px rgba(33, 12, 94, 0.35)); }",
        "#pleaserotate-graphic .pr-icon__arrow .pr-arrow__trail { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 210; stroke-dashoffset: 210; animation: pr-arrow-stroke 6.6s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__arrow .pr-arrow__head { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }",
        "#pleaserotate-graphic .pr-icon__spark { position: absolute; top: 18%; right: 20%; width: 24%; height: 24%; border-radius: 50%; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0)); opacity: 0.7; animation: pr-spark 5.8s ease-in-out infinite; pointer-events: none; }",
        "#pleaserotate-graphic .pr-icon__hint { position: absolute; bottom: 12%; left: 50%; width: 68%; height: 26%; border-radius: 18px; background: linear-gradient(140deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0)); border: 1px solid rgba(255, 255, 255, 0.32); transform: translateX(-50%) rotate(-6deg); opacity: 0.74; animation: pr-hint 6.6s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__hint::before { content: ''; position: absolute; inset: 20% 18%; border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.4); opacity: 0.8; }",
        "#pleaserotate-graphic .pr-icon__hint::after { content: ''; position: absolute; top: 42%; left: 50%; width: 16%; height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.45); transform: translate(-50%, -50%); }",
        "#pleaserotate-message { position: relative; z-index: 1; margin: 0; font-size: clamp(20px, 5vw, 28px); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }",
        "#pleaserotate-message strong { display: block; color: #ffffff; font-size: clamp(20px, 5vw, 28px); }",
        "#pleaserotate-message small { display: block; margin-top: clamp(8px, 2vw, 12px); font-size: clamp(13px, 3.2vw, 15px); font-weight: 500; letter-spacing: 0.06em; color: rgba(255, 244, 255, 0.78); }",
        "@media (prefers-reduced-motion: reduce) { #pleaserotate-backdrop, #pleaserotate-graphic .pr-icon__glow, #pleaserotate-graphic .pr-icon__ring, #pleaserotate-graphic .pr-icon__device, #pleaserotate-graphic .pr-icon__device--landscape, #pleaserotate-graphic .pr-icon__arrow, #pleaserotate-graphic .pr-icon__hint, #pleaserotate-graphic .pr-icon__spark { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }"
    ];

    var cssKeyframeRules = [
        "pr-device { 0%,100% { transform: translate(-50%, -50%) rotate(12deg); } 50% { transform: translate(-50%, -54%) rotate(2deg); } }",
        "pr-device-ghost { 0%,100% { opacity: 0.62; transform: translate(-50%, -50%) rotate(-78deg) scale(0.96); } 50% { opacity: 0.88; transform: translate(-50%, -54%) rotate(-92deg) scale(1); } }",
        "pr-ring { 0% { transform: rotate(-26deg); } 100% { transform: rotate(334deg); } }",
        "pr-hint { 0%,100% { opacity: 0.52; transform: translateX(-50%) rotate(-6deg) scale(0.96); } 50% { opacity: 0.82; transform: translateX(-50%) rotate(-2deg) scale(1.02); } }",
        "pr-glow { 0%,100% { opacity: 0.72; } 45% { opacity: 1; } }",
        "pr-arrow { 0%,100% { transform: rotate(-12deg); } 45% { transform: rotate(10deg); } }",
        "pr-arrow-stroke { 0% { stroke-dashoffset: 210; } 28% { stroke-dashoffset: 38; } 70% { stroke-dashoffset: -16; } 100% { stroke-dashoffset: -16; } }",
        "pr-spark { 0%,100% { opacity: 0.52; transform: scale(0.92); } 45% { opacity: 0.9; transform: scale(1.06); } }"
    ];

    /* private functions */
   
    function overrideOptions(updates){
        var prop;
        for (var prop in updates){
            options[prop] = updates[prop];
        }
    }

    function setBodyClass(state){
        if(document.documentElement){
            document.documentElement.className = document.documentElement.className.replace( /(?:^|\s)pleaserotate-\S*/g , '' );
            document.documentElement.className += " pleaserotate-" + state;
        }
    }

    function addRules(sheet){

        var i;

        for(i = 0; i< cssRules.length; i++){
            sheet.insertRule(cssRules[i], 0);
        }

        sheet.insertRule("#pleaserotate-backdrop { z-index: " + options.zIndex + "}", 0);

        if(options.allowClickBypass){
            sheet.insertRule("#pleaserotate-backdrop { cursor: pointer }", 0);
        }

        if(options.forcePortrait){
            sheet.insertRule("#pleaserotate-backdrop { -webkit-transform-origin: 50% }", 0);

        }

        for(i = 0; i< cssKeyframeRules.length; i++){
            if (CSSRule.WEBKIT_KEYFRAMES_RULE) { // WebKit
                sheet.insertRule("@-webkit-keyframes " + cssKeyframeRules[i], 0);
            }
            else if (CSSRule.MOZ_KEYFRAMES_RULE) { // Mozilla
                sheet.insertRule("@-moz-keyframes " + cssKeyframeRules[i], 0);
            }
            else if (CSSRule.KEYFRAMES_RULE) { // W3C
                sheet.insertRule("@keyframes " + cssKeyframeRules[i], 0);
            }
        }

    }

    function createStyleSheet(){
        var style = document.createElement("style");
        style.appendChild(document.createTextNode("")); // I'm told we need this hack... something to do with safari but I don't feel like checking for sure
        document.head.insertBefore(style, document.head.firstChild);
        addRules(style.sheet);
    }

    function scheduleOrientationEvaluation(){
        if(orientationCheckTimer !== null){
            clearTimeout(orientationCheckTimer);
        }

        orientationCheckTimer = setTimeout(function(){
            orientationCheckTimer = null;
            checkOrientationChange();
        }, 90);
    }

    function clearOrientationEvaluation(){
        if(orientationCheckTimer !== null){
            clearTimeout(orientationCheckTimer);
            orientationCheckTimer = null;
        }
    }

    function attachVisualViewportListeners(){
        if(visualViewportListenerAttached){
            return;
        }

        if(window.visualViewport && typeof window.visualViewport.addEventListener === 'function'){
            window.visualViewport.addEventListener('resize', scheduleOrientationEvaluation, false);
            visualViewportListenerAttached = true;
        }
    }

    function detachVisualViewportListeners(){
        if(!visualViewportListenerAttached){
            return;
        }

        if(window.visualViewport && typeof window.visualViewport.removeEventListener === 'function'){
            window.visualViewport.removeEventListener('resize', scheduleOrientationEvaluation, false);
        }

        visualViewportListenerAttached = false;
    }

    function attachOrientationMediaListener(){
        detachOrientationMediaListener();

        if(!window.matchMedia){
            return;
        }

        var query = window.matchMedia('(orientation: portrait)');

        if(!query){
            return;
        }

        orientationMediaQuery = query;

        if(typeof query.addEventListener === 'function'){
            query.addEventListener('change', scheduleOrientationEvaluation);
        } else if(typeof query.addListener === 'function'){
            query.addListener(scheduleOrientationEvaluation);
        }
    }

    function detachOrientationMediaListener(){
        if(!orientationMediaQuery){
            return;
        }

        if(typeof orientationMediaQuery.removeEventListener === 'function'){
            orientationMediaQuery.removeEventListener('change', scheduleOrientationEvaluation);
        } else if(typeof orientationMediaQuery.removeListener === 'function'){
            orientationMediaQuery.removeListener(scheduleOrientationEvaluation);
        }

        orientationMediaQuery = null;
    }

    function createElements(){
        var backdrop = document.createElement("div"),
            container = document.createElement("div"),
            message = document.createElement("div"),
            subMessage = document.createElement("small");

        backdrop.setAttribute("id", "pleaserotate-backdrop");
        backdrop.setAttribute("role", "dialog");
        backdrop.setAttribute("aria-live", "polite");
        backdrop.setAttribute("aria-modal", "true");
        backdrop.setAttribute("aria-hidden", "true");

        container.setAttribute("id", "pleaserotate-container");
        message.setAttribute("id", "pleaserotate-message");

        backdrop.appendChild(container);

        if(options.iconNode !== null){
            container.appendChild(options.iconNode);
        } else {
            container.appendChild(createPhoneSVG());
        }

        container.appendChild(message);

        var messageHeading = document.createElement("strong");
        messageHeading.appendChild(document.createTextNode(options.message));
        message.appendChild(messageHeading);

        subMessage.appendChild(document.createTextNode(options.subMessage));
        message.appendChild(subMessage);

        document.body.appendChild(backdrop);

    }

    function createPhoneSVG(){
        var wrapper = document.createElement('div');
        var glow = document.createElement('span');
        var orbit = document.createElement('span');
        var ring = document.createElement('span');
        var portrait = document.createElement('div');
        var portraitScreen = document.createElement('div');
        var portraitNotch = document.createElement('span');
        var landscape = document.createElement('div');
        var landscapeScreen = document.createElement('div');
        var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var hint = document.createElement('span');
        var spark = document.createElement('span');

        wrapper.setAttribute('id', 'pleaserotate-graphic');
        wrapper.className = 'pr-icon';

        glow.className = 'pr-icon__glow';
        orbit.className = 'pr-icon__orbit';
        ring.className = 'pr-icon__ring';
        portrait.className = 'pr-icon__device pr-icon__device--portrait';
        portraitScreen.className = 'pr-icon__device-screen';
        portraitNotch.className = 'pr-icon__device-notch';
        landscape.className = 'pr-icon__device pr-icon__device--landscape';
        landscape.setAttribute('aria-hidden', 'true');
        landscapeScreen.className = 'pr-icon__device-screen';
        arrow.setAttribute('class', 'pr-icon__arrow');
        arrow.setAttribute('viewBox', '0 0 90 90');
        arrow.setAttribute('role', 'presentation');
        hint.className = 'pr-icon__hint';
        hint.setAttribute('aria-hidden', 'true');
        spark.className = 'pr-icon__spark';
        spark.setAttribute('aria-hidden', 'true');

        portrait.appendChild(portraitScreen);
        portrait.appendChild(portraitNotch);
        landscape.appendChild(landscapeScreen);

        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var gradientId = 'pr-arrow-gradient-' + Math.floor(Math.random() * 1000000);
        var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', gradientId);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#F9EDFF');

        var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '52%');
        stop2.setAttribute('stop-color', '#D6B9FF');

        var stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop3.setAttribute('offset', '100%');
        stop3.setAttribute('stop-color', '#926CFF');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);

        defs.appendChild(gradient);

        var arrowStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowStroke.setAttribute('class', 'pr-arrow__trail');
        arrowStroke.setAttribute('d', 'M28 22c6.6-12.6 19.3-21 33.8-21 19.2 0 34.2 15.4 34.2 34.2 0 15.8-10.6 29.8-25.8 33.6');
        arrowStroke.setAttribute('stroke', 'url(#' + gradientId + ')');

        var arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowHead.setAttribute('class', 'pr-arrow__head');
        arrowHead.setAttribute('d', 'M24 26l4.8-13.8 12 9.6');
        arrowHead.setAttribute('stroke', 'url(#' + gradientId + ')');

        arrow.appendChild(defs);
        arrow.appendChild(arrowStroke);
        arrow.appendChild(arrowHead);

        arrowStroke.setAttribute('stroke-width', '5');
        arrowHead.setAttribute('stroke-width', '5');
        arrowStroke.setAttribute('stroke-linecap', 'round');
        arrowHead.setAttribute('stroke-linecap', 'round');
        arrowStroke.setAttribute('stroke-linejoin', 'round');
        arrowHead.setAttribute('stroke-linejoin', 'round');

        wrapper.appendChild(glow);
        wrapper.appendChild(orbit);
        wrapper.appendChild(ring);
        wrapper.appendChild(landscape);
        wrapper.appendChild(portrait);
        wrapper.appendChild(arrow);
        wrapper.appendChild(spark);
        wrapper.appendChild(hint);

        return wrapper;
    }

    function setVisibility(visible){
        var backdropElement = document.getElementById("pleaserotate-backdrop");

        if(visible){
            if(backdropElement){
                if(backdropElement.style["display"] !== "flex"){
                    backdropElement.style["display"] = "flex";
                }

                backdropElement.setAttribute("aria-hidden", "false");

                if(window.requestAnimationFrame){
                    requestAnimationFrame(function(){
                        backdropElement.classList.add("is-visible");
                    });
                } else {
                    backdropElement.classList.add("is-visible");
                }

                isScreenRotation = "1";
                setStopRotation();
            }
        } else {
            if(backdropElement){
                backdropElement.classList.remove("is-visible");
                backdropElement.setAttribute("aria-hidden", "true");
                isScreenRotation = "0";

                setResumeRotation();

                setTimeout(function(){
                    if(!PleaseRotate.Showing){
                        backdropElement.style["display"] = "none";
                    }
                }, 320);
            }
        }
    }

    function orientationChanged(){
        var triggerOn = currentOrientation && !options.forcePortrait || !currentOrientation && options.forcePortrait,
            propogate;
            
        if(triggerOn){
            propogate = options.onShow();
            setBodyClass("showing");
            isScreenRotation = true;
        } else {
            propogate = options.onHide();
            setBodyClass("hiding");
             isScreenRotation = false;
        }


        if(propogate !== undefined && !propogate){
            return;
        }

        PleaseRotate.Showing = triggerOn;

        setVisibility(triggerOn);

    }

    function isPortrait(){
        if(window.screen && window.screen.orientation && typeof window.screen.orientation.type === 'string'){
            if(window.screen.orientation.type.indexOf('portrait') !== -1){
                return true;
            }
            if(window.screen.orientation.type.indexOf('landscape') !== -1){
                return false;
            }
        }

        if(typeof window.orientation === 'number'){
            var angle = Math.abs(window.orientation);
            if(angle === 90 || angle === 270){
                return false;
            }
            return true;
        }

        if(window.matchMedia){
            var query = window.matchMedia('(orientation: portrait)');
            if(query && typeof query.matches === 'boolean'){
                return query.matches;
            }
        }

        if(window.visualViewport){
            return window.visualViewport.height >= window.visualViewport.width;
        }

        return window.innerHeight >= window.innerWidth;
    }

    function checkOrientationChange(){
        if(!isMobile1 && options.onlyMobile){
            if(!init){
                init = true;
                setVisibility(false);
                setBodyClass("hiding");
                options.onHide(); // run this exactly once if not mobile
            }
            return;
        }

        var nextOrientation = isPortrait();

        if(currentOrientation !== nextOrientation){
            currentOrientation = nextOrientation;
            orientationChanged();
        }

        if(!init){
            init = true;
        }
    }

    /* public functions */

    PleaseRotate.start = function(opts){
        if(!document.body){
            window.addEventListener('load', PleaseRotate.start.bind(null, opts), false);
            return;
        }

        if(opts){
            overrideOptions(opts);
        }
        
        createStyleSheet();
        createElements();
        checkOrientationChange();
        attachOrientationMediaListener();
        attachVisualViewportListeners();

        window.addEventListener( 'resize', scheduleOrientationEvaluation, false );
        window.addEventListener( 'orientationchange', scheduleOrientationEvaluation, false );

        if(window.screen && window.screen.orientation && typeof window.screen.orientation.addEventListener === 'function'){
            window.screen.orientation.addEventListener('change', scheduleOrientationEvaluation);
        }

        if(options.allowClickBypass){
            document.getElementById("pleaserotate-backdrop").addEventListener("click", function(){
                var propogate = options.onHide();
                setBodyClass("hiding");
                PleaseRotate.Showing = false;
                
                if(propogate === undefined || propogate){
                    setVisibility(false);
                }
            });
        }
    }

    PleaseRotate.stop = function(){
        window.removeEventListener('resize', scheduleOrientationEvaluation, false);
        window.removeEventListener('orientationchange', scheduleOrientationEvaluation, false);

        if(window.screen && window.screen.orientation && typeof window.screen.orientation.removeEventListener === 'function'){
            window.screen.orientation.removeEventListener('change', scheduleOrientationEvaluation);
        }

        detachOrientationMediaListener();
        detachVisualViewportListeners();
        clearOrientationEvaluation();
    }

    PleaseRotate.onShow = function(fn){
        options.onShow = fn;

        if(init){
            // if we have already been initialized, force a check
            init = false;
            currentOrientation = null;
            checkOrientationChange();
        }
    };

    PleaseRotate.onHide = function(fn){
        options.onHide = fn;

        if(init){
            // if we have already been initialized, force a check so that onHide gets called
            currentOrientation = null;
            init = false;
            checkOrientationChange();
        }
    };

    PleaseRotate.Showing = false;

    /* plumbing to support AMD, CommonJS, or Globals */

    if (typeof define === 'function' && define.amd) {
        setBodyClass("initialized");
        define(['PleaseRotate'], function() {
            return PleaseRotate;
        });
    } else if (typeof exports === 'object') {
        setBodyClass("initialized");
        module.exports = PleaseRotate;
    } else {
        setBodyClass("initialized");
        window.PleaseRotate = PleaseRotate;
        overrideOptions(window.PleaseRotateOptions);

        if (options.startOnPageLoad) {
            PleaseRotate.start();
        }
    }

})();
