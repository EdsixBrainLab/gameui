var isScreenRotation= "";
var isGetOrientation;
var isGamePlay = false;

(function(){
    var PleaseRotate = {},
        currentOrientation = null,
        isMobile1 = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent),
        init = false,
        orientationMediaQuery = null,
        orientationCheckTimer = null;

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
        "#pleaserotate-backdrop { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; padding: clamp(24px, 6vw, 48px); background: radial-gradient(circle at 12% 18%, rgba(149, 115, 255, 0.6), transparent 58%), radial-gradient(circle at 88% 22%, rgba(255, 150, 241, 0.55), transparent 62%), linear-gradient(135deg, rgba(10, 6, 32, 0.96) 0%, rgba(26, 12, 72, 0.94) 38%, rgba(47, 20, 118, 0.92) 76%, rgba(73, 26, 144, 0.9) 100%); color: #f6f2ff; font-family: 'Baloo 2','Questrial-Regular',sans-serif; letter-spacing: 0.02em; text-transform: none; opacity: 0; transition: opacity 260ms ease; z-index: 9999; box-sizing: border-box; }",
        "#pleaserotate-backdrop.is-visible { opacity: 1; }",
        "#pleaserotate-container { position: relative; width: min(430px, 92vw); display: flex; flex-direction: column; align-items: center; gap: clamp(18px, 4vw, 26px); padding: clamp(28px, 7vw, 40px) clamp(30px, 7vw, 42px); border-radius: 30px; background: linear-gradient(165deg, rgba(108, 71, 235, 0.82), rgba(147, 92, 245, 0.78) 58%, rgba(197, 124, 255, 0.74)); box-shadow: 0 28px 70px rgba(22, 6, 58, 0.5), 0 8px 18px rgba(76, 33, 180, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.25); text-align: center; backdrop-filter: blur(26px); -webkit-backdrop-filter: blur(26px); overflow: hidden; }",
        "#pleaserotate-container::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(145deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.04) 48%, rgba(255, 255, 255, 0.12) 100%); mix-blend-mode: screen; opacity: 0.65; pointer-events: none; }",
        "#pleaserotate-container::after { content: ''; position: absolute; inset: 18%; border-radius: 24px; background: radial-gradient(circle at 40% 0%, rgba(255, 255, 255, 0.38), transparent 72%); pointer-events: none; }",
        "#pleaserotate-graphic { position: relative; width: clamp(124px, 34vw, 168px); height: clamp(124px, 34vw, 168px); display: flex; align-items: center; justify-content: center; }",
        "#pleaserotate-graphic .pr-icon__glow { position: absolute; inset: 0; border-radius: 34px; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.32), rgba(176, 132, 255, 0.08) 64%, transparent 82%); animation: pr-glow 5.6s ease-in-out infinite; filter: blur(0.2px); }",
        "#pleaserotate-graphic .pr-icon__orbit { position: absolute; width: 94%; height: 94%; border-radius: 50%; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), rgba(113, 69, 235, 0.25) 58%, rgba(29, 12, 96, 0) 78%); box-shadow: inset 0 0 22px rgba(255, 255, 255, 0.14); opacity: 0.85; }",
        "#pleaserotate-graphic .pr-icon__ring { position: absolute; width: 78%; height: 78%; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.42); border-top-color: rgba(255, 255, 255, 0.88); border-left-color: rgba(255, 255, 255, 0.78); transform: rotate(-32deg); transform-origin: 50% 50%; animation: pr-ring 7.6s linear infinite; box-shadow: 0 0 16px rgba(255, 255, 255, 0.28); }",
        "#pleaserotate-graphic .pr-icon__ring::after { content: ''; position: absolute; top: -5px; right: 20px; width: 11px; height: 11px; border-radius: 50%; background: linear-gradient(135deg, #ffe8ff, #ffffff 62%); box-shadow: 0 0 12px rgba(255, 255, 255, 0.68); }",
        "#pleaserotate-graphic .pr-icon__device { position: relative; width: 58%; height: 74%; border-radius: 22px; background: linear-gradient(135deg, rgba(22, 14, 58, 0.95), rgba(76, 38, 158, 0.92)); box-shadow: 0 20px 34px rgba(10, 4, 32, 0.48), inset 0 0 0 1px rgba(255, 255, 255, 0.16); display: flex; align-items: center; justify-content: center; transform: rotate(16deg); animation: pr-device 5.2s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__device-screen { width: 72%; height: 68%; border-radius: 16px; background: linear-gradient(160deg, rgba(116, 80, 235, 0.82), rgba(194, 138, 255, 0.68)); box-shadow: inset 0 0 14px rgba(255, 255, 255, 0.24); }",
        "#pleaserotate-graphic .pr-icon__arrow { position: absolute; width: 88%; height: 88%; transform-origin: 50% 50%; animation: pr-arrow 6.4s ease-in-out infinite; filter: drop-shadow(0 8px 14px rgba(38, 12, 112, 0.35)); }",
        "#pleaserotate-graphic .pr-icon__arrow .pr-arrow__trail { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 190; stroke-dashoffset: 190; animation: pr-arrow-stroke 6.4s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__arrow .pr-arrow__head { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }",
        "#pleaserotate-graphic .pr-icon__hint { position: absolute; bottom: 8%; width: 44%; height: 44%; border-radius: 16px; border: 2px dashed rgba(255, 255, 255, 0.35); transform: rotate(-34deg); animation: pr-hint 6.8s ease-in-out infinite; }",
        "#pleaserotate-message { position: relative; z-index: 1; margin: 0; font-size: clamp(20px, 5vw, 28px); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }",
        "#pleaserotate-message strong { display: block; color: #ffffff; font-size: clamp(20px, 5vw, 28px); }",
        "#pleaserotate-message small { display: block; margin-top: clamp(8px, 2vw, 12px); font-size: clamp(13px, 3.2vw, 15px); font-weight: 500; letter-spacing: 0.06em; color: rgba(255, 244, 255, 0.78); }",
        "@media (prefers-reduced-motion: reduce) { #pleaserotate-backdrop, #pleaserotate-graphic .pr-icon__glow, #pleaserotate-graphic .pr-icon__ring, #pleaserotate-graphic .pr-icon__device, #pleaserotate-graphic .pr-icon__arrow, #pleaserotate-graphic .pr-icon__hint { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }"
    ];

    var cssKeyframeRules = [
        "pr-device { 0%,100% { transform: rotate(16deg) translateY(0); } 50% { transform: rotate(4deg) translateY(-7px); } }",
        "pr-ring { 0% { transform: rotate(-32deg); } 100% { transform: rotate(328deg); } }",
        "pr-hint { 0%,100% { opacity: 0.32; transform: rotate(-34deg) scale(0.94); } 50% { opacity: 0.66; transform: rotate(-28deg) scale(1.05); } }",
        "pr-glow { 0%,100% { opacity: 0.52; } 45% { opacity: 0.88; } }",
        "pr-arrow { 0%,100% { transform: rotate(-10deg); } 45% { transform: rotate(8deg); } }",
        "pr-arrow-stroke { 0% { stroke-dashoffset: 190; } 28% { stroke-dashoffset: 40; } 70% { stroke-dashoffset: -10; } 100% { stroke-dashoffset: -10; } }"
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
        var device = document.createElement('div');
        var screen = document.createElement('div');
        var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var hint = document.createElement('span');

        wrapper.setAttribute('id', 'pleaserotate-graphic');
        wrapper.className = 'pr-icon';

        glow.className = 'pr-icon__glow';
        orbit.className = 'pr-icon__orbit';
        ring.className = 'pr-icon__ring';
        device.className = 'pr-icon__device';
        screen.className = 'pr-icon__device-screen';
        arrow.setAttribute('class', 'pr-icon__arrow');
        arrow.setAttribute('viewBox', '0 0 80 80');
        arrow.setAttribute('role', 'presentation');

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
        stop1.setAttribute('stop-color', '#F4E7FF');
        stop1.setAttribute('stop-opacity', '1');

        var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '52%');
        stop2.setAttribute('stop-color', '#D2B3FF');
        stop2.setAttribute('stop-opacity', '1');

        var stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop3.setAttribute('offset', '100%');
        stop3.setAttribute('stop-color', '#8F6CFF');
        stop3.setAttribute('stop-opacity', '1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);

        defs.appendChild(gradient);

        var arrowStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowStroke.setAttribute('class', 'pr-arrow__trail');
        arrowStroke.setAttribute('d', 'M50 12c12.426 2.13 22 12.958 22 26 0 14.359-11.641 26-26 26-8.887 0-17.03-4.629-21.602-11.924');
        arrowStroke.setAttribute('stroke', 'url(#' + gradientId + ')');

        var arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowHead.setAttribute('class', 'pr-arrow__head');
        arrowHead.setAttribute('d', 'M47 10l13 5-9 8');
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
        hint.className = 'pr-icon__hint';

        device.appendChild(screen);
        wrapper.appendChild(glow);
        wrapper.appendChild(orbit);
        wrapper.appendChild(ring);
        wrapper.appendChild(device);
        wrapper.appendChild(arrow);
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
        if(window.matchMedia){
            var query = window.matchMedia('(orientation: portrait)');
            if(query && typeof query.matches === 'boolean'){
                return query.matches;
            }
        }

        return ( window.innerWidth < window.innerHeight);
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
