/* 
Working Backend for API testing tool (index.html)
*/

//CONSTANTS

var IDPAGE = 0;
var MAXPAGE = 0; 
var HTMLSTRINGS = new Array(); 
var INPURL = ""
var INPJSON = ""
var INPMETH = "GET"

//HELPER FUNCTIONS

/*simple is JSON function for form submission: */
function isJSON(str) {
   try {
       JSON.parse(str);
       return true; 
   } catch (error) {
       return false;
   }
}

//LISTENER FUNCTIONS

/*When url input box is changed, this is called to update the fetch visualizer accordingly*/
document.getElementById("url").addEventListener("input", function() {
   INPURL = $('#url').val();
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n   \
        "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

/*When json input box is changed, this is called to update the fetch visualizer accordingly*/
document.getElementById("jsonInput").addEventListener("input", function() {
   INPJSON = $('#jsonInput').val().replace(/\s+/g, ''); //removes whitepace using regex
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n     \
      "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

/*When method selector is changed, this is called to update the fetch visualizer accordingly*/
document.getElementById("apiCaller").addEventListener("change", function() {
   INPMETH = $('#method').val();
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n     \
      "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

//OUTPUT FUNCTIONS

function secondsToTimeFormat(seconds) {
   const hours = Math.floor(seconds / 3600); 
   const minutes = Math.floor((seconds % 3600) / 60); 
   const remainingSeconds = seconds % 60; 

   // Format as "HH:MM:SS" with leading zeros if necessary
   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function metersToMiles(meters){
   miles = meters /1609
   return(Math.round(miles * 100) / 100) 
}


function showPrecip(info){
   
   $('#precip').css('display', 'flex'); 
   $('#name').html(info.name);
   $('#start_date').html(info.start_date.slice(0,10)); 
   $('#elapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#distance').html(metersToMiles(info.distance));
   $('#average_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   
   table = document.getElementById('top');
   for(var i = 0; i < 12; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.precipitation[i]
   }
   table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.precipitation[j]
   }
}

function showWeath(info){
   $('#precip').css('display', 'flex'); 
   $('#name').html(info.name);
   $('#start_date').html(info.start_date.slice(0,10)); 
   $('#elapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#distance').html(metersToMiles(info.distance));
   $('#weathKind').html("Weather Code");
   $('#typeVal1').html("<b>Code</b>");
   $('#typeVal2').html("<b>Code</b>");
   $('#average_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   
   table = document.getElementById('top');
   for(var i = 0; i < 12; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.weather_code[i]
   }
   table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.weather_code[j]
   }
}

function showTemp(info){
   $('#precip').css('display', 'flex'); 
   $('#name').html(info.name);
   $('#start_date').html(info.start_date.slice(0,10)); 
   $('#elapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#distance').html(metersToMiles(info.distance));
   $('#weathKind').html("Temperature (F)");
   $('#typeVal1').html("<b>Temp</b>");
   $('#typeVal2').html("<b>Temp</b>");
   $('#average_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   
   table = document.getElementById('top');
   for(var i = 0; i < 12; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.temperature_2m[i]
   }
   table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.temperature_2m[j]
   }
}

function showKudos(info){
   $('#kudos').css('display', 'flex'); 
   $('#kname').html(info.name);
   $('#kstart_date').html(info.start_date.slice(0,10)); 
   $('#kelapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#kdistance').html(metersToMiles(info.distance));
   $('#kaverage_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   $('#kudosRes').html(info.kudos);
}

//MAIN EVENT LISTENER

window.addEventListener("load", function() {

   /*calls everytime submit occurs
   'event holds details about event' 
   must be async because waiting on request */
   document.getElementById("apiCaller").addEventListener("submit", async function(event){

      //hide all previous result options
      $('#precip').css('display', 'none'); 
      $('#kudos').css('display', 'none'); 
      $('#message').css('display', 'none'); 

      //preventing from reloading page 
      event.preventDefault();

      //defining submitted materials
      var meth = $('#method').val(); 
      var url = $('#url').val(); 
      var bod = $('#jsonInput').val(); //if nothing, body == ""

      //checks if user JSON input is correct
      if(isJSON(bod) || bod == ""){


         if(!bod == ""){
            bod = JSON.stringify(JSON.parse(bod))//converts JS object, then to string from JSON
         }

         
         //making request w/o body
         if(meth == "GET" || meth == "DELETE"){
            var fetchRes = await fetch(url, {
               method: meth,
               headers: {
                  "Content-Type": "application/json",
               }
            })
         }else{
            //needs body
            var fetchRes = await fetch(url, {
               method: meth,
               headers: {
                  "Content-Type": "application/json",
               },
               body: bod 
            })
         }

         var parsed = await fetchRes.json()

         
         if (typeof parsed.message === 'undefined'){
            $('#message').css('display', 'none'); 
            if (!(typeof parsed.hourly === 'undefined')){
               if(!(typeof parsed.hourly.precipitation === 'undefined')){
                  //precip-table
                  showPrecip(parsed)
               }
               if(!(typeof parsed.hourly.weather_code === 'undefined')){
                  //weather-table
                  showWeath(parsed)
               }
               if(!(typeof parsed.hourly.temperature_2m === 'undefined')){
                  //Temp-table
                  showTemp(parsed)
               }            
            }else if(!(typeof parsed.kudos === 'undefined')){
               showKudos(parsed); 
            }
         }else{
            
            $('#message').css('display', 'flex'); 
            $('#message').html(JSON.stringify(parsed.message)); 
         }

         

         // $('.nav').css('display', 'none');
         // //is pretty printed 
         // $('#APIres').html('<br><br> <h4>API Response:</h4><br>\
         //    <textarea readonly id="callresponse" rows="15" cols="70" >' + JSON.stringify(parsed, null, 4) + '</textarea>')
         
         
      }else{
         alert("text entered is not valid JSON, try again");
      }
   })
});