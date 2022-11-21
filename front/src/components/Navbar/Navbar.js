import React, { useState } from 'react'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="az-header" style={{ marginBottom: "30px" }}>
      <div className="container">
        <div className="az-header-left">
          <a href='/'>
            <img style={{ width: "60%" }} src={"https://diginov.tech/logo.png"} className="az-logo" /><span></span>
          </a>
        </div>
        <div className="az-header-right">

          <Dropdown
            nav
            isOpen={dropdownOpen}
            toggle={toggleDropdown}
            style={{ listStyle: "none" }}
          >
            <DropdownToggle
              nav={true}
              className="remove-arrow p-0"
              tag="a"
            >
              <div className="dropdown az-profile-menu">
                <div style={{ cursor: "pointerf" }} className="az-img-user"><img src="https://via.placeholder.com/500" alt="" /></div>
              </div>
            </DropdownToggle>
            <DropdownMenu
              left
            >
              <DropdownItem
                className="dd-navbar-item"
                onClick={() => {
                  localStorage.clear()
                  navigate("/signin")
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Navbar