import React from 'react'
import {Navbar, Button} from 'react-bootstrap'
import Logo from '../../assets/img/logo.png'
import { Redirect, useHistory } from 'react-router-dom'

const NavbarAdmin = () =>{

  const history = useHistory()

  const logout = () =>{
    localStorage.clear()
    history.push("/login")
  }

  return(
    <Navbar className="bg-light justify-content-between">
      <Navbar.Brand>
        <img src="https://stc.rhippie.com/assets/img/logo.png" width="100" />
      </Navbar.Brand>

      <Button variant="danger" onClick={logout} >Cerrar Sesión</Button>
    </Navbar>
  )
}

export default NavbarAdmin
