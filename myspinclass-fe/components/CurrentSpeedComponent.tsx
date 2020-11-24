import styles from '../styles/Home.module.css'
import React from 'react'

class CurrentSpeed extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentSpeed: 0 };
    }
    render() {
      if(this.props.active) {
        return (
          <div className={styles.upper_middle_top_card}>
            <p>Current Speed</p>
            <h1>{this.props.currentSpeed} mph</h1>
          </div>
        );  
      } else {
        return (
          <div className={styles.upper_middle_top_card}>
            <p>Current Speed</p>
            <h1>0 mph</h1>
          </div>
        )
      }
    }
  }


export default CurrentSpeed