import  { useState, useEffect } from 'react';
import React from 'react';


//hook for contacting API after a set time has passed.
//design pattern to not call API for every key stroke in search bar.

export function useDebounce(value, timeout, callback){

    //state to store timer
    const [timer, setTimer]= useState(null);

    //if the timer is a valid timer, clear it.
    const clearTimer = () =>{
        if(timer)
        clearTimeout(timer)
    }

    //on use, clear the timer. If the value and call back are valid, create a new timer, then set it to the current timer.
    useEffect(()=>{
        clearTimer();


        if(value && callback){
            const newTimer = setTimeout(callback, timeout);
            setTimer(newTimer);
        }
    }, [value]);

}