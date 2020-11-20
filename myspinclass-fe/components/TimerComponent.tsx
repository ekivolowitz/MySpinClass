import styles from '../styles/Home.module.css'
import React from 'react'
type Props = {
    seconds: number
}

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        seconds: props.seconds,
      };
    }
  
    tick() {
        if(this.state.seconds - 1 >= 0 ) {
          this.setState(state => ({
            seconds: state.seconds - 1
          }));
        } else {
          this.setState({
            seconds: 0
          })
          // this.props.parentCallback()
        }
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    isAtGoal(props) {
      var goal = props.currentSpeed >= props.goalSpeed ? true : false
      if(props.currentSpeed == props.goalSpeed || (props.currentSpeed == 0 && props.goalSpeed == 0)) {
        return (
          <div className={styles.lower_middle_card_default}>
              <h1>{Math.floor(props.seconds / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
          </div>
        )
      }
      else if(props.currentSpeed > props.goalSpeed) {
        return (
          <div className={styles.lower_middle_card_above}>
              <h1>{Math.floor(props.seconds / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
          </div>
        );
      }
      else {
        return (
          <div className={styles.lower_middle_card_below}>
              <h1>{Math.floor(props.seconds / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
          </div>
        );
      }
    }
  
    render() {
      return <this.isAtGoal currentSpeed={this.props.currentSpeed} goalSpeed={this.props.goalSpeed} seconds={this.state.seconds}/>
    }
  }


export default Timer