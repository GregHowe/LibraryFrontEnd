import basestyle from "../Base.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import React, { useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

const Add = (props) =>{
  
    const api = "https://localhost:7113/api";//process.env.API_BASE_URL;
    const [disabled, setDisabled] = useState(true);
    const {showAdd, handleCloseAdd, setRefresh, refresh } = props  
    const [name, setName] = useState('')
    const [stock, setStock] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleStockInput = (text) => {
      const numericValue = text.currentTarget.value.replace(/[^0-9]/g, "");
      setStock(numericValue? numericValue: '');
    };
    
    const enabledSubmit= () =>{
      let value = name && stock;
      setDisabled(!value);
    }

    const submitHandler = (e) => {

        if (  !(name && stock)) return;

        const error = {};
        setFormErrors({});
        
        if (stock == 0) { 
          error.msg = `Stock debe ser mayor a 0`;
          setFormErrors(error);
          return;
        }

       const _token = localStorage.getItem("accessToken");
       const headers = {'Authorization': `Bearer ${_token}`}
 
        axios.post(`${api}/Books`, { "name": name, "stock": stock}, { headers})
        .then(_ => {
 
            setName('');
            setStock('');
            handleCloseAdd();
            Swal.fire({ title: 'Libro Creado con Exito!', icon: 'success', confirmButtonText: 'Ok'})
            setRefresh(!refresh);
        })
        .catch(error =>{
          if (error.response.status == 400 ){
            const _error = {msg: error.response.data};
            setFormErrors(_error);
            }
        });
    }


return  (
    <>
            <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>New Book</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>

            <Form onSubmit={submitHandler}    >

                <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Name</Form.Label>
                    <input required autoFocus  value={name}  onKeyUp={enabledSubmit}  onChange={ (e) => { setName(e.target.value);   }} className="form-control" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Stock</Form.Label>
                  <input required pattern="[0-9]*"  
                    onKeyDown={(e) => {if (e.key === "Enter") {  submitHandler()  }}} 
                    name="stock"  
                    onKeyUp={enabledSubmit}  
                    onChange={(e) => { handleStockInput(e); }} 
                    value={stock}   
                    className="form-control"
                  /> 
                </Form.Group>
                <p className={basestyle.error}>{formErrors.msg}</p>
            </Form>

          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}> Close</Button>
            <Button variant="primary" onClick={submitHandler} disabled={disabled}> Save Book</Button    >
          </Modal.Footer>

      </Modal>


    </>
)
    
}

export default Add;


