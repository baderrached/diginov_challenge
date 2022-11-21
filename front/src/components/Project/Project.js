import React, { Fragment, useEffect, useState } from 'react'
import { Col } from "reactstrap"
import History from '../History/History';
import { Collapse } from 'reactstrap';

const Project = ({ project, checkProjectStatus, getPourcentage }) => {

  const [collapseOpen, setcollapseOpen] = useState(false)
  const toggleCollapse = () => {
    setcollapseOpen(!collapseOpen)
  }
  return (
    <Fragment>
      <div className="project-grid">
      <div style={{ background: checkProjectStatus(project), border: "none" }} className="badge badge-success ms-auto" onClick={toggleCollapse} >History</div>
      <Col style={{ cursor: "pointer" }} lg={4} md={4} sm={6} onClick={() => {
        window.location.href = '/project/' + project._id
      }} >

        <div className="project-grid-inner">
          <div className="d-flex align-items-start">
            <div className="wrapper">
              <h5 className="project-title">{project.name}</h5>
            </div>
            <div style={{ background: checkProjectStatus(project), border: "none" }} className="badge badge-success ms-auto">STATUS</div>
            { project.closedAt &&
            <div style={{ background: "red", border: "none" }} className="badge badge-danger ms-auto">CLOSED</div>
                 
                   }
          </div>
          <p className="project-description">{project.description}</p>
          <div className="d-flex justify-content-between">
            <p className="mb-2 font-weight-medium">Progress</p>
            <p className="mb-2 font-weight-medium">{getPourcentage(project)}%</p>
          </div>
          <div className="progress progress-md mb-3">
            <div className="progress-bar bg-success" role="progressbar" style={{ width: getPourcentage(project) }}></div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="action-tags d-flex flex-row">
              <div className="wrapper pe-4"><i className="mdi mdi-view-sequential me-2"></i>{project.completedTasks}</div>
              <div className="wrapper"><i className="mdi mdi-message-outline me-2"></i>{project.countTasks}</div>
            </div>
            <div className="image-grouped">
              {project.membres !== undefined && project.membres !== null && project.membres.length > 0 ? (
                project.membres.map((item, idx) => (
                  <img className="assignee-avatar" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
                ))) : (
                <></>
              )}
              {project.administrators !== undefined && project.administrators !== null && project.administrators.length > 0 ? (
                project.administrators.map((item, idx) => (
                  <img className="assignee-avatar" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
                ))) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Collapse isOpen={collapseOpen} className="mb-5">
          <History histories={project.history} />
        </Collapse>
      </Col>
      </div>
    </Fragment>

  )
}

export default Project