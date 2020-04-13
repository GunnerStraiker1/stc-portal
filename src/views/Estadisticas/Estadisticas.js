import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Label, Input, Button } from 'reactstrap';


export default class Estadisticas extends Component{
  render(){
    return(
      <div>
        <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
              <Row>
              <Col xs="12" sm="3" md="3">
                  <Label>Seleccionar Año</Label>
                  <Input type="select" name="select" id="edo">
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                  </Input>
                </Col>
              <Col xs="12" sm="3" md="3">
                  <Label>Seleccionar Estado</Label>
                  <Input type="select" name="select" id="edo">
                    <option>Mérida</option>
                    <option>Campeche</option>
                    <option>Quintana Roo</option>
                  </Input>
                </Col>
                <Col xs="12" sm="4" md="4">
                    <Label>Seleccionar Índicador</Label>
                    <Input type="select" name="select" id="edo">
                      <option>Estado Nutricio</option>
                      <option>Prevalencia de enfermedades diarreicas</option>
                      <option>Prevalencia de enfermedades respiratorias</option>
                      <option>Cobertura de vacunación por grupo de edad</option>
                    </Input>
                  </Col>
                  <Col xs="12" sm="2" md="2">
                    <Button color="primary" style={{marginTop: "1em"}} size="lg">
                      Visualizar
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive size="lg">
                  <thead>
                  <tr>
                    <th style={{width: "10%"}}>Fecha</th>
                    <th style={{width:"30%"}}>Nombre del Archivo</th>
                    <th style={{width:"50%"}}>Descripción</th>
                    <th style={{width:"10%", textAlign:"center"}}>Descarga</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td style={{textAlign:"center"}}>
                      <i className="fa fa-download fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                 
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>


      </div>
    )
  }
}
