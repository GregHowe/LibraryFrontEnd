import basestyle from "../Base.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import BootstrapSelect from 'react-bootstrap-select-dropdown';

const ReturnBook = (props) =>{

    const api = "https://localhost:7113/api"; //process.env.API_BASE_URL;

    const { showReturn, handleCloseReturn, setRefresh, refresh } = props;
    const [Id, setId] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [optionsUser, setOptionsUser] = useState([]);

    const [dataOptions, setDataOptions] = useState([]);

    const [idUserPrestador, setIdUserPrestador] = useState(0);

    const _token = localStorage.getItem("accessToken");
    const headers = {'Authorization': `Bearer ${_token}`}

    useEffect(( ) =>{
      axios.get(`${api}/User/getUsers`, {headers})
      .then(res => {
        let _optionsUser = [];
        res.data.forEach(u =>  _optionsUser.push({ labelKey:u.id , value: `${u.givenName} ${u.surname}` }));
        setOptionsUser(_optionsUser);
      })
      .catch(error => console.log('error', error));
}, []); 

    useEffect(( ) =>{

      if ( idUserPrestador != undefined && idUserPrestador != 0)  { 

        axios.get(`${api}/Books/GetBorrowBook/${idUserPrestador}`, {headers})
      .then(res => {
          setDataOptions(res.data);
        })
      .catch(error => console.log(error));

    }
    }, [idUserPrestador]);

    const handleSelectChange = (e) => {
      setId(e.target.value);
  };

    const handleChangeCbo = (selectedOptions) => {

      setFormErrors({});
      let _id = selectedOptions.selectedKey.find(x => x);
      setIdUserPrestador(_id);

    }

    const submitHandler = (e) => {

        setFormErrors({});        
      
         const error = {};

        if (!idUserPrestador) {  
           error.msg = `Debe seleccionar el usuario.`;
           setFormErrors(error);
           return;
         }

         if (!Id) {  
          error.msg =  `Debe seleccionar el libro a devolver.`;
          setFormErrors(error);
          return;
        }
         
        const _token = localStorage.getItem("accessToken");
        const headers = {'Authorization': `Bearer ${_token}`}
                
        let data = dataOptions.find(x => x.id == Id );
        let request = { Id , IdBook : data.idBook};

        axios.put(`${api}/Books/ReturnBook`, request, {headers})
        .then(_ => {
            setId('');
            handleCloseReturn();
            Swal.fire({ title: 'Devoluvion Registrada!', icon: 'success', confirmButtonText: 'Ok'})
            setRefresh(!refresh);
        })
        .catch( (error) => {
            console.log(error);
        });
    }


return  (
    <>
            <Modal show={showReturn} onHide={handleCloseReturn}>
          <Modal.Header closeButton>
            <Modal.Title>Devolver Libro</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>

            <Form onSubmit={submitHandler}    >

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label> Seleccione el Usuario que devolverá el libro:</Form.Label>

                  <BootstrapSelect   onChange={handleChangeCbo}  showTick={true} showSearch={false}  
                   className="optionCbo  form-control" options={optionsUser} />
                  </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Book:</Form.Label>

                   <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
                      <option>Elija el libro</option>
                      {dataOptions.map(option => (
                         <option value={option.id}>{option.nameBook}</option>
                      ))}
                  </Form.Select>


                </Form.Group>

                <p className={basestyle.error}>{formErrors.msg}</p>

            </Form>

          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReturn}> Close</Button>
            <Button variant="primary" onClick={submitHandler} >Devolver Libro</Button    >
          </Modal.Footer>

      </Modal>


    </>
)
    
}

export default ReturnBook;


