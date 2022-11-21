import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskStatus } from "../../redux/actions/task"
import History from '../History/History';
import { Collapse } from 'reactstrap';
import moment from 'moment'

const Task = ({ task }) => {
  const dispatch = useDispatch()
  const [collapseOpen, setcollapseOpen] = useState(false)
  const toggleCollapse = () => {
    setcollapseOpen(!collapseOpen)
  }
  const handleDoneStatus = () => {
    
    let data = {
      status: "Done"
    }
    dispatch(changeTaskStatus(task._id,data));

  }
  const handleActiveStatus = () => {
    
    let data = {
      status: "Active"
    }
    dispatch(changeTaskStatus(task._id,data));
  
  }
  
  return (
    <Fragment>
    <a onClick={toggleCollapse} className="tickets-card row">
      <div className="tickets-details col-lg-8 col-12">
        <div className="wrapper">
          <h5>#{task.key} - {task.name}</h5>
          <div className="badge badge-success">{task.status}</div>
        </div>
        <div className="wrapper text-muted d-none d-md-block">
          {task.assigned !== undefined && task.assigned !== null && task.assigned.length > 0 ? (
            task.assigned.map((item, idx) => (
              <>
                <span>Assigned to : </span>
                <img className="assignee-avatar" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
                <span>{item.firstname}</span><br></br>
              </>
            ))) : (
            <></>
          )}
          <span>Description: </span><span>{task.description}</span><br></br>
          <span><i className="typcn icon typcn-time"></i>{moment(task.createdAt).format("DD/MM/YYYY hh:mm")}</span>
        </div>
      </div>
      <div className="ticket-float col-lg-2 col-sm-6 d-none d-md-block">
        <img className="img-xs rounded-circle" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
        <span className="text-muted">{task.creator[0].firstname}</span>
      </div>
      <div className="ticket-float col-lg-2 col-sm-6 d-none d-md-block">
        <i className="category-icon typcn icon typcn-folder"></i>
        {task.status === "New" ? 
        <button style={{ color: 'black', borderRadius: '15px',backgroundColor:'yellow' }}  className="btn btn-success no-wrap ms-4" onClick={handleActiveStatus}>Active</button>
        : task.status === "Active" ?
        <button style={{ color: 'white', borderRadius: '15px',backgroundColor:'green' }}  className="btn btn-success no-wrap ms-4" onClick={handleDoneStatus}>Done</button>
        :
        <button style={{display: "none"}}></button>
        }
        </div>
    </a>
          <Collapse isOpen={collapseOpen} className="mb-5">
            <History histories={task.history} />
        </Collapse>
      </Fragment>
  )
}

export default Task