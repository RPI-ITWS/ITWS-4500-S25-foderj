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

/*seconds to 00:00:00*/
function secondsToTimeFormat(seconds) {
   const hours = Math.floor(seconds / 3600); 
   const minutes = Math.floor((seconds % 3600) / 60); 
   const remainingSeconds = seconds % 60; 

   // Format as "HH:MM:SS" with leading zeros if necessary
   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

/*meters to miles conversion*/
function metersToMiles(meters){
   var miles = meters /1609
   return(Math.round(miles * 100) / 100) 
}


//OUTPUT FUNCTIONS

/*output for precipitation request*/
function showPrecip(info){
   
   $('#precip').css('display', 'flex'); 
   $('#name').html(info.name);
   $('#start_date').html(info.start_date.slice(0,10)); 
   $('#elapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#distance').html(metersToMiles(info.distance));
   $('#typeVal1').html("<b>Precipitation</b>");
   $('#typeVal2').html("<b>Precipitation</b>");
   $('#average_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   

   var table = document.getElementById('top');
   for(var i = 0; i < 13; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.precipitation[i]
   }
   var table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.precipitation[j]
   }
}

/*output for weather request*/
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
   
   var table = document.getElementById('top');
   for(var i = 0; i < 13; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.weather_code[i]
   }
   var table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.weather_code[j]
   }
}

/*output for temp request*/
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
   
   var table = document.getElementById('top');
   for(var i = 0; i < 13; i++){
      table.rows[1].cells[i+1].textContent = info.hourly.temperature_2m[i]
   }
   var table2 = document.getElementById('bot');
   for(var j = 13; j < 24; j++){
      table2.rows[1].cells[j-12].textContent = info.hourly.temperature_2m[j]
   }
}

/*output for kudos request*/
function showKudos(info){
   $('#kudos').css('display', 'flex'); 
   $('#kname').html(info.name);
   $('#kstart_date').html(info.start_date.slice(0,10)); 
   $('#kelapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#kdistance').html(metersToMiles(info.distance));
   $('#kaverage_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   $('#kudosRes').html(info.kudos);
}

/*output for location request*/
function showLoc(info){
   $('#location').css('display', 'flex'); 
   $('#lname').html(info.name);
   $('#lstart_date').html(info.start_date.slice(0,10)); 
   $('#lelapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#ldistance').html(metersToMiles(info.distance));
   $('#laverage_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   $('#long').html(info.start_latlng[1]);
   $('#lat').html(info.start_latlng[0]);
}

/*output for description request*/
function showDesc(info){
   $('#description').css('display', 'flex'); 
   $('#dname').html(info.name);
   $('#dstart_date').html(info.start_date.slice(0,10)); 
   $('#delapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#ddistance').html(metersToMiles(info.distance));
   $('#daverage_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
   $('#descRes').html(info.description);
}

/*output for solo (run) request*/
function showSolo(info){
   $('#solo').css('display', 'flex'); 
   $('#sname').html(info.name);
   $('#sstart_date').html(info.start_date.slice(0,10)); 
   $('#selapsed_time').html(secondsToTimeFormat(info.moving_time));
   $('#sdistance').html(metersToMiles(info.distance));
   $('#saverage_speed').html(Math.round(info.average_speed * 2.237 * 100) / 100);
}

//MAIN EVENT LISTENER
//keeps checking until everything is loaded from react
const waitForReactElement = (id, callback) => {
   const checkInterval = setInterval(() => {
     const element = document.getElementById(id);
     if (element) {
       clearInterval(checkInterval);
       callback(element);
     }
   }, 50); // Check every 50ms
 };
 
 //waiting for last react element to load before start
 waitForReactElement("apiCaller", () => {




   /*calls everytime submit occurs
   'event holds details about event' 
   must be async because waiting on request */
   document.getElementById("apiCaller").addEventListener("submit", async function(event){

      //hide all previous result options
      $('#precip').css('display', 'none'); 
      $('#kudos').css('display', 'none'); 
      $('#message').css('display', 'none'); 
      $('#location').css('display', 'none'); 
      $('#description').css('display', 'none'); 
      $('#solo').css('display', 'none'); 

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
            }else if(!(typeof parsed.start_latlng === 'undefined')){
               showLoc(parsed);
            }else if(!(typeof parsed.description === 'undefined') && meth == "GET"){
               showDesc(parsed);
            }else if(typeof parsed.distance === 'undefined'){
               //must be list 
               //is pretty printed 
               $('#message').css('display', 'flex'); 
               $('#message').html('<br><br> <header>List of IDs:</header>\
                  <textarea readonly id="callresponse" rows="15" cols="70" >' + JSON.stringify(parsed, null, 4) + '</textarea>')
            }else{
               //only show run
               showSolo(parsed); 
            }

            
         }else{
            $('#message').css('display', 'flex'); 
            $('#message').html(JSON.stringify(parsed.message)); 
         }

         
      }else{
         alert("text entered is not valid JSON, try again");
      }
   })

 });
 

