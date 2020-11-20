import styles from '../styles/Home.module.css'
import React from 'react'

class CurrentSpeed extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentSpeed: 0 };
    }
  
    tick() {
      fetch("http://localhost:5000/bluetooth/device/read/speed")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentSpeed: result.speed,
          });
          this.props.parentCallback(result.speed)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div className={styles.upper_middle_top_card}>
          <p>Current Speed</p>
          <h1>{this.state.currentSpeed} mph</h1>
        </div>
      );
    }
  }


export default CurrentSpeed