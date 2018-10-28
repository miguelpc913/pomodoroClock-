$(document).ready(function(){
  var buzzer = $("#buzzer")[0]
  $("#reset").hide();
  $("#stop").hide();
  $("#resume").hide();
  var countB = parseInt($("#break").html());
  var countS = parseInt($("#session").html());
//start button function

$("#start").click(function(){
  $("#start").hide();
  $("#breakplus, #break, #break-,#breakTitle,#sessionplus, #session-").fadeOut();
  $("#stop").fadeIn();
  var counter= setInterval(timer, 1000);
  countS *=60;
  countB *=60; 
  
  $("#stop").click(function(){
  $("#resume").fadeIn();
  $("#stop").hide();
  clearInterval(counter)
}); 
  $("#resume").click(function(){
    var counter2 = setInterval(timer, 1000); 
    $("#resume").hide();
    $("#stop").fadeIn();
    
    $("#stop").click(function(){
    $("#resume").fadeIn();
    $("#stop").hide();
    clearInterval(counter2)
}); 
  });
  function timer(){
   countS -=1
   $("#session").html(countS);
       if(countS%60>=10){
    $("#session").html(Math.floor(countS/60)+":"+countS%60);
}else{
    $("#session").html(Math.floor(countS/60)+":"+"0"+countS%60);

    if(countS===0){
      $("#session, #sessionTitle").fadeOut()
      $("#break, #breakTitle").fadeIn();     
      buzzer.play();
      clearInterval(counter);
      var startBreak = setInterval(breakTimer , 1000);
      
      $("#stop").click(function(){
      $("#resume").fadeIn();
      $("#stop").hide();
      clearInterval(startBreak)
    }); 
      $("#resume").click(function(){
      var startBreak2 = setInterval(breakTimer, 1000); 
      $("#resume").hide();
      $("#stop").fadeIn();  
      $("#stop").click(function(){
      $("#resume").fadeIn();
      $("#stop").hide();
      $("#break").show();  
      clearInterval(startBreak2)
}); 
    }); 
}}
  //BREAK
    function breakTimer(){ 
      $("#break").html(countB);
      countB -=1;  
          if(countB%60>=10){
    $("#break").html(Math.floor(countB/60)+":"+countB%60);
          }else {
    $("#break").html(Math.floor(countB/60)+":"+ "0" +countB%60); 

      if(countB===0){
        clearInterval(startBreak)
        buzzer.play();
        $("#reset").show();
        $("#start, #break, #breakTitle , #stop , #resume").fadeOut();
      }}
    }
}});
  
  $("#reset").click(function(){
    $("#start, #break, #breakTitle, #breakplus, #break-,#sessionplus, #session-,#session, #sessionTitle").show();
  $("#reset").hide();
  $("#stop").hide();
  $("#resume").hide();
  var countB = 5
  var countS = 5
  });
  
  //break buttons
  $("#break-").on("click",function(){
  if(countB>5 ){
    countB -=5
    $("#break").html(countB);
  }});
  
  $("#breakplus").on("click",function(){
    countB +=5
    $("#break").html(countB);
  });
  
  
  //session buttons
  
    $("#session-").on("click",function(){
  if(countS>5 ){
    countS -=5
    $("#session").html(countS);
  }});
  
  
  $("#sessionplus").on("click",function(){
    countS +=5
    $("#session").html(countS);
  });
  

  
});