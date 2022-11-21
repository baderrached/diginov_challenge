import React, { Fragment, useEffect, useState } from 'react'
import Project from "../../components/Project/Project"
import { Container, Row, Col, Card, CardBody, Button, Input, Form } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from "../../redux/actions/project"
import moment from "moment";
import AddProject from './AddProject'

const Porjects = () => {
  const [open, setopen] = useState(false)
  const toggleModal = () => {
    setopen(!open)
  }


  const dispatch = useDispatch()
  const {
    projects,
    project
  } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(getProjects())
  }, [])
  useEffect(() => {
    if(project !== null) {
    dispatch(getProjects())
    toggleModal()
  }
  }, [project])

  const getPourcentage = (project) => {
    let countDoneTasks = 0;
    if (project.tasks.length > 0) {
      for (let task of project.tasks) {
        if (task.status === "Done") {
          countDoneTasks = countDoneTasks + 1;
        }
      }
    return Math.round(countDoneTasks * 100 / project.tasks.length)
    }else{
      return 0
    }
  }

  const checkProjectStatus = (project) => {
    let fiveDaysCount = 0;
    let threeDaysCount = 0;
    let danger = false;
    let dateNow = moment(new Date());
    if (project.tasks.length > 0) {
    for (let task of project.tasks) {
      let givenDate = moment(task.createdAt)
      let diff_date = moment.duration(dateNow.diff(givenDate)).asDays();
      if (task.status !== "Done" && diff_date >= 5) {
        fiveDaysCount = fiveDaysCount+1
      }
      if (task.status !== "Done" && diff_date >= 10) {
        danger = true
      }
      if (task.status !== "Done" && diff_date >= 3) {
        threeDaysCount = threeDaysCount + 1
      }
    }
  }
  if (danger) {
    return "#ff6347" // danger
  }else if (!danger && fiveDaysCount >= 4) {
    return "#ff6347" // danger
  }else if (!danger && fiveDaysCount < 4 && fiveDaysCount > 1) {
    return "#ffa500" // warning
  }else if (threeDaysCount >= 5) {
    return "#ffa500" // warning
  }else {
    return "#3bb001"
  }
  }
  
  
  return (

    <div className="container mn-ht-100p">
      <div className="content-wrapper w-100">
        <AddProject modal={open} toggle={toggleModal} projectKey={projects.length}/>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="wrapper">
                    <h4 className="card-title">All Projects ({projects.length})</h4>
                  </div>
                  <div className="wrapper">
                  </div>
                  { JSON.parse(localStorage.getItem("userdata")).data.role === "manager" &&
                  <div style={{ textAlign: "end",width: "100%" }} >
                  <button onClick={toggleModal} style={{ color: 'white', borderRadius: '15px' }}  className="btn btn-success no-wrap ms-4">Add Project</button>
                  </div>
                   }
                </div>
                
                <div className="row project-list-showcase">
                  {projects !== undefined && projects !== null && projects.length > 0 ? (
                    projects.map((item, idx) => (
                     <Project project={item} checkProjectStatus={checkProjectStatus} getPourcentage={getPourcentage}/>
                    ))) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

  )
}

export default Porjects