import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

class Login extends Component {

  backToDash = (e) =>{
    e.preventDefault()
    this.props.history.push('/')
  }

  handleInputChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  login = (e) =>{
    e.preventDefault()
    // const user ={}
    axios.post('https://stcserver2.rhippie.com//login', { username: this.state.username, password: this.state.password})
    .then(res =>{
      console.log(res.data.success)
      if(res.data.success === 1){
        localStorage.setItem('token', res.data.token)
        this.props.setLogged(true)
        this.props.history.push('/admin')
      }
    })
    // this.props.setLogged(true)
    // this.props.history.push('/admin')
  }

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Iniciar Sesión</h1>
                      {/* <p className="text-muted">Sign In to your account</p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Usuario" autoComplete="Usuario" value={this.state.username} onChange={this.handleInputChange} id="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Contraseña" autoComplete="current-password" onChange={this.handleInputChange} id="password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login}>Iniciar Sesión</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={this.backToDash} >Regresar a Dashboard</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
