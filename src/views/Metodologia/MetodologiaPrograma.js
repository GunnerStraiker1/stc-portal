import React, { Component } from "react";
import {
  Card, CardBody, CardHeader,
  Col, Row, Label, Input, Button, Container, Table
} from 'reactstrap';
import axios from 'axios'

export default class MetodologiaPrograma extends Component{

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
              <CardHeader style={{textAlign:"center"}}><h3>Introducción a Programas</h3></CardHeader>
              <CardBody>
                  <Container>
                    <h5 style={{textAlign:"justify"}}>
                    Esta sección se encuentra dividida por la subsección de programas gubernamentales y programas de las OSC, de los estados de Yucatán, Campeche y Quintana Roo; y tiene como finalidad presentar los programas implementados por parte del gobierno y de las organizaciones de la sociedad civil, describiendo a cada uno de ellos, así como sus objetivos; cobertura, requisitos para acceder a cada programa, programa presupuestario o financiador y periodo de implementación.
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
