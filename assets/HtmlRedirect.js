var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var bgvoice = 0;

if (iOS == false) {
   // alert("IOS = "+iOS)
   // speaksound();
}

 
var redirectJsonPath =  "https://demo.skillangels.com/karefo/";


var http = new XMLHttpRequest();
function htmlRedirect(nav, url, tqcnt, aqcnt, cqcnt, gscore, gtime, rtime, crtime, wrtime) {
	
	console.log(nav+','+ url+','+ tqcnt+','+ aqcnt+','+ cqcnt+','+ gscore+','+ gtime+','+ rtime+','+ crtime+','+ wrtime)
    if (nav == 'yes') {
        var isOnline = navigator.onLine;
        console.log("isOnline= " + isOnline)
       /* if (!isOnline) {
            console.log("Please check your internet connectivity!");
        } else 
		*/
		var incmpstatus='';
		if(tqcnt<=aqcnt){incmpstatus='Completed';}else{incmpstatus='Time Expired';}
		{
			
			const dataToSendBack = {
        userID: receivedUserData.userID,
        levelValue: receivedUserData.levelValue,
        score: gscore,
		timeTaken:gtime,
		totalQuestion:tqcnt,
		attendedQuestion:aqcnt,
		correctAnswer:cqcnt,
        status: incmpstatus
      };
      // Send message to parent
      window.parent.postMessage(dataToSendBack, '*'); // Use target origin in production
	  
	  
            console.log("console.log");
            //  window.location.href = url + "?gtime1=" + gtime + "&aqcnt1=" + aqcnt + "&rtime1=" + rtime + "&cqcnt1=" + cqcnt + "&crtime1=" + crtime + "&gscore1=" + gscore + "&tqcnt1=" + tqcnt + "&wrtime1=" + wrtime;


            var urlA = url;
            var params = "gtime1=" + gtime + "&aqcnt1=" + aqcnt + "&rtime1=" + rtime + "&cqcnt1=" + cqcnt + "&crtime1=" + crtime + "&gscore1=" + gscore + "&tqcnt1=" + tqcnt + "&wrtime1=" + wrtime;
           //*/ http.open("POST", urlA, true);
            //Send the proper header information along with the request
          //*/  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          //*/  http.onreadystatechange = function () {//Call a function when the state changes.

             //*/   if (http.readyState == 4 && http.status == 200) {
             //*/       var Data = (http.responseText);
                    // alert(http.responseText);
            //*/        do {
             //*/           console.log("test")
                        //if (Data == 1) {
             //*/               bitmap.visible = false;
               //*/             resultLoading.visible = true;
                //*/            console.log("tewt works")
                 //*/           questionTxtR.visible = true;
                  //*/          attemptTxtR.visible = true;
                  //*/          correctTxtR.visible = true;
                   //*/         responseTxtR.visible = true;
                    //*/        scoreTxtR.visible = true;
							
                       // }
                    //*/}while (1 != 1)
               //*/ }
          //*/  }
           //*///*/ http.send(params);
            console.log("url=1= = " + url)
        }
    }
}