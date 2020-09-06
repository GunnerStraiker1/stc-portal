import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, CardHeader, Alert } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap'
import { post } from 'axios';
import Programas from './Programas'
import Repositorios from './Repositorios'
import Indicadores from './Indicadores'
import IndicadoresInfantiles from './IndicadoresInfantiles';
import ProgramasOSC from './Programas_OSC';
import Estadisticas from './Estadisticas'
import Indices from './indices';
import IndicesInfantiles from './indicesInfantiles';

class AdminHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: '',
      visible: false,
    }
  }

  onToogle = () => {
    this.setState({ visible: false })
  }

  submitProgram = (e) => {
    e.preventDefault();
    const typeForm = e.currentTarget.id
    this.fileUpload(this.state.file, typeForm)
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          this.setState({ file: '', visible: true })
        }
      })
  }

  fileUpload = (file, type) => {
    var url = ''
    switch (type) {
      case 'programForm':
        url = 'https://stcserver2.rhippie.com/uploadPrograma';
        break;
      case 'indicadorForm':
        url = 'https://stcserver2.rhippie.com/uploadIndicador';
        break;
      case 'infantilIndicadorForm':
        url = 'https://stcserver2.rhippie.com/uploadIndicadorInfantil';
        break;
      case 'programOscForm':
        url = 'https://stcserver2.rhippie.com/uploadProgramaOSC';
        break;

      case 'indicesForm':
        url = 'https://stcserver2.rhippie.com/uploadIndice';
        break;

      case 'indicesInfantilesForm':
        url = 'https://stcserver2.rhippie.com/uploadIndiceInfantil';
        break;
      default:
        break;
    }
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  changeHandler = (e) => {
    this.setState({ file: e.target.files[0] })
  }

  render() {

    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col md="12">
              <Card style={{ marginTop: "2em" }}>
                <CardHeader>
                  <h2>Panel de Administración</h2>
                </CardHeader>
                <CardBody>
                  <Tabs defaultActiveKey="programas" id="uncontrolled-tab-example">
                    <Tab eventKey="programas" title="Programas">
                      <Programas submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="osc" title="Programas OSC">
                      <ProgramasOSC submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="indicadores" title="Indicadores Adultos">
                      <Indicadores submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="infantil" title="Indicadores Infantiles">
                      <IndicadoresInfantiles submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="indices" title="Indices Adultos">
                      <Indices submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="indicesInfantil" title="Indices Infantiles">
                      <IndicesInfantiles submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    {/* <Col sm="12">

                                            <Card>
                                                <CardHeader>
                                                    <h2>Añadir Indicadores Infantiles</h2>
                                                </CardHeader>
                                                <CardBody>
                                                <form id="infantilIndicadorForm"
                                                    onSubmit={this.submitProgram}
                                                >
                                                    <div style={{marginTop:"1em", marginLeft:"1em"}}>
                                                        <input type="file" name="file" onChange={this.changeHandler}/> <br/>
                                                    </div>
                                                    <Alert color="success" isOpen={this.state.visible} toggle={this.onToogle} style={{marginTop:"1em"}}>
                                                        Documento cargado con éxito
                                                    </Alert>
                                                    <div style={{textAlign:"right", marginRight:"2em"}}>
                                                        <input type="submit" value="Upload" name="submit" className="btn btn-outline-primary"/>
                                                    </div>
                                                </form>
                                                </CardBody>
                                            </Card>
                                        </Col> */}

                    <Tab eventKey="estadisticas" title="Estadisticas" >
                      <Estadisticas submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                    <Tab eventKey="repos" title="Repositorios">
                      <Repositorios submitProgram={this.submitProgram} visible={this.state.visible}
                        changeHandler={this.changeHandler} onToogle={this.onToogle} />
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// Styles.Sty

export default AdminHome
