import styles from '../styles/Home.module.css'
import React from 'react'

class Zone extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          currentTime: props.time,
          active: false
      };
    }
  
    tick() {
        if(this.state.active) {
            this.setState({
                currentTime: this.state.currentTime - 1
            })
        }

        this.setColor = this.setColor.bind(this)
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    setColor(props) {
        if(props.intensity === "BASE") {
            return (<div className={styles.zone_card} style={{backgroundColor: 'green'}}>
                <h1>{Math.floor(props.currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.currentTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
            </div>)
        } else if (props.intensity === "PUSH") {
            return (<div className={styles.zone_card} style={{backgroundColor: 'orange'}}>
                <h1>{Math.floor(props.currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.currentTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
            </div>)
        } else {
            return (<div className={styles.zone_card} style={{backgroundColor: 'red'}}>
                <h1>{Math.floor(props.currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{(props.currentTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
            </div>)
        }
    }   
  
    render() {
        return (
            <this.setColor intensity={this.props.intensity} currentTime={this.state.currentTime}/>
        );
    }
  }


export default Zone