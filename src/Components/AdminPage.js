import '../index.css';
import React , {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button  } from 'react-bootstrap'; //Badge
import List from '../Components/List';
import Add from '../Components/Add';
import ReturnBook from '../Components/ReturnBook';
import axios from 'axios';

const AdminPage = (props) => {

  let api = "https://localhost:7113/api"; //process.env.API_BASE_URL;
   
  const [list, setList] = useState([]);
  
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  
  const [showReturn, setShowReturn] = useState(false);
  const handleCloseReturn = () => setShowReturn(false);
  const handleShowReturn = () => setShowReturn(true);

  const [refresh, setRefresh] = useState(false);

  const BtnAdd = () =>{
    return <Button variant="primary"   onClick={handleShowAdd}>Nuevo Libro</Button>
  }

  const BtnDevolver = () =>{
    return <Button variant="warning"  onClick={handleShowReturn}>Devolver Libro</Button>
  }

  useEffect(( ) =>{
          axios.get(`${api}/Books`)
          .then(res => setList(res.data));
    }, [refresh]);


  return (
    <>

        <BtnAdd />
        {' '}
        <BtnDevolver />

          <List  books={ list }  setRefresh={setRefresh} refresh={refresh}  />

          <Add  setRefresh={setRefresh} refresh={refresh} showAdd={showAdd} handleCloseAdd={handleCloseAdd} />

          <ReturnBook   setRefresh={setRefresh} refresh={refresh} showReturn={showReturn} handleCloseReturn={handleCloseReturn} /> 
    </>
  );
}

export default AdminPage
