import React, { Component } from "react";
import {
  Card, CardBody, CardHeader,
  Col, Row, Label, Input, Button, Container, Table
} from 'reactstrap';
import axios from 'axios'

export default class MetodologiaIndicadores extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader style={{ textAlign: "center" }}><h3>Metodología de Indicadores</h3></CardHeader>
              <CardBody>
                <Container>
                  <h5 style={{ textAlign: "justify" }}>
                    Esta sección contiene más de 100 indicadores los cuales forman parte de las preguntas
                    realizadas en los levantamientos de información aplicados en los cuestionarios para
                    padres, madres y cuidadores de niñas y niños, así como en los cuestionarios de niñas y
                    niños implementados en febrero de 2019 y enero de 2020 en los municipios de Mérida,
                    Kanasin; y en el mes de junio de 2019 y enero de 2020 en Chikindzonot, cuyos municipios
                    corresponden al estado de Yucatán; José María Morelos, Benito Juárez, Puerto Morelos,
                    Solidaridad, Playa del Carmen; en el estado de Quintana Roo en febrero de 2019 y enero
                    de 2020 y en el municipio de Campeche en el estado de Campeche en febrero de 2019.
                    <br/><br/>
                    Cada indicador tiene como objetivo mostrar al público las respuestas recibidas a cada
                    pregunta planteada, bajo la intensión de conocer las respuestas de las niñas y niños, así
                    como conocer las respuestas por parte de los adultos.
                    </h5>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}
