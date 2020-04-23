import React, { Component } from "react";
// import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader,
Col, Row, Fade, Collapse, Badge, Label, Input, Button} from 'reactstrap';
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text} from "recharts";
// import 'chartjs-plugin-labels'

//chartjs-plugin-labels

class CustomizedAxisTick extends Component{
  render () {
    const {x, y, payload} = this.props;
		
   	return <Text x={x} y={y} width={100} textAnchor="middle" verticalAnchor="start">{payload.value}</Text>
  }
};

export default class Indicadores extends Component {

  constructor(props){
    super(props);
    this.state={
      indicadores:[],
      indicadoresMenu:[],
      pies:[],
      preguntas: {preguntas:[], data:[]},
      año:"",
      indicador:"",
      auxindicador:"",
      estado: "",
      statusDisabled: true,
      selected2020: false
    }
  };

  componentDidMount(){
    axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicadores')
    .then(res => {
      const indicadores = res.data;
      this.setState({indicadores})
    })
  }

  changeSelection = (e) =>{
    if (e.currentTarget.id === "indicador") {
      this.setState({indicador: e.target.value})
    }
    else{
      if (e.currentTarget.id === "edo") {
        switch(e.target.value){
          case "yuc":
            this.setState({estado: "Yucatan"});
          break;
          case "chik":
            this.setState({estado: "Chikindzonot"});
          break;
          case "camp":
            this.setState({estado: "Campeche"});
          break;
          case "qroo":
            this.setState({estado: "Quintana Roo"});
          break;
        }
      }
      else{
        if (e.currentTarget.id === "año" && e.target.value !== 'Selecciona un año') {
          this.setState({statusDisabled: false, año: e.currentTarget.value})
          axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/menuIndicadores/' + e.currentTarget.value)
          .then(res => {
            const indicadoresMenu = res.data;
            this.setState({indicadoresMenu})
          })
        }
        else{
          this.setState({statusDisabled: true})
        }
      }
    }
  }


  visualizeGraphs = () =>{
    //  || (indicadorData.indicador.toUpperCase() === this.state.auxindicador.toUpperCase())
    var indicadoresFiltered = [];
    this.state.indicadores.map((indicadorData) =>{
      if (indicadorData.indicador.toUpperCase() === this.state.indicador.toUpperCase()
      && indicadorData.año === this.state.año
      && indicadorData.estado.toUpperCase() === this.state.estado.toUpperCase()) {
       indicadoresFiltered.push(indicadorData)
      }
    })

    console.log(indicadoresFiltered)
    this.createPies(indicadoresFiltered);
  }

  createPies = (indicadores) =>{
    var respuestas = [];
    var preguntas = []
    this.setState({preguntas: []})
    indicadores.map((indi) =>{
      var pregunta = indi.pregunta;
      var dataPregunta = [];

      indi.respuestas.split("#$%&").map((res, key) =>{
        if (key !== indi.respuestas.split("#$%&").length-1) {
          var voto = indi.votos.split("#$%&");
          dataPregunta.push({name: res.toUpperCase(), votos: parseInt(voto[key]) })
        }
        return true;
      })
      preguntas.push(pregunta.toUpperCase())
      respuestas.push(dataPregunta)
      return true
    })
    var copyPreg = {preguntas: preguntas, data: respuestas}
    //Ordenar por sort xdxd
    this.setState({preguntas: copyPreg})
  }

  
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card style={{backgroundColor:'transparent'}}>
             
              <CardHeader>
                <Row>
                <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Año</Label>
                    <Input type="select" name="select" id="año" onChange={this.changeSelection}>
                      <option unselectable>Selecciona un año</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                    </Input>
                  </Col>
                <Col xs="12" sm="4" md="4">
                    <Label>Seleccionar Índicador</Label>
                    <Input type="select" name="select" id="indicador" onChange={this.changeSelection} disabled={this.state.statusDisabled ? true:null}>
                      <option unselectable>Selecciona un indicador</option>
                      {
                        this.state.indicadoresMenu.map((indicadorOption, key) =>{
                          return(
                            <option value={indicadorOption.indicador}>{indicadorOption.indicador.toUpperCase()}</option>
                          )
                        })
                      }
                      {/* <option value="gral">General</option>
                      <option value="grales">Generales</option>
                      <option value="salud">Servicios de Salud</option>
                      <option value="sida">Prevención del SIDA</option>
                      <option value="infantil">Salud Infantil</option>
                      <option value="materna">Salud Materna</option>
                      <option value="seguridad">Seguridad Alimentaria</option>
                      <option value="agua">Acceso y calidad del agua</option>
                      <option value="desastres">Desastres Naturales</option>
                      <option value="desechos">Instalaciones Sanitarias y Desechos</option> */}
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Estado</Label>
                    <Input type="select" name="select" id="edo" onChange={this.changeSelection} disabled={this.state.statusDisabled ? true:null}>
                      <option unselectable>Selecciona un estado</option>
                      <option value="yuc">Merida, Kanasin, Yucatán</option>
                      <option value="chik">Chikindzonot, Yucatán</option>
                      <option value="qroo">Puerto Morelos, Solidaridad, José Maria Morelos, Quintana Roo</option>
                      <option value="camp" disabled={this.state.año === '2020' ? true: null}>Campeche,Campeche</option>
                    </Input>
                  </Col>
                  
                  <Col xs="12" sm="2" md="2">
                    <Button color="primary" style={{marginTop: "1em"}} size="lg"
                    onClick={this.visualizeGraphs}>
                      Visualizar
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              {console.log(this.state)}
              {/* <CardBody> */}
                <Row>
                  {
                    this.state.preguntas.preguntas.map((pregunta, key) =>{
                      return(
                        <Col xs="12" md="12" key={key}>
                          <Card style={{marginTop:"3em"}}>
                            <CardHeader><h4>{key +1 + ".- " + pregunta}</h4></CardHeader>
                            <CardBody>
                              <ResponsiveContainer width='100%' aspect={4.0/1.8}>
                                <BarChart data={this.state.preguntas.data[key]} >
                                  {console.log(this.state.preguntas.data[key])}
                                  <CartesianGrid strokeDasharray="2 2" />
                                  <XAxis tick={<CustomizedAxisTick/>} dataKey="name" height={180} interval={0} label={{value: 'Respuestas'}}/>
                                  <YAxis label={{value: '# de votos', angle: -90, position: 'insideLeft'}}/>
                                  <Tooltip cursor={{fill:'transparent'}}/>
                                  <Legend height={50} verticalAlign="top"/>
                                  <Bar dataKey="votos" fill="#AEB8FF" barSize={100}/>
                                </BarChart>
                              </ResponsiveContainer>
                            </CardBody>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
              {/* </CardBody> */}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
