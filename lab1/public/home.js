//handles form call 

//start function
window.addEventListener("load", function() {

   //calls everytime submit occurs
   //event holds details about event 
   document.getElementById("apiCaller").addEventListener("submit", function(event){

      //preventing from reloading page 
      event.preventDefault();

      var method = $('#method').val(); 
      console.log(method); 

      //catch response, 
      //present response in uneditable textarea
      /*				Handle if not Valid JSON input

				Box that presents the  the response: 
					use pagenation for books 
               */
      $('body').append("heya")
   })
});