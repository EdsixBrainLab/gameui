var isScreenRotation= "";
var isGetOrientation;
var isGamePlay = false;

(function(){
    var PleaseRotate = {},
        currentOrientation = null,
        isMobile1 = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent),
        init = false;

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
        "#pleaserotate-backdrop { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; padding: clamp(24px, 6vw, 48px); background: radial-gradient(circle at 12% 18%, rgba(143, 108, 255, 0.55), transparent 58%), radial-gradient(circle at 88% 22%, rgba(255, 144, 240, 0.45), transparent 60%), linear-gradient(135deg, rgba(12, 6, 38, 0.94) 0%, rgba(27, 12, 72, 0.94) 34%, rgba(41, 18, 112, 0.92) 72%, rgba(62, 26, 140, 0.9) 100%); color: #f6f2ff; font-family: 'Baloo 2','Questrial-Regular',sans-serif; letter-spacing: 0.02em; text-transform: none; opacity: 0; transition: opacity 280ms ease; z-index: 9999; box-sizing: border-box; }",
        "#pleaserotate-backdrop.is-visible { opacity: 1; }",
        "#pleaserotate-container { position: relative; width: min(420px, 92vw); display: flex; flex-direction: column; align-items: center; gap: clamp(18px, 4vw, 26px); padding: clamp(26px, 7vw, 36px) clamp(28px, 7vw, 40px); border-radius: 28px; background: linear-gradient(160deg, rgba(84, 53, 202, 0.96), rgba(119, 63, 222, 0.92) 55%, rgba(170, 86, 242, 0.9)); box-shadow: 0 24px 60px rgba(27, 7, 76, 0.48), inset 0 0 0 1px rgba(255, 255, 255, 0.16); overflow: hidden; text-align: center; }",
        "#pleaserotate-container::after { content: ''; position: absolute; inset: 18%; border-radius: 22px; background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.16), transparent 70%); pointer-events: none; }",
        "#pleaserotate-graphic { position: relative; width: clamp(120px, 34vw, 160px); height: clamp(120px, 34vw, 160px); display: flex; align-items: center; justify-content: center; }",
        "#pleaserotate-graphic .pr-icon__glow { position: absolute; inset: 0; border-radius: 32px; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.24), rgba(176, 132, 255, 0.08) 62%, transparent 80%); animation: pr-glow 5.6s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__ring { position: absolute; width: 78%; height: 78%; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.4); border-top-color: rgba(255, 255, 255, 0.85); border-left-color: rgba(255, 255, 255, 0.85); transform: rotate(-40deg); transform-origin: 50% 50%; animation: pr-ring 7.2s linear infinite; box-shadow: 0 0 12px rgba(255, 255, 255, 0.2); }",
        "#pleaserotate-graphic .pr-icon__ring::after { content: ''; position: absolute; top: -6px; right: 18px; width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, #ffe0f7, #ffffff 60%); box-shadow: 0 0 10px rgba(255, 255, 255, 0.6); }",
        "#pleaserotate-graphic .pr-icon__device { position: relative; width: 60%; height: 74%; border-radius: 22px; background: linear-gradient(135deg, rgba(21, 13, 55, 0.95), rgba(73, 36, 153, 0.92)); box-shadow: 0 18px 32px rgba(10, 4, 32, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.12); display: flex; align-items: center; justify-content: center; transform: rotate(18deg); animation: pr-device 4.8s ease-in-out infinite; }",
        "#pleaserotate-graphic .pr-icon__device-screen { width: 72%; height: 68%; border-radius: 16px; background: linear-gradient(160deg, rgba(112, 78, 229, 0.8), rgba(186, 128, 255, 0.65)); box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.18); }",
        "#pleaserotate-graphic .pr-icon__hint { position: absolute; bottom: 10%; width: 46%; height: 46%; border-radius: 14px; border: 2px dashed rgba(255, 255, 255, 0.35); transform: rotate(-32deg); animation: pr-hint 6.4s ease-in-out infinite; }",
        "#pleaserotate-message { position: relative; z-index: 1; margin: 0; font-size: clamp(20px, 5vw, 28px); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }",
        "#pleaserotate-message strong { display: block; color: #ffffff; font-size: clamp(20px, 5vw, 28px); }",
        "#pleaserotate-message small { display: block; margin-top: clamp(8px, 2vw, 12px); font-size: clamp(13px, 3.2vw, 15px); font-weight: 500; letter-spacing: 0.06em; color: rgba(255, 244, 255, 0.78); }",
        "@media (prefers-reduced-motion: reduce) { #pleaserotate-backdrop, #pleaserotate-graphic .pr-icon__glow, #pleaserotate-graphic .pr-icon__ring, #pleaserotate-graphic .pr-icon__device, #pleaserotate-graphic .pr-icon__hint { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }"
    ];

    var cssKeyframeRules = [
        "pr-device { 0%,100% { transform: rotate(18deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-6px); } }",
        "pr-ring { 0% { transform: rotate(-40deg); } 100% { transform: rotate(320deg); } }",
        "pr-hint { 0%,100% { opacity: 0.35; transform: rotate(-32deg) scale(0.95); } 50% { opacity: 0.65; transform: rotate(-28deg) scale(1.03); } }",
        "pr-glow { 0%,100% { opacity: 0.55; } 45% { opacity: 0.85; } }"
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
        var ring = document.createElement('span');
        var device = document.createElement('div');
        var screen = document.createElement('div');
        var hint = document.createElement('span');

        wrapper.setAttribute('id', 'pleaserotate-graphic');
        wrapper.className = 'pr-icon';

        glow.className = 'pr-icon__glow';
        ring.className = 'pr-icon__ring';
        device.className = 'pr-icon__device';
        screen.className = 'pr-icon__device-screen';
        hint.className = 'pr-icon__hint';

        device.appendChild(screen);
        wrapper.appendChild(glow);
        wrapper.appendChild(ring);
        wrapper.appendChild(device);
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
        window.addEventListener( 'resize', checkOrientationChange, false );
        window.addEventListener( 'orientationchange', checkOrientationChange, false );

        if(window.screen && window.screen.orientation && typeof window.screen.orientation.addEventListener === 'function'){
            window.screen.orientation.addEventListener('change', checkOrientationChange);
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
        window.removeEventListener('resize', checkOrientationChange, false);
        window.removeEventListener('orientationchange', checkOrientationChange, false);

        if(window.screen && window.screen.orientation && typeof window.screen.orientation.removeEventListener === 'function'){
            window.screen.orientation.removeEventListener('change', checkOrientationChange);
        }
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
