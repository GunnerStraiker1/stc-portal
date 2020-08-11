import React, { Component } from "react";
import {
  Card, CardBody, CardHeader,
  Col, Row, Label, Input, Button, Container, Table
} from 'reactstrap';
import axios from 'axios'

export default class MetodologiaIndices extends Component{

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
              <CardHeader style={{textAlign:"center"}}><h3>Metodología de Índices</h3></CardHeader>
              <CardBody>
                  <Container>
                    <h5 style={{textAlign:"justify"}}>
                    Se construyeron datos por medio de implementaciones de encuestas. Las encuestas se dividen en 2 secciones, adultos y niños, integradas por 110 preguntas y 30 preguntas, respectivamente.<br/><br/>
                    Una vez que se obtuvieron los datos, la data contenida fue homologada mediante los programas Open Refine y Pup7 de Excel, posteriormente se procedió a realizar el análisis de las respuestas obtenidas, seguido de un proceso de priorización de variables, a través de la re-codificación de datos, otorgando un valor máximo al estado ideal de las categorías obtenidas.<br/><br/>
                    Posteriormente, las variables fueron introducidas al programa SPSS, declarando cada una de las variables, describiendo las categorías que lo componen, para posteriormente trabajarlas a través de un análisis factorial por el método de componentes principales, a través de la medida de suficiencia de muestreo y correlaciones parciales, identificando la varianza σ2 de cada ítem.<br/><br/>
                    Por lo que se procedió al análisis de todas las varianzas mediante el método de componentes principales, identificando las agrupaciones (clusters) de ítems, observando las tendencias relacionales.<br/><br/>
                    Con el procedimiento de análisis factorial se obtuvo la agrupación de las variables, no sin antes realizar las siguientes pruebas estadísticas matriz de intercorrelaciones, supuesto de colinealidad, KMO, Bartlett´s test y el índice MSA para cada variable, para posteriormente extraer los factores o suma de las respuestas de cada sujeto a una serie de ítems, dándonos una combinación líneal de variables y su posterior estimación de las puntuaciones factoriales mediante las puntuaciones tipificadas de las primeras k-componentes y la matriz de cargas factoriales, a través de las correlaciones de las variables originales con dichos componentes, la determinación del número de factores y su proceso de estandarización, mediante la frecuencia relativa de los factores y la representación de pesos, calculando el promedio de cada componente.<br/><br/>
                    Como siguiente paso se procedió a revisar el total de componentes que arrojó la varianza total explicada, por lo que cada valor del componente en su varianza porcentual total, explica la aportación que da al total del índice, nombrando los subíndices, mediante el análisis del factor común, para la posterior determinación de cada ecuación, integrando todos los títulos dados a los subíndices por el peso del porcentaje de la varianza de cada componente.<br/><br/>
                    Índice= (título del subíndice1 * %varianza del componente1) + (título del subíndice2* %varianza del componente2) + (título del subíndicen * %varianza del componenten)= Valor [0,1]<br/><br/>
                    El valor final, resultado de los pasos anteriores, arroja los valores posicionados entre los rangos que van del 0 al 1, recibiendo una interpretación dependiendo del valor en el que caen, como son los siguientes:<br/><br/>
                    </h5>
                    <Table bordered>
                      <thead>
                        <th colSpan={2}><h4>Escala de valores de los índices</h4></th>
                      </thead>
                      <tbody>
                        <tr>
                          <td><b>Valor</b></td>
                          <td>Interpretación</td>
                        </tr>
                        <tr>
                          <td><b>0 al .1</b></td>
                          <td>Muy malo(0) y malo(.1)</td>
                        </tr>
                        <tr>
                          <td><b>.11 al .2</b></td>
                          <td>Muy deficiente</td>
                        </tr>
                        <tr>
                          <td><b>.21 al .3</b></td>
                          <td>Deficiente</td>
                        </tr>
                        <tr>
                          <td><b>.31 al .4</b></td>
                          <td>Insuficiente</td>
                        </tr>
                        <tr>
                          <td><b>.41 al .5</b></td>
                          <td>Regular</td>
                        </tr>
                        <tr>
                          <td><b>.51 al .6</b></td>
                          <td>Mejor que regular</td>
                        </tr>
                        <tr>
                          <td><b>.61 al .7</b></td>
                          <td>Algo bueno</td>
                        </tr>
                        <tr>
                          <td><b>.71 al .8</b></td>
                          <td>Bueno</td>
                        </tr>
                        <tr>
                          <td><b>.81 al .9</b></td>
                          <td>Muy bueno</td>
                        </tr>
                        <tr>
                          <td><b>.91 al 1</b></td>
                          <td>Excelente</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}
