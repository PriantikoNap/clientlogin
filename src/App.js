import React, {Fragment, useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from './components/Login'
import Register from './components/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  const [isAuth, setIsauth] = useState(false);

  const settingAuth = (bool) =>{
    setIsauth(bool)
  }
  const logged = async() =>{
    try {
    
      const response = await fetch("http://localhost:5100/auth/is-valid",{
        method : "GET",
        headers: {
          token: localStorage.token
        }
      })
      const parseRes = await response.json();
      // console.log(parseRes);
      // console.log(parseRes !== null, "hello");
      
      parseRes === true ? setIsauth(true): setIsauth(false)
    
    } catch (err) {
      
    }
  }

  useEffect(() => {
    logged()
   
  })
  return (
    
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/login" render={props=> !isAuth ? (<Login {...props} setAuth={settingAuth}/>):(<Redirect to="/dashboard"/>)}/>
            <Route exact path="/register" render={props=> !isAuth ? (<Register {...props} setAuth={settingAuth}/>):(<Redirect to="/login"/>) }/>
            <Route exact path="/dashboard" render={props=> isAuth ? (<Dashboard {...props} setAuth={settingAuth}/>):(<Redirect to="/login"/>)}/>
          </Switch>
        </Router>
      </Fragment>
    
  );
}

export default App;
