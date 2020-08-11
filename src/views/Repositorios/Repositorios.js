import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

export default class Repositorios extends Component{

  constructor(props){
    super(props);
    this.state={
      repos: [],
      archivo:'',
      descripcion:'',
      fuente:'',
      estado:'',
      descarga:''
    }
  }

  componentDidMount(){
    axios.get('https://stcserver2.rhippie.com/repositorios')
    .then(res => {
      const repos = res.data;
      this.setState({repos})
    })
  }


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
                  <tr style={{textAlign:"center"}}>
                    <th>Nombre del Archivo</th>
                    <th>Descripción</th>
                    <th>Fuente</th>
                    <th>Estado</th>
                    <th>Descarga</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.repos.map((repo) =>{
                      return(
                        <tr>
                          <td>{repo.archivo}</td>
                          <td>{repo.descripcion}</td>
                          <td style={{textAlign:"center"}}>{repo.fuente}</td>
                          <td style={{textAlign:"center"}}>{repo.estado}</td>
                          <td style={{textAlign:"center"}}>
                            <a href={"https://stcserver2.rhippie.com/fileRepositorio/" + repo.descarga} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-file-pdf-o fa-lg mt-4"></i>
                            </a>
                            <br />
                            {/* <Badge color="success">Active</Badge> */}
                          </td>
                        </tr>
                      )
                    })
                  }
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
