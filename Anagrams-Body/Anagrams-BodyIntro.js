var introQues1, introQuestxt, introChoice1, introChoice2, introChoice3, introChoice4, introClu1, introClu2, introClu3, introClu4, introHolder, introArrow, introfingure, introTitle;
var introChoice1TweenArr = []
var TempIntroVal;
var highlightTweenArr = []
var cluegotoArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 640; introQuestxtY = 150;
var introQues1X = 640, introQues1Y = 294
var introChoice1X = 376, introChoice1Y = 640;
var introChoice2X = 552, introChoice2Y = 640;
var introChoice3X = 728, introChoice3Y = 640;
var introChoice4X = 904, introChoice4Y = 640;
var introClu1X = 460, introClu1Y = 490;
var introClu2X = 580, introClu2Y = 490;
var introClu3X = 700, introClu3Y = 490;
var introClu4X = 820, introClu4Y = 490;
var introArrowX = introChoice2X, introArrowY = introClu1Y - 46;
var introfingureX = introChoice2X, introfingureY = introChoice2Y + 32;
var ArrowXArr = [null], FingXArr = [null];
var ArrowYArr = [null], FingYArr = [null];
var introClueArr = []
var introClueBgArr = []
var introChoiceBgArr = []
var introChoiceGlowArr = []
var introChoiceRevealOrder = [, 2, 4, 3, 1]
var introGlobalScope = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this)

var introAnagramScope = introGlobalScope;

if (!introAnagramScope.ANAGRAM_THEME_DATA) {
    introAnagramScope.ANAGRAM_THEME_DATA = {};
}

(function registerSharedAnagramThemes(scope) {
    if (!scope || typeof scope !== "object") {
        return;
    }

    var registry = scope.ANAGRAM_THEME_DATA || {};
    var defaults = {
        "Anagrams-Body": {
            scrambled: [
                "are",
                "keen",
                "inch",
                "cafe",
                "earth",
                "sink",
                "fringe",
                "waits",
                "lamp",
                "gel",
                "snail",
                "fits",
                "bread",
                "pines",
                "retain",
                "ones",
                "silver",
                "ship",
            ],
            answers: [
                "ear",
                "knee",
                "chin",
                "face",
                "heart",
                "skin",
                "finger",
                "waist",
                "palm",
                "leg",
                "nails",
                "fist",
                "beard",
                "spine",
                "retina",
                "nose",
                "livers",
                "hips",
            ],
            sampleIndex: 5,
            prompt: "Find the name of a body part that is an anagram of",
        },
        "Anagrams-Schools": {
            scrambled: [
                "dear",
                "silent",
                "cheat",
                "searcher",
                "porter",
                "renal",
                "dusty",
                "tower",
                "cautioned",
                "ward",
                "broad",
                "grained",
                "moor",
                "chorals",
                "bleats",
            ],
            answers: [
                "read",
                "listen",
                "teach",
                "research",
                "report",
                "learn",
                "study",
                "wrote",
                "education",
                "draw",
                "board",
                "reading",
                "room",
                "scholar",
                "tables",
            ],
            sampleIndex: 0,
            prompt: "Find the word related to school that is an anagram of",
        },
        "Anagrams-Animals": {
            scrambled: [
                "eigrt",
                "rbzae",
                "eamcl",
                "orseh",
                "peesh",
                "nomkey",
                "niepgo",
                "ibratb",
                "noekyd",
                "raptor",
                "garuja",
                "ilno",
            ],
            answers: [
                "tiger",
                "zebra",
                "camel",
                "horse",
                "sheep",
                "monkey",
                "pigeon",
                "rabbit",
                "donkey",
                "parrot",
                "jaguar",
                "lion",
            ],
            sampleIndex: 11,
            prompt: "Find the animal name that is an anagram of",
        },
        "Anagrams-Clothes": {
            scrambled: [
                "hrits",
                "astpn",
                "stkir",
                "vsgeol",
                "kecajt",
                "safrc",
                "seohs",
                "cksos",
                "lbet",
                "ssder",
                "svte",
                "anorp",
            ],
            answers: [
                "shirt",
                "pants",
                "skirt",
                "gloves",
                "jacket",
                "scarf",
                "shoes",
                "socks",
                "belt",
                "dress",
                "vest",
                "apron",
            ],
            sampleIndex: 8,
            prompt: "Find the clothing word that is an anagram of",
        },
        "Anagrams-Colors": {
            scrambled: [
                "reoang",
                "iotvle",
                "oyllwe",
                "purlep",
                "indoig",
                "rlcsaet",
                "erlsvi",
                "onrmao",
                "gemanta",
                "ncay",
                "cpeah",
                "radmlee",
            ],
            answers: [
                "orange",
                "violet",
                "yellow",
                "purple",
                "indigo",
                "scarlet",
                "silver",
                "maroon",
                "magenta",
                "cyan",
                "peach",
                "emerald",
            ],
            sampleIndex: 9,
            prompt: "Find the color name that is an anagram of",
        },
        "Anagrams-CountryNames": {
            scrambled: [
                "aanacd",
                "azlrib",
                "fenarc",
                "geeecr",
                "snpai",
                "ednews",
                "wyroan",
                "olandp",
                "eicoxm",
                "etyukr",
                "ygept",
                "almi",
            ],
            answers: [
                "canada",
                "brazil",
                "france",
                "greece",
                "spain",
                "sweden",
                "norway",
                "poland",
                "mexico",
                "turkey",
                "egypt",
                "mali",
            ],
            sampleIndex: 11,
            prompt: "Find the country name that is an anagram of",
        },
        "Anagrams-DolchWords": {
            scrambled: [
                "tobua",
                "fatre",
                "iagna",
                "wasyla",
                "aondur",
                "erfobe",
                "ecaeusb",
                "tbrete",
                "irgbn",
                "yrarc",
                "pyla",
                "ecanl",
            ],
            answers: [
                "about",
                "after",
                "again",
                "always",
                "around",
                "before",
                "because",
                "better",
                "bring",
                "carry",
                "play",
                "clean",
            ],
            sampleIndex: 10,
            prompt: "Find the sight word that is an anagram of",
        },
        "Anagrams-Food": {
            scrambled: [
                "aredb",
                "zizap",
                "alsad",
                "lerace",
                "retubt",
                "eheecs",
                "dlneoo",
                "totmoa",
                "reapsg",
                "opus",
                "sduont",
                "birotru",
            ],
            answers: [
                "bread",
                "pizza",
                "salad",
                "cereal",
                "butter",
                "cheese",
                "noodle",
                "tomato",
                "grapes",
                "soup",
                "donuts",
                "burrito",
            ],
            sampleIndex: 9,
            prompt: "Find the food word that is an anagram of",
        },
        "Anagrams-FourLetterWord": {
            scrambled: [
                "eimt",
                "alyp",
                "ovel",
                "kboo",
                "kiml",
                "astr",
                "eagm",
                "ihfs",
                "nari",
                "wdni",
                "osng",
                "reet",
            ],
            answers: [
                "time",
                "play",
                "love",
                "book",
                "milk",
                "star",
                "game",
                "fish",
                "rain",
                "wind",
                "song",
                "tree",
            ],
            sampleIndex: 0,
            prompt: "Find the four-letter word that is an anagram of",
        },
        "Anagrams-Geography": {
            scrambled: [
                "sdalin",
                "tsrdee",
                "lyealv",
                "soerft",
                "evrir",
                "nnocya",
                "ldaet",
                "ecnao",
                "lgoona",
                "niapsl",
                "autrnd",
                "ilhl",
            ],
            answers: [
                "island",
                "desert",
                "valley",
                "forest",
                "river",
                "canyon",
                "delta",
                "ocean",
                "lagoon",
                "plains",
                "tundra",
                "hill",
            ],
            sampleIndex: 11,
            prompt: "Find the geography word that is an anagram of",
        },
        "Anagrams-HouseHold": {
            scrambled: [
                "tleab",
                "iharc",
                "ccohu",
                "lpwiol",
                "iormrr",
                "errdwa",
                "alpm",
                "shlfe",
                "aicuntr",
                "tbkalne",
                "bekutc",
                "obrmo",
            ],
            answers: [
                "table",
                "chair",
                "couch",
                "pillow",
                "mirror",
                "drawer",
                "lamp",
                "shelf",
                "curtain",
                "blanket",
                "bucket",
                "broom",
            ],
            sampleIndex: 6,
            prompt: "Find the household word that is an anagram of",
        },
        "Anagrams-Jobs": {
            scrambled: [
                "unrse",
                "tiolp",
                "ehfc",
                "ekbra",
                "deguj",
                "ocahc",
                "rfaemr",
                "titsar",
                "kecrl",
                "tcroa",
                "gruad",
                "wrirte",
            ],
            answers: [
                "nurse",
                "pilot",
                "chef",
                "baker",
                "judge",
                "coach",
                "farmer",
                "artist",
                "clerk",
                "actor",
                "guard",
                "writer",
            ],
            sampleIndex: 2,
            prompt: "Find the job title that is an anagram of",
        },
        "Anagrams-Math": {
            scrambled: [
                "enagl",
                "artio",
                "tidig",
                "gphar",
                "geralab",
                "usm",
                "unsmi",
                "ediidv",
                "rfcota",
                "uqsear",
                "icelcr",
                "nile",
            ],
            answers: [
                "angle",
                "ratio",
                "digit",
                "graph",
                "algebra",
                "sum",
                "minus",
                "divide",
                "factor",
                "square",
                "circle",
                "line",
            ],
            sampleIndex: 11,
            prompt: "Find the math word that is an anagram of",
        },
        "Anagrams-Military": {
            scrambled: [
                "mary",
                "nvay",
                "tdcea",
                "audgr",
                "toplra",
                "prtoo",
                "rlief",
                "rarda",
                "ilrld",
                "ankst",
                "cidme",
                "osilra",
            ],
            answers: [
                "army",
                "navy",
                "cadet",
                "guard",
                "patrol",
                "troop",
                "rifle",
                "radar",
                "drill",
                "tanks",
                "medic",
                "sailor",
            ],
            sampleIndex: 0,
            prompt: "Find the military word that is an anagram of",
        },
        "Anagrams-People": {
            scrambled: [
                "mrthoe",
                "rehfat",
                "tsires",
                "hrobret",
                "rendif",
                "eetrcha",
                "corotd",
                "tasrit",
                "ledaer",
                "oneihbgr",
                "etndust",
                "naut",
            ],
            answers: [
                "mother",
                "father",
                "sister",
                "brother",
                "friend",
                "teacher",
                "doctor",
                "artist",
                "leader",
                "neighbor",
                "student",
                "aunt",
            ],
            sampleIndex: 11,
            prompt: "Find the people-related word that is an anagram of",
        },
        "Anagrams-Plants": {
            scrambled: [
                "efrlow",
                "ctausc",
                "hcdroi",
                "abmobo",
                "ovielt",
                "seor",
                "tlpui",
                "stpruo",
                "woiwll",
                "ssmo",
                "enfr",
                "cadre",
            ],
            answers: [
                "flower",
                "cactus",
                "orchid",
                "bamboo",
                "violet",
                "rose",
                "tulip",
                "sprout",
                "willow",
                "moss",
                "fern",
                "cedar",
            ],
            sampleIndex: 10,
            prompt: "Find the plant name that is an anagram of",
        },
        "Anagrams-Sports": {
            scrambled: [
                "ocsrec",
                "nitsen",
                "itcrkec",
                "ogixnb",
                "coehky",
                "glof",
                "ybrug",
                "gwonri",
                "atnkgis",
                "rechyra",
                "ccynlig",
                "akerat",
            ],
            answers: [
                "soccer",
                "tennis",
                "cricket",
                "boxing",
                "hockey",
                "golf",
                "rugby",
                "rowing",
                "skating",
                "archery",
                "cycling",
                "karate",
            ],
            sampleIndex: 5,
            prompt: "Find the sports word that is an anagram of",
        },
        "Anagrams-Vehicles": {
            scrambled: [
                "ructk",
                "sbu",
                "tooserc",
                "cbilcey",
                "sywabu",
                "trcarot",
                "itloabsa",
                "pnalreai",
                "emoocltyrc",
                "tockre",
                "erfry",
                "pjee",
            ],
            answers: [
                "truck",
                "bus",
                "scooter",
                "bicycle",
                "subway",
                "tractor",
                "sailboat",
                "airplane",
                "motorcycle",
                "rocket",
                "ferry",
                "jeep",
            ],
            sampleIndex: 11,
            prompt: "Find the vehicle word that is an anagram of",
        },
        "Anagrams-Weather": {
            scrambled: [
                "dlucoy",
                "nsuny",
                "motrs",
                "zrebee",
                "thduren",
                "iaonrbw",
                "etiwrn",
                "msumer",
                "anutmu",
                "rpnsig",
                "fggoy",
                "airn",
            ],
            answers: [
                "cloudy",
                "sunny",
                "storm",
                "breeze",
                "thunder",
                "rainbow",
                "winter",
                "summer",
                "autumn",
                "spring",
                "foggy",
                "rain",
            ],
            sampleIndex: 11,
            prompt: "Find the weather word that is an anagram of",
        },
    };

    for (var key in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, key) && !registry[key]) {
            registry[key] = defaults[key];
        }
    }

    scope.ANAGRAM_THEME_DATA = registry;
})(introAnagramScope);

if (typeof introAnagramScope.detectAnagramGameName !== "function") {
    introAnagramScope.detectAnagramGameName = function detectAnagramGameName(defaultName) {
        var scope = introAnagramScope || {};

        if (scope && typeof scope.ANAGRAM_GAME_NAME_OVERRIDE === "string") {
            return scope.ANAGRAM_GAME_NAME_OVERRIDE;
        }

        if (scope && typeof scope.gameName === "string" && scope.gameName.indexOf("Anagrams-") === 0) {
            return scope.gameName;
        }

        var path = scope.location && typeof scope.location.pathname === "string" ? scope.location.pathname : "";
        if (path) {
            var segments = path.split("/");
            for (var idx = segments.length - 1; idx >= 0; idx--) {
                var segment = segments[idx];
                if (segment && segment.indexOf("Anagrams-") === 0) {
                    return segment;
                }
            }
        }

        var doc = scope.document;
        if (doc && typeof doc.getElementsByTagName === "function") {
            var scripts = doc.getElementsByTagName("script");
            for (var i = scripts.length - 1; i >= 0; i--) {
                var src = scripts[i] && scripts[i].src ? scripts[i].src : "";
                if (!src) {
                    continue;
                }
                var match = src.match(/\/(Anagrams-[^\/]+)\//i);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }

        return typeof defaultName === "string" && defaultName ? defaultName : "Anagrams-Body";
    };
}

if (typeof introAnagramScope.getAnagramThemeConfig !== "function") {
    introAnagramScope.getAnagramThemeConfig = function getAnagramThemeConfig(gameName, fallbackName) {
        var scope = introAnagramScope || {};
        var registry = scope.ANAGRAM_THEME_DATA || {};

        var key = gameName && registry[gameName] ? gameName : null;
        if (!key && fallbackName && registry[fallbackName]) {
            key = fallbackName;
        }
        if (!key && registry["Anagrams-Body"]) {
            key = "Anagrams-Body";
        }

        var source = key ? registry[key] : { scrambled: [], answers: [] };
        var scrambled = Array.isArray(source.scrambled) ? source.scrambled.slice() : [];
        var answers = Array.isArray(source.answers) ? source.answers.slice() : [];
        var effectiveLen = Math.min(scrambled.length, answers.length);

        if (effectiveLen > 0) {
            scrambled.length = effectiveLen;
            answers.length = effectiveLen;
        } else {
            scrambled = [];
            answers = [];
        }

        var total = source.totalQuestions || effectiveLen;
        if (!total || total > effectiveLen) {
            total = effectiveLen;
        }

        var sampleIndex = typeof source.sampleIndex === "number" ? source.sampleIndex : 0;
        if (sampleIndex < 0 || sampleIndex >= answers.length) {
            sampleIndex = 0;
        }

        return {
            gameName: key || gameName || fallbackName || "Anagrams-Body",
            scrambled: scrambled,
            answers: answers,
            totalQuestions: total,
            sampleIndex: sampleIndex,
            prompt: source.prompt || "Find the anagram.",
        };
    };
}

var INTRO_DEFAULT_GAME_NAME = "Anagrams-Body";
var introGameName =
    typeof introAnagramScope.detectAnagramGameName === "function"
        ? introAnagramScope.detectAnagramGameName(INTRO_DEFAULT_GAME_NAME)
        : INTRO_DEFAULT_GAME_NAME;
var introThemeConfig =
    typeof introAnagramScope.getAnagramThemeConfig === "function"
        ? introAnagramScope.getAnagramThemeConfig(introGameName, INTRO_DEFAULT_GAME_NAME)
        : null;

if (!introThemeConfig) {
    introThemeConfig = {
        gameName: INTRO_DEFAULT_GAME_NAME,
        scrambled: [],
        answers: [],
        totalQuestions: 0,
        sampleIndex: 0,
        prompt: "Find the anagram.",
    };
}

var introAnswers = Array.isArray(introThemeConfig.answers) ? introThemeConfig.answers.slice() : [];
var introScrambledWords = Array.isArray(introThemeConfig.scrambled) ? introThemeConfig.scrambled.slice() : [];
var introSampleIndex = typeof introThemeConfig.sampleIndex === "number" ? introThemeConfig.sampleIndex : 0;

if (
    introSampleIndex < 0 ||
    introSampleIndex >= introAnswers.length ||
    (introAnswers[introSampleIndex] || "").length < 2
) {
    introSampleIndex = 0;
    for (var introIdx = 0; introIdx < introAnswers.length; introIdx++) {
        if ((introAnswers[introIdx] || "").length >= 4) {
            introSampleIndex = introIdx;
            break;
        }
    }
}

var introSampleAnswer = introAnswers[introSampleIndex] || "";
var introSampleScrambled = introScrambledWords[introSampleIndex] || introSampleAnswer;

if (!introSampleScrambled && introSampleAnswer) {
    introSampleScrambled = introSampleAnswer;
}

var introClueLetters = introSampleAnswer ? introSampleAnswer.toUpperCase().split("") : [];
var introChoiceLetters = introSampleScrambled ? introSampleScrambled.toUpperCase().split("") : [];

introClueLetters = introClueLetters.slice(0, 4);
introChoiceLetters = introChoiceLetters.slice(0, 4);

while (introClueLetters.length < 4) {
    introClueLetters.push("");
}

while (introChoiceLetters.length < 4) {
    introChoiceLetters.push("");
}

var introThemePrompt = introThemeConfig.prompt || "Find the anagram.";

introAnagramScope.CURRENT_ANAGRAM_INTRO_CONTEXT = {
    gameName: introThemeConfig.gameName || introGameName || INTRO_DEFAULT_GAME_NAME,
    prompt: introThemePrompt,
    sampleAnswer: introSampleAnswer,
    sampleScrambled: introSampleScrambled,
    clueLetters: introClueLetters.slice(),
    choiceLetters: introChoiceLetters.slice(),
};

function getBitmapNaturalBounds(bitmap) {
    if (!bitmap) {
        return null;
    }

    if (typeof bitmap.getBounds === "function") {
        var cached = bitmap.getBounds();
        if (cached) {
            return cached;
        }
    }

    if (bitmap.image) {
        return {
            x: 0,
            y: 0,
            width: bitmap.image.width || 0,
            height: bitmap.image.height || 0
        };
    }

    return null;
}

function configureIntroArrowSprite(sprite) {
    if (!sprite) {
        return;
    }

    var bounds = getBitmapNaturalBounds(sprite);
    var scale = 0.72;

    sprite.scaleX = sprite.scaleY = scale;
    sprite.mouseEnabled = false;
    sprite.mouseChildren = false;
    sprite.visible = false;
    sprite.alpha = 0;
    sprite.__tipGap = 26;
    sprite.__bounceOffset = 16;

    if (bounds) {
        var originX = (bounds.x || 0) + bounds.width / 2;
        var originY = (bounds.y || 0) + bounds.height;

        sprite.regX = originX;
        sprite.regY = originY;
    }
}

function configureIntroFingerSprite(sprite) {
    if (!sprite) {
        return;
    }

    var bounds = getBitmapNaturalBounds(sprite);
    var baseScale = typeof sprite.__baseScale === "number" ? sprite.__baseScale : 0.78;

    sprite.scaleX = sprite.scaleY = baseScale;
    sprite.mouseEnabled = false;
    sprite.mouseChildren = false;
    sprite.visible = false;
    sprite.alpha = 0;

    var pointerTip = sprite.__pointerTipBase || sprite.__pointerTip;
    if (pointerTip && typeof pointerTip.x === "number" && typeof pointerTip.y === "number") {
        sprite.__pointerOffsetX = pointerTip.x * baseScale;
        sprite.__pointerOffsetY = pointerTip.y * baseScale;
    } else if (bounds) {
        sprite.__pointerOffsetX = bounds.width * 0.42 * baseScale;
        sprite.__pointerOffsetY = bounds.height * 0.82 * baseScale;
    } else {
        sprite.__pointerOffsetX = 0;
        sprite.__pointerOffsetY = 0;
    }

    var pressDistanceBase = typeof sprite.__pressDistanceBase === "number" ? sprite.__pressDistanceBase : sprite.__pressDistance;
    if (typeof pressDistanceBase === "number") {
        sprite.__pressDistance = pressDistanceBase * baseScale;
    } else {
        sprite.__pressDistance = 18 * baseScale;
    }
}

function getFallbackChoiceBuilder() {
    var txt = new createjs.Text("", "700 64px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = true;
    txt.mouseChildren = false;
    txt.__baseScale = 0.8;
    return txt;
}

function getFallbackClueBuilder() {
    var txt = new createjs.Text("", "700 60px 'Baloo 2'", "#FFFFFF");
    txt.textAlign = "center";
    txt.textBaseline = "middle";
    txt.shadow = new createjs.Shadow("rgba(8,18,44,0.38)", 0, 6, 14);
    txt.mouseEnabled = false;
    txt.mouseChildren = false;
    txt.__baseScale = 1;
    return txt;
}

function getFallbackLetterUpdater() {
    return function (display, letter) {
        if (!display) {
            return;
        }
        var value = letter ? String(letter).toUpperCase() : "";
        display.text = value;
        display.alpha = value ? 1 : 0;
    };
}

var buildIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_buildChoiceLetterDisplay === "function" && window.SA_buildChoiceLetterDisplay) || getFallbackChoiceBuilder;
var updateIntroChoiceLetter = (typeof window !== "undefined" && typeof window.SA_updateChoiceLetterDisplay === "function" && window.SA_updateChoiceLetterDisplay) || getFallbackLetterUpdater();
var buildIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_buildClueLetterDisplay === "function" && window.SA_buildClueLetterDisplay) || getFallbackClueBuilder;
var updateIntroClueLetter = (typeof window !== "undefined" && typeof window.SA_updateClueLetterDisplay === "function" && window.SA_updateClueLetterDisplay) || getFallbackLetterUpdater();

function introChoiceIndexFromStep(step) {
    if (!step) {
        return step;
    }
    return introChoiceRevealOrder && introChoiceRevealOrder[step] ? introChoiceRevealOrder[step] : step;
}

function buildIntroGlowShape() {
    var glow = new createjs.Shape();
    glow.graphics
        .beginRadialGradientFill([
            "rgba(209,178,255,0.55)",
            "rgba(209,178,255,0)"
        ], [0, 1], 0, 0, 0, 0, 0, 120)
        .drawCircle(0, 0, 120);
    glow.alpha = 0;
    glow.visible = false;
    glow.mouseEnabled = false;
    glow.mouseChildren = false;
    return glow;
}

function highlightIntroChoiceTile(index, isActive) {
    if (!index) {
        return;
    }

    var tile = introGlobalScope && introGlobalScope["introChoice" + index];
    var bg = introChoiceBgArr[index];
    var glow = introChoiceGlowArr[index];

    if (bg) {
        var baseScale = bg.__baseScale || 1;
        drawChoiceTileBackground(bg, isActive ? CHOICE_TILE_HOVER_COLORS : CHOICE_TILE_BASE_COLORS);
        createjs.Tween.get(bg, { override: true })
            .to({
                scaleX: baseScale * (isActive ? 1.05 : 1),
                scaleY: baseScale * (isActive ? 1.05 : 1),
                alpha: isActive ? 1 : 0.95
            }, 200, createjs.Ease.quadOut);
    }

    if (tile) {
        var tileBase = tile.__baseScale || tile.scaleX || 0.8;
        createjs.Tween.get(tile, { override: true })
            .to({
                scaleX: tileBase * (isActive ? 1.08 : 1),
                scaleY: tileBase * (isActive ? 1.08 : 1),
                alpha: isActive ? 1 : tile.alpha
            }, 200, createjs.Ease.quadOut);
    }

    if (glow) {
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: isActive ? 0.52 : 0.35 }, 220, createjs.Ease.quadOut);
    }
}

function setIntroChoiceUsed(index) {
    if (!index) {
        return;
    }

    var tile = introGlobalScope && introGlobalScope["introChoice" + index];
    var bg = introChoiceBgArr[index];
    var glow = introChoiceGlowArr[index];

    if (bg) {
        drawChoiceTileBackground(bg, CHOICE_TILE_BASE_COLORS);
        createjs.Tween.get(bg, { override: true })
            .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
    }

    if (tile) {
        createjs.Tween.get(tile, { override: true })
            .to({ alpha: 0.55 }, 200, createjs.Ease.quadOut);
    }

    if (glow) {
        createjs.Tween.get(glow, { override: true })
            .to({ alpha: 0.2 }, 200, createjs.Ease.quadOut);
    }
}

function styleIntroClueSlot(index, isFilled) {
    if (!index) {
        return;
    }

    var bg = introClueBgArr[index];
    if (!bg) {
        return;
    }

    var baseScale = bg.__baseScale || 1;
    var colors = isFilled ? CLUE_SLOT_SUCCESS_COLORS : CLUE_SLOT_BASE_COLORS;
    drawClueSlotBackground(bg, colors);
    createjs.Tween.get(bg, { override: true })
        .to({
            scaleX: baseScale * (isFilled ? 1.06 : 1),
            scaleY: baseScale * (isFilled ? 1.06 : 1),
            alpha: isFilled ? 1 : 0.95
        }, 220, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 180, createjs.Ease.quadOut);
}

function highlightIntroClueTarget(index) {
    if (!index) {
        return;
    }

    var bg = introClueBgArr[index];
    if (!bg) {
        return;
    }

    var baseScale = bg.__baseScale || 1;
    drawClueSlotBackground(bg, CLUE_SLOT_HIGHLIGHT_COLORS);
    createjs.Tween.get(bg, { override: true })
        .to({ scaleX: baseScale * 1.04, scaleY: baseScale * 1.04, alpha: 1 }, 220, createjs.Ease.quadOut)
        .to({ scaleX: baseScale, scaleY: baseScale }, 200, createjs.Ease.quadOut);
}


function commongameintro() {
    introClueArr = [];
    introClueBgArr = [null];
    introChoiceBgArr = [null];
    introChoiceGlowArr = [null];
    ArrowXArr = [null];
    ArrowYArr = [null];
    FingXArr = [null];
    FingYArr = [null];

    introTitle = Title.clone();
    introClu1 = buildIntroClueLetter();
    introClu2 = buildIntroClueLetter();
    introClu3 = buildIntroClueLetter();
    introClu4 = buildIntroClueLetter();
    introChoice1 = buildIntroChoiceLetter();
    introChoice2 = buildIntroChoiceLetter();
    introChoice3 = buildIntroChoiceLetter();
    introChoice4 = buildIntroChoiceLetter();
    introArrow = arrow1.clone();
    introfingure = fingure.clone();
    configureIntroArrowSprite(introArrow);
    configureIntroFingerSprite(introfingure);

    container.parent.addChild(introTitle);
    introTitle.visible = true;

    call_UI_introQuestionCardContainer(container, introSampleScrambled);

    introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    if (introQuestxt) {
        introQuestxt.text = introThemePrompt;
    }
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, { padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke: "rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22 });
    introQuestxt.visible = true;
    introQuestxt.x = introQuestxtX;
    introQuestxt.y = introQuestxtY;

    if (introQuestxt.__labelBG && typeof introQuestxt.__labelBG.update === "function") {
        introQuestxt.__labelBG.update();
    }

    var choicePointerTargets = {};
    var choiceConfigs = [
        { index: 1, x: introChoice1X, y: introChoice1Y, letter: introChoiceLetters[0] || "" },
        { index: 2, x: introChoice2X, y: introChoice2Y, letter: introChoiceLetters[1] || "" },
        { index: 3, x: introChoice3X, y: introChoice3Y, letter: introChoiceLetters[2] || "" },
        { index: 4, x: introChoice4X, y: introChoice4Y, letter: introChoiceLetters[3] || "" }
    ];

    for (var c = 0; c < choiceConfigs.length; c++) {
        var cfg = choiceConfigs[c];
        var glow = buildIntroGlowShape();
        glow.x = cfg.x;
        glow.y = cfg.y + 6;
        glow.visible = false;
        glow.alpha = 0;
        introChoiceGlowArr[cfg.index] = glow;
        container.parent.addChild(glow);

        var bg = new createjs.Shape();
        drawChoiceTileBackground(bg);
        bg.x = cfg.x;
        bg.y = cfg.y;
        bg.visible = false;
        bg.alpha = 0;
        var baseLetterScale = 0.8;
        bg.__baseScale = baseLetterScale * 1.08;
        bg.shadow = new createjs.Shadow("rgba(10,18,44,0.45)", 0, 12, 28);
        bg.mouseEnabled = false;
        bg.mouseChildren = false;
        introChoiceBgArr[cfg.index] = bg;
        container.parent.addChild(bg);

        var letter = introGlobalScope && introGlobalScope["introChoice" + cfg.index];
        if (!letter) {
            continue;
        }
        letter.x = cfg.x;
        letter.y = cfg.y;
        letter.scaleX = letter.scaleY = baseLetterScale;
        letter.__baseScale = baseLetterScale;
        letter.__baseX = cfg.x;
        letter.__baseY = cfg.y;
        letter.visible = false;
        updateIntroChoiceLetter(letter, cfg.letter);
        container.parent.addChild(letter);

        var tileScale = letter.__baseScale || baseLetterScale;
        glow.scaleX = glow.scaleY = tileScale * 1.28;

        var bgScale = bg.__baseScale || tileScale * 1.08;
        var tileHeight = 148 * bgScale;
        var tileTop = cfg.y - tileHeight / 2;
        var tipTargetY = tileTop + tileHeight * 0.28;
        choicePointerTargets[cfg.index] = {
            x: cfg.x,
            tipY: tipTargetY,
            tileTop: tileTop,
            tileHeight: tileHeight
        };
    }

    var clueConfigs = [
        { index: 1, x: introClu1X, y: introClu1Y },
        { index: 2, x: introClu2X, y: introClu2Y },
        { index: 3, x: introClu3X, y: introClu3Y },
        { index: 4, x: introClu4X, y: introClu4Y }
    ];

    introClueArr.push("");
    for (var k = 0; k < clueConfigs.length; k++) {
        var clueCfg = clueConfigs[k];
        var clueBg = new createjs.Shape();
        drawClueSlotBackground(clueBg);
        clueBg.x = clueCfg.x;
        clueBg.y = clueCfg.y;
        clueBg.visible = false;
        clueBg.alpha = 0;
        clueBg.__baseScale = 1;
        clueBg.shadow = new createjs.Shadow("rgba(8,14,30,0.42)", 0, 10, 24);
        clueBg.mouseEnabled = false;
        clueBg.mouseChildren = false;
        introClueBgArr[clueCfg.index] = clueBg;
        container.parent.addChild(clueBg);

        var clueLetter = introGlobalScope && introGlobalScope["introClu" + clueCfg.index];
        if (!clueLetter) {
            continue;
        }
        clueLetter.x = clueCfg.x;
        clueLetter.y = clueCfg.y;
        clueLetter.scaleX = clueLetter.scaleY = 1;
        clueLetter.__baseX = clueCfg.x;
        clueLetter.__baseY = clueCfg.y;
        clueLetter.visible = false;
        updateIntroClueLetter(clueLetter, "");
        container.parent.addChild(clueLetter);
        introClueArr.push(clueLetter);

        var clueScale = clueBg.__baseScale || 1;
        var slotHeight = 112 * clueScale;
        var clueTop = clueCfg.y - slotHeight / 2;
        var tipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
        ArrowXArr[clueCfg.index] = clueCfg.x;
        ArrowYArr[clueCfg.index] = clueTop - tipGap;
    }

    for (var step = 1; step < introChoiceRevealOrder.length; step++) {
        var choiceIndex = introChoiceIndexFromStep(step);
        var pointer = choicePointerTargets[choiceIndex];

        if (pointer) {
            FingXArr[step] = pointer.x;
            FingYArr[step] = pointer.tipY;
            ArrowXArr[step] = pointer.x;
            var arrowTipGap = introArrow && typeof introArrow.__tipGap === "number" ? introArrow.__tipGap : 24;
            var pointerTileTop = typeof pointer.tileTop === "number" ? pointer.tileTop : pointer.tipY - 32;
            var effectiveGap = Math.max(arrowTipGap - 12, arrowTipGap * 0.6);
            ArrowYArr[step] = pointerTileTop - effectiveGap;
        }
    }

    cluegotoArr = [""];
    for (var cgIdx = 0; cgIdx < introClueLetters.length; cgIdx++) {
        cluegotoArr.push(introClueLetters[cgIdx] || "");
    }

    introArrow.visible = false;
    introArrow.alpha = 0;
    introfingure.visible = false;
    introfingure.alpha = 0;

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);
}






function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}

function quesTween() {


    questionCardContainer_htp.visible = true;
    questionCardContainer_htp.alpha = 0
    createjs.Tween.get(questionCardContainer_htp).wait(1000).to({ alpha: 1 }, 500).call(handleComplete2_1);



}
function handleComplete2_1() {
    choiceTween()
}
function choiceTween() {

    var val = 700;
    for (i = 1; i < 5; i++) {
        var choiceLetter = introGlobalScope && introGlobalScope["introChoice" + i];
        var choiceBg = introChoiceBgArr[i];
        var choiceGlow = introChoiceGlowArr[i];
        var clueLetter = introClueArr[i];
        var clueBg = introClueBgArr[i];

        if (!choiceLetter) {
            continue;
        }

        if (clueBg) {
            clueBg.visible = true;
            clueBg.alpha = 0;
            clueBg.scaleX = clueBg.scaleY = clueBg.__baseScale || 1;
            createjs.Tween.get(clueBg, { override: true })
                .wait(Math.max(val - 320, 0))
                .to({ alpha: 0.95 }, 260, createjs.Ease.quadOut);
        }

        if (clueLetter) {
            clueLetter.visible = true;
            clueLetter.alpha = 0;
            updateIntroClueLetter(clueLetter, "");
            createjs.Tween.get(clueLetter, { override: true })
                .wait(Math.max(val - 120, 0))
                .to({ alpha: 1 }, 240, createjs.Ease.quadOut);
        }

        if (choiceBg) {
            var bgScale = choiceBg.__baseScale || ((choiceLetter && (choiceLetter.__baseScale || choiceLetter.scaleX)) ? (choiceLetter.__baseScale || choiceLetter.scaleX) * 1.18 : 1);
            choiceBg.scaleX = choiceBg.scaleY = bgScale * 0.92;
            choiceBg.visible = true;
            choiceBg.alpha = 0;
            createjs.Tween.get(choiceBg, { override: true })
                .wait(val)
                .to({ alpha: 0.96, scaleX: bgScale, scaleY: bgScale }, 300, createjs.Ease.quadOut);
        }

        if (choiceGlow) {
            var glowScale = (choiceLetter && (choiceLetter.__baseScale || choiceLetter.scaleX)) ? (choiceLetter.__baseScale || choiceLetter.scaleX) * 1.3 : 1.04;
            choiceGlow.scaleX = choiceGlow.scaleY = glowScale * 0.88;
            choiceGlow.visible = true;
            choiceGlow.alpha = 0;
            createjs.Tween.get(choiceGlow, { override: true })
                .wait(val + 80)
                .to({ alpha: 0.38, scaleX: glowScale, scaleY: glowScale }, 260, createjs.Ease.quadOut);
        }

        if (choiceLetter) {
            var baseScale = choiceLetter.__baseScale || choiceLetter.scaleX || 0.8;
            choiceLetter.visible = true;
            choiceLetter.alpha = 0;
            var baseY = choiceLetter.__baseY || choiceLetter.y || 0;
            choiceLetter.x = choiceLetter.__baseX || choiceLetter.x;
            choiceLetter.y = baseY - 30;
            var revealTween = createjs.Tween.get(choiceLetter, { override: true })
                .wait(val)
                .to({ y: baseY, scaleX: baseScale, scaleY: baseScale, alpha: 1 }, 320, createjs.Ease.quadOut);

            if (i == 4) {
                revealTween.call(handleComplete4_1);
            }
        }

        val = val + 150;
    }
    TempIntroVal = 0;
}


function handleComplete4_1() {
    if (TempIntroVal !== 0) {
        var clueLetter = introClueArr[TempIntroVal];
        if (clueLetter) {
            clueLetter.visible = true;
            updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
            styleIntroClueSlot(TempIntroVal, true);
        }

        var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        if (usedChoiceIndex) {
            highlightIntroChoiceTile(usedChoiceIndex, false);
            setIntroChoiceUsed(usedChoiceIndex);
        }
    }
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);
    setArrowTween();
}

function setArrowTween() {
    TempIntroVal++;

    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        if (TempIntroVal >= cluegotoArr.length) {
            removeGameIntro();
            return;
        }

        var targetChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        var targetChoice = targetChoiceIndex ? introGlobalScope && introGlobalScope["introChoice" + targetChoiceIndex] : null;

        if (TempIntroVal > 1) {
            var prevChoiceIndex = introChoiceIndexFromStep(TempIntroVal - 1);
            if (prevChoiceIndex) {
                highlightIntroChoiceTile(prevChoiceIndex, false);
            }
        }

        if (targetChoiceIndex && targetChoice && targetChoice.alpha >= 0.9) {
            highlightIntroChoiceTile(targetChoiceIndex, true);
        }

        var pendingClue = introClueArr[TempIntroVal];
        if (pendingClue && (!pendingClue.text || pendingClue.text === "")) {
            highlightIntroClueTarget(TempIntroVal);
        }

        container.parent.addChild(introArrow);
        container.parent.setChildIndex(introArrow, container.parent.numChildren - 1);

        introArrow.visible = true;
        introArrow.alpha = 0;
        introfingure.visible = false;
        introfingure.alpha = 0;

        var arrowTargetX = typeof ArrowXArr[TempIntroVal] === "number" ? ArrowXArr[TempIntroVal] : introClu1X;
        var defaultTipGap = introArrow && introArrow.__tipGap ? introArrow.__tipGap : 22;
        var fallbackTipY = introClu1Y - (56 + defaultTipGap);
        var arrowTipY = typeof ArrowYArr[TempIntroVal] === "number" ? ArrowYArr[TempIntroVal] : fallbackTipY;
        var arrowBounce = introArrow && introArrow.__bounceOffset ? introArrow.__bounceOffset : 18;
        var arrowUpY = arrowTipY - arrowBounce;

        introArrow.x = arrowTargetX;
        introArrow.y = arrowTipY;

        createjs.Tween.removeTweens(introArrow);
        createjs.Tween.get(introArrow)
            .to({ alpha: 1 }, 180, createjs.Ease.quadOut);

        highlightTweenArr[0] = createjs.Tween.get(introArrow)
            .to({ y: arrowUpY }, 250)
            .to({ y: arrowTipY }, 250)
            .to({ y: arrowUpY }, 250)
            .to({ y: arrowTipY }, 250)
            .wait(400)
            .call(this.onComplete1)

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
        introArrow.alpha = 0;
        container.parent.addChild(introfingure);
        container.parent.setChildIndex(introfingure, container.parent.numChildren - 1);

        var pointerOffsetX = introfingure.__pointerOffsetX || 0;
        var pointerOffsetY = introfingure.__pointerOffsetY || 0;
        var fingerTargetX = typeof FingXArr[TempIntroVal] === "number" ? FingXArr[TempIntroVal] : introfingureX;
        var fingerTargetY = typeof FingYArr[TempIntroVal] === "number" ? FingYArr[TempIntroVal] : introfingureY;
        var fingerBaseX = fingerTargetX - pointerOffsetX;
        var fingerBaseY = fingerTargetY - pointerOffsetY;
        var pressDistance = typeof introfingure.__pressDistance === "number" ? introfingure.__pressDistance : 18;
        var fingerPressX = fingerBaseX - pressDistance;

        introfingure.visible = true;
        introfingure.alpha = 0;
        introfingure.x = fingerBaseX;
        introfingure.y = fingerBaseY;

        createjs.Tween.removeTweens(introfingure);
        createjs.Tween.get(introfingure)
            .to({ alpha: 1 }, 180, createjs.Ease.quadOut);
        var activeChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
        if (activeChoiceIndex) {
            var activeChoice = introGlobalScope && introGlobalScope["introChoice" + activeChoiceIndex];
            if (activeChoice && activeChoice.alpha >= 0.9) {
                highlightIntroChoiceTile(activeChoiceIndex, true);
            }
        }
        if (TempIntroVal == 4) {
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .wait(200)
                .call(this.onComplete2)
        }
        else {
            highlightTweenArr[1] = createjs.Tween.get(introfingure)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .to({ x: fingerBaseX }, 300)
                .to({ x: fingerPressX }, 300)
                .wait(200)
                .call(handleComplete4_1)
        }


    }
}
this.onComplete1 = function (e) {
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);

    if (highlightTweenArr[0]) {
        console.log("onComplete1")
        if (typeof highlightTweenArr[0].setPaused === "function") {
            highlightTweenArr[0].setPaused(true);
        }
        highlightTweenArr[0] = null;
    }

    container.parent.removeChild(introArrow);
    introArrow.visible = false;
    introArrow.alpha = 0;
    if (stopValue == 0) {
        console.log("onComplete1  == stopValue")
        removeGameIntro()

    } else {

        setTimeout(setFingureTween, 200)
    }
}

this.onComplete2 = function (e) {
    createjs.Tween.removeTweens(introArrow);
    createjs.Tween.removeTweens(introfingure);

    var clueLetter = introClueArr[TempIntroVal];
    if (clueLetter) {
        clueLetter.visible = true;
        updateIntroClueLetter(clueLetter, cluegotoArr[TempIntroVal]);
        styleIntroClueSlot(TempIntroVal, true);
    }

    var usedChoiceIndex = introChoiceIndexFromStep(TempIntroVal);
    if (usedChoiceIndex) {
        highlightIntroChoiceTile(usedChoiceIndex, false);
        setIntroChoiceUsed(usedChoiceIndex);
    }

    if (highlightTweenArr[1]) {
        console.log("onComplete2")
        if (typeof highlightTweenArr[1].setPaused === "function") {
            highlightTweenArr[1].setPaused(true);
        }
        highlightTweenArr[1] = null;
    }

    container.parent.removeChild(introfingure);
    introfingure.visible = false;
    introfingure.alpha = 0;

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
    createjs.Tween.removeAllTweens();

    container.parent.removeChild(introArrow)
    introArrow.visible = false
    introArrow.alpha = 0
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    introfingure.alpha = 0
    container.parent.removeChild(questionCardContainer_htp)
    questionCardContainer_htp.visible = false
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    container.parent.removeChild(introChoice1)
    introChoice1.visible = false
    container.parent.removeChild(introChoice2)
    introChoice2.visible = false
    container.parent.removeChild(introChoice3)
    introChoice3.visible = false
    container.parent.removeChild(introChoice4)
    introChoice4.visible = false
    for (i = 1; i < introChoiceBgArr.length; i++) {
        if (introChoiceBgArr[i]) {
            container.parent.removeChild(introChoiceBgArr[i]);
            introChoiceBgArr[i] = null;
        }
        if (introChoiceGlowArr[i]) {
            container.parent.removeChild(introChoiceGlowArr[i]);
            introChoiceGlowArr[i] = null;
        }
    }
    for (i = 1; i < 5; i++) {
        introClueArr[i].visible = false;
    }
    container.parent.removeChild(introClu1)
    introClu1.visible = false
    container.parent.removeChild(introClu2)
    introClu2.visible = false
    container.parent.removeChild(introClu3)
    introClu3.visible = false
    container.parent.removeChild(introClu4)
    introClu4.visible = false
    for (i = 1; i < introClueBgArr.length; i++) {
        if (introClueBgArr[i]) {
            container.parent.removeChild(introClueBgArr[i]);
            introClueBgArr[i] = null;
        }
    }
    introChoiceBgArr = [null];
    introChoiceGlowArr = [null];
    introClueBgArr = [null];

    if (highlightTweenArr[0]) {
        if (typeof highlightTweenArr[0].setPaused === "function") {
            highlightTweenArr[0].setPaused(true);
        }
        highlightTweenArr[0] = null;
    }
    if (highlightTweenArr[1]) {
        if (typeof highlightTweenArr[1].setPaused === "function") {
            highlightTweenArr[1].setPaused(true);
        }
        highlightTweenArr[1] = null;
    }
    container.parent.removeChild(introfingure);
    introfingure.visible = false;
    introfingure.alpha = 0;
    introClueArr = [];
    cluegotoArr = [];
}