import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { getDevelopers, getManagers } from "../../redux/actions/user"
import { createTask } from "../../redux/actions/task"
import Select from "react-select"
const AddTask = ({ isOpen,
  toggle,
  projectId,
}) => {
  const dispatch = useDispatch()
  const [name, setname] = useState("")
  const [localkey, setkey] = useState("")
  const [desc, setdesc] = useState("")
  const [managerOptions, setMoptions] = useState([])
  const [devOptions, setDoptions] = useState([])
  const [members, setmembers] = useState([])
  const [administrators, setadministrators] = useState([])
  const handleKey = (e) => { setkey(e.target.value) }
  const handleName = (e) => { setname(e.target.value) }
  const handleDesc = (e) => { setdesc(e.target.value) }
  const handleDevChange = (developer) => {
    let dev = Array.from(developer, dev => dev.value);
    setmembers(dev)
  }

  const handleCreateTask = (e) => {
    e.preventDefault();
    let data = {
      name,
      key: localkey,
      description: desc,
      project: projectId,
      assignedId: members
    }
    dispatch(createTask(data))
  }
  const {
    developers,
    managers
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getDevelopers());
    dispatch(getManagers());
  }, [])


  useEffect(() => {
    if (developers !== undefined && developers !== null && developers.length > 0) {
      let managersOpts = developers.map((developer) => {
        return { value: developer._id, label: `${developer.firstname} ${developer.lastname}` };
      })
      setDoptions(managersOpts)
    }
    if (managers !== undefined && managers !== null && managers.length > 0) {
      let opts = managers.map((manager) => {
        return { value: manager._id, label: `${manager.firstname} ${manager.lastname}` };
      })
      setMoptions(opts)
    }
  }, [developers, managers])

  const {
    isError,
    error } = useSelector((state) => state.task);
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <form>
          {isError &&
            <p style={{ backgroundColor: '#ff6666', color: 'white', borderRadius: '5px', padding: '3px' }}> {error} </p>
          }
          <div className="form-group mb-2">
            <label>Name</label>
            <input type="text" onChange={handleName} className="form-control" placeholder="Enter Name" value={name} />
          </div>
          <div className="form-group mb-2">
            <label>Key</label>
            <input type="number" onChange={handleKey} className="form-control" value={localkey} />
          </div>
          <div className="form-group mb-2">
            <label>Description</label>
            <textarea type="text" onChange={handleDesc} className="form-control" placeholder="Enter Description" value={desc} />
          </div>
          <div className="form-group mb-2">
            <label>Assigned to</label>
            <Select
              isMulti
              name="form-field-name"
              onChange={handleDevChange}
              options={devOptions}
              placeholder={"Assigned Developers"}
            />
          </div>

          <button style={{ backgroundColor: "#033345" }} className="btn btn-az-primary btn-block" onClick={handleCreateTask}>Add Task</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default AddTask