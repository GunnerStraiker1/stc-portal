import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Label, Input, Button } from 'reactstrap';
import axios from 'axios';


export default class Estadisticas extends Component{

  constructor(props){
    super(props)
    this.state = {
      stats: []
    }
  }

  componentDidMount(){
    axios.get('https://stcserver2.rhippie.com/estadisticas')
    .then(res => {
      const stats = res.data;
      console.log(stats)
      this.setState({stats})
    })
  }


  render(){
    return(
      <div>
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
                    <th style={{width: "20%"}}>Nombre</th>
                    <th style={{width:"40%"}}>Descripción</th>
                    <th style={{width:"10%"}}>Estado</th>
                    <th style={{width:"20%"}}>Fuente</th>
                    <th style={{width:"10%", textAlign:"center"}}>Descarga</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.stats.map((stat, key) =>{
                        return(
                          <tr key={key}>
                            <td>{stat.nombre}</td>
                            <td>{stat.descripcion}</td>
                            <td>{stat.estado}</td>
                            <td>{stat.fuente}</td>
                            <td style={{textAlign:"center"}}>
                              <a href={"https://stc-stats-docs.sfo2.digitaloceanspaces.com/" + stat.url} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-download fa-lg mt-4"></i>
                              </a>
                              <br />
                            </td>
                          </tr>
                        )
                      })
                    }
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
