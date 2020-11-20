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

    this.state = {
      currentSpeed: 0,
      goalSpeed: 13,
      currentDistance: 0,
      goalDistance: 0,
      currentTime: 5,
      blocks: [],
      workoutId: "NONAME",
      active: false,
      finished: false
    }

  }

  handleCurrentSpeedCallback = (childData) => { 
    this.setState({
      currentSpeed: childData
    })
  }

  handleTimerCallback = () => {
    this.setState({
      ...this.state,
      finished: true
    })
    console.log("finished")
  }

  getWorkout = () => {
    fetch("http://localhost:5000/workout/workout_id/5")
    .then(res => res.json())
    .then(
      (result) => {
        let time = result.blocks[0].time
        this.setState({
          ...this.state,
          workoutId: result.workout,
          blocks: result.blocks,
          currentTime: time,
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
              <Timer parentCallback={this.handleTimerCallback} active={this.state.active} seconds={this.state.currentTime} goalSpeed={this.state.goalSpeed} currentSpeed={this.state.currentSpeed}/>
          </div>
          <div className={styles.right_grid}>
            {this.state.blocks.map( (item, index) => {
              if(index != 0) {
                return <Zone time={item.time} intensity={item.intensity} id={index}/>
              }
            })}
          </div>
        </main>
      </div>
    )
  }
}

export default withRouter(Workout)