import React, { Component } from "react";
// import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {BarChart, CartesianGrid, XAxis, Bar, Tooltip, ResponsiveContainer} from 'recharts'
import ReactSpeedmeter from 'react-d3-speedometer'
import { Card, CardBody, CardHeader, Button,
Col, Row, Collapse, Label, Input, Container} from 'reactstrap';
import graphBack from './media/colors.png'
import axios from 'axios'
import '../Indices/indices.css'

var CustomTootip= ({ active, payload, label}) =>{
  if (active) {
    return(
      <div className="custom-tooltip" style={{backgroundColor: "white"}}>
        <h4 className="label"> Resultado: {`${label}`}</h4>
        {
          payload[0] !== undefined ? 
          <div>
            <p style={{margin:0}}>Explicación: </p> <h5>{payload[0].payload.exp}</h5>  
          </div>
           : <p>Cargue Indices</p>
        }
        {/* <p className="intro"> <b>{payload[0] !== undefined ? "Explicación: " + payload[0].payload.exp: ""}</b></p> */}
      </div>
    )
  }
  return null;
}

export default class indices extends Component{

  constructor(props){
    super(props);
    this.state = {
      collapse: false,
      accordion: [true, true, true, true],
      anios: [],
      año: "",
      estados:[],
      edo:"",
      indiceName:[],
      indiceNameSelected: "",
      statusDisabled: true,
      statusMenu: true,
      indiceData: null,
      indiceDataArray:[]
    }
  }

  componentWillReceiveProps = (props) =>{
    axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicesAdultosAnio')
    .then(res => {
        const anios = res.data;
        this.setState({anios})
    })
}
componentDidMount(){
    axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicesAdultosAnio')
    .then(res => {
        const anios = res.data;
        this.setState({anios})
    })
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

  changeSelection = (e) =>{
    if (e.currentTarget.id === "indiceName") {
      this.setState({indiceNameSelected: e.target.value})
    }
    else{
      if (e.currentTarget.id === "edo") {
        // eslint-disable-next-line default-case
        const estadoParam = e.target.value
        axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicesAdultosMenu/' + this.state.año + "/" + estadoParam)
        .then(res =>{
          const indiceName = res.data;
          this.setState({indiceName: indiceName, statusMenu: false})
        })
      }
      else{
        if (e.currentTarget.id === "año" && e.target.value !== 'Selecciona un año') {
          this.setState({statusDisabled: false, año: e.currentTarget.value})
          axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicesEstados/' + e.currentTarget.value)
          .then(res => {
            const estados = res.data;
            this.setState({estados})
          })
        }
        else{
          this.setState({statusDisabled: true, statusMenu: true})
        }
      }
    }
  }

  visualization = () =>{
    const id = this.state.indiceName[this.state.indiceNameSelected].id
    axios.get("http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indiceInfo/" + id)
    .then(res =>{
      const indiceData = res.data[0]
      indiceData.resultado = parseFloat(indiceData.resultado)
      let arrayData = []
      arrayData.push({result: 0.85, uv: 1000, amt: 2400})
      this.setState({indiceData: indiceData, indiceDataArray: arrayData})
    })
  }

  render(){

    var data = [
      {
        result: this.state.indiceData !== null ? this.state.indiceData.resultado : 0, 
        uv: 4000, pv: 500, exp: this.state.indiceData !== null ? this.state.indiceData.explicacion : "Seleccione un Indice",
      },
    ];

    return(
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="12">
                    <Row>
                    <Col xs="12" sm="2" md="2">
                      <Label>Seleccionar Año</Label>
                      <Input type="select" name="select" id="año" onChange={this.changeSelection}>
                        <option unselectable={"on"}>Selecciona un año</option>
                        {
                          this.state.anios.map((anio, key) =>{
                            return(
                              <option value={anio.año} key={key}>{anio.año}</option>
                            )
                          })
                        }
                      </Input>
                    </Col>
                      <Col md="4">
                        <Label>
                          Seleccionar Ciudad
                        </Label>
                        <Input type="select" name="select" id="edo" disabled={this.state.statusDisabled ? true:null} onChange={this.changeSelection}>
                          <option unselectable={"on"}>Selecciona un Estado</option>
                          {
                            this.state.estados.map((edo) =>{
                              return(
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
                        <Input type="select" name="select" id="indiceName" disabled={this.state.statusMenu ? true:null} onChange={this.changeSelection}>
                          <option unselectable={"on"}>Selecciona un Índice</option>
                          {
                            this.state.indiceName.map((indice, key) =>{
                              return(
                                <option value={key}>{indice.indice}</option>
                              )
                            })
                          }
                        </Input>
                      </Col>
                      <Col md="2">
                        <Button color="primary" style={{marginTop: "1em"}} size="lg" onClick={this.visualization}>
                          Visualizar
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm={6}>
                    <div id="accordion">
                      <Card className="mb-0">
                        <CardHeader id="headingOne">
                          {/* <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne"> */}
                            <h5 className="m-0 p-0">{this.state.indiceData !== null ? this.state.indiceData.indice.toUpperCase() : ""}</h5>
                          {/* </Button> */}
                        </CardHeader>
                      </Card>
                      <Card className="mb-0">
                        <CardHeader id="headingTwo">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                            <h5 className="m-0 p-0">Interpretación del Índice</h5>
                          </Button>
                        </CardHeader>
                        <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                          <CardBody>
                          {this.state.indiceData !== null ? this.state.indiceData.interpretacion : ""}
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
                          {this.state.indiceData !== null ? this.state.indiceData.variables : ""}
                          </CardBody>
                        </Collapse>
                      </Card>
                      <Card className="mb-0">
                        <CardHeader id="headingThree">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                            <h5 className="m-0 p-0">Ecuación del Índice</h5>
                          </Button>
                        </CardHeader>
                        <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                          <CardBody>
                          {this.state.indiceData !== null ? this.state.indiceData.ecuacion : ""}
                          </CardBody>
                        </Collapse>
                      </Card>
                      <Card className="mb-0">
                        <CardHeader id="headingThree">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                            <h5 className="m-0 p-0">Resultado del Índice</h5>
                          </Button>
                        </CardHeader>
                        <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                          <CardBody>
                          {this.state.indiceData !== null ? this.state.indiceData.resultado : ""}
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
                          {this.state.indiceData !== null ? this.state.indiceData.fecha : ""}
                          </CardBody>
                        </Collapse>
                      </Card>
                      <Card className="mb-0">
                        <CardHeader id="headingThree">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                            <h5 className="m-0 p-0">Lugar del Índice</h5>
                          </Button>
                        </CardHeader>
                        <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                          <CardBody>
                          {this.state.indiceData !== null ? this.state.indiceData.estado : ""}
                          </CardBody>
                        </Collapse>
                      </Card>
                    </div>
                  </Col>
                  <Col sm ={6}>
                    <div style={{paddingTop:"2em", paddingBottom:"2em", textAlign:"center"}}>
                      <h4>Gráfica de Resultados del Índice</h4>
                      <Row>
                        <Col sm={12} style={{marginTop: "5em"}}>
                          <ReactSpeedmeter
                            width={700}
                            height={500}
                            value={this.state.indiceData !== null ? this.state.indiceData.resultado : 0}
                            maxValue={1}
                            minValue={0}
                            segments= {10}
                            needleHeightRatio={0.8}
                            customSegmentStops = {[
                              0, 0.1, 0.2, 0.3, 0.4, 0.5 ,0.6, 0.7, 0.8, 0.9, 1
                            ]}

                            currentValueText= {this.state.indiceData !== null ? this.state.indiceData.explicacion.toUpperCase() : "0"}
                            needleColor="#020202"
                            segmentColors={[
                              "#A20606",
                              "#E42929",
                              "#D75717",
                              "#DF753F",
                              "#E3C812",
                              "#D7D017",
                              "#68C05C",
                              "#39B028",
                              "#109D6A",
                              "#276B1A",
                            ]}
                            valueTextFontSize={"30px"}
                            paddingVertical={10}
                            
                          />
                        </Col>
                      </Row>
                      {/* <ResponsiveContainer width='100%' aspect={4.0/1.8} className="containerBar"> 
                        <BarChart data={data} width= {600} height={300} style={{backgroundImage:`url(${graphBack})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                          <CartesianGrid strokeDasharray= "1 1"/>
                          <XAxis dataKey="result"
                          ticks={[0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}
                          domain = {[0,1]}
                          type="number"
                          interval={0}
                          tick={{stroke: 'white', strokeWidth: 0.5}}
                          />
                          <Tooltip content={<CustomTootip />}/>
                          <Bar dataKey="pv" fill="#000000" barSize={20} maxBarSize={50}/>
                        </BarChart>
                      </ResponsiveContainer> */}
                    </div>
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