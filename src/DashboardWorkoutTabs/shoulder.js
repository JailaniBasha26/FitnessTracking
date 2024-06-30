import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MeterGroup } from 'primereact/metergroup'
import { Button } from 'primereact/button'
import BarBellFrontRaise from '../Assests/Shoulder_Workout_Images/shoulder_barbellFrontRaise.jpg'
import FacePull from '../Assests/Shoulder_Workout_Images/shoulder_facePull.jpg'
import LateralRaise from '../Assests/Shoulder_Workout_Images/shoulder_lateralRaise.jpg'
import ReverseFly from '../Assests/Shoulder_Workout_Images/shoulder_reverseFly.png'
import './shoulder.css'

let completedTaskCount = 0

export function Shoulder({ isDialogOpen }) {
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  let shoulderWorkoutLs = workoutsLs['Shoulder']

  const [barBellFrontRaise, setBarBellFrontRaise] = useState(
    shoulderWorkoutLs['Barbell Front Raise']['Status'],
  )
  const [facePull, setFacePull] = useState(shoulderWorkoutLs['Face Pull']['Status'])
  const [lateralRaise, setLateralRaise] = useState(shoulderWorkoutLs['Lateral Raise']['Status'])
  const [reverseFly, setReverseFly] = useState(shoulderWorkoutLs['Reverse Fly']['Status'])

  const [overall, setOverall] = useState(
    shoulderWorkoutLs['Barbell Front Raise']['Status'] +
      shoulderWorkoutLs['Face Pull']['Status'] +
      shoulderWorkoutLs['Lateral Raise']['Status'] +
      shoulderWorkoutLs['Reverse Fly']['Status'],
  )

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    shoulderWorkoutLs = workoutsLs['Shoulder']
    completedTaskCount = 0

    if (shoulderWorkoutLs['Barbell Front Raise']['Status']) completedTaskCount++
    if (shoulderWorkoutLs['Face Pull']['Status']) completedTaskCount++
    if (shoulderWorkoutLs['Lateral Raise']['Status']) completedTaskCount++
    if (shoulderWorkoutLs['Reverse Fly']['Status']) completedTaskCount++

    setOverall(completedTaskCount)
    setBarBellFrontRaise(workoutsLs['Shoulder']['Barbell Front Raise']['Status'])
    setFacePull(workoutsLs['Shoulder']['Face Pull']['Status'])
    setLateralRaise(workoutsLs['Shoulder']['Lateral Raise']['Status'])
    setReverseFly(workoutsLs['Shoulder']['Reverse Fly']['Status'])
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
            <img
              src={BarBellFrontRaise}
              alt="loading..."
              className="workoutGif"
              width={80}
              height={70}
            />
            <h5 className="workoutName">Barbell Front Raise</h5>
            {statusBtn(barBellFrontRaise)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={FacePull} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Face Pull</h5>
            {statusBtn(facePull)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={LateralRaise}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">Lateral Raise</h5>
            {statusBtn(lateralRaise)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={ReverseFly} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Reverse Fly</h5>
            {statusBtn(reverseFly)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
