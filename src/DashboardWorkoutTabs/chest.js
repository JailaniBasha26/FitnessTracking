import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MeterGroup } from 'primereact/metergroup'
import { Button } from 'primereact/button'
import CableCrossOver from '../Assests/Chest_Workout_Images/chest_cableCrossOver.jpg'
import ChestDip from '../Assests/Chest_Workout_Images/chest_chestDip.jpg'
import ChestFlys from '../Assests/Chest_Workout_Images/chest_chestFlys.jpg'
import FloorPress from '../Assests/Chest_Workout_Images/chest_floorPress.jpg'
import './chest.css'

let completedTaskCount = 0
export function Chest({ isDialogOpen }) {
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  let chestWorkoutLs = workoutsLs['Chest']

  const [cableCrossOver, setCableCrossOver] = useState(chestWorkoutLs['Cable Crossover']['Status'])
  const [chestDip, setChestDip] = useState(chestWorkoutLs['Chest Dip']['Status'])
  const [chestFlys, setChestFlys] = useState(chestWorkoutLs['Chest Flys']['Status'])
  const [floorPress, setFloorPress] = useState(chestWorkoutLs['Floor Press']['Status'])

  const [overall, setOverall] = useState(
    chestWorkoutLs['Cable Crossover']['Status'] +
      chestWorkoutLs['Chest Dip']['Status'] +
      chestWorkoutLs['Chest Flys']['Status'] +
      chestWorkoutLs['Floor Press']['Status'],
  )

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    chestWorkoutLs = workoutsLs['Chest']
    completedTaskCount = 0

    if (chestWorkoutLs['Cable Crossover']['Status']) completedTaskCount++
    if (chestWorkoutLs['Chest Dip']['Status']) completedTaskCount++
    if (chestWorkoutLs['Chest Flys']['Status']) completedTaskCount++
    if (chestWorkoutLs['Floor Press']['Status']) completedTaskCount++

    setOverall(completedTaskCount)
    setCableCrossOver(chestWorkoutLs['Cable Crossover']['Status'])
    setChestDip(chestWorkoutLs['Chest Dip']['Status'])
    setChestFlys(chestWorkoutLs['Chest Flys']['Status'])
    setFloorPress(chestWorkoutLs['Floor Press']['Status'])
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
              src={CableCrossOver}
              alt="loading..."
              className="workoutGif"
              width={120}
              height={70}
            />
            <h5 className="workoutName">Cable CrossOver</h5>
            {statusBtn(cableCrossOver)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={ChestDip} alt="loading..." className="workoutGif" width={90} height={70} />
            <h5 className="workoutName">Chest Dip</h5>
            {statusBtn(chestDip)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={ChestFlys} alt="loading..." className="workoutGif" width={110} height={70} />
            <h5 className="workoutName">Chest Flys</h5>
            {statusBtn(chestFlys)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={FloorPress} alt="loading..." className="workoutGif" width={90} height={70} />
            <h5 className="workoutName">Floor Press</h5>
            {statusBtn(floorPress)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
