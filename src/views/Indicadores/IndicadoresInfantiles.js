/* eslint-disable default-case */
import React, { Component } from "react";
// import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";
import "./indicadores.css";
import { isMobile } from "react-device-detect";
// import 'chartjs-plugin-labels'

//chartjs-plugin-labels

class CustomizedAxisTick extends Component {
  render() {
    const { x, y, payload } = this.props;

    return (
      <Text
        x={x}
        y={y}
        width={100}
        textAnchor="middle"
        verticalAnchor="start"
        className="AxisXData"
      >
        {payload.value}
      </Text>
    );
  }
}

const arrayRespuestas = [
  "TOTALMENTE EN DESACUERDO",
  "MUY EN DESACUERDO",
  "ALGO EN DESACUERDO",
  "EN DESACUERDO",
  "POCO EN DESACUERDO",
  "NI EN DESACUERDO NI DE ACUERDO",
  "POCO DE ACUERDO",
  "DE ACUERDO",
  "ALGO DE ACUERDO",
  "MUY DE ACUERDO",
  "TOTALMENTE DE ACUERDO",
];

export default class IndicadoresInfantiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicadores: [],
      indicadoresMenu: [],
      estados: [],
      anios:[],
      pies: [],
      preguntas: { preguntas: [], data: [] },
      año: "",
      indicador: "",
      auxindicador: "",
      estado: "",
      statusDisabled: true,
      estadosMenuStatus: true,
      indicadorMenuStatus: true,
      selected2020: false,
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      isMobile: false,
    };
  }

  componentWillMount() {
    let widthInner = window.innerWidth;
    if (widthInner <= 600) {
      this.setState({ isMobile:true });
    }
  }

  componentDidMount() {
    axios.get("https://stcserver2.rhippie.com/aniosIndicadoresInfantil").then((res) => {
      const anios = res.data;
      this.setState({ anios });
    });
    axios.get("https://stcserver2.rhippie.com/indicadoresInfantil").then((res) => {
      const indicadores = res.data;
      this.setState({ indicadores });
    });
  }

  changeSelection = (e) => {
    if (e.currentTarget.id === "indicador") {
      this.setState({ indicador: e.target.value });
    } else {
      if (e.currentTarget.id === "edo") {
        const estadoParam = e.target.value;
        this.setState({ estado: estadoParam });
        axios
          .get(
            "https://stcserver2.rhippie.com/menuIndicadoresInfantil/" +
              this.state.año,
              {
                params:{
                  edo: estadoParam
                }
              }
          )
          .then((res) => {
            const indicadoresMenu = res.data;
            this.setState({
              indicadoresMenu: indicadoresMenu,
            });
          })
          .finally(() => {
            this.setState({ indicadorMenuStatus: false });
          });
      } else {
        if (
          e.currentTarget.id === "año" &&
          e.target.value !== "Selecciona un año"
        ) {
          this.setState({ statusDisabled: false, año: e.currentTarget.value });
          axios
            .get(
              "https://stcserver2.rhippie.com/indicadoresInfantilEstados/" +
                e.currentTarget.value
            )
            .then((res) => {
              const estados = res.data;
              this.setState({ estados });
            })
            .finally(() => {
              this.setState({ estadosMenuStatus: false });
            });
        } else {
          this.setState({ statusDisabled: true });
        }
      }
    }
  };

  visualizeGraphs = () => {
    //  || (indicadorData.indicador.toUpperCase() === this.state.auxindicador.toUpperCase())
    var indicadoresFiltered = [];
    this.state.indicadores.map((indicadorData) => {
      if (
        indicadorData.indicador.toUpperCase() ===
          this.state.indicador.toUpperCase() &&
        indicadorData.año === this.state.año &&
        indicadorData.estado.toUpperCase() === this.state.estado.toUpperCase()
      ) {
        indicadoresFiltered.push(indicadorData);
      } else {
        let stateWithoutAccent = this.state.estado
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (
          indicadorData.indicador.toUpperCase() ===
            this.state.indicador.toUpperCase() &&
          indicadorData.año === this.state.año &&
          indicadorData.estado.toUpperCase() ===
            stateWithoutAccent.toUpperCase()
        ) {
          indicadoresFiltered.push(indicadorData);
        }
      }
      return true;
    });

    // console.log(indicadoresFiltered)
    this.createPies(indicadoresFiltered);
  };

  mapOrder = (array, orderArray, key) => {
    array.sort(function (a, b) {
      var A = a[key],
        B = b[key];

      if (orderArray.indexOf(A) < orderArray.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  };

  createPies = (indicadores) => {
    var respuestas = [];
    var preguntas = [];
    this.setState({ preguntas: [] });
    indicadores.map((indi) => {
      var pregunta = indi.pregunta;
      var dataPregunta = [];

      indi.respuestas.split("#$%&").map((res, key) => {
        if (key !== indi.respuestas.split("#$%&").length - 1) {
          var voto = indi.votos.split("#$%&");
          dataPregunta.push({
            name: res.toUpperCase(),
            votos: parseInt(voto[key]),
          });
        }
        return true;
      });
      dataPregunta.some((e) => e.name === "NI EN DESACUERDO NI DE ACUERDO")
        ? (dataPregunta = this.mapOrder(dataPregunta, arrayRespuestas, "name"))
        : dataPregunta.sort((a, b) => parseInt(b.votos) - parseInt(a.votos));

        dataPregunta.map((item,idx) =>{
          item.alphabet = this.state.alphabet[idx]
        })

      preguntas.push(pregunta.toUpperCase());
      respuestas.push(dataPregunta);
      return true;
    });
    var copyPreg = { preguntas: preguntas, data: respuestas };
    this.setState({ preguntas: copyPreg });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Año</Label>
                    <Input
                      type="select"
                      name="select"
                      id="año"
                      onChange={this.changeSelection}
                    >
                      <option unselectable>Selecciona un año</option>
                      {this.state.anios.map((anio, key) => {
                        return (
                          <option value={anio.año} key={key}>
                            {anio.año}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <Label>Seleccionar Estado/Municipio</Label>
                    <Input
                      type="select"
                      name="select"
                      id="edo"
                      onChange={this.changeSelection}
                      disabled={this.state.estadosMenuStatus}
                    >
                      <option unselectable>Selecciona un Estado/Municipio</option>
                      {this.state.estados.map((edo, key) => {
                        return (
                          <option value={edo.estado} key={key}>
                            {edo.estado.toUpperCase()}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                  <Col xs="12" sm="4" md="4">
                    <Label>Seleccionar Índicador</Label>
                    <Input
                      type="select"
                      name="select"
                      id="indicador"
                      onChange={this.changeSelection}
                      disabled={this.state.indicadorMenuStatus}
                    >
                      <option unselectable>Selecciona un indicador</option>
                      {this.state.indicadoresMenu.map(
                        (indicadorOption, key) => {
                          return (
                            <option
                              value={indicadorOption.indicador.toUpperCase()}
                            >
                              {indicadorOption.indicador.toUpperCase()}
                            </option>
                          );
                        }
                      )}
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

                  <Col xs="12" sm="2" md="2">
                    <Button
                      color="primary"
                      style={{ marginTop: "1em" }}
                      size="lg"
                      onClick={this.visualizeGraphs}
                    >
                      Visualizar
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {/* {console.log(this.state)} */}
              <CardBody>
                <Row>
                  {this.state.preguntas.preguntas.map((pregunta, key) => {
                    return (
                      <Col xs="12" md="12" key={key}>
                        <Card style={{ marginTop: "3em" }}>
                          <CardHeader>
                            <h4>{key + 1 + ".- " + pregunta}</h4>
                          </CardHeader>
                          <CardBody>
                            <ResponsiveContainer
                              width="100%"
                              aspect={ this.state.isMobile ?  1.0 / 1.8 : 4.0/1.8}
                            >
                              <BarChart data={this.state.preguntas.data[key]}>
                                {console.log(this.state.preguntas.data[key])}
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis
                                  tick={<CustomizedAxisTick />}
                                  dataKey={this.state.isMobile ? "alphabet" : "name"}
                                type='category'
                                  height={180}
                                  interval={0}
                                  label={{ value: "Respuestas" }}
                                />
                                <YAxis
                                  label={{
                                    value: "Cantidad de Respuestas",
                                    angle: -90,
                                    position: "insideLeft",
                                  }}
                                />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Legend height={50} verticalAlign="top" />
                                <Bar
                                  dataKey="votos"
                                  name='Cantidad de Respuestas'
                                  fill="#AEB8FF"
                                  barSize={100}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                            {
                            isMobile ?
                              <Card>
                                <CardHeader>
                                  <Button block color="link" className="text-left m-0 p-0" onClick={() => console.log("4")} aria-expanded={true}>
                                    <h4 style={{textAlign:"center"}}>RESPUESTAS</h4>
                                  </Button>
                                </CardHeader>
                                <CardBody>
                                  <Row>
                                    {this.state.preguntas.data[key].map((data, key) => {
                                      return <Col sm={4} style={{marginBottom:"1em", textAlign:"left"}}><h5><b>{data.alphabet}</b> :  {data.name}</h5></Col>
                                    })}
                                  </Row>
                                </CardBody>
                              </Card>
                              :
                              null
                          }
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
