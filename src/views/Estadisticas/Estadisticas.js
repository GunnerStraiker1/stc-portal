import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Label, Input, ButtonToggle } from 'reactstrap';

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
                    <ButtonToggle color="primary" style={{marginTop: "1em"}} size="lg">
                      Visualizar
                      </ButtonToggle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive size="lg">
                  <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre de la Estadistica</th>
                    <th>Descripción</th>
                    <th>Descarga</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  <tr>
                    <td>2012/01/01</td>
                    <td>Carwyn Fachtna</td>
                    <td>Carwyn Fachtna</td>
                    <td>
                      <i className="fa fa-file-pdf-o fa-lg mt-4"></i><br />
                      {/* <Badge color="success">Active</Badge> */}
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  {/* <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem> */}
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  {/* <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem> */}
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>


      </div>
    )
  }
}
