import {Events} from "../models/event";
import {EventsDTO} from "../dtos/EventsDTO";

export function eventDTOToEventConverter(eventsDTO:EventsDTO):Events
{
  // console.log('we are in converter');
   //console.log(eventsDTO);
    return new Events
    (
        eventsDTO.event_id,
        eventsDTO.event_location,
        eventsDTO.dates,
        timeInWords(eventsDTO.times)
    )
}

    // time method
    function timeInWords(time) {

  let words= [ "zero", "one", "two", "three", "four","five", 
                    "six", "seven", "eight", "nine","ten", "eleven", 
                    "twelve", "thirteen","fourteen", "fifteen", "sixteen", 
                    "seventeen","eighteen", "nineteen", "twenty","twenty one", 
                    "twenty two", "twenty three", "twenty four","twenty five", 
                     "twenty six", "twenty seven","twenty eight", "twenty nine"]; 

 let result = "please enter Time";
 let h=+substring(time,0,2)    ,m=+(substring(time,3,5))
//console.log('we are in time function');
//console.log(h);

if (m == 0) {
      result = words[h] + " o' clock";
    } else if (m == 15) {
        result= "quarter past "+ words[h];
    } else if (m==30) {
        result = "half past " +words[h];
        } else if (m==45) {
            result = "quarter to "+ words[h+1];
        }else if  (m==1){
            result = "one minute past "+ words[h];
            }else if (m<30){
            result = `${words[m]} minutes past ${words[h]};`
        }  else {
                result = words[60-m]+" minutes to "+ words[h+1];
            }
       // console.log(result);
        
return result ;
    }
//function to seprate minites and hours
    function substring(someStr, startIndex, endIndex) 
    {
        let n=''
            n=someStr.substring(startIndex, endIndex)
            return n            
    }


