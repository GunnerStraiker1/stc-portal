import React, { Component } from 'react'
import { Row, Col, Card, Alert, Container, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { Label, Input, Modal, ModalBody, ModalFooter  } from 'reactstrap'


export default class Indices extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indices: [],
      anios: [],
      estados: [],
      indiceName: [],
      indiceNameSelected: "",
      statusDisabled: true,
      statusMenu: true,
      indiceData: null,
      año: "",
      edo: "",
      fieldsDisabled: true,
      modalVisible:false,

      idIndice: "",
      nombreIndice: "",
      resultadoIndice: "",
      explicacionIndice: "",
      lugarIndice: "",
      fechaIndice: "",
      ecuacionIndice: "",
      interpretacionIndice: "",
      variablesIndice: "",
    }
  }

  componentWillReceiveProps = (props) => {
    //https://stcserver2.rhippie.com
    axios.get('http://localhost:8080/indicesAdultosAnio')
      .then(res => {
        const anios = res.data;
        console.log(anios)
        this.setState({ anios })
      })
    axios.get('http://localhost:8080/indicesAdultos')
      .then(res => {
        const indices = res.data;
        console.log(indices)
        this.setState({ indices })
      })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/indicesAdultos')
      .then(res => {
        const indices = res.data;
        console.log(indices)
        this.setState({ indices })
      })
    axios.get('http://localhost:8080/indicesAdultosAnio')
      .then(res => {
        const anios = res.data;
        console.log(anios)
        this.setState({ anios })
      })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  onConfirmation = (e) => {
    console.log("JAJAJ")
    e.preventDefault();
    this.setState({
      modalVisible: true
    })
  }

  changeSelection = (e) => {
    if (e.currentTarget.id === "indiceName") {
      this.setState({ indiceNameSelected: e.target.value })
    }
    else {
      if (e.currentTarget.id === "edo") {
        // eslint-disable-next-line default-case
        const estadoParam = e.target.value
        axios.get('http://localhost:8080/indicesAdultosMenu/' + this.state.año + "/" + estadoParam)
          .then(res => {
            const indiceName = res.data;
            this.setState({ indiceName: indiceName, statusMenu: false })
          })
      }
      else {
        if (e.currentTarget.id === "año" && e.target.value !== 'Selecciona un año') {
          this.setState({ año: e.currentTarget.value })
          axios.get('http://localhost:8080/indicesEstados/' + e.currentTarget.value)
            .then(res => {
              const estados = res.data;
              this.setState({ estados })
            })
            .finally(() => {
              this.setState({ statusDisabled: false })
            })
        }
        else {
          this.setState({ statusDisabled: true, statusMenu: true })
        }
      }
    }
  }

  visualization = () => {
    const id = this.state.indiceName[this.state.indiceNameSelected].id
    axios.get("http://localhost:8080/indiceInfo/" + id)
      .then(res => {
        const indiceData = res.data[0]
        indiceData.resultado = parseFloat(indiceData.resultado)
        this.setState({
          indiceData: indiceData,
          idInfice: indiceData.id,
          nombreIndice: indiceData.indice,
          resultadoIndice: indiceData.resultado,
          explicacionIndice: indiceData.explicacion,
          lugarIndice: indiceData.estado,
          fechaIndice: indiceData.fecha,
          ecuacionIndice: indiceData.ecuacion,
          interpretacionIndice: indiceData.interpretacion,
          variablesIndice: indiceData.variables,
        })
      })
    // .finally(() => {
    //   this.setState:
    // })
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header>
              <h2>Añadir Índices de Adultos</h2>
            </Card.Header>
            <Card.Body>
              <form id="indicesForm"
                onSubmit={this.props.submitProgram}>
                <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                  <input type="file" name="file" onChange={this.props.changeHandler} /> <br />
                </div>
                <Alert variant="success" show={this.props.visible} onClose={this.props.onToogle} style={{ marginTop: "1em" }}>
                  Documento cargado con éxito
                </Alert>
                <div style={{ textAlign: "right", marginRight: "2em" }}>
                  <input type="submit" value="Cargar" name="submit" className="btn btn-outline-primary" id="sendprogram" />
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12}>
          <h4>Información en Base de Datos</h4>
          <Row>
            <Col xs={12} md={3}>
              <Label>Seleccionar Año</Label>
              <Input type="select" name="select" id="año" onChange={this.changeSelection}>
                <option unselectable>Selecciona un año</option>
                {
                  this.state.anios.map((anio) => {
                    return (
                      <option value={anio.año} >{anio.año}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md="4">
              <Label>
                Seleccionar Ciudad
                        </Label>
              <Input type="select" name="select" id="edo" disabled={this.state.statusDisabled ? true : null} onChange={this.changeSelection}>
                <option unselectable={"on"}>Selecciona un Estado</option>
                {
                  this.state.estados.map((edo) => {
                    return (
                      <option value={edo.estado}>{edo.estado}</option>
                    )
                  })
                }

              </Input>
            </Col>
            <Col md="4">
              <Label>
                Seleccionar Indice
                        </Label>
              <Input type="select" name="select" id="indiceName" disabled={this.state.statusMenu ? true : null} onChange={this.changeSelection}>
                <option unselectable={"on"}>Selecciona un Índice</option>
                {
                  this.state.indiceName.map((indice, key) => {
                    return (
                      <option value={key}>{indice.indice}</option>
                    )
                  })
                }
              </Input>
            </Col>
            <Col md="1" style={{ position: "relative" }}>
              <Button color="primary" style={{ position: "absolute", bottom: 0 }} onClick={this.visualization}>
                Visualizar
                        </Button>
            </Col>
          </Row>
        </Col>

        {
          this.state.indiceData ?
            <Container fluid style={{ padding: "2em 1em" }}>
              <Card>
                <Card.Body>
                  <Form.Group as={Row}>
                    <Col sm={12}>
                      <Form.Label>Nombre del Índice</Form.Label>
                      <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.nombreIndice} onChange={(e) => { this.setState({ nombreIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col md={6}>
                      <Form.Label>Resultado del Índice</Form.Label>
                      <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.resultadoIndice} onChange={(e) => { this.setState({ resultadoIndice: e.target.value }) }} />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Explicación del Índice</Form.Label>
                      <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.explicacionIndice} onChange={(e) => { this.setState({ explicacionIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col md={6}>
                      <Form.Label>Lugar del Índice</Form.Label>
                      <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.lugarIndice} onChange={(e) => { this.setState({ lugarIndice: e.target.value }) }} />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Fecha del Índice</Form.Label>
                      <Form.Control type="text" disabled={this.state.fieldsDisabled} value={this.state.fechaIndice} onChange={(e) => { this.setState({ fechaIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}> {/** TextArea */}
                    <Col sm={12}>
                      <Form.Label>Ecuación del Índice</Form.Label>
                      <Form.Control as="textarea" rows={5} disabled={this.state.fieldsDisabled} value={this.state.ecuacionIndice} onChange={(e) => { this.setState({ ecuacionIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}> {/** TextArea */}
                    <Col sm={12}>
                      <Form.Label>Interpretación del Índice</Form.Label>
                      <Form.Control as="textarea" rows={10} disabled={this.state.fieldsDisabled} value={this.state.interpretacionIndice} onChange={(e) => { this.setState({ interpretacionIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}> {/** TextArea */}
                    <Col sm={12}>
                      <Form.Label>Variables del Índice</Form.Label>
                      <Form.Control as="textarea" rows={10} disabled={this.state.fieldsDisabled} value={this.state.variablesIndice} onChange={(e) => { this.setState({ variablesIndice: e.target.value }) }} />
                    </Col>
                  </Form.Group>

                  <Row>
                    <Col sm={12}>
                      {
                        this.state.fieldsDisabled ?
                          <div>
                            <Button variant="danger" onClick={this.onConfirmation}>Eliminar</Button>
                            <Button size="lg" onClick={() => this.setState({ fieldsDisabled: false })} style={{ float: "right" }}>Editar</Button>
                          </div>

                          :
                          <div>
                            <Button variant="danger" onClick={() => { this.setState({ fieldsDisabled: true }) }}>Cancelar</Button>
                            <Button variant="success" size="lg" onClick={() => console.log(this.state)} style={{ float: "right" }}>Guardar</Button>
                          </div>

                      }


                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Container>
            :
            <div></div>
        }

        <div>
          <Modal isOpen={this.state.modalVisible} toggle={this.toggleModal}>
            <ModalBody>
              ¿Desea eliminar el índice: "{this.state.nombreIndice ? this.state.nombreIndice : ''}"
                        </ModalBody>
            <ModalFooter>
              <Button variant="danger" onClick={this.onDelete}>Eliminar</Button>
              <Button variant="primary" onClick={this.toggleModal}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Row>
    )
  }
}
