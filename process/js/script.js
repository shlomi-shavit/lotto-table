(function lottoTableWidgt(){

  var randomOutput = "";

  /*-- Random numbers function --*/
  function randomNum(i,min_number,max_number,amount,numType){
    var randomNumArray = [];

    for( var x = min_number; x <= amount; ){
        var randomNum = Math.ceil(Math.random()*max_number);
        if( randomNumArray.includes(randomNum) == false ){
            x++;
            randomNumArray.push(randomNum);
            if( numType != "strNum" ){ randomOutput += "<span>" + randomNum + "</span>"; }
            else{ randomOutput += "<span class='strong'>" + randomNum + "</span>"; }
        }
    }
    return randomOutput;
  }
  /*-- /Random numbers function --*/

  /*------------- XMLHttpRequest -------------*/
  var objUrl ="js/lotto.json ";

  var request = new XMLHttpRequest();
  request.open("GET", objUrl, true);
  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

         /*-- Variables declarations --*/
  			 var requestItems = JSON.parse(request.responseText),
             items = requestItems.feed,
             tableElement = document.getElementById('lottoTable'),
             output = "";
         /*---------------------------*/

         /*---- lotto object loop ----*/
         for( var i=0; i<items.length; i++ ){
               randomOutput ="";
               randomNum( i,items[i].numbers_range.min_number,items[i].numbers_range.max_number,items[i].numbers_range.amount_to_draw );
               randomNum( i,items[i].strong_number_range.min_number,items[i].strong_number_range.max_number,items[i].strong_number_range.amount_to_draw,"strNum");

               output += "<tr>";
               output += "<td>" + '<img src="../images/' + items[i].lottery_name +'.png" alt="'+items[i].lottery_name + '"/>' + "</td>";
               output += "<td id='randomRegNum'>" + randomOutput +"</td>";
               output += "<td>" + items[i].next_draw_jackpot + "</td>";
               output += "<td>" + '<a href="' + items[i].play_link +'" >Play Now</a>' + "</td>";
               output += "</tr>";
               tableElement.innerHTML = output;
         }
         /*---- /lotto object loop ----*/
      }
  };
  request.send();

})();
