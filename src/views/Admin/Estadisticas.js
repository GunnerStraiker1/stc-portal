import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import {
  Button, Card, CardBody, Col, Form,
  Input, Row, CardHeader, Modal, ModalBody, ModalFooter, FormGroup, Label, Alert
} from 'reactstrap';
// import {} from 'react-bootstrap'
import axios from 'axios';

export default class Estadisticas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stats: [],
      modalVisible: false,
      id: 0,
      key: 0,
      success: false,
      url: "",
      file:"",
      error: false,
      errorMessage: "",
      nombre: "",
      fuente: "",
      descripcion: "",
      estado: "",
      visible: false
    }
  }

  // componentWillReceiveProps = (props) =>{
  //     axios.get('https://stcserver2.rhippie.com/estadisticas')
  //     .then(res => {
  //         const stats = res.data;
  //         this.setState({stats})
  //     })
  // }

  // componentDidUpdate = () =>{
  //     axios.get('https://stcserver2.rhippie.com/estadisticas')
  //     .then(res => {
  //         const stats = res.data;
  //         this.setState({stats})
  //     })
  // }

  componentDidMount() {
    axios.get('https://stcserver2.rhippie.com/estadisticas')
      .then(res => {
        const stats = res.data;
        console.log(stats)
        this.setState({ stats })
      })
  }

  onConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      id: e.currentTarget.id,
      file: this.state.stats[e.currentTarget.value].url,
      key: e.currentTarget.value,
      modalVisible: true,

    })
  }

  onDelete = () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': "Bearer " + token,
      }
    }
    axios.post("https://stcserver2.rhippie.com/deleteFileStat", { file: this.state.file }, config)
      .then((response) => {
        if (!response.data.success) {
          console.log("error")
          return false
        }
        axios.delete("https://stcserver2.rhippie.com/deleteStat/" + this.state.id, config)
          .then((finalResponse) => {
            if (!finalResponse.data.success) {
              console.log("error BD")
              return false
            }
            this.setState({
              alertDelete: true
            })
          })
      })
    //     axios.delete("https://stcserver2.rhippie.com/deleteProgram/" + this.state.id)
    //     .then((response) =>{
    //         this.setState({modalVisible: false, key:0,id:0})
    //         console.log(response)
    //     })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  submitFileRepo = () => {
    let file = this.uploadInput.files[0];
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    const token = localStorage.getItem('token')
    let formData = new FormData()
    formData.append('upload', file)
    const config = {
      headers: {
        'Authorization': "Bearer " + token,
        'content-type': 'multipart/form-data'
      }
    }
    axios.post("https://stcserver2.rhippie.com/uploadFileEsta", formData, config)
      .then(response => {
        const data = {
          "nombre": this.state.nombre,
          "descripcion": this.state.descripcion,
          "fuente": this.state.fuente,
          "estado": this.state.estado,
          "url": fileName + "." + fileType
        }
        axios.post('https://stcserver2.rhippie.com/createNewEstadistica',
          data,
          {
            headers: {
              'Authorization': "Bearer " + token
            }
          })
          .then(result => {
            this.setState({
              visible: true,
              nombre: "",
              descripcion: "",
              fuente: "",
              estado: ""
            })
            console.log(result)
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })

      })
      .catch(error => {
        alert(JSON.stringify(error));
      })

    this.setState({ visible: false })
  }

  handleChangeRepoFile = (ev) => {
    this.setState({ success: false, url: "" });
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <Card>
            <CardHeader>
              <h2>Insertar Estadisticas</h2>
            </CardHeader>
            <CardBody>
              <Form>
                <Row form>
                  <Col sm={12}>
                    <FormGroup>
                      <Label for="nombreStat">Nombre de la Estadistica</Label>
                      <Input type="text" id="nombreStat" onChange={(e) => this.setState({ nombre: e.target.value })} value={this.state.nombre} />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="fuenteStat">Fuente de la Estadistica</Label>
                      <Input type="text" id="fuenteStat" onChange={(e) => this.setState({ fuente: e.target.value })} value={this.state.fuente} />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="edoStat">Estado Originario de la Estadistica</Label>
                      <Input type="text" id="edoStat" onChange={(e) => this.setState({ estado: e.target.value })} value={this.state.estado} />
                    </FormGroup>
                  </Col>
                  <Col sm={12}>
                    <FormGroup>
                      <Label for="descrStat">Descripción de la Estadistica</Label>
                      <Input type="textarea" id="descrStat" rows={5} onChange={(e) => this.setState({ descripcion: e.target.value })} value={this.state.descripcion} />
                    </FormGroup>
                  </Col>
                  <Col sm={12}>
                    <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                      <label>Archivo de la Estadistica</label> <br />
                      <input type="file" name="file" onChange={this.handleChangeRepoFile} ref={(ref) => { this.uploadInput = ref; }} /> <br />
                    </div>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.props.onToogle} style={{ marginTop: "1em" }}>
                      Documento cargado con éxito
                                    </Alert>
                  </Col>
                </Row>
                <div style={{ textAlign: "right", marginRight: "2em" }}>
                  <button type="button" value="Upload" name="submit"
                    className="btn btn-outline-primary" id="sendStat" onClick={this.submitFileRepo}>Subir Estadistica</button>
                </div>
              </Form>
              {/* <Form>
                                <Form.Group as={Col}>
                                    <Form.Label>Nombre del Repositorio</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Fuente del Repositorio</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Descripción del Repositorio</Form.Label>
                                    <Form.Control as="textarea" rows="5" />
                                </Form.Group>

                            </Form> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <h4>Información en Base de Datos</h4>
          {
            this.state.stats.map((stat, key) => {
              return (
                <div key={key}>
                  <Card key={key}>
                    <CardHeader>
                      <Row>
                        <Col sm={10}>
                          <h4>{stat.nombre}</h4>
                        </Col>
                        <Col sm={1}>
                          <Button color="primary" style={styles.buttons}>Modificar</Button>
                        </Col>
                        <Col sm={1}>
                          <Button color="danger" style={styles.buttons}
                            onClick={this.onConfirmation} id={stat.id} value={key}>Eliminar</Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col sm={3}>
                          <h5>Fuente</h5>
                          {stat.fuente}
                        </Col>
                        <Col sm={3}>
                          <h5>Estado</h5>
                          {stat.estado}
                        </Col>
                        <Col sm={6}>
                          <h5>Descripcion</h5>
                          {stat.descripcion}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              )
            })
          }
        </Col>
        <div>
          <Modal isOpen={this.state.modalVisible} toggle={this.toggleModal}>
            <ModalBody>
              ¿Desea eliminar el repositorio: "{this.state.stats.length > 0 ? this.state.stats[this.state.key].nombre : ''}"
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
