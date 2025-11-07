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
var introDirPosCarX = [950.5, 310];
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
var introArrowX = 80, introArrowY = 480;
var introfingureX = 140, introfingureY = 600;
var introArrow1X = 830, introArrow1Y = 470;
var introfingure1X = 890, introfingure1Y = 580;
var introQuescarX = 60, introQuescarY = 45 + 110
//////////////////////////////////////////////////////////////////////
var Questxt;
function commongameintro() {
    Questxt = 0;
    IntroBackground = holder.clone();
    introTitle = Title.clone();
    introQuescar = car1.clone();
    introcolor = q1.clone();
    introQuestionText = questionText.clone();
    introArrow = arrow1.clone()
    introfingure = fingure.clone()
    introArrow1 = arrow1.clone()
    introfingure1 = fingure.clone()

    IntroBackground.visible = true;
    container.parent.addChild(IntroBackground)
    introTitle.visible = true;
    container.parent.addChild(introTitle)

    introQuescar.visible = false;
    container.parent.addChild(introQuescar)
    introQuescar.regX = introQuescar.regY = 50
    introQuescar.x = introQuescarX;
    introQuescar.y = introQuescarY;
    introQuescar.scaleX = introQuescar.scaleY = 1

    introColorTime = new createjs.MovieClip();
    container.parent.addChild(introColorTime);
    introcolor.visible = false;
    container.parent.addChild(introcolor)
    introcolor.x = introcolorX;
    introcolor.y = introcolorY;
    introColorTime.addChild(introcolor)

    /////////////////////////////////////////////////////car nd button//////////////////////
    for (i = 1; i <= 4; i++) {

        introChoice[i] = this["choice" + i].clone();
        container.parent.addChild(introChoice[i])
        introChoice[i].scaleX = introChoice[i].scaleY = .6
        introChoice[i].visible = false;

        /////////////////////////////////////////////////////////
    }
    for (i = 1; i <= 4; i++) {
        introbutton[i] = buttons.clone();
        container.parent.addChild(introbutton[i]);
        introbutton[i].x = introbuttonbtnX[i]
        introbutton[i].y = 590;
        introbutton[i].scaleX = introbutton[i].scaleY = 0.95;
        introbutton[i].visible = false;
    }
    introQuestionText.visible = false;
    container.parent.addChild(introQuestionText)
    introQuestionText.x = introQuestionTextX;
    introQuestionText.y = introQuestionTextY;

    for (i = 0; i < 2; i++) {
        ////////////////////in qtxt direction nd position image///////////////////////////
        introquesArr[i] = new createjs.MovieClip();
        container.parent.addChild(introquesArr[i]);
        introDirPosQuestionText[i] = DirPosQuestionText.clone();
        container.parent.addChild(introDirPosQuestionText[i])
        introDirPosQuestionText[i].visible = false;
        introDirPosQuestionText[i].x = introDirPosQuestionTextX;
        introDirPosQuestionText[i].y = introDirPosQuestionTextY;
        introDirPosQuestionText[i].gotoAndStop(i)
        introquesArr[i].addChild(introDirPosQuestionText[i]);
        ///////////////////////////////////////Round track clueimage///////////////////////////////////////

        introDirPosTrack[i] = DirPosTrack.clone();
        container.parent.addChild(introDirPosTrack[i])
        introDirPosTrack[i].visible = false;
        introDirPosTrack[i].x = introDirPosTrackX[i];
        introDirPosTrack[i].y = introDirPosTrackY[i];
        introDirPosTrack[i].gotoAndStop(i)

    }
    for (i = 0; i < 2; i++) {
        ////////////////////ClueDirPosCar///////////////////////////////////
        introDirPosCarTime[i] = new createjs.MovieClip();
        container.parent.addChild(introDirPosCarTime[i]);
        introDirPosCar[i] = DirPosCar.clone();
        container.parent.addChild(introDirPosCar[i])

        /////////////////////////////////////////////
        introDirPosCar[i].visible = false;
        introDirPosCar[i].x = introDirPosCarX[i];
        introDirPosCar[i].y = introDirPosCarY[i];
        introDirPosCar[i].gotoAndStop(i)
        introDirPosCarTime[i].addChild(introDirPosCar[i]);
        ///////////////////////Arrow for Dir & Pos/////////////////////////////
        introDirPosArrowTime[i] = new createjs.MovieClip();
        container.parent.addChild(introDirPosArrowTime[i]);
        introDirPosArrow[i] = DirPosArrow.clone();
        container.parent.addChild(introDirPosArrow[i])
        /////////////////////////////////////////////
        introDirPosArrow[i].visible = false;
        introDirPosArrow[i].x = introDirPosArrowX[i];
        introDirPosArrow[i].y = introDirPosArrowY[i];
        introDirPosArrow[i].gotoAndStop(i)
        introDirPosArrowTime[i].addChild(introDirPosArrow[i]);

    }
    if (lang == "TamilQuestionText/" ) {
        introcolor.x = 618;
        introcolor.y = 400
        for (i = 0; i < 2; i++) {
            introDirPosQuestionText[i].y = 610
        }
        introQuescar.x = 60;
        introQuescar.y = 152
        introQuestionText.y = 165;
    } else if (lang == "VietnameseQuestionText/") {
        introcolor.x = 618;
        introcolor.y = 488.5
    }
    else if (lang == "BanglaQuestionText/") {
        introcolor.x = 618; introcolor.y = 400
        introcolor.visible = false;
        for (i = 0; i < 2; i++) {
            introDirPosQuestionText[i].y = 600
        }
        introQuescar.x = 50;
        introQuescar.y = 155
    }
    else if (lang == "ArabicQuestionText/") {
        introcolor.x = 618; introcolor.y = 528;
        introcolor.visible = false;

        introQuescar.x = 50;
        introQuescar.y = 155
    }

    //  else if(lang == "HindiQuestionText/")
    //         {  introcolor.x = introcolorX;
    //             introcolor.y = introcolorY - 44;
    //             introQuestionText.y = introQuestionText.y - 10
    // 			  for (i = 0; i < 2; i++) {
    //                 introDirPosQuestionText[i].y = 535        
    //             }
    //         }   		

    else {
        introcolor.x = introcolorX;
        introcolor.y = introcolorY;
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
            container.parent.addChild(introChoice[i])
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
            .to({ rotation: -90, x: 300, y: 491 }, 100, createjs.Ease.bounceOut)


        //right car.//
        introChoice[3].gotoAndStop(15)
        createjs.Tween.get(introChoice[3]).wait(600)
            .to({ visible: true, x: 1150, y: 290 + 115, alpha: 1 }, 800)
            .to({ visible: true, x: 950, y: 290 + 115, alpha: 1 }, 500)
            .to({ rotation: -90, x: 950, y: 372 + 115 }, 100, createjs.Ease.bounceOut)

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
        // introQuestionText.gotoAndStop(0)
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
        ///////////////////////////////////////////////////////////////////
        introquesArr[0].timeline.addTween(createjs.Tween.get(introDirPosQuestionText[0])
            .to({ scaleX: .95, scaleY: .95 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        createjs.Tween.get(introDirPosQuestionText[0]).wait(250)
            .to({ alpha: 1, scaleY: 1, scaleX: 1 }, 250, createjs.Ease.bounceOut)
            .to({ alpha: 1, scaleY: .95, scaleX: .95 }, 250, createjs.Ease.bounceOut)
        ////////////////////////////////////////////////////////////////
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
        /////////////////////////////////////////////////////////
        //  introQuestionText.gotoAndStop(1)
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
        //////////////////////////////////////////
        introquesArr[1].timeline.addTween(createjs.Tween.get(introDirPosQuestionText[1])
            .to({ scaleX: .95, scaleY: .95 }, 19).to({ scaleX: 1, scaleY: 1 }, 20).wait(1));
        ////////////////////////////////////////////////
        createjs.Tween.get(introDirPosQuestionText[1]).wait(250)
            .to({ alpha: 1, scaleY: 1, scaleX: 1 }, 250, createjs.Ease.bounceOut)
            .to({ alpha: 1, scaleY: .95, scaleX: .95 }, 250, createjs.Ease.bounceOut)
        /////////////////////////////////////////////////////////////
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
        introDirPosCarTime[0].visible = true;
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
        introDirPosCarTime[1].visible = true;
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
        container.parent.addChild(ChoiceTime);
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
        container.parent.addChild(ChoiceTime);
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
        container.parent.addChild(introArrow);
        introArrow.visible = true;
        introArrow.x = introArrowX;
        introArrow.y = introArrowY;
        highlightTweenArr[0] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[0])

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
        container.parent.addChild(introfingure);
        introfingure.visible = true;
        introfingure.x = introfingureX;
        introfingure.y = introfingureY;
        highlightTweenArr[1] = new createjs.MovieClip()
        container.parent.addChild(highlightTweenArr[1])
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
        if (Questxt == 0) {
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
    Questxt = 0;
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

    IntroBackground.visible = false;
    container.parent.removeChild(IntroBackground)
    container.parent.removeChild(introArrow)
    introArrow.visible = false
    container.parent.removeChild(introfingure)
    introfingure.visible = false

    container.parent.removeChild(introTitle)
    introTitle.visible = false

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