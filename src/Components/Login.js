import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {

    const api = "https://localhost:7113/api"; //process.env.API_BASE_URL;

    const navigate = useNavigate();
    const [msgLogin, setMsgLogin] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({ Email: "", Password: ""});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...user, [name]: value,});
      };

      const validateForm = (values) => {

        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if (!values.Email) { error.Email = "Email is required";} 
        else if (!regex.test(values.Email)) { error.Email = "Please enter a valid email address"; }
        
        if (!values.Password) { error.Password = "Password is required"; }
        return error;
    
      };

      const loginHandler = (e) => {
        setMsgLogin(''); 
          e.preventDefault();
          setFormErrors(validateForm(user));
          setIsSubmit(true);
      };

      useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            axios.post(`${api}/Login`, user).then((res) => {
                let data = res.data;
                setUserState(data.user);
                localStorage.setItem("accessToken", data.token);
                navigate("/", { replace: true });
            })
            .catch((error) =>{
                if (error.response.status == 404 ){
                    let  _error = error.response.data;
                    setMsgLogin(_error); 
                }
            });
        }
      }, [formErrors]);

    return (
        <div className={loginstyle.login}>
          <form>
            <h1>Login</h1>
            Email:
            <input type="email" name="Email" id="Email" placeholder="Email" onChange={changeHandler} value={user.Email} />
            <p className={basestyle.error}>{formErrors.Email}</p>
            Password:
            <input type="password" name="Password" id="Password" placeholder="Password" onChange={changeHandler} value={user.Password} />
            <p className={basestyle.error}>{formErrors.Password}</p>
            <p className={basestyle.error}>{msgLogin}</p>
            <button className={basestyle.button_common} onClick={loginHandler}> Login </button>
          </form>
        </div>
      );


}

export default Login;