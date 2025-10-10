<?php 

$gamename=$_GET['gamename']; 
$gameTimerIsDynamic=$_GET['gametimer']; 
 
$gameTimerIsDynamic=1; 

$themeArr = array('BgTheme1','BgTheme2','BgTheme3','BgTheme1','BgTheme1');
$i = rand(0,4);
$gname=explode("-",$gamename);

$getAssetsPath="EnglishAssets/";
$getassetsPathLang = "assets/".$getAssetsPath;

if($gamename == "AlphaNumericEncode-Level5" || $gamename == "FindTheTwins-Level3" || $gamename == "MissingPiece-Level4" ){
	$i = 2;
}else if($gamename == "SequenceMemory-Level6" || $gamename == "MirrorMatch-Level4" || $gamename == "Equate-Level1" || $gamename == "ShapeVsColorVsPattern-Level1" || $gamename == "MirrorImage-Level1" ){
	$i = 0;
}else if($gamename == "MindCapture-Level3" || $gamename == "IAmCube-Level2" || $gamename == "Rebus-Level1" || $gamename =="CoordinateGraph-Level1"){
	$i = 1;
} 

if($gname[0]=="CycleRace" || $gname[0]=="CarPark" || $gname[0]== "BallAndBox" || $gname[0]== "TakeTurns" ||  $gname[0]== "BusRide" ||  $gname[0]== "Fishing"||  $gname[0]== "StarLight" || $gname[0]=="MatchMe" || $gname[0]=="AlphaNumericEncode")
{
	$runningBg1=0;
	 
}
else
{
	$runningBg1=0;

}

  
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no, maximum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php echo $gamename; ?></title>
	<link rel="stylesheet" type="text/css" href="assets/style.css">
	<link rel="stylesheet" type="text/css" href="assets/coloranim.css">

	<script src="assets/speak.js"></script>
	<script src="assets/jquery-3.2.1.min.js"></script>
	
	<script>var bgTheme = "<?php echo '/'.$themeArr[$i];?>";</script>
	<script>var GameNameWithLvl = "<?php echo $gamename;?>";</script>
	<?php if($gameTimerIsDynamic==1){ ?>
	<script>var gameTimerIsDynamic = false;</script>
	<?php } else { ?>
	<script>var gameTimerIsDynamic = true;</script>
	<?php } ?>
	
	<script>var UniqueGameName = GameNameWithLvl.split("-")[0];</script>
		
	<script>var GameName = "<?php echo $gname[0];?>";</script>
	<script>var runningBg = "<?php echo $runningBg1;?>";</script>
	<script>
	var lang = "EnglishQuestionText/";
	//var lang = "GujaratiQuestionText/";
	 //var lang = "TamilQuestionText/";
	//var lang = "ArabicQuestionText/";
	//var lang = "HindiQuestionText/";
//var assetsLang="EnglishAssets/";

	var questionTextPath = "commonQuestionText/"+lang;	

	// var assetsPathLang = "assets/"+assetsLang;
	
	var assetsPathLang="<?php echo $getassetsPathLang;?>"

	</script>
	
</head>
 
<body>

<?php if($runningBg1==1){ ?>
        <div id="content"><canvas id="gameCanvas" width="1280" height="720" style="background:url(assets/<?php echo $themeArr[$i]; ?>/Background3.png),
                                                                                                                              url(assets/<?php echo $themeArr[$i]; ?>/Background2.png),
                                                                                                                              url(assets/<?php echo $themeArr[$i]; ?>/Background1.png),
                                                                                                                              url(assets/<?php echo $themeArr[$i]; ?>/Background.png);
                                                                                                                              background-position: center;background-repeat: no-repeat, no-repeat; background-color:#000; background-size: 100%, 100%;" ></canvas></div>
<?php } else{ ?>

	
        <div id="content"><canvas id="gameCanvas" width="1280" height="720" style="background:url(<?php echo $gamename; ?>/Background.png);background-position: center;
        background-repeat: no-repeat; background-color:#000;  background-size: 100%, 100%;" ></canvas></div>

<?php } ?>
 
 <!-- Font -->
<link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet">

<!-- Loader Container -->
<div id="content1">
  <div class="center1">
    <div class="pendulum">
      <div class="pendulum_box">
        <div class="ball first"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball last"></div>
      </div>
    </div> 
    <p class="awesomea">SkillAngels</p>
  </div>
</div>

<!-- Styles -->
<style>
  body {
    margin: 0;
    padding: 0;
  }

  #content1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url("assets/LoadingAssets/SkillAngels_LoadingScreen.png") center center no-repeat;
    background-size: cover;
    z-index: 9999;
    overflow: hidden;
  }

  .center1 {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .pendulum {
    position: relative;
  }

  .pendulum_box {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .ball {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #318d63;
    position: relative;
    transform-origin: 50% -300%;
  }

  .ball.first {
    animation: firstball 0.9s alternate ease-in infinite;
  }

  .ball.last {
    animation: lastball 0.9s alternate ease-out infinite;
  }

  @keyframes firstball {
    0% { transform: rotate(35deg); }
    50% { transform: rotate(0deg); }
  }

  @keyframes lastball {
    50% { transform: rotate(0deg); }
    100% { transform: rotate(-35deg); }
  }

  .awesomea {
    font-family: 'Baloo 2', sans-serif;
    font-size: 70px;
    color: #318d63;
    margin-top: 20px;
  }

  /* Floating particles */
  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    opacity: 0.6;
    animation: drift 5s linear infinite;
  }

  @keyframes drift {
    0% { transform: translateY(0) scale(1); opacity: 0.6; }
    100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
  }
</style>

<!-- Particle Generator -->
<script>
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '100vh';
    p.style.animationDelay = (Math.random() * 5) + 's';
    p.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.getElementById('content1').appendChild(p);
  }

  // Call this once game is fully loaded
  function hideLoader() {
    const loader = document.getElementById('content1');
    if (loader) loader.style.display = 'none';
  }

  // OPTIONAL: Automatically hide on load
  // window.onload = hideLoader;
</script>

<div id="transpAlert" class="centerMsg"><p><img src="assets/landIcon.svg" width="40px" /><br>Turn your device to the side to start play game!</p></div>
<div id="BrowserSupport" class="centerMsg"><p>Your browser is not currently supported.</p></div>
<script async src="assets/createjs-2015.11.26.min.js"></script>
 
<script async type="text/javascript" src="ErrorLog.js"></script>

<script async type="text/javascript" src="assets/GetJsonData.js"></script>



<script async type="text/javascript" src="assets/answerLoader.js"></script>
<script async type="text/javascript" src="assets/GameInit.js"></script>
<script async type="text/javascript" src="assets/GameStart.js"></script>
<script async type="text/javascript" src="assets/GameValidation.js"></script>
<script async type="text/javascript" src="assets/HtmlRedirect.js"></script>
<script async type="text/javascript" src="assets/GameInitLoader.js"></script>

<script async type="text/javascript" src="assets/StartQuestion.js"></script>
<script async type="text/javascript" src="assets/GameQuestions.js"></script>
<script async type="text/javascript" src="assets/ScoreValidation.js"></script>
<script async type="text/javascript" src="assets/pleaserotate.js"></script>
<script async type="text/javascript" src="assets/GameTitle.js"></script>
<script async type="text/javascript" src="assets/GameUI.js"></script>
<script async type="text/javascript" src="<?php echo $gamename;?>/<?php echo $gamename;?>Intro.js"></script>
<script async type="text/javascript" src="<?php echo $gamename; ?>/main.js"></script>

<!--<script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer=""></script>-->
<script>
//msg.text = 'Add the number of objects in both the circles.  Select the right answer from the options given';
//speaksound();
var getJSName ="<?php echo $gamename; ?>";

</script>

</script>
<script type='text/javascript'>
 
  //parent.jQuery.fancybox.close();
  // Active
  window.addEventListener('focus', startIntro);
   // Inactive
  window.addEventListener('blur', stopGameIntro);
 
 

 //// Run gameintro
 function startIntro(){
	 console.log('focus in');
	 createjs.Ticker.paused = false;	
 }
 
 ///// Stop gameintro
 function stopGameIntro(){
	 console.log('focu out');
	 createjs.Ticker.paused = true;
 } 

 </script>

</body>
</html>


 