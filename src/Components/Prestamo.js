import basestyle from "../Base.module.css";
import Modal from 'react-bootstrap/Modal'
import { Button  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import BootstrapSelect from 'react-bootstrap-select-dropdown';

const Prestamo = (props) =>{

    const api = "https://localhost:7113/api"; //process.env.API_BASE_URL;
    const {setRefresh, refresh, id } = props;

    const [showPrestamo, setShowPrestamo] = useState(false);
    const handleClosePrestamo = () => setShowPrestamo(false);
    const handleShowPrestamo = () => setShowPrestamo(true);
    const [optionsUser, setOptionsUser] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [idUserPrestador, setIdUserPrestador] = useState(0);

    const _token = localStorage.getItem("accessToken");
    const headers = {'Authorization': `Bearer ${_token}`}

    const handleChangeCbo = (selectedOptions) => {
      setFormErrors({});
      let _id = selectedOptions.selectedKey.find(x => x);
      setIdUserPrestador(_id);
    }

    useEffect(( ) =>{
          axios.get(`${api}/User/getUsers`, {headers})
          .then(res => {
            let _optionsUser = [];
            res.data.forEach(u =>  _optionsUser.push({ labelKey:u.id , value: `${u.givenName} ${u.surname}` }));
            setOptionsUser(_optionsUser);
          })
          .catch(error => console.log('error', error));
    }, []); 

    const submitHandler = _ => {
      
      const error = {};
      setFormErrors({});
      
      if (idUserPrestador == undefined) { 
        error.msg = `Debe seleccionar el usuario a quien prestrará el libro`;
        setFormErrors(error);
        return;
      }

       Swal.fire({ title: "Está seguro de prestar el libro?", icon: "info", showCancelButton: true, confirmButtonColor: "#3085d6"
        , cancelButtonColor: "#d33", confirmButtonText: "Si, Prestar"
        }).then(result => {
        if (result.isConfirmed) {

            const _token = localStorage.getItem("accessToken");
            const headers = {'Authorization': `Bearer ${_token}`}
              
              axios.put(`${api}/Books/BorrowBook/${id}/${idUserPrestador}`, {}, { headers})
              .then(_ => {
                Swal.fire({ title: 'Prestado!', text: "El Libro prestado exitosamente.", icon: 'success', confirmButtonText: 'Ok' })
                
                setRefresh(!refresh);
                setShowPrestamo(false);
              })
              .catch( (error) => {
                debugger;
                if (error.response.status == 400) {
                      let msg = error.response.data;
                      Swal.fire({ title: `${msg}`  , icon: 'error', showConfirmButton: false, showDenyButton: true, denyButtonText: 'Ok' })
                    }
                else if (error.response.status == 404) {
                      let msg = error.response.data;
                      Swal.fire({ title: 'No tenemos este libro...!', text: `${msg}`, icon: 'error', showConfirmButton: false, showDenyButton: true, denyButtonText: 'Ok' })
                  }
                  setShowPrestamo(false);
              });
        }
       });
    
    }

  return  (
    
      <>
            <Modal show={showPrestamo} onHide={handleClosePrestamo}>
            <Modal.Header closeButton>
              <Modal.Title>New Book</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>

              <Form   >
  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label> Seleccione el Usuario a quien prestará el libro:</Form.Label>

                  <BootstrapSelect   onChange={handleChangeCbo}  showTick={true} showSearch={false}  
                   className="optionCbo  form-control" options={optionsUser} />
                  </Form.Group>

                <p className={basestyle.error}>{formErrors.msg}</p>

              </Form> 

            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePrestamo}> Close</Button>
              <Button variant="primary" onClick={submitHandler} > Save Book</Button    > 
              {/* <Button variant="primary" onClick={submitHandler} disabled={disabled}> Save Book</Button    >  */}
            </Modal.Footer>

        </Modal>

     <Button variant="info" onClick={handleShowPrestamo}> Prestar</Button>
    </>    
)


}

export default Prestamo;


