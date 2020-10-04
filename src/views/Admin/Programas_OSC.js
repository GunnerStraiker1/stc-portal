import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row, CardHeader, Alert, Modal, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
// import {Tabs,Tab} from 'react-bootstrap'
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';

export default class Programas_OSC extends Component {

  constructor(props) {
    super(props)
    this.state = {
      programs: [],
      modalVisible: false,
      id: 0,
      key: 0,
      menuPrograms: [],
      menuEdos: [],
      disabled: true,
      programa: null,
      program: "",

      nombrePrograma: "",
      objetivoPrograma: "",
      descripcionPrograma: "",
      coberturaPrograma: "",
      requisitosPrograma: "",
      presupuestoPrograma: "",
      periodoPrograma: "",
      estadoPrograma:"",
      ongPrograma:"",
      fieldsDisabled: true
    }
  }

  componentWillReceiveProps = (props) => {
    axios.get('https://stcserver2.rhippie.com/programasOSC')
      .then(res => {
        const programs = res.data;
        this.setState({ programs })
      })
    axios.get('https://stcserver2.rhippie.com/menuEdosProgramasOSC')
      .then(res => {
        const menuEdos = res.data;
        this.setState({ menuEdos })
      })
  }

  // componentDidUpdate = () =>{
  //     axios.get('https://stcserver2.rhippie.com/programasOSC')
  //     .then(res => {
  //         const programs = res.data;
  //         this.setState({programs})
  //     })
  // }

  componentDidMount() {
    axios.get('https://stcserver2.rhippie.com/programasOSC')
      .then(res => {
        const programs = res.data;
        // console.log(programs)
        this.setState({ programs })
      })
    axios.get('https://stcserver2.rhippie.com/menuEdosProgramasOSC')
      .then(res => {
        const menuEdos = res.data;
        this.setState({ menuEdos })
      })
  }

  onConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      id: this.state.programa.id,
      key: e.currentTarget.value,
      modalVisible: true,

    })
  }

  onDelete = () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
    axios.delete("https://stcserver2.rhippie.com/deleteProgramOsc/" + this.state.id, config)
      .then((response) => {
        this.setState({ modalVisible: false, key: 0, id: 0 })
        console.log(response)
      })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  changeSelection = (e) => {
    // eslint-disable-next-line default-case
    switch (e.currentTarget.id) {
      case 'edo':
        this.setState({
          edo: e.target.value
        })
        axios.get('https://stcserver2.rhippie.com/menuProgramasOSC/' + e.target.value)
          .then(res => {
            const menuPrograms = res.data
            this.setState({ menuPrograms })
          })
          .finally(() => {
            this.setState({ disabled: false })
          })
        break;

      case 'program':
        this.setState({ program: e.target.value })
        break;
    }
  }

  visualizeClick = () => {

    if (this.state.program !== "") {
      this.setState({
        programa: this.state.programs[this.state.program],
        nombrePrograma: this.state.programs[this.state.program].programa,
        objetivoPrograma: this.state.programs[this.state.program].objetivo,
        requisitosPrograma: this.state.programs[this.state.program].requisitos,
        descripcionPrograma: this.state.programs[this.state.program].descripcion,
        coberturaPrograma: this.state.programs[this.state.program].cobertura,
        presupuestoPrograma: this.state.programs[this.state.program].financiador,
        estadoPrograma: this.state.programs[this.state.program].estado,
        ongPrograma: this.state.programs[this.state.program].ong,
        periodoPrograma: this.state.programs[this.state.program].periodo,
      })
    }
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Añadir Programas OSC</h2>
            </CardHeader>
            <CardBody>
              <form id="programOscForm"
                onSubmit={this.props.submitProgram}
              >
                <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                  <input type="file" name="file" onChange={this.props.changeHandler} /> <br />
                </div>
                <Alert color="success" isOpen={this.props.visible} toggle={this.props.onToogle} style={{ marginTop: "1em" }}>
                  Documento cargado con éxito
                            </Alert>
                <div style={{ textAlign: "right", marginRight: "2em" }}>
                  <input type="submit" value="Cargar" name="submit" className="btn btn-outline-primary" id="sendprogram" />
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <h4>Información en Base de Datos</h4>
          <Row>
            <Col md={4}>
              <Label>
                Seleccionar Estado
              </Label>
              <Input type="select" name="select" id="edo" onChange={this.changeSelection}>
                <option unselectable="off">Selecciona el Estado</option>
                {
                  this.state.menuEdos.map((edo, key) => {
                    return (
                      <option value={edo.estado} key={key}>{edo.estado}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md={6}>
              <Label>
                Seleccionar Programa
                </Label>
              <Input type="select" name="select" id="program" onChange={this.changeSelection} disabled={this.state.disabled}>
                <option unselectable>Selecciona el programa</option>
                {
                  this.state.menuPrograms.map((menu, key) => {
                    return (
                      <option key={key} value={key}>{menu.programa}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md={2} style={{position:"relative"}}>
              <Button color="primary" style={{position:"absolute", bottom:0}} onClick={this.visualizeClick}>
                  Visualizar
              </Button>
            </Col>
          </Row>

          {
            this.state.programa ?
              <Container fluid style={{ padding: "2em 1em" }}>
                <Card>
                  <CardBody>
                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Nombre del Programa</Form.Label>
                        <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.nombrePrograma} onChange={(e) => { this.setState({ nombrePrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Objetivo del Programa</Form.Label>
                        <Form.Control as="textarea" rows={5} disabled={this.state.fieldsDisabled} value={this.state.objetivoPrograma} onChange={(e) => { this.setState({ objetivoPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Descripción del Programa</Form.Label>
                        <Form.Control as="textarea" rows={8} disabled={this.state.fieldsDisabled} value={this.state.descripcionPrograma} onChange={(e) => { this.setState({ descripcionPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Requisitos del Programa</Form.Label>
                        <Form.Control as="textarea" rows={8} disabled={this.state.fieldsDisabled} value={this.state.requisitosPrograma} onChange={(e) => { this.setState({ requisitosPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Cobertura del Programa</Form.Label>
                        <Form.Control as="textarea" rows={8} disabled={this.state.fieldsDisabled} value={this.state.coberturaPrograma} onChange={(e) => { this.setState({ coberturaPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={6}>
                        <Form.Label>Financiador del Programa</Form.Label>
                        <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.presupuestoPrograma} onChange={(e) => { this.setState({ presupuestoPrograma: e.target.value }) }} />
                      </Col>

                      <Col sm={6}>
                        <Form.Label>ONG del Programa</Form.Label>
                        <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.ongPrograma} onChange={(e) => { this.setState({ ongPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={6}>
                        <Form.Label>Periodo del Programa</Form.Label>
                        <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.periodoPrograma} onChange={(e) => { this.setState({ periodoPrograma: e.target.value }) }} />
                      </Col>

                      <Col sm={6}>
                        <Form.Label>Estado del Programa</Form.Label>
                        <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.estadoPrograma} onChange={(e) => { this.setState({ estadoPrograma: e.target.value }) }} />
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col sm={12}>
                        {
                          this.state.fieldsDisabled ?
                            <div>
                              <Button color="danger" onClick={this.onConfirmation}>Eliminar</Button>
                              <Button color="primary" size="lg" onClick={() => this.setState({ fieldsDisabled: false })} style={{ float: "right" }}>Editar</Button>
                            </div>

                            :
                            <div>
                              <Button color="danger" onClick={() => { this.setState({ fieldsDisabled: true }) }}>Cancelar</Button>
                              <Button color="success" size="lg" onClick={() => console.log(this.state)} style={{ float: "right" }}>Guardar</Button>
                            </div>

                        }


                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Container>
              :
              <div></div>
          }
        </Col>
        <div>
          <Modal isOpen={this.state.modalVisible} toggle={this.toggleModal}>
            <ModalBody>
              ¿Desea eliminar el programa: "{this.state.programa ? this.state.programa.nombre : ''}"
                        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.onDelete}>Eliminar</Button>
              <Button color="primary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Row>
    )
  }
}

const styles = {
  buttons: {
    fontSize: "1.15em"
  }
}
