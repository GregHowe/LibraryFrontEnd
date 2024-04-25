import './index.css';
import React , {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Main from './Components/Main';

const App = () => {
  const [userState, setUserState] = useState({});

  return (
  
    <div className="App">
        <Router>
                <Routes>
                    <Route path="/"
                      element={
                        userState &&userState.id ? 
                          ( <Main setUserState={setUserState} userState={userState} />) : 
                          ( <Login setUserState={setUserState} />)
                      }
                    />
                    <Route path="/login" element={<Login setUserState={setUserState} />}/>
                  </Routes>
        </Router>
      </div>
  
    );

}

export default App;
