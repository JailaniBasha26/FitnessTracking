import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MeterGroup } from 'primereact/metergroup'
import { Button } from 'primereact/button'
import Lunge from '../Assests/Leg_Workout_Images/lunge.jpg'
import SingleLegDeadLift from '../Assests/Leg_Workout_Images/singleLegDeadLift.jpeg'
import Squats from '../Assests/Leg_Workout_Images/squats.jpg'
import StepUps from '../Assests/Leg_Workout_Images/stepUps.png'
import './leg.css'

let completedTaskCount = 0

export function Leg({ isDialogOpen }) {
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  let legWorkoutLs = workoutsLs['Leg']

  const [lunge, setLunge] = useState(legWorkoutLs['Lunge']['Status'])
  const [singleLegDeadLift, setSingleLegDeadLift] = useState(
    legWorkoutLs['Single-Leg DeadLift']['Status'],
  )
  const [squats, setSquats] = useState(legWorkoutLs['Squats']['Status'])
  const [stepUps, setStepUps] = useState(legWorkoutLs['Step-Ups']['Status'])

  const [overall, setOverall] = useState(
    legWorkoutLs['Lunge']['Status'] +
      legWorkoutLs['Single-Leg DeadLift']['Status'] +
      legWorkoutLs['Squats']['Status'] +
      legWorkoutLs['Step-Ups']['Status'],
  )

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    legWorkoutLs = workoutsLs['Leg']
    completedTaskCount = 0

    if (legWorkoutLs['Lunge']['Status']) completedTaskCount++
    if (legWorkoutLs['Single-Leg DeadLift']['Status']) completedTaskCount++
    if (legWorkoutLs['Squats']['Status']) completedTaskCount++
    if (legWorkoutLs['Step-Ups']['Status']) completedTaskCount++

    setOverall(completedTaskCount)
    setLunge(legWorkoutLs['Lunge']['Status'])
    setSingleLegDeadLift(legWorkoutLs['Single-Leg DeadLift']['Status'])
    setSquats(legWorkoutLs['Squats']['Status'])
    setStepUps(legWorkoutLs['Step-Ups']['Status'])
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
            <img src={Lunge} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Lunge</h5>
            {statusBtn(lunge)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={SingleLegDeadLift}
              alt="loading..."
              className="workoutGif"
              width={80}
              height={70}
            />
            <h5 className="workoutName">Single Leg Dead Lift</h5>
            {statusBtn(singleLegDeadLift)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={Squats} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Squats</h5>
            {statusBtn(squats)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={StepUps} alt="loading..." className="workoutGif" width={70} height={70} />
            <h5 className="workoutName">Step Ups</h5>
            {statusBtn(stepUps)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
