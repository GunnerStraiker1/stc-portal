import React, { Component } from "react";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader, Button,
Col, Row, Fade, Collapse, Badge, Label, Input, ButtonToggle} from 'reactstrap';

export default class indices extends Component{

  constructor(props){
    super(props);
    this.state = {
      collapse: false,
      accordion: [true, true, true, true],
    }
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = []
    prevState.map((x, index) => {
      if (tab === index) {
        state.push(!x);
      }
      else{
        state.push(x);
      }
      // tab === index ? !x : false
    });

    this.setState({
      accordion: state,
    });
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Row>
              <Col sm="12" md={{size: 2, offset: 10}} style={{textAlign:"right"}}>
                <ButtonToggle color="success" size="lg" style={{marginBottom: "1em"}}>
                  Subir Excel
                </ButtonToggle>
              </Col>
            </Row>
          <Card>
              <CardHeader>
                <Row>
                  <Col md="12">
                    <Row>
                      <Col md="5">
                        <Label>
                          <h5>Seleccionar Índice</h5>
                        </Label>
                        <Input type="select" name="select" id="indice">
                          <option>Calidad de la atención médica infantil</option>
                          <option>Desarrollo de salud de las niñas y niños</option>
                          <option>Estado nutricional infantil</option>
                          <option>Crecimiento y desarrollo infantil</option>
                          <option>Estado de salud de las niñas y niños</option>
                          <option>Calidad de la atención en la consulta médica</option>
                          <option>Calidad de la atención durante el parto</option>
                          <option>Acceso a semillas</option>
                          <option>Seguridad en situación extrema</option>
                          <option>Producción de alimentos</option>
                          <option>Estrategias de afrontamiento ante la inseguridad alimentaria</option>
                          <option>Enfermedades por calidad del agua</option>
                        </Input>
                      </Col>
                      <Col md="5">
                        <Label>
                          <h5>Seleccionar Estado</h5>
                        </Label>
                        <Input type="select" name="select" id="edo">
                          <option>Mérida, Yucatán</option>
                          <option>Chikindzonot, Yucatán</option>
                          <option>José Maria Morelos, Quintana Roo </option>
                          <option>Campeche, Campeche</option>
                          <option>Metodología de cálculo de los índices</option>
                        </Input>
                      </Col>
                      <Col md="2">
                        <ButtonToggle color="primary" style={{marginTop: "1em"}} size="lg">
                          Visualizar
                        </ButtonToggle>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* <div className="card-header-actions">
                </div> */}
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      {/* <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne"> */}
                        <h5 className="m-0 p-0">Índice de calidad de la atención médica infantil</h5>
                      {/* </Button> */}
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                      Índice de calidad de la atención médica infantil
                      </CardBody>
                    </Collapse> */}
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Objetivo del Índice</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                      Identificar la calidad de la atención médica recibida, así como el tipo de
                      atención recibida.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Variables del Índice</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      Maltrato en la consulta, mejora con el tratamiento recibido,
                      explicación sobre el tratamiento, explicación sobre el estado
                      de salud.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                        <h5 className="m-0 p-0">Fecha del Índice</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                      Marzo 2019
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
