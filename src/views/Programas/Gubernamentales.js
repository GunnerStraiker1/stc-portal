import React, { Component } from "react";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader, Button,
Col, Row, Fade, Collapse, Badge, Label, Input, ButtonToggle} from 'reactstrap';

export default class Gubernamentales extends Component{
  constructor(props){
    super(props);
    this.state={
      collapse: false,
      accordion: [true, true, true, true, true, true, true],
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
    {/* <Row>
      <Col sm="12" md={{size: 2, offset: 10}} style={{textAlign:"right"}}>
        <ButtonToggle color="success" size="lg" style={{marginBottom: "1em"}}>
          Subir Excel
        </ButtonToggle>
      </Col>
    </Row> */}
  <Card>
      <CardHeader>
        <Row>
          <Col md="12">
            <Row>
              <Col md="4">
                <Label>
                  <h5>Seleccionar Estado</h5>
                </Label>
                <Input type="select" name="select" id="program">
                  <option>Yucatán</option>
                  <option>Campeche</option>
                  <option>Quintana Roo</option>
                </Input>
              </Col>
              <Col md="6">
                <Label>
                  <h5>Seleccionar Programa</h5>
                </Label>
                <Input type="select" name="select" id="program">
                  <option>Programa de Combate a la Desnutrición Infantil en el Estado de Yucatán</option>
                  <option>Programa de Atención a la Salud Materna y Perinatal. Arranque Parejo en la Vida</option>
                  <option>Planificación Familiar y Anticoncepción. Salud Reproductiva</option>
                  <option>Programa de Atención a la Salud de la Adolescencia (PASA)</option>
                  <option>Programa de Vacunación Universal</option>
                  <option>Promoción de la Salud Escolar</option>
                  <option>Determinantes de la Salud</option>
                  <option>Programa de Actividad Física Preventiva y Terapéutica en Yucatán</option>
                  <option>Atención a la Salud Bucal en Yucatán</option>
                  <option>Programa Estatal para la Prevención y Control del VIH, SIDA e Infecciones de Transmisión Sexual</option>
                  <option>Atención a la Salud de la Infancia</option>
                  <option>Prevención y Tratamiento del Cáncer en la Infancia y la Adolescencia</option>
                  <option>Programa de Prevención y Control del Cólera</option>
                  <option>Resolución Alterna de Conflictos del Acto Médico en Yucatán (Comisión de Arbitraje Médico del Estado de Yucatán)</option>
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
                <h5 className="m-0 p-0">Programa de Combate a la Desnutrición Infantil en el Estado de Yucatán</h5>
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
                <h5 className="m-0 p-0">Objetivo del Programa</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
              <CardBody>
              Disminuir la prevalencia de desnutrición en los menores de 5 años, mediante consultas
              de vigilancia nutricional y acciones de capacitación que promueven la lactancia
              materna exclusiva y alimentación complementaria, sesiones, talleres y eventos
              educativos.
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingThree">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                <h5 className="m-0 p-0">Descripción del Programa</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
              <CardBody>
              Promoción de los beneficios de la lactancia materna exclusiva y relevancia de la
              alimentación complementaria correcta como elemento preventivo contra la desnutrición,
              en los menores de 5 años de edad. Se otorgaron consultas de vigilancia nutricional y
              pláticas de orientación alimentaria dirigidas a los responsables del cuidado del niño.
              Asimismo, como refuerzo a la educación para la salud se impartieron sesiones
              educativas, talleres y espacios de consejería co¬munitaria a mujeres embarazadas o en
              periodo de lactancia, así como a mujeres y hombres en edad fértil.
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingThree">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                <h5 className="m-0 p-0">Cobertura del Programa</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour">
              <CardBody>
              125 localidades rurales de alta y muy alta marginación de 63 municipios: Bokobá,
              Buctzotz, Cantamayec, Cenotillo, Celestún, Chacsinkín, Chankom, Chapab, Chemax,
              Chichimilá, Chikindzonot, Chumayel, Conkal, Cuncunul, Dzan, Dzitás, Dzoncahuich,
              Espita, Halachó, Hocabá, Hunucmá, Izamal, Kanunil, Maní, Maxcanú, Mayapán, Mérida,
              Moco¬chá, Motul, Muxupip, Opichén, Oxukutzcab, Panabá, Peto, Progreso, Río Lagartos,
              Samahil, Sanahacat, San Felipe, Santa Elena, Sinanché, Sotuta, Sucilá, Sudzal,
              Tahdziú, Teabo, Tecoh, Tekax, Tekom, Temozón, Teya, Ticul, Tinum, Tixcacalcupul,
              Tizimín, Tunkás, Tzucacab, Uayma, Ucú, Va¬lladolid, Yaxcaba, Yaxkukul y Yobaín.
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingThree">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFive">
                <h5 className="m-0 p-0">Requisitos del Programa</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFive">
              <CardBody>
              <ul>
                <li>Ser niña o niño menor de 5 años de edad </li>
                <li>Ser habitante de algunas de las 125 localidades rura¬les de los 63 municipios de cobertura del Programa </li>
                <li>Cartilla de vacunación </li>
                <li>Número de Póliza de Seguro Popular </li>
                <li>Estar embarazada o en periodo de lactancia para las pláticas de prevención </li>
              </ul>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingThree">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseSix">
                <h5 className="m-0 p-0">Programa Presupuestario</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseSix">
              <CardBody>
              53 Salud Infantil
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingThree">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseSeven">
                <h5 className="m-0 p-0">Periodo de implementación</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseSeven">
              <CardBody>
              2012-2018
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
