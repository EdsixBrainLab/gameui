var introTitle, introQuestxt, introQuestxt1, introBalloon, introquestion, introchoice, clr, introArrow, introfingure;
var setIntroCnt = 0
var removeIntraval = 0
var introQuestxtX = 400, introQuestxtY = 130;

if(lang == "TamilQuestionText/"){introQuestxtX=284;}
var introBalloonY = 750, introBalloonX = 550;
var introTween = []
var introquesArr = []
var introchoiceArr = []
var highlightTweenArr = []
var numCnt1 = 0
var introbtnX = [250, 590, 930]
var vno = [5, 3, 6, 4]

var introArrowX = 620, introArrowY = 230;
var introfingureX = 650, introfingureY = 380;

function commongameintro() {
    introTitle = Title.clone()
    numCnt1 = 0
    introQuestxt = questiontext1.clone();
    introQuestxt1 = questionText.clone();
    introBalloon = balloonMc.clone();
    introquestion = question.clone()
    introchoice = choice1.clone()
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    container.parent.addChild(introQuestxt);
    introQuestxt.visible = true;

    container.parent.addChild(introQuestxt1)
    introQuestxt1.visible = false;
    introQuestxt1.x = introQuestxtX
    introQuestxt1.y = introQuestxtY
    introQuestxt1.gotoAndStop(0);

    container.parent.addChild(introBalloon);
    introBalloon.visible = true;
    introBalloon.x = introBalloonX;
    introBalloon.y = introBalloonY;

    for (i = 0; i < 4; i++) {
        introquesArr[i] = introquestion.clone()
        container.parent.addChild(quesArr[i])
        introquesArr[i].visible = false;
        introquesArr[i].scaleX = introquesArr[i].scaleY = .9
        introquesArr[i].x = 359;
        introquesArr[i].y = 150;
    }

    introbtnX = [250, 590, 930]
    for (i = 0; i < 3; i++) {
        introchoiceArr[i] = introchoice.clone()
        container.parent.addChild(introchoiceArr[i])
        introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = .9
        introchoiceArr[i].visible = false;
        introchoiceArr[i].x = introbtnX[i];
        introchoiceArr[i].gotoAndStop(vno[i])
        introchoiceArr[i].y = 350
    }
    for (i = 0; i < 4; i++) {
        introTween[i] = new createjs.MovieClip(null, 0, true, { start: 20 });
        container.parent.addChild(introTween[i]);
        introquesArr[i].visible = false;

    }

    container.parent.addChild(introImg);
    introImg.visible = false;
    introImg.scaleX = introImg.scaleY = .7
    introImg.y = 400;
    introImg.x = 650;

    introQuestxt.alpha = 0;
    createjs.Tween.get(introQuestxt).to({ alpha: 1 }, 1000).call(handleComplete1_1);

}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        introBalloon.visible = true;
        introBalloon.y = 650;

        createjs.Ticker.addEventListener("tick", introLoop)
    }
}
function introLoop() {
    introBalloon.y -= speed;
    if (introBalloon.y == 125) {
        introBalloon.visible = false
        createjs.Ticker.removeEventListener("tick", introLoop)
        console.log("loop stoped")
        introCh()
    }
}

function introCh() {
    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        for (i = 0; i < 4; i++) {
            introTween[i] = new createjs.MovieClip(null, 0, true, { start: 20 });
            container.parent.addChild(introTween[i]);
            introquesArr[i].visible = true;
            introquesArr[i].gotoAndStop(i)
            introquesArr[i].x = 50 + (i * 70)
            introquesArr[i].y = 150;
            introTween[i].timeline.addTween(
                createjs.Tween.get(introquesArr[i])
                    .to({ x: 550, y: 50 }, 9).to({ x: this["objArr" + i][0].x + 320, y: this["objArr" + i][0].y + 70 }, timeFrameSpeed).to({ x: this["objArr" + i][1].x + 320, y: this["objArr" + i][1].y + 70 }, timeFrameSpeed).to({ x: this["objArr" + i][2].x + 320, y: this["objArr" + i][2].y + 70 }, timeFrameSpeed));
            introTween[i].gotoAndPlay("start");
            introTween[i].addEventListener("tick", onComplete1)

        }
    }
}
function onComplete1(e) {
    createjs.Tween.removeAllTweens();
    if (e.currentTarget.currentFrame == 53) {
        e.currentTarget.stop()
        e.currentTarget.removeEventListener("tick", onComplete)
    }
    numCnt1++;
    if (numCnt1 == 1) {
        clr = setInterval(createCh, 3000);
    }


}
function createCh() {
    clearInterval(clr)
    if (stopValue == 0) {
        console.log("setArrowTween  == stopValue")
        removeGameIntro()

    }
    else {
        introQuestxt.visible = false;
        for (i = 0; i < 4; i++) {
            container.parent.removeChild(introTween[i]);
            introquesArr[i].visible = false;
        }
        console.log("createCh")
        introQuestxt1.visible = true;
        introQuestxt1.gotoAndStop(0);
        for (i = 0; i < 3; i++) {
            introchoiceArr[i].visible = true;
            introchoiceArr[i].x = -300;
            if(i==2){
                createjs.Tween.get(introchoiceArr[i]).wait(100).to({ x: introbtnX[i] }, 500)
                .to({ alpha: 1 }).wait(1000).call(handleComplete2_1);

            }
            else{
                createjs.Tween.get(introchoiceArr[i]).wait(100).to({ x: introbtnX[i] }, 500)
                .to({ alpha: 1 })
            }
           
        }


    }
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        removeGameIntro()
    }
    else {
        introCh1()
    }
}
function introCh1() {
    introImg.y = 700
    createjs.Tween.get(introImg).to({ visible: true }).to({ alpha: 0 }).to({ alpha: 1, y: 150 }, 500).wait(2000).call(handleComplete5_1);
}
function handleComplete5_1() {
    createjs.Tween.removeAllTweens();
    if (stopValue == 0) {
        console.log("handleComplete1_5  == stopValue")
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
        container.parent.addChild(introArrow);
        introArrow.visible = true;
        introArrow.x = introArrowX;
        introArrow.y = introArrowY;
        highlightTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[0])
        highlightTweenArr[0] = createjs.Tween.get(introArrow).to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350)
            .to({ y: introArrowY }, 350).to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350).wait(400).call(this.onComplete2)

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
        container.parent.addChild(introfingure);
        introfingure.visible = true;
        introfingure.x = introfingureX;
        introfingure.y = introfingureY;
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])
        highlightTweenArr[1] = createjs.Tween.get(introfingure).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350).wait(200).call(this.onComplete3)

    }
}
this.onComplete2 = function (e) {
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

this.onComplete3 = function (e) {
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
    // container.parent.removeChild(introTitle)
    // introTitle.visible = false;
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false
    container.parent.removeChild(introquestion)
    introquestion.visible = false
    container.parent.removeChild(introchoice)
    introchoice.visible = false
    container.parent.removeChild(introQuestxt)
    introQuestxt.visible = false
    container.parent.removeChild(introQuestxt1)
    introQuestxt1.visible = false
    container.parent.removeChild(introBalloon)
    introBalloon.visible = false
    for (i = 0; i < 4; i++) {
        container.parent.removeChild(quesArr[i])
        introquesArr[i].visible = false;

    }

    container.parent.removeChild(introImg);
    introImg.visible = false;

    for (i = 0; i < 3; i++) {
        container.parent.removeChild(introchoiceArr[i])
        introchoiceArr[i].visible = false;
    }
    for (i = 0; i < 4; i++) {
        container.parent.removeChild(introTween[i]);
        introquesArr[i].visible = false;

    }
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