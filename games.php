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

    <div class="background-aurora" aria-hidden="true">
      <span class="aurora-layer layer-one"></span>
      <span class="aurora-layer layer-two"></span>
      <span class="aurora-layer layer-three"></span>
    </div>

    <div class="loading-card">
      <div class="card-heading">
        <span class="badge">SkillAngels</span>
        <span class="status-pill">
          <span class="dot"></span>
          syncing
        </span>
      </div>
      <h1 class="card-title">Launching your SkillAngels puzzle</h1>
      <p class="card-subtitle">We are preparing a personalised experience for you. Sit tight while we set the stage!</p>

      <div class="progress-visual" aria-hidden="true">
        <div class="pulse-ring"></div>
        <div class="pulse-core"></div>
      </div>

      <div class="progress-track" role="status" aria-label="Loading">
        <div class="progress-glow"></div>
        <div class="progress-bar"></div>
      </div>

      <div class="loading-meta" style="display:none;">
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
    min-height: 100vh;
    font-family: 'Baloo 2', sans-serif;
    background: radial-gradient(circle at 20% 20%, #ffffff 0%, rgba(255, 255, 255, 0) 32%),
                radial-gradient(circle at 80% 10%, #ffe6ff 0%, rgba(255, 230, 255, 0) 42%),
                linear-gradient(135deg, #ebe6ff 0%, #d9edff 48%, #f6f0ff 100%);
    color: #140939;
    overflow: hidden;
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
    background: linear-gradient(130deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 239, 255, 0.9) 52%, rgba(232, 240, 255, 0.95) 100%);
    isolation: isolate;
  }

  #content1::before {
    content: "";
    position: absolute;
    inset: -20%;
    background: conic-gradient(from 90deg, rgba(123, 102, 255, 0.22), rgba(255, 153, 255, 0.15), rgba(110, 198, 255, 0.2), rgba(123, 102, 255, 0.22));
    filter: blur(80px);
    animation: aurora-wave 20s ease-in-out infinite;
    opacity: 0.9;
    z-index: -1;
  }

  .loading-wrapper {
    position: relative;
    width: min(560px, 92vw);
    max-width: 92vw;
    padding: clamp(24px, 4vw, 36px);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 36px;
    box-shadow: 0 40px 90px rgba(56, 40, 120, 0.25);
  }

  .loading-wrapper::before {
    content: "";
    position: absolute;
    inset: clamp(6px, 1.5vw, 12px);
    border-radius: inherit;
    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0)),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0));
    filter: blur(18px);
    opacity: 0.65;
    animation: shimmer 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  .floating-orb {
    position: absolute;
    border-radius: 50%;
    mix-blend-mode: screen;
    opacity: 0.75;
    pointer-events: none;
    filter: blur(0px);
    animation: drift var(--duration, 18s) ease-in-out infinite alternate;
    z-index: 0;
  }

  .floating-orb::after {
    content: "";
    position: absolute;
    inset: 12%;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0));
    filter: blur(12px);
  }

  .background-aurora {
    position: absolute;
    inset: clamp(10px, 2.5vw, 22px);
    border-radius: clamp(22px, 5vw, 32px);
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    mix-blend-mode: lighten;
  }

  .aurora-layer {
    position: absolute;
    inset: -60%;
    background: radial-gradient(circle, rgba(255, 168, 255, 0.5) 0%, rgba(255, 255, 255, 0) 55%);
    opacity: 0.55;
    animation: aurora-drift 24s ease-in-out infinite;
  }

  .layer-one {
    background: radial-gradient(circle, rgba(255, 200, 248, 0.5) 0%, rgba(255, 255, 255, 0) 55%);
    animation-duration: 22s;
    animation-delay: -4s;
  }

  .layer-two {
    background: radial-gradient(circle, rgba(180, 219, 255, 0.5) 0%, rgba(255, 255, 255, 0) 55%);
    animation-duration: 26s;
    animation-delay: -10s;
  }

  .layer-three {
    background: radial-gradient(circle, rgba(255, 245, 215, 0.45) 0%, rgba(255, 255, 255, 0) 55%);
    animation-duration: 28s;
    animation-delay: -16s;
  }

  .orb-one {
    --duration: 16s;
    top: -90px;
    right: -120px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle at 30% 30%, rgba(255, 191, 250, 0.85), rgba(255, 255, 255, 0));
    animation-delay: -4s;
  }

  .orb-two {
    --duration: 20s;
    bottom: -110px;
    left: -100px;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle at 70% 70%, rgba(151, 213, 255, 0.8), rgba(255, 255, 255, 0));
    animation-delay: -2s;
  }

  .orb-three {
    --duration: 18s;
    top: 48%;
    left: 62%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle at 50% 50%, rgba(255, 240, 196, 0.75), rgba(255, 255, 255, 0));
    animation-delay: -6s;
  }

  @keyframes float {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, -12px, 0) scale(1.08); }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.45; transform: translate3d(0, 0, 0) scale(1); }
    50% { opacity: 0.85; transform: translate3d(6px, -6px, 0) scale(1.03); }
  }

  @keyframes aurora-wave {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(12deg) scale(1.05); }
    100% { transform: rotate(-12deg) scale(1); }
  }

  @keyframes aurora-drift {
    0% { transform: translate3d(-12%, -8%, 0) scale(1); opacity: 0.45; }
    50% { transform: translate3d(8%, 12%, 0) scale(1.1); opacity: 0.7; }
    100% { transform: translate3d(-10%, -6%, 0) scale(1); opacity: 0.45; }
  }

  @keyframes drift {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(22px, -18px, 0) scale(1.08); }
    100% { transform: translate3d(-18px, 16px, 0) scale(1); }
  }

  @keyframes sweep {
    0% { transform: translateX(-60%) rotate(6deg); opacity: 0; }
    30% { opacity: 0.55; }
    60% { opacity: 0.35; }
    100% { transform: translateX(120%) rotate(6deg); opacity: 0; }
  }

  @keyframes track-shine {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(120%); }
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
    color: #1e1150;
    animation: float 8s ease-in-out infinite;
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

  .loading-card::after {
    content: "";
    position: absolute;
    top: -40%;
    left: -10%;
    width: 120%;
    height: 40%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 75%);
    transform: translateX(-60%) rotate(6deg);
    opacity: 0.5;
    animation: sweep 9s ease-in-out infinite;
    animation-delay: -3s;
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
    color: #140939;
    background: linear-gradient(135deg, #ffffff 0%, #ffe5ff 100%);
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
    background: linear-gradient(120deg, rgba(111, 75, 255, 0.75), rgba(240, 98, 192, 0.65));
    border: 1px solid rgba(255, 255, 255, 0.45);
    color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 12px 25px rgba(111, 75, 255, 0.35);
  }

  .status-pill .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #63ffa7;
    box-shadow: 0 0 12px rgba(99, 255, 167, 0.85);
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
    color: #2a1c7c;
    background: linear-gradient(90deg, #6f4bff 0%, #f062c0 45%, #f7b563 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-subtitle {
    position: relative;
    z-index: 1;
    margin: 12px 0 32px;
    font-size: clamp(0.95rem, 2.4vw, 1.1rem);
    line-height: 1.5;
    color: rgba(32, 20, 102, 0.76);
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
    border: 2px solid rgba(111, 75, 255, 0.35);
    animation: pulse 2.8s ease-out infinite;
  }

  .pulse-core {
    inset: 24px;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 147, 226, 0.65) 45%, rgba(123, 102, 255, 0.4) 100%);
    box-shadow: 0 0 28px rgba(255, 255, 255, 0.65);
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
    background: rgba(111, 75, 255, 0.18);
    overflow: hidden;
    margin-bottom: 18px;
  }

  .progress-track::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0));
    animation: track-shine 3s ease-in-out infinite;
    pointer-events: none;
  }

  .progress-bar {
    position: absolute;
    inset: 0;
    width: 45%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(255, 147, 226, 0.95) 0%, rgba(123, 102, 255, 0.95) 100%);
    box-shadow: 0 0 18px rgba(240, 98, 192, 0.45), 0 0 32px rgba(111, 75, 255, 0.35);
    animation: load 2.8s ease-in-out infinite;
    z-index: 1;
  }

  .progress-glow {
    position: absolute;
    inset: -25px;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
    opacity: 0.35;
    filter: blur(12px);
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
    color: rgba(33, 21, 96, 0.62);
  }

  .meta-item {
    flex: 1;
    text-align: center;
  }

  .particle {
    display: none;
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
      background: rgba(111, 75, 255, 0.1);
      border-radius: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    #content1::before,
    .loading-wrapper::before,
    .floating-orb,
    .floating-orb::after,
    .background-aurora .aurora-layer,
    .loading-card,
    .loading-card::after,
    .status-pill .dot,
    .pulse-ring,
    .pulse-core,
    .progress-track::before,
    .progress-bar {
      animation: none !important;
    }

    .loading-card::after {
      transform: rotate(6deg);
      opacity: 0.2;
    }
  }
</style>

<!-- Loader helpers -->
<script>
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
