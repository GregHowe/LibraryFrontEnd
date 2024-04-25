import React , {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const UserPage = (props) => {
 
    const {userState}  = props;

    let api = "https://localhost:7113/api"; //process.env.API_BASE_URL;
    const [list, setList] = useState([]);

    const _token = localStorage.getItem("accessToken");
    const headers = {'Authorization': `Bearer ${_token}`}
   
    const rows = [];

    useEffect(( ) =>{
      
        axios.get(`${api}/Books/GetBorrowBookHistory/${userState.id}`, {headers})
        .then(res =>  {
      
          setList(res.data)
        })
        .catch(error => console.log(error));
  }, []);

    return (
     <>
         <div style={{minHeight: "30px"}} ></div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Libro Prestado</th>
                <th>Fecha Prestamo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {list.map(({nameBook, date, estado}, i) =>{
                return [
                    <tr >
                            <td>{i+1}</td>
                            <td>{nameBook}</td>
                            <td>{date}</td>
                            <td>{estado}</td>
                    </tr>
                ]
            })}
            </tbody>
      </Table>
     </>
    )
}

export default UserPage