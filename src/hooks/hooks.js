import {useEffect, useState} from "react";
import moment from "moment";

const calculateHrsMinsSecs = (totalSecs) => {
    let hrs = totalSecs ? Math.floor(totalSecs / (60 * 60)) : 0;
    let mins = totalSecs ? Math.floor(totalSecs / 60) % 60 : 0;
    let secs = totalSecs ? totalSecs % 60 : 0;
    hrs = ("00" + hrs).slice(-2);
    mins = ("00" + mins).slice(-2);
    secs = ("00" + secs).slice(-2);
    return { hrs, mins, secs };
  };
  
const useTimeLeft = (props) => {
    const { startTime, endTime, deliveryTime } = props;
    const [timeLeftToStartString, setTimeLeftToStartString] =
      useState(null);
    const [timeLeftToEndString, setTimeLeftToEndString] = useState(null);
    const [timeLeftToDeliveryString, setTimeLeftToDeliveryString] = useState(null);
    const startTimeTimestamp = moment(startTime).unix();
    const endTimeTimestamp = moment(endTime).unix();
    const deliveryTimeTimestamp = moment(deliveryTime).unix();
  
    useEffect(() => {
      const interval = setInterval(() => {
        let currentTimeStamp = moment().unix();
        let timeToStart = startTimeTimestamp - currentTimeStamp;
        let timeToEnd = endTimeTimestamp - currentTimeStamp;
        let timeToDelivery = deliveryTimeTimestamp - currentTimeStamp;

        timeToStart = calculateHrsMinsSecs(
          Math.abs(startTimeTimestamp - currentTimeStamp)
        );
        setTimeLeftToStartString( `${timeToStart.hrs}h ${timeToStart.mins}m ${timeToStart.secs}s`)

        timeToEnd = calculateHrsMinsSecs(
          Math.abs(endTimeTimestamp - currentTimeStamp)
        );
        setTimeLeftToEndString(
          `${timeToEnd.hrs}h ${timeToEnd.mins}m ${timeToEnd.secs}s`
        );

        timeToDelivery = calculateHrsMinsSecs(
          Math.abs(deliveryTimeTimestamp - currentTimeStamp)
        );
        setTimeLeftToDeliveryString(
          `${timeToDelivery.hrs}h ${timeToDelivery.mins}m ${timeToDelivery.secs}s`
        );

        // if(timeToStart > 0){
        //   timeToStart = calculateHrsMinsSecs(
        //     Math.abs(startTimeTimestamp - currentTimeStamp)
        //   );
        //   setTimeLeftToStartString(
        //     `${timeToStart.hrs}h ${timeToStart.mins}m ${timeToStart.secs}s`
        //   );
        //   setTimeLeftToEndString(null);
        // }
        // else if(timeToEnd > 0){
        //   timeToEnd = calculateHrsMinsSecs(
        //     Math.abs(endTimeTimestamp - currentTimeStamp)
        //   );
        //   setTimeLeftToStartString(null);
        //   setTimeLeftToEndString(
        //     `${timeToEnd.hrs}h ${timeToEnd.mins}m ${timeToEnd.secs}s`
        //   );
        // }
        // else{
        //   setTimeLeftToStartString(null);
        //   setTimeLeftToEndString(null);
        // }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    });
  
    return { timeLeftToStartString, timeLeftToEndString, timeLeftToDeliveryString };
  };

export {useTimeLeft};