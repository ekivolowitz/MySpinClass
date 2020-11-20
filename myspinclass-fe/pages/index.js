import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React from 'react'
import { withRouter } from 'next/router'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onClickHandler = (event) => {
      this.props.router.push('/workout/workout_id')
  }


  render() {
    return (
      <div className={styles.container}>

        <main className={styles.main}>
            <a href="/select/workout">Click me to go to /workout   </a>
            <h1>OR</h1>
            <button onClick={this.onClickHandler}>Go to /workout/workout_id</button>
        </main>
      </div>
    )
  }
}

export default withRouter(Home)