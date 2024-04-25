import { Button  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const Delete = (props) =>{

    const api = "https://localhost:7113/api"; 
    const {setRefresh, refresh, id } = props;

    const deleteBook = (id) => {

      Swal.fire({ title: "Estas seguro?", text: "Esta accion no podrá ser revertida!", icon: "warning", showCancelButton: true, confirmButtonColor: "#3085d6"
      , cancelButtonColor: "#d33", confirmButtonText: "Sí, eliminar!"
        }).then(result => {

        if (result.isConfirmed) {

            const _token = localStorage.getItem("accessToken");
            const headers = {'Authorization': `Bearer ${_token}`}

            axios.delete(`${api}/Books/${id}`, { headers})
            .then((response) => {
              Swal.fire({ title: 'Eliminado!', text: "El libro ha sido eliminado.", icon: 'success', confirmButtonText: 'Ok' })
              setRefresh(!refresh);
            });

        }
       });
    }


  
  return  (
    
    <Button variant="dark" onClick={ e => deleteBook(id)}   > Eliminar</Button>
    
)


}

export default Delete;


