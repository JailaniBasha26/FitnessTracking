import React, { useState, useEffect } from 'react'

import { Button } from 'primereact/button'
import { Row, Col } from 'react-bootstrap'
import { Card } from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview'
import { Dialog } from 'primereact/dialog'
import { Fieldset } from 'primereact/fieldset'
import { InputNumber } from 'primereact/inputnumber'
import { FloatLabel } from 'primereact/floatlabel'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Chart } from 'primereact/chart'

import BurningGif from '../Assests/caloriesBurning.gif'
import CyclingGif from '../Assests/cycling.gif'
import WorkoutGif from '../Assests/workout.gif'

import { Back } from '../DashboardWorkoutTabs/back'
import { Arms } from '../DashboardWorkoutTabs/arms'
import { Chest } from '../DashboardWorkoutTabs/chest'
import { Leg } from '../DashboardWorkoutTabs/leg'
import { Shoulder } from '../DashboardWorkoutTabs/shoulder'

import './dashboard.css'

let oop = 1
export function Dashboard() {
  const [myWorkoutDialogBox, setMyWorkoutDialogBox] = useState(false)
  let workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [overAllPercentage, setOverAllPercentage] = useState(0)
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [cyclingValue, setCyclingValue] = useState(0)
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))

    let pendingWorkout = 0
    let completedWorkout = 0
    let totalCaloriesBurned = 0
    Object.keys(workoutsLs).map((key) =>
      Object.keys(workoutsLs[key]).map(
        (key2) =>
          // if (workoutsLs[key][key2]['Status'] == 1){
          // }
          workoutsLs[key][key2]['Status'] == 1 ? completedWorkout++ : pendingWorkout++,
        //   workoutsLs[key][key2]['Status'] == 1 && caloriesBurned++
      ),
    )

    Object.keys(workoutsLs).forEach((muscleGroup) => {
      Object.keys(workoutsLs[muscleGroup]).forEach((exercise) => {
        if (workoutsLs[muscleGroup][exercise].Status === 1) {
          totalCaloriesBurned += workoutsLs[muscleGroup][exercise].CaloriesBurned
        }
      })
    })

    console.log(totalCaloriesBurned, '@!@')
    setCaloriesBurned(totalCaloriesBurned)

    let totalWorkout = pendingWorkout + completedWorkout
    console.log(pendingWorkout, '%%', completedWorkout)
    setCompletedTaskCount(completedWorkout)
    setOverAllPercentage((completedWorkout / totalWorkout) * 100)

    //workoutsLs
    setCyclingValue(workoutsLs['Cycling'])
    const documentStyle = getComputedStyle(document.documentElement)
    const data = {
      datasets: [
        {
          data: [
            (completedWorkout / totalWorkout) * 100,
            100 - (completedWorkout / totalWorkout) * 100,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
          ],
        },
      ],
    }
    const options = {
      cutout: '60%',
    }

    setChartData(data)
    setChartOptions(options)
  }, [])

  const myWorkoutDialogBoxFunc = () => {
    setMyWorkoutDialogBox(true)
  }

  const repsOnChange = (e, workoutObj) => {
    workoutObj['Reps'] = e
    localStorage.setItem('workouts', JSON.stringify(workoutsLs))
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  }

  const setsOnChange = (e, workoutObj) => {
    workoutObj['Sets'] = e
    localStorage.setItem('workouts', JSON.stringify(workoutsLs))
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
  }

  const workoutStatusOnClick = (status, workoutObj) => {
    workoutObj['Status'] = status
    localStorage.setItem('workouts', JSON.stringify(workoutsLs))
    workoutsLs = JSON.parse(localStorage.getItem('workouts'))
    setIsDialogOpen(oop++)
  }

  //setCyclingValue

  const cycingValueOnChange = (value, workoutObj) => {
    setCyclingValue(value)
    workoutObj['Cycling'] = value
    localStorage.setItem('workouts', JSON.stringify(workoutObj))
  }

  const myWorkoutDialogBoxOnHide = () => {
    let pendingWorkout = 0
    let completedWorkout = 0
    Object.keys(workoutsLs).map((key) =>
      Object.keys(workoutsLs[key]).map((key2) =>
        workoutsLs[key][key2]['Status'] == 1 ? completedWorkout++ : pendingWorkout++,
      ),
    )
    let totalWorkout = pendingWorkout + completedWorkout
    setCompletedTaskCount(completedWorkout)
    setOverAllPercentage((completedWorkout / totalWorkout) * 100)

    let totalCaloriesBurned = 0
    Object.keys(workoutsLs).forEach((muscleGroup) => {
      Object.keys(workoutsLs[muscleGroup]).forEach((exercise) => {
        if (workoutsLs[muscleGroup][exercise].Status === 1) {
          totalCaloriesBurned += workoutsLs[muscleGroup][exercise].CaloriesBurned
        }
      })
    })

    console.log(totalCaloriesBurned, '@!@')
    setCaloriesBurned(totalCaloriesBurned)

    if (!myWorkoutDialogBox) return
    setMyWorkoutDialogBox(false)
  }

  const workoutUpdates = (workoutObj) => {
    if (workoutObj != undefined)
      return (
        <Row>
          <Col>
            <FloatLabel>
              <InputNumber
                id="number-input"
                value={workoutObj['Reps']}
                min={20}
                onValueChange={(e) => repsOnChange(e.value, workoutObj)}
                disabled
              />
              <label htmlFor="number-input">No. of Reps (per set)</label>
            </FloatLabel>
          </Col>
          <Col>
            <FloatLabel>
              <InputNumber
                id="number-input"
                value={workoutObj['Sets']}
                min={3}
                onValueChange={(e) => setsOnChange(e.value, workoutObj)}
                disabled
              />
              <label htmlFor="number-input">No. of Set</label>
            </FloatLabel>
          </Col>

          <Col>
            {workoutObj['Status'] ? (
              <Button
                icon="pi pi-check"
                rounded
                aria-label="Filter"
                style={{ borderRadius: '37px' }}
                onClick={() => workoutStatusOnClick(0, workoutObj)}
              />
            ) : (
              <Button
                icon="pi pi-times"
                rounded
                severity="danger"
                aria-label="Cancel"
                style={{ borderRadius: '37px' }}
                onClick={() => workoutStatusOnClick(1, workoutObj)}
              />
            )}
          </Col>
        </Row>
      )
  }

  console.log('$$ RENDER DASHBOARD $$')
  return (
    <div>
      <Row>
        <Col>
          <div className="myWorkoutNavDiv">
            <Button
              label="MY WORKOUT"
              className="myWorkoutNavBtn"
              onClick={myWorkoutDialogBoxFunc}
            ></Button>

            {/* <Button
              label="History"
              className="myWorkoutNavBtn"
              onClick={myWorkoutDialogBoxFunc}
            ></Button> */}
          </div>
        </Col>
      </Row>

      <Dialog
        header="My Workouts"
        visible={myWorkoutDialogBox}
        // style={{ width: '50vw' }}
        className="myWorkoutDialogBox"
        onHide={() => {
          myWorkoutDialogBoxOnHide(myWorkoutDialogBox)
        }}
      >
        <p className="m-0">
          <div className="cyclingDiv">
            <h4>Cycling</h4>{' '}
            <div>
              <InputNumber
                inputId="integeronly"
                value={cyclingValue}
                className="cyclingInput"
                onValueChange={(e) => cycingValueOnChange(e.value, workoutsLs)}
              />
            </div>
            <p className="cyclingMinutesLbl">minutes</p>
          </div>
          <TabView className="myWorkoutTabs">
            <TabPanel header="Leg" className="workoutTabHeader">
              <Accordion activeIndex={0}>
                <AccordionTab header="Lunge">
                  <p className="m-0">
                    {workoutsLs['Leg']['Lunge']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Leg']['Lunge'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Single Leg Dead Lift">
                  <p className="m-0">
                    {workoutsLs['Leg']['Single-Leg DeadLift']['Descriptions']} <br /> <br />
                    {workoutUpdates(workoutsLs['Leg']['Single-Leg DeadLift'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Squats">
                  <p className="m-0">
                    {workoutsLs['Leg']['Squats']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Leg']['Squats'])}
                  </p>
                </AccordionTab>

                <AccordionTab header="Step-Ups">
                  <p className="m-0">
                    {workoutsLs['Leg']['Step-Ups']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Leg']['Step-Ups'])}
                  </p>
                </AccordionTab>
              </Accordion>
            </TabPanel>
            <TabPanel header="Shoulder" className="workoutTabHeader">
              <Accordion activeIndex={0}>
                <AccordionTab header="Barbell Front Raise">
                  <p className="m-0">
                    {workoutsLs['Shoulder']['Barbell Front Raise']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Shoulder']['Barbell Front Raise'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Face Pull">
                  <p className="m-0">
                    {workoutsLs['Shoulder']['Face Pull']['Descriptions']} <br /> <br />
                    {workoutUpdates(workoutsLs['Shoulder']['Face Pull'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Lateral Raise">
                  <p className="m-0">
                    {workoutsLs['Shoulder']['Lateral Raise']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Shoulder']['Lateral Raise'])}
                  </p>
                </AccordionTab>

                <AccordionTab header="Reverse Fly">
                  <p className="m-0">
                    {workoutsLs['Shoulder']['Reverse Fly']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Shoulder']['Reverse Fly'])}
                  </p>
                </AccordionTab>
              </Accordion>
            </TabPanel>
            <TabPanel header="Back" className="workoutTabHeader">
              <Accordion activeIndex={0}>
                <AccordionTab header="Dead Lift">
                  <p className="m-0">
                    {workoutsLs['Back']['Dead Lift']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Back']['Dead Lift'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Pull-Up">
                  <p className="m-0">
                    {workoutsLs['Back']['Pull-Up']['Descriptions']} <br /> <br />
                    {workoutUpdates(workoutsLs['Back']['Pull-Up'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Lat Pull-Down">
                  <p className="m-0">
                    {workoutsLs['Back']['Lat Pull-Down']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Back']['Lat Pull-Down'])}
                  </p>
                </AccordionTab>

                <AccordionTab header="Seated Row">
                  <p className="m-0">
                    {workoutsLs['Back']['Seated Row']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Back']['Seated Row'])}
                  </p>
                </AccordionTab>
              </Accordion>
            </TabPanel>
            <TabPanel header="Arms" className="workoutTabHeader">
              <Accordion activeIndex={0}>
                <AccordionTab header="Biceps Curl">
                  <p className="m-0">
                    {workoutsLs['Arms']['Biceps Curl']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Arms']['Biceps Curl'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Preacher Curl">
                  <p className="m-0">
                    {workoutsLs['Arms']['Preacher Curl']['Descriptions']} <br /> <br />
                    {workoutUpdates(workoutsLs['Arms']['Preacher Curl'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Push Ups">
                  <p className="m-0">
                    {workoutsLs['Arms']['Push Ups']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Arms']['Push Ups'])}
                  </p>
                </AccordionTab>

                <AccordionTab header="Triceps Extension">
                  <p className="m-0">
                    {workoutsLs['Arms']['Triceps Extension']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Arms']['Triceps Extension'])}
                  </p>
                </AccordionTab>
              </Accordion>
            </TabPanel>
            <TabPanel header="Chest" className="workoutTabHeader">
              <Accordion activeIndex={0}>
                <AccordionTab header="Cable Crossover">
                  <p className="m-0">
                    {workoutsLs['Chest']['Cable Crossover']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Chest']['Cable Crossover'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Chest Dip">
                  <p className="m-0">
                    {workoutsLs['Chest']['Chest Dip']['Descriptions']} <br /> <br />
                    {workoutUpdates(workoutsLs['Chest']['Chest Dip'])}
                  </p>
                </AccordionTab>
                <AccordionTab header="Chest Flys">
                  <p className="m-0">
                    {workoutsLs['Chest']['Chest Flys']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Chest']['Chest Flys'])}
                  </p>
                </AccordionTab>

                <AccordionTab header="Floor Press">
                  <p className="m-0">
                    {workoutsLs['Chest']['Floor Press']['Descriptions']} <br />
                    <br />
                    {workoutUpdates(workoutsLs['Chest']['Floor Press'])}
                  </p>
                </AccordionTab>
              </Accordion>
            </TabPanel>
          </TabView>
        </p>
      </Dialog>

      <br />
      <Row className="dashbaordCardRow">
        <Col xl={3} lg={6} md={6} sm={12} xs={12}>
          <Card title="Calories Burned Today">
            <Row>
              <Col>
                <img
                  src={BurningGif}
                  alt="loading..."
                  className="burningGif"
                  width={110}
                  height={100}
                />
              </Col>
              <Col>
                <div className="caloriesBurnedValue">
                  <center>
                    <h1>{caloriesBurned}</h1> <p>calories</p>
                  </center>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={12} xs={12}>
          <Card title="Cycling" className="cyclingCard">
            <Row>
              <Col>
                <img
                  src={CyclingGif}
                  alt="loading..."
                  className="cyclingGif"
                  width={110}
                  height={100}
                />
              </Col>
              <Col>
                <div className="caloriesBurnedValue">
                  <center>
                    <h1>{cyclingValue}</h1> <p>minutes</p>
                  </center>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={12} xs={12}>
          <Card title="No. of Workouts">
            <Row>
              <Col>
                <img
                  src={WorkoutGif}
                  alt="loading..."
                  className="workoutGif"
                  width={110}
                  height={100}
                />
              </Col>
              <Col>
                <div className="caloriesBurnedValue">
                  <center>
                    <h1>{completedTaskCount}/20</h1> <p>workouts</p>
                  </center>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={12} xs={12}>
          <Card title="Overall">
            <Row>
              <Col>
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                  className="dashboardOverallDonut"
                />
              </Col>
              <Col>
                <div className="caloriesBurnedValue">
                  <center>
                    <h1>{overAllPercentage} %</h1> <p>Completed Today</p>
                  </center>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br />
      <TabView className="workoutTabs">
        <TabPanel header="LEG" className="workoutTabHeader">
          <Leg isDialogOpen={isDialogOpen} />
        </TabPanel>
        <TabPanel header="SHOULDER" className="workoutTabHeader">
          <Shoulder isDialogOpen={isDialogOpen} />
        </TabPanel>
        <TabPanel header="BACK" className="workoutTabHeader">
          <Back isDialogOpen={isDialogOpen} />
        </TabPanel>
        <TabPanel header="ARMS" className="workoutTabHeader">
          <Arms isDialogOpen={isDialogOpen} />
        </TabPanel>
        <TabPanel header="CHEST" className="workoutTabHeader">
          <Chest isDialogOpen={isDialogOpen} />
        </TabPanel>
      </TabView>
      {/* <Button label="Submit" /> */}
    </div>
  )
}
