import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { getDevelopers, getManagers } from "../../redux/actions/user"
import { createProject } from "../../redux/actions/project"
import Select from "react-select"
const AddProject = ({ modal, toggle, projectKey }) => {
  const dispatch = useDispatch()
  const [name, setname] = useState("")
  const [localkey, setkey] = useState("")
  const [desc, setdesc] = useState("")
  const [managerOptions, setMoptions] = useState([])
  const [devOptions, setDoptions] = useState([])
  const [members, setmembers] = useState([])
  const [administrators, setadministrators] = useState([])
  const handleName = (e) => { setname(e.target.value) }
  const handleDesc = (e) => { setdesc(e.target.value) }
  const handleDevChange = (developer) => {
    let dev = Array.from(developer, dev => dev.value);
    setmembers(dev)
  }
  const handleManagerChange = (m) => {
    let manager = Array.from(m, manager => manager.value);
    setadministrators(manager)
  }
  const handleCreateProject = (e) => {
    e.preventDefault();
    let data = {
      name,
      key: localkey,
      description: desc,
      administrators,
      members
    }
    console.log(members);
   
    dispatch(createProject(data))
  }
  const {
    developers,
    managers
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (projectKey) {
      setkey(projectKey + 1)
    } else {
      setkey(1)
    }
    dispatch(getDevelopers());
    dispatch(getManagers());
  }, [])

  useEffect(() => {
    if (projectKey) {
      setkey(projectKey + 1)
    }
    dispatch(getDevelopers());
    dispatch(getManagers());
  }, [projectKey])

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
    error } = useSelector((state) => state.project);

  return (
    <Modal isOpen={modal} toggle={toggle}>
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
            <input disabled={true} type="text" className="form-control" value={localkey} />
          </div>
          <div className="form-group mb-2">
            <label>Description</label>
            <textarea type="text" onChange={handleDesc} className="form-control" placeholder="Enter Description" value={desc} />
          </div>
          <div className="form-group mb-2">
            <label>members</label>
            <Select
              isMulti
              name="form-field-name"
              onChange={handleDevChange}
              options={devOptions}
              placeholder={"Assigned Developers"}
            />
          </div>
          <div className="form-group mb-5">
            <label>administrators</label>
            <Select
              isMulti
              name="form-field-name"
              onChange={handleManagerChange}
              options={managerOptions}
              placeholder={"Assigned Managers"}
            />
          </div>
          <button style={{ backgroundColor: "#033345" }} className="btn btn-az-primary btn-block" onClick={handleCreateProject}>Add Project</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default AddProject