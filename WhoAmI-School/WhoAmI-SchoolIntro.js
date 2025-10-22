var introQues,introTitle, introQuestxt, introArrow, introfingure;
var introChoiceQues=[]
var introchoiceArr=[]
var introChoice1TweenArr = []
var highlightTweenArr = []
var setIntroCnt = 0
var removeIntraval = 0
var introQuesTextX =0, introQuesTextY = -50;
var introQuesX = 535, introQuesY =200
var introArrowX = 769, introArrowY = 520;
var introfingureX =800, introfingureY = 590;
function commongameintro() {
     introTitle=Title.clone()
    container.parent.addChild(introTitle)
    introTitle.visible = true;
    introTitle.textAlign = "center";
    introTitle.textBaseline = "middle";
    introTitle.x = 650;
    introTitle.y = INTRO_TITLE_Y;
	
    introQues = question.clone();
    introArrow = arrow1.clone();
    introfingure = fingure.clone()
  
    container.parent.addChild(introQues)
    introQues.x = introQuesX;
    introQues.y = introQuesY;
    introQues.visible = false;
    introQues.gotoAndStop(6);

introQuestxt = QusTxtString.clone();
    container.parent.addChild(introQuestxt);
    introQuestxt.__labelBG = SAUI_attachQuestionLabelBG(introQuestxt, container.parent, {padX: 20, padY: 12, fill: "rgba(0,0,0,0.3)", stroke:"rgba(255,255,255,0.14)", strokeW: 2, maxRadius: 22});
//////////////////////////////////////////////////////////////////////////

    for (i = 0; i < 4; i++) {
        introChoiceQues[i] = question1.clone()
        container.parent.addChild(introChoiceQues[i])
        introChoiceQues[i].visible = false       
        introChoiceQues[i].x =441 + (i * 130);
        introChoiceQues[i].y= 515;
        introChoiceQues[i].gotoAndStop(i);
        introChoiceQues[i].scaleX = introChoiceQues[i].scaleY = 1.1;
    }
     for (i = 0; i < 3; i++) {
        introchoiceArr[i] = choice1.clone()
        introchoiceArr[i].scaleX = introchoiceArr[i].scaleY = .8;
        introchoiceArr[i].visible = false;
        container.parent.addChild(introchoiceArr[i]);
        introchoiceArr[i].x = 460 + (i * 160);
        introchoiceArr[i].y = 615;
    }

////////////////////////////////////////////////////////////////////////////////////
createjs.Tween.get(introQuestxt).to({visible:true,alpha: 1 }, 1000,createjs.Ease.bounceInOut).call(handleComplete1_1);
     
}
function handleComplete1_1() {
    createjs.Tween.removeAllTweens();
    quesTween()
}
function quesTween() {
    introQues.visible = true;
    introQues.alpha = 0;
    introQues.scaleX=introQues.scaleY=.75
    createjs.Tween.get(introQues).wait(500).to({ alpha: 1, scaleX: .8, scaleY: .8}, 250)    
        .call(handleComplete2_1)
  
}
function handleComplete2_1() {
    createjs.Tween.removeAllTweens();
    QueschoiceTween()
}
function QueschoiceTween() { 
    var time1=500
 for (i = 0; i <4; i++) {
        introChoiceQues[i].visible = true
        introChoiceQues[i].alpha=0;
           introChoiceQues[0].gotoAndStop(1);
        introChoiceQues[1].gotoAndStop(14);
        introChoiceQues[2].gotoAndStop(26);
        introChoiceQues[3].gotoAndStop(10);         
     if(i==3)
     {
             
        createjs.Tween.get(introChoiceQues[i]).wait(time1)
            .to({ alpha: 1 }, time1, createjs.Ease.bounceInOut) 
             
            .call(handleComplete3_1)
    }
    else{
 createjs.Tween.get(introChoiceQues[i]).wait(time1)
           .to({ alpha:1 }, time1, createjs.Ease.bounceInOut) 
         
    }
    time1=time1+200
 }

}
function handleComplete3_1() {
    createjs.Tween.removeAllTweens();
    choiceTween()
}
function choiceTween() {
var val =500
  for (i = 0; i < 3; i++) {
        introchoiceArr[i].visible = true;   
         introchoiceArr[i].alpha=0
    introchoiceArr[i].gotoAndStop(i+11);
        introchoiceArr[2].gotoAndStop(14);
        introchoiceArr[i].scaleX=introchoiceArr.scaleY=.65
        if(i==2)
{
         createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: 620,rotation:180, scaleX: .65, scaleY: .65, alpha: .5 }, 200)
        .to({ y: 620,rotation:360, scaleX: .7, scaleY: .7, alpha: 1 }, 200)
            .call(handleComplete3_2)
}  else{
createjs.Tween.get(introchoiceArr[i]).wait(val).to({ y: 620,rotation:180, scaleX: .65, scaleY: .65, alpha: .5 }, 200)
        .to({ y: 620,rotation:360, scaleX: .7, scaleY: .7, alpha: 1 }, 200)
            }
              val = val + 150
    }
}
function handleComplete3_2() {
 createjs.Tween.removeAllTweens();
 setTimeout(setArrowTween,500)

}
function setArrowTween() {
    if(stopValue == 0) {
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
        highlightTweenArr[0] = createjs.Tween.get(introArrow)
        .to({ y: introArrowY + 10 }, 350).to({ y: introArrowY }, 350)
        .to({ y: introArrowY + 10 }, 350)
       .to({ y: introArrowY }, 350)
       .to({ y: introArrowY + 10 }, 350)
       .to({ y: introArrowY }, 350).wait(400).call(this.onComplete1)
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
        highlightTweenArr[1] = createjs.Tween.get(introfingure)
        .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
        .to({ x: introfingureX }, 350).to({ x: introfingureX - 15 }, 350)
        .wait(200).call(this.onComplete2)        
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
         console.log("setCallDelay  == stopValue")   
        introChoiceQues[2].visible = true             
        introChoiceQues[2].gotoAndStop(14);     
        createjs.Tween.get(introChoiceQues[2])
            .to({ alpha: 1 }, 1000)
            .wait(500)
         createjs.Tween.get(introchoiceArr[2])
            .to({ alpha: 1,scaleX:.9,scaleY:.9}, 1000)
            .wait(500)   
            .call(setCallDelay)
     }
       // setTimeout(setCallDelay, 1000)
   
}
function setCallDelay() {
    createjs.Tween.removeAllTweens();
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
    container.parent.removeChild(introQues)
    introQues.visible = false 
    if (introQuestxt && introQuestxt.__labelBG) {
  introQuestxt.__labelBG.destroy();            // removes bg + ticker listener
}
introQuestxt.visible = false;
container.parent.removeChild(introQuestxt);
introQuestxt = null;
    for (i = 0; i < 4; i++) {
        introChoiceQues[i].visible = false
        container.parent.removeChild(introChoiceQues[i])
    }
   for (i = 0; i < 3; i++) {
        introchoiceArr[i].visible = false
        container.parent.removeChild(introchoiceArr[i])
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