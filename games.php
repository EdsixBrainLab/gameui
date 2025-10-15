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
  <div class="loading-wrapper" role="alert" aria-live="assertive">
    <div class="floating-orb orb-one"></div>
    <div class="floating-orb orb-two"></div>
    <div class="floating-orb orb-three"></div>

    <div class="loading-card">
      <div class="card-heading">
        <span class="badge">SkillAngels</span>
        <span class="status-pill">
          <span class="dot"></span>
          syncing
        </span>
      </div>
      <h1 class="card-title">Launching your SkillAngels test</h1>
      <p class="card-subtitle">We are preparing a personalised experience for you. Sit tight while we set the stage!</p>

      <div class="progress-visual" aria-hidden="true">
        <div class="pulse-ring"></div>
        <div class="pulse-core"></div>
      </div>

      <div class="progress-track" role="status" aria-label="Loading">
        <div class="progress-glow"></div>
        <div class="progress-bar"></div>
      </div>

      <div class="loading-meta">
        <span class="meta-item">Questions</span>
        <span class="meta-item">Voice prompts</span>
        <span class="meta-item">Rewards</span>
      </div>
    </div>
  </div>
</div>

<!-- Styles -->
<style>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Baloo 2', sans-serif;
    background-color: #0c081d;
    color: #ffffff;
  }

  #content1 {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 18% 12%, rgba(255, 170, 107, 0.42), transparent 55%),
                radial-gradient(circle at 85% 82%, rgba(246, 107, 198, 0.38), transparent 60%),
                radial-gradient(circle at 55% 40%, rgba(108, 107, 255, 0.32), transparent 65%),
                linear-gradient(135deg, #140a2c 0%, #190d32 32%, #230f3c 68%, #2c1044 100%);
  }

  .loading-wrapper {
    position: relative;
    width: min(540px, 90vw);
    max-width: 90vw;
    padding: clamp(20px, 4vw, 32px);
    z-index: 2;
  }

  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(0);
    opacity: 0.7;
    pointer-events: none;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0));
    animation: float 12s ease-in-out infinite;
    z-index: 0;
  }

  .orb-one {
    top: -60px;
    right: -50px;
    width: 190px;
    height: 190px;
    background: radial-gradient(circle at 35% 30%, rgba(255, 214, 178, 0.88), rgba(255, 170, 107, 0.12), rgba(255, 170, 107, 0));
    animation-delay: 0s;
  }

  .orb-two {
    bottom: -70px;
    left: -80px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle at 65% 70%, rgba(255, 211, 238, 0.85), rgba(246, 107, 198, 0.16), rgba(246, 107, 198, 0));
    animation-delay: 2s;
  }

  .orb-three {
    top: 40%;
    left: 52%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
    background: radial-gradient(circle at 50% 50%, rgba(222, 225, 255, 0.75), rgba(108, 107, 255, 0.2), rgba(108, 107, 255, 0));
    mix-blend-mode: screen;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, -12px, 0) scale(1.08); }
  }

  .loading-card {
    position: relative;
    backdrop-filter: blur(22px);
    background: linear-gradient(140deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.05));
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 25px 60px rgba(18, 6, 52, 0.6);
    padding: clamp(28px, 5vw, 42px);
    overflow: hidden;
    z-index: 3;
  }

  .loading-card::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 26px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0));
    opacity: 0.2;
    pointer-events: none;
  }

  .card-heading {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #351320;
    background: linear-gradient(135deg, #ffe5cc 0%, #ffd2f0 50%, #d8d3ff 100%);
    font-weight: 700;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(53, 19, 61, 0.55);
    border: 1px solid rgba(255, 212, 241, 0.35);
  }

  .status-pill .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffb47d;
    box-shadow: 0 0 12px rgba(255, 180, 125, 0.85);
    animation: blink 1.6s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  .card-title {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: clamp(1.65rem, 5vw, 2.25rem);
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  .card-subtitle {
    position: relative;
    z-index: 1;
    margin: 12px 0 32px;
    font-size: clamp(0.95rem, 2.4vw, 1.1rem);
    line-height: 1.5;
    color: rgba(255, 234, 252, 0.85);
  }

  .progress-visual {
    position: relative;
    width: 140px;
    height: 140px;
    margin: 0 auto 28px;
  }

  .pulse-ring,
  .pulse-core {
    position: absolute;
    border-radius: 50%;
  }

  .pulse-ring {
    inset: 0;
    border: 2px solid rgba(255, 255, 255, 0.25);
    animation: pulse 2.8s ease-out infinite;
  }

  .pulse-core {
    inset: 24px;
    background: radial-gradient(circle at 50% 50%, rgba(255, 220, 199, 0.95) 0%, rgba(246, 107, 198, 0.7) 45%, rgba(108, 107, 255, 0.48) 100%);
    box-shadow: 0 0 32px rgba(255, 192, 233, 0.65);
    animation: glow 2.8s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.6; }
    60% { transform: scale(1.1); opacity: 0.2; }
    100% { transform: scale(1.4); opacity: 0; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 28px rgba(255, 255, 255, 0.6); }
    50% { box-shadow: 0 0 52px rgba(255, 255, 255, 0.9); }
  }

  .progress-track {
    position: relative;
    width: 100%;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 214, 244, 0.18);
    overflow: hidden;
    margin-bottom: 18px;
  }

  .progress-bar {
    position: absolute;
    inset: 0;
    width: 45%;
    border-radius: inherit;
    background: linear-gradient(90deg, #ffaa6b 0%, #f66bc6 55%, #6c6bff 100%);
    animation: load 2.8s ease-in-out infinite;
  }

  .progress-glow {
    position: absolute;
    inset: -25px;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(246, 107, 198, 0.45) 0%, transparent 70%);
    opacity: 0.4;
    filter: blur(14px);
  }

  @keyframes load {
    0% { transform: translateX(-60%); }
    50% { transform: translateX(20%); }
    100% { transform: translateX(120%); }
  }

  .loading-meta {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: clamp(0.75rem, 2vw, 0.9rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 229, 249, 0.8);
  }

  .meta-item {
    flex: 1;
    text-align: center;
  }

  .particle {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 214, 244, 0.9);
    box-shadow: 0 0 14px rgba(255, 170, 226, 0.8);
    opacity: 0.75;
    animation: drift 6s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes drift {
    0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.7; }
    100% { transform: translate3d(0, -120vh, 0) scale(0.6); opacity: 0; }
  }

  @media (max-width: 640px) {
    .loading-card {
      padding: clamp(24px, 6vw, 32px);
      border-radius: 24px;
    }

    .progress-visual {
      width: 120px;
      height: 120px;
      margin-bottom: 24px;
    }

    .loading-meta {
      flex-direction: column;
      gap: 8px;
    }

    .meta-item {
      padding: 6px 0;
      background: rgba(246, 107, 198, 0.16);
      border-radius: 12px;
    }
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


 