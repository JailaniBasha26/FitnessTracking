import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MeterGroup } from 'primereact/metergroup'
import { Button } from 'primereact/button'
import BicepsCurl from '../Assests/Arms_Workout_Images/arms_bicepsCurl.jpg'
import PreacherCurl from '../Assests/Arms_Workout_Images/arms_preacherCurl.jpg'
import PushUps from '../Assests/Arms_Workout_Images/arms_pushUps.jpg'
import TricepsExtension from '../Assests/Arms_Workout_Images/arms_tricepsExtension.jpg'

import './arms.css'

let completedTaskCount = 0
export function Arms({ isDialogOpen }) {
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  let armsWorkoutLs = workoutsLs['Arms']

  const [bicepsCurl, setBicepsCurl] = useState(armsWorkoutLs['Biceps Curl']['Status'])
  const [preacherCurl, setPreacherCurl] = useState(armsWorkoutLs['Preacher Curl']['Status'])
  const [pushUps, setPushUps] = useState(armsWorkoutLs['Push Ups']['Status'])
  const [tricepsExtension, setTricepsExtension] = useState(
    armsWorkoutLs['Triceps Extension']['Status'],
  )

  const [overall, setOverall] = useState(
    armsWorkoutLs['Biceps Curl']['Status'] +
      armsWorkoutLs['Preacher Curl']['Status'] +
      armsWorkoutLs['Push Ups']['Status'] +
      armsWorkoutLs['Triceps Extension']['Status'],
  )

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    armsWorkoutLs = workoutsLs['Arms']
    completedTaskCount = 0

    if (armsWorkoutLs['Biceps Curl']['Status']) completedTaskCount++
    if (armsWorkoutLs['Preacher Curl']['Status']) completedTaskCount++
    if (armsWorkoutLs['Push Ups']['Status']) completedTaskCount++
    if (armsWorkoutLs['Triceps Extension']['Status']) completedTaskCount++

    setOverall(completedTaskCount)
    setBicepsCurl(armsWorkoutLs['Biceps Curl']['Status'])
    setPreacherCurl(armsWorkoutLs['Preacher Curl']['Status'])
    setPushUps(armsWorkoutLs['Push Ups']['Status'])
    setTricepsExtension(armsWorkoutLs['Triceps Extension']['Status'])
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
            <img src={BicepsCurl} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Biceps Curl</h5>
            {statusBtn(bicepsCurl)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={PreacherCurl}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">Preacher Curl</h5>
            {statusBtn(preacherCurl)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={PushUps} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Push Ups</h5>
            {statusBtn(pushUps)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={TricepsExtension}
              alt="loading..."
              className="workoutGif"
              width={90}
              height={70}
            />
            <h5 className="workoutName">Triceps Extension</h5>
            {statusBtn(tricepsExtension)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
