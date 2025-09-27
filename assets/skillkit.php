<div class="modal fade" data-easein="bounceIn" id="EnableDailyPuzzles" role="dialog">
    <div class="modal-dialog"> 
      <!-- Modal content-->
     <div class="">
        <div class="modal-body skillkitmodal"  style="" >
			<div style="padding-top:80px">
					<h2 class="modal-title" style="text-align:center;padding-bottom:0"></h2>
					<div style="text-align:center;position: relative;padding: 5%;">
					<h3 style="color:#ff6600"> Hi <?php echo $this->session->fname; ?>,</h3>
				  <div class="fdbkcontent" style="font-size: 20px; width:70%; margin:0 auto;">
				  Good work !. Let us move to the Personalized training now.<span id="skillkits"></span>
				  </div>
				</div>
			</div><br/><br/> 
			 <div style="text-align:center;">
			 <a href="<?php echo base_url(); ?>index.php/home/dashboard" class="btn btn-success" id="" >Ok</a> 
			<!-- <button type="button" class="btn btn-danger" id="skillkitclose">ok</button>--> 
			 </div>
        </div>
      </div>
    </div>
</div>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/fancy/jquery.fancybox.css" media="screen">
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/fancy/fullscreen.css" media="screen">
<script type="text/javascript" src="<?php echo base_url(); ?>assets/css/fancy/jquery.fancybox.js"></script>
 <div class="clear_both"></div>
 <div class="section_four skillkit" style="background: #fafafa;">
 <div class="container"><br/>
 <?php
if($this->session->TimerRunningStatus=='Y')
{
?>
  <?php if($sumoftottimeused<=$maxtimeofplay){ //Checking 30mins play time get over for the DAY ?>
 <div class="col-md-12 col-sm-12 col-xs-12 panel">
	 <div class="col-md-7 col-sm-7 col-xs-12">
		<div class="row"><h2>Personalized Skill Kit</h2></div>
	 </div>
	<div class="col-md-5 col-sm-5 col-xs-12">
		<div class="row">
			<div class="col-md-4 col-sm-4 col-xs-12 timelabel">Time Left :</div>
			<div class="col-md-6 col-sm-6 col-xs-12 timevalue">
				<div class="clock" style=""></div>
			</div>
		 </div>
	 </div>
 </div>
 <?php } else{ ?>
 <div class="col-md-12 col-sm-12 col-xs-12 panel">
	<div class="col-md-4 col-sm-4 col-xs-12">
		<div class="row"><h2>Personalized Skill Kit</h2></div>
	</div>
	<div class="col-md-8 col-sm-8 col-xs-12 warninglabel">
		<div class="row"><i class="fa fa-warning faa-flash animated"></i>Hope you enjoyed learning the fun way.<strong> See you in the next session . . . </strong><i class="fa fa-thumbs-o-up faa-bounce animated"></i></div>
	</div>
 </div> 
<?php } ?>
<?php }	?>
 <div class="panel panel-default">
<div class="panel-body">
<div class="tab-content responsive">
<div class="tab-pane active" id="SkillKit">
<div class="tab_sec_c1">
 <h3> </h3>
<div class="row">
<?php
 $myskillpie=array("59"=>"#cdcdcd","60"=>"#cdcdcd","61"=>"#cdcdcd","62"=>"#cdcdcd","63"=>"#cdcdcd");
 //$myskillpie=array("59"=>"#ff6600","60"=>"#067d00","61"=>"#ffbe00","62"=>"#be0000","63"=>"#1e9ddf");
 $myskillpie_orginal=array("59"=>"#ff6600","60"=>"#067d00","61"=>"#ffbe00","62"=>"#be0000","63"=>"#1e9ddf");
?>
<?php if($actualGames!=''){ ?>
<?php foreach($actualGames as $games)
{ 
if($games['gamegrade']==3)
	{
		$gamepath = 'g11'; 
	}
	else if($games['gamegrade']==4)
	{
		$gamepath = 'grade2'; 
	}
	else if($games['gamegrade']==5)
	{
		$gamepath = 'grade3'; 
	}
	else if($games['gamegrade']==6)
	{
		$gamepath = 'grade4'; 
	}
	else if($games['gamegrade']==7)
	{
		$gamepath = 'grade5'; 
	}
	else if($games['gamegrade']==8 || $games['gamegrade']==12)
	{
		$gamepath = 'grade6'; 
	}
	else if($games['gamegrade']==9 || $games['gamegrade']==13)
	{
		$gamepath = 'grade7'; 
	}
	else if($games['gamegrade']==10 || $games['gamegrade']==14 || $games['gamegrade']==15)
	{
		$gamepath = 'grade8'; 
	}

	$gameurl = base_url()."assets/swf/".$gamepath."/games.php?newgame=".$games['game_html'];
	
?>
<div class="col-md-3 col-sm-3 col-xs-12 bounce">
<div class="box_c1 bounceIn animated">
		<div class="pricesaving"><?php echo $games['playcount']-$games['tot_game_played']; ?></div>
		<h3><?php echo $actualGameCategory[$games['skill_id']]; ?></h3>
		<?php 
		if($sumoftottimeused<=$maxtimeofplay)
		{ //Checking 30mins play time get over for the DAY
			if($games['tot_game_played']<$games['playcount'])
			{ 
				if(($games['tot_game_played']<$games['SK_MinPlayCount']) || ($DailyPuzzlePlayed_Status=='P'))
				{
				?>	
					<a class="fancybox fancybox.iframe" id="<?php echo $games['gid']; ?>" href="<?php echo $gameurl; ?>" data-href="<?php echo base_url()."assets/swf/".$this->session->userlang."/".$games['game_html'].".html"; ?>"><img src="<?php echo base_url(); ?>assets/<?php echo $games['img_path']; ?>"/></a>
				<?php
				}
				else
				{
				?>
					<a  href="javascript:;"><img src="<?php echo base_url(); ?>assets/<?php echo $games['img_path']; ?>"/></a>
				<?php 
				}
				?>
			<?php
			}
			else
			{
			?>        
				<a  href="javascript:;"><img src="<?php echo base_url(); ?>assets/<?php echo $games['img_path']; ?>"/></a>  
			<?php 
			}
		}
		else
		{
		?>
			<a  href="javascript:;"><img src="<?php echo base_url(); ?>assets/<?php echo $games['img_path']; ?>"/></a>  
		<?php 
		} 
		?>
			<p><?php echo $games['gname']; ?></p>
		<?php 
		if($sumoftottimeused<=$maxtimeofplay)
		{ //Checking 30mins play time get over for the DAY
			if($games['tot_game_played']<$games['playcount'])
			{
				if(($games['tot_game_played']<$games['SK_MinPlayCount']) || ($DailyPuzzlePlayed_Status=='P'))
				{
				?>			
					<a class="btn btn-default in_btn fancybox fancybox.iframe btnactive" href="<?php echo $gameurl; ?>" id="<?php echo $games['gid']; ?>"  data-href="<?php echo base_url()."assets/swf/".$this->session->userlang."/".$games['game_html'].".html"; ?>"><span>
					<?php 
					if($games['tot_game_played']==0)
					{ 
						if($games['tot_ques_attend']==0 || $games['tot_ques_attend']%10==0)
						{	
							echo "Play";
						}
						else
						{
							echo "Continue";
						} 
					}
					else
					{
						if($games['tot_ques_attend']==0 || $games['tot_ques_attend']%10==0)
						{	
							echo "Re-play";
						}
						else
						{
							echo "Continue";
						}
					}
				?>	</span>
					</a>         
				<?php
				}
				else
				{
				?>
					<a class="btn btn-default in_btn gameBtnInactive btninactive" href="javascript:;">Locked</a>  
				<?php 
				}
				?>
			<?php
			}
			else
			{
			?>        
				<a class="btn btn-default in_btn btninactive" href="javascript:;">Limit Expired</a>  
			<?php 
			}
		}
		else
		{ 
		?>
			<a class="btn btn-default in_btn gameBtnInactive btninactive" href="javascript:;">Time Limit Expired</a> 
		<?php 
		} 
		?>
	</div>
</div>
	
<?php 
}
}
else{?>
	
	<div class="alert alert-warning fade in"><strong>No data found</strong></div>
	<?php
}
?>




</div><!--/row -->

</div><!--/tab_sec_c1 -->

</div><!--/tab-pane -->



</div><!-- tab-content -->
</div><!-- panel-body -->
</div><!-- panel-default -->
 </div><!-- container -->
 </div><!-- section_four -->
 
 
 <div class="clear_both"></div>	
<script type="text/javascript">

$(".btnactive").click(function(){
	/* $(this).hide(); */
	$(this).addClass('inactiveLink');
});
$(".imgactive").click(function(){
	/* $(this).hide(); */
	$(this).addClass('inactiveLink');
});



$(document).ready(function(){
	$("a.fancybox").each(function() {
		var tthis = this;
  $(this).fancybox({
			'transitionIn'    :    'elastic',
'transitionOut'    :    'elastic',
'speedIn'     :    600,
'speedOut'     :    200,
'overlayShow'    :    false,
/*'width'  : 750,           // set the width
'height' : 500,   */        // set the height
'type'   : 'iframe',       // tell the script to create an iframe
'scrolling'   : 'no',
/*'href': $(this).attr('data-href'), */
'idleTime': false,
helpers     : { 
	overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
},
keys : {
	// prevents closing when press ESC button
	close  : null
},
'afterClose': function () {  
        parent.location.reload(true);
    },
	beforeShow : function(){
		 
 $(".fancybox-inner").addClass("fancyGameClass");
 $.ajax({
    type: "POST",
    url: "<?php echo base_url()."index.php/home/gamesajax"; ?>",
    data: {gameid:tthis.id,skillkit:'Y',gameurl:$(tthis).attr('data-href')},
     
    success: function(result){
		 
    }
});
  
}

});
});
 
}); 
</script>
<style>
.fade.in{display: inline-block;}
body{min-height:0 !important;}
.timelabel{margin:25px 0px 0px 0px;font-size:20px;font-weight:bold;}
.clock{margin:20px 0px 20px 0px;}
.warninglabel {margin: 25px 0px 0px 0px;font-size: 20px;color: #2b6121;text-align: left;}
.warninglabel .fa {padding-right: 10px;color: #06345f;}
.warninglabel strong {color: #f60;}
.inactiveLink {pointer-events: none;cursor: default;}
.smileicon{color:#f60 !important;font-size:25px;}
 </style>
 <script type="text/javascript">
 <?php
if($this->session->TimerRunningStatus=='Y')
{
?>var clock;		
		$(document).ready(function() {
			var clock;
			clock = $('.clock').FlipClock({
		        clockFace: 'MinuteCounter',
		        autoStart: false,
		        callbacks: {
		        	stop: function() { //alert("JJ");
							$.ajax({
							type:"POST",
							url:"<?php echo base_url('index.php/home/TodayTimerInsert') ?>",
							success:function(result)
							{	//alert(result);
									location.reload(true);
							}
						});
		        		
		        	}
		        }
			
		    });
				 
		    //clock.setTime(1800);
			clock.setTime(<?php echo $Remainingtime;?>);
		    clock.setCountdown(true);
		    clock.start();
			//alert("AAA"+a);
		}); 
<?php
}
?>
<?php 
if($skillkitplay=='Y' && $DailyPuzzlePlayed_Status=='NP')
{
?>
	$('#EnableDailyPuzzles').modal({backdrop: 'static', keyboard: false}) ;
<?php 
}
?>
</script>