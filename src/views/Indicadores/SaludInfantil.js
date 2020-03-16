import React, { Component } from "react";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader,
Col, Row, Fade, Collapse, Badge, Label, Input, Button} from 'reactstrap';

const pie1 = {
  labels:[
    'Si',
    'No',
    'No Contestó',
  ],
  datasets: [{
    data:[180,264,3],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ],
  }]
}

const pie2 = {
  labels:[
    'No Contestó',
    'Prospera',
    '65 y más',
    'Actividades en el centro de desarrollo comunitario',
    'Lazos',
    'Beca por promedio',
    'Bienestar',
    'Casa de Gobierno',
    'Discapacidad',
    'IBECEY',
    'Oportunidades',
    'Pasos Firmes',
    'SEDESOL',
  ],
  datasets: [{
    data:[268,176,1,1,1,0,0,0,0,0,0,0,0],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#42a4e6',
      '#d00e61',
      '#d1167d',
      '#4a3715',
      '#97798c',
      '#de3133',
      '#08a556',
      '#871e5a',
      '#db5e1f',
      '#f13587',
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#42a4e6',
      '#d00e61',
      '#d1167d',
      '#4a3715',
      '#97798c',
      '#de3133',
      '#08a556',
      '#871e5a',
      '#db5e1f',
      '#f13587',
    ],
  }]
}

const pie3 = {
  labels:[
    'Si recibió atención',
    'No recibió atención',
    'No Contestó',
  ],
  datasets: [{
    data:[438,7,2],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ],
  }]
}

export default class SaludInfantil extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            {/* <Row>
              <Col sm="12" md={{size: 2, offset: 10}} style={{textAlign:"right"}}>
                <Button color="success" size="lg" style={{marginBottom: "1em"}}>
                  Subir Excel
                </Button>
              </Col>
            </Row> */}
            <Card>
              <CardHeader>
                <Row>
                <Col xs="12" sm="4" md="4">
                    <Label>Seleccionar Índicador</Label>
                    <Input type="select" name="select" id="indicador">
                      <option>Generales</option>
                      <option>Servicios de Salud</option>
                      <option>Prevención del SIDA</option>
                      <option>Salud Infantil</option>
                      <option>Salud Materna</option>
                      <option>Seguridad Alimentaria</option>
                      <option>Acceso y calidad del agua</option>
                      <option>Desastres Naturales</option>
                      <option>Instalaciones Sanitarias y Desechos</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Municipio</Label>
                    <Input type="select" name="select" id="edo">
                      <option>Mérida, Yucatán</option>
                      <option>Campeche,Campeche</option>
                      <option>Cancun, Quintana Roo</option>
                      <option>José María Morelos, Quintana Roo</option>
                      <option>Puerto Morelos, Quintana Roo</option>
                      <option>Solidaridad, Quintana Roo</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Año</Label>
                    <Input type="select" name="select" id="año">
                      <option>2019</option>
                      <option>2020</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="2" md="2">
                    <Button color="primary" style={{marginTop: "1em"}} size="lg">
                      Visualizar
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6">
                    <Card>
                      <CardHeader><h4>¿Usted ha sido beneficiario de algún programa de Gobierno?</h4></CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Pie data={pie1} height={200} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" md="6">
                    <Card>
                      <CardHeader><h4>¿De qué programa ha sido beneficiario?</h4><br/></CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Pie data={pie2} height={200} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" md="6">
                    <Card>
                      <CardHeader><h4>Su hijo o hija recibió atención médica durante su 1er mes de vida?</h4></CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Pie data={pie3} height={200} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" md="6">
                    <Card>
                      <CardHeader><h4>Su hijo o hija recibió atención médica durante su 1er mes de vida?</h4></CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Pie data={pie3} height={200} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
