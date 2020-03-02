import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

export default class Repositorios extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardBody>
                <Table responsive size="lg">
                  <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre del Repositorio</th>
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
    )
  }
}
