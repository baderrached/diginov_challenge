import React, { Fragment } from 'react'
import { Card,CardBody } from "reactstrap"
import moment from "moment"
const History = (histories) => {
  return (
    <Card>
    { histories.histories !== undefined && histories.histories !== null && histories.histories.length > 0 && histories.histories.map((hist,item) => {
        return (
     <div className='tickets-card row' style={{ border: 'none', marginBottom: '5px' }}>
     <div className="tickets-details col-lg-8 col-12">
      <div className="wrapper">
        <h5 style={{fontSize: '13px'}}>#{hist.key} - {hist.description}</h5>
      </div>
      <div className="wrapper text-muted d-none d-md-block">
        <span>Description: </span><span>{hist.description}</span><br></br>
        <span><i className="typcn icon typcn-time"></i>{moment(hist.createdAt).format("DD/MM/YYYY hh:mm")}</span>
      </div>
    </div>
    <div className="ticket-float col-lg-2 col-sm-6 d-none d-md-block">
      <img className="img-xs rounded-circle" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
      <span className="text-muted">{hist.user.firstname}</span>
    </div>
    </div>
    )})}
  </Card>
  )
}

export default History