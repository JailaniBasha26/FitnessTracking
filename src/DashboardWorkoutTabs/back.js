import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MeterGroup } from 'primereact/metergroup'
import { Button } from 'primereact/button'
import DeadLift from '../Assests/Back_Workout_Images/back_deadLift.png'
import LatPullDown from '../Assests/Back_Workout_Images/back_latPullDown.jpg'
import PullUp from '../Assests/Back_Workout_Images/back_pullUp.jpg'
import SeatedRow from '../Assests/Back_Workout_Images/back_seatedRow.jpg'

import './back.css'

let completedTaskCount = 0
export function Back({ isDialogOpen }) {
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  let backWorkoutLs = workoutsLs['Back']

  const [deadLift, setDeadLift] = useState(backWorkoutLs['Dead Lift']['Status'])
  const [pullUp, setPullUp] = useState(backWorkoutLs['Pull-Up']['Status'])
  const [latPullDown, setLatPullDown] = useState(backWorkoutLs['Lat Pull-Down']['Status'])
  const [seatedRow, setSeatedRow] = useState(backWorkoutLs['Seated Row']['Status'])

  const [overall, setOverall] = useState(
    backWorkoutLs['Dead Lift']['Status'] +
      backWorkoutLs['Pull-Up']['Status'] +
      backWorkoutLs['Lat Pull-Down']['Status'] +
      backWorkoutLs['Seated Row']['Status'],
  )

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    backWorkoutLs = workoutsLs['Back']
    completedTaskCount = 0

    if (backWorkoutLs['Dead Lift']['Status']) completedTaskCount++
    if (backWorkoutLs['Pull-Up']['Status']) completedTaskCount++
    if (backWorkoutLs['Lat Pull-Down']['Status']) completedTaskCount++
    if (backWorkoutLs['Seated Row']['Status']) completedTaskCount++

    setOverall(completedTaskCount)
    setDeadLift(backWorkoutLs['Dead Lift']['Status'])
    setPullUp(backWorkoutLs['Pull-Up']['Status'])
    setLatPullDown(backWorkoutLs['Lat Pull-Down']['Status'])
    setSeatedRow(backWorkoutLs['Seated Row']['Status'])
  }, [isDialogOpen])

  const statusBtn = (status) => {
    if (status) {
      return (
        <div className="meterGroupDiv">
          <Button
            icon="pi pi-check"
            rounded
            outlined
            aria-label="Filter"
            style={{ borderRadius: '37px' }}
          />
        </div>
      )
    } else {
      return (
        <div className="meterGroupDiv">
          <Button
            icon="pi pi-times"
            rounded
            outlined
            severity="danger"
            aria-label="Cancel"
            style={{ borderRadius: '37px' }}
            className="glowingInCompleteWorkoutTask"
          />
        </div>
      )
    }
  }

  return (
    <p className="m-0">
      <h5 className="overAll">Overall</h5>
      <div className="meterGroupDiv">
        <MeterGroup values={[{ color: 'rgb(236 80 80)', value: (overall / 4) * 100 }]} />
      </div>
      <Row>
        <Col>
          <center>
            <img src={DeadLift} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Dead Lift</h5>
            {statusBtn(deadLift)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={PullUp} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Pull Up</h5>
            {statusBtn(pullUp)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={LatPullDown}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">Lat Pull Down</h5>
            {statusBtn(latPullDown)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={SeatedRow} alt="loading..." className="workoutGif" width={70} height={70} />
            <h5 className="workoutName">Seated Row</h5>
            {statusBtn(seatedRow)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
