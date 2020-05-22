import React, { Component } from "react";
// import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Card, CardBody, CardHeader, Button,
Col, Row, Collapse,  Label, Input} from 'reactstrap';

export default class ProgramasOSC extends Component{

  componentDidCatch(){
    axios.get('https://serverstc.rhippie.com/programasOSC')
    .then(res => {
      const programs = res.data;
      this.setState({programs})
      axios.get('https://serverstc.rhippie.com/menuEdosProgramasOSC')
      .then(res =>{
        const menuEdos = res.data;
        this.setState({menuEdos})
      })
    })
  }

  componentDidMount(){
    axios.get('https://serverstc.rhippie.com/programasOSC')
    .then(res => {
      const programs = res.data;
      this.setState({programs})
      axios.get('https://serverstc.rhippie.com/menuEdosProgramasOSC')
      .then(res =>{
        const menuEdos = res.data;
        this.setState({menuEdos})
      })
    })
  }

  constructor(props){
    super(props);
    this.state={
      collapse: false,
      accordion: [true, true, true, true, true, true, true, true],
      programs: [],
      menuPrograms:[],
      menuEdos:[],
      // nombre:'',
      // objetivo:'',
      // descripcion:'',
      // cobertura:'',
      // requisitos:'',
      programa:'',
      // periodo:'',
      edo: '',
      program:'',
      disabled: true
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
      return true
      // tab === index ? !x : false
    });

    this.setState({
      accordion: state,
    });
  }

  changeSelection= (e) =>{
    // eslint-disable-next-line default-case
    switch (e.currentTarget.id) {
      case 'edo':
        this.setState({
          edo: e.target.value
        })
        axios.get('https://serverstc.rhippie.com/menuProgramasOSC/'+ e.target.value)
        .then(res=>{
          const menuPrograms = res.data
          this.setState({menuPrograms, disabled: false})
        })
        break;
    
      case 'program':
        this.setState({program: e.target.value})
        break;
    }
  }

  visualizeClick = () =>{
    // this.setState({
    //   nombre: this.state.programs[this.state.program-1].nombre,
    //   objetivo: this.state.programs[this.state.program-1].objetivo,
    //   descripcion: this.state.programs[this.state.program-1].descripcion,
    //   cobertura: this.state.programs[this.state.program-1].cobertura,
    //   requisitos: this.state.programs[this.state.program-1].requisitos,
    //   programa: this.state.programs[this.state.program-1].programa,
    //   periodo: this.state.programs[this.state.program-1].periodo
    // })
    this.state.programs.map((program, key) =>{
      // console.log(program)
      if (program.estado === this.state.edo && program.programa === this.state.program) {
        console.log(program)
        this.setState({programa: program})
      }
      return true
    })
  }

  render(){
    return(
    <div className="animated fadeIn">
<Row>
  <Col md="12">
    {console.log(this.state)}
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
          <Col md="12">
            <Row>
              <Col md="4">
                <Label>
                  <h5>Seleccionar Estado</h5>
                </Label>
                <Input type="select" name="select" id="edo" onChange={this.changeSelection}>
                  <option unselectable="off">Selecciona el Estado</option>
                  {
                    this.state.menuEdos.map((edo,key)=>{
                      return(
                        <option value={edo.estado} key={key}>{edo.estado}</option>
                      )
                    })
                  }
                </Input>
              </Col>
              <Col md="6">
                <Label>
                  <h5>Seleccionar Programa</h5>
                </Label>
                <Input type="select" name="select" id="program" onChange={this.changeSelection} disabled={this.state.disabled ? true: null}>
                  <option unselectable>Selecciona el programa</option>
                  {
                    this.state.menuPrograms.map((menu, key) =>{
                      return(
                        <option key={key}>{menu.programa}</option>
                      )
                    })
                  }
                  {/* <option value='1'>Programa de Combate a la Desnutrición Infantil en el Estado de Yucatán</option>
                  <option value='2'>Programa de Atención a la Salud Materna y Perinatal. Arranque Parejo en la Vida</option>
                  <option value='3'>Planificación Familiar y Anticoncepción. Salud Reproductiva</option>
                  <option value='4'>Programa de Atención a la Salud de la Adolescencia (PASA)</option>
                  <option value='5'>Programa de Vacunación Universal</option>
                  <option disabled>Promoción de la Salud Escolar</option>
                  <option disabled>Determinantes de la Salud</option>
                  <option disabled>Programa de Actividad Física Preventiva y Terapéutica en Yucatán</option>
                  <option disabled>Atención a la Salud Bucal en Yucatán</option>
                  <option disabled>Programa Estatal para la Prevención y Control del VIH, SIDA e Infecciones de Transmisión Sexual</option>
                  <option disabled>Atención a la Salud de la Infancia</option>
                  <option disabled>Prevención y Tratamiento del Cáncer en la Infancia y la Adolescencia</option>
                  <option disabled>Programa de Prevención y Control del Cólera</option>
                  <option disabled>Resolución Alterna de Conflictos del Acto Médico en Yucatán (Comisión de Arbitraje Médico del Estado de Yucatán)</option> */}
                </Input>
              </Col>
              <Col md="2">
                <Button color="primary" style={{marginTop: "1em"}} size="lg" onClick={this.visualizeClick}>
                  Visualizar
                </Button>
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
              <h5 className="m-0 p-0">{this.state.programa.programa}</h5>
            </CardHeader>
          </Card>
          <Card className="mb-0">
            <CardHeader id="headingTwo">
              <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                <h5 className="m-0 p-0">Objetivo del Programa</h5>
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
              <CardBody>
              {this.state.programa.objetivo}
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
              {this.state.programa.descripcion}
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
              {this.state.programa.cobertura}
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
              {this.state.programa.requisitos}
              </CardBody>
            </Collapse>
          </Card>
          <Row>
            <Col sm={4}>
              <Card className="mb-0">
                <CardHeader id="headingThree">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseSix">
                    <h5 className="m-0 p-0">Financiador</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseSix">
                  <CardBody>
                  {this.state.programa.financiador}
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="mb-0">
                <CardHeader id="headingThree">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseSeven">
                    <h5 className="m-0 p-0">Periodo de implementación</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseSeven">
                  <CardBody>
                  {this.state.programa.periodo}
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
            <Col sm={4}>
            <Card className="mb-0">
                <CardHeader id="headingEight">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(7)} aria-expanded={this.state.accordion[7]} aria-controls="collapseEight">
                    <h5 className="m-0 p-0">ONG</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[7]} data-parent="#accordion" id="collapseEight">
                  <CardBody>
                  {this.state.programa.ong}
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  </Col>
</Row>
</div>
    )
  }

}
