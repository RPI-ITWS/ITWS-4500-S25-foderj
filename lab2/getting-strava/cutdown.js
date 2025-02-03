/*
Function used to pull from strava and create the local database of info that I actually wanted
Takes in a JSON response from strava of a array of activities and cuts them down accordingly 
*/
function curateDB(initJSON){
   let runs = new Array(); 
   for(var i = 0; i < initJSON.length; i++){
      
      if(initJSON[i].type == "Run"){
         //cleaning and pushing item
         delete initJSON[i].resource_state
         delete initJSON[i].athlete
         delete initJSON[i].sport_type
         delete initJSON[i].workout_type
         delete initJSON[i].start_date_local
         delete initJSON[i].timezone
         delete initJSON[i].utc_offset
         delete initJSON[i].location_city
         delete initJSON[i].location_state
         delete initJSON[i].location_country
         delete initJSON[i].achievement_count
         delete initJSON[i].kudos_count
         delete initJSON[i].comment_count
         delete initJSON[i].athlete_count
         delete initJSON[i].photo_count
         delete initJSON[i].trainer
         delete initJSON[i].commute
         delete initJSON[i].manual
         delete initJSON[i].private
         delete initJSON[i].visibility
         delete initJSON[i].flagged
         delete initJSON[i].gear_id
         delete initJSON[i].start_latlng
         delete initJSON[i].end_latlng
         delete initJSON[i].weighted_average_watts
         delete initJSON[i].device_watts
         delete initJSON[i].has_heartrate
         delete initJSON[i].heartrate_opt_out
         delete initJSON[i].display_hide_heartrate_option
         delete initJSON[i].upload_id
         delete initJSON[i].upload_id_str
         delete initJSON[i].external_id
         delete initJSON[i].map
         delete initJSON[i].from_accepted_tag
         delete initJSON[i].pr_count
         delete initJSON[i].total_photo_count
         delete initJSON[i].has_kudoed
         runs.push(initJSON[i]);   
      }
   }
   return(runs);  

}