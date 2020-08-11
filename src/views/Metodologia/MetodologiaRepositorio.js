import React, { Component } from "react";
import {
  Card, CardBody, CardHeader,
  Col, Row, Label, Input, Button, Container, Table
} from 'reactstrap';
import axios from 'axios'

export default class MetodolodiaRepositorio extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader style={{textAlign:"center"}}><h3>Introducción a Repositorios</h3></CardHeader>
              <CardBody>
                  <Container>
                    <h5 style={{textAlign:"justify"}}>
                    Esta sección está conformada por diferentes documentos sobre el panorama sociodemográfico de Yucatán, Quintana Roo y Campeche; así como de sus diferentes planes de desarrollo municipal, a través de los cuales se presentan los objetivos y programas rectores que integran los Planes Municipales de Desarrollo y la integración de los datos relevantes para conocer las características demográficas, sociales y económicas básicas de la población y las viviendas de los municipios que integran los estados mencionados con base en los resultados del Censo de Población y Vivienda 2010; y la encuesta intercensal.
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
