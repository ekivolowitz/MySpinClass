import Head from 'next/head'
import { withRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Timer from '../../components/TimerComponent'
import CurrentSpeed from '../../components/CurrentSpeedComponent'
import GoalSpeed from '../../components/GoalSpeedComponent'
import Zone from '../../components/ZoneComponent'
import React from 'react'

class Workout extends React.Component {

  constructor(props) {
    super(props)

    this.getWorkout = this.getWorkout.bind(this)
    this.handleTimerCallback = this.handleTimerCallback.bind(this)
    this.handleCurrentSpeedCallback = this.handleCurrentSpeedCallback.bind(this)
    this.handleActiveCallback = this.handleActiveCallback.bind(this)

    this.state = {
      currentSpeed: 0,
      goalSpeed: 0,
      currentDistance: 0,
      goalDistance: 0,
      currentTime: 0,
      currentBlockIndex: -1,
      blocks: [],
      workoutId: null,
      active: false,
      finished: false
    }
  }

  mapZoneToSpeed = (zone) => {
    let speed = 0
    switch(zone){
      case "BASE": {
        speed = 12.5
        break
      }
      case "PUSH": { 
        speed = 13
        break
      }
      case "SPRINT": {
        speed = 13.5
        break
      }
    }
    return speed
  }

  handleCurrentSpeedCallback = (childData) => { 
    this.setState({
      ...this.state,
      currentSpeed: childData
    })
  }

  handleTimerCallback = () => {
    this.setState({
      ...this.state,
      finished: true
    })
  }

  handleActiveCallback = (e) => {
    let nextIndex = this.state.currentBlockIndex + 1
    let nextZone = this.mapZoneToSpeed(this.state.blocks[nextIndex].intensity)
    this.setState({
      active: e.active,
      currentBlockIndex: nextIndex,
      currentTime: this.state.blocks[nextIndex].time,
      goalSpeed: nextZone
    })
  }

componentWillUnmount() {
  clearInterval(this.timerInterval)
  clearInterval(this.setCurrentSpeedInterval)
}

  setTimerInterval() {
    if(this.state.active) {
      if(this.state.currentTime - 1 >= 0 ) {
        this.setState({
          currentTime: this.state.currentTime - 1,            
        });
      } else {
        let nextIndex = this.state.currentBlockIndex + 1
        if(nextIndex >= this.state.blocks.length) {
          console.log("reached the end of the blocks")
          this.setState({
            active: false
          })
        } else {
          this.setState({
            currentTime: this.state.blocks[nextIndex].time,
            currentBlockIndex: nextIndex,
            goalSpeed: this.mapZoneToSpeed(this.state.blocks[nextIndex].intensity)
          })
        }


      }  
    }
  }

  setCurrentSpeedInterval() {
    if(this.state.active) {
      fetch("http://localhost:5000/bluetooth/device/read/speed")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentSpeed: result.speed,
          });
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  getWorkout = () => {
    fetch("http://localhost:5000/workout/workout_id/3")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          workoutId: result.workout,
          blocks: result.blocks,
        })
      }, (error) => {
        console.log(error)
      }
    )
  }

  componentDidMount() {
    this.getWorkout()
    this.timerInterval = setInterval(() => this.setTimerInterval(), 1000)
    this.speedInterval = setInterval(() => this.setCurrentSpeedInterval(), 1000)
  }

  render() {
    if(this.state.workoutId === null) {
      return null
    }
    else {
      return (
        <div className={styles.container}>

          <main className={styles.main}>

            <div className={styles.left_grid}>
                <h3>Data Grid</h3>
            </div>
            <div className={styles.grid}>
              <div className={styles.upper_middle}>
                <GoalSpeed goalSpeed={this.state.goalSpeed} active={this.state.active}/>
                <CurrentSpeed active={this.state.active} currentSpeed={this.state.currentSpeed}/>
              </div>
                <Timer parentCallback={this.handleTimerCallback} activeCallback={this.handleActiveCallback} active={this.state.active} currentTime={this.state.currentTime} goalSpeed={this.state.goalSpeed} currentSpeed={this.state.currentSpeed}/>
            </div>
            <div className={styles.right_grid}>
              {this.state.blocks.map( (item, index) => {
                if(index > this.state.currentBlockIndex)
                  return <Zone time={item.time} intensity={item.intensity} id={index}/>
              })}
            </div>
          </main>
        </div>
      )
    }
  }
}

export default withRouter(Workout)