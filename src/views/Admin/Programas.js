import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row, CardHeader, Alert, Modal, ModalBody, ModalFooter} from 'reactstrap';
// import {Tabs,Tab} from 'react-bootstrap'
import axios from 'axios';

export default class Programas extends Component{

    constructor(props){
        super(props)
        this.state={
            programs:[],
            modalVisible: false,
            id: 0,
            key: 0
        }
    }

    componentWillReceiveProps = (props) =>{
        axios.get('https://stcserver2.rhippie.com/programas')
        .then(res => {
            const programs = res.data;
            this.setState({programs})
        })
    }

    componentDidUpdate = () =>{
        axios.get('https://stcserver2.rhippie.com/programas')
        .then(res => {
            const programs = res.data;
            this.setState({programs})
        })
    }

    componentDidMount(){
        axios.get('https://stcserver2.rhippie.com/programas')
        .then(res => {
            const programs = res.data;
            this.setState({programs})
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
        axios.delete("https://stcserver2.rhippie.com/deleteProgram/" + this.state.id)
        .then((response) =>{
            this.setState({modalVisible: false, key:0,id:0})
            console.log(response)
        })
    }

    toggleModal = () =>{
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render(){
        return(
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h2>Añadir Programas</h2>
                        </CardHeader>
                        <CardBody>
                        <form id="programForm"
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
                        this.state.programs.map((program, key) =>{
                            return(
                                <div key={key}>
                                    <Card key={key}>
                                        <CardHeader>
                                            <Row>
                                                <Col sm={10}>
                                                    <h4>{program.nombre}</h4>
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
                                                <Col sm={6}>
                                                    <h5>Objetivo</h5>
                                                    {program.objetivo}
                                                </Col>
                                                <Col sm={6}>
                                                    <h5>Descripcion</h5>
                                                    {program.descripcion}
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
                        ¿Desea eliminar el programa: "{this.state.programs.length>0 ? this.state.programs[this.state.key].nombre : ''}"
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
