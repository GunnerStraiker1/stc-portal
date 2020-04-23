import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader, Alert, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {Tabs,Tab} from 'react-bootstrap'
import axios, {post} from 'axios';

export default class Indicadores extends Component{

    constructor(props){
        super(props)
        this.state={
            indicadores:[],
            modalVisible: false,
            id: 0,
            key: 0
        }
    }

    componentWillReceiveProps = (props) =>{
        axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicadores')
        .then(res => {
            const indicadores = res.data;
            this.setState({indicadores})
        })
    }

    componentDidUpdate = () =>{
        axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicadores')
        .then(res => {
            const indicadores = res.data;
            this.setState({indicadores})
        })
    }

    componentDidMount(){
        axios.get('http://ec2-18-221-139-227.us-east-2.compute.amazonaws.com/indicadores')
        .then(res => {
            const indicadores = res.data;
            this.setState({indicadores})
        })
    }



    /**
     *

     */

    onConfirmation = (e) =>{
        e.preventDefault();
        this.setState({
            id: e.currentTarget.id,
            key: e.currentTarget.value,
            modalVisible: true,

        })
    }

    onDelete= () =>{
    //     axios.delete("http://localhost:3001/deleteProgram/" + this.state.id)
    //     .then((response) =>{
    //         this.setState({modalVisible: false, key:0,id:0})
    //         console.log(response)
    //     })
    }

    toggleModal = () =>{
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render(){
        return(
            <Row>
                {console.log(this.state)}
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h2>Añadir Indicadores</h2>
                        </CardHeader>
                        <CardBody>
                        <form id="indicadorForm"
                            onSubmit={this.props.submitProgram}
                        >
                            <div style={{marginTop:"1em", marginLeft:"1em"}}>
                                <input type="file" name="file" onChange={this.props.changeHandler}/> <br/>
                            </div>
                            <Alert color="success" isOpen={this.props.visible} toggle={this.props.onToogle} style={{marginTop:"1em"}}>
                                Documento cargado con éxito
                            </Alert>
                            <div style={{textAlign:"right", marginRight:"2em"}}>
                                <input type="submit" value="Upload" name="submit" className="btn btn-outline-primary" id="sendprogram"/>
                            </div>
                        </form>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={12}>
                    <h4>Información en Base de Datos</h4>
                    {
                        this.state.indicadores.map((program, key) =>{
                            return(
                                <div key={key}>
                                    <Card key={key}>
                                        <CardHeader>
                                            <Row>
                                                <Col sm={10}>
                                                    <h4>{program.pregunta}</h4>
                                                </Col>
                                                <Col sm={1}>
                                                    <Button color="primary" style={styles.buttons}>Modificar</Button>
                                                </Col>
                                                <Col sm={1}>
                                                    <Button color="danger" style={styles.buttons}
                                                    onClick={this.onConfirmation} id={program.id} value={key}>Eliminar</Button>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col sm={3}>
                                                    <h5>Estado</h5>
                                                    {program.estado}
                                                </Col>
                                                <Col sm={3}>
                                                    <h5>Tipo de Indicador</h5>
                                                    {program.indicador}
                                                </Col>
                                                <Col sm={3}>
                                                    <h5>Año</h5>
                                                    {program.año}
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </Col>
                <div>
                    <Modal isOpen={this.state.modalVisible} toggle={this.toggleModal}>
                        <ModalBody>
                        ¿Desea eliminar el repositorio: "{this.state.indicadores.length>0 ? this.state.indicadores[this.state.key].archivo : ''}"
                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" onClick={this.onDelete}>Eliminar</Button>
                        <Button color="primary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Row>
        )
    }
}

const styles = {
    buttons:{
        fontSize:"1.15em"
    }
}
