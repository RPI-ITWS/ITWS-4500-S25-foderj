//handles form call 

var IDPAGE = 0;
var MAXPAGE = 0; 
var HTMLSTRINGS = new Array(); 
var INPURL = ""
var INPJSON = ""
var INPMETH = "GET"

//start function

document.getElementById("prev").addEventListener("click", function() {
   if(IDPAGE > 0){
      IDPAGE -= 1; 
   }

   var cur = IDPAGE.toString();
   var max = MAXPAGE.toString();
   var pages = cur + " of " + max; 
   $('#pgCount').html(pages)

   $('#APIres').html('<br><br> <header>API Response:</header> <span id="note">*ID list has been parsed/paginated*</span>\
      <ul id="idList">' + HTMLSTRINGS[IDPAGE] +'</ul>');
});

document.getElementById("next").addEventListener("click", function() {
   if(IDPAGE < MAXPAGE){
      IDPAGE += 1; 
   }

   var cur = IDPAGE.toString();
   var max = MAXPAGE.toString();
   var pages = cur + " of " + max; 
   $('#pgCount').html(pages)

   $('#APIres').html('<br><br> <header>API Response:</header> <span id="note">*ID list has been parsed/paginated*</span>\
      <ul id="idList">' + HTMLSTRINGS[IDPAGE] +'</ul>');
});

//simple is JSON function for form submission: 
function isJSON(str) {
   try {
       JSON.parse(str);
       return true; 
   } catch (error) {
       return false;
   }
}


document.getElementById("url").addEventListener("input", function() {
   INPURL = $('#url').val();
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n   \
        "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

document.getElementById("jsonInput").addEventListener("input", function() {
   INPJSON = $('#jsonInput').val().replace(/\s+/g, ''); //removes whitepace using regex
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n     \
      "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

//change because select element 
document.getElementById("apiCaller").addEventListener("change", function() {
   INPMETH = $('#method').val();
   $('#fetch').html('fetch(\'' + INPURL +  '\', {\n\tmethod: \'' + INPMETH + '\',\n\n\theaders: {\n     \
      "Content-Type": "application/json",\n\t},\n\n\tbody: \''+ INPJSON + '\'\n     })')
});

// for dropdown


window.addEventListener("load", function() {

   //calls everytime submit occurs
   //event holds details about event 
   //must be async because waiting on request 
   document.getElementById("apiCaller").addEventListener("submit", async function(event){

      //preventing from reloading page 
      event.preventDefault();

      var meth = $('#method').val(); 
      var url = $('#url').val(); 
      var bod = $('#jsonInput').val(); //if nothing, body == ""

      if(isJSON(bod) || bod == ""){
         // var meth = "GET"; 
         // var url = "http://localhost:3000/runs"; 
         // var bod = $('#jsonInput').val(); //if nothing, body == ""

         console.log(meth); 
         console.log(url)
         // console.log(JSON.parse(bod)) 


         if(!bod == ""){
            bod = JSON.stringify(JSON.parse(bod))//converts JS object, then to string from JSON
         }

         //No body
         //making request
         if(meth == "GET" || meth == "DELETE"){
            var fetchRes = await fetch(url, {
               method: meth,
               headers: {
                  "Content-Type": "application/json",
               }
            })
         }else{
            //is body
            var fetchRes = await fetch(url, {
               method: meth,
               headers: {
                  "Content-Type": "application/json",
               },
               body: bod 
            })
         }


         var parsed = await fetchRes.json()
         console.log(parsed)

         
         //on server: https://foderj.eastus.cloudapp.azure.com/node/runs
         //local: http://localhost:3000/runs
         if(meth != "GET" || url != "https://foderj.eastus.cloudapp.azure.com/node/runs"){
            //is pretty printed 
            $('.nav').css('display', 'none');
            $('#APIres').html('<br><br> <header>API Raw Response:</header>\
               <textarea readonly id="callresponse" rows="15" cols="70" >' + JSON.stringify(parsed, null, 4) + '</textarea>')
         }else{         
            IDPAGE = 0;
            MAXPAGE = 0; 
            HTMLSTRINGS.length = 0; 

            //use pagenation --> so diplayed in 'proper html pages'
            //pagenated and parsed response: 

            //store length of array

            var len = parsed.length;

            console.log(parsed)

            //makes list items and puts tham in array 
            
            var cur = ""
            for(var i = 0; i < parsed.length; i++){
               //if divisible by 10 
               if (i%10 == 0 && i != 0){
                  HTMLSTRINGS.push(cur);
                  cur = ""; 
               }else if(i == len-1){
                  //so that last item is included
                  cur += "<li>" + parsed[i].toString() + "</li>";
                  HTMLSTRINGS.push(cur);
               }
               cur += "<li>" + parsed[i].toString() + "</li>";
            }

            console.log(HTMLSTRINGS) 
            MAXPAGE = HTMLSTRINGS.length -1
            
            $('#APIres').html('<br><br> <header>API Response:</header> <span id="note">*ID list has been parsed/paginated*</span>\
               <ul id="idList">' + HTMLSTRINGS[0] +'</ul>');

            //unhide buttons
            //set innder html of page count to 0 of max 
            $('.nav').css('display', 'inline-block');
            var max = MAXPAGE.toString();
            $('#pgCount').html("0 of " + max);
         }
         
      }else{
         alert("text answered is not valid JSON, try again");
      }



   })
});