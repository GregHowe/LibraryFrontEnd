import '../index.css';
import React , {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button  } from 'react-bootstrap'; //Badge
import List from '../Components/List';
import Add from '../Components/Add';
import ReturnBook from '../Components/ReturnBook';
import AdminPage from '../Components/AdminPage';
import UserPage from '../Components/UserPage';
import axios from 'axios';

const Main = (props) => {

  const { setUserState, userState } = props;

  let api = "https://localhost:7113/api"; //process.env.API_BASE_URL;
   
  let role = userState.role;
  let userName = userState.givenName + ' ' + userState.surname;
  const authText = userName ? 'Logout' : '';

  
  const authHandler = () =>{
    setUserState({});
  }

  const ReturnPage = () =>{
     return  (role == "Administrator") ?  <AdminPage /> : <UserPage userState={userState}  />  //userState={userState}
  }

  return (
    <>
        <div style={{display:"flex"}}>
            <div style={{ flexGrow: 1}}><h5 style={{ marginBottom:30 }}>Librería Libros</h5></div>
            <div style={{flexGrow: 1,textAlign:"right"}}>
                  <b>Role:</b>{' '}<span>{role}</span>
                  {' '} - {' '}
                  <b>User:</b>{' '}<i>{userName}</i> <button className="btn btn-success navbar-btn"  onClick={authHandler} > {authText}  </button>
              </div>
        </div>

        <ReturnPage />

    </>
  );
}

export default Main
