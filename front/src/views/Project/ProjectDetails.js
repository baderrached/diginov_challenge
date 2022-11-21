import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Task from "../../components/Task/Task"
import { Container, Row, Col, Card, CardBody, Button, Input, Form } from 'reactstrap'
import { getTasks } from '../../redux/actions/task'
import { useParams } from 'react-router-dom'
import AddTask from "../Task/AddTask"
import { closeProject } from '../../redux/actions/project'
const ProjectDetails = () => {
  const { projectId } = useParams()
  const [isOpen, setisOpen] = useState(false)
  const [projId, setprojId] = useState("")
  const [tab, settab] = useState("new")
  const toggleModal = () => {
    setisOpen(!isOpen)
  }
  const handleCloseProject = (e) => {
    e.preventDefault();
    dispatch(closeProject(projectId))

  }
  const dispatch = useDispatch()
  const {
    tasks,
    update_task,
    task
  } = useSelector((state) => state.task);
  const {
    isError,
    error } = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(getTasks(projectId))
  }, [])
  useEffect(() => {
    if (projectId !== undefined) {
      setprojId(projectId)
    }
  }, [projectId])

  useEffect(() => {
    if (task !== null) {
      dispatch(getTasks(projId))
      toggleModal()
    }
  }, [task])
  useEffect(() => {
    if (update_task !== null) {
      dispatch(getTasks(projId))
    }
  }, [update_task])

  return (
    <Container>
      {isError &&
        <p style={{ backgroundColor: '#ff6666', color: 'white', borderRadius: '5px', padding: '3px' }}> {error} </p>
      }
      <div className="content-wrapper w-100">
        <AddTask isOpen={isOpen} toggle={toggleModal} projectId={projectId} tasksKey={tasks.length} />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="d-sm-flex pb-4 mb-4 border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="page-title mb-n2">Tasks</h5>
                    <p className="mt-2 mb-n1 ms-3 text-muted">({tasks.length}) Tasks</p>
                  </div>

                  {JSON.parse(localStorage.getItem("userdata")).data.role === "manager" &&
                    <>
                      <button onClick={toggleModal} className="btn btn-success no-wrap ms-4">Add Task</button>
                     
                        <button onClick={handleCloseProject} className="btn btn-success no-wrap ms-4">Close Project</button>
             
                    </>
                  }
                </div>
                <div class="nav-scroller mb-5">
                  <ul class="nav nav-tabs tickets-tab-switch" role="tablist">
                    <li class="nav-item" onClick={() => { settab("new") }} style={{ cursor: "pointer" }}>
                      <a class={`nav-link rounded ${tab === "new" ? "active" : ""}`} id="open-tab">New Tasks <div class="badge"></div></a>
                    </li>
                    <li class="nav-item" onClick={() => { settab("active") }} style={{ cursor: "pointer" }}>
                      <a class={`nav-link rounded ${tab === "active" ? "active" : ""}`} >Active Tasks <div class="badge"></div></a>
                    </li>
                    <li class="nav-item" onClick={() => { settab("done") }} style={{ cursor: "pointer" }}>
                      <a class={`nav-link rounded ${tab === "done" ? "active" : ""}`} id="onhold-tab" >Done Tasks <div class="badge"></div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content border-0 tab-content-basic">
                  <div className="tab-pane fade show active" id="open-tickets" role="tabpanel" aria-labelledby="open-tickets">
                    {tasks.filter((item) => {
                      if (tab === "new") {
                        if (item.status === "New") {
                          return item
                        }
                      }
                      else if (tab === "active") {
                        if (item.status === "Active") {
                          return item
                        }
                      } else {
                        if (item.status === "Done") {
                          return item;
                        }
                      }
                    })
                      .map((item, idx) => {
                        return (
                          <Task task={item} />
                        )
                      })}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}


export default ProjectDetails