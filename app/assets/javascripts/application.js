// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks


 function trim(string) { return string.replace (/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
 function del_spaces(str)
 {
    str = str.replace(/\s/g, '').replace("<br>",'');
    return str;
 }
 var init=0;
 var startDate;
 var clocktimer;
 var currentMarker;

 function clearFields(currentMarker) {
  init = 0;
  clearTimeout(clocktimer);
  document.getElementById('clock').innerHTML='00:00:00.00';
  document.clockform.label.value=currentMarker;
 }

 function clearALL() {
  clearFields(currentMarker);
  document.getElementById('marker').innerHTML = '';
 }

 function startTIME() { 
  var thisDate = new Date();
  var t = thisDate.getTime() - startDate.getTime();
  var ms = t%1000; t-=ms; ms=Math.floor(ms/10);
  t = Math.floor (t/1000);
  var s = t%60; t-=s;
  t = Math.floor (t/60);
  var m = t%60; t-=m;
  t = Math.floor (t/60);
  var h = t%60;
  if (h<10) h='0'+h;
  if (m<10) m='0'+m;
  if (s<10) s='0'+s;
  if (ms<10) ms='0'+ms;
  if (init==1) document.getElementById('clock').innerHTML = h + ':' + m + ':' + s + '.' + ms;
  clocktimer = setTimeout("startTIME()",10);
 }

 function sumTime(oldTime, newTime){

        if(Number(oldTime[2]) + Number(newTime[2]) >= 60){
            oldTime[2] = ((Number(oldTime[2]) + Number(newTime[2])) - 60).toFixed(2);
            oldTime[1] = Number(oldTime[1]) + 1;
        }
        else
            oldTime[2] = Number(oldTime[2]) + Number(newTime[2]);

        if(Number(oldTime[1]) + Number(newTime[1]) >= 60){
            oldTime[1] = (Number(oldTime[1]) +Number(newTime[1])) - 60;
            oldTime[0] = Number(oldTime[0]) + 1;
        }
        else
            oldTime[1] = Number(oldTime[1]) + Number(newTime[1]);

        
        if(Number(oldTime[0]) + Number(newTime[0]) >= 24){
            oldTime[0] = (Number(oldTime[0]) +Number(newTime[0])) - 24;
        }
        else
            oldTime[0] = Number(oldTime[0]) + Number(newTime[0]);
        
        var s = Number(oldTime[2])<10.0?'0'+oldTime[2]:''+oldTime[2];
        var m = oldTime[1]<10?'0'+oldTime[1]:''+oldTime[1];
        var h = oldTime[0]<10?'0'+oldTime[0]:''+oldTime[0];

        return h+':'+m+':'+Number(s).toFixed(2);
 }

 function findTIME() {
    if(document.clockform.label.value==''){
       document.clockform.label.value = 'new label';
    }
    currentMarker = document.clockform.label.value;
    if (init==0) {
        startDate = new Date();
        startTIME();
        init=1;
    } 
    else {
        var str = trim(document.clockform.label.value);
        if(document.getElementById(document.clockform.label.value) != null){
            var oldTime = del_spaces(document.getElementById(document.clockform.label.value).innerHTML).split(':');
            oldTime.shift();
            var newTime = document.getElementById('clock').innerHTML.split(':');
            document.getElementById(document.clockform.label.value).innerHTML = (str==''?'':str+': ') + 
            sumTime(oldTime, newTime)+'<br>';
            var xmlHttp = new XMLHttpRequest();

    }
    else{
        var mainBlock = document.getElementById('marker');
        var newDivClock = document.createElement('span');
        newDivClock.id = document.clockform.label.value;
        newDivClock.className = "tl";
        newDivClock.onclick = function(){document.clockform.label.value = this.innerHTML.replace("<br>",'').split(':')[0]};
        newDivClock.innerHTML = (str==''?'':str+': ') + 
        document.getElementById('clock').innerHTML+'<br>';
        mainBlock.appendChild(newDivClock);

   }
    // var oldTime = del_spaces(document.getElementById(document.clockform.label.value).innerHTML).split(':').shift();
    // var newTime = document.getElementById('clock').innerHTML.split(':');


   clearFields(currentMarker);
  }
 }
