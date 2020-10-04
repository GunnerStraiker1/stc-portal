import React, { Component } from "react";
// import { Link, NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  CardHeader,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  Label,
} from "reactstrap";
// import {Tabs,Tab} from 'react-bootstrap'
import axios from "axios";

export default class IndicadoresInfantiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anios: [],
      indicadores: [],
      indicador: "",
      estado: "",
      indicadoresMenu: [],
      estados: [],
      indicadoresTable: [],
      statusDisabled: false,
      modalVisible: false,
      estadosMenuStatus: true,
      indicadorMenuStatus: true,
      id: 0,
      key: 0,
    };
  }

  componentWillReceiveProps = (props) => {
    axios.get("https://stcserver2.rhippie.com/aniosIndicadoresInfantil").then((res) => {
      const anios = res.data;
      this.setState({ anios });
    });
    axios.get("https://stcserver2.rhippie.com/indicadoresInfantil").then((res) => {
      const indicadores = res.data;
      this.setState({ indicadores });
    });
  };

  // componentDidUpdate = () =>{
  //     axios.get('https://stcserver2.rhippie.com/indicadores')
  //     .then(res => {
  //         const indicadores = res.data;
  //         console.log(indicadores)
  //         this.setState({indicadores})
  //     })
  // }

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
        // eslint-disable-next-line default-case
        const estadoParam = e.target.value;
        this.setState({ estado: estadoParam });
        axios
          .get(
            "https://stcserver2.rhippie.com/menuIndicadoresInfantil/" +
              this.state.año +
              "/" +
              estadoParam
          )
          .then((res) => {
            const indicadoresMenu = res.data;
            this.setState({
              indicadoresMenu: indicadoresMenu,
            });
          })
          .finally(() =>{
            this.setState({ indicadorMenuStatus: false})
          })
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
            .finally(() =>{
              this.setState({ estadosMenuStatus: false})
            })
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
        return indicadoresFiltered.push(indicadorData);
      }
      return true;
    });
    console.log(indicadoresFiltered);
    this.setState({ indicadoresTable: indicadoresFiltered });
    // this.createPies(indicadoresFiltered);
  };

  /**
     *

     */

  onConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      id: e.currentTarget.id,
      key: e.currentTarget.value,
      modalVisible: true,
    });
  };

  onDelete = () => {
    //     axios.delete("https://stcserver2.rhippie.com/deleteProgram/" + this.state.id)
    //     .then((response) =>{
    //         this.setState({modalVisible: false, key:0,id:0})
    //         console.log(response)
    //     })
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Añadir Indicadores Infantiles</h2>
            </CardHeader>
            <CardBody>
              <form
                id="infantilIndicadorForm"
                onSubmit={this.props.submitProgram}
              >
                <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                  <input
                    type="file"
                    name="file"
                    onChange={this.props.changeHandler}
                  />{" "}
                  <br />
                </div>
                <Alert
                  color="success"
                  isOpen={this.props.visible}
                  toggle={this.props.onToogle}
                  style={{ marginTop: "1em" }}
                >
                  Documento cargado con éxito
                </Alert>
                <div style={{ textAlign: "right", marginRight: "2em" }}>
                  <input
                    type="submit"
                    value="Cargar"
                    name="submit"
                    className="btn btn-outline-primary"
                    id="sendprogram"
                  />
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <h4>Información en Base de Datos</h4>
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
                  return <option value={anio.año} key={key}>{anio.año}</option>;
                })}
              </Input>
            </Col>
            <Col xs="12" sm="3" md="3">
              <Label>Seleccionar Estado</Label>
              <Input
                type="select"
                name="select"
                id="edo"
                onChange={this.changeSelection}
                disabled={this.state.estadosMenuStatus}
              >
                <option unselectable>Selecciona un estado</option>
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
                {this.state.indicadoresMenu.map((indicadorOption, key) => {
                  return (
                    <option key={key} value={indicadorOption.indicador}>
                      {indicadorOption.indicador.toUpperCase()}
                    </option>
                  );
                })}
              </Input>
            </Col>

            <Col xs="12" sm="2" md="2" style={{textAlign: "center"}}>
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
          {this.state.indicadoresTable.length > 0
            ? this.state.indicadoresTable.map((indicador, key) => {
                let respuestas = indicador.respuestas.split("#$%&");
                let votos = indicador.votos.split("#$%&");
                let porcentajes = indicador.porcentajes.split("#$%&");
                return (
                  <div key={key}>
                    <Card style={{ marginTop: "1em" }}>
                      <CardHeader>
                        <Row>
                          <Col sm={10}>
                            <h4>{indicador.pregunta}</h4>
                          </Col>
                          <Col sm={1}>
                            <Button color="primary" style={styles.buttons}>
                              Modificar
                            </Button>
                          </Col>
                          <Col sm={1}>
                            <Button
                              color="danger"
                              style={styles.buttons}
                              onClick={this.onConfirmation}
                              id={indicador.id}
                              value={key}
                            >
                              Eliminar
                            </Button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Table bordered responsive>
                          <thead>
                            <tr>
                              <th></th>
                              {respuestas.map((respues, key) => {
                                if (key !== respuestas.length - 1) {
                                  return (
                                    <th key={key}>{respues.toUpperCase()}</th>
                                  );
                                }
                                return true;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row"># de Respuestas</th>
                              {votos.map((voto, key) => {
                                if (key !== votos.length - 1) {
                                  return <td key={key}>{voto}</td>;
                                }
                                return true;
                              })}
                            </tr>
                            <tr>
                              <th scope="row">Porcentaje</th>
                              {porcentajes.map((porcen, key) => {
                                if (key !== porcentajes.length - 1) {
                                  return <td key={key}>{porcen}</td>;
                                }
                                return true;
                              })}
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                );
              })
            : null}
        </Col>
        <div>
          <Modal isOpen={this.state.modalVisible} toggle={this.toggleModal}>
            <ModalBody>
              ¿Desea eliminar el repositorio: "
              {this.state.indicadores.length > 0
                ? this.state.indicadores[this.state.key].archivo
                : ""}
              "
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.onDelete}>
                Eliminar
              </Button>
              <Button color="primary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Row>
    );
  }
}

const styles = {
  buttons: {
    fontSize: "1.15em",
  },
};
