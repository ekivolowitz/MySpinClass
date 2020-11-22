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
      blocks: [],
      workoutId: null,
      active: false,
      finished: false
    }

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
    console.log("active callback" + e)
    this.setState({
      ...this.state,
      active: true
    })
  }

  getWorkout = () => {
    fetch("http://localhost:5000/workout/workout_id/25")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          ...this.state,
          workoutId: result.workout,
          blocks: result.blocks,
          active: true
        })
        console.log(this.state)
      }, (error) => {
        console.log(error)
      }
    )
  }

  componentDidMount() {
    this.getWorkout()
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
                <GoalSpeed goalSpeed={this.state.goalSpeed}/>
                <CurrentSpeed parentCallback = {this.handleCurrentSpeedCallback} active={this.state.active}/>
              </div>
                <Timer parentCallback={this.handleTimerCallback} activeCallback={this.handleActiveCallback} active={this.state.active} seconds={this.state.currentTime} goalSpeed={this.state.goalSpeed} currentSpeed={this.state.currentSpeed}/>
            </div>
            <div className={styles.right_grid}>
              {this.state.blocks.map( (item, index) => {
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