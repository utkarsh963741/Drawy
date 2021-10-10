import React, { useState, useEffect } from 'react'
import styles from '../styles/Timer.module.css'

function Timer() {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    useEffect(() => {
        let interval = null;
      
        if (isActive && isPaused === false) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [isActive, isPaused]);
      
      const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
      };

      const handlePauseResume = () => {
        setIsPaused(!isPaused);
      };
      
      const handleReset = () => {
        setIsActive(false);
        setTime(0);
      };

    const StartButton = (
    <div className="btn btn-one btn-start" onClick={handleStart}>
        <i className="fa fa-play"></i>
    </div>
    );

    const ActiveButtons = (
    <div className="btn-grp">
        <div className="btn btn-one" 
            onClick={handlePauseResume}>
        {isPaused ? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
        </div>
        <div className={styles.reset_btn} onClick={handleReset}>
        <i className="fa fa-undo"></i>
        </div>
    </div>
    );

    return (
        <div className={styles.clock}>
            <div className={styles.controls}>
                <div>{isActive ? ActiveButtons : StartButton}</div>
            </div>
            <div className={styles.time}>
                <span className="digits">
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                </span>
                <span className="digits mili-sec">
                    {("0" + ((time / 10) % 100)).slice(-2)}
                </span>
            </div>  
        </div>
    )
}

export default Timer
