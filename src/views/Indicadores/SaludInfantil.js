import React, { Component } from "react";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader,
Col, Row, Fade, Collapse, Badge, Label, Input, Button} from 'reactstrap';
import axios from 'axios'

export default class SaludInfantil extends Component {

  constructor(props){
    super(props);
    this.state={
      indicadores:[],
      pies:[],
      preguntas: [],
      año:"",
      indicador:"",
      auxindicador:"",
      estado: ""
    }
  };

  componentDidMount(){
    axios.get('https://stc-backend-new.appspot.com/indicadores')
    .then(res => {
      const indicadores = res.data;
      this.setState({indicadores})
    })
  }

  changeSelection = (e) =>{
    if (e.currentTarget.id === "indicador") {
      switch(e.target.value){
        case "gral":
          this.setState({indicador: "Generales"});
          this.setState({auxindicador: "General"});
        break;
        case "salud":
          this.setState({indicador: "Servicios de Salud"});
          this.setState({auxindicador: ""});
        break;
        case "sida":
          this.setState({indicador: "Prevención del SIDA"});
          this.setState({auxindicador: ""});
        break;
        case "infantil":
          this.setState({indicador: "Salud Infantil"});
          this.setState({auxindicador: ""});
        break;
        case "materna":
          this.setState({indicador: "Salud Materna"});
          this.setState({auxindicador: ""});
        break;
        case "seguridad":
          this.setState({indicador: "Seguridad Alimentaria"});
          this.setState({auxindicador: ""});
        break;
        case "agua":
          this.setState({indicador: "Acceso y calidad del agua"});
          this.setState({auxindicador: ""});
        break;
        case "desastres":
          this.setState({indicador: "Desastres Naturales"});
          this.setState({auxindicador: ""});
        break;
        case "desechos":
          this.setState({indicador: "Instalaciones Sanitarias y Desechos"});
          this.setState({auxindicador: ""});
        break;
      }
    }
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
    if (e.currentTarget.id === "año") {
      this.setState({año: e.currentTarget.value})
    }
  }


  visualizeGraphs = () =>{
    var indicadoresFiltered = [];
    this.state.indicadores.map((indicadorData) =>{
      if (((indicadorData.indicador.toUpperCase() === this.state.indicador.toUpperCase()) || (indicadorData.indicador.toUpperCase() === this.state.auxindicador.toUpperCase()))
      && indicadorData.año === this.state.año
      && indicadorData.estado.toUpperCase() === this.state.estado.toUpperCase()) {
        indicadoresFiltered.push(indicadorData)
      }
    })
    console.log(indicadoresFiltered)
    this.createPies(indicadoresFiltered);
  }

  createPies = (indicadores) =>{
    var copyPreg = []
    this.setState({preguntas: []})
    indicadores.map((indi) =>{
      var colors = [];
      var labels = [];
      var data = [];

      indi.respuestas.split("#$%&").map((res, key) =>{
        if (key != indi.respuestas.split("#$%&").length-1) {
          labels.push(res)
        }
      })
      indi.votos.split("#$%&").map((voto, key) =>{
        if (key != indi.votos.split("#$%&").length-1) {
          data.push(voto)
        }
      })
      for (let i = 0; i < labels.length; i++) {
        var randomColor ="#"+Math.floor(Math.random()*16777215).toString(16);
        colors[i] = randomColor;
      }

      var datapie = {
        labels: labels,
        datasets:[{
          data: data,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }]
      }
      var dataInfo = {"pregunta": indi.pregunta, "dataPie": datapie};
      copyPreg.push(dataInfo);
    })
    this.setState({preguntas: copyPreg})
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              {console.log(this.state)}
              <CardHeader>
                <Row>
                <Col xs="12" sm="4" md="4">
                    <Label>Seleccionar Índicador</Label>
                    <Input type="select" name="select" id="indicador" onChange={this.changeSelection}>
                      <option unselectable>Selecciona un indicador</option>
                      <option value="gral">Generales</option>
                      <option value="salud">Servicios de Salud</option>
                      <option value="sida">Prevención del SIDA</option>
                      <option value="infantil">Salud Infantil</option>
                      <option value="materna">Salud Materna</option>
                      <option value="seguridad">Seguridad Alimentaria</option>
                      <option value="agua">Acceso y calidad del agua</option>
                      <option value="desastres">Desastres Naturales</option>
                      <option value="desechos">Instalaciones Sanitarias y Desechos</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Estado</Label>
                    <Input type="select" name="select" id="edo" onChange={this.changeSelection}>
                      <option unselectable>Selecciona un estado</option>
                      <option value="yuc">Merida, Kanasin, Yucatán</option>
                      <option value="chik">Chikindzonot, Yucatán</option>
                      <option value="camp">Campeche,Campeche</option>
                      <option value="qroo">Puerto Morelos, Solidaridad, José Maria Morelos, Quintana Roo</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Año</Label>
                    <Input type="select" name="select" id="año" onChange={this.changeSelection}>
                      <option unselectable>Selecciona un año</option>
                      <option value="2019">2019</option>
                      <option value="2020" disabled>2020</option>
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
              <CardBody>
                <Row>
                  {
                    this.state.preguntas.map((pregunta, key) =>{
                      return(
                        <Col xs="12" md="12" key={key}>
                          <Card>
                      <CardHeader><h4>{pregunta.pregunta}</h4></CardHeader>
                            <CardBody>
                              <div className="chart-wrapper">
                                <Pie data={pregunta.dataPie} height={200} />
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
