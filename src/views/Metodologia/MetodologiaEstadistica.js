import React, { Component } from "react";
import {
  Card, CardBody, CardHeader,
  Col, Row, Label, Input, Button, Container, Table
} from 'reactstrap';
import axios from 'axios'

export default class MetodolodiaEstadistica extends Component{

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
              <CardHeader style={{textAlign:"center"}}><h3>Introducción a Estadisticas</h3></CardHeader>
              <CardBody>
                  <Container>
                    <h5 style={{textAlign:"justify"}}>
                    Esta sección está conformada por estadísticas de cobertura de vacunación, enfermedades diarreicas agudas, estado nutricio, infecciones respiratorias agudas y motivos de consulta de menores de edad de 0 a 19 años de edad con su respectivo diagnóstico durante los años 2015, 2016, 2017, 2018 y 2019 en los municipios de Cantamayec, Chacsinkin, Chankom, Chikindzonot, Kanasin, Mani, Mayapan, Merida, Oxkutzcab, Tahdziu, Teabo, Tekom, Tixcacalcupul, Tixmehuac, Valladolid y Yaxcabá del estado de Yucatán.
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
