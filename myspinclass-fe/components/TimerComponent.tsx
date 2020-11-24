import styles from '../styles/Home.module.css'
import React from 'react'
import { formatSeconds } from '../utils/common';

const Timer = (props) => {

  return props.active ? (
    <IsAtGoal {...props} seconds={props.currentTime} />
  ) : (
    <div className={styles.lower_middle_card_default}>
      <button onClick={props.activeCallback}>Begin</button>
    </div>
  );
}

interface IsAtGoalProps {
  currentSpeed: number,
  goalSpeed: number,
  currentTime: number,
  seconds: number
}
const IsAtGoal = ({ currentSpeed, goalSpeed, seconds }: IsAtGoalProps) => {
  const speedDisplayType = (currentSpeed == goalSpeed) ? "default" : currentSpeed > goalSpeed ? "above" : "below";
  const className = styles["lower_middle_card_" + speedDisplayType];

  return (
    <div className={className} style={{ transition: "all 2s" }}>
      <h1>{formatSeconds(seconds)}</h1>
    </div>
  );
};

export default Timer