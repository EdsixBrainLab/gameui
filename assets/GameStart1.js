var tickFlag = 0;
/*
var gameType = 0;//gameType=0 (for no db)   and gameType=1 (for with db)
var isQuestionAllVariations = true;///only no db gametype can set all variation
*/

var gameType = 0;
var isQuestionAllVariations = false;
var betweenChars = ' '; // a space

var gameScoreTxt
var timeOverImgTimer = 0
function CreateGameStart() {

    pauseTimer();


    document.getElementById("gameCanvas").style.background = 'white';
    //////////////////////////////
    closeBtn.visible = false;
    fullScreenBtn.visible = false;
    volumeBtn.visible = false;

    QuesCntMc.visible = false;

    gameScoreTxt.text = "0";
    gameTimerTxt.text = parseInt(time);
    // alert(gameTimerTxt.split('').join(betweenChars));


    closeBtn.cursor = "pointer"
    fullScreenBtn.cursor = "pointer"
    volumeBtn.cursor = "pointer"
    closeBtn.addEventListener("click", closeGameHandler);

    fullScreenBtn.addEventListener("click", toggleFullScreen);
    volumeBtn.addEventListener("click", settingBarSelected);



    /////////////////////////////////////////////////////////////////////////////////////////////////
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

    if (bgSnd) {
        bgSnd.stop();
    }
    bgSnd = createjs.Sound.play("begin", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
    bgSnd.volume = 0.2;
    bgSnd.on("complete", bgSndPlaying, null, false);
    stage.update();

}

function closeGameHandler() {
    parent.jQuery.fancybox.close();
    console.log("closeGameHandler")
}



function bgSndPlaying() {
    bgSnd.play();
    bgSnd.volume = 0.2;
    bgSnd.on("complete", bgSndPlaying, null, false);
}


function settingBarSelected(event) {
    event.preventDefault();

    if (event.currentTarget.currentFrame == 0) {
        event.currentTarget.gotoAndStop(1);

        bgSnd.stop();
        correctSnd.stop();
        wrongSnd.stop();
        gameOverSnd.stop();
        tickSnd.stop();

        isEffSound = false;

    } else if (event.currentTarget.currentFrame == 1) {

        event.currentTarget.gotoAndStop(0);
        bgSnd.play();
        isEffSound = true;
    }


    stage.update();
}

//=======================================================END OF BOARD================================================//
this.countTime = function () {
    time--;
    console.log('get timer = ' + time);
    var text = String(time);
    if (UniqueGameName == "Initials" || UniqueGameName == "LetterMatch") {
        if (String(time) < 100) {
            // gameTimerTxt.x = 266;
            //  text = "0" + text;
        }
        if (String(time) < 10) {
            //   text = "0" + text;
        }
    }
    else {
        if (String(time) < 100) {
            // gameTimerTxt.x = 200;
            //   text = "0" + text;
        }
        if (String(time) < 10) {
            // text = "0" + text;
        }
    }
    // console.log("....gameTimerTxt..." + gameTimerTxt.text)

    // var text1 = text.split("").join("");
    // console.log(text1);
    gameTimerTxt.text = text

    // gameTimerTxt.text = String(time)
    // gameTimerTxt.split('').join(betweenChars);


    if (time <= 5) {

        if (tickFlag == 0) {
            tickSnd = createjs.Sound.play("tick", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
            tickSnd.volume = 1;
            tickSnd.play();
            bgSnd.stop();
        }
        tickFlag = 1;
    }
    if (self.time == 0) {
        console.log('timeover totalQuestions= ' + qscnt)
        if (qscnt < totalQuestions - 1) {
            tickSnd.stop();
            tickFlag = 1;
            container.parent.addChild(timeOverImg);
            timeOverImg.visible = true;
            rst1 = rst1 + rst;
            answer_status = "U";
            uans = "NotAnswered";
            ans = "NotAnswered";
            ccnt = ccnt;
            ans = 0;
            ans = ccnt;
            scores = 0;
            gameResponseTimerStop();
            
            timeOverImgTimer = setInterval(removeTimeOverImg, 1000);
        } else {
            clearInterval(countTime);
            timeOverSnd.play();
            timeOverSnd.volume = 1;

            container.parent.addChild(timeOverImg);
            timeOverImg.visible = true;

            console.log("console4");
            stage.update()
            clearInterval(self.interval)
            rst1 = rst1 + rst;
            answer_status = "U";
            uans = "NotAnswered";
            ans = "NotAnswered";
            ccnt = ccnt;
            ans = 0;
            ans = ccnt;
            scores = 0;
            gameResponseTimerStop();
            correctSnd.stop();
            wrongSnd.stop();
            gameOverSnd.stop();
            tickSnd.stop();
            bgSnd.stop()
            timeOverSnd.addEventListener("complete", sentscore);
        }


        try {
            disablechoices();
        } catch (err) {
            console.log("Error: disablechoices")
        }
    }

}

function removeTimeOverImg() {
    clearInterval(timeOverImgTimer);
    timeOverImg.visible = false;
   // sentscore();
   tickSnd.stop();
            tickFlag = 1;
    time = 18;
    var text = String(time);    
    gameTimerTxt.text = text;
    pickques();
}

function pauseTimer() {
    currTime = time;
    clearInterval(interval);
}

function restartTimer() {
    time = currTime;
    interval = setInterval(countTime, 1000);
}
//----------------------------RESPONSE TIMER-------------------------------------------//
function gameResponseTimerStart() {
    resTimerOut = setInterval(function () {
        rst++;

    }, 1000);
}

function gameResponseTimerStop() {
    clearInterval(resTimerOut);
}