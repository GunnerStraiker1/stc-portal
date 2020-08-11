import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form,
    Input, Row, CardHeader, Modal, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
// import {} from 'react-bootstrap'
import axios from 'axios';

export default class Repositories extends Component{

    constructor(props){
        super(props)
        this.state={
            repos:[],
            modalVisible: false,
            id: 0,
            key: 0,
            success: false,
            url: "",
            error: false,
            errorMessage: "",
            nombre: "",
            fuente: "",
            descripcion: "",
            estado: ""
        }
    }

    componentWillReceiveProps = (props) =>{
        axios.get('https://stcserver2.rhippie.com/repositorios')
        .then(res => {
            const repos = res.data;
            this.setState({repos})
        })
    }

    componentDidUpdate = () =>{
        axios.get('https://stcserver2.rhippie.com/repositorios')
        .then(res => {
            const repos = res.data;
            this.setState({repos})
        })
    }

    componentDidMount(){
        axios.get('https://stcserver2.rhippie.com/repositorios')
        .then(res => {
            const repos = res.data;
            this.setState({repos})
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
    //     axios.delete("https://stcserver2.rhippie.com/deleteProgram/" + this.state.id)
    //     .then((response) =>{
    //         this.setState({modalVisible: false, key:0,id:0})
    //         console.log(response)
    //     })
    }

    toggleModal = () =>{
        this.setState({modalVisible: !this.state.modalVisible})
    }

    submitFileRepo = () =>{
        let file = this.uploadInput.files[0];
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        axios.post("https://stcserver2.rhippie.com/uploadFileRepo",{
            fileName : fileName,
            fileType : fileType
        })
        .then(response =>{
            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            console.log(url)
            this.setState({url: url})

            var options = {
                headers: {
                  'Content-Type': fileType
                }
            };

            axios.put(signedRequest,file,options)
            .then(result => {
                this.setState({success: true});
            })
            .catch(error => {
                alert("ERROR " + JSON.stringify(error));
            })

            const data = {
                "archivo" : this.state.nombre,
                "descripcion": this.state.descripcion,
                "fuente" : this.state.fuente,
                "estado": this.state.estado,
                "descarga": fileName+"."+fileType
            }
            axios.post('https://stcserver2.rhippie.com/createNewRepo', data)
            .then(result => {
                console.log(result)
            })
            .catch(error =>{
                alert("ERROR " + JSON.stringify(error));
            })

        })
        .catch(error => {
            alert(JSON.stringify(error));
        })


    }

    handleChangeRepoFile= (ev) =>{
        this.setState({success: false, url : ""});
    }

    render(){
        return(
            <Row>
                {/* <Col sm="6">
                    <Card>
                        <CardHeader>
                            <h2>Añadir Repositorios</h2>
                        </CardHeader>
                        <CardBody>
                        <form id="repoForm"
                            onSubmit={this.props.submitProgram}
                        >
                            <div style={{marginTop:"1em", marginLeft:"1em"}}>
                                <input type="file" name="file" onChange={this.props.changeHandler} /> <br/>
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
                <Col sm="6">
                    <Card>
                        <CardHeader>
                            <h2>Añadir Archivo del Repositorio</h2>
                        </CardHeader>
                        <CardBody>
                        <form id="fileRepoForm"
                        >
                            <div style={{marginTop:"1em", marginLeft:"1em"}}>
                                <input type="file" name="file" onChange={this.handleChangeRepoFile} ref={(ref) => {this.uploadInput = ref;}}/> <br/>
                            </div>
                             <Alert color="success" isOpen={this.props.visible} toggle={this.props.onToogle} style={{marginTop:"1em"}}>
                                Documento cargado con éxito
                            </Alert> *
                            <div style={{textAlign:"right", marginRight:"2em"}}>
                                <button type="button" value="Upload" name="submit"
                                className="btn btn-outline-primary" id="sendprogram" onClick={this.submitFileRepo}>Subir Archivo</button>
                            </div>
                        </form>
                        </CardBody>
                    </Card>
                </Col> */}
                <Col sm={12}>
                    <Card>
                        <CardHeader>
                            <h2>Insertar nuevo Repositorio</h2>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row form>
                                    <Col sm={12}>
                                        <FormGroup>
                                            <Label for="nombreRepo">Nombre del Repositorio</Label>
                                            <Input type="text" id="nombreRepo" onChange={(e) => this.setState({nombre : e.target.value})}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="fuenteRepo">Fuente del Repositorio</Label>
                                            <Input type="text" id="fuenteRepo" onChange={(e) => this.setState({fuente : e.target.value})}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="edoRepo">Estado Originario del Repositorio</Label>
                                            <Input type="text" id="edoRepo" onChange={(e) => this.setState({estado : e.target.value})}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12}>
                                        <FormGroup>
                                            <Label for="descrRepo">Descripción del Repositorio</Label>
                                            <Input type="textarea" id="descrRepo" rows={5} onChange={(e) => this.setState({descripcion : e.target.value})}/>
                                        </FormGroup>
                                    </Col>
                                    <Col sm ={12}>
                                    <div style={{marginTop:"1em", marginLeft:"1em"}}>
                                        <label>Archivo de Repositorio</label> <br/>
                                        <input type="file" name="file" onChange={this.handleChangeRepoFile} ref={(ref) => {this.uploadInput = ref;}}/> <br/>
                                    </div>
                            {/* <Alert color="success" isOpen={this.props.visible} toggle={this.props.onToogle} style={{marginTop:"1em"}}>
                                Documento cargado con éxito
                            </Alert> */}
                                    </Col>
                                </Row>
                                <div style={{textAlign:"right", marginRight:"2em"}}>
                                    <button type="button" value="Upload" name="submit"
                                    className="btn btn-outline-primary" id="sendprogram" onClick={this.submitFileRepo}>Subir Repositorio</button>
                                </div>
                            </Form>
                            {/* <Form>
                                <Form.Group as={Col}>
                                    <Form.Label>Nombre del Repositorio</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Fuente del Repositorio</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Descripción del Repositorio</Form.Label>
                                    <Form.Control as="textarea" rows="5" />
                                </Form.Group>

                            </Form> */}
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={12}>
                    <h4>Información en Base de Datos</h4>
                    {
                        this.state.repos.map((program, key) =>{
                            return(
                                <div key={key}>
                                    <Card key={key}>
                                        <CardHeader>
                                            <Row>
                                                <Col sm={10}>
                                                    <h4>{program.archivo}</h4>
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
                                                    <h5>Archivo</h5>
                                                    {program.descarga}
                                                </Col>
                                                <Col sm={3}>
                                                    <h5>Estado</h5>
                                                    {program.estado}
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
                        ¿Desea eliminar el repositorio: "{this.state.repos.length>0 ? this.state.repos[this.state.key].archivo : ''}"
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
